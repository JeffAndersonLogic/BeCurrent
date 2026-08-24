#!/usr/bin/env node
'use strict';

/**
 * Write an end-of-unit assessment, in three flavours, from one item bank.
 *
 *   node scripts/build-assessments.js            write the files
 *   node scripts/build-assessments.js --check    fail on drift, write nothing
 *   node scripts/build-assessments.js --out DIR  write somewhere else entirely
 *
 * Assessments are DISCOVERED by reading scripts/lib/assessment-content/, not
 * listed, so a second unit gets an assessment by getting an item bank.
 *
 * ── THREE FLAVOURS, ONE BANK ────────────────────────────────────────────────
 *
 *   <key>-exam.html        the student exam. Printable, self-contained, and it
 *                          carries no answers.
 *   <key>-KEY.md           the teacher edition: blueprint, every item with its
 *                          answer, and what each wrong option catches.
 *   <key>-KEY-canvas.txt   the same bank in text2qti source form, for importing
 *                          into a Canvas quiz rather than printing it.
 *
 * None of the three builds a question of its own. `renderItem` produces the stem
 * and options once and all three flavours print that same string, for the same
 * reason build-canvas-events.js refuses to build its tables twice: two builders
 * eventually give two different questions, the paper version and the Canvas
 * version disagree, and the only person who finds out is the student who took
 * the one that was wrong.
 *
 * ── WHY THE KEY FILES SAY KEY IN THEIR NAMES ────────────────────────────────
 *
 * This repository is public, and `.nojekyll` means GitHub Pages serves every
 * committed file verbatim at a guessable URL. A committed answer key is a
 * published answer key, and git history keeps it after a delete. So the two
 * files carrying answers are named so that one .gitignore line covers both and
 * a second one can never be added without matching the pattern. See
 * docs/assessments/README.md.
 *
 * The student exam is the opposite case and is safe to commit: it is the same
 * check as any other generated page, and `--check` in the offline suite is what
 * proves it still matches the bank.
 *
 * ── WHAT IS NOT PRINTED ON THE STUDENT EXAM ─────────────────────────────────
 *
 * No time limit, and no point values. The rule against minute counts on the Desk
 * and the TODAY board applies here for the same reason: a number printed at
 * students is a promise the room has to keep, and in this room the answer to
 * "how long do I have" is "as long as you need". Point values on the page invite
 * a student to budget effort rather than answer, and every item here is worth
 * the same anyway.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'scripts', 'lib', 'assessment-content');
const CHECK = process.argv.includes('--check');

const outFlag = process.argv.indexOf('--out');
const OUT_DIR = outFlag > -1 && process.argv[outFlag + 1]
  ? path.resolve(process.argv[outFlag + 1])
  : path.join(ROOT, 'docs', 'assessments');

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Item text is plain prose, but a bank is allowed to carry the same <em> and
// <span class="kt"> a content module does, so both strippers exist. Dropping a
// kt span has to keep the word inside it: the term is teaching, not styling.
function plain(s) {
  return String(s == null ? '' : s)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function esc(s) {
  return plain(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * The one place an item becomes text. Everything downstream formats this; nothing
 * downstream rewrites it.
 */
function renderItem(item) {
  return {
    n: item.n,
    stem: plain(item.stem),
    options: item.options.map(plain),
    answer: item.answer,
    letter: LETTERS[item.answer]
  };
}

// ── The blueprint ─────────────────────────────────────────────────────────────
//
// Derived, never declared. A blueprint typed by hand beside a bank that gets
// edited is a table that is wrong within one revision and wrong quietly: it
// still renders, and nothing says the counts stopped matching the items.
function blueprint(bank) {
  const byTopic = new Map();
  const bySkill = new Map();
  const byLevel = new Map();
  const byLetter = new Map();

  bank.items.forEach(item => {
    const bump = (map, k) => map.set(k, (map.get(k) || 0) + 1);
    bump(byTopic, item.topic);
    bump(bySkill, item.skill);
    bump(byLevel, item.level);
    bump(byLetter, LETTERS[item.answer]);
  });

  return { byTopic, bySkill, byLevel, byLetter };
}

