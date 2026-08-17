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

// ── The News Log ─────────────────────────────────────────────────────────────
//
// The Desk's route to Canvas: ONE assignment per week, in its own assignment
// group, and every word of it derived from scripts/lib/desk-content.js so it
// cannot describe a Desk the students are not being shown.
//
// It is one assignment a week rather than one a day, and the reasons run in both
// directions. One a day is 180 gradebook columns a year, which nobody reads, and
// 180 Canvas objects to build by hand. One for the whole year is a single column
// where a missed week is invisible. A weekly column is the split the Desk's own
// accountability note asks for: a blank one on Wednesday says Tuesday was lost,
// while there is still a Wednesday to do something about it.
//
// ATTEMPTS MUST BE UNLIMITED, and here that is not the usual reason. Students
// paste the accumulating log EVERY day: Monday is attempt 1, Friday is attempt 5
// and carries the whole week. That is not a convenience, it is the only backup
// that exists. A week of filings lives in one browser's localStorage until it is
// copied out, the privacy rule correctly forecloses any server-side copy, and a
// cleared Chromebook profile on Thursday takes Monday to Wednesday with it.
//
// It is deliberately NOT a Canvas Discussion, which is the Canvas feature that
// looks most like a journal. A discussion is visible to the class, and the Desk's
// first house rule is that a student's name is never on the board unless they put
// it there. A journal that publishes the room's filings under their names breaks
// the constraint the whole daily half is built around, in writing rather than out
// loud.
const NEWS_LOG = {
  group: 'News Log',
  name: n => `${PREFIX} - News Log - Week of ${n}`,
  points: 20
};

function newsLogBody(desk) {
  const m = desk.meta || {};
  const story = desk.story || {};
  const deskUrl = `${SITE}/daily/index.html`;
  const lanes = (desk.lanes || []).map(l =>
    `    <li><strong>${esc(objectName(l.name))}.</strong> ${esc(plain(l.scope))} `
    + `Ask yourself: ${esc(plain(l.question))}</li>`).join('\n');
  const boxes = (story.facts || []).map(f =>
    `    <li><strong>${esc(plain(f.label))}.</strong> ${esc(plain(f.ask))}</li>`)
    .concat((story.questions || []).map(q =>
      `    <li><strong>${esc(plain(q.label))}.</strong> ${esc(plain(q.text))}</li>`))
    .join('\n');
  const ways = (story.ways || []).map(w => `    <li>${esc(plain(w))}</li>`).join('\n');

  return `<h2>${esc(objectName(m.title))}: your News Log for this week</h2>
<p><em>${esc(plain(m.deck))}</em></p>

<h3>Step 1 &mdash; Open the Desk</h3>
<p><a class="inline_disabled" href="${deskUrl}" target="_blank" rel="noopener">${esc(objectName(m.title))}</a></p>
<p>Everything happens on that page. There is nothing to download, and each class period gets its own sheet.</p>

<h3>Step 2 &mdash; File two stories, every class</h3>
<ol>
${lanes}
</ol>
<p>Five boxes for each story:</p>
<ol>
${boxes}
</ol>
<p>Three ways to file, all equal:</p>
<ul>
${ways}
</ul>

<h3>Step 3 &mdash; Copy your week into Canvas, every day</h3>
<ol>
    <li>Scroll to <strong>My News Log</strong> at the bottom of the Desk.</li>
    <li>Click <strong>Gather My Week</strong>. This collects every day you have filed this week, today included.</li>
    <li>Click <strong>Copy to Clipboard</strong>.</li>
    <li>Paste it into the submission box below and click Submit.</li>
</ol>
<p><strong>Do this at the end of every class, not just on Friday.</strong> You can submit here as many times as you like, and the last one is the one I grade, so each day you paste your whole week in again and it replaces the day before. That is also your only backup: your filings are saved in the browser on the device you used, they do not follow you to another Chromebook, and if that browser gets cleared they are gone. Pasting daily means the worst you can ever lose is one day.</p>

<h3>Due</h3>
<p>The end of the last class period this week. Paste it in every day before then.</p>

<h3>What I am looking for</h3>
<ol>
    <li>One local story and one national or international story for each class period.</li>
    <li>The outlet and the date on every story. A story you cannot source is a rumour.</li>
    <li>Two sentences on what happened, in your own words, and two on why it caught you.</li>
    <li>An honest confidence rating. A Shaky tells me more than a dishonest Could teach it.</li>
</ol>`;
}

