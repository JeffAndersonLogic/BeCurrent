/**
 * BeCurrent week renderer, v1.
 *
 * One renderer for every week. A week page is a thin HTML shell plus
 * assets/data/week-NN.js; everything a student sees on it is built here, so the
 * shell never has to be edited to change the shape of a module.
 *
 * The eight modules are fixed in number and order. See CLAUDE.md, "8-Module
 * Structure Standard". scripts/validate.js fails the build if a module id goes
 * missing or the count moves.
 *
 * Three things in this file are load-bearing and easy to break silently. Read
 * the comment above each before changing it:
 *
 *   1. bcOpenModal / bcCloseModal, the focus and scroll-lock contract.
 *   2. buildRecordManifest, the footer scripts/lib/canvas-parse-core.js reads.
 *   3. wireDeckControls, guarded on its own id so a re-render cannot double it.
 */
'use strict';

const W = window.BECURRENT_WEEK;

function byId(id) { return document.getElementById(id); }
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Storage ───────────────────────────────────────────────────────────────────
//
// One key per capture slot, namespaced by week, so two weeks open in two tabs
// cannot overwrite each other's work. The brief is the exception: it is a
// separate page inside an iframe and writes its own three answers under
// `becurrent-brief-<weekKey>`, which is the only channel by which they reach
// the Gather panel. scripts/validate.js asserts that this file, the brief
// template, and the capture block all agree on that key.
function weekKey() { return (W && W.meta && W.meta.weekKey) || 'w00'; }
function slotKey(slot) { return 'becurrent-week-' + weekKey() + '-' + slot; }
function briefKey() { return 'becurrent-brief-' + weekKey(); }

function readSlot(slot) {
  try { return localStorage.getItem(slotKey(slot)) || ''; } catch (e) { return ''; }
}
function writeSlot(slot, value) {
  try { localStorage.setItem(slotKey(slot), value); } catch (e) { /* private mode */ }
}
function readConfidence(slot) {
  try { return localStorage.getItem(slotKey(slot) + '-confidence') || ''; } catch (e) { return ''; }
}
function writeConfidence(slot, value) {
  try { localStorage.setItem(slotKey(slot) + '-confidence', value); } catch (e) { /* private mode */ }
}

// The brief's three answers, as its capture block wrote them.
function readBrief() {
  try {
    const raw = localStorage.getItem(briefKey());
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) { return {}; }
}

// ── Work capture widget ───────────────────────────────────────────────────────
//
// Every prompt a student answers on the week page goes through this, so the
// storage key, the autosave and the confidence scale cannot drift between
// modules.
// The five confidence words, one per button. The same table the briefs use, in
// scripts/lib/brief-capture-block.js, because a student meets both surfaces in one
// lesson and the scale has to be one scale. The row used to read "How confident
// are you?", five bare numerals, then "1 lost, 5 could teach it" off to the right,
// which asks the student to hold a legend in their head while they choose.
const CONFIDENCE_WORDS = { 1: 'Lost', 2: 'Shaky', 3: 'Getting it', 4: 'Solid', 5: 'Could teach it' };

function workArea(slot, prompt) {
  const saved = readSlot(slot);
  const conf = readConfidence(slot);
  const buttons = [1, 2, 3, 4, 5].map(n =>
    `<button type="button" data-conf="${n}" aria-pressed="${conf === String(n) ? 'true' : 'false'}"
      aria-label="Confidence ${n} of 5, ${esc(CONFIDENCE_WORDS[n])}"
      onclick="setConfidence('${slot}', '${n}')"><span class="conf-num">${n}</span><span class="conf-word">${esc(CONFIDENCE_WORDS[n])}</span></button>`
  ).join('');

  return `
    <div class="prompt-block">
      <span class="prompt-label">Your task</span>
      <p>${esc(prompt)}</p>
    </div>
    <label class="visually-hidden" for="work-${slot}">Your response</label>
    <textarea class="work-area" id="work-${slot}" data-slot="${slot}"
      placeholder="Write your response here. It saves as you type."
      oninput="saveWork('${slot}', this.value)">${esc(saved)}</textarea>
    <div class="confidence" id="conf-${slot}" role="group"
      aria-label="How well do you understand your own answer?">
      ${buttons}
    </div>`;
}

function saveWork(slot, value) { writeSlot(slot, value); }

function setConfidence(slot, value) {
  const current = readConfidence(slot);
  const next = current === value ? '' : value;
  writeConfidence(slot, next);
  const row = byId('conf-' + slot);
  if (!row) return;
  row.querySelectorAll('button[data-conf]').forEach(b => {
    b.setAttribute('aria-pressed', b.getAttribute('data-conf') === next ? 'true' : 'false');
  });
}

