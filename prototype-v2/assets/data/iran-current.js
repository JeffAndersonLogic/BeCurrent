/* =========================================================
   IRAN — THE CURRENT LAYER  (the VOLATILE half)

   ────────────────────────────────────────────────────────────────
   THIS IS THE ONLY FILE YOU EDIT WHEN THE NEWS MOVES.
   Budget: about ten minutes. Nothing in here touches the history.
   ────────────────────────────────────────────────────────────────

   Everything below goes stale. The historical spine in iran-history.js
   does not, and the two are kept apart on purpose: if updating a
   headline meant editing the 1979 section, the investigation would stop
   getting updated by about week three.

   HOW TO UPDATE, in order:
     1. `asOf` — the date you checked. This is printed on the page.
        Change it even if nothing else changed, because "we checked and
        nothing moved" is information and a stale date is a lie.
     2. `status` — one sentence a student can read aloud.
     3. `developments` — the three or four most recent dated facts.
        Newest first. Drop the oldest off the bottom.
     4. `figures` — only if a number materially moved.

   THE RULE THAT MATTERS MOST: every claim carries a `src` that resolves
   in iran-history.js SOURCES or in EXTRA_SOURCES below, and every claim
   is something a named outlet actually reported. Do not write a headline
   you did not read. Do not round a number you did not look up. This is a
   course about the difference between what was reported and what was
   made up, and the site itself is the first thing students will judge by
   that standard.

   WHERE SOURCES DISAGREE, SAY SO. Several dates in this conflict are
   reported differently by different outlets, and `disputed` exists so
   the page can show that rather than picking one and sounding certain.
   That disagreement is not a defect in the reporting; for this course it
   is the most teachable thing on the page.
   ========================================================= */
