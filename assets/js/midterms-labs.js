// Local practice only. Required answers still use the established Canvas capture.
(function(){
 'use strict';
 const lab=document.querySelector('[data-bill-lab]');if(!lab)return;
 const field=id=>document.getElementById('lab-'+id);
 function update(){
  const h=field('house').value,s=field('senate').value,p=field('president').value,o=field('override').value;
  let text;
  if(h!=='yes')text='No new law: the House has not passed the proposal.';
  else if(s==='different')text='Not yet a law: the chambers passed different text. They must agree on the same bill.';
  else if(s!=='yes')text='Not yet a law: House approval alone is not enough. The Senate still needs to agree.';
  else if(p==='sign')text='Law enacted in this model: both chambers passed the same bill and the president signed it.';
  else if(o==='both')text='Veto overridden: two-thirds support in each chamber makes the bill law despite the veto.';
  else if(o==='one')text='Veto stands: two-thirds in the House alone is insufficient. The Senate also needs two-thirds support.';
  else text='Veto blocks the bill: Congress has not overridden it. Negotiation or a new proposal may follow.';
  field('outcome').textContent=text;
  field('override').disabled=p!=='veto'||h!=='yes'||s!=='yes';
 }
 lab.addEventListener('change',update);update();
})();
