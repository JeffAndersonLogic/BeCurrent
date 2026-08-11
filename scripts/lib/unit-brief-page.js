'use strict';

/**
 * The Brief, unit/block flavour.
 *
 * Separate from week-page.js on purpose. That file renders the week-01 orientation
 * reading and is pinned byte-for-byte by the reproducibility test; generalising it
 * to carry two-tier questions and a road-not-taken section would risk moving a byte
 * in a page that is already correct. Two small renderers beat one clever one here.
 *
 * Three things this adds over the week flavour:
 *
 *   1. START HERE / PUSH FURTHER on every question, matching the Block 1 deck.
 *      Both cards are the same size on purpose: the student picks, nobody assigns.
 *   2. A road-not-taken section, required by the content model. A backward trace
 *      only surfaces causes that led to the present, so without a named alternative
 *      the past reads as a corridor rather than a set of choices.
 *   3. Block numbering rather than Module 02, because a Brief can sit at any point
 *      in a unit.
 *
 * The capture block is the same shared lib the week briefs use, so the three answers
 * reach Canvas by exactly one code path in this repo.
 */

const { captureBlock } = require('./brief-capture-block');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Paragraph, callout and support bodies are raw HTML on purpose: <span class="kt">
// is how a key term is found on the page, and stripping it loses teaching.
function raw(s) { return String(s == null ? '' : s); }

// The coach prompt builder, only when there is a coach to send the prompt to.
// Rendering the buttons with no URL behind them is the dead-button failure the
// capture wrapper exists to prevent, so the whole section is omitted instead.
// The coach click interceptor, emitted only when a coach exists. The brief renders
// that button with no onclick of its own, so without this the button is dead — and
// with no coach at all, the button is not rendered either, so neither is this.
function coachIntercept(aiUrl) {
  if (!aiUrl) return '';
  return `    var AI_URL = ${JSON.stringify(aiUrl)};

    doc.addEventListener('click', function (event) {
      var el = event.target;
      while (el && el !== doc.body && !(el.tagName === 'BUTTON' || el.tagName === 'A')) el = el.parentNode;
      if (!el || el === doc.body) return;
      var label = (el.textContent || '').trim().toLowerCase();
      if (label === 'open ai coach') {
        event.preventDefault();
        window.open(AI_URL, '_blank', 'noopener');
      }
    }, true);
`;
}

function builderSection(aiUrl) {
  if (!aiUrl) return '';
  return `<section class="builder-section">
  <h2>Build Your AI Coach Prompt</h2>
  <p>This builds a prompt out of what you wrote above. The coach asks you questions rather than handing you answers, and nothing here is submitted, your work reaches your teacher through Canvas only.</p>
  <div class="builder-actions">
    <button class="btn" type="button" onclick="buildAiPrompt()">Build My Prompt</button>
    <button class="btn secondary" type="button" onclick="copyAiPrompt()">Copy Prompt</button>
    <button class="btn secondary" type="button" onclick="openAiCoach()">Open AI Coach</button>
  </div>
  <label class="visually-hidden" for="ai-output">Your generated coach prompt</label>
  <textarea id="ai-output" readonly placeholder="Click Build My Prompt."></textarea>
</section>

`;
}

function confidenceRow(id) {
  const buttons = [1, 2, 3, 4, 5].map(n =>
    `        <button type="button" data-conf="${n}" aria-pressed="false" aria-label="Confidence ${n} of 5">${n}</button>`
  ).join('\n');
  return `      <div class="q-confidence" id="confidence-${id}">
        <span class="confidence-label">Confidence</span>
${buttons}
        <span class="confidence-label tier-anchor">1 lost, 5 could teach it</span>
      </div>`;
}

