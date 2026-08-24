'use strict';

/**
 * The unit study guide. One page, the whole unit, for the review day before the
 * assessment.
 *
 * ── IT IS PUBLIC, AND THAT IS THE OPPOSITE CALL FROM THE EXAM ────────────────
 *
 * docs/assessments/README.md explains at length why the exam and its key are kept
 * out of this repository: it is public, Pages serves every committed file, and a
 * published exam is a spent exam. A study guide is the inverse. It is written for
 * students, they cannot use it unless they can reach it, and there is nothing in
 * it they were not already taught. So it ships on the site like any other page.
 *
 * The line between the two is not "how secret is it", it is WHAT IT IS BUILT
 * FROM. This page is generated from the unit content module and never from the
 * item bank, and that is load-bearing rather than tidy. A guide generated from
 * the bank would be a map of the test: its weighting would show which topics
 * carry the most items, and its emphasis would tell a student which paragraphs
 * to skip. Built from the unit, it says what the unit taught, which is the thing
 * a student should actually be revising. It therefore covers material the test
 * does not reach, deliberately, and it says so on the page.
 *
 * ── EVERY DEFINITION IS LIFTED, NOT REWRITTEN ───────────────────────────────
 *
 * The glossary is extracted from the Brief's own prose rather than authored here.
 * The unit content module's header states the convention it relies on: "every key
 * term defined in the sentence it first appears in", marked with
 * `<span class="kt">`. So `definitionFor` finds that span and returns the
 * sentence around it.
 *
 * A hand-written glossary would be a second copy of every definition in the
 * course, and the failure would be silent in the worst way: the Brief and the
 * study guide would each read correctly on their own, and the student who revised
 * from the wrong one is the only person who ever finds out. Lifting means a
 * reworded definition reaches the guide by rebuilding, and a term that stops being
 * defined in the reading fails the build instead of quietly going missing here.
 *
 * ── NO SCRIPT ───────────────────────────────────────────────────────────────
 *
 * This page ships no <script> at all, the same rule BeHistorical's deep readings
 * hold. A page with no script cannot ship a SyntaxError that silently discards its
 * own behaviour, and this one has no behaviour to lose: it is read, printed and
 * projected. Self-check answers that reveal on a click would be the obvious thing
 * to add and would trade that guarantee for very little, because the answers are
 * in the Brief the question came from and sending a student back to the reading is
 * the better outcome anyway.
 *
 * The one hand-authored input is `studyGuide.namesAndCases` on a topic, the list
 * of people, dates and cases a student should be able to name. Those live in the
 * unit content module beside the prose they came from, never in a file of their
 * own, and validate.js checks every year in one appears in that topic's reading.
 */

const MARK = 'KTKTKT';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function raw(s) { return String(s == null ? '' : s); }

