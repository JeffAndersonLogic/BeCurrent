'use strict';

/**
 * Iran at War, the Reverse History investigation.
 *
 * The Iran pages use a purpose-built long-form renderer rather than the generic
 * Brief template. This module is still the instructional source of truth: the
 * browser layer, lesson plan, TODAY board, and Canvas documents all read the same
 * topic titles, targets, criteria, prompts, and page routes from here.
 */

const UNIT = {
  unit: 'Iran at War',
  unitKey: 'iran',
  code: 'IR',
  course: 'CURRENT EVENTS',
  renderer: 'reverse-history',
  topics: 8,
  reviewed: '2026-09-04',
  canvasSubmissionNote: 'Gather this topic on the page, copy it, and paste it into Canvas as Text Entry.',
  overview: 'Start with the war students are watching, then trace the conflict backward through geography, foreign intervention, revolution, invasion, regional strategy, nuclear diplomacy, and direct escalation. The unit ends with a ranked causal argument rather than a hunt for one magic cause.',
  terminalQuestion: 'Was the 2026 Iran War mainly the result of recent decisions, or decades of unresolved conflict?',
  competencies: {
    1: 'Cause and effect',
    2: 'Sourcing and evidence',
    3: 'Perspective and interpretation',
    4: 'Geography and power',
    5: 'Constructing arguments'
  }
};

function target(skill, text) { return { skill, target: text }; }
function criterion(skill, text) { return { skill, criteria: text }; }
function question(skill, group, text) { return { skill, group, text }; }

