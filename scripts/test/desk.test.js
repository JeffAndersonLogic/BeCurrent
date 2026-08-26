#!/usr/bin/env node
'use strict';

/**
 * The Desk's route to Canvas, driven in a real browser.
 *
 * The Desk is the third gather surface in this course and the ONLY route the daily
 * filings have: there is no shell above it and no Brief beside it. It is also the
 * page a student opens more often than any other, roughly 180 times a year, so a
 * silent failure here costs more than the same failure anywhere else.
 *
 * What only a browser can prove, and what validate.js therefore cannot:
 *
 *   - The sheet is keyed to TODAY, in the student's own timezone, and the page says
 *     which day it is filing under. An offline check can see the code asking for
 *     that; only a browser can confirm the key it actually wrote.
 *   - Typing persists across a reload. The whole design rests on two weeks of work
 *     surviving in localStorage until the student copies it out.
 *   - The gather reaches back to earlier days in the same News Log CYCLE, in order,
 *     with labels that stay distinct, and does NOT reach into the previous cycle.
 *     That last part is what proves the window is anchored rather than a rolling
 *     fourteen days back from today, which would give two students pressing the
 *     button on different days two different fortnights. There is no offline
 *     equivalent: nothing in the repo can see a student's accumulated cycle.
 *   - No response comes back EDITED. That is the real test of the decision to make
 *     the three facts a capture record of their own rather than a loose line above
 *     the questions. Everything between one record's "My response:" and the next
 *     record's label is hashed into the earlier record, so a bare "Outlet: …" line
 *     between two questions would flag every single filing as tampered with. It
 *     would have looked completely correct on the page.
 *   - A day the student opened and left is not printed as six blanks.
 *
 * Exits 2 when playwright-core is absent, which run-tests.js reports as SKIP.
 * validate.js has to stay runnable on a bare checkout, so the browser dependency is
 * never installed by default. Pass --strict in CI to make a skip a failure.
 *
 *   node scripts/test/desk.test.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m', C = '\x1b[36m';
const W = '\x1b[1m', D = '\x1b[2m', X = '\x1b[0m';

let chromium;
try {
  chromium = require('playwright-core').chromium;
} catch (e) {
  console.log(`${Y}  SKIP  playwright-core is not installed: npm i playwright-core${X}`);
  process.exit(2);
}

const CORE = require('../lib/canvas-parse-core');
const DESK = require('../lib/desk-content');
const { STORAGE_PREFIX } = require('../lib/desk-capture-block');

const LANES = DESK.lanes.map(l => l.id);
const FACTS = DESK.story.facts.map(f => f.id);
const QUESTIONS = DESK.story.questions.map(q => q.id);
const PER_DAY = LANES.length * (1 + QUESTIONS.length);

const results = [];
function check(name, pass, detail) {
  results.push(pass);
  console.log(`  ${pass ? G + 'PASS' + X : R + 'FAIL' + X}  ${name}${detail ? D + '  (' + detail + ')' + X : ''}`);
}
function group(name) { console.log(`\n  ${C}${W}${name}${X}\n`); }

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const requested = pathname.endsWith('/') ? pathname + 'index.html' : pathname;
      const target = path.resolve(ROOT, '.' + requested);
      if (!target.startsWith(ROOT + path.sep)) { res.writeHead(403).end(); return; }
      fs.readFile(target, (err, body) => {
        if (err) { res.writeHead(404).end(); return; }
        res.writeHead(200, {
          'Content-Type': TYPES[path.extname(target).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': 'no-store'
        });
        res.end(body);
      });
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

// ── Dates, computed here the same way the page computes them ─────────────────
//
// Deliberately reimplemented rather than imported, because the point is to check
// the browser against an independent answer. Local getters, never toISOString():
// an ISO date is UTC and would disagree with the page every evening after 7pm
// Eastern, so a test written with toISOString would fail only after school.
function dayKeyOf(d) {
  return d.getFullYear()
    + '-' + ('0' + (d.getMonth() + 1)).slice(-2)
    + '-' + ('0' + d.getDate()).slice(-2);
}
function mondayOf(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function dayLabel(key) {
  const p = String(key).split('-');
  const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  return DOW[d.getDay()] + ' ' + MON[d.getMonth()] + ' ' + d.getDate();
}
// The spelled-out form, which is what the day banners and the pre-term notice use.
const DOW_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
  'Saturday'];
const MON_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
function dayLabelFull(key) {
  const p = String(key).split('-');
  const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  return DOW_FULL[d.getDay()] + ', ' + MON_FULL[d.getMonth()] + ' ' + d.getDate();
}

const TODAY = dayKeyOf(new Date());

// The News Log cycle, recomputed here independently of the page, because the point
// is to check the browser against a separate answer rather than against itself.
// Whole days off UTC midnights, matching the page: local arithmetic across a
// daylight-saving boundary gives 13.958 days, which floors to the wrong cycle.
const CYCLE_WEEKS = Number((DESK.log || {}).weeks) || 1;
function daysBetweenUTC(a, b) {
  return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
    - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000);
}
const CYCLE_START = (() => {
  const p = String((DESK.log || {}).anchorMonday || '').split('-').map(Number);
  const anchor = mondayOf(new Date(p[0], p[1] - 1, p[2]));
  const here = mondayOf(new Date());
  const cycles = Math.max(0, Math.floor(Math.floor(daysBetweenUTC(anchor, here) / 7) / CYCLE_WEEKS));
  return new Date(anchor.getFullYear(), anchor.getMonth(),
    anchor.getDate() + cycles * CYCLE_WEEKS * 7);
})();
const CYCLE_DAYS = CYCLE_WEEKS * 7;
const CYCLE_START_KEY = dayKeyOf(CYCLE_START);

// Whether today is inside a cycle at all. Before the term's anchor Monday it is
// not, and this test must be green then too: a suite that only passes during term is
// a suite that gets ignored in August, which is exactly when the Desk is being built.
const TODAY_IN_CYCLE = TODAY >= CYCLE_START_KEY;

// Two days inside the current cycle, neither of them today, chosen rather than
// hard-coded. A hard-coded weekday makes this test pass or fail depending on which
// day it is run on, and a suite that is green on Tuesday and red on Monday teaches
// people to rerun it rather than read it.
const [SEED_A, SEED_B] = (() => {
  const out = [];
  for (let i = 0; i < CYCLE_DAYS && out.length < 2; i++) {
    const d = new Date(CYCLE_START.getFullYear(), CYCLE_START.getMonth(),
      CYCLE_START.getDate() + i);
    const key = dayKeyOf(d);
    if (key !== TODAY) out.push(key);
  }
  return out;
})();

// How many days the gather should find: the two seeded, plus today when today is
// itself inside the cycle and therefore carries the typed story.
const EXPECT_DAYS = 2 + (TODAY_IN_CYCLE ? 1 : 0);

// A day in the PREVIOUS cycle, which must not be gathered: that log has already
// been submitted under its own assignment, and sweeping it in would double-report
// it. Three days before this cycle starts is inside the previous one whatever the
// cycle length.
const LAST_CYCLE = (() => {
  const d = new Date(CYCLE_START.getFullYear(), CYCLE_START.getMonth(),
    CYCLE_START.getDate() - 3);
  return dayKeyOf(d);
})();

/**
 * A seeded day that looks like a real one: the first lane filled, the second left
 * untouched.
 *
 * The paste assertions key off THIS rather than off the story typed through the form,
 * because the form always writes to today's sheet and today is outside the cycle
 * window before the term's anchor Monday. Keying them to a day inside the window is
 * what makes this test green in August as well as in October.
 *
 * The text is deliberately different from what the typing test types, so an assertion
 * looking for one can never be satisfied by the other.
 */
