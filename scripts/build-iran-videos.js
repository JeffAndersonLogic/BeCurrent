#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const catalog = require('./lib/iran-video-content');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const browserTarget = path.join(ROOT, 'assets', 'data', 'iran-videos.js');
const planTarget = path.join(ROOT, 'docs', 'lesson-plans', 'iran-videos.md');

function browserSource(){
  return `// GENERATED from scripts/lib/iran-video-content.js.\n// Rebuild with node scripts/build-iran-videos.js. Do not hand-edit.\nwindow.BECURRENT_IRAN_VIDEOS=${JSON.stringify(catalog)};\n`;
}

function planSource(){
  const lines = [
    '# Iran at War — Video Launch Plan',
    '',
    '**Generated from `scripts/lib/iran-video-content.js`. Do not hand-edit.**',
    '',
    `Last launch audit: **${catalog.reviewed}**`,
    '',
    'This is the video companion to `docs/lesson-plans/iran.md`. The main lesson plan remains focused on targets, criteria, and filings; this file carries the shared video pacing and launch metadata used by the student video-forward layer.',
    ''
  ];
  Object.entries(catalog.topics).forEach(([id, topic]) => {
    const n = Number(id.slice(-2));
    lines.push(`## Topic ${n} — ${topic.heading}`, '', topic.intro, '');
    topic.videos.forEach(v => {
      lines.push(`- **${v.status} · ${v.runtime} · ${v.source}** — ${v.title}`);
      lines.push(`  ${v.url}`);
    });
    lines.push('');
  });
  lines.push('## Pre-unit launch check', '', '```bash', 'node scripts/check-iran-videos.js', 'node scripts/check-iran-videos.js --live', 'node scripts/check-iran-videos.js --live --required-only', '```', '', 'The live check confirms configured URLs respond. Always do one final student-Chromebook check for district filtering, authentication, captions, and YouTube restrictions.', '');
  return lines.join('\n');
}

const expected = [[browserTarget, browserSource()], [planTarget, planSource()]];
let drift = false;
for (const [target, text] of expected) {
  const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  if (existing === text) console.log(`✓ ${path.relative(ROOT, target)} up to date`);
  else if (CHECK) { drift = true; console.error(`✗ ${path.relative(ROOT, target)} has drifted; run node scripts/build-iran-videos.js`); }
  else { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text, 'utf8'); console.log(`wrote ${path.relative(ROOT, target)}`); }
}
if (drift) process.exit(1);
