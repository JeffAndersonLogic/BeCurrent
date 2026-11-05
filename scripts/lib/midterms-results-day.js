'use strict';
// Midterms 6, Election Results: What Happened and Why? Taught Thursday, November 5, 2026.
//
// Jeff, 2026-11-05: today's plan was scrapped and rebuilt. Four clips open the day
// (CNN 10, two analyses of Tuesday night, then ABC News on the races still undecided), students read a plain-language version
// of a PBS NewsHour / Associated Press article about why voters chose Democrats, answer
// ten questions on it, then look up the results on Zionsville's own ballot. Every
// answer is a data-slot, so Gather All My Work carries it into the Canvas Text Entry
// WP6 - Results and Impact with the shared record footer, the same route as every
// other Midterms lesson.
//
// THE ARTICLE IS NOT COPIED. It is copyrighted Associated Press reporting and this site
// is public, so the page carries a summary written for this class in our own words, the
// poll's numbers attributed to it, and a link to the full article. Only single words the
// article itself puts in quotation marks ("crucial", "needed change") are quoted.
//
// NO WINNER IS TYPED HERE for any Boone County or Indiana race. Finding them is the
// assignment, and the answers live in the sources linked below. The national outcome
// (Democrats won the House and the Senate) is stated only as the article reports it.
//
// apply(topic) runs last in unit-content/midterms.js and replaces Topic 5's content in
// place, so the unit page, the TODAY board, the Canvas event and assignment, the lesson
// plan and the Teaching OS all read this lesson. Edit here, then npm run build:midterms,
// node scripts/build-canvas-events.js and node scripts/build-announcements.js.
const LT=(skill,target)=>({skill,target}),SC=(skill,criteria)=>({skill,criteria});
const q=(id,text,startHere,{kind='text',length}={})=>({id,text,startHere,kind,length});
const S=(title,url,note)=>({title,url,note});
const reviewed='2026-11-05';

