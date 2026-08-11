'use strict';

/**
 * Social Media unit, Blocks 3 to 5.
 *
 * Blocks 1 and 2 have no Brief: Block 1 is the slide deck and the paper trace,
 * Block 2 is the film. The Brief exists for the blocks that need a reading
 * backdrop, which is what it is for.
 *
 * REGISTER. These are written to match the Block 1 deck, not the Foundations-style
 * reading. The deck's own note is the style guide:
 *
 *     "these definitions are deliberately plainer than a dictionary. Precision
 *      here costs comprehension, and comprehension is what the rest of the block
 *      runs on."
 *
 * So: short sentences, one idea each, concrete before abstract, metaphors only
 * where they carry weight, and every key term defined in the sentence it first
 * appears in. Flat and curious, never ominous — the moment it sounds like an
 * adult warning them about screens, the room files it away and stops reading.
 *
 * Each block carries START HERE / PUSH FURTHER on its questions, the same two-tier
 * structure the deck uses, because that is the differentiation lever that already
 * works in this room.
 *
 * Every block also carries a `roadNotTaken` section. Tracing backwards from a
 * present-day outcome only ever surfaces the causes that led to it, so without a
 * deliberate alternative the past reads as a corridor. That section is the fix,
 * and it is why the history in these Briefs names dates and people.
 */

const UNIT = {
  unit: 'Social Media',
  unitKey: 'social-media',
  course: 'CURRENT EVENTS',
  // aiCoachUrl: set this once BeCurrent has its own MagicSchool bot. Leaving it
  // unset omits the coach section from every brief in this unit.
  aiCoachUrl: '',
  canvasSubmissionNote: 'Organize your thinking here, then submit your final work in Canvas.',
  competencies: {
    1: 'Cause and effect',
    2: 'Fallacies and propaganda',
    3: 'Synthesizing patterns',
    4: 'Hypotheses',
    5: 'Generalizing from evidence'
  }
};

