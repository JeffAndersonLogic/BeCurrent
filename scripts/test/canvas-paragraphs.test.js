#!/usr/bin/env node
/**
 * canvas-paragraphs.test.js
 *
 * Paragraph preservation is the one corruption class the record manifest cannot
 * catch on its own. The hash normalizes whitespace before hashing, deliberately,
 * because Canvas rewraps lines and a hash that moved every time it did would
 * flag every clean submission. The cost of that choice is that a response which
 * arrives back as one paragraph instead of two still hashes green.
 *
 * So paragraph structure needs its own check, and it splits in two:
 *
 *   1. Does Canvas keep the break?  Only a real round trip answers that, and the
 *      first run on 2026-08-07 left it uncovered because every answer in it was
 *      a single paragraph. What that run did establish is that Canvas kept 39
 *      adjacent <p> siblings out of 50 stored elements, including all nine
 *      "My response:" labels sitting next to the paragraph beneath them. A
 *      two-paragraph answer reaches Canvas through the same mechanism:
 *      paragraphsHtml() in both renderers emits <p>a</p><p>b</p> on the HTML
 *      clipboard flavour, which is the adjacency Canvas already preserved.
 *
 *   2. Does the parser recover the break?  That is this file, and it is settled
 *      locally. htmlToText has to turn every markup shape Canvas might choose
 *      back into a blank line, and it must not invent one from a soft break.
 *
 * Runs offline, no browser, no dependencies.
 *
 *   node scripts/test/canvas-paragraphs.test.js
 */

'use strict';

const { bhHash, htmlToText, parseSubmission } = require('../parse-canvas-submissions');

const results = [];
function check(name, pass, detail) {
  results.push(pass);
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`);
}

const LABEL = 'Module 06, Claim &amp; Evidence';
const PROMPT = 'Separate the reporting from the claim. Which sentence in the brief is a verifiable fact, and which is an interpretation?';
const PARA_1 = 'The story centers on the Red Sea shipping lane.';
const PARA_2 = 'That lane carries roughly twelve percent of global trade, so a closure is felt far from the coast.';

// What the student typed, and therefore what has to come back out.
const TYPED = PARA_1 + '\n\n' + PARA_2;

// The manifest the Gather panel would have written for it. Built with the same
// hash the renderers use, so this is the real contract and not a restatement.
function manifest(response) {
  const rh = bhHash(response);
  const ph = bhHash(PROMPT);
  const rec = `#BHR|i=06|slot=claims-response|lab=${LABEL}|w=20|c=${response.replace(/\s+/g, ' ').trim().length}|ph=${ph}|rh=${rh}|cf=4|#`;
  const sum = bhHash('claims-response:' + rh);
  return [
    '<p>--- BECURRENT RECORD, do not edit ---</p>',
    `<p>#BHV|v=1|topic=w01|copied=2026-08-07T14:38:32.878Z|items=1|expected=1|sum=${sum}|#</p>`,
    '<p>' + rec + '</p>'
  ].join('\n');
}

// The document as Canvas stores it, with `body` standing in for whatever markup
// the editor chose for the response itself.
function submission(body) {
  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>',
    '<p><strong>CURRENT EVENTS, WEEK 01</strong></p>',
    '<p><em>Student work, copied 8/7/2026, 10:38:32 AM</em></p>',
    '<hr>',
    `<p><strong>${LABEL}</strong></p>`,
    `<p><strong>Question:</strong> <em>${PROMPT}</em></p>`,
    '<p><strong>My response:</strong></p>',
    body,
    '<hr>',
    manifest(TYPED),
    '</body></html>'
  ].join('\n');
}

function run(body) {
  const parsed = parseSubmission(htmlToText(submission(body)), 'studenttest_1_2_text.html');
  const row = parsed.responses[0] || { response: '', flags: ['NO_ROW'] };
  return {
    paragraphs: row.response.split(/\n{2,}/).filter(Boolean),
    flags: row.flags,
    exceptions: parsed.exceptions
  };
}

