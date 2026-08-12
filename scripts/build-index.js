#!/usr/bin/env node
'use strict';

/**
 * The front door.
 *
 * Its own builder because it is the one page that has to know about BOTH content
 * models: theme units, which are the spine of the course, and weeks, which is where
 * the orientation reading lives. Generating it from inside build-weeks.js meant the
 * front door could not see a unit, so a unit page shipped orphaned and reachable
 * only by typing its URL.
 *
 * Generated rather than hand-maintained for the reason stated in the AndersonLogic
 * operating rules: a surface that has to be written to in order to stay current does
 * not ship. Add a unit or a week and the front door updates itself.
 *
 *   node scripts/build-index.js            write index.html
 *   node scripts/build-index.js --check    fail on drift, write nothing
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WEEK_DIR = path.join(ROOT, 'scripts', 'lib', 'week-content');
const UNIT_DIR = path.join(ROOT, 'scripts', 'lib', 'unit-content');
const CHECK = process.argv.includes('--check');

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function raw(s) { return String(s == null ? '' : s); }

function load(dir, re) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => re.test(f)).sort().map(f => {
    try { return require(path.join(dir, f)); } catch (e) { return null; }
  }).filter(Boolean);
}

function renderIndex(units, weeks) {
  const unitCards = units.map(u => {
    const m = u.meta;
    const blocks = (u.blocks || []).length;
    const briefs = (u.blocks || []).filter(b => b.sections && b.sections.length).length;
    return `        <a class="unit-card" href="${esc(m.unitKey)}/index.html">
          <span class="unit-kicker">Unit &middot; ${esc(String(m.blocks || blocks))} blocks</span>
          <h3>${esc(m.unit)}</h3>
          <p>${esc(m.terminalQuestion || m.overview || '')}</p>
          <span class="unit-meta">${esc(String(briefs))} briefs &middot; ${esc(String(blocks - briefs))} on paper</span>
        </a>`;
  }).join('\n');

  const weekCards = weeks.map(w => {
    const nn = String(w.meta.weekNumber).padStart(2, '0');
    return `        <a class="week-card" href="week-${nn}/index.html">
          <span class="week-num">Week ${nn} &middot; ${esc(w.meta.dateRange || '')}</span>
          <h3>${esc(w.meta.title)}</h3>
          <p>${esc(w.meta.subtitle || '')}</p>
        </a>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BeCurrent | Current Events</title>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/becurrent-brand.css">
<link rel="stylesheet" href="assets/css/becurrent.css">
</head>
<body>
<div class="site-shell">

  <header class="topbar">
    <nav class="nav">
      <a class="brand-mini" href="index.html" aria-label="BeCurrent home">
        <img src="assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="4889" height="810">
      </a>
      <div class="nav-links">
${units.length ? '        <a href="#units">Units</a>\n' : ''}${weeks.length ? '        <a href="#weeks">Weeks</a>\n' : ''}        <a href="#how">How This Works</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <h1 class="hero-wordmark"><img src="assets/images/brand/becurrent-wordmark-ink.svg" alt="BeCurrent" width="4889" height="810"></h1>
    <p class="dateline">Current Problems, Issues &amp; Events &middot; Mr. Anderson</p>
    <p class="hero-copy">
      <strong>Read it. Check it. Then decide.</strong>
      <span>We start with something in today's news and trace it back to where it started.</span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="#${units.length ? 'units' : 'weeks'}">Start Here</a>
      <a class="btn secondary" href="#how">How This Works</a>
    </div>
  </section>

  <main>
${units.length ? `    <section class="section" id="units">
      <div class="section-header">
        <div class="eyebrow">The Units</div>
        <h2>One story, traced backwards.</h2>
        <p>Each unit starts with something happening now and works back to how it started.</p>
      </div>
      <div class="unit-grid">
${unitCards}
      </div>
    </section>

` : ''}${weeks.length ? `    <section class="section" id="weeks">
      <div class="section-header">
        <div class="eyebrow">Getting Started</div>
        <h2>How to read anything.</h2>
        <p>The method the units run on.</p>
      </div>
      <div class="week-grid">
${weekCards}
      </div>
    </section>

` : ''}    <section class="section" id="how">
      <div class="section-header">
        <div class="eyebrow">How This Works</div>
        <h2>Three moves, whatever the story is.</h2>
      </div>
      <article class="card">
        <div class="week-roadmap">
          <div class="roadmap-step"><strong>1. Get the Story</strong>Find it on a map, read the Brief, and say what you already think caused it.</div>
          <div class="roadmap-step"><strong>2. Trace It Back</strong>Follow it to where it started, then check your own guess against what you find.</div>
          <div class="roadmap-step"><strong>3. Take a Position</strong>Argue it, including the side you disagree with, then submit in Canvas.</div>
        </div>
        <p style="margin:18px 0 0;color:var(--ink-soft)">
          Your writing saves on the device you typed it on. Nothing is submitted from these
          pages: use <strong>Gather All My Work</strong>, then paste into Canvas.
        </p>
      </article>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand"><img src="assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="4889" height="810"></div>
      <p>Read it. Check it. Then decide.</p>
    </div>
  </footer>
</div>
</body>
</html>
`;
}

const units = load(UNIT_DIR, /\.js$/);
const weeks = load(WEEK_DIR, /^week-\d+\.js$/);

const target = path.join(ROOT, 'index.html');
const content = renderIndex(units, weeks);
const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;

if (CHECK) {
  if (existing !== content) {
    console.error(`\n${R}index.html has drifted from its content modules.${X}`);
    console.error(`${D}It is generated. Run: node scripts/build-index.js${X}\n`);
    process.exit(1);
  }
  console.log(`${G}✓${X} index.html reproduces exactly (${units.length} unit(s), ${weeks.length} week(s)).`);
  process.exit(0);
}

if (existing === content) {
  console.log(`${G}✓${X} index.html already up to date.`);
} else {
  fs.writeFileSync(target, content, 'utf8');
  console.log(`  ${G}wrote${X} index.html ${D}(${units.length} unit(s), ${weeks.length} week(s))${X}`);
}
