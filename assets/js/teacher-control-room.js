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
let notesKey=key+'-notes';
const $=id=>document.getElementById(id);
function text(id,value){const el=$(id);if(el)el.textContent=String(value==null?'':value)}
function safeRead(k){try{return localStorage.getItem(k)}catch(_){return null}}
function safeWrite(k,value){try{localStorage.setItem(k,String(value));return true}catch(_){return false}}
function readPhase(){
  const n=Number(safeRead(phaseKey));
  return Number.isInteger(n)&&n>=0&&n<phases.length?n:0;
}
let index=readPhase();
const linkedPhase=phases.findIndex(p=>p.id===location.hash.slice(1));
if(linkedPhase>=0){index=linkedPhase;safeWrite(phaseKey,index);}
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
function visual(id,screen){
  const node=$(id);if(!node)return;node.replaceChildren();
  if(screen.image){const pic=screen.image;if(/^\.\.\/assets\/images\/[a-zA-Z0-9_./-]+$/.test(pic.src)){const fig=document.createElement('figure'),img=document.createElement('img'),cap=document.createElement('figcaption'),credit=document.createElement('a');fig.className='screen-photo';img.src=pic.src;img.alt=pic.alt;cap.textContent=pic.caption+' ';credit.textContent=pic.credit;if(/^https:\/\//.test(pic.source)){credit.href=pic.source;credit.target='_blank';credit.rel='noopener noreferrer';}cap.append(credit);fig.append(img,cap);node.append(fig);}}
  if(screen.table){const table=document.createElement('table'),cap=document.createElement('caption'),head=document.createElement('thead'),row=document.createElement('tr'),body=document.createElement('tbody');table.className='scenario-table';cap.textContent=screen.table.caption;for(const label of screen.table.headers){const th=document.createElement('th');th.scope='col';th.textContent=label;row.append(th)}head.append(row);for(const values of screen.table.rows){const tr=document.createElement('tr');values.forEach((value,i)=>{const td=document.createElement(i?'td':'th');if(!i)td.scope='row';td.textContent=value;tr.append(td)});body.append(tr)}table.append(cap,head,body);node.append(table)}
  if(screen.bullets){const ul=document.createElement('ul');for(const str of screen.bullets){const li=document.createElement('li');li.textContent=str;ul.append(li)}node.append(ul)}
  if(screen.write){const w=document.createElement('p');w.className='write-this';const b=document.createElement('strong');b.textContent=screen.noteMode==='read'?'Key idea: ':'✎ Write this down: ';w.append(b,document.createTextNode(screen.write));node.append(w)}
  if(screen.links){const ol=document.createElement('ol');ol.className='screen-links';for(const l of screen.links){if(!/^https:\/\//.test(l.url))continue;const li=document.createElement('li'),a=document.createElement('a'),meta=document.createElement('span');a.href=l.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=l.title+' ↗';meta.className='screen-link-meta';meta.textContent=l.source+(l.length?' · '+l.length:'');li.append(a,meta);ol.append(li)}node.append(ol)}
  if(screen.cards){const grid=document.createElement('div');grid.className='screen-cards';for(const c of screen.cards){const card=document.createElement('article'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=c.title;p.textContent=c.text;card.append(h,p);grid.append(card)}node.append(grid)}
  if(screen.footnote){const p=document.createElement('p');p.className='scenario-footnote';p.textContent=screen.footnote;node.append(p)}
  if(screen.sources){const p=document.createElement('p');p.className='slide-sources';p.append(document.createTextNode('Sources: '));screen.sources.forEach((s,i)=>{if(!/^https:\/\//.test(s.url))return;const a=document.createElement('a');a.textContent=s.title;a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';if(i)p.append(document.createTextNode(' / '));p.append(a)});node.append(p)}
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
    btn.setAttribute('data-kind',p.kind);
    const t=document.createElement('span');t.className='phase-time';t.textContent=p.time+(p.kind==='break'||p.kind==='news'||(p.kind==='notes'||p.kind==='scenario')?'':' min');
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
  visual('scene-visual',p.screen);
  text('scene-footer-label',(p.kind==='notes'||p.kind==='scenario')?p.label:p.label+' / '+p.time+' min');
  text('scene-footer-number',String(index+1).padStart(2,'0')+' / '+String(phases.length).padStart(2,'0'));
  text('teacher-count',(index+1)+' / '+phases.length);
  setAction('scene-action','scene-action-text',p.screen.action);
  text('intel-title',p.label);
  text('intel-phase','Phase '+(index+1)+' of '+phases.length+' · '+(p.kind==='scenario'?'scenario analysis within application':p.kind==='notes'?'notes slide, no separate time':p.minutes+' minutes'));
  const n=p.intel||{};
  text('intel-land',n.land);text('intel-ask',n.ask);text('intel-listen',n.listenFor);
  text('intel-protect',n.protect);text('intel-cut',n.cut);text('intel-move',n.move);
  text('intel-avoid',n.avoid);text('intel-reteach',n.reteach);
  text('intel-model',n.model);
  text('timer-target',p.kind==='scenario'?'Analysis: use the application window':p.kind==='break'?'Lunch is untimed':p.kind==='notes'?'Notes: copy time comes from the lesson block':'Target: '+p.minutes+' minutes');
  if($('timer-toggle'))$('timer-toggle').disabled=p.kind==='break'||p.kind==='scenario';
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
  visual('projector-visual',p.screen);
  document.body.setAttribute('data-kind',p.kind);
  text('projector-phase',String(index+1).padStart(2,'0')+' / '+String(phases.length).padStart(2,'0'));
  // No minute counts on the projector: students see the step, not the clock.
  text('projector-time',p.kind==='break'?'Lunch':p.kind==='news'?'After lunch':'');
  setAction('projector-action','projector-action-text',p.screen.action);
  const pct=((p.start+p.minutes)/lesson.totalMinutes)*100;
  const bar=$('projector-progress');if(bar)bar.style.width=Math.max(0,Math.min(100,pct))+'%';
  const prior=$('projector-prev'),next=$('projector-next');
  if(prior)prior.disabled=index===0;
  if(next)next.disabled=index===phases.length-1;
}
function render(){if(role==='cockpit')renderCockpit();else renderProjector()}
window.addEventListener('hashchange',()=>{const n=phases.findIndex(p=>p.id===location.hash.slice(1));if(n>=0)go(n,'control')});
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
  if(phases[index].kind==='notes'){text('timer-pace',timer.startedAt===null&&!seconds?'Ready':'Copying notes');return}
  const max=phases[index].minutes*60;
  const remaining=max-seconds;
  text('timer-pace',timer.startedAt===null&&!seconds?'Ready':remaining>=0?'On pace · '+Math.ceil(remaining/60)+' min left':'Over by '+Math.floor(-remaining/60)+'m '+String((-remaining)%60).padStart(2,'0')+'s');
}
if(role==='cockpit'){
  readTimer();
  bind('timer-toggle',()=>{
    if(phases[index].kind==='break')return;
    if(timer.startedAt!==null){timer.accumulated=elapsed();timer.startedAt=null}
    else timer.startedAt=Date.now();
    persistTimer();displayTimer();
  });
  bind('timer-reset',resetTimer);
  const notes=$('teacher-notes');
  const section=$('class-section');
  if(section){
    section.value=safeRead(key+'-section')||'';
    if(section.value.trim())notesKey=key+'-notes-'+section.value.trim();
    section.addEventListener('change',()=>{safeWrite(key+'-section',section.value.trim());notesKey=key+'-notes'+(section.value.trim()?'-'+section.value.trim():'');if(notes)notes.value=safeRead(notesKey)||'';text('notes-status','Loaded notes for this class section on this browser.');});
  }
  if(notes){
    notes.value=safeRead(notesKey)||'';
    notes.addEventListener('input',()=>{
      const saved=safeWrite(notesKey,notes.value);
      text('notes-status',saved?'Saved on this browser.':'Browser storage blocked. Copy your notes before leaving.');
    });
  }
  bind('export-notes',()=>{
    const value=lesson.title+'\nClass: '+(section?section.value:'')+'\nPhase: '+phases[index].label+'\n\n'+(notes?notes.value:'');
    const url=URL.createObjectURL(new Blob([value],{type:'text/plain'}));const link=document.createElement('a');link.href=url;link.download=lesson.key+'-teaching-notes.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  const picker=$('lesson-picker');if(picker)picker.addEventListener('change',()=>{location.href=picker.value});
  window.setInterval(displayTimer,1000);
}
bind('projector-fullscreen',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch(_){text('projector-time','Use browser fullscreen')}});
render();displayTimer();
})();
