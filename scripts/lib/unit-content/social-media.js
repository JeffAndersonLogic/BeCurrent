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
  title: 'What It Does to You, and What It <em>Keeps</em>',
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
  deck: 'The interesting question is not whether people lie online. It is why the lie moves faster '
    + 'than the correction.',
  subtitle: 'Fake news, the tactics that carry it, and elections',
  skillTags: ['Sourcing', 'Corroboration'],
  inClass: 'We take a real hoax apart, name the four tactics that carry one, then do the checking, '
    + 'which takes about ninety seconds and almost nobody does.',

  overview: 'Today is the part of this unit everybody thinks they are already good at. You will find '
    + 'out that spotting false information is mostly not about the false information. It is about what '
    + 'carries it: emotion, headlines built to be clicked, accounts that are not people, and a ranking '
    + 'system that rewards whatever gets a reaction. Then you will learn the actual checking, which '
    + 'takes about ninety seconds, and find out what the research says about who does the spreading. '
    + 'The answer to that last one is not what most people assume.',

  learningTargets: [
    { skill: 'Fallacies and Propaganda',
      target: 'I can name four tactics that make false information spread, and explain what each one does to the reader.' },
    { skill: 'Sourcing',
      target: 'I can check an unfamiliar claim in under two minutes, and say specifically what I checked.' },
    { skill: 'Generalizing from Evidence',
      target: 'I can explain one specific mechanism by which false information affects an election, beyond people believing wrong things.' }
  ],

  successCriteria: [
    { skill: 'Fallacies and Propaganda',
      criteria: 'I can name the feeling a piece of content is aiming for, and say why that feeling helps it spread.' },
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
      body: 'You know the machine now: what the app counts and what it pushes a number on. Today you '
        + 'find out what kind of content that machine rewards, and what happens when somebody builds '
        + 'content for it deliberately.' },
    { label: 'Reading Target',
      body: 'By the end you should be able to check a claim you are unsure about in under two minutes, '
        + 'and say out loud what you checked rather than that you did not believe it.' }
  ],

  terms: ['misinformation', 'disinformation', 'clickbait', 'deepfake', 'bot', 'lateral reading',
    'echo chamber', 'microtargeting'],

  sections: [
    {
      label: 'Part One',
      heading: 'Two words, and the difference is the person sending it',
      paragraphs: [
        '<span class="kt">Misinformation</span> is false information spread by somebody who thinks it is '
        + 'true. <span class="kt">Disinformation</span> is false information spread by somebody who knows '
        + 'it is false. Identical content, different sender, and your response should be different. You '
        + 'can correct a person who is mistaken. You cannot correct a campaign, because being wrong was '
        + 'the plan.',
        'Three shapes it usually arrives in. A viral hoax, which is a story that is simply invented. A '
        + 'doctored image, which now includes images that were generated rather than edited. And a '
        + 'misleading headline, which is the sneakiest of the three, because every fact underneath it can '
        + 'be true while the headline still leaves you believing something false. That last one is '
        + 'framing, and it is much more common than outright invention.',
        'Here is how fast the first shape can move. In April 2013 the Associated Press Twitter account '
        + 'was hacked and posted that there had been explosions at the White House and the president was '
        + 'injured. The stock market dropped sharply within seconds and recovered within minutes once the '
        + 'agency said it was false. One fake sentence, from an account people had reason to trust.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'Sourcing starts before the content. Who sent this, and do they know whether it is true? '
            + 'A friend forwarding something they believe and an account built to deceive are different '
            + 'problems even when the words are the same.' }
      ]
    },
    {
      label: 'Part Two',
      heading: 'The four tactics',
      paragraphs: [
        '<strong><span class="kt">Clickbait</span>.</strong> A headline written to get the click rather '
        + 'than to tell you what happened, usually by withholding the exact thing you want to know. You '
        + 'already know why it exists: from Topic 1, the click is what pays, and from Topic 3, the '
        + 'headline is optimized for the number somebody chose. Nobody has to intend to mislead for this '
        + 'to mislead.',
        '<strong><span class="kt">Deepfake</span>.</strong> Video or audio of a real person, made by '
        + 'software, saying something they never said. In April 2018 Jordan Peele and BuzzFeed released a '
        + 'video of Barack Obama that Obama had nothing to do with, made specifically to show people it '
        + 'was possible. Since then voice cloning in particular has become cheap and fast. The useful '
        + 'response is not to trust no video, which is unlivable. It is to ask where a clip came from '
        + 'before treating it as evidence of anything.',
        '<strong><span class="kt">Bots</span>.</strong> Accounts that are automated rather than people. '
        + 'What a bot network is for is usually misread: it is not there to persuade you directly, it is '
        + 'there to make something look popular. Twenty thousand accounts repeating a claim manufactures '
        + 'the appearance of consensus, and people believe things more readily when they think everyone '
        + 'else already does.',
        '<strong>Emotion.</strong> This is the one that carries the other three. Content that makes you '
        + 'angry, afraid, or outraged gets shared far more than content that makes you think. That is not '
        + 'a conspiracy, it is a fact about people, including you: you share what you feel, quickly, '
        + 'before the feeling fades.',
        'And now put that next to Topic 3. The ranking system does not need to want any of this. It '
        + 'rewards reaction, sensational content generates reaction, so sensational content gets '
        + 'promoted, with nobody at the company ever deciding to promote a lie. A system built to '
        + 'maximize reaction will amplify whatever produces the most reaction, and truth is not what that '
        + 'number measures.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'Every one of these four is aimed at a feeling rather than at your reasoning. Naming the '
            + 'feeling is the counter, because a feeling you have named out loud stops steering you. '
            + '"This is built to make me angry" is a complete defense and it takes four seconds.' }
      ]
    },
    {
      label: 'Part Three',
      heading: 'Who actually spreads it, and it is not the bots',
      paragraphs: [
        'In 2018 three researchers at MIT, Soroush Vosoughi, Deb Roy and Sinan Aral, published a study in '
        + '<em>Science</em> that followed roughly 126,000 rumor cascades on Twitter over eleven years. '
        + 'False stories spread farther, faster, and to more people than true ones, and it was not close. '
        + 'Then they did the thing that makes the study matter: they removed all the bot activity and ran '
        + 'it again. The finding held. Humans did the spreading.',
        'Their explanation was novelty and emotional response. False stories are newer, because they are '
        + 'not constrained by having happened, and novelty is exactly what people forward.',
        'Sit with what that means. The fix is mostly not technical, and it is mostly not about the '
        + 'platforms. It is the two seconds before you repost.',
        'Money is often the motive rather than politics, which surprises people. During the 2016 US '
        + 'election, reporters at BuzzFeed News traced a cluster of American political hoax sites to '
        + 'Veles, a town in North Macedonia, run largely by young people who had discovered that '
        + 'sensational American political stories paid well in advertising. The same reporting found that '
        + 'in the final three months of that campaign, the top-performing false election stories drew '
        + 'more Facebook engagement than the top-performing real ones.',
        'And a false story with no facts in it at all can move a person to act. In late 2016 a claim '
        + 'known as Pizzagate spread, alleging a child trafficking operation run out of a Washington DC '
        + 'restaurant. There was nothing to it. In December 2016 a man drove there from another state and '
        + 'fired a rifle inside the building. Nobody was hurt, which was luck.'
      ],
      callouts: [
        { label: 'Watch For',
          body: '"It was bots" and "it was foreign interference" are both real phenomena and both '
            + 'comfortable, because they put the problem outside the room. The best evidence available '
            + 'says ordinary people forwarding things they did not check do most of the work.' }
      ]
    },
    {
      label: 'Part Four',
      heading: 'The checking, which takes about ninety seconds',
      paragraphs: [
        'The single most useful habit is <span class="kt">lateral reading</span>. Instead of studying the '
        + 'page you landed on, harder and harder, you leave it: open new tabs and find out what other '
        + 'sources say about whoever published it. Researchers at Stanford compared professional fact '
        + 'checkers with students and found that the checkers did this almost immediately while the '
        + 'students stayed on the page examining its design, its logo, and its About section, all of '
        + 'which are things the page controls.',
        'The moves, in order of return. Who published this. When, because old stories recirculate as new '
        + 'ones constantly. Does anybody else report it, and if only one outlet has it, why. What is the '
        + 'earliest version, because the version you saw is usually several hands down the chain. And for '
        + 'a photograph, a reverse image search, which will often show you the same picture from a '
        + 'different year or a different country.',
        'Fact-checking sites like Snopes and FactCheck.org are worth using for a specific case: the claim '
        + 'you have now seen five times. If a thing is circulating widely, somebody has probably already '
        + 'done the work, and reading their work is faster than repeating it.',
        'Skepticism has a failure mode, and you should know it, because it is the one this course could '
        + 'accidentally teach. Doubting everything equally is not media literacy, it is paralysis, and it '
        + 'is genuinely useful to anyone running a disinformation campaign: if nothing can be established, '
        + 'nothing they say can be disproved. The goal is calibration, believing things in proportion to '
        + 'the evidence, not suspicion of everything.',
        'The rule with the best return on effort is the plainest one. Do not pass along something you have '
        + 'not checked. That is not offered as a moral rule. Part Three is the reason: you are part of the '
        + 'distribution system, measurably, and it is the largest part.'
      ],
      callouts: [
        { label: 'The Standard',
          body: '"I do not believe it" is not a check. A check names what you looked at. "Two outlets have '
            + 'it, both citing the same single anonymous source" is a check, and it can end in uncertainty '
            + 'and still be finished work.' }
      ]
    },
    {
      label: 'Part Five',
      heading: 'Elections, where all of it runs at once',
      paragraphs: [
        'Everything above shows up in an election together, and it is worth separating what is a real '
        + 'mechanism from what is a slogan.',
        '<strong>False information about voting itself.</strong> The version that does measurable damage is '
        + 'not usually about candidates, it is about procedure: the wrong date, invented ID requirements, a '
        + 'polling place that moved. That kind of claim does not change an opinion, it changes whether '
        + 'somebody shows up, which is a larger effect and a cheaper one to produce.',
        '<strong>Foreign interference.</strong> Governments and groups outside a country using its '
        + 'platforms to affect its politics. In February 2018 a United States grand jury indicted thirteen '
        + 'Russian nationals and the Internet Research Agency for running social media accounts that posed '
        + 'as Americans during the 2016 election. Read the described aim carefully, because it is not what '
        + 'people assume: much of it was to widen existing divisions rather than to argue for a candidate.',
        '<strong><span class="kt">Microtargeting</span>.</strong> Campaigns buying narrow audiences by '
        + 'attribute, which is the machine from Topic 1 pointed at voters instead of shoppers. The damage '
        + 'it does is specific and easy to miss: two voters can be shown different promises by the same '
        + 'campaign, and neither one ever sees the other\'s, so there stops being a single public record of '
        + 'what was promised. The Cambridge Analytica story in 2018 was this: profile data on tens of '
        + 'millions of Facebook users collected through a quiz app and used for political targeting. '
        + 'Facebook agreed to a five billion dollar penalty from the Federal Trade Commission in 2019.',
        '<strong><span class="kt">Echo chambers</span> and filter bubbles.</strong> The idea that ranking '
        + 'narrows what you see until you mostly encounter people who already agree with you, so opposing '
        + 'arguments arrive only in their weakest form. Hold this one loosely: it is the part of this '
        + 'section the research is least settled on, which is what The Road Not Taken below is about.',
        '<strong>Polarization.</strong> Us against them, hardening. The mechanism is the engagement number '
        + 'again: content attacking the other side reliably outperforms content explaining your own, so '
        + 'the attack is what spreads, in every direction at once.',
        '<strong>The regulation gap.</strong> American rules about political advertising were written for '
        + 'broadcast television, where an ad is public by definition and a station has to keep a file of '
        + 'who bought it. Much of what happens on platforms is governed instead by each company\'s own '
        + 'policies, which they write and can change. Nobody voted on those policies. That is the last '
        + 'thing you need before Topic 6.'
      ],
      callouts: [
        { label: 'Watch For',
          body: '"Social media decided the election" is a claim about size, and nobody has good evidence '
            + 'for it. Every mechanism in this section is real and documented. How much any of it moves an '
            + 'actual outcome is genuinely unsettled, and a person who tells you it is settled, in either '
            + 'direction, is telling you about themselves.' }
      ]
    }
  ],

  roadNotTaken: {
    label: 'The Road Not Taken',
    heading: 'The echo chamber is the part of this that might be wrong',
    paragraphs: [
      'Eli Pariser named the filter bubble in 2011 and it became the standard explanation for almost '
      + 'everything about online politics. It is repeated so often that it sounds like a finding rather '
      + 'than a theory. It is a theory, and it has taken real damage.',
      'When researchers measured what people actually read rather than what the theory predicts, they '
      + 'kept finding news diets more varied than expected, and that the heavily sealed-in partisans are '
      + 'a small share of users rather than the norm. A 2015 study in <em>Science</em> by Eytan Bakshy, '
      + 'Solomon Messing and Lada Adamic found that on Facebook, individual choices about what to click '
      + 'mattered more than the ranking did for how much cross-cutting content people actually read. '
      + 'Note who the authors worked for, which is Facebook. That is a reason to read it carefully, not a '
      + 'reason to throw it out, and noticing the difference is the skill.',
      'The rival explanation is that the bubble is mostly offline: who you live near, who you are related '
      + 'to, and who you talk to in person, none of which an algorithm chose.',
      'This matters because the two stories point at different fixes. If ranking causes the bubble, '
      + 'changing the ranking helps. If people choose it, changing the ranking does very little and the '
      + 'proposal was aimed at the wrong thing. Keep that in your pocket for Topic 6, because somebody in '
      + 'the argument is going to propose exactly that fix.'
    ]
  },

  takeaway: 'False things travel because they are new and they make you feel something, and the best '
    + 'evidence says people rather than bots do most of the carrying. The check takes ninety seconds and '
    + 'names what you actually looked at. In an election every tactic here runs at once, and how much any '
    + 'of it changes an outcome is still argued.',

  questions: [
    { skill: 'Fallacies and Propaganda',
      text: 'Pick something you saw this week that made you feel something strongly. Name the feeling, '
        + 'and explain how that feeling helped the thing travel.',
      startHere: 'Name the feeling, then one sentence on how it spread.',
      pushFurther: 'Say whether it was false, or true and framed to mislead, and how you can tell the difference.' },
    { skill: 'Sourcing',
      text: 'Take one claim you are not sure about and check it laterally. Write down what you did: who '
        + 'published it, when, and who else reports it.',
      startHere: 'Two moves is enough. Write what you found, including if you found nothing.',
      pushFurther: 'Find the earliest version you can, and say who benefits if people believe it.' },
    { skill: 'Generalizing from Evidence',
      text: 'Pick one item from Part Five and explain the mechanism: step by step, how would it actually '
        + 'change an election?',
      startHere: 'One item, three steps.',
      pushFurther: 'Name the evidence that would show it changed an outcome, and say whether that evidence could exist.' }
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
  deck: 'I told you on the first day I would ask you a hard question at the end. Here it is.',
  subtitle: 'You, the company, or the government',
  skillTags: ['Synthesizing Patterns', 'Generalizing from Evidence'],
  inClass: 'The question from day one, argued properly. You state the strongest version of a '
    + 'position you do not hold, then take your own.',

  overview: 'On the first day I told you I would ask you a hard question at the end, and this is '
    + 'it: who should get to decide what a platform is allowed to do to your attention, you, the '
    + 'company, or the government? You traced the money, took a film apart, opened the algorithm '
    + 'box, weighed the research on what it does to people, and followed a false story through the '
    + 'system, so today is a real argument instead of opinions. '
    + 'You will not be graded on which side you land.',

  // Three targets for the three moves the topic teaches: map the argument, find the
  // tradeoff, use a precedent. The tradeoff is its own target rather than a clause
  // inside another one because the topic states the rule outright, "an answer with
  // no tradeoff in it is not finished", and a rule that governs every answer is
  // worth naming on its own.
  //
  // The precedent target names the move, what is the same and what is different,
  // rather than asking for a prediction. The topic is explicit that the four earlier
  // fights do NOT tell you the answer, so a target reading "predict something about
  // this one" asks for the one thing the reading says the history cannot give.
  learningTargets: [
    { skill: 'Synthesizing Patterns',
      target: 'I can state all three answers to who should decide, and give the strongest case and the hardest question for each one.' },
    { skill: 'Hypotheses',
      target: 'I can name the tradeoff in a position, including the one I hold, because an answer with no tradeoff in it is not finished.' },
    { skill: 'Generalizing from Evidence',
      target: 'I can use an earlier fight over a new medium as a precedent, by naming what is the same and what is different.' }
  ],

  // Criterion 2 is the one that does the work. Every position in the topic carries a
  // "hardest question", and a student who states the other side well and then never
  // turns that question on their own position has done half the assignment. None of
  // the three questions asks for it, which is why it belongs here.
  successCriteria: [
    { skill: 'Synthesizing Patterns',
      criteria: 'I can state the position I did not pick well enough that somebody who holds it would say I got it right.' },
    { skill: 'Synthesizing Patterns',
      criteria: 'I can answer the hardest question against my own position, rather than restating why I am right.' },
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
      body: 'You now know how the machine works. You traced the money, watched the film and took it apart, '
        + 'opened the algorithm box, read the evidence about effects and about your own record, and '
        + 'followed a lie through the system. That was all so today would be a real argument instead of '
        + 'opinions.' },
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
        'Three answers are on the table. You. The company. The government.',
        'Before you pick, one ground rule. Nobody in this argument is stupid. Every one of these three '
        + 'positions is held by serious people who have thought about it more than we have. If a position '
        + 'sounds obviously wrong to you, you are probably arguing against the weak version of it.',
        'You will not be graded on which one you pick. You will be graded on whether you can state the '
        + 'strongest version of the one you did not pick.'
      ],
      callouts: [
        { label: 'The Standard',
          body: 'A <span class="kt">tradeoff</span> means you give something up to get something. Every '
            + 'answer here has one. An answer with no tradeoff in it is not finished.' }
      ]
    },
    {
      label: 'Position One',
      heading: 'You decide',
      paragraphs: [
        'The strongest case: it is your attention and your phone. You can delete the app, turn off '
        + 'notifications, use the chronological feed, set a timer. Those controls exist. Adults get to make '
        + 'bad choices about their own time, and treating teenagers as incapable of choosing is its own kind '
        + 'of insult.',
        'The hardest question for this position: the app was designed by people whose job was to make it '
        + 'hard to put down, and they are very good at their job. Is a choice still a free choice when one '
        + 'side has thousands of engineers and A/B tests and you have willpower?'
      ]
    },
    {
      label: 'Position Two',
      heading: 'The company decides',
      paragraphs: [
        'The strongest case: they built it, they pay for it, and you are not required to use it. This is '
        + 'called <span class="kt">self-regulation</span>, and it is not nothing. Companies do change '
        + 'things, sometimes because users complain and sometimes because bad press costs money. They also '
        + 'know how the product works better than any regulator will.',
        'The hardest question for this position: the company\'s income depends on your attention. When you '
        + 'ask someone to protect you from the thing that pays them, what should you expect?'
      ]
    },
    {
      label: 'Position Three',
      heading: 'The government decides',
      paragraphs: [
        '<span class="kt">Regulation</span> means the government sets rules a company has to follow. The '
        + 'strongest case: we already do this constantly, and mostly nobody argues about it anymore. Cars '
        + 'have required seatbelts. Cigarettes cannot be advertised on television. Children cannot work '
        + 'full time. In each case people once said the choice should be personal, and now almost nobody '
        + 'does.',
        'The hardest question for this position: a government that can require a platform to change what it '
        + 'shows you can also require it to change what it shows you. The power to protect and the power to '
        + 'control are the same power, in different hands.'
      ],
      callouts: [
        { label: 'Watch For',
          body: 'An <span class="kt">unintended consequence</span> is a result nobody wanted or predicted. '
            + 'Rules aimed at big platforms often land hardest on small ones that cannot afford lawyers. '
            + 'That does not settle the argument. It does belong in it.' }
      ]
    },
    {
      label: 'The Method',
      heading: 'This argument has been had before',
      paragraphs: [
        'A <span class="kt">precedent</span> is an earlier case that people point to when deciding a new '
        + 'one. This exact fight, about a new medium and what it does to young people, has run at least four '
        + 'times before.',
        'Comic books, in 1954, produced a Senate hearing and an industry code. Television violence produced '
        + 'hearings across the 1970s. Music lyrics produced Senate hearings in 1985 and the parental '
        + 'advisory sticker. Video games produced hearings in 1993 and the rating system on every box today.',
        'Look at what those four have in common. Every one ended in industry self-regulation under threat '
        + 'of government action, rather than in a law. Also worth knowing: the strongest claims made in '
        + 'several of those panics did not hold up later. The comic book research was largely discredited. '
        + 'The video game research is still contested.',
        'That history does not tell you the answer. It does tell you that "this new thing is harming '
        + 'children" has been said before, sometimes correctly and sometimes not, and that the people saying '
        + 'it were sincere either way.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'Using a precedent well means naming what is the same <em>and</em> what is different. Social '
            + 'media is not a comic book: it is personalized, it is always with you, and it responds to you. '
            + 'Any argument from precedent has to survive those three differences.' }
      ]
    }
  ],

  roadNotTaken: {
    label: 'The Road Not Taken',
    heading: 'The rules we have were chosen, and one of them was almost undone',
    paragraphs: [
      'The most important rule about platforms in the United States is a single sentence from 1996, in '
      + 'Section 230 of the Communications Decency Act. It says a platform is generally not treated as the '
      + 'publisher of what its users post. That sentence is a large part of why the internet looks the way '
      + 'it does.',
      'It could easily not exist. The rest of the law it came in was struck down by the Supreme Court in '
      + '1997 as a violation of free speech. Section 230 survived. Politicians in both parties have since '
      + 'proposed repealing or narrowing it, for opposite reasons, and it is still there.',
      'So when you argue about who should decide, remember that the current arrangement is not the natural '
      + 'state of things. It is one sentence that survived a court case, and people are still fighting over '
      + 'it right now.'
    ]
  },

  takeaway: 'Three answers, each with a real case and a real cost. This argument has been had four times '
    + 'before about four different media, and it usually ended in self-regulation under pressure. Your job '
    + 'is not to win it today. It is to state the other side well enough that they would recognize it.',

  questions: [
    { skill: 'Synthesizing Patterns',
      text: 'Pick the position you do NOT hold. State the strongest version of it, in your own words, as '
        + 'well as you possibly can.',
      startHere: 'Three or four sentences making the best case for a side you disagree with.',
      pushFurther: 'Then name the one fact that would make that side clearly right.' },
    { skill: 'Generalizing from Evidence',
      text: 'Pick one earlier fight: comic books, television, music lyrics, or video games. What happened, '
        + 'and what does it predict about this one?',
      startHere: 'Say what happened and one thing it predicts.',
      pushFurther: 'Name one way social media is genuinely different, and say whether that breaks your prediction.' },
    { skill: 'Generalizing from Evidence',
      text: 'What evidence would change your mind? Be specific enough that somebody could go looking for it.',
      startHere: 'One thing. It has to be something a person could actually find out.',
      pushFurther: 'Say why you have not gone looking for it yet.' }
  ]
};

module.exports = { meta: UNIT, topics: [TOPIC_1, TOPIC_2, TOPIC_3, TOPIC_4, TOPIC_5, TOPIC_6] };
