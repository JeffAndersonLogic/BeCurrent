'use strict';
// Engagement is practice, not another required submission. Preserve saved slot IDs.
module.exports=function({meta,topics}){
 meta.reviewed='2026-10-26';
 meta.videoPolicy='Do not use Crash Course Government. Prefer short, concrete explanations and teacher-selected reporting, with official-source checks and a reading fallback.';
 const [a,b,c,d,e]=topics;
 for(const t of topics){
  for(const v of t.videos){
   if(v.source==='WFYI / PBS Simple Civics' || v.source.startsWith('AGU'))delete v.selection;
  }
 }
 a.videos[1].takeaways=['States administer elections under state and federal rules.','Use the state election office for local voting information, not a prediction of who wins.'];
 b.videos[0].takeaways=['The House and Senate together make up Congress. The House elects its Speaker.','Use the seat model and official House references to connect a majority to leadership and priorities.'];
 b.videos[1].takeaways=['Committees examine subjects, proposals, and evidence before many decisions reach the full chamber.','Use the official House process reference to check what a committee can do.'];
 b.teaching.phases['watch-1'].move='Play the 1:09 WFYI explanation, then move the seat model across 218. Use the official leadership extract to connect members to the Speaker and agenda.';
 b.teaching.phases['watch-1'].cut='Use the short WFYI clip and one seat-model change. Omit extra leadership examples.';
 b.teaching.phases['watch-2'].move='Play the AGU committee explanation. Check it against the official House extract, then students complete the real committee lookup.';
 b.teaching.phases['watch-2'].cut='Use the official extract if playback is blocked. Protect the real committee lookup.';
 c.introVideos=true;
 c.videos.forEach(v=>delete v.selection);
 c.videos[0].takeaways=['The report explores possible consequences of congressional races before Election Day. It does not establish winners.','Check the claimed governing consequence against Congress’s legislative, spending, and oversight powers.'];
 c.videos[1].takeaways=['A changed majority can change priorities and scrutiny without replacing the president.','Ordinary laws still need House and Senate agreement and presidential action, or a veto override.'];
 c.flow.headings=['Watch the stakes, make a prediction','Can the president actually do that?','Try to get lunch funded','Who pays for the delay?','Deliver your verdict'];
 c.flow.bridges[0]='The president stays in office, but Congress could change. Make a prediction, then watch two reports that ask why that matters.';
 c.flow.bridges[1]='The headlines set up the stakes. Now test the rules: who can fund a proposal, question officials, or confirm a nominee?';
 c.flow.bridges[2]='You are tracking a school-lunch proposal. Change the decisions below and watch what happens. This is a simplified classroom model, not a real bill.';
 c.flow.bridges[3]='A hearing could uncover waste. A delay could leave families waiting. Use the same example to explain both consequences.';
 c.evidenceTask='Try House approval, Senate agreement, a signature, and a veto in the model. Then check the ordinary route against the official House reference. Use that source to explain two congressional checks.';
 c.teaching.timing=[3,2,6,9,13,12,10];
 c.teaching.phases['watch-1'].move='Play the teacher-selected Guardian opening (4:32). Students privately identify one possible governing consequence. Treat its title as framing and distinguish forecasts from results.';
 c.teaching.phases['watch-1'].cut='Use the visible takeaways if blocked. Keep the power panel and bill simulation.';
 c.teaching.phases['watch-1'].model='The clip frames congressional races around their impact on a president. An election could change oversight or legislative priorities, but it does not replace the president.';
 c.teaching.phases['watch-2'].move='Play the DW opening (7:22), then compare one power and one limit with the Guardian framing. Both clips precede the practice. Use the power panel and House reference for institutional facts.';
 c.teaching.phases['watch-2'].cut='If the two reports overrun, use the DW reading takeaways and go to the bill lab. Protect the last ten minutes for the checkpoint and Canvas.';
 c.teaching.phases.investigate.move='Open Chapters 2 and 3. Reveal the power cards, complete and correct the five sorts, then test the school-lunch bill lab. Show House-only approval, agreement and signature, veto, and override. Students use the official process source for their short source note.';
 c.teaching.phases.investigate.lookFor='A student can explain why House approval alone is insufficient, identify Senate-only confirmations, and distinguish an investigation from proof of wrongdoing.';
 c.teaching.phases.apply.move='Return to the lab outcome. Read the school-lunch scenario aloud. Students write one benefit of scrutiny and one possible cost of delay. The teacher can voice anonymous examples.';
 c.teacher.story='Start with two current reports about why congressional races matter. Then put students inside one made-up school-lunch funding proposal. A president can propose it, but a new federal law needs agreement in the House and Senate. A signature, veto, or override changes the route. A hearing can reveal problems while delay can hurt people waiting. Finish with a judgment that names both consequences.';
 d.flow.headings=['Same promise, different impression','Become a campaign detective','Spot what the message leaves out','Check the receipt','Decide what you can actually claim'];
 d.flow.bridges[2]='Pause before sharing. Use the short misinformation clip, then inspect the two constructed messages. Open each framing card to see what you would need to check.';
 d.videos[1].takeaways=['Pause before sharing and investigate the source of an election claim.','Find independent evidence that answers the exact claim; a persuasive image or repeated claim is not verification.'];
 d.teaching.phases['watch-2'].move='Play the 3:05 WFYI misinformation clip. Use the framing lab to choose a missing detail. Then students analyze a constructed message and move to the prepared real claim.';
 d.teaching.phases['watch-2'].cut='Omit the optional campaign report. Keep one framing reveal and the real claim with independent evidence.';
 e.flow.headings=['The scoreboard is moving','Call, count, or certified?','Run the election desk','Write the impact, keep the limits','File your analysis'];
 e.flow.bridges[0]='You are at an election desk. Your job is to label what the evidence establishes before turning a changing number into a headline.';
 e.teaching.phases.hook.move='Use the newsroom stage cards. Students privately choose a label before revealing it. Read the evidence stage aloud, then make the dated results notebook. Never prefill a winner.';
 // Earlier pacing text must not keep sending teachers to removed episodes.
 a.teaching.phases['watch-1'].move='Play the short WFYI Members of Congress clip. Use the chamber cards and official House and Senate references to check terms and election cycles.';
 a.teaching.phases['watch-1'].cut='Use the 1:09 clip, then one private House-or-Senate check.';
 a.teaching.phases['watch-2'].move='Play the WFYI federalism clip. Use the FEC election-date reference to separate what is known from who might win.';
};
