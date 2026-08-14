'use strict';

/**
 * Week 01 content, the orientation week.
 *
 * This week is deliberately evergreen. It teaches the method the other 35 weeks
 * apply, so it does not go stale over the summer and it is the week to copy when
 * starting a new one.
 *
 * The outlets in `coverage` and the statements in `claims` are CONSTRUCTED
 * teaching examples, not real reporting, and they say so on the page. Week 02
 * onward carry real stories with real links. Never present an invented headline
 * as something a real outlet published: the whole course is about the difference
 * between what was reported and what was made up.
 */

module.exports = {
  meta: {
    course: 'CURRENT EVENTS',
    week: 'Week 01',
    weekKey: 'w01',
    weekNumber: 1,
    dateRange: 'August 10 to August 14, 2026',
    title: 'How to Read the News',
    subtitle: 'The five questions you will ask about every story this year',
    // aiCoachUrl: set this once BeCurrent has its own MagicSchool bot. Leaving it
    // unset omits the coach section from this brief.
    aiCoachUrl: '',
    canvasSubmissionNote: 'Organize your thinking here, then submit your final work in Canvas.'
  },

  learningTargets: [
    { skill: 'Sourcing', target: 'I can identify who produced a news story and what they stand to gain from it.' },
    { skill: 'Claim and Evidence', target: 'I can separate a verifiable fact from a claim and from an opinion in the same paragraph.' },
    { skill: 'Framing', target: 'I can explain how two outlets reporting the same facts can leave readers with different impressions.' },
    { skill: 'Corroboration', target: 'I can check a surprising claim against a second independent source before repeating it.' }
  ],

  successCriteria: [
    { skill: 'Sourcing', criteria: 'I can name the outlet, the reporter, and the date on any story I bring to class.' },
    { skill: 'Claim and Evidence', criteria: 'I can point to the sentence in a story that would change my mind if it turned out to be false.' },
    { skill: 'Framing', criteria: 'I can rewrite a headline two ways, both accurate, that push a reader in opposite directions.' },
    { skill: 'Corroboration', criteria: 'I can describe the lateral reading steps I took, not just the conclusion I reached.' }
  ],

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

  // ── Module 01 ───────────────────────────────────────────────────────────────
  where: {
    intro: 'Every story happens somewhere, and the where is usually doing more work than the headline admits. '
      + 'This week there is no single place to find, because the skill itself is the subject. Instead, practice the habit: '
      + 'pick any story from the last few days and locate it before you form an opinion about it.',
    mapUrl: '',
    mapCaption: '',
    places: [
      'The place the events happened.',
      'The place the outlet that reported it is based.',
      'The place the reporter was standing, if the story says.',
      'The places affected that the story never mentions.'
    ],
    prompt: 'Choose any news story from the past week. Name where the events happened, where the outlet is based, and '
      + 'one place affected by the story that the story itself never mentions. Then explain what the story would have '
      + 'emphasized differently if it had been reported from that third place.'
  },

  // ── Module 02, the brief ────────────────────────────────────────────────────
  eyebrow: 'Week 01 Brief',
  title: 'The Five <em>Questions</em>',
  deck: 'A method for reading anything, including the things you already agree with.',
  skillTags: ['Sourcing', 'Claim and Evidence', 'Framing', 'Corroboration'],

  support: [
    { label: 'Before You Read',
      body: 'You already evaluate sources constantly. You know which friend exaggerates and which one you can trust '
        + 'about a score. This week just makes that instinct explicit enough to use on a stranger in print.' },
    { label: 'Reading Target',
      body: 'By the end, you should be able to run all five questions on a story in about two minutes, and know which '
        + 'of the five you personally skip when a story flatters what you already think.' }
  ],

  terms: ['source', 'claim', 'evidence', 'framing', 'lateral reading', 'corroboration', 'primary source', 'aggregator'],

  sections: [
    {
      label: 'Question One',
      heading: 'Who is telling me this?',
      paragraphs: [
        'Every story has a <span class="kt">source</span>, and the source is not the website you found it on. A post '
        + 'summarizing an article that summarized a press release has three layers between you and the event. Each '
        + 'layer is a chance for a detail to shift, and none of them are lying on purpose.',
        'The habit worth building is boring: before you react, find the outlet, the reporter, and the date. An '
        + '<span class="kt">aggregator</span> that carries no reporter name and no date is not a source, it is a '
        + 'delivery mechanism. Track down what it is delivering.',
        'The date matters more than students expect. A great deal of what circulates as breaking news is a real story '
        + 'from three years ago, being read by people who assume it happened this morning.'
      ],
      callouts: [
        { label: 'Try It',
          body: 'Open the last news story you shared or talked about. Can you name the outlet, the reporter, and the '
            + 'date without looking? If not, that is not a character flaw, it is the normal condition. Look now.' }
      ]
    },
    {
      label: 'Question Two',
      heading: 'What here is a fact, and what is a claim?',
      paragraphs: [
        'A <span class="kt">claim</span> is a statement someone wants you to accept. <span class="kt">Evidence</span> '
        + 'is what would let you check it. "The bill passed 218 to 210" is checkable. "The bill will devastate small '
        + 'business" is a claim about the future, which no amount of confidence can turn into a fact.',
        'Both belong in journalism. A story with no claims in it would be a list of numbers. The skill is not '
        + 'suspicion, it is sorting: knowing at every sentence which kind of statement you are reading.',
        'The most useful test is to ask what would change your mind. If nothing in a story could turn out to be false '
        + 'in a way that mattered to you, you are probably reading opinion, or you have stopped reading and started '
        + 'agreeing.'
      ],
      callouts: [
        { label: 'Watch For',
          body: 'Verbs that smuggle in a claim. "Admitted", "revealed", and "slammed" all assert something about a '
            + 'person\'s motive that a recording of the event would not show. "Said" is doing less work, which is '
            + 'exactly why careful reporters use it so much.' }
      ]
    },
    {
      label: 'Question Three',
      heading: 'What did they choose to put first?',
      paragraphs: [
        '<span class="kt">Framing</span> is the set of choices made before a single sentence is written: what to lead '
        + 'with, whom to quote first, which number to put in the headline. Two outlets can report identical, accurate '
        + 'facts and leave readers with opposite impressions, without either one printing something false.',
        'This is the hardest of the five questions, because framing is invisible when it matches what you already '
        + 'believe. It only looks like bias when it is pushing the other way. That asymmetry is not a flaw in you, it '
        + 'is how attention works, and the only fix is a deliberate second look.',
        'A practical move: read the same story from two outlets you expect to differ, and instead of scoring them, '
        + 'list what each chose to lead with. The list is more informative than the verdict.'
      ],
      callouts: [
        { label: 'Skill Focus',
          body: 'This is the same muscle as point of view in any document, a memo, a court filing, a press '
            + 'release. You are asking what the writer\'s position lets them see clearly, and what it lets them '
            + 'leave out.' }
      ]
    },
    {
      label: 'Question Four',
      heading: 'Who else is reporting it?',
      paragraphs: [
        '<span class="kt">Corroboration</span> means a second, independent source has the same information. '
        + 'Independent is the load-bearing word. Twelve sites that all cite the same original report are not twelve '
        + 'sources, they are one source with an echo.',
        '<span class="kt">Lateral reading</span> is the technique: instead of scrutinizing the page in front of you, '
        + 'open new tabs and read about the page. What do other outlets say about this one? Who funds it? Has this '
        + 'specific claim been checked already? Professional fact-checkers work this way, and it is faster than '
        + 'reading the original page more carefully.',
        'The surprise for most students is how quickly it works. Ninety seconds of lateral reading resolves most '
        + 'questions about whether something is worth taking seriously.'
      ],
      callouts: [
        { label: 'Try It',
          body: 'Take the most surprising claim you have seen online this week. Search the claim itself rather than '
            + 'the site that made it. What comes back, and how long did it take?' }
      ]
    },
    {
      label: 'Question Five',
      heading: 'What would I need to know to be wrong?',
      paragraphs: [
        'The last question is aimed inward, and it is the one that separates a person who follows the news from a '
        + 'person who collects ammunition. You are asking what evidence would change your position, and whether you '
        + 'would recognize it if you saw it.',
        'This is not a demand that you have no views. It is a demand that your views be the kind of thing that could '
        + 'in principle be wrong. A position no evidence could touch is not a strong position, it is a closed one.',
        'In this class you will be asked for this in writing, regularly, and you will not be graded on which side you '
        + 'land. You will be graded on whether you can state the strongest version of the argument against you.'
      ],
      callouts: [
        { label: 'The Standard',
          body: 'A complete answer in this course names the evidence that would change your mind, specifically enough '
            + 'that someone could go looking for it.' }
      ]
    }
  ],

  takeaway: 'Who is telling me this, what is fact versus claim, what did they put first, who else has it, and what '
    + 'would make me wrong. Five questions, about two minutes, every story.',

  questions: [
    { skill: 'Sourcing',
      text: 'Pick a news story from this week. Name the outlet, the reporter, and the date, then explain how many '
        + 'layers sat between you and the original event when you first encountered it.' },
    { skill: 'Claim and Evidence',
      text: 'From that same story, quote one sentence that is a checkable fact and one that is a claim. Explain what '
        + 'evidence would settle the second one.' },
    { skill: 'Framing',
      text: 'Write two headlines for that story. Both must be accurate, and they must push a reader in opposite '
        + 'directions. Then say which one you would have written without thinking about it, and why.' }
  ],

  // ── Module 03 ───────────────────────────────────────────────────────────────
  background: {
    title: 'Where these habits came from',
    intro: 'The five questions are not invented for this class. They come out of a long argument about what news is '
      + 'for, and a shorter, sharper argument about what happens when the cost of publishing falls to zero.',
    cards: [
      { title: 'The verification norm is young',
        bullets: [
          'For most of the history of printed news, the point was <strong>partisan advocacy</strong>, not neutrality. '
            + 'Papers were openly attached to factions and nobody expected otherwise.',
          'The idea that a reporter should verify a claim before printing it, and separate news from opinion on the '
            + 'page, hardened into a professional norm largely across the <strong>late 1800s and early 1900s</strong>.',
          'That means the "traditional" newspaper standard students are told to trust is a recent invention, and it '
            + 'was a response to a specific problem: papers competing on sensation were getting caught out.'
        ],
        img: '', caption: '' },
      { title: 'Wire services made facts portable',
        bullets: [
          'Cooperative <strong>wire services</strong> sold the same dispatch to papers across the political spectrum.',
          'A story that had to be printable by outlets that disagreed with each other had to strip out the advocacy. '
            + 'Commercial pressure, not idealism, pushed toward plainer prose.',
          'This is why <strong>corroboration</strong> is trickier than it looks today. Many outlets carrying the same '
            + 'story has meant "one wire dispatch, widely reprinted" for well over a century.'
        ],
        img: '', caption: '' },
      { title: 'Broadcast made the audience one room',
        bullets: [
          'Radio and then television compressed the news into a <strong>shared national moment</strong>, with a small '
            + 'number of editors deciding what it contained.',
          'That produced an unusual and probably unrepeatable period in which most people encountered roughly the '
            + 'same set of stories on the same evening.',
          'It also concentrated <strong>framing</strong> power enormously. The narrowness people now remember as '
            + 'trustworthiness was partly just a lack of alternatives.'
        ],
        img: '', caption: '' },
      { title: 'Then publishing became free',
        bullets: [
          'When the cost of distribution collapsed, the <strong>bottleneck moved</strong> from printing to attention.',
          'What competes now is not access to a press but the ability to be clicked, which rewards emotional '
            + 'intensity in a way a subscription newspaper did not.',
          'This is why <strong>lateral reading</strong> beats close reading of a single page. Evaluating a source by '
            + 'how professional it looks stopped working the moment looking professional became free.'
        ],
        img: '', caption: '' },
      { title: 'Which is why the five questions',
        bullets: [
          'Each question targets a specific failure the history above produced: <strong>layers</strong> between you '
            + 'and the event, <strong>claims</strong> dressed as facts, invisible <strong>framing</strong>, and '
            + 'echo mistaken for confirmation.',
          'The fifth question targets you rather than the story, because every study of this stuff finds the same '
            + 'thing: people apply their scrutiny unevenly, and hardest to what they already dislike.',
          'None of this requires cynicism. The goal is a reader who can tell good reporting from bad, which is the '
            + 'opposite of a reader who trusts nothing.'
        ],
        img: '', caption: '' }
    ]
  },

  // ── Module 04 ───────────────────────────────────────────────────────────────
  coverage: {
    intro: 'Below are two write-ups of the same imaginary town council vote. These are <strong>constructed teaching '
      + 'examples</strong>, not real articles, so that the framing is exaggerated enough to see. Every fact in both is '
      + 'identical: the vote was 5 to 2, the budget line is $1.4 million, and construction would start in March.',
    outlets: [
      { name: 'Example A, The Riverside Ledger',
        headline: 'Council approves $1.4M road repair, work to begin in March',
        lede: 'The city council voted 5 to 2 Tuesday to fund resurfacing on Mill Street, allocating $1.4 million from '
          + 'the capital reserve. Construction is scheduled to begin in March. Two members opposed, citing the '
          + 'reserve balance.',
        url: '' },
      { name: 'Example B, Channel 9 Action News',
        headline: 'Council drains reserve fund over objections as Mill Street costs balloon',
        lede: 'Despite opposition, a divided council moved Tuesday to pull $1.4 million out of the city\'s capital '
          + 'reserve for Mill Street, with residents facing construction disruption starting in March. The 5 to 2 '
          + 'vote came after two members warned about the fund\'s balance.',
        url: '' }
    ],
    prompt: 'Both write-ups contain the same facts and neither states anything false. List every framing choice you '
      + 'can find that differs between them, headline verbs included. Then name which version you found more '
      + 'trustworthy on first read, and try to say honestly why.'
  },

  // ── Module 05 ───────────────────────────────────────────────────────────────
  sourceCheck: {
    intro: 'Lateral reading means leaving the page to find out about the page. You are not going to read the article '
      + 'more carefully, you are going to spend ninety seconds finding out who wrote it and whether anyone else '
      + 'confirms it. Work the steps in order and time yourself.',
    steps: [
      'Open a new tab. Do not evaluate the original page yet, and ignore how professional it looks.',
      'Search the name of the outlet, plus a word like "funding" or "owner". Who pays for it, and who founded it?',
      'Search the central claim itself, in your own words, not the outlet\'s. Who else reports it?',
      'Check whether the other results are independent, or all trace back to the same original report.',
      'Look for the primary source: the study, the filing, the transcript, the actual document being described.',
      'Now go back to the original page, and decide what weight it has earned.'
    ],
    prompt: 'Run these six steps on any story you have seen this week that surprised you. Report what you found at '
      + 'each step, how long the whole thing took, and whether your view of the story changed. If it did not change, '
      + 'say what would have changed it.'
  },

  // ── Module 06 ───────────────────────────────────────────────────────────────
  claims: {
    intro: 'Six statements, drawn from the constructed council story in Module 04. Sort each into <strong>verifiable '
      + 'fact</strong>, <strong>claim</strong>, or <strong>opinion</strong>. Some are deliberately borderline, and the '
      + 'borderline ones are where the actual thinking happens.',
    statements: [
      { text: 'The council voted 5 to 2.', kind: 'fact' },
      { text: 'The allocation was $1.4 million from the capital reserve.', kind: 'fact' },
      { text: 'Construction will disrupt residents starting in March.', kind: 'claim' },
      { text: 'Mill Street costs have ballooned.', kind: 'claim' },
      { text: 'The council was right to prioritize road repair over the reserve balance.', kind: 'opinion' },
      { text: 'Two members warned about the fund\'s balance.', kind: 'fact' }
    ],
    prompt: 'Sort all six into fact, claim, or opinion, and for each one name the test you used. For the two you found '
      + 'hardest to place, explain what extra information would let you decide.'
  },

  // ── Module 07 ───────────────────────────────────────────────────────────────
  deliberation: {
    title: 'The Deliberation',
    desc: 'Take a position, hear the strongest version of the other side, then revise.',
    question: 'Should a social platform label a post that is accurate but misleading?',
    url: ''
  },

  // ── Module 08 ───────────────────────────────────────────────────────────────
  checkpoint: {
    intro: 'This is the week\'s assessment. You may use the brief and your notes. Answer in one connected piece of '
      + 'writing rather than as a numbered list, because the point is whether the five questions work together.',
    questions: [
      { q: 'Which of the five questions do you personally skip when a story confirms what you already think?', skill: 'Metacognition' },
      { q: 'Why is "twelve sites reported it" weaker evidence than it sounds?', skill: 'Corroboration' },
      { q: 'Give an example of a true headline that misleads, and explain the mechanism.', skill: 'Framing' }
    ],
    prompt: 'Answer all three questions above in a single connected paragraph of six to ten sentences. Name the '
      + 'specific evidence that would change your mind on the second one.'
  }
};