// ── The eight modules ─────────────────────────────────────────────────────────
//
// Fixed count, fixed order. `jump` scrolls the page, `link` opens an external
// tab, everything else opens the pop-out modal with render().
const MODULES = [
  { id: 'where', num: '01', label: 'Module 01', title: 'Where in the World',
    desc: 'Put this week\'s story on a map before you argue about it.',
    render: renderWhere },
  { id: 'brief', num: '02', label: 'Module 02', title: 'The Brief',
    desc: 'The week\'s reading, three questions, and a confidence check.',
    render: renderBrief },
  { id: 'background', num: '03', label: 'Module 03', title: 'Background',
    desc: 'The history and context behind the headline.',
    jump: '#background' },
  { id: 'coverage', num: '04', label: 'Module 04', title: 'Coverage Compare',
    desc: 'Same facts, different outlets. What did each one choose?',
    render: renderCoverage },
  { id: 'sourcecheck', num: '05', label: 'Module 05', title: 'Source Check',
    desc: 'Who published this, and how would you know if it were wrong?',
    render: renderSourceCheck },
  { id: 'claims', num: '06', label: 'Module 06', title: 'Claim & Evidence',
    desc: 'Sort the reporting from the interpretation.',
    render: renderClaims },
  { id: 'deliberation', num: '07', label: 'Module 07', title: 'The Deliberation',
    desc: 'Take a position, hear the other side, then revise.',
    link: true },
  { id: 'checkpoint', num: '08', label: 'Module 08', title: 'Checkpoint',
    desc: 'Show what you can now do with this week\'s story.',
    render: renderCheckpoint }
];

window.BECURRENT_MODULES = MODULES;

// ── Module renderers ──────────────────────────────────────────────────────────

function renderWhere() {
  const d = (W && W.where) || {};
  const places = (d.places || []).map(p => `<li>${p}</li>`).join('');
  const figure = d.mapUrl
    ? `<button type="button" class="enlargeable"
         aria-label="Enlarge the map: ${esc(d.mapCaption || 'this week\'s map')}"
         onclick="openLightbox('${esc(d.mapUrl)}', ${JSON.stringify(d.mapCaption || '')})">
         <img src="${esc(d.mapUrl)}" alt="${esc(d.mapCaption || '')}"
           onerror="this.onerror=null;this.src='../assets/images/week-art/map-fallback.svg'">
       </button>
       <p style="font-family:var(--ui);font-size:.78rem;color:var(--ink-soft);margin:8px 0 18px">
         ${esc(d.mapCaption || '')}</p>`
    : '';

  return `
    ${d.intro ? `<h4>Start here</h4><p>${d.intro}</p>` : ''}
    ${figure}
    ${places ? `<h4>Places to find</h4><ul class="step-list">${places}</ul>` : ''}
    ${workArea('where-response', d.prompt || 'Where is this story happening, and why does that place matter?')}`;
}

function renderBrief() {
  const d = (W && W.brief) || {};
  if (!d.embedUrl) {
    return '<p>This week\'s brief has not been published yet.</p>';
  }
  return `
    <p>${esc(d.deck || '')}</p>
    <iframe class="module-frame" src="${esc(d.embedUrl)}"
      title="The Brief, ${esc((W.meta && W.meta.week) || '')}"></iframe>
    <p style="font-family:var(--ui);font-size:.82rem;color:var(--ink-soft);margin-top:12px">
      Your three answers save inside the brief and are collected by
      <strong>Gather All My Work</strong> at the bottom of this page.</p>`;
}

function renderCoverage() {
  const d = (W && W.coverage) || {};
  const outlets = (d.outlets || []).map(o => `
    <div class="outlet">
      <div class="outlet-name">${esc(o.name)}</div>
      <p class="outlet-headline">${esc(o.headline)}</p>
      <p class="outlet-lede">${esc(o.lede)}</p>
      ${o.url ? `<p style="margin:10px 0 0"><a href="${esc(o.url)}" target="_blank" rel="noopener noreferrer"
        style="font-family:var(--ui);font-size:.76rem;font-weight:700">Read it in full</a></p>` : ''}
    </div>`).join('');

  return `
    ${d.intro ? `<h4>What to notice</h4><p>${d.intro}</p>` : ''}
    <div class="outlet-grid">${outlets}</div>
    ${workArea('coverage-response', d.prompt || 'What did each outlet choose to lead with, and what does that choice do to the reader?')}`;
}

