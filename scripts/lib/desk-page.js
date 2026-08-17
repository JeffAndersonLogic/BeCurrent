'use strict';

/**
 * The Desk page.
 *
 * A protocol, rendered, plus the form the protocol asks a student to fill in. It
 * carries no story, no headline and no date in its source, which is what lets one
 * generated page serve every class period of the year. The one dated thing on the
 * page is written by the browser at load: see the header of
 * scripts/lib/desk-capture-block.js.
 *
 * ── The page answers questions in the order a student needs them ─────────────
 *
 * Watch, then hunt, then file, then copy. The sections are in that order and the
 * quick-nav is in that order, because the source buttons are useless after the
 * form and the form is unusable before the sources. A student who lands here
 * mid-period should be able to scroll to the step the room is on.
 *
 * ── What is deliberately NOT printed ────────────────────────────────────────
 *
 * The content module's `why` fields and its lanes' `note` fields are teacher
 * rationale, and none of them reach this page. They used to: the previous version
 * printed a paragraph of pedagogy under every routine step and every beat, which
 * was most of the page's length and none of its use. They now go to
 * docs/lesson-plans/the-desk.md, so nothing is lost and the student page is
 * things to do rather than an argument for doing them.
 *
 * The page also says nothing about nobody presenting. That is enforced in the
 * design and in validate.js, and stating it here would turn an ordinary absence
 * into an announcement, which draws attention to exactly the students it was meant
 * to protect.
 */

const { deskCaptureBlock } = require('./desk-capture-block');
const { CONFIDENCE_WORDS } = require('./brief-capture-block');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// Content that carries its own entities, e.g. a curly apostrophe written as &rsquo;.
function raw(s) { return String(s == null ? '' : s); }

/**
 * The confidence scale, Desk flavour.
 *
 * Byte-for-byte the same contract as the Brief's: `data-conf` and `aria-pressed`
 * are what the capture block reads, and the words come from the one table in
 * brief-capture-block.js that also writes them into the Canvas paste. A student
 * meets this row on a Brief and on the Desk inside the same block, so it has to
 * look and behave like one scale. The class is `.confidence` because that is the
 * flavour becurrent.css defines, which is the stylesheet this page loads.
 */
function confidenceRow(id, describe) {
  const buttons = [1, 2, 3, 4, 5].map(n =>
    `          <button type="button" data-conf="${n}" aria-pressed="false"
            aria-label="Confidence ${n} of 5, ${esc(CONFIDENCE_WORDS[n])}"><span class="conf-num">${n}</span><span class="conf-word">${esc(CONFIDENCE_WORDS[n])}</span></button>`
  ).join('\n');
  return `        <div class="confidence" id="confidence-${esc(id)}" role="group" aria-label="How well do you understand your own answer: ${esc(describe)}">
${buttons}
        </div>`;
}

/**
 * One story card: three facts you look up, then the questions you write.
 *
 * The facts are `<input>` rather than `<textarea>` on purpose. A single-line box
 * says "this is a lookup, not an essay", which is the whole reason the facts are
 * separated from the questions, and `type="url"` on the link field gets a
 * phone keyboard with a slash on it.
 */
function storyCard(lane, story) {
  const facts = (story.facts || []).map(f => {
    const id = `${lane.id}-${f.id}`;
    const type = f.id === 'link' ? 'url' : 'text';
    return `          <div class="fact">
            <label class="fact-label" for="answer-${esc(id)}">${esc(f.label)}</label>
            <p class="fact-ask">${esc(f.ask)}</p>
            <input class="fact-input" id="answer-${esc(id)}" type="${type}" autocomplete="off"
              spellcheck="false" placeholder="${esc(f.placeholder || '')}">
          </div>`;
  }).join('\n');

  const questions = (story.questions || []).map((q, i) => {
    const id = `${lane.id}-${q.id}`;
    const describe = `${lane.name} story, ${q.label}`;
    const tiers = (q.startHere || q.pushFurther) ? `
        <div class="tier-strip">
${q.startHere ? `          <div class="tier">
            <span class="tier-label">Start Here</span>
            <p>${raw(q.startHere)}</p>
          </div>` : ''}
${q.pushFurther ? `          <div class="tier">
            <span class="tier-label">Push Further</span>
            <p>${raw(q.pushFurther)}</p>
          </div>` : ''}
        </div>` : '';

    return `      <div class="desk-q">
        <span class="desk-q-num">Question ${i + 1}</span><span class="desk-q-skill">${esc(q.skill)}</span>
        <p class="desk-q-text" id="question-${esc(id)}">${esc(q.text)}</p>${tiers}
        <label class="visually-hidden" for="answer-${esc(id)}">${esc(describe)}</label>
        <textarea class="work-area" id="answer-${esc(id)}"
          placeholder="Two sentences. It saves as you type."></textarea>
${confidenceRow(id, describe)}
      </div>`;
  }).join('\n');

  return `      <article class="card story-card" id="story-${esc(lane.id)}">
        <div class="eyebrow">${esc(lane.name)}</div>
        <p class="lane-scope">${esc(lane.scope)}</p>
        <p class="lane-question">${esc(lane.question)}</p>
        <div class="fact-row">
${facts}
        </div>
${questions}
      </article>`;
}

