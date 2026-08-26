'use strict';

/**
 * The Desk 2.0 page renderer.
 *
 * The student experience is intentionally simpler than the original filing form:
 * one teacher-selected Lead, one student-selected Pick, one judgment, one journal.
 * The existing storage ids and Canvas record grammar stay stable underneath the
 * redesign. Current reporting comes from assets/data/daily-news.js rather than
 * being baked into this generated page.
 */

const { CONFIDENCE_WORDS } = require('./brief-capture-block');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function confidenceRow(id, describe) {
  const buttons = [1, 2, 3, 4, 5].map(n =>
    `          <button type="button" data-conf="${n}" aria-pressed="false" aria-label="Confidence ${n} of 5, ${esc(CONFIDENCE_WORDS[n])}"><span class="conf-num">${n}</span><span class="conf-word">${esc(CONFIDENCE_WORDS[n])}</span></button>`
  ).join('\n');
  return `        <div class="confidence" id="confidence-${esc(id)}" role="group" aria-label="How well do you understand your own answer: ${esc(describe)}">\n${buttons}\n        </div>`;
}

function sourceShelf(desk) {
  return (desk.sources || []).map(g => `        <details class="source-drawer">
          <summary>${esc(g.group)}</summary>
          <p class="source-what">${esc(g.what)}</p>
          <div class="source-links">
${(g.links || []).map(l => `            <a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(l.name)}</span><span>${esc(l.note)}</span></a>`).join('\n')}
          </div>
        </details>`).join('\n');
}

function leadCard() {
  return `      <article class="desk-lane-card lead-card" id="story-local">
        <span class="visually-hidden">The Lead</span>
        <div class="desk-card-head">
          <div class="desk-card-label">The Lead · everybody files this story</div>
          <h3>Know the story the room shares.</h3>
          <p>The source is already chosen. Read it, then separate the event from the reaction around it.</p>
        </div>
        <div class="lead-source-strip">
          <div class="lead-source-cell"><label for="answer-local-outlet">Outlet</label><input id="answer-local-outlet" type="text" autocomplete="off" spellcheck="false" aria-label="Lead outlet"></div>
          <div class="lead-source-cell"><label for="answer-local-date">Published</label><input id="answer-local-date" type="text" autocomplete="off" spellcheck="false" aria-label="Lead publication date"></div>
          <div class="lead-source-cell"><label for="answer-local-link">Source link</label><input id="answer-local-link" type="url" autocomplete="off" spellcheck="false" aria-label="Lead source link"></div>
        </div>
        <div class="desk-card-body">
          <div class="desk-prompt">
            <div class="desk-prompt-top"><span class="desk-q-num">01 · The event</span><span class="desk-q-skill">Framing</span></div>
            <p class="desk-prompt-text" id="question-local-what">What actually happened? Two sentences in your own words. Separate the event from the reaction to it.</p>
            <p class="desk-help">If the story begins with someone reacting, first identify the thing they are reacting to.</p>
            <label class="visually-hidden" for="answer-local-what">The Lead, what actually happened</label>
            <textarea class="work-area" id="answer-local-what" placeholder="Two sentences. It saves as you type."></textarea>
${confidenceRow('local-what', 'The Lead, what actually happened')}
          </div>
          <div class="desk-prompt">
            <div class="desk-prompt-top"><span class="desk-q-num">02 · Significance</span><span class="desk-q-skill">Generalizing from Evidence</span></div>
            <p class="desk-prompt-text" id="question-local-why">Why does this matter? Name what changed, who is affected, or what is likely to happen next.</p>
            <p class="desk-help">You are not being asked whether you like the story. Explain why it deserves attention.</p>
            <label class="visually-hidden" for="answer-local-why">The Lead, why it matters</label>
            <textarea class="work-area" id="answer-local-why" placeholder="One or two sentences. It saves as you type."></textarea>
${confidenceRow('local-why', 'The Lead, why it matters')}
          </div>
        </div>
      </article>`;
}

