'use strict';

/**
 * The unit page. One per theme, tying its blocks together.
 *
 * What this page is for: a student who missed a block, or who wants to know where
 * the unit is going, can see the whole arc in one screen. It is a MAP, not a lesson
 * container, so it links to what exists and says plainly when a block has nothing to
 * link because the work happened on paper.
 *
 * Three things it deliberately does:
 *
 *   1. Puts the terminal question at the top, before the blocks. The Block 1 script
 *      announces it on day one and returns to it two weeks later, and a student who
 *      is chewing on it for two weeks argues better in Block 5 than one who meets it
 *      cold.
 *   2. Numbers the blocks, because they are genuinely a sequence: the trace in Block
 *      1 is what Block 4 checks against a real document. The numbers carry
 *      information rather than decorating.
 *   3. Says "on paper, nothing to open" out loud rather than rendering a dead link
 *      or an empty card. A block with no artifact is a design decision, not a gap.
 *
 * Blocks are read from the content module, so a unit page never needs editing when a
 * block is added, renamed, or given a Brief it did not have.
 */

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// Block titles carry <em> for the accent word, same as the Briefs.
function raw(s) { return String(s == null ? '' : s); }

function slugify(s) {
  return String(s).toLowerCase().replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function briefFileFor(block) {
  const nn = String(block.n).padStart(2, '0');
  return `block-${nn}-brief-${block.slug || slugify(block.block)}.html`;
}

function renderUnitPage(unit) {
  const m = unit.meta;
  const blocks = unit.blocks || [];

  const competencyList = Object.keys(m.competencies || {})
    .map(k => `      <li class="competency"><span class="competency-n">${esc(k)}</span>${esc(m.competencies[k])}</li>`)
    .join('\n');

  const blockCards = blocks.map(b => {
    const hasBrief = !!(b.sections && b.sections.length);
    const clips = b.videos || [];

    // What a student can actually open. A block with nothing says so.
    const actions = [];
    if (hasBrief) {
      actions.push(`          <a class="btn" href="${esc(briefFileFor(b).replace(/\.html$/, '-capture.html'))}">Read the Brief</a>`);
    }
    clips.forEach(v => {
      actions.push(`          <a class="btn secondary" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">${esc(v.title)}</a>`);
    });
    const actionRow = actions.length
      ? `        <div class="block-actions">\n${actions.join('\n')}\n        </div>`
      : `        <p class="block-onpaper">Done on paper in class. Nothing to open here.</p>`;

    const tags = (b.competencies || []).map(n =>
      `<span class="competency-tag" title="${esc((m.competencies || {})[n] || '')}">Competency ${esc(n)}</span>`
    ).join('\n          ');

    return `      <li class="block-card">
        <div class="block-num">Block ${esc(String(b.n))}</div>
        <h3>${raw(b.title)}</h3>
        <p class="block-sub">${esc(b.subtitle || '')}</p>
        ${b.inClass ? `<p class="block-inclass">${esc(b.inClass)}</p>` : ''}
        ${tags ? `<div class="competency-tags">\n          ${tags}\n        </div>` : ''}
${actionRow}
      </li>`;
  }).join('\n');

  const withBriefs = blocks.filter(b => b.sections && b.sections.length).length;

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
        <img src="../assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="4889" height="810">
      </a>
      <div class="nav-links">
        <a href="../index.html">Home</a>
        <a href="#question">The Question</a>
        <a href="#blocks">The Blocks</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="top">
    <p class="dateline">${esc(m.course)} &middot; Unit &middot; ${esc(String(m.blocks || blocks.length))} blocks</p>
    <h1 class="logo-title">${esc(m.unit)}</h1>
    <p class="hero-copy">
      <span>${esc(m.overview || '')}</span>
    </p>
    <div class="quick-nav">
      <a class="btn" href="#blocks">The Blocks</a>
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

    <section class="section" id="blocks">
      <div class="section-header">
        <div class="eyebrow">The Arc</div>
        <h2>Five blocks, in order.</h2>
        <p>Each one uses the earlier ones. The chain you draw in Block 1 is what you check
          against a real document in Block 4, so they are a sequence rather than a list.</p>
      </div>
      <ol class="block-list">
${blockCards}
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
      <div class="footer-brand"><img src="../assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="4889" height="810"></div>
      <p>${esc(m.unit)} &middot; ${esc(String(withBriefs))} of ${esc(String(blocks.length))} blocks have a Brief. The rest happen on paper.</p>
      <p>Read it. Check it. Then decide.</p>
    </div>
  </footer>
</div>
</body>
</html>
`;
}

module.exports = { renderUnitPage, briefFileFor };
