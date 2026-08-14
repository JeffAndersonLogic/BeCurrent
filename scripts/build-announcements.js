#!/usr/bin/env node
'use strict';

/* =========================================================
   BUILD THE ANNOUNCEMENTS BOARD FROM THE COURSE ITSELF

   You write a schedule of dates and topic codes in
   assets/data/announcements-schedule.js. This script reads the
   learning targets and success criteria already stored in each unit
   content module, and writes assets/data/announcements.js.

       node scripts/build-announcements.js
       node scripts/build-announcements.js --check   fail on drift

   NOTHING IS INVENTED HERE. Every target and criterion projected on
   the classroom screen is the same text the lesson data carries, so
   the board cannot drift from the course. That is the entire reason
   this is a build step rather than a second document: a board typed
   by hand is a copy of the curriculum with nothing able to tell you
   when the two disagree, and the disagreement is invisible, because
   both surfaces look right on their own.

   The one thing that is yours to write is homework. The course data
   has none, and inventing it would be inventing an assignment.
   ========================================================= */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'data', 'announcements.js');
const SCHEDULE = path.join(ROOT, 'assets', 'data', 'announcements-schedule.js');
const UNIT_DIR = path.join(ROOT, 'scripts', 'lib', 'unit-content');
const WEEK_DIR = path.join(ROOT, 'scripts', 'lib', 'week-content');
const CHECK = process.argv.includes('--check');

const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m', D = '\x1b[2m', X = '\x1b[0m';

const warnings = [];

/* ---------------------------------------------------------
   The schedule is a browser file: it assigns to `window`. Running it
   in a vm with a stub window is how a plain <script> data file gets
   read from Node without a second copy of it in module form.
   --------------------------------------------------------- */
function loadSchedule() {
  if (!fs.existsSync(SCHEDULE)) return null;
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(fs.readFileSync(SCHEDULE, 'utf8'), sandbox, { filename: SCHEDULE });
  } catch (err) {
    console.error(`${R}The schedule file did not parse:${X} ${err.message}`);
    process.exit(1);
  }
  return sandbox.window.BECURRENT_SCHEDULE || null;
}

/* ---------------------------------------------------------
   Titles carry <em> for the accent word. A projector wants the word,
   not the tag.
   --------------------------------------------------------- */
function plain(s) {
  return String(s == null ? '' : s)
    .replace(/<[^>]+>/g, '')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function has(v) { return typeof v === 'string' && v.trim() !== ''; }

/* ---------------------------------------------------------
   Index everything a day can point at.

   Units are keyed by their `code` plus the topic number, SM3. Weeks are
   keyed by W plus their number, W01. A duplicate code is fatal rather
   than a warning: the second one would win silently and project another
   unit's targets under this unit's name.
   --------------------------------------------------------- */
function buildIndex() {
  const index = new Map();
  const codes = new Map();

  if (fs.existsSync(UNIT_DIR)) {
    fs.readdirSync(UNIT_DIR).filter(f => f.endsWith('.js')).sort().forEach(file => {
      const unit = require(path.join(UNIT_DIR, file));
      const m = unit.meta || {};
      const code = String(m.code || '').toUpperCase();
      if (!code) {
        warnings.push(`${file} has no meta.code, so no day can point at its topics.`);
        return;
      }
      if (codes.has(code)) {
        console.error(`\n${R}Two units share the code ${code}:${X} ${codes.get(code)} and ${file}.`);
        console.error(`${D}A day pointing at ${code}1 would silently get one of them. Give each unit its own code.${X}\n`);
        process.exit(1);
      }
      codes.set(code, file);

      (unit.topics || []).forEach(t => {
        index.set(code + String(t.n), {
          kind: 'topic',
          group: plain(m.unit),
          title: plain(t.title),
          subtitle: plain(t.subtitle),
          learningTargets: (t.learningTargets || []).map(e => ({
            text: plain(e.target), label: plain(e.skill)
          })),
          successCriteria: (t.successCriteria || []).map(e => ({
            text: plain(e.criteria), label: plain(e.skill)
          }))
        });
      });
    });
  }

  if (fs.existsSync(WEEK_DIR)) {
    fs.readdirSync(WEEK_DIR).filter(f => f.endsWith('.js')).sort().forEach(file => {
      const week = require(path.join(WEEK_DIR, file));
      const m = week.meta || {};
      const n = String(m.weekNumber || (file.match(/(\d+)/) || [, ''])[1] || '').padStart(2, '0');
      if (!n) return;
      index.set('W' + n, {
        kind: 'week',
        group: has(m.week) ? plain(m.week) : `Week ${n}`,
        title: plain(m.title),
        subtitle: plain(m.subtitle),
        learningTargets: (week.learningTargets || []).map(e => ({
          text: plain(e.target), label: plain(e.skill)
        })),
        successCriteria: (week.successCriteria || []).map(e => ({
          text: plain(e.criteria), label: plain(e.skill)
        }))
      });
    });
  }

  return index;
}

/* ---------------------------------------------------------
   Anything written in the schedule wins over the generated text, so a
   target too long to project can be said shorter on screen without
   touching what the students are actually assessed against.
   --------------------------------------------------------- */
function override(list) {
  return (list || []).map(e => {
    if (has(e)) return { text: e.trim(), label: '' };
    if (e && has(e.text)) return { text: e.text.trim(), label: has(e.label) ? e.label.trim() : '' };
    return null;
  }).filter(Boolean);
}

// A line past about 200 characters steps the board's type down on its own, but
// it is worth saying at build time which line is going to project small.
function flagLong(entries, where) {
  entries.forEach(e => {
    if (e.text.length > 200) {
      warnings.push(`${where}: a line runs ${e.text.length} characters and will project small. `
        + 'Add a shorter override in the schedule if that matters.');
    }
  });
}

function buildDays(schedule, index) {
  return (schedule.days || []).map(entry => {
    if (!entry || !has(entry.date)) return null;

    const codeRaw = has(entry.topic) ? entry.topic.trim().toUpperCase()
      : (has(entry.week) ? 'W' + entry.week.trim().padStart(2, '0') : '');
    const source = codeRaw ? index.get(codeRaw) : null;

    if (codeRaw && !source) {
      warnings.push(`${entry.date} points at "${codeRaw}", which is not a topic or a week. `
        + `Known: ${[...index.keys()].join(', ') || 'none'}.`);
    }

    const day = { date: entry.date.trim() };

    const title = has(entry.topicTitle) ? entry.topicTitle.trim()
      : (source ? source.title : '');
    if (has(title)) day.topic = title;
    if (source && has(source.group)) day.unit = source.group;
    if (source && has(source.subtitle)) day.subtitle = source.subtitle;

    const targets = entry.learningTargets ? override(entry.learningTargets)
      : (source ? source.learningTargets : []);
    const criteria = entry.successCriteria ? override(entry.successCriteria)
      : (source ? source.successCriteria : []);

    flagLong(targets, `${entry.date} learning targets`);
    flagLong(criteria, `${entry.date} success criteria`);

    if (targets.length) day.learningTargets = targets;
    if (criteria.length) day.successCriteria = criteria;

    if (entry.homework !== undefined) day.homework = entry.homework;
    if (has(entry.homeworkDue)) day.homeworkDue = entry.homeworkDue.trim();
    if (has(entry.note)) day.note = entry.note.trim();
    if (has(entry.doNow)) day.doNow = entry.doNow.trim();
    if (Array.isArray(entry.agenda) && entry.agenda.length) day.agenda = entry.agenda;

    return day;
  }).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));
}

