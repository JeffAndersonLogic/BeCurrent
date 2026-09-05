// BeCurrent Iran at War — video-forward accessibility layer
// Hand-authored progressive enhancement for the bespoke Iran narrative pages.
// Keeps the original page content as a fallback; inserts vetted video cards and
// collapses selected long exposition into optional full-background details.
(()=>{
  'use strict';

  const CATALOG={
    'topic-01':{
      heading:'Watch the war before you explain it.',
      intro:'Use current reporting to establish what happened, what remains uncertain, and why geography matters before tracing the conflict backward.',
      videos:[
        {label:'WATCH 1 — THE STORY',status:'REQUIRED',source:'PBS NewsHour',runtime:'9:19',title:'As Iran expands retaliatory attacks, U.S. urges Americans to leave Middle East',url:'https://www.pbs.org/newshour/show/march-2-2026-pbs-news-hour-full-episode',why:'Establish the opening-war picture: U.S.-Israeli strikes, Iranian retaliation, and the widening regional conflict.',listen:['retaliation','regional conflict','military objectives'],after:'What is one thing you can verify happened, and one thing this report cannot prove about why leaders acted?'},
        {label:'WATCH 2 — PERSPECTIVE',status:'REQUIRED',source:'PBS NewsHour',runtime:'9:09',title:'Expert panel breaks down U.S. objectives in Iran war',url:'https://www.pbs.org/video/war-with-iran-panel-1772489436/',why:'Three Iran specialists offer different interpretations of U.S. objectives. Treat the claims as arguments to test, not automatic facts.',listen:['objective','deterrence','regime'],after:'Which claim in the panel would require the most outside evidence before you accepted it?'},
        {label:'WATCH 3 — CONSEQUENCES',status:'REQUIRED',source:'PBS NewsHour',runtime:'7:17',title:'How the war in Iran is impacting global energy markets',url:'https://www.pbs.org/newshour/show/march-2-2026-pbs-news-hour-full-episode',why:'Preview the Strait of Hormuz and see why a regional military conflict can become a global economic problem.',listen:['oil','shipping','Hormuz'],after:'How can geography make a regional war a global economic problem?'}
      ]
    },
    'topic-02':{
      heading:'See the coup, then test what the archive proves.',
      intro:'The videos carry most of the narrative. The declassified record remains the evidence you use to verify U.S. involvement.',
      videos:[
        {label:'WATCH 1 — THE STORY',status:'REQUIRED',source:'PBS American Experience',runtime:'6:08',title:'Operation Ajax',url:'https://www.pbs.org/video/operation-ajax/',why:'Archival explanation of the secret U.S.-British operation surrounding Mohammad Mosaddegh and the 1953 crisis.',listen:['Mosaddegh','oil','CIA'],after:'What does the clip establish about foreign involvement, and what does it not establish about Iranian politics?'},
        {label:'WATCH 2 — THE LONGER STORY',status:'REQUIRED',source:'PBS American Experience',runtime:'10:07',title:'Taken Hostage, Part 1 — Chapter 1',url:'https://www.pbs.org/video/chapter-1-taken-hostage-part-1/',why:'Carry 1953 forward toward the Shah and the eventual collapse of the U.S.-Iran alliance.',listen:['Shah','alliance','resentment'],after:'Why can a historical intervention matter again decades after the operation itself ends?'},
        {label:'WATCH 3 — DOCUMENTARY',status:'OPTIONAL EXTEND',source:'PBS American Experience',runtime:'Long-form',title:'Taken Hostage',url:'https://www.pbs.org/wgbh/americanexperience/films/taken-hostage/',why:'Use teacher-selected excerpts for additional historical depth. The full documentary is not required.',listen:['memory','revolution','hostages'],after:'Which later development makes 1953 more politically important than it might otherwise have been?'}
      ]
    },
    'topic-03':{
      heading:'Watch an alliance collapse.',
      intro:'Use archival storytelling to understand the revolution and hostage crisis, then compare the different historical memories each country carried forward.',
      videos:[
        {label:'WATCH 1 — REVOLUTION CONTEXT',status:'REQUIRED / REPLAY EXCERPT',source:'PBS American Experience',runtime:'10:07',title:'Taken Hostage, Part 1 — Chapter 1',url:'https://www.pbs.org/video/chapter-1-taken-hostage-part-1/',why:'If you watched the full clip in Topic 2, replay only the section your teacher selects. Focus now on the Shah, opposition, and the collapsing alliance.',listen:['Shah','opposition','United States'],after:'Why can support for an ally create resentment toward the ally’s supporter?'},
        {label:'WATCH 2 — HOSTAGE CRISIS',status:'REQUIRED',source:'PBS American Experience',runtime:'10:34',title:'Taken Hostage, Part 2 — Chapter 1',url:'https://www.pbs.org/video/chapter-1-taken-hostage-part-2/',why:'Give the embassy seizure and hostage crisis the human and political weight needed to understand American historical memory.',listen:['embassy','hostages','Carter'],after:'What did the hostage crisis add to U.S.-Iran hostility that 1953 did not?'},
        {label:'WATCH 3 — DOCUMENTARY',status:'OPTIONAL EXTEND',source:'PBS American Experience',runtime:'Long-form',title:'Taken Hostage — Part 2',url:'https://www.pbs.org/wgbh/americanexperience/films/taken-hostage/',why:'Use a teacher-selected excerpt if more depth on the 444-day crisis is useful.',listen:['444 days','diplomacy','memory'],after:'Which event would be most likely to shape public memory decades later, and why?'}
      ]
    },
    'topic-04':{
      heading:'Experience the war, then examine the strategy it helped shape.',
      intro:'The first documentary excerpt makes the Iran-Iraq War concrete. The second clip helps you test how that experience connects to Iran’s later regional network.',
      videos:[
        {label:'WATCH 1 — WAR EXPERIENCE',status:'REQUIRED EXCERPT',source:'BBC World Service',runtime:'~13 min',title:'The untold story of the Iran-Iraq war’s frontline children',url:'https://www.youtube.com/watch?v=aHZRvpuW8QM&t=232s',why:'Watch approximately 3:52–17:03 for the war’s opening, mobilization, ideology, and firsthand battlefield memories.',listen:['invasion','mobilization','vulnerability'],after:'What lesson might leaders draw from surviving this kind of war?'},
        {label:'WATCH 2 — THE NETWORK',status:'REQUIRED',source:'BBC News',runtime:'Short explainer',title:'What is Iran’s “Axis of Resistance”?',url:'https://www.youtube.com/watch?v=gtLlqDGQItw',why:'Map Iran-linked armed groups across the region and test how useful the word “proxy” really is.',listen:['IRGC','alliance','proxy'],after:'Where does the word “proxy” help, and where might it imply more Iranian control than the evidence supports?'},
        {label:'WATCH 3 — DEEP DIVE',status:'OPTIONAL EXTEND',source:'BBC World Service',runtime:'Teacher-selected chapters',title:'Hamas, Hezbollah, Houthis — Iran’s proxies at work',url:'https://www.youtube.com/watch?v=C2wTk6b9Wgc',why:'Use selected chapters on Iraq, Hezbollah, or the Houthis rather than the full program.',listen:['partner','influence','autonomy'],after:'Which relationship seems most like an alliance, and which seems most like direct proxy control?'}
      ],
      scaffold:{selector:'#irgc .ir-reading',title:'What Matters',bullets:['The IRGC was created after the 1979 revolution to defend the new political system.','The Iran-Iraq War made the IRGC larger and more capable.','Iran developed missiles, drones, irregular tactics, and partner relationships rather than trying to match stronger rivals weapon for weapon.','The Quds Force became the main IRGC organization for relationships with armed groups outside Iran.','The war mattered, but ideology, Lebanon, later U.S. deployments, and regional competition also shaped the strategy.']}
    },
    'topic-05':{
      heading:'Understand the bargain before judging why it failed.',
      intro:'Use the videos for the diplomatic story. Keep the IAEA evidence and the post-2018 causal chain for your own analysis.',
      videos:[
        {label:'WATCH 1 — WHAT THE DEAL DID',status:'REQUIRED',source:'PBS NewsHour',runtime:'7:27',title:'What’s in the Iran nuclear framework agreement?',url:'https://www.pbs.org/video/iran-nuclear-agreement-sets-path-for-final-accord-1435189432/',why:'Contemporary reporting explains verification, limits, sanctions relief, and competing reactions while the agreement was being built.',listen:['enrichment','verification','sanctions'],after:'What problem was this agreement designed to solve—and what problems was it not designed to solve?'},
        {label:'WATCH 2 — WHY IT BROKE',status:'REQUIRED EXCERPT',source:'BBC News / The Global Story',runtime:'~16:35',title:'Why was the last US nuclear deal with Iran ripped up?',url:'https://www.youtube.com/watch?v=-6TVgqxi7q0&t=85s',why:'Watch approximately 1:25–18:00. Former lead U.S. negotiator Wendy Sherman explains how the JCPOA formed, what it did, and why critics opposed it.',listen:['bargain','limits','criticism'],after:'Which criticism of the JCPOA is strongest, and does that criticism prove withdrawal was the best alternative?'},
        {label:'WATCH 3 — CURRENT CONNECTION',status:'OPTIONAL EXTEND',source:'BBC News / The Global Story',runtime:'~5 min',title:'How 2015 compares with the 2026 negotiating environment',url:'https://www.youtube.com/watch?v=-6TVgqxi7q0&t=1080s',why:'Continue from about 18:00 to connect the old bargain to the current conflict.',listen:['trust','leverage','negotiation'],after:'What changed between 2015 and 2026 that makes a new agreement harder?'}
      ],
      scaffold:{selector:'#jcpoa .ir-reading',title:'The JCPOA in four moves',bullets:['Iran accepted limits on enrichment, centrifuges, and its enriched-uranium stockpile.','The IAEA received expanded monitoring and verification responsibilities.','Other parties offered nuclear-related sanctions relief as Iran met its commitments.','The deal targeted the nuclear issue; it did not solve missiles, armed partners, or the wider U.S.-Iran rivalry.']},
      scaffold2:{selector:'#withdrawal .ir-reading',title:'The post-2018 causal chain',bullets:['The United States left the JCPOA and restored sanctions.','Iran later exceeded several JCPOA limits as efforts to restore the bargain failed.','Nuclear concern grew as enrichment expanded.','Diplomacy increasingly competed with sanctions, threats, and military pressure.','Every arrow still contains choices: this chain raises risk without making war inevitable.']}
    },
    'topic-06':{
      heading:'Watch the threshold move.',
      intro:'The key question is not simply which attack was biggest. Watch for the moment direct state-to-state attacks became an available response.',
      videos:[
        {label:'WATCH 1 — THE THRESHOLD',status:'REQUIRED',source:'PBS NewsHour',runtime:'8:47',title:'Middle East experts on Israel’s response to Iran’s attack',url:'https://www.pbs.org/video/region-on-edge-1713387563/',why:'The discussion explicitly contrasts decades of shadow conflict with Iran’s first direct state-on-state attack on Israel.',listen:['shadow war','precedent','retaliation'],after:'What became more thinkable after the April 2024 attack?'},
        {label:'WATCH 2 — ESCALATION',status:'REQUIRED',source:'PBS NewsHour',runtime:'~11 min',title:'Middle East again on edge after largest aerial attack ever launched against Israel',url:'https://www.pbs.org/newshour/show/october-1-2024-pbs-news-hour-full-episode',why:'Compare October 2024 with April and decide whether size or precedent matters more.',listen:['ballistic missiles','retaliation','regional war'],after:'Is the most important change the size of the attack, or the precedent that direct attacks were now available?'},
        {label:'WATCH 3 — TWO-VIEW ANALYSIS',status:'OPTIONAL EXTEND',source:'PBS NewsHour',runtime:'~8 min',title:'What’s next after Iran’s missile barrage on Israel? Mideast experts weigh in',url:'https://www.pbs.org/newshour/show/october-1-2024-pbs-news-hour-full-episode',why:'Use competing expert interpretations to test restraint-versus-escalation logic.',listen:['deterrence','restraint','escalation'],after:'Which expert interpretation better explains what happened next?'}
      ]
    },
    'topic-07':{
      heading:'See how geography becomes leverage.',
      intro:'Use the map, two BBC explainers, and the EIA numbers to connect a narrow waterway to military, economic, and diplomatic power.',
      videos:[
        {label:'WATCH 1 — CHOKEPOINT',status:'REQUIRED',source:'BBC News',runtime:'Short explainer',title:'What is the Strait of Hormuz?',url:'https://www.youtube.com/watch?v=vMn6K1COWqQ',why:'Fast visual orientation to the narrow route and the volume of energy traffic that depends on it.',listen:['chokepoint','oil','shipping'],after:'Why does narrow geography create leverage even without naval equality?'},
        {label:'WATCH 2 — WHY OPENING IT IS HARD',status:'REQUIRED',source:'BBC News',runtime:'Short explainer',title:'Why it’s so hard for US to regain Strait of Hormuz from Iran',url:'https://www.youtube.com/watch?v=zMS3_5O8kF0',why:'Explains mines, fast boats, missiles, drones, escorts, and why stronger conventional forces do not automatically remove the threat.',listen:['asymmetric','mines','escort'],after:'Which Iranian capability creates the most leverage relative to its cost?'},
        {label:'WATCH 3 — COMPARE TO THE 1980s',status:'OPTIONAL TEACHER EXTEND',source:'Use the Topic 7 Tanker War timeline + source desk',runtime:'5–10 min discussion',title:'Tanker War comparison',url:'#tankers',why:'Rather than adding a weaker outside source, use the existing historical timeline and official records to compare the 1980s with 2026.',listen:['continuity','difference','outside powers'],after:'What is one continuity and one difference between the Tanker War and the current Hormuz crisis?'}
      ],
      scaffold:{selector:'#today .ir-reading',title:'That is the leverage',bullets:['Before the 2026 conflict, an estimated 21.6 million barrels per day of crude oil and petroleum liquids moved through Hormuz in Q4 2025.','The EIA estimated only 4.9 million barrels per day on average in Q2 2026 after the conflict disrupted traffic.','The numbers show the scale of disruption; they do not prove Iran’s motive.','A chokepoint converts local military risk into shipping delays, supply problems, price pressure, and diplomatic leverage.']}
    },
    'topic-08':{
      heading:'Reset, retrieve, then argue.',
      intro:'Today is a synthesis day. Use one current reset, then rewatch the earlier clip tied to the turning point you rank first.',
      videos:[
        {label:'WATCH 1 — CURRENT RESET',status:'REQUIRED EXCERPT',source:'PBS Compass Points',runtime:'Teacher selects 8–12 min',title:'What war in Iran has revealed and what remains unknown',url:'https://www.pbs.org/video/what-war-in-iran-has-revealed-and-what-remains-unknown-wewkol/',why:'Put several explanations and uncertainties back on the table before you rank causes.',listen:['objective','uncertainty','cause'],after:'Which claim in the discussion best fits your causal ranking—and where do you disagree?'},
        {label:'WATCH 2 — LATER STATUS',status:'OPTIONAL CURRENT UPDATE',source:'PBS NewsHour',runtime:'9:59',title:'Where Iran war stands as 60-day negotiating window expires',url:'https://www.pbs.org/video/war-with-iran-1786999739/',why:'Use only if the class needs a later-2026 current-event reset before writing.',listen:['negotiation','lull','risk'],after:'Does the later status of the war change which earlier turning point you rank first?'},
        {label:'WATCH 3 — RETRIEVAL',status:'REQUIRED',source:'Student choice',runtime:'Rewatch 5–15 min',title:'Rewatch the earlier video tied to your #1 turning point',url:'index.html',why:'Retrieval is more useful today than another information dump. Return to Topics 2–7 and rewatch the clip connected to your strongest cause.',listen:['evidence','mechanism','counterargument'],after:'What specific detail from the video strengthens your final causal mechanism?'}
      ]
    }
  };

  const topic=document.body.dataset.topic;
  const guide=CATALOG[topic];
  if(!guide)return;

  const css=`
  .ir-video-forward{margin:24px 0 34px;border:1px solid rgba(237,232,220,.16);background:linear-gradient(180deg,rgba(27,58,92,.34),rgba(26,28,29,.96));box-shadow:0 18px 40px rgba(0,0,0,.18)}
  .ir-video-forward-head{padding:22px 24px;border-bottom:1px solid rgba(237,232,220,.12)}
  .ir-video-forward-head h2{margin:.2rem 0 .45rem;font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.7rem,3vw,2.4rem)}
  .ir-video-forward-head p{max-width:76ch;margin:0;color:#c8c2b2}
  .ir-watch-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(237,232,220,.12)}
  .ir-watch{background:#1a1c1d;padding:20px;display:flex;flex-direction:column;min-height:100%}
  .ir-watch-meta{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:12px;font-family:'IBM Plex Mono',monospace;font-size:.7rem;letter-spacing:.05em;text-transform:uppercase}
  .ir-watch-status{color:#ede8dc;background:#b03a2e;padding:4px 7px;border-radius:2px;white-space:nowrap}
  .ir-watch-status.optional{background:#2c3138;color:#c8c2b2}
  .ir-watch h3{font-size:1.15rem;line-height:1.25;margin:.15rem 0 .35rem}
  .ir-watch-source{font-family:'IBM Plex Mono',monospace;font-size:.75rem;color:#3a6fa8;margin-bottom:12px}
  .ir-watch p{font-size:.94rem;line-height:1.55;color:#c8c2b2}
  .ir-watch-cues{margin:10px 0 14px;padding:10px 12px;background:#22262b;border-left:3px solid #3a6fa8;font-size:.86rem;color:#ede8dc}
  .ir-watch-cues strong{display:block;color:#fff;margin-bottom:3px}
  .ir-watch a.ir-watch-link{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;padding:11px 13px;background:#1b3a5c;color:#fff;text-decoration:none;font-weight:700;border-radius:2px}
  .ir-watch a.ir-watch-link:hover,.ir-watch a.ir-watch-link:focus{background:#244d78}
  .ir-scaffold{margin:16px 0;padding:18px 20px;background:#f7f3ec;color:#17191a;border-left:5px solid #1b3a5c}
  .ir-scaffold h3{color:#17191a;margin:0 0 8px}
  .ir-scaffold ul{margin:0;padding-left:1.25rem}.ir-scaffold li{margin:.38rem 0;line-height:1.45}
  details.ir-full-background{margin-top:10px;border:1px solid rgba(237,232,220,.14);background:#22262b}
  details.ir-full-background>summary{cursor:pointer;padding:12px 14px;font-family:'IBM Plex Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em;color:#c8c2b2}
  details.ir-full-background .ir-reading{margin:0;border:0;box-shadow:none}
  @media(max-width:900px){.ir-watch-grid{grid-template-columns:1fr}.ir-watch{min-height:0}}
  `;
  const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);

  const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const card=v=>`<article class="ir-watch"><div class="ir-watch-meta"><span>${esc(v.label)}</span><span class="ir-watch-status ${/OPTIONAL/.test(v.status)?'optional':''}">${esc(v.status)}</span></div><h3>${esc(v.title)}</h3><div class="ir-watch-source">${esc(v.source)} · ${esc(v.runtime)}</div><p><strong>Why you’re watching:</strong> ${esc(v.why)}</p><div class="ir-watch-cues"><strong>Listen for</strong>${v.listen.map(esc).join(' · ')}</div><p><strong>After watching:</strong> ${esc(v.after)}</p><a class="ir-watch-link" href="${esc(v.url)}" ${/^https?:/.test(v.url)?'target="_blank" rel="noopener noreferrer"':''}>Open video / resource →</a></article>`;

  function installVideos(){
    if(document.querySelector('.ir-video-forward'))return;
    const section=document.createElement('section');
    section.className='ir-video-forward';
    section.id='watch';
    section.setAttribute('aria-labelledby','watch-title');
    section.innerHTML=`<div class="ir-video-forward-head"><div class="ir-kicker red">Video-forward pathway</div><h2 id="watch-title">${esc(guide.heading)}</h2><p>${esc(guide.intro)}</p></div><div class="ir-watch-grid">${guide.videos.map(card).join('')}</div>`;
    const objectives=document.getElementById('objectives');
    const hero=document.querySelector('.ir-hero');
    (objectives||hero)?.insertAdjacentElement('afterend',section);
  }

  function installScaffold(spec){
    if(!spec)return;
    const original=document.querySelector(spec.selector);
    if(!original||original.closest('details.ir-full-background'))return;
    const box=document.createElement('div');
    box.className='ir-scaffold';
    box.innerHTML=`<h3>${esc(spec.title)}</h3><ul>${spec.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>`;
    original.insertAdjacentElement('beforebegin',box);
    const details=document.createElement('details');
    details.className='ir-full-background';
    details.innerHTML='<summary>Read the full background (optional)</summary>';
    original.parentNode.insertBefore(details,original);
    details.appendChild(original);
  }

  // The generated Iran browser layer inserts objectives synchronously before this
  // file runs on the current pages. If loading order changes, hero is the fallback.
  installVideos();
  installScaffold(guide.scaffold);
  installScaffold(guide.scaffold2);
})();