function textOf(html) {
  return String(html == null ? '' : html)
    .replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function reEsc(s) { return String(s).replace(/[.*+?^${}()|[\]\\/]/g, '\\$&'); }

// Sentence split. The lookahead for a capital is what keeps "5 billion." and a
// mid-sentence abbreviation from splitting, and it is also why MARK is made of
// capitals: a sentinel starting with punctuation stops the sentence before it
// from splitting at all, which silently glues two sentences into one definition.
function sentences(t) {
  return t.split(/(?<=[.!?])\s+(?=[A-Z"'])/g).map(s => s.trim()).filter(Boolean);
}

// Every prose body in a topic, in reading order. A term is defined wherever it is
// first marked, and that is a callout as often as a paragraph: `tradeoff` and
// `unintended consequence` are both defined in one.
function bodies(topic) {
  const out = [];
  (topic.sections || []).forEach(sec => {
    (sec.paragraphs || []).forEach(p => out.push(p));
    (sec.callouts || []).forEach(c => out.push(c.body));
  });
  if (topic.roadNotTaken) (topic.roadNotTaken.paragraphs || []).forEach(p => out.push(p));
  return out;
}

/**
 * The sentence in this topic's reading that defines `term`, or null.
 *
 * Exported because validate.js runs it: a term listed in `terms` that this cannot
 * find is a term the reading stopped defining, and the guide would otherwise print
 * a chip with nothing under it.
 */
function definitionFor(topic, term) {
  // The reading writes "Bots" and "Echo chambers" where `terms` has the singular,
  // so the match tolerates a plural on either side.
  const span = new RegExp(`<span class="kt">\\s*${reEsc(term)}e?s?\\s*</span>`, 'i');
  // Only strip a leading repetition of the term when it is a run-in heading, which
  // is the term followed by a stop. "Clickbait. A headline written to..." loses
  // its first two words; "Ranking means putting things in an order" keeps all of
  // them, and an unconditional strip turns that definition into "Means putting".
  const runIn = new RegExp(`^\\s*${reEsc(term)}e?s?\\s*[.:]\\s+`, 'i');

  for (const body of bodies(topic)) {
    if (!span.test(body)) continue;

    // Mark the term's own occurrence before flattening. Searching the flat text
    // for the term instead finds whichever mention comes first, which is usually
    // a run-in heading several sentences above the definition: the social
    // comparison paragraph opens "<strong>Social comparison.</strong>" with no
    // span on it at all.
    const flat = textOf(String(body).replace(span, m => MARK + m));
    const ss = sentences(flat);
    const idx = ss.findIndex(s => s.includes(MARK));
    if (idx < 0) continue;

    let out = ss[idx];
    const tail = out.slice(out.indexOf(MARK)).replace(MARK, '');
    // Two shapes where the sentence holding the term is not the definition: a
    // run-in heading, and a sentence that ends on the term ("The most useful
    // habit is lateral reading."). In both the definition is the next sentence.
    const endsOnTerm = tail.replace(/[^a-z]/gi, '').length
      <= term.replace(/[^a-z]/gi, '').length + 4;
    if (endsOnTerm && ss[idx + 1]) out = `${out} ${ss[idx + 1]}`;

    out = out.replace(MARK, '')
      // Topic 6 sets its positions out as "The case:" and "The tradeoff:". Those
      // are that page's layout, not part of what the word means.
      .replace(/^(The case|The tradeoff):\s*/i, '')
      .replace(runIn, '')
      .replace(/^(And|So|Then|But)\s+/, '');
    return out.charAt(0).toUpperCase() + out.slice(1);
  }
  return null;
}

// The Standard callouts are the grading standard, stated by the topic that set it.
// They are the single most useful thing to reread the night before, and they are
// pulled by label rather than by position because a topic may carry more than one
// and may carry none.
function standards(topic) {
  const out = [];
  (topic.sections || []).forEach(sec => {
    (sec.callouts || []).forEach(c => {
      if (/^the standard$/i.test(String(c.label || '').trim())) out.push(textOf(c.body));
    });
  });
  return out;
}

function renderTopic(unit, topic) {
  const terms = (topic.terms || [])
    .map(t => ({ term: t, def: definitionFor(topic, t) }))
    .filter(t => t.def);
  const cases = (topic.studyGuide || {}).namesAndCases || [];
  const criteria = topic.successCriteria || [];
  const std = standards(topic);
  const questions = topic.questions || [];

  const big = topic.takeaway || topic.overview || '';

  const parts = [];

  parts.push(`  <section class="section" id="topic-${topic.n}">
    <div class="section-number" aria-hidden="true">${esc(String(topic.n))}</div>
    <p class="section-label">Topic ${esc(String(topic.n))}${topic.onPaper ? ' &middot; done on paper' : ''}</p>
    <h2 class="section-heading">${raw(topic.title)}</h2>`);

  if (big) {
    parts.push(`    <p class="sg-big"><b>The big idea.</b> ${esc(big)}</p>`);
  }

  if (criteria.length) {
    parts.push(`    <h3 class="sg-h3">You have got it when you can</h3>
    <ul class="sg-list">
${criteria.map(c => `      <li><span class="sg-skill">${esc(c.skill)}</span>${esc(c.criteria)}</li>`).join('\n')}
    </ul>`);
  }

  if (terms.length) {
    parts.push(`    <h3 class="sg-h3">Words you have to be able to use</h3>
    <dl class="sg-terms">
${terms.map(t => `      <dt>${esc(t.term)}</dt>
      <dd>${esc(t.def)}</dd>`).join('\n')}
    </dl>`);
  }

  if (cases.length) {
    // The heading follows what is actually in the list. Topics 3 to 6 carry dated
    // cases; Topics 1 and 2 happened on paper and carry the two moves the room
    // made, so heading those "Names, dates and cases" would be labelling "The
    // chain" as a date. A year in any entry is the tell.
    const dated = cases.some(c => /\b(1[89]\d\d|20\d\d)\b/.test(`${c.name} ${c.what}`));
    parts.push(`    <h3 class="sg-h3">${dated ? 'Names, dates and cases' : 'The moves to have ready'}</h3>
    <dl class="sg-terms sg-cases">
${cases.map(c => `      <dt>${esc(c.name)}</dt>
      <dd>${esc(c.what)}</dd>`).join('\n')}
    </dl>`);
  }

  std.forEach(body => {
    parts.push(`    <div class="callout"><b>The standard for a complete answer.</b> ${esc(body)}</div>`);
  });

  if (topic.roadNotTaken && topic.roadNotTaken.heading) {
    parts.push(`    <p class="sg-careful"><b>Do not oversimplify this.</b> ${esc(topic.roadNotTaken.heading)}.</p>`);
  }

  if (questions.length) {
    parts.push(`    <h3 class="sg-h3">Check yourself</h3>
    <ol class="sg-check">
${questions.map(q => `      <li><span class="q-skill">${esc(q.skill)}</span>${esc(textOf(q.text))}</li>`).join('\n')}
    </ol>
    <p class="sg-check-note">These are the questions from this topic's Brief. If one of them
      stops you, the answer is in that reading rather than here, and going back to it is the
      point.</p>`);
  }

  parts.push('  </section>');
  return parts.join('\n');
}

function renderStudyGuide(unit) {
  const m = unit.meta;
  const topics = unit.topics || [];
  const termTotal = topics.reduce(
    (n, t) => n + (t.terms || []).filter(x => definitionFor(t, x)).length, 0);

  // The Brief's shell exactly: brand tokens, the Brief stylesheet, module-header,
  // title band, brief-body, module-footer. No site chrome, and specifically NOT
  // becurrent.css.
  //
  // That is not a style preference, it is a collision. Both stylesheets define
  // `.section`, and the site's version is `width:min(1160px,92vw)`. Loaded after
  // the Brief's, it widens every section on this page to 92vw inside an 820px
  // body, and the whole page scrolls sideways: 1039px of content in a 1000px
  // window, and 326 in a 320 one. Nothing looks broken, the text just runs under
  // the right edge. Loading only what a Brief loads is what keeps that shut, and
  // it is also the honest description of this page: it is a reading.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Study Guide | ${esc(m.unit)} | BeCurrent</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/becurrent-brand.css">
<link rel="stylesheet" href="../assets/css/becurrent-brief.css">
<style>
  /* Study-guide-only shapes. Everything else is the Brief's own stylesheet, so
     this reads as part of the course rather than as a handout from elsewhere. */
  .sg-big { margin:0 0 1.4rem; }
  .sg-h3 { font-family:var(--ui); font-size:.7rem; font-weight:700;
           text-transform:uppercase; letter-spacing:.14em; color:var(--signal-deep);
           margin:1.6rem 0 .5rem; }
  .sg-list { margin:0 0 1.2rem; padding-left:1.2rem; }
  .sg-list li { margin:.4rem 0; }
  .sg-skill { display:block; font-family:var(--ui); font-size:.62rem; font-weight:700;
              text-transform:uppercase; letter-spacing:.12em; color:var(--ink-soft); }
  .sg-terms { margin:0 0 1.2rem; }
  .sg-terms dt { font-weight:700; color:var(--signal-deep); margin:.9rem 0 .15rem; }
  .sg-terms dd { margin:0; padding-left:.9rem; border-left:2px solid var(--paper-line); }
  .sg-cases dt { color:var(--ink); }
  .sg-careful { border-left:3px solid var(--signal); padding:.5rem 0 .5rem .9rem; margin:1.2rem 0; }
  .sg-check { margin:0 0 .6rem; padding-left:1.3rem; }
  .sg-check li { margin:.6rem 0; }
  .sg-check-note { font-size:.9rem; color:var(--ink-soft); margin:0; }
  /* minmax(min(100%,N),1fr), never a bare floor: a bare 15rem track cannot go
     under 15rem, so at 320px the row scrolls the whole page sideways. */
  .sg-toc { list-style:none; margin:0 0 26px; padding:0; display:grid; gap:.4rem;
            grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr)); }
  .sg-toc a { display:block; padding:.45rem .6rem; border:1px solid var(--paper-line);
              text-decoration:none; color:var(--ink); font-size:.92rem; }
  .sg-toc a:hover { border-color:var(--signal); }
  .sg-toc b { color:var(--signal-deep); }
  @media print {
    .sg-toc, .module-footer { display:none; }
    .sg-terms dt, h2.section-heading, .sg-h3 { page-break-after:avoid; }
  }
</style>
</head>
<body>

<header class="module-header" id="top">
  <div class="inner">
    <div class="module-badge">Review</div>
    <p class="module-name">Study Guide</p>
    <p class="module-subtitle">${esc(m.unit)} &middot; ${esc(m.course)}</p>
  </div>
</header>

<div class="brief-title-band">
  <div class="brief-eyebrow">${esc(m.course)} &middot; ${esc(m.unit)}</div>
  <h1 class="brief-title">The Whole <em>Unit</em>, On One Page</h1>
  <p class="brief-deck">${esc(String(topics.length))} topics, ${esc(String(termTotal))} words
    you have to be able to use, and the cases you should be able to name.</p>
</div>

<div class="brief-body">

  <div class="support-strip">
    <div class="support-card">
      <span class="support-label">How to use this</span>
      <p>Work down it topic by topic. Anything you cannot say out loud, go back to that
        topic&rsquo;s Brief and reread the part it came from. This page is an index of what
        you were taught, not a replacement for it, and a word you can only recognize is a
        word you cannot use.</p>
    </div>
    <div class="support-card">
      <span class="support-label">What is on the assessment</span>
      <p>All ${esc(String(topics.length))} topics. Nothing on it asks you whether social
        media is good or bad, and nothing asks you to take a side on the question below. It
        asks how the thing works, what the evidence says, and what the argument about it is
        made of.</p>
    </div>
  </div>

  <ul class="sg-toc">
${topics.map(t => `    <li><a href="#topic-${t.n}"><b>Topic ${esc(String(t.n))}</b> ${esc(textOf(t.title))}</a></li>`).join('\n')}
  </ul>

${m.terminalQuestion ? `  <div class="callout">
    <b>The question the unit ends on.</b> ${esc(m.terminalQuestion)} You are not graded on
    which side you land. You are graded on whether you can state the strongest version of the
    argument against you, and on whether you can name the tradeoff in your own position and
    not only in somebody else&rsquo;s.
  </div>` : ''}

${topics.map(t => renderTopic(unit, t)).join('\n\n')}

  <div class="be-ready">
    <span class="support-label">BeReady: what the whole unit was for</span>
    <p>An app counts what you do, sorts you in with people who behave like you, and shows you
      what held them, all to move a number somebody chose. The effects of that are real, they
      land unevenly, and how big an effect is matters as much as whether it exists. False
      stories travel on novelty and feeling, and people do most of the carrying. Who gets to
      decide what any of it is allowed to do to you is still an open argument, and it has
      happened four times before about four other kinds of media.</p>
  </div>

</div>

<nav class="module-footer">
  <a href="index.html">&larr; Back to ${esc(m.unit)}</a>
  <a href="#top">Back to top &uarr;</a>
</nav>

</body>
</html>
`;
}

module.exports = { renderStudyGuide, definitionFor, standards };
