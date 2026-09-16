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
    details.ir-section-background{margin:18px 0 24px}
    details.ir-section-background .ir-reading{padding:28px 32px}
    details.ir-section-background .ir-reading h3{font-size:30px}
    details.ir-section-background .ir-reading p{max-width:900px}
    details.ir-intro-background{margin:18px 0 8px}
    details.ir-intro-background .ir-reading{padding:30px 34px}
    details.ir-intro-background .ir-reading h3{font-size:32px}
    details.ir-intro-background .ir-reading p{max-width:920px}
    .ir-missile-visual{margin:16px 0 20px;padding:20px 22px;background:#f7f3ec;color:#17191a;border-left:5px solid #b03a2e}
    .ir-missile-visual h3{margin:4px 0 7px;color:#17191a;font-family:'Playfair Display',Georgia,serif;font-size:1.65rem}
    .ir-missile-visual>p{max-width:72ch;margin:0;color:#3c444c;line-height:1.55}
    .ir-missile-visual figure{max-width:770px;margin:18px auto 0}
    .ir-missile-visual img{display:block;width:100%;height:auto;background:#232f3a}
    .ir-missile-visual figcaption{margin-top:8px;color:#5a5f5c;font-family:'IBM Plex Mono',monospace;font-size:.68rem;line-height:1.45}
    @media(max-width:900px){.ir-topic-nav-inner{padding:9px 12px}.ir-watch-grid{grid-template-columns:1fr}.ir-watch{min-height:0}.ir-video-forward-head{padding:18px}.ir-video-audit{padding:0 18px 16px}.ir-missile-visual{padding:16px}details.ir-section-background .ir-reading,details.ir-intro-background .ir-reading{padding:22px}}
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
      if(topic==='topic-03'||document.querySelector('.ir-video-forward'))return;
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
      details.innerHTML='<summary>Read the full background</summary>';
      original.parentNode.insertBefore(details,original);
      details.appendChild(original);
    }

    function addBackground(section,title,paragraphs){
      if(!section||section.querySelector(':scope > .ir-section-background'))return;
      const head=section.querySelector(':scope > .ir-head');
      if(!head)return;
      const details=document.createElement('details');
      details.className='ir-full-background ir-section-background';
      details.innerHTML='<summary>Read the background</summary><div class="ir-reading"><h3>'+esc(title)+'</h3>'+paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div>';
      head.insertAdjacentElement('afterend',details);
    }

    function addIntroBackground(){
      if(topic!=='topic-04'||document.querySelector('.ir-intro-background'))return;
      const hero=document.querySelector('.ir-hero');
      if(!hero)return;
      const details=document.createElement('details');
      details.className='ir-full-background ir-intro-background';
      details.innerHTML='<summary>Read the background</summary><div class="ir-reading"><h3>Why Iran fights beyond its borders</h3><p>Today’s lesson starts with a puzzle: why would a country build missiles and relationships with armed groups far from home? Part of the answer comes from what Iran experienced after the 1979 revolution, especially the eight-year war that began when Iraq invaded in 1980.</p><p>Iranian leaders came out of that war focused on vulnerability. They had seen cities hit by missiles, chemical weapons used in the conflict, and outside powers shape the region around them. Over time, Iran built a strategy designed to make attacks more costly, push pressure farther from its borders, and avoid fighting stronger rivals only on those rivals’ terms. As you move through this topic, keep asking whether that strategy is best understood as deterrence, power projection, or both.</p></div>';
      hero.insertAdjacentElement('afterend',details);
    }

    function installTopic4Backgrounds(){
      if(topic!=='topic-04')return;
      addIntroBackground();
      addBackground(document.getElementById('strategy-terms'),'Why these three strategy terms matter',[
        'Countries build military strategies around their strengths, weaknesses, geography, and the threats they expect to face. Iran has often faced rivals with stronger air forces and more advanced conventional weapons, so Iranian planners developed ways to raise the cost of an attack without trying to match those rivals weapon for weapon.',
        'Deterrence means trying to prevent an attack by making the cost look too high. Asymmetric strategy means competing in different ways instead of fighting only where an opponent is strongest. Power projection means using force or influence beyond your own borders. One action can fit more than one of these ideas at the same time.'
      ]);
      addBackground(document.getElementById('invasion'),'Why the 1980 invasion mattered',[
        'Iraq invaded Iran in September 1980, less than two years after Iran’s revolution. Iran survived the opening attack, but the war lasted eight years. Iranian cities came under missile attack, Iraqi forces used chemical weapons, and the conflict caused enormous human and economic damage.',
        'A government that survives that kind of war may decide it needs ways to stop danger before it reaches its own cities. That helps explain why later Iranian leaders placed so much value on missiles, strategic depth, and other forms of deterrence. The war was important, but it was not the only cause of Iran’s later strategy.'
      ]);
      addBackground(document.getElementById('evidence'),'How the evidence fits together',[
        'The three evidence cards do different jobs. Missile development shows how Iran responded to a wartime weakness. Chemical-weapons use shows how serious the threat inside Iran became. Hezbollah shows the limit of a one-cause explanation because events in Lebanon, revolutionary ideology, and regional competition also shaped Iran’s choices.',
        'Your job is not to prove that the Iran-Iraq War caused everything that came later. Build a chain from wartime experience to perceived vulnerability to a later strategic response, then identify what that chain cannot explain by itself.'
      ]);
      addBackground(document.getElementById('network'),'Why build influence beyond Iran?',[
        'Over time, Iran developed relationships with armed groups and political actors across the Middle East. The Quds Force became the main IRGC organization for many of these outside relationships. Support can include weapons, training, money, advice, or political backing, but the amount of Iranian control is not the same in every case.',
        'These partnerships can push pressure farther from Iran’s borders and make retaliation against Iran more complicated. That can serve deterrence, but it can also expand Iranian influence inside other countries. This is why the same network can be described as defensive by Iran and threatening by its rivals.'
      ]);
      const perspective=document.querySelector('.ir-faultline')?.closest('.ir-section');
      addBackground(perspective,'Why both sides can feel less safe',[
        'A security dilemma happens when one country tries to make itself safer but causes another country to feel more threatened. The second country responds, and both sides may end up less secure even if neither side originally wanted a larger conflict.',
        'Iran can view missiles and regional partners as ways to discourage attacks on Iran. Israel, the United States, and Gulf states can view those same tools as threats operating closer to them. To understand the strategy, separate Iran’s possible purpose from the effects other countries experience.'
      ]);
      addBackground(document.getElementById('claim'),'How to build today’s claim',[
        'Do not choose one label and stop. First, weigh the evidence for deterrence. Then weigh the evidence for power projection. A strong answer can conclude that both are present if the evidence supports that position.',
        'Next, explain how much of the strategy can be traced to the Iran-Iraq War. Include at least one cause beyond the war, such as revolutionary ideology, Lebanon, later U.S. military deployments, or regional competition. Your claim should show both what the war helps explain and what it does not.'
      ]);
    }

    function installMissileGraphic(){
      if(topic!=='topic-04'||document.querySelector('.ir-missile-visual'))return;
      const scaffold=document.querySelector('#irgc .ir-scaffold');
      const details=document.querySelector('#irgc details.ir-full-background');
      if(!scaffold&&!details)return;
      const visual=document.createElement('section');
      visual.className='ir-missile-visual';
      visual.setAttribute('aria-labelledby','missile-visual-title');
      visual.innerHTML='<div class="ir-kicker red">Visual guide</div><h3 id="missile-visual-title">How ballistic missiles work</h3><p>Notice the three flight phases and how range changes the distance a missile can reach.</p><figure><img src="../assets/images/iran/ballistic-missile-phases-aljazeera-2024.webp?v=20260916" width="770" height="962" loading="lazy" alt="Al Jazeera infographic showing boost, midcourse, and terminal phases of a ballistic missile, with range categories from battlefield range to intercontinental range."><figcaption>Graphic: Al Jazeera Labs, Oct. 2, 2024. Source shown in graphic: Space.com.</figcaption></figure>';
      if(scaffold)scaffold.insertAdjacentElement('afterend',visual);
      else details.insertAdjacentElement('beforebegin',visual);
    }

    installTopicNavigator();
    installVideos();
    installScaffold(guide.scaffold);
    installScaffold(guide.scaffold2);
    installTopic4Backgrounds();
    installMissileGraphic();
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
