(()=>{
  'use strict';

  const body=document.body;
  const PREFIX='bcv2-ukraine-';
  const MODE_KEY='bcv2-mode';
  const WORK_KEYS=['prediction','prediction-note','evidence','hardest'];
  const modeButtons=[...document.querySelectorAll('[data-mode]')];

  function setMode(mode){
    body.classList.toggle('teacher-on',mode==='teacher');
    modeButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.mode===mode)));
    try{localStorage.setItem(MODE_KEY,mode);}catch(_){/* local-only mode */}
  }
  modeButtons.forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
  let savedMode='student';
  try{savedMode=localStorage.getItem(MODE_KEY)||'student';}catch(_){/* local-only mode */}
  setMode(savedMode);

  function read(key){
    try{
      const raw=localStorage.getItem(PREFIX+key);
      return raw===null?null:JSON.parse(raw);
    }catch(_){return null;}
  }
  function write(key,value){
    try{localStorage.setItem(PREFIX+key,JSON.stringify(value));return true;}catch(_){return false;}
  }
  function remove(key){
    try{localStorage.removeItem(PREFIX+key);}catch(_){/* local-only mode */}
  }

  function groupValue(group){
    if(group.matches('textarea,input[type="text"],input[type="url"]'))return group.value;
    return [...group.querySelectorAll('input[type="checkbox"]:checked')].map(i=>i.value);
  }
  function restoreGroup(group){
    const key=group.dataset.group;
    const saved=read(key);
    if(saved===null)return;
    if(group.matches('textarea,input[type="text"],input[type="url"]'))group.value=saved||'';
    else if(Array.isArray(saved))group.querySelectorAll('input[type="checkbox"]').forEach(i=>i.checked=saved.includes(i.value));
  }
  document.querySelectorAll('[data-group]').forEach(restoreGroup);

  const prediction=document.querySelector('[data-group="prediction"]');
  const predictionCount=document.querySelector('[data-prediction-count]');
  function enforcePredictionLimit(changed){
    if(!prediction)return;
    const checks=[...prediction.querySelectorAll('input[type="checkbox"]')];
    const selected=checks.filter(i=>i.checked);
    if(selected.length>3&&changed){changed.checked=false;}
    const now=checks.filter(i=>i.checked);
    checks.forEach(i=>{
      const label=i.closest('.uk-choice');
      const disabled=now.length>=3&&!i.checked;
      i.disabled=disabled;
      if(label)label.classList.toggle('is-disabled',disabled);
    });
    if(predictionCount)predictionCount.textContent=`${now.length} of 3 selected`;
  }
  if(prediction){
    prediction.addEventListener('change',e=>enforcePredictionLimit(e.target));
    enforcePredictionLimit();
  }

  function isFilled(key){
    const value=read(key);
    if(Array.isArray(value))return value.length>0;
    return typeof value==='string'&&value.trim()!=='';
  }
  function updateProgress(){
    const done=WORK_KEYS.filter(isFilled).length;
    document.querySelectorAll('[data-progress]').forEach(el=>el.textContent=`${done} of ${WORK_KEYS.length} saved`);
  }

  document.querySelectorAll('[data-save]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const key=btn.dataset.save;
      const group=document.querySelector(`[data-group="${key}"]`);
      if(!group)return;
      const ok=write(key,groupValue(group));
      const status=document.querySelector(`[data-status="${key}"]`);
      if(status){
        status.textContent=ok?'Saved on this Chromebook':'Could not save in this browser';
        if(ok)setTimeout(()=>{status.textContent='';},2600);
      }
      updateProgress();
    });
  });

  document.querySelectorAll('[data-clear-work]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!confirm('Clear your Ukraine investigation notes on this Chromebook?'))return;
      WORK_KEYS.forEach(remove);
      location.reload();
    });
  });

  updateProgress();
})();
