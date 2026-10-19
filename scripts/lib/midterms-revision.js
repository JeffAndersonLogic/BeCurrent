'use strict';
// Teaching revisions share the original topic and saved-response identities.
module.exports=function revise({meta,topics,sources,clips}){
 const teaching=require('./midterms-teaching');
 const evidence=require('./midterms-evidence');
 sources.indiana.url='https://enr.indianavoters.in.gov/site/index.html';
 sources.indiana.note='Official current results portal. Confirm the election name and date; primary results are not November general-election results.';
 meta.assessment='Topics 1–4: five practice choices, a brief source note, an application note, and a final explanation. Topic 5: a guided results notebook and one final explanation. Optional planning notes are not required. Political preference is not scored.';
 meta.evidence=evidence;
 const windows={1:[[0,210],[0,69]],2:[[0,210],[0,240]],3:[[0,240],[0,240]],4:[[0,175],[0,180]],5:[[0,379],[0,127]]};
 const takeaways={
 1:[['Congress includes the House and Senate. House members represent districts; each state has two senators.','House terms are two years; Senate terms are six years and staggered. A midterm does not elect a president.'],['Separate congressional races choose members. The winners affect who organizes each chamber.','A new congressional majority can change priorities while the president stays in office.']],
 2:[['A majority can organize a chamber and choose leaders. The Speaker is elected by the House.','Leaders influence the agenda and committee assignments. Current people and party totals differ from the dated video.'],['A committee is a smaller working group that studies a subject, examines proposals, and questions witnesses.','A chair influences what gets attention. A proposal can meet an obstacle before the full chamber votes.']],
 3:[['Congress and the president have separate powers. Congress can examine government actions and make spending laws.','The Senate confirms many presidential nominations. Oversight is a way to gather evidence, not proof of wrongdoing.'],['Ordinarily, the House and Senate must approve the same bill before presidential action.','A veto can be overridden with two-thirds support in each chamber. One chamber cannot ordinarily enact a law alone.']],
 4:[['A candidate’s page establishes what that candidate says. Independent records are needed to check factual claims.','Match the checking source to the exact claim; repeating a statement is not independent confirmation.'],['Framing directs attention through selection, order, wording, and images.','An accurate detail can still leave out important context. Ask what evidence would change the impression.']],
 5:[['A news race call is an organization’s conclusion based on evidence and analysis; it is not official certification.','A partial lead is not a final result. Record the source, reporting stage, and check time.'],['Voting equipment helps record or count ballots; election officials check and compile totals.','The equipment explanation does not establish any 2026 winner. Use the dated results sources instead.']]
 };
 const explanations={
 1:['House members serve two-year terms, so all 435 voting seats are regularly elected every two years.','A senator’s regular term lasts six years.','Every state has two senators, regardless of population.','Both chambers vote on bills; ordinary lawmaking needs their agreement.','A changed majority can affect committee leadership in either chamber.'],
 2:['The majority can organize the chamber and influence leadership choices.','Leaders and committees influence which proposals receive attention.','A promise can still face disagreement in the other chamber or from the president.','Committee organization influences hearings and investigations.','A majority in one chamber cannot guarantee agreement in the other.'],
 3:['Ordinary lawmaking requires both chambers to approve the same text.','Many presidential nominees require Senate confirmation, not House confirmation.','The president signs or vetoes a bill after it passes Congress.','A veto override requires two-thirds support in each chamber.','Both chambers can question officials and investigate government actions.'],
 4:['This describes a desired future action, so it is a campaign promise.','A sample estimates opinion at a particular time; it does not count election votes.','Certification is the official sign-off by the responsible election authority.','A broad accusation needs a precise definition and relevant evidence.','A sweeping claim about savings needs a plan, assumptions, and independent evidence.'],
 5:['A survey estimates opinion before a verified outcome.','Partial totals can change as additional ballots are counted.','A news organization’s race call is reporting, not official certification.','Certification is the responsible authority’s official sign-off.','Adding ballots changes preliminary totals; it does not itself certify them.']
 };
 for(const t of topics){
  t.teaching=teaching[t.n];t.rubric=t.teaching.rubric;t.evidence=evidence;
  t.sortExplanations=explanations[t.n];
  t.videos=t.videos.map((v,i)=>i<2?{...v,selection:{start:windows[t.n][i][0],end:windows[t.n][i][1]},takeaways:takeaways[t.n][i],optional:t.n===5&&i===1,pause:'Stop at the assigned endpoint. Ask: '+v.prompt+' Use the core takeaways to check the answer before continuing.'}:v);
  t.questions.forEach((q,i)=>{q.length=i===0?'One factual bullet and a source name are enough.':i===1?'Two short bullets are enough.':'Two or three clear sentences are enough.';q.checklist=[];});
  t.questions[0].checklist=['Name the source.','State the specific fact it establishes.'];
  t.questions[1].checklist=['Apply today’s idea to the situation.','Name the limit or condition.'];
  t.questions[2].checklist=t.successCriteria.map(c=>c.criteria.replace(/^I can /,''));
  t.inClass='Before lunch: follow the guided civics investigation, use the assigned clip windows and evidence cards, then submit the required work in Canvas. Background readings and Push further are optional. After lunch: CNN10 and daily reporting for 20–25 minutes.';
 }
 const [a,b,c,d,e]=topics;
 a.teaching.phases.apply.model='The Indiana Fourth District race chooses a U.S. representative, who can vote on federal spending and serve on committees. It does not elect the president or replace the Senate.';
 a.teaching.phases.apply.move='Revisit the Indiana race card in Chapter 1, then use Chapter 4. Model office → decision → limit. Students make two short notes; do not require family voting preferences.';
 a.questions[1].text='For the Indiana race card, name the office voters choose and one decision its winner could influence. Name one part of government this race does not replace.';
 a.questions[1].startHere='Voters choose a ____. That member could influence ____. This race does not replace ____.';
 b.questions[0].text='Name two decisions a new majority could influence. Identify your video or official source.';
 b.questions[0].startHere='A new majority could influence ____ and ____. My source is ____.';
 b.questions[0].checklist=['Name two leadership, committee, or agenda decisions.','Identify the source that supports the connection.'];
 b.questions[2].text='Connect one district race to seats, a majority, and congressional priorities. Include one limit on that power.';
 b.questions[2].startHere='One race changes ____. Enough seats can change ____. That can affect ____, but ____.';
 c.scenario='Constructed teaching scenario, not a pending 2026 bill: The president proposes more school-lunch funding. The House committee questions its cost. Some families want careful scrutiny; others need the service quickly. The Senate has not agreed to the proposal.';
 c.questions[1].text='Why can’t the House alone make the school-lunch proposal law? Give one benefit of scrutiny and one possible cost of delay.';
 c.questions[1].startHere='The same bill also needs ____. Scrutiny could ____. Delay could ____.';
 c.questions[1].checklist=['Trace House and Senate agreement, then presidential action.','Explain a benefit of scrutiny and a cost of delay.'];
 c.teaching.phases.apply.model='The House alone cannot enact the school-lunch plan: the Senate must approve the same text and presidential action follows. A hearing could reveal waste or improve the proposal, but delay could postpone food support for families.';
 c.flow.bridges[2]='Follow the school-lunch proposal through the House, Senate, and president. The video window and written route show why agreement is needed at more than one point.';
 d.scenario='Use the prepared real-claim packet below. Check its exact claim against the independent evidence. Then use the poll card to distinguish measured opinion from an election result. Open research is an extension.';
 d.evidenceTask='First analyze the constructed messages with the class. Then use the prepared real-claim packet in Step 4. The original claim and checking evidence are supplied; you do not need to search for a new claim.';
 d.questions[1].text='Use the prepared real claim: identify its speaker and date, name the independent checking source, and explain what the evidence supports, contradicts, or leaves unresolved.';
 d.questions[1].startHere='The claim by ____ on ____ says ____. The independent source ____ establishes ____. This supports / contradicts / leaves unresolved ____.';
 d.questions[1].length='Use the claim, evidence, and conclusion frame. Short bullets are welcome.';
 d.questions[1].checklist=['Identify the exact claim and its source/date.','Name independent evidence relevant to that claim.','Explain a supported conclusion and its limit.'];
 d.questions[2].text='Use the poll card to state one thing it can show and one thing it cannot establish. Why does a campaign promise also fail to guarantee a policy change?';
 d.questions[2].startHere='This poll estimates ____ among ____ at ____. It cannot establish ____. A promise also depends on ____.';
 d.questions[2].checklist=['Use the poll’s dates and population.','Separate an estimate from a verified result.','State a condition on delivering a promise.'];
 d.teaching.phases.apply.model=Object.values(evidence.claimPacket.teacherModel).join(' ');
 d.teaching.phases.apply.move='Use the exact October 16 claim and McGregor investigation shown in Chapter 4. Model one claim–record–limit connection, then students write their short check. Read the poll’s population and dates together before the checkpoint.';
 d.teaching.phases.file.model=evidence.pollCard.teacherModel+' A campaign promise also depends on later decisions by the relevant institutions.';
 d.teaching.phases.file.cut='Omit Push further and further poll comparisons. Read only the prepared poll fields needed for the response. Protect five minutes for the explanation and five for Canvas.';
 e.questions[0].optional=true;e.questions[1].optional=true;
 e.questions[0].text='Optional source-planning note: what do the two sources establish, and what remains unresolved? Your results notebook already supplies this evidence.';
 e.questions[1].text='Optional impact-planning note: identify two possible governing effects and one limit. Reuse these ideas in your final explanation.';
 e.questions[2].text='Explain the 2026 results as of your check time. Use two identified sources, two possible governing effects and a limit, another reasonable interpretation of the governing impact, and one uncertainty. Keep unresolved outcomes conditional.';
 e.questions[2].startHere='As of ____, sources ____ and ____ establish ____. Because / if ____ controls ____, ____ could change. A second effect is ____, but ____ is not guaranteed. Someone could interpret this impact as ____ because ____. We still need to check ____.';
 e.questions[2].length='One concise paragraph, about five sentences, or supported bullets. Reuse your notebook; do not rewrite it first.';
 e.questions[2].checklist=['Identify two sources and the check time.','State accurate outcomes and reporting stages, or keep them unresolved.','Explain two possible governing effects and one limit.','Give another reasonable interpretation of the impact using the same facts.','State an uncertainty or next check.'];
 e.evidenceTask='Use the prepared source route below. The teacher models the House row; complete the Senate row together; verify the Indiana example. Enter a short finding, its reporting stage, and its source in each row. Reuse this notebook in your final explanation.';
 e.successCriteria[2].criteria='I can use two identified sources, give another reasonable interpretation of the governing impact, and state an uncertainty.';
 e.learningTargets[2].target='I can support an explanation with two sources and a fair alternative interpretation of the governing impact.';
 e.sources.push({title:'National Archives: 20th Amendment',url:'https://www.archives.gov/founding-docs/amendments-11-27#xx',note:'Congressional terms ordinarily begin January 3. This establishes the constitutional date, not any election winner.'});
 e.flow.bridges[3]='Your results notebook is your evidence. Rehearse two possible governing effects and one limit. You can use the optional planning space or go straight to the final explanation.';
 e.flow.finish.paragraphs[0]='Start with the sourced outcome and reporting stage. Connect it to two possible governing effects and one limit. Name two sources. Reuse the evidence you already recorded instead of writing a second source report.';
 e.flow.finish.paragraphs[1]='Give another reasonable interpretation of the governing impact using the same established results. This is not an invitation to invent different winners. Finish with an uncertainty or a next check. If control remains unresolved, make your explanation conditional.';
 e.teaching.phases['watch-2'].move='Use the prepared source route. Check the November election label and update time. Model the House row, complete Senate together, and have students verify Indiana. The notebook is the source summary; do not assign an additional required source response.';
 e.teaching.phases['watch-2'].lookFor='The six-entry notebook covers House control, Senate control, and the Indiana example with findings, stages, sources, baseline, and check time. Any unresolved outcome stays unresolved.';
};
