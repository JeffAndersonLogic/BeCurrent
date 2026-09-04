#!/usr/bin/env node
'use strict';

/**
 * Build and verify the custom Reverse History browser layer.
 *
 * The narrative pages are intentionally bespoke, but their response fields must
 * agree exactly with the canonical Iran content module. The generated browser
 * layer supplies targets, criteria, autosave, progress, and the shared Canvas
 * record grammar to all eight pages.
 */
const fs = require('fs');
const path = require('path');
const unit = require('./lib/unit-content/iran');
const { renderIranBrowser, renderIranData } = require('./lib/iran-topic-page');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const TARGET = path.join(ROOT, 'assets', 'js', 'iran-topics.js');
const expected = renderIranBrowser(unit);
const DATA_TARGET = path.join(ROOT, 'assets', 'data', 'iran-unit.js');
const expectedData = renderIranData(unit);
const problems = [];

function groupsIn(src) {
  return [...src.matchAll(/data-group="([^"]+)"/g)].map(m => m[1]);
}

(unit.topics || []).forEach(topic => {
  const rel = path.join('iran', topic.page);
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    problems.push(`${rel} is missing`);
    return;
  }
  const src = fs.readFileSync(full, 'utf8');
  const topicId = `topic-${String(topic.n).padStart(2, '0')}`;
  if (!src.includes(`data-topic="${topicId}"`)) problems.push(`${rel} does not declare ${topicId}`);
  const actualGroups = groupsIn(src);
  const expectedGroups = (topic.questions || []).map(q => q.group);
  if (JSON.stringify(actualGroups) !== JSON.stringify(expectedGroups)) {
    problems.push(`${rel} filings are [${actualGroups.join(', ')}], expected [${expectedGroups.join(', ')}]`);
  }
  if (!/assets\/css\/becurrent-brand\.css/.test(src)) problems.push(`${rel} does not link the shared brand stylesheet`);
  if (!/assets\/js\/iran-topics\.js/.test(src)) problems.push(`${rel} does not load the Reverse History browser layer`);
});

const existing = fs.existsSync(TARGET) ? fs.readFileSync(TARGET, 'utf8') : '';
const existingData = fs.existsSync(DATA_TARGET) ? fs.readFileSync(DATA_TARGET, 'utf8') : '';
if (CHECK) {
  if (existing !== expected) problems.push('assets/js/iran-topics.js has drifted; run node scripts/build-iran.js');
  if (existingData !== expectedData) problems.push('assets/data/iran-unit.js has drifted; run node scripts/build-iran.js');
  if (problems.length) {
    console.error('\nIran Reverse History integration is incomplete:\n');
    problems.forEach(p => console.error(`  ✗ ${p}`));
    process.exit(1);
  }
  console.log('✓ Iran topics match their content module and generated browser layer.');
  process.exit(0);
}

if (problems.length) {
  console.error('\nCannot build Iran until the page contract is fixed:\n');
  problems.forEach(p => console.error(`  ✗ ${p}`));
  process.exit(1);
}

if (existing === expected) console.log('✓ assets/js/iran-topics.js already up to date.');
else {
  fs.writeFileSync(TARGET, expected, 'utf8');
  console.log('  wrote assets/js/iran-topics.js');
}
if (existingData === expectedData) console.log('✓ assets/data/iran-unit.js already up to date.');
else {
  fs.mkdirSync(path.dirname(DATA_TARGET), { recursive: true });
  fs.writeFileSync(DATA_TARGET, expectedData, 'utf8');
  console.log('  wrote assets/data/iran-unit.js');
}
