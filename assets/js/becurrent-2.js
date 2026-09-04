(()=>{
  const body=document.body;
  const modeButtons=[...document.querySelectorAll('[data-mode]')];
  const savedMode=localStorage.getItem('bcv2-mode')||'student';
  function setMode(mode){
    body.classList.toggle('teacher-on',mode==='teacher');
    modeButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    localStorage.setItem('bcv2-mode',mode);
  }
  modeButtons.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  setMode(savedMode);

  document.querySelectorAll('[data-save]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const key=btn.dataset.save;
      const group=document.querySelector(`[data-group="${key}"]`);
      if(!group)return;
      let value;
      if(group.matches('textarea,input'))value=group.value;
      else value=[...group.querySelectorAll('input:checked')].map(i=>i.value);
      localStorage.setItem('bcv2-'+key,JSON.stringify(value));
      const status=document.querySelector(`[data-status="${key}"]`);
      if(status){status.textContent='Saved on this Chromebook';setTimeout(()=>status.textContent='',2500);}
      updateProgress();
    });
  });

  document.querySelectorAll('[data-group]').forEach(group=>{
    const key=group.dataset.group;
    const raw=localStorage.getItem('bcv2-'+key);
    if(!raw)return;
    try{
      const value=JSON.parse(raw);
      if(group.matches('textarea,input'))group.value=value||'';
      else if(Array.isArray(value))group.querySelectorAll('input').forEach(i=>i.checked=value.includes(i.value));
    }catch{}
  });

  function updateProgress(){
    const config=window.BECURRENT_IRAN_PROGRESS||{total:0,prefix:'bcv2-iran-topic-'};
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      if(key&&key.startsWith(config.prefix))keys.push(key);
    }
    const done=keys.filter(key=>{
      const v=localStorage.getItem(key);
      return v&&v!=='""'&&v!=='[]';
    }).length;
    document.querySelectorAll('[data-progress]').forEach(el=>el.textContent=`${done} of ${config.total} saved`);
  }
  updateProgress();

  document.querySelectorAll('[data-clear-work]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!confirm('Clear your BeCurrent work on this Chromebook?'))return;
    const prefix=(window.BECURRENT_IRAN_PROGRESS||{}).prefix||'bcv2-iran-topic-';
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);if(key&&key.startsWith(prefix))keys.push(key);
    }
    keys.forEach(key=>localStorage.removeItem(key));
    location.reload();
  }));

  const previousBriefsTool=document.querySelector('.quick-tools .quick-tool[href="iran/index.html#my-work"]');
  if(previousBriefsTool){
    previousBriefsTool.href='briefs/index.html';
    const strong=previousBriefsTool.querySelector('strong');
    const span=previousBriefsTool.querySelector('span');
    if(strong)strong.textContent='Previous Briefs';
    if(span)span.textContent='Return to completed Briefs, readings and study guides.';
  }
  const archiveRow=document.querySelector('.archive-section .archive-row');
  if(archiveRow&&!document.querySelector('.archive-section [data-previous-briefs-link]')){
    const link=document.createElement('a');
    link.href='briefs/index.html';
    link.className='text-link';
    link.dataset.previousBriefsLink='true';
    link.textContent='Browse all previous Briefs and study guides →';
    link.style.display='inline-block';
    link.style.marginTop='18px';
    archiveRow.insertAdjacentElement('afterend',link);
  }

  // Ukraine is a current investigation but does not replace Iran as the homepage lead.
  // Give it a clear doorway in Explore and a full investigation card beside the other units.
  const warCard=document.querySelector('.publication-home .issue-card.issue-war');
  if(warCard){
    warCard.href='ukraine/index.html';
    warCard.style.setProperty('--card-image',"url('https://commons.wikimedia.org/wiki/Special:Redirect/file/Kyiv%20after%20Russian%20shelling%2C%202022-10-10%20%28499%29.jpg')");
    const kicker=warCard.querySelector('.home-kicker');
    const title=warCard.querySelector('h3');
    const copy=warCard.querySelector('p');
    const arrow=warCard.querySelector('.issue-arrow');
    if(kicker)kicker.textContent='War & power';
    if(title)title.textContent='The War in Ukraine';
    if(copy)copy.textContent='Why did Russia go to war with Ukraine — and why has the war been so difficult to end?';
    if(arrow)arrow.textContent='Open investigation →';
  }

  const investigations=document.querySelector('.publication-home .visual-investigations');
  if(investigations&&!investigations.querySelector('[data-ukraine-investigation]')){
    const iran=investigations.querySelector('a[href="iran/index.html"]');
    const ukraine=document.createElement('a');
    ukraine.className='invest-card photo-invest';
    ukraine.href='ukraine/index.html';
    ukraine.dataset.ukraineInvestigation='true';
    ukraine.style.setProperty('--invest-image',"url('https://commons.wikimedia.org/wiki/Special:Redirect/file/Kyiv%20after%20Russian%20shelling%2C%202022-10-10%20%28499%29.jpg')");
    ukraine.innerHTML='<div class="invest-overlay"><div class="home-kicker">Conflict & Resistance · Reverse History</div><h3>The War in Ukraine</h3><p>Start with the war as it exists now, then trace backward through 2022, 2014, Ukraine’s post-Soviet choices and the deeper historical memory behind the conflict.</p><span class="text-link">Open investigation →</span></div>';
    if(iran)iran.insertAdjacentElement('afterend',ukraine);else investigations.prepend(ukraine);
    investigations.classList.add('uk-four');
    if(!document.getElementById('ukraine-home-grid')){
      const style=document.createElement('style');
      style.id='ukraine-home-grid';
      style.textContent='.visual-investigations.uk-four{grid-template-columns:repeat(2,minmax(0,1fr))}.visual-investigations.uk-four .photo-invest.featured{grid-column:auto}@media(max-width:700px){.visual-investigations.uk-four{grid-template-columns:1fr}}';
      document.head.appendChild(style);
    }
  }
})();
