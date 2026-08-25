/* =========================================================
   IRAN — THE HISTORICAL SPINE  (the STABLE layer)

   This file is the half of the investigation that does not move. 1953
   happened; it will still have happened next Tuesday. Everything here
   should survive a whole school year without an edit.

   THE CURRENT LAYER LIVES IN iran-current.js AND IS EDITED SEPARATELY.
   That split is the sustainability requirement, not a filing preference:
   if a headline change forced a rewrite of the 1979 section, updating the
   investigation would cost an evening instead of ten minutes, and after
   three weeks of that nobody updates it at all.

   REVERSE HISTORY, precisely. The nodes are ordered PRESENT FIRST and
   run backward. Each one answers a question raised by the node before
   it — that is what `question` is for, and it is why this is not a
   timeline read right-to-left. A student travels backward because the
   present raised a question, not because history is being surveyed.

   This is NOT "similar things that happened before". No analogies, no
   recurring themes, no "history rhymes". Every link is a causal claim
   about this specific conflict, and where the causation is disputed the
   text says so rather than smoothing it over.

   ON DETERMINISM: 1953 is a foundational turning point, not a machine
   that produced 2026. `contested` exists so the page can show where
   historians and governments actually disagree about how much weight a
   link carries. A chain with no contested links is a chain that has
   been tidied into propaganda.

   Sources are named per node and resolve in SOURCES at the bottom.
   Nothing here is invented. Where two reputable outlets give different
   dates for the same event, both are recorded.
   ========================================================= */
