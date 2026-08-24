'use strict';

/**
 * The brief template. Every generated brief in this repo comes out of here.
 *
 * There are no hand-authored briefs and there must never be one. The reason is
 * not tidiness: a change to the brief system reaches a generated brief by
 * rebuilding, and reaches a hand-authored one only by writing a sweep script
 * that patches HTML in place. Every such script is permanent maintenance debt
 * and can only fix a problem someone already knows about. With 36 weeks a year
 * that debt compounds faster than anyone will keep up with.
 *
 * When the template cannot yet express something a week needs, add it as an
 * OPTIONAL parameter that defaults to current behaviour, then rebuild and
 * confirm not one byte moved. That is the step that catches escaping bugs.
 */

const { captureBlock, CONFIDENCE_WORDS } = require('./brief-capture-block');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Section, callout and support-card bodies are taken as raw HTML on purpose.
// `<span class="kt">` is how a key term is found on the page; stripping it would
// lose teaching, not styling.
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

// A video path through the reading, for students who need one. Placed directly
// under the support strip rather than at the end, because a student who needs the
// video should not have to scroll past 1,000 words of prose to discover it exists.
// Omitted entirely when the block has no clips.
function videoStrip(videos) {
  if (!videos || !videos.length) return '';
  const cards = videos.map(v => {
    const meta = [v.source, v.duration].filter(Boolean).join(' · ');
    return `      <div class="brief-video">
        <span class="brief-video-label">Watch instead</span>
        <p class="brief-video-title">${esc(v.title)}</p>
        ${meta ? `<p class="brief-video-meta">${esc(meta)}</p>` : ''}
        ${v.prompt ? `<p class="brief-video-prompt">${esc(v.prompt)}</p>` : ''}
        <a class="btn secondary" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Open the video</a>
      </div>`;
  }).join('\n');
  return `  <div class="brief-video-strip">
${cards}
  </div>

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

/**
 * The confidence scale. Each button carries its own word.
 *
 * It used to read "Confidence", five bare numerals, then "1 lost, 5 could teach
 * it" off to the right, which asks the student to hold a legend in their head
 * while they choose. The word is now on the thing being pressed. The row keeps a
 * hidden name because dropping the visible label would otherwise leave five
 * buttons announced with no idea what they are a scale of.
 *
 * Kept identical to unit-brief-page.js on purpose: the two renderers stay
 * separate so week 01 cannot be moved a byte by a unit change, but a student who
 * meets both surfaces must meet one scale.
 */
function confidenceRow(id) {
  const buttons = [1, 2, 3, 4, 5].map(n =>
    `        <button type="button" data-conf="${n}" aria-pressed="false"
          aria-label="Confidence ${n} of 5, ${esc(CONFIDENCE_WORDS[n])}"><span class="conf-num">${n}</span><span class="conf-word">${esc(CONFIDENCE_WORDS[n])}</span></button>`
  ).join('\n');
  return `      <div class="q-confidence" id="confidence-${id}" role="group" aria-label="How well do you understand your own answer to question ${id.replace(/\D/g, '')}?">
${buttons}
      </div>`;
}

/**
 * Gather All My Work, on the Brief.
 *
 * A week Brief has two routes to Canvas: this one, and the week page's Gather
 * panel, which pulls these same three answers out of localStorage along with
 * every other module. The note says which is which, because two buttons with the
 * same label collecting different amounts of work is exactly the confusion worth
 * spending a sentence to avoid.
 */
function gatherSection() {
  return `<section class="gather-section">
  <h2>Gather All My Work</h2>
  <p>Gather your three answers here, copy them, and paste them into Canvas. If your teacher asked for the whole week rather than just the reading, use the <strong>Gather All My Work</strong> panel at the bottom of the week page instead, which picks up these three answers along with every other module.</p>
  <div class="gather-actions">
    <button class="btn" type="button" onclick="gatherBriefWork()">Gather All My Work</button>
    <button class="btn secondary" type="button" onclick="copyBriefWork()">Copy to Clipboard</button>
  </div>
  <p class="gather-status" id="brief-gather-status" role="status"></p>
  <div class="gather-output" id="brief-gather-output" tabindex="0">
    <p class="gather-placeholder">Press <strong>Gather All My Work</strong>, then <strong>Copy to Clipboard</strong>, then paste into Canvas.</p>
  </div>
</section>

`;
}

function renderBrief(week) {
  const m = week.meta;
  const key = m.weekKey;
  const questions = week.questions || [];

  const supportCards = (week.support || []).map(c => `      <div class="support-card">
        <span class="support-label">${esc(c.label)}</span>
        <p>${raw(c.body)}</p>
      </div>`).join('\n');

  const terms = (week.terms || []).map(t =>
    `      <span class="term-chip">${esc(t)}</span>`).join('\n');

  const sections = (week.sections || []).map((s, i) => {
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
  }).join('\n');

  const questionItems = questions.map((q, i) => {
    const id = 'q' + (i + 1);
    return `      <div class="question-item">
        <span class="q-num">Question ${i + 1}</span><span class="q-skill">${esc(q.skill)}</span>
        <p class="q-text" id="question-${id}">${esc(q.text)}</p>
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
<title>The Brief | ${esc(m.week)} | BeCurrent</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/becurrent-brand.css">
<link rel="stylesheet" href="../assets/css/becurrent-brief.css">
<style>.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}</style>
</head>
<body>