// ── Block 3 ───────────────────────────────────────────────────────────────────
const BLOCK_3 = {
  n: 3,
  key: 'sm-b3',
  slug: 'the-algorithm',
  block: 'Block 3',
  title: 'Inside the <em>Algorithm</em> Box',
  eyebrow: 'Social Media · Block 3',
  deck: 'Almost every chain in the room had a box where the app watches what you do. Today you open it.',
  subtitle: 'What the app counts, and what it does with the count',
  skillTags: ['Cause and Effect', 'Hypotheses'],

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
  // Empty means the block renders no video section at all, not an empty one.
  videos: [],

  support: [
    { label: 'Before You Read',
      body: 'In Block 1 you built a chain. Almost everybody had a box in the middle where the app '
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
        { label: 'AP Skill Parallel',
          body: 'This is causation. Two things happened at once: ranking solved a problem for users, and '
            + 'ranking made more money. When two causes point the same direction, it is hard to tell which '
            + 'one was doing the work. Historians run into this constantly.' }
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

// ── Block 4 ───────────────────────────────────────────────────────────────────
const BLOCK_4 = {
  n: 4,
  key: 'sm-b4',
  slug: 'privacy-policy',
  block: 'Block 4',
  title: 'Go <em>Check</em> It Yourself',
  eyebrow: 'Social Media · Block 4',
  deck: 'Half this room wrote "they sell my data." Today we read the document and find out.',
  subtitle: 'Reading a privacy policy as a primary source',
  skillTags: ['Generalizing from Evidence', 'Sourcing'],

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
  // Empty means the block renders no video section at all, not an empty one.
  videos: [],

  support: [
    { label: 'Before You Read',
      body: 'In Block 1 a lot of chains said the company <em>sells your data</em>. I told you that was '
        + 'mostly wrong and I did not prove it. Fair enough. Today you check me.' },
    { label: 'Reading Target',
      body: 'By the end you should be able to point at a specific sentence in a real document and say '
        + 'what it does and does not claim.' }
  ],

  terms: ['primary source', 'privacy policy', 'third party', 'consent', 'data broker'],

  sections: [
    {
      label: 'Part One',
      heading: 'A primary source is the thing itself',
      paragraphs: [
        'A <span class="kt">primary source</span> is the original document, made by the people involved, '
        + 'at the time. Not somebody explaining it later. The actual thing.',
        'A news article about a company\'s privacy rules is a secondary source. The company\'s '
        + '<span class="kt">privacy policy</span> is the primary source. It is written by the company, it '
        + 'is the document they can be held to, and anybody can read it for free right now.',
        'This is one of the few times in this class where the primary source is sitting in your pocket. '
        + 'Historians would take that trade instantly.'
      ],
      callouts: [
        { label: 'Why It Matters',
          body: 'When you can read the original, you do not have to trust anybody\'s summary of it. '
            + 'Including mine. That is the whole point of today.' }
      ]
    },
    {
      label: 'Part Two',
      heading: 'How to read a document that does not want to be read',
      paragraphs: [
        'These documents are long on purpose. Not to hide things exactly, but because every sentence has '
        + 'been checked by lawyers who are protecting the company from being sued. Clear writing and legal '
        + 'safety are not the same goal.',
        'So do not read it front to back. Nobody does, including lawyers. Do this instead.',
        'Find the headings first. Almost every policy has a section called something like "Information we '
        + 'collect" and another called "How we share information." Those two are where your answer lives.',
        'Then use your browser\'s find function. Search the word <strong>sell</strong>. Search '
        + '<strong>share</strong>. Search <strong>advertis</strong>, without the ending, so it catches '
        + 'every version. Search <strong>partner</strong>. Read what comes back.',
        'You will notice something. The word "share" shows up constantly. The word "sell" often shows up '
        + 'only to say they <em>do not</em> do it. That gap between the two words is the finding.'
      ],
      callouts: [
        { label: 'Try This',
          body: 'A <span class="kt">third party</span> is anyone who is not you and not the company. Search '
            + 'that phrase. Count how many different kinds of third party the policy allows information to '
            + 'reach. Most students expect two or three.' }
      ]
    },
    {
      label: 'Part Three',
      heading: 'What the document actually says',
      paragraphs: [
        'The big platforms generally do not sell your personal information the way a '
        + '<span class="kt">data broker</span> does. A data broker is a company whose whole business is '
        + 'buying and selling files about people, and those companies exist and are worth knowing about. '
        + 'The large social platforms are usually not doing that.',
        'What the policy will describe instead is that they collect a great deal, they keep it, and they '
        + 'let advertisers use it to choose who sees an ad without handing the advertiser the underlying '
        + 'file.',
        'That is why your Block 1 chain was so close to right. The money does come from advertisers. But '
        + 'the thing being sold is <strong>access to you</strong>, and the company keeps the data because '
        + 'the data is what makes them the only place to buy that access.',
        'Being nearly right and then checking is not a failure. It is the entire method of this course.'
      ],
      callouts: [
        { label: 'Watch For',
          body: 'A policy saying "we do not sell your data" can be completely true and still not mean what '
            + 'you hoped. Read the next paragraph, which usually explains what they <em>do</em> do. The true '
            + 'sentence and the reassuring sentence are not always the same sentence.' }
      ]
    },
    {
      label: 'Part Four',
      heading: 'Source the document, not just the claim',
      paragraphs: [
        'Every document has an author, a date, and an audience. Ask all three, every time, for the rest of '
        + 'your life.',
        'Who wrote it? A company\'s legal team. Not a neutral party. Not a regulator.',
        'When was it updated? Policies change, and the date is usually at the top or bottom. If it changed '
        + 'recently, something made it change. That is a lead.',
        'Who is it written to protect? Read a few sentences and ask honestly whether they read like a '
        + 'promise to you or a shield for them. Often both, in the same sentence.',
        '<span class="kt">Consent</span> is the word to watch hardest. In these documents consent usually '
        + 'means you kept using the product. Not that anyone asked you a question you could answer no to.'
      ],
      callouts: [
        { label: 'The Standard',
          body: 'From here on, "I read it somewhere" is not evidence in this class. Evidence is a quote, '
            + 'from a named document, with a date. That standard applies to me too.' }
      ]
    }
  ],

  roadNotTaken: {
    label: 'The Road Not Taken',
    heading: 'These documents exist because of specific fights, not because companies volunteered',
    paragraphs: [
      'Privacy policies did not appear because companies decided you deserved an explanation. They exist '
      + 'because laws made them exist, and each law came out of an argument somebody won.',
      'In 1998 Congress passed COPPA, which set rules about children under 13 online, which is why every '
      + 'app asks your birthday. In 2018 the European Union\'s GDPR took effect, which is why the whole '
      + 'internet suddenly filled with cookie banners that year. In 2020 California\'s CCPA gave people '
      + 'there the right to tell a company not to sell their information, which is why some sites show you '
      + 'a "Do Not Sell My Info" link and others do not.',
      'Notice the pattern. Each rule covers a specific group of people, in a specific place, at a specific '
      + 'time. There was no single moment when privacy rules were settled, and there is no reason to think '
      + 'the current set is final. Other rules were proposed and lost. Some are being argued about now.'
    ]
  },

  takeaway: 'The privacy policy is a primary source you can read for free. Search it rather than reading '
    + 'it. "Share" and "sell" are different words doing different work, and the gap between them is where '
    + 'the real answer lives.',

  questions: [
    { skill: 'Sourcing',
      text: 'Find the sentence in a real privacy policy that comes closest to saying "we sell your data." '
        + 'Quote it exactly. Then say whether it actually says that.',
      startHere: 'Copy one sentence and add one sentence of your own about it.',
      pushFurther: 'Quote the sentence right after it, and explain what the pair together allows.' },
    { skill: 'Sourcing',
      text: 'For the policy you read: who wrote it, when was it last updated, and who does it protect?',
      startHere: 'Answer all three. One line each is enough.',
      pushFurther: 'Find something in it that reads more like a shield for the company than a promise to you, and quote it.' },
    { skill: 'Generalizing from Evidence',
      text: 'Look back at the chain you drew in Block 1. Does the policy support it, contradict it, or say '
        + 'nothing about it? Point to the sentence that decides it.',
      startHere: 'Pick one box from your chain and one sentence from the policy.',
      pushFurther: 'Redraw the box you got wrong, and say what evidence made you change it.' }
  ]
};

// ── Block 5 ───────────────────────────────────────────────────────────────────
const BLOCK_5 = {
  n: 5,
  key: 'sm-b5',
  slug: 'who-decides',
  block: 'Block 5',
  title: 'Who Gets to <em>Decide</em>?',
  eyebrow: 'Social Media · Block 5',
  deck: 'I told you on the first day I would ask you a hard question at the end. Here it is.',
  subtitle: 'You, the company, or the government',
  skillTags: ['Synthesizing Patterns', 'Generalizing from Evidence'],

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
  // Empty means the block renders no video section at all, not an empty one.
  videos: [],

  support: [
    { label: 'Before You Read',
      body: 'You now know how the machine works. You traced the money, watched the film and took it apart, '
        + 'opened the algorithm box, and read the company\'s own document. That was all so today would be '
        + 'a real argument instead of opinions.' },
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
        { label: 'AP Skill Parallel',
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

module.exports = { meta: UNIT, blocks: [BLOCK_3, BLOCK_4, BLOCK_5] };
