#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const unit=require('../lib/unit-content/iran');
const videos=require('../lib/iran-video-content');
const {renderIranBrowser,renderIranData}=require('../lib/iran-topic-page');
const ROOT=path.resolve(__dirname,'..','..');
const results=[];
function check(name,pass,detail=''){results.push(!!pass);console.log(`  ${pass?'PASS':'FAIL'}  ${name}${detail?`  (${detail})`:''}`)}

console.log('\n  Iran Reverse History contract · FRONTLINE revision\n');
const topics=unit.topics||[];
const questions=topics.flatMap(t=>t.questions||[]);
check('the investigation still has exactly eight class-day topics',topics.length===8,`${topics.length} topics`);
check('all topic keys and pages are unique',new Set(topics.map(t=>t.key)).size===8&&new Set(topics.map(t=>t.page)).size===8);
check('every topic has three learning targets and three success criteria',topics.every(t=>t.learningTargets.length===3&&t.successCriteria.length===3));
check('the accessible filing contract is 32 total responses',questions.length===32,`${questions.length} filings`);
check('Days 1 and 2 each require only one written filing',topics[0].questions.length===1&&topics[1].questions.length===1,`${topics[0].questions.length}+${topics[1].questions.length}`);
check('Day 3 combines 1979 and 1953 as one scoped origins investigation',/1979/.test(topics[2].subtitle)&&/1953/.test(topics[2].subtitle)&&/1953 or 1979/.test(topics[2].questions.at(-1).text));

let pageContract=true;
for(const topic of topics){
  const src=fs.readFileSync(path.join(ROOT,'iran',topic.page),'utf8');
  const groups=[...src.matchAll(/data-group="([^"]+)"/g)].map(m=>m[1]);
  const expected=topic.questions.map(q=>q.group);
  if(JSON.stringify(groups)!==JSON.stringify(expected)) pageContract=false;
}
check('each page exposes exactly the filings declared by its topic',pageContract);

const intro=fs.readFileSync(path.join(ROOT,'iran','index.html'),'utf8');
const day2=fs.readFileSync(path.join(ROOT,'iran','topic-02-1953.html'),'utf8');
const day3=fs.readFileSync(path.join(ROOT,'iran','topic-03-1979.html'),'utf8');
check('Day 1 includes the visual orientation board',/id="people"/.test(intro)&&/id="network"/.test(intro)&&/id="map"/.test(intro)&&(intro.match(/class="ir-person"/g)||[]).length===4);
check('Day 1 explicitly teaches proxy-language limits',/proxy ≠ puppet|proxy.*puppet|support.*control every/i.test(intro));
check('Days 1 and 2 use FRONTLINE as the only required video path',/vWaoon6lZM0/.test(intro)&&/vWaoon6lZM0/.test(day2));
check('old Day 1 NewsHour clip URLs are gone from the student launch page',!/iran-war-sot-nick-live-tag|war-with-iran-panel|energy-risks/.test(intro));
check('Day 3 visibly reverses 2026 to 1979 and 1953',/2026/.test(day3)&&/1979/.test(day3)&&/1953/.test(day3)&&/Why the U\.S\. and Iran Became Enemies/.test(day3));

const studyGuide=fs.readFileSync(path.join(ROOT,'iran','study-guide.html'),'utf8');
const finalTopic=topics.at(-1);
const finalCriterionCore=finalTopic.successCriteria[0].criteria.replace(/^I can /,'');
const qSection=studyGuide.match(/<section class="ir-section" id="questions">([\s\S]*?)<section class="ir-section" id="final">/);
check('the study guide remains tied to the canonical synthesis',studyGuide.includes(unit.meta.terminalQuestion)&&studyGuide.toLowerCase().includes(finalCriterionCore.toLowerCase())&&(studyGuide.match(/class="ir-time"/g)||[]).length===8&&!!qSection&&(qSection[1].match(/class="ir-scan-card"/g)||[]).length===8);

const browser=fs.readFileSync(path.join(ROOT,'assets','js','iran-topics.js'),'utf8');
const data=fs.readFileSync(path.join(ROOT,'assets','data','iran-unit.js'),'utf8');
check('the browser layer reproduces exactly from the content module',browser===renderIranBrowser(unit));
check('homepage progress data reproduces exactly from the content module',data===renderIranData(unit));
check('the student layer still carries gather/copy/clear/record-manifest paths',browser.includes('Gather This Topic')&&browser.includes('Copy to Clipboard')&&browser.includes('Clear This Topic')&&browser.includes('bcRecordManifest'));
check('the student layer has no off-device capture channel',!/\bfetch\s*\(/.test(browser)&&!/XMLHttpRequest/.test(browser)&&!/<form[^>]+action=/i.test(browser));

const videoTopics=Object.entries(videos.topics||{});
const rows=videoTopics.flatMap(([topicId,t])=>(t.videos||[]).map(v=>({topicId,...v})));
const videoData=fs.readFileSync(path.join(ROOT,'assets','data','iran-videos.js'),'utf8');
const payloadMatch=videoData.match(/window\.BECURRENT_IRAN_VIDEOS=([\s\S]*);\s*$/);
let payload=null;try{payload=payloadMatch?JSON.parse(payloadMatch[1]):null}catch(_){payload=null}
const teacher=fs.readFileSync(path.join(ROOT,'teacher','iran-run-of-show.html'),'utf8');
check('video metadata covers all eight topics',videoTopics.length===8,`${videoTopics.length} topics`);
check('Days 1 and 2 each contain one required FRONTLINE card',videos.topics['topic-01'].videos.length===1&&videos.topics['topic-02'].videos.length===1&&videos.topics['topic-01'].videos[0].status==='REQUIRED'&&videos.topics['topic-02'].videos[0].status==='REQUIRED'&&videos.topics['topic-01'].videos[0].url.includes('vWaoon6lZM0')&&videos.topics['topic-02'].videos[0].url.includes('vWaoon6lZM0'));
check('Days 3–8 keep two or three targeted support resources',videoTopics.slice(2).every(([,t])=>t.videos.length>=2&&t.videos.length<=3));
check('every external video/resource has a 2026 launch-audit date',rows.filter(v=>/^https:/.test(v.url)).every(v=>/^2026-\d\d-\d\d$/.test(v.verified||'')));
check('generated browser video payload reproduces exactly from canonical metadata',payload&&JSON.stringify(payload)===JSON.stringify(videos));
check('the teacher cockpit launches student pages rather than duplicating external video URLs',!/https:\/\/(www\.)?(pbs\.org|youtube\.com)/.test(teacher));
check('teacher cockpit covers all eight dates and both FRONTLINE days',(teacher.match(/\{n:\d,date:/g)||[]).length===8&&teacher.includes('FRONTLINE I')&&teacher.includes('FRONTLINE II'));

const passed=results.filter(Boolean).length;
console.log(`\n  ${passed}/${results.length} passed\n`);
process.exit(passed===results.length?0:1);
