#!/usr/bin/env node
'use strict';

/**
 * Write one lesson plan per unit, from that unit's content module.
 *
 *   node scripts/build-lesson-plans.js            write the files
 *   node scripts/build-lesson-plans.js --check    fail on drift, write nothing
 *
 * The plan is GENERATED, and that is the whole point of it. A lesson plan kept by
 * hand beside a course that gets rebuilt in response to the news is a document that
 * is wrong within a month, and wrong quietly: it still opens, it still prints, and
 * nothing says the targets in it stopped matching the ones the students were shown.
 *
 * So every word here comes out of scripts/lib/unit-content/<unit>.js. If a plan says
 * something the course does not, the fix is in the content module, not in the
 * markdown. `--check` is in the offline suite for exactly that reason.
 *
 * What it is for: a substitute folder, a department binder, an IEP or 504 meeting
 * where somebody asks what a student was supposed to be able to do that day. All
 * three want the same page, and none of them can open a JavaScript module.
 *
 * Units are DISCOVERED by reading the directory rather than listed, so a new unit
 * gets a plan by existing.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'scripts', 'lib', 'unit-content');
const OUT_DIR = path.join(ROOT, 'docs', 'lesson-plans');
const CHECK = process.argv.includes('--check');

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';

// Titles carry <em> for the accent word and bodies carry <span class="kt"> for key
// terms. Markdown wants neither, and stripping the tag has to keep the word: the
// term inside a `kt` span is teaching, not decoration.
function plain(s) {
  return String(s == null ? '' : s)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function list(items) {
  return items.length ? items.map(i => `- ${i}`).join('\n') : '_None._';
}

function numbered(items) {
  return items.length ? items.map((it, i) => `${i + 1}. ${it}`).join('\n') : '_None._';
}

// A topic's route to Canvas, in the words the teacher needs at the moment a student
// asks "where does this go". A topic with no Brief has no route, and saying so is
// the point: it stops a paper day being marked missing in the gradebook.
function canvasRoute(topic) {
  if (!(topic.sections && topic.sections.length)) {
    return 'Nothing. This topic is done on paper in class and has no online artifact, '
      + 'so there is no submission to collect and nothing to chase.';
  }
  const n = (topic.questions || []).length;
  return `The Brief's own Gather All My Work panel. ${n} response${n === 1 ? '' : 's'} plus `
    + `${n === 1 ? 'its' : 'their'} confidence rating${n === 1 ? '' : 's'}, copied by the `
    + 'student and pasted into Canvas as Text Entry. That panel is the only route these '
    + 'answers have, because the Brief is a standalone page inside an iframe.';
}

function renderTopic(unit, topic) {
  const m = unit.meta;
  const hasBrief = !!(topic.sections && topic.sections.length);
  const out = [];

  out.push(`## ${plain(topic.topic)}. ${plain(topic.title)}`);
  out.push('');
  if (topic.subtitle) out.push(`_${plain(topic.subtitle)}_`);
  out.push('');

  const comps = (topic.competencies || [])
    .map(n => `${n}, ${plain((m.competencies || {})[n] || '')}`);

  out.push('| | |');
  out.push('|---|---|');
  out.push(`| Artifact | ${hasBrief ? `The Brief, \`${briefName(topic)}\`` : 'On paper in class, nothing to open'} |`);
  out.push(`| Skills | ${(topic.skillTags || []).map(plain).join(', ') || 'See the competencies below'} |`);
  out.push(`| Indiana 1512 | ${comps.join('; ') || 'None recorded'} |`);
  out.push(`| Reaches Canvas | ${hasBrief ? 'Yes, through the Brief' : 'No'} |`);
  out.push('');

  if (topic.overview) {
    out.push('### Overview');
    out.push('');
    out.push(plain(topic.overview));
    out.push('');
  }

  out.push('### Learning targets');
  out.push('');
  out.push(numbered((topic.learningTargets || []).map(t => `**${plain(t.skill)}.** ${plain(t.target)}`)));
  out.push('');

  out.push('### Success criteria');
  out.push('');
  out.push(numbered((topic.successCriteria || []).map(c => `**${plain(c.skill)}.** ${plain(c.criteria)}`)));
  out.push('');

  if (topic.inClass) {
    out.push('### What happens in class');
    out.push('');
    out.push(plain(topic.inClass));
    out.push('');
  }

  const clips = topic.videos || [];
  if (clips.length) {
    out.push('### Clips');
    out.push('');
    out.push(list(clips.map(v => {
      const bits = [`[${plain(v.title)}](${v.url})`];
      if (v.source) bits.push(plain(v.source));
      if (v.duration) bits.push(plain(v.duration));
      const head = bits.join(' · ');
      return v.prompt ? `${head}\n  Watch for: ${plain(v.prompt)}` : head;
    })));
    out.push('');
  }

  // Anything else the topic can open. A substitute folder and a department
  // binder both want to know the slides exist; neither can open a JS module to
  // find out, which is why this plan is generated in the first place.
  const resources = topic.resources || [];
  if (resources.length) {
    out.push('### Also linked from the unit page');
    out.push('');
    out.push(list(resources.map(r => `[${plain(r.label)}](${r.url})`)));
    out.push('');
  }

  if (hasBrief) {
    out.push('### The Brief');
    out.push('');
    (topic.support || []).forEach(c => {
      out.push(`**${plain(c.label)}.** ${plain(c.body)}`);
      out.push('');
    });
    if ((topic.terms || []).length) {
      out.push(`**Key terms.** ${topic.terms.map(plain).join(', ')}.`);
      out.push('');
    }
    out.push(list(topic.sections.map(s => `**${plain(s.label)}.** ${plain(s.heading)}`)));
    out.push('');
    if (topic.roadNotTaken) {
      out.push(`**${plain(topic.roadNotTaken.label)}.** ${plain(topic.roadNotTaken.heading)}`);
      out.push('');
    }
    if (topic.takeaway) {
      out.push(`**BeReady, the 10-second takeaway.** ${plain(topic.takeaway)}`);
      out.push('');
    }

    out.push('### The questions');
    out.push('');
    (topic.questions || []).forEach((q, i) => {
      out.push(`${i + 1}. **${plain(q.skill)}.** ${plain(q.text)}`);
      if (q.startHere) out.push(`   - START HERE: ${plain(q.startHere)}`);
      if (q.pushFurther) out.push(`   - PUSH FURTHER: ${plain(q.pushFurther)}`);
    });
    out.push('');
  }

  out.push('### Where the work goes');
  out.push('');
  out.push(canvasRoute(topic));
  out.push('');

  if ((topic.withholdTitles || []).length) {
    out.push('> **Do not name it in front of the room before this topic runs.** This topic');
    out.push('> withholds a title on purpose, and the reason is in the teaching script: a');
    out.push('> student who looks it up in advance reads what they are supposed to conclude');
    out.push('> and arrives having concluded it. `validate.js` fails the build if the name');
    out.push('> appears on any student-facing page in this unit.');
    out.push('');
  }

  return out.join('\n');
}

function briefName(topic) {
  const nn = String(topic.n).padStart(2, '0');
  const slug = topic.slug || plain(topic.topic).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `topic-${nn}-brief-${slug}.html`;
}

function renderPlan(unit) {
  const m = unit.meta;
  const topics = unit.topics || [];
  const withBriefs = topics.filter(t => t.sections && t.sections.length).length;

  const out = [];
  out.push(`# ${plain(m.unit)}, the lesson plan`);
  out.push('');
  out.push('**Generated by `scripts/build-lesson-plans.js` from '
    + `\`scripts/lib/unit-content/${m.unitKey}.js\`. Do not hand-edit.**`);
  out.push('Every target, criterion and question below is the same text the students are');
  out.push('shown, because it is read out of the course data rather than retyped here.');
  out.push('Change it in the content module and rerun:');
  out.push('');
  out.push('```bash');
  out.push('node scripts/build-lesson-plans.js          # write');
  out.push('node scripts/build-lesson-plans.js --check  # fail on drift, write nothing');
  out.push('```');
  out.push('');
  out.push(`${plain(m.course)} · ${topics.length} topics · `
    + `${withBriefs} with a Brief, ${topics.length - withBriefs} on paper`);
  out.push('');

  if (m.overview) {
    out.push('## What the unit is');
    out.push('');
    out.push(plain(m.overview));
    out.push('');
  }

  if (m.terminalQuestion) {
    out.push('## The question it ends on');
    out.push('');
    out.push(`> ${plain(m.terminalQuestion)}`);
    out.push('');
    out.push('Announced on day one and returned to in the last topic. Students are not graded');
    out.push('on which side they land, they are graded on whether they can state the strongest');
    out.push('version of the argument against them.');
    out.push('');
  }

  out.push('## The arc');
  out.push('');
  out.push('| Topic | Title | Artifact | Targets |');
  out.push('|---|---|---|---|');
  topics.forEach(t => {
    const hasBrief = !!(t.sections && t.sections.length);
    out.push(`| ${plain(t.topic)} | ${plain(t.title)} | ${hasBrief ? 'Brief' : 'On paper'} `
      + `| ${(t.learningTargets || []).length} |`);
  });
  out.push('');
  out.push('Each topic uses the earlier ones. The chain drawn in Topic 1 is what gets checked');
  out.push('against a real document in Topic 4, so they are a sequence rather than a list.');
  out.push('');

  out.push('## Assessed against');
  out.push('');
  out.push('Indiana 1512, Current Problems, Issues, and Events.');
  out.push('');
  Object.keys(m.competencies || {}).forEach(k => {
    out.push(`${k}. ${plain(m.competencies[k])}`);
  });
  out.push('');
  out.push('---');
  out.push('');

  topics.forEach((t, i) => {
    out.push(renderTopic(unit, t));
    if (i < topics.length - 1) {
      out.push('---');
      out.push('');
    }
  });

  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n';
}

/**
 * The Desk's plan. One file, because the Desk is one protocol run every day.
 *
 * This exists because the student page stopped printing its own rationale. The Desk
 * page used to carry a paragraph of pedagogy under every routine step and every
 * beat — the content module's `why` and `note` fields — which was most of its length
 * and none of its use to a student trying to file two stories in twelve minutes.
 * Deleting that reasoning would have been the wrong fix: it is exactly what a
 * substitute, a department binder, and an IEP or 504 meeting are asking for. So it
 * moved here, and it is still generated from the same content module, so the plan
 * cannot describe a Desk that the students are not being shown.
 */
