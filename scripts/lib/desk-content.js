'use strict';

/**
 * The Desk: the daily half of a block.
 *
 * ── Why this is one page and not one page per day ────────────────────────────
 *
 * A 90-minute block runs in two halves. The unit half is CONTENT: it is written
 * ahead of time, it has an arc, and it lives in scripts/lib/unit-content/. The
 * daily half is a PROTOCOL: the same four beats, run every class period, against
 * whatever the news happens to be that morning.
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
 * ── The four beats ───────────────────────────────────────────────────────────
 *
 * Local, National, International, and one of Choice. The first three are fixed
 * because they are a deliberate widening: a student who only ever reads national
 * politics learns that "the news" means one thing. The fourth is where the room
 * gets to be interested in what it is actually interested in, and it rotates so
 * that over a month all four of its lanes come up rather than the loudest one
 * winning every week.
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
    // What it is, in the sentence a student reads first.
    deck: 'The first twenty-five minutes of every class. Four beats, two standing '
      + 'sources, and one question asked properly.',
    minutes: 25
  },

  // ── The routine ─────────────────────────────────────────────────────────────
  //
  // Timed, because an untimed news routine eats the unit half. The times are the
  // shape of the thing rather than a stopwatch: what matters is that the watch
  // and the browse cannot expand into the block's second half without someone
  // noticing they did.
  routine: [
    {
      n: 1,
      minutes: 10,
      name: 'Watch',
      what: 'CNN 10, together, every class period.',
      why: 'It is ten minutes, it is built for this room, and it means every student '
        + 'starts the block having seen the same thing. A shared reference point is what '
        + 'makes the next fifteen minutes a discussion rather than four separate ones.'
    },
    {
      n: 2,
      minutes: 10,
      name: 'The Board',
      what: 'The four beats. Someone brings a story to each one.',
      why: 'Local, National, International, and Choice. The beats are assigned rather '
        + 'than volunteered, so the same four students do not carry the period and the '
        + 'quiet ones are not off the hook.'
    },
    {
      n: 3,
      minutes: 5,
      name: 'One Question',
      what: 'Pick one story off the board and run a single question from Week 01 at it.',
      why: 'Five minutes is enough for one question done properly and not enough for '
        + 'five done badly. Doing it out loud, daily, is what turns the five questions '
        + 'from a worksheet into a habit.'
    }
  ],

  // ── The beats ───────────────────────────────────────────────────────────────
  //
  // Each carries the question that beat is FOR. Without it "bring a local story"
  // is a scavenger hunt, and a student who brings one has done nothing but find
  // it.
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
      how: 'Watched together at the start of every class period. It is the shared '
        + 'starting point, not the whole diet: it is ten minutes long, which means it is '
        + 'leaving almost everything out, and noticing what it left out is a legitimate '
        + 'answer on the board.'
    },
    {
      name: 'The Week',
      url: 'https://theweek.com',
      what: 'A magazine that summarizes how several outlets covered the same story.',
      how: 'The browse source when a student has no story for their beat. It is useful '
        + 'here for a specific reason: it shows the same event written up more than one '
        + 'way on a single page, which is the Coverage Compare module happening in the '
        + 'wild.'
    }
  ],

  // ── What a student is accountable for ───────────────────────────────────────
  //
  // Deliberately small. The Desk is oral. Making every student write every day
  // produces about 16,000 submissions a year and nothing gets read, which teaches
  // students that the writing was never the point.
  accountability: {
    daily: 'Oral. You are on a beat, and when your beat comes up you have a story, a '
      + 'source, and a date.',
    written: 'One News Log a week, submitted through Canvas. It carries the four beats '
      + 'you were responsible for and the one story you changed your mind about.',
    note: 'The log is the graded artifact and the daily board is the practice. That split '
      + 'is deliberate: a daily written submission is 180 pieces of writing a year per '
      + 'student that no one can read carefully, and writing nobody reads carefully stops '
      + 'being writing.'
  }
};

module.exports = DESK;
