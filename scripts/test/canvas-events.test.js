#!/usr/bin/env node
'use strict';

/**
 * The Canvas calendar events, both flavours, and the two things that must not be in
 * either of them.
 *
 * The markdown carries each event in a ```html fence to be copied by hand; the HTML
 * carries the same event in a textarea behind a copy button. If those two ever hold
 * different markup, a teacher gets a different event depending on which file they
 * happened to open, and nothing else in the repo would notice: both files build,
 * both render, both look right. So the parity is asserted rather than trusted to the
 * fact that one function currently produces both.
 *
 * The other two assertions are content-safety. The generator already refuses to
 * write either file when they fail, but that check lives in the generator, and this
 * one reads what is actually on disk. A file committed before the guard existed
 * would pass the generator and fail here, which is the right way round.
 *
 * Runs offline with no dependencies, so it sits in the push path.
 *
 *   node scripts/test/canvas-events.test.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const R = '\x1b[31m', G = '\x1b[32m', C = '\x1b[36m', W = '\x1b[1m', D = '\x1b[2m', X = '\x1b[0m';

const results = [];
// Returns the verdict, which matters: callers write `if (!check(...)) return;` to stop
// when a prerequisite is missing, and a check that returned undefined would make every
// one of those bail out on a pass. That bug hid this whole file behind its own first
// assertion once already.
function check(name, pass, detail) {
  results.push(pass);
  console.log(`  ${pass ? G + 'PASS' + X : R + 'FAIL' + X}  ${name}${detail ? D + '  (' + detail + ')' + X : ''}`);
  return pass;
}

// Every unit that has generated events. Discovered rather than named, so adding the
// next unit's events cannot leave this test quietly checking only Social Media.
const EVENTS_DIR = path.join(ROOT, 'docs', 'canvas');

function units() {
  if (!fs.existsSync(EVENTS_DIR)) return [];
  return fs.readdirSync(EVENTS_DIR)
    .filter(f => f.endsWith('-calendar-events.md'))
    .map(f => f.replace(/-calendar-events\.md$/, ''));
}

// A textarea's .value is the unescaped text, which is what reaches the clipboard and
// therefore what has to match the markdown fence.
function unescape(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

console.log(`\n${C}${W}Canvas calendar events${X}`);

const found = units();
// An empty run must fail rather than pass. A test that silently checks nothing is
// the same failure as a browser job passing green having run nothing.
if (!found.length) {
  console.log(`\n  ${R}FAIL${X}  no *-calendar-events.md found in docs/canvas/\n`);
  process.exit(1);
}

const withheld = new Set();
const unitDir = path.join(ROOT, 'scripts', 'lib', 'unit-content');
if (fs.existsSync(unitDir)) {
  fs.readdirSync(unitDir).filter(f => f.endsWith('.js')).forEach(f => {
    const unit = require(path.join(unitDir, f));
    (unit.topics || []).forEach(t => (t.withholdTitles || []).forEach(x => withheld.add(x)));
  });
}

found.forEach(unit => {
  console.log(`\n  ${C}${unit}${X}\n`);

  const mdFile = path.join(EVENTS_DIR, `${unit}-calendar-events.md`);
  const htmlFile = path.join(EVENTS_DIR, `${unit}-calendar-events.html`);

  const md = fs.readFileSync(mdFile, 'utf8');
  if (!check('the HTML flavour exists beside the markdown', fs.existsSync(htmlFile))) return;
  const html = fs.readFileSync(htmlFile, 'utf8');

  const mdTables = [...md.matchAll(/```html\n([\s\S]*?)\n```/g)].map(m => m[1]);
  const htmlTables = [...html.matchAll(/<textarea id="raw-[^"]*" class="raw"[^>]*>([\s\S]*?)<\/textarea>/g)]
    .map(m => unescape(m[1]));
  const previews = [...html.matchAll(/<div class="preview">\n([\s\S]*?)\n {4}<\/div>/g)].map(m => m[1]);

  check('the markdown carries at least one event', mdTables.length >= 1, `${mdTables.length} events`);
  check('the HTML carries one copy field per event',
    htmlTables.length === mdTables.length, `${htmlTables.length} of ${mdTables.length}`);
  check('and one preview per event',
    previews.length === mdTables.length, `${previews.length} of ${mdTables.length}`);

  // The assertion this file exists for.
  const mismatched = mdTables
    .map((t, i) => (t === htmlTables[i] ? null : i + 1))
    .filter(Boolean);
  check('every event is byte-identical across the two flavours',
    mismatched.length === 0,
    mismatched.length ? `block ${mismatched.join(', ')} differs` : `${mdTables.length} events`);

  // What the teacher sees previewed has to be what the copy button hands over, or
  // the preview is decoration rather than a check.
  check('the preview shows exactly what the copy button copies',
    previews.every((p, i) => p === htmlTables[i]));

  // Every event must actually be a Canvas table, not an empty shell.
  check('every event is a real five-row table',
    mdTables.every(t => /^<table style="border-collapse/.test(t)
      && (t.match(/<h3>/g) || []).length === 5),
    mdTables.map(t => (t.match(/<h3>/g) || []).length).join('/'));

  // ── Content safety, read off disk ───────────────────────────────────────────
  [['markdown', md], ['HTML', html]].forEach(([label, text]) => {
    const leaked = [...withheld].filter(t => text.includes(t));
    check(`no withheld title in the ${label}`,
      leaked.length === 0, leaked.join(', ') || `${withheld.size} guarded`);

    // BeCurrent is not an AP course, and these get pasted where students read them.
    const ap = text.match(/\bAP\b|Advanced Placement/);
    check(`no AP framing in the ${label}`, !ap, ap ? ap[0] : 'clean');
  });

  // The HTML has to survive being opened as a bare file on a machine that has never
  // seen this repo, which means no request to anything.
  check('the HTML makes no third-party request',
    !/<link[^>]+href="http/i.test(html)
    && !/<script[^>]+src=/i.test(html)
    && !/\bfetch\s*\(/.test(html)
    && !/XMLHttpRequest/.test(html)
    && !/@import/.test(html));
});

const passed = results.filter(Boolean).length;
console.log(`\n  ${passed === results.length ? G : R}${W}${passed}/${results.length} passed${X}\n`);
process.exit(passed === results.length ? 0 : 1);
