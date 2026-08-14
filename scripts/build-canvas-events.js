#!/usr/bin/env node
'use strict';

/**
 * Write the paste-ready Canvas calendar events for every unit.
 *
 *   node scripts/build-canvas-events.js            write
 *   node scripts/build-canvas-events.js --check    fail on drift, write nothing
 *
 * Canvas lives outside this repository and has no version control of its own.
 * That is the gap this closes: the repo is the source of truth for what gets
 * pasted into Canvas, so a calendar event and the lesson it describes cannot
 * drift apart without someone noticing.
 *
 * EVERY CELL IS MACHINE-DERIVED. OVERVIEW, LEARNING TARGETS and SUCCESS CRITERIA
 * are lifted verbatim out of the topic's `overview`, `learningTargets` and
 * `successCriteria`. Nothing here rewrites them, and there is no hand-written
 * prose table to fall out of step. (BeHistorical needs one, because its
 * `commandCopy` is addressed to the teacher and cannot be pasted at students
 * raw. BeCurrent's topic `overview` is already written in second person.)
 *
 * If a target changes in the content module, the Canvas event is stale and must
 * be repasted. Never edit a target inside Canvas: an event and a lesson that
 * disagree both look right on their own, and the student who reads one and is
 * graded against the other is the only one who finds out.
 *
 * The ASSIGNMENT cell is deliberately a placeholder. A hand-typed Canvas link
 * renders as a working link and resolves to nothing for anyone whose enrollment
 * differs from yours; the real link has to come from the RCE course-links panel.
 * See Section 5 of docs/canvas/CANVAS-BUILD-GUIDE.md.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'scripts', 'lib', 'unit-content');
const OUT_DIR = path.join(ROOT, 'docs', 'canvas');
const CHECK = process.argv.includes('--check');

const SITE = 'https://jeffandersonlogic.github.io/BeCurrent';

// The course prefix on every Canvas object name. BeCurrent is its own Canvas
// course, separate from AP World.
const PREFIX = 'CE';

// ── The slide deck ───────────────────────────────────────────────────────────
//
// Topic 1 is taught from a deck that does not live in this repo. Leave this
// empty until the real URL exists: the generator prints a visible PENDING marker
// rather than inventing a link, because a module item pointing at a guessed URL
// is a dead link in front of thirty students and looks identical to a live one
// until someone clicks it.
const DECK_URL = '';

// ── The LMS layer ────────────────────────────────────────────────────────────
//
// Assignment names and point values are Canvas and PowerSchool concerns, not
// course content, so they live here rather than in the content module.
//
// ASSIGNMENT NAMES MUST BE ASCII AND IDENTICAL IN CANVAS AND POWERSCHOOL,
// character for character. Plain hyphen, no em dash, no ampersand, no curly
// quotes. PowerSchool caps name length and some sync configurations fail on
// non-ASCII punctuation, and the failure is quiet: the assignment exists in both
// systems and simply does not sync. The long title belongs in the calendar
// event, which has no length limit.
//
// Only topics that submit something get an entry. Topics 1 and 2 are done on
// paper and deliberately have no assignment: a Canvas assignment nobody can
// submit to is a gradebook row that reads as missing work for the whole class.
const ASSIGNMENTS = {
  SM3: { name: 'SM3 - Inside the Algorithm', points: 20 },
  SM4: { name: 'SM4 - Reading a Privacy Policy', points: 20 },
  SM5: { name: 'SM5 - Who Decides', points: 20 }
};

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

// Titles carry <em> for the accent word. Canvas object names take the words.
function plain(s) {
  return String(s == null ? '' : s)
    .replace(/<[^>]+>/g, '')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

// Canvas object names spell the ampersand out, so one convention covers every
// object rather than one for the objects PowerSchool sees and another for the
// rest. A forward slash reads as a path separator in several export formats.
function objectName(s) {
  return plain(s).replace(/\s*&\s*/g, ' and ').replace(/\s*\/\s*/g, ', ');
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function row(label, inner) {
  return `        <tr>
            <td style="width: 20%; vertical-align: top; background-color: #f0f0f0;">
                <h3>${label}</h3>
            </td>
            <td style="vertical-align: top;">
${inner}
            </td>
        </tr>`;
}

function briefFileFor(topic) {
  const nn = String(topic.n).padStart(2, '0');
  return `topic-${nn}-brief-${topic.slug}.html`;
}

