/* BeCurrent / Who Has the Power? / Block 1
 * Single, reviewable source for teacher cockpit and projector.
 * The student investigation remains the existing Canvas-compatible activity.
 * Do not put teacher cues in the projector renderer.
 */
(function(root){
  'use strict';
  const lesson={
    schema:1,
    key:'midterms-block-01',
    title:'The Election Nobody Understands',
    unit:'Who Has the Power?',
    subtitle:'November 2026 · Midterm Elections',
    question:"If the president isn't on the ballot, why can the election change who has power?",
    totalMinutes:90,
    reviewed:'2026-10-09',
    storageKey:'bc-current-control-midterms-01',
    links:{
      desk:'../daily/index.html',
      unit:'../midterms/index.html',
      student:'../midterms/block-01.html',
      iran:'iran-run-of-show.html'
    },
    phases:[
      {
        id:'desk',kind:'news',label:'The Desk',time:'00–25',start:0,minutes:25,
        screen:{eyebrow:'00 / THE DAILY NEWS',title:'First, the world.',description:'The Lead. Your Pick. Two stories worth understanding.',action:{label:'Open The Desk',url:'../daily/index.html'}},
        intel:{land:'Students can say what happened in one significant story and why it matters.',ask:'Which story deserves our attention today—and why?',listenFor:'A specific event and a clear consequence, not just a headline.',protect:'Keep the opening news routine and its Canvas filing.',cut:'Skip an extended discussion of secondary headlines.',move:'Open The Desk. Return to this Control Room after the daily news routine.'}
      },
      {
        id:'hook',kind:'question',label:'The question',time:'25–31',start:25,minutes:6,
        screen:{eyebrow:'01 / THE OPENING QUESTION',title:'No president on the ballot.\nSo what changes?',description:'Which branch of government writes and votes on federal laws?',action:null},
        intel:{land:'The president is not being elected in 2026, but seats in Congress are.',ask:'If the president stays, can Washington still change?',listenFor:'Students predict that congressional membership or control might change.',protect:'Make the prediction before explaining Congress.',cut:'Skip the full-group debate; take two quick responses.',move:'Students can use Step 1 / Predict. Keep the answer open until the first video.'}
      },
      {
        id:'congress-video',kind:'watch',label:'Two chambers',time:'31–43',start:31,minutes:12,
        screen:{eyebrow:'02 / WATCH',title:'Two chambers.\nDifferent rules.',description:'Watch for the House, the Senate, and why their elections are different.',action:{label:'Play The Bicameral Congress',url:'https://www.youtube.com/watch?v=n9defOwVWS8',source:'Crash Course Government & Politics',runtime:'9:05'}},
        intel:{land:'The House has 435 voting seats elected every two years; senators serve staggered six-year terms.',ask:'Why do all House seats face voters every two years, but not all Senate seats?',listenFor:'House: two years and population-based seats. Senate: two per state and six-year terms.',protect:'Protect the core video and one comprehension check.',cut:'Cut examples about the history of Congress if the clip runs long.',move:'Play the video as a class. Pause once for the essential House-versus-Senate distinction.'}
      },
      {
        id:'sort',kind:'investigate',label:'House or Senate?',time:'43–55',start:43,minutes:12,
        screen:{eyebrow:'03 / INVESTIGATE',title:'House. Senate.\nOr both?',description:'Open Step 2 on your Chromebook. Sort five facts about Congress.',action:{label:'Open student investigation',url:'../midterms/block-01.html'}},
        intel:{land:'Students can identify a true distinction between the two chambers.',ask:'Which statement belongs to both chambers, and why?',listenFor:'Both chambers vote on federal legislation; terms and representation differ.',protect:'Protect independent practice and a short partner check.',cut:'Skip the optional 1-minute reinforcement video if most students understand.',move:'Have students open Step 2 / Congress and check their sort. Optional WFYI / PBS video is available in the lesson.'}
      },
      {
        id:'primary-video',kind:'watch',label:'The 2026 story',time:'55–67',start:55,minutes:12,
        screen:{eyebrow:'04 / WATCH THE NEWS',title:'2026 is happening\nright now.',description:'A primary result is not the same thing as a November victory.',action:{label:'Play PBS NewsHour report',url:'https://www.youtube.com/watch?v=-KybeyFYqY4',source:'PBS NewsHour · March 4, 2026',runtime:'5:03'}},
        intel:{land:'Primaries help decide who advances, but do not determine future general-election results.',ask:'What did the reporter establish? What remains unknown until November?',listenFor:'Confirmed primary results are separated from speculation or predictions about the general election.',protect:'Protect the difference between reporting and prediction.',cut:'Skip extra polling analysis and national race speculation.',move:'Watch the reporting together. Then students complete Step 3 / 2026 with one fact and one unanswered question.'}
      },
      {
        id:'scenario',kind:'decide',label:'The power shift',time:'67–80',start:67,minutes:13,
        screen:{eyebrow:'05 / DECIDE',title:'The president stays.\nThe House changes.',description:'Hypothetical: If a different party controls the House, what could change?',action:{label:'Open student investigation',url:'../midterms/block-01.html'}},
        intel:{land:'Changing a congressional majority can alter leaders, priorities, committees, and oversight without electing a new president.',ask:'What changes in this scenario—and what does not automatically change?',listenFor:'A specific congressional effect paired with a limit: no automatic new law or presidential removal.',protect:'Protect independent writing after a quick partner discussion.',cut:'Do not branch into partisan predictions or extended policy debates.',move:'Students use Step 4 / Decide. Label this clearly as a hypothetical, not a forecast.'}
      },
      {
        id:'file',kind:'file',label:'The takeaway',time:'80–90',start:80,minutes:10,
        screen:{eyebrow:'06 / THE TAKEAWAY',title:'No presidential ballot.\nStill real power.',description:'Use one verified fact. Write your answer. File it in Canvas.',action:{label:'Open student filing',url:'../midterms/block-01.html'}},
        intel:{land:'Every student can explain why congressional elections matter even with no presidential contest.',ask:'If the president is not on the ballot, why does the midterm still matter?',listenFor:'A House or Senate fact connected to a plausible consequence for governing.',protect:'Protect the final response and time to submit in Canvas.',cut:'Skip closing share-outs; prioritize the Canvas filing.',move:'Students use Step 5 / File, gather four parts (sort plus three brief responses), paste into the assigned Canvas Text Entry, and submit.'}
      }
    ]
  };
  if(typeof module==='object' && module.exports)module.exports=lesson;
  else root.BECURRENT_CONTROL_LESSON=lesson;
})(typeof window!=='undefined'?window:this);