function countTable(map, label, order) {
  const keys = order || Array.from(map.keys());
  const rows = [`| ${label} | Items | Share |`, '|---|---|---|'];
  let total = 0;
  keys.forEach(k => { total += map.get(k) || 0; });
  keys.forEach(k => {
    const n = map.get(k) || 0;
    rows.push(`| ${k} | ${n} | ${total ? Math.round((n / total) * 100) : 0}% |`);
  });
  return rows.join('\n');
}

// ── Flavour one: the teacher edition ──────────────────────────────────────────
function renderTeacher(bank) {
  const m = bank.meta;
  const bp = blueprint(bank);
  const out = [];

  out.push(`# ${plain(m.title)}, teacher edition`);
  out.push('');
  out.push('> **Generated. Do not edit this file.** Every word of it comes out of');
  out.push('> `scripts/lib/assessment-content/' + m.key + '.js`. Change an item there and run');
  out.push('> `node scripts/build-assessments.js`, or the exam students take and the key you');
  out.push('> grade against stop being the same document.');
  out.push('');
  out.push('> **This file carries the answers.** Keep it out of anywhere students can reach,');
  out.push('> including this repository. See `README.md` in this folder.');
  out.push('');
  out.push(`**Course.** ${plain(m.course)}`);
  out.push('');
  out.push(`**Format.** ${bank.items.length} multiple choice items, four options each, one best answer.`);
  out.push('');
  out.push(`**The unit's terminal question.** ${plain(m.terminalQuestion)}`);
  out.push('');
  out.push('Nothing on this test asks a student to answer it. The unit argues that a verdict');
  out.push('is not a finding, so an assessment whose correct answers were positions would undo');
  out.push('the unit on its last day. Every correct answer here is a mechanism, a definition, a');
  out.push('piece of documented evidence, or a piece of reasoning about evidence.');
  out.push('');

  out.push('## Blueprint');
  out.push('');
  out.push('Derived from the bank, so it cannot fall out of step with the items.');
  out.push('');
  out.push(countTable(bp.byTopic, 'Topic', Array.from(bp.byTopic.keys()).sort((a, b) => a - b))
    .replace(/\| (\d+) \|/g, (_, t) => `| Topic ${t}, ${plain((m.topicNames || {})[t] || '')} |`));
  out.push('');
  out.push(countTable(bp.bySkill, 'Skill'));
  out.push('');
  out.push(countTable(bp.byLevel, 'Thinking', ['Recall', 'Apply', 'Analyze']
    .filter(k => bp.byLevel.has(k))));
  out.push('');
  out.push('**Answer spread.** '
    + LETTERS.slice(0, 4).map(l => `${l} ${bp.byLetter.get(l) || 0}`).join(', ')
    + '. Checked rather than trusted: a student who works out that the answer is usually one');
  out.push('letter has found a way to score without reading.');
  out.push('');
  out.push('**Key, in order.** `'
    + bank.items.map(i => LETTERS[i.answer]).join(' ') + '`');
  out.push('');

  out.push('## Grading');
  out.push('');
  out.push('Every item is worth the same. No item is a trick, and no item depends on the one');
  out.push('before it, so a student who misses one loses one.');
  out.push('');
  out.push('The `notes` under each item are the reason to look at this afterwards rather than');
  out.push('just totalling it. Every wrong option is a misconception the unit named out loud,');
  out.push('so a class that converges on the same wrong option has told you exactly which');
  out.push('twenty minutes to reteach. A spread across three wrong options is guessing; a pile');
  out.push('on one is a belief.');
  out.push('');

  out.push('## Items');
  out.push('');

  bank.items.forEach(item => {
    const r = renderItem(item);
    out.push(`### ${r.n}. ${r.stem}`);
    out.push('');
    out.push(`_Topic ${item.topic}, ${plain((m.topicNames || {})[item.topic] || '')} · `
      + `${plain(item.skill)} · ${plain(item.level)}_`);
    out.push('');
    r.options.forEach((opt, i) => {
      const mark = i === r.answer ? '**' : '';
      out.push(`- ${mark}${LETTERS[i]}. ${opt}${mark}${i === r.answer ? '  ← answer' : ''}`);
    });
    out.push('');
    (item.notes || []).forEach((note, i) => {
      out.push(`  - **${LETTERS[i]}${i === r.answer ? ', correct' : ''}.** ${plain(note)}`);
    });
    out.push('');
  });

  return out.join('\n') + '\n';
}

