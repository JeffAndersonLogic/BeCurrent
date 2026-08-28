(()=>{
  'use strict';

  const body=document.body;
  const topic=body.dataset.topic||'topic-01';
  const prefix=`bcv2-iran-${topic}-`;
  const modeButtons=[...document.querySelectorAll('[data-mode]')];

  const topics=[
    {key:'topic-01',n:1,file:'index.html',title:'The War They Are Watching',sub:'Current anchor · 2026'},
    {key:'topic-02',n:2,file:'topic-02-1953.html',title:'Why Does Iran Distrust the United States?',sub:'Historical root · 1951–1953'},
    {key:'topic-03',n:3,file:'topic-03-1979.html',title:'The Ally Becomes the Enemy',sub:'Build the chain · 1979'},
    {key:'topic-04',n:4,file:'topic-04-security.html',title:'Why Fight Far From Home?',sub:'Build the chain · 1980–1988'},
    {key:'topic-05',n:5,file:'topic-05-nuclear.html',title:'The Nuclear Bargain',sub:'Build the chain · 1957–2018'},
    {key:'topic-06',n:6,file:'topic-06-escalation.html',title:'From Shadow War to Open War',sub:'Return toward today · 2023–2026'},
    {key:'topic-07',n:7,file:'topic-07-hormuz.html',title:'The Hormuz Lever',sub:'Return to today · geography and power'},
    {key:'topic-08',n:8,file:'topic-08-synthesis.html',title:'When Did This War Really Begin?',sub:'Return to today · causation synthesis'}
  ];

  const lesson={
    'topic-01':{
      essential:'Was the 2026 Iran War mainly the result of recent decisions, or decades of unresolved conflict?',
      targets:['Describe the immediate conflict without confusing a trigger with a deeper cause.','Use regional geography to explain why Iran can affect security, shipping and energy beyond its borders.','Form a starting hypothesis and make an evidence-based claim about what most needs historical explanation.'],
      path:[['#now','Start with today'],['#map','Know the ground'],['#prediction','Make a hypothesis'],['#evidence','Test the evidence'],['#my-work','Make a claim']],
      checkpoints:[{n:1,label:'Geography',keys:['geography']},{n:2,label:'Starting hypothesis',keys:['prediction','reverse-reason']},{n:3,label:'Evidence-based claim',keys:['claim']}],
      next:'topic-02-1953.html',nextTitle:'Topic 2 · The Coup'
    },
    'topic-02':{
      essential:'How much explanatory power should historians give the 1953 coup?',
      targets:['Explain why oil nationalization became a dispute about sovereignty as well as economics.','Use declassified U.S. records to distinguish documented intervention from claims the evidence cannot prove by itself.','Judge how much causal weight 1953 deserves without treating later conflict as inevitable.'],
      path:[['#question','Start with today'],['#oil','Uncover the root'],['#coup','Build the chain'],['#memory','Return to the question'],['#claim','Make a claim']],
      checkpoints:[{n:1,label:'Historical root',keys:['reverse']},{n:2,label:'Evidence test',keys:['evidence']},{n:3,label:'Causal claim',keys:['claim']}],
      next:'topic-03-1979.html',nextTitle:'Topic 3 · The Ally Becomes the Enemy'
    },
    'topic-03':{
      essential:'Which transformed U.S.-Iran relations more: 1953 or 1979?',
      targets:['Explain why a broad coalition opposed the Shah without reducing the revolution to one cause.','Distinguish Iranian memory of 1953 from the American memory created by the hostage crisis.','Compare two turning points by explaining the mechanism through which each changed later relations.'],
      path:[['#question','Start with today'],['#ally','Uncover the root'],['#revolution','Build the chain'],['#hostages','Return toward today'],['#claim','Make a claim']],
      checkpoints:[{n:1,label:'Revolution',keys:['revolution']},{n:2,label:'Reciprocal grievance',keys:['hostages']},{n:3,label:'Comparative claim',keys:['claim']}],
      next:'topic-04-security.html',nextTitle:'Topic 4 · Why Fight Far From Home?'
    },
    'topic-04':{
      essential:"To what extent can Iran's modern regional military strategy be explained by the Iran-Iraq War?",
      targets:['Explain how invasion and wartime vulnerability can shape later security strategy.','Describe the mechanism connecting perceived vulnerability to missiles, asymmetric strategy and regional partners.','Evaluate deterrence and power projection as competing but potentially simultaneous explanations.'],
      path:[['#question','Start with today'],['#invasion','Uncover the root'],['#irgc','Build the chain'],['#network','Return toward today'],['#claim','Make a claim']],
      checkpoints:[{n:1,label:'Causal mechanism',keys:['mechanism']},{n:2,label:'Regional strategy',keys:['network']},{n:3,label:'Qualified claim',keys:['claim']}],
      next:'topic-05-nuclear.html',nextTitle:'Topic 5 · The Nuclear Bargain'
    },
    'topic-05':{
      essential:'Did the collapse of the 2015 nuclear agreement make eventual war substantially more likely?',
      targets:['Explain how the nuclear relationship changed from U.S.-Iran cooperation to international suspicion.','Describe what the JCPOA constrained, verified and deliberately left outside the agreement.','Build a causal chain from the 2018 U.S. withdrawal to later nuclear and military escalation while identifying where choices still mattered.'],
      path:[['#question','Start with today'],['#origins','Uncover the root'],['#jcpoa','Build the bargain'],['#withdrawal','Follow the break'],['#claim','Return to today']],
      checkpoints:[{n:1,label:'Nuclear origins',keys:['origins']},{n:2,label:'Causal break',keys:['withdrawal']},{n:3,label:'Evidence-based claim',keys:['claim']}],
      next:'topic-06-escalation.html',nextTitle:'Topic 6 · From Shadow War to Open War'
    },
    'topic-06':{
      essential:'At what point did full-scale Iran-Israel war become substantially more likely?',
      targets:['Explain why rivals may keep conflict below the threshold of open war.','Identify what changed when Iran and Israel exchanged direct attacks in 2024.','Defend a turning point by explaining how it changed what later leaders believed they could do.'],
      path:[['#question','Start with today'],['#shadow','Find the old limit'],['#direct','Watch the threshold move'],['#war','Return to today'],['#claim','Name the turning point']],
      checkpoints:[{n:1,label:'The old threshold',keys:['shadow']},{n:2,label:'Turning point',keys:['direct']},{n:3,label:'Causal claim',keys:['claim']}],
      next:'topic-07-hormuz.html',nextTitle:'Topic 7 · The Hormuz Lever'
    },
    'topic-07':{
      essential:'Is Hormuz primarily a military weapon, an economic weapon or a diplomatic bargaining tool?',
      targets:['Use a map to explain how a chokepoint converts geography into strategic leverage.','Connect the 1980s Tanker War to the current conflict without treating the two situations as identical.','Use current shipping data to distinguish what can be measured from what must still be interpreted.'],
      path:[['#question','Start with today'],['#map','Read the geography'],['#tankers','Uncover the root'],['#today','Return to today'],['#claim','Name the power']],
      checkpoints:[{n:1,label:'Geographic mechanism',keys:['map']},{n:2,label:'Current evidence',keys:['data']},{n:3,label:'Strategic claim',keys:['claim']}],
      next:'topic-08-synthesis.html',nextTitle:'Topic 8 · When Did This War Really Begin?'
    },
    'topic-08':{
      essential:'Was the 2026 Iran War mainly the result of recent decisions, or decades of unresolved conflict?',
      targets:['Rebuild the unit chronologically and explain the arrows connecting major turning points.','Rank causes by explanatory power rather than by age or drama.','Write a defensible final argument that distinguishes the literal start of war from its most important explanatory beginning.'],
      path:[['#question','Start with today'],['#chain','Build the chain forward'],['#rank','Rank the causes'],['#counter','Test your argument'],['#argument','Return to today']],
      checkpoints:[{n:1,label:'Causal chain',keys:['chain']},{n:2,label:'Rank the causes',keys:['ranking']},{n:3,label:'Final argument',keys:['claim']}],
      next:'index.html',nextTitle:'Return to the Iran unit'
    }
  }[topic];

  body.classList.add('iran-academic-v2');

  function setMode(mode){
    body.classList.toggle('teacher-on',mode==='teacher');
    modeButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    try{localStorage.setItem('bcv2-mode',mode)}catch(_){ }
  }
  let savedMode='student';
  try{savedMode=localStorage.getItem('bcv2-mode')||'student'}catch(_){ }
  modeButtons.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  setMode(savedMode);

  function simplifyNav(){
    const nav=document.querySelector('.nav .nav-inner');
    if(!nav)return;
    const claimAnchor=topic==='topic-01'?'#my-work':topic==='topic-08'?'#argument':'#claim';
    nav.innerHTML=`<a href="../index.html">Home</a><a href="index.html">Iran Unit</a><a href="#lesson-start">This Lesson</a><a href="${claimAnchor}">My Work</a><a href="study-guide.html">Study Guide</a>`;
  }

  function installJourney(){
    if(!lesson)return;
    const host=document.querySelector('.sticky-journey .inner');
    if(!host)return;
    host.innerHTML=lesson.path.map((p,i)=>`<a href="${p[0]}"><span class="journey-num">${i+1}</span>${p[1]}</a>${i<lesson.path.length-1?'<span class="journey-arrow">→</span>':''}`).join('');
    const bar=document.querySelector('.sticky-journey');
    if(bar)bar.setAttribute('aria-label','Five-step lesson path');
  }

  function installAcademicBrief(){
    if(!lesson)return;
    const hero=document.querySelector('.ir-hero');
    if(!hero||document.querySelector('.ir-academic-brief'))return;
    const pos=topics.find(t=>t.key===topic);
    const section=document.createElement('section');
    section.className='ir-academic-brief';
    section.id='lesson-start';
    section.innerHTML=`
      <div class="ir-topic-marker"><span>IRAN AT WAR</span><strong>Topic ${pos.n} of 8</strong><em>${pos.sub}</em></div>
      <div class="ir-essential"><div class="ir-kicker red">Essential question</div><h2>${lesson.essential}</h2></div>
      <div class="ir-targets"><div class="ir-kicker">Today you will</div><ol>${lesson.targets.map(t=>`<li>${t}</li>`).join('')}</ol></div>
      <div class="ir-method"><div class="ir-kicker">How Reverse History works in this unit</div><div class="ir-method-line"><strong>Start with today</strong><span>→</span><strong>uncover a historical root</strong><span>→</span><strong>build the chain forward</strong><span>→</span><strong>return to today</strong></div></div>`;
    hero.insertAdjacentElement('afterend',section);
  }

  function installTopicOneMap(){
    if(topic!=='topic-01'||document.querySelector('.ir-regional-map'))return;
    const paper=document.querySelector('#map .ir-paper');
    if(!paper)return;
    const block=document.createElement('div');
    block.className='ir-regional-map';
    block.innerHTML=`
      <figure>
        <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Map%20of%20Middle%20East.svg" alt="Regional map of the Middle East showing Iran, Iraq, Israel, the Persian Gulf and surrounding states" loading="lazy">
        <figcaption>Regional orientation map, Wikimedia Commons. First locate Iran, Iraq and Israel; then trace the Persian Gulf east toward the Strait of Hormuz.</figcaption>
      </figure>
      <div class="ir-map-key">
        <div class="ir-kicker red">Read the map for relationships</div>
        <h3>Locate first. Explain second.</h3>
        <p><strong>Iran ↔ Iraq:</strong> a long land border that matters to the 1980–88 war.</p>
        <p><strong>Iran ↔ Israel:</strong> no shared border, which helps explain the importance of missiles, air power and regional partners.</p>
        <p><strong>Persian Gulf → Hormuz:</strong> the route that turns regional geography into global economic leverage.</p>
      </div>`;
    paper.insertAdjacentElement('afterbegin',block);
    const current=document.querySelector('#now + .ir-section .ir-grid-4')||document.querySelector('[aria-labelledby="snapshot-title"] .ir-grid-4');
    if(current)current.classList.add('ir-current-timeline');
  }

  function moveTopicOneRoadmap(){
    if(topic!=='topic-01')return;
    const section=document.querySelector('#reverse');
    const sources=document.querySelector('#sources');
    if(!section||!sources)return;
    const h2=section.querySelector('h2');
    const p=section.querySelector('.ir-head p');
    const kicker=section.querySelector('.ir-head .ir-kicker');
    if(kicker)kicker.textContent='Unit roadmap';
    if(h2)h2.textContent='The history is uncovered backward, then rebuilt forward.';
    if(p)p.textContent='Topic 1 starts with the war students are seeing. Topic 2 uncovers an older root. From there, each lesson builds the causal chain forward until Topic 8 returns to 2026 and asks which turning point deserves the most weight.';
    sources.parentNode.insertBefore(section,sources);
    section.classList.add('ir-roadmap-section');
  }

  function installUnitNavigator(){
    if(document.querySelector('.ir-unit-navigator'))return;
    const sources=document.querySelector('#sources');
    if(!sources)return;
    const details=document.createElement('details');
    details.className='ir-unit-navigator';
    details.innerHTML=`<summary><span>Iran at War · Unit roadmap</span><strong>Topic ${topics.find(t=>t.key===topic).n} of 8</strong></summary><div class="ir-unit-list">${topics.map(t=>`<a href="${t.file}" class="${t.key===topic?'is-current':''}"><span>${String(t.n).padStart(2,'0')}</span><div><strong>${t.title}</strong><em>${t.sub}</em></div></a>`).join('')}</div>`;
    sources.parentNode.insertBefore(details,sources);
  }

  const groups=[...document.querySelectorAll('[data-group]')];

  function read(key){
    try{
      const raw=localStorage.getItem(prefix+key);
      return raw===null?null:JSON.parse(raw);
    }catch(_){return null}
  }
  function write(key,value){
    try{localStorage.setItem(prefix+key,JSON.stringify(value));return true}catch(_){return false}
  }
  function valueOf(group){
    if(group.matches('textarea,input[type="text"],input[type="url"]'))return group.value;
    return [...group.querySelectorAll('input:checked')].map(i=>i.value);
  }
  function restore(group,value){
    if(value===null)return;
    if(group.matches('textarea,input[type="text"],input[type="url"]'))group.value=value||'';
    else if(Array.isArray(value))group.querySelectorAll('input').forEach(i=>i.checked=value.includes(i.value));
  }
  groups.forEach(g=>restore(g,read(g.dataset.group)));

  document.querySelectorAll('[data-max]').forEach(group=>{
    const max=Number(group.dataset.max)||0;
    if(!max)return;
    group.addEventListener('change',event=>{
      if(!event.target.matches('input[type="checkbox"]'))return;
      const checked=[...group.querySelectorAll('input:checked')];
      if(checked.length>max)event.target.checked=false;
      const counter=group.parentElement.querySelector('[data-choice-count]');
      if(counter)counter.textContent=`${[...group.querySelectorAll('input:checked')].length} of ${max} selected`;
    });
    const counter=group.parentElement.querySelector('[data-choice-count]');
    if(counter)counter.textContent=`${[...group.querySelectorAll('input:checked')].length} of ${max} selected`;
  });

  function filled(key){
    const value=read(key);
    return Array.isArray(value)?value.length>0:typeof value==='string'&&value.trim().length>0;
  }
  function checkpointDone(cp){return cp.keys.every(filled)}

  function checkpointForKey(key){
    return lesson&&lesson.checkpoints.find(cp=>cp.keys.includes(key));
  }

  function decorateWork(){
    document.querySelectorAll('.ir-work').forEach(box=>{
      const local=[...box.querySelectorAll('[data-group]')].map(g=>g.dataset.group);
      if(!local.length)return;
      const cp=local.map(checkpointForKey).find(Boolean);
      const kicker=box.querySelector('.ir-kicker');
      if(cp){
        box.classList.add('ir-required-work');
        box.dataset.checkpoint=String(cp.n);
        if(kicker)kicker.textContent=`Checkpoint ${cp.n} · ${cp.label}`;
      }else{
        box.classList.add('ir-practice-work');
        if(kicker)kicker.textContent='Think it through · Optional note';
      }
    });
  }

  function formatSaved(keys){
    const parts=[];
    keys.forEach(key=>{
      const value=read(key);
      if(Array.isArray(value)&&value.length)parts.push(value.join(', '));
      else if(typeof value==='string'&&value.trim())parts.push(value.trim());
    });
    const text=parts.join(' — ');
    return text.length>170?text.slice(0,167)+'…':text;
  }

  function installWorkSummary(){
    if(!lesson||document.querySelector('.ir-work-summary'))return;
    const target=topic==='topic-01'?document.querySelector('#my-work'):topic==='topic-08'?document.querySelector('#argument'):document.querySelector('#claim');
    if(!target)return;
    const summary=document.createElement('div');
    summary.className='ir-work-summary';
    summary.innerHTML=`<div class="ir-kicker red">My work · 3 checkpoints</div><div class="ir-summary-grid"></div>`;
    const before=target.querySelector('.ir-work');
    if(before)target.insertBefore(summary,before);else target.appendChild(summary);
  }

  function updateWorkSummary(){
    if(!lesson)return;
    const grid=document.querySelector('.ir-work-summary .ir-summary-grid');
    if(!grid)return;
    grid.innerHTML=lesson.checkpoints.map(cp=>{
      const done=checkpointDone(cp);
      const saved=formatSaved(cp.keys);
      return `<article class="ir-summary-card ${done?'is-done':''}"><span>${done?'✓':cp.n}</span><div><strong>${cp.label}</strong><p>${saved||'Not saved yet.'}</p></div></article>`;
    }).join('');
  }

  function installCompletion(){
    if(!lesson||document.querySelector('.ir-completion'))return;
    const nextBox=document.querySelector('.ir-next');
    if(!nextBox)return;
    const parent=nextBox.closest('.ir-section')||nextBox.parentElement;
    const panel=document.createElement('section');
    panel.className='ir-completion';
    panel.innerHTML=`<div><div class="ir-kicker red">Lesson progress</div><h2 data-completion-title>Complete the three checkpoints.</h2><p data-completion-copy>Your notes stay on this Chromebook. Finish the required checkpoints before moving on.</p></div><div class="ir-completion-checks"></div>`;
    parent.parentNode.insertBefore(panel,parent);
  }

  function updateCompletion(){
    if(!lesson)return;
    const done=lesson.checkpoints.filter(checkpointDone).length;
    document.querySelectorAll('[data-topic-progress]').forEach(el=>el.textContent=`${done} of ${lesson.checkpoints.length} checkpoints complete`);
    const title=document.querySelector('[data-completion-title]');
    const copy=document.querySelector('[data-completion-copy]');
    const checks=document.querySelector('.ir-completion-checks');
    if(checks)checks.innerHTML=lesson.checkpoints.map(cp=>`<span class="${checkpointDone(cp)?'is-done':''}">${checkpointDone(cp)?'✓':'○'} ${cp.label}</span>`).join('');
    if(title&&copy){
      if(done===lesson.checkpoints.length){
        title.textContent=`Topic ${topics.find(t=>t.key===topic).n} complete ✓`;
        copy.innerHTML=`You have the required academic record for this lesson. <a href="${lesson.next}">Continue to ${lesson.nextTitle} →</a>`;
      }else{
        title.textContent=`${done} of ${lesson.checkpoints.length} checkpoints complete`;
        copy.textContent='Read everything. Save only the three checkpoints that carry the lesson’s required thinking.';
      }
    }
    updateWorkSummary();
  }

  document.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{
    const key=btn.dataset.save;
    const group=document.querySelector(`[data-group="${key}"]`);
    if(!group)return;
    const ok=write(key,valueOf(group));
    const status=document.querySelector(`[data-status="${key}"]`);
    if(status){
      status.textContent=ok?'Saved on this Chromebook':'Could not save in this browser';
      if(ok)setTimeout(()=>{status.textContent=''},2400);
    }
    updateCompletion();
  }));

  document.querySelectorAll('[data-clear-topic]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!confirm('Clear the saved work for this Iran topic on this Chromebook?'))return;
    [...new Set(groups.map(g=>g.dataset.group))].forEach(key=>{
      try{localStorage.removeItem(prefix+key)}catch(_){ }
    });
    location.reload();
  }));

  simplifyNav();
  installJourney();
  installAcademicBrief();
  installTopicOneMap();
  moveTopicOneRoadmap();
  installUnitNavigator();
  decorateWork();
  installWorkSummary();
  installCompletion();
  updateCompletion();
})();
