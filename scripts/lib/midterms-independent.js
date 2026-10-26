'use strict';
// Topic 3's independent worksheet. Original saved responses keep their IDs.
module.exports=function({meta,topics}){
 const t=topics[2];
 t.selfPaced={title:'Today you work at your own pace',readNotes:true,steps:[
  'Start in Chapter 1 and work down the page. Watch the two opening clips on your own with headphones. Use captions or the reading takeaways if needed.',
  'Read each “Read the notes” box before answering the questions below it. You do not need to copy the notes.',
  'Answer worksheet questions 1–8 where they appear. A word, short phrase, or bullet is enough unless the question asks for an explanation.',
  'Complete the five practice choices and check your answers. Try the bill lab, then record what you found.',
  'Use the checklist to find anything unfinished. If stuck, open Start here, reread the notes, or ask your teacher for help.',
  'At the end, choose Gather All My Work. Paste the entire packet into Canvas and submit before lunch.'
 ]};
 t.notesChapters={direction:0,'watch-1':1,investigate:2,'watch-2':3,apply:4};
 const W=(number,chapter,id,text,length,startHere)=>({number,chapter,id,text,length,startHere});
 t.worksheet=[
  W(1,0,'worksheet-stakes','Choose one opening clip. Name the outlet and one way a changed Congress could affect a president.','One short sentence or two bullets.','The Guardian / DW report suggests Congress could ____. This is a possible effect, not a known election result.'),
  W(2,0,'worksheet-divided','Complete the idea: divided government means different parties control the presidency and ____.','A short phrase is enough.','Look at the Read the notes box above. Which part of Congress could a different party control?'),
  W(3,1,'worksheet-oversight','Does a congressional investigation prove wrongdoing by itself? Explain what oversight is meant to do.','One short sentence.','An investigation does / does not prove wrongdoing by itself. Oversight helps Congress ____.'),
  W(4,1,'worksheet-confirmation','Which chamber confirms many presidential nominees: the House, the Senate, or both?','Write the chamber name.','Find Confirmations in the notes or the Approve a nominee power card.'),
  W(5,2,'worksheet-bill-test','Test the bill lab twice. Record one setup that blocks the bill and one that makes it law. If you use the paper route, trace the two setups from the notes.','Two short bullets: blocked / becomes law.','Blocked: House ____, Senate ____, president ____. Becomes law: House ____, Senate ____, president ____. You may also test a veto override.')
 ];
 t.questions.forEach((q,i)=>q.worksheetNumber=i+6);
 t.questions[0].length='Two brief bullets and a source name. Use the notes and official sources on this page.';
 t.questions[1].length='Three short bullets: other approvals, benefit of scrutiny, cost of delay.';
 t.questions[2].length='Two or three sentences. Reuse your worksheet answers; no new research is needed.';
 t.overview='Work independently through two opening clips, short notes, and a school-lunch bill lab. Answer eight worksheet questions along the way to explain congressional checks, accountability, and delay.';
 t.inClass='Before lunch: a fully self-paced lesson. Students watch both opening clips independently, read the six notes boxes without copying them, answer eight worksheet questions, correct the five-item practice, and test the bill lab. The teacher circulates for individual support. Gather the complete worksheet into Canvas before lunch. After lunch: CNN10 and daily reporting.';
 t.flow.bridges[0]='Start on your own: make a prediction, watch the two opening clips with headphones, read the notes, then answer Questions 1 and 2.';
 t.flow.bridges[1]='Read the notes about congressional checks. Open the power cards, complete and correct the five practice choices, then answer Questions 3 and 4.';
 t.flow.bridges[2]='Read the bill-route notes, then try the school-lunch funding lab. Record two outcomes in Question 5. Use the official sources for Question 6.';
 t.flow.bridges[3]='Read the scrutiny-and-delay notes. Think about families waiting for school-lunch support, then answer Question 7 using three short bullets.';
 t.flow.bridges[4]='Read the final notes and use your earlier answers for Question 8. Check all eight questions, gather your work, and submit the packet in Canvas.';
 t.evidenceTask='Work independently: try House approval, Senate agreement, a signature, and a veto in the model. Record a blocked and a successful route in Question 5. Then use the official sources below to explain two congressional checks in Question 6.';
 t.teacher.story='Students own the entire lesson path. Both opening clips, all six notes boxes, the power cards, practice feedback, bill lab, official source extract, and eight worksheet questions are on the student page. No live explanation or projected note copying is needed. Circulate to support students individually. The original source note, application note, and checkpoint are Questions 6–8, not additional assignments.';
 const moves={
  hook:'Students begin Chapter 1 independently. Check that they can find the self-paced directions and the worksheet checklist. No whole-class opening is required.',
  direction:'Students read the first notes box and use the on-page directions. Point an individual student to Start here or the reading fallback as needed.',
  'watch-1':'Students watch the Guardian clip with headphones on their own. Use the visible takeaways if playback is blocked. Monitor access without advancing the class together.',
  'watch-2':'Students watch the DW clip independently, then answer Questions 1 and 2 after the notes. They do not wait for a teacher explanation.',
  investigate:'Students read the power and bill-route notes, reveal power cards, correct their five practice choices, test the bill lab, and answer Questions 3–6. Circulate for individual checks.',
  apply:'Students read Chapter 4’s notes and the school-lunch scenario, then answer Question 7 privately. Support an individual student with the sentence frame if needed.',
  file:'Students read the final notes and answer Question 8 using their earlier work. The checklist identifies unfinished worksheet questions. Everyone gathers the whole packet and submits in Canvas before lunch.'
 };
 for(const [id,move] of Object.entries(moves))t.teaching.phases[id].move=move;
 t.teaching.phases.investigate.cut='Omit optional background expansions and repeated lab trials. Keep Questions 3–6 and the five practice choices; use phrases and bullets.';
 t.teaching.phases.apply.cut='Keep one benefit and one cost in Question 7; use short bullets instead of a paragraph.';
 t.teaching.phases.file.cut='Keep the brief Question 8 explanation and the final five minutes for Canvas. Do not require copied notes or a second version of earlier answers.';
 meta.assessment='Topic 3: eight short worksheet questions distributed through the self-paced lesson, plus five practice choices. Questions 6–8 are the source note, application note, and final explanation. Topics 1, 2, and 4 retain their practice and short responses; Topic 2 also includes the committee lookup. Topic 5 uses the guided results notebook and final explanation. Political preference is not scored.';
};