const TOPICS = [
  {
    n: 1,
    topic: 'Topic 1',
    key: 'iran-t01',
    page: 'index.html',
    title: 'The War They Are Watching',
    subtitle: 'Current anchor · 2026',
    skillTags: ['Geography and Power', 'Sourcing and Evidence', 'Hypotheses'],
    competencies: [2, 4, 5],
    overview: 'Establish what is happening now, locate the pressure points, and separate the immediate trigger from the deeper conditions students will test across the unit.',
    inClass: 'Map the conflict, build a starting hypothesis, distinguish facts from claims about motive, and identify the historical question that most needs an answer.',
    learningTargets: [
      target('Geography and Power', 'I can explain how Iran, Israel, U.S. regional positions, and the Strait of Hormuz shape the conflict.'),
      target('Sourcing and Evidence', 'I can separate a verifiable event from a claim about why a government acted.'),
      target('Hypotheses', 'I can propose a starting explanation and identify what evidence could change it.')
    ],
    successCriteria: [
      criterion('Geography and Power', 'I can connect one location to a specific military, economic, or diplomatic consequence.'),
      criterion('Sourcing and Evidence', 'I can name one verified fact, one interpretation, and one unanswered historical question.'),
      criterion('Hypotheses', 'I can rank up to three possible causes and explain why one currently deserves the most weight.')
    ],
    questions: [
      question('Geography and Power', 'geography', 'Which piece of geography gives Iran the most leverage?'),
      question('Hypotheses', 'prediction', 'What do you think best explains how this conflict became possible?'),
      question('Cause and Effect', 'reverse-reason', 'Why did you choose those explanations?'),
      question('Sourcing and Evidence', 'evidence', 'Name one fact and one unanswered question.'),
      question('Perspective and Interpretation', 'perspective', 'What evidence would help test either frame?'),
      question('Constructing Arguments', 'claim', 'What part of this conflict most needs a historical explanation?')
    ],
    terms: ['immediate trigger', 'historical cause', 'chokepoint', 'deterrence', 'hypothesis'],
    videos: []
  },
  {
    n: 2,
    topic: 'Topic 2',
    key: 'iran-t02',
    page: 'topic-02-1953.html',
    title: 'The Coup',
    subtitle: 'Reverse History stop · 1951–1953',
    skillTags: ['Sourcing and Evidence', 'Cause and Effect', 'Contingency'],
    competencies: [1, 2, 3, 5],
    overview: 'Examine oil nationalization, the political crisis around Mohammad Mosaddegh, documented U.S. and British covert involvement, and the event\'s long afterlife in Iranian political memory.',
    inClass: 'Read a declassified American record, compare competing frames, test a counterfactual, and make a proportional claim about the weight 1953 should carry.',
    learningTargets: [
      target('Sourcing and Evidence', 'I can use a declassified record to establish U.S. involvement without claiming the document proves everything about the coup.'),
      target('Cause and Effect', 'I can explain how oil, sovereignty, domestic politics, and Cold War fears interacted.'),
      target('Contingency', 'I can identify a decision that could plausibly have gone another way and explain why that matters.')
    ],
    successCriteria: [
      criterion('Sourcing and Evidence', 'I can state one claim the archive supports and one claim it cannot establish by itself.'),
      criterion('Cause and Effect', 'I can connect the 1953 intervention to later distrust through a clear mechanism rather than calling later conflict inevitable.'),
      criterion('Perspective and Interpretation', 'I can explain why U.S. Cold War and Iranian sovereignty frames could both persist.')
    ],
    questions: [
      question('Cause and Effect', 'reverse', 'Why might nationalizing oil be more than an economic decision?'),
      question('Sourcing and Evidence', 'evidence', 'What can the declassified record prove?'),
      question('Perspective and Interpretation', 'perspective', 'Why could both frames persist?'),
      question('Contingency', 'road', 'What decision seems most contingent?'),
      question('Constructing Arguments', 'claim', 'How much weight should 1953 carry in an explanation of the 2026 war?')
    ],
    terms: ['nationalization', 'sovereignty', 'covert operation', 'Mosaddegh', 'Shah'],
    videos: []
  },
  {
    n: 3,
    topic: 'Topic 3',
    key: 'iran-t03',
    page: 'topic-03-1979.html',
    title: 'The Ally Becomes the Enemy',
    subtitle: 'Reverse History stop · 1979',
    skillTags: ['Cause and Effect', 'Perspective and Interpretation', 'Comparison'],
    competencies: [1, 2, 3, 5],
    overview: 'Trace how opposition to the Shah became a broad revolution, how the Islamic Republic emerged, and how the hostage crisis created a powerful American grievance alongside Iran\'s memory of 1953.',
    inClass: 'Analyze several pressures behind the revolution, distinguish the two countries\' historical memories, and compare the explanatory power of 1953 and 1979.',
    learningTargets: [
      target('Cause and Effect', 'I can explain how repression, rapid modernization, inequality, religion, and foreign influence combined in the revolution.'),
      target('Perspective and Interpretation', 'I can distinguish the Iranian grievance associated with 1953 from the American grievance created in 1979.'),
      target('Comparison', 'I can compare 1953 and 1979 using evidence and a causal mechanism.')
    ],
    successCriteria: [
      criterion('Cause and Effect', 'I can explain why several groups opposed the Shah without pretending they wanted the same future.'),
      criterion('Sourcing and Evidence', 'I can use the opening-day hostage-crisis memorandum for what U.S. officials knew without treating it as proof of every participant\'s motive.'),
      criterion('Comparison', 'I can use one specific fact from each turning point to defend which changed the relationship more.')
    ],
    questions: [
      question('Cause and Effect', 'ally', 'Why can support for an ally create resentment toward the ally\'s supporter?'),
      question('Cause and Effect', 'revolution', 'Which pressure best explains why so many different groups could oppose the Shah at the same time?'),
      question('Sourcing and Evidence', 'hostages', 'How did the hostage crisis add something new to the relationship?'),
      question('Perspective and Interpretation', 'perspective', 'Which memory would make compromise harder later?'),
      question('Comparison', 'claim', 'Which transformed U.S.-Iran relations more: 1953 or 1979?')
    ],
    terms: ['Islamic Revolution', 'SAVAK', 'Ayatollah Khomeini', 'hostage crisis', 'historical memory'],
    videos: []
  },
  {
    n: 4,
    topic: 'Topic 4',
    key: 'iran-t04',
    page: 'topic-04-security.html',
    title: 'Why Fight Far From Home?',
    subtitle: 'Reverse History stop · 1980–1988',
    skillTags: ['Cause and Effect', 'Perspective and Interpretation', 'Strategy'],
    competencies: [1, 2, 3, 5],
    overview: 'Use the Iran-Iraq War to investigate why invasion, isolation, the IRGC, missiles, and relationships with armed groups became central to Iranian security strategy.',
    inClass: 'Build a causal mechanism from wartime experience to later deterrence, test the word proxy, and weigh defensive and power-projection interpretations.',
    learningTargets: [
      target('Cause and Effect', 'I can explain how the Iran-Iraq War shaped later security choices without treating it as the only cause.'),
      target('Strategy', 'I can distinguish deterrence, asymmetric strategy, and power projection.'),
      target('Perspective and Interpretation', 'I can explain why one strategy can look defensive to Iran and threatening to its neighbors.')
    ],
    successCriteria: [
      criterion('Cause and Effect', 'I can write the mechanism connecting invasion and isolation to later missiles or regional armed partnerships.'),
      criterion('Sourcing and Evidence', 'I can use a specific wartime or institutional fact instead of relying on the label proxy.'),
      criterion('Perspective and Interpretation', 'I can acknowledge evidence for both deterrence and power projection before weighing them.')
    ],
    questions: [
      question('Cause and Effect', 'invasion', 'What lesson might leaders draw from surviving a long invasion?'),
      question('Cause and Effect', 'mechanism', 'What is the mechanism connecting the Iran-Iraq War to later deterrence?'),
      question('Sourcing and Evidence', 'network', 'Why is “proxy” useful — and where can the word mislead?'),
      question('Perspective and Interpretation', 'perspective', 'Can both descriptions be true at the same time?'),
      question('Constructing Arguments', 'claim', 'To what extent can Iran\'s modern regional military strategy be explained by the Iran-Iraq War?')
    ],
    terms: ['Iran-Iraq War', 'IRGC', 'Quds Force', 'deterrence', 'asymmetric strategy', 'proxy'],
    videos: []
  },
  {
    n: 5,
    topic: 'Topic 5',
    key: 'iran-t05',
    page: 'topic-05-nuclear.html',
    title: 'The Nuclear Bargain',
    subtitle: 'Reverse History thread · 1957–2018',
    skillTags: ['Cause and Effect', 'Policy Tradeoffs', 'Sourcing and Evidence'],
    competencies: [1, 2, 3, 5],
    overview: 'Follow Iran\'s nuclear program from U.S.-Iranian cooperation through the JCPOA, U.S. withdrawal, restored sanctions, reduced compliance, and the return of coercive pressure.',
    inClass: 'Identify the JCPOA\'s actual trade, separate verification from political judgment, test the causal chain after 2018, and weigh the risks of an imperfect agreement against abandoning verified limits.',
    learningTargets: [
      target('Sourcing and Evidence', 'I can explain what the JCPOA limited, what inspectors verified, and what the agreement left outside its scope.'),
      target('Cause and Effect', 'I can test the chain connecting U.S. withdrawal, sanctions, Iranian compliance, nuclear activity, and military pressure.'),
      target('Policy Tradeoffs', 'I can compare the risks of maintaining an imperfect agreement with the risks of abandoning it.')
    ],
    successCriteria: [
      criterion('Sourcing and Evidence', 'I can describe the bargain as nuclear restrictions and monitoring in exchange for nuclear-related sanctions relief.'),
      criterion('Cause and Effect', 'I can identify the strongest and weakest arrows in the post-2018 causal chain.'),
      criterion('Constructing Arguments', 'I can argue whether the agreement\'s collapse made war more likely while acknowledging at least one other cause.')
    ],
    questions: [
      question('Historical Context', 'origins', 'Why does the U.S.-supported origin complicate a simple “Iran versus the world” nuclear story?'),
      question('Sourcing and Evidence', 'jcpoa', 'What problem did the JCPOA solve, and what problems did it deliberately leave outside the deal?'),
      question('Cause and Effect', 'withdrawal', 'Which arrow in the post-withdrawal chain is weakest?'),
      question('Policy Tradeoffs', 'perspective', 'Which risk seems larger: accepting an imperfect agreement or abandoning verified limits?'),
      question('Constructing Arguments', 'claim', 'Did the collapse of the nuclear agreement make eventual war substantially more likely?')
    ],
    terms: ['enrichment', 'IAEA', 'JCPOA', 'verification', 'sanctions relief'],
    videos: []
  },
  {
    n: 6,
    topic: 'Topic 6',
    key: 'iran-t06',
    page: 'topic-06-escalation.html',
    title: 'From Shadow War to Open War',
    subtitle: 'Reverse History stop · 2023–2026',
    skillTags: ['Cause and Effect', 'Turning Points', 'Perspective and Interpretation'],
    competencies: [1, 2, 3, 5],
    overview: 'Trace how covert and indirect conflict crossed into direct state-to-state attacks in 2024, expanded into major war in 2025, and produced the intermittent 2026 conflict.',
    inClass: 'Identify thresholds and precedents, compare restraint and escalation logics, and choose the moment when full-scale war became substantially more likely.',
    learningTargets: [
      target('Turning Points', 'I can distinguish a larger attack from an attack that changes what becomes thinkable next.'),
      target('Cause and Effect', 'I can explain how repeated retaliation can create path dependence without making war inevitable.'),
      target('Perspective and Interpretation', 'I can compare deterrence-as-restraint with deterrence-as-an-escalation ladder.')
    ],
    successCriteria: [
      criterion('Turning Points', 'I can use one event from 2024 and one from 2025 or 2026 to identify a changed threshold.'),
      criterion('Cause and Effect', 'I can explain how one round altered the options or expectations in the next round.'),
      criterion('Constructing Arguments', 'I can defend one turning point while addressing the strongest evidence for a different one.')
    ],
    questions: [
      question('Strategy', 'shadow', 'Why might rivals prefer a “shadow war” to direct war?'),
      question('Turning Points', 'direct', 'What changed in 2024 even though neither side chose full-scale war yet?'),
      question('Cause and Effect', 'war', 'Which matters more: the size of an escalation or the precedent it creates?'),
      question('Perspective and Interpretation', 'perspective', 'Which logic best describes 2024–2026?'),
      question('Constructing Arguments', 'claim', 'At what point between 2018 and 2026 did full-scale war become most likely?')
    ],
    terms: ['shadow war', 'threshold', 'precedent', 'retaliation', 'path dependence'],
    videos: []
  },
  {
    n: 7,
    topic: 'Topic 7',
    key: 'iran-t07',
    page: 'topic-07-hormuz.html',
    title: 'The Hormuz Lever',
    subtitle: 'Geography becomes power',
    skillTags: ['Geography and Power', 'Quantitative Evidence', 'Comparison'],
    competencies: [1, 2, 3, 4, 5],
    overview: 'Connect the Strait of Hormuz\'s chokepoint geography to the 1980s Tanker War, the measured collapse in 2026 oil flows, and the waterway\'s military, economic, and diplomatic uses.',
    inClass: 'Explain the chokepoint mechanism, compare the 1980s and 2026, interpret EIA data carefully, and decide what kind of leverage Hormuz provides.',
    learningTargets: [
      target('Geography and Power', 'I can explain how a narrow waterway gives Iran leverage without requiring naval equality.'),
      target('Quantitative Evidence', 'I can use the change in estimated oil flows as evidence without claiming the numbers prove motive.'),
      target('Comparison', 'I can identify a continuity and a difference between the Tanker War and the 2026 Hormuz crisis.')
    ],
    successCriteria: [
      criterion('Geography and Power', 'I can complete the chain from narrow route to disrupted shipping to consequences beyond the Gulf.'),
      criterion('Quantitative Evidence', 'I can explain what the 21.6 to 4.9 million-barrel change establishes and what it cannot establish.'),
      criterion('Constructing Arguments', 'I can decide whether Hormuz is primarily military, economic, or diplomatic leverage and support that ranking.')
    ],
    questions: [
      question('Geography and Power', 'map', 'Explain the chokepoint mechanism.'),
      question('Comparison', 'tankers', 'What does the Tanker War help explain about 2026?'),
      question('Quantitative Evidence', 'data', 'What does the 21.6 → 4.9 change prove, and what does it not prove?'),
      question('Perspective and Interpretation', 'perspective', 'Which actor has the strongest reason to avoid a prolonged closure?'),
      question('Constructing Arguments', 'claim', 'Is Hormuz primarily a military weapon, an economic weapon or a diplomatic bargaining tool?')
    ],
    terms: ['Strait of Hormuz', 'chokepoint', 'Tanker War', 'Operation Earnest Will', 'leverage'],
    videos: []
  },
  {
    n: 8,
    topic: 'Topic 8',
    key: 'iran-t08',
    page: 'topic-08-synthesis.html',
    title: 'When Did This War Really Begin?',
    subtitle: 'Causation synthesis',
    skillTags: ['Cause and Effect', 'Counterargument', 'Constructing Arguments'],
    competencies: [1, 2, 3, 5],
    overview: 'Rebuild the entire causal chain, rank the most important turning points, test the strongest competing explanation, and write a final answer to the unit question.',
    inClass: 'Move from chronology to causal ranking. Students must distinguish the literal start date from the earlier turning point that best explains it and address a serious counterargument.',
    learningTargets: [
      target('Cause and Effect', 'I can connect evidence from several points in the chain through explicit causal mechanisms.'),
      target('Counterargument', 'I can state the strongest case for a turning point I did not rank first.'),
      target('Constructing Arguments', 'I can distinguish the literal beginning of war from the explanatory beginning I defend.')
    ],
    successCriteria: [
      criterion('Cause and Effect', 'I can use at least three specific pieces of evidence from different points in the chain.'),
      criterion('Counterargument', 'I can explain why a competing turning point matters before showing why mine carries more weight.'),
      criterion('Constructing Arguments', 'I can name an explanatory beginning, define what it explains, and connect each piece of evidence to the final claim.')
    ],
    questions: [
      question('Cause and Effect', 'chain', 'Choose three consecutive stops and write the arrows between them.'),
      question('Causal Ranking', 'ranking', 'Rank your three strongest turning points and explain why each belongs where it does.'),
      question('Counterargument', 'counter', 'Write the best case for a turning point you did not rank first.'),
      question('Scope and Definition', 'definition', 'What exactly does your chosen “beginning” explain?'),
      question('Constructing Arguments', 'claim', 'Was the 2026 Iran War mainly the result of recent decisions, or decades of unresolved conflict?')
    ],
    terms: ['causal mechanism', 'turning point', 'immediate trigger', 'counterargument', 'explanatory beginning'],
    videos: []
  }
];

module.exports = { meta: UNIT, topics: TOPICS };
