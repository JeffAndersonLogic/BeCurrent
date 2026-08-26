(()=>{
  'use strict';
  const PREFIX='bcv2-ukraine-t2-';
  const KEYS=['source-test','turning-point','exit'];
  const MODE_KEY='bcv2-mode';
  const body=document.body;
  const modeButtons=[...document.querySelectorAll('[data-mode]')];

  function setMode(mode){
    body.classList.toggle('teacher-on',mode==='teacher');
    modeButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.mode===mode)));
    try{localStorage.setItem(MODE_KEY,mode);}catch(_){/* local only */}
  }
  modeButtons.forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
  let mode='student';
  try{mode=localStorage.getItem(MODE_KEY)||'student';}catch(_){/* local only */}
  setMode(mode);

  function read(key){try{const raw=localStorage.getItem(PREFIX+key);return raw===null?'':JSON.parse(raw);}catch(_){return '';}}
  function write(key,val){try{localStorage.setItem(PREFIX+key,JSON.stringify(val));return true;}catch(_){return false;}}

  document.querySelectorAll('[data-group]').forEach(el=>{const val=read(el.dataset.group);if(typeof val==='string')el.value=val;});
  document.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{
    const key=btn.dataset.save;
    const field=document.querySelector(`[data-group="${key}"]`);
    if(!field)return;
    const ok=write(key,field.value||'');
    const status=document.querySelector(`[data-status="${key}"]`);
    if(status){status.textContent=ok?'Saved on this Chromebook':'Could not save in this browser';if(ok)setTimeout(()=>{status.textContent='';},2400);}
    updateProgress();
  }));

  function filled(key){return String(read(key)||'').trim().length>0;}
  function updateProgress(){
    const done=KEYS.filter(filled).length;
    document.querySelectorAll('[data-t2-progress]').forEach(el=>el.textContent=`${done} of ${KEYS.length} saved`);
  }
  const next=document.querySelector('.t2-next a');
  if(next){next.href='topic-03-2014.html';next.textContent='Continue to Topic 3 · The War Before the War →';}
  updateProgress();
})();
