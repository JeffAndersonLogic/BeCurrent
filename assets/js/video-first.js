'use strict';
/**
 * Reusable BeCurrent video-first browser, with no outbound student-data requests.
 * The Canvas manifest helpers are injected from the SAME canonical source used
 * by the Week and Brief parsers (assets/js/video-first-record.js).
 */
(function(){
  const body=document.body;
  const student=document.getElementById('student-flow');
  if(!student)return;
  const lesson=body.dataset.lesson||'wp-t01';
  const prefix='bcv2-video-first-'+lesson+'-';
  const chapters=[...document.querySelectorAll('[data-student-chapter]')];
  const nav=[...document.querySelectorAll('[data-student-nav]')];
  const slots=[...document.querySelectorAll('[data-slot]')];
  const sorts=[...document.querySelectorAll('[data-sort]')];
  const evidence=[...document.querySelectorAll('[data-evidence]')];
  const storage={
    get(key){try{return localStorage.getItem(prefix+key)}catch(_){return null}},
    put(key,v){try{localStorage.setItem(prefix+key,v)}catch(_){
      let warning=document.getElementById('storage-warning');
      if(!warning){warning=document.createElement('p');warning.id='storage-warning';warning.className='notice';student.prepend(warning);}
      warning.textContent='Browser saving is blocked. Keep this tab open and gather your work into Canvas before leaving.';
    }}
  };
  const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  // Every section remains readable. Navigation changes position, never visibility.
  const markChapter=index=>nav.forEach((a,i)=>{
    if(i===index)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');
  });
  nav.forEach((a,i)=>a.addEventListener('click',()=>markChapter(i)));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting)markChapter(chapters.indexOf(entry.target));
    },{rootMargin:'-12% 0px -65% 0px'});
    chapters.forEach(chapter=>observer.observe(chapter));
  }

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
  evidence.forEach(el=>{
    el.value=storage.get('evidence-'+el.dataset.evidence)||'';
    const save=()=>{storage.put('evidence-'+el.dataset.evidence,el.value);updateProgress()};
    el.addEventListener('input',save);el.addEventListener('change',save);
  });
  const slider=document.getElementById('seat-slider');
  if(slider){
    const draw=()=>{const a=Number(slider.value),b=435-a;
      document.getElementById('seat-status').textContent='Group A: '+a+' · Group B: '+b+'. '+(a>=218?'Group A':'Group B')+' has the majority in this constructed model.';
      document.getElementById('seat-fill').style.width=(100*a/435)+'%';
    };slider.addEventListener('input',draw);draw();
  }
  function sortText(){
    return sorts.map(el=>{
      const q=el.dataset.prompt||el.dataset.sort;
      const choice=el.value||'(not selected)';
      return q+': '+choice;
    }).join('\n');
  }
  function updateProgress(){
    const done=slots.filter(el=>el.value.trim()).length+(sorts.length&&sorts.every(el=>el.value)?1:0)+(evidence.length&&evidence.every(el=>el.value.trim())?1:0);
    const total=slots.length+(sorts.length?1:0)+(evidence.length?1:0);
    document.querySelectorAll('[data-work-progress]').forEach(el=>el.textContent=done+' of '+total+' investigation parts started');
  }
  updateProgress();

  const check=document.getElementById('check-sort');
  if(check)check.addEventListener('click',()=>{
    let correct=0;
    sorts.forEach(el=>{if(el.value===el.dataset.correct)correct++});
    const f=document.getElementById('sort-feedback');
    if(f)f.textContent=correct+' of '+sorts.length+' correct. '+(correct===sorts.length?'You have it.':'Use the background and sources, then try again. This is practice, not a grade.');
  });

  function gather(){
    const records=[];
    let ord=1;
    const sortPrompt=body.dataset.sortPrompt||'Sort each statement about Congress into House, Senate, or Both.';
    if(sorts.length)records.push({ord:String(ord++).padStart(2,'0'),id:'chamber-sort',label:body.dataset.sortLabel||'Congress: House and Senate sort',prompt:sortPrompt,text:sorts.some(el=>el.value)?sortText():'',confidence:''});
    if(evidence.length)records.push({ord:String(ord++).padStart(2,'0'),id:'results-notebook',label:'2026 results notebook',prompt:'Record sourced outcomes, stages, check time, baseline, and uncertainty.',text:evidence.some(el=>el.value.trim())?evidence.map(el=>el.dataset.evidence+': '+(el.value.trim()||'(not recorded)')).join('\n'):'',confidence:''});
    slots.forEach(el=>{
      records.push({ord:String(ord++).padStart(2,'0'),id:el.dataset.slot,label:el.dataset.label||el.dataset.slot,prompt:el.dataset.prompt||'',text:el.value||'',confidence:''});
    });
    const heading='BeCurrent | Who Has the Power? | Topic '+(body.dataset.topicNumber||'1');
    const title=body.dataset.topicTitle||'The Election Nobody Understands';
    const head='<h1>'+bcEsc(heading)+'</h1><p>'+bcEsc(title)+'</p>';
    const items=records.map(r=>'<h2>'+bcEsc(r.label)+'</h2><p>Prompt: '+bcEsc(r.prompt)+'</p><p>My response:</p>'+bcParagraphsHtml(r.text,'')).join('');
    const footer=bcRecordFooterHtml(bcRecordManifest(records,{topic:lesson,expected:records.length,isoStamp:new Date().toISOString()}));
    const html=head+items+footer;
    const plain=heading+'\n'+title+'\n\n'+records.map(r=>r.label+'\nPrompt: '+r.prompt+'\nMy response:\n'+r.text).join('\n\n')+'\n\n'+bcRecordManifest(records,{topic:lesson,expected:records.length,isoStamp:new Date().toISOString()}).join('\n');
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
    const blanks=payload.records.filter(r=>!r.text.trim()||r.text.includes('(not selected)')||r.text.includes('(not recorded)')).length;
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