(function () {
  'use strict';

  /* Three causal strands. They are distinguished in the UI by rule
     PATTERN, never by colour: the palette has no colour to spend, and a
     pattern survives a bad projector and a black-and-white printout. */
  var THREADS = [
    { id: 'distrust',
      name: 'Distrust',
      desc: 'Each side can point to a real thing the other did. That is what makes it hard to end.' },
    { id: 'nuclear',
      name: 'The nuclear question',
      desc: 'A program the United States helped begin, and later bombed.' },
    { id: 'power',
      name: 'Regional power',
      desc: 'Who gets to be the strongest state in the region, and who decides.' }
  ];

  /* Ordered PRESENT → PAST. The renderer reads this order directly, so
     the array order is the direction of travel. */
  var NODES = [
    {
      id: 'now',
      year: '2026',
      now: true,
      label: 'Open war, and an economic siege',
      when: 'February 2026 to now',
      title: 'The United States, Israel and Iran are at war',
      threads: ['distrust', 'nuclear', 'power'],
      /* Deliberately thin. The detail lives in the CURRENT layer, which
         is the file a teacher actually updates. Duplicating it here is
         how the two copies start disagreeing. */
      body: [
        'Fighting that began in February 2026 has not settled into peace. Ceasefires have been agreed and have broken down, the Strait of Hormuz has been closed and partly reopened, and the confrontation has moved into an economic phase alongside the military one.'
      ],
      question: 'Why is the nuclear program the thing everyone is fighting about?',
      sources: ['cfr-tracker']
    },

    {
      id: 'strikes-2025',
      year: '2025',
      label: 'The first strikes on the nuclear sites',
      when: 'June 13 and June 21, 2025',
      title: 'Israel, then the United States, bomb the nuclear program',
      threads: ['nuclear', 'power'],
      body: [
        'On June 13, 2025, Israel struck Iranian nuclear facilities, missile factories and military officials, days after the International Atomic Energy Agency found Iran in violation of its non-proliferation obligations.',
        'On June 21 the United States joined directly, hitting the enrichment sites at Fordow, Natanz and Isfahan. It was the first time an American president had ordered an attack on another country’s nuclear program.'
      ],
      why: 'This is the moment the nuclear dispute stopped being an argument and became a war aim.',
      question: 'Why was Iran enriching uranium at all, when a deal was supposed to have stopped it?',
      sources: ['cfr-timeline', 'cfr-tracker']
    },

    {
      id: 'withdrawal-2018',
      year: '2018',
      label: 'The United States leaves the deal',
      when: 'May 8, 2018',
      title: 'Washington withdraws from the nuclear agreement',
      threads: ['nuclear', 'distrust'],
      body: [
        'President Trump announced that the United States was leaving the JCPOA and reimposing sanctions under a policy called "maximum pressure". The stated reasons were that the agreement did nothing about Iran’s missile program or its regional influence, and that its restrictions expired.',
        'The other signatories — Britain, France, Germany, Russia, China and the European Union — did not leave. Iran stayed in the agreement for about a year, then began exceeding its enrichment limits.'
      ],
      why: 'Each side reads this differently, and both readings are on the record. To Washington, Iran was getting sanctions relief for temporary limits. To Tehran, the United States broke a deal Iran was keeping.',
      contested: 'Whether the withdrawal caused the later escalation or merely preceded it is genuinely argued over. Iran was in compliance according to IAEA reporting at the time; what it would have done later is not something anyone can check.',
      question: 'What was in the deal that was worth leaving?',
      sources: ['cfr-timeline', 'cfr-jcpoa']
    },

    {
      id: 'jcpoa-2015',
      year: '2015',
      label: 'The nuclear agreement',
      when: 'July 14, 2015',
      title: 'The JCPOA trades enrichment limits for sanctions relief',
      threads: ['nuclear'],
      body: [
        'Iran and six world powers finalised the Joint Comprehensive Plan of Action. Iran accepted hard limits on how much uranium it could enrich and to what purity, gave up most of its stockpile, and admitted international inspectors. In exchange, sanctions on its oil and banking were lifted.',
        'The agreement did not cover Iran’s missile program or its support for armed groups in other countries, and several of its central restrictions were written to expire.'
      ],
      why: 'It is the only time the nuclear dispute has been managed by agreement rather than by force, which is why both sides still argue about why it ended.',
      question: 'Why did Iran want a nuclear program badly enough to accept years of sanctions over it?',
      sources: ['cfr-jcpoa']
    },

    {
      id: 'revolution-1979',
      year: '1979',
      label: 'The Revolution, and the hostages',
      when: 'February 1979 to January 1981',
      title: 'The ally becomes the enemy',
      threads: ['distrust', 'power'],
      body: [
        'In February 1979 the Shah fled the country and Ayatollah Khomeini returned from exile. The state that replaced the monarchy was an Islamic republic built in explicit opposition to American influence in Iran.',
        'That November, students seized the United States embassy in Tehran and held 52 Americans for 444 days, demanding the Shah be sent back for trial. The hostages were released in January 1981 under the Algiers Accords.',
        'From September 1980 Iraq invaded Iran, and the United States backed Iraq with money, intelligence and technology through eight years of war, including after evidence that Iraq was using chemical weapons on Iranian troops.'
      ],
      why: 'For most Americans the relationship starts here, with the embassy. For most Iranians it starts twenty-six years earlier. Both dates are real, and the gap between them is most of the problem.',
      question: 'Why did the revolution target the United States specifically, rather than only the Shah?',
      sources: ['cfr-timeline']
    },

    {
      id: 'atoms-1957',
      year: '1957',
      label: 'America starts the nuclear program',
      when: 'Signed March 5, 1957; reactor supplied 1967',
      title: 'Atoms for Peace comes to Tehran',
      threads: ['nuclear'],
      body: [
        'The United States and Iran signed a civil nuclear cooperation agreement under President Eisenhower’s Atoms for Peace initiative. Washington later supplied the Tehran Research Reactor and the highly enriched uranium to fuel it.',
        'Iran’s nuclear program was, at its beginning, an American project in an allied country.'
      ],
      why: 'The program the United States bombed in 2025 is one it helped build. That is not an irony to point at; it is why Iran’s claim to a peaceful program has a paper trail behind it, and why the argument is about intent rather than about equipment.',
      question: 'Why was Iran an ally close enough to be handed a reactor?',
      sources: ['cfr-timeline']
    },

    {
      id: 'coup-1953',
      year: '1953',
      label: 'The coup, and the Shah',
      when: 'August 19, 1953',
      title: 'A prime minister removed, a shah restored',
      threads: ['distrust', 'power'],
      body: [
        'Prime Minister Mohammad Mossadegh nationalised Iran’s oil industry, which had been run by a British company on terms that sent most of the profit out of the country. Britain and the United States responded by organising his overthrow.',
        'The CIA and British intelligence removed Mossadegh and restored Mohammad Reza Pahlavi, the Shah, to full power. He ruled with American backing for the next twenty-six years, and his secret police made opposition dangerous.',
        'The United States denied involvement for sixty years. In 2013 the CIA released its own internal history, which states plainly that the coup was "carried out under CIA direction as an act of U.S. foreign policy".'
      ],
      why: 'This is the foundation, and it is the reason the 1979 revolution was aimed at Washington and not only at the palace.',
      contested: 'It is a foundation, not an explanation for everything after it. Historians disagree about how decisive the CIA’s role was next to Iran’s own domestic politics, and treating 1953 as the single cause of 2026 skips seventy years in which people made choices.',
      question: 'Deeper still: why was a British company running Iran’s oil in the first place?',
      terminal: true,
      sources: ['nsarchive-1953', 'cfr-timeline']
    }
  ];

  var SOURCES = {
    'cfr-tracker': {
      org: 'CFR',
      title: 'Iran’s War With Israel and the United States, Global Conflict Tracker',
      url: 'https://www.cfr.org/global-conflict-tracker/conflict/confrontation-between-united-states-and-iran',
      note: 'Running chronology of the current conflict, maintained by the Council on Foreign Relations.'
    },
    'cfr-timeline': {
      org: 'CFR',
      title: 'U.S. Relations With Iran, 1953 to the present',
      url: 'https://www.cfr.org/timeline/us-relations-iran-1953-2025',
      note: 'The dated backbone of this investigation, from the coup through the current war.'
    },
    'cfr-jcpoa': {
      org: 'CFR',
      title: 'What Is the Iran Nuclear Deal?',
      url: 'https://www.cfr.org/backgrounders/what-iran-nuclear-deal',
      note: 'Background on what the JCPOA required, what it left out, and what happened after 2018.'
    },
    'nsarchive-1953': {
      org: 'NSArchive',
      title: 'CIA Confirms Role in 1953 Iran Coup',
      url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB435/',
      note: 'The declassified CIA internal history, published by the National Security Archive at George Washington University on the coup’s sixtieth anniversary, August 19, 2013.'
    }
  };

  window.BC_IRAN_HISTORY = { threads: THREADS, nodes: NODES, sources: SOURCES };
})();
