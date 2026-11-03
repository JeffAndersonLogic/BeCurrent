'use strict';
// Election Day, November 3, 2026: a viewing day, not a sixth topic.
// The class watches live television coverage while the polls are still open, so
// nothing on this page can report a 2026 result, and nothing does. The page is the
// student's guide to the coverage: two short clips, then live coverage.
// build-midterms.js renders it to midterms/election-day.html; the TODAY board and
// the Canvas calendar event read the same object. Edit here, then rebuild.
const S=(title,url,note)=>({title,url,note});
module.exports={
 code:'ED',key:'wp-election-day',topic:'Election Day',page:'election-day.html',date:'2026-11-03',
 reviewed:'2026-11-03',
 // Canvas calendar event wording. The event title itself lives in build-canvas-events.js.
 canvasLink:'The Election Day viewing guide',
 // Today's one Canvas submission. Its own page, content and Canvas assignment: midterms-ballot.js.
 assignment:require('./midterms-ballot'),
 title:'Election Day: What Can We Know Today?',
 subtitle:'Watching live coverage while the polls are open',
 overview:'Watch two short clips and live Election Day coverage, learn how a vote becomes a result, and sort what the coverage can and cannot tell us while the polls are still open.',
 question:'The polls are still open while we watch. What can the coverage tell us today, and what can nobody know yet?',
 learningTargets:[
  {skill:'Civic structures',target:'I can explain the steps from casting a ballot to a certified result.'},
  {skill:'Sourcing',target:'I can sort what the coverage reports into how voting works, reports from polling places, voter surveys, predictions, and claims to check.'},
  {skill:'Evidence',target:'I can explain why no 2026 winner can be known while the polls are open.'}
 ],
 successCriteria:[
  {skill:'Civic structures',criteria:'I can put polls open, polls close, unofficial count, news call, and certification in the right order.'},
  {skill:'Sourcing',criteria:'I can name the kind of statement for things I hear in the coverage, and spot a prediction.'},
  {skill:'Evidence',criteria:'I can explain why a race call and an early lead are not the official result.'}
 ],
 hero:'i-voted-day',
 // The order a vote travels. `when` is plain timing, never a result.
 steps:[
  ['Polls open','6 a.m. local time in Indiana. Early in-person voting ended Monday, November 2.'],
  ['Voting all day','Indiana voters show a photo ID issued by Indiana or the U.S. government. A voter without one can cast a provisional ballot and has ten days to show ID to the county election board.'],
  ['Polls close','6 p.m. local time in Indiana. Anyone already in line at 6 p.m. still gets to vote. Polls in most other states close later into the night.'],
  ['Unofficial counts appear','After polls close, election offices post partial totals. Different kinds of ballots are counted at different times, so an early lead can shrink or flip.'],
  ['News organizations call races','A call is a news organization’s conclusion that one candidate is the winner, based on counted votes and its analysis. Some races are too close to call for days.'],
  ['Canvass and certification','Over the next days and weeks, officials check the totals, add eligible provisional ballots, and certify the official result.'],
  ['New Congress','The members elected today ordinarily take office on January 3, 2027. Election Day does not instantly change Congress.']
 ],
 terms:[
  ['Turnout','How many eligible people voted. During the day, coverage can only report early signs, like lines or check-in numbers.'],
  ['Provisional ballot','A ballot set aside until officials confirm the voter is eligible. It is counted later, if it qualifies.'],
  ['Voter survey','Questions asked of people who voted. It describes what voters say. It is not a count of votes.'],
  ['Unofficial count','Partial totals posted on election night. Unofficial means not yet checked and certified.'],
  ['Race call','A news organization’s conclusion about a winner. It is not the official result.'],
  ['Too close to call','The counted votes so far do not support calling a winner. It is a normal outcome, not a sign of a problem.']
 ],
 // The five kinds of statement students sort while they watch.
 kinds:[
  ['How voting works','A fact about the rules or the process. Example: when polls close in a state.'],
  ['From a polling place','A reporter describes what is happening somewhere: lines, weather, a broken machine, a quiet room.'],
  ['Voter survey','What voters told a survey about themselves or the issues. Not a vote count.'],
  ['Prediction or opinion','What someone thinks will happen or should happen. Nobody can check it until the votes are counted.'],
  ['Claim to check','A statement about a problem or a rumor. Wait for election officials or independent reporting before you believe it.']
 ],
 bigIdea:'While the polls are open, election offices do not report vote counts, and news organizations do not call a state’s races until its polls have closed. Anything during class that sounds like a 2026 winner is a prediction, an opinion, or a mistake.',
 // Jeff, 2026-11-03: the paper viewing log and the closing questions were removed.
 // The day opens with two short clips, then live coverage; links open in a new tab.
 intro:{
  title:'Start here: two short clips',
  text:'Watch these before the live coverage. Each one explains something you will hear tonight.',
  clips:[
   {title:'Which states could give an early indication of Election Day result trends?',url:'https://youtu.be/5-nIBAzdzWw',source:'NewsNation',date:'November 3, 2026',duration:'4:23',prompt:'Which states does the reporter say to watch first? Is each thing he says a fact about voting or a prediction?'},
   {title:'Inside the Associated Press’s process for calling election races',url:'https://youtu.be/6P5gYWJ1MGI',source:'PBS NewsHour',date:'November 2, 2026',prompt:'What does the Associated Press need to see before it calls a race? Is a call the official result?'}
  ]
 },
 live:{
  title:'Watch live coverage',
  text:'Your teacher will put one of these on the screen. Both are 24-hour live news streams, so they may cover other stories too.',
  clips:[
   {title:'ABC News Live: 24/7 news, context and analysis',url:'https://youtu.be/KQhNZQ_Uag8',source:'ABC News',live:true,prompt:'Listen for the five kinds of statement. Which things you hear are predictions?'},
   {title:'Breaking News and Top Stories on CBS News 24/7',url:'https://www.youtube.com/watch?v=74WjpIH4jeE',source:'CBS News',live:true,prompt:'Listen for the five kinds of statement. Which things you hear are reports from polling places?'}
  ]
 },
 tonight:{
  title:'If you watch tonight (optional)',
  text:'Nobody has to watch at home. If you do, write down the time you check, the source, and what stage the result is at. On Thursday, in Topic 5, we open the results together.',
  race:'Our shared nearby race is Indiana’s Fourth District, U.S. House. Look it up after 6 p.m. and note whether it is a count, a call, or still unresolved.'
 },
 sources:[
  S('Indiana Election Results: the state’s official results portal','https://enr.indianavoters.in.gov/site/index.html','Choose the November 3, 2026 general election. Totals start appearing after polls close, and every election-night total is unofficial.'),
  S('Election Assistance Commission: results and certification','https://www.eac.gov/election-officials/election-results-canvass-and-certification','How unofficial totals, the canvass, and certification fit together.'),
  S('Associated Press: 2026 elections','https://apnews.com/projects/elections-2026/','Independent reporting and named race calls. A call is not certification.')
 ],
 // Teacher-only. Reaches the teaching guide, never the student page.
 teacher:{
  story:'The class watches live coverage while every polling place in the country is still open, so the coverage cannot know any winners and neither can we. That is the lesson: students learn to hear the difference between a fact about voting, a report from a polling place, a voter survey, a prediction, and a claim that needs checking. Topic 5 on Thursday opens the results.',
  coverage:'Choose straight news coverage before class (a national network’s daytime election coverage, PBS, C-SPAN, or an Indianapolis station) and check that it is airing. Avoid opinion panels as the main feed. If a commentator predicts a winner, use it: it is a clean example of a prediction.',
  pauses:'Pause the coverage about every ten minutes. Think aloud as you sort one statement into its kind on the board. Nothing is written down; students sort silently in their heads. No student reports out.',
  fallback:'If a live stream is not airing election coverage, switch to the other stream, or replay the two opening clips and sort the statements in those.',
  afterLunch:'After lunch: CNN 10 if an episode is posted, then return to the coverage. There is no Desk filing today; the coverage is today’s news. The ballot assignment is today’s one Canvas submission.',
  listenFor:'Students who treat a prediction as a fact, or who think an early lead is a result. Correct by asking: has a single vote been counted yet?',
  avoid:'Do not ask students who they or their families support. No prefilled winners, no predictions from the teacher, and no student presenting.'
 }
};
