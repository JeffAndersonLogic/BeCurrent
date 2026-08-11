#!/usr/bin/env node
'use strict';

/**
 * Rebuild every week from its content module.
 *
 * One content module in scripts/lib/week-content/ is the single source of truth
 * for a week. This script emits four files from it:
 *
 *   week-NN/index.html                       the lesson shell
 *   week-NN/brief-week-NN-<slug>.html        the generated brief
 *   week-NN/brief-week-NN-<slug>-capture.html  the iframe wrapper
 *   assets/data/week-NN.js                   the data the renderer reads
 *
 * All four are GENERATED. Hand-editing any of them is a mistake the offline
 * suite catches, because scripts/test/weeks-reproducible.test.js runs this with
 * --check and fails on drift. Without that check a hand-edit survives until the
 * next rebuild silently reverts it, which is the worst of both worlds: the fix
 * appears to work, ships, and then vanishes weeks later for no visible reason.
 *
 *   node scripts/build-weeks.js            write the files
 *   node scripts/build-weeks.js --check    fail on drift, write nothing
 */

const fs = require('fs');
const path = require('path');

const { renderBrief, renderWrapper } = require('./lib/week-page');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'scripts', 'lib', 'week-content');

const CHECK = process.argv.includes('--check');

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── The week shell ────────────────────────────────────────────────────────────
//
// Every id in here is required by the renderer, and validate.js asserts each one
// is present. The shell carries no content of its own on purpose: a week is
// changed by editing its content module, never by editing HTML.
function renderShell(week) {
  const m = week.meta;
  const nn = String(m.weekNumber).padStart(2, '0');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BeCurrent | ${esc(m.week)}</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/becurrent.css">
<style>.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}</style>
</head>
<body>
<div class="site-shell">

  <header class="topbar">
    <nav class="nav">
      <a class="brand-mini" href="../index.html" aria-label="Return to the BeCurrent home page">
        <span class="mark-be">Be</span><span class="mark-c">C</span><span>urrent</span>
      </a>
      <div class="nav-links">
        <a href="../index.html">Home</a>
        <a href="#targets">Targets</a>
        <a href="#modules">Modules</a>
        <a href="#background">Background</a>
        <a href="#submit">Submit</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <h1 class="logo-title">Be<span class="hero-c">C</span>urrent</h1>
    <p class="dateline" id="week-dateline"></p>
    <p class="hero-copy">
      <strong id="week-title"></strong>
      <span id="week-subtitle"></span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="#modules">Open Modules</a>
      <a class="btn secondary" href="#background">Background</a>
      <a class="btn secondary" href="#submit">Submit My Work</a>
    </div>
  </section>

  <main>
    <section class="section" id="flow">
      <div class="section-header">
        <div class="eyebrow">Classroom Flow</div>
        <h2>Three moves, every week.</h2>
      </div>
      <article class="card">
        <div class="week-roadmap">
          <div class="roadmap-step"><strong>1. Get the Story</strong>Locate it on a map, then read the week's brief and answer its three questions.</div>
          <div class="roadmap-step"><strong>2. Interrogate It</strong>Compare the coverage, check the sources, and sort the claims from the evidence.</div>
          <div class="roadmap-step"><strong>3. Take a Position</strong>Deliberate, then complete the checkpoint and submit through Canvas.</div>
        </div>
      </article>
    </section>

    <section class="section" id="targets">
      <div class="section-header">
        <div class="eyebrow">Learning Focus</div>
        <h2>Learning Targets &amp; Success Criteria</h2>
        <p>These stay on the page so you know what you are learning and how success is measured.</p>
      </div>
      <div id="inline-targets"></div>
    </section>

    <section class="section" id="modules">
      <div class="section-header">
        <div class="eyebrow">The Eight Modules</div>
        <h2>Work them in order.</h2>
        <p>Most open in a focused pop-out. Your writing saves as you type, on this device.</p>
      </div>
      <div class="module-grid" id="module-grid"></div>
    </section>

    <section class="dark-panel" id="background">
      <div class="section-header">
        <div class="eyebrow">Module 03, Content Delivery</div>
        <h2 id="background-section-title"></h2>
        <p id="background-intro"></p>
      </div>
      <div class="background-grid" id="background-grid"></div>
    </section>

    <!-- Video. Kept in the shell whether or not this lesson has clips: the
         renderer sets hidden on it, so an empty one leaves no gap. -->
    <section class="section" id="video-clips" hidden></section>

    <section class="section" id="submit">
      <div class="section-header">
        <div class="eyebrow">Turn It In</div>
        <h2>Collect everything, then paste it into Canvas.</h2>
        <p>This gathers every answer you have written on this device, including the three from the brief.</p>
      </div>
      <div class="gather-panel" id="gather-panel"></div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">BeCurrent</div>
      <p id="footer-week-label"></p>
      <p>Read it. Check it. Then decide.</p>
    </div>
  </footer>