const SEEDED_ANSWER = 'The zoning board voted to rezone the parcel on Oak Street.\n\n'
  + 'Two of the five members had asked for a delay the week before.';

function filledDay() {
  const state = {};
  const a = LANES[0];
  state[`${a}-${FACTS[0]}`] = { answer: 'Times Sentinel' };
  state[`${a}-${FACTS[1]}`] = { answer: 'September 8, 2026' };
  state[`${a}-${FACTS[2]}`] = { answer: 'https://www.timessentinel.com/example' };
  state[`${a}-${QUESTIONS[0]}`] = {
    answer: SEEDED_ANSWER, question: 'seeded prompt for what', confidence: '4'
  };
  // QUESTIONS[1] and the whole second lane are left absent on purpose: that is what
  // exercises the empty source record and the BLANK flags below.
  return state;
}

// A seeded day, in exactly the shape the capture block writes.
function seededDay(tag) {
  const state = {};
  LANES.forEach(lane => {
    FACTS.forEach(f => { state[lane + '-' + f] = { answer: `${tag} ${lane} ${f}` }; });
    QUESTIONS.forEach((q, i) => {
      state[lane + '-' + q] = {
        answer: `${tag} ${lane} ${q} answer.`,
        question: `seeded prompt for ${q}`,
        confidence: String(i + 2)
      };
    });
  });
  return state;
}

