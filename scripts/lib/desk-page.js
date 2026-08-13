'use strict';

/**
 * The Desk page.
 *
 * A protocol, rendered. It carries no story, no headline and no date, which is
 * what lets one generated page serve every class period of the year. See the
 * header of scripts/lib/desk-content.js for why the daily half of a block is
 * built this way and the unit half is not.
 *
 * The page answers five questions, in the order a student standing in the
 * doorway needs them: am I going to be made to talk, what happens in the next
 * twenty-five minutes, what exactly am I filing, what is my beat for, and what
 * am I actually graded on.
 *
 * The promise comes first and is the largest thing under the title. A student
 * who is worried about being called on is not reading the rest of the page until
 * that worry is answered, and the students who need the answer most are the ones
 * who will not raise a hand to ask for it.
 */

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// Content that carries its own entities, e.g. a curly apostrophe written as &rsquo;.
function raw(s) { return String(s == null ? '' : s); }

function renderDeskPage(desk) {
  const m = desk.meta;
  const d = desk.dispatch || {};

  const routine = (desk.routine || []).map(step => `      <li class="block-card">
        <div class="block-num">${esc(String(step.minutes))} min &middot; Step ${esc(String(step.n))}</div>
        <h3>${esc(step.name)}</h3>
        <p class="block-sub">${esc(step.what)}</p>
        <p class="block-inclass">${esc(step.why)}</p>
      </li>`).join('\n');

  const fields = (d.fields || []).map((f, i) => `          <li class="field">
            <span class="field-n">${i + 1}</span>
            <div>
              <p class="field-label">${esc(f.label)}</p>
              <p class="field-ask">${esc(f.ask)}</p>
              <p class="field-stem">${esc(f.stem)}</p>
            </div>
          </li>`).join('\n');

  const tiers = (d.tiers || []).map(t => `          <div class="tier">
            <span class="tier-label">${esc(t.label)}</span>
            <p>${raw(t.text)}</p>
          </div>`).join('\n');

  const ways = (d.ways || []).map(w => `            <li>${esc(w)}</li>`).join('\n');

  const rules = (desk.rules || []).map(r => `        <li class="rule">
          <p class="rule-text">${esc(r.rule)}</p>
          <p class="rule-why">${esc(r.why)}</p>
        </li>`).join('\n');

  // The beats are cards rather than a list because each one carries a question,
  // and the question is the part that gets skipped when a beat is one line.
  const beats = (desk.beats || []).map(b => `        <article class="card beat-card">
          <div class="eyebrow">${esc(b.name)}</div>
          <p class="beat-scope">${esc(b.scope)}</p>
          <p class="beat-question">${esc(b.question)}</p>
          <p class="beat-note">${esc(b.note)}</p>
        </article>`).join('\n');

  const rotation = (desk.rotation || []).map(r =>
    `<span class="rotation-chip">${esc(r)}</span>`).join('\n            ');

  const resources = (desk.resources || []).map(r => `        <article class="card">
          <h3>${esc(r.name)}</h3>
          <p>${esc(r.what)}</p>
          <div class="prompt-block">
            <span class="prompt-label">How we use it</span>
            ${esc(r.how)}
          </div>
          <a class="btn" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Open ${esc(r.name)}</a>
        </article>`).join('\n');

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
        <a href="#routine">The Routine</a>
        <a href="#dispatch">The Dispatch</a>
        <a href="#beats">The Beats</a>
        <a href="#sources">Sources</a>
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
      <a class="btn" href="#dispatch">What I File</a>
      <a class="btn secondary" href="#beats">My Beat</a>
      <a class="btn secondary" href="#sources">Where to Look</a>
    </div>
  </section>

  <main>
    ${m.promise ? `<section class="section">
      <article class="card promise-card">
        <div class="eyebrow">The promise</div>
        <p class="promise-text">${esc(m.promise)}</p>
      </article>
    </section>` : ''}

    <section class="section" id="routine">
      <div class="section-header">
        <div class="eyebrow">The first ${esc(String(totalMinutes))} minutes</div>
        <h2>The same three steps, every class.</h2>
        <p>The Desk runs at the start of the block and then the block moves to the unit. It
          is deliberately short and deliberately identical every day: a routine you do not
          have to be told is a routine that leaves room to think about the story instead of
          the format.</p>
      </div>
      <ol class="block-list">
${routine}
      </ol>
    </section>

    <section class="section" id="dispatch">
      <div class="section-header">
        <div class="eyebrow">What you file</div>
        <h2>One dispatch. About thirty words.</h2>
        <p>${esc(d.intro || '')}</p>
      </div>
      <article class="card dispatch-card">
        <ol class="field-list">
${fields}
        </ol>
        <div class="tier-strip">
${tiers}
        </div>
        <div class="prompt-block">
          <span class="prompt-label">Three ways to file, all equal</span>
          <ul class="ways">
${ways}
          </ul>
        </div>
      </article>

      <article class="card rules-card">
        <h3>How this works, so you can count on it</h3>
        <ul class="rule-list">
${rules}
        </ul>
      </article>
    </section>

    <section class="section" id="beats">
      <div class="section-header">
        <div class="eyebrow">Your lane</div>
        <h2>Four beats. You file in one of them.</h2>
        <p>A beat is the lane your dispatch goes in, and it rotates weekly, so roughly a
          quarter of the room files each lane and the front page has four kinds of story on
          it. Each beat also carries the question it exists to ask, because finding a story
          is not the assignment.</p>
      </div>
      <div class="beat-grid">
${beats}
      </div>
      <article class="card rotation-card">
        <h3>The Choice beat rotates</h3>
        <p>So that all four lanes come up over a month, rather than the loudest one winning
          every week.</p>
        <div class="rotation-row">
            ${rotation}
        </div>
      </article>
    </section>

    <section class="section" id="sources">
      <div class="section-header">
        <div class="eyebrow">Standing sources</div>
        <h2>Two you can always start from.</h2>
        <p>Two rather than fifteen. A long list of sources is a list nobody opens, and
          these are the two this class already uses. Anything you bring from somewhere
          else is welcome, and it arrives with the same requirements the dispatch asks
          for: outlet, date, what happened.</p>
      </div>
      <div class="module-grid">
${resources}
      </div>
    </section>

    <section class="section" id="log">
      <div class="section-header">
        <div class="eyebrow">What you are graded on</div>
        <h2>The dispatches are practice. The log is the artifact.</h2>
      </div>
      <article class="card">
        <div class="prompt-block">
          <span class="prompt-label">Every class</span>
          ${esc(a.daily || '')}
        </div>
        <div class="prompt-block">
          <span class="prompt-label">Once a week, in Canvas</span>
          ${esc(a.written || '')}
        </div>
        <p>${esc(a.note || '')}</p>
      </article>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand"><img src="../assets/images/brand/becurrent-wordmark.svg" alt="BeCurrent" width="4889" height="810"></div>
      <p>The Desk &middot; the daily half of every block. The other half is the unit.</p>
      <p>Read it. Check it. Then decide.</p>
    </div>
  </footer>
</div>
</body>
</html>
`;
}

module.exports = { renderDeskPage };
