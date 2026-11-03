'use strict';
// Reading a Real Ballot: the Election Day assignment, November 3, 2026.
//
// Students read the real Boone County sample ballot for one Zionsville precinct
// (Eagle 01) and answer twenty short questions, then Gather All My Work into the
// Canvas Text Entry, the same route as every other Midterms lesson.
//
// Every fact a question points at is printed on the ballot itself, pages 186 to 193
// of the county's all-precinct sample ballot. The local copies (eight page images and
// a PDF of those pages) are cut from that file without editing. No answer key lives
// here: this repository is public and served, so the key stays with the teacher.
//
// build-midterms.js renders midterms/reading-a-real-ballot.html from this object, and
// build-canvas-events.js writes the Canvas assignment from the same object, so the
// page and the assignment cannot describe different work. Edit here, then rebuild.
const q=(id,text,startHere,{kind='text',options,length}={})=>({id,text,startHere,kind,options,length});
module.exports={
 code:'WPED',key:'wp-ballot',page:'reading-a-real-ballot.html',
 title:'Reading a Real Ballot',
 subtitle:'Zionsville, Boone County, Indiana / November 3, 2026',
 reviewed:'2026-11-03',
 overview:'Read the real sample ballot for one Zionsville precinct, find the facts printed on it, think about what it asks voters to decide, and plan how you would check a question before voting. Then gather your answers into Canvas.',
 question:'What does a real ballot ask a voter to decide, and what would you need to know first?',
 points:5,
 ballot:{
  precinct:'Eagle 01',
  pages:8,
  images:Array.from({length:8},(_,i)=>({file:`zionsville-eagle-01-page-${i+1}.webp`,w:1020,h:1320,page:i+1})),
  pdf:'../assets/docs/zionsville-eagle-01-sample-ballot-2026.pdf',
  officialUrl:'https://boonecounty.in.gov/wp-content/uploads/2026/09/INBOOG26_AllPcts_InfinityS-1.pdf',
  officialPages:'pages 186 to 193',
  clerkUrl:'https://boonecounty.in.gov/offices/clerk/election-information/',
  note:'This is the ballot for one precinct. Zionsville is split into many precincts (Eagle 01 to Eagle 20, plus parts of Union Township), and some of them list different state legislature or school board races.'
 },
 successCriteria:[
  {skill:'Civic structures',criteria:'I can find the offices, candidates, and public questions printed on a real ballot.'},
  {skill:'Reasoning',criteria:'I can explain why a ballot is mostly local and state offices, and why that matters.'},
  {skill:'Sourcing',criteria:'I can name what I would need to know before voting on a public question, and a trustworthy place to find it.'}
 ],
 parts:[
  {id:'hunt',title:'Part 1: Ballot scavenger hunt',intro:'Every answer is printed somewhere on the ballot. A word or short phrase is enough.',questions:[
   q('ballot-pages','How many pages long is this ballot?','The ballot is ____ pages long.',{kind:'short'}),
   q('ballot-first','What is the very first thing a voter is asked to decide (page 1)? Is it a person or a question?','The first thing is ____. It is a person / a question.',{kind:'short'}),
   q('ballot-parties','Voting "straight party" means picking one party and voting for all of its candidates at once. Name all four parties you can choose.','The four parties are ____, ____, ____, and ____.',{kind:'short'}),
   q('ballot-straight','Straight-party voting does NOT count for two kinds of offices. What are they?','Straight-party voting does not count for ____ and ____.',{kind:'short'}),
   q('ballot-house','Who are the two candidates for U.S. Representative, District 4? Write each name and party.','____ (party) and ____ (party).',{kind:'short'}),
   q('ballot-senate','Look at the federal races. Is there a race for U.S. Senate or President on this ballot?','Choose one.',{kind:'choice',options:['Yes','No']}),
   q('ballot-cost','Public Question #3 is about Zionsville Community Schools. If it passes, how much would the yearly property tax bill go up on a $600,000 home?','$____ per year.',{kind:'short'}),
   q('ballot-last','The same question says when the school corporation last held a property tax referendum. What year was it, and did it pass?','It was in ____, and it ____.',{kind:'short'}),
   q('ballot-unopposed','Find two races where only ONE candidate is running. Write the office for each.','____ and ____.',{kind:'short'}),
   q('ballot-retention','Find the Judicial Retention section on the last page. What two choices does the voter have for each judge?','____ and ____.',{kind:'short'}),
   q('ballot-noparty','Find a candidate in the school board section who has NO political party printed under their name. Write the name.','____.',{kind:'short'}),
   q('ballot-warning','What warning is printed in the top left corner of page 1?','The warning says ____.',{kind:'short'})
  ]},
  {id:'think',title:'Part 2: Think about it',intro:'Answer in one or two sentences.',questions:[
   q('ballot-why-one','Many county offices on this ballot (sheriff, surveyor, assessor, prosecutor) have only one candidate. Give one reason that might happen.','One reason might be ____ because ____.',{length:'One or two sentences.'}),
   q('ballot-congress','Everyone is talking about control of Congress tonight. Which race on this ballot helps decide that? Why does one House seat matter?','The ____ race helps decide control. One seat matters because ____.',{length:'One or two sentences.'}),
   q('ballot-price','Public Question #3 prints an exact dollar amount for a $600,000 home. Why do you think the law requires the ballot to show a real price?','The ballot shows a real price so that voters ____.',{length:'One or two sentences.'}),
   q('ballot-local','Most of this ballot is about county and state offices, not national ones. Pick one local office and explain how it could affect your life more than Congress does.','The ____ could affect my life because ____.',{length:'One or two sentences.'})
  ]},
  {id:'decide',title:'Part 3: Before you decide',skill:'Sourcing',intro:'A voter only sees a few lines of text on the ballot. Good voters find out more before they vote. Choose one public question and answer about it.',questions:[
   q('ballot-pick','Choose one public question.','Choose one.',{kind:'choice',options:['#1 Denying bail for more crimes (state constitution)','#2 Where city and town judges are allowed to live (state constitution)','#3 The Zionsville Community Schools tax referendum']}),
   q('ballot-means','In your own words, what is this question asking voters to decide?','This question asks voters whether ____.',{length:'One or two sentences.'}),
   q('ballot-know','Write two things you would want to know before you voted on it.','1. I would want to know ____. 2. I would want to know ____.',{length:'Two short items.'}),
   q('ballot-source','Where would you look to find a trustworthy answer? Name one source and why you would trust it.','I would look at ____ because ____.',{length:'One or two sentences.'})
  ]},
  {id:'exit',title:'Exit question',intro:'Last one. Then gather your work.',questions:[
   q('ballot-surprise','What is one thing on this ballot that surprised you?','I was surprised that ____.',{length:'One or two sentences.'}),
   q('ballot-confidence','How sure do you feel about reading a ballot now?','Choose one.',{kind:'choice',options:['1 Lost','2 Shaky','3 Getting it','4 Solid','5 Could teach it']})
  ]}
 ],
 rubric:[
  {label:'Finds the facts',description:'Part 1 answers match what is printed on the ballot.'},
  {label:'Explains the ballot',description:'Part 2 answers give a reason tied to the ballot, not a party preference.'},
  {label:'Plans a check',description:'Part 3 names real questions and a trustworthy source for one public question.'}
 ],
 privacy:'Your answers are private. You never have to say how you or your family would vote, and nobody is asked to share with the class. Political preferences are not scored.',
 // Teacher-only. Reaches the teaching guide, never the student page.
 teacher:{
  run:'Open the ballot page on the projector and scroll through the eight pages once so students see a whole real ballot. Then release students to work down the page on their own while the coverage runs or between coverage pauses. Protect the last five minutes for Gather All My Work and the Canvas paste.',
  key:'The answer key is in the teacher document, not in this public repository.',
  avoid:'Do not ask students how they or their families would vote on any race or question. Score accuracy and reasoning, never a position.'
 }
};
