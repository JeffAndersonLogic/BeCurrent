'use strict';

/**
 * Social Media unit, Topics 3 to 6.
 *
 * Topics 1 and 2 have no Brief: Topic 1 is the slide deck and the paper trace,
 * Topic 2 is the film. The Brief exists for the topics that need a reading
 * backdrop, which is what it is for.
 *
 * REGISTER. These are written to match the Topic 1 deck, not the Foundations-style
 * reading. The deck's own note is the style guide:
 *
 *     "these definitions are deliberately plainer than a dictionary. Precision
 *      here costs comprehension, and comprehension is what the rest of the topic
 *      runs on."
 *
 * So: short sentences, one idea each, concrete before abstract, metaphors only
 * where they carry weight, and every key term defined in the sentence it first
 * appears in. Flat and curious, never ominous — the moment it sounds like an
 * adult warning them about screens, the room files it away and stops reading.
 *
 * Each topic carries START HERE / PUSH FURTHER on its questions, the same two-tier
 * structure the deck uses, because that is the differentiation lever that already
 * works in this room.
 *
 * Every topic also carries a `roadNotTaken` section. Tracing backwards from a
 * present-day outcome only ever surfaces the causes that led to it, so without a
 * deliberate alternative the past reads as a corridor. That section is the fix,
 * and it is why the history in these Briefs names dates and people.
 */

const UNIT = {
  unit: 'Social Media',
  unitKey: 'social-media',
  // The code the announcements schedule points a day at: SM3 is this unit's
  // Topic 3. Short because it gets typed once per class day for a year. It must
  // be unique across units; build-announcements.js fails loudly if two clash,
  // because the second one would silently win and project the wrong targets.
  code: 'SM',
  course: 'CURRENT EVENTS',
  // aiCoachUrl: set this once BeCurrent has its own MagicSchool bot. Leaving it
  // unset omits the coach section from every brief in this unit.
  aiCoachUrl: '',
  canvasSubmissionNote: 'Organize your thinking here, then submit your final work in Canvas.',
  topics: 6,
  overview: 'We are going to figure out how social media actually works. The machine. The '
    + 'business. Not whether it is good or bad for you, and nobody is going to ask you to delete '
    + 'anything. By the end you should be able to explain how the thing works, out loud, to an '
    + 'adult, which is more than most adults can do.',
  // Announced on day one and returned to at the end, exactly as the Topic 1 script
  // does it. Putting it on the unit page is the point: students should be chewing
  // on it for two weeks before they have to answer it.
  terminalQuestion: 'Who should get to decide what a platform is allowed to do to your '
    + 'attention: you, the company, or the government?',
  competencies: {
    1: 'Cause and effect',
    2: 'Fallacies and propaganda',
    3: 'Synthesizing patterns',
    4: 'Hypotheses',
    5: 'Generalizing from evidence'
  }
};

// ── Topic 1 ───────────────────────────────────────────────────────────────────
// Taught from the slide deck with a paper trace. No Brief, and no site artifact at
// all: the reasoning lives in boxes and arrows on paper, which is deliberate. Per
// the teaching script, "devices turn a trace into copy-paste from a search result."
const TOPIC_1 = {
  n: 1,
  topic: 'Topic 1',
  title: 'Where the Money Comes From',
  subtitle: 'Follow the money backwards, one step at a time',
  inClass: 'You list the apps you opened today that did not charge you, then build a chain of '
    + 'boxes and arrows from opening an app to a company getting paid. Paper, not devices. '
    + 'Nobody presents; you walk the room and read four other chains instead.',
  onPaper: true,

  overview: 'Every app you opened today was free, and not one of those companies is a charity. '
    + 'Today you build the chain backwards: from you opening an app to somebody getting paid, one '
    + 'box and one arrow at a time. You will do it on paper, because a device turns a trace into '
    + 'copy-paste from a search result. Then you walk the room and read four other chains, which '
    + 'is where you find out what you left out.',

  learningTargets: [
    { skill: 'Cause and Effect',
      target: 'I can trace the chain that connects me opening a free app to a company getting paid.' },
    { skill: 'Cause and Effect',
      target: 'I can explain what a company gets from me when I pay it no money at all.' },
    { skill: 'Generalizing from Evidence',
      target: 'I can compare my chain with other people\'s and say where they agree and where they do not.' }
  ],

  successCriteria: [
    { skill: 'Cause and Effect',
      criteria: 'I can draw a chain with at least four boxes in it and no gap I cannot explain out loud.' },
    { skill: 'Cause and Effect',
      criteria: 'I can name the thing being sold, who is buying it, and who is being sold.' },
    { skill: 'Generalizing from Evidence',
      criteria: 'I can name one box I got wrong or left out after reading four other chains, and say which chain changed my mind.' }
  ],

  studyGuide: {
    namesAndCases: [
      { name: 'The chain',
        what: 'You open a free app, the app holds your attention, an advertiser pays to be put '
          + 'in front of it. Four boxes minimum, and no gap you cannot explain out loud.' },
      { name: 'Who is the customer',
        what: 'The advertiser, because the advertiser is the one who hands over money. Not you. '
          + 'You are what is being sold access to.' }
    ]
  },

  competencies: [1, 5]
};

// ── Topic 2 ───────────────────────────────────────────────────────────────────
// The film is deliberately NOT NAMED here, and this is load-bearing rather than an
// oversight. From the Topic 1 teaching script: "the second they know the title, half
// the room looks it up, reads that it's a documentary about social media being bad,
// and walks into Topic 2 already knowing what they're supposed to conclude. The
// withholding is what keeps Topic 2 from becoming another warning."
//
// A unit page that listed the title would undo that on day one. Add the name here
// only after the unit has run, if at all.
const TOPIC_2 = {
  n: 2,
  topic: 'Topic 2',
  title: 'Somebody Made a Film About This',
  subtitle: 'Your job is not to agree with it',
  inClass: 'We watch it. Your job is to do to the film exactly what you did to your app in '
    + 'Topic 1: take it apart, find out how it works, see where the money is.',
  onPaper: true,

  overview: 'Somebody made a film about the thing you traced last class. We are going to watch it. '
    + 'Your job is not to agree with it, and it is not to disagree with it either. Your job is to do '
    + 'to the film exactly what you did to your app: take it apart, find out how it works, and see '
    + 'where the money is. Every film was made by somebody, for a reason, with money from somewhere.',

  learningTargets: [
    { skill: 'Sourcing',
      target: 'I can identify who made this film, who speaks in it, and what each of them has to gain.' },
    { skill: 'Fallacies and Propaganda',
      target: 'I can name a persuasion technique the film uses and explain how it works on a viewer.' },
    { skill: 'Cause and Effect',
      target: 'I can separate what the film proves from what it only suggests.' }
  ],

  successCriteria: [
    { skill: 'Sourcing',
      criteria: 'I can say who made the film and point to one thing in it that tells me what it wants me to believe.' },
    { skill: 'Fallacies and Propaganda',
      criteria: 'I can point at one specific scene and name the technique it uses on me.' },
    { skill: 'Cause and Effect',
      criteria: 'I can state one claim the film makes that I would want to check, and say what evidence would settle it.' }
  ],

  competencies: [2],

  studyGuide: {
    namesAndCases: [
      { name: 'Who made it, and what do they gain',
        what: 'The first question about any film, and the same question you ask of a post. A '
          + 'documentary is a genre, not a standard of proof.' },
      { name: 'Proves against suggests',
        what: 'A dramatized scene performed by actors illustrates a claim. It does not '
          + 'establish it. Separating those two is the whole job.' }
    ]
  },

  // Names that must not appear on any student-facing page in this unit until the
  // topic has been taught. validate.js fails the build if one does. Remove the entry
  // once the film has been shown and naming it no longer costs anything.
  withholdTitles: ['The Social Dilemma']
};

