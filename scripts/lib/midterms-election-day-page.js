'use strict';
// Renders the Election Day viewing guide from midterms-election-day.js.
// One page with no text boxes and no script, so nothing can be stranded in a browser.
// Clips are links that open in a new tab, never embeds. Today's writing is the ballot assignment.
module.exports=function(C){
 const {E,head,mast,targets,ext,figure}=C;
 const B=require('./midterms-ballot-page')(C);
 const longDate='Tuesday, November 3, 2026';
 function page(d,{unitTitle,next}){
  const steps=`<ol class="ed-steps">${d.steps.map(([a,b])=>`<li><strong>${E(a)}</strong><span>${E(b)}</span></li>`).join('')}</ol>`;
  const cards=rows=>`<div class="vocabulary">${rows.map(([a,b])=>`<article><strong>${E(a)}</strong><p>${E(b)}</p></article>`).join('')}</div>`;
  const kinds=`<div class="vocabulary ed-kinds">${d.kinds.map(([a,b],i)=>`<article><strong><span class="ed-kind-n">${i+1}</span>${E(a)}</strong><p>${E(b)}</p></article>`).join('')}</div>`;
  const clip=c=>`<article class="clip-card"><p class="eyebrow">${c.live?'Live stream':'Watch together'}${c.duration?' · '+E(c.duration):''}</p><h3>${ext(c.url,c.title,'video-link')}</h3><p class="mini">${E(c.source)}${c.date?' · Published '+E(c.date):''}</p><p><strong>Watch for:</strong> ${E(c.prompt)}</p></article>`;
  const clips=b=>b?`<section class="ed-clips"><h2>${E(b.title)}</h2><p>${E(b.text)}</p>${b.clips.map(clip).join('')}</section>`:'';
  const sources=`<div class="source-grid">${d.sources.map(s=>`<article><h3>${ext(s.url,s.title)}</h3><p>${E(s.note)}</p></article>`).join('')}</div>`;
  return head(d.title)+`<body class="election-day" data-lesson="${E(d.key)}"><a class="skip" href="#main">Skip to the guide</a>${mast()}<main id="main"><section class="hero compact"><div class="hero-inner"><div><p class="eyebrow">${E(unitTitle)} / Election Day / ${longDate}</p><h1>${E(d.title)}</h1><p class="deck">${E(d.overview)}</p></div>${figure(d.hero,'hero-photo',{lazy:false})}</div></section><div class="wrap">
  <section class="lesson-direction"><p class="eyebrow">Today’s question</p><h2>${E(d.question)}</h2><details><summary>Learning targets and success criteria</summary>${targets(d)}</details></section>
  <section class="required-route"><h3 class="box-title">Before you watch: one rule</h3><p>${E(d.bigIdea)}</p>${d.assignment?'<p class="mini">Today’s one Canvas submission is the ballot assignment below.</p>':''}</section>${clips(d.intro)}${d.assignment?B.dayCard(d.assignment):''}
  <section><h2>How a vote becomes a result</h2><p>Every step below happens in this order. Today we are watching the first two.</p>${steps}</section>
  <section><h2>Words you will hear</h2>${cards(d.terms)}</section>
  <section><h2>Five kinds of statement</h2><p>Everything the coverage says fits one of these. Sorting them in your head while you watch is today’s job.</p>${kinds}</section>${clips(d.live)}
  <section class="evidence-card"><h3 class="box-title">${E(d.tonight.title)}</h3><p>${E(d.tonight.text)}</p><p>${E(d.tonight.race)}</p></section>
  <details class="source-section"><summary>Where results will appear after polls close</summary><p>No 2026 results are on this page. These sources start reporting after 6 p.m. Every election-night total is unofficial.</p>${sources}<p class="mini">Checked ${E(d.reviewed)}. Recheck before class.</p></details>
  <p class="unit-next no-print"><a href="${E(next.page)}">Thursday: ${E(next.title)} →</a></p><p class="no-print"><a href="index.html">Return to the unit overview</a> · <a href="../announcements.html">Today</a></p></div></main><footer class="footer">BeCurrent / Civics / Updated ${E(d.reviewed)}</footer></body></html>\n`;
 }
 // The unit page card, slotted between Topic 4 and Topic 5.
 function card(d){return `<li class="topic-card election-day-card"><span class="chapter-num">Nov 3</span>${figure(d.hero,'topic-thumb',{caption:false})}<div class="copy"><h3>${E(d.title)}</h3><p>${E(d.overview)}</p><a class="cta" href="${E(d.page)}">Open the Election Day guide →</a><details><summary>Learning targets and success criteria</summary>${targets(d)}</details></div><span class="pill live">Election Day</span></li>`;}
 // The teaching guide section. Teacher-only text lives here and nowhere a student reads.
 function guide(d){const t=d.teacher;return `## Election Day: ${d.title}\n\n${longDate}. A viewing day beside the five topics, not a topic. Two short clips, then live coverage${d.assignment?'. One Canvas assignment: '+d.assignment.title:'; no Canvas assignment'}.\n\n${d.overview}\n\nQuestion: ${d.question}\n\n### Learning targets\n\n${d.learningTargets.map(x=>'- '+x.target).join('\n')}\n\n### Success criteria\n\n${d.successCriteria.map(x=>'- '+x.criteria).join('\n')}\n\n### Teacher story\n\n${t.story}\n\n### Choosing the coverage\n\n${t.coverage}\n\n### Running it\n\n${t.pauses}\n\n${t.afterLunch}\n\nIf there is no live coverage: ${t.fallback}\n\nListen for: ${t.listenFor}\n\nAvoid: ${t.avoid}\n\n### The rule students carry in\n\n${d.bigIdea}\n\n### Clips\n\n${[d.intro,d.live].filter(Boolean).map(b=>'**'+b.title+'**\n\n'+b.clips.map(c=>`- [${c.title}](${c.url}) · ${c.source}${c.duration?' · '+c.duration:''}\n  Watch for: ${c.prompt}`).join('\n')).join('\n\n')}\n\n${d.assignment?B.guide(d.assignment):''}`;}
 return {page,card,guide,ballotPage:B.page};
};