function renderDeskPage(desk) {
  const m = desk.meta;
  const story = desk.story || {};
  const lanes = desk.lanes || [];

  const routine = (desk.routine || []).map(step => `        <li class="block-card">
          <div class="block-num">${esc(String(step.minutes))} min &middot; Step ${esc(String(step.n))}</div>
          <h3>${esc(step.name)}</h3>
          <p class="block-sub">${esc(step.what)}</p>
        </li>`).join('\n');

  // Grouped, because the student's real question is "where do I look for a LOCAL
  // story" and a flat list of a dozen outlets does not answer it.
  const sources = (desk.sources || []).map(g => `        <div class="source-group">
          <div class="eyebrow">${esc(g.group)}</div>
          <p class="source-what">${esc(g.what)}</p>
          <div class="source-grid">
${(g.links || []).map(l => `            <a class="source-btn" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
              <span class="source-name">${esc(l.name)}</span>
              <span class="source-note">${esc(l.note)}</span>
            </a>`).join('\n')}
          </div>
        </div>`).join('\n');

  const stories = lanes.map(lane => storyCard(lane, story)).join('\n');

  const ways = (story.ways || []).map(w => `            <li>${esc(w)}</li>`).join('\n');

  const rules = (desk.rules || []).map(r => `          <li class="rule">
            <p class="rule-text">${esc(r.rule)}</p>
            <p class="rule-why">${esc(r.why)}</p>
          </li>`).join('\n');

  const a = desk.accountability || {};
  const totalMinutes = (desk.routine || []).reduce((n, s) => n + (s.minutes || 0), 0);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BeCurrent | ${esc(m.title)}</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/becurrent-brand.css">
<link rel="stylesheet" href="../assets/css/becurrent.css">
<style>.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}</style>
</head>
<body>
<div class="site-shell">

  <header class="topbar">
    <nav class="nav">
      <a class="brand-mini" href="../index.html" aria-label="Return to the BeCurrent home page">
        <img src="../assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="1102" height="450">
      </a>
      <div class="nav-links">
        <a href="../index.html">Home</a>
        <a href="#routine">The Routine</a>
        <a href="#sources">Find a Story</a>
        <a href="#file">File</a>
        <a href="#week">My Week</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <p class="dateline">${esc(m.course)} &middot; Every class period &middot; ${esc(String(m.minutes))} minutes</p>
    <h1 class="logo-title">${esc(m.title)}</h1>
    <p class="hero-copy">
      <span>${esc(m.deck)}</span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="#sources">Find a Story</a>
      <a class="btn secondary" href="#file">File My Two Stories</a>
      <a class="btn secondary" href="#week">Copy My Week</a>
    </div>
  </section>

  <main>
    <section class="section" id="routine">
      <div class="section-header">
        <div class="eyebrow">The first ${esc(String(totalMinutes))} minutes</div>
        <h2>The same four steps, every class.</h2>
      </div>
      <ol class="block-list">
${routine}
      </ol>
    </section>

    <section class="section" id="sources">
      <div class="section-header">
        <div class="eyebrow">Step 2 &middot; Find a story</div>
        <h2>Two stories. One local, one from further out.</h2>
        <p>Every link opens in a new tab, so keep this one open. If a link is dead, use the
          search button in that group. Anything you bring from somewhere else is welcome, and
          it needs the same three facts: outlet, date, link.</p>
      </div>
      <div class="source-stack">
${sources}
      </div>
    </section>

    <section class="section" id="file">
      <div class="section-header">
        <div class="eyebrow">Step 3 &middot; File</div>
        <h2>Today&rsquo;s filing: <span class="desk-today" id="desk-today">today</span></h2>
        <p>${esc(story.intro || '')} Your work saves in this browser as you type, and each
          class period gets its own sheet.</p>
      </div>

      <div class="story-stack">
${stories}
      </div>

      <article class="card">
        <div class="prompt-block">
          <span class="prompt-label">Three ways to file, all equal</span>
          <ul class="ways">
${ways}
          </ul>
        </div>
      </article>
    </section>

    <section class="section" id="week">
      <div class="section-header">
        <div class="eyebrow">Step 4 &middot; Every day, before you leave</div>
        <h2>Copy your week into Canvas.</h2>
        <p>${esc(a.written || '')}</p>
      </div>
      <div class="gather-panel">
        <h3>My News Log</h3>
        <p>This gathers every day you have filed this week, today included. Press both
          buttons, then paste into the News Log assignment in Canvas.</p>
        <div class="quick-nav">
          <button class="btn" type="button" onclick="gatherDeskWork()">Gather My Week</button>
          <button class="btn secondary" type="button" onclick="copyDeskWork()">Copy to Clipboard</button>
        </div>
        <p class="gather-status" id="desk-gather-status" role="status"></p>
        <div class="gather-output" id="desk-gather-output" tabindex="0">
          <p class="gather-placeholder">Press <strong>Gather My Week</strong>, then
            <strong>Copy to Clipboard</strong>, then paste into Canvas.</p>
        </div>
      </div>
    </section>

    <section class="section" id="rules">
      <div class="section-header">
        <div class="eyebrow">How this works</div>
        <h2>What you can count on.</h2>
      </div>
      <article class="card rules-card">
        <ul class="rule-list">
${rules}
        </ul>
        <div class="prompt-block">
          <span class="prompt-label">Every class</span>
          ${esc(a.daily || '')}
        </div>
      </article>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand"><img src="../assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="1102" height="450"></div>
      <p>The Desk &middot; the daily half of every block. The other half is the unit.</p>
      <p>Read it. Check it. Then decide.</p>
    </div>
  </footer>
</div>
${deskCaptureBlock(lanes, story.facts, story.questions)}
</body>
</html>
`;
}

module.exports = { renderDeskPage };