// ── Flavour two: the student exam ─────────────────────────────────────────────
//
// Self-contained on purpose, the same way docs/canvas/*.html is: no stylesheet
// link, no webfont, palette inlined as literals, because this gets opened as a
// bare file on a classroom or a home machine that has never seen this repo, and
// printed from there. A missing stylesheet would print as an unreadable wall.
//
// The answer sheet is the last page and it is not a convenience. Grading 25 items
// off a grid is one page per student instead of seven, and a student who fills a
// grid has one place to check their work rather than seven.
function renderExam(bank) {
  const m = bank.meta;
  const items = bank.items.map(renderItem);

  const questions = items.map(r => `
  <li class="q" id="q${r.n}">
    <p class="stem"><span class="qn">${r.n}.</span> ${esc(r.stem)}</p>
    <ol class="opts">
${r.options.map(o => `      <li>${esc(o)}</li>`).join('\n')}
    </ol>
  </li>`).join('\n');

  const row = r => `
        <tr>
          <th scope="row">${r.n}</th>
${LETTERS.slice(0, 4).map(l => `          <td><span class="bub">${l}</span></td>`).join('\n')}
        </tr>`;
  const half = Math.ceil(items.length / 2);
  const sheetCols = [items.slice(0, half), items.slice(half)]
    .filter(col => col.length)
    .map(col => `
      <table class="sheetgrid">
        <tbody>
${col.map(row).join('\n')}
        </tbody>
      </table>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(m.title)}</title>
<style>
  /* Palette inlined as literals, not tokens. This file is opened as a bare file
     with no stylesheet beside it, so a var() would resolve to nothing and a
     border would draw in currentColor. */
  :root { --ink:#141414; --ink-soft:#454545; --paper:#FFFEFB; --news:#F4F2ED;
          --line:rgba(20,20,20,.14); --signal:#CE1400; --signal-deep:#A31000; }
  * { box-sizing:border-box; }
  body { margin:0; padding:2rem 1.25rem 4rem; background:var(--news); color:var(--ink);
         font:16px/1.6 Georgia,'Times New Roman',serif; }
  .sheet { max-width:44rem; margin:0 auto; background:var(--paper);
           border:1px solid var(--line); padding:2rem 2.25rem 2.5rem; }
  header { border-bottom:3px solid var(--signal); padding-bottom:1rem; margin-bottom:1.25rem; }
  .eyebrow { font:600 .72rem/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;
             letter-spacing:.14em; text-transform:uppercase; color:var(--signal-deep); margin:0 0 .35rem; }
  h1 { font-size:1.6rem; line-height:1.2; margin:0 0 .5rem; }
  .name-line { display:flex; gap:1.5rem; margin:1rem 0 0;
               font:600 .8rem/1.4 system-ui,-apple-system,'Segoe UI',sans-serif; }
  .name-line span { flex:1; border-bottom:1px solid var(--ink); padding-bottom:.15rem; }
  .terminal { background:var(--news); border-left:3px solid var(--signal);
              padding:.75rem 1rem; margin:1.25rem 0; font-style:italic; }
  .terminal b { display:block; font:600 .72rem/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;
                letter-spacing:.12em; text-transform:uppercase; color:var(--signal-deep);
                font-style:normal; margin-bottom:.3rem; }
  /* Bulleted, not numbered. A numbered list of directions sitting directly above
     a numbered list of questions gives the page two different 1., 2., 3. runs,
     and a student looking for question 3 finds a direction. */
  .directions { list-style:disc; margin:1.25rem 0 2rem; padding:0 0 0 1.2rem; }
  .directions li { margin:.35rem 0; }
  ol.qs { list-style:none; margin:0; padding:0; counter-reset:none; }
  .q { margin:0 0 1.5rem; page-break-inside:avoid; break-inside:avoid; }
  .stem { margin:0 0 .5rem; }
  .qn { font-weight:700; color:var(--signal-deep); margin-right:.35rem; }
  ol.opts { list-style:upper-alpha; margin:0; padding-left:2.4rem; }
  ol.opts li { margin:.22rem 0; }
  .pagebreak { page-break-before:always; break-before:page; }
  h2 { font-size:1.2rem; border-bottom:2px solid var(--signal); padding-bottom:.4rem;
       margin:0 0 1rem; }
  /* Two columns, because the point of an answer sheet is one page per student
     to grade. Twenty-five rows in a single column runs onto a second sheet, at
     which point the grid has cost a page instead of saving six. */
  .sheetcols { display:flex; gap:2rem; flex-wrap:wrap; }
  table.sheetgrid { border-collapse:collapse; }
  table.sheetgrid th, table.sheetgrid td { border:1px solid var(--line); padding:.3rem .2rem;
                                           text-align:center; }
  table.sheetgrid th { width:2.4rem; background:var(--news);
                       font:700 .85rem/1.4 system-ui,-apple-system,'Segoe UI',sans-serif; }
  .bub { display:inline-block; width:1.55rem; height:1.55rem; line-height:1.5rem;
         border:1px solid var(--ink); border-radius:50%;
         font:600 .78rem/1.5rem system-ui,-apple-system,'Segoe UI',sans-serif; }
  footer { margin-top:2rem; padding-top:.9rem; border-top:1px solid var(--line);
           color:var(--ink-soft); font-size:.85rem; }
  @media print {
    body { background:#fff; padding:0; font-size:11.5pt; }
    .sheet { border:0; max-width:none; padding:0; }
  }
</style>
</head>
<body>
<main class="sheet">

  <header>
    <p class="eyebrow">${esc(m.course)}</p>
    <h1>${esc(m.title)}</h1>
    <p class="name-line"><span>Name</span><span>Date</span></p>
  </header>

  <p class="terminal"><b>The question this unit was for</b>${esc(m.terminalQuestion)}</p>

  <ul class="directions">
${(m.directions || []).map(d => `    <li>${esc(d)}</li>`).join('\n')}
  </ul>

  <ol class="qs">
${questions}
  </ol>

  <section class="pagebreak">
    <h2>Answer sheet</h2>
    <p>Circle one letter for each question. This page is the one that gets graded.</p>
    <p class="name-line"><span>Name</span><span>Date</span></p>
    <p class="eyebrow">${bank.items.length} questions</p>
    <div class="sheetcols">${sheetCols}
    </div>
  </section>

  <footer>${esc(m.course)} · ${esc(m.title)}</footer>

</main>
</body>
</html>
`;
}

// ── Flavour three: the Canvas import source ───────────────────────────────────
//
// text2qti format. Canvas cannot import a plain question list: Classic Quizzes
// takes a QTI package and nothing else, so a text file is one conversion step
// short of importable rather than importable. That step is deliberate.
//
// Writing the QTI zip here would mean committing a binary that no diff can read,
// whose reproducibility check would have to special-case timestamps, and whose
// contents are the answer key. A text file is reviewable, diffable, and covered
// by the same .gitignore line as the teacher edition.
//
// The conversion is `pip install text2qti` and then `text2qti <file>`, which
// writes the zip beside it. Canvas: Settings, Import Course Content, QTI .zip.
function renderCanvas(bank) {
  const m = bank.meta;
  const out = [];

  out.push('Quiz title: ' + plain(m.title));
  out.push('Quiz description: ' + plain((m.directions || [])[0] || ''));
  out.push('');
  out.push('%%');
  out.push('% GENERATED. Do not edit this file; edit the item bank and rebuild.');
  out.push('% Source: scripts/lib/assessment-content/' + m.key + '.js');
  out.push('%');
  out.push('% THIS FILE CONTAINS THE ANSWERS. The starred option is the correct one.');
  out.push('%');
  out.push('% To turn it into something Canvas will take:');
  out.push('%     pip install text2qti');
  out.push('%     text2qti ' + m.key + '-KEY-canvas.txt');
  out.push('% then in Canvas: Settings, Import Course Content, QTI .zip file.');
  out.push('%');
  out.push('% Import creates the quiz unpublished. Check it before you publish it: an');
  out.push('% import that silently dropped an item is a quiz out of 24 that nobody');
  out.push('% notices until it is graded.');
  out.push('%%');
  out.push('');

  bank.items.forEach(item => {
    const r = renderItem(item);
    out.push(`${r.n}. ${r.stem}`);
    r.options.forEach((opt, i) => {
      out.push(`${i === r.answer ? '*' : ''}${LETTERS[i].toLowerCase()}) ${opt}`);
    });
    out.push('');
  });

  return out.join('\n');
}

// ── Run ───────────────────────────────────────────────────────────────────────

function banks() {
  if (!fs.existsSync(BANK_DIR)) return [];
  return fs.readdirSync(BANK_DIR)
    .filter(f => /\.js$/.test(f))
    .sort()
    .map(f => require(path.join(BANK_DIR, f)));
}

function emit(file, body, results) {
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  const rel = path.relative(ROOT, file);

  if (CHECK) {
    if (existing === body) { results.same.push(rel); return; }
    results.drift.push(rel);
    return;
  }

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  results[existing === body ? 'same' : 'wrote'].push(rel);
}

function main() {
  const all = banks();
  if (!all.length) {
    console.log(`${D}no assessment banks in scripts/lib/assessment-content, nothing to build${X}`);
    return 0;
  }

  const results = { wrote: [], same: [], drift: [] };

  all.forEach(bank => {
    const key = bank.meta.key;
    emit(path.join(OUT_DIR, `${key}-exam.html`), renderExam(bank), results);
    emit(path.join(OUT_DIR, `${key}-KEY.md`), renderTeacher(bank), results);
    emit(path.join(OUT_DIR, `${key}-KEY-canvas.txt`), renderCanvas(bank), results);
  });

  if (CHECK) {
    if (results.drift.length) {
      results.drift.forEach(f => console.error(`${R}DRIFT${X} ${f}`));
      console.error(`\n${R}An assessment no longer matches its item bank.${X} The exam students `
        + 'take and the key you grade against have to come out of the same file.\n'
        + 'Run: node scripts/build-assessments.js');
      return 1;
    }
    console.log(`${G}OK${X} ${results.same.length} assessment file`
      + `${results.same.length === 1 ? '' : 's'} match their item bank${D} (${all.length} bank`
      + `${all.length === 1 ? '' : 's'})${X}`);
    return 0;
  }

  results.wrote.forEach(f => console.log(`${G}wrote${X} ${f}`));
  results.same.forEach(f => console.log(`${D}same ${X} ${f}`));
  return 0;
}

if (require.main === module) process.exit(main());

module.exports = { renderItem, renderExam, renderTeacher, renderCanvas, blueprint, LETTERS };
