// BeCurrent Iran at War — video-forward accessibility layer
// Presentation only. Canonical video metadata lives in
// scripts/lib/iran-video-content.js and is generated to
// assets/data/iran-videos.js by scripts/build-iran-videos.js.
(()=>{
  'use strict';

  function start(){
    const catalog=window.BECURRENT_IRAN_VIDEOS&&window.BECURRENT_IRAN_VIDEOS.topics;
    const topic=document.body.dataset.topic;
    const guide=catalog&&catalog[topic];
    if(!guide)return;

    const css=`
    .ir-topic-nav{margin:0;background:#121517;border-bottom:1px solid rgba(237,232,220,.16);box-shadow:0 8px 24px rgba(0,0,0,.16)}
    .ir-topic-nav-inner{max-width:1500px;margin:0 auto;padding:10px 18px;display:flex;align-items:center;gap:10px;overflow-x:auto;scrollbar-width:thin}
    .ir-topic-nav-label{flex:0 0 auto;font-family:'IBM Plex Mono',monospace;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:#c8c2b2;margin-right:2px}
    .ir-topic-nav a{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border:1px solid rgba(237,232,220,.14);background:#1a1c1d;color:#ede8dc;text-decoration:none;font-family:'IBM Plex Mono',monospace;font-size:.72rem;line-height:1.1;border-radius:2px}
    .ir-topic-nav a:hover,.ir-topic-nav a:focus{background:#244d78;border-color:#3a6fa8;outline:none}
    .ir-topic-nav a[aria-current="page"]{background:#b03a2e;border-color:#b03a2e;color:#fff;font-weight:700}
    .ir-topic-nav a strong{font-size:.78rem}
    .ir-video-forward{margin:24px 0 34px;border:1px solid rgba(237,232,220,.16);background:linear-gradient(180deg,rgba(27,58,92,.34),rgba(26,28,29,.96));box-shadow:0 18px 40px rgba(0,0,0,.18)}
    .ir-video-forward-head{padding:22px 24px;border-bottom:1px solid rgba(237,232,220,.12)}
    .ir-video-forward-head h2{margin:.2rem 0 .45rem;font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.7rem,3vw,2.4rem)}
    .ir-video-forward-head p{max-width:76ch;margin:0;color:#c8c2b2}
    .ir-watch-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(237,232,220,.12)}
    .ir-watch{background:#1a1c1d;padding:20px;display:flex;flex-direction:column;min-height:100%}
    .ir-watch-meta{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:12px;font-family:'IBM Plex Mono',monospace;font-size:.7rem;letter-spacing:.05em;text-transform:uppercase}
    .ir-watch-status{color:#ede8dc;background:#b03a2e;padding:4px 7px;border-radius:2px;white-space:nowrap}
    .ir-watch-status.optional{background:#2c3138;color:#c8c2b2}
    .ir-watch-status.choice{background:#1b3a5c;color:#ede8dc}
    .ir-watch h3{font-size:1.15rem;line-height:1.25;margin:.15rem 0 .35rem}
    .ir-watch-source{font-family:'IBM Plex Mono',monospace;font-size:.75rem;color:#3a6fa8;margin-bottom:12px}
    .ir-watch p{font-size:.94rem;line-height:1.55;color:#c8c2b2}
    .ir-watch-cues{margin:10px 0 14px;padding:10px 12px;background:#22262b;border-left:3px solid #3a6fa8;font-size:.86rem;color:#ede8dc}
    .ir-watch-cues strong{display:block;color:#fff;margin-bottom:3px}
    .ir-watch a.ir-watch-link{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;padding:11px 13px;background:#1b3a5c;color:#fff;text-decoration:none;font-weight:700;border-radius:2px}
    .ir-watch a.ir-watch-link:hover,.ir-watch a.ir-watch-link:focus{background:#244d78}
    .ir-video-audit{padding:0 24px 18px;font-family:'IBM Plex Mono',monospace;font-size:.68rem;color:#8f918e}
    .ir-scaffold{margin:16px 0;padding:18px 20px;background:#f7f3ec;color:#17191a;border-left:5px solid #1b3a5c}
    .ir-scaffold h3{color:#17191a;margin:0 0 8px}
    .ir-scaffold ul{margin:0;padding-left:1.25rem}.ir-scaffold li{margin:.38rem 0;line-height:1.45}
    details.ir-full-background{margin-top:10px;border:1px solid rgba(237,232,220,.14);background:#22262b}
    details.ir-full-background>summary{cursor:pointer;padding:12px 14px;font-family:'IBM Plex Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em;color:#c8c2b2}
    details.ir-full-background .ir-reading{margin:0;border:0;box-shadow:none}
    @media(max-width:900px){.ir-topic-nav-inner{padding:9px 12px}.ir-watch-grid{grid-template-columns:1fr}.ir-watch{min-height:0}.ir-video-forward-head{padding:18px}.ir-video-audit{padding:0 18px 16px}}
    `;
    if(!document.getElementById('iran-video-forward-style')){
      const style=document.createElement('style');style.id='iran-video-forward-style';style.textContent=css;document.head.appendChild(style);
    }

    const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const statusClass=s=>/OPTIONAL/.test(s)?'optional':/CHOICE/.test(s)?'choice':'';
    const card=v=>`<article class="ir-watch"><div class="ir-watch-meta"><span>${esc(v.label)}</span><span class="ir-watch-status ${statusClass(v.status)}">${esc(v.status)}</span></div><h3>${esc(v.title)}</h3><div class="ir-watch-source">${esc(v.source)} · ${esc(v.runtime)}</div><p><strong>Why you’re watching:</strong> ${esc(v.why)}</p><div class="ir-watch-cues"><strong>Listen for</strong>${v.listen.map(esc).join(' · ')}</div><p><strong>After watching:</strong> ${esc(v.after)}</p><a class="ir-watch-link" href="${esc(v.url)}" ${/^https?:/.test(v.url)?'target="_blank" rel="noopener noreferrer"':''}>Open video / resource →</a></article>`;

    function installTopicNavigator(){
      if(document.querySelector('.ir-topic-nav'))return;
      const topics=[
        ['topic-01','index.html','The War Now'],
        ['topic-02','topic-02-1953.html','The Road to War'],
        ['topic-03','topic-03-1979.html','Why Enemies?'],
        ['topic-04','topic-04-security.html','Security Strategy'],
        ['topic-05','topic-05-nuclear.html','Nuclear Bargain'],
        ['topic-06','topic-06-escalation.html','Escalation'],
        ['topic-07','topic-07-hormuz.html','Hormuz'],
        ['topic-08','topic-08-synthesis.html','Synthesis']
      ];
      const nav=document.createElement('nav');
      nav.className='ir-topic-nav';
      nav.setAttribute('aria-label','Iran at War topics');
      nav.innerHTML='<div class="ir-topic-nav-inner"><span class="ir-topic-nav-label">Jump to topic</span>'+topics.map((row,i)=>{
        const current=row[0]===topic?' aria-current="page"':'';
        return '<a href="'+row[1]+'"'+current+'><strong>'+(i+1)+'</strong><span>'+esc(row[2])+'</span></a>';
      }).join('')+'</div>';
      const position=document.querySelector('.ir-position');
      const sticky=document.querySelector('.sticky-journey');
      const anchor=position||sticky||document.querySelector('.mast');
      if(anchor)anchor.insertAdjacentElement('afterend',nav);
    }

    function relocateGather(){
      const gather=document.getElementById('gather');
      const nextCard=document.querySelector('.ir-next');
      const nextSection=nextCard&&nextCard.closest('.ir-section');
      if(gather&&nextSection&&gather.nextElementSibling!==nextSection){
        nextSection.insertAdjacentElement('beforebegin',gather);
      }
    }

    function installVideos(){
      if(document.querySelector('.ir-video-forward'))return;
      const section=document.createElement('section');
      section.className='ir-video-forward';
      section.id='video-forward';
      section.setAttribute('aria-labelledby','watch-title');
      section.innerHTML=`<div class="ir-video-forward-head"><div class="ir-kicker red">Video-forward pathway</div><h2 id="watch-title">${esc(guide.heading)}</h2><p>${esc(guide.intro)}</p></div><div class="ir-watch-grid">${guide.videos.map(card).join('')}</div><div class="ir-video-audit">Video links audited ${esc(window.BECURRENT_IRAN_VIDEOS.reviewed)}. Required does not mean every clip must be shown whole; follow any excerpt directions shown on the card.</div>`;
      const objectives=document.getElementById('objectives');
      const hero=document.querySelector('.ir-hero');
      (objectives||hero)?.insertAdjacentElement('afterend',section);
    }

    function installScaffold(spec){
      if(!spec)return;
      const original=document.querySelector(spec.selector);
      if(!original||original.closest('details.ir-full-background'))return;
      const box=document.createElement('div');
      box.className='ir-scaffold';
      box.innerHTML=`<h3>${esc(spec.title)}</h3><ul>${spec.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>`;
      original.insertAdjacentElement('beforebegin',box);
      const details=document.createElement('details');
      details.className='ir-full-background';
      details.innerHTML='<summary>Read the full background (optional)</summary>';
      original.parentNode.insertBefore(details,original);
      details.appendChild(original);
    }

    installTopicNavigator();
    installVideos();
    installScaffold(guide.scaffold);
    installScaffold(guide.scaffold2);
    relocateGather();
    setTimeout(relocateGather,0);
  }

  if(window.BECURRENT_IRAN_VIDEOS){start();return;}
  const script=document.createElement('script');
  script.src='../assets/data/iran-videos.js?v=20260914';
  script.onload=start;
  script.onerror=()=>console.warn('BeCurrent: Iran video metadata could not be loaded; core lesson remains available.');
  document.head.appendChild(script);
})();