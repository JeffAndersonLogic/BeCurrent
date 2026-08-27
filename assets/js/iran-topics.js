(()=>{
  'use strict';

  const body=document.body;
  const topic=body.dataset.topic||'topic-01';
  const prefix=`bcv2-iran-${topic}-`;
  const modeButtons=[...document.querySelectorAll('[data-mode]')];

  const positions={
    'topic-01':{n:1,title:'The War They Are Watching',sub:'Current anchor · 2026'},
    'topic-02':{n:2,title:'Why Does Iran Distrust the United States?',sub:'Reverse History stop · 1951–1953'},
    'topic-03':{n:3,title:'The Ally Becomes the Enemy',sub:'Reverse History stop · 1979'},
    'topic-04':{n:4,title:'Why Fight Far From Home?',sub:'Reverse History stop · 1980–1988'},
    'topic-05':{n:5,title:'The Nuclear Bargain',sub:'Reverse History thread · 1957–2018'},
    'topic-06':{n:6,title:'From Shadow War to Open War',sub:'Reverse History stop · 2023–2026'},
    'topic-07':{n:7,title:'The Hormuz Lever',sub:'Geography becomes power'},
    'topic-08':{n:8,title:'When Did This War Really Begin?',sub:'Causation synthesis'}
  };

  function installPosition(){
    const pos=positions[topic];
    if(!pos||document.querySelector('.ir-position'))return;
    const anchor=document.querySelector('.sticky-journey')||document.querySelector('.mast');
    if(!anchor)return;
    const bar=document.createElement('div');
    bar.className='ir-position';
    bar.innerHTML=`<div class="ir-position-inner"><div><div class="ir-position-series">IRAN AT WAR · REVERSE HISTORY INVESTIGATION</div><div class="ir-position-title">Topic ${pos.n} · ${pos.title}</div><span class="ir-position-series">${pos.sub}</span></div><div class="ir-position-count"><strong>${pos.n}</strong> of 8 topics</div></div>`;
    anchor.insertAdjacentElement('afterend',bar);
  }

  function installStudyGuide(){
    const nav=document.querySelector('.nav .nav-inner');
    if(!nav||nav.querySelector('a[href="study-guide.html"]'))return;
    const guide=document.createElement('a');
    guide.href='study-guide.html';
    guide.textContent='Study Guide';
    nav.appendChild(guide);
  }

  function setMode(mode){
    body.classList.toggle('teacher-on',mode==='teacher');
    modeButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    try{localStorage.setItem('bcv2-mode',mode)}catch(_){ }
  }
  let savedMode='student';
  try{savedMode=localStorage.getItem('bcv2-mode')||'student'}catch(_){ }
  modeButtons.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  setMode(savedMode);
  installPosition();
  installStudyGuide();

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
  function updateProgress(){
    const keys=[...new Set(groups.map(g=>g.dataset.group))];
    const done=keys.filter(filled).length;
    document.querySelectorAll('[data-topic-progress]').forEach(el=>el.textContent=`${done} of ${keys.length} saved`);
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
    updateProgress();
  }));

  document.querySelectorAll('[data-clear-topic]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!confirm('Clear the saved work for this Iran topic on this Chromebook?'))return;
    [...new Set(groups.map(g=>g.dataset.group))].forEach(key=>{
      try{localStorage.removeItem(prefix+key)}catch(_){ }
    });
    location.reload();
  }));

  updateProgress();
})();
