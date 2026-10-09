/* BeCurrent Teacher Control Room / classroom projector sync
 * Only the cockpit consumes teacher-intelligence objects.
 * Projector loads a generated data file with no intelligence notes.
 */
(function(){
'use strict';
const role=document.body.getAttribute('data-role');
if(role!=='cockpit'&&role!=='projector')return;
const lesson=role==='cockpit'?window.BECURRENT_CONTROL_LESSON:window.BECURRENT_PROJECTOR_LESSON;
if(!lesson||!Array.isArray(lesson.phases)||!lesson.phases.length){
  const m=document.querySelector('main');
  if(m)m.insertAdjacentText('afterbegin','Lesson data unavailable. Return to the teacher hub.');
  return;
}
const phases=lesson.phases;
const key=lesson.storageKey;
const phaseKey=key+'-phase';
const timerKey=key+'-timer';
const notesKey=key+'-notes';
const $=id=>document.getElementById(id);
function text(id,value){const el=$(id);if(el)el.textContent=String(value==null?'':value)}
function safeRead(k){try{return localStorage.getItem(k)}catch(_){return null}}
function safeWrite(k,value){try{localStorage.setItem(k,String(value));return true}catch(_){return false}}
function readPhase(){
  const n=Number(safeRead(phaseKey));
  return Number.isInteger(n)&&n>=0&&n<phases.length?n:0;
}
let index=readPhase();
function setAction(anchorId,textId,action){
  const a=$(anchorId);
  if(!a)return;
  if(!action||typeof action.url!=='string'){a.hidden=true;a.removeAttribute('href');return}
  const url=action.url.trim();
  // Never render executable or protocol-relative URLs from lesson data.
  if(!/^(https:\/\/|\.{1,2}\/)[^\s]+$/.test(url)){
    a.hidden=true;a.removeAttribute('href');return;
  }
  a.href=url;
  a.hidden=false;
  text(textId,action.label||'Open resource');
}
function go(next,source){
  const n=Math.max(0,Math.min(phases.length-1,Math.trunc(Number(next))));
  if(!Number.isFinite(n)||n===index)return;
  index=n;
  if(source!=='storage')safeWrite(phaseKey,index);
  if(role==='cockpit')resetTimer();
  render();
}
const navigation=$('phase-nav');
if(navigation&&role==='cockpit'){
  phases.forEach((p,i)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='phase-button';
    btn.setAttribute('data-phase-index',String(i));
    const t=document.createElement('span');t.className='phase-time';t.textContent=p.time+' min';
    const n=document.createElement('span');n.className='phase-name';n.textContent=p.label;
    btn.append(t,n);
    btn.addEventListener('click',()=>go(i,'control'));
    navigation.append(btn);
  });
}
function renderCockpit(){
  const p=phases[index];
  text('scene-eyebrow',p.screen.eyebrow);
  text('scene-title',p.screen.title);
  text('scene-description',p.screen.description);
  text('scene-footer-label',p.label+' / '+p.time+' min');
  text('scene-footer-number',String(index+1).padStart(2,'0')+' / '+String(phases.length).padStart(2,'0'));
  text('teacher-count',(index+1)+' / '+phases.length);
  setAction('scene-action','scene-action-text',p.screen.action);
  text('intel-title',p.label);
  text('intel-phase','Phase '+(index+1)+' of '+phases.length+' · '+p.minutes+' minutes');
  const n=p.intel||{};
  text('intel-land',n.land);text('intel-ask',n.ask);text('intel-listen',n.listenFor);
  text('intel-protect',n.protect);text('intel-cut',n.cut);text('intel-move',n.move);
  text('timer-target','Target: '+p.minutes+' minutes');
  const prior=$('teacher-prev'),next=$('teacher-next');
  if(prior)prior.disabled=index===0;
  if(next)next.disabled=index===phases.length-1;
  if(navigation){
    [...navigation.children].forEach((b,i)=>{
      if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');
      b.classList.toggle('done',i<index);
    });
  }
}
function renderProjector(){
  const p=phases[index];
  text('projector-eyebrow',p.screen.eyebrow);
  text('projector-title',p.screen.title);
  text('projector-description',p.screen.description);
  text('projector-phase',String(index+1).padStart(2,'0')+' / '+String(phases.length).padStart(2,'0'));
  text('projector-time',p.time+' min');
  setAction('projector-action','projector-action-text',p.screen.action);
  const pct=((p.start+p.minutes)/lesson.totalMinutes)*100;
  const bar=$('projector-progress');if(bar)bar.style.width=Math.max(0,Math.min(100,pct))+'%';
  const prior=$('projector-prev'),next=$('projector-next');
  if(prior)prior.disabled=index===0;
  if(next)next.disabled=index===phases.length-1;
}
function render(){if(role==='cockpit')renderCockpit();else renderProjector()}
function bind(id,change){
  const el=$(id);
  if(el)el.addEventListener('click',change);
}
bind('teacher-prev',()=>go(index-1,'control'));
bind('teacher-next',()=>go(index+1,'control'));
bind('projector-prev',()=>go(index-1,'control'));
bind('projector-next',()=>go(index+1,'control'));
document.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey)return;
  const target=event.target;
  if(target&&/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName))return;
  if(event.key==='ArrowRight'){go(index+1,'control');event.preventDefault()}
  if(event.key==='ArrowLeft'){go(index-1,'control');event.preventDefault()}
});
window.addEventListener('storage',event=>{
  if(event.key!==phaseKey)return;
  const newIndex=readPhase();
  if(newIndex!==index)go(newIndex,'storage');
});

