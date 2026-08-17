'use strict';

/**
 * The Desk: the daily half of a block.
 *
 * ── Why this is one page and not one page per day ────────────────────────────
 *
 * A 90-minute block runs in two halves. The unit half is CONTENT: it is written
 * ahead of time, it has an arc, and it lives in scripts/lib/unit-content/. The
 * daily half is a PROTOCOL: the same four steps, run every class period, against
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
 * The one dated thing on the Desk is the storage key, and the BROWSER stamps it
 * at load rather than the build stamping it into the source. See the header of
 * scripts/lib/desk-capture-block.js. That is what lets one dateless generated
 * page give every class period its own clean sheet.
 *
 * ── NOBODY SPEAKS TO THE ROOM. This is a hard constraint. ────────────────────
 *
 * An earlier version of this file ran a step as an oral board: students on a beat
 * reported their story out loud. That is removed and must not come back. Given
 * this room's IEP and 504 load it is not feasible, and a daily public-speaking
 * demand does not produce the learning it appears to produce: it produces one
 * student talking and twenty-nine waiting.
 *
 * The replacement is deliberately NOT "write more instead". Swapping a speaking
 * demand for a heavy writing demand trades one barrier for another, and several
 * of the same students are limited in written output. So the daily unit of work
 * is two SHORT filings rather than an essay: three facts you look up and two
 * sentences you write, per story, filed privately, and filable by typing, by
 * dictation, or on a paper card.
 *
 * Three rules hold the whole thing up, and each one exists because breaking it
 * reintroduces the barrier this design removed:
 *
 *   1. A filing is never displayed with a student's name on it unless that
 *      student asks for it. Attribution is the exposure, not the speaking.
 *   2. The teacher does the talking. Every day, the teacher reads three or four
 *      filings aloud and runs one question at them. An expert think-aloud, daily,
 *      is worth more to a below-grade reader than a peer summary, and it is the
 *      failure-tolerant mode on a bad day.
 *   3. Every student files. Not volunteers, not a rotation of four.
 *
 * Quiet partner talk is allowed and is never required, never assigned, and never
 * graded. It helps the students it helps, and for a selectively mute or severely
 * anxious student a partner is not automatically a safe audience either.
 *
 * ── The two lanes, and what happened to the four beats ───────────────────────
 *
 * This file used to carry four beats (Local, National, International and a
 * rotating Choice) with each student assigned to ONE of them for a week. The
 * rotation is retired. Every student now files TWO stories every day, one Local
 * and one National or International.
 *
 * The reason is coverage per student rather than coverage per room. Under the
 * rotation a student spent a quarter of the year in each lane and could go three
 * weeks without reading a local story; the room had four kinds of story on it
 * every day but no individual student did. Two lanes a day, every day, is the
 * deliberate widening the four beats were reaching for, and it needs nothing
 * tracked: there is no assignment to remember and no rotation to fall behind.
 *
 * Local is fixed because it has the shortest distance between a story and a
 * student doing something about it, and because local government publishes its
 * agendas, its minutes and its budgets, which makes it the easiest beat to check.
 * National-or-International is one lane rather than two so that the student
 * chooses, and so that a quiet week in Washington is not a dead end.
 *
 * The Choice beat's question was the best line in the old file, "why is this
 * being covered at all, and who benefits from the coverage?", and it survives as
 * the Push Further tier on the second question, where every student meets it
 * every day instead of a quarter of the room meeting it one week in four.
 *
 * ── What is NOT on the student page ──────────────────────────────────────────
 *
 * Every `why` and every `note` in this file is teacher rationale, and the student
 * page does not print it. It goes to docs/lesson-plans/the-desk.md, which is the
 * page a substitute folder, a department binder and a 504 meeting all want, and
 * none of them can open a JavaScript module. The Desk page a student opens is
 * four steps, two lanes, the source buttons, the filing form and the two gather
 * buttons: things to do, not an explanation of why they are worth doing.
 */

