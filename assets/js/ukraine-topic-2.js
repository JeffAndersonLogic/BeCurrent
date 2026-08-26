(()=>{
  'use strict';
  const PREFIX='bcv2-ukraine-t2-';
  const KEYS=['source-test','turning-point','exit'];
  const MODE_KEY='bcv2-mode';
  const body=document.body;
  const modeButtons=[...document.querySelectorAll('[data-mode]')];

  function installPosition(){
    if(!document.querySelector('link[href="../assets/css/ukraine-position.css"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='../assets/css/ukraine-position.css';document.head.appendChild(link);}
    const journey=document.querySelector('.sticky-journey');
    if(!journey||document.querySelector('.uk-position'))return;
    const bar=document.createElement('div');bar.className='uk-position';bar.innerHTML='<div class="uk-position-inner"><div><div class="uk-position-series">THE WAR IN UKRAINE · REVERSE HISTORY INVESTIGATION</div><div class="uk-position-title">Topic 2 · The Full-Scale Invasion</div><span class="uk-position-sub">Reverse History stop · 2022</span></div><div class="uk-position-count"><strong>2</strong> of 6 topics</div></div>';
    journey.insertAdjacentElement('afterend',bar);
  }
  installPosition();

  function setMode(mode){body.classList.toggle('teacher-on',mode==='teacher');modeButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.mode===mode)));try{localStorage.setItem(MODE_KEY,mode);}catch(_){}}
  modeButtons.forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
  let mode='student';try{mode=localStorage.getItem(MODE_KEY)||'student';}catch(_){}setMode(mode);
  function read(key){try{const raw=localStorage.getItem(PREFIX+key);return raw===null?'':JSON.parse(raw);}catch(_){return '';}}
  function write(key,val){try{localStorage.setItem(PREFIX+key,JSON.stringify(val));return true;}catch(_){return false;}}
  document.querySelectorAll('[data-group]').forEach(el=>{const val=read(el.dataset.group);if(typeof val==='string')el.value=val;});
  document.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{const key=btn.dataset.save;const field=document.querySelector(`[data-group="${key}"]`);if(!field)return;const ok=write(key,field.value||'');const status=document.querySelector(`[data-status="${key}"]`);if(status){status.textContent=ok?'Saved on this Chromebook':'Could not save in this browser';if(ok)setTimeout(()=>{status.textContent='';},2400);}updateProgress();}));
  function filled(key){return String(read(key)||'').trim().length>0;}
  function updateProgress(){const done=KEYS.filter(filled).length;document.querySelectorAll('[data-t2-progress]').forEach(el=>el.textContent=`${done} of ${KEYS.length} saved`);}
  const next=document.querySelector('.t2-next a');if(next){next.href='topic-03-2014.html';next.textContent='Continue to Topic 3 · The War Before the War →';}
  const nav=document.querySelector('.nav .nav-inner');if(nav&&!nav.querySelector('a[href="study-guide.html"]')){const guide=document.createElement('a');guide.href='study-guide.html';guide.textContent='Study Guide';nav.appendChild(guide);}
  updateProgress();
})();
