'use strict';

/**
 * Canonical video-forward metadata for Iran at War.
 *
 * Kept outside scripts/lib/unit-content/ because every .js file in that folder is
 * auto-discovered as a complete course unit. This is the single source of truth
 * for Iran video titles, sources, runtimes, statuses, launch URLs, listening cues,
 * and reading scaffolds. Browser-facing data is generated from this file.
 *
 * Launch audit: 2026-09-06.
 */
module.exports = {
  reviewed: '2026-09-06',
  topics: {
    'topic-01': {
      heading: 'Watch the war before you explain it.',
      intro: 'Use current reporting to establish what happened, what remains uncertain, and why geography matters before tracing the conflict backward.',
      videos: [
        {label:'WATCH 1 — THE STORY',status:'REQUIRED',source:'PBS NewsHour',runtime:'9:19',title:'As Iran expands retaliatory attacks, U.S. urges Americans to leave Middle East',url:'https://www.pbs.org/video/iran-war-sot-nick-live-tag-1772489548/',why:'Establish the opening-war picture: U.S.-Israeli strikes, Iranian retaliation, and the widening regional conflict.',listen:['retaliation','regional conflict','military objectives'],after:'What is one thing you can verify happened, and one thing this report cannot prove about why leaders acted?',verified:'2026-09-06'},
        {label:'WATCH 2 — PERSPECTIVE',status:'TEACHER CHOICE',source:'PBS NewsHour',runtime:'9:09',title:'Expert panel breaks down U.S. objectives in Iran war',url:'https://www.pbs.org/video/war-with-iran-panel-1772489436/',why:'Three Iran specialists offer different interpretations of U.S. objectives. Treat the claims as arguments to test, not automatic facts.',listen:['objective','deterrence','regime'],after:'Which claim in the panel would require the most outside evidence before you accepted it?',verified:'2026-09-06'},
        {label:'WATCH 3 — CONSEQUENCES',status:'OPTIONAL EXTEND',source:'PBS NewsHour',runtime:'7:17',title:'How the war in Iran is impacting global energy markets',url:'https://www.pbs.org/video/energy-risks-1772489465/',why:'Preview the Strait of Hormuz and see why a regional military conflict can become a global economic problem.',listen:['oil','shipping','Hormuz'],after:'How can geography make a regional war a global economic problem?',verified:'2026-09-06'}
      ]
    },
    'topic-02': {
      heading:'See the coup, then test what the archive proves.',
      intro:'The videos carry most of the narrative. The declassified record remains the evidence you use to verify U.S. involvement.',
      videos:[
        {label:'WATCH 1 — THE STORY',status:'REQUIRED',source:'PBS American Experience',runtime:'6:08',title:'Operation Ajax',url:'https://www.pbs.org/video/operation-ajax/',why:'Archival explanation of the secret U.S.-British operation surrounding Mohammad Mosaddegh and the 1953 crisis.',listen:['Mosaddegh','oil','CIA'],after:'What does the clip establish about foreign involvement, and what does it not establish about Iranian politics?',verified:'2026-09-06'},
        {label:'WATCH 2 — THE LONGER STORY',status:'REQUIRED',source:'PBS American Experience',runtime:'10:07',title:'Taken Hostage, Part 1 — Chapter 1',url:'https://www.pbs.org/video/chapter-1-taken-hostage-part-1/',why:'Carry 1953 forward toward the Shah and the eventual collapse of the U.S.-Iran alliance.',listen:['Shah','alliance','resentment'],after:'Why can a historical intervention matter again decades after the operation itself ends?',verified:'2026-09-06'},
        {label:'WATCH 3 — DOCUMENTARY',status:'OPTIONAL EXTEND',source:'PBS American Experience',runtime:'Long-form',title:'Taken Hostage',url:'https://www.pbs.org/wgbh/americanexperience/films/taken-hostage/',why:'Use teacher-selected excerpts for additional historical depth. The full documentary is not required.',listen:['memory','revolution','hostages'],after:'Which later development makes 1953 more politically important than it might otherwise have been?',verified:'2026-09-06'}
      ]
    },
    'topic-03': {
      heading:'Watch an alliance collapse.',
      intro:'Use archival storytelling to understand the revolution and hostage crisis, then compare the different historical memories each country carried forward.',
      videos:[
        {label:'WATCH 1 — REVOLUTION CONTEXT',status:'REQUIRED EXCERPT',source:'PBS American Experience',runtime:'Teacher-selected replay from 10:07',title:'Taken Hostage, Part 1 — Chapter 1',url:'https://www.pbs.org/video/chapter-1-taken-hostage-part-1/',why:'Replay only the section your teacher selects. Focus now on the Shah, opposition, and the collapsing alliance.',listen:['Shah','opposition','United States'],after:'Why can support for an ally create resentment toward the ally’s supporter?',verified:'2026-09-06'},
        {label:'WATCH 2 — HOSTAGE CRISIS',status:'REQUIRED',source:'PBS American Experience',runtime:'10:34',title:'Taken Hostage, Part 2 — Chapter 1',url:'https://www.pbs.org/video/chapter-1-taken-hostage-part-2/',why:'Give the embassy seizure and hostage crisis the human and political weight needed to understand American historical memory.',listen:['embassy','hostages','Carter'],after:'What did the hostage crisis add to U.S.-Iran hostility that 1953 did not?',verified:'2026-09-06'},
        {label:'WATCH 3 — DOCUMENTARY',status:'OPTIONAL EXTEND',source:'PBS American Experience',runtime:'Long-form',title:'Taken Hostage — Part 2',url:'https://www.pbs.org/wgbh/americanexperience/films/taken-hostage/',why:'Use a teacher-selected excerpt if more depth on the 444-day crisis is useful.',listen:['444 days','diplomacy','memory'],after:'Which event would be most likely to shape public memory decades later, and why?',verified:'2026-09-06'}
      ]
    },
    'topic-04': {
      heading:'Experience the war, then examine the strategy it helped shape.',
      intro:'The first documentary excerpt makes the Iran-Iraq War concrete. The second clip helps you test how that experience connects to Iran’s later regional network.',
      videos:[
        {label:'WATCH 1 — WAR EXPERIENCE',status:'REQUIRED EXCERPT',source:'BBC World Service',runtime:'13:11 excerpt (3:52–17:03)',title:'The untold story of the Iran-Iraq war’s frontline children',url:'https://www.youtube.com/watch?v=aHZRvpuW8QM&t=232s',why:'Use the war’s opening, mobilization, ideology, and firsthand battlefield memories to make vulnerability concrete.',listen:['invasion','mobilization','vulnerability'],after:'What lesson might leaders draw from surviving this kind of war?',verified:'2026-09-06'},
        {label:'WATCH 2 — THE NETWORK',status:'REQUIRED',source:'BBC News',runtime:'Short explainer',title:'What is Iran’s “Axis of Resistance”?',url:'https://www.youtube.com/watch?v=gtLlqDGQItw',why:'Map Iran-linked armed groups across the region and test how useful the word “proxy” really is.',listen:['IRGC','alliance','proxy'],after:'Where does the word “proxy” help, and where might it imply more Iranian control than the evidence supports?',verified:'2026-09-06'},
        {label:'WATCH 3 — DEEP DIVE',status:'OPTIONAL EXTEND',source:'BBC World Service',runtime:'Teacher-selected chapter from 50+ min program',title:'Hamas, Hezbollah, Houthis — Iran’s proxies at work',url:'https://www.youtube.com/watch?v=C2wTk6b9Wgc',why:'Use one selected chapter on Iraq, Hezbollah, Hamas, or the Houthis rather than the full program.',listen:['partner','influence','autonomy'],after:'Which relationship seems most like an alliance, and which seems most like direct proxy control?',verified:'2026-09-06'}
      ],
      scaffold:{selector:'#irgc .ir-reading',title:'What Matters',bullets:['The IRGC was created after the 1979 revolution to defend the new political system.','The Iran-Iraq War made the IRGC larger and more capable.','Iran developed missiles, drones, irregular tactics, and partner relationships rather than trying to match stronger rivals weapon for weapon.','The Quds Force became the main IRGC organization for relationships with armed groups outside Iran.','The war mattered, but ideology, Lebanon, later U.S. deployments, and regional competition also shaped the strategy.']}
    },
    'topic-05': {
      heading:'Understand the bargain before judging why it failed.',
      intro:'Use the videos for the diplomatic story. Keep the IAEA evidence and the post-2018 causal chain for your own analysis.',
      videos:[
        {label:'WATCH 1 — WHAT THE DEAL DID',status:'REQUIRED',source:'PBS NewsHour',runtime:'7:27',title:'What’s in the Iran nuclear framework agreement?',url:'https://www.pbs.org/video/iran-nuclear-agreement-sets-path-for-final-accord-1435189432/',why:'Contemporary reporting explains verification, limits, sanctions relief, and competing reactions while the agreement was being built.',listen:['enrichment','verification','sanctions'],after:'What problem was this agreement designed to solve—and what problems was it not designed to solve?',verified:'2026-09-06'},
        {label:'WATCH 2 — WHY IT BROKE',status:'REQUIRED EXCERPT',source:'BBC News / The Global Story',runtime:'16:35 excerpt (1:25–18:00)',title:'Why was the last US nuclear deal with Iran ripped up?',url:'https://www.youtube.com/watch?v=-6TVgqxi7q0&t=85s',why:'Former lead U.S. negotiator Wendy Sherman explains how the JCPOA formed, what it did, and why critics opposed it.',listen:['bargain','limits','criticism'],after:'Which criticism of the JCPOA is strongest, and does that criticism prove withdrawal was the best alternative?',verified:'2026-09-06'},
        {label:'WATCH 3 — CURRENT CONNECTION',status:'OPTIONAL EXTEND',source:'BBC News / The Global Story',runtime:'~5 min from 18:00',title:'How 2015 compares with the 2026 negotiating environment',url:'https://www.youtube.com/watch?v=-6TVgqxi7q0&t=1080s',why:'Continue from about 18:00 to connect the old bargain to the current conflict.',listen:['trust','leverage','negotiation'],after:'What changed between 2015 and 2026 that makes a new agreement harder?',verified:'2026-09-06'}
      ],
      scaffold:{selector:'#jcpoa .ir-reading',title:'The JCPOA in four moves',bullets:['Iran accepted limits on enrichment, centrifuges, and its enriched-uranium stockpile.','The IAEA received expanded monitoring and verification responsibilities.','Other parties offered nuclear-related sanctions relief as Iran met its commitments.','The deal targeted the nuclear issue; it did not solve missiles, armed partners, or the wider U.S.-Iran rivalry.']},
      scaffold2:{selector:'#withdrawal .ir-reading',title:'The post-2018 causal chain',bullets:['The United States left the JCPOA and restored sanctions.','Iran later exceeded several JCPOA limits as efforts to restore the bargain failed.','Nuclear concern grew as enrichment expanded.','Diplomacy increasingly competed with sanctions, threats, and military pressure.','Every arrow still contains choices: this chain raises risk without making war inevitable.']}
    },
    'topic-06': {
      heading:'Watch the threshold move.',
      intro:'The key question is not simply which attack was biggest. Watch for the moment direct state-to-state attacks became an available response.',
      videos:[
        {label:'WATCH 1 — THE THRESHOLD',status:'REQUIRED',source:'PBS NewsHour',runtime:'8:47',title:'Middle East experts on Israel’s response to Iran’s attack',url:'https://www.pbs.org/video/region-on-edge-1713387563/',why:'The discussion explicitly contrasts decades of shadow conflict with Iran’s first direct state-on-state attack on Israel.',listen:['shadow war','precedent','retaliation'],after:'What became more thinkable after the April 2024 attack?',verified:'2026-09-06'},
        {label:'WATCH 2 — ESCALATION',status:'REQUIRED',source:'PBS NewsHour',runtime:'11:05',title:'Middle East again on edge after largest aerial attack ever launched against Israel',url:'https://www.pbs.org/video/lebanon-tape-1727817864/',why:'Compare October 2024 with April and decide whether size or precedent matters more.',listen:['ballistic missiles','retaliation','regional war'],after:'Is the most important change the size of the attack, or the precedent that direct attacks were now available?',verified:'2026-09-06'},
        {label:'WATCH 3 — TWO-VIEW ANALYSIS',status:'OPTIONAL EXTEND',source:'PBS NewsHour',runtime:'7:55',title:'What’s next after Iran’s missile barrage on Israel? Mideast experts weigh in',url:'https://www.pbs.org/video/lebanon-guest-dis-1727818135/',why:'Use competing expert interpretations to test restraint-versus-escalation logic.',listen:['deterrence','restraint','escalation'],after:'Which expert interpretation better explains what happened next?',verified:'2026-09-06'}
      ]
    },
    'topic-07': {
      heading:'See how geography becomes leverage.',
      intro:'Use the map, two BBC explainers, and the EIA numbers to connect a narrow waterway to military, economic, and diplomatic power.',
      videos:[
        {label:'WATCH 1 — CHOKEPOINT',status:'REQUIRED',source:'BBC News',runtime:'Short explainer',title:'What is the Strait of Hormuz?',url:'https://www.youtube.com/watch?v=vMn6K1COWqQ',why:'Fast visual orientation to the narrow route and the volume of energy traffic that depends on it.',listen:['chokepoint','oil','shipping'],after:'Why does narrow geography create leverage even without naval equality?',verified:'2026-09-06'},
        {label:'WATCH 2 — WHY OPENING IT IS HARD',status:'REQUIRED',source:'BBC News',runtime:'Short explainer',title:'Why it’s so hard for US to regain Strait of Hormuz from Iran',url:'https://www.youtube.com/watch?v=zMS3_5O8kF0',why:'Explains mines, fast boats, missiles, drones, escorts, and why stronger conventional forces do not automatically remove the threat.',listen:['asymmetric','mines','escort'],after:'Which Iranian capability creates the most leverage relative to its cost?',verified:'2026-09-06'},
        {label:'WATCH 3 — COMPARE TO THE 1980s',status:'TEACHER CHOICE',source:'Topic 7 Tanker War timeline + source desk',runtime:'5–10 min discussion',title:'Tanker War comparison',url:'#tankers',why:'Use the existing historical timeline and official records rather than adding another passive video.',listen:['continuity','difference','outside powers'],after:'What is one continuity and one difference between the Tanker War and the current Hormuz crisis?',verified:'2026-09-06'}
      ],
      scaffold:{selector:'#today .ir-reading',title:'That is the leverage',bullets:['Before the 2026 conflict, an estimated 21.6 million barrels per day of crude oil and petroleum liquids moved through Hormuz in Q4 2025.','The EIA estimated only 4.9 million barrels per day on average in Q2 2026 after the conflict disrupted traffic.','The numbers show the scale of disruption; they do not prove Iran’s motive.','A chokepoint converts local military risk into shipping delays, supply problems, price pressure, and diplomatic leverage.']}
    },
    'topic-08': {
      heading:'Reset, retrieve, then argue.',
      intro:'Today is a synthesis day. Use one current reset, then rewatch the earlier clip tied to the turning point you rank first.',
      videos:[
        {label:'WATCH 1 — CURRENT RESET',status:'REQUIRED EXCERPT',source:'PBS Compass Points',runtime:'Teacher selects 8–12 min from 26:46',title:'What war in Iran has revealed and what remains unknown',url:'https://www.pbs.org/video/what-war-in-iran-has-revealed-and-what-remains-unknown-wewkol/',why:'Put several explanations and uncertainties back on the table before you rank causes.',listen:['objective','uncertainty','cause'],after:'Which claim in the discussion best fits your causal ranking—and where do you disagree?',verified:'2026-09-06'},
        {label:'WATCH 2 — LATER STATUS',status:'OPTIONAL CURRENT UPDATE',source:'PBS NewsHour',runtime:'9:59',title:'Where Iran war stands as 60-day negotiating window expires',url:'https://www.pbs.org/video/war-with-iran-1786999739/',why:'Use only if the class needs a later-2026 current-event reset before writing.',listen:['negotiation','lull','risk'],after:'Does the later status of the war change which earlier turning point you rank first?',verified:'2026-09-06'},
        {label:'WATCH 3 — RETRIEVAL',status:'REQUIRED',source:'Student choice',runtime:'Rewatch 5–15 min',title:'Rewatch the earlier video tied to your #1 turning point',url:'index.html',why:'Retrieval is more useful today than another information dump. Return to Topics 2–7 and rewatch the clip connected to your strongest cause.',listen:['evidence','mechanism','counterargument'],after:'What specific detail from the video strengthens your final causal mechanism?',verified:'2026-09-06'}
      ]
    }
  }
};