const lesson={
 key:'wp-t05-results',
 reviewed,
 title:'Election Results: What Happened and Why?',
 subtitle:'Why voters chose what they did, and what happened here at home',
 overview:'Watch CNN 10 and three reports on Tuesday night’s results, read what a survey of voters says about why Democrats won, then look up who won on Zionsville’s own ballot. Gather your answers into Canvas.',
 question:'Why did the 2026 midterms turn out the way they did, and what did voters decide here at home?',
 hook:'What is one thing you have heard about Tuesday’s election results? Where did you hear it?',
 points:5,
 learningTargets:[
  LT('Evidence','I can use facts from a news article to explain why an election turned out the way it did.'),
  LT('Cause and effect','I can explain how voters’ worries about prices, corruption, and checks on power affected their votes.'),
  LT('Sourcing','I can find local and state election results in official sources and say where each one came from.')
 ],
 successCriteria:[
  SC('Evidence','I can answer questions about the article using its numbers and examples in my own words.'),
  SC('Cause and effect','I can explain why something happened in the election, not just what happened.'),
  SC('Sourcing','I can name the winner of a Boone County or Indiana race and the source where I found it.')
 ],
 // Watch together, in this order. Links open in a new tab, never embedded.
 clips:[
  {title:'CNN 10: today’s episode',url:'https://www.cnn10.com/',source:'CNN 10',kind:'News',prompt:'Listen for the election story. What is one result the show reports, and how does it say it knows?'},
  {title:'‘Rewrote the map’: Maddow tallies the stunning scale of Democratic gains',url:'https://www.youtube.com/watch?v=qScvB287kSU',source:'MS NOW',kind:'Analysis by a TV host',prompt:'Rachel Maddow is a host who shares her own point of view. Listen for the difference between a fact (a number or a result) and her opinion about what it means.'},
  {title:'A blue tsunami carries Democrats to House, Senate control in 2026 midterm elections',url:'https://www.youtube.com/watch?v=KoW4tC_xoYg',source:'CBS Mornings',kind:'News report',prompt:'Listen for one reason the reporters give for why voters chose Democrats. You will check that reason against the article.'},
  // Jeff, 2026-11-05: added to the opening videos.
  {title:'All eyes on the undecided Senate races in Alaska and Mississippi',url:'https://www.youtube.com/watch?v=AW1a3Sz2KZ8',source:'ABC News',kind:'News report',prompt:'Two Senate races are still too close to call. Which states are they, and why can nobody say who won yet?'}
 ],
 // The plain-language version. Our words; the article's numbers, attributed.
 article:{
  headline:'How Trump and Republicans lost the 2026 midterm elections, according to the Associated Press voter poll',
  outlet:'PBS NewsHour',
  byline:'Josh Boak, Hyojin Yoo and Humera Lodhi, Associated Press',
  date:'November 4, 2026',
  url:'https://www.pbs.org/newshour/politics/how-trump-and-republicans-lost-the-2026-midterm-elections-according-to-ap-voter-poll',
  about:'The article is built on the Associated Press Voter Poll, a survey of people who voted in the midterms in all 50 states. It was taken in the two weeks before Election Day and on the day itself. A poll like this asks real voters why they voted the way they did, so it can explain a result instead of guessing at it.',
  outcome:'According to the article, Democrats won control of both the House and the Senate on Tuesday. The article asks why.',
  sections:[
   {n:1,heading:'Rising prices hurt the party in power',paragraphs:[
    'Many voters felt prices going up at the grocery store, at the gas pump, and on their power bills. About 6 in 10 voters said they were “very concerned” about the cost of food.',
    'Voters blamed the president. About two-thirds said President Trump’s policies, such as tariffs (taxes on goods from other countries), had made the economy worse, and about 8 in 10 of those voters chose the Democrat for the U.S. House. Voters also pointed to the war in Iran and to promises to lower prices that had not come true. About two-thirds said the president does not have the right priorities.',
    'This showed up even in Texas, a state Republicans usually win. About 2 in 10 Texas voters said rising prices had caused them “severe” hardship, and about three-quarters of those voters backed the Democrat for Senate, James Talarico.'
   ]},
   {n:2,heading:'Corruption was a big worry',paragraphs:[
    'Corruption means using a government job to help yourself or your friends instead of the public. More than half of voters said corruption was “crucial” to their vote for Congress. That was a little more than the share who said the same about the cost of living.',
    'The article points to examples voters may have had in mind, such as the president making more than $1 billion last year from cryptocurrency.'
   ]},
   {n:3,heading:'Voters want Congress to push back',paragraphs:[
    'In Topic 3 you learned that Congress can check the president: it writes the laws, controls the money, and can investigate. About 7 in 10 voters said Congress is not doing enough to check the president. That included about 4 in 10 Republicans, people from the president’s own party.'
   ]},
   {n:4,heading:'Some Republican candidates were weak',paragraphs:[
    'In the spring primaries, President Trump backed candidates who were loyal to him. In some states that choice backfired.',
    'In Texas, he backed Ken Paxton over Senator John Cornyn in the Republican primary. About two-thirds of Texas Senate voters said Paxton did not have the character to be a senator.',
    'In North Carolina, about 6 in 10 voters said the Republican, Michael Whatley, was “too supportive” of the president. Voters chose Democrat Roy Cooper, a former governor of the state.'
   ]},
   {n:5,heading:'A warning for the winners',paragraphs:[
    'Winning does not mean voters love the Democratic Party. Only about half of voters had a good opinion of it (for Republicans, about 4 in 10). About 2 in 10 people who voted for Democrats still had a bad opinion of the party.',
    'About 2 in 10 voters said neither party was better on the economy, health care, taxes or immigration. The article says Democrats’ lead on the economy is small.',
    'In Maine, voters who wanted “needed change” chose the Democrat, Troy Jackson, over Republican Senator Susan Collins. Many voters were voting for change, not for a party they were excited about.'
   ]}
  ]
 },
 parts:[
  {id:'why',title:'Part 1: Why did Democrats win?',intro:'Use the article above. Answer in one or two sentences, in your own words. Each question tells you which section to look in.',questions:[
   q('wp6-reasons','Section 1 to 4. Name two reasons the article gives for why Republicans lost. Use your own words.','One reason is ____. Another reason is ____.',{length:'One or two sentences.'}),
   q('wp6-groceries','Section 1. About 6 in 10 voters were “very concerned” about grocery costs. Why would worry about prices at the store hurt the president’s party?','Prices hurt the president’s party because voters ____.',{length:'One or two sentences.'}),
   q('wp6-texas','Section 1. Texas usually votes Republican, but Texans hit hardest by rising prices mostly backed the Democrat for Senate. What does that tell you about how much prices mattered this year?','It tells me that prices ____ because ____.',{length:'One or two sentences.'}),
   q('wp6-not-on-ballot','Section 1. The president was not on Tuesday’s ballot. So why did so many voters who disliked his policies vote for a Democrat for Congress?','Voters chose a Democrat for Congress because ____.',{length:'One or two sentences.'}),
   q('wp6-corruption','Section 2. More than half of voters said corruption was “crucial” to their vote, a little more than said that about prices. In your own words, what is corruption, and why might a voter care about it as much as prices?','Corruption is ____. A voter might care because ____.',{length:'One or two sentences.'}),
   q('wp6-checks','Section 3. About 7 in 10 voters said Congress is not doing enough to check the president, including about 4 in 10 Republicans. What does it mean to check the president, and why is it surprising that some Republicans agreed?','To check the president means ____. It is surprising because ____.',{length:'One or two sentences.'}),
   q('wp6-candidate','Section 4. Pick Texas or North Carolina. What did voters think was wrong with the Republican candidate there, and how did backing that candidate hurt Republicans?','In ____, voters thought ____. This hurt Republicans because ____.',{length:'One or two sentences.'})
  ]},
  {id:'warning',title:'Part 2: A warning for the winners',intro:'Use Section 5 of the article. One or two sentences each.',questions:[
   q('wp6-dislike','Only about half of voters had a good opinion of the Democratic Party, and some people who voted for Democrats still disliked it. How can someone vote for a party they do not like?','Someone might vote for a party they do not like because ____.',{length:'One or two sentences.'}),
   q('wp6-neither','About 2 in 10 voters said neither party was better on the economy, and the article says Democrats’ lead on the economy is small. Why should that worry Democrats before the next election?','It should worry Democrats because ____.',{length:'One or two sentences.'}),
   q('wp6-advice','Pretend you are giving advice to Democratic leaders in Congress. Using the article, write one warning they should take seriously over the next two years, and explain why.','My warning is ____. They should take it seriously because the article shows ____.',{length:'Two or three sentences.'})
  ]},
  {id:'local',title:'Part 3: What happened here at home?',intro:'On Tuesday you read the real ballot for one Zionsville precinct. Now find out how those races turned out. Use the result links below and write the source for each answer. A short phrase is enough.',results:true,questions:[
   q('wp6-referendum-zcs','Public Question #3 asked whether to raise property taxes to fund Zionsville Community Schools. Did it pass or fail? Write the YES and NO percentages for Boone County.','It passed / failed. YES ____%, NO ____%. Source: ____.',{kind:'short'}),
   q('wp6-school-board','Pick one of the three Zionsville school board races (At Large, Eagle Township or Union Township). Who won, and what share of the vote did they get?','In the ____ race, ____ won with ____%. Source: ____.',{kind:'short'}),
   q('wp6-county','Pick one Boone County race that had two candidates: County Commissioner District 1, County Council District 1, or Circuit Court Clerk. Who won?','In the ____ race, ____ won. Source: ____.',{kind:'short'}),
   q('wp6-congress','Who won the race for U.S. Representative, Indiana District 4, which includes Zionsville? Boone County is only part of District 4, so use the state results site or the Associated Press for the whole district.','____ won. Source: ____.',{kind:'short'}),
   q('wp6-state','Pick one statewide race: Secretary of State, State Comptroller, or Treasurer of State. Who won across Indiana? Did Boone County vote the same way as the whole state?','____ won statewide. Boone County voted the same way / differently. Sources: ____ and ____.',{kind:'short'}),
   q('wp6-matters','Pick one local or state result you found. Explain one way it could affect students at Zionsville schools or people who live in Boone County.','The ____ result could affect ____ because ____.',{length:'One or two sentences.'})
  ]}
 ],
 // Part 3's links. Checked 2026-11-05: every race Part 3 asks about is in the county file.
 results:{
  note:'Results posted this week are unofficial. They become official when the county and the state certify them later this month. That is why you write down your source.',
  tip:'The Boone County file is a PDF. Press Ctrl and F, then type the name of the race (for example “Zionsville School” or “Public Question”).',
  sources:[
   S('Boone County Clerk: 2026 General Election results','https://boonecounty.in.gov/wp-content/uploads/2026/11/26-General-Summary-Results-Final.pdf','Every race on a Boone County ballot, with the county’s vote totals and percentages. Start here for Questions 11, 12, 13 and 15.'),
   S('Boone County Clerk: election results page','https://boonecounty.in.gov/offices/clerk/election-results-history/','If the link above moves, the county lists its results here.'),
   S('Indiana Election Results: the state’s official results site','https://enr.indianavoters.in.gov/site/index.html','Choose the November 3, 2026 general election. Use it for statewide totals (Question 15) and the whole of District 4 (Question 14).'),
   S('Associated Press: 2026 election results','https://apnews.com/projects/elections-2026/','News organization results and race calls for Indiana and the whole country. A race call is not the official result.')
  ],
  ballot:'reading-a-real-ballot.html',
  ballotNote:'Forgot which races were on the ballot? Look back at Tuesday’s sample ballot.',
  districtNote:'Zionsville is split into many precincts, and some homes are in a different state legislature district than the Eagle 01 ballot. Every question here is about a race every Zionsville voter could see.'
 },
 rubric:[
  {label:'Uses the article',description:'Parts 1 and 2 use the article’s numbers and examples, in your own words.'},
  {label:'Explains why',description:'Answers give a reason (because, so, which led to), not only a fact.'},
  {label:'Finds the results',description:'Part 3 names the results and the source for each one, and keeps unofficial results labeled as unofficial.'}
 ],
 privacy:'Your answers are private. You never have to say how you or your family voted, and nobody is asked to share with the class. Political opinions are not scored; using the evidence is.',
 // Teacher-only. Reaches the Teaching OS and the teaching guide, never the student page.
 teacher:{
  story:'Tuesday the class watched the votes come in; today they find out what happened and why. The clips give the headline, the article gives the reasons from a survey of real voters, and Part 3 brings it home to the races on Zionsville’s own ballot. The through line is sourcing: a TV host’s analysis, a news report, a voter poll and an official county results file are four different kinds of evidence.',
  land:'Election results tell us what happened; a voter survey helps explain why; official results files tell us what happened here.',
  avoid:'Do not ask students how they or their families voted or feel about the result. The MS NOW clip is a host’s analysis with a point of view: name that out loud as a sourcing lesson, not as a side. Score accuracy and reasoning, never a position. Results this week are unofficial until certified.',
  answer:'Parts 1 and 2 have no single answer key: look for the article’s facts in the student’s own words plus a because. Part 3 answers come from the Boone County results file and the state results site; check them against the county file before grading.',
  run:'CNN 10 opens the day, then the two analysis clips back to back. Release students to read the article on their own screens (read-aloud and voice typing are fine), answer Parts 1 and 2, then use the results links for Part 3. Protect the last ten minutes to finish, then Gather All My Work and the Canvas paste.',
  clipNote:'The two YouTube clips’ run times were not checked automatically. Preview them before class and trim if needed. CNN 10 opens the day today, so after lunch go straight to The Desk.',
  timing:{watch:18,read:7,why:12,local:8,file:10},
  phases:{
   watch:{model:'“CBS reports Democrats won both chambers. Maddow says this means ____: that part is her opinion.”',lookFor:'Students separating a reported result from a host’s opinion about it.',cut:'Play CNN 10, the CBS report and the ABC report.',move:'Play the four clips back to back. No writing yet.',reteach:'If most students mix up fact and opinion, pause once and ask: is that a number, or what someone thinks the number means?'},
   read:{model:'Section 1 says about 6 in 10 voters were “very concerned” about food costs.',lookFor:'Students reading all five sections before starting the questions.',cut:'Read Sections 1, 3 and 5 aloud together, then release.',move:'Students read the five short sections on their own screens. Read aloud for anyone who needs it.',reteach:'If most students skim past the numbers, ask for one number from the section and what it measures.'},
   why:{model:'Prices hurt the president’s party because voters blame whoever is in charge when life gets more expensive.',lookFor:'A fact from the article plus a because.',cut:'Require Questions 1, 2, 4, 8 and 10; the rest are welcome.',move:'Circulate. Push for “why”, not just “what”.',reteach:'If most students only restate facts, give the frame: The article says ____. This matters because ____.'},
   local:{model:'Model one lookup on the projector: open the county file, Ctrl+F “Public Question”, and read the YES and NO lines aloud without answering any student question.',lookFor:'A result plus a named source for each answer.',cut:'Require Questions 11, 14 and 16.',move:'Students use the result links. Remind them results are unofficial.',reteach:'If most students cannot find a race, show how to search the PDF for its name with Ctrl+F.'},
   file:{model:'The Canvas submission screen confirms filing.',lookFor:'Canvas confirmation for each student.',cut:'Never cut filing.',move:'Finish any open question, then Gather All My Work, paste into Canvas, submit, and check the confirmation.',reteach:'If most students cannot copy, use the manual-copy box and select all.'}
  }
 }
};

// Replace Topic 5's content in place. The page, the Canvas code (WP5, named WP6 in
// Canvas) and the calendar date stay; everything a student or teacher reads is new.
function apply(t){
 Object.assign(t,{title:lesson.title,subtitle:lesson.subtitle,overview:lesson.overview,question:lesson.question,hook:lesson.hook,
  learningTargets:lesson.learningTargets,successCriteria:lesson.successCriteria,points:lesson.points,rubric:lesson.rubric,
  analysis:lesson,afterElection:true});
 t.teacher={...t.teacher,story:lesson.teacher.story,land:lesson.teacher.land,avoid:lesson.teacher.avoid,answer:lesson.teacher.answer,ask:lesson.question};
 // Every saved answer and every Canvas line is read from the parts below.
 t.questions=lesson.parts.flatMap(p=>p.questions);
 delete t.worksheet;delete t.resultsNotebook;delete t.classClips;
 return t;
}
module.exports={lesson,apply};