const DESK = {
  meta: {
    course: 'CURRENT EVENTS',
    title: 'The Desk',
    deck: 'Watch the news. Find two stories, one local and one from further out. '
      + 'File them here, then copy your log into Canvas.',
    // Kept for the generated lesson plan, which is where a substitute needs a
    // timing. NOT printed on any student-facing surface: the Desk takes about half
    // the block and is allowed to run long, so a number in front of students is a
    // promise the room does not keep. The per-step minutes are in `routine`.
    minutes: 32
  },

  // ── The routine ─────────────────────────────────────────────────────────────
  //
  // Timed, because an untimed news routine eats the unit half. The times are the
  // shape of the thing rather than a stopwatch: what matters is that the watch,
  // the hunt and the filing cannot expand into the block's second half without
  // someone noticing.
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
      minutes: 5,
      name: 'Hunt',
      what: 'Find two stories that interest you: one local, one national or international. '
        + 'The source buttons are the fast way.',
      why: 'Five minutes is deliberate, and the source buttons are what make it possible. '
        + 'A student handed the instruction "find a local story" with no starting point '
        + 'spends the whole period searching and files nothing, which looks like '
        + 'disengagement and is actually a missing address book. Every button is a stable '
        + 'homepage rather than an article link, because an article link rots inside a week '
        + 'and a homepage does not.'
    },
    {
      n: 3,
      minutes: 12,
      name: 'File',
      what: 'Fill in both stories on this page: where it came from, what happened, and why '
        + 'it caught you. It saves as you type.',
      why: 'Everyone, every day, privately. The three facts are lookups rather than '
        + 'writing, which is the point: a student who cannot yet write a paragraph about a '
        + 'story can still name the outlet and the date, and naming them is the sourcing '
        + 'habit this whole course is built on. Only the two questions ask for sentences, '
        + 'and two sentences is the whole job. Type it, dictate it, or hand in a paper card.'
    },
    {
      n: 4,
      minutes: 5,
      name: 'The Front Page',
      what: 'Your teacher reads three or four filings aloud, names removed, and runs one '
        + 'question from Week 01 at them.',
      why: 'The teacher does the talking. Hearing an expert reason out loud about work the '
        + 'room just produced is the modelling a struggling reader most needs and least '
        + 'often gets, and putting two filings on the same story side by side is Coverage '
        + 'Compare happening in miniature, every single day. Now that every student files '
        + 'both lanes, the local filings can also be read against each other, which is '
        + 'where the room finds out that two people watched the same meeting and heard '
        + 'different things.'
    }
  ],

  // ── The two lanes ───────────────────────────────────────────────────────────
  //
  // Each carries the question that lane is FOR. Without it "bring a local story"
  // is a scavenger hunt, and a student who brings one has done nothing but find it.
  lanes: [
    {
      id: 'local',
      name: 'Local',
      scope: 'Zionsville, Boone County, Indianapolis, Indiana.',
      question: 'Who decided this, and could you go to the meeting where they decide the next one?',
      note: 'The lane with the shortest distance between a story and a student doing '
        + 'something about it. Local government publishes its agendas, its minutes and its '
        + 'budgets, which makes this the easiest lane to check and the one where a student '
        + 'is most likely to find that the reporting left something out.'
    },
    {
      id: 'world',
      name: 'National or International',
      scope: 'The United States, or anywhere else. You choose which, every day.',
      question: 'What actually changed, as opposed to what was said, and how close is the '
        + 'person telling us to the thing itself?',
      note: 'One lane rather than two, so the student chooses and a quiet week in '
        + 'Washington is not a dead end. It carries both of the old lanes’ questions '
        + 'because both apply: a national story usually arrives pre-argued, so the '
        + 'discipline is separating the event from the reaction to it, and a story from '
        + 'eight time zones away has passed through several hands before it reaches this '
        + 'room, where the number of hands is the story. Today’s CNN 10 always counts '
        + 'here, which is the floor for a student who had no device last night.'
    }
  ],

  // ── What a student files, per story ─────────────────────────────────────────
  //
  // Three facts and two questions, twice. The split between them is the design:
  // the facts are lookups, so they are answerable by every student in the room on
  // every day, and they are exactly the sourcing habit the course is about. The
  // questions are the only part that asks for sentences, and two is the cap.
  //
  // The facts are deliberately NOT hashed into the Canvas record footer. They are
  // facts rather than writing, and hashing them would report a student who fixed
  // a misspelled outlet name as having edited their work, which is an accusation.
  // The two questions are the capture slots. See docs/CANVAS-CAPTURE.md.
  story: {
    intro: 'The same five boxes for each story. Three you look up, two you write.',

    facts: [
      {
        id: 'outlet',
        label: 'Outlet',
        ask: 'Who reported it?',
        placeholder: 'Times Sentinel, Reuters, CNN 10…'
      },
      {
        id: 'date',
        label: 'Published',
        ask: 'When did they publish it?',
        placeholder: 'September 8, 2026'
      },
      {
        id: 'link',
        label: 'Link',
        ask: 'Paste the link, so you can find it again.',
        placeholder: 'https://…'
      }
    ],

    questions: [
      {
        id: 'what',
        skill: 'Framing',
        label: 'What happened',
        text: 'What happened? Two sentences, in your own words. The event, not the '
          + 'reaction to it.',
        startHere: 'Two sentences is the whole job. If the story is about someone '
          + 'responding to something, the thing they are responding to is the event, and '
          + 'that is what goes here.',
        pushFurther: 'Write the event the way the outlet wrote it, then the way you would '
          + 'write it. If those two are different, the difference is worth a sentence.'
      },
      {
        id: 'why',
        skill: 'Generalizing from Evidence',
        label: 'Why it caught me',
        text: 'Why did this one catch you? One or two sentences. Who it affects, what it '
          + 'changes, or what you want to know next.',
        startHere: 'Finish one of these: this matters to me because ___ / this affects ___ '
          + '/ I want to know ___.',
        pushFurther: 'Why is this being covered at all, and who benefits from the coverage?'
      }
    ],

    // How a filing can be PRODUCED. Not where it is submitted: submission is Canvas
    // and only Canvas, and the page says that in the gather panel where it matters.
    // These are the accommodations, and they are equally valid with no permission
    // needed.
    //
    // NOT ON THE STUDENT PAGE any more, by the teacher's call: the box read as a
    // menu of submission routes, which it never was, and there is only one of those.
    // It stays here and in docs/lesson-plans/the-desk.md because it is an
    // accommodation record rather than a student instruction, and a substitute or a
    // 504 meeting is exactly who needs to know that dictation and a paper card are
    // normal here rather than a favour. The room learns it from how the class runs.
    ways: [
      'Type it on this page. It saves in this browser as you go.',
      'Dictate it. Voice typing is a normal way to file, not a special arrangement.',
      'Write it on a paper card and hand it in.'
    ]
  },

  // ── The source buttons ──────────────────────────────────────────────────────
  //
  // Grouped by the job each one does, because a flat list of a dozen outlets is a
  // list nobody opens and the student's actual question is "where do I look for a
  // LOCAL story". Every URL is a stable homepage or a search, never an article:
  // an article link rots inside a week and takes the Hunt step down with it.
  //
  // Each group ends with something that cannot go stale. Local news sites move
  // more often than the national wire does, and a search URL survives a
  // redesign that breaks a section link.
  //
  // The one-line notes are descriptive rather than evaluative where they can be
  // and name the desk's country and leaning where that is the useful fact. A
  // student comparing two accounts of the same event needs to know that one desk
  // sits in Qatar and the other in Atlanta.
  sources: [
    {
      group: 'Start here',
      what: 'The two this class already uses.',
      links: [
        { name: 'CNN 10', url: 'https://www.cnn.com/cnn10',
          note: 'The ten-minute show we watch. Today’s episode always counts as your national or international story.' },
        { name: 'The Week', url: 'https://theweek.com',
          note: 'Summarizes how several outlets covered the same story, on one page.' }
      ]
    },
    {
      group: 'Local',
      what: 'Zionsville, Boone County, Indiana.',
      links: [
        { name: 'Times Sentinel', url: 'https://www.timessentinel.com/',
          note: 'Zionsville’s paper of record.' },
        { name: 'Current in Zionsville', url: 'https://youarecurrent.com/category/zionsville/',
          note: 'Community coverage: schools, town council, business.' },
        { name: 'Search Zionsville news', url: 'https://news.google.com/search?q=Zionsville%20Indiana',
          note: 'Always works. Use this if a link above is dead.' }
      ]
    },
    {
      // One group rather than two, matching the lane. The student's second story is
      // "national OR international, you choose", so splitting the buttons into
      // National and International asked them to decide which lane they were in
      // before they had a story, which is backwards: you find the story and then
      // discover where it is.
      group: 'National or International',
      what: 'The United States, or anywhere else. Government, courts, economy, '
        + 'disasters, elections, war, money.',
      links: [
        // "Associated Press" rather than the initials the site brands itself with,
        // for two reasons that point the same way. A 9th grader does not
        // necessarily know what those initials stand for, and in this repo those
        // same two letters standing alone are what validate.js refuses on a
        // student-facing page, correctly: a regex cannot tell a wire service's
        // initials from the framing of another course.
        { name: 'Associated Press', url: 'https://apnews.com', note: 'US wire service.' },
        { name: 'Reuters', url: 'https://www.reuters.com', note: 'UK wire service.' },
        { name: 'NPR', url: 'https://www.npr.org', note: 'US public radio.' },
        { name: 'CNN', url: 'https://www.cnn.com', note: 'US cable, centre left.' },
        { name: 'Fox News', url: 'https://www.foxnews.com', note: 'US cable, right.' },
        { name: 'NewsNation', url: 'https://www.newsnationnow.com', note: 'US cable.' },
        { name: 'BBC News', url: 'https://www.bbc.com/news',
          note: 'UK public broadcaster. The one desk here that is not American.' },
        { name: 'Newsweek', url: 'https://www.newsweek.com', note: 'US news magazine.' },
        { name: 'Bloomberg', url: 'https://www.bloomberg.com',
          note: 'US business and markets. Good for the money behind a story.' },
        // The contributor note is not a warning, it is the lesson. Sourcing is what
        // this course teaches, and Forbes is the clearest everyday case of one
        // masthead carrying both staff reporting and outside writing, which is
        // exactly the distinction a student has to learn to look for.
        { name: 'Forbes', url: 'https://www.forbes.com',
          note: 'US business. Check whether a piece is by staff or an outside contributor.' },
        { name: 'Search the news', url: 'https://news.google.com',
          note: 'Always works. Good for one topic across many outlets.' }
      ]
    }
  ],

  // ── The News Log cycle ──────────────────────────────────────────────────────
  //
  // The graded artifact is one News Log every TWO weeks, which on a block schedule
  // is about five class periods. The Desk's gather button has to collect exactly
  // the days that belong to the current log, so it needs to know where one cycle
  // ends and the next begins.
  //
  // A weekly log needed no configuration: "the Monday of this week" is computable
  // from any date. A two-week cycle is not, because nothing in a single date says
  // whether this is the first week of a cycle or the second. So the cycle is
  // ANCHORED here, and every student's browser counts from the same Monday.
  //
  // Without an anchor the obvious shortcut is a rolling fourteen days back from
  // today, and that is wrong in a way that would not look wrong: two students
  // pressing the button on different days would produce two different windows, and
  // a day would land in one student's log and the next student's, or in neither.
  //
  // `anchorMonday` is the Monday the first cycle starts on, and it is the one date
  // in this file. Set it to the first Monday of the term. Change it mid-year and
  // every cycle boundary after it moves, so change it between cycles rather than
  // inside one.
  log: {
    anchorMonday: '2026-08-17',
    weeks: 2,
    // What a full cycle looks like on a block schedule. Used in the wording only;
    // nothing counts periods, because the Desk has no calendar and must not pretend
    // to have one. See the `expected` note in scripts/lib/desk-capture-block.js.
    periods: 5
  },

  // ── What a student is accountable for ───────────────────────────────────────
  //
  // The daily/per-cycle split is deliberate in both directions. Grading thirty
  // filings a day is 5,400 grading events a year and none of them would get read
  // properly. Grading nothing until the end means finding out in week two that the
  // first Tuesday was lost. So: file daily, copy daily, graded once a cycle.
  //
  // "Copy it in every day" is not an optional tidiness step and the page says so.
  // Two weeks of work living only in this browser's localStorage is one cleared
  // profile away from gone, and the privacy rule correctly forecloses any
  // server-side copy. Pasting into the same assignment each day is the only backup
  // that exists, and Canvas keeps every attempt.
  accountability: {
    daily: 'Two stories filed on this page, then Copy My Log and paste it into the '
      + 'current News Log in Canvas. Never spoken to the class, and never shown with '
      + 'your name on it unless you ask for it.',
    written: 'One News Log every two weeks, in Canvas, about five class periods of '
      + 'filings. It is the same assignment for the whole two weeks, so paste your log '
      + 'into it again each day. The last paste is the one that gets graded.',
    note: 'The daily filings are the practice and the News Log is the graded artifact. '
      + 'Pasting every day is also your only backup: your work is saved in this browser and '
      + 'nowhere else until you copy it into Canvas.'
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
      why: 'Filings are read aloud with names removed. You can ask to be named.' },
    { rule: 'Two sentences per question is the whole job.',
      why: 'It is short so that finishing is normal rather than impressive.' },
    { rule: 'Your work is saved in this browser only, until you copy it into Canvas.',
      why: 'That is why the last step every day is Copy My Week. Nothing you write here is sent anywhere on its own.' },
    { rule: 'Talking to one person is optional and never graded.',
      why: 'It helps some people think. It is not a requirement and nobody is tracking it.' }
  ]
};

module.exports = DESK;
