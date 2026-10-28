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
 // Topic 4: the actual 2026 ads replace the old constructed-message worksheet.
 d.evidenceTitle='Campaign Evidence Lab: two real 2026 ads';
 d.evidenceTask='Compare the two rural-hospital campaign advertisements. Record an initial impression, inspect Medicaid.gov and the CBO estimate, then write a revised evidence-based conclusion.';
 d.flow.bridges[2]='Put the checking method to work with actual 2026 advertisements. Make your first judgment BEFORE opening the records, then explain what the evidence changes.';
 d.flow.bridges[3]='Use the evidence you just checked to separate a campaign claim from its proof. Next, check what a poll and a promise can establish.';
 d.flow.evidence.paragraphs[1]='The two advertisements are real 2026 campaign messages about different candidates and states. They both discuss the same federal law. A true fact can be selectively emphasized, so check the entire record rather than treating one advertisement as independent evidence.';
 d.videos[1].optional=true;
 d.teaching.timing=[3,5,5,2,20,10,10];
 d.teaching.phases.direction.move='Present the three required responses: before evidence, after evidence, and a poll-or-promise checkpoint. The real 2026 ads replace the old constructed-message activity.';
 d.teaching.phases.investigate.move='Use two minutes to review promise, poll, claim and result. The original five-item practice is now optional reading, not a required sort.';
 d.teaching.phases.investigate.cut='Do not require the old five-item sort. Move to the 2026 ads.';
 d.teaching.phases['watch-2'].move='Use Chapter 3 for the required 2026 rural-hospital ad comparison. Students watch or read both original transcripts, write BEFORE, then inspect CMS and CBO evidence and write AFTER. There is no second required PBS clip.';
 d.teaching.phases['watch-2'].model='Ad A highlights new rural-health funding. Ad B highlights risks. Medicaid.gov verifies the five-year $50 billion program; CBO projects roughly $915 billion less national Medicaid spending over ten years. Neither number alone predicts specific hospital closures.';
 d.teaching.phases['watch-2'].lookFor='Students distinguish advertisements, independent records, projections, and verified outcomes. Their BEFORE and AFTER notes have an evidence-based change or confirmation.';
 d.teaching.phases['watch-2'].cut='Display the short ad excerpts and read the CMS/CBO cards aloud if external players are blocked. Protect the BEFORE and AFTER responses.';
 d.teaching.phases.apply.move='Use the prepared Pew poll card in Chapter 4. Ask what a dated national sample can estimate, why it cannot establish district winners, and why a policy promise needs other institutions.';
 d.teaching.phases.apply.cut='The older Arizona claim packet is optional. Do not assign a second unrelated fact-check.';
 d.teaching.phases.file.move='Keep the final poll/promise answer short. With five minutes remaining gather all three required written responses and submit to Canvas. Confirm the submission.';
 d.questions[0].text='After checking the records, explain what each 2026 ad emphasizes, what it leaves out, and whether the evidence changes your initial impression.';
 d.questions[0].startHere='Before I thought ____. Ad A emphasizes ____, while Ad B emphasizes ____. According to ____, ____. My conclusion is ____ because ____.';
 d.questions[1].text='Optional extension: analyze a different attributed campaign claim with a record that could test it.';
 d.questions[1].optional=true;
 d.teacher.story='Students examine two real 2026 ads about the same law, first as persuasive viewers and then as evidence detectives. They document an initial impression, compare two primary government records and independent reporting, revise their assessment, and finish by distinguishing poll estimates and promises from results.';
 d.teacher.land='A campaign may select accurate details while omitting other essential effects. Evidence can confirm parts of competing messages without proving every implied outcome.';
 d.teacher.ask='What did you think before checking, and which named record changed or confirmed your conclusion?';
 d.teacher.listenFor='Before/after reasoning, specific source name, recognition of different spending scopes and timelines, and uncertainty about closures.';
 d.rubric=[
  {label:'Before evidence',description:'Identify one initial impression or exact claim in each actual 2026 ad.'},
  {label:'Independent check',description:'Name Medicaid.gov, CBO, or FactCheck.org and accurately state a finding and its limits.'},
  {label:'After evidence',description:'Compare what each ad emphasizes, what it omits, and whether the original impression changed or held.'},
  {label:'Polls and promises',description:'Explain why a sampled poll and a campaign promise are not election results or guaranteed policy outcomes.'}
 ];
 d.inClass='55 minutes: hook 3, direction 5, PBS research clip 5, optional concept check 2, paired 2026 ads and evidence 20, poll/promise 10, explanation and Canvas 10. After lunch: CNN10 and daily reporting.';
 meta.assessment='Topics 1–3: practice choices, source notes, and short explanations. Topic 4: a before-and-after check of real 2026 ads and a poll/promise checkpoint. Topic 5: a guided results notebook and final explanation. Political preference is never scored.';
 // Topic 4 lesson contract: the teacher launches with current campaign ads; then
 // students move independently through eight short, accessible worksheet questions.
 d.introClip={title:'Modern Political Campaigns',url:'https://www.youtube.com/watch?v=muJ7w0uKI20',source:'YouTube',note:'Teacher previews runtime and selects an excerpt if needed. The linked title was checked October 28, 2026; duration was not verified.'};
 d.campaignOpeners=[
  {title:'Rural hospitals: two sides of one law',url:'https://www.factcheck.org/2026/09/midterm-ads-clash-over-gop-laws-impact-on-rural-healthcare/',note:'Republican- and Democratic-aligned advertisements frame the effects differently.'},
  {title:'Texas taxes: what a shortened quote changes',url:'https://www.factcheck.org/2026/10/paxton-ad-takes-talarico-taxes-comments-out-of-context/',note:'A quoted statement omits a key description of who would face higher taxes.'},
  {title:'Medicare: what gets emphasized',url:'https://www.factcheck.org/2026/10/democratic-ads-exaggerate-gop-laws-impact-on-medicare/',note:'Advertisements use Medicare claims without explaining the full law.'}
 ];
 d.flow.headings=['What does a campaign want us to believe?','Watch: how campaign messaging works','Investigate two real 2026 advertisements','Check the receipts','Explain what you can actually conclude'];
 d.flow.bridges=[
  'Your teacher will show several real 2026 campaign ads. Notice which ideas, images, and numbers stand out. Your task is to investigate the message, not support a party.',
  'Watch the two introductory clips with your class. You will learn how campaigns choose messages and how to check their claims.',
  'Now you take over. Open both ads, look at who paid for them, and record what each wants viewers to believe before you read the independent evidence.',
  'Use the government records and a FactCheck.org investigation to identify what the advertisements establish and what they leave out.',
  'Use what you found to distinguish campaign promises, poll estimates, and verified results. Gather all eight worksheet answers for Canvas.'
 ];
 d.hook='Can a campaign ad use a true fact and still leave out important information?';
 d.overview='Watch real 2026 campaign ads, spot one-sided messaging, and verify the claims using independent records.';
 d.evidenceTitle='Your mission: spot the message, then verify it';
 d.evidenceTask='Read or watch both 2026 advertisements, answer Questions 4–6, then open the independent evidence in the next chapter.';
 d.teaching.timing=[5,2,8,3,18,9,10];
 d.worksheet=[
  {number:1,chapter:0,id:'worksheet-purpose',text:'What is the purpose of a political campaign ad? Name one way an ad tries to shape what voters notice.',length:'One sentence.',startHere:'A campaign ad tries to ____. It draws attention to ____.'},
  {number:2,chapter:1,id:'worksheet-video',text:'From the intro videos, name one technique campaigns use to persuade voters.',length:'One short sentence.',startHere:'Campaigns persuade viewers by ____.'},
  {number:3,chapter:1,id:'worksheet-verification',text:'Why is a campaign website or ad not enough to prove a factual claim?',length:'One short sentence.',startHere:'It tells us what the campaign says. To check the claim, I need ____.'},
  {number:4,chapter:2,id:'campaign-before',text:'BEFORE CHECKING: What does Ad A want viewers to believe? What does Ad B want viewers to believe?',length:'Two short bullets.',startHere:'Ad A says ____. Ad B says ____.'},
  {number:5,chapter:2,id:'worksheet-framing',text:'Choose one ad. What audience, image, word, or emotion does it use to persuade?',length:'One or two short sentences.',startHere:'I chose Ad ____. It targets ____ by using ____.'},
  {number:6,chapter:2,id:'worksheet-exact-claim',text:'Choose one checkable claim from either ad. What independent record could help test it?',length:'One sentence and a source name.',startHere:'The claim is ____. I could check ____.'},
  {number:7,chapter:3,id:'report',text:'AFTER CHECKING: What did the independent evidence establish, and what important context was left out of the campaign ads?',length:'Two or three short sentences. Name a source.',startHere:'Medicaid.gov / CBO / FactCheck.org establishes ____. Ad __ left out ____. My first impression changed / stayed the same because ____.'},
  {number:8,chapter:4,id:'checkpoint',text:'Why does a favorable poll not prove a candidate won, and why does a campaign promise not guarantee a new law?',length:'Two short sentences.',startHere:'A poll cannot prove ____ because ____. A promise does not guarantee ____ because ____.'}
 ];
 d.questions[0].text=d.worksheet[6].text;d.questions[0].startHere=d.worksheet[6].startHere;
 d.questions[1].text=d.worksheet[5].text;d.questions[1].startHere=d.worksheet[5].startHere;d.questions[1].optional=false;
 d.questions[2].text=d.worksheet[7].text;d.questions[2].startHere=d.worksheet[7].startHere;
 d.teacher.story='Begin with a short teacher explanation of persuasion and show three current 2026 FactCheck.org ad examples. Play Modern Political Campaigns and the WFYI research-candidates explainer. Then release students to the eight-question worksheet: examine two campaign ads, identify framing, check CMS/CBO/FactCheck.org, and file their own findings in Canvas. Polls and promises are not results.';
 d.teacher.land='Real campaign messages can select an accurate fact and omit other relevant evidence. Students can inspect both political perspectives without declaring a preferred candidate.';
 d.teacher.ask='What is the advertisement claiming, and what independent record actually answers that claim?';
 d.teacher.listenFor='An attributed original ad, identified target audience, precise claim, named independent evidence, and cautious conclusions.';
 d.rubric=[
  {label:'Campaign purpose and video',description:'Explain why campaigns persuade and identify a messaging technique.'},
  {label:'Ad analysis',description:'Identify both ads\' messages, a persuasive choice, and a checkable claim.'},
  {label:'Evidence and revision',description:'Name a relevant independent source, identify a limit or omitted context, and update the first impression.'},
  {label:'Poll and promise limits',description:'Distinguish sampled opinion and proposed policy from verified outcomes.'}
 ];
 d.teaching.phases.hook.move='Give the 45-second opening explanation, then show brief excerpts from three real 2026 ads on FactCheck.org: rural hospitals, Texas taxes, Medicare. Do not spend the full class arguing about any candidate.';
 d.teaching.phases.direction.move='Show the eight numbered worksheet responses and the Gather All My Work button. Students will work independently after the videos.';
 d.teaching.phases['watch-1'].move='Play the user-selected Modern Political Campaigns YouTube intro, then WFYI How Do You Research Candidates? (2:55). Preview the first video\'s length and select a meaningful excerpt as needed. Use the short reading fallback.';
 d.teaching.phases['watch-1'].cut='Keep one key idea from each video; avoid turning both into a long lecture.';
 d.teaching.phases.investigate.move='Model one sentence on why a campaign website does not prove its own claims; release students to Questions 4–6.';
 d.teaching.phases['watch-2'].move='Students independently examine both original campaign ads and answer Questions 4–6. Project the launch link and circulate. If ad playback is blocked, short excerpts and written source descriptions remain available.';
 d.teaching.phases['watch-2'].cut='Do not make students visit three unrelated ad stations. The rural hospital pair is required; other cases are optional.';
 d.teaching.phases.apply.move='Students open the CMS, CBO, and FactCheck.org evidence packet, then answer Question 7. Highlight that the money amounts cover different populations and periods.';
 d.teaching.phases.file.move='Students answer Question 8 with the poll card, use Gather All My Work, and confirm Canvas submission. Protect final five minutes.';
 d.inClass='Before lunch, 55 minutes: teacher introduction and three FactCheck.org ads (5), student directions (2), two introductory video excerpts (8), source-check model (3), independent ads/Questions 4–6 (18), evidence/Question 7 (9), poll/Question 8 and Canvas (10). After lunch: CNN10 and daily news.';
 meta.reviewed='2026-10-28';
 meta.assessment='Topic 4: eight short student-directed worksheet questions, including original-ad analysis, independently checked evidence, and a poll/promise conclusion. Political preference is never graded.';
 e.flow.headings=['The scoreboard is moving','Call, count, or certified?','Run the election desk','Write the impact, keep the limits','File your analysis'];
 e.flow.bridges[0]='You are at an election desk. Your job is to label what the evidence establishes before turning a changing number into a headline.';
 e.teaching.phases.hook.move='Use the newsroom stage cards. Students privately choose a label before revealing it. Read the evidence stage aloud, then make the dated results notebook. Never prefill a winner.';
 // Earlier pacing text must not keep sending teachers to removed episodes.
 a.teaching.phases['watch-1'].move='Play the short WFYI Members of Congress clip. Use the chamber cards and official House and Senate references to check terms and election cycles.';
 a.teaching.phases['watch-1'].cut='Use the 1:09 clip, then one private House-or-Senate check.';
 a.teaching.phases['watch-2'].move='Play the WFYI federalism clip. Use the FEC election-date reference to separate what is known from who might win.';
};
