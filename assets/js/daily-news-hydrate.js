(()=>{
  'use strict';

  function hourKey(){
    return Math.floor(Date.now()/3600000);
  }

  function render(){
    const notice=document.querySelector('[data-class-announcement]');
    if(notice){
      const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Indiana/Indianapolis',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      const day=((window.BECURRENT_SCHEDULE||{}).days||[]).find(d=>d.date===today);
      notice.textContent=day?(day.homeAnnouncement||'Today: '+(day.topicTitle||'Open the class board')):'Open today’s class board';
    }
    const data=window.BECURRENT_DAILY_NEWS||{};
    const lead=data.lead||{};
    const wire=Array.isArray(data.wire)?data.wire:[];

    document.querySelectorAll('[data-daily-wire]').forEach((el,i)=>{
      const item=wire[i];
      if(!item)return;
      el.textContent=`${item.category} · ${item.headline}`;
      el.href=item.url;
      el.target='_blank';
      el.rel='noopener';
    });

    // The large newsroom hero and the shared Desk Lead are one story.
    // Never keep an old investigation headline or background image in this slot.
    const hero=document.querySelector('[data-daily-hero]');
    const kicker=document.querySelector('[data-daily-lead-kicker]');
    const credit=document.querySelector('[data-daily-image-credit]');
    function trustedPhoto(value){
      try {
        const url=new URL(String(value||''));
        const domains=['wikimedia.org','bbci.co.uk','bbci.com','bbc.co.uk','bbc.com',
          'reuters.com','apnews.com','newsnationnow.com','wp.com'];
        if(url.protocol!=='https:'||!/^(?:[^.]+\.)*[^.]+\.[^.]+$/.test(url.hostname))return '';
        if(!domains.some(domain=>url.hostname===domain||url.hostname.endsWith('.'+domain)))return '';
        if(/World_Map_Blank\.svg/i.test(url.pathname))return '';
        return url.href;
      } catch(_){return '';}
    }
    const photo=trustedPhoto(lead.image);
    // The story's own photograph always wins. Without one, the lead gets a local
    // file photo for its section, captioned as a file photo so it is never taken
    // for a picture of the story itself. See assets/js/section-photos.js.
    const sections=window.BECURRENT_SECTION_PHOTOS;
    const file=!photo&&sections?sections.forCategory(lead.category):null;
    const captionEl=document.querySelector('[data-daily-image-caption]');
    if(hero){
      const src=photo||(file&&file.src)||'';
      hero.dataset.hasPhoto=src?'true':'false';
      hero.dataset.filePhoto=file?'true':'false';
      hero.style.backgroundImage=src?'url('+JSON.stringify(src)+')':'';
      hero.setAttribute('aria-label',file?file.alt:'Photograph for today’s top story');
    }
    if(captionEl)captionEl.textContent=file?sections.caption(file):'';
    if(credit){
      const text=photo?lead.imageCredit:(file&&file.credit);
      if(text){
        credit.textContent=text;
        credit.href=photo?(lead.imageCreditUrl||lead.url||photo):file.creditUrl;
        credit.hidden=false;
      }else{
        credit.hidden=true;
        credit.removeAttribute('href');
      }
    }
    // Publisher images can be blocked on school networks. Keep the existing
    // local, explicitly captioned file-photo route available on an actual error.
    if(photo){
      const attempted=photo,probe=new Image();
      if(hero)hero.dataset.photoUrl=attempted;
      probe.onerror=()=>{
        if(hero&&hero.dataset.photoUrl!==attempted)return;
        const fallback=sections?sections.forCategory(lead.category):null;
        if(hero){hero.style.backgroundImage=fallback?'url('+JSON.stringify(fallback.src)+')':'';hero.dataset.filePhoto=fallback?'true':'false';hero.dataset.hasPhoto=fallback?'true':'false';hero.setAttribute('aria-label',fallback?fallback.alt:'Photograph unavailable');}
        if(captionEl)captionEl.textContent=fallback?sections.caption(fallback):'';
        if(credit){credit.textContent=fallback?fallback.credit:'';credit.hidden=!fallback;if(fallback)credit.href=fallback.creditUrl;else credit.removeAttribute('href');}
      };
      probe.src=attempted;
    }
    if(kicker)kicker.textContent='Today’s top story'+(lead.category?' · '+lead.category:'');

    const leadLink=document.querySelector('[data-daily-lead-link]');
    const leadTitle=document.querySelector('[data-daily-lead-title]');
    const leadDek=document.querySelector('[data-daily-lead-dek]');
    const leadMeta=document.querySelector('[data-daily-lead-meta]');
    if(leadLink&&lead.url){leadLink.href=lead.url;leadLink.target='_blank';leadLink.rel='noopener';}
    if(leadTitle&&lead.headline)leadTitle.textContent=lead.headline;
    if(leadDek&&lead.dek)leadDek.textContent=lead.dek;
    if(leadMeta)leadMeta.textContent=[lead.category,lead.source,lead.published].filter(Boolean).join(' · ');

    const briefing=wire.slice(0,4);
    document.querySelectorAll('[data-daily-briefing]').forEach((card,i)=>{
      const item=briefing[i];
      if(!item)return;
      if(item.url){card.href=item.url;card.target='_blank';card.rel='noopener';}
      const meta=card.querySelector('[data-brief-meta]');
      const title=card.querySelector('[data-brief-title]');
      const dek=card.querySelector('[data-brief-dek]');
      if(meta)meta.textContent=[item.category,item.source].filter(Boolean).join(' · ');
      const icon=card.querySelector('[data-brief-icon]');
      if(icon&&window.BECURRENT_ICONS){
        icon.dataset.icon=window.BECURRENT_ICONS.iconForCategory(item.category);
        window.BECURRENT_ICONS.paint(card);
      }
      if(title)title.textContent=item.headline||'';
      if(dek)dek.textContent=item.dek||'Open the reporting and decide what actually changed.';
    });

    // An outage must never be presented to a classroom as today's verified news.
    const dateIsValid=/^\d{4}-\d{2}-\d{2}$/.test(data.reviewed||'');
    const reviewedAt=dateIsValid?new Date(data.reviewed+'T12:00:00'):null;
    const outdated=!reviewedAt||!Number.isFinite(reviewedAt.getTime())||
      Date.now()-reviewedAt.getTime()>48*3600000;
    document.querySelectorAll('[data-daily-reviewed]').forEach(el=>{
      el.textContent=outdated
        ? 'News refresh delayed · Last reviewed '+(data.reviewed||'unknown')
        : 'Daily desk reviewed '+data.reviewed;
      if(outdated)el.setAttribute('role','status');
    });
    if(outdated){
      if(kicker)kicker.textContent='Refresh delayed · Last reviewed '+(data.reviewed||'unknown');
      const headline=document.querySelector('.home-briefing h2');
      if(headline)headline.textContent='News refresh delayed. Check article dates before using these stories.';
    }
  }

  const fresh=document.createElement('script');
  fresh.src='assets/data/daily-news.js?v=hour-'+hourKey();
  fresh.async=false;
  fresh.onload=render;
  fresh.onerror=render;
  document.head.appendChild(fresh);
})();