// ── Topic 3 ───────────────────────────────────────────────────────────────────
const TOPIC_3 = {
  n: 3,
  key: 'sm-t3',
  slug: 'the-algorithm',
  topic: 'Topic 3',
  title: 'Inside the <em>Algorithm</em> Box',
  eyebrow: 'Social Media · Topic 3',
  deck: 'Almost every chain in the room had a box where the app watches what you do. Today you open it.',
  subtitle: 'What the app counts, and what it does with the count',
  skillTags: ['Cause and Effect', 'Hypotheses'],
  inClass: 'We open the box almost every chain had in the middle. Read the Brief, then predict '
    + 'what the app counts about you before we check.',

  overview: 'Almost every chain in the room had a box in the middle where the app watches what you '
    + 'do. Nobody wrote what was inside it, because none of us knew. Today you open it. You will '
    + 'find out what an app counts about you when you are not posting, what it does with the count, '
    + 'and why two people who open the same app at the same second see different things.',

  learningTargets: [
    { skill: 'Cause and Effect',
      target: 'I can name what an app counts about me when I have not posted, liked, or commented on anything.' },
    { skill: 'Cause and Effect',
      target: 'I can explain the feedback loop that makes an app better at holding my attention the longer I use it.' },
    { skill: 'Hypotheses',
      target: 'I can explain that a ranking system pushes on a number a person chose, and predict what that choice costs.' }
  ],

  successCriteria: [
    { skill: 'Cause and Effect',
      criteria: 'I can list three engagement signals an app collects without me sending it anything.' },
    { skill: 'Cause and Effect',
      criteria: 'I can explain, out loud, why two people who open the same app at the same second see different things.' },
    { skill: 'Hypotheses',
      criteria: 'I can name a number an app could optimize for, and say what would go wrong with that choice.' }
  ],

  competencies: [1, 4],

  // Video. Optional, and often the primary path rather than the alternative one.
  //
  //   videos: [
  //     { title:    'CNN10 for October 14',
  //       url:      'https://...',          // required, a real link you supply
  //       prompt:   'Watch for who is quoted and who is not.',
  //       source:   'CNN10',                 // optional, shown as a label
  //       duration: '10:00',                 // optional
  //       captions: true }                   // set false only if genuinely absent
  //   ]
  //
  // Empty means the topic renders no video section at all, not an empty one.
  videos: [],

  support: [
    { label: 'Before You Read',
      body: 'In Topic 1 you built a chain. Almost everybody had a box in the middle where the app '
        + 'watches what you do. Nobody wrote what was <em>inside</em> that box, because none of us knew. '
        + 'That box is today.' },
    { label: 'Reading Target',
      body: 'By the end you should be able to explain, out loud, why two people who open the same app '
        + 'at the same second see different things.' }
  ],

  terms: ['ranking', 'engagement signal', 'feedback loop', 'optimize', 'A/B test', 'chronological'],

  sections: [
    {
      label: 'Part One',
      heading: 'The app is counting, and you are not posting',
      paragraphs: [
        'An <span class="kt">engagement signal</span> is anything you do that the app can count. Some of '
        + 'them are obvious. A like is a signal. A comment is a signal. A share is a bigger one.',
        'The quiet ones matter more. How long you watched before you scrolled away. Whether you watched '
        + 'it twice. Whether you turned the sound on. Whether you stopped, went back up, and watched it '
        + 'again. How fast you scrolled past the thing before it. Whether you screenshotted it.',
        'Notice what all of those have in common. You did not choose to send any of them. You did not '
        + 'post anything. You just used the app normally, and the app counted.',
        'This is the part that surprises people. You do not have to give an app information for it to '
        + 'learn about you. Watching is information.'
      ],
      callouts: [
        { label: 'Try This',
          body: 'Open an app and scroll for thirty seconds. Do not like anything. Do not comment. '
            + 'Now list every single thing the app could have counted about those thirty seconds. '
            + 'Most people get four or five. There are more.' }
      ]
    },
    {
      label: 'Part Two',
      heading: 'Ranking is a choice, and it used to be different',
      paragraphs: [
        '<span class="kt">Ranking</span> means putting things in an order that somebody chose. A '
        + '<span class="kt">chronological</span> feed is the other option: newest first, oldest last, '
        + 'no decisions. Just time.',
        'Feeds used to be chronological. Facebook launched its News Feed in 2006 and it was mostly in '
        + 'time order. Twitter was in time order for years. Instagram was in time order until 2016.',
        'Then they changed. Not because the technology suddenly appeared, but because ranked feeds kept '
        + 'people in the app longer. When Instagram switched in 2016, the company said people were '
        + 'missing about 70 percent of what was in their feed. That is a real problem. Ranking is a real '
        + 'solution to it. It also happens to be the solution that makes more money.',
        'The important word is <strong>chose</strong>. A ranked feed is not what a phone does naturally. '
        + 'It is a decision a company made, and other decisions were available.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'This is causation. Two things happened at once: ranking solved a problem for users, and '
            + 'ranking made more money. When two causes point the same direction, it is hard to tell which '
            + 'one was doing the work. Anyone who investigates anything runs into this constantly.' }
      ]
    },
    {
      label: 'Part Three',
      heading: 'It is not reading your mind. It is reading the room.',
      paragraphs: [
        'Students usually assume the app knows <em>them</em>. Mostly it does not. It knows people who '
        + 'behave like them.',
        'Here is the actual move. The app finds thousands of other users whose signals look like yours. '
        + 'Then it shows you the thing those people stopped on. It is not a guess about your personality. '
        + 'It is a bet based on a crowd.',
        'That is why the feed can feel eerie without anything spooky happening. You got an ad for a water '
        + 'bottle because ten thousand people who scroll like you bought that water bottle. Nobody read '
        + 'your thoughts. Somebody sorted you into a group.'
      ],
      callouts: [
        { label: 'Watch For',
          body: 'People say "the app is listening to me." Almost always, the boring explanation is enough: '
            + 'you searched something, or your behavior matched a group that did. Before you reach for the '
            + 'microphone, ask whether the crowd explains it.' }
      ]
    },
    {
      label: 'Part Four',
      heading: 'The loop, and the number nobody voted on',
      paragraphs: [
        'A <span class="kt">feedback loop</span> is when the result of something becomes the cause of the '
        + 'next thing. This one runs fast. The app shows you something. You stop on it. That stop is a new '
        + 'signal. The next thing it shows you is better aimed. You stop again.',
        'So the app gets better at holding you the longer you use it. Not because it got smarter overnight, '
        + 'but because you kept feeding it.',
        'To <span class="kt">optimize</span> means to push a number as high as it will go. Every ranking '
        + 'system optimizes for something, and a person picked what. Time in the app. Videos finished. '
        + 'Days in a row you come back.',
        'Companies find out which choice wins by running an <span class="kt">A/B test</span>: show version '
        + 'A to some users and version B to others, then keep whichever one performed better. You have been '
        + 'in these tests. You were not told.',
        'Here is the thing worth carrying out of today. The algorithm is not trying to make you happy, and '
        + 'it is not trying to make you miserable. It is trying to move a number that somebody chose. '
        + 'Whether that number is good for you was never part of the math.'
      ],
      callouts: [
        { label: 'The Standard',
          body: 'A complete answer in this class explains the <em>mechanism</em>, not just the outcome. '
            + '"The app knows what I like" is an outcome. "The app counted how long I watched, found people '
            + 'with similar counts, and showed me what held them" is a mechanism.' }
      ]
    }
  ],

  roadNotTaken: {
    label: 'The Road Not Taken',
    heading: 'Ranked feeds were not inevitable, and some of them came back',
    paragraphs: [
      'It would be easy to read Part Two as a one-way street: feeds were chronological, then they were '
      + 'ranked, the end. That is not what happened.',
      'In 2018 Twitter added a switch to go back to time order, and it is still there. Instagram added '
      + 'Following and Favorites feeds in 2022, both chronological. Some apps launched with no ranking at '
      + 'all as their selling point.',
      'So the question is not "why did ranking win." Ranking did not fully win. The better question is '
      + 'why the ranked version is the one you get by default, and why almost nobody switches.'
    ]
  },

  takeaway: 'The app counts what you do, sorts you in with people who behave like you, and shows you what '
    + 'held them. Then your reaction becomes the next count. Somebody chose which number that loop is '
    + 'pushing on.',

  studyGuide: {
    namesAndCases: [
      { name: 'Facebook News Feed, 2006',
        what: 'Launched mostly in time order. Feeds were not born ranked.' },
      { name: 'Instagram switches to ranking, 2016',
        what: 'The company said people were missing about 70 percent of their feed. A real '
          + 'problem, and ranking is a real solution to it. It also made more money, and when '
          + 'two causes point the same way it is hard to say which did the work.' },
      { name: 'Twitter adds the time-order switch back, 2018',
        what: 'Still there. Ranking did not fully win, which is why the question is why the '
          + 'ranked version is the default rather than why ranking won.' },
      { name: 'Instagram Following and Favorites, 2022',
        what: 'Both chronological. Same point: the choice is still being made.' }
    ]
  },

  questions: [
    { skill: 'Cause and Effect',
      text: 'Name three things an app can count about you when you have not posted, liked, or commented '
        + 'on anything.',
      startHere: 'Three things is the whole answer. A list is fine.',
      pushFurther: 'For each one, say what the app could figure out from it.' },
    { skill: 'Cause and Effect',
      text: 'Explain the feedback loop in your own words. Why does the app get better at holding your '
        + 'attention the longer you use it?',
      startHere: 'Two or three sentences. Use the words "signal" and "shows me."',
      pushFurther: 'Say what would happen to the loop if you scrolled completely randomly for a week.' },
    { skill: 'Hypotheses',
      text: 'Every ranking system pushes on a number that a person chose. If you ran the app, what number '
        + 'would you pick, and what would go wrong with your choice?',
      startHere: 'Pick a number and name one problem with it.',
      pushFurther: 'Name a number that would be good for users and bad for the company, and explain the conflict.' }
  ]
};