function renderDeskPlan(desk) {
  const m = desk.meta || {};
  const story = desk.story || {};
  const minutes = (desk.routine || []).reduce((n, s) => n + (s.minutes || 0), 0);
  const perDay = (desk.lanes || []).length
    * ((story.facts || []).length + (story.questions || []).length);

  const out = [];
  out.push('# The Desk, the daily plan');
  out.push('');
  out.push('**Generated by `scripts/build-lesson-plans.js` from '
    + '`scripts/lib/desk-content.js`. Do not hand-edit.**');
  out.push('The student page at `daily/index.html` comes out of that same module, so what is');
  out.push('below is what the room is shown. What is below and NOT on the student page is the');
  out.push('reasoning: every "Why" here is a `why` or a `note` field that the page deliberately');
  out.push('does not print, because a student filing two stories in twelve minutes does not');
  out.push('need an argument for doing so.');
  out.push('');
  out.push('```bash');
  out.push('node scripts/build-lesson-plans.js          # write');
  out.push('node scripts/build-lesson-plans.js --check  # fail on drift, write nothing');
  out.push('```');
  out.push('');
  const log = desk.log || {};
  const cycleWeeks = Number(log.weeks) || 1;
  const periods = Number(log.periods) || 5;
  out.push(`${plain(m.course)} · every class period · ${minutes} minutes · `
    + `${perDay} boxes filed per student per day`);
  out.push('');
  out.push('**The minute counts in this plan are for you, not for the room.** No');
  out.push('student-facing surface prints them: the Desk takes about half the block and is');
  out.push('allowed to run long, so a number in front of students is a promise the room does');
  out.push('not keep.');
  out.push('');

  out.push('## What it is');
  out.push('');
  out.push('A 90-minute block runs in two halves. This is the first: the same four steps every');
  out.push('class period, against whatever the news happens to be that morning. The second half');
  out.push('is the unit, which has its own plan in this folder.');
  out.push('');
  out.push('The Desk is a **protocol**, not content. It is one generated page that says nothing');
  out.push('that expires, because nobody authors 180 daily pages and a teacher three days behind');
  out.push('on authoring has a dead link in front of thirty students. What changes daily is what');
  out.push('the students bring to it.');
  out.push('');

  out.push('## Nobody speaks to the room');
  out.push('');
  out.push('No student presents, reports out, shares out, or is called on. This is a hard');
  out.push('constraint set on the basis of this room\'s IEP and 504 load, and `validate.js`');
  out.push('fails the build if a routine step or a question starts using presenting language.');
  out.push('');
  out.push('It is enforced and **not announced**. The student page says nothing about it, because');
  out.push('printing the promise turns an ordinary absence into a special accommodation and');
  out.push('points at exactly the students it was meant to protect. Three properties hold it up:');
  out.push('');
  out.push('1. A filing is never shown with a name unless that student asks.');
  out.push('2. The teacher voices the discussion, daily. An expert think-aloud is worth more to a');
  out.push('   below-grade reader than a peer summary, and it is the failure-tolerant mode on a');
  out.push('   bad day.');
  out.push('3. Everyone files. Not volunteers, not a rotation of four.');
  out.push('');
  out.push('Quiet partner talk is allowed, never required, never graded.');
  out.push('');

  out.push('## The routine');
  out.push('');
  (desk.routine || []).forEach(s => {
    out.push(`### Step ${s.n}. ${plain(s.name)} · ${s.minutes} min`);
    out.push('');
    out.push(plain(s.what));
    out.push('');
    if (s.why) {
      out.push(`**Why.** ${plain(s.why)}`);
      out.push('');
    }
  });

  out.push('## The two lanes');
  out.push('');
  out.push('Every student files both, every day. There is no rotation and nothing to track.');
  out.push('');
  (desk.lanes || []).forEach(l => {
    out.push(`### ${plain(l.name)}`);
    out.push('');
    out.push(`_${plain(l.scope)}_`);
    out.push('');
    out.push(`> ${plain(l.question)}`);
    out.push('');
    if (l.note) {
      out.push(`**Why.** ${plain(l.note)}`);
      out.push('');
    }
  });

  out.push('## What a student files, per story');
  out.push('');
  out.push(plain(story.intro || ''));
  out.push('');
  out.push('| | Box | Asks |');
  out.push('|---|---|---|');
  (story.facts || []).forEach(f => {
    out.push(`| Look up | ${plain(f.label)} | ${plain(f.ask)} |`);
  });
  (story.questions || []).forEach(q => {
    out.push(`| Write | ${plain(q.label)} | ${plain(q.text)} |`);
  });
  out.push('');
  out.push('The split between the two kinds of box is the design. The facts are lookups, so they');
  out.push('are answerable by every student in the room on every day, and they are exactly the');
  out.push('sourcing habit the course is about. Only the questions ask for sentences, and two');
  out.push('sentences is the cap.');
  out.push('');

  out.push('### The questions, with both tiers');
  out.push('');
  (story.questions || []).forEach((q, i) => {
    out.push(`${i + 1}. **${plain(q.skill)}.** ${plain(q.text)}`);
    if (q.startHere) out.push(`   - START HERE: ${plain(q.startHere)}`);
    if (q.pushFurther) out.push(`   - PUSH FURTHER: ${plain(q.pushFurther)}`);
  });
  out.push('');
  out.push('Each question also carries the five-button confidence scale, the same scale the');
  out.push('Briefs use, and the word the student pressed is what prints in the Canvas paste.');
  out.push('');

  out.push('### Three ways to file, all equal');
  out.push('');
  out.push(list((story.ways || []).map(plain)));
  out.push('');
  out.push('**These are on this plan and not on the student page.** They are how a filing gets');
  out.push('PRODUCED, not where it is submitted: submission is Canvas and only Canvas, and the');
  out.push('box on the student page read as a menu of submission routes, which it never was.');
  out.push('They are recorded here because a substitute and a 504 meeting are exactly who need');
  out.push('to know that dictation and a paper card are normal here rather than a favour. The');
  out.push('room learns it from how the class runs, not from a notice.');
  out.push('');

  out.push('## The source buttons');
  out.push('');
  out.push('Grouped by the job each does. Every URL is a stable homepage or a search, never an');
  out.push('article: an article link rots inside a week and takes the Hunt step down with it.');
  out.push('Each group ends with something that cannot go stale.');
  out.push('');
  (desk.sources || []).forEach(g => {
    out.push(`### ${plain(g.group)}`);
    out.push('');
    out.push(`_${plain(g.what)}_`);
    out.push('');
    // Colon rather than a dash: no em or en dashes in prose, house-wide.
    out.push(list((g.links || []).map(l => `[${plain(l.name)}](${l.url}): ${plain(l.note)}`)));
    out.push('');
  });

  out.push('## Where the work goes');
  out.push('');
  out.push(`**Every class.** ${plain((desk.accountability || {}).daily || '')}`);
  out.push('');
  out.push(`**Every ${cycleWeeks} weeks, in Canvas.** `
    + `${plain((desk.accountability || {}).written || '')}`);
  out.push('');
  out.push(`The cycle is anchored on Monday \`${plain(log.anchorMonday || 'NOT SET')}\` and runs`);
  out.push(`${cycleWeeks} weeks, about ${periods} class periods. That anchor is the one date in`);
  out.push('`desk-content.js`, and it is what the student\'s browser counts from, so the Gather');
  out.push('button collects exactly the days that belong to the current News Log. Change it');
  out.push('between cycles, never inside one: every boundary after it moves.');
  out.push('');
  out.push(plain((desk.accountability || {}).note || ''));
  out.push('');
  out.push('The daily paste is not a tidiness step. A cycle of filings lives in one browser\'s');
  out.push('`localStorage` and nowhere else until the student copies it out, and the privacy rule');
  out.push('correctly forecloses any server-side copy of student writing. Canvas keeps every');
  out.push('attempt, so pasting daily into the same weekly assignment is the only backup that');
  out.push('exists. See `docs/CANVAS-CAPTURE.md`.');
  out.push('');

  out.push('## House rules');
  out.push('');
  (desk.rules || []).forEach(r => {
    out.push(`- **${plain(r.rule)}** ${plain(r.why)}`);
  });
  out.push('');

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

// The Desk's plan is written first and unconditionally. It is the half of the block
// that runs every single day, so a repo with no unit content written yet still has a
// plan worth handing a substitute, and the old early exit on an empty unit directory
// would have skipped it.
emit(path.join('docs', 'lesson-plans', 'the-desk.md'),
  renderDeskPlan(require('./lib/desk-content')));

files.forEach(file => {
  const unit = require(path.join(CONTENT_DIR, file));
  emit(path.join('docs', 'lesson-plans', `${unit.meta.unitKey}.md`), renderPlan(unit));
});

if (CHECK) {
  if (drift.length) {
    console.error(`\n${R}Lesson plans have drifted from their content modules.${X}\n`);
    drift.forEach(d => console.error(`  ${R}✗${X} ${d.rel} ${D}(${d.reason})${X}`));
    console.error(`\n${D}These files are generated. Edit scripts/lib/unit-content/ and run:${X}`);
    console.error('  node scripts/build-lesson-plans.js\n');
    process.exit(1);
  }
  console.log(`${G}✓${X} lesson plans reproduce exactly from their content modules.`);
  process.exit(0);
}

if (!wrote.length) {
  console.log(`${G}✓${X} Already up to date.`);
} else {
  wrote.forEach(w => console.log(`  ${G}wrote${X} ${w}`));
  console.log(`\n${G}✓${X} ${wrote.length} lesson plan${wrote.length === 1 ? '' : 's'} written.`);
}

module.exports = { renderPlan, renderDeskPlan };