function renderSourceCheck() {
  const d = (W && W.sourceCheck) || {};
  const steps = (d.steps || []).map(s => `<li>${s}</li>`).join('');
  return `
    ${d.intro ? `<h4>Lateral reading</h4><p>${d.intro}</p>` : ''}
    ${steps ? `<ol class="step-list">${steps}</ol>` : ''}
    ${workArea('sourcecheck-response', d.prompt || 'Who published this, what do they gain, and how would you know if it were wrong?')}`;
}

function renderClaims() {
  const d = (W && W.claims) || {};
  const statements = (d.statements || []).map((s, i) => `
    <li class="statement">
      <span class="statement-num">${String(i + 1).padStart(2, '0')}</span>${s.text}
    </li>`).join('');

  return `
    ${d.intro ? `<h4>Sort these</h4><p>${d.intro}</p>` : ''}
    <ul class="statement-list">${statements}</ul>
    ${workArea('claims-response', d.prompt || 'Which statements are verifiable facts, which are claims, and which are opinions? Say how you can tell.')}`;
}

function renderCheckpoint() {
  const d = (W && W.checkpoint) || {};
  const questions = (d.questions || []).map((q, i) =>
    `<li><strong>${i + 1}.</strong> ${q.q}${q.skill ? ` <span class="q-skill">${esc(q.skill)}</span>` : ''}</li>`
  ).join('');

  return `
    ${d.intro ? `<h4>Before you answer</h4><p>${d.intro}</p>` : ''}
    ${questions ? `<ul class="step-list">${questions}</ul>` : ''}
    ${workArea('checkpoint-response', d.prompt || 'Answer the questions above in a single connected paragraph.')}`;
}

// ── Modal focus contract ──────────────────────────────────────────────────────
//
// Carried from BeHistorical, where these exact bugs were paid for once already.
// Do not add a `.show` class without going through these two functions: doing so
// leaves a screen-reader user tabbing the page underneath the dialog, and the
// dialogs hold the map, the brief and the checkpoint, which is most of the week.
//
// A stack, not a single slot, because the lightbox opens from inside the module
// modal when a student enlarges the map. Escape closes the topmost dialog only,
// and each returns focus to whatever opened it.
const BCModalStack = [];

const BC_FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])', 'textarea:not([disabled])', 'iframe',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

// getClientRects() is the cheap "is it actually rendered" test. A control inside
// a hidden branch must not be a tab stop.
function bcFocusable(root) {
  return Array.prototype.slice.call(root.querySelectorAll(BC_FOCUSABLE))
    .filter(el => el.getClientRects().length > 0);
}

function bcTrapTab(event) {
  if (event.key !== 'Tab' || !BCModalStack.length) return;
  const top = BCModalStack[BCModalStack.length - 1].el;
  const items = bcFocusable(top);
  if (!items.length) { event.preventDefault(); top.focus(); return; }

  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  const outside = !top.contains(active);

  if (event.shiftKey && (active === first || outside)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || outside)) {
    event.preventDefault();
    first.focus();
  }
}

function bcOpenModal(modalId, labelId) {
  const el = byId(modalId);
  if (!el) return;

  // Idempotent per element. The background deck's prev/next arrows swap the card
  // inside the open dialog by calling this again; pushing an entry per call left
  // a five-card deck with five entries, one Close popped one, the stack stayed
  // non-empty, and document.body.style.overflow was never restored. The dialog
  // was gone, the page looked normal, and the student could not scroll until
  // they reloaded. Every structural check stayed green through all of it.
  if (!BCModalStack.some(item => item.el === el)) {
    BCModalStack.push({ el: el, launcher: document.activeElement });
  }
  el.setAttribute('aria-modal', 'true');
  if (labelId && byId(labelId)) el.setAttribute('aria-labelledby', labelId);
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  if (BCModalStack.length === 1) {
    document.addEventListener('keydown', bcTrapTab, true);
    document.body.style.overflow = 'hidden';
  }

  // Focus the dialog itself rather than its first control, so the label is
  // announced and the student hears what opened before hearing a button. A tick
  // late because the body was just replaced.
  setTimeout(() => { if (el.classList.contains('show')) el.focus(); }, 0);
}

