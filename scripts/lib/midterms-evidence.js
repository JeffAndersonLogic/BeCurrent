'use strict';
// Guided, dated evidence for the midterms investigation. No November winners are prefilled.
// Verified 2026-10-19 against the publishers and official records linked below.
const reviewed='2026-10-19';
const source=(title,url,date,note)=>({title,url,date,note,reviewed});

const claimPacket={
  title:'A real claim: equipment trouble or deliberate interference?',
  label:'Guided check / real campaign rhetoric reported October 16, 2026',
  exactClaim:'They were broken purposely, and you couldn’t vote.',
  attribution:'President Donald Trump, discussing the 2022 Arizona election in a rally excerpt carried by PBS NewsHour on October 16, 2026.',
  context:'The report is current campaign coverage; the event being described happened in 2022. We are checking this specific statement, not deciding which party a student should support.',
  source:source('PBS NewsHour: rally statement and fact check','https://www.pbs.org/video/rally-rhetoric-1792182521/','2026-10-16','Read the transcript passage beginning with the Arizona governor’s race. This source establishes the attributed statement and provides a reporter’s explanation.'),
  recordSource:source('Ruth McGregor: independent Maricopa County printer investigation','https://www.maricopa.gov/DocumentCenter/View/82599/Maricopa-Election-Report-and-Attachments','2023-04-10','Read printed pages 2–3, the opening summary and page 2 footnote. The county commissioned the review; its author was a former Arizona Supreme Court chief justice. It is a separate investigation, not a second copy of the PBS report.'),
  evidence:[
    {title:'What the technical review found',text:'Tests linked the printing failures to a difficult combination of ballot size, heavier paper, and printer capability. The investigators tested 9,100 ballots. This supplies an equipment explanation rather than evidence that someone deliberately broke machines.',locator:'McGregor report, printed pages 2–3 / Summary'},
    {title:'What happened to affected ballots',text:'The report’s page 2 footnote explains that unreadable ballots could be sent for central counting or copied onto readable ballots by a bipartisan board and counted. It cites court proceedings concerning those votes.',locator:'McGregor report, printed page 2 / footnote 1'},
    {title:'Keep the conclusion narrow',text:'Printer failures and delays were real. Those problems alone do not establish deliberate interference or that ballots could not be counted. This short record does not describe every voter’s individual experience.',locator:'Compare the exact claim with the investigation’s scope'}
  ],
  steps:[
    'Underline the two things the speaker claims: deliberate damage and inability to vote.',
    'Match each part to a finding in the investigation. Name the document rather than saying “the internet.”',
    'Choose supported, contradicted, or not established by this evidence. Explain a limit; do not give both claims equal weight without evidence.'
  ],
  prompt:'What does the investigation establish about the printer problem, and which part of the rally claim does it fail to support? Name the claim source, the record, and one limit.',
  startHere:'The October 16 PBS report attributes the claim to ____. The McGregor investigation found ____. This does not support ____. The short record cannot tell us ____.',
  teacherModel:{claim:'The rally statement alleges intentional breakage and inability to vote.',evidence:'The technical investigation describes equipment limits and procedures for counting affected ballots.',judgment:'The supplied record does not support the allegation of deliberate interference; its counting evidence contradicts the blanket claim that the printer problem made voting impossible.',limit:'A technical review and its cited court finding do not narrate every voter’s experience or prove that every election everywhere is free of mistakes.'},
  teacherNote:'Use the short text packet as the core task. The full PBS report also covers immigration, violent rhetoric about leakers, and other controversies; do not require the entire report to check this one claim. Apply the same claim–record–limit test to any party. Students do not have to share political beliefs.'
};

const pollCard={
  title:'Read a real poll: a snapshot, not a seat count',
  kind:'Real 2026 survey / dated classroom example',
  released:'2026-10-08',
  fieldDates:'September 28–October 4, 2026',
  sponsor:'Pew Research Center',
  pollster:'SSRS conducted interviews for Pew Research Center',
  population:'Registered voters across the United States',
  sample:'3,917 registered voters within a survey of 5,062 adults',
  method:'A randomly recruited national panel; interviews were online or by telephone, with weighting.',
  question:'If the election were held then, which U.S. House candidate in their district would respondents choose? Candidate names and parties were shown in most districts.',
  results:[{label:'Democratic candidate',percent:44},{label:'Republican candidate',percent:36},{label:'Another candidate',percent:5},{label:'Not sure',percent:15}],
  uncertainty:'The registered-voter sample has a margin of sampling error of ±1.8 percentage points at 95% confidence. Wording, nonresponse, and later turnout can add uncertainty. This is not an error band for the number of seats won.',
  source:source('Pew: October 2026 House vote preferences','https://www.pewresearch.org/politics/2026/10/08/midterm-vote-preferences-by-race-and-ethnicity-age-and-other-demographics/','2026-10-08','Use the all-registered-voters row. This is national survey evidence, not an Indiana district poll or an election result.'),
  methodSource:source('Pew: survey methods and subgroup error table','https://www.pewresearch.org/politics/2026/10/08/midterms-2026-methodology/','2026-10-08','The registered-voter row is n=3,917 and ±1.8 points. The full-adult sample’s ±1.6 points does not belong to that subgroup.'),
  prompts:['What population and dates does this snapshot describe?','Can these percentages establish the winner in Indiana’s Fourth District or which party wins 218 House seats? Explain why.'],
  teacherModel:'The poll describes a national registered-voter preference during its field period. Separate district elections award House seats; this survey cannot establish an Indiana district winner, turnout, or November chamber control.'
};

