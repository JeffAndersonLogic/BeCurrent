(()=>{
  'use strict';
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

  const briefing=[lead].concat(wire.slice(0,3));
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

  document.querySelectorAll('[data-daily-reviewed]').forEach(el=>{
    if(data.reviewed)el.textContent=`Daily desk reviewed ${data.reviewed}`;
  });
})();
