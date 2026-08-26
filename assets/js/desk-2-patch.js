(()=>{
  'use strict';
  const pick=document.querySelector('.pick-card');
  if(!pick||pick.querySelector('.desk-source-jump'))return;
  const meta=pick.querySelector('.pick-meta');
  if(!meta)return;
  const jump=document.createElement('div');
  jump.className='desk-source-jump';
  jump.innerHTML='<strong>Need a story before you can file?</strong><a href="#sources">Browse the Source Shelf ↓</a>';
  meta.parentNode.insertBefore(jump,meta);
})();