function bcCloseModal(modalId) {
  const el = byId(modalId);
  if (!el) return;

  // Close anything stacked above this one too, so a stale entry cannot leave the
  // trap pointing at a hidden dialog.
  let entry = null;
  for (let i = BCModalStack.length - 1; i >= 0; i--) {
    const item = BCModalStack[i];
    BCModalStack.splice(i, 1);
    item.el.classList.remove('show');
    item.el.removeAttribute('aria-modal');
    if (item.el === el) { entry = item; break; }
  }

  // Release the lock on "no visible dialog" rather than "empty stack". That is
  // what makes a stranded student impossible: a stale entry can no longer hold
  // the page hostage.
  for (let i = BCModalStack.length - 1; i >= 0; i--) {
    if (BCModalStack[i].el === el) BCModalStack.splice(i, 1);
  }
  if (!BCModalStack.some(item => item.el.classList.contains('show'))) {
    BCModalStack.length = 0;
    document.removeEventListener('keydown', bcTrapTab, true);
    document.body.style.overflow = '';
  }

  // Back to the card that opened it. Landing at the top of the document instead
  // means re-tabbing the whole page to reach the next module.
  const launcher = entry && entry.launcher;
  if (launcher && launcher.focus && launcher.getClientRects().length) launcher.focus();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && BCModalStack.length) {
    bcCloseModal(BCModalStack[BCModalStack.length - 1].el.id);
  }
});

// ── Module open / close ───────────────────────────────────────────────────────

function jumpToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openModule(id) {
  const mod = MODULES.find(m => m.id === id);
  if (!mod) return;
  if (mod.jump) { jumpToSection(mod.jump); return; }
  if (mod.link) {
    const url = W && W.deliberation && W.deliberation.url;
    if (url) { window.open(url, '_blank', 'noopener'); return; }
    byId('pop-eyebrow').textContent = mod.label;
    byId('pop-title').textContent = mod.title;
    byId('pop-body').innerHTML =
      '<h4>Coming soon</h4><p>This week\'s deliberation has not been published yet. '
      + 'Your teacher will post it here.</p>';
    byId('pop-modal').classList.add('show');
    bcOpenModal('pop-modal', 'pop-title');
    return;
  }
  byId('pop-eyebrow').textContent = mod.label;
  byId('pop-title').textContent = mod.title;
  byId('pop-body').innerHTML = mod.render();
  byId('pop-modal').classList.add('show');
  bcOpenModal('pop-modal', 'pop-title');
}

function closeModule() { bcCloseModal('pop-modal'); }

// ── Lightbox ──────────────────────────────────────────────────────────────────

function openLightbox(url, caption) {
  byId('lightbox-img').src = url;
  byId('lightbox-img').alt = caption || '';
  byId('lightbox-caption').textContent = caption || '';
  byId('lightbox').classList.add('show');
  bcOpenModal('lightbox', 'lightbox-caption');
}
function closeLightbox() { bcCloseModal('lightbox'); }

// ── Background deck ───────────────────────────────────────────────────────────
//
// A sequence, so it carries sequence controls: prev/next, a "Card 3 of 8"
// counter, and the left/right arrow keys. The controls and Back to Modules are
// injected here rather than added to each week shell, so this file stays the
// only place that knows the deck's shape.
let deckIndex = 0;

function backgroundCards() { return (W && W.background && W.background.cards) || []; }

function openBackgroundCard(index) {
  const cards = backgroundCards();
  if (!cards.length) return;
  deckIndex = Math.max(0, Math.min(index, cards.length - 1));
  const card = cards[deckIndex];

  byId('background-title').textContent = card.title || '';
  byId('background-bullets').innerHTML = (card.bullets || []).map(b => `<li>${b}</li>`).join('');

  const wrap = byId('background-figure');
  if (card.img) {
    wrap.hidden = false;
    const img = byId('background-img');
    img.src = card.img;
    img.alt = card.caption || '';
    img.onerror = function () { this.onerror = null; this.src = '../assets/images/week-art/card-fallback.svg'; };
    byId('background-caption').textContent = card.caption || '';
  } else {
    wrap.hidden = true;
  }

  byId('deck-counter').textContent = `Card ${deckIndex + 1} of ${cards.length}`;
  byId('deck-prev').disabled = deckIndex === 0;
  byId('deck-next').disabled = deckIndex === cards.length - 1;

  byId('background-modal').classList.add('show');
  bcOpenModal('background-modal', 'background-title');
}

function deckStep(delta) { openBackgroundCard(deckIndex + delta); }
function closeBackgroundCard() { bcCloseModal('background-modal'); }

// Two exits, and they are not the same intention.
//
// Close returns the student to the card they opened, focus and all: a teacher
// stepping through a deck must not be yanked away from it. Back to Modules
// leaves the deck on purpose, so it scrolls to #modules and focuses the first
// module card with preventScroll, making the smooth scroll the only movement the
// student sees.
function backToModules() {
  bcCloseModal('background-modal');
  const modules = byId('modules');
  if (modules) modules.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const first = document.querySelector('#module-grid .module-card');
  if (first) first.focus({ preventScroll: true });
}