function eventTable(unit, topic, code) {
  const m = unit.meta;
  const hasBrief = !!(topic.sections && topic.sections.length);
  const assignment = ASSIGNMENTS[code];

  const targets = (topic.learningTargets || [])
    .map(t => `                    <li>${esc(plain(t.target))}</li>`).join('\n');
  const criteria = (topic.successCriteria || [])
    .map(c => `                    <li>${esc(plain(c.criteria))}</li>`).join('\n');

  const unitUrl = `${SITE}/${m.unitKey}/index.html`;
  const links = [`                <p><a class="inline_disabled" href="${unitUrl}" target="_blank" rel="noopener">${esc(objectName(m.unit))}, the unit page</a></p>`];
  if (hasBrief) {
    const briefUrl = `${SITE}/${m.unitKey}/${briefFileFor(topic).replace(/\.html$/, '-capture.html')}`;
    links.push(`                <p><a class="inline_disabled" href="${briefUrl}" target="_blank" rel="noopener">The Brief for this topic</a></p>`);
  }

  // What the student does with their work. A topic with no Brief has no route to
  // Canvas at all, and saying so plainly is the point: it stops a paper day
  // being chased as missing work.
  const assignmentCell = assignment
    ? `                <p>[INSERT ASSIGNMENT LINK]</p>
                <p>Open the Brief, answer every question, then use <strong>Gather All My Work</strong> and <strong>Copy to Clipboard</strong> at the end of it. Paste that into the submission box and submit. That paste is the only way this work reaches me.</p>`
    : `                <p><strong>Nothing to submit.</strong> This topic is done on paper in class. There is no Canvas assignment for it and nothing to hand in.</p>`;

  const rows = [
    row('OVERVIEW', `                <p>${esc(plain(topic.overview))}</p>`),
    row('LEARNING TARGETS', `                <ol>\n${targets}\n                </ol>`),
    row('SUCCESS CRITERIA', `                <ol>\n${criteria}\n                </ol>`),
    row('BeCurrent Link', links.join('\n')),
    row('ASSIGNMENT', assignmentCell)
  ];

  return `<table style="border-collapse: collapse; width: 100%; border-color: #000000; border-style: solid;" border="3" cellpadding="8">
    <tbody>
${rows.join('\n')}
    </tbody>
</table>`;
}

/**
 * The assignment description, paste-ready.
 *
 * Three steps and nothing else, in the order a student does them. The last one
 * is the one that matters: BeCurrent saves typing in the browser on the device
 * it was typed on, and that is not a submission. A student who does every
 * question and never pastes into Canvas has, as far as any record goes, done
 * nothing. So the paste is spelled out rather than assumed.
 */
function assignmentBody(unit, topic, code) {
  const m = unit.meta;
  const a = ASSIGNMENTS[code];
  const briefUrl = `${SITE}/${m.unitKey}/${briefFileFor(topic).replace(/\.html$/, '-capture.html')}`;
  const unitUrl = `${SITE}/${m.unitKey}/index.html`;
  const questions = topic.questions || [];

  const criteria = (topic.successCriteria || [])
    .map(c => `    <li>${esc(plain(c.criteria))}</li>`).join('\n');

  const qs = questions.map((q, i) =>
    `    <li><strong>${esc(plain(q.skill))}.</strong> ${esc(plain(q.text))}</li>`).join('\n');

  return `<h2>${esc(objectName(m.unit))}, ${esc(plain(topic.topic))}: ${esc(objectName(topic.title))}</h2>
<p><em>${esc(plain(topic.subtitle))}</em></p>

<h3>Step 1 &mdash; Open the Brief</h3>
<p><a class="inline_disabled" href="${briefUrl}" target="_blank" rel="noopener">${esc(objectName(topic.title))}</a></p>
<p>Everything happens on the website. There is nothing to download.</p>

<h3>Step 2 &mdash; Read it and answer all ${questions.length}</h3>
<p>${esc(plain(topic.overview))}</p>
<ol>
${qs}
</ol>
<p>Every question has a <strong>START HERE</strong> card and a <strong>PUSH FURTHER</strong> card. START HERE is the whole answer, not a lesser one. Take PUSH FURTHER when you have the first part down.</p>
<p><strong>Type a real answer in every box.</strong> Gather All My Work collects exactly what you typed and nothing else. An empty box is an empty box in your submission, and it is the only record I see.</p>

<h3>Step 3 &mdash; Submit in Canvas</h3>
<ol>
    <li>Scroll to the <strong>Save Your Work</strong> panel at the end of the Brief.</li>
    <li>Click <strong>Gather All My Work</strong>. This pulls every response you typed into one block.</li>
    <li>Click <strong>Copy to Clipboard</strong>.</li>
    <li>Paste it into the submission box below and click Submit.</li>
</ol>
<p><strong>This is the only way your work reaches me.</strong> BeCurrent saves your typing in the browser on the device you used, but that is not a submission and it does not follow you to another Chromebook. If you do not submit in Canvas, I have no record that you did the work.</p>

<h3>Due</h3>
<p>The beginning of our next class period.</p>

<h3>Success criteria</h3>
<ol>
${criteria}
</ol>

<p><a class="inline_disabled" href="${unitUrl}" target="_blank" rel="noopener">The whole ${esc(objectName(m.unit))} unit, if you missed a topic</a></p>`;
}

