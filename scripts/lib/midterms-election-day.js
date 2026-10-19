'use strict';
// Election Day, November 3, 2026: a viewing day, not a sixth topic.
// The class watches live television coverage while the polls are still open, so
// nothing on this page can report a 2026 result, and nothing does. The page is the
// student's guide to the coverage and a paper viewing log they keep for Topic 5.
// build-midterms.js renders it to midterms/election-day.html; the TODAY board and
// the Canvas calendar event read the same object. Edit here, then rebuild.
const S=(title,url,note)=>({title,url,note});
module.exports={
 code:'ED',key:'wp-election-day',topic:'Election Day',page:'election-day.html',date:'2026-11-03',
 reviewed:'2026-10-19',
 // Canvas calendar event wording. The event title itself lives in build-canvas-events.js.
 canvasLink:'The Election Day viewing guide',
 canvasNote:'Today is on paper. Keep your viewing log: you will use it on Thursday in Topic 5.',
 title:'Election Day: What Can We Know Today?',
 subtitle:'Watching live coverage while the polls are open',
 overview:'Watch live Election Day coverage, learn how a vote becomes a result, and log what the coverage can and cannot tell us while the polls are still open. Keep your log for Thursday.',
 question:'The polls are still open while we watch. What can the coverage tell us today, and what can nobody know yet?',
 learningTargets:[
  {skill:'Civic structures',target:'I can explain the steps from casting a ballot to a certified result.'},
  {skill:'Sourcing',target:'I can sort what the coverage reports into how voting works, reports from polling places, voter surveys, predictions, and claims to check.'},
  {skill:'Evidence',target:'I can explain why no 2026 winner can be known while the polls are open.'}
 ],
 successCriteria:[
  {skill:'Civic structures',criteria:'I can put polls open, polls close, unofficial count, news call, and certification in the right order.'},
  {skill:'Sourcing',criteria:'I can log at least four things the coverage said, each with a time, an outlet, and the kind of statement it is.'},
  {skill:'Evidence',criteria:'I can name one thing the coverage established today and one thing that will have to wait, and say what would settle it.'}
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
 logRows:6,
 closing:[
  {id:'established',text:'Name one thing the coverage established today. How do you know it is true?',startHere:'The coverage established that ____. I know because ____ (who reported it, and how they knew).'},
  {id:'waiting',text:'Name one thing nobody can know yet. What would settle it, and when?',startHere:'Nobody can know ____ yet. It will be settled when ____.'}
 ],
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
  story:'The class watches live coverage while every polling place in the country is still open, so the coverage cannot know any winners and neither can we. That is the lesson: students learn to hear the difference between a fact about voting, a report from a polling place, a voter survey, a prediction, and a claim that needs checking. The log they keep becomes the starting point for Topic 5 on Thursday.',
  coverage:'Choose straight news coverage before class (a national network’s daytime election coverage, PBS, C-SPAN, or an Indianapolis station) and check that it is airing. Avoid opinion panels as the main feed. If a commentator predicts a winner, use it: it is a clean example of a prediction.',
  pauses:'Pause the coverage about every ten minutes. Think aloud as you sort one statement into its kind on the board, then give students a minute to log their own. Read two or three logs aloud with names removed. No student reports out.',
  fallback:'If no live coverage is airing, use the two Topic 5 clips (how race calls work, and how voting machines are checked) and have students log statements from those instead.',
  afterLunch:'After lunch: CNN 10 if an episode is posted, then return to the coverage. There is no Desk filing today; the coverage is today’s news.',
  listenFor:'Students who log a prediction as a fact, or who think an early lead is a result. Correct by asking: has a single vote been counted yet?',
  avoid:'Do not ask students who they or their families support. No prefilled winners, no predictions from the teacher, and no student presenting.'
 }
};