console.log('\n  Canvas paragraph shapes, all of which must round-trip to one blank line\n');

// Every shape Canvas's rich content editor is known to emit for a blank line.
// The first is what paragraphsHtml() puts on the clipboard and what the
// 2026-08-07 submission shows Canvas keeping; the rest are what it may rewrite
// that into.
[
  [`<p>${PARA_1}</p>\n<p>${PARA_2}</p>`, 'two adjacent <p> siblings'],
  [`<p>${PARA_1}<br><br>${PARA_2}</p>`, 'a double <br> inside one <p>'],
  [`<p>${PARA_1}<br />\n<br />${PARA_2}</p>`, 'self-closing <br> pair'],
  [`<p>${PARA_1}</p>\n\n<p>&nbsp;</p>\n\n<p>${PARA_2}</p>`, 'an empty spacer <p> between them'],
  [`<div>${PARA_1}</div><div>${PARA_2}</div>`, 'divs instead of paragraphs']
].forEach(([body, name]) => {
  const r = run(body);
  const ok = r.paragraphs.length === 2
    && r.paragraphs[0] === PARA_1
    && r.paragraphs[1] === PARA_2;
  check(name, ok, `${r.paragraphs.length} paragraph${r.paragraphs.length === 1 ? '' : 's'}`);
});

console.log('\n  And the shape that must NOT become a break\n');

const soft = run(`<p>${PARA_1}<br>${PARA_2}</p>`);
check('a single <br> stays one paragraph', soft.paragraphs.length === 1,
  `${soft.paragraphs.length} paragraph${soft.paragraphs.length === 1 ? '' : 's'}`);

console.log('\n  The manifest still verifies through the break\n');

// The hash normalizes whitespace, so a recovered break must not move it and a
// lost break must not be hidden by it. Both halves of that are worth stating.
const clean = run(`<p>${PARA_1}</p>\n<p>${PARA_2}</p>`);
check('no EDITED flag on a two-paragraph response',
  !clean.flags.includes('EDITED'), clean.flags.join(';') || 'no flags');
check('no exceptions raised', clean.exceptions.length === 0,
  clean.exceptions.map(e => e.reason).join(';') || 'none');

// The honest limitation, asserted rather than described: if Canvas ever did
// flatten the break, the hash would still pass. That is precisely why this file
// exists and why the round-trip runbook asks for a blank line in one answer.
const flattened = htmlToText(`<p>${PARA_1} ${PARA_2}</p>`);
check('a flattened break still hashes clean, so the hash cannot police this',
  bhHash(flattened) === bhHash(TYPED));

console.log('\n  One parser, both courses\n');

// scripts/lib/canvas-parse-core.js is shared with BeHistorical on purpose, so a
// teacher can drop either course's submissions.zip on the same tool. The machine
// grammar is identical; only the human-readable sentinel differs, because that
// line is visible in the student's paste. Both must cut the body at the footer,
// or the record lines get read back as if they were the student's writing.
[
  ['BECURRENT', 'this course'],
  ['BEHISTORICAL', 'a BeHistorical paste on the same tool']
].forEach(([word, why]) => {
  const swapped = submission(`<p>${PARA_1}</p>\n<p>${PARA_2}</p>`)
    .replace('--- BECURRENT RECORD', '--- ' + word + ' RECORD');
  const parsed = parseSubmission(htmlToText(swapped), 'studenttest_1_2_text.html');
  const row = parsed.responses[0] || { response: '' };
  check(`${word} sentinel cuts the body cleanly, ${why}`,
    row.response === TYPED && parsed.exceptions.length === 0,
    parsed.exceptions.map(e => e.reason).join(';') || 'no exceptions');
});

const failed = results.filter(r => !r).length;
console.log(`\n  ${results.length - failed}/${results.length} passed\n`);
process.exit(failed ? 1 : 0);
