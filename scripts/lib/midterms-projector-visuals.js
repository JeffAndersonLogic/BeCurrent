'use strict';
// Student-safe display data. No teacher answers or predictions of winners.
const {photo}=require('./midterms-images');
const image=key=>{const p=photo(key);return {src:'../assets/images/midterms/'+p.file,alt:p.alt,caption:p.caption,credit:p.credit,source:p.source};};
module.exports={
 3:{
  hook:{image:image('white-house'),description:'The president stays. Congress could change. What happens next?'},
  'watch-1':{cards:[{title:'Guardian / Watch for',text:'Which races could change a president’s options?'},{title:'Keep separate',text:'Possible outcomes and verified results.'}]},
  'watch-2':{cards:[{title:'DW / Watch for',text:'What could Congress change?'},{title:'Compare the framing',text:'What could still block that change?'}]},
  investigate:{description:'Open the power panel, then test the school-lunch bill.',cards:[{title:'House',text:'Pass the bill.'},{title:'Senate',text:'Agree to the same text.'},{title:'President',text:'Sign it or veto it.'},{title:'Override',text:'Two-thirds in each chamber.'}],action:{url:'../midterms/block-03.html#chapter-3',label:'Open the bill lab'}},
  apply:{description:'Same hearing. Two consequences.',cards:[{title:'Accountability',text:'What could scrutiny uncover?'},{title:'Delay',text:'Who might wait for support?'}]},
  file:{description:'Name a check. Explain a benefit. Recognize a cost.'}
 },
 4:{
  hook:{image:image('i-voted'),description:'Would you share it before checking it?'},
  investigate:{cards:[{title:'The claim',text:'What exactly is being asserted?'},{title:'The receipt',text:'Which independent record could test it?'},{title:'The gap',text:'What context is missing?'}]},
  'watch-2':{description:'Watch for a verification move. Then try the framing lab.',action:{url:'../midterms/block-04.html#chapter-3',label:'Open the framing lab'}},
  apply:{cards:[{title:'Support',text:'What does the record establish?'},{title:'Limit',text:'What remains unresolved?'}]},
  file:{description:'A poll estimates. A promise proposes. Neither guarantees.'}
 },
 5:{
  hook:{image:image('indiana-statehouse'),description:'Your desk rule: source, stage, check time.'},
  investigate:{cards:[{title:'Count',text:'Partial totals may change.'},{title:'Call',text:'Attribute the news outlet’s conclusion.'},{title:'Certified',text:'Official sign-off for that race.'}]},
  'watch-2':{description:'Run the results desk. Keep unresolved outcomes open.',cards:[{title:'House',text:'Model the evidence check.'},{title:'Senate',text:'Check together.'},{title:'Indiana',text:'Verify the district race.'}]},
  apply:{cards:[{title:'What happened?',text:'Use dated, attributed results.'},{title:'What could follow?',text:'Explain a governing effect and limit.'}]},
  file:{description:'Established result. Possible impact. Honest uncertainty.'}
 }
};
