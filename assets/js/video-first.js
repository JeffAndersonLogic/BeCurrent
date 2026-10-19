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
  const optional=el=>el.dataset.optional==='true';
  const requiredSlots=slots.filter(el=>!optional(el));
  const requiredEvidence=evidence.filter(el=>!optional(el));
  let editVersion=0;
  const workChecklist=document.getElementById('work-checklist')||document.createElement('ul');
  if(!workChecklist.id){
    workChecklist.id='work-checklist';workChecklist.className='work-checklist';
    workChecklist.setAttribute('aria-label','Investigation draft checklist');
    const intro=student.querySelector('.intro');
    (intro||student).insertAdjacentElement('afterend',workChecklist);
  }
  const storage={
    get(key){try{return localStorage.getItem(prefix+key)}catch(_){return null}},
    put(key,v){try{localStorage.setItem(prefix+key,v)}catch(_){
      let warning=document.getElementById('storage-warning');
      if(!warning){warning=document.createElement('p');warning.id='storage-warning';warning.className='notice';student.prepend(warning);}
      warning.textContent='Browser saving is blocked. Keep this tab open and gather your work into Canvas before leaving.';
    }}
  };
  const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  function markEdited(){
    editVersion++;
    const preview=document.getElementById('copy-preview'),status=document.getElementById('copy-status');
    if(preview&&preview.value){
      preview.dataset.stale='true';
      if(status){status.classList.add('error');status.textContent='Your work changed after gathering. Choose Gather All My Work again before pasting into Canvas, or select the latest work for manual copy.';}
    }
  }
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
    el.addEventListener('input',()=>{storage.put('text-'+el.dataset.slot,el.value);markEdited();updateProgress()});
  });
  sorts.forEach(el=>{
    el.value=storage.get('sort-'+el.dataset.sort)||'';
    el.addEventListener('change',()=>{storage.put('sort-'+el.dataset.sort,el.value);markEdited();updateProgress();const item=document.querySelector('[data-sort-feedback="'+el.dataset.sort+'"]');if(item)item.hidden=true;const f=document.getElementById('sort-feedback');if(f)f.textContent='Selections saved. Choose Check my sort for feedback.'});
  });
  document.querySelectorAll('[data-poll]').forEach(input=>{
    input.checked=storage.get('poll-'+input.name)===input.value;
    input.addEventListener('change',()=>storage.put('poll-'+input.name,input.value));
  });
  evidence.forEach(el=>{
    el.value=storage.get('evidence-'+el.dataset.evidence)||'';
    const save=()=>{storage.put('evidence-'+el.dataset.evidence,el.value);markEdited();updateProgress()};
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
    const parts=[];
    if(sorts.length)parts.push({label:'Practice selections',started:sorts.some(el=>el.value),ready:sorts.every(el=>el.value),target:sorts.find(el=>!el.value)||sorts[0]});
    if(requiredEvidence.length)parts.push({label:'Results notebook',started:requiredEvidence.some(el=>el.value.trim()),ready:requiredEvidence.every(el=>el.value.trim()),target:requiredEvidence.find(el=>!el.value.trim())||requiredEvidence[0]});
    requiredSlots.forEach(el=>parts.push({label:el.dataset.label||el.dataset.slot,started:!!el.value.trim(),ready:!!el.value.trim(),target:el}));
    const done=parts.filter(p=>p.started).length,total=parts.length;
    document.querySelectorAll('[data-work-progress]').forEach(el=>el.textContent=done+' of '+total+' investigation parts started');
    workChecklist.replaceChildren();
    parts.forEach(p=>{const li=document.createElement('li'),a=document.createElement('a');a.href='#'+p.target.id;a.textContent=p.label+': '+(p.ready?'draft recorded — review before submitting':p.started?'partly recorded':'not started');li.append(a);workChecklist.append(li)});
  }
  updateProgress();

  const check=document.getElementById('check-sort');
  if(check)check.addEventListener('click',()=>{
    let correct=0;
    sorts.forEach(el=>{
      const right=el.value===el.dataset.correct;if(right)correct++;
      const feedback=document.querySelector('[data-sort-feedback="'+el.dataset.sort+'"]');
      if(feedback){feedback.hidden=false;feedback.textContent=(right?'Correct. ':el.value?'Try again. ':'Choose an answer. ')+(el.dataset.explanation||'This statement belongs with '+el.dataset.correct+'.');el.setAttribute('aria-describedby',feedback.id);}
    });
    const f=document.getElementById('sort-feedback');
    if(f)f.textContent=correct+' of '+sorts.length+' correct. '+(correct===sorts.length?'You have it.':'Use the background and sources, then try again. This is practice, not a grade.');
  });

  function gather(){
    const records=[];
    let ord=1;
    const sortPrompt=body.dataset.sortPrompt||'Sort each statement about Congress into House, Senate, or Both.';
    if(sorts.length)records.push({ord:String(ord++).padStart(2,'0'),id:'chamber-sort',label:body.dataset.sortLabel||'Congress: House and Senate sort',prompt:sortPrompt,text:sorts.some(el=>el.value)?sortText():'',confidence:''});
    if(evidence.length)records.push({ord:String(ord++).padStart(2,'0'),id:'results-notebook',label:'2026 results notebook',prompt:'Record sourced outcomes, stages, check time, baseline, and uncertainty.',text:evidence.some(el=>el.value.trim())?evidence.filter(el=>!optional(el)||el.value.trim()).map(el=>el.dataset.evidence+': '+(el.value.trim()||'(not recorded)')).join('\n'):'',confidence:''});
    slots.filter(el=>!optional(el)||el.value.trim()).forEach(el=>{
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
  function missingWork(){
    const missing=[];
    if(sorts.some(el=>!el.value))missing.push({label:'Practice: choose an answer for each statement',target:sorts.find(el=>!el.value)});
    requiredEvidence.filter(el=>!el.value.trim()).forEach(el=>missing.push({label:'Results notebook: '+el.dataset.evidence,target:el}));
    requiredSlots.filter(el=>!el.value.trim()).forEach(el=>missing.push({label:el.dataset.label||el.dataset.slot,target:el}));
    return missing;
  }
  function showFilingStatus(message){
    const status=document.getElementById('copy-status');if(!status)return;
    status.replaceChildren(document.createTextNode(message));
    const missing=missingWork();
    if(missing.length){
      status.append(document.createTextNode(' Review these missing parts:'));
      const ul=document.createElement('ul');
      missing.forEach(item=>{const li=document.createElement('li'),a=document.createElement('a');a.href='#'+item.target.id;a.textContent=item.label;li.append(a);ul.append(li)});
      status.append(ul);
    }else status.append(document.createTextNode(' Draft fields are filled. Check your facts, evidence, and explanation before submitting.'));
    status.append(document.createTextNode(' Paste into the assigned Canvas Text Entry and submit there. BeCurrent does not submit for you.'));
  }
  function freshPreview(){
    const payload=gather(),preview=document.getElementById('copy-preview');
    if(preview){preview.value=payload.plain;preview.hidden=false;preview.dataset.stale='false';}
    return payload;
  }
  const gatherBtn=document.getElementById('gather-work');
  if(gatherBtn)gatherBtn.addEventListener('click',async()=>{
    const version=editVersion,payload=freshPreview();
    const preview=document.getElementById('copy-preview');
    const status=document.getElementById('copy-status');
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
    if(status){
      status.classList.toggle('error',!copied);
      showFilingStatus(copied?'Copied the latest gathered work.':'Clipboard unavailable; use Select all, then Copy in the box below.');
    }
    if(version!==editVersion){if(preview)preview.dataset.stale='true';if(status){status.classList.add('error');status.textContent='Your work changed while copying. Choose Gather All My Work again before pasting into Canvas.';}}
    if(!copied&&preview){preview.focus();preview.select()}
  });
  const selectAll=document.getElementById('select-work');
  if(selectAll)selectAll.addEventListener('click',()=>{
    const box=document.getElementById('copy-preview');if(!box)return;
    freshPreview();
    const status=document.getElementById('copy-status');if(status)status.classList.remove('error');
    showFilingStatus('Latest work selected. Copy this selection, then paste into Canvas.');
    box.focus();box.select();
  });
})();