</div>

<div class="pop-modal" id="pop-modal" role="dialog" aria-modal="true">
  <div class="pop-panel">
    <div class="pop-header">
      <div>
        <div class="eyebrow" id="pop-eyebrow">Module</div>
        <h2 id="pop-title">Module</h2>
      </div>
      <button class="btn quiet" type="button" onclick="closeModule()">Close</button>
    </div>
    <div class="pop-body" id="pop-body"></div>
  </div>
</div>

<div class="background-modal" id="background-modal" role="dialog" aria-modal="true">
  <div class="background-panel">
    <div class="pop-header">
      <div>
        <div class="eyebrow">Background</div>
        <h2 id="background-title"></h2>
      </div>
      <button class="btn quiet" type="button" onclick="closeBackgroundCard()">Close</button>
    </div>
    <div class="background-body">
      <div class="card-rule" aria-hidden="true"></div>
      <figure class="background-figure" id="background-figure" hidden>
        <img id="background-img" alt="">
        <figcaption id="background-caption"></figcaption>
      </figure>
      <ul id="background-bullets"></ul>
      <div class="deck-controls" id="deck-controls"></div>
    </div>
  </div>
</div>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true">
  <figure>
    <button class="btn quiet" type="button" onclick="closeLightbox()">Close</button>
    <img id="lightbox-img" alt="">
    <figcaption id="lightbox-caption"></figcaption>
  </figure>
</div>

<script src="../assets/data/week-${nn}.js"></script>
<script src="../assets/js/becurrent-week-renderer-v1.js"></script>
</body>
</html>
`;
}

// ── The data file ─────────────────────────────────────────────────────────────
//
// Only the fields the week page needs. The brief's own content (sections,
// terms, takeaway) is baked into the generated brief HTML and would be dead
// weight on every week page, so it is deliberately not carried here.
function renderDataFile(week, briefFile) {
  const m = week.meta;
  const payload = {
    meta: {
      course: m.course,
      week: m.week,
      weekKey: m.weekKey,
      weekNumber: m.weekNumber,
      dateRange: m.dateRange,
      title: m.title,
      subtitle: m.subtitle,
      aiCoachUrl: m.aiCoachUrl,
      canvasSubmissionNote: m.canvasSubmissionNote
    },
    learningTargets: week.learningTargets,
    successCriteria: week.successCriteria,
    where: week.where,
    brief: {
      title: week.title,
      deck: week.deck,
      embedUrl: briefFile.replace(/\.html$/, '-capture.html'),
      questionCount: (week.questions || []).length
    },
    background: week.background,
    coverage: week.coverage,
    sourceCheck: week.sourceCheck,
    claims: week.claims,
    deliberation: week.deliberation,
    checkpoint: week.checkpoint
  };

  return `/* GENERATED by scripts/build-weeks.js from scripts/lib/week-content/week-`
    + String(m.weekNumber).padStart(2, '0')
    + `.js\n * Do not edit by hand. The offline suite fails on drift.\n */\n`
    + `window.BECURRENT_WEEK = ${JSON.stringify(payload, null, 2)};\n`;
}

// ── The student entry point ───────────────────────────────────────────────────
//
// Generated from the content modules rather than hand-maintained, because a
// hand-maintained index of 36 weeks is a page that goes stale and then quietly
// misleads students about what is published. Add a content module and the front
// door updates itself.
function renderIndex(weeks) {
  const cards = weeks.map(w => {
    const nn = String(w.meta.weekNumber).padStart(2, '0');
    return `        <a class="week-card" href="week-${nn}/index.html">
          <span class="week-num">Week ${nn} &middot; ${esc(w.meta.dateRange)}</span>
          <h3>${esc(w.meta.title)}</h3>
          <p>${esc(w.meta.subtitle)}</p>
        </a>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BeCurrent | Current Events</title>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/becurrent.css">
