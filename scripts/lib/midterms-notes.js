'use strict';
// Note-taking slides for the Midterms projector (Jeff, 2026-10-20): students copy
// notes off the screen while the teacher projects to the whole room.
//
// Every fact here is restated from what the student lesson already teaches:
// midterms-readings.js, the topic `background` in unit-content/midterms.js, and the
// clip takeaways in midterms-revision.js. Nothing is added that a student page does
// not say, and Topic 5 explains reporting methods only: no 2026 winner, total or
// projection appears here, ever.
//
// Shape: `after` is the activity slide a notes slide follows. Each slide is a
// headline question, three to five short bullets, and one `write` line that every
// student copies. No minute counts and no presenting language: this is projector text.
const N=(after,title,bullets,write)=>({after,title,bullets,write});
module.exports={
 1:[
  N('direction','Why does an election without a president still matter?',[
   'The president leads the executive branch. Congress has its own powers.',
   'Congress considers laws, decides spending through legislation, and checks government actions.',
   '“Midterm” describes the timing: halfway through a four-year presidential term.',
   'It does not mean the offices on the ballot have less power.'],
   'Voters can change Congress in a midterm while the president stays in office.'),
  N('watch-1','Congress has two chambers',[
   'Congress is the House of Representatives and the Senate together.',
   'House: 435 voting members. Each one represents a district.',
   'A state’s population sets how many House seats it has.',
   'Senate: every state has two senators, no matter its population.'],
   'Congress = the House + the Senate.'),
  N('watch-1','Why do House and Senate elections look different?',[
   'House terms last two years, so all 435 voting seats are elected every two years.',
   'Senate terms last six years and are staggered in three groups.',
   'Only about one-third of Senate seats have regular elections in a given cycle.',
   'Special elections can add more Senate races.',
   'On November 3, 2026, voters choose members of Congress, not a president.'],
   'The whole House is on the ballot every two years. Only about one-third of the Senate is.'),
  N('investigate','What is a fact, and what is still a prediction?',[
   'A source can establish one fact without answering everything.',
   'The FEC can establish the election date. It cannot report winners before the election.',
   'A primary usually helps choose a party’s nominee. The general election chooses who holds the office.',
   'A primary win or a favorable poll does not establish a November winner.'],
   'Name the source and the exact fact it supports. Outcomes nobody knows yet stay unknown.'),
  N('watch-2','What could a new House majority change?',[
   'New members can bring different chamber leaders and committee chairs.',
   'Those leaders influence which bills and investigations get attention.',
   'A new House majority does not replace the president.',
   'It does not make every proposal a law: the Senate and the president still have roles.'],
   'Every change in power has a limit. Name the change and name the limit.'),
  N('apply','From voters to decisions',[
   'Voters choose representatives and senators in separate elections.',
   'The winners decide who sits in each chamber.',
   'Membership decides who organizes each chamber.',
   'Leaders decide which issues get priority.'],
   'Voters → seats → leaders → priorities. A new priority is not a guaranteed law.')
 ],
 2:[
  N('direction','How can one race matter to the whole House?',[
   'Each House district elects one representative.',
   'There is no single nationwide vote that awards seats to a party.',
   'After every race is counted, total membership decides which party organizes the House.',
   'Our class model has 435 filled seats and two groups. It is practice, not real 2026 totals.'],
   'Separate district races add up to a majority. In our model, 218 of 435 seats is a majority.'),
  N('watch-1','What does the majority get to do?',[
   'The majority generally organizes the chamber and chooses its leaders.',
   'The House elects the Speaker.',
   'Majority and minority leaders help their groups plan and respond to the other side.',
   'Leaders set the agenda: the issues and proposals that get priority.'],
   'Controlling the House schedule is real power, even when leaders cannot guarantee a final vote.'),
  N('investigate','What is a committee?',[
   'A committee is a smaller working group focused on certain subjects.',
   'Committees study issues, question officials and experts, and consider bills.',
   'They let Congress work on many subjects at the same time.',
   'The majority controls committee leadership.'],
   'Much of Congress’s work happens in committees before the full chamber votes.'),
  N('watch-2','Why can a committee change a bill’s chances?',[
   'A committee chair influences which issues get attention.',
   'If a proposal never moves forward, the full chamber may never vote on it.',
   'This happens before the final floor vote, the moment usually shown in headlines.'],
   'A bill can stop in committee before the whole chamber ever votes on it.'),
  N('watch-2','Does controlling the House mean controlling the government?',[
   'The Senate is separate and has its own rules.',
   'A bill ordinarily needs the same text passed by both chambers before the president acts.',
   'The Senate has 100 seats. 51 is an outright majority.',
   'In a Senate split 50 to 50, the vice president can break ties.',
   'House races are by district. Senate races are statewide.'],
   'Winning one chamber is not the same as passing a law.'),
  N('apply','Explain the power shift',[
   'One race changes one seat.',
   'Enough seats change the majority.',
   'A new majority can bring new leaders, committee chairs, and a new agenda.',
   'The Senate, the president, and individual votes still shape the outcome.'],
   'One seat → a majority → leaders and agenda. A new priority is not automatically a new law.')
 ],
 3:[
  N('direction','Why can a president face resistance from Congress?',[
   'An election does not give one person every governing power.',
   'The president leads the executive branch. Congress has legislative responsibilities.',
   'Divided government: different parties control the presidency and at least one chamber.',
   'Disagreement can also happen inside a single party.'],
   'First ask: which institution has the power to take this action?'),
  N('watch-1','How does Congress check the president?',[
   'Lawmaking: Congress considers and passes laws.',
   'Spending: Congress decides federal spending through laws.',
   'Oversight: hearings and investigations ask officials to explain decisions.',
   'Confirmations: the Senate confirms many presidential nominees.'],
   'Name the specific check: laws, spending, oversight, or confirmation.'),
  N('watch-1','What can oversight do, and what can’t it do?',[
   'Oversight means Congress examining how government uses its authority.',
   'Hearings can establish facts and bring out information.',
   'An investigation does not prove wrongdoing by itself.',
   'A new majority does not remove a president. Impeachment and conviction are separate processes.'],
   'Oversight gathers evidence. It is not proof.'),
  N('investigate','How does a bill become a law?',[
   'The House and the Senate must ordinarily pass the same bill.',
   'If they pass different versions, the differences must be resolved.',
   'Then the president can sign the bill or veto it.',
   'Congress can override a veto with two-thirds support in each chamber.'],
   'One chamber cannot ordinarily make a law alone.'),
  N('watch-2','How can a check be useful and frustrating?',[
   'Scrutiny can uncover problems, such as waste, and improve a proposal.',
   'Delay can create costs for people waiting for a service.',
   'Divided government can bring accountability and compromise, or delay and stalemate.',
   'None of these follows automatically from a party label.'],
   'Judge a check by its evidence: what it reveals, how long it delays, and who is affected.'),
  N('apply','How to make a strong judgment',[
   'Name the check being used.',
   'Explain what it can accomplish.',
   'Recognize its cost or limit.',
   'Explain fairly why someone could reach another judgment.'],
   'Divided government can improve accountability and make governing harder at the same time.')
 ],
 4:[
  N('direction','Why do campaigns run ads?',[
   'Campaigns compete for attention and votes.',
   'An ad chooses a few images, stories, facts, or feelings.',
   'Choosing what to emphasize is framing.',
   'We investigate claims, not which candidate to support.'],
   'A campaign ad is persuasion, not independent proof.'),
  N('watch-1','How do campaign messages work?',[
   'A memorable message uses words, images, and emotions.',
   'Notice who is speaking and who paid for the ad.',
   'Identify one exact claim that evidence could check.',
   'A second copy of the same claim is not a second source.'],
   'A checkable claim needs a relevant independent source.'),
  N('watch-1','Which information counts as evidence?',[
   'Ad text: what a campaign wants viewers to hear.',
   'Budget record: what a government analysis projects.',
   'Official record: what the government actually did.',
   'Fact-check: independent reporting and its sources.'],
   'Different sources answer different questions.'),
  N('investigate','Questions 4–6: examine the ads',[
   'Read Ad A and Ad B before the evidence.',
   'What message does each sponsor emphasize?',
   'What audience or emotion is being targeted?',
   'Write one claim and the record that could test it.'],
   'Observe first. Verify second.'),
  N('watch-2','Question 7: check the same law',[
   'The law created a five-year rural-health fund.',
   'It also changes longer-term Medicaid spending.',
   'Different amounts describe different purposes and periods.',
   'Hospital risk is not a confirmed number of closures.'],
   'An incomplete ad can use a real fact but omit context.'),
  N('apply','Question 8: know the evidence limit',[
   'A poll estimates what a sample thinks at one time.',
   'A promise describes what a candidate wants to do.',
   'A certified result reports completed official counting.',
   'Answer Question 8 and file all eight answers in Canvas.'],
   'Polls and promises are not certified results.')
 ],
 5:[
  N('direction','Why might some results not be final yet?',[
   'Reporting develops as ballots are counted and officials check the totals.',
   'A close race can stay unresolved after other races are called.',
   'Record when you checked and which source you used.',
   'If a later update changes a finding, explain what new information appeared.'],
   'Name the uncertainty. Never fill the gap with a guess.'),
  N('watch-1','The four stages of election reporting',[
   'Poll or forecast: estimates opinion before voting ends.',
   'Unofficial count: ballots counted so far. It can change as more are added.',
   'News race call: a news organization’s conclusion from counted votes and analysis.',
   'Certified result: the official sign-off by election authorities after the canvass.'],
   'Keep the source and the stage attached to every result.'),
  N('investigate','How do separate races decide control of a chamber?',[
   'Control depends on who wins enough seats, not on one dramatic race.',
   'House and Senate outcomes can differ.',
   'Name your baseline: the outgoing Congress or a previous election. Do not mix them.',
   'Some races may still be unresolved when we meet.'],
   'A claim about chamber control needs evidence about enough seats.'),
  N('watch-2','When do results start changing government?',[
   'Winning on Election Day and starting a term are different moments.',
   'Newly elected members ordinarily begin their terms on January 3, 2027.',
   'Until then, the outgoing Congress still has responsibilities.',
   'Once the new members organize, leadership and committees can change.'],
   'Election Day does not instantly replace Congress.'),
  N('watch-2','What can a change in control affect?',[
   'Who leads each chamber and its committees.',
   'Which issues get priority.',
   'Oversight of the executive branch.',
   'It does not automatically turn campaign promises into laws.'],
   'If control is still unresolved, explain it as a condition: “If ___ controls ___, then ___ could ___.”'),
  N('apply','Build an explanation that can survive an update',[
   'Start with the sourced outcome and its reporting stage.',
   'Connect it to two possible governing effects and one limit.',
   'Give another reasonable interpretation using the same results.',
   'Finish with an uncertainty or your next check.'],
   'Use “has” for an established outcome and “could” for a possible effect.')
 ]
};