function renderAssignments(unit) {
  const m = unit.meta;
  const code = String(m.code || '').toUpperCase();
  const topics = (unit.topics || []).filter(t => ASSIGNMENTS[code + t.n]);
  const out = [];

  out.push(`# ${objectName(m.unit)} Assignments, Paste-Ready`);
  out.push('');
  out.push('**Generated by `scripts/build-canvas-events.js`. Do not hand-edit.**');
  out.push('The overview, the questions and the success criteria are the same text the');
  out.push('Brief shows, read out of the content module rather than retyped, so a student');
  out.push('cannot be assessed against a criterion they were never shown.');
  out.push('');
  out.push('Topics with no entry here are done on paper and deliberately have no Canvas');
  out.push('assignment. A gradebook row nobody can submit to reads as missing work for the');
  out.push('whole class.');
  out.push('');
  out.push('## Settings, the same for every one');
  out.push('');
  out.push('| Setting | Value |');
  out.push('|---|---|');
  out.push('| Submission type | Online, then **Text Entry** |');
  out.push('| Attempts | Unlimited |');
  out.push('| Display grade as | Points |');
  out.push('| Peer review | Off |');
  out.push('| Anonymous grading | **Off** |');
  out.push('');
  out.push('**Text Entry is required, not a default.** `scripts/parse-canvas-submissions.js`');
  out.push('reads the HTML body of a Text Entry submission. A file upload cannot be parsed');
  out.push('and will not appear in any analysis. **Anonymous grading must stay off**: it');
  out.push('suppresses the student name the parser uses, and the result is a run of');
  out.push('unattributable rows in `exceptions.csv`.');
  out.push('');
  out.push('---');
  out.push('');

  topics.forEach((t, i) => {
    const c = code + t.n;
    const a = ASSIGNMENTS[c];
    out.push(`## ${a.name}`);
    out.push('');
    out.push(`**Assignment name, Canvas and PowerSchool, character for character:** \`${a.name}\`  `);
    out.push(`**Points:** ${a.points}  `);
    out.push(`**Calendar event it belongs to:** \`${PREFIX} - ${c} - ${objectName(t.title)}\`  `);
    out.push('');
    out.push('Paste the block below through the RCE **`</>`** HTML editor, never the visual one.');
    out.push('');
    out.push('```html');
    out.push(assignmentBody(unit, t, c));
    out.push('```');
    out.push('');
    if (i < topics.length - 1) {
      out.push('---');
      out.push('');
    }
  });

  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n';
}

