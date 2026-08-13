'use strict';

/**
 * The Desk: the daily half of a block.
 *
 * ── Why this is one page and not one page per day ────────────────────────────
 *
 * A 90-minute block runs in two halves. The unit half is CONTENT: it is written
 * ahead of time, it has an arc, and it lives in scripts/lib/unit-content/. The
 * daily half is a PROTOCOL: the same three steps, run every class period,
 * against whatever the news happens to be that morning.
 *
 * Those two things must be built differently or the course does not survive
 * October. There are about 180 class periods in a year. Nobody authors 180 daily
 * pages, and a teacher who falls three days behind on authoring has a dead link
 * in front of thirty students. So the Desk is generated once, says nothing that
 * expires, and what changes daily is what the students bring to it.
 *
 * That is also why there is no headline anywhere in this file. Per CLAUDE.md,
 * "Do not fabricate reporting": the entire course is about the difference between
 * what was reported and what was made up, and a page that shipped with plausible
 * example headlines would be teaching the opposite lesson every day it was open.
 * The Desk holds the questions. The students bring the stories.
 *
 * ── NOBODY SPEAKS TO THE ROOM. This is a hard constraint. ────────────────────
 *
 * An earlier version of this file ran step 2 as an oral board: students on a beat
 * reported their story out loud. That is removed and must not come back. Given
 * this room's IEP and 504 load it is not feasible, and a daily public-speaking
 * demand does not produce the learning it appears to produce: it produces one
 * student talking and twenty-nine waiting.
 *
 * The replacement is deliberately NOT "write more instead". Swapping a speaking
 * demand for a heavy writing demand trades one barrier for another, and several
 * of the same students are limited in written output. So the daily unit of work
 * is a DISPATCH: four short fields, filed privately, filed the same way every
 * day, and filable by typing, by dictation, or on a paper card.
 *
 * Three rules hold the whole thing up, and each one exists because breaking it
 * reintroduces the barrier this design removed:
 *
 *   1. A dispatch is never displayed with a student's name on it unless that
 *      student asks for it. Attribution is the exposure, not the speaking.
 *   2. The teacher does the talking. Every day, the teacher reads three or four
 *      dispatches aloud and runs one question at them. An expert think-aloud,
 *      daily, is worth more to a below-grade reader than a peer summary, and it
 *      is the failure-tolerant mode on a bad day.
 *   3. Every student files. Not volunteers, not a rotation of four. The point of
 *      a 30-word unit of work is that all thirty can do it in eight minutes.
 *
 * Quiet partner talk is allowed and is never required, never assigned, and never
 * graded. It helps the students it helps, and for a selectively mute or severely
 * anxious student a partner is not automatically a safe audience either.
 *
 * ── The four beats ───────────────────────────────────────────────────────────
 *
 * A beat is now the LANE YOU FILE IN, not a speaking assignment. Every student
 * has a standing beat that rotates weekly, so roughly a quarter of the room files
 * each lane and the teacher has four lanes to build a front page from.
 *
 * Local, National and International are fixed because they are a deliberate
 * widening: a student who only ever reads national politics learns that "the
 * news" means one thing. The fourth is where the room gets to be interested in
 * what it is actually interested in, and it rotates so that over a month all four
 * of its lanes come up rather than the loudest one winning every week.
 *
 * Sports and entertainment are on that list on purpose and are not filler. A
 * sports story is a labour story, a public-money story, and a story with better
 * primary sources than most, and a student who will not read a city council
 * agenda will read a stadium financing deal that uses the same tax mechanism.
 */