// Guarded on its own id. Without the guard a re-render doubles every button.
function wireDeckControls() {
  const host = byId('deck-controls');
  if (!host || byId('deck-prev')) return;
  host.innerHTML = `
    <button class="btn secondary" type="button" id="deck-prev" onclick="deckStep(-1)">&larr; Previous</button>
    <span class="deck-counter" id="deck-counter" aria-live="polite"></span>
    <button class="btn secondary" type="button" id="deck-next" onclick="deckStep(1)">Next &rarr;</button>
    <button class="btn quiet" type="button" id="deck-back" onclick="backToModules()">Back to Modules</button>`;
}

document.addEventListener('keydown', e => {
  const modal = byId('background-modal');
  if (!modal || !modal.classList.contains('show')) return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); deckStep(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); deckStep(1); }
});

// ── Capture slots ─────────────────────────────────────────────────────────────
//
// The one table that says what this week collects. The Gather panel, the
// denominator in "Gathered 6 of 8", and the record footer all read it, so a slot
// added to a module and not added here is a slot that never reaches Canvas.
const WORK_ITEMS = [
  { id: 'where-response', ord: '01', label: 'Module 01, Where in the World',
    prompt: () => (W.where && W.where.prompt) || '' },
  { id: 'brief-q1', ord: '02', label: 'Module 02, The Brief, Question 1', brief: 'q1' },
  { id: 'brief-q2', ord: '02', label: 'Module 02, The Brief, Question 2', brief: 'q2' },
  { id: 'brief-q3', ord: '02', label: 'Module 02, The Brief, Question 3', brief: 'q3' },
  { id: 'coverage-response', ord: '04', label: 'Module 04, Coverage Compare',
    prompt: () => (W.coverage && W.coverage.prompt) || '' },
  { id: 'sourcecheck-response', ord: '05', label: 'Module 05, Source Check',
    prompt: () => (W.sourceCheck && W.sourceCheck.prompt) || '' },
  { id: 'claims-response', ord: '06', label: 'Module 06, Claim & Evidence',
    prompt: () => (W.claims && W.claims.prompt) || '' },
  { id: 'checkpoint-response', ord: '08', label: 'Module 08, Checkpoint',
    prompt: () => (W.checkpoint && W.checkpoint.prompt) || '' }
];

// How many slots this week actually defines, which is the denominator the parser
// needs. A week with no brief published yet must not be reported as eight short.
function expectedCaptureCount() {
  const brief = W && W.brief && W.brief.embedUrl;
  let n = 0;
  WORK_ITEMS.forEach(item => {
    if (item.brief) { if (brief) n++; return; }
    let prompt = '';
    try { prompt = String(item.prompt() || '').trim(); } catch (e) { prompt = ''; }
    if (prompt) n++;
  });
  return n;
}

function gatherWork() {
  const brief = readBrief();
  const out = [];
  WORK_ITEMS.forEach(item => {
    let text = '';
    let prompt = '';
    if (item.brief) {
      const entry = brief[item.brief] || {};
      text = String(entry.answer || '').trim();
      prompt = String(entry.question || '').trim();
    } else {
      text = readSlot(item.id).trim();
      try { prompt = String(item.prompt() || '').trim(); } catch (e) { prompt = ''; }
    }
    if (!prompt) return;
    out.push({
      id: item.id, ord: item.ord, label: item.label,
      prompt: prompt, text: text,
      confidence: item.brief ? String((brief[item.brief] || {}).confidence || '') : readConfidence(item.id)
    });
  });
  return out;
}

// ── Record manifest ───────────────────────────────────────────────────────────
//
// The grammar itself lives in scripts/lib/canvas-record-block.js and is inlined
// below. It is shared with every generated Brief, because a Brief now carries its
// own Gather panel and a unit block Brief has no lesson shell around it, so that
// panel is the only route its answers have to Canvas. One writer, one parser: two
// copies of this would mean two answers to "did this student edit their work"
// depending on which button the student pressed.
//
// The two things that are NOT shared are the topic key and the denominator, both
// of which this surface computes for itself and passes in. See buildGatherDocument.

