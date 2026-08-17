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

// The unit spine, in teaching order. A unit appears here as a card whether or not
// it has been written yet, because the six-unit arc is the course and a front door
// that showed only the finished one would say the course was one unit long.
//
// A unit leaves this list by getting a content module in scripts/lib/unit-content/:
// anything matched by unitKey below is rendered from the real module instead, so a
// unit is never listed twice and this list never has to be pruned by hand.
const SPINE = [
  { unitKey: 'social-media', name: 'Social Media' },
  { unitKey: 'war-in-iran', name: 'War in Iran' },
  { unitKey: 'war-in-ukraine', name: 'War in Ukraine' },
  { unitKey: 'midterm-elections', name: 'Midterm Elections' },
  { unitKey: 'artificial-intelligence', name: 'Artificial Intelligence' },
  { unitKey: 'immigration', name: 'Immigration' }
];

function load(dir, re) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => re.test(f)).sort().map(f => {
    try { return require(path.join(dir, f)); } catch (e) { return null; }
  }).filter(Boolean);
}

// The Desk's own facts, read rather than retyped. The front door used to state
// "First 25 minutes" and "four beats" as literals, which is a second copy of two
// numbers that live in desk-content.js: the routine grew a fourth step and the
// four rotating beats became two fixed lanes, and the front door went on
// advertising the old shape with every check green. Derived, it cannot.
const DESK = require('./lib/desk-content');
const deskMinutes = (DESK.routine || []).reduce((n, s) => n + (s.minutes || 0), 0);

// "one local and one national or international", built from the lane names, so
// renaming a lane reaches the front door too. Lower-cased because it lands
// mid-sentence.
const deskLanes = (DESK.lanes || [])
  .map(l => String(l.name).toLowerCase())
  .join(' and one ');

function renderIndex(units, weeks) {
  const byKey = {};
  units.forEach(u => { byKey[u.meta.unitKey] = u; });

  // Every unit in the spine, written or not. A planned one is a <div> rather than
  // an <a>: a card that looks clickable and is not is worse than one that says so.
  const unitCards = SPINE.map(entry => {
    const u = byKey[entry.unitKey];
    if (!u) {
      return `        <div class="unit-card planned">
          <span class="unit-kicker">Unit &middot; not written yet</span>
          <h3>${esc(entry.name)}</h3>
          <p>Planned. It gets a page when it gets a content module.</p>
        </div>`;
    }
    const m = u.meta;
    const topics = (u.topics || []).length;
    const briefs = (u.topics || []).filter(b => b.sections && b.sections.length).length;
    return `        <a class="unit-card" href="${esc(m.unitKey)}/index.html">
          <span class="unit-kicker">Unit &middot; ${esc(String(m.topics || topics))} topics</span>
          <h3>${esc(m.unit)}</h3>
          <p>${esc(m.terminalQuestion || m.overview || '')}</p>
          <span class="unit-meta">${esc(String(briefs))} briefs &middot; ${esc(String(topics - briefs))} on paper</span>
        </a>`;
  }).join('\n');

  // Any unit with a module but no place in the spine. Better to show it than to
  // let a written unit go unreachable because someone forgot this list.
  const orphanCards = units.filter(u => !SPINE.some(e => e.unitKey === u.meta.unitKey))
    .map(u => `        <a class="unit-card" href="${esc(u.meta.unitKey)}/index.html">
          <span class="unit-kicker">Unit</span>
          <h3>${esc(u.meta.unit)}</h3>
          <p>${esc(u.meta.terminalQuestion || u.meta.overview || '')}</p>
        </a>`).join('\n');

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
        <img src="assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="1102" height="450">
      </a>
      <div class="nav-links">
        <a href="announcements.html">Today</a>
        <a href="#block">The Block</a>
        <a href="daily/index.html">The Desk</a>
${units.length ? '        <a href="#units">Units</a>\n' : ''}${weeks.length ? '        <a href="#weeks">Method</a>\n' : ''}        <a href="#how">How This Works</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <h1 class="hero-wordmark"><img src="assets/images/brand/becurrent-wordmark-ink.svg" alt="BeCurrent" width="1102" height="450"></h1>
    <p class="dateline">Current Problems, Issues &amp; Events &middot; Mr. Anderson</p>
    <p class="hero-copy">
      <strong>Read it. Check it. Then decide.</strong>
      <span>We start with something in today's news and trace it back to where it started.</span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="announcements.html">Today</a>
      <a class="btn secondary" href="daily/index.html">The Desk</a>
      <a class="btn secondary" href="#units">The Units</a>
      <a class="btn secondary" href="#how">How This Works</a>
    </div>
  </section>

  <main>
    <section class="section" id="block">
      <div class="section-header">
        <div class="eyebrow">Every class period &middot; 90 minutes</div>
        <h2>A block has two halves.</h2>
        <p>One half never changes shape and always uses today's news. The other half
          changes every few weeks and goes deep on one thing. You need both: the daily
          half without the units is a news feed, and the units without the daily half
          are a history class.</p>
      </div>
      <div class="unit-grid">
        <a class="unit-card" href="daily/index.html">
          <span class="unit-kicker">First ${deskMinutes} minutes &middot; every day</span>
          <h3>${esc(DESK.meta.title)}</h3>
          <p>CNN 10, then two stories you pick yourself: one ${deskLanes}. Where it came
            from, what happened, and why it caught you.</p>
          <span class="unit-meta">Same routine every class</span>
        </a>
        <div class="unit-card planned">
          <span class="unit-kicker">Remaining ${90 - deskMinutes} minutes &middot; for weeks at a time</span>
          <h3>The Unit</h3>
          <p>One theme, traced backwards from something happening now to where it started,
            ending on a question you have to argue.</p>
          <span class="unit-meta">Six of them, below</span>
        </div>
      </div>
    </section>

${units.length ? `    <section class="section" id="units">
      <div class="section-header">
        <div class="eyebrow">The Units</div>
        <h2>One story, traced backwards.</h2>
        <p>Each unit starts with something happening now and works back to how it started.
          Six of them across the year, and they run in the second half of the block while
          the Desk runs in the first.</p>
      </div>
      <div class="unit-grid">
${unitCards}
${orphanCards}
      </div>
    </section>

` : ''}${weeks.length ? `    <section class="section" id="weeks">
      <div class="section-header">
        <div class="eyebrow">The Method</div>
        <h2>How to read anything.</h2>
        <p>Taught once at the start of the year, then used at the Desk every day and in
          every unit after it.</p>
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
      <div class="footer-brand"><img src="assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="1102" height="450"></div>
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