// ── Topic 4 ───────────────────────────────────────────────────────────────────
//
// Two halves in one topic, and the order is deliberate. The effects half comes
// first because it is the one students expect to be a lecture about their screen
// time, and the fastest way to lose the room is to open there. So it opens on the
// positives, and the actual work of the half is not "is it bad", it is reading a
// disagreement between researchers, which is a skill and not a verdict.
//
// The footprint half is the opposite kind of question and is labelled as such on
// the page. Whether social media harms teenagers is contested. What a record
// contains is not.
//
// The research named here is real, dated and checkable on purpose. A topic that
// tells students to verify claims and then hands them unsourced assertions is
// teaching the opposite of what it says.
const TOPIC_4 = {
  n: 4,
  key: 'sm-t4',
  slug: 'effects-and-footprint',
  topic: 'Topic 4',
  title: 'The Impact and the Digital <em>Footprint</em>',
  eyebrow: 'Social Media · Topic 4',
  deck: 'Two questions today. What the app does to how you feel, and what it keeps after you close it.',
  subtitle: 'Evidence about effects, and a record that does not delete',
  skillTags: ['Corroboration', 'Cause and Effect'],
  inClass: 'We sort the good effects and the bad ones, then test one claim against the actual '
    + 'research. Second half you find out what your own record already contains.',

  overview: 'Two questions today, and they are different kinds of question. First: what does social '
    + 'media do to how you feel? That one has real research behind it, the research disagrees with '
    + 'itself, and your job is to learn to read a disagreement rather than pick a side. Second: what '
    + 'does the app keep after you close it? That one is not a debate. It is a record, it is longer '
    + 'than what you posted, and people who make decisions about your future can read part of it.',

  learningTargets: [
    { skill: 'Cause and Effect',
      target: 'I can name a positive and a negative effect of social media, and say what would have to be true for either one to be a cause rather than a coincidence.' },
    { skill: 'Corroboration',
      target: 'I can explain why two honest researchers looking at the same teenagers reach opposite conclusions about harm.' },
    { skill: 'Generalizing from Evidence',
      target: 'I can describe what my digital footprint contains, and name one decision somebody could make about me from it.' }
  ],

  successCriteria: [
    { skill: 'Cause and Effect',
      criteria: 'I can state a claim about social media and mental health, and say whether the evidence behind it shows a cause or only a pattern.' },
    { skill: 'Corroboration',
      criteria: 'I can name two things I would want to know about a study before I believed its headline.' },
    { skill: 'Generalizing from Evidence',
      criteria: 'I can name three places a piece of my footprint sits that I cannot delete myself.' }
  ],

  competencies: [1, 5],

  // Video. Optional, and often the primary path rather than the alternative one.
  //
  //   videos: [
  //     { title:    'CNN10 for October 14',
  //       url:      'https://...',          // required, a real link you supply
  //       prompt:   'Watch for who is quoted and who is not.',
  //       source:   'CNN10',                 // optional, shown as a label
  //       duration: '10:00',                 // optional
  //       captions: true }                   // set false only if genuinely absent
  //   ]
  //
  // Empty means the topic renders no video section at all, not an empty one.
  videos: [],

  // Anything a student can open for this topic that is not the Brief and not a
  // clip. The slides are here so a student who was out, or who wants the Orben
  // and Haidt slide again, can get to them without asking.
  //
  // SHARED ON 2026-08-18, and it had to be: a published Artifact is PRIVATE
  // until it is shared from the page's share menu. Unshared, this link opens
  // fine from the teacher's own account and shows a sign-in wall to every
  // student, which is the same shape as the hand-typed Canvas assignment link
  // this repo already refuses: invisible from exactly the account that would
  // check it. Its state now reads "shared with anyone with the link", so no
  // account is needed to open it.
  //
  // THE SHARE IS PINNED TO A VERSION, and that is the part that will bite next.
  // Viewers see the version that was current when it was shared, and they keep
  // seeing it after a republish until the share pin is moved. So editing the
  // slides is two steps, not one: publish, then move the pin. Skipping the
  // second step leaves the room reading last week's deck while the teacher's
  // own tab shows the new one, with nothing on either screen saying so.
  resources: [
    { label: 'Slides from class',
      url:   'https://claude.ai/code/artifact/185dd6fe-d78f-4bc6-969d-d0456b5d5c46' }
  ],

  support: [
    { label: 'Before You Read',
      body: 'Topic 3 was the machine: what the app counts, and what it does with the count. Today is '
        + 'the two things that machine touches. How you feel, and what it keeps.' },
    { label: 'Reading Target',
      body: 'By the end you should be able to explain why two honest researchers disagree about whether '
        + 'social media harms teenagers, and name three parts of your record you cannot delete.' }
  ],

  terms: ['correlation', 'causation', 'effect size', 'social comparison', 'digital footprint',
    'data broker', 'two-factor authentication'],

  sections: [
    {
      label: 'Part One',
      heading: 'The good half, and it is not a consolation prize',
      paragraphs: [
        'Start with what works, because a list of harms with nothing on the other side is not a '
        + 'description of anything real. Most people in this room use these apps and are fine.',
        '<strong>Connection and support.</strong> If you have an experience nobody within walking '
        + 'distance shares, these apps are how you find people who do. A rare diagnosis. A family that '
        + 'just moved. A thing you are the only person at this school who does. The mechanism is not '
        + 'complicated: the group you can reach is no longer limited to who lives near you, and a group '
        + 'that shares your situation cuts the feeling of being the only one.',
        '<strong>Awareness and advocacy.</strong> Mental health is talked about more openly than it was '
        + 'twenty years ago, and social media is part of why. To destigmatize something means to make it '
        + 'less shameful to say out loud. That has a measurable payoff: people ask for help earlier when '
        + 'the thing they need help with has a name they have heard other people use.',
        '<strong>Access to information.</strong> You can find out what a condition is, or what a '
        + 'treatment does, at eleven at night, without having to ask an adult first. For some questions '
        + 'that is the difference between finding out and not.',
        '<strong>Expression and creativity.</strong> Making something and showing it to people. For a lot '
        + 'of people that is the coping mechanism itself, not a distraction from having one.',
        '<strong>Community building.</strong> Shared interest, hobby, goal. The kid who builds keyboards '
        + 'has eleven friends who build keyboards, and none of them go to this school.'
      ],
      callouts: [
        { label: 'Watch For',
          body: 'A source that lists only benefits is selling. A source that lists only harms is warning. '
            + 'Neither one is reporting. When you notice a page has only one column, that is information '
            + 'about the page.' }
      ]
    },
    {
      label: 'Part Two',
      heading: 'The bad half, named precisely',
      paragraphs: [
        '<strong>Cyberbullying.</strong> Harassment, threats, pile-ons. It is associated with higher '
        + 'anxiety and depression, and at the far end with suicidal thoughts. Hold on to the word '
        + '<em>associated</em>, because Part Three is about that word. Three things make it different '
        + 'from bullying in a hallway: it does not stop when the bell rings, the audience can be '
        + 'thousands instead of six, and there is a written record the target can read again and again.',
        '<strong>Social comparison.</strong> What you see is curated, which means chosen, which means '
        + 'everything not chosen is not there. So you compare your ordinary Tuesday against somebody '
        + 'else\'s best fourteen seconds of a month. Do that enough and it produces feelings of '
        + 'inadequacy and a lower sense of your own worth. <span class="kt">Social comparison</span> is '
        + 'the name for measuring yourself against other people, and it is normal. What is new is the '
        + 'sample size and the editing.',
        '<strong>Fear of missing out.</strong> Your feed shows events, so it shows you the parts of other '
        + 'people\'s weeks that photograph well. You now know from Topic 3 that a ranked feed shows you '
        + 'what held other people\'s attention, which means it is socially denser than any real week is. '
        + 'The comparison is not just curated, it is assembled from hundreds of lives at once.',
        '<strong>Compulsive use and distraction.</strong> Checking again, and again, without deciding to. '
        + 'Whether "addiction" is the right word for this is genuinely argued among clinicians, and you '
        + 'should know that before you use it. What is argued about much less is sleep. The phone competes '
        + 'directly with sleep, and short sleep on its own raises anxiety and lowers school performance. '
        + 'If you want the effect with the least disagreement around it, it is that one.',
        '<strong>Privacy.</strong> Data breaches, and personal information shared without permission. '
        + 'There is a second-order cost that is easy to miss: people who are worried about privacy post '
        + 'less and join less, which costs them exactly the connection Part One is about.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'Notice how much more useful the precise version is. "Social media is bad for mental '
            + 'health" cannot be tested, so it cannot be checked, so it cannot be argued about properly. '
            + '"Comparing yourself against curated images lowers self-esteem" can be tested. A claim you '
            + 'can test is worth more than a claim that sounds serious.' }
      ]
    },
    {
      label: 'Part Three',
      heading: 'Why two honest researchers disagree about the same teenagers',
      paragraphs: [
        'Here is the finding almost every study starts from: teenagers who use these apps a lot report '
        + 'more anxiety and depression than teenagers who use them a little. That is a real pattern. Now '
        + 'notice that three completely different explanations fit it.',
        'One, the apps make people anxious. Two, anxious people use the apps more, because that is what '
        + 'you do at one in the morning when you cannot sleep. Three, some third thing, a hard year at '
        + 'home, no friends nearby, bad sleep, causes both. <span class="kt">Correlation</span> means two '
        + 'things move together. <span class="kt">Causation</span> means one makes the other happen. The '
        + 'pattern above is correlation, and correlation is consistent with all three stories.',
        'The second idea you need is <span class="kt">effect size</span>: not whether an effect exists, '
        + 'but how big it is. In 2019 Amy Orben and Andrew Przybylski published a study in <em>Nature '
        + 'Human Behaviour</em> that ran the numbers across large datasets and found the association '
        + 'between screen use and teenage wellbeing was tiny, about the same size as associations nobody '
        + 'worries about, like eating potatoes or wearing glasses. That is a real published finding, and '
        + 'it is not a joke about potatoes. It is a claim that the effect is too small to explain what '
        + 'people say it explains.',
        'Now the other side, argued just as seriously. Jonathan Haidt points at timing: rates of anxiety '
        + 'and depression among teenagers rose sharply starting around 2012, which is when smartphones '
        + 'and social media became close to universal among them. He made that case at book length in '
        + '<em>The Anxious Generation</em> in 2024. Candice Odgers reviewed the book in <em>Nature</em> '
        + 'the same year and argued the evidence does not support a causal claim that strong, and that '
        + 'blaming phones may pull attention away from causes that are better established.',
        'One more piece, and it is a different kind of evidence. In September 2021 the <em>Wall Street '
        + 'Journal</em> published internal Facebook research leaked by a former employee, Frances '
        + 'Haugen, in which the company\'s own researchers found Instagram made body image worse for '
        + 'some teenage girls. Read what that is carefully. It is strong because it is not from a critic, '
        + 'it is the company studying itself. It is narrow because it is about a subset of users, not '
        + 'everybody.',
        'So where does that leave you? The defensible position is that effects are real, they land very '
        + 'unevenly across different people, and on average they are smaller than the loudest headlines '
        + 'claim. <strong>Unevenly</strong> is the word doing the work. An average close to zero can hide '
        + 'a group being hurt a lot, and an average is what most studies report.'
      ],
      callouts: [
        { label: 'The Standard',
          body: 'A complete answer in this class names the <em>mechanism</em> and the <em>size</em>. "It '
            + 'causes depression" has neither. "Comparing against curated images lowers self-esteem, and '
            + 'the average effect is small but much larger for some people" has both.' }
      ]
    },
    {
      label: 'Part Four',
      heading: 'The record, which is not a debate',
      paragraphs: [
        'Your <span class="kt">digital footprint</span> is the trail of data your activity leaves behind. '
        + 'Everything you post is in it. So is a great deal you did not post: what you searched, what you '
        + 'watched and for how long, where your phone was, what you bought, who you messaged.',
        'Treat it as permanent. Not because deleting is impossible, but because you cannot verify that it '
        + 'worked. Delete removes your copy. It does not reach the screenshot somebody took, the repost, '
        + 'the archive that crawled the page, the company\'s own backups, or the other thirty phones in a '
        + 'group chat. You control the original and nothing else.',
        'Who reads it. Employers routinely look at candidates\' public profiles during hiring, and so do '
        + 'colleges. Law enforcement can request records through legal process. And then there are '
        + '<span class="kt">data broker</span> companies, whose whole business is buying records about '
        + 'people from many sources, combining them into one profile, and selling it. You never opened an '
        + 'account with them and they have a file on you anyway.',
        'A real case, so this is not hypothetical. In June 2017 Harvard withdrew admission offers from at '
        + 'least ten incoming students over messages they had posted in a private Facebook group chat. '
        + 'Private group. Real consequence. Nobody hacked anything.',
        'There are legal edges too, and they are not obvious. Defamation is a false statement of fact that '
        + 'damages someone\'s reputation. Harassment can be a crime. Copyright infringement covers using '
        + 'somebody else\'s music, art, or footage without permission, which is worth knowing because '
        + 'reposting is publishing, legally speaking.',
        'The same record cuts the other way, and almost nobody plans for this. Three years of you making '
        + 'things, finishing things, and helping people is an asset when somebody is deciding about you. '
        + 'The footprint is not only a liability to be minimized. It is a record, and records can be '
        + 'built on purpose.'
      ],
      callouts: [
        { label: 'Try This',
          body: 'Search your own name in a browser you are not logged into, then check the images tab. '
            + 'Most people find one of two things: nothing at all, which is itself worth knowing, or '
            + 'something they had completely forgotten was public.' }
      ]
    },
    {
      label: 'Part Five',
      heading: 'What actually protects it, and what does not',
      paragraphs: [
        'Four things are worth your time, and they work for reasons worth understanding rather than as '
        + 'rules to obey.',
        '<strong>A different password everywhere.</strong> The mechanism is breaches. When one site gets '
        + 'broken into, the attackers take the email and password pairs and try them everywhere else, '
        + 'automatically. Reusing a password is what turns one company\'s failure into your entire '
        + 'account list. A password manager, or a long phrase you only use once, both solve it.',
        '<strong><span class="kt">Two-factor authentication</span>.</strong> Something you know plus '
        + 'something you have, usually a code on your phone. This is the highest-value ten minutes in '
        + 'this whole topic, because it makes a stolen password insufficient on its own.',
        '<strong>Recognizing phishing.</strong> A phishing message impersonates someone you trust to get '
        + 'you to hand over a login. The tell is almost always urgency plus a link: your account will be '
        + 'closed, your package is held, click here now. The counter is to not use the link. Go to the '
        + 'site yourself and see whether the thing is true.',
        '<strong>Recognizing a scam.</strong> Free thing in exchange for a login. A message from a '
        + 'friend\'s account that does not sound like them, because it is not them. An offer that is '
        + 'aimed at you specifically and expires immediately.',
        'Now the honest limit, and it matters more than the four items above. None of that touches what '
        + 'the companies themselves collect. That is not a security failure, it is the business model you '
        + 'traced in Topic 1 working exactly as designed. Strong passwords protect you from thieves. They '
        + 'do not protect you from the arrangement you agreed to.'
      ],
      callouts: [
        { label: 'Watch For',
          body: '"Just be careful what you post" is advice about the part of your footprint you control, '
            + 'which is the small part. The larger part is what gets collected, combined and sold while '
            + 'you post nothing at all. Advice that only covers the small part sounds responsible and '
            + 'leaves the bigger thing unaddressed.' }
      ]
    }
  ],

  roadNotTaken: {
    label: 'The Road Not Taken',
    heading: 'Permanent is a policy choice, and the policy is still moving',
    paragraphs: [
      'Part Four told you to treat the record as permanent, and for practical purposes you should. But '
      + 'permanent is not a law of physics. It is a choice about what companies are required to do, and '
      + 'different places have chosen differently.',
      'In May 2014 the European Court of Justice ruled that people can require search engines to remove '
      + 'certain results about them from searches for their name. It is usually called the right to be '
      + 'forgotten. It is limited, it is argued about, and it exists. The United States has no general '
      + 'equivalent. What it has instead is a growing patchwork of state laws: California\'s privacy law '
      + 'took effect in 2020 and gives residents a right to ask companies to delete data about them, and '
      + 'a long list of states have passed their own versions since, including Indiana, whose law took '
      + 'effect in January 2026. Several states have also passed laws specifically about minors and '
      + 'social media since 2023, and courts have blocked some of them.',
      'So the arrangement you live under is not the only one available, and it is not finished. Which is '
      + 'exactly the argument in Topic 6.'
    ]
  },

  takeaway: 'The good effects and the bad effects are both real, they land unevenly, and how big an '
    + 'effect is matters as much as whether it exists. The record is a different kind of question: it is '
    + 'longer than what you posted, parts of it are not yours to delete, and people who decide things '
    + 'about you can read some of it.',

  studyGuide: {
    namesAndCases: [
      { name: 'Orben and Przybylski, 2019, Nature Human Behaviour',
        what: 'Ran the numbers across large datasets and found the association between screen '
          + 'use and teenage wellbeing was tiny, about the size of associations nobody worries '
          + 'about. A claim about effect size, not about whether an effect exists.' },
      { name: 'Haidt, The Anxious Generation, 2024',
        what: 'Argues from timing: teenage anxiety and depression rose sharply around 2012, when '
          + 'smartphones and social media became close to universal.' },
      { name: 'Odgers reviews it in Nature, 2024',
        what: 'Argues the evidence does not support a causal claim that strong, and that blaming '
          + 'phones pulls attention off causes that are better established. Two serious people, '
          + 'opposite conclusions, neither one lying.' },
      { name: 'Haugen and the Wall Street Journal, September 2021',
        what: 'Internal Facebook research, leaked by a former employee, in which the company\'s '
          + 'own researchers found Instagram made body image worse for some teenage girls. '
          + 'Strong because it is the company studying itself. Narrow because it is about a '
          + 'subset of users.' },
      { name: 'Harvard withdraws offers, June 2017',
        what: 'At least ten incoming students, over messages posted in a private group chat. '
          + 'Private group, real consequence, nobody hacked anything.' },
      { name: 'The right to be forgotten, May 2014',
        what: 'The European Court of Justice ruled people can require search engines to remove '
          + 'certain results about them. Permanent is a policy choice, not a law of physics.' }
    ]
  },

  questions: [
    { skill: 'Cause and Effect',
      text: 'Pick one negative effect from Part Two. Name the mechanism: step by step, what connects '
        + 'using the app to feeling worse?',
      startHere: 'Two or three sentences. Name the effect, then how it works.',
      pushFurther: 'Then give one reason a researcher might not be able to prove your mechanism is the cause.' },
    { skill: 'Corroboration',
      text: 'Two researchers study the same teenagers and reach opposite conclusions. Give two reasons '
        + 'that can happen without either of them lying.',
      startHere: 'Two reasons, one sentence each.',
      pushFurther: 'Say which study in Part Three you find more convincing, and what would change your mind.' },
    { skill: 'Generalizing from Evidence',
      text: 'Name three pieces of your digital footprint that sit somewhere you cannot delete. For one of '
        + 'them, say what somebody could decide about you from it.',
      startHere: 'Three places, then one decision.',
      pushFurther: 'Name one thing in your footprint that would help you, and say who would have to see it.' }
  ]
};

