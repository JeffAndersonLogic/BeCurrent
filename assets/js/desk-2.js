(()=>{
  'use strict';

  const news=window.BECURRENT_DAILY_NEWS||{};
  const lead=news.lead||{};
  const META_PREFIX='becurrent-desk-meta-';
  const DESK_PREFIX='becurrent-desk-';
  const ANCHOR_MONDAY='2026-08-24';
  const CYCLE_WEEKS=2;

  function dayKeyOf(d){
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function dateOfKey(key){
    const p=String(key).split('-').map(Number);
    return new Date(p[0],p[1]-1,p[2]);
  }
  function dayLabel(key){
    return dateOfKey(key).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
  }
  function mondayOf(d){
    const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());
    x.setDate(x.getDate()-((x.getDay()+6)%7));
    return x;
  }
  function daysBetweenUTC(a,b){
    return Math.round((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/86400000);
  }
  function cycleStart(){
    const parts=ANCHOR_MONDAY.split('-').map(Number);
    const anchor=mondayOf(new Date(parts[0],parts[1]-1,parts[2]));
    const here=mondayOf(new Date());
    const weeksIn=Math.floor(daysBetweenUTC(anchor,here)/7);
    const cycles=Math.max(0,Math.floor(weeksIn/CYCLE_WEEKS));
    return new Date(anchor.getFullYear(),anchor.getMonth(),anchor.getDate()+cycles*CYCLE_WEEKS*7);
  }
  function cycleKeys(){
    const start=cycleStart();
    const out=[];
    for(let i=0;i<CYCLE_WEEKS*7;i++)out.push(dayKeyOf(new Date(start.getFullYear(),start.getMonth(),start.getDate()+i)));
    return out;
  }
  function parseStore(key){
    try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):null;}catch(_){return null;}
  }
  function saveMeta(key,value){
    try{localStorage.setItem(META_PREFIX+key,JSON.stringify(value));}catch(_){/* private mode */}
  }
  function text(id,value){const el=document.getElementById(id);if(el&&value)el.textContent=value;}

  const TODAY=dayKeyOf(new Date());
  let meta=parseStore(META_PREFIX+TODAY)||{};

  /* One current-news source, frozen into today's local metadata so tomorrow's
     refresh does not rewrite what a student saw today. */
  if(lead.headline&&!meta.leadHeadline)meta.leadHeadline=lead.headline;
  if(lead.source&&!meta.leadSource)meta.leadSource=lead.source;
  if(lead.published&&!meta.leadPublished)meta.leadPublished=lead.published;
  if(lead.url&&!meta.leadUrl)meta.leadUrl=lead.url;
  saveMeta(TODAY,meta);

  const visual=document.querySelector('[data-lead-image]');
  if(visual&&lead.image)visual.style.backgroundImage=`url("${lead.image.replace(/"/g,'')}")`;
  text('desk-lead-headline',lead.headline||'Today’s lead story');
  text('desk-lead-dek',lead.dek||'Open the source, identify what actually happened, and file what matters.');
  text('desk-lead-source',lead.source||'Teacher-selected source');
  text('desk-lead-published',lead.published||'Today');
  const leadLink=document.getElementById('desk-lead-link');
  if(leadLink&&lead.url){leadLink.href=lead.url;leadLink.target='_blank';leadLink.rel='noopener noreferrer';}

  /* The current-wire shelf is a visual launcher, not a feed that receives student work. */
  const wireHost=document.getElementById('desk-current-wire');
  if(wireHost&&Array.isArray(news.wire)){
    news.wire.forEach(item=>{
      const a=document.createElement('a');
      a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';
      a.textContent=`${item.category} · ${item.headline}`;
      wireHost.appendChild(a);
    });
  }

  /* The Lead's source facts use the existing capture slots. The capture block
     has already attached autosave listeners by the time this file runs. */
  [
    ['answer-local-outlet',lead.source],
    ['answer-local-date',lead.published],
    ['answer-local-link',lead.url]
  ].forEach(([id,value])=>{
    const input=document.getElementById(id);
    if(!input||!value||String(input.value||'').trim())return;
    input.value=value;
    input.dispatchEvent(new Event('input',{bubbles:true}));
  });

  const extras={
    headline:document.getElementById('desk-pick-headline'),
    reason:document.getElementById('desk-pick-reason'),
    category:document.getElementById('desk-pick-category'),
    local:document.getElementById('desk-pick-local')
  };
  if(extras.headline)extras.headline.value=meta.pickHeadline||'';
  if(extras.reason)extras.reason.value=meta.pickReason||'';
  if(extras.category)extras.category.value=meta.pickCategory||'';
  if(extras.local)extras.local.checked=!!meta.pickLocal;

  function persistExtras(){
    meta=parseStore(META_PREFIX+TODAY)||meta||{};
    if(extras.headline)meta.pickHeadline=extras.headline.value.trim();
    if(extras.reason)meta.pickReason=extras.reason.value.trim();
    if(extras.category)meta.pickCategory=extras.category.value;
    if(extras.local)meta.pickLocal=extras.local.checked;
    if(lead.headline)meta.leadHeadline=meta.leadHeadline||lead.headline;
    if(lead.source)meta.leadSource=meta.leadSource||lead.source;
    if(lead.published)meta.leadPublished=meta.leadPublished||lead.published;
    if(lead.url)meta.leadUrl=meta.leadUrl||lead.url;
    saveMeta(TODAY,meta);
    renderJournal();
  }
  Object.values(extras).forEach(el=>{
    if(!el)return;
    el.addEventListener(el.type==='checkbox'?'change':'input',persistExtras);
  });

  /* Keep the journal live when the four captured writing boxes change. */
  ['answer-local-what','answer-local-why','answer-world-what','answer-world-why'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.addEventListener('input',()=>setTimeout(renderJournal,0));
  });

  function firstSentence(value){
    const s=String(value||'').trim();
    if(!s)return '';
    const m=s.match(/^(.{1,120}?[.!?])(?:\s|$)/);
    return (m?m[1]:s.slice(0,120)).trim();
  }
  function esc(value){
    return String(value==null?'':value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function hasDeskState(state){
    if(!state||typeof state!=='object')return false;
    return Object.values(state).some(v=>v&&typeof v.answer==='string'&&v.answer.trim());
  }

  function renderJournal(){
    const host=document.getElementById('desk-journal-list');
    if(!host)return;
    const keys=cycleKeys();
    let localCount=0;
    const rows=[];
    keys.forEach(key=>{
      const state=parseStore(DESK_PREFIX+key)||{};
      const dayMeta=parseStore(META_PREFIX+key)||{};
      if(dayMeta.pickLocal)localCount++;
      if(!hasDeskState(state)&&!Object.keys(dayMeta).length)return;
      const leadHeadline=dayMeta.leadHeadline||firstSentence((state['local-what']||{}).answer)||'Lead filed';
      const pickHeadline=dayMeta.pickHeadline||firstSentence((state['world-what']||{}).answer)||'Your Pick not filed';
      const judgment=String((state['world-why']||{}).answer||'').trim();
      rows.push({key,leadHeadline,pickHeadline,judgment,pickLocal:!!dayMeta.pickLocal});
    });
    const progress=document.getElementById('desk-local-progress');
    if(progress){
      progress.innerHTML=localCount>0
        ? `<strong class="met">Local story logged.</strong> ${localCount} local pick${localCount===1?'':'s'} in this News Log.`
        : '<strong>Local check:</strong> Make at least one Your Pick local during this two-week News Log.';
    }
    if(!rows.length){
      host.innerHTML='<div class="journal-empty">Your Desk is empty. File today’s Lead and Your Pick, and this becomes your two-week news journal.</div>';
      return;
    }
    host.innerHTML=rows.map(row=>`<article class="journal-day">
      <div class="journal-date">${esc(dayLabel(row.key))}${row.pickLocal?' · LOCAL':''}</div>
      <div class="journal-story"><span>The Lead</span><strong>${esc(row.leadHeadline)}</strong></div>
      <div class="journal-story"><span>Your Pick</span><strong>${esc(row.pickHeadline)}</strong>${row.judgment?`<p>${esc(row.judgment)}</p>`:''}</div>
    </article>`).join('');
  }
  renderJournal();
})();
