#!/usr/bin/env node
'use strict';

/**
 * Every generated file still reproduces exactly from its content module.
 *
 * This is the check that makes the generated content model actually hold. Without
 * it, a hand-edit to a generated week survives review, ships, appears to work,
 * and is then silently reverted by the next rebuild, weeks later, for no visible
 * reason. That failure mode is worse than either a rejected edit or an accepted
 * one, because the fix looked like it worked.
 *
 * Runs offline with no dependencies, so it sits in the push path.
 *
 *   node scripts/test/weeks-reproducible.test.js
 */

const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

console.log('\n  Generated weeks reproduce from their content modules\n');

const run = spawnSync(process.execPath, ['scripts/build-weeks.js', '--check'], {
  cwd: ROOT, encoding: 'utf8'
});

const out = (run.stdout || '') + (run.stderr || '');
process.stdout.write(out.split('\n').map(l => l ? '  ' + l : l).join('\n'));

if (run.status !== 0) {
  console.log(`\n  ${R}FAIL${X}  a generated file does not match its content module`);
  console.log(`  ${D}These files are generated. Edit scripts/lib/week-content/, then run:${X}`);
  console.log(`  ${D}  npm run build:weeks${X}\n`);
  process.exit(1);
}

console.log(`\n  ${G}PASS${X}  every generated file matches its content module\n`);
