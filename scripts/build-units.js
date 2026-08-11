#!/usr/bin/env node
'use strict';

/**
 * Rebuild every unit's Briefs from its content module.
 *
 * A unit is a theme that runs several blocks; a block is one 90-minute class
 * meeting. Not every block needs a Brief, so the content module carries only the
 * blocks that have one. Block 1 of Social Media is a slide deck and a paper trace,
 * Block 2 is a film; neither needs a reading, and neither appears here.
 *
 * This is deliberately separate from build-weeks.js. Weeks and units are different
 * shapes and sharing one builder would mean one of them bending.
 *
 *   node scripts/build-units.js            write the files
 *   node scripts/build-units.js --check    fail on drift, write nothing
 */

const fs = require('fs');
const path = require('path');

const { renderUnitBrief, renderUnitWrapper } = require('./lib/unit-brief-page');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'scripts', 'lib', 'unit-content');
const CHECK = process.argv.includes('--check');

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

function slugify(s) {
  return String(s).toLowerCase().replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const drift = [];
const wrote = [];

function emit(rel, content) {
  const full = path.join(ROOT, rel);
  const existing = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
  if (existing === content) return;
  if (CHECK) {
    drift.push({ rel, reason: existing === null ? 'missing' : 'differs from the content module' });
    return;
  }
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  wrote.push(rel);
}

function contentFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js')).sort();
}

const files = contentFiles();
if (!files.length) {
  console.log(`${D}No unit content in scripts/lib/unit-content/, nothing to build.${X}`);
  process.exit(0);
}

files.forEach(file => {
  const unit = require(path.join(CONTENT_DIR, file));
  const dir = unit.meta.unitKey;

  (unit.blocks || []).forEach(block => {
    const nn = String(block.n).padStart(2, '0');
    const briefFile = `block-${nn}-brief-${block.slug || slugify(block.block)}.html`;
    emit(path.join(dir, briefFile), renderUnitBrief(unit, block));
    emit(path.join(dir, briefFile.replace(/\.html$/, '-capture.html')),
      renderUnitWrapper(unit, block, briefFile));
  });
});

if (CHECK) {
  if (drift.length) {
    console.error(`\n${R}Generated unit files have drifted from their content modules.${X}\n`);
    drift.forEach(d => console.error(`  ${R}✗${X} ${d.rel} ${D}(${d.reason})${X}`));
    console.error(`\n${D}These files are generated. Edit scripts/lib/unit-content/ and run:${X}`);
    console.error(`  node scripts/build-units.js\n`);
    process.exit(1);
  }
  console.log(`${G}✓${X} unit briefs reproduce exactly from their content modules.`);
  process.exit(0);
}

if (!wrote.length) {
  console.log(`${G}✓${X} Already up to date.`);
} else {
  wrote.forEach(w => console.log(`  ${G}wrote${X} ${w}`));
  console.log(`\n${G}✓${X} ${wrote.length} file${wrote.length === 1 ? '' : 's'} written.`);
}
