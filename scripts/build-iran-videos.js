#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const catalog = require('./lib/unit-content/iran-videos');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const browserTarget = path.join(ROOT, 'assets', 'data', 'iran-videos.js');
const planTarget = path.join(ROOT, 'docs', 'lesson-plans', 'iran-videos.md');

function browserSource(){
  return `// GENERATED from scripts/lib/unit-content/iran-videos.js.\n// Rebuild with node scripts/build-iran-videos.js. Do not hand-edit.\nwindow.BECURRENT_IRAN_VIDEOS=${JSON.stringify(catalog)};\n`;
}

function planSource(){
  const lines = [
    '# Iran at War — Video Launch Plan',
    '',
    '**Generated from `scripts/lib/unit-content/iran-videos.js`. Do not hand-edit.**',
    '',
    `Last launch audit: **${catalog.reviewed}**`,
    '',
    'This is the video companion to `docs/lesson-plans/iran.md`. It exists separately so the main lesson-plan generator can remain focused on targets, criteria, and filings while all video metadata still has exactly one source of truth.',
    ''
  ];
  Object.entries(catalog.topics).forEach(([id, topic]) => {
    lines.push(`## ${id.replace('topic-0','Topic ').replace('topic-','Topic ')} — ${topic.heading}`, '', topic.intro, '');
    topic.videos.forEach((v, i) => {
      lines.push(`### ${i + 1}. ${v.title}`, '', `- **Status:** ${v.status}`, `- **Source:** ${v.source}`, `- **Runtime:** ${v.runtime}`, `- **URL:** ${v.url}`, `- **Why:** ${v.why}`, `- **Listen for:** ${v.listen.join(' · ')}`, `- **After watching:** ${v.after}`, `- **Last verified:** ${v.verified || catalog.reviewed}`, '');
    });
  });
  return lines.join('\n') + '\n';
}

const expected = [[browserTarget, browserSource()], [planTarget, planSource()]];
let drift = false;
for (const [target, text] of expected) {
  const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  if (existing === text) {
    console.log(`✓ ${path.relative(ROOT, target)} up to date`);
  } else if (CHECK) {
    drift = true;
    console.error(`✗ ${path.relative(ROOT, target)} has drifted; run node scripts/build-iran-videos.js`);
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, text, 'utf8');
    console.log(`wrote ${path.relative(ROOT, target)}`);
  }
}
if (drift) process.exit(1);