(async () => {
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}`;
  const executablePath = process.env.PW_CHROME;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));

  try {
    console.log(`\n${C}${W}The Desk, the daily filing and its route to Canvas${X}`);
    console.log(`${D}  /daily/index.html · today ${TODAY} · cycle from ${CYCLE_START_KEY}`
      + ` (${CYCLE_WEEKS} week${CYCLE_WEEKS === 1 ? '' : 's'})${X}`);

    await page.goto(base + '/daily/index.html', { waitUntil: 'domcontentloaded' });

    // ── The dated sheet on a dateless page ────────────────────────────────────
    group('The dated sheet on a dateless page');

    const printed = (await page.textContent('#desk-today') || '').trim();
    check('the page tells the student which day it is filing under',
      printed === dayLabel(TODAY), `${printed} vs ${dayLabel(TODAY)}`);

    // The build must never stamp the CURRENT day into the page. That is the whole
    // reason one generated page can serve 180 class periods: the browser stamps the
    // day, the build stamps nothing about today.
    //
    // Exactly one date is allowed in the source, and it is the News Log cycle
    // anchor. It is a calendar anchor rather than content that expires, and it is
    // what makes a two-week window computable at all; see cycleStart in
    // desk-capture-block.js. Asserting "exactly one, and it is the anchor" rather
    // than "none" keeps the check honest: a build that started writing today's date
    // in would now add a second date and still fail.
    // One assertion, not two. The obvious pair, "no date equal to today" plus "the
    // only date is the anchor", contradicts itself on the one day a fortnight when
    // today IS the anchor Monday, and a check that goes red on a correct build every
    // other Monday is a check people learn to ignore.
    //
    // The blind spot that leaves, a build stamping today's date on the anchor day
    // itself, is closed on the offline side instead: validate.js asserts the page
    // computes its day key as dayKeyOf(new Date()) in the browser, so there is no
    // path by which the build could be writing it.
    const shipped = fs.readFileSync(path.join(ROOT, 'daily', 'index.html'), 'utf8');
    const datesInPage = [...new Set(shipped.match(/\b20\d{2}-\d{2}-\d{2}\b/g) || [])];
    check('the only date in the generated file is the cycle anchor',
      datesInPage.length === 1 && datesInPage[0] === DESK.log.anchorMonday,
      datesInPage.join(', ') || 'none');

    // ── Typing, and surviving a reload ────────────────────────────────────────
    group('Typing, and surviving a reload');

    const laneA = LANES[0];
    const typed = 'The town council voted to rezone the parcel on Oak Street.\n\n'
      + 'Three council members had asked for a delay the week before.';
    await page.fill(`#answer-${laneA}-${FACTS[0]}`, 'Times Sentinel');
    await page.fill(`#answer-${laneA}-${FACTS[1]}`, 'September 8, 2026');
    await page.fill(`#answer-${laneA}-${QUESTIONS[0]}`, typed);
    await page.click(`#confidence-${laneA}-${QUESTIONS[0]} button[data-conf="4"]`);

    check('pressing a confidence button records it',
      await page.getAttribute(`#confidence-${laneA}-${QUESTIONS[0]} button[data-conf="4"]`,
        'aria-pressed') === 'true');

    const key = await page.evaluate(p => {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.indexOf(p) === 0) return k;
      }
      return null;
    }, STORAGE_PREFIX);
    check('the work is written under today’s own key',
      key === STORAGE_PREFIX + TODAY, key);

    await page.reload({ waitUntil: 'domcontentloaded' });
    check('a textarea comes back filled after a reload',
      (await page.inputValue(`#answer-${laneA}-${QUESTIONS[0]}`)).startsWith('The town council voted'));
    check('a fact input comes back filled too',
      (await page.inputValue(`#answer-${laneA}-${FACTS[0]}`)) === 'Times Sentinel');
    check('and so does the confidence rating',
      await page.getAttribute(`#confidence-${laneA}-${QUESTIONS[0]} button[data-conf="4"]`,
        'aria-pressed') === 'true');

    // ── The gather reaches across the cycle ──────────────────────────────────
    group('The gather reaches across the cycle');

    await page.evaluate(args => {
      args.seeds.forEach(function (s) {
        localStorage.setItem(args.prefix + s.key, JSON.stringify(s.state));
      });
      localStorage.setItem(args.prefix + args.lastCycle, JSON.stringify(args.lastState));
      // A day the student opened and left. It must not print as six blanks: that
      // reads to the teacher as work attempted and abandoned.
      localStorage.setItem(args.prefix + args.empty, JSON.stringify({}));
    }, {
      prefix: STORAGE_PREFIX,
      // SEED_A is the realistic filled day the paste assertions read; SEED_B is a
      // second day, so the day division and the label uniqueness have something to
      // divide.
      seeds: [{ key: SEED_A, state: filledDay() },
        { key: SEED_B, state: seededDay('seedB') }],
      lastCycle: LAST_CYCLE,
      lastState: seededDay('lastcycle'),
      // Inside the cycle window but with nothing in it. Placed on a seeded-adjacent
      // day rather than a far-future one, so it is genuinely a day the gather looks
      // at and chooses to skip.
      empty: (() => {
        const p = SEED_B.split('-').map(Number);
        return dayKeyOf(new Date(p[0], p[1] - 1, p[2] + 1));
      })()
    });

    await page.click('button:has-text("Gather My Log")');

    const status = (await page.textContent('#desk-gather-status') || '').trim();
    check('the status names how many days it gathered',
      new RegExp(`Gathered ${EXPECT_DAYS} days,`).test(status), status);
    check('and how many boxes of how many are filled, rather than hiding a short log',
      new RegExp(`of ${PER_DAY * EXPECT_DAYS} boxes filled`).test(status), status);

    const shape = await page.$eval('#desk-gather-output', out => ({
      heads: Array.from(out.querySelectorAll('h3')).map(h => h.textContent.trim()),
      ems: Array.from(out.querySelectorAll('em')).map(e => e.textContent.trim()),
      strongs: Array.from(out.querySelectorAll('strong')).map(s => s.textContent.trim()),
      text: out.textContent,
      html: out.innerHTML
    }));

    check('every day in the cycle window is in the paste',
      [SEED_A, SEED_B].concat(TODAY_IN_CYCLE ? [TODAY] : [])
        .every(k => shape.text.includes(dayLabel(k))),
      [SEED_A, SEED_B].concat(TODAY_IN_CYCLE ? [TODAY] : []).map(dayLabel).join(' + '));

    // Before the term's anchor Monday, today belongs to no cycle. The page has to say
    // so rather than reporting an empty log, or a teacher walking the page in August
    // types two stories, presses Gather, gets nothing, and concludes the button is
    // broken. This branch is the one that runs pre-term and disappears on day one.
    if (!TODAY_IN_CYCLE) {
      check('today is correctly outside the cycle, so its own filing is not gathered',
        !shape.text.includes(dayLabel(TODAY)), `${dayLabel(TODAY)} before ${CYCLE_START_KEY}`);
    }

    // The previous cycle has already been submitted under its own assignment. This
    // is the assertion that the window is ANCHORED rather than a rolling fourteen
    // days back from today: a rolling window would reach into it.
    check('the previous cycle is not swept in',
      !shape.text.includes('lastcycle'), `${dayLabel(LAST_CYCLE)} excluded`);

    check('a day with nothing in it is not printed as blanks',
      shape.heads.length === PER_DAY * EXPECT_DAYS,
      `${shape.heads.length} headings, expected ${PER_DAY * EXPECT_DAYS}`);

    // Within a day, no two question headings may read the same. Across days they
    // may: the day's first heading drops the date because the <h2> banner directly
    // above it carries it, so 'Local story, Source' appears once under each banner.
    // Asserting global uniqueness of the RENDERED headings would fail that on a
    // correct paste, which is why the real invariant, label uniqueness, is checked
    // against the manifest further down instead.
    const perDayHeads = [];
    for (let i = 0; i < shape.heads.length; i += PER_DAY) {
      perDayHeads.push(shape.heads.slice(i, i + PER_DAY));
    }
    check('within one day, no two question headings read the same',
      perDayHeads.every(block => new Set(block).size === block.length),
      perDayHeads.map(b => `${new Set(b).size}/${b.length}`).join(' '));

    check('the header names the cycle it covers and which days were filed',
      /News Log, \w+ \d+ to /.test(shape.text) && /Days filed: /.test(shape.text),
      (shape.text.match(/News Log, [^S]*/) || [''])[0].trim().slice(0, 40));

    // ── The day banners ───────────────────────────────────────────────────────
    //
    // A week's log needs its days visibly divided or a teacher scrolling thirty of
    // them cannot tell Monday's filing from Wednesday's. The banner is an <h2>, and
    // it is structurally the first words of a record's own LABEL rather than free
    // text, because free text between two records is hashed into the earlier one.
    // The "not one response comes back EDITED" check below is what proves that part
    // held; these prove the division is actually there to see.
    const banners = await page.$$eval('#desk-gather-output h2',
      els => els.map(e => e.textContent.trim()));
    const dayNames = [SEED_A, SEED_B].concat(TODAY_IN_CYCLE ? [TODAY] : []).map(k => {
      const p = k.split('-');
      const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()]
        + ', ' + ['January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December'][d.getMonth()]
        + ' ' + d.getDate();
    }).sort();
    check('each day gets one banner heading, spelling the day out',
      dayNames.every(n => banners.includes(n))
      && banners.filter(b => dayNames.includes(b)).length === EXPECT_DAYS,
      banners.join(' | '));

    // One banner per day, not one per record. Giving every record its own <h2>
    // would divide nothing, because a divider that appears between every two rows
    // is not a divider.
    check('the banner appears once per day, not once per record',
      banners.filter(b => b === dayNames[0]).length === 1,
      `${banners.length} h2 total, ${shape.heads.length} records`);

    check('the question text is bold, so it never reads as the student’s own words',
      shape.strongs.some(s => s.startsWith('Question: ')));
    check('the student’s response is italic',
      shape.ems.some(e => e.startsWith('The zoning board voted')));
    check('a blank line in a response survives as two paragraphs, not a <br>',
      shape.ems.filter(e => /^(The zoning board voted|Two of the five)/.test(e)).length === 2,
      `${shape.ems.length} italic runs`);

    // The end-to-end path, form to paste, only exists once today is inside a cycle.
    // Asserted when it applies rather than dropped, so the real classroom path stays
    // covered from the term's first Monday on.
    if (TODAY_IN_CYCLE) {
      check('a story typed through the form today reaches the paste',
        shape.ems.some(e => e.startsWith('The town council voted')));
    }
    check('the confidence rating travels in words, not a bare numeral',
      /Confidence: 4 of 5, Solid/.test(shape.text));

    // Within EACH record, not across the document. Everything below a record's
    // "My response:" is what gets hashed, so a confidence line under it would read
    // as part of the student's writing and flag the answer as edited. Comparing
    // global indexOf positions is the wrong test on a paste with twelve records:
    // the first record's marker legitimately precedes the second record's
    // confidence line, so a global comparison fails a paste that is entirely
    // correct.
    const misordered = shape.heads.filter((head, i) => {
      const start = shape.text.indexOf(head);
      if (start === -1) return true;
      const nextHead = shape.heads[i + 1];
      const end = nextHead ? shape.text.indexOf(nextHead, start + head.length) : shape.text.length;
      const section = shape.text.slice(start + head.length, end === -1 ? shape.text.length : end);
      const conf = section.indexOf('Confidence:');
      const marker = section.indexOf('My response:');
      return conf === -1 || marker === -1 || conf > marker;
    });
    check('in every record, the confidence sits above the marker, outside the hashed region',
      misordered.length === 0,
      misordered.length ? misordered.join(' | ') : `${shape.heads.length} records checked`);

    // ── The record footer, read back by the real parser ───────────────────────
    group('The record footer, read back by the real parser');

    check('the paste carries the footer',
      /--- BECURRENT RECORD, do not edit ---/.test(shape.text)
      && /--- END BECURRENT RECORD ---/.test(shape.text));

    const asCanvasWouldStoreIt = '<!DOCTYPE html><html><body>' + shape.html + '</body></html>';
    const parsed = CORE.parseSubmission(
      CORE.htmlToText(asCanvasWouldStoreIt), 'studenttest_1_2_text.html');

    check('the parser finds a manifest rather than falling back',
      parsed.hasManifest === true, `hasManifest=${parsed.hasManifest}`);
    check('it reports the cycle this log belongs to',
      parsed.topicId === 'desk-log-' + CYCLE_START_KEY, parsed.topicId);
    check('it recovers every record every gathered day defines',
      parsed.responses.length === PER_DAY * EXPECT_DAYS,
      `${parsed.responses.length} of ${PER_DAY * EXPECT_DAYS}`);

    // The real uniqueness invariant, and it lives in the manifest rather than in the
    // rendered headings. Every record declares a date-qualified label, which is what
    // keeps five days of the same two questions apart both for the parser and for
    // every row of responses.csv. The parser walks the body forward from the previous
    // match, so duplicated labels would still parse; a teacher reading thirty of
    // these could not tell Monday from Friday.
    const labels = parsed.responses.map(r => r.label);
    check('every record declares a distinct, date-qualified label',
      new Set(labels).size === labels.length
      && labels.every(l => /\w+day, \w+ \d+/.test(l)),
      `${new Set(labels).size} unique of ${labels.length}`);

    const declaredExpected = (shape.text.match(/\|expected=(\d+)\|/) || [])[1];
    check('the expected count is computed from the days actually filed, never a literal',
      Number(declaredExpected) === PER_DAY * EXPECT_DAYS,
      `expected=${declaredExpected}, ${EXPECT_DAYS} days x ${PER_DAY}`);

    // THE assertion. If the three facts were printed as a loose line above the
    // questions instead of being a record of their own, that line would fall
    // between one record's "My response:" and the next record's label, get hashed
    // into the earlier answer, and flag every filing in the paste as tampered
    // with. Nothing about the rendered page would look wrong.
    const edited = parsed.responses.filter(r => r.flags.includes('EDITED'));
    check('not one response comes back EDITED',
      edited.length === 0,
      edited.length ? edited.map(r => r.slotId).join(', ') : 'no false positives');
    check('and the manifest checksum is intact',
      !parsed.exceptions.some(e => e.reason === 'MANIFEST_ALTERED'
        || e.reason === 'COUNT_MISMATCH' || e.reason === 'INCOMPLETE'),
      parsed.exceptions.map(e => e.reason).join(', ') || 'clean');

    // Slots are NOT date-qualified, on purpose: 'desk-local-why' means the same
    // thing on every day of the year, which is what lets one question be looked at
    // across a week and across a room. The label carries the date instead.
    const slots = new Set(parsed.responses.map(r => r.slotId));
    check('the slot for one question is the same on both days, so it can be aggregated',
      slots.size === PER_DAY && slots.has(`desk-${LANES[0]}-${QUESTIONS[0]}`),
      Array.from(slots).sort().join(' '));

    const source = parsed.responses.find(r => r.slotId === `desk-${LANES[0]}-source`
      && /Times Sentinel/.test(r.response));
    check('the outlet, date and link come back as their own record',
      !!source && /Times Sentinel/.test(source.response)
      && new RegExp(DESK.story.facts[1].label).test(source.response),
      source ? source.response.replace(/\s+/g, ' ').slice(0, 58) + '…' : 'missing');

    // A story the student filed nothing for emits an EMPTY source record rather
    // than three lines reading "(blank)". Three lines of the word blank is the same
    // information dressed up as work, and it is what a teacher has to read past on
    // every unfilled lane of a five-day log.
    const emptySource = parsed.responses.find(r => r.slotId === `desk-${LANES[1]}-source`
      && r.wordCount === 0);
    check('an unfilled story leaves its source record empty, not full of "(blank)"',
      !!emptySource && !/blank/i.test(emptySource.response),
      emptySource ? `w=${emptySource.wordCount}, flags=${emptySource.flags.join(',')}` : 'missing');

    const answered = parsed.responses.filter(r => /zoning board voted/.test(r.response));
    check('the typed response comes back intact',
      answered.length === 1, `${answered.length} match`);

    check('its confidence survives the round trip',
      answered.length === 1 && answered[0].confidence === '4',
      answered.length ? answered[0].confidence : '');

    // A blank must come back BLANK and never EDITED. The wrong way round tells the
    // teacher a student tampered with work they simply never wrote.
    const blank = parsed.responses.find(r => r.slotId === `desk-${LANES[1]}-${QUESTIONS[1]}`
      && r.wordCount === 0);
    check('an unfilled box on today’s sheet is reported blank, not dropped',
      !!blank, blank ? `w=${blank.wordCount}` : 'none found');
    check('and is flagged BLANK rather than EDITED',
      !!blank && blank.flags.includes('BLANK') && !blank.flags.includes('EDITED'),
      blank ? blank.flags.join(',') : '');

    // ── The plain-text flavour ────────────────────────────────────────────────
    group('The plain-text flavour');

    // Which flavour Canvas keeps is not this repo's decision. A student on a device
    // where the rich copy was refused pastes the plain one, and it has to parse to
    // the same answer.
    const plain = await page.$eval('#desk-gather-output', out => out.dataset.plain);
    const fromPlain = CORE.parseSubmission(plain, 'studenttest_1_2_text.txt');
    check('the plain flavour carries the same manifest',
      fromPlain.hasManifest && fromPlain.topicId === parsed.topicId, fromPlain.topicId);
    check('and recovers the same number of records',
      fromPlain.responses.length === parsed.responses.length,
      `${fromPlain.responses.length} vs ${parsed.responses.length}`);
    const plainAnswered = fromPlain.responses.filter(r => /zoning board voted/.test(r.response));
    check('with the typed response intact and unflagged',
      plainAnswered.length === 1 && !plainAnswered[0].flags.includes('EDITED'),
      plainAnswered.length ? plainAnswered[0].flags.join(',') || 'clean' : 'missing');

    // ── An empty gather says which kind of empty it is ────────────────────────
    group('An empty gather says which kind of empty it is');

    // Two causes, two sentences. Before the term's anchor Monday today belongs to no
    // cycle, so an empty gather is expected and correct; saying "nothing filed yet"
    // there would be a lie about work the student can see on the screen, and the move
    // after "this button is broken" is to stop trusting it. From the first Monday on,
    // an empty gather really does mean nothing is filed.
    await page.evaluate(p => {
      const doomed = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.indexOf(p) === 0) doomed.push(k);
      }
      doomed.forEach(k => localStorage.removeItem(k));
    }, STORAGE_PREFIX);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.click('button:has-text("Gather My Log")');
    const emptyStatus = (await page.textContent('#desk-gather-status') || '').trim();

    if (TODAY_IN_CYCLE) {
      check('an empty log in an open cycle says nothing is filed yet',
        /Nothing filed in this log yet/.test(emptyStatus), emptyStatus);
    } else {
      check('before the term starts it names the day the first log opens',
        /The first News Log starts/.test(emptyStatus)
        && emptyStatus.includes(dayLabelFull(CYCLE_START_KEY)), emptyStatus);
      check('and says the work is saved rather than implying it was lost',
        /saved on this device/.test(emptyStatus), emptyStatus);
    }

    // ── Nothing leaves the device ─────────────────────────────────────────────
    group('Nothing leaves the device');

    check('the page threw no script errors at any point',
      pageErrors.length === 0, pageErrors.join(' | ') || 'clean');
  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter(r => !r).length;
  console.log(`\n  ${failed ? R + W + failed + ' failed' : G + W + results.length + '/'
    + results.length + ' passed'}${X}\n`);
  process.exit(failed ? 1 : 0);
})().catch(e => {
  console.error(`${R}${e && e.stack ? e.stack : e}${X}`);
  process.exit(1);
});
