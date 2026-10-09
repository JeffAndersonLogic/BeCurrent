'use strict';

/**
 * Who Has the Power? Video-first pilot for the 2026 midterms.
 * The first topic is live; later topics are explicitly planned, not dead links.
 * The common BeCurrent Desk remains the first 25 minutes of each block.
 */
const meta = {
  unit:'Who Has the Power?',
  unitKey:'midterms',
  code:'WP',
  course:'CURRENT EVENTS',
  renderer:'video-first',
  topics:5,
  reviewed:'2026-10-08',
  overview:'Five blocks investigate how the 2026 congressional elections can change decision-making in Washington, even though the president is not on the ballot. The first block is the video-first pilot.',
  terminalQuestion:'If the president is not on the ballot, why can the midterms change who has power?',
  competencies:{1:'Civic structures',2:'Evidence and sourcing',3:'Cause and effect',4:'Perspective',5:'Reasoned explanation'}
};
const topics = [
  {
    n:1, key:'wp-t01', topic:'Topic 1', page:'block-01.html',
    title:'The Election Nobody Understands', subtitle:'The 2026 midterms: what is actually at stake?',
    overview:'Find out which federal offices are on the ballot, how House and Senate elections differ, and how an election can change the balance of power without changing the president.',
    inClass:'The Desk (25 minutes), a short hook, a captioned Congress explainer, interactive House/Senate sort, a 2026 reporting clip, and a short evidence-based Canvas filing.',
    learningTargets:[
      {skill:'Civic structures',target:'I can explain what a midterm election changes and what it does not.'},
      {skill:'Comparison',target:'I can distinguish House elections from Senate elections.'},
      {skill:'Cause and effect',target:'I can explain one way a changed congressional majority could affect government decisions.'}
    ],
    successCriteria:[
      {skill:'Civic structures',criteria:'I can identify the president as not up for election and describe the congressional races.'},
      {skill:'Comparison',criteria:'I can correctly sort facts about House and Senate elections.'},
      {skill:'Evidence',criteria:'I can use one verified fact to explain why the election matters.'}
    ],
    videos:[
      {source:'Crash Course Government & Politics',title:'The Bicameral Congress',duration:'9:05',url:'https://www.youtube.com/watch?v=n9defOwVWS8',captions:true,purpose:'See why the House and Senate are different.'},
      {source:'WFYI / PBS Simple Civics',title:'Members of Congress',duration:'1:09',url:'https://www.pbs.org/video/members-of-congress-lswvi8/',captions:true,purpose:'Reinforce the two chambers and the meaning of majority.'},
      {source:'PBS NewsHour',title:'Primaries in key states begin to shape the midterm matchups',duration:'5:03',url:'https://www.youtube.com/watch?v=-KybeyFYqY4',captions:true,purpose:'Connect the structures to real reporting from 2026.'}
    ]
  },
  {n:2,key:'wp-t02',topic:'Topic 2',title:'The Battle for Congress',subtitle:'How majorities shape decisions',overview:'Investigate the House and Senate majorities and what each chamber can do.',status:'planned'},
  {n:3,key:'wp-t03',topic:'Topic 3',title:'The Power to Stop a President',subtitle:'Checks, oversight, and legislation',overview:'Examine what Congress can and cannot do when it disagrees with a president.',status:'planned'},
  {n:4,key:'wp-t04',topic:'Topic 4',title:'The Fight for Your Vote',subtitle:'Messages, ads, and evidence',overview:'Evaluate how campaigns frame the issues and how to check political claims.',status:'planned'},
  {n:5,key:'wp-t05',topic:'Topic 5',title:'Election Night: What Happens Next?',subtitle:'Results, uncertainty, and governing',overview:'Compare the possible institutional consequences, then revisit the question after results are official.',status:'planned'}
];
module.exports = { meta, topics };
