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
    .ir-chapter-videos{margin:18px 0 22px;border:1px solid rgba(237,232,220,.16);background:#171b1f;box-shadow:0 12px 28px rgba(0,0,0,.14)}
    .ir-chapter-videos-head{padding:16px 20px;border-bottom:1px solid rgba(237,232,220,.12)}
    .ir-chapter-videos-head h3{margin:.2rem 0 0;font-family:'Playfair Display',Georgia,serif;font-size:1.45rem;color:#fff}
    .ir-chapter-videos .ir-watch-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ir-chapter-videos.single .ir-watch-grid{grid-template-columns:minmax(0,1fr)}
    .ir-chapter-videos .ir-video-audit{padding:10px 20px 14px}
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
    .ir-network-visual{margin:18px 0 24px;padding:18px;background:#f7f3ec;border-left:5px solid #b03a2e;overflow:hidden}
    .ir-network-visual figure{max-width:980px;margin:0 auto}
    .ir-network-visual img{display:block;width:100%;height:auto;background:#fff}
    @media(max-width:900px){.ir-topic-nav-inner{padding:9px 12px}.ir-watch-grid,.ir-chapter-videos .ir-watch-grid{grid-template-columns:1fr}.ir-watch{min-height:0}.ir-video-forward-head{padding:18px}.ir-video-audit{padding:0 18px 16px}.ir-missile-visual{padding:16px}.ir-network-visual{padding:10px}details.ir-section-background .ir-reading,details.ir-intro-background .ir-reading{padding:22px}}
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
      if(topic==='topic-03'||topic==='topic-05'||topic==='topic-06'||topic==='topic-07'||document.querySelector('.ir-video-forward'))return;
      const section=document.createElement('section');
      section.className='ir-video-forward';
      section.id='video-forward';
      section.setAttribute('aria-labelledby','watch-title');
      section.innerHTML=`<div class="ir-video-forward-head"><div class="ir-kicker red">Video-forward pathway</div><h2 id="watch-title">${esc(guide.heading)}</h2><p>${esc(guide.intro)}</p></div><div class="ir-watch-grid">${guide.videos.map(card).join('')}</div><div class="ir-video-audit">Video links audited ${esc(window.BECURRENT_IRAN_VIDEOS.reviewed)}. Required does not mean every clip must be shown whole; follow any excerpt directions shown on the card.</div>`;
      const objectives=document.getElementById('objectives');
      const hero=document.querySelector('.ir-hero');
      (objectives||hero)?.insertAdjacentElement('afterend',section);
    }

    function installTopic5Videos(){
      if(topic!=='topic-05')return;
      const placements=[
        {id:'surprise',title:'Watch how the nuclear story began',anchor:'.ir-timeline'},
        {id:'bargain',title:'Watch the 2015 bargain take shape',anchor:'.ir-faultline'},
        {id:'breakdown',title:'Watch the agreement break down',anchor:'.ir-faultline'},
        {id:'today',title:'Watch the dispute move from diplomacy to force',anchor:'.ir-timeline'}
      ];
      placements.forEach(place=>{
        const section=document.getElementById(place.id);
        if(!section||section.querySelector(':scope > .ir-chapter-videos'))return;
        const videos=(guide.videos||[]).filter(v=>v.chapter===place.id);
        if(!videos.length)return;
        const block=document.createElement('div');
        block.className='ir-chapter-videos'+(videos.length===1?' single':'');
        block.innerHTML='<div class="ir-chapter-videos-head"><div class="ir-kicker red">Video in context</div><h3>'+esc(place.title)+'</h3></div><div class="ir-watch-grid">'+videos.map(card).join('')+'</div><div class="ir-video-audit">These clips are part of this chapter, not a separate pathway. Video links audited '+esc(window.BECURRENT_IRAN_VIDEOS.reviewed)+'.</div>';
        const anchor=section.querySelector(place.anchor)||section.querySelector(':scope > .ir-head');
        if(anchor)anchor.insertAdjacentElement('afterend',block);
      });
    }

    function installTopic6Videos(){
      if(topic!=='topic-06')return;
      const placements=[
        {id:'shadow',title:'Watch the shadow war before direct exchange',anchor:'.ir-grid-3'},
        {id:'direct',title:'Watch the regional pressure turn into direct attack',anchor:'.ir-timeline'},
        {id:'war',title:'Watch direct war widen and reach the present',anchor:'.ir-grid-3'}
      ];
      placements.forEach(place=>{
        const section=document.getElementById(place.id);
        if(!section||section.querySelector(':scope > .ir-chapter-videos'))return;
        const videos=(guide.videos||[]).filter(v=>v.chapter===place.id);
        if(!videos.length)return;
        const block=document.createElement('div');
        block.className='ir-chapter-videos'+(videos.length===1?' single':'');
        block.innerHTML='<div class="ir-chapter-videos-head"><div class="ir-kicker red">Video in context</div><h3>'+esc(place.title)+'</h3></div><div class="ir-watch-grid">'+videos.map(card).join('')+'</div><div class="ir-video-audit">These clips are part of this step, not a separate pathway. Video links audited '+esc(window.BECURRENT_IRAN_VIDEOS.reviewed)+'.</div>';
        const anchor=section.querySelector(place.anchor)||section.querySelector(':scope > .ir-head');
        if(anchor)anchor.insertAdjacentElement('afterend',block);
      });
    }

    function installTopic7Videos(){
      if(topic!=='topic-07')return;
      const opening=(guide.videos||[]).filter(v=>v.chapter==='opening');
      if(opening.length&&!document.getElementById('opening-video')){
        const section=document.createElement('section');
        section.className='ir-section';
        section.id='opening-video';
        section.innerHTML='<div class="ir-chapter-videos'+(opening.length===1?' single':'')+'"><div class="ir-chapter-videos-head"><div class="ir-kicker red">Start here</div><h3>Watch this before Step 1</h3></div><div class="ir-watch-grid">'+opening.map(card).join('')+'</div><div class="ir-video-audit">An overview to start the lesson. The steps below carry the evidence. Video links audited '+esc(window.BECURRENT_IRAN_VIDEOS.reviewed)+'.</div></div>';
        const anchor=document.getElementById('objectives')||document.querySelector('.ir-hero');
        if(anchor)anchor.insertAdjacentElement('afterend',section);
      }
      const placements=[
        {id:'map',title:'Watch why a narrow route creates power',anchor:'.ir-map'},
        {id:'today',title:'Watch why reopening the strait is so hard',anchor:'.ir-grid-2'}
      ];
      placements.forEach(place=>{
        const section=document.getElementById(place.id);
        if(!section||section.querySelector(':scope > .ir-chapter-videos'))return;
        const videos=(guide.videos||[]).filter(v=>v.chapter===place.id);
        if(!videos.length)return;
        const block=document.createElement('div');
        block.className='ir-chapter-videos'+(videos.length===1?' single':'');
        block.innerHTML='<div class="ir-chapter-videos-head"><div class="ir-kicker red">Video in context</div><h3>'+esc(place.title)+'</h3></div><div class="ir-watch-grid">'+videos.map(card).join('')+'</div><div class="ir-video-audit">These clips are part of this step, not a separate pathway. Video links audited '+esc(window.BECURRENT_IRAN_VIDEOS.reviewed)+'.</div>';
        const anchor=section.querySelector(place.anchor)||section.querySelector(':scope > .ir-head');
        if(anchor)anchor.insertAdjacentElement('afterend',block);
      });
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

    function installTopic5Backgrounds(){
      if(topic!=='topic-05')return;
      const hero=document.querySelector('.ir-hero');
      if(hero&&!document.querySelector('.ir-intro-background')){
        const intro=document.createElement('details');
        intro.className='ir-full-background ir-intro-background';
        intro.innerHTML='<summary>Read the background</summary><div class="ir-reading"><h3>Why the nuclear issue became so important</h3><p>Iran’s nuclear program began when Iran and the United States were partners, but the 1979 revolution turned the two governments into adversaries. The technology did not disappear when the political relationship changed. Over time, the same enrichment technology that can support civilian nuclear energy also raised concern because much higher enrichment can support a weapons program.</p><p>That is the problem behind Topic 5: how do countries reduce the risk of a nuclear weapon when they do not trust one another? The 2015 agreement tried to answer that question with measurable limits, international inspections, and sanctions relief. The later breakdown helps explain why the nuclear dispute moved back toward pressure and eventually military force.</p></div>';
        hero.insertAdjacentElement('afterend',intro);
      }
      addBackground(document.getElementById('surprise'),'Why the United States helped Iran start a nuclear program',[
        'During the Cold War, Shah Mohammad Reza Pahlavi was a close U.S. partner. American policy promoted peaceful nuclear technology to allied countries, and Iran wanted nuclear energy as part of a broader modernization program.',
        'That origin matters because the program did not begin as a secret anti-American weapons project. The political meaning of the program changed later as Iran’s government, regional relationships, and security concerns changed.'
      ]);
      addBackground(document.getElementById('break'),'Why 1979 changed the nuclear story',[
        'The Iranian Revolution overthrew the Shah and replaced a U.S.-aligned monarchy with an Islamic Republic that openly rejected American influence. Cooperation between Washington and Tehran collapsed, but Iran retained scientists, technical knowledge, and nuclear infrastructure.',
        'From that point forward, U.S. officials no longer viewed Iranian nuclear development through the lens of an allied modernization program. The same technology now existed inside a hostile political relationship shaped by the hostage crisis, war, sanctions, and deep mistrust.'
      ]);
      addBackground(document.getElementById('fear'),'Why uranium enrichment created international concern',[
        'A civilian nuclear program can enrich uranium to low levels for reactor fuel. The concern is that the same basic enrichment process can be continued to much higher levels. That means the number and efficiency of centrifuges, the size of an enriched-uranium stockpile, and the level of enrichment all affect how quickly a country could move toward weapons-grade material.',
        'Iran said its program was peaceful. Other governments focused on whether inspections and limits were strong enough to verify that claim and keep the time needed to produce enough weapons-grade material from becoming dangerously short.'
      ]);
      addBackground(document.getElementById('bargain'),'How the 2015 nuclear bargain worked',[
        'The Joint Comprehensive Plan of Action, or JCPOA, was negotiated by Iran, the United States, Britain, France, Germany, Russia, China, and the European Union. Iran accepted limits on enrichment, centrifuges, its enriched-uranium stockpile, and other nuclear activities. The International Atomic Energy Agency received expanded monitoring responsibilities.',
        'In return, nuclear-related sanctions were lifted or suspended as Iran met its commitments. The agreement was intentionally narrow. It addressed the nuclear program, not Iran’s missile program, armed partners, human-rights disputes, or the wider U.S.-Iran rivalry. Supporters saw that focus as practical. Critics saw it as a major weakness.'
      ]);
      addBackground(document.getElementById('breakdown'),'Why the United States left the agreement in 2018',[
        'President Donald Trump argued that the JCPOA was too limited and that some restrictions would expire over time. His administration also objected that the agreement did not address Iran’s ballistic missiles or regional armed partners. The United States withdrew in May 2018 and restored sanctions.',
        'Supporters of staying in the deal argued that verified nuclear limits were valuable even if the agreement did not solve every dispute with Iran. After the U.S. withdrawal and the return of sanctions, Iran later moved beyond several JCPOA limits. The key causal question is whether withdrawal reduced nuclear risk or helped create a more dangerous cycle of pressure and response.'
      ]);
      addBackground(document.getElementById('today'),'How the dispute moved from diplomacy to force',[
        'By 2025, the nuclear dispute was no longer being managed mainly through the 2015 framework. Israel attacked Iranian nuclear and military targets, and the United States later struck the Fordow, Natanz, and Isfahan nuclear sites. Military action could damage facilities, but it could not by itself recreate the inspection and verification system that had existed under the JCPOA.',
        'That difference matters for today’s question. A negotiated agreement tries to manage risk through rules, monitoring, and incentives. A military strike tries to reduce capability through force. Both approaches have limits, and neither automatically resolves the larger conflict between Iran, Israel, and the United States.'
      ]);
      addBackground(document.getElementById('claim'),'How to judge whether the breakdown mattered',[
        'Do not treat the 2018 withdrawal as the only possible cause of later war. Instead, ask whether it changed the path: Did nuclear limits weaken? Did mistrust increase? Did sanctions, enrichment, threats, and military pressure become more important after the agreement stopped functioning?',
        'Then compare that factor with other causes already covered in the unit, including missiles, regional armed groups, Iran-Israel hostility, and direct attacks. A strong claim explains whether the collapse of the bargain substantially increased the risk of war without pretending that war became inevitable.'
      ]);
    }

    function installTopic6Backgrounds(){
      if(topic!=='topic-06')return;
      addBackground(document.getElementById('shadow'),'What was the Iran-Israel shadow war?',[
        'Iran and Israel were already in conflict long before they began openly firing large numbers of missiles at one another. Israel carried out strikes on Iranian-linked forces and weapons transfers in Syria, while Iran supported armed groups such as Hezbollah and developed missile, drone, and cyber capabilities. Both sides were trying to weaken or deter the other without creating a sustained direct war between the two states.',
        'This is why the phrase shadow war matters. The conflict was real, but much of it stayed indirect, covert, or outside the two countries themselves. Keeping the fighting below the level of open state-to-state war gave leaders room to act while limiting the risk of a much larger regional conflict.'
      ]);
      addBackground(document.getElementById('direct'),'Why October 7 changed the regional environment',[
        'On October 7, 2023, Hamas-led militants attacked Israel from Gaza, killing about 1,200 people and taking roughly 250 hostages, according to Israeli authorities. Israel then launched a major war in Gaza. Fighting also intensified between Israel and Hezbollah in Lebanon, while the Houthis in Yemen and other Iran-aligned groups carried out attacks elsewhere in the region.',
        'Iran did not directly control every decision made by these groups, but the wider fighting increased pressure between Iran and Israel. The key question for Topic 6 is not whether October 7 automatically caused later Iran-Israel war. It is how the regional conflict created more opportunities for retaliation, miscalculation, and direct confrontation.'
      ]);
      addBackground(document.getElementById('war'),'How direct exchanges became sustained war',[
        'In April 2024, Iran launched its first direct military attack on Israel from Iranian territory after a strike on an Iranian diplomatic compound in Damascus killed senior Revolutionary Guard officers. Israel responded in a limited way. In October, Iran launched another large direct missile attack and Israel answered with strikes on military targets inside Iran. A line that had once been unusual had now been crossed more than once.',
        'In June 2025, the pattern changed again. Israel launched a sustained campaign against Iranian nuclear and military targets, Iran repeatedly retaliated, and the United States later struck the Fordow, Natanz, and Isfahan nuclear sites. On February 28, 2026, the United States and Israel launched a new joint attack on Iran, and Iran retaliated across the region. The important historical question is how each earlier exchange changed what leaders considered possible in the next one.'
      ]);
      const perspective=document.querySelector('.ir-faultline')?.closest('.ir-section');
      addBackground(perspective,'How deterrence can restrain conflict or push it upward',[
        'Deterrence means trying to prevent an opponent from acting by convincing that opponent the cost will be too high. A limited strike can sometimes restore a boundary because both sides demonstrate capability and then stop. That is one way to read the April 2024 exchange.',
        'The danger is that each successful round can also create a precedent. If leaders conclude that they can survive direct attacks and retaliation without losing control, the next direct attack may become easier to authorize. That is the escalation-ladder problem: an action intended to deter the next strike can also help normalize it.'
      ]);
      addBackground(document.getElementById('claim'),'How to identify a turning point',[
        'Do not automatically choose the largest attack. A turning point matters because it changes the path that follows. Ask what became newly possible after the event, what expectations changed, and whether later leaders were making decisions in a different environment because that event had already happened.',
        'Your answer can begin in 2018, 2023, 2024, 2025, or 2026. The strongest claim will connect the chosen turning point to at least two later events and explain why another plausible turning point is less important. Avoid saying that war became inevitable. Leaders still had choices at every stage.'
      ]);
    }

    function installTopic7Backgrounds(){
      if(topic!=='topic-07')return;
      addBackground(document.getElementById('map'),'Why a narrow strait gives Iran leverage',[
        'The Strait of Hormuz is about 21 miles wide at its narrowest point, and the shipping lanes that large tankers use are only about two miles wide in each direction. Every tanker leaving the Persian Gulf by sea has to pass through it. Before the 2026 war, about one-fifth of the oil the world uses each day moved through this one passage, along with a large share of the world’s liquefied natural gas from Qatar.',
        'A narrow route is easier to threaten than an open ocean. Iran does not need a navy as large as the U.S. Navy to make shipping dangerous. Mines, fast attack boats, drones and missiles fired from the coast can convince ship owners and insurance companies that the trip is too risky. When that happens, ships stop coming even if the strait is not physically blocked. That is the chokepoint mechanism: a risk in one narrow place creates effects everywhere the oil was supposed to go.',
        'Saudi Arabia and the United Arab Emirates have pipelines that carry some oil to ports outside the strait. Those pipelines help, but they cannot carry anything close to everything that normally passes through Hormuz, and Kuwait and Qatar have no other sea route at all.'
      ]);
      addBackground(document.getElementById('tankers'),'What happened in the Tanker War',[
        'Iraq invaded Iran in 1980, as you saw in Topic 4. By 1984 the fighting on land had become a bloody stalemate, so both sides went after the other’s oil money. Iraq attacked tankers loading oil at Iranian terminals such as Kharg Island. Iran struck back at ships trading with Kuwait and Saudi Arabia, which were lending money to Iraq. Over the next four years, hundreds of commercial ships were attacked in the Gulf.',
        'In 1987 Kuwait asked outside powers to protect its tankers. The United States agreed to register Kuwaiti tankers as American ships and escort them with Navy warships, an operation called Earnest Will. It became the largest U.S. naval convoy operation since World War II. The danger came from both sides: in May 1987 an Iraqi missile hit the USS Stark, killing 37 American sailors, and on one of the first escorted convoys the tanker Bridgeton struck a mine.',
        'In April 1988 the U.S. warship Samuel B. Roberts hit an Iranian mine. Days later the U.S. Navy struck Iranian oil platforms and warships in Operation Praying Mantis. In July 1988 the USS Vincennes shot down Iran Air Flight 655, a civilian airliner, killing all 290 people on board; the United States said the crew mistook it for a military jet. Iranians still remember that event. A ceasefire ended the war in August 1988.',
        'The pattern to notice: a war between two neighbors pulled in outside navies because much of the world’s oil was passing through the same water.'
      ]);
      const perspective=document.querySelector('textarea[data-group="perspective"]')?.closest('.ir-section');
      addBackground(perspective,'Who depends on Hormuz?',[
        'Most of the oil that moves through Hormuz goes east, not west. In recent years the large majority of crude oil passing through the strait was headed to buyers in Asia, especially China, India, Japan and South Korea. A long closure hits those economies first.',
        'The exporters behind the strait depend on it too. For Kuwait and Qatar it is the only sea route out, and most of Iran’s own oil exports also pass through it, so a long closure costs Iran money as well. That is part of why Iran’s leverage works best as a threat or a partial disruption rather than a permanent shutdown.',
        'The United States buys relatively little oil from the Gulf today, but Americans still pay higher prices when world supply drops, and Washington has long treated freedom of navigation as a core security interest. When you answer, think about who loses the most money, security or bargaining power the longer the strait stays closed.'
      ]);
      addBackground(document.getElementById('claim'),'How to rank the three kinds of leverage',[
        'Military leverage means Iran can raise the cost of attacking it and keep stronger navies tied down. Economic leverage means disrupting shipping can raise prices and hurt countries far away, which puts pressure on their governments. Diplomatic leverage means Iran can offer to reopen or protect shipping in exchange for something, such as a ceasefire, sanctions relief or a say in how the strait is managed, like the shipping corridor Iran and Oman proposed in August 2026.',
        'The three are connected, so your job is to decide which one does the most work. Ask what Iran actually gets from Hormuz, and which kind of pressure makes the others possible. Use evidence from the map, the Tanker War and the EIA numbers, then explain how a second kind of leverage strengthens your main one.'
      ]);
    }

    function installNetworkGraphic(){
      if(topic!=='topic-04'||document.querySelector('.ir-network-visual'))return;
      const section=document.getElementById('network');
      const head=section&&section.querySelector(':scope > .ir-head');
      if(!head)return;
      const visual=document.createElement('div');
      visual.className='ir-network-visual';
      visual.innerHTML='<figure><img src="../assets/images/iran/ac-17_04-iran-proxies-v2-map_4d0b79.webp?v=20260916" width="1500" height="1949" loading="lazy" alt="Infographic mapping Iran-aligned armed groups across the Middle East, including Hezbollah in Lebanon, Hamas in Gaza, militias in Syria and Iraq, and the Houthis in Yemen."></figure>';
      const img=visual.querySelector('img');
      img.addEventListener('error',()=>visual.remove(),{once:true});
      head.insertAdjacentElement('afterend',visual);
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
    installTopic5Videos();
    installTopic6Videos();
    installTopic7Videos();
    installScaffold(guide.scaffold);
    installScaffold(guide.scaffold2);
    installTopic4Backgrounds();
    installTopic5Backgrounds();
    installTopic6Backgrounds();
    installTopic7Backgrounds();
    installNetworkGraphic();
    installMissileGraphic();
    relocateGather();
    setTimeout(relocateGather,0);
  }

  if(window.BECURRENT_IRAN_VIDEOS){start();return;}
  const script=document.createElement('script');
  script.src='../assets/data/iran-videos.js?v=20260924a';
  script.onload=start;
  script.onerror=()=>console.warn('BeCurrent: Iran video metadata could not be loaded; core lesson remains available.');
  document.head.appendChild(script);
})();
