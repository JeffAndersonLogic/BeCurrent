(()=>{
  'use strict';

  /* The generated Desk already loads this tiny compatibility bootstrap on every
     visit. Keep the hidden confidence contract intact, and use the same stable
     hook to layer in presentation-only Desk polish without hand-editing the
     generated daily/index.html. */
  if(!document.querySelector('link[data-desk-polish]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='../assets/css/desk-2-polish.css';
    style.dataset.deskPolish='true';
    document.head.appendChild(style);
  }
  if(!document.querySelector('script[data-desk-ui-polish]')){
    const script=document.createElement('script');
    script.src='../assets/js/desk-ui-polish.js';
    script.defer=true;
    script.dataset.deskUiPolish='true';
    document.head.appendChild(script);
  }

  const words={1:'Lost',2:'Shaky',3:'Getting it',4:'Solid',5:'Could teach it'};
  document.querySelectorAll('.confidence[id]').forEach(row=>{
    if(row.querySelector('button[data-conf]'))return;
    for(let n=1;n<=5;n++){
      const button=document.createElement('button');
      button.type='button';
      button.dataset.conf=String(n);
      button.setAttribute('aria-pressed','false');
      button.setAttribute('aria-label',`Confidence ${n} of 5, ${words[n]}`);
      const num=document.createElement('span');
      num.className='conf-num';
      num.textContent=String(n);
      const word=document.createElement('span');
      word.className='conf-word';
      word.textContent=words[n];
      button.append(num,word);
      row.appendChild(button);
    }
  });
})();
