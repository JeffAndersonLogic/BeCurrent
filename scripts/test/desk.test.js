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
 *   - Typing persists across a reload. The whole design rests on a week of work
 *     surviving in localStorage until the student copies it out.
 *   - The WEEKLY gather reaches back to earlier days in the same week, in order,
 *     with labels that stay distinct. This is the assertion with no offline
 *     equivalent at all: nothing in the repo can see five days of a student's week.
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

const TODAY = dayKeyOf(new Date());
const MONDAY = dayKeyOf(mondayOf(new Date()));

// Some other day inside the same Monday-to-Sunday week as today. Chosen rather
// than hard-coded, because a hard-coded weekday makes this test pass or fail
// depending on which day of the week it is run on, and a suite that is green on
// Tuesday and red on Monday teaches people to rerun it rather than read it.
const OTHER_DAY = (() => {
  const monday = mondayOf(new Date());
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const key = dayKeyOf(d);
    if (key !== TODAY) return key;
  }
  return null;
})();

// A day outside this week, which must NOT be gathered: last week's log has already
// been submitted, and sweeping it into this week's paste would double-report it.
const LAST_WEEK = (() => {
  const monday = mondayOf(new Date());
  const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() - 3);
  return dayKeyOf(d);
})();

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
    console.log(`${D}  /daily/index.html · today ${TODAY} · week of ${MONDAY}${X}`);

    await page.goto(base + '/daily/index.html', { waitUntil: 'domcontentloaded' });

    // ── The dated sheet on a dateless page ────────────────────────────────────
    group('The dated sheet on a dateless page');

    const printed = (await page.textContent('#desk-today') || '').trim();
    check('the page tells the student which day it is filing under',
      printed === dayLabel(TODAY), `${printed} vs ${dayLabel(TODAY)}`);

    // The generated HTML must carry no date at all. The whole reason one page can
    // serve 180 class periods is that the build stamps nothing and the browser
    // stamps everything.
    const shipped = fs.readFileSync(path.join(ROOT, 'daily', 'index.html'), 'utf8');
    check('but the generated file itself contains no date',
      !new RegExp(TODAY).test(shipped) && !/\b20\d{2}-\d{2}-\d{2}\b/.test(shipped),
      'no YYYY-MM-DD in daily/index.html');

    // ── Typing, and surviving a reload ────────────────────────────────────────
    group('Typing, and surviving a reload');

    const laneA = LANES[0];
    const typed = 'The town council voted to rezone the parcel on Oak Street.\n\n'
      + 'Two of the five members had asked for a delay the week before.';
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

    // ── The weekly gather reaches back ───────────────────────────────────────
    group('The weekly gather reaches back');

    await page.evaluate(args => {
      localStorage.setItem(args.prefix + args.other, JSON.stringify(args.otherState));
      localStorage.setItem(args.prefix + args.lastWeek, JSON.stringify(args.lastState));
      // A day the student opened and left. It must not print as six blanks: that
      // reads to the teacher as work attempted and abandoned.
      localStorage.setItem(args.prefix + args.empty, JSON.stringify({}));
    }, {
      prefix: STORAGE_PREFIX,
      other: OTHER_DAY,
      otherState: seededDay('seeded'),
      lastWeek: LAST_WEEK,
      lastState: seededDay('lastweek'),
      empty: dayKeyOf(new Date(new Date().getFullYear() + 1, 0, 2))
    });

    await page.click('button:has-text("Gather My Week")');

    const status = (await page.textContent('#desk-gather-status') || '').trim();
    check('the status names how many days it gathered',
      /Gathered 2 days,/.test(status), status);
    check('and how many boxes of how many are filled, rather than hiding a short week',
      new RegExp(`of ${PER_DAY * 2} boxes filled`).test(status), status);

    const shape = await page.$eval('#desk-gather-output', out => ({
      heads: Array.from(out.querySelectorAll('h3')).map(h => h.textContent.trim()),
      ems: Array.from(out.querySelectorAll('em')).map(e => e.textContent.trim()),
      strongs: Array.from(out.querySelectorAll('strong')).map(s => s.textContent.trim()),
      text: out.textContent,
      html: out.innerHTML
    }));

    check('both days are in the paste',
      shape.text.includes(dayLabel(TODAY)) && shape.text.includes(dayLabel(OTHER_DAY)),
      `${dayLabel(OTHER_DAY)} + ${dayLabel(TODAY)}`);

    // Last week has already been submitted under its own weekly assignment.
    check('last week is not swept in',
      !shape.text.includes('lastweek'), `${dayLabel(LAST_WEEK)} excluded`);

    check('a day with nothing in it is not printed as blanks',
      shape.heads.length === PER_DAY * 2, `${shape.heads.length} headings, expected ${PER_DAY * 2}`);

    // Date-qualified, so five days of the same two questions stay distinguishable.
    // The parser walks the body forward from the previous match, so duplicated
    // labels would still parse, but the teacher reading thirty of these could not
    // tell Monday from Friday.
    check('every heading is distinct, because each carries its own date',
      new Set(shape.heads).size === shape.heads.length,
      `${new Set(shape.heads).size} unique of ${shape.heads.length}`);

    check('the header names the week and which days were filed',
      /Week of /.test(shape.text) && /Days filed: /.test(shape.text));

    check('the question text is bold, so it never reads as the student’s own words',
      shape.strongs.some(s => s.startsWith('Question: ')));
    check('the student’s response is italic',
      shape.ems.some(e => e.startsWith('The town council voted')));
    check('a blank line in a response survives as two paragraphs, not a <br>',
      shape.ems.filter(e => /^(The town council voted|Two of the five)/.test(e)).length === 2,
      `${shape.ems.length} italic runs`);
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
    check('it reports the week this log belongs to',
      parsed.topicId === 'desk-week-' + MONDAY, parsed.topicId);
    check('it recovers every record both days define',
      parsed.responses.length === PER_DAY * 2,
      `${parsed.responses.length} of ${PER_DAY * 2}`);

    const declaredExpected = (shape.text.match(/\|expected=(\d+)\|/) || [])[1];
    check('the expected count is computed from the days actually filed, never a literal',
      Number(declaredExpected) === PER_DAY * 2,
      `expected=${declaredExpected}, 2 days x ${PER_DAY}`);

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
      slots.size === PER_DAY && slots.has(`desk-${laneA}-${QUESTIONS[0]}`),
      Array.from(slots).sort().join(' '));

    const source = parsed.responses.find(r => r.slotId === `desk-${laneA}-source`
      && /Times Sentinel/.test(r.response));
    check('the outlet, date and link come back as their own record',
      !!source && /Times Sentinel/.test(source.response)
      && new RegExp(DESK.story.facts[1].label).test(source.response),
      source ? source.response.replace(/\s+/g, ' ').slice(0, 58) + '…' : 'missing');

    const answered = parsed.responses.filter(r => /town council voted/.test(r.response));
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
    const plainAnswered = fromPlain.responses.filter(r => /town council voted/.test(r.response));
    check('with the typed response intact and unflagged',
      plainAnswered.length === 1 && !plainAnswered[0].flags.includes('EDITED'),
      plainAnswered.length ? plainAnswered[0].flags.join(',') || 'clean' : 'missing');

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