function renderUnit(unit) {
  const m = unit.meta;
  const code = String(m.code || '').toUpperCase();
  const topics = unit.topics || [];
  const out = [];

  out.push(`# ${objectName(m.unit)} Calendar Events, Paste-Ready`);
  out.push('');
  out.push('**Generated by `scripts/build-canvas-events.js`. Do not hand-edit.**');
  out.push('OVERVIEW, LEARNING TARGETS and SUCCESS CRITERIA are lifted verbatim from');
  out.push(`\`scripts/lib/unit-content/${m.unitKey}.js\`. Change a target there and rerun the`);
  out.push('generator; never edit a target inside Canvas, and never edit one here.');
  out.push('');
  out.push('```bash');
  out.push('node scripts/build-canvas-events.js          # write');
  out.push('node scripts/build-canvas-events.js --check  # fail on drift, write nothing');
  out.push('```');
  out.push('');
  out.push('## How to paste one of these');
  out.push('');
  out.push('1. Canvas Calendar, click the day, **Edit**, then **More Options**.');
  out.push('2. Title the event exactly as given below.');
  out.push('3. In the Rich Content Editor, click the **`</>`** icon to open the HTML editor.');
  out.push('   **Never paste this into the visual editor.** Pasting rendered HTML there');
  out.push('   injects wrapper `<div>`s and inline font declarations that collapse the table.');
  out.push('4. Paste the whole `<table>` block.');
  out.push('5. Switch back to the visual editor, delete the `[INSERT ASSIGNMENT LINK]`');
  out.push('   placeholder, and insert the real assignment from the right-hand course-links');
  out.push('   panel, **Assignments**, click the assignment. Do not hand-type that link; see');
  out.push('   Section 5 of `CANVAS-BUILD-GUIDE.md` for why.');
  out.push('6. Save.');
  out.push('');
  out.push('Every link below points at the live GitHub Pages build:');
  out.push(`\`${SITE}/${m.unitKey}/\``);
  out.push('');

  out.push('## The events at a glance');
  out.push('');
  out.push('| Event title | Assignment to link | Submits |');
  out.push('|---|---|---|');
  topics.forEach(t => {
    const c = code + t.n;
    const a = ASSIGNMENTS[c];
    out.push(`| \`${PREFIX} - ${c} - ${objectName(t.title)}\` | ${a ? `\`${a.name}\`` : 'none, on paper' } | ${a ? 'Yes' : 'No'} |`);
  });
  out.push('');
  out.push('---');
  out.push('');

  topics.forEach((t, i) => {
    const c = code + t.n;
    const a = ASSIGNMENTS[c];
    const title = objectName(t.title);

    out.push(`## ${PREFIX} - ${c} - ${title}`);
    out.push('');
    out.push(`**Event title:** \`${PREFIX} - ${c} - ${title}\`  `);
    out.push(`**Assignment to link:** ${a ? `\`${a.name}\`` : '_none, this topic is done on paper_'}  `);
    out.push(`**Source:** \`scripts/lib/unit-content/${m.unitKey}.js\`, ${plain(t.topic)}  `);
    out.push('');

    if (t.n === 1) {
      out.push(DECK_URL
        ? `The slide deck for this topic: <${DECK_URL}>`
        : '> **The slide deck link is still pending.** Set `DECK_URL` at the top of'
          + ' `scripts/build-canvas-events.js` and rerun, rather than pasting a URL'
          + ' straight into Canvas. Nothing here invents one: a module item pointing at'
          + ' a guessed URL looks identical to a live one until a student clicks it.');
      out.push('');
    }

    if ((t.withholdTitles || []).length) {
      out.push('> **Do not name the film anywhere in Canvas before this topic runs.** The');
      out.push('> event title, the module text header and the assignment name all stay');
      out.push('> vague on purpose. A student who looks the title up in advance reads what');
      out.push('> they are supposed to conclude and arrives having concluded it.');
      out.push('');
    }

    out.push('```html');
    out.push(eventTable(unit, t, c));
    out.push('```');
    out.push('');
    if (i < topics.length - 1) {
      out.push('---');
      out.push('');
    }
  });

  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n';
}

const drift = [];
const wrote = [];

function emit(rel, content) {
  const full = path.join(ROOT, rel);
  const existing = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
  if (existing === content) return;
  if (CHECK) {
    drift.push({ rel, reason: existing === null ? 'missing' : 'differs from the content module' });
    return;
  }
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  wrote.push(rel);
}

const files = fs.existsSync(CONTENT_DIR)
  ? fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js')).sort()
  : [];

if (!files.length) {
  console.log(`${D}No unit content in scripts/lib/unit-content/, nothing to build.${X}`);
  process.exit(0);
}

files.forEach(file => {
  const unit = require(path.join(CONTENT_DIR, file));
  emit(path.join('docs', 'canvas', `${unit.meta.unitKey}-calendar-events.md`), renderUnit(unit));
  emit(path.join('docs', 'canvas', `${unit.meta.unitKey}-assignments.md`), renderAssignments(unit));
});

if (CHECK) {
  if (drift.length) {
    console.error(`\n${R}Canvas events have drifted from their content modules.${X}\n`);
    drift.forEach(d => console.error(`  ${R}✗${X} ${d.rel} ${D}(${d.reason})${X}`));
    console.error(`\n${D}These files are generated, and a stale one means a stale Canvas event.${X}`);
    console.error('  node scripts/build-canvas-events.js\n');
    process.exit(1);
  }
  console.log(`${G}✓${X} Canvas events reproduce exactly from their content modules.`);
  process.exit(0);
}

if (!wrote.length) {
  console.log(`${G}✓${X} Already up to date.`);
} else {
  wrote.forEach(w => console.log(`  ${G}wrote${X} ${w}`));
  console.log(`\n${G}✓${X} ${wrote.length} file${wrote.length === 1 ? '' : 's'} written.`);
  if (!DECK_URL) {
    console.log(`\n  ${D}note  DECK_URL is empty, so Topic 1's deck shows as PENDING.${X}`);
  }
}

module.exports = { renderUnit, renderAssignments, ASSIGNMENTS, PREFIX, SITE };
