(()=>{
  'use strict';

  const body=document.body;
  const PREFIX='bcv2-ukraine-';
  const MODE_KEY='bcv2-mode';
  const WORK_KEYS=['prediction','prediction-note','evidence','hardest'];
  const modeButtons=[...document.querySelectorAll('[data-mode]')];

  function installPosition(){
    if(!document.querySelector('link[href="../assets/css/ukraine-position.css"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='../assets/css/ukraine-position.css';document.head.appendChild(link);}
    const journey=document.querySelector('.sticky-journey');
    if(!journey||document.querySelector('.uk-position'))return;
    const bar=document.createElement('div');bar.className='uk-position';bar.innerHTML='<div class="uk-position-inner"><div><div class="uk-position-series">THE WAR IN UKRAINE · REVERSE HISTORY INVESTIGATION</div><div class="uk-position-title">Topic 1 · The War Right Now</div><span class="uk-position-sub">Current event anchor · 2026</span></div><div class="uk-position-count"><strong>1</strong> of 6 topics</div></div>';
    journey.insertAdjacentElement('afterend',bar);
  }
  installPosition();

  function setMode(mode){
    body.classList.toggle('teacher-on',mode==='teacher');
    modeButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.mode===mode)));
    try{localStorage.setItem(MODE_KEY,mode);}catch(_){/* local-only mode */}
  }
  modeButtons.forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
  let savedMode='student';
  try{savedMode=localStorage.getItem(MODE_KEY)||'student';}catch(_){/* local-only mode */}
  setMode(savedMode);

  function read(key){try{const raw=localStorage.getItem(PREFIX+key);return raw===null?null:JSON.parse(raw);}catch(_){return null;}}
  function write(key,value){try{localStorage.setItem(PREFIX+key,JSON.stringify(value));return true;}catch(_){return false;}}
  function remove(key){try{localStorage.removeItem(PREFIX+key);}catch(_){/* local-only mode */}}
  function groupValue(group){if(group.matches('textarea,input[type="text"],input[type="url"]'))return group.value;return [...group.querySelectorAll('input[type="checkbox"]:checked')].map(i=>i.value);}
  function restoreGroup(group){const key=group.dataset.group;const saved=read(key);if(saved===null)return;if(group.matches('textarea,input[type="text"],input[type="url"]'))group.value=saved||'';else if(Array.isArray(saved))group.querySelectorAll('input[type="checkbox"]').forEach(i=>i.checked=saved.includes(i.value));}
  document.querySelectorAll('[data-group]').forEach(restoreGroup);

  const prediction=document.querySelector('[data-group="prediction"]');
  const predictionCount=document.querySelector('[data-prediction-count]');
  function enforcePredictionLimit(changed){if(!prediction)return;const checks=[...prediction.querySelectorAll('input[type="checkbox"]')];const selected=checks.filter(i=>i.checked);if(selected.length>3&&changed){changed.checked=false;}const now=checks.filter(i=>i.checked);checks.forEach(i=>{const label=i.closest('.uk-choice');const disabled=now.length>=3&&!i.checked;i.disabled=disabled;if(label)label.classList.toggle('is-disabled',disabled);});if(predictionCount)predictionCount.textContent=`${now.length} of 3 selected`;}
  if(prediction){prediction.addEventListener('change',e=>enforcePredictionLimit(e.target));enforcePredictionLimit();}

  function isFilled(key){const value=read(key);if(Array.isArray(value))return value.length>0;return typeof value==='string'&&value.trim()!=='';}
  function updateProgress(){const done=WORK_KEYS.filter(isFilled).length;document.querySelectorAll('[data-progress]').forEach(el=>el.textContent=`${done} of ${WORK_KEYS.length} saved`);}
  document.querySelectorAll('[data-save]').forEach(btn=>{btn.addEventListener('click',()=>{const key=btn.dataset.save;const group=document.querySelector(`[data-group="${key}"]`);if(!group)return;const ok=write(key,groupValue(group));const status=document.querySelector(`[data-status="${key}"]`);if(status){status.textContent=ok?'Saved on this Chromebook':'Could not save in this browser';if(ok)setTimeout(()=>{status.textContent='';},2600);}updateProgress();});});
  document.querySelectorAll('[data-clear-work]').forEach(btn=>{btn.addEventListener('click',()=>{if(!confirm('Clear your Ukraine investigation notes on this Chromebook?'))return;WORK_KEYS.forEach(remove);location.reload();});});

  const stopLinks=[null,'topic-02-2022.html','topic-03-2014.html','topic-04-direction.html','topic-05-independence.html','topic-06-memory.html'];
  document.querySelectorAll('.reverse-stop').forEach((stop,index)=>{const href=stopLinks[index];if(!href)return;stop.style.cursor='pointer';stop.setAttribute('tabindex','0');stop.setAttribute('role','link');const go=()=>{location.href=href;};stop.addEventListener('click',go);stop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});

  const navInner=document.querySelector('.nav .nav-inner');
  if(navInner&&!navInner.querySelector('[data-topic-two-link]')){const link=document.createElement('a');link.href='topic-02-2022.html';link.textContent='Topic 2 · 2022';link.dataset.topicTwoLink='true';const sources=[...navInner.querySelectorAll('a')].find(a=>a.getAttribute('href')==='#sources');if(sources)navInner.insertBefore(link,sources);else navInner.appendChild(link);}
  if(navInner&&!navInner.querySelector('a[href="study-guide.html"]')){const guide=document.createElement('a');guide.href='study-guide.html';guide.textContent='Study Guide';navInner.appendChild(guide);}
  const nextStop=document.querySelector('.next-stop');
  if(nextStop&&!nextStop.querySelector('[data-open-topic-two]')){const link=document.createElement('a');link.href='topic-02-2022.html';link.className='uk-save';link.dataset.openTopicTwo='true';link.textContent='Open Topic 2 · The Full-Scale Invasion →';link.style.display='inline-flex';link.style.textDecoration='none';link.style.marginTop='18px';nextStop.appendChild(link);}

  updateProgress();
})();