function pickCard() {
  return `      <article class="desk-lane-card pick-card" id="story-world">
        <span class="visually-hidden">Your Pick</span>
        <div class="desk-card-head">
          <div class="desk-card-label">Your Pick · choose what pulls you in</div>
          <h3>Follow one story you actually care about.</h3>
          <p>Politics is fine. So are science, technology, sports business, culture, courts, money, local government, war or something else worth knowing.</p>
        </div>
        <div class="pick-meta">
          <div class="wide"><label for="desk-pick-headline">Headline or story name</label><input id="desk-pick-headline" type="text" autocomplete="off" placeholder="What story did you choose?"></div>
          <div><label for="desk-pick-category">Beat</label><select id="desk-pick-category"><option value="">Choose a beat</option><option>Local</option><option>U.S.</option><option>World</option><option>Economy</option><option>Technology</option><option>Science</option><option>Culture</option><option>Sports & business</option><option>Other</option></select></div>
          <div><label for="desk-pick-reason">Why this one?</label><input id="desk-pick-reason" type="text" autocomplete="off" placeholder="What caught your attention?"></div>
          <label class="pick-local-check wide"><input id="desk-pick-local" type="checkbox"> <span>This is my <strong>local story</strong> for this News Log. You need at least one local pick during each two-week log.</span></label>
        </div>
        <div class="lead-source-strip">
          <div class="lead-source-cell"><label for="answer-world-outlet">Outlet</label><input id="answer-world-outlet" type="text" autocomplete="off" spellcheck="false" placeholder="Reuters, Times Sentinel, BBC News…"></div>
          <div class="lead-source-cell"><label for="answer-world-date">Published</label><input id="answer-world-date" type="text" autocomplete="off" spellcheck="false" placeholder="Month day, year"></div>
          <div class="lead-source-cell"><label for="answer-world-link">Source link</label><input id="answer-world-link" type="url" autocomplete="off" spellcheck="false" placeholder="https://…"></div>
        </div>
        <div class="desk-card-body">
          <div class="desk-prompt">
            <div class="desk-prompt-top"><span class="desk-q-num">03 · Your story</span><span class="desk-q-skill">Framing</span></div>
            <p class="desk-prompt-text" id="question-world-what">What actually happened in Your Pick? Give the event in two sentences, in your own words.</p>
            <p class="desk-help">Do not retell the entire article. Identify the change, decision, discovery or event.</p>
            <label class="visually-hidden" for="answer-world-what">Your Pick, what happened</label>
            <textarea class="work-area" id="answer-world-what" placeholder="Two sentences. It saves as you type."></textarea>
${confidenceRow('world-what', 'Your Pick, what happened')}
          </div>
          <div class="desk-prompt">
            <div class="desk-prompt-top"><span class="desk-q-num">04 · The judgment</span><span class="desk-q-skill">Significance</span></div>
            <p class="desk-prompt-text" id="question-world-why">Which of today’s two stories deserves more attention — The Lead or Your Pick — and why?</p>
            <p class="desk-help">Pick one. Your reason matters more than matching anyone else’s choice.</p>
            <label class="visually-hidden" for="answer-world-why">Which story deserves more attention and why</label>
            <textarea class="work-area" id="answer-world-why" placeholder="One or two sentences. Make the case."></textarea>
${confidenceRow('world-why', 'Which story deserves more attention and why')}
          </div>
        </div>
      </article>`;
}

