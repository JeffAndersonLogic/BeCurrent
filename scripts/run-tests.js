#!/usr/bin/env node
'use strict';

/**
 * One command that runs the checks, so nobody has to remember all of them.
 *
 *   node scripts/run-tests.js offline    validate.js + the dependency-free tests
 *   node scripts/run-tests.js browser    the Chromium contracts
 *   node scripts/run-tests.js all        both suites
 *
 * The exit codes here are the point. A browser test exits 2 when playwright-core
 * is absent, which is a deliberate "skipped", not a failure: validate.js has to
 * stay runnable on a bare checkout, so the browser dependency is never installed
 * by default. This runner honours that. A skip prints as SKIP and does not fail.
 *
 * That tolerance is exactly wrong in CI, where playwright IS installed and a skip
 * means the install broke. `--strict` turns every skip into a failure, so a
 * browser job cannot pass green having run nothing at all.
 *
 *   node scripts/run-tests.js browser --strict
 */

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m', C = '\x1b[36m';
const W = '\x1b[1m', D = '\x1b[2m', X = '\x1b[0m';

// Two suites, because they have different dependency stories. Offline runs on a
// bare checkout; browser needs playwright-core and a Chromium binary.
const SUITES = {
  offline: [
    ['scripts/validate.js', 'structure, capture wiring, image integrity'],
    ['scripts/test/weeks-reproducible.test.js', 'generated weeks match their content modules'],
    ['scripts/test/video-block.test.js', 'video path through a brief, both states'],
    ['scripts/test/canvas-paragraphs.test.js', 'Canvas blank-line round trip, both course sentinels'],
    ['scripts/test/canvas-zip.test.js', 'zip reader + CLI/browser CSV parity'],
    ['scripts/test/canvas-events.test.js', 'calendar events: both flavours agree, nothing leaks']
  ],
  browser: [
    ['scripts/test/week-page.test.js', 'modal focus, scroll lock, deck, capture, footer round trip'],
    ['scripts/test/brief-gather.test.js', 'the brief\'s own route to Canvas: formatting, footer, parser round trip']
  ]
};

/**
 * Find the Chromium binary and hand it to the tests through PW_CHROME.
 *
 * Asking playwright-core where its own binary lives is correct by construction,
 * because it is the same module the tests import. Scanning a directory layout is
 * version-locked: Playwright 1.53 renamed chrome-linux to chrome-linux64, so an
 * assumed path fails with a missing-executable error that reads like a broken
 * install rather than a stale path. The scan stays as a second try, widened to
 * both layouts.
 */
function findChromium() {
  if (process.env.PW_CHROME) return process.env.PW_CHROME;

  try {
    const p = require('playwright-core').chromium.executablePath();
    if (p && fs.existsSync(p)) return p;
  } catch (_) { /* playwright-core absent; the tests report that themselves */ }

  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!fs.existsSync(base)) return null;

  const builds = fs.readdirSync(base)
    .filter(d => /^chromium-\d+$/.test(d))
    .sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1]))
    .reverse();

  for (const build of builds) {
    for (const layout of ['chrome-linux64', 'chrome-linux']) {
      const exe = path.join(base, build, layout, 'chrome');
      if (fs.existsSync(exe)) return exe;
    }
  }
  return null;
}

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const which = args.find(a => !a.startsWith('-')) || 'offline';

const names = which === 'all' ? ['offline', 'browser'] : [which];
if (names.some(n => !SUITES[n])) {
  console.error(`Unknown suite "${which}". Expected: offline, browser, all.`);
  process.exit(2);
}

const results = [];

// Resolved once, not per test, so the browser tests cannot disagree about which
// binary they are driving.
const childEnv = { ...process.env };
if (names.includes('browser')) {
  const exe = findChromium();
  if (exe) childEnv.PW_CHROME = exe;
}

for (const suite of names) {
  console.log(`\n${C}${W}── ${suite} ${X}${D}(${SUITES[suite].length} checks)${X}`);

  // An empty suite must never pass under --strict. The whole point of the flag is
  // that a job cannot report green having verified nothing, and "the suite has no
  // tests in it" is the most complete version of running nothing there is.
  if (!SUITES[suite].length) {
    if (strict) {
      console.error(`${R}${W}FAIL${X} the ${suite} suite is empty, and --strict forbids passing on zero checks.`);
      console.error(`${D}Add the ${suite} tests, or drop the ${suite} job from CI until they exist.${X}`);
      process.exit(1);
    }
    console.log(`${Y}   no checks in this suite yet${X}`);
    continue;
  }
  if (suite === 'browser') {
    console.log(`${D}chromium: ${childEnv.PW_CHROME || 'not found, tests will report it'}${X}`);
  }

  for (const [rel, blurb] of SUITES[suite]) {
    const started = Date.now();
    // stdio inherit: a failing check's own output is the useful part, and these
    // scripts already print well. Swallowing it to re-print a summary would lose
    // the file and line every one of them reports.
    const run = spawnSync(process.execPath, [rel], { cwd: ROOT, stdio: 'inherit', env: childEnv });
    const secs = ((Date.now() - started) / 1000).toFixed(1);

    // spawnSync reports a launch failure through .error and a signal kill through
    // .signal, in both of which cases status is null. Neither is a pass.
    let code;
    if (run.error) code = 1;
    else if (run.status === null) code = 1;
    else code = run.status;

    const skipped = code === 2 && !strict;
    const state = code === 0 ? 'PASS' : skipped ? 'SKIP' : 'FAIL';
    results.push({ rel, blurb, state, code, secs });

    const tint = state === 'PASS' ? G : state === 'SKIP' ? Y : R;
    console.log(`${tint}${W}${state}${X} ${rel} ${D}${secs}s, ${blurb}${X}`);
  }
}

// ── summary ───────────────────────────────────────────────────────────────────
const failed = results.filter(r => r.state === 'FAIL');
const skipped = results.filter(r => r.state === 'SKIP');
const passed = results.filter(r => r.state === 'PASS');

console.log(`\n${'─'.repeat(60)}`);
console.log(
  `${W}Summary${X}  |  ${G}${passed.length} passed${X}` +
  (skipped.length ? `, ${Y}${skipped.length} skipped${X}` : '') +
  (failed.length ? `, ${R}${failed.length} failed${X}` : '')
);

if (skipped.length) {
  console.log(`${Y}Skipped checks needed a browser: npm i playwright-core${X}`);
  console.log(`${D}Run with --strict to make a missing browser a failure.${X}`);
}

if (failed.length) {
  for (const f of failed) console.log(`${R}  ✗ ${f.rel} (exit ${f.code})${X}`);
  process.exit(1);
}

console.log(`${G}${W}All checks passed.${X}`);
