(()=>{
  'use strict';
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