function renderDeskPage(desk) {
  const a = desk.accountability || {};
  const story = desk.story || {};
  const lanes = desk.lanes || [];
  const cfg = {
    lanes: lanes.map(l => ({ id: l.id, name: l.name })),
    facts: (story.facts || []).map(f => ({ id: f.id, label: f.label })),
    questions: (story.questions || []).map(q => ({ id: q.id, label: q.label })),
    anchorMonday: (desk.log || {}).anchorMonday || '',
    weeks: Number((desk.log || {}).weeks) || 1
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="becurrent-log-anchor" content="${esc(cfg.anchorMonday)}">
<title>BeCurrent | The Desk</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/becurrent-2.css">
<link rel="stylesheet" href="../assets/css/desk-2.css">
</head>
<body class="desk-v2">
<div class="desk-shell">
  <header class="desk-topbar">
    <nav class="desk-nav" aria-label="The Desk navigation">
      <a class="desk-brand" href="../index.html" aria-label="BeCurrent home"><img src="../assets/images/brand/becurrent-logo.svg" alt="BeCurrent"></a>
      <div class="desk-navlinks">
        <a href="../index.html">Home</a>
        <a href="../announcements.html">Today</a>
        <a href="#file" aria-current="page">The Lead + Your Pick</a>
        <a href="#sources">Source Shelf</a>
        <a href="#journal">My Desk</a>
      </div>
    </nav>
  </header>

  <main class="desk-page">
    <section class="desk-hero" aria-labelledby="desk-lead-headline">
      <div class="desk-lead-visual" data-lead-image>
        <div class="desk-lead-copy">
          <div class="desk-kicker">Today’s Lead · everybody starts here</div>
          <h1 id="desk-lead-headline">Today’s lead story</h1>
          <p id="desk-lead-dek">Open the source, identify what actually happened, and file what matters.</p>
          <div class="desk-lead-meta"><span id="desk-lead-source">Teacher-selected source</span><span>·</span><span id="desk-lead-published">Today</span><span>·</span><a id="desk-lead-link" href="#file">Open the reporting →</a></div>
        </div>
      </div>
      <aside class="desk-brief">
        <div>
          <div class="desk-kicker">The daily move</div>
          <h2>Know one story together. Follow one story yourself.</h2>
          <p>The Desk is a news habit, not a worksheet. File enough to remember what happened and why it mattered.</p>
          <div class="desk-rhythm">
            <div class="desk-rhythm-row"><span class="desk-rhythm-num">01</span><div><strong>Know the Lead</strong><span>One important story the whole room shares.</span></div></div>
            <div class="desk-rhythm-row"><span class="desk-rhythm-num">02</span><div><strong>Choose Your Pick</strong><span>One story that genuinely catches your attention.</span></div></div>
            <div class="desk-rhythm-row"><span class="desk-rhythm-num">03</span><div><strong>File both</strong><span>What happened. Why it matters.</span></div></div>
            <div class="desk-rhythm-row"><span class="desk-rhythm-num">04</span><div><strong>Make one judgment</strong><span>Which story deserves more attention?</span></div></div>
            <div class="desk-rhythm-row"><span class="desk-rhythm-num">05</span><div><strong>Copy My Desk</strong><span>Paste the growing two-week log into Canvas.</span></div></div>
          </div>
        </div>
        <div class="desk-date-pill">Filing for <span class="desk-today" id="desk-today">today</span></div>
      </aside>
    </section>

    <section class="desk-section" id="file">
      <div class="desk-section-head"><div class="desk-kicker">File today</div><div><h2>The Lead + Your Pick</h2><p>Four short pieces of thinking. The source facts are lookups. Your writing saves on this Chromebook as you type.</p></div></div>
      <div class="desk-two">
${leadCard()}
${pickCard()}
      </div>
      <div class="local-progress" id="desk-local-progress"><strong>Local check:</strong> Make at least one Your Pick local during this two-week News Log.</div>
    </section>

    <section class="desk-section" id="sources">
      <div class="desk-section-head"><div class="desk-kicker">Source Shelf</div><div><h2>Find the story. Do not get trapped in the directory.</h2><p>The Current Wire is the fastest scan. Open a shelf only when you need somewhere to look. Anything credible from somewhere else is welcome too.</p></div></div>
      <div class="source-shelf">
        <div class="current-wire-shelf" id="desk-current-wire"><strong>Current Wire</strong></div>
${sourceShelf(desk)}
      </div>
    </section>

    <section class="desk-section" id="journal">
      <div class="desk-section-head"><div class="desk-kicker">My Desk</div><div><h2>Your two-week news journal.</h2><p>Use this as the running front page of what you followed. It builds itself from work saved on this device.</p></div></div>
      <div class="journal-shell">
        <div class="journal-head"><div><div class="desk-kicker">Current News Log</div><h3>Stories you followed</h3></div><p>Lead on the left. Your Pick on the right.</p></div>
        <div class="journal-list" id="desk-journal-list"><div class="journal-empty">Your Desk is empty. File today’s Lead and Your Pick to begin.</div></div>
      </div>
    </section>

    <section class="desk-section" id="week">
      <div class="desk-section-head"><div class="desk-kicker">Before you leave</div><div><h2>Copy My Desk into Canvas.</h2><p>${esc(a.written || 'Your News Log grows across the cycle. Paste it into the same Canvas assignment again each class period.')}</p></div></div>
      <div class="gather-panel">
        <h3>My News Log</h3>
        <p>Gather every day you have filed in the current two-week log, then copy the formatted record into the current News Log assignment in Canvas.</p>
        <p><strong>Copy it every class period.</strong> The work on this page is stored in this browser only until you paste it into Canvas.</p>
        <div class="desk-actions"><button class="desk-btn" type="button" onclick="gatherDeskWork()">Gather My Log</button><button class="desk-btn secondary" type="button" onclick="copyDeskWork()">Copy to Clipboard</button></div>
        <p class="gather-status" id="desk-gather-status" role="status"></p>
        <div class="gather-output" id="desk-gather-output" tabindex="0"><p class="gather-placeholder">Gather the log, copy it, then paste into Canvas.</p></div>
      </div>
    </section>
  </main>

  <footer class="desk-footer"><div class="desk-footer-inner"><span>BeCurrent · The Desk</span><span>Know the Lead. Choose Your Pick. Decide what deserves attention. · <a href="../index.html">Back to Home</a></span></div></footer>
</div>
<script src="../assets/data/daily-news.js"></script>
<script>window.BECURRENT_DESK_CONFIG = ${JSON.stringify(cfg)};</script>
<script src="../assets/js/desk-capture-v2.js"></script>
<script src="../assets/js/desk-2.js"></script>
</body>
</html>
`;
}

module.exports = { renderDeskPage };
