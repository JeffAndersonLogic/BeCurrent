(()=>{
  'use strict';

  function dayKeyOf(d){
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }

  function loadSchedule(done){
    if(window.BECURRENT_SCHEDULE){done();return;}
    var script=document.createElement('script');
    script.src='../assets/data/announcements-schedule.js?v=20260831-desk';
    script.async=false;
    script.onload=done;
    script.onerror=done;
    document.head.appendChild(script);
  }

  function scheduledMode(today){
    var schedule=window.BECURRENT_SCHEDULE||{};
    var days=Array.isArray(schedule.days)?schedule.days:[];
    var entry=days.find(function(day){return day&&day.date===today;})||null;
    return entry&&entry.deskMode==='lead'?'lead':'full';
  }

  function setText(id,value){
    var el=document.getElementById(id);
    if(el&&value)el.textContent=value;
  }

  function setLink(id,url){
    var el=document.getElementById(id);
    if(!el||!url)return;
    el.href=url;
    el.target='_blank';
    el.rel='noopener noreferrer';
  }

  function applyCanvasLinks(){
    var config=window.BECURRENT_DESK_CONFIG||{};
    var url=config.canvasUrl||'https://zcs.instructure.com/';
    document.querySelectorAll('a[href="https://zcs.instructure.com/"]').forEach(function(link){link.href=url;});
  }

  function applyModeUI(mode){
    document.body.dataset.deskMode=mode;
    if(mode!=='lead')return;

    var pick=document.querySelector('.pick-card');
    var divider=document.querySelector('.desk-sequence-divider');
    var sources=document.getElementById('sources');
    var two=document.querySelector('.desk-two');
    if(pick)pick.hidden=true;
    if(divider)divider.hidden=true;
    if(sources)sources.hidden=true;
    if(two)two.style.gridTemplateColumns='1fr';

    var brief=document.querySelector('.desk-brief');
    if(brief){
      var heading=brief.querySelector('h2');
      var intro=brief.querySelector('p');
      var rhythm=brief.querySelector('.desk-rhythm');
      if(heading)heading.textContent='Read here. Write in Canvas.';
      if(intro)intro.textContent='Today is Lead Mode. File only the shared story in your Canvas News Log, then move into the scheduled investigation or assessment.';
      if(rhythm)rhythm.innerHTML=''
        + '<div class="desk-rhythm-row"><span class="desk-rhythm-num">1</span><div><strong>Open your notebook</strong><span>Launch the Microsoft Education assignment from Canvas.</span></div></div>'
        + '<div class="desk-rhythm-row"><span class="desk-rhythm-num">2</span><div><strong>Know the Lead</strong><span>Read the shared story and identify what happened.</span></div></div>'
        + '<div class="desk-rhythm-row"><span class="desk-rhythm-num">3</span><div><strong>File the Lead</strong><span>Explain the event and its significance in your Word notebook.</span></div></div>'
        + '<div class="desk-rhythm-row"><span class="desk-rhythm-num">4</span><div><strong>Check Saved</strong><span>Your Canvas/Microsoft file is the record.</span></div></div>';
    }

    var pill=document.querySelector('.desk-date-pill');
    if(pill&&!pill.dataset.modeLabeled){
      pill.insertBefore(document.createTextNode('Lead Mode · '),pill.firstChild);
      pill.dataset.modeLabeled='true';
    }

    var fileHead=document.querySelector('#file .desk-section-head');
    if(fileHead){
      var fileHeading=fileHead.querySelector('h2');
      var fileIntro=fileHead.querySelector('p');
      if(fileHeading)fileHeading.textContent='Today’s Lead, then the scheduled work.';
      if(fileIntro)fileIntro.textContent='Lead Mode keeps the daily news habit but removes Your Pick. Record the two Lead responses in your Canvas News Log.';
    }
  }

  function hydrate(){
    var today=dayKeyOf(new Date());
    var mode=scheduledMode(today);
    var news=window.BECURRENT_DAILY_NEWS||{};
    var lead=news.lead||{};

    window.BECURRENT_DESK_MODE=mode;
    applyCanvasLinks();
    applyModeUI(mode);

    var todayEl=document.getElementById('desk-today');
    if(todayEl){
      todayEl.textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
    }

    var visual=document.querySelector('[data-lead-image]');
    if(visual&&lead.image){visual.style.backgroundImage='url("'+String(lead.image).replace(/"/g,'')+'")';}

    setText('desk-lead-headline',lead.headline||'Today’s lead story');
    setText('desk-lead-dek',lead.dek||'Open the reporting, identify what actually happened, and file what matters in your Canvas notebook.');
    setText('desk-lead-source',lead.source||'Teacher-selected source');
    setText('desk-lead-published',lead.published||'Today');
    setText('desk-card-lead-source',lead.source||'Teacher-selected source');
    setText('desk-card-lead-date',lead.published||'Today');
    setLink('desk-lead-link',lead.url);
    setLink('desk-card-lead-link',lead.url);

    var wireHost=document.getElementById('desk-current-wire');
    if(wireHost&&Array.isArray(news.wire)&&mode==='full'){
      news.wire.forEach(function(item){
        if(!item||!item.url||!item.headline)return;
        var a=document.createElement('a');
        a.href=item.url;
        a.target='_blank';
        a.rel='noopener noreferrer';
        a.textContent=(item.category?item.category+' · ':'')+item.headline;
        wireHost.appendChild(a);
      });
    }
  }

  loadSchedule(hydrate);
})();