// ── Topic 5 ───────────────────────────────────────────────────────────────────
//
// The trap in this topic is that every student arrives believing they are already
// good at it, so a lesson built as a list of warning signs gets filed under things
// they knew. It is built the other way round: the subject is not the fake content,
// it is the transmission. What carries a false story is novelty and emotion, and
// the best evidence available says people rather than bots do most of the carrying,
// which puts the student inside the mechanism instead of outside watching it.
//
// The elections half is the source material's nine bullets regrouped into
// mechanisms, because nine parallel "issue and impact" pairs is a list to be
// scanned rather than a thing to be understood, and three of the nine are the same
// machine from Topic 1 pointed at voters.
const TOPIC_5 = {
  n: 5,
  key: 'sm-t5',
  slug: 'fake-news',
  topic: 'Topic 5',
  title: 'How a <em>Lie</em> Travels',
  eyebrow: 'Social Media · Topic 5',
  deck: 'False stories often spread faster than the corrections that follow them. This reading '
    + 'explains why that happens, and what to do about it.',
  subtitle: 'Fake news, the tactics that carry it, and elections',
  skillTags: ['Sourcing', 'Corroboration'],
  inClass: 'We take one real hoax apart, name the four tactics that carry false information, and then '
    + 'practice the checking, which takes about two minutes.',

  overview: 'Most people believe they are already good at spotting false information. Today you will '
    + 'find out that spotting it is mostly not about the false information itself. It is about what '
    + 'carries it: strong emotion, headlines built to be clicked, accounts that are not people, and a '
    + 'ranking system that rewards whatever gets a reaction. You will then learn how to check a claim, '
    + 'which takes about two minutes, and read what the research says about who does the spreading. '
    + 'That last answer is not the one most people expect.',

  learningTargets: [
    { skill: 'Fallacies and Propaganda',
      target: 'I can name four tactics that spread false information, and explain what each one does to the reader.' },
    { skill: 'Sourcing',
      target: 'I can check an unfamiliar claim in about two minutes, and say exactly what I checked.' },
    { skill: 'Generalizing from Evidence',
      target: 'I can explain one specific way that false information affects an election, beyond people believing something untrue.' }
  ],

  successCriteria: [
    { skill: 'Fallacies and Propaganda',
      criteria: 'I can name the emotion a post is aiming for, and explain why that emotion helps it spread.' },
    { skill: 'Sourcing',
      criteria: 'I can trace a claim back to its earliest source, or say honestly that I looked and could not find one.' },
    { skill: 'Corroboration',
      criteria: 'I can explain the difference between a claim that is false and a claim that is true but framed to mislead.' }
  ],

  competencies: [2, 5],

  // Video. Optional, and often the primary path rather than the alternative one.
  //
  //   videos: [
  //     { title:    'CNN10 for October 14',
  //       url:      'https://...',          // required, a real link you supply
  //       prompt:   'Watch for who is quoted and who is not.',
  //       source:   'CNN10',                 // optional, shown as a label
  //       duration: '10:00',                 // optional
  //       captions: true }                   // set false only if genuinely absent
  //   ]
  //
  // Empty means the topic renders no video section at all, not an empty one.
  videos: [],

  support: [
    { label: 'Before You Read',
      body: 'You already know how the machine works. In Topic 1 you traced how an app makes money when '
        + 'people keep looking at it. In Topic 3 you opened the ranking system and saw that the feed is '
        + 'built to produce reaction. This reading is about which posts produce the most reaction, and '
        + 'about people who build posts for that on purpose.' },
    { label: 'Reading Target',
      body: 'By the end you should be able to check a claim you are unsure about in about two minutes, '
        + 'and explain out loud what you checked. Saying "I did not believe it" is not an explanation.' }
  ],

  terms: ['misinformation', 'disinformation', 'clickbait', 'deepfake', 'bot', 'lateral reading',
    'echo chamber', 'microtargeting'],

  sections: [
    {
      label: 'Part One',
      heading: 'Two words for false information',
      paragraphs: [
        'There are two words for false information, and the difference between them is the sender. '
        + '<span class="kt">Misinformation</span> is false information shared by someone who believes it '
        + 'is true. <span class="kt">Disinformation</span> is false information shared by someone who '
        + 'knows it is false. The post on the screen can look exactly the same in both cases. What '
        + 'differs is what the sender knows.',
        'That difference should change your response. You can correct a person who made a mistake, '
        + 'because they did not want to be wrong. You cannot correct a campaign that was built to '
        + 'mislead, because being wrong was the plan.',
        'False information usually arrives in one of three forms. The first is an <strong>invented '
        + 'story</strong> about an event that never happened. The second is a <strong>fake '
        + 'image</strong>, which means a photo or video that was edited, or created by software. The '
        + 'third is a <strong>misleading headline</strong>, and it is the most common of the three. In '
        + 'that case every fact in the article can be true while the headline still leaves the reader '
        + 'believing something false. That last form is called framing, and it is far more common than '
        + 'outright invention.',
        'Here is how quickly the first form can move. In April 2013, hackers took control of the '
        + 'Associated Press Twitter account and posted that there had been explosions at the White House '
        + 'and that the president was injured. Neither of those things had happened. The stock market '
        + 'dropped sharply within seconds, and recovered within minutes once the Associated Press said '
        + 'the post was false. That was one false sentence, sent from an account readers had good reason '
        + 'to trust.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'Sourcing begins before you read the content. Ask two questions. Who sent this? Do they '
            + 'know whether it is true? A friend forwarding a story they believe and an account built to '
            + 'deceive are different problems, even when the words are identical.' }
      ]
    },
    {
      label: 'Part Two',
      heading: 'Four tactics, and the system that rewards them',
      paragraphs: [
        '<strong><span class="kt">Clickbait</span>.</strong> A headline written to get a click rather '
        + 'than to tell you what happened. It usually works by holding back the exact detail you want. '
        + 'You already know why it exists. In Topic 1 you saw that the click is what pays, and in Topic 3 '
        + 'you saw that the headline is written to raise a number somebody chose. Nobody has to intend to '
        + 'mislead for clickbait to mislead.',
        '<strong><span class="kt">Deepfake</span>.</strong> Video or audio of a real person, made by '
        + 'software, saying something they never said. In April 2018, Jordan Peele and BuzzFeed released '
        + 'a video of Barack Obama that Obama had nothing to do with. They made it specifically to show '
        + 'people that this was possible. Voice cloning has become cheap and fast since then. The useful '
        + 'response is not to distrust all video, because that is not a livable rule. The useful response '
        + 'is to ask where a clip came from before treating it as evidence.',
        '<strong><span class="kt">Bots</span>.</strong> A bot is an account that is automated rather '
        + 'than run by a person. What a bot network is for is often misunderstood. It is usually not '
        + 'trying to persuade you directly. It is trying to make a claim look popular, because people are '
        + 'more willing to believe something when they think everyone else already believes it.',
        '<strong>Emotion.</strong> This is the fourth tactic, and it carries the other three. Posts that '
        + 'make people angry or afraid are shared far more often than posts that make people think. This '
        + 'is not a conspiracy. It is a fact about human behavior, including yours. People share what '
        + 'they feel, quickly, before the feeling fades.',
        'Now place those four tactics next to what you learned in Topic 3. The ranking system does not '
        + 'need to want any of this. It rewards reaction. Sensational posts produce reaction. Therefore '
        + 'sensational posts get shown to more people. No employee at the company ever decides to promote '
        + 'a lie. A system built to maximize reaction will spread whatever produces the most reaction, '
        + 'and truth is not what that measurement captures.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'All four tactics aim at your emotions rather than at your reasoning. Naming the emotion '
            + 'is an effective defense, because an emotion you have named out loud stops steering you. '
            + 'Saying "this post is built to make me angry" takes about four seconds.' }
      ]
    },
    {
      label: 'Part Three',
      heading: 'Who spreads false information',
      paragraphs: [
        'In 2018, three researchers at MIT named Soroush Vosoughi, Deb Roy and Sinan Aral published a '
        + 'study in the journal <em>Science</em>. They followed about 126,000 rumors on Twitter over '
        + 'eleven years. They found that false stories reached more people, and reached them faster, than '
        + 'true stories did. The difference was large.',
        'Then they did the step that makes the study important. They removed all of the automated '
        + 'accounts from the data and repeated the analysis. The result did not change. People, not bots, '
        + 'did most of the spreading.',
        'Their explanation was novelty and emotion. False stories are newer than true ones, because a '
        + 'true story is limited to what actually happened and a false story is not. Novelty is what '
        + 'people pass along.',
        'Consider what that means. The main solution is not a technical one, and it is mostly not about '
        + 'the platforms. It is the two seconds before a person reposts.',
        'The motive behind false stories is often money rather than politics, which surprises many '
        + 'people. During the 2016 United States election, reporters at BuzzFeed News traced a group of '
        + 'websites publishing false American political stories to Veles, a town in North Macedonia. Many '
        + 'of those sites were run by young people who had found that sensational American political '
        + 'stories earned well in advertising. The same reporting found that in the final three months of '
        + 'that campaign, the best-performing false election stories drew more engagement on Facebook '
        + 'than the best-performing true ones.',
        'A false story with no evidence behind it can also move a person to act. In late 2016, a false '
        + 'claim known as Pizzagate spread, alleging that a child trafficking operation was being run out '
        + 'of a restaurant in Washington DC. There was no evidence for it. In December 2016, a man drove '
        + 'to that restaurant from another state and fired a rifle inside the building. No one was hurt.'
      ],
      callouts: [
        { label: 'Watch For',
          body: '"It was bots" and "it was foreign interference" both describe real things, and both are '
            + 'comfortable explanations, because they place the problem outside our own behavior. The '
            + 'best available evidence says that ordinary people, forwarding things they did not check, '
            + 'do most of the work.' }
      ]
    },
    {
      label: 'Part Four',
      heading: 'How to check a claim, in about two minutes',
      paragraphs: [
        'The most useful habit is <span class="kt">lateral reading</span>. Instead of studying the page '
        + 'you landed on more and more closely, you leave it. You open new tabs and find out what other '
        + 'sources say about whoever published it. Researchers at Stanford compared professional '
        + 'fact-checkers with students. The fact-checkers left the page almost immediately. The students '
        + 'stayed and examined the page\'s design, its logo, and its About section, all of which the page '
        + 'itself controls.',
        'There are five questions to ask, listed here from most useful to least. '
        + 'First, who published this? Second, when was it published, since old stories are constantly '
        + 'reshared as new ones? Third, does any other source report it, and if only one does, why? '
        + 'Fourth, what is the earliest version you can find, since the version you saw is usually '
        + 'several steps down a chain? Fifth, for a photograph, what does a reverse image search show? '
        + 'That search will often return the same picture from a different year or a different country.',
        'Fact-checking sites such as Snopes and FactCheck.org are most useful in one specific case, which '
        + 'is a claim you have already seen five times. If something is circulating widely, somebody has '
        + 'probably already done the work, and reading their work is faster than repeating it.',
        'Being skeptical can go wrong in one specific way, and you should know about it, because this class could teach '
        + 'it by accident. Doubting everything equally is not media literacy. It is paralysis, and it is '
        + 'genuinely useful to anyone running a disinformation campaign, because if nothing can be '
        + 'established then nothing they say can be disproven. The goal is calibration, which means '
        + 'believing a claim in proportion to the evidence for it.',
        'The single most useful rule is also the simplest one. Do not pass along something you have not '
        + 'checked. That is not offered as a rule about being a good person. Part Three is the reason: '
        + 'you are part of the distribution system, and that part is the largest one.'
      ],
      callouts: [
        { label: 'The Standard',
          body: '"I do not believe it" is not a check. A check names what you looked at. "Two outlets '
            + 'report this, and both cite the same anonymous source" is a check. It can end in '
            + 'uncertainty and still be finished work.' }
      ]
    },
    {
      label: 'Part Five',
      heading: 'Elections, where all of it appears at once',
      paragraphs: [
        'In an election, everything above appears at the same time. It helps to separate the mechanisms '
        + 'that are documented from the claims that are only slogans. There are six to know.',
        '<strong>False information about voting.</strong> The version that does measurable damage is '
        + 'usually not about candidates. It is about procedure: a wrong date, invented ID requirements, '
        + 'or a polling place that has moved. A claim like that does not change an opinion. It changes '
        + 'whether a person votes, which is a larger effect and a cheaper one to produce.',
        '<strong>Foreign interference.</strong> This means governments or groups outside a country using '
        + 'its platforms to affect its politics. In February 2018, a United States grand jury indicted '
        + 'thirteen Russian nationals and the Internet Research Agency for running social media accounts '
        + 'that posed as Americans during the 2016 election. Read the described goal carefully, because '
        + 'it is not what most people assume. Much of the effort aimed to widen existing divisions rather '
        + 'than to argue for one candidate.',
        '<strong><span class="kt">Microtargeting</span>.</strong> Campaigns pay to show messages to '
        + 'narrow groups of voters, selected by attribute. This is the system from Topic 1 pointed at '
        + 'voters instead of shoppers. The damage it does is specific and easy to miss. Two voters can be '
        + 'shown different promises by the same campaign, and neither one ever sees the other\'s, so '
        + 'there is no longer a single public record of what was promised. The Cambridge Analytica story '
        + 'in 2018 was an example of this. Profile data on tens of millions of Facebook users was '
        + 'collected through a quiz app and used for political targeting. In 2019, Facebook agreed to a '
        + 'five billion dollar penalty from the Federal Trade Commission.',
        '<strong><span class="kt">Echo chambers</span>.</strong> This is the idea that ranking narrows '
        + 'what a person sees until they mostly encounter people who already agree with them, so opposing '
        + 'arguments arrive only in weak forms. Treat this one as less certain than the others. It is the least settled part of '
        + 'this section, which is what The Road Not Taken below is about.',
        '<strong>Polarization.</strong> This means us-against-them hardening over time. The mechanism is '
        + 'the engagement number again. Posts attacking the other side reliably outperform posts '
        + 'explaining your own side, so the attacks spread fastest, in every direction at once.',
        '<strong>The regulation gap.</strong> American rules about political advertising were written for '
        + 'broadcast television, where an advertisement is public by definition and a station must keep a '
        + 'record of who bought it. Much of what happens on platforms is governed instead by each '
        + 'company\'s own policies, which the companies write and can change. No voter approved those '
        + 'policies. That is the last thing you need before Topic 6.'
      ],
      callouts: [
        { label: 'Watch For',
          body: '"Social media decided the election" is a claim about size, and nobody has good evidence '
            + 'for it. Every mechanism in this section is real and documented. How much any of it moves '
            + 'an actual result is genuinely unsettled, and a person who tells you it is settled, in '
            + 'either direction, is telling you about themselves rather than about the evidence.' }
      ]
    }
  ],

  roadNotTaken: {
    label: 'The Road Not Taken',
    heading: 'The echo chamber may be the part of this that is wrong',
    paragraphs: [
      'Eli Pariser named the filter bubble in 2011, and it became the standard explanation for almost '
      + 'everything about online politics. It is repeated so often that it sounds like a research '
      + 'finding. It is a theory, and it has taken real damage.',
      'When researchers measured what people actually read, rather than what the theory predicts, they '
      + 'kept finding news diets more varied than expected. They also found that heavily sealed-off '
      + 'partisans are a small share of users rather than the norm. A 2015 study in <em>Science</em> by '
      + 'Eytan Bakshy, Solomon Messing and Lada Adamic found that on Facebook, individual choices about '
      + 'what to click mattered more than the ranking did for how much opposing content people actually '
      + 'read. Those authors worked for Facebook, and that is worth remembering. It is a reason to read the study '
      + 'carefully. It is not a reason to throw it out, and noticing that difference is the skill.',
      'A rival explanation is that the bubble is mostly offline. Who you live near, who you are related '
      + 'to, and who you talk to in person were not chosen by an algorithm.',
      'This matters because the two explanations point to different solutions. If ranking causes the '
      + 'bubble, then changing the ranking helps. If people choose it themselves, then changing the '
      + 'ranking does very little, and the proposal was aimed at the wrong target. Keep that in mind '
      + 'during Topic 6, because somebody in that argument is going to propose exactly that solution.'
    ]
  },

  takeaway: 'False stories spread because they are new and because they produce strong emotions, and '
    + 'the best available evidence says that people, not bots, do most of the spreading. Checking a '
    + 'claim takes about two minutes, and a real check names what you looked at. In an election every '
    + 'tactic in this reading appears at once, and how much any of it changes a result is still argued '
    + 'about.',

  studyGuide: {
    namesAndCases: [
      { name: 'The Associated Press account is hacked, April 2013',
        what: 'One false sentence about explosions at the White House, from an account readers '
          + 'had good reason to trust. The stock market dropped within seconds and recovered '
          + 'within minutes.' },
      { name: 'Vosoughi, Roy and Aral, 2018, Science',
        what: 'About 126,000 rumors on Twitter over eleven years. False stories reached more '
          + 'people, faster. Then they removed every automated account and the result did not '
          + 'change: people, not bots, do most of the spreading. Their explanation was novelty '
          + 'and emotion.' },
      { name: 'Peele and BuzzFeed, April 2018',
        what: 'A video of Barack Obama that Obama had nothing to do with, made specifically to '
          + 'show people it was possible.' },
      { name: 'Veles, North Macedonia, 2016',
        what: 'BuzzFeed News traced false American political stories to a group of sites run by '
          + 'young people who had found the traffic paid well. The motive was money, not '
          + 'politics, which surprises most people.' },
      { name: 'Pizzagate, December 2016',
        what: 'A false claim with no evidence behind it moved a man to drive to a restaurant in '
          + 'another state and fire a rifle inside it.' },
      { name: 'The Stanford fact-checker study',
        what: 'Professional fact-checkers left the page almost immediately. Students stayed and '
          + 'studied the design, the logo and the About section, all of which the page controls.' },
      { name: 'The Internet Research Agency indictment, February 2018',
        what: 'Thirteen Russian nationals, for running accounts that posed as Americans in 2016. '
          + 'Read the goal carefully: much of it aimed to widen existing divisions rather than '
          + 'to argue for one candidate.' },
      { name: 'Cambridge Analytica, 2018',
        what: 'Profile data on tens of millions of Facebook users, collected through a quiz app '
          + 'and used for political targeting. Facebook agreed to a five billion dollar penalty '
          + 'from the Federal Trade Commission in 2019.' },
      { name: 'Bakshy, Messing and Adamic, 2015, Science',
        what: 'On Facebook, individual choices about what to click mattered more than the '
          + 'ranking did for how much opposing content people actually read. The authors worked '
          + 'for Facebook, which is a reason to read it carefully rather than to throw it out.' }
    ]
  },

  questions: [
    { skill: 'Fallacies and Propaganda',
      text: 'Describe one post you saw this week that gave you a strong emotional reaction. Name the '
        + 'emotion, then explain how that emotion made people more likely to share the post.',
      startHere: 'Two or three sentences. Name the emotion, then say how it helped the post spread.',
      pushFurther: 'Decide whether the post was false, or true but framed to mislead, and explain how you can tell those two apart.' },
    { skill: 'Sourcing',
      text: 'Choose one claim you are unsure about and check it using lateral reading. Write down what '
        + 'you did: who published it, when it was published, and whether any other source reports it.',
      startHere: 'Answering two of the five checking questions is enough. Report what you found, including if you found nothing.',
      pushFurther: 'Find the earliest version of the claim that you can, and explain who benefits if people believe it.' },
    { skill: 'Generalizing from Evidence',
      text: 'Choose one item from Part Five. Explain, in three steps, how it could change the result of '
        + 'an election.',
      startHere: 'Name the item, then give three steps in order.',
      pushFurther: 'Name the evidence that would show it actually changed a result, and say whether that evidence could realistically exist.' }
  ]
};