const raceCard={
  title:'Follow one nearby race: Indiana’s Fourth District',
  office:'United States Representative, Fourth District',
  election:'November 3, 2026 general election',
  candidates:[{name:'Drew Cox',party:'Democratic'},{name:'Jim Baird',party:'Republican'},{name:'David E. Bokash',party:'Write-In (Independent)'}],
  status:'Candidate list checked October 19, 2026. These are candidates, not declared November winners.',
  localNote:'This is a shared nearby example. It may not be every student’s home district. No home address or family voting choice is needed.',
  stakes:'The winner fills one House seat. House members vote on federal laws and spending, serve on committees, and provide oversight. One winner does not alone determine chamber control or enact a promised policy.',
  issue:'Use federal spending as the recurring issue: how could a House member influence funding decisions affecting communities, and what agreement would still be needed? This is an institutional question, not a claim that the candidates hold identical positions.',
  source:source('Indiana Election Division: official general-election candidate list','https://www.in.gov/sos/elections/files/Candidate_List_Abbreviated_20260922_011251PM.xlsx','2026-09-22','Official file linked from the state’s Candidate Information page; read the United States Representative, Fourth District rows. The date identifies the file version.'),
  landingSource:source('Indiana Election Division: candidate information','https://www.in.gov/sos/elections/candidate-information/','2026-10-19','Open the 2026 General Election Candidate List if the direct file is replaced. Recheck names before teaching.'),
  roleSource:source('U.S. House: the legislative process','https://www.house.gov/the-house-explained/the-legislative-process','2026-10-19','Official reference for bills, committee work, passage, and presidential action; check date, not publication date.'),
  promptsByTopic:{1:'Which office is being elected here, and which chamber does it belong to?',2:'How could this one seat contribute to a majority without deciding it alone?',3:'How could the winner influence spending or oversight, and what could the winner not do alone?',4:'What evidence would establish a campaign’s claim about the candidate’s voting record?',5:'What do the current official result and reporting stage establish about this race?'}
};

const baseline={
  title:'Before the election: the dated starting point',
  asOf:'2026-10-19',
  congress:'119th Congress, 2025–2027',
  house:'Republicans organize the House majority.',
  senate:'Republicans organize the Senate majority.',
  note:'This records current chamber organization, not a 2026 prediction. Recheck before teaching; compare the same starting point with post-election evidence. No live seat totals are inferred here.',
  sources:[source('U.S. House: current leadership','https://www.house.gov/leadership','2026-10-19','The Republican leadership includes the House majority leader. Date is the check date.'),source('U.S. Senate: current leadership and officers','https://www.senate.gov/senators/leadership.htm','2026-10-19','The Republican leadership includes the Senate majority leader. Date is the check date.')]
};

const resultsSources=[
  source('Indiana: current official election-results portal','https://enr.indianavoters.in.gov/site/index.html','2026-10-19','Teacher: select the November 3, 2026 general election and the Fourth District race when available. A May primary chooses nominees and cannot establish the November winner. Capture the election label, update time, and stage.'),
  source('Associated Press: 2026 elections and chamber reporting','https://apnews.com/projects/elections-2026/','2026-10-19','Teacher: select November general-election House and Senate reporting. Record check time, unresolved seats, and whether control is reported. A news call is not official certification.'),
  source('Election Assistance Commission: counts, canvass, and certification','https://www.eac.gov/election-officials/election-results-canvass-and-certification','2026-07-30','This explains the reporting stages; it does not supply nationwide winners. A 100%-precincts-reporting label can still describe unofficial totals.')
];

module.exports={reviewed,claimPacket,pollCard,raceCard,baseline,resultsSources};