</head>
<body>
<div class="site-shell">

  <header class="topbar">
    <nav class="nav">
      <a class="brand-mini" href="index.html" aria-label="BeCurrent home">
        <span class="mark-be">Be</span><span class="mark-c">C</span><span>urrent</span>
      </a>
      <div class="nav-links">
        <a href="#weeks">Weeks</a>
        <a href="#how">How This Works</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <h1 class="logo-title">Be<span class="hero-c">C</span>urrent</h1>
    <p class="dateline">Current Events &middot; Mr. Anderson</p>
    <p class="hero-copy">
      <strong>Read it. Check it. Then decide.</strong>
      <span>A week at a time, with the same eight moves every week.</span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="#weeks">This Week</a>
      <a class="btn secondary" href="#how">How This Works</a>
    </div>
  </section>

  <main>
    <section class="section" id="weeks">
      <div class="section-header">
        <div class="eyebrow">The Weeks</div>
        <h2>Pick your week.</h2>
        <p>Each week is one story, worked eight ways.</p>
      </div>
      <div class="week-grid">
${cards}
      </div>
    </section>

    <section class="section" id="how">
      <div class="section-header">
        <div class="eyebrow">How This Works</div>
        <h2>Eight modules, every week, in order.</h2>
      </div>
      <article class="card">
        <div class="week-roadmap">
          <div class="roadmap-step"><strong>1. Get the Story</strong>Where in the World, then The Brief and its three questions.</div>
          <div class="roadmap-step"><strong>2. Interrogate It</strong>Background, Coverage Compare, Source Check, Claim &amp; Evidence.</div>
          <div class="roadmap-step"><strong>3. Take a Position</strong>The Deliberation, then the Checkpoint, then submit in Canvas.</div>
        </div>
        <p style="margin:18px 0 0;color:var(--ink-soft)">
          Your writing saves on the device you typed it on. Nothing is submitted from these
          pages: use <strong>Gather All My Work</strong> at the bottom of a week, then paste
          into Canvas.
        </p>
      </article>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">BeCurrent</div>
      <p>Read it. Check it. Then decide.</p>
    </div>
  </footer>
</div>
</body>
</html>
`;
}

// ── Build ─────────────────────────────────────────────────────────────────────

function contentFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter(f => /^week-\d+\.js$/.test(f))
    .sort();
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

const files = contentFiles();
if (!files.length) {
  console.error(`${R}No week content found in scripts/lib/week-content/${X}`);
  process.exit(1);
}

const weeks = [];

files.forEach(file => {
  const week = require(path.join(CONTENT_DIR, file));
  const m = week.meta;
  const nn = String(m.weekNumber).padStart(2, '0');
  const dir = `week-${nn}`;
  const briefFile = `brief-week-${nn}-${slugify(m.title)}.html`;

  emit(path.join(dir, 'index.html'), renderShell(week));
  emit(path.join(dir, briefFile), renderBrief(week));
  emit(path.join(dir, briefFile.replace(/\.html$/, '-capture.html')), renderWrapper(week, briefFile));
  emit(path.join('assets', 'data', `week-${nn}.js`), renderDataFile(week, briefFile));
  weeks.push(week);
});

emit('index.html', renderIndex(weeks));

if (CHECK) {
  if (drift.length) {
    console.error(`\n${R}Generated week files have drifted from their content modules.${X}\n`);
    drift.forEach(d => console.error(`  ${R}✗${X} ${d.rel} ${D}(${d.reason})${X}`));
    console.error(`\n${D}These files are generated. Edit scripts/lib/week-content/ and run:${X}`);
    console.error(`  node scripts/build-weeks.js\n`);
    process.exit(1);
  }
  console.log(`${G}✓${X} ${files.length} week${files.length === 1 ? '' : 's'} reproduce exactly from their content modules.`);
  process.exit(0);
}

if (!wrote.length) {
  console.log(`${G}✓${X} Already up to date, ${files.length} week${files.length === 1 ? '' : 's'}.`);
} else {
  wrote.forEach(w => console.log(`  ${G}wrote${X} ${w}`));
  console.log(`\n${G}✓${X} ${wrote.length} file${wrote.length === 1 ? '' : 's'} written from ${files.length} content module${files.length === 1 ? '' : 's'}.`);
}
