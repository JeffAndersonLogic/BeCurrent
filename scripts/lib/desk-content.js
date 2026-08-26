'use strict';

/**
 * The Desk 2.0: the daily news habit.
 *
 * The public page is generated once; current reporting lives in
 * assets/data/daily-news.js and is refreshed separately. That keeps the protocol
 * stable while allowing one teacher-selected Lead to change without rebuilding the
 * course. Every student also chooses one story of interest, Your Pick.
 *
 * Internal lane ids remain local/world for backwards compatibility with saved work,
 * the Canvas parser and the browser contract. Their visible names now describe the
 * jobs students actually do: The Lead and Your Pick.
 *
 * No student reports out. The teacher may voice selected filings anonymously. The
 * daily writing is deliberately short, and voice typing or a paper card remain
 * ordinary ways to produce it.
 */

const DESK = {
  meta: {
    course: 'CURRENT EVENTS',
    title: 'The Desk',
    deck: 'Know the Lead. Choose Your Pick. File both, decide what deserves attention, and keep a two-week news journal.',
    minutes: 32
  },

  routine: [
    {
      n: 1,
      minutes: 7,
      name: 'Know the Lead',
      what: 'Start with the teacher-selected story the whole room shares. Scan the reporting and identify the actual event.',
      why: 'A common Lead gives every student one piece of shared current knowledge without requiring prior news habits at home.'
    },
    {
      n: 2,
      minutes: 6,
      name: 'Choose Your Pick',
      what: 'Choose one other story that genuinely interests you. Use the Current Wire or Source Shelf when you need somewhere to look.',
      why: 'Choice keeps the daily habit broad enough for technology, culture, sports business, science, local government and other stories students actually notice.'
    },
    {
      n: 3,
      minutes: 11,
      name: 'File Both',
      what: 'Write what happened and why it matters. The Lead source facts are already supplied; add the source facts for Your Pick.',
      why: 'The daily product stays short. Source facts are lookups; the writing asks students to frame the event rather than retell an article.'
    },
    {
      n: 4,
      minutes: 4,
      name: 'Make One Judgment',
      what: 'Decide which of the two stories deserves more attention and explain why.',
      why: 'A significance judgment turns headline collection into historical thinking without adding another long response.'
    },
    {
      n: 5,
      minutes: 4,
      name: 'Copy My Desk',
      what: 'Gather the growing two-week News Log and paste it into Canvas before leaving.',
      why: 'Canvas is the backup. Student writing otherwise remains only in the browser where it was typed.'
    }
  ],

  lanes: [
    {
      id: 'local',
      name: 'The Lead',
      scope: 'One teacher-selected current story that everybody should know.',
      question: 'What actually happened, and why does this story deserve the room’s attention?',
      note: 'The Lead replaces the old requirement that every student hunt for a local story every day. It creates common knowledge and removes repeated source-search friction.'
    },
    {
      id: 'world',
      name: 'Your Pick',
      scope: 'One story you choose because it interests you: local, U.S., world, economy, technology, science, culture, sports business or another credible beat.',
      question: 'What happened in the story you chose, and which of today’s two stories deserves more attention?',
      note: 'Personal choice is the second half of the habit. At least one Your Pick per two-week News Log should be local, rather than forcing a local story every class period.'
    }
  ],

  story: {
    intro: 'The Lead and Your Pick. Source facts are lookups; the writing stays short.',
    facts: [
      { id: 'outlet', label: 'Outlet', ask: 'Who reported it?', placeholder: 'Reuters, Times Sentinel, BBC News…' },
      { id: 'date', label: 'Published', ask: 'When was it published?', placeholder: 'Month day, year' },
      { id: 'link', label: 'Link', ask: 'Paste the link so you can find it again.', placeholder: 'https://…' }
    ],
    questions: [
      {
        id: 'what',
        skill: 'Framing',
        label: 'What happened',
        text: 'What actually happened? Give the event in two sentences, in your own words.',
        startHere: 'Name the change, decision, discovery or event. Do not retell the entire article.',
        pushFurther: 'How did the outlet frame the event, and what would change if you described it more neutrally?'
      },
      {
        id: 'why',
        skill: 'Significance',
        label: 'Why it matters / attention',
        text: 'Explain why the story matters or why it deserves attention.',
        startHere: 'Name who is affected, what changed, or what is likely to happen next.',
        pushFurther: 'Why is this being covered at all, and what makes it more or less significant than another story today?'
      }
    ],
    ways: [
      'Type it on this page. It saves in this browser as you go.',
      'Dictate it with voice typing.',
      'Write it on a paper card and hand it in.'
    ]
  },

  sources: [
    {
      group: 'Start here',
      what: 'Fast ways to scan before you choose Your Pick.',
      links: [
        { name: 'CNN 10', url: 'https://www.cnn.com/cnn10', note: 'A short shared news overview.' },
        { name: 'The Week', url: 'https://theweek.com', note: 'Summaries that often show how multiple outlets cover the same issue.' }
      ]
    },
    {
      group: 'Local',
      what: 'Use this shelf when today is your local pick.',
      links: [
        { name: 'Times Sentinel', url: 'https://www.timessentinel.com/', note: 'Zionsville and Boone County reporting.' },
        { name: 'Current in Zionsville', url: 'https://youarecurrent.com/category/zionsville/', note: 'Community coverage: schools, town government and local business.' },
        { name: 'Search Zionsville news', url: 'https://news.google.com/search?q=Zionsville%20Indiana', note: 'Search recent Zionsville coverage across outlets.' }
      ]
    },
    {
      group: 'National or International',
      what: 'Wires, broadcasters and publications for U.S. and world reporting.',
      links: [
        { name: 'Associated Press', url: 'https://apnews.com', note: 'U.S. wire service.' },
        { name: 'Reuters', url: 'https://www.reuters.com', note: 'International wire service.' },
        { name: 'NPR', url: 'https://www.npr.org', note: 'U.S. public radio reporting.' },
        { name: 'CNN', url: 'https://www.cnn.com', note: 'U.S. national and international reporting.' },
        { name: 'Fox News', url: 'https://www.foxnews.com', note: 'U.S. national and international reporting.' },
        { name: 'NewsNation', url: 'https://www.newsnationnow.com', note: 'U.S. national reporting.' },
        { name: 'BBC News', url: 'https://www.bbc.com/news', note: 'U.K. public broadcaster with global coverage.' },
        { name: 'Newsweek', url: 'https://www.newsweek.com', note: 'U.S. news magazine.' },
        { name: 'Bloomberg', url: 'https://www.bloomberg.com', note: 'Business, markets and economic reporting.' },
        { name: 'Forbes', url: 'https://www.forbes.com', note: 'Business coverage; check whether a piece is staff reporting or a contributor article.' },
        { name: 'Search the news', url: 'https://news.google.com', note: 'Search one topic across multiple outlets.' }
      ]
    }
  ],

  log: {
    anchorMonday: '2026-08-24',
    weeks: 2,
    periods: 5
  },

  accountability: {
    daily: 'File The Lead and Your Pick, make one significance judgment, then copy the growing News Log into Canvas.',
    written: 'One News Log every two weeks in Canvas. Paste the growing log into the same assignment again each class period; the last attempt is the graded artifact.',
    note: 'At least one Your Pick during each two-week News Log should be local. Pasting every class period is also the backup for work stored in the browser.'
  },

  rules: [
    { rule: 'The Lead is shared; Your Pick is yours.', why: 'The class builds common current knowledge without giving up personal interest.' },
    { rule: 'At least one Your Pick per News Log is local.', why: 'Local news stays part of the course without turning every day into the same scavenger hunt.' },
    { rule: 'Your name is never put on a filing unless you choose that.', why: 'The teacher can discuss anonymous work without creating a daily public-speaking demand.' },
    { rule: 'Your work stays in this browser until you copy it into Canvas.', why: 'Nothing on The Desk sends student writing anywhere on its own.' }
  ]
};

module.exports = DESK;