// Teacher-only local state. No network or student PII.
let timer={phaseId:phases[index].id,accumulated:0,startedAt:null};
function readTimer(){
  if(role!=='cockpit')return;
  try{
    const found=JSON.parse(safeRead(timerKey)||'null');
    if(found&&found.phaseId===phases[index].id&&Number.isFinite(found.accumulated)&&found.accumulated>=0
      &&(found.startedAt===null||Number.isFinite(found.startedAt))){
      timer=found;
    }
  }catch(_){}
}
function persistTimer(){safeWrite(timerKey,JSON.stringify(timer))}
function elapsed(){
  return Math.max(0,timer.accumulated+(timer.startedAt!==null?Math.max(0,Date.now()-timer.startedAt):0));
}
function resetTimer(){
  timer={phaseId:phases[index].id,accumulated:0,startedAt:null};
  persistTimer();displayTimer();
}
function displayTimer(){
  if(role!=='cockpit')return;
  const seconds=Math.floor(elapsed()/1000);
  const min=String(Math.floor(seconds/60)).padStart(2,'0');
  const sec=String(seconds%60).padStart(2,'0');
  text('timer-clock',min+':'+sec);
  text('timer-toggle',timer.startedAt===null?(seconds>0?'Resume':'Start'):'Pause');
  const max=phases[index].minutes*60;
  const remaining=max-seconds;
  text('timer-pace',timer.startedAt===null&&!seconds?'Ready':remaining>=0?'On pace · '+Math.ceil(remaining/60)+' min left':'Over by '+Math.floor(-remaining/60)+'m '+String((-remaining)%60).padStart(2,'0')+'s');
}
if(role==='cockpit'){
  readTimer();
  bind('timer-toggle',()=>{
    if(timer.startedAt!==null){timer.accumulated=elapsed();timer.startedAt=null}
    else timer.startedAt=Date.now();
    persistTimer();displayTimer();
  });
  bind('timer-reset',resetTimer);
  const notes=$('teacher-notes');
  if(notes){
    notes.value=safeRead(notesKey)||'';
    notes.addEventListener('input',()=>{
      const saved=safeWrite(notesKey,notes.value);
      text('notes-status',saved?'Saved on this browser.':'Browser storage blocked. Copy your notes before leaving.');
    });
  }
  window.setInterval(displayTimer,1000);
}
render();displayTimer();
})();
