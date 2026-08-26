(()=>{
  'use strict';

  function install(){
    const pickHead=document.querySelector('.pick-card .desk-card-head');
    if(pickHead&&!pickHead.querySelector('.desk-pick-launch')){
      const bridge=document.createElement('div');
      bridge.className='desk-pick-launch';
      const label=document.createElement('span');
      label.textContent='Need a story before you can file?';
      const link=document.createElement('a');
      link.href='#sources';
      link.textContent='Browse the Source Shelf ↓';
      bridge.append(label,link);
      pickHead.appendChild(bridge);
    }

    const sourceCopy=document.querySelector('#sources .desk-section-head > div:nth-child(2)');
    if(sourceCopy&&!sourceCopy.querySelector('.desk-return-link')){
      const back=document.createElement('a');
      back.className='desk-return-link';
      back.href='#story-world';
      back.textContent='← Back to Your Pick';
      sourceCopy.appendChild(back);
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
