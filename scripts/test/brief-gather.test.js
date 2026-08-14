#!/usr/bin/env node
'use strict';

/**
 * Gather All My Work on the Brief, driven in a real browser.
 *
 * This runs against a UNIT BLOCK brief, not week 01, and that choice is the point.
 * A block card on a unit page opens its Brief directly: there is no week shell
 * behind it and no Gather panel on any page above it, so this panel is the ONLY
 * route those answers have to Canvas. Before it existed, every Social Media block
 * answer was written into localStorage and stranded there, with every structural
 * check green.
 *
 * What only a browser can prove, and what validate.js therefore cannot:
 *
 *   - The paste comes out with the question BOLD and the response ITALIC. The
 *     offline check asserts the code asks for that; this asserts the DOM got it.
 *   - The record footer this page writes is read back by the real parser, with the
 *     response intact and unflagged. A footer that only round-trips in theory is
 *     the version of this that reports every submission as edited.
 *   - The five confidence buttons carry their words and still record a press. The
 *     word moved onto the button; `data-conf` and `aria-pressed` did not move, and
 *     they are what the capture block reads.
 *
 * Exits 2 when playwright-core is absent, which run-tests.js reports as SKIP.
 * validate.js has to stay runnable on a bare checkout, so the browser dependency is
 * never installed by default. Pass --strict in CI to make a skip a failure.
 *
 *   node scripts/test/brief-gather.test.js
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

// The first unit brief there is, found rather than named, so adding a block or
// renaming one cannot leave this test quietly running against nothing.
function firstUnitBrief() {
  const units = fs.readdirSync(ROOT).filter(d => {
    if (!fs.statSync(path.join(ROOT, d)).isDirectory()) return false;
    return fs.readdirSync(path.join(ROOT, d)).some(f => /^block-\d{2}-brief-.*[^e]\.html$/.test(f));
  });
  for (const unit of units) {
    const brief = fs.readdirSync(path.join(ROOT, unit))
      .filter(f => /^block-\d{2}-brief-.*\.html$/.test(f) && !f.endsWith('-capture.html'))
      .sort()[0];
    if (brief) return `/${unit}/${brief}`;
  }
  return null;
}

(async () => {
  const briefPath = firstUnitBrief();
  if (!briefPath) {
    console.log(`${R}  FAIL  no unit brief found to test against${X}`);
    process.exit(1);
  }

  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}`;
  const executablePath = process.env.PW_CHROME;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));

  try {
    console.log(`\n${C}${W}Gather All My Work, on a unit block brief${X}`);
    console.log(`${D}  ${briefPath}${X}`);

    await page.goto(base + briefPath, { waitUntil: 'domcontentloaded' });

    // ── The confidence scale ──────────────────────────────────────────────────
    group('The confidence scale');

    const words = await page.$$eval('#confidence-q1 button .conf-word',
      els => els.map(e => e.textContent.trim()));
    check('every button carries its own word, not just a numeral',
      words.length === 5 && words[0] === 'Lost' && words[4] === 'Could teach it',
      words.join(' / '));

    check('the legend that used to sit beside the row is gone',
      !(await page.$('#confidence-q1 .confidence-label')));

    check('the row is still named for a screen reader',
      /understand/i.test(await page.getAttribute('#confidence-q1', 'aria-label') || ''));

    // The word moved onto the button; data-conf and aria-pressed did not move,
    // and they are what the capture block reads.
    await page.click('#confidence-q1 button[data-conf="4"]');
    check('pressing one still records it',
      await page.getAttribute('#confidence-q1 button[data-conf="4"]', 'aria-pressed') === 'true');

    // ── Gathering ─────────────────────────────────────────────────────────────
    group('Gathering');

    const count = await page.$$eval('.question-item', els => els.length);
    const typed = 'The company chose to rank the feed. That was a decision, not a default.\n\n'
      + 'Two causes point the same way here, which is what makes it hard to call.';
    await page.fill('#answer-q1', typed);

    await page.click('.gather-actions button:has-text("Gather All My Work")');

    const status = await page.textContent('#brief-gather-status');
    check('the status names how many of how many were gathered',
      new RegExp(`Gathered 1 of ${count} answers?\\.`).test(status), status.trim());
    check('and says how many are still blank, rather than hiding a short gather',
      /still blank/.test(status));

    // ── The formatting the teacher reads in Canvas ─────────────────────────────
    group('The formatting the teacher reads in Canvas');

    const shape = await page.$eval('#brief-gather-output', out => {
      const heads = Array.from(out.querySelectorAll('h3')).map(h => h.textContent.trim());
      const strongs = Array.from(out.querySelectorAll('strong')).map(s => s.textContent.trim());
      const ems = Array.from(out.querySelectorAll('em')).map(e => e.textContent.trim());
      return { heads: heads, strongs: strongs, ems: ems, text: out.textContent };
    });

    check('each question gets its own heading',
      shape.heads.length === count && shape.heads[0] === 'The Brief, Question 1',
      shape.heads.join(' / '));

    const q1 = (await page.textContent('#question-q1')).trim();
    check('the question text is bold',
      shape.strongs.some(s => s === 'Question: ' + q1), q1.slice(0, 52) + '…');

    check("the student's response is italic",
      shape.ems.some(e => e.startsWith('The company chose to rank the feed')));

    check('a blank line in the response survives as two paragraphs, not a <br>',
      shape.ems.filter(e => /^(The company chose|Two causes point)/.test(e)).length === 2,
      shape.ems.length + ' italic runs');

    check('the confidence rating travels with the answer, in words',
      /Confidence: 4 of 5, Solid/.test(shape.text));

    // The confidence has to sit above the marker. Everything below "My response:"
    // is what the parser hashes against the footer, so a confidence line under it
    // reads as part of the student's writing and flags the answer as edited.
    check('and sits above the response marker, outside the hashed region',
      shape.text.indexOf('Confidence: 4 of 5') < shape.text.indexOf('My response:'));

    // A blank answer emits nothing rather than a placeholder, so it hashes clean and
    // the parser can call it BLANK instead of accusing the student of editing it.
    check('a blank answer leaves the response region empty, not filled with a note',
      !/No response recorded/.test(shape.text));

    // ── The record footer, read back by the real parser ────────────────────────
    group('The record footer, read back by the real parser');

    check('the paste carries the footer',
      /--- BECURRENT RECORD, do not edit ---/.test(shape.text)
      && /--- END BECURRENT RECORD ---/.test(shape.text));

    const expected = (shape.text.match(/\|expected=(\d+)\|/) || [])[1];
    check('it declares a computed expected count, matching the questions on the page',
      Number(expected) === count, `expected=${expected}, ${count} questions`);

    // This is the assertion that matters. The footer is only worth anything if the
    // parser the teacher actually runs reads it back, so the rich paste goes through
    // htmlToText and then the real parseSubmission, exactly the path a downloaded
    // Canvas submission takes.
    const html = await page.$eval('#brief-gather-output', out => out.innerHTML);
    const asCanvasWouldStoreIt = '<!DOCTYPE html><html><body>' + html + '</body></html>';
    const parsed = CORE.parseSubmission(
      CORE.htmlToText(asCanvasWouldStoreIt), 'studenttest_1_2_text.html');

    check('the parser finds a manifest rather than falling back',
      parsed.hasManifest === true, `hasManifest=${parsed.hasManifest}`);
    check('it reports the topic this brief belongs to',
      !!parsed.topicId, parsed.topicId);
    check('it recovers every slot the brief defines',
      parsed.responses.length === count, `${parsed.responses.length} of ${count}`);

    const q1row = parsed.responses.find(r => r.slotId === 'brief-q1');
    check('the typed response comes back intact',
      !!q1row && /chose to rank the feed/.test(q1row.response));
    check('and is not flagged as edited, which is the false positive to fear',
      !!q1row && !q1row.flags.includes('EDITED'), (q1row && q1row.flags.join(',')) || '');
    check('the confidence rating survives the round trip',
      !!q1row && q1row.confidence === '4', q1row && q1row.confidence);

    // A blank answer must come back flagged BLANK and NOT flagged EDITED. Getting
    // this the wrong way round tells the teacher a student tampered with work they
    // simply never wrote, which is the one error here worse than missing it.
    const blank = parsed.responses.find(r => r.slotId === 'brief-q2');
    check('a blank answer is reported rather than dropped',
      !!blank, blank ? `w=${blank.wordCount}` : 'missing');
    check('and is flagged BLANK, not EDITED',
      !!blank && blank.flags.includes('BLANK') && !blank.flags.includes('EDITED'),
      blank && blank.flags.join(','));

    // Two distinct signals, and they must not be confused. INCOMPLETE means records
    // are missing from the paste, which is a truncated copy. BLANK means the record
    // arrived and the student wrote nothing, which is a teaching problem rather than
    // a plumbing one. A brief gathered with two empty answers is complete and twice
    // blank, and the teacher needs to be told the second thing, not the first.
    const blanks = parsed.exceptions.filter(e => e.reason === 'BLANK');
    check('each unanswered question is reported as blank, one exception apiece',
      blanks.length === count - 1, blanks.map(e => e.slot).join(', '));
    check('and the paste is not called truncated, because nothing was truncated',
      !parsed.exceptions.some(e => e.reason === 'INCOMPLETE'
        || e.reason === 'COUNT_MISMATCH' || e.reason === 'MANIFEST_ALTERED'),
      parsed.exceptions.map(e => e.reason).join(', '));

    // The clipboard carries two flavours and both have to survive, because which one
    // Canvas keeps is not this repo's decision. A student on a device where the rich
    // copy was refused pastes the plain one, and it must parse to the same answer.
    const plain = await page.$eval('#brief-gather-output', out => out.dataset.plain);
    const fromPlain = CORE.parseSubmission(plain, 'studenttest_1_2_text.txt');
    const plainQ1 = fromPlain.responses.find(r => r.slotId === 'brief-q1');
    check('the plain-text flavour parses to the same answer as the rich one',
      fromPlain.hasManifest && !!plainQ1 && !plainQ1.flags.includes('EDITED'),
      plainQ1 ? `${fromPlain.responses.length} responses, flags ${plainQ1.flags.join(',') || 'none'}` : 'missing');

    // ── Nothing leaves the device ─────────────────────────────────────────────
    group('Nothing leaves the device');

    const src = fs.readFileSync(path.join(ROOT, briefPath.slice(1)), 'utf8');
    check('the brief makes no network call of any kind',
      !/\bfetch\s*\(/.test(src) && !/XMLHttpRequest/.test(src) && !/<form[^>]*\saction=/i.test(src));

    check('no uncaught page errors', pageErrors.length === 0, pageErrors.join(' | ') || 'none');
  } finally {
    await browser.close();
    server.close();
  }

  const passed = results.filter(Boolean).length;
  console.log(`\n  ${passed === results.length ? G : R}${W}${passed}/${results.length} passed${X}\n`);
  process.exit(passed === results.length ? 0 : 1);
})().catch(e => {
  console.error(`${R}  FAIL  ${e && e.stack ? e.stack : e}${X}`);
  process.exit(1);
});
