'use strict';
// Canvas calendar supplied by Jeff, November 9, 2026. This is the remaining semester schedule.
const events = [
 {date:'2026-11-09',code:'AIOPEN',title:'CE - Video Day - 60 Minutes Interview',kind:'video',page:'ai/opening-film.html',summary:'Before lunch: Extended Interview: President Trump on 60 Minutes. After lunch: CNN 10. No written work or Canvas submission today.'},
 {date:'2026-11-11',title:'CE - The Desk 111126',kind:'desk',page:'daily/index.html'},
 {date:'2026-11-13',title:'CE - The Desk 111326',kind:'desk',page:'daily/index.html'},
 {date:'2026-11-17',code:'AI1',title:'CE - AI1 - What Exactly AI Is',kind:'lesson',page:'ai/block-01.html'},
 {date:'2026-11-19',code:'AI2',title:'CE - AI2 - When AI Gets it Wrong',kind:'lesson',page:'ai/block-02.html'},
 {date:'2026-11-23',title:'CE - The Desk 112326',kind:'desk',page:'daily/index.html'},
 {date:'2026-11-30',code:'AI3',title:'CE - AI3 - What AI Changes',kind:'lesson',page:'ai/block-03.html'},
 {date:'2026-12-02',code:'AI4',title:'CE - AI4 - Who Makes the Rules?',kind:'lesson',page:'ai/block-04.html'},
 {date:'2026-12-04',title:'CE - AI5 - Study Guide Work Day',kind:'ai-review',page:'ai/study-guide.html'},
 {date:'2026-12-08',title:'CE - AI Unit Exam',kind:'ai-exam',page:'ai/study-guide.html'},
 {date:'2026-12-10',title:'CE - Final Exam Study Guide Work Day',kind:'final-review',page:'finals/study-guide.html'},
 {date:'2026-12-16',title:'CE - Final Exam',kind:'final-exam',page:'finals/study-guide.html'}
];
const breaks=[{date:'2026-11-25',end:'2026-11-27',title:'Thanksgiving Break'},{date:'2026-12-21',end:'2026-12-25',title:'Winter Break'}];
const video={title:'Extended Interview: President Trump on 60 Minutes',source:'60 Minutes',date:'2026-11-08',url:'https://www.youtube.com/watch?v=m2aC8lAOQbg'};
function boardDays(unit){return events.map(e=>{
 const day={date:e.date,topicTitle:e.title,homeAnnouncement:'Today: '+e.title.replace(/^CE - /,'')+'. ',showLead:false};
 if(e.code)day.topic=e.code;
 if(e.kind==='video')Object.assign(day,{note:e.summary,agenda:['Before lunch: watch '+video.title+'.','After lunch: watch CNN 10.','No written work today. No News Log entry or Canvas submission.'],homeAnnouncement:day.homeAnnouncement+'60 Minutes before lunch; CNN 10 after lunch. No written work today.',homework:'No written work or Canvas submission today.',slides:[{url:video.url,linkLabel:'Open the 60 Minutes interview',kicker:'Before lunch',title:'Watch the 60 Minutes interview',bullets:['Extended Interview: President Trump on 60 Minutes','After lunch: CNN 10.','No written work or Canvas submission today.']} ]});
 if(e.kind==='desk')Object.assign(day,{deskMode:'full',deskWorkflow:'gather',showLead:true,note:'The Desk: shared Lead, Your Pick, and an evidence-based significance judgment.',agenda:['Watch CNN 10 and open The Desk.','Read the shared Lead and record its source, date, link, summary and significance.','Choose and read Your Pick; record its source details and summarize the event.','Explain which story deserves more attention using specific evidence.','Gather My Log, copy the complete log, paste into '+e.title+' in Canvas, and submit.'],homework:'Submit '+e.title+' in Canvas. Check that your '+e.date+' entry is included.',homeworkDue:'the end of class today',homeAnnouncement:day.homeAnnouncement+'Read the Lead, choose Your Pick, and submit your gathered News Log.'});
 if(e.kind==='lesson'){
  const t=unit.topics.find(t=>'AI'+t.n===e.code);
  Object.assign(day,{note:t.overview,doNow:t.question,agenda:['Open '+e.title+' and follow the five chapters in order.','Read the background and complete the practice sort.','Answer all eight private questions, then Gather All My Work.','Paste the complete record into the matching Canvas Text Entry assignment and submit before lunch.','After lunch: CNN 10 and the News Log.'],homework:'Finish and submit '+e.title+' in Canvas.',homeAnnouncement:day.homeAnnouncement+'Complete eight responses and submit the gathered record in Canvas.'});
 }
 if(e.kind==='ai-review')Object.assign(day,{note:'AI5 is a study-guide work day; there is no fifth new investigation. AI Unit Exam: Tuesday, December 8.',agenda:['Open the AI study guide.','Review AI1 through AI4: concepts, evidence, source checks and policy reasoning.','Check weak areas against the linked lessons and ask targeted questions.','Prepare for the AI Unit Exam on December 8.'],homework:'Finish studying AI1–AI4 for December 8.',homeAnnouncement:day.homeAnnouncement+'Review AI1–AI4 for the December 8 unit exam.'});
 if(e.kind==='ai-exam')Object.assign(day,{note:'AI unit assessment in Canvas. Review materials remain on BeCurrent; questions and answers stay in Canvas.',agenda:['Open Canvas when instructed.','Complete and submit the AI Unit Exam.','Check your submission confirmation.'],homework:'No additional AI assignment.',homeAnnouncement:day.homeAnnouncement+'Complete the AI assessment in Canvas.'});
 if(e.kind==='final-review')Object.assign(day,{note:'Traditional semester final exam on Wednesday, December 16. No final project.',agenda:['Open the semester final exam study guide.','Review News Literacy, Social Media, Iran at War, Midterms and Artificial Intelligence.','Practice explaining claims, evidence, cause and effect, source limits and competing perspectives.','Identify weak areas and ask questions before December 16.'],homework:'Finish your final exam study guide and study for December 16.',homeAnnouncement:day.homeAnnouncement+'Prepare for the traditional final on December 16; no final project.'});
 if(e.kind==='final-exam')Object.assign(day,{note:'Traditional semester final exam today. No final project.',agenda:['Follow the teacher’s final exam directions.','Complete the traditional semester final exam.','Check that your exam is turned in before leaving.'],homework:'No final project.',homeAnnouncement:day.homeAnnouncement+'Traditional semester final today. No final project.'});
 return day;
});}
module.exports={events,breaks,video,boardDays};
