'use strict';
// Renders Midterms 6, Election Results: What Happened and Why? (midterms-results-day.js)
// to midterms/block-05.html, its paper version to midterms/print-topic-05.html, and its
// section of the teaching guide.
//
// It gathers exactly like Reading a Real Ballot: each answer is a data-slot that
// assets/js/video-first.js saves in this browser, and Gather All My Work copies them
// into Canvas with the shared record footer. No new writer of the record grammar, and
// nothing leaves the device. Clips are links that open in a new tab, never embeds.
module.exports=function(C){
 const {E,head,mast,ext,list,targets}=C;
 const count=a=>a.parts.reduce((n,p)=>n+p.questions.length,0);
 function field(label,q){
  const common=`id="${E(q.id)}" data-slot="${E(q.id)}" data-label="${E(label)}" data-prompt="${E(q.text)}"`;
  if(q.kind==='short')return `<input class="lookup-fact" ${common} placeholder="${E(q.startHere)}" autocomplete="off">`;
  return `<textarea class="response" ${common} placeholder="${E(q.startHere)}"></textarea><details class="scaffold"><summary>Start here</summary><p>${E(q.startHere)}</p></details>`;
 }
 function question(part,q,n){
  const label=`${part.title.split(':')[0]} / Question ${n}`;
  return `<section class="response-block ballot-question" data-results-question="${n}"><p class="eyebrow">Question ${n}</p><label for="${E(q.id)}"><strong>${E(q.text)}</strong></label>${q.length?`<p class="mini">${E(q.length)}</p>`:''}${field(label,q)}</section>`;
 }
 const clip=(c,i)=>`<article class="clip-card"><p class="eyebrow">Video ${i+1} · ${E(c.kind)}</p><h3>${ext(c.url,c.title,'video-link')}</h3><p class="mini">${E(c.source)}</p><p><strong>Watch for:</strong> ${E(c.prompt)}</p></article>`;
 function article(a,{paper=false}={}){
  const r=a.article;
  return `<section class="evidence-card article-summary" id="the-article"><p class="eyebrow">The article, in plain language</p><h2>Why did voters choose Democrats?</h2><p class="mini">Based on “${E(r.headline)}” by ${E(r.byline)}, ${E(r.outlet)}, ${E(r.date)}. This is a shorter version written for our class. The numbers come from the article.</p><p>${paper?`Full article: ${E(r.url)}`:`<a class="action-btn alt" href="${E(r.url)}" target="_blank" rel="noopener noreferrer">Read the full article on ${E(r.outlet)} ↗</a>`}</p><p><strong>About the poll.</strong> ${E(r.about)}</p><p><strong>${E(r.outcome)}</strong></p>${r.sections.map(s=>`<section class="article-section" id="article-section-${s.n}"><h3>Section ${s.n}: ${E(s.heading)}</h3>${s.paragraphs.map(p=>`<p>${E(p)}</p>`).join('')}</section>`).join('')}</section>`;
 }
 function resultsBox(a,{paper=false}={}){
  const r=a.results;
  return `<section class="required-route results-links"><h3 class="box-title">Where to find the results</h3><p>${E(r.note)}</p><div class="source-grid">${r.sources.map(s=>`<article><h3>${paper?E(s.title):ext(s.url,s.title)}</h3>${paper?`<p class="mini">${E(s.url)}</p>`:''}<p>${E(s.note)}</p></article>`).join('')}</div><p class="mini">${E(r.tip)}</p><p class="mini">${E(r.districtNote)}</p>${paper?'':`<p class="mini">${E(r.ballotNote)} <a href="${E(r.ballot)}">Open Reading a Real Ballot →</a></p>`}</section>`;
 }
 function page(t,{unitTitle,banner}){
  const a=t.analysis;let n=0;
  const parts=a.parts.map(p=>`<section class="ballot-part" id="part-${E(p.id)}"><h2>${E(p.title)}</h2><p>${E(p.intro)}</p>${p.results?resultsBox(a):''}${p.questions.map(q=>question(p,q,++n)).join('')}</section>`).join('');
  const total=n;
  return head(t.title)+`<body data-lesson="${E(a.key)}" data-topic-number="${E(banner)}" data-topic-title="${E(t.title)}" data-gather-heading="BeCurrent | ${E(unitTitle)} | ${E(banner)}"><a class="skip" href="#main">Skip to the lesson</a>${mast()}<main id="main"><section class="hero compact"><div class="hero-inner"><div><p class="eyebrow">${E(unitTitle)} / ${E(banner)} / Thursday, November 5</p><h1>${E(t.title)}</h1><p class="deck">${E(t.overview)}</p></div></div></section><div class="wrap">
  <section class="lesson-direction"><p class="eyebrow">Today’s question</p><h2>${E(t.question)}</h2><details><summary>Learning targets and success criteria</summary>${targets(t)}</details></section>
  <section id="student-flow" aria-label="Election results assignment"><div class="intro"><div><h2>Your assignment / ${total} questions</h2><p>Watch the videos together, read the article on this page, then work down the page on your own. One or two sentences is enough for Parts 1 and 2. A short phrase is enough for most of Part 3.</p><p class="mini">Drafts save in this browser until you submit in Canvas.</p></div><span class="work-progress" data-work-progress aria-live="polite"></span></div>
  <section class="required-route"><h3 class="box-title">Today you will submit</h3>${list([`${total} answers in three parts: why Democrats won, a warning for the winners, and what happened here at home.`,'Gather All My Work, then paste into the Canvas assignment WP6 - Results and Impact and submit.'])}<p class="mini">${E(a.privacy)} Use the Start here sentence starters, read-aloud support, or voice typing as needed. <a href="print-topic-05.html">Paper version</a></p></section>
  <section class="results-clips" id="the-videos"><h2>Watch together</h2><p>Three short videos about Tuesday night and the races still being counted. No writing yet: just listen for the Watch for question on each one.</p>${a.clips.map(clip).join('')}</section>
  ${article(a)}
  ${parts}
  <details class="student-rubric"><summary>How this assignment is assessed / ${t.points} points</summary><p>Political opinions are not scored. Short writing, dictated text, and agreed paper responses can show the same learning.</p><ul>${t.rubric.map(r=>`<li><strong>${E(r.label)}.</strong> ${E(r.description)}</li>`).join('')}</ul></details>
  <div class="filing"><h3>File your assignment</h3><ol><li>Check all ${total} answers.</li><li>Choose <strong>Gather All My Work</strong>. After any change, gather again.</li><li>Paste into the Canvas assignment WP6 - Results and Impact and submit. Check the submission confirmation.</li></ol><button class="action-btn" id="gather-work" type="button">Gather All My Work →</button><div id="copy-status" role="status" aria-live="polite"></div><label for="copy-preview">Your gathered work / manual-copy backup</label><textarea class="copy-preview" id="copy-preview" readonly hidden></textarea><button class="action-btn alt" id="select-work" type="button">Select all for manual copy</button><p class="mini">Drafts save only on this browser. Nothing reaches your teacher until you submit in Canvas. Manual copy always selects the latest work.</p></div></section>
  <p><a href="index.html">Midterms unit overview</a> · <a href="../announcements.html">Today</a></p></div></main><footer class="footer">BeCurrent / Civics / Updated ${E(a.reviewed)}</footer><script src="../assets/js/video-first-record.js?v=20261103"></script><script src="../assets/js/video-first.js?v=20261103-ballot"></script></body></html>\n`;
 }
 // The paper route: the same article, links and questions, with writing lines.
 function printable(t,{banner}){
  const a=t.analysis;let n=0;
  const lines=q=>q.kind==='short'?'<p class="writing-lines">______________________________________________________________</p>':'<p class="writing-lines">______________________________________________________________<br>______________________________________________________________<br>______________________________________________________________</p>';
  const parts=a.parts.map(p=>`<section><h2>${E(p.title)}</h2><p>${E(p.intro)}</p>${p.results?resultsBox(a,{paper:true}):''}${p.questions.map(q=>`<section class="paper-answer" data-results-question="${++n}"><p><strong>${n}. ${E(q.text)}</strong></p><p class="mini">Start here: ${E(q.startHere)}</p>${lines(q)}</section>`).join('')}</section>`).join('');
  return head(t.title+' · Printable activity')+`<body class="print-activity"><main class="wrap"><p>BeCurrent / ${E(banner)} / Name: ____________________ / Class: ________</p><h1>${E(t.title)}</h1><p>${E(t.question)}</p>${targets(t)}<h2>The videos</h2>${a.clips.map((c,i)=>`<p><strong>Video ${i+1}: ${E(c.title)}</strong> (${E(c.source)}). ${E(c.url)}<br>Watch for: ${E(c.prompt)}</p>`).join('')}${article(a,{paper:true})}${parts}<p class="mini">${E(a.privacy)}</p></main></body></html>\n`;
 }
 // The teaching guide section. Teacher-only text lives here.
 function guide(t,{banner}){
  const a=t.analysis,tc=a.teacher;let n=0;
  return `## ${banner}: ${t.title}\n\nThursday, November 5, 2026. Rebuilt on the day (Jeff, 2026-11-05). Student page: \`midterms/${t.page}\`. ${count(a)} questions in ${a.parts.length} parts, gathered into the Canvas Text Entry \`WP6 - Results and Impact\` (${t.points} points).\n\n${t.overview}\n\nQuestion: ${t.question}\n\n### Learning targets\n\n${t.learningTargets.map(x=>'- '+x.target).join('\n')}\n\n### Success criteria\n\n${t.successCriteria.map(x=>'- '+x.criteria).join('\n')}\n\n### Teacher story\n\n${tc.story}\n\n### Running it\n\n${tc.run}\n\n${tc.clipNote}\n\nAvoid: ${tc.avoid}\n\nGrading: ${tc.answer}\n\n### Clips\n\n${a.clips.map(c=>`- [${c.title}](${c.url}) · ${c.source} · ${c.kind}\n  Watch for: ${c.prompt}`).join('\n')}\n\n### The article\n\n[${a.article.headline}](${a.article.url}), ${a.article.byline}, ${a.article.outlet}, ${a.article.date}. The student page carries a plain-language summary in our own words with the poll's numbers, not the article's text.\n\n### Questions\n\n${a.parts.map(p=>`**${p.title}**\n\n${p.questions.map(q=>`${++n}. ${q.text}\n   Start here: ${q.startHere}`).join('\n')}`).join('\n\n')}\n\n### Result sources (Part 3)\n\n${a.results.sources.map(s=>`- [${s.title}](${s.url}): ${s.note}`).join('\n')}\n\n### Rubric (${t.points} points)\n\n${t.rubric.map(r=>'- '+r.label+': '+r.description).join('\n')}\n\n`;
 }
 // The Teaching OS run of show, in the same phase shape lessonPhases() returns.
 function phases(t){
  const a=t.analysis,tc=a.teacher,base=`../midterms/${t.page}`,act=(url,label)=>({url,label});
  const rows=[
   ['watch','Watch together / three videos','Tuesday night, explained','Play the three videos back to back. No writing yet; students listen for each Watch for question.',act(a.clips[0].url,'Start with video 1: '+a.clips[0].source),{links:a.clips.map(c=>({title:c.title,url:c.url,source:c.source,length:c.kind}))}],
   ['read','Read on your own','Why did voters choose Democrats?','Students read the five short sections of the article on their own screens.',act(base+'#the-article','Open the article'),{bullets:a.article.sections.map(s=>'Section '+s.n+': '+s.heading)}],
   ['why','Parts 1 and 2 / Questions 1–10','Explain why it happened','Answer in your own words, with a because. Each question names the section to look in.',act(base+'#part-why','Open Question 1'),{bullets:t.learningTargets.map(x=>x.target)}],
   ['local','Part 3 / Questions 11–16','What happened here at home?','Use the result links to find who won on Zionsville’s ballot. Write the source for each answer.',act(base+'#part-local','Open Part 3'),{bullets:['Zionsville schools: Public Question #3 and the school board','Boone County: commissioner, council, clerk','Indiana: District 4 and one statewide race','Results this week are unofficial until certified.']}],
   ['file','Gather / Canvas','WP6 - Results and Impact','Finish any open question. Then Gather All My Work, paste into Canvas, submit, and check the confirmation.',act(base+'#gather-work','Gather and submit'),{}]
  ];
  let cursor=0;
  return rows.map(([id,label,title,description,action,extra])=>{const minutes=tc.timing[id],start=cursor,p=tc.phases[id];cursor+=minutes;
   return {id,label,kind:id==='watch'?'watch':'lesson',time:`${start}–${cursor}`,start,minutes,
    screen:{eyebrow:`Midterms 6 / ${label}`,title,description,action,...extra},
    intel:{land:tc.land,ask:id==='watch'?a.clips[0].prompt:t.question,listenFor:p.lookFor,protect:id==='file'?'Protect the last five minutes for Gather, Canvas paste, and submission confirmation.':'Keep unit work before lunch.',cut:p.cut,move:p.move,model:p.model,story:tc.story,avoid:tc.avoid,reteach:p.reteach}};});
 }
 return {page,printable,guide,phases,count};
};
