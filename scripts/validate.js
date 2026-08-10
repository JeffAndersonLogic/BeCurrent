#!/usr/bin/env node
'use strict';

/**
 * The structural gate.
 *
 * Dependency-free and offline by design, so it runs on a bare checkout with no
 * `npm install` at all. The `structure` CI job deliberately does not install
 * anything, which is what keeps that guarantee honest. Anything needing the
 * network belongs in a nightly job, never here: a third party's outage must
 * never fail a commit.
 *
 * What this file is for is the class of bug where every page still looks right.
 * A missing capture block, a storage key that two files disagree about, a data
 * file pointing at a brief instead of its wrapper: all invisible in a browser,
 * all silently lose a student's work. Those are the checks worth having.
 *
 *   node scripts/validate.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const R = '\x1b[31m', G = '\x1b[32m', C = '\x1b[36m', W = '\x1b[1m', D = '\x1b[2m', X = '\x1b[0m';

const errors = [];
let checks = 0;

function err(file, message) {
  errors.push({ file: path.relative(ROOT, file), message });
}
function ok() { checks++; }
function assert(cond, file, message) {
  checks++;
  if (!cond) errors.push({ file: path.relative(ROOT, file), message });
  return cond;
}
function section(name) { console.log(`\n${C}${W}── ${name}${X}`); }
function done(note) { console.log(`   ${D}${note}${X}`); }

function read(file) {
  try { return fs.readFileSync(file, 'utf8'); } catch (e) { return null; }
}
function glob(dir, re) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => re.test(f)).sort().map(f => path.join(dir, f));
}

// ── Week directories ──────────────────────────────────────────────────────────

const weekDirs = fs.readdirSync(ROOT)
  .filter(f => /^week-\d{2}$/.test(f))
  .filter(f => fs.statSync(path.join(ROOT, f)).isDirectory())
  .sort();

section('Week directories');
assert(weekDirs.length > 0, ROOT, 'no week-NN directories found');
done(`${weekDirs.length} week director${weekDirs.length === 1 ? 'y' : 'ies'}: ${weekDirs.join(', ')}`);

// ── The eight-module contract ─────────────────────────────────────────────────
//
// Fixed count, fixed order. A module quietly dropped from the renderer is a
// module students never see, and nothing else in this suite would notice.
const CANONICAL_MODULES = [
  'where', 'brief', 'background', 'coverage',
  'sourcecheck', 'claims', 'deliberation', 'checkpoint'
];

const RENDERER = path.join(ROOT, 'assets', 'js', 'becurrent-week-renderer-v1.js');

section('The eight-module contract');
const rendSrc = read(RENDERER);
if (!rendSrc) {
  err(RENDERER, 'renderer not readable');
} else {
  const found = [];
  const re = /\{\s*id:\s*'([a-z0-9]+)'/g;
  let m;
  while ((m = re.exec(rendSrc)) !== null) {
    if (CANONICAL_MODULES.includes(m[1]) && !found.includes(m[1])) found.push(m[1]);
  }
  assert(found.length === 8, RENDERER,
    `module count: expected 8 canonical ids, found ${found.length}, ${JSON.stringify(found)}`);
  CANONICAL_MODULES.forEach((id, i) => {
    assert(found[i] === id, RENDERER,
      `module order: position ${i + 1} should be '${id}', found '${found[i] || 'nothing'}'`);
  });

  // Module 03 is always a jump and module 07 is always an external link. Turning
  // either into a pop-out changes the lesson shape without changing a data file.
  assert(/id:\s*'background'[\s\S]{0,240}?jump:\s*'#background'/.test(rendSrc), RENDERER,
    "module 03 'background' must be a jump link to #background, never a pop-out");
  assert(/id:\s*'deliberation'[\s\S]{0,240}?link:\s*true/.test(rendSrc), RENDERER,
    "module 07 'deliberation' must be an external link");

  ['renderWhere', 'renderBrief', 'renderCoverage', 'renderSourceCheck',
   'renderClaims', 'renderCheckpoint'].forEach(fn => {
    assert(rendSrc.includes('function ' + fn), RENDERER, `missing render function ${fn}()`);
  });
  done(`8 modules in order, 6 render functions`);
}

// ── The modal focus contract ─────────────────────────────────────────────────
//
// Nothing offline can see a scroll lock, which is exactly why these textual
// checks exist. The bug they guard against left the page unscrollable with every
// other check green. See the comment above bcOpenModal.
section('Modal focus and scroll lock');
if (rendSrc) {
  assert(rendSrc.includes('function bcOpenModal'), RENDERER, 'missing bcOpenModal()');
  assert(rendSrc.includes('function bcCloseModal'), RENDERER, 'missing bcCloseModal()');
  assert(rendSrc.includes('bcTrapTab'), RENDERER, 'missing the Tab trap');

  // The idempotence guard. An unconditional push is the stranded-student bug.
  assert(/if\s*\(!BCModalStack\.some\(item\s*=>\s*item\.el\s*===\s*el\)\)\s*\{/.test(rendSrc), RENDERER,
    'bcOpenModal must guard the stack push on "not already open". An unconditional '
    + 'BCModalStack.push leaves the scroll lock on after Close.');

  // The release condition. Keying off an empty stack rather than "no visible
  // dialog" is the same bug wearing a different hat.
  assert(/if\s*\(!BCModalStack\.some\(item\s*=>\s*item\.el\.classList\.contains\('show'\)\)\)/.test(rendSrc), RENDERER,
    'the scroll lock must lift on "no visible dialog", not on "empty stack"');

  assert(/document\.body\.style\.overflow\s*=\s*''/.test(rendSrc), RENDERER,
    'bcCloseModal must restore document.body.style.overflow');

  // Every enlargeable image must be a real button. An onclick on its own is
  // mouse-only, which is how a lightbox stays unreachable by keyboard.
  assert(/class="enlargeable"/.test(rendSrc), RENDERER, 'no enlargeable image markup found');
  assert(/<button type="button" class="enlargeable"/.test(rendSrc), RENDERER,
    'enlargeable images must be <button> elements, not a div with an onclick');
  assert(/aria-label="Enlarge/.test(rendSrc), RENDERER,
    'an enlargeable image must carry an aria-label naming the picture');
  done('open/close, tab trap, idempotence guard, visible-dialog release, button lightbox');
}

// ── The deck controls ─────────────────────────────────────────────────────────
section('Background deck');
if (rendSrc) {
  assert(rendSrc.includes('function wireDeckControls'), RENDERER, 'missing wireDeckControls()');
  assert(/if\s*\(!host\s*\|\|\s*byId\('deck-prev'\)\)\s*return/.test(rendSrc), RENDERER,
    'wireDeckControls must guard on its own id, or a re-render doubles every button');
  assert(rendSrc.includes('function backToModules'), RENDERER, 'missing backToModules()');
  assert(/preventScroll:\s*true/.test(rendSrc), RENDERER,
    'backToModules must focus with preventScroll so the smooth scroll is the only movement');
  assert(/ArrowLeft/.test(rendSrc) && /ArrowRight/.test(rendSrc), RENDERER,
    'the deck must respond to the left and right arrow keys');
  assert(/Card \$\{deckIndex \+ 1\} of \$\{cards\.length\}/.test(rendSrc), RENDERER,
    'the deck must show a "Card N of M" counter');
  done('injected controls, id guard, arrow keys, counter, Back to Modules');
}

// ── The record footer contract ────────────────────────────────────────────────
//
// Three files have to agree: this renderer writes the footer, canvas-parse-core
// reads it, and the two must use the same tokens. A rename on one side reports
// every submission as unparseable, or worse, as empty.
section('Canvas record footer');
const PARSER = path.join(ROOT, 'scripts', 'lib', 'canvas-parse-core.js');
const parserSrc = read(PARSER);
if (rendSrc && parserSrc) {
  assert(rendSrc.includes("'#BHV|v='"), RENDERER, 'renderer must emit the #BHV| manifest header');
  assert(rendSrc.includes("'#BHR|i='"), RENDERER, 'renderer must emit #BHR| record lines');
  assert(parserSrc.includes('RE_HEADER = /#BHV'), PARSER, 'parser must read the #BHV| header');
  assert(parserSrc.includes('RE_RECORD = /#BHR'), PARSER, 'parser must read #BHR| record lines');

  // The sentinel is the one token that differs between the two courses, so the
  // parser has to accept both and the renderer has to emit this course's.
  assert(/BC_RECORD_OPEN = '--- BECURRENT RECORD/.test(rendSrc), RENDERER,
    'renderer must open the footer with the BECURRENT sentinel');
  assert(/RE_SENTINEL = \/---\\s\*\(\?:BECURRENT\|BEHISTORICAL\) RECORD\//.test(parserSrc), PARSER,
    'parser must accept both course sentinels, or one course stops parsing');

  // The denominator. A hard-coded 8 would report a week with no brief yet as
  // three responses short, which is worse than no count at all.
  assert(rendSrc.includes('function expectedCaptureCount'), RENDERER, 'missing expectedCaptureCount()');
  assert(/\|expected='\s*\+\s*expectedCaptureCount\(\)/.test(rendSrc), RENDERER,
    'the footer must declare expected= from expectedCaptureCount(), never a literal');

  // Paragraph structure is the one corruption the hash cannot catch, because the
  // hash normalizes whitespace on purpose. So the response must go out as
  // sibling <p> elements and never as <br>.
  assert(rendSrc.includes('function paragraphsHtml'), RENDERER, 'missing paragraphsHtml()');
  assert(/split\(\/\\n\{2,\}\//.test(rendSrc), RENDERER,
    'paragraphsHtml must split on blank lines so a blank line survives Canvas');
  done('shared machine grammar, per-course sentinel, computed denominator, paragraph split');
}

// ── The brief capture block ───────────────────────────────────────────────────
//
// This is the only path by which the three brief answers reach Canvas, and it
// has gone missing silently in the sibling repo twice. Four things are checked,
// because the version of this failure that leaves every other check green is the
// one where the block is present but a single file disagrees about the key.
section('Brief capture block');
const { captureBlock, STORAGE_PREFIX } = require('./lib/brief-capture-block');

const briefFiles = [];
weekDirs.forEach(dir => {
  glob(path.join(ROOT, dir), /^brief-week-\d{2}-.*\.html$/)
    .filter(f => !f.endsWith('-capture.html'))
    .forEach(f => briefFiles.push(f));
});

assert(briefFiles.length === weekDirs.length, ROOT,
  `expected one brief per week, found ${briefFiles.length} for ${weekDirs.length} weeks`);

briefFiles.forEach(file => {
  const src = read(file);
  if (!src) { err(file, 'brief not readable'); return; }

  const weekKey = (src.match(/var KEY = "becurrent-brief-([a-z0-9]+)"/) || [])[1];
  if (!assert(!!weekKey, file, 'no capture block, or its storage key is unreadable. '
      + 'Without it the three brief answers never reach Canvas.')) return;

  // Byte-identical to what the lib produces, so a hand-edit inside a generated
  // brief cannot survive.
  const count = (src.match(/class="question-item"/g) || []).length;
  const aiUrl = (src.match(/var AI_URL = "([^"]*)"/) || [])[1] || '';
  const expected = captureBlock(weekKey, count, aiUrl);
  assert(src.includes(expected), file,
    'the capture block is not byte-identical to scripts/lib/brief-capture-block.js. '
    + 'Never hand-edit it, change the lib and rebuild.');

  // Exactly three questions per brief, and each one wired to the block.
  assert(count === 3, file, `expected exactly 3 question-item blocks, found ${count}`);
  for (let i = 1; i <= count; i++) {
    assert(src.includes(`id="answer-q${i}"`), file, `missing textarea id="answer-q${i}"`);
    assert(src.includes(`id="question-q${i}"`), file, `missing prompt id="question-q${i}"`);
    assert(src.includes(`id="confidence-q${i}"`), file, `missing confidence row id="confidence-q${i}"`);
  }
});
done(`${briefFiles.length} brief${briefFiles.length === 1 ? '' : 's'} carrying an identical capture block`);

// ── The storage key, agreed by four files ────────────────────────────────────
//
// The half-contract is the dangerous one. Asserting the briefs write the prefix
// proves nothing if the renderer was changed to read a different one: every
// structural check stays green and every answer is lost.
section('Storage key agreement');
assert(STORAGE_PREFIX === 'becurrent-brief-', path.join(ROOT, 'scripts/lib/brief-capture-block.js'),
  `STORAGE_PREFIX is '${STORAGE_PREFIX}', expected 'becurrent-brief-'`);
if (rendSrc) {
  assert(rendSrc.includes("'becurrent-brief-'"), RENDERER,
    "the renderer must read the 'becurrent-brief-' prefix the capture block writes");
  assert(rendSrc.includes("'becurrent-week-'"), RENDERER,
    "the renderer must namespace its own slots under 'becurrent-week-'");
}
done('capture block writes it, renderer reads it, prefix pinned in both');

// ── Week shells ───────────────────────────────────────────────────────────────
//
// Every id the renderer writes into. A shell missing one fails silently: that
// section is simply blank on the page.
const REQUIRED_IDS = [
  'week-dateline', 'week-title', 'week-subtitle', 'inline-targets', 'module-grid',
  'background', 'background-section-title', 'background-intro', 'background-grid',
  'gather-panel', 'footer-week-label',
  'pop-modal', 'pop-eyebrow', 'pop-title', 'pop-body',
  'background-modal', 'background-title', 'background-bullets',
  'background-figure', 'background-img', 'background-caption', 'deck-controls',
  'lightbox', 'lightbox-img', 'lightbox-caption',
  'modules'
];

section('Week shells');
weekDirs.forEach(dir => {
  const file = path.join(ROOT, dir, 'index.html');
  const src = read(file);
  if (!src) { err(file, 'week shell missing'); return; }

  REQUIRED_IDS.forEach(id => {
    assert(src.includes(`id="${id}"`), file, `missing required id="${id}"`);
  });

  // The data file has to load before the renderer, or the renderer finds no week.
  const di = src.search(/assets\/data\/week-\d{2}\.js/);
  const ri = src.indexOf('becurrent-week-renderer-v1.js');
  assert(di > -1, file, 'no week data file loaded');
  assert(ri > -1, file, 'renderer not loaded');
  assert(di > -1 && ri > -1 && di < ri, file,
    'load order: the week data file must load BEFORE becurrent-week-renderer-v1.js');

  assert(src.includes('assets/css/becurrent.css'), file, 'system stylesheet not linked');

  // Three fixed roadmap steps, never customized per week.
  const steps = (src.match(/class="roadmap-step"/g) || []).length;
  assert(steps === 3, file, `Classroom Flow must have exactly 3 roadmap steps, found ${steps}`);
  assert(src.includes('class="week-roadmap"'), file, 'missing the .week-roadmap container');

  // Both dialogs must declare themselves to assistive tech.
  ['pop-modal', 'background-modal', 'lightbox'].forEach(id => {
    const tag = (src.match(new RegExp(`<div class="[^"]*" id="${id}"[^>]*>`)) || [])[0] || '';
    assert(/role="dialog"/.test(tag), file, `#${id} must carry role="dialog"`);
    assert(/aria-modal="true"/.test(tag), file, `#${id} must carry aria-modal="true"`);
  });
});
done(`${weekDirs.length} shell${weekDirs.length === 1 ? '' : 's'}, ${REQUIRED_IDS.length} required ids each`);

// ── Brief structure ───────────────────────────────────────────────────────────
section('Brief structure');
const BRIEF_BLOCKS = [
  ['class="module-header"', 'module header'],
  ['class="module-badge"', 'Module 02 badge'],
  ['class="brief-title-band"', 'title band'],
  ['class="brief-title"', 'h1 title'],
  ['class="brief-deck"', 'deck subtitle'],
  ['class="skill-tags"', 'skill tag row'],
  ['class="brief-body"', 'reading body'],
  ['class="support-strip"', 'support strip'],
  ['class="support-card"', 'support cards'],
  ['class="vocab-strip"', 'vocabulary strip'],
  ['class="term-chip"', 'key term chips'],
  ['class="section-number"', 'section watermark'],
  ['class="section-label"', 'section eyebrow'],
  ['class="section-heading"', 'section heading'],
  ['class="reading-text"', 'reading paragraphs'],
  ['class="callout"', 'at least one callout'],
  ['class="be-ready"', 'BeReady takeaway strip'],
  ['class="check-section"', 'check section'],
  ['class="builder-section"', 'AI coach prompt builder'],
  ['id="ai-output"', 'coach prompt output'],
  ['class="page-footer-note"', 'submission note'],
  ['class="module-footer"', 'footer navigation']
];
briefFiles.forEach(file => {
  const src = read(file);
  if (!src) return;
  BRIEF_BLOCKS.forEach(([needle, label]) => {
    assert(src.includes(needle), file, `missing ${label} (${needle})`);
  });
  assert(src.includes('becurrent-brief.css'), file, 'brief stylesheet not linked');
  // Abbreviated class names were a real source of drift in the sibling repo.
  assert(!/class="(cs|qi|mf|rt)"/.test(src), file,
    'abbreviated CSS class names are prohibited, use the canonical full names');
});
done(`${BRIEF_BLOCKS.length} required blocks per brief`);

// ── Capture wrappers ──────────────────────────────────────────────────────────
//
// Every brief is delivered through a wrapper, and the data file must point at
// the wrapper. Pointing at the brief itself leaves the AI coach button dead,
// because most briefs render it with no onclick and rely on the interception.
section('Capture wrappers and embed targets');
briefFiles.forEach(file => {
  const wrapper = file.replace(/\.html$/, '-capture.html');
  if (!assert(fs.existsSync(wrapper), file, 'no capture wrapper beside this brief')) return;

  const wsrc = read(wrapper);
  assert(/id="brief-frame"/.test(wsrc), wrapper, 'wrapper has no #brief-frame iframe');
  assert(wsrc.includes('open ai coach'), wrapper,
    'the wrapper must intercept the AI coach click by label, or the button is dead');
  assert(wsrc.includes(path.basename(file)), wrapper,
    `wrapper iframe does not point at ${path.basename(file)}`);
});

weekDirs.forEach(dir => {
  const nn = dir.slice(-2);
  const dataFile = path.join(ROOT, 'assets', 'data', `week-${nn}.js`);
  const src = read(dataFile);
  if (!assert(!!src, dataFile, 'week data file missing')) return;

  const embed = (src.match(/"embedUrl":\s*"([^"]*)"/) || [])[1];
  assert(!!embed, dataFile, 'no brief.embedUrl in the data file');
  if (embed) {
    assert(embed.endsWith('-capture.html'), dataFile,
      `embedUrl must point at the capture wrapper, found '${embed}'`);
    assert(fs.existsSync(path.join(ROOT, dir, embed)), dataFile,
      `embedUrl target does not exist: ${dir}/${embed}`);
  }
  assert(/"weekKey":\s*"w\d+"/.test(src), dataFile, 'no meta.weekKey in the data file');
  assert(src.includes('window.BECURRENT_WEEK'), dataFile, 'data file must set window.BECURRENT_WEEK');
  assert(src.includes('GENERATED by scripts/build-weeks.js'), dataFile,
    'data file is missing its generated-file banner');
});
done(`${briefFiles.length} wrapper${briefFiles.length === 1 ? '' : 's'}, ${weekDirs.length} embed target${weekDirs.length === 1 ? '' : 's'} resolved`);

// ── Student work never leaves the device ─────────────────────────────────────
//
// Canvas is the only channel. A form post or a fetch of student writing to a
// third party would be a privacy problem that no visual check would catch, so it
// is asserted rather than trusted.
section('No capture channel but Canvas');
const studentPages = [];
weekDirs.forEach(dir => {
  glob(path.join(ROOT, dir), /\.html$/).forEach(f => studentPages.push(f));
});
studentPages.push(path.join(ROOT, 'index.html'));
[RENDERER].forEach(f => studentPages.push(f));

studentPages.forEach(file => {
  const src = read(file);
  if (!src) return;
  assert(!/<form[^>]*\saction=/i.test(src), file,
    'a <form action> on a student page would submit work off-device. Canvas is the only channel.');
  assert(!/\bfetch\s*\(/.test(src), file,
    'no fetch() on a student page: student writing must never be sent anywhere');
  assert(!/XMLHttpRequest/.test(src), file,
    'no XMLHttpRequest on a student page: student writing must never be sent anywhere');
  assert(!/docs\.google\.com\/forms/.test(src), file,
    'Google Forms are not a capture channel in this course');
});
done(`${studentPages.length} student-facing files carry no off-device capture`);

// ── Image integrity ──────────────────────────────────────────────────────────
//
// A text file named .jpg renders as a broken frame, which reads to a student as
// the site failing. Magic bytes, not extensions.
section('Image integrity');
const MAGIC = {
  '.png': [[0x89, 0x50, 0x4e, 0x47]],
  '.jpg': [[0xff, 0xd8, 0xff]],
  '.jpeg': [[0xff, 0xd8, 0xff]],
  '.gif': [[0x47, 0x49, 0x46, 0x38]],
  '.webp': [[0x52, 0x49, 0x46, 0x46]]
};

function walkImages(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walkImages(full); return; }
    const ext = path.extname(entry.name).toLowerCase();

    if (ext === '.svg') {
      const src = read(full) || '';
      // A viewBox alone leaves the intrinsic size undefined, and an <img>
      // holding one gets stretched until the picture is letterboxed off-screen.
      assert(/<svg[^>]*\swidth="[\d.]+"/.test(src) && /<svg[^>]*\sheight="[\d.]+"/.test(src), full,
        'an SVG must carry width and height on its root element, not a viewBox alone');
      assert(src.includes('<svg'), full, 'not an SVG');
      return;
    }

    const signatures = MAGIC[ext];
    if (!signatures) return;
    const buf = fs.readFileSync(full);
    const matched = signatures.some(sig => sig.every((b, i) => buf[i] === b));
    assert(matched, full, `magic bytes do not match ${ext}. Never commit a placeholder image file.`);
  });
}
walkImages(path.join(ROOT, 'assets', 'images'));
done('magic bytes checked, SVG intrinsic sizes checked');

// ── Local link integrity ─────────────────────────────────────────────────────
section('Local link integrity');
let linkCount = 0;
studentPages.filter(f => f.endsWith('.html')).forEach(file => {
  const src = read(file);
  if (!src) return;
  const re = /(?:href|src)="([^"#?][^"]*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const url = m[1];
    if (/^(https?:|mailto:|data:|\/\/)/.test(url)) continue;
    linkCount++;
    const target = path.resolve(path.dirname(file), url.split(/[?#]/)[0]);
    assert(fs.existsSync(target), file, `dead local link: ${url}`);
  }
});
done(`${linkCount} local links resolved`);

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(64)}`);
if (errors.length) {
  console.log(`${R}${W}${errors.length} problem${errors.length === 1 ? '' : 's'}${X} across ${checks} checks\n`);
  errors.forEach(e => console.log(`  ${R}✗${X} ${W}${e.file}${X}\n     ${e.message}`));
  console.log('');
  process.exit(1);
}
console.log(`${G}${W}All ${checks} structural checks passed.${X}`);
