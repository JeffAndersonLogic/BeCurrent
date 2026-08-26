(()=>{
  'use strict';
  const body=document.body;
  const topic=body.dataset.topic||'topic';
  const prefix=`bcv2-ukraine-${topic}-`;
  const modeButtons=[...document.querySelectorAll('[data-mode]')];
  const positions={
    'topic-03':{n:3,title:'The War Before the War',sub:'Reverse History stop · 2014'},
    'topic-04':{n:4,title:'Which Direction?',sub:'Reverse History stop · 2004–2013'},
    'topic-05':{n:5,title:'Independence Without Security',sub:'Reverse History stop · 1991–1994'},
    'topic-06':{n:6,title:'Who Owns the Past?',sub:'Final backward stop · Before 1991'}
  };
  function installPosition(){
    const pos=positions[topic];if(!pos)return;
    if(!document.querySelector('link[href="../assets/css/ukraine-position.css"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='../assets/css/ukraine-position.css';document.head.appendChild(link);}
    const journey=document.querySelector('.sticky-journey');if(!journey||document.querySelector('.uk-position'))return;
    const bar=document.createElement('div');bar.className='uk-position';bar.innerHTML=`<div class="uk-position-inner"><div><div class="uk-position-series">THE WAR IN UKRAINE · REVERSE HISTORY INVESTIGATION</div><div class="uk-position-title">Lesson ${pos.n} · ${pos.title}</div><span class="uk-position-sub">${pos.sub}</span></div><div class="uk-position-count"><strong>${pos.n}</strong> of 6 lessons</div></div>`;journey.insertAdjacentElement('afterend',bar);
  }
  installPosition();
  function setMode(mode){body.classList.toggle('teacher-on',mode==='teacher');modeButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));try{localStorage.setItem('bcv2-mode',mode)}catch(_){}}
  let savedMode='student';try{savedMode=localStorage.getItem('bcv2-mode')||'student'}catch(_){ }
  modeButtons.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));setMode(savedMode);
  const groups=[...document.querySelectorAll('[data-group]')];
  function read(key){try{const raw=localStorage.getItem(prefix+key);return raw===null?null:JSON.parse(raw)}catch(_){return null}}
  function write(key,value){try{localStorage.setItem(prefix+key,JSON.stringify(value));return true}catch(_){return false}}
  function valueOf(group){if(group.matches('textarea,input[type="text"],input[type="url"]'))return group.value;return [...group.querySelectorAll('input:checked')].map(i=>i.value)}
  groups.forEach(group=>{const saved=read(group.dataset.group);if(saved===null)return;if(group.matches('textarea,input[type="text"],input[type="url"]'))group.value=saved||'';else if(Array.isArray(saved))group.querySelectorAll('input').forEach(i=>i.checked=saved.includes(i.value))});
  function filled(key){const v=read(key);return Array.isArray(v)?v.length>0:typeof v==='string'&&v.trim()!==''}
  function update(){const keys=[...new Set(groups.map(g=>g.dataset.group))];const done=keys.filter(filled).length;document.querySelectorAll('[data-topic-progress]').forEach(el=>el.textContent=`${done} of ${keys.length} saved`)}
  document.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{const key=btn.dataset.save;const group=document.querySelector(`[data-group="${key}"]`);if(!group)return;const ok=write(key,valueOf(group));const status=document.querySelector(`[data-status="${key}"]`);if(status){status.textContent=ok?'Saved on this Chromebook':'Could not save in this browser';if(ok)setTimeout(()=>status.textContent='',2400)}update()}));
  const nav=document.querySelector('.nav .nav-inner');
  if(nav&&!nav.querySelector('a[href="study-guide.html"]')){const guide=document.createElement('a');guide.href='study-guide.html';guide.textContent='Study Guide';nav.appendChild(guide);}
  update();
})();
