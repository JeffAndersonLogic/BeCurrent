'use strict';
// Canvas calendar supplied by Jeff, November 9, 2026. This is the remaining semester schedule.
const events = [
 {date:'2026-11-09',code:'AIOPEN',title:'CE - Video Day - 60 Minutes Interview',kind:'video',page:'ai/november-09-interview.html',summary:'Before lunch: Extended Interview: President Trump on 60 Minutes. After lunch: CNN 10. No written work or Canvas submission today.'},
 {date:'2026-11-11',title:'CE - The Desk 111126',kind:'desk',page:'daily/index.html'},
 {date:'2026-11-13',title:'CE - The Desk 111326',kind:'desk',page:'daily/index.html',also:{title:'Midterms - After the Vote',points:5,html:'scripts/lib/assignments/midterms-after-the-vote.html',agenda:'Read the two Midterms articles from The Week. Answer all eight questions, four per article, in the Text Entry box of Midterms - After the Vote in Canvas, and submit.'}},
 {date:'2026-11-17',code:'AI1',title:'CE - AI1 - Intro to AI (Nova Video)',kind:'video',page:'ai/opening-film.html',summary:'Before lunch: watch the complete 53:30 NOVA A.I. Revolution documentary. After lunch: CNN10. No homework, written work, News Log or Canvas submission.'},
 {date:'2026-11-19',code:'AI2',title:'CE - AI2 - What Exactly AI Is',kind:'lesson',page:'ai/block-02.html'},
 {date:'2026-11-23',code:'AI3',title:'CE - AI3 - When AI Gets it Wrong',kind:'lesson',page:'ai/block-03.html'},
 {date:'2026-11-30',code:'AI4',title:'CE - AI4 - What AI Changes',kind:'lesson',page:'ai/block-04.html'},
 {date:'2026-12-02',code:'AI5',title:'CE - AI5 - Who Makes the Rules?',kind:'lesson',page:'ai/block-05.html'},
 {date:'2026-12-04',code:'AI6',title:'CE - AI6 - Study Guide Work Day',kind:'ai-review',page:'ai/study-guide.html'},
 {date:'2026-12-08',title:'CE - AI Unit Exam',kind:'ai-exam',page:'ai/study-guide.html'},
 {date:'2026-12-10',title:'CE - Final Exam Study Guide Work Day',kind:'final-review',page:'finals/study-guide.html'},
 {date:'2026-12-16',title:'CE - Final Exam',kind:'final-exam',page:'finals/study-guide.html'}
];
const breaks=[{date:'2026-11-25',end:'2026-11-27',title:'Thanksgiving Break'},{date:'2026-12-21',end:'2026-12-25',title:'Winter Break'}];
const video={title:'Extended Interview: President Trump on 60 Minutes',source:'60 Minutes',date:'2026-11-08',url:'https://www.youtube.com/watch?v=m2aC8lAOQbg'};
const nova={title:'A.I. Revolution | Full Documentary | NOVA | PBS',source:'NOVA PBS Official',date:'2024-03-27',duration:'53:30',url:'https://www.youtube.com/watch?v=-sB12gk9ESA',alt:'https://www.pbs.org/video/ai-revolution-umwwlt/'};
// Administrative Canvas names stay in event.title; website and projector labels use this view.
function displayTitle(event){return event.code==='AIOPEN'?'Video - 60 Minutes Interview with President Trump':event.title.replace(/^CE\s*-\s*/, '');}
function boardDays(unit){return events.map(e=>{
 const title=displayTitle(e);
 const day={date:e.date,topicTitle:title,homeAnnouncement:'Today: '+title+'. ',showLead:e.code==='AI1',...(e.kind==='video'?{unitTitle:'',subtitle:''}:{})};
 if(e.code&&e.kind!=='video')day.topic=e.code;
 if(e.kind==='video'){
  const v=e.code==='AI1'?nova:video;
  const isAI=e.code==='AI1';
  Object.assign(day,{note:e.summary,agenda:['Before lunch: watch '+(isAI?'the full 53:30 NOVA A.I. Revolution documentary':v.title)+'.','After lunch: watch CNN10.','No written work, homework, News Log entry or Canvas submission today.'],homeAnnouncement:day.homeAnnouncement+(isAI?'Full NOVA A.I. Revolution before lunch; CNN10 after lunch. No homework.':'60 Minutes before lunch; CNN 10 after lunch. No written work today.'),homework:'No homework or Canvas submission today.',slides:[{url:v.url,linkLabel:isAI?'Watch the full NOVA documentary':'Open the 60 Minutes interview',kicker:'Before lunch',title:isAI?'A.I. Revolution — Full NOVA Documentary':'Watch the 60 Minutes interview',bullets:[isAI?'Watch all 53 minutes 30 seconds.':v.title,'After lunch: CNN10.','No homework or written submission.']}]});
 }
 if(e.kind==='desk')Object.assign(day,{deskMode:'full',deskWorkflow:'gather',showLead:true,note:'The Desk: shared Lead, Your Pick, and an evidence-based significance judgment.',agenda:['Watch CNN 10 and open The Desk.','Read the shared Lead and record its source, date, link, summary and significance.','Choose and read Your Pick; record its source details and summarize the event.','Explain which story deserves more attention using specific evidence.','Gather My Log, copy the complete log, paste into '+title+' in Canvas, and submit.'],homework:'Submit '+title+' in Canvas. Check that your '+e.date+' entry is included.',homeworkDue:'the end of class today',homeAnnouncement:day.homeAnnouncement+'Read the Lead, choose Your Pick, and submit your gathered News Log.'});
 // A second Canvas assignment on the same day: both titles reach the board and the calendar event.
 if(e.also){day.agenda=day.agenda.concat(e.also.agenda);day.homework=[].concat(day.homework||[],'Submit '+e.also.title+' in Canvas.');day.homeAnnouncement='Today: two assignments, '+title+' and '+e.also.title+'. Submit both in Canvas.';day.note='Two Canvas assignments today: '+title+' and '+e.also.title+'.';day.topicTitle=title+' + '+e.also.title;}
 if(e.kind==='lesson'){
  const t=unit.topics.find(t=>'AI'+t.n===e.code);
  Object.assign(day,{note:t.overview,doNow:t.question,agenda:t.agenda||['Open '+title+' and follow the five chapters in order.','Read the background and complete the practice sort.','Answer all eight private questions, then Gather All My Work.','Paste the complete record into the matching Canvas Text Entry assignment and submit before lunch.','After lunch: CNN 10 and the News Log.'],homework:'Finish and submit '+title+' in Canvas.',homeAnnouncement:day.homeAnnouncement+'Complete eight responses and submit the gathered record in Canvas.'});
 }
 if(e.kind==='ai-review')Object.assign(day,{note:'AI6 is the study-guide work day; review AI2–AI5 and the opening NOVA film for the December 8 exam.',agenda:['Open the AI study guide.','Review AI2–AI5: how AI works, errors and verification, local impacts, and rule-making.','Connect the full NOVA film from AI1 to the four investigations.','Check weak areas and prepare for the AI Unit Exam on December 8.'],homework:'Finish studying AI2–AI5 and the NOVA introduction for December 8.',homeAnnouncement:day.homeAnnouncement+'Review the AI unit for the December 8 exam.'});
 if(e.kind==='ai-exam')Object.assign(day,{note:'AI unit assessment in Canvas. Review materials remain on BeCurrent; questions and answers stay in Canvas.',agenda:['Open Canvas when instructed.','Complete and submit the AI Unit Exam.','Check your submission confirmation.'],homework:'No additional AI assignment.',homeAnnouncement:day.homeAnnouncement+'Complete the AI assessment in Canvas.'});
 if(e.kind==='final-review')Object.assign(day,{note:'Traditional semester final exam on Wednesday, December 16. No final project.',agenda:['Open the semester final exam study guide.','Review News Literacy, Social Media, Iran at War, Midterms and Artificial Intelligence.','Practice explaining claims, evidence, cause and effect, source limits and competing perspectives.','Identify weak areas and ask questions before December 16.'],homework:'Finish your final exam study guide and study for December 16.',homeAnnouncement:day.homeAnnouncement+'Prepare for the traditional final on December 16; no final project.'});
 if(e.kind==='final-exam')Object.assign(day,{note:'Traditional semester final exam today. No final project.',agenda:['Follow the teacher’s final exam directions.','Complete the traditional semester final exam.','Check that your exam is turned in before leaving.'],homework:'No final project.',homeAnnouncement:day.homeAnnouncement+'Traditional semester final today. No final project.'});
 return day;
});}
module.exports={events,breaks,video,nova,boardDays,displayTitle};