/* ---------------------------------------------------------
   The Desk is the first 25 minutes of EVERY class, so it is read out of
   desk-content.js rather than typed on any day. That is also why the
   slide carries the beats and the routine and no story: a board built
   once and served all year cannot hold a headline.
   --------------------------------------------------------- */
function buildDesk(schedule) {
  if (schedule.settings && schedule.settings.showDesk === false) return null;
  let desk;
  try { desk = require('./lib/desk-content'); } catch (e) { return null; }
  return {
    title: plain((desk.meta || {}).title || 'The Desk'),
    minutes: (desk.meta || {}).minutes || 25,
    routine: (desk.routine || []).map(s => ({
      name: plain(s.name), what: plain(s.what), minutes: s.minutes || null
    })),
    beats: (desk.beats || []).map(b => ({ name: plain(b.name), question: plain(b.question) }))
  };
}

function render(payload) {
  return `/* =========================================================
   BECURRENT ANNOUNCEMENTS, GENERATED

   DO NOT EDIT THIS FILE. It is written by
   scripts/build-announcements.js and the next build overwrites it.

   Edit assets/data/announcements-schedule.js and rerun:

       node scripts/build-announcements.js

   Every learning target and success criterion below was lifted out of
   a unit content module, so this board says exactly what the lesson
   says. Homework and notes come from the schedule, because the course
   data has none.
   ========================================================= */

window.BECURRENT_ANNOUNCEMENTS = ${JSON.stringify(payload, null, 2)};
`;
}

/* ---------------------------------------------------------
   Run
   --------------------------------------------------------- */
const schedule = loadSchedule();
if (!schedule) {
  console.error(`\n${R}No schedule found.${X} Expected window.BECURRENT_SCHEDULE in`);
  console.error(`  assets/data/announcements-schedule.js\n`);
  process.exit(1);
}

const index = buildIndex();
const payload = {
  settings: schedule.settings || {},
  days: buildDays(schedule, index),
  assessments: (schedule.assessments || []).filter(a => a && has(a.title)),
  reminders: (schedule.reminders || []).filter(r => r && (has(r.title) || has(r.detail)))
};
const desk = buildDesk(schedule);
if (desk) payload.desk = desk;

const content = render(payload);
const existing = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;

if (CHECK) {
  if (existing !== content) {
    console.error(`\n${R}assets/data/announcements.js has drifted from the schedule and the course data.${X}`);
    console.error(`${D}That file is generated. Edit assets/data/announcements-schedule.js and run:${X}`);
    console.error('  node scripts/build-announcements.js\n');
    process.exit(1);
  }
  console.log(`${G}✓${X} the announcements board matches the schedule and the course data.`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, content, 'utf8');

const dated = payload.days.length;
const sourced = payload.days.filter(d => d.learningTargets || d.successCriteria).length;
console.log(`  ${G}wrote${X} assets/data/announcements.js`);
console.log(`  ${D}${dated} day${dated === 1 ? '' : 's'}, ${sourced} carrying targets lifted from the course data`
  + `${payload.desk ? ', plus the Desk' : ''}${X}`);

if (warnings.length) {
  console.log('');
  warnings.forEach(w => console.log(`  ${Y}note${X} ${w}`));
}
console.log('');