// BEGIN INLINED CANVAS RECORD BLOCK, generated by scripts/build-canvas-record.js
// ── The Canvas record grammar ─────────────────────────────────────────────────
//
// GENERATED from scripts/lib/canvas-record-block.js. Never hand-edit this block:
// the week renderer and all of the generated briefs carry the same copy, and
// scripts/validate.js fails the build when one of them drifts.
//
// The paste is the only evidence that reaches the teacher, and without this
// footer a truncated, half-empty or hand-edited one is indistinguishable from a
// good one. A blank paste that still carries every heading reads as "student
// wrote nothing" when the real cause is a wiped localStorage.
//
// Format is deliberately dumb. Canvas's editor rewrites HTML, so nothing may
// depend on a tag, an attribute or a class surviving. Every record is one
// self-delimiting line that a regex recovers from the submission's text content
// even if every newline collapses.
//
// The `#BHV|` and `#BHR|` tokens are shared with BeHistorical on purpose so one
// parser serves both courses. The sentinel is not, because that line is visible
// in the student's paste. See the header of scripts/lib/canvas-parse-core.js.
var BC_RECORD_VERSION = 1;
var BC_RECORD_OPEN = "--- BECURRENT RECORD, do not edit ---";
var BC_RECORD_CLOSE = "--- END BECURRENT RECORD ---";

