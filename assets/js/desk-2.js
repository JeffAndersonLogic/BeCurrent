(()=>{
  'use strict';

  function dayKeyOf(d){
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }

  function loadSchedule(done){
    if(window.BECURRENT_SCHEDULE){done();return;}
    const script=document.createElement('script');
    script.src='../assets/data/announcements-schedule.js';
    script.async=false;
    script.onload=done;
    script.onerror=done;
    document.head.appendChild(script);
  }

  function scheduledMode(today){
    const schedule=window.BECURRENT_SCHEDULE||{};
    const days=Array.isArray(schedule.days)?schedule.days:[];
    const entry=days.find(day=>day&&day.date===today)||null;
    return entry&&entry.deskMode==='lead'?'lead':'full';
  }

  function applyModeUI(mode){
    document.body.dataset.deskMode=mode;
    if(mode!=='lead')return;

    const pick=document.querySelector('.pick-card');
    const divider=document.querySelector('.desk-sequence-divider');
    const progress=document.getElementById('desk-local-progress');
    const sources=document.getElementById('sources');
    const two=document.querySelector('.desk-two');
    if(pick)pick.hidden=true;
    if(divider)divider.hidden=true;
    if(progress)progress.hidden=true;
    if(sources)sources.hidden=true;
    if(two)two.style.gridTemplateColumns='1fr';

    const brief=document.querySelector('.desk-brief');
    if(brief){
      const heading=brief.querySelector('h2');
      const intro=brief.querySelector('p');
      const rhythm=brief.querySelector('.desk-rhythm');
      if(heading)heading.textContent='Know the Lead. Then go deep.';
      if(intro)intro.textContent='Today is Lead Mode. File the shared story, make one significance judgment, then move into the investigation.';
      if(rhythm)rhythm.innerHTML=''
        + '<div class="desk-rhythm-row"><span class="desk-rhythm-num">1</span><div><strong>Know the Lead</strong><span>One important story the whole room shares.</span></div></div>'
        + '<div class="desk-rhythm-row"><span class="desk-rhythm-num">2</span><div><strong>File the Lead</strong><span>What happened. Why it matters.</span></div></div>'
        + '<div class="desk-rhythm-row"><span class="desk-rhythm-num">3</span><div><strong>Copy My Desk</strong><span>Back up today’s filing in the News Log.</span></div></div>';
    }

    const pill=document.querySelector('.desk-date-pill');
    if(pill&&!pill.dataset.modeLabeled){
      pill.insertBefore(document.createTextNode('Lead Mode · '),pill.firstChild);
      pill.dataset.modeLabeled='true';
    }

    const fileHead=document.querySelector('#file .desk-section-head');
    if(fileHead){
      const heading=fileHead.querySelector('h2');
      const intro=fileHead.querySelector('p');
      if(heading)heading.textContent='Today’s Lead, then the investigation.';
      if(intro)intro.textContent='Lead Mode keeps the daily news habit but removes Your Pick today so the investigation gets sustained time.';
    }

    const journalHead=document.querySelector('#journal .desk-section-head p');
    if(journalHead)journalHead.textContent='Full Desk days add Your Pick. Lead Mode days record the shared Lead only.';

    const weekHead=document.querySelector('#week .desk-section-head p');
    if(weekHead)weekHead.textContent='One News Log every two weeks in Canvas. Lead Mode days count as a complete one-story filing.';
  }

  function init(){
    /* Load the tiny visual patch from the existing generated Desk page without
       changing the generated HTML contract. */
    if(!document.querySelector('link[data-desk-patch]')){
      const css=document.createElement('link');
      css.rel='stylesheet';
      css.href='../assets/css/desk-2-patch.css';
      css.dataset.deskPatch='true';
      document.head.appendChild(css);
    }

    const TODAY=dayKeyOf(new Date());
    const MODE=scheduledMode(TODAY);
    window.BECURRENT_DESK_MODE=MODE;
    try{
      const key='becurrent-desk-'+TODAY;
      const stored=JSON.parse(localStorage.getItem(key)||'{}');
      stored._mode=MODE;
      localStorage.setItem(key,JSON.stringify(stored));
    }catch(_){/* private mode */}
    applyModeUI(MODE);

    const pickCard=document.querySelector('.pick-card');
    const pickMeta=pickCard&&pickCard.querySelector('.pick-meta');
    if(MODE==='full'&&pickCard&&pickMeta&&!pickCard.querySelector('.desk-source-jump')){
      const jump=document.createElement('div');
      jump.className='desk-source-jump';
      jump.innerHTML='<strong>Need a story before you can file?</strong><a href="#sources">Browse the Source Shelf ↓</a>';
      pickMeta.parentNode.insertBefore(jump,pickMeta);
    }

    const news=window.BECURRENT_DAILY_NEWS||{};
    const lead=news.lead||{};
    const META_PREFIX='becurrent-meta-desk-';
    const DESK_PREFIX='becurrent-desk-';
    const ANCHOR_MONDAY='2026-08-24';
    const CYCLE_WEEKS=2;

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

    let meta=parseStore(META_PREFIX+TODAY)||{};

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

    const wireHost=document.getElementById('desk-current-wire');
    if(wireHost&&Array.isArray(news.wire)&&MODE==='full'){
      news.wire.forEach(item=>{
        const a=document.createElement('a');
        a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';
        a.textContent=`${item.category} · ${item.headline}`;
        wireHost.appendChild(a);
      });
    }

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
      return Object.entries(state).some(([key,v])=>/-(?:what|why)$/.test(key)&&v&&typeof v.answer==='string'&&v.answer.trim());
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
        const mode=state._mode==='lead'?'lead':'full';
        if(mode==='full'&&dayMeta.pickLocal)localCount++;
        if(!hasDeskState(state)&&!Object.keys(dayMeta).length)return;
        const leadHeadline=dayMeta.leadHeadline||firstSentence((state['local-what']||{}).answer)||'Lead filed';
        const leadWhy=String((state['local-why']||{}).answer||'').trim();
        const pickHeadline=dayMeta.pickHeadline||firstSentence((state['world-what']||{}).answer)||'Your Pick not filed';
        const judgment=String((state['world-why']||{}).answer||'').trim();
        rows.push({key,mode,leadHeadline,leadWhy,pickHeadline,judgment,pickLocal:mode==='full'&&!!dayMeta.pickLocal});
      });
      const progress=document.getElementById('desk-local-progress');
      if(progress){
        progress.innerHTML=localCount>0
          ? `<strong class="met">Local story logged.</strong> ${localCount} local pick${localCount===1?'':'s'} in this News Log.`
          : '<strong>Local check:</strong> Make at least one Your Pick local during this two-week News Log.';
      }
      if(!rows.length){
        host.innerHTML='<div class="journal-empty">Your Desk is empty. File today’s Desk, and this becomes your two-week news journal.</div>';
        return;
      }
      host.innerHTML=rows.map(row=>`<article class="journal-day">
        <div class="journal-date">${esc(dayLabel(row.key))}${row.pickLocal?' · LOCAL':''}${row.mode==='lead'?' · LEAD MODE':''}</div>
        <div class="journal-story"><span>The Lead</span><strong>${esc(row.leadHeadline)}</strong>${row.mode==='lead'&&row.leadWhy?`<p>${esc(row.leadWhy)}</p>`:''}</div>
        ${row.mode==='full'?`<div class="journal-story"><span>Your Pick</span><strong>${esc(row.pickHeadline)}</strong>${row.judgment?`<p>${esc(row.judgment)}</p>`:''}</div>`:''}
      </article>`).join('');
    }
    renderJournal();
  }

  loadSchedule(init);
})();
