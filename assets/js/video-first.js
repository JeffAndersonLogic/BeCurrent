'use strict';
/**
 * Reusable BeCurrent video-first browser, with no outbound student-data requests.
 * The Canvas manifest helpers are injected from the SAME canonical source used
 * by the Week and Brief parsers (assets/js/video-first-record.js).
 */
(function(){
  const body=document.body;
  const teacher=document.getElementById('teacher-flow');
  const student=document.getElementById('student-flow');
  if(!teacher||!student)return;
  const lesson=body.dataset.lesson||'wp-t01';
  const prefix='bcv2-video-first-'+lesson+'-';
  const stages=[...document.querySelectorAll('[data-teacher-stage]')];
  const chapters=[...document.querySelectorAll('[data-student-chapter]')];
  const nav=[...document.querySelectorAll('[data-student-nav]')];
  const slots=[...document.querySelectorAll('[data-slot]')];
  const sorts=[...document.querySelectorAll('[data-sort]')];
  let teacherIndex=0, studentIndex=0;
  const storage={
    get(key){try{return localStorage.getItem(prefix+key)}catch(_){return null}},
    put(key,v){try{localStorage.setItem(prefix+key,v)}catch(_){}}
  };
  const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const modeButtons=[...document.querySelectorAll('[data-view-mode]')];

  function mode(name){
    const t=name==='teacher';
    body.classList.toggle('teacher-mode',t);
    teacher.hidden=!t;student.hidden=t;
    modeButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.viewMode===name)));
    try{localStorage.setItem('bcv2-video-first-view',name)}catch(_){}
  }
  let initial='student';
  try{initial=localStorage.getItem('bcv2-video-first-view')||'student'}catch(_){}
  mode(initial==='teacher'?'teacher':'student');
  modeButtons.forEach(b=>b.addEventListener('click',()=>mode(b.dataset.viewMode)));

  function renderTeacher(){
    stages.forEach((s,i)=>{s.hidden=i!==teacherIndex});
    const counter=document.getElementById('teacher-counter');
    if(counter)counter.textContent=(teacherIndex+1)+' / '+stages.length;
    const prev=document.getElementById('teacher-prev');
    const next=document.getElementById('teacher-next');
    if(prev)prev.disabled=teacherIndex===0;
    if(next)next.disabled=teacherIndex===stages.length-1;
  }
  const prev=document.getElementById('teacher-prev'),next=document.getElementById('teacher-next');
  if(prev)prev.addEventListener('click',()=>{teacherIndex=Math.max(0,teacherIndex-1);renderTeacher()});
  if(next)next.addEventListener('click',()=>{teacherIndex=Math.min(stages.length-1,teacherIndex+1);renderTeacher()});
  renderTeacher();

  function renderStudent(){
    chapters.forEach((s,i)=>{s.hidden=i!==studentIndex});
    nav.forEach((b,i)=>b.setAttribute('aria-current',i===studentIndex?'step':'false'));
    const previous=document.getElementById('student-prev'),following=document.getElementById('student-next');
    if(previous)previous.disabled=studentIndex===0;
    if(following)following.disabled=studentIndex===chapters.length-1;
    const counter=document.getElementById('student-counter');
    if(counter)counter.textContent='Step '+(studentIndex+1)+' of '+chapters.length;
    updateProgress();
  }
  nav.forEach((b,i)=>b.addEventListener('click',()=>{studentIndex=i;renderStudent()}));
  const studentPrev=document.getElementById('student-prev'),studentNext=document.getElementById('student-next');
  if(studentPrev)studentPrev.addEventListener('click',()=>{studentIndex=Math.max(0,studentIndex-1);renderStudent();student.scrollIntoView({behavior:'smooth'})});
  if(studentNext)studentNext.addEventListener('click',()=>{studentIndex=Math.min(chapters.length-1,studentIndex+1);renderStudent();student.scrollIntoView({behavior:'smooth'})});

  slots.forEach(el=>{
    el.value=storage.get('text-'+el.dataset.slot)||'';
    el.addEventListener('input',()=>{storage.put('text-'+el.dataset.slot,el.value);updateProgress()});
  });
  sorts.forEach(el=>{
    el.value=storage.get('sort-'+el.dataset.sort)||'';
    el.addEventListener('change',()=>{storage.put('sort-'+el.dataset.sort,el.value);updateProgress();const f=document.getElementById('sort-feedback');if(f)f.textContent='Selections saved. Choose Check my sort for feedback.'});
  });
  document.querySelectorAll('[data-poll]').forEach(input=>{
    input.checked=storage.get('poll-'+input.name)===input.value;
    input.addEventListener('change',()=>storage.put('poll-'+input.name,input.value));
  });
  function sortText(){
    return sorts.map(el=>{
      const q=el.dataset.prompt||el.dataset.sort;
      const choice=el.value||'(not selected)';
      return q+': '+choice;
    }).join('\n');
  }
  function updateProgress(){
    const done=slots.filter(el=>el.value.trim()).length+(sorts.length&&sorts.every(el=>el.value)?1:0);
    const total=slots.length+(sorts.length?1:0);
    document.querySelectorAll('[data-work-progress]').forEach(el=>el.textContent=done+' of '+total+' investigation parts started');
  }
  renderStudent();

  const check=document.getElementById('check-sort');
  if(check)check.addEventListener('click',()=>{
    let correct=0;
    sorts.forEach(el=>{if(el.value===el.dataset.correct)correct++});
    const f=document.getElementById('sort-feedback');
    if(f)f.textContent=correct+' of '+sorts.length+' correct. '+(correct===sorts.length?'You have it.':'Use the House/Senate fact cards and try again. This is practice, not a grade.');
  });

  function gather(){
    const records=[];
    let ord=1;
    const sortPrompt='Sort each statement about Congress into House, Senate, or Both.';
    records.push({ord:String(ord++).padStart(2,'0'),id:'chamber-sort',label:'Congress: House and Senate sort',prompt:sortPrompt,text:sortText(),confidence:''});
    slots.forEach(el=>{
      records.push({ord:String(ord++).padStart(2,'0'),id:el.dataset.slot,label:el.dataset.label||el.dataset.slot,prompt:el.dataset.prompt||'',text:el.value||'',confidence:''});
    });
    const head='<h1>BeCurrent | Who Has the Power? | Topic 1</h1><p>The Election Nobody Understands</p>';
    const items=records.map(r=>'<h2>'+bcEsc(r.label)+'</h2><p>Prompt: '+bcEsc(r.prompt)+'</p><p>My response:</p>'+bcParagraphsHtml(r.text,'')).join('');
    const footer=bcRecordFooterHtml(bcRecordManifest(records,{topic:lesson,expected:records.length,isoStamp:new Date().toISOString()}));
    const html=head+items+footer;
    const plain='BeCurrent | Who Has the Power? | Topic 1\nThe Election Nobody Understands\n\n'+records.map(r=>r.label+'\nPrompt: '+r.prompt+'\nMy response:\n'+r.text).join('\n\n')+'\n\n'+bcRecordManifest(records,{topic:lesson,expected:records.length,isoStamp:new Date().toISOString()}).join('\n');
    return {html,plain,records};
  }
  const gatherBtn=document.getElementById('gather-work');
  if(gatherBtn)gatherBtn.addEventListener('click',async()=>{
    const payload=gather();
    const preview=document.getElementById('copy-preview');
    const status=document.getElementById('copy-status');
    if(preview){preview.value=payload.plain;preview.hidden=false}
    let copied=false;
    try{
      if(navigator.clipboard&&navigator.clipboard.write&&window.ClipboardItem){
        const item=new ClipboardItem({
          'text/html':new Blob([payload.html],{type:'text/html'}),
          'text/plain':new Blob([payload.plain],{type:'text/plain'})
        });
        await navigator.clipboard.write([item]);
        copied=true;
      }else if(navigator.clipboard&&navigator.clipboard.writeText){
        await navigator.clipboard.writeText(payload.plain);
        copied=true;
      }
    }catch(_){copied=false}
    const blanks=payload.records.filter(r=>!r.text.trim()||r.text.includes('(not selected)')).length;
    if(status){
      status.classList.toggle('error',!copied);
      status.textContent=(copied?'Copied. ':'Clipboard unavailable; use Select all, then Copy in the box below. ')
        +(blanks?blanks+' section(s) may need attention. ':'')
        +'Paste into the assigned Canvas Text Entry and submit there. BeCurrent does not submit for you.';
    }
    if(!copied&&preview){preview.focus();preview.select()}
  });
  const selectAll=document.getElementById('select-work');
  if(selectAll)selectAll.addEventListener('click',()=>{
    const box=document.getElementById('copy-preview');if(!box)return;
    if(!box.value){box.value=gather().plain;box.hidden=false}
    box.focus();box.select();
  });
})();