function bcEsc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Canvas rewrites line breaks on the way in and again on the way out, so a hash
// over raw text would not survive its own round trip. Whitespace is collapsed
// before hashing: the check is "is this the same writing", not "are the newlines
// byte-identical".
function bcNormalizeForHash(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

// FNV-1a, 32-bit. Small, dependency-free, and identical to bhHash() in the Node
// parser. This detects accident and drift; it is not a tamper-proof signature,
// and nothing downstream should treat it as one.
function bcHash(value) {
  var s = bcNormalizeForHash(value);
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return ('0000000' + h.toString(16)).slice(-8);
}

function bcWordCount(value) {
  var s = bcNormalizeForHash(value);
  return s ? s.split(' ').length : 0;
}

// `|` and newlines are the record format's only reserved characters.
function bcField(value) {
  return String(value == null ? '' : value).replace(/[|\r\n]+/g, ' ').trim();
}

// Each paragraph its own <p>. The parser reads text content, so Canvas dropping
// the styling is fine, but it must not flatten a student's blank line: a blank
// line between paragraphs has to survive as two paragraphs, which is why the
// response is emitted as sibling <p> elements rather than with <br>.
//
// `wrap` is the inline tag the response is set in, or '' for none. The Brief
// sets responses in italics so the teacher can tell the student's writing from
// the prompt above it at a glance; the week page passes '' and stays plain.
//
// A blank answer emits NOTHING, and that is not laziness. Everything between the
// "My response:" marker and the next label is what the parser hashes back against
// the footer's `rh`, so a friendly "No response recorded." placeholder sitting
// there hashes as writing: the parser reports the answer as EDITED, which is an
// accusation, and never reports it as BLANK, which is the truth. The student is
// told about blanks by the gather status line, and the teacher by `w=0` in the
// footer, both of which are outside the hashed region.
function bcParagraphsHtml(text, wrap) {
  var open = wrap ? '<' + wrap + '>' : '';
  var close = wrap ? '</' + wrap + '>' : '';
  var parts = String(text || '').split(/\n{2,}/).map(function (p) { return p.trim(); })
    .filter(Boolean);
  return parts.map(function (p) {
    return '<p>' + open + bcEsc(p).replace(/\n/g, '<br>') + close + '</p>';
  }).join('');
}

/**
 * One header line, then one line per gathered response, between the sentinels.
 *
 * @param {Array}  work  [{ ord, id, label, prompt, text, confidence }]
 * @param {Object} opts  { topic, expected, isoStamp }
 *
 * `opts.expected` is how many slots the surface DEFINES, and it must always be
 * computed by the caller. A literal reports a week whose brief is not published
 * yet as three answers short, and a wrong denominator is worse than none.
 */
function bcRecordManifest(work, opts) {
  var o = opts || {};
  var rows = work.map(function (w) {
    return {
      ord: bcField(w.ord || 'xx'),
      slot: bcField(w.id),
      label: bcField(w.label),
      words: bcWordCount(w.text),
      chars: bcNormalizeForHash(w.text).length,
      promptHash: bcHash(w.prompt),
      responseHash: bcHash(w.text),
      confidence: w.confidence || ''
    };
  });

  // Sum over the per-response hashes, so deleting a whole record line breaks it
  // too, not just editing the writing inside one.
  var sum = bcHash(rows.map(function (r) { return r.slot + ':' + r.responseHash; }).join('|'));

  var header = '#BHV|v=' + BC_RECORD_VERSION
    + '|topic=' + bcField(o.topic)
    + '|copied=' + o.isoStamp
    + '|items=' + rows.length
    + '|expected=' + Number(o.expected || 0)
    + '|sum=' + sum + '|#';

  var lines = rows.map(function (r) {
    return '#BHR|i=' + r.ord
      + '|slot=' + r.slot
      + '|lab=' + r.label
      + '|w=' + r.words
      + '|c=' + r.chars
      + '|ph=' + r.promptHash
      + '|rh=' + r.responseHash
      + '|cf=' + r.confidence + '|#';
  });

  return [BC_RECORD_OPEN, header].concat(lines).concat([BC_RECORD_CLOSE]);
}

// Each line its own <p>. Canvas may drop the styling and that is fine, nothing
// parses the presentation.
function bcRecordFooterHtml(lines) {
  return '<hr>' + lines.map(function (line) {
    return '<p style="font-family:monospace;font-size:.68rem;opacity:.6;margin:.15rem 0;">'
      + bcEsc(line) + '</p>';
  }).join('');
}
// END INLINED CANVAS RECORD BLOCK

function buildGatherDocument() {
  const work = gatherWork();
  const stamp = new Date();
  const meta = (W && W.meta) || {};

  // The heading the parser's no-manifest fallback path looks for. It should
  // never be needed, but a paste that lost its footer is still identifiable.
  const head = [
    `<p><strong>CURRENT EVENTS, WEEK ${esc(String(meta.weekNumber || '').padStart(2, '0'))}</strong></p>`,
    `<p><em>Student work, copied ${stamp.toLocaleString()}</em></p>`,
    '<hr>'
  ];

  const body = work.map(w => [
    `<p><strong>${esc(w.label)}</strong></p>`,
    `<p><strong>Question:</strong> <em>${esc(w.prompt)}</em></p>`,
    '<p><strong>My response:</strong></p>',
    bcParagraphsHtml(w.text, '')
  ].join('\n')).join('\n<hr>\n');

  // The denominator is computed, never a literal. A hard-coded count would report
  // a week whose brief is not published yet as three answers short.
  const manifest = bcRecordManifest(work, {
    topic: weekKey(),
    expected: expectedCaptureCount(),
    isoStamp: stamp.toISOString()
  });
  const footer = bcRecordFooterHtml(manifest);

  const filled = work.filter(w => w.text).length;
  return { html: head.join('\n') + body + footer, count: filled, work: work };
}

function gatherAllWork() {
  const doc = buildGatherDocument();
  const out = byId('gather-output');
  if (out) out.value = doc.html.replace(/<\/p>/g, '</p>\n');

  const status = byId('gather-status');
  if (status) {
    const expected = expectedCaptureCount();
    const short = expected - doc.count;
    status.textContent = `Gathered ${doc.count} of ${expected} response${expected === 1 ? '' : 's'}.`
      + (short > 0 ? ` ${short} still blank.` : ' Nothing missing.');
    status.className = 'gather-status ' + (short > 0 ? 'short' : 'complete');
  }
  return doc;
}

async function copyGathered() {
  const out = byId('gather-output');
  if (!out || !out.value) gatherAllWork();
  const text = byId('gather-output').value;
  try {
    await navigator.clipboard.writeText(text);
    byId('gather-status').textContent = 'Copied. Paste it into the Canvas assignment.';
  } catch (e) {
    // Clipboard is blocked on some managed devices, so fall back to selecting
    // the text and telling the student what to press.
    byId('gather-output').select();
    byId('gather-status').textContent = 'Select-all done, now press Ctrl+C (or Cmd+C) to copy.';
  }
}

// ── Page build ────────────────────────────────────────────────────────────────

function renderHero() {
  const meta = (W && W.meta) || {};
  const t = byId('week-title');
  const s = byId('week-subtitle');
  const d = byId('week-dateline');
  if (t) t.textContent = meta.title || '';
  if (s) s.textContent = meta.subtitle || '';
  if (d) d.textContent = [meta.course, meta.week, meta.dateRange].filter(Boolean).join('  ·  ');
  if (meta.week) document.title = `BeCurrent | ${meta.week}`;
}

function renderTargets() {
  const host = byId('inline-targets');
  if (!host) return;
  const targets = (W && W.learningTargets) || [];
  const criteria = (W && W.successCriteria) || [];
  const list = items => items.map(i => `
    <li class="target-item">
      ${i.skill ? `<span class="skill-chip">${esc(i.skill)}</span>` : ''}
      <div>${i.target || i.criteria}</div>
    </li>`).join('');

  host.innerHTML = `
    <div class="card">
      <h3>I can &hellip;</h3>
      <ul class="target-list">${list(targets)}</ul>
    </div>
    <div class="card" style="margin-top:16px">
      <h3>You will know you are there when &hellip;</h3>
      <ul class="target-list">${list(criteria)}</ul>
    </div>`;
}

function renderModuleGrid() {
  const host = byId('module-grid');
  if (!host) return;
  host.innerHTML = MODULES.map(m => {
    const kind = m.jump ? 'Jumps down the page'
      : m.link ? 'Opens in a new tab'
      : 'Opens a pop-out';
    return `
      <button class="module-card" type="button" onclick="openModule('${m.id}')"
        aria-label="${esc(m.title)}, module ${m.num}">
        <span class="module-num">${m.num}</span>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.desc)}</p>
        <span class="module-kind">${kind}</span>
      </button>`;
  }).join('');
}

function renderBackgroundSection() {
  const d = (W && W.background) || {};
  const t = byId('background-section-title');
  const i = byId('background-intro');
  if (t) t.textContent = d.title || 'Background';
  if (i) i.textContent = d.intro || '';

  const host = byId('background-grid');
  if (!host) return;
  const cards = backgroundCards();
  host.innerHTML = cards.map((c, idx) => `
    <button class="background-card" type="button" onclick="openBackgroundCard(${idx})"
      aria-label="Open background card ${idx + 1}, ${esc(c.title || '')}">
      <h3>${esc(c.title || '')}</h3>
      <p>${esc((c.bullets && c.bullets[0]) ? String(c.bullets[0]).replace(/<[^>]*>/g, '').slice(0, 96) + '…' : '')}</p>
    </button>`).join('');
  wireDeckControls();
}

// ── Video ─────────────────────────────────────────────────────────────────────
//
// Video is an OPTIONAL resource and a first-class one. With this room's IEP/504
// load it is often the difference between a student meeting the content and not,
// so a lesson may be mostly video on a day when that is the right call.
//
// Two rules carried from BeHistorical, both learned the hard way:
//
//   1. The block INTRODUCES ITSELF when clips exist and HIDES ENTIRELY when they
//      do not. An empty container leaves a gap under the content that reads as
//      something failing to load.
//   2. A clip card is headed by ITS OWN TITLE, never by the words "Video Clip".
//
// Clips open in a new tab rather than embedding. An embed would put a third-party
// iframe on a page students use for schoolwork; a link does the same teaching job
// and sends nothing until the student chooses to go.
function renderVideos() {
  const host = byId('video-clips');
  if (!host) return;

  const videos = (W && W.videos) || [];
  if (!videos.length) { host.innerHTML = ''; host.hidden = true; return; }
  host.hidden = false;

  const cards = videos.map(v => {
    const meta = [v.source, v.duration].filter(Boolean).join(' · ');
    return `
      <article class="video-card">
        <h3>${esc(v.title)}</h3>
        ${meta ? `<p class="video-meta">${esc(meta)}${v.captions === false ? '' : ' · Captions available'}</p>` : ''}
        ${v.prompt ? `<div class="prompt-block">
          <span class="prompt-label">Watch for</span>
          <p>${esc(v.prompt)}</p>
        </div>` : ''}
        <a class="btn" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Open the video</a>
      </article>`;
  }).join('');

  host.innerHTML = `
    <div class="section-header">
      <div class="eyebrow">Watch Instead, or Watch Again</div>
      <h2>Video for this lesson</h2>
      <p>These cover the same ground as the reading. Use them instead of it, or after it
        for another pass. Read the "watch for" line before you start rather than trying
        to write down everything.</p>
    </div>
    <div class="video-grid">${cards}</div>`;
}

function renderGatherPanel() {
  const host = byId('gather-panel');
  if (!host) return;
  const note = (W && W.meta && W.meta.canvasSubmissionNote) || '';
  host.innerHTML = `
    <h3>Gather All My Work</h3>
    <p style="color:var(--ink-soft);margin:0 0 14px">${esc(note)}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" type="button" onclick="gatherAllWork()">Gather All My Work</button>
      <button class="btn secondary" type="button" onclick="copyGathered()">Copy to Clipboard</button>
    </div>
    <p class="gather-status" id="gather-status"></p>
    <label class="visually-hidden" for="gather-output">Gathered work</label>
    <textarea class="gather-output" id="gather-output" readonly
      placeholder="Click Gather All My Work, then Copy to Clipboard, then paste into Canvas."></textarea>`;
}

function renderFooter() {
  const el = byId('footer-week-label');
  if (el) el.textContent = (W && W.meta && W.meta.week) || '';
}

function renderWeek() {
  if (!W) {
    console.error('BeCurrent: no week data on the page. Load assets/data/week-NN.js before this renderer.');
    return;
  }
  renderHero();
  renderTargets();
  renderModuleGrid();
  renderBackgroundSection();
  renderVideos();
  renderGatherPanel();
  renderFooter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderWeek);
} else {
  renderWeek();
}