(function () {
  'use strict';

  var CURRENT = {

    /* ── 1. When this was last verified ──────────────────────────── */
    asOf: '2026-08-25',
    asOfLabel: 'Tuesday, August 25, 2026',

    /* ── 2. Where things stand ───────────────────────────────────── */
    status: 'A ceasefire agreed in June has broken down. The fighting continues, the Strait of Hormuz is barely open, and the United States has moved to an economic campaign alongside the military one.',

    headline: {
      lead: 'Washington opens an economic front as the last ceasefire deadline passes',
      facts: [
        { text: 'The sixty-day settlement window agreed in June expired on August 17 with no agreement reached.', src: 'cfr-tracker' },
        { text: 'On August 24 the US Treasury announced secondary sanctions on foreign companies and countries still doing business with Iran, which the Treasury Secretary called an "economic D-Day".', src: 'cnn-0823' },
        { text: 'Iran’s Supreme National Security Council threatened to seize vessels and shut the Strait of Hormuz completely if neighbouring states help enforce the sanctions.', src: 'cnbc-0824' }
      ]
    },

    /* ── 3. Recent developments, newest first ────────────────────── */
    developments: [
      { date: 'August 24, 2026',
        text: 'The US Treasury announced secondary sanctions targeting foreign nations and firms trading with Iran.',
        src: 'cnn-0823' },
      { date: 'August 18, 2026',
        text: 'The United Arab Emirates suspended all trade with Iran, following missile attacks it attributed to Iranian forces.',
        src: 'cfr-tracker' },
      { date: 'August 17, 2026',
        text: 'The sixty-day settlement deadline set by the June interim deal expired without an agreement.',
        src: 'cfr-tracker' },
      { date: 'July 2026',
        text: 'The ceasefire collapsed after attacks on commercial vessels in the Strait of Hormuz.',
        src: 'wiki-war',
        disputed: 'Reported as July 8. Dates in this phase of the conflict vary between outlets; treat single-source dates as provisional.' },
      { date: 'June 2026',
        text: 'An interim deal mediated by Pakistan reopened the Strait of Hormuz and set a sixty-day pause in fighting.',
        src: 'cfr-tracker',
        disputed: 'CFR dates the interim deal June 14. Other accounts date the signing of the related Islamabad Memorandum to June 17. The page shows both rather than choosing.' },
      { date: 'February 28, 2026',
        text: 'US and Israeli strikes on Iran killed Supreme Leader Ali Khamenei along with senior military leadership. Iran retaliated and moved to close the Strait of Hormuz.',
        src: 'cfr-timeline' }
    ],

    /* ── 4. Figures. Each one names who counted. ─────────────────── */
    figures: [
      { fig: '20', unit: '%',
        text: 'Shipping through the Strait of Hormuz, as a share of the pre-war average.',
        src: 'cnbc-0824' },
      { fig: '3,528',
        text: 'People killed in Iran, as reported by the Iranian government. The independent monitor HRANA counts 3,684; UN OCHA reports more than 3,400 civilians killed. US and Israeli estimates put Iranian military deaths above 6,000.',
        src: 'wiki-war' },
      { fig: '444',
        text: 'Days the American embassy hostages were held in Tehran, 1979 to 1981. The only number here that will never change.',
        src: 'cfr-timeline',
        anchor: true }
    ],

    /* ── 5. Why the numbers disagree. Kept as content, not a caveat. */
    countingNote: 'No two sources agree on how many people have died, and the gaps are large. Governments count differently from independent monitors, "civilian" and "military" are drawn differently by each side, and no one has full access to the country. A figure with no one’s name attached to it is not a fact yet.',

    /* ── 6. What each side says. Verification is held separate. ──── */
    perspectives: {
      sides: [
        { who: 'Washington and Jerusalem say',
          points: [
            'Iran was enriching uranium far beyond any civilian need and was approaching a weapon.',
            'The IAEA found Iran in violation of its non-proliferation obligations before the 2025 strikes.',
            'Iran arms and directs groups that attack Israel and shipping, so this is not a dispute confined to Iran’s borders.'
          ] },
        { who: 'Tehran says',
          points: [
            'The nuclear program is civilian, is permitted under the Non-Proliferation Treaty, and was begun with American help.',
            'Iran kept the 2015 agreement and the United States left it, so the broken promise is not Iran’s.',
            'Strikes on Iranian soil and the killing of its head of state are acts of war against a sovereign country.'
          ] }
      ],
      verify: {
        head: 'What can actually be checked',
        points: [
          '<strong>Checkable:</strong> that the IAEA declared Iran in violation before the June 2025 strikes, and that the United States withdrew from the JCPOA in May 2018 while the other signatories did not.',
          '<strong>Checkable:</strong> that the United States supplied Iran’s first research reactor and its fuel, under a 1957 agreement.',
          '<strong>Not checkable from here:</strong> what Iran intended to do with enriched uranium. Intent is inferred by every party from the same physical facts, which is why the same enrichment figure supports both arguments.',
          '<strong>Contested:</strong> casualty totals, the sequence of who fired first in several exchanges, and the exact dates of the mid-2026 ceasefires.'
        ]
      }
    },

    /* ── 7. Sources used only by this layer. ─────────────────────── */
    extraSources: {
      'cnn-0823': {
        org: 'CNN',
        title: 'Bessent promises "economic D-Day" ahead of expected Iran sanctions',
        url: 'https://www.cnn.com/2026/08/23/world/live-news/iran-war-trump',
        note: 'Live coverage, August 23, 2026.'
      },
      'cnbc-0824': {
        org: 'CNBC',
        title: 'Iran warns of Hormuz ship seizures ahead of Bessent’s planned sanctions push',
        url: 'https://www.cnbc.com/2026/08/24/us-iran-war-trump-hormuz-bessent-economic-sanctions-.html',
        note: 'August 24, 2026. Carries the shipping-volume figure used above.'
      },
      'wiki-war': {
        org: 'Wikipedia',
        title: '2026 Iran war',
        url: 'https://en.wikipedia.org/wiki/2026_Iran_war',
        note: 'Used only for the casualty tallies and for dates where it disagrees with CFR, both of which are shown as contested. Wikipedia is a starting point for finding sources, never the source itself — which is a thing worth saying to students out loud.'
      }
    }
  };

  window.BC_IRAN_CURRENT = CURRENT;
})();