const DESK = {
  meta: {
    course: 'CURRENT EVENTS',
    title: 'The Desk',
    deck: 'The first twenty-five minutes of every class. Watch it, file one dispatch, '
      + 'then read the front page we just built.',
    minutes: 25
  },

  // ── The routine ─────────────────────────────────────────────────────────────
  //
  // Timed, because an untimed news routine eats the unit half. The times are the
  // shape of the thing rather than a stopwatch: what matters is that the watch and
  // the filing cannot expand into the block's second half without someone noticing.
  routine: [
    {
      n: 1,
      minutes: 10,
      name: 'Watch',
      what: 'CNN 10, together, captions on, every class period.',
      why: 'It is ten minutes, it is built for this room, and it means every student '
        + 'starts the block having seen the same thing. That shared input is what makes '
        + 'the next step possible for a student who had no time, no device, and no news '
        + 'at home last night: the story they need is the one that just played.'
    },
    {
      n: 2,
      minutes: 8,
      name: 'File',
      what: 'Everyone files one dispatch. Four short fields, about thirty words.',
      why: 'Everyone, every day, privately. It is short on purpose: thirty scaffolded '
        + 'words that all thirty students can finish is worth more than a paragraph that '
        + 'twelve of them finish. Type it, dictate it, or hand in a paper card.'
    },
    {
      n: 3,
      minutes: 7,
      name: 'The Front Page',
      what: 'The teacher reads three or four dispatches aloud, names removed, and runs '
        + 'one question from Week 01 at them.',
      why: 'The teacher does the talking. Hearing an expert reason out loud about work '
        + 'the room just produced is the modelling a struggling reader most needs and '
        + 'least often gets, and putting three dispatches on one story side by side is '
        + 'Coverage Compare happening in miniature, every single day.'
    }
  ],

  // ── The dispatch ────────────────────────────────────────────────────────────
  //
  // The daily unit of work. Four fields rather than a paragraph, because the
  // fields are the skill: an answer that cannot name the outlet or the date has
  // skipped the part this course is about.
  dispatch: {
    intro: 'The same four fields every day. They are short, and they are the whole '
      + 'sourcing habit in miniature: who said it, when, what happened, and what would '
      + 'have to be true for it to be wrong.',
    fields: [
      { label: 'Outlet', ask: 'Who reported it?', stem: 'This came from ___.' },
      { label: 'Date', ask: 'When?', stem: 'It was published on ___.' },
      { label: 'What happened', ask: 'One sentence. The event, not the reaction.',
        stem: 'The main thing that happened is ___.' },
      { label: 'What I would check', ask: 'One thing that would change your mind.',
        stem: 'I would want to check ___, because ___.' }
    ],
    tiers: [
      {
        label: 'Start here',
        text: 'Use a story from today&rsquo;s CNN 10. You already watched it, the sentence '
          + 'stems are on the card, and the outlet and date are in the segment.'
      },
      {
        label: 'Push further',
        text: 'Bring your own story from your beat, or file the same story from two '
          + 'different outlets and say which one you would trust in an argument.'
      }
    ],
    // How a dispatch can be filed. Three ways, equally valid, no permission needed.
    // Listed on the page rather than handled quietly per student, because a
    // student who has to ask for the accommodation often does not ask.
    ways: [
      'Type it on this page.',
      'Dictate it. Voice typing is a normal way to file, not a special arrangement.',
      'Write it on a paper card and hand it in.'
    ]
  },

  // ── The beats ───────────────────────────────────────────────────────────────
  //
  // Each carries the question that beat is FOR. Without it "bring a local story"
  // is a scavenger hunt, and a student who brings one has done nothing but find it.
  beats: [
    {
      id: 'local',
      name: 'Local',
      scope: 'Zionsville, Boone County, Indianapolis, Indiana.',
      question: 'Who decided this, and could you go to the meeting where they decide the next one?',
      note: 'The beat with the shortest distance between a story and a student doing '
        + 'something about it. Local government publishes its agendas, its minutes and its '
        + 'budgets, which makes this the easiest beat to check and the one where a student '
        + 'is most likely to find that the reporting left something out.'
    },
    {
      id: 'national',
      name: 'National',
      scope: 'The United States: government, courts, economy, disasters, elections.',
      question: 'What actually changed today, as opposed to what was said today?',
      note: 'The beat most likely to arrive pre-argued. The discipline here is separating '
        + 'the event from the reaction to the event, which is most of what a national news '
        + 'cycle consists of.'
    },
    {
      id: 'international',
      name: 'International',
      scope: 'Anywhere else, including the places currently in the units.',
      question: 'Who is telling us this, and how close are they to it?',
      note: 'The beat where sourcing is hardest and matters most. A story from eight time '
        + 'zones away has usually passed through several hands before it reaches this room, '
        + 'and the number of hands is the story.'
    },
    {
      id: 'choice',
      name: 'Choice',
      scope: 'Rotates: Politics, Sports, Entertainment, Pop Culture.',
      question: 'Why is this being covered at all, and who benefits from the coverage?',
      note: 'A sports story is a labour story and a public-money story. An entertainment '
        + 'story is a business story with a press office attached. This beat is not the '
        + 'dessert, it is the beat where students already have expertise, and expertise is '
        + 'what makes bad coverage visible.'
    }
  ],

  // The Choice beat rotates so all four lanes come up over a month rather than
  // the loudest one winning every week.
  rotation: ['Politics', 'Sports', 'Entertainment', 'Pop Culture'],

  // ── Standing resources ──────────────────────────────────────────────────────
  //
  // Two, and only two. A list of fifteen sources is a list nobody opens. These
  // are the ones already used in this room, so the page is describing the class
  // rather than proposing a new one.
  resources: [
    {
      name: 'CNN 10',
      url: 'https://www.cnn.com/cnn10',
      what: 'A ten-minute daily news show made for classrooms.',
      how: 'Watched together at the start of every class period, captions on. It is also '
        + 'the floor for the dispatch: if you have no story of your own, the story you need '
        + 'is the one that just played. It is ten minutes long, which means it is leaving '
        + 'almost everything out, and noticing what it left out is a legitimate dispatch.'
    },
    {
      name: 'The Week',
      url: 'https://theweek.com',
      what: 'A magazine that summarizes how several outlets covered the same story.',
      how: 'The browse source when your beat has nothing yet. It is useful here for a '
        + 'specific reason: it shows the same event written up more than one way on a '
        + 'single page, which is the Coverage Compare module happening in the wild.'
    }
  ],

  // ── What a student is accountable for ───────────────────────────────────────
  accountability: {
    daily: 'One filed dispatch. Typed, dictated, or handwritten. Never spoken to the '
      + 'class, and never shown with your name on it unless you ask for it.',
    written: 'One News Log a week, submitted through Canvas. It is your five dispatches '
      + 'collected, plus one line about the story that changed your mind.',
    note: 'The dispatches are the practice and the log is the graded artifact. That split '
      + 'is deliberate in both directions. Grading thirty dispatches a day is 5,400 grading '
      + 'events a year and none of them would get read properly. Grading nothing daily means '
      + 'finding out on Friday that Tuesday was lost.'
  },

  // ── House rules ─────────────────────────────────────────────────────────────
  //
  // The operating facts a student needs in order to file without asking: what
  // happens to what they write, how long it is meant to take, and what is
  // optional.
  //
  // What is deliberately NOT here is any announcement that nobody presents.
  // Nobody presenting is simply how this class runs, and a page that makes a
  // point of promising it turns an ordinary absence into a special
  // accommodation, which draws attention to exactly the students it was meant
  // to protect. The constraint is enforced in the design and in validate.js. It
  // is not advertised to the room.
  rules: [
    { rule: 'Your name is never on the board unless you put it there.',
      why: 'Dispatches are read aloud with names removed. You can ask to be named.' },
    { rule: 'Thirty words is the whole job.',
      why: 'It is short so that finishing is normal rather than impressive.' },
    { rule: 'Talking to one person is optional and never graded.',
      why: 'It helps some people think. It is not a requirement and nobody is tracking it.' }
  ]
};

module.exports = DESK;
