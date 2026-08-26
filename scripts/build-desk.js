#!/usr/bin/env node
'use strict';

/**
 * Rebuild The Desk from scripts/lib/desk-content.js.
 *
 * One page, one content module, no dates. The Desk is the daily half of a block
 * and it is a protocol rather than content, which is the reason it is a single
 * generated page and the units are not. The long version of that argument is at
 * the top of the content module.
 *
 *   node scripts/build-desk.js            write the file
 *   node scripts/build-desk.js --check    fail on drift, write nothing
 */

const fs = require('fs');
const path = require('path');

const { renderDeskPage } = require('./lib/desk-page');
const DESK = require('./lib/desk-content');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const OUT = path.join('daily', 'index.html');

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

const content = renderDeskPage(DESK);
const full = path.join(ROOT, OUT);
const existing = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;

if (CHECK) {
  if (existing === content) {
    console.log(`${G}✓${X} The Desk reproduces exactly from its content module.`);
    process.exit(0);
  }
  console.error(`\n${R}The Desk has drifted from its content module.${X}\n`);
  console.error(`  ${R}✗${X} ${OUT} ${D}(${existing === null ? 'missing' : 'differs'})${X}`);
  console.error(`\n${D}That file is generated. Edit scripts/lib/desk-content.js and run:${X}`);
  console.error(`  node scripts/build-desk.js\n`);
  process.exit(1);
}

if (existing === content) {
  console.log(`${G}✓${X} Already up to date.`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(full), { recursive: true });
fs.writeFileSync(full, content, 'utf8');
console.log(`  ${G}wrote${X} ${OUT}\n\n${G}✓${X} The Desk written from 1 content module.`);