function renderUnitBrief(unit, block) {
  const m = unit.meta;
  const key = block.key;
  const questions = block.questions || [];

  const supportCards = (block.support || []).map(c => `      <div class="support-card">
        <span class="support-label">${esc(c.label)}</span>
        <p>${raw(c.body)}</p>
      </div>`).join('\n');

  const terms = (block.terms || []).map(t =>
    `      <span class="term-chip">${esc(t)}</span>`).join('\n');

  const section = (s, i) => {
    const paragraphs = (s.paragraphs || []).map(p =>
      `      <p class="reading-text">${raw(p)}</p>`).join('\n');
    const callouts = (s.callouts || []).map(c => `      <div class="callout">
        <span class="callout-label">${esc(c.label)}</span>
        <p>${raw(c.body)}</p>
      </div>`).join('\n');
    return `    <div class="section">
      <div class="section-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
      <div class="section-label">${esc(s.label)}</div>
      <h2 class="section-heading">${esc(s.heading)}</h2>
${paragraphs}
${callouts}
    </div>`;
  };

  const sections = (block.sections || []).map(section).join('\n');

  const rnt = block.roadNotTaken;
  const roadNotTaken = rnt ? `
  <div class="road-not-taken">
    <div class="section-label">${esc(rnt.label)}</div>
    <h2 class="section-heading">${esc(rnt.heading)}</h2>
${(rnt.paragraphs || []).map(p => `    <p class="reading-text">${raw(p)}</p>`).join('\n')}
  </div>` : '';

  const questionItems = questions.map((q, i) => {
    const id = 'q' + (i + 1);
    const tiers = (q.startHere || q.pushFurther) ? `
        <div class="tier-strip">
          ${q.startHere ? `<div class="tier">
            <span class="tier-label">Start Here</span>
            <p>${raw(q.startHere)}</p>
          </div>` : ''}
          ${q.pushFurther ? `<div class="tier">
            <span class="tier-label">Push Further</span>
            <p>${raw(q.pushFurther)}</p>
          </div>` : ''}
        </div>` : '';

    return `      <div class="question-item">
        <span class="q-num">Question ${i + 1}</span><span class="q-skill">${esc(q.skill)}</span>
        <p class="q-text" id="question-${id}">${esc(q.text)}</p>${tiers}
        <label class="visually-hidden" for="answer-${id}">Your answer to question ${i + 1}</label>
        <textarea class="q-textarea" id="answer-${id}" placeholder="Write your answer here. It saves as you type."></textarea>
${confidenceRow(id)}
      </div>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Brief | ${esc(m.unit)} ${esc(block.block)} | BeCurrent</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/becurrent-brief.css">
<style>.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}</style>
</head>
<body>

<header class="module-header">
  <div class="inner">
    <div class="module-badge">${esc(block.block)}</div>
    <p class="module-name">The Brief</p>
    <p class="module-subtitle">${esc(m.unit)} &middot; ${esc(m.course)}</p>
  </div>
</header>

<div class="brief-title-band">
  <div class="brief-eyebrow">${esc(block.eyebrow)}</div>
  <h1 class="brief-title">${raw(block.title)}</h1>
  <p class="brief-deck">${esc(block.deck)}</p>
  <div class="skill-tags">
${(block.skillTags || []).map(t => `    <span class="skill-tag">${esc(t)}</span>`).join('\n')}
  </div>
</div>

<div class="brief-body">
  <div class="support-strip">
${supportCards}
  </div>

  <div class="vocab-strip">
${terms}
  </div>

${sections}
${roadNotTaken}

  <div class="be-ready">
    <span class="be-ready-label">BeReady: 10-Second Takeaway</span>
    <p>${raw(block.takeaway)}</p>
  </div>
</div>

<section class="check-section">
  <h2>Check Your Understanding</h2>
  <p>Answer in full sentences. Every question has two cards under it, and both are real answers &mdash; pick the one you want. Rate your confidence honestly, a 2 tells your teacher more than a dishonest 5.</p>
${questionItems}
</section>

${builderSection(m.aiCoachUrl)}<p class="page-footer-note">${esc(m.canvasSubmissionNote)}</p>

<nav class="module-footer">
  <a href="../index.html" target="_top">&larr; BeCurrent home</a>
  <a href="#top">Back to top &uarr;</a>
</nav>

${captureBlock(key, questions.length, m.aiCoachUrl)}
</body>
</html>
`;
}

/**
 * The iframe wrapper. Its only job is catching the AI coach click by label,
 * because the brief renders that button with no onclick of its own and relies on
 * the interception. A wrapper without it is a dead button.
 */
function renderUnitWrapper(unit, block, briefFile) {
  const m = unit.meta;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Brief Capture Wrapper | ${esc(m.unit)} ${esc(block.block)}</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<style>
  html, body { margin:0; padding:0; width:100%; height:100%; background:#171B1F; overflow:hidden; }
  iframe { width:100%; height:100vh; border:0; display:block; }
</style>
</head>
<body>
<iframe id="brief-frame" src="${esc(briefFile)}" title="The Brief, ${esc(m.unit)} ${esc(block.block)}"></iframe>
<script>
(function () {
  'use strict';
  function wireBriefCapture() {
    var frame = document.getElementById('brief-frame');
    var doc;
    try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc) return;

${coachIntercept(m.aiCoachUrl)}
    // Escape and the arrow keys cannot cross a document boundary, so a student
    // typing inside the brief could not close the modal that holds it. Forward the
    // keys the parent's modal contract listens for.
    doc.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      try {
        window.parent.document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      } catch (e) { /* cross-origin, nothing to forward to */ }
    }, true);
  }

  var frame = document.getElementById('brief-frame');
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') wireBriefCapture();
  frame.addEventListener('load', wireBriefCapture);
}());
</${''}script>
</body>
</html>
`;
}

module.exports = { renderUnitBrief, renderUnitWrapper };
