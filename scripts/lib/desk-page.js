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
 * ── Three sections, in the order a student does them ─────────────────────────
 *
 * Find a story, file it, copy the log. Nothing else. The source buttons are
 * useless after the form and the form is unusable before the sources, so the
 * order is fixed, and a student who lands here mid-period can scroll to the step
 * the room is on.
 *
 * ── What is deliberately NOT printed ────────────────────────────────────────
 *
 * **The routine and the house rules are not on this page**, and that is the
 * teacher's call rather than an omission. The four timed steps are what the
 * teacher runs, not what the student does with their hands, and the projector
 * board already shows them; the house rules are how the class works rather than
 * work to be done. Both still generate, into `announcements.html` and into
 * `docs/lesson-plans/the-desk.md`, so the room and the substitute folder still
 * have them. What is left here is only the three things a student acts on.
 *
 * That leaves `desk.routine` and `desk.rules` with no reader on this page. Do not
 * delete them from the content module: `build-announcements.js` reads the routine
 * for the projector slide, `build-lesson-plans.js` reads both, and `validate.js`
 * runs the presenting-language check over both. A field with no reader *here* is
 * not a field with no reader.
 *
 * The content module's `why` fields and its lanes' `note` fields are teacher
 * rationale, and none of them reach this page either. They used to: the previous
 * version printed a paragraph of pedagogy under every routine step and every
 * beat, which was most of the page's length and none of its use.
 *
 * The page also says nothing about nobody presenting. That is enforced in the
 * design and in validate.js, and stating it here would turn an ordinary absence
 * into an announcement, which draws attention to exactly the students it was meant
 * to protect.
 *
 * One line from the deleted rules card DID need to survive, and it moved into the
 * gather panel rather than leaving with the section: that a student's work lives in
 * this browser only until they copy it into Canvas. That is not a rule about how
 * the class runs, it is the reason the last step exists.
 *
 * `story.ways` is off the page too. Those are the accommodations, typing, dictation
 * or a paper card, and the box read as a menu of SUBMISSION routes, which it never
 * was: submission is Canvas and only Canvas, and the gather panel says so where it
 * matters. It still generates into the lesson plan, because a substitute and a 504
 * meeting are exactly who need to know that dictation is normal here rather than a
 * favour. Do not delete it from the content module.
 *
 * No minute counts anywhere on this page. The Desk runs about half the block and is
 * allowed to run long, so a number printed at students is a promise the room does
 * not keep. The per-step timings stay in `docs/lesson-plans/the-desk.md`, which is
 * where a substitute needs them.
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

  // Grouped, because the student's real question is "where do I look for a LOCAL
  // story" and a flat list of a dozen outlets does not answer it.
  //
  // Each one is a real button rather than a hyperlinked word. A run of blue
  // underlined names reads as prose to skim, and this is the step a student has
  // five minutes for: a button is a thing you press, and it is also a target you
  // can hit on a phone. The note rides inside it, because "who is Bloomberg" is
  // the whole reason the button is worth pressing rather than guessing.
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

  const a = desk.accountability || {};

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
        <a href="#sources">Find a Story</a>
        <a href="#file">File</a>
        <a href="#week">My Log</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <p class="dateline">${esc(m.course)} &middot; Every class period</p>
    <h1 class="logo-title">${esc(m.title)}</h1>
    <p class="hero-copy">
      <span>${esc(m.deck)}</span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="#sources">Find a Story</a>
      <a class="btn secondary" href="#file">File My Two Stories</a>
      <a class="btn secondary" href="#week">Copy My Log</a>
    </div>
  </section>

  <main>
    <section class="section" id="sources">
      <div class="section-header">
        <div class="eyebrow">Step 1 &middot; Find a story</div>
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
        <div class="eyebrow">Step 2 &middot; File</div>
        <h2>Today&rsquo;s filing: <span class="desk-today" id="desk-today">today</span></h2>
        <p>${esc(story.intro || '')} Your work saves in this browser as you type, and each
          class period gets its own sheet.</p>
      </div>

      <div class="story-stack">
${stories}
      </div>

    </section>

    <section class="section" id="week">
      <div class="section-header">
        <div class="eyebrow">Step 3 &middot; Every day, before you leave</div>
        <h2>Copy your log into Canvas.</h2>
        <p>${esc(a.written || '')}</p>
      </div>
      <div class="gather-panel">
        <h3>My News Log</h3>
        <p>This gathers every day you have filed in the current News Log, today
          included. Press both buttons, then paste into the News Log assignment in
          Canvas.</p>
        <p><strong>Do this every day, not just on the last day.</strong> Your filings are saved in
          this browser only until you copy them into Canvas, so pasting daily is also your
          backup.</p>
        <div class="quick-nav">
          <button class="btn" type="button" onclick="gatherDeskWork()">Gather My Log</button>
          <button class="btn secondary" type="button" onclick="copyDeskWork()">Copy to Clipboard</button>
        </div>
        <p class="gather-status" id="desk-gather-status" role="status"></p>
        <div class="gather-output" id="desk-gather-output" tabindex="0">
          <p class="gather-placeholder">Press <strong>Gather My Log</strong>, then
            <strong>Copy to Clipboard</strong>, then paste into Canvas.</p>
        </div>
      </div>
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
${deskCaptureBlock(lanes, story.facts, story.questions, desk.log)}
</body>
</html>
`;
}

module.exports = { renderDeskPage };