function renderNewsLog(desk) {
  const m = desk.meta || {};
  const story = desk.story || {};
  const perDay = (desk.lanes || []).length
    * ((story.facts || []).length + (story.questions || []).length);
  const out = [];

  out.push('# The News Log, Paste-Ready');
  out.push('');
  out.push('**Generated by `scripts/build-canvas-events.js` from `scripts/lib/desk-content.js`.');
  out.push('Do not hand-edit.**');
  out.push('The lanes, the boxes and the ways to file below are the same text the Desk shows,');
  out.push('read out of the content module rather than retyped, so a student cannot be');
  out.push('assessed against something they were never shown.');
  out.push('');
  out.push('One assignment **per week**, all year. It is the Desk\'s only route to Canvas:');
  out.push(`${perDay} boxes a day, about ${perDay * 5} a week, all pasted into this one box.`);
  out.push('');
  out.push('## Settings');
  out.push('');
  out.push('| Setting | Value |');
  out.push('|---|---|');
  out.push('| Submission type | Online, then **Text Entry** |');
  out.push('| Attempts | **Unlimited** |');
  out.push(`| Assignment group | \`${NEWS_LOG.group}\` |`);
  out.push(`| Points | ${NEWS_LOG.points} |`);
  out.push('| Display grade as | Points |');
  out.push('| Peer review | Off |');
  out.push('| Anonymous grading | **Off** |');
  out.push('');
  out.push('**Unlimited attempts is load-bearing here, for a different reason than on a');
  out.push('Brief.** Students paste the accumulating log every day: Monday is attempt 1,');
  out.push('Friday is attempt 5 and carries the whole week, and the last attempt is the one');
  out.push('you grade. That daily paste is the only backup that exists. A week of filings');
  out.push('lives in one browser\'s `localStorage` until the student copies it out, nothing');
  out.push('in this course sends student writing anywhere on its own, and a cleared');
  out.push('Chromebook profile on Thursday takes Monday to Wednesday with it. Cap the');
  out.push('attempts and you have removed the backup.');
  out.push('');
  out.push('**Not a Discussion.** A Canvas discussion is the feature that looks most like a');
  out.push('journal, and it is the wrong one: a discussion is visible to the class, and the');
  out.push('Desk\'s first house rule is that a student\'s name is never on the board unless');
  out.push('they put it there. Filings are read aloud with names removed. A discussion would');
  out.push('break that in writing.');
  out.push('');
  out.push('**Text Entry is required, not a default.** `scripts/parse-canvas-submissions.js`');
  out.push('reads the HTML body of a Text Entry submission, and the Desk\'s record footer');
  out.push('rides in it. A file upload cannot be parsed and will not appear in any analysis.');
  out.push('');
  out.push('## Naming');
  out.push('');
  out.push('One per week, named for the Monday, so the gradebook sorts chronologically and a');
  out.push('gap is visible at a glance:');
  out.push('');
  out.push('```');
  out.push(NEWS_LOG.name('Sept 8'));
  out.push(NEWS_LOG.name('Sept 15'));
  out.push(NEWS_LOG.name('Sept 22'));
  out.push('```');
  out.push('');
  out.push('ASCII only, and identical in Canvas and PowerSchool character for character. The');
  out.push('date matches the "Week of" line the student\'s own paste prints at the top, which');
  out.push('is what lets you tell at a glance that a log landed in the right week.');
  out.push('');
  out.push('## The body');
  out.push('');
  out.push('The same body every week. Paste it through the RCE **`</>`** HTML editor, never');
  out.push('the visual one. Duplicate last week\'s assignment in Canvas and change the name');
  out.push('and the dates rather than pasting this thirty-six times.');
  out.push('');
  out.push('```html');
  out.push(newsLogBody(desk));
  out.push('```');
  out.push('');
  out.push('## What arrives, and how to read it');
  out.push('');
  out.push('Each day contributes six records: one Source record per story carrying the outlet,');
  out.push('the date and the link, then one per question. A five-day week is thirty records in');
  out.push('one submission, and they carry the machine footer');
  out.push('`scripts/parse-canvas-submissions.js` reads.');
  out.push('');
  out.push('Two things to know when reading one, both documented in `docs/CANVAS-CAPTURE.md`:');
  out.push('');
  out.push('- **The record label carries the date, the slot does not.** A heading reads');
  out.push('  `Fri Sep 12, Local story, Why it caught me`, so five days of the same two');
  out.push('  questions stay distinguishable in the paste. The slot stays `desk-local-why` on');
  out.push('  every day of the year, which is what lets one question be looked at across a');
  out.push('  week and across a room.');
  out.push('- **`expected` counts the days actually filed, not the class periods held.** The');
  out.push('  Desk has no calendar and cannot know the week had three meetings, so it never');
  out.push('  reports an absent day as a shortfall. The completeness signal is the');
  out.push('  **Days filed** line at the top of the student\'s paste, and a blank box inside a');
  out.push('  day that was filed arrives as a `BLANK` exception.');

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

/**
 * The HTML flavour of the calendar events.
 *
 * The same document, in a page that can sit open next to Canvas: each event
 * renders as a preview of what you are about to paste, with the raw markup in a
 * textarea underneath and a button that puts it on the clipboard.
 *
 * It calls the SAME eventTable() the markdown does, so the code fence and the copy
 * button cannot hand a teacher two different events. That is the whole reason this
 * lives inside this generator rather than beside it; two builders of one table is
 * the failure this repo keeps paying for elsewhere.
 *
 * The textarea is not a fallback, it is the guarantee. navigator.clipboard needs a
 * secure context and this file will be opened from disk as often as from a URL, so
 * the button is the convenience and selecting the field is the path that always
 * works. Canvas's HTML editor wants plain text, which is exactly what a textarea
 * hands over.
 *
 * Self-contained on purpose: no stylesheet link, no webfont, no third-party script.
 * It has to keep working as a file on a desktop or a classroom machine that has
 * never seen this repo, so the palette is inlined as literals rather than read from
 * becurrent-brand.css, the same trade the capture wrappers make.
 */
function renderUnitHtml(unit) {
  const m = unit.meta;
  const code = String(m.code || '').toUpperCase();
  const topics = unit.topics || [];
  const unitName = objectName(m.unit);

  const sections = topics.map(t => {
    const c = code + t.n;
    const a = ASSIGNMENTS[c];
    const title = objectName(t.title);
    const eventTitle = `${PREFIX} - ${c} - ${title}`;
    const table = eventTable(unit, t, c);
    const withheld = (t.withholdTitles || []).length;

    return `
<section class="event" id="${c.toLowerCase()}">
  <div class="event-head">
    <span class="event-num">${esc(plain(t.topic))}</span>
    <h2>${esc(eventTitle)}</h2>
    ${t.subtitle ? `<p class="event-sub">${esc(plain(t.subtitle))}</p>` : ''}
  </div>

  <dl class="meta">
    <dt>Event title</dt><dd><code>${esc(eventTitle)}</code></dd>
    <dt>Assignment to link</dt><dd>${a
      ? `<code>${esc(a.name)}</code> <span class="muted">&middot; ${a.points} points</span>`
      : '<span class="muted">none, this topic is done on paper</span>'}</dd>
  </dl>
${withheld ? `
  <p class="warn"><strong>Do not name the film anywhere in Canvas before this topic runs.</strong>
    The event title, the module header and the assignment name all stay vague on purpose.
    A student who looks the title up in advance reads what they are supposed to conclude
    and arrives having concluded it.</p>` : ''}
  <div class="actions">
    <button type="button" class="btn" data-copy="raw-${c.toLowerCase()}">Copy the HTML for ${esc(plain(t.topic))}</button>
    <button type="button" class="btn quiet" data-copy="title-${c.toLowerCase()}">Copy the event title</button>
    <span class="status" id="status-${c.toLowerCase()}" role="status"></span>
  </div>

  <input type="text" class="offscreen" id="title-${c.toLowerCase()}" readonly value="${esc(eventTitle)}">

  <details open>
    <summary>What it will look like in Canvas</summary>
    <div class="preview">
${table}
    </div>
  </details>

  <details>
    <summary>The raw HTML, to select by hand</summary>
    <label class="offscreen" for="raw-${c.toLowerCase()}">Raw HTML for ${esc(plain(t.topic))}</label>
    <textarea id="raw-${c.toLowerCase()}" class="raw" readonly spellcheck="false" wrap="off">${esc(table)}</textarea>
  </details>
</section>`;
  }).join('\n');

  const jump = topics.map(t => {
    const c = code + t.n;
    return `      <a href="#${c.toLowerCase()}">${esc(plain(t.topic))}</a>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(unitName)} Canvas Events</title>
<style>
  /* GENERATED by scripts/build-canvas-events.js. Do not hand-edit.
     BeCurrent's palette, inlined as literals because this page has to work as a
     standalone file with no access to assets/css/becurrent-brand.css. Keep in step
     with that file by hand; only a teacher ever sees this.
       --signal #CE1400  --signal-deep #A31000  --black-900 #111111
       --ink #141414     --newsprint #F4F2ED    --clean-paper #FFFEFB */
  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;background:#F4F2ED;color:#141414;font:16px/1.6 Georgia,"Times New Roman",serif}
  .wrap{width:min(920px,94vw);margin:0 auto;padding:0 0 64px}

  header.masthead{background:#111111;color:#FFFEFB;padding:26px 0 22px;margin-bottom:26px;border-bottom:4px solid #CE1400}
  header.masthead .wrap{padding-bottom:0}
  header.masthead h1{margin:0 0 6px;font-size:1.6rem;line-height:1.2;letter-spacing:.02em}
  header.masthead p{margin:0;color:#E9958C;font-size:.92rem}

  .card{background:#FFFEFB;border:1px solid rgba(20,20,20,.14);border-top:4px solid #141414;
    border-radius:12px;padding:20px 24px;margin:0 0 26px}
  .card h2{margin:0 0 10px;font-size:1.15rem;letter-spacing:.02em}
  .card ol{margin:0 0 0 1.1rem;padding:0}
  .card li{margin:0 0 6px}
  .card p{margin:0 0 10px}
  .card p:last-child,.card li:last-child{margin-bottom:0}

  .jump{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 26px}
  .jump a{font:700 .78rem/1 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.08em;
    text-decoration:none;color:#A31000;background:rgba(206,20,0,.10);
    border:1px solid rgba(206,20,0,.24);border-radius:999px;padding:8px 14px}
  .jump a:hover{background:#CE1400;color:#FFFEFB;border-color:#CE1400}

  .event{background:#FFFEFB;border:1px solid rgba(20,20,20,.14);border-top:4px solid #CE1400;
    border-radius:12px;padding:20px 24px 22px;margin:0 0 30px}
  .event-num{font:700 .72rem/1 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.12em;color:#A31000}
  .event h2{margin:8px 0 2px;font-size:1.22rem;line-height:1.25;letter-spacing:.02em}
  .event-sub{margin:0;color:#454545;font-style:italic;font-size:.94rem}

  dl.meta{display:grid;grid-template-columns:max-content 1fr;gap:4px 16px;margin:16px 0 0;font-size:.88rem}
  dl.meta dt{font:700 .68rem/1.6 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.09em;color:#5A5A5A}
  dl.meta dd{margin:0}
  code{font:.84rem/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    background:rgba(20,20,20,.07);padding:2px 6px;border-radius:4px}
  .muted{color:#5A5A5A}

  .warn{margin:16px 0 0;padding:12px 14px;font-size:.9rem;
    background:rgba(206,20,0,.10);border-left:4px solid #CE1400;border-radius:0 8px 8px 0}

  .actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:18px 0 4px}
  .btn{font:700 .84rem/1 system-ui,sans-serif;cursor:pointer;background:#CE1400;color:#FFFEFB;
    border:1px solid #CE1400;border-radius:8px;padding:11px 16px}
  .btn:hover{background:#A31000;border-color:#A31000}
  .btn.quiet{background:transparent;color:#A31000}
  .btn.quiet:hover{background:rgba(206,20,0,.10)}
  .btn:focus-visible,a:focus-visible,summary:focus-visible,textarea:focus-visible{
    outline:3px solid #141414;outline-offset:2px}
  .status{font:700 .84rem/1.4 system-ui,sans-serif;color:#A31000;min-height:1.2em}

  details{margin:14px 0 0}
  summary{cursor:pointer;font:700 .72rem/1.6 system-ui,sans-serif;text-transform:uppercase;
    letter-spacing:.09em;color:#5A5A5A;padding:4px 0}
  summary:hover{color:#141414}

  /* The preview has one job: show what Canvas will show, so it must host the markup
     rather than restyle it.

     NO text-transform. Four of the five row labels are uppercase in the markup
     itself, but "BeCurrent Link" is mixed case, and uppercasing it here renders
     BECURRENT LINK, which is not what gets pasted. A preview that quietly disagrees
     with the thing it previews is worse than no preview.

     Sans-serif for the same reason: Canvas sets its own body font, so the table will
     not come out in this page's Georgia. */
  .preview{margin:10px 0 0;overflow-x:auto}
  .preview table{max-width:100%}
  .preview td{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
  .preview h3{margin:0;font-size:.86rem;letter-spacing:.02em}
  .preview p,.preview li{font-size:.9rem;line-height:1.5}
  .preview ol{margin:0;padding-left:1.2rem}

  textarea.raw{width:100%;min-height:15rem;margin-top:10px;padding:12px;
    font:.76rem/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    color:#141414;background:#F4F2ED;border:1px solid rgba(20,20,20,.14);
    border-radius:8px;resize:vertical;white-space:pre}

  .offscreen{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
    clip:rect(0 0 0 0);white-space:nowrap;border:0}

  footer.note{color:#454545;font-size:.86rem;text-align:center;
    border-top:1px solid rgba(20,20,20,.14);padding-top:18px}

  @media print{
    header.masthead{background:#fff;color:#111;border-bottom-color:#111}
    header.masthead p{color:#454545}
    .jump,.actions{display:none}
    .event{break-inside:avoid;border-top-color:#111}
    details{display:block}
    summary,textarea.raw{display:none}
  }
</style>
</head>
<body>

<header class="masthead">
  <div class="wrap">
    <h1>${esc(unitName)}, Canvas Calendar Events</h1>
    <p>BeCurrent &middot; ${topics.length} topic${topics.length === 1 ? '' : 's'} &middot; paste-ready</p>
  </div>
</header>

<div class="wrap">

  <div class="card">
    <h2>How to paste one of these</h2>
    <ol>
      <li>Canvas Calendar, click the day, <strong>Edit</strong>, then <strong>More Options</strong>.</li>
      <li>Title the event exactly as given on the topic below.</li>
      <li>In the Rich Content Editor, click the <code>&lt;/&gt;</code> icon to open the HTML editor.
        <strong>Never paste into the visual editor.</strong> Pasting rendered HTML there injects
        wrapper <code>&lt;div&gt;</code>s and inline font declarations that collapse the table.</li>
      <li>Press <strong>Copy the HTML</strong> below, then paste into that HTML editor.</li>
      <li>Switch back to the visual editor, delete the <code>[INSERT ASSIGNMENT LINK]</code>
        placeholder, and insert the real assignment from the right-hand course-links panel,
        <strong>Assignments</strong>, click the assignment. Do not hand-type that link; see
        Section 5 of <code>CANVAS-BUILD-GUIDE.md</code> for why.</li>
      <li>Save.</li>
    </ol>
  </div>

  <div class="card">
    <h2>This file is generated</h2>
    <p>OVERVIEW, LEARNING TARGETS and SUCCESS CRITERIA are lifted verbatim from
      <code>scripts/lib/unit-content/${esc(m.unitKey)}.js</code>. Edit a target there and rerun
      <code>node scripts/build-canvas-events.js</code>. Never edit a target in Canvas, and never
      in this file: both are copies, and nothing can tell you when a copy has gone stale.</p>
    <p>The markdown twin is <code>docs/canvas/${esc(m.unitKey)}-calendar-events.md</code>. It
      carries the same tables, built by the same function, so the two cannot disagree.</p>
  </div>

  <nav class="jump" aria-label="Jump to a topic">
${jump}
  </nav>
${sections}

  <footer class="note">
    Generated by <code>scripts/build-canvas-events.js</code> from
    <code>scripts/lib/unit-content/${esc(m.unitKey)}.js</code>.
  </footer>
</div>

<script>
(function () {
  'use strict';

  // Two paths to the clipboard, and the second is why the markup also sits in a
  // textarea. navigator.clipboard needs a secure context, which a file:// page is
  // not reliably granted, so selecting the field and asking the browser to copy the
  // selection is the fallback that works from disk. If both refuse, the text is
  // still selected and the message says which keys to press.
  function say(id, message) {
    var el = document.getElementById('status-' + id);
    if (el) el.textContent = message;
  }

  function legacy(done, what) {
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    done(ok
      ? what + ' copied. Paste it into the Canvas HTML editor.'
      : 'Copying is blocked here. The text is selected, press Ctrl+C or Cmd+C.');
  }

  function copyFrom(field, id, what) {
    var text = field.value;
    var wasHidden = field.classList.contains('offscreen');

    // Select first, unconditionally. Even in the worst case the teacher can press
    // Ctrl+C, and on the success path it shows them what was taken.
    try {
      if (wasHidden) field.classList.remove('offscreen');
      field.focus({ preventScroll: true });
      field.select();
      field.setSelectionRange(0, text.length);
    } catch (e) { /* nothing to select; writeText may still work */ }

    function done(message) {
      if (wasHidden) field.classList.add('offscreen');
      say(id, message);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(function () { done(what + ' copied. Paste it into the Canvas HTML editor.'); })
        .catch(function () { legacy(done, what); });
    } else {
      legacy(done, what);
    }
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest ? event.target.closest('button[data-copy]') : null;
    if (!button) return;
    var target = button.getAttribute('data-copy');
    var field = document.getElementById(target);
    if (!field) return;

    // The raw markup lives in a collapsed <details>, and a field inside a closed one
    // cannot be selected. Open it before copying rather than copying nothing.
    var holder = field.closest ? field.closest('details') : null;
    if (holder) holder.open = true;

    var isTitle = target.indexOf('title-') === 0;
    copyFrom(field, target.replace(/^(raw|title)-/, ''),
      isTitle ? 'The event title' : 'The topic HTML');
  });
}());
</${''}script>
</body>
</html>
`;
}

// ── What must never reach a student through these documents ──────────────────
//
// Both failures are silent: the file builds, the table renders, and the damage
// happens in a classroom rather than in a diff. So the generated text is audited
// before anything is written, and a failure refuses the write entirely rather than
// writing and warning. A bad file on disk is one copy-paste from the calendar.
// `unit` is optional: the News Log belongs to the Desk rather than to any unit. The
// withheld-title half needs a unit to have anything to check, but the AP half must
// run on EVERY generated document, which is why this is no longer guarded at the
// call site. A document that skipped the audit because it had no unit attached would
// be the one paste-ready file in the repo with no check on it at all.
function audit(rel, text, unit) {
  const problems = [];

  // A withheld title anywhere in these documents undoes the topic that withholds it
  // on the day the calendar is published, which is before the film is shown.
  ((unit && unit.topics) || []).forEach(t => {
    (t.withholdTitles || []).forEach(title => {
      if (text.includes(title)) {
        problems.push(`"${title}" appears in ${rel}. ${plain(t.topic)} withholds it on purpose: `
          + 'a student who knows the title looks it up and arrives already holding the conclusion.');
      }
    });
  });

  // BeCurrent is a 9-12 elective, not an AP course, and these are pasted where
  // students read them, so the rule that governs student-facing pages governs them
  // too. The port from BeHistorical carried AP framing in once already.
  const ap = text.match(/\bAP\b|Advanced Placement/);
  if (ap) {
    problems.push(`"${ap[0]}" appears in ${rel}. BeCurrent is not an AP course. Name the skill instead.`);
  }

  return problems;
}

const drift = [];
const wrote = [];

const blocked = [];

function emit(rel, content, unit) {
  const problems = audit(rel, content, unit);
  if (problems.length) {
    problems.forEach(m => blocked.push(m));
    return;
  }
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

// The News Log is written first and unconditionally. It belongs to the Desk, which
// runs every class period whether or not a unit has been written yet, so it must not
// sit behind the early exit below: a repo with no unit content would otherwise have
// no Canvas document for the one assignment that collects work every single day.
emit(path.join('docs', 'canvas', 'news-log.md'), renderNewsLog(require('./lib/desk-content')));

if (!files.length) {
  console.log(`${D}No unit content in scripts/lib/unit-content/, `
    + `only the News Log to build.${X}`);
}

files.forEach(file => {
  const unit = require(path.join(CONTENT_DIR, file));
  emit(path.join('docs', 'canvas', `${unit.meta.unitKey}-calendar-events.md`), renderUnit(unit), unit);
  emit(path.join('docs', 'canvas', `${unit.meta.unitKey}-calendar-events.html`), renderUnitHtml(unit), unit);
  emit(path.join('docs', 'canvas', `${unit.meta.unitKey}-assignments.md`), renderAssignments(unit), unit);
});

// Refused before anything is compared or written. These documents are not fit to
// exist in this state, so they do not get to exist in this state.
if (blocked.length) {
  console.error(`\n${R}Refusing to write: content that must not reach a student.${X}\n`);
  blocked.forEach(m => console.error(`  ${R}✗${X} ${m}`));
  console.error('');
  process.exit(1);
}

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

module.exports = {
  renderUnit, renderUnitHtml, renderAssignments, renderNewsLog, newsLogBody,
  ASSIGNMENTS, NEWS_LOG, PREFIX, SITE
};
