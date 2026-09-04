#!/usr/bin/env node
'use strict';

/**
 * Rebuild every unit's Briefs from its content module.
 *
 * A unit is a theme that runs several topics, one per 90-minute class
 * meeting. Not every topic needs a Brief, so the content module carries only the
 * topics that have one. Topic 1 of Social Media is a slide deck and a paper trace,
 * Topic 2 is a film; neither needs a reading, and neither appears here.
 *
 * This is deliberately separate from build-weeks.js. Weeks and units are different
 * shapes and sharing one builder would mean one of them bending.
 *
 * Emits, per unit: an index.html mapping the whole arc, and a Brief plus capture
 * wrapper for each topic that carries one.
 *
 *   node scripts/build-units.js            write the files
 *   node scripts/build-units.js --check    fail on drift, write nothing
 */

const fs = require('fs');
const path = require('path');

const { renderUnitBrief, renderUnitWrapper } = require('./lib/unit-brief-page');
const { renderUnitPage, briefFileFor } = require('./lib/unit-page');

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

  // Reverse History units deliberately keep bespoke narrative pages. They still
  // participate in every shared data pipeline, but this generic Brief builder
  // must never flatten or overwrite their investigation design.
  if (unit.meta.renderer === 'reverse-history') {
    (unit.topics || []).forEach(topic => {
      const rel = path.join(dir, topic.page || '');
      if (topic.page && fs.existsSync(path.join(ROOT, rel))) return;
      const reason = topic.page ? 'missing custom topic page' : 'missing topic.page contract';
      if (CHECK) drift.push({ rel: topic.page ? rel : `${dir}/topic-${topic.n}`, reason });
      else throw new Error(`${file}: Topic ${topic.n} ${reason}.`);
    });
    return;
  }

  // The unit page is the map of the whole arc and always exists.
  emit(path.join(dir, 'index.html'), renderUnitPage(unit));

  // A Brief only for the topics that carry one. Topic 1 is a slide deck and a paper
  // trace, Topic 2 is a film; generating an empty reading for either would put a
  // dead card on the unit page.
  (unit.topics || []).forEach(topic => {
    if (!(topic.sections && topic.sections.length)) return;
    const briefFile = briefFileFor(topic);
    emit(path.join(dir, briefFile), renderUnitBrief(unit, topic));
    emit(path.join(dir, briefFile.replace(/\.html$/, '-capture.html')),
      renderUnitWrapper(unit, topic, briefFile));
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