<header class="module-header">
  <div class="inner">
    <div class="module-badge">Module 02</div>
    <p class="module-name">The Brief</p>
    <p class="module-subtitle">${esc(m.week)} &middot; ${esc(m.course)}</p>
  </div>
</header>

<div class="brief-title-band">
  <div class="brief-eyebrow">${esc(week.eyebrow)}</div>
  <h1 class="brief-title">${raw(week.title)}</h1>
  <p class="brief-deck">${esc(week.deck)}</p>
  <div class="skill-tags">
${(week.skillTags || []).map(t => `    <span class="skill-tag">${esc(t)}</span>`).join('\n')}
  </div>
</div>

<div class="brief-body">
  <div class="support-strip">
${supportCards}
  </div>

  <div class="vocab-strip">
${terms}
  </div>

${videoStrip(week.videos)}${sections}

  <div class="be-ready">
    <span class="be-ready-label">BeReady: 10-second takeaway</span>
    <p>${raw(week.takeaway)}</p>
  </div>
</div>

<section class="check-section">
  <h2>Check Your Understanding</h2>
  <p>Three questions. Answer in full sentences, and rate your confidence honestly, a Shaky tells your teacher more than a dishonest Could teach it.</p>
${questionItems}
</section>

${gatherSection()}${builderSection(m.aiCoachUrl)}<p class="page-footer-note">${esc(m.canvasSubmissionNote)}</p>

<nav class="module-footer">
  <a href="index.html">&larr; Where in the World</a>
  <a href="index.html#background">Background &rarr;</a>
</nav>

${captureBlock(key, questions.length, m.aiCoachUrl)}
</body>
</html>
`;
}

/**
 * The capture wrapper. A thin iframe host whose only job is catching the AI
 * coach click by label, because most briefs render that button with no onclick
 * of their own. A wrapper without the interception is a dead button, so the
 * week data file must always point `brief.embedUrl` at the wrapper and never at
 * the brief itself.
 */
function renderWrapper(week, briefFile) {
  const m = week.meta;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Brief Capture Wrapper | ${esc(m.week)}</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<style>
  /* --black-900, as a literal. This wrapper links no stylesheet on purpose:
     it is a bare iframe host, and pulling in the brand file would make it
     download three fonts to render nothing. The one cost is that this value
     has to be kept in step with becurrent-brand.css by hand. It is only ever
     seen for the instant before the brief paints. */
  html, body { margin:0; padding:0; width:100%; height:100%; background:#111111; overflow:hidden; }
  iframe { width:100%; height:100vh; border:0; display:block; }
</style>
</head>
<body>
<iframe id="brief-frame" src="${esc(briefFile)}" title="The Brief, ${esc(m.week)}"></iframe>
<script>
(function () {
  'use strict';
  function wireBriefCapture() {
    var frame = document.getElementById('brief-frame');
    var doc;
    try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc) return;

${coachIntercept(m.aiCoachUrl)}
    // Escape cannot cross a document boundary, so a student typing inside the brief
    // could not close the modal holding it. Forward the key the parent's modal
    // contract listens for.
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

module.exports = { renderBrief, renderWrapper };
