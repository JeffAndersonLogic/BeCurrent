#!/usr/bin/env node
'use strict';

/**
 * Build the publication-first BeCurrent front door from its locked source template.
 * Current headlines hydrate in the browser from assets/data/daily-news.js, so the
 * publication shell stays stable while the daily news file remains the one small
 * teacher-maintained current layer.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'scripts', 'lib', 'publication-home.html');
const TARGET = path.join(ROOT, 'index.html');
const CHECK = process.argv.includes('--check');
const content = fs.readFileSync(SOURCE, 'utf8');
const existing = fs.existsSync(TARGET) ? fs.readFileSync(TARGET, 'utf8') : '';
if (CHECK) {
  if (existing !== content) {
    console.error('\nindex.html has drifted from scripts/lib/publication-home.html.');
    console.error('Run: node scripts/build-index.js\n');
    process.exit(1);
  }
  console.log('✓ index.html reproduces exactly from the publication template.');
  process.exit(0);
}
if (existing === content) console.log('✓ index.html already up to date.');
else { fs.writeFileSync(TARGET, content, 'utf8'); console.log('  wrote index.html'); }