// ── Topic 6 ───────────────────────────────────────────────────────────────────
const TOPIC_6 = {
  n: 6,
  key: 'sm-t6',
  slug: 'who-decides',
  topic: 'Topic 6',
  title: 'Who Gets to <em>Decide</em>?',
  eyebrow: 'Social Media · Topic 6',
  deck: 'On the first day I said I would ask you a hard question at the end. This is it.',
  subtitle: 'You, the company, or the government',
  skillTags: ['Synthesizing Patterns', 'Generalizing from Evidence'],
  inClass: 'The question from day one, argued properly. You state the strongest version of a '
    + 'position you do not hold, and then you take your own.',

  overview: 'On the first day I said I would ask you a hard question at the end. This is it. Who '
    + 'should get to decide what a platform is allowed to do to your attention: you, the company, '
    + 'or the government? You have earned the right to argue it. You traced the money, took a film '
    + 'apart, opened the algorithm box, weighed the research on what these systems do to people, '
    + 'and followed a false story through the system. You will not be graded on which side you '
    + 'choose.',

  // Every position now uses the same two-part shape and the same two labels, "the case" and "the
  // tradeoff." That word choice is not decoration: it is the word this topic already teaches in
  // The Standard section and in learningTargets[1], so reusing it here instead of inventing a new
  // abstract label per position (the earlier draft had "ownership," "a conflict of interest," and
  // "cuts both ways") removes three pieces of vocabulary a ninth grader would otherwise have to
  // hold in their head for no reason. Fewer new words, same content.
  learningTargets: [
    { skill: 'Synthesizing Patterns',
      target: 'I can state all three answers to who should decide, and give the case and the tradeoff for each one.' },
    { skill: 'Hypotheses',
      target: 'I can name the tradeoff in a position, including the position I hold, because an answer with no tradeoff in it is not finished.' },
    { skill: 'Generalizing from Evidence',
      target: 'I can use an earlier argument about a new medium as a precedent, by naming what is the same and what is different.' }
  ],

  // Criterion 2 is the one that does the work. Every position in this topic carries a tradeoff, and
  // a student who states the other side well and then never turns that same question on their own
  // position has done half the assignment. None of the three questions asks for it, which is why it
  // belongs here.
  successCriteria: [
    { skill: 'Synthesizing Patterns',
      criteria: 'I can state the position I did not choose well enough that somebody who holds it would say I got it right.' },
    { skill: 'Synthesizing Patterns',
      criteria: 'I can name the tradeoff in the position I actually hold, not just the one I argued against.' },
    { skill: 'Hypotheses',
      criteria: 'I can name what would change my mind, specifically enough that somebody could go looking for it.' }
  ],

  competencies: [3, 4, 5],

  // Video. Optional, and often the primary path rather than the alternative one.
  //
  //   videos: [
  //     { title:    'CNN10 for October 14',
  //       url:      'https://...',          // required, a real link you supply
  //       prompt:   'Watch for who is quoted and who is not.',
  //       source:   'CNN10',                 // optional, shown as a label
  //       duration: '10:00',                 // optional
  //       captions: true }                   // set false only if genuinely absent
  //   ]
  //
  // Empty means the topic renders no video section at all, not an empty one.
  videos: [],

  support: [
    { label: 'Before You Read',
      body: 'You already know how the machine works. You traced the money, took a film apart, opened '
        + 'the algorithm box, read the evidence about effects and about your own record, and followed '
        + 'a false story through the system. All of that was so today could be a real argument instead '
        + 'of a set of opinions.' },
    { label: 'Reading Target',
      body: 'By the end you should be able to state the strongest version of a position you do not hold, '
        + 'well enough that somebody who holds it would say you got it right.' }
  ],

  terms: ['regulation', 'self-regulation', 'precedent', 'tradeoff', 'unintended consequence'],

  sections: [
    {
      label: 'The Question',
      heading: 'Who should get to decide what a platform can do to your attention?',
      paragraphs: [
        'There are three answers on the table. You decide. The company decides. The government decides.',
        'Before you choose, there is one ground rule. Serious, thoughtful people hold each of these '
        + 'three positions. If a position feels obviously wrong to you, you are probably picturing a '
        + 'weak version of it, not the strongest one.',
        'You will not be graded on which position you choose. You will be graded on how well you can '
        + 'state the strongest version of a position you did not choose.'
      ],
      callouts: [
        { label: 'The Standard',
          body: 'A <span class="kt">tradeoff</span> is something you give up in order to get something '
            + 'else. Every answer here has one. An answer with no tradeoff in it is not finished.' }
      ]
    },
    {
      label: 'Position One',
      heading: 'You decide',
      paragraphs: [
        '<b>The case:</b> it is your attention and your phone, so you should be the one who controls '
        + 'it. Real tools already exist. You can delete the app, turn off notifications, switch to '
        + 'the feed that shows posts in time order instead of by algorithm, or set a timer. Adults get '
        + 'to make their own choices about their time, even bad ones. Telling teenagers they cannot be '
        + 'trusted to choose is unfair to them.',
        '<b>The tradeoff:</b> the two sides are not evenly matched. The app was built by engineers '
        + 'whose job is to make it hard to stop scrolling, and they have had years to get good at that '
        + 'job. On one side is a large, well-funded team. On the other side is your willpower, by '
        + 'itself. A choice made under those conditions may not be as free as it looks.'
      ]
    },
    {
      label: 'Position Two',
      heading: 'The company decides',
      paragraphs: [
        '<b>The case:</b> the company built the product, pays to run it, and does not force anyone to '
        + 'use it. When a company makes its own rules instead of waiting for government rules, that is '
        + 'called <span class="kt">self-regulation</span>. Self-regulation is a real force, not just '
        + 'words: companies do change their products, sometimes because users complain and sometimes '
        + 'because bad press costs them money. Companies also understand their own product better than '
        + 'an outside regulator would.',
        '<b>The tradeoff:</b> the company earns its money from your attention. Fixing the problem would '
        + 'mean reducing the exact thing that makes the company money. That is a hard thing to ask a '
        + 'company to do to itself.'
      ]
    },
    {
      label: 'Position Three',
      heading: 'The government decides',
      paragraphs: [
        '<b>The case:</b> <span class="kt">regulation</span> means the government requires a company '
        + 'to follow certain rules. We already do this constantly, and most people no longer argue '
        + 'about it. Cars must have seatbelts. Cigarette ads are banned from television. Children '
        + 'cannot work full-time jobs. In each case, people used to say the choice should be personal. '
        + 'Almost nobody says that now.',
        '<b>The tradeoff:</b> the same power can be used two different ways. A government that is '
        + 'allowed to make a platform protect people is also a government that is allowed to make a '
        + 'platform control what people see. Right now we would be trusting the government to use that '
        + 'power only the first way.'
      ],
      callouts: [
        { label: 'Watch For',
          body: 'An <span class="kt">unintended consequence</span> is a result that nobody wanted or '
            + 'predicted. Rules written for large platforms often hurt small ones the most, because a '
            + 'small company cannot afford the lawyers that complicated new rules require. That does '
            + 'not settle the argument, but it belongs in it.' }
      ]
    },
    {
      label: 'The Method',
      heading: 'This argument has happened before',
      paragraphs: [
        'A <span class="kt">precedent</span> is an earlier case that people point to when they are '
        + 'deciding a new one. This exact argument, about a new kind of media and what it does to '
        + 'young people, has happened at least four times before.',
        '<b>1954, comic books.</b> They led to a Senate hearing and a new industry code.',
        '<b>1970s, television violence.</b> It led to hearings across the whole decade.',
        '<b>1985, music lyrics.</b> They led to Senate hearings and the parental advisory sticker you '
        + 'still see on album covers today.',
        '<b>1993, video games.</b> They led to hearings and the rating system that is still on every '
        + 'game box.',
        'Those four examples have two things in common. First, none of them ended with a new law. Each '
        + 'one ended with the industry making its own rules, only after the government threatened to '
        + 'step in.',
        'Second, some of the strongest claims made during these arguments turned out to be wrong. '
        + 'Later research showed that the comic book studies were seriously flawed. The video game '
        + 'research is still argued about today.',
        'This history does not tell you who is right today. It does tell you something else: people '
        + 'have said "this new thing is dangerous for kids" many times before. Sometimes they turned '
        + 'out to be right. Sometimes they did not. Either way, they believed what they were saying.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'Using a precedent well means naming what is the same <em>and</em> what is different, '
            + 'not just one or the other. Social media is different from a comic book in three specific '
            + 'ways: it is personalized to you, it is with you all the time, and it responds to what '
            + 'you do. Any comparison to an earlier case has to deal with those three differences.' }
      ]
    }
  ],

  roadNotTaken: {
    label: 'The Road Not Taken',
    heading: 'The rules we have now were chosen, and one of them almost disappeared',
    paragraphs: [
      'The most important rule about platforms in the United States is one sentence, written in 1996. '
      + 'It is part of a law called Section 230. The sentence says that a platform is usually not '
      + 'treated as the publisher of what its users post. In plain terms: if you post something '
      + 'illegal or false, you can be held responsible for it, but the platform usually cannot.',
      'This rule almost did not survive. It was part of a much larger law. In 1997, the Supreme Court '
      + 'struck down the rest of that law for violating free speech. Only Section 230 survived. Since '
      + 'then, lawmakers from both parties have tried to change it or remove it, for different reasons. '
      + 'It is still the law today.',
      'So remember this when you argue today: the rules we have were not the only possible outcome. '
      + 'They came down to one sentence that barely survived a court case, and people are still '
      + 'fighting over it right now.'
    ]
  },

  takeaway: 'There are three answers, and each one has a real case and a real tradeoff. This argument '
    + 'has happened four times before, about four different kinds of media, and it usually ended in '
    + 'self-regulation instead of a new law. Your job today is not to win the argument. Your job is to '
    + 'state the other side well enough that somebody who holds it would say you got it right.',

  studyGuide: {
    namesAndCases: [
      { name: 'Comic books, 1954',
        what: 'A Senate hearing and a new industry code. Later research showed the studies '
          + 'behind the alarm were seriously flawed.' },
      { name: 'Television violence, 1970s',
        what: 'Hearings across the whole decade.' },
      { name: 'Music lyrics, 1985',
        what: 'Senate hearings, and the parental advisory sticker still on album covers.' },
      { name: 'Video games, 1993',
        what: 'Hearings, and the rating system still on every game box. The research is still '
          + 'argued about today.' },
      { name: 'What all four have in common',
        what: 'None of them ended with a new law. Each ended with the industry writing its own '
          + 'rules, only after the government threatened to step in.' },
      { name: 'Section 230, 1996',
        what: 'One sentence: a platform is usually not treated as the publisher of what its '
          + 'users post. You can still be held responsible for what you post; the platform '
          + 'usually cannot.' },
      { name: 'The Supreme Court, 1997',
        what: 'Struck down the rest of the law Section 230 was part of, for violating free '
          + 'speech. Only that one sentence survived, and people are still fighting over it.' }
    ]
  },

  questions: [
    { skill: 'Synthesizing Patterns',
      text: 'Choose the position you do not agree with. Write the strongest case for it, in your own words.',
      startHere: 'Three or four sentences making the best case you can for a side you disagree with.',
      pushFurther: 'Name one fact that would prove that position right.' },
    { skill: 'Generalizing from Evidence',
      text: 'Choose one earlier argument: comic books, television, music lyrics, or video games. '
        + 'Describe what happened, then name one way social media is different from that medium.',
      startHere: 'Say what happened in two or three sentences, then name one difference.',
      pushFurther: 'Then say whether that difference makes the older example more helpful or less helpful for answering today\'s question.' },
    { skill: 'Generalizing from Evidence',
      text: 'What evidence would change your mind about who should decide? Be specific enough that '
        + 'somebody could go looking for it.',
      startHere: 'Name one thing. It has to be something a person could actually find out.',
      pushFurther: 'Explain where a person could look for that evidence.' }
  ]
};

module.exports = { meta: UNIT, topics: [TOPIC_1, TOPIC_2, TOPIC_3, TOPIC_4, TOPIC_5, TOPIC_6] };
