'use strict';

/**
 * The unit page. One per theme, tying its topics together.
 *
 * What this page is for: a student who missed a topic, or who wants to know where
 * the unit is going, can see the whole arc in one screen. It is a MAP, not a lesson
 * container, so it links to what exists and says plainly when a topic has nothing to
 * link because the work happened on paper.
 *
 * Three things it deliberately does:
 *
 *   1. Puts the terminal question at the top, before the topics. The Topic 1 script
 *      announces it on day one and returns to it two weeks later, and a student who
 *      is chewing on it for two weeks argues better in Topic 5 than one who meets it
 *      cold.
 *   2. Numbers the topics, because they are genuinely a sequence: the trace in Topic
 *      1 is what Topic 4 checks against a real document. The numbers carry
 *      information rather than decorating.
 *   3. Says "on paper, nothing to open" out loud rather than rendering a dead link
 *      or an empty card. A topic with no artifact is a design decision, not a gap.
 *
 * Topics are read from the content module, so a unit page never needs editing when a
 * topic is added, renamed, or given a Brief it did not have.
 */

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// Topic titles carry <em> for the accent word, same as the Briefs.
function raw(s) { return String(s == null ? '' : s); }

function slugify(s) {
  return String(s).toLowerCase().replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function briefFileFor(topic) {
  const nn = String(topic.n).padStart(2, '0');
  return `topic-${nn}-brief-${topic.slug || slugify(topic.topic)}.html`;
}

function renderUnitPage(unit) {
  const m = unit.meta;
  const topics = unit.topics || [];

  const competencyList = Object.keys(m.competencies || {})
    .map(k => `      <li class="competency"><span class="competency-n">${esc(k)}</span>${esc(m.competencies[k])}</li>`)
    .join('\n');

  const topicCards = topics.map(b => {
    const hasBrief = !!(b.sections && b.sections.length);
    const clips = b.videos || [];

    // What a student can actually open. A topic with nothing says so.
    const actions = [];
    if (hasBrief) {
      actions.push(`          <a class="btn" href="${esc(briefFileFor(b).replace(/\.html$/, '-capture.html'))}">Read the Brief</a>`);
    }
    clips.forEach(v => {
      // A clip is headed by its own title, but a real headline is a long button.
      // `linkLabel` is an optional short label for this row only; the card in the
      // Brief still carries the published title in full, because that title is
      // often the thing being taken apart.
      const label = v.linkLabel || v.title;
      actions.push(`          <a class="btn secondary" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`);
    });

    // Anything else a student can open for this topic that is neither the Brief
    // nor a clip: the slides from class, a handout, a tool. Optional, and absent
    // by default, so every existing topic renders byte for byte as before.
    (b.resources || []).forEach(r => {
      actions.push(`          <a class="btn secondary" href="${esc(r.url)}"${/^https?:/.test(r.url) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(r.label)}</a>`);
    });
    const actionRow = actions.length
      ? `        <div class="topic-actions">\n${actions.join('\n')}\n        </div>`
      : `        <p class="topic-onpaper">Done on paper in class. Nothing to open here.</p>`;

    const tags = (b.competencies || []).map(n =>
      `<span class="competency-tag" title="${esc((m.competencies || {})[n] || '')}">Competency ${esc(n)}</span>`
    ).join('\n          ');

    // Targets and criteria are folded away rather than printed open. This page is a
    // map: a student scanning five topics for the one they missed should not have to
    // scroll past thirty "I can" statements to find it. The board projects them open,
    // which is where they are actually read aloud.
    const targets = (b.learningTargets || []).map(t =>
      `            <li><span class="target-skill">${esc(t.skill)}</span>${esc(t.target)}</li>`
    ).join('\n');
    const criteria = (b.successCriteria || []).map(c =>
      `            <li><span class="target-skill">${esc(c.skill)}</span>${esc(c.criteria)}</li>`
    ).join('\n');
    const plan = (b.overview || targets || criteria) ? `        <details class="topic-plan">
          <summary>What you are learning, and how you know you have it</summary>
${b.overview ? `          <p class="topic-overview">${esc(b.overview)}</p>` : ''}
${targets ? `          <div class="target-group">
            <h4>What you are learning</h4>
            <ul class="target-list">
${targets}
            </ul>
          </div>` : ''}
${criteria ? `          <div class="target-group">
            <h4>You have got it when</h4>
            <ul class="target-list">
${criteria}
            </ul>
          </div>` : ''}
        </details>` : '';

    return `      <li class="topic-card">
        <div class="topic-num">Topic ${esc(String(b.n))}</div>
        <h3>${raw(b.title)}</h3>
        <p class="topic-sub">${esc(b.subtitle || '')}</p>
        ${b.inClass ? `<p class="topic-inclass">${esc(b.inClass)}</p>` : ''}
        ${tags ? `<div class="competency-tags">\n          ${tags}\n        </div>` : ''}
${plan}
${actionRow}
      </li>`;
  }).join('\n');

  const withBriefs = topics.filter(b => b.sections && b.sections.length).length;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BeCurrent | ${esc(m.unit)}</title>
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
        <a href="#question">The Question</a>
        <a href="#topics">The Topics</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <p class="dateline">${esc(m.course)} &middot; Unit &middot; ${esc(String(m.topics || topics.length))} topics</p>
    <h1 class="logo-title">${esc(m.unit)}</h1>
    <p class="hero-copy">
      <span>${esc(m.overview || '')}</span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="#topics">The Topics</a>
      <a class="btn secondary" href="#question">The Question</a>
    </div>
  </section>

  <main>
    ${m.terminalQuestion ? `<section class="section" id="question">
      <div class="section-header">
        <div class="eyebrow">Hold onto this for two weeks</div>
        <h2>The question this unit ends on</h2>
      </div>
      <article class="card terminal-question">
        <p class="terminal-question-text">${esc(m.terminalQuestion)}</p>
        <p class="terminal-question-note">You do not have to answer it yet, and you will not be
          graded on which side you land. You will be graded on whether you can state the
          strongest version of the argument against you.</p>
      </article>
    </section>` : ''}

    <section class="section" id="topics">
      <div class="section-header">
        <div class="eyebrow">The Arc</div>
        <h2>Five topics, in order.</h2>
        <p>Each one uses the earlier ones. The chain you draw in Topic 1 is what you check
          against a real document in Topic 4, so they are a sequence rather than a list.</p>
      </div>
      <ol class="topic-list">
${topicCards}
      </ol>
    </section>

    <section class="section" id="competencies">
      <div class="section-header">
        <div class="eyebrow">Indiana 1512 &middot; Current Problems, Issues, and Events</div>
        <h2>What this unit is assessed against</h2>
      </div>
      <article class="card">
        <ol class="competency-list">
${competencyList}
        </ol>
      </article>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand"><img src="../assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="1102" height="450"></div>
      <p>${esc(m.unit)} &middot; ${esc(String(withBriefs))} of ${esc(String(topics.length))} topics have a Brief. The rest happen on paper.</p>
      <p>Read it. Check it. Then decide.</p>
    </div>
  </footer>
</div>
</body>
</html>
`;
}

module.exports = { renderUnitPage, briefFileFor };
