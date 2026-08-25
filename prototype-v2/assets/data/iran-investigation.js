/* =========================================================
   IRAN — THE INVESTIGATION SHELL

   Composes the two content layers into the object the pages render:

     iran-history.js   the stable spine        (rarely edited)
     iran-current.js   the volatile layer      (edited weekly)
     this file         the teaching structure  (edited when the LESSON
                                                changes, not when the
                                                news does)

   Load order matters — history and current must be on the page first.
   Everything is a plain <script src>, and no request API is used
   anywhere: student writing must never have a network path off the
   device, and validate.js fails the build if one appears on any page a
   student can reach.
   ========================================================= */
(function () {
  'use strict';

  var history = window.BC_IRAN_HISTORY;
  var current = window.BC_IRAN_CURRENT;

  if (!history || !current) {
    console.error('BeCurrent: iran-history.js and iran-current.js must load before iran-investigation.js');
    return;
  }

  /* One source table, merged from both layers, so a citation anywhere
     on the page resolves through a single lookup and the Sources
     section cannot drift out of step with the text above it. */
  var sources = Object.assign({}, history.sources, current.extraSources);

  window.BC_INVESTIGATION = {
    id: 'iran-war',
    title: 'Why is there war with Iran?',
    displayTitle: 'Iran at War',
    displaySub: 'How did we get here?',
    shortTitle: 'Iran at War',
    status: 'active',
    updated: current.asOf,

    hero: {
      eyebrow: 'Today’s investigation',
      /* RAW HTML. The <em> is the display italic, and the line break is
         set by hand: "WAR WITH IRAN" belongs on its own line and letting
         it wrap on its own turns a headline into a sentence. */
      titleHtml: 'Why is there<br>war with <em>Iran</em>?',
      /* Two image layers, the repo's documented contract: generated
         local art underneath as the floor, a photograph on top that
         removes itself if the URL dies. An empty `photo` is a valid
         choice and renders the plate alone. */
      plate: 'assets/images/hero-plate.svg',
      photo: '',
      photoAlt: '',
      plateAlt: '',
      standfirst: 'The fighting is happening now. To understand it you have to go back further than the nuclear program.'
    },

    question: 'Why are the United States, Israel and Iran in conflict, and why has this been so hard to end?',

    /* ── Geographic context ───────────────────────────────────────── */
    geography: {
      eyebrow: 'Where this is happening',
      title: 'One strait, a fifth of the world’s oil',
      standfirst: 'Almost everything about this conflict is shaped by a channel about twenty-one miles wide at its narrowest point.',
      map: 'assets/images/iran-plate.svg',
      mapAlt: 'Map of Iran, the Persian Gulf and the Strait of Hormuz, marking Tehran, Bandar Abbas, the strait itself, and the nuclear sites at Natanz, Fordow and Isfahan.',
      caption: 'Iran, the Gulf, and the Strait of Hormuz. Drawn for this lesson; not to navigational scale.',
      points: [
        { name: 'The Strait of Hormuz',
          text: 'The only sea route out of the Persian Gulf. Iran controls its northern shore, which is why closing it is available to Iran as a move and to almost no one else.' },
        { name: 'Bandar Abbas',
          text: 'Iran’s main naval base on the strait, and the reason Iranian forces can reach shipping quickly.' },
        { name: 'Natanz, Fordow, Isfahan',
          text: 'The three enrichment and nuclear research sites struck by the United States in June 2025. Fordow is built into a mountain, which is a fact about engineering that became a fact about diplomacy.' },
        { name: 'Tehran',
          text: 'The capital, roughly 700 miles north of the strait. Decisions made here are felt first on the water.' }
      ]
    },

    /* ── The prediction, before any explanation ───────────────────── */
    prediction: {
      eyebrow: 'Before you read on',
      stop: 'Stop. Don’t look it up yet.',
      question: 'Why do you think this conflict is happening? Pick the explanations you think matter most. You will be asked about this again at the end, and you are not expected to be right now.',
      legend: 'Choose as many as you think matter',
      options: [
        { id: 'nuclear', label: 'Iran’s nuclear program' },
        { id: 'israel', label: 'Israel' },
        { id: 'us-intervention', label: 'Past US intervention' },
        { id: 'religion', label: 'Religion' },
        { id: 'oil', label: 'Oil and energy' },
        { id: 'regional', label: 'Who runs the region' },
        { id: 'militias', label: 'Armed groups and militias' },
        { id: 'sanctions', label: 'Sanctions' },
        { id: 'other', label: 'Something else' }
      ]
    },

    /* ── The turning point given the full-width treatment ─────────── */
    feature: {
      nodeId: 'revolution-1979',
      /* Broken by hand into three lines. This is editorial writing, and
         letting it wrap on its own turns a headline into a sentence. */
      headline: ['The ally', 'becomes', 'the enemy'],
      dateline: '1979 · The year the relationship inverted',
      plate: 'assets/images/turning-point-1979.svg',
      photo: '',
      quote: {
        text: 'The military coup that overthrew Mossadeq and his National Front cabinet was carried out under CIA direction as an act of U.S. foreign policy, conceived and approved at the highest levels of government.',
        attribution: 'CIA internal history, declassified 2011',
        src: 'nsarchive-1953'
      }
    },

    /* ── The primary source ───────────────────────────────────────── */
    primarySource: {
      eyebrow: 'Primary source',
      title: 'The document that settled an argument',
      standfirst: 'For sixty years the United States denied organising the 1953 coup, and Iran said otherwise. In 2013 the CIA published its own internal history.',
      doc: {
        kind: 'Declassified internal history',
        origin: 'Central Intelligence Agency',
        date: 'Written mid-1970s · Released 2011 · Published 2013',
        classification: 'Formerly classified',
        paragraphs: [
          'The military coup that overthrew Mossadeq and his National Front cabinet was carried out under CIA direction as an act of U.S. foreign policy, conceived and approved at the highest levels of government.'
        ],
        foot: 'From the CIA’s internal history of its Iran operations, obtained under the Freedom of Information Act and published by the National Security Archive at George Washington University on August 19, 2013, the sixtieth anniversary of the coup.',
        src: 'nsarchive-1953'
      },
      questions: [
        { id: 'ps-1',
          label: 'What changes when the admission comes from the CIA itself?',
          help: 'Iran had made this claim for sixty years. What does it change that the same claim now appears in the CIA’s own words, and what does it not change?' },
        { id: 'ps-2',
          label: 'Sixty years is a long time. What does the delay tell you?',
          help: 'Think about who benefits from a document staying classified, and who is affected by not being believed in the meantime.' }
      ]
    },

    /* ── Evidence interaction: reporting vs interpretation ────────── */
    evidence: {
      eyebrow: 'Evidence check',
      title: 'Reporting, or interpretation?',
      standfirst: 'Every statement below appeared in coverage of this conflict. Some describe something that happened. Some tell you what it meant. Both belong in journalism; confusing them is how people get argued into things.',
      instructions: 'Decide for each one, then check the reasoning. You can change your mind.',
      items: [
        { id: 'ev1',
          text: 'On June 21, 2025, US aircraft struck nuclear sites at Fordow, Natanz and Isfahan.',
          answer: 'reporting',
          why: 'A dated, checkable event. Named places, a named date. Several outlets and the governments involved all describe the same strike.' },
        { id: 'ev2',
          text: 'The strikes set Iran’s nuclear program back by years.',
          answer: 'interpretation',
          why: 'An assessment, not an observation. It depends on damage estimates that are disputed and on knowing what Iran can rebuild, which nobody outside Iran can see directly.' },
        { id: 'ev3',
          text: 'The sixty-day settlement deadline expired on August 17 without an agreement.',
          answer: 'reporting',
          why: 'A date passed and no agreement was announced. Checkable against the record of what was signed in June.' },
        { id: 'ev4',
          text: 'Iran was weeks away from building a nuclear weapon.',
          answer: 'interpretation',
          why: 'A prediction about intent and capability. Enrichment levels can be measured; "weeks away from a weapon" adds a decision Iran has not been observed making. Note who is making the claim and what follows from it if you believe them.' },
        { id: 'ev5',
          text: 'Shipping through the Strait of Hormuz is at about 20 percent of its pre-war average.',
          answer: 'reporting',
          why: 'A counted quantity from tracking data. You could check it against a different tracker, and that is the test.' },
        { id: 'ev6',
          text: 'Iran closed the strait to punish the West for the sanctions.',
          answer: 'interpretation',
          why: 'The closure is reporting. "To punish the West" is a motive, and motive is inferred. Iran gave its own stated reason; whether that is the real one is an argument, not an observation.' }
      ]
    },

    /* ── Claim builder ───────────────────────────────────────────── */
    claim: {
      eyebrow: 'Take a position',
      title: 'Make a claim you can defend',
      standfirst: 'Not a summary of what you read. A claim is something a reasonable person could disagree with, and that you can support with specific evidence from this investigation.',
      frame: [
        'Answer the question directly: <strong>why is there war with Iran?</strong> One sentence.',
        'Name <strong>at least two</strong> of the turning points you traced, and say what each one contributed.',
        'Name the <strong>strongest objection</strong> to your claim, and say why you still hold it.',
        'Say what evidence would <strong>change your mind</strong>. If nothing would, it is not a claim, it is a belief.'
      ],
      field: {
        id: 'claim',
        label: 'Your claim',
        help: 'Aim for a solid paragraph. Specific beats dramatic every time.'
      },
      coach: {
        name: 'Reverse History Coach',
        note: 'The coach reads your draft and asks you one question about the weakest link in your reasoning. It does not rewrite your work, correct it, or tell you the answer.',
        status: 'Not connected in this prototype. BeCurrent needs its own MagicSchool bot before this button does anything, and a button pointing at another course’s room is worse than no button.'
      }
    },

    /* ── The return to the prediction ─────────────────────────────── */
    reflection: {
      eyebrow: 'Back to where you started',
      title: 'You started here',
      standfirst: 'This is what you picked before you read anything.',
      prompts: [
        { id: 'refl-keep',
          label: 'What would you keep, and what would you drop?',
          help: 'Name one you would keep and say what evidence backs it. Name one you would drop and say what changed.' },
        { id: 'refl-add',
          label: 'What would you add that was not on the list?',
          help: 'The list was deliberately incomplete.' }
      ]
    },

    /* ── The path, named for what a student does ──────────────────── */
    steps: [
      { id: 'today',   label: 'Today' },
      { id: 'why',     label: 'Why?' },
      { id: 'trace',   label: 'Trace it back' },
      { id: 'evidence',label: 'Evidence' },
      { id: 'decide',  label: 'Decide' }
    ],

    /* ── Teacher metadata. PUBLIC BY CONSTRUCTION. ────────────────
       This is a static site on GitHub Pages. Anything shipped here can
       be read with View Source, so nothing below is hidden from
       students in any real sense — it is simply not shown by default.
       No answer keys, no assessment material, no scoring guidance.
       Those live outside the public build. */
    teacher: {
      standards: [
        'Evaluate the credibility and purpose of a source, including who produced it and why.',
        'Distinguish factual reporting from interpretation and opinion within the same piece.',
        'Trace a causal chain across multiple decades and evaluate the relative weight of causes.',
        'Construct a defensible claim, support it with specific evidence, and answer the strongest counterargument.'
      ],
      timing: [
        ['Today and the prediction', 'about 12 minutes, whole class'],
        ['Reverse History timeline', 'about 20 minutes, pairs at devices'],
        ['1979 feature and the primary source', 'about 20 minutes, whole class then individual'],
        ['Evidence check', 'about 15 minutes, pairs'],
        ['Claim builder', 'about 20 minutes, individual'],
        ['Reflection', 'about 8 minutes, individual']
      ],
      notes: [
        'The prediction has to happen before anything else is shown. If students read the history first the reflection has nothing to compare against and the whole structure collapses into a normal lesson.',
        'The 1953 node is where the room usually goes quiet. Watch for it hardening into "so America caused all of this" — the node carries a contested note for exactly that reason, and it is worth reading aloud.',
        'The casualty figures disagree with each other on purpose. That is the lesson, not a defect to apologise for.',
        'Fordow being inside a mountain is the detail that makes the nuclear dispute concrete for students who have not engaged with the rest.'
      ],
      accessibility: [
        'The timeline is fully keyboard operable: Tab to it, then arrow keys between nodes, Enter or Space to open one, Home and End to jump to either end.',
        'Nothing on the page depends on hover. Every hover state has a focus equivalent.',
        'Motion respects prefers-reduced-motion.'
      ],
      canvas: 'Work saves to this device only. In production, a Gather All My Work step assembles it into one paste for the Canvas assignment, using the existing record footer so a truncated paste is reported rather than silently scored as blank. That step is NOT wired up in this prototype.'
    },

    /* Merged from both layers. */
    sources: sources,
    current: current,
    history: history
  };
})();
