'use strict';
// Renders Reading a Real Ballot (midterms-ballot.js) to midterms/reading-a-real-ballot.html.
//
// It is a video-first page so it gathers exactly like every other Midterms lesson:
// each answer is a data-slot that assets/js/video-first.js saves in this browser and
// Gather All My Work copies into Canvas with the shared record footer. No new writer
// of the record grammar, and nothing leaves the device.
module.exports=function(C){
 const {E,head,mast,ext,list}=C;
 const IMG='../assets/images/midterms/ballot/';
 function field(qn,label,q){
  const common=`id="${E(q.id)}" data-slot="${E(q.id)}" data-label="${E(label)}" data-prompt="${E(q.text)}"`;
  if(q.kind==='choice')return `<select class="lookup-fact" ${common}><option value="">${E(q.startHere)}</option>${q.options.map(o=>`<option>${E(o)}</option>`).join('')}</select>`;
  if(q.kind==='short')return `<input class="lookup-fact" ${common} placeholder="${E(q.startHere)}" autocomplete="off">`;
  return `<textarea class="response" ${common} placeholder="${E(q.startHere)}"></textarea><details class="scaffold"><summary>Start here</summary><p>${E(q.startHere)}</p></details>`;
 }
 function question(part,q,n){
  const label=`${part.title.split(':')[0]} / Question ${n}`;
  return `<section class="response-block ballot-question" data-ballot-question="${n}"><p class="eyebrow">Question ${n}</p><label for="${E(q.id)}"><strong>${E(q.text)}</strong></label>${q.length?`<p class="mini">${E(q.length)}</p>`:''}${field(n,label,q)}</section>`;
 }
 function page(a,{unitTitle,day}){
  const b=a.ballot;
  let n=0;
  const parts=a.parts.map(p=>`<section class="ballot-part" id="part-${E(p.id)}"><h2>${E(p.title)}</h2>${p.skill?`<p><strong>Skill focus: ${E(p.skill)}.</strong></p>`:''}<p>${E(p.intro)}</p>${p.questions.map(q=>question(p,q,++n)).join('')}</section>`).join('');
  const total=n;
  const pages=`<div class="ballot-pages">${b.images.map(im=>`<figure class="ballot-page"><img src="${IMG}${E(im.file)}" width="${im.w}" height="${im.h}" alt="Page ${im.page} of the ${E(b.precinct)} sample ballot" loading="${im.page<3?'eager':'lazy'}" decoding="async"><figcaption>Page ${im.page} of ${b.pages} · <a href="${IMG}${E(im.file)}" target="_blank" rel="noopener noreferrer">Open full size ↗</a></figcaption></figure>`).join('')}</div>`;
  return head(a.title)+`<body data-lesson="${E(a.key)}" data-topic-number="Election Day" data-topic-title="${E(a.title)}" data-gather-heading="BeCurrent | ${E(unitTitle)} | Election Day"><a class="skip" href="#main">Skip to the assignment</a>${mast()}<main id="main"><section class="hero compact"><div class="hero-inner"><div><p class="eyebrow">${E(unitTitle)} / Election Day / Today’s assignment</p><h1>${E(a.title)}</h1><p class="deck">${E(a.overview)}</p></div></div></section><div class="wrap">
  <section class="lesson-direction"><p class="eyebrow">Today’s question</p><h2>${E(a.question)}</h2><details><summary>Success criteria</summary>${list(a.successCriteria.map(x=>x.criteria))}</details></section>
  <section id="student-flow" aria-label="Ballot assignment"><div class="intro"><div><h2>Your assignment / ${total} short questions</h2><p>Look through the ballot below, then work down the page on your own. A word or short phrase is enough for Part 1. One or two sentences is enough everywhere else.</p><p class="mini">Drafts save in this browser until you submit in Canvas.</p></div><span class="work-progress" data-work-progress aria-live="polite"></span></div>
  <section class="required-route"><h3 class="box-title">Today you will submit</h3>${list([`${total} short answers in four parts: a scavenger hunt, think about it, before you decide, and an exit question.`,'Gather All My Work, then paste into the Canvas assignment and submit.'])}<p class="mini">${E(a.privacy)} Use the sentence starters, read-aloud support, or voice typing as needed.</p></section>
  <section class="ballot-viewer" id="the-ballot"><h2>The ballot: ${E(b.precinct)}, Zionsville</h2><p>This is the official sample ballot printed by Boone County for the November 3, 2026 general election. The red word SAMPLE means it cannot be used to vote.</p><p><a class="action-btn alt" href="${E(b.pdf)}" target="_blank" rel="noopener noreferrer">Open the ballot as a PDF ↗</a> <a href="#part-${E(a.parts[0].id)}">Skip to Question 1 ↓</a></p><p class="mini">${E(b.note)}</p>${pages}<p class="mini">Source: ${ext(b.officialUrl,'Boone County 2026 General Election sample ballot')}, ${E(b.officialPages)}, from the ${ext(b.clerkUrl,'Boone County Clerk')}. The pages here are copied from that file without changes.</p></section>
  ${parts}
  <details class="student-rubric"><summary>How this assignment is assessed / ${a.points} points</summary><p>Political preferences are not scored. Short writing, dictated text, and agreed paper responses can show the same learning.</p><ul>${a.rubric.map(r=>`<li><strong>${E(r.label)}.</strong> ${E(r.description)}</li>`).join('')}</ul></details>
  <div class="filing"><h3>File your assignment</h3><ol><li>Check all ${total} answers.</li><li>Choose <strong>Gather All My Work</strong>. After any change, gather again.</li><li>Paste into the Canvas assignment and submit. Check the submission confirmation.</li></ol><button class="action-btn" id="gather-work" type="button">Gather All My Work →</button><div id="copy-status" role="status" aria-live="polite"></div><label for="copy-preview">Your gathered work / manual-copy backup</label><textarea class="copy-preview" id="copy-preview" readonly hidden></textarea><button class="action-btn alt" id="select-work" type="button">Select all for manual copy</button><p class="mini">Drafts save only on this browser. Nothing reaches your teacher until you submit in Canvas. Manual copy always selects the latest work.</p></div></section>
  <p class="unit-next"><a href="${E(day.page)}">Back to the Election Day viewing guide →</a></p><p><a href="index.html">Midterms unit overview</a> · <a href="../announcements.html">Today</a></p></div></main><footer class="footer">BeCurrent / Civics / Updated ${E(a.reviewed)}</footer><script src="../assets/js/video-first-record.js?v=20261103"></script><script src="../assets/js/video-first.js?v=20261103-ballot"></script></body></html>\n`;
 }
 // The card on the Election Day page, so the day's one submission is not missed.
 function dayCard(a){return `<section class="required-route ballot-callout"><h3 class="box-title">Today’s assignment: ${E(a.title)}</h3><p>${E(a.overview)}</p><p><a class="action-btn" href="${E(a.page)}">Open ${E(a.title)} →</a></p></section>`;}
 // The teaching guide section. Teacher-only text lives here.
 function guide(a){const n=a.parts.reduce((s,p)=>s+p.questions.length,0);return `### Today's assignment: ${a.title}\n\n${a.overview}\n\nStudent page: \`midterms/${a.page}\`. ${n} questions in ${a.parts.length} parts, gathered into the Canvas Text Entry \`WP5 - Reading a Real Ballot\` (${a.points} points).\n\n${a.teacher.run}\n\n${a.teacher.key}\n\nAvoid: ${a.teacher.avoid}\n\n${a.parts.map(p=>`**${p.title}**\n\n${p.questions.map(q=>'- '+q.text).join('\n')}`).join('\n\n')}\n\n`;}
 return {page,dayCard,guide};
};
