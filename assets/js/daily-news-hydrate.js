(()=>{
  'use strict';

  function hourKey(){
    return Math.floor(Date.now()/3600000);
  }

  function render(){
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
