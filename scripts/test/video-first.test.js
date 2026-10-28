#!/usr/bin/env node
'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm'),{spawnSync}=require('child_process');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const unit=require('../lib/unit-content/midterms');
assert.strictEqual(unit.meta.renderer,'video-first');assert.strictEqual(unit.meta.code,'WP');assert.strictEqual(unit.topics.length,5);
const index=read('midterms/index.html');
// Topic 2's committee lookup is required work: every fact box and the note must be a
// gathered slot, sit between the source note and the application note, and send the
// student to house.gov rather than a search engine.
function lookupProblems(page,t){
 if(!t.lookup)return /id="committee-response"|class="lookup-fact"/.test(page)?['lookup on a topic without one']:[];
 const at=id=>page.indexOf('id="'+id+'"'),ids=[...t.lookup.facts.map(f=>f.id),'committee-response'];
 return [
  ids.some(id=>!new RegExp('id="'+id+'"[^>]*data-slot="').test(page))&&'a lookup box is not a gathered slot',
  ids.some(id=>at(id)<at('report-response')||at(id)>at('scenario-response'))&&'lookup is out of place',
  !page.includes('href="https://www.house.gov/committees"')&&'no route to house.gov/committees',
  t.lookup.standing.length!==20&&'standing committee list is not the 20 from house.gov',
  !page.includes('A committee lookup:')&&'missing from Today you will submit',
  t.selfPaced&&(page.match(/class="notes-card"/g)||[]).length!==require('../lib/midterms-notes')[t.n].length&&'notes boxes do not match the projector notes'
 ].filter(Boolean);
}
{const t2=unit.topics.find(t=>t.lookup),p2=read('midterms/'+t2.page);
 for(const [bad,why] of [[p2.replace('data-slot="committee-name"','data-x="committee-name"'),'a lookup box is not a gathered slot'],[p2.replaceAll('href="https://www.house.gov/committees"','href="https://www.google.com/"'),'no route to house.gov/committees'],[p2.replace('A committee lookup:','A lookup:'),'missing from Today you will submit'],[p2.replace('class="notes-card"','class="x"'),'notes boxes do not match the projector notes']])
  assert(lookupProblems(bad,t2).includes(why),'negative control should fail: '+why);}
// Chapter banners: a topic listed in BANNERS opens each of its five chapters with one
// decorative drawing, inside that chapter, hidden from screen readers and sized.
const {BANNERS}=require('../lib/midterms-banners');
function bannerProblems(page,n){const want=BANNERS[n]||[],chapters=page.split('data-student-chapter').slice(1),got=chapters.map(c=>(c.match(/^[^>]*>\s*<div class="chapter-banner" data-banner="([a-z]+)"><svg width="960" height="160"[^>]*aria-hidden="true"/)||[])[1]).filter(Boolean);
 return [want.length&&got.join()!==want.join()&&'chapters do not open with their banners: '+got.join(),!want.length&&page.includes('class="chapter-banner"')&&'banner on a topic without any'].filter(Boolean);}
{const p2=read('midterms/block-02.html');
 for(const [bad,n,why] of [[p2.replace(/<div class="chapter-banner" data-banner="committee">/,'<div>'),2,'chapters do not open'],[p2.replace(/(data-banner="seat"><svg[^>]*?) aria-hidden="true"/,'$1'),2,'chapters do not open'],[read('midterms/block-01.html').replace('data-student-chapter','data-student-chapter><div class="chapter-banner"'),1,'banner on a topic']])
  assert(bannerProblems(bad,n).some(x=>x.startsWith(why)),'negative control should fail: '+why);}
for(const t of unit.topics){
 const page=read('midterms/'+t.page);
 assert.deepStrictEqual(bannerProblems(page,t.n),[],'Topic '+t.n);
 assert(page.includes('data-lesson="'+t.key+'"'));assert(index.includes('href="'+t.page+'"'));
 assert.strictEqual((page.match(/data-student-chapter/g)||[]).length,5);
 // Three responses, plus the committee lookup's facts and note where a topic has one (Topic 2).
 assert.strictEqual((page.match(/data-slot=/g)||[]).length,(t.n===4?8:3+(t.worksheet||[]).length+(t.lookup?t.lookup.facts.length+1:0)));assert.strictEqual((page.match(/data-sort=/g)||[]).length,t.n===4?0:5);
 assert.strictEqual(t.learningTargets.length,3);assert.strictEqual(t.successCriteria.length,3);
 assert.strictEqual(t.videos.filter(v=>!v.optional).length,(t.n===4||t.n===5)?1:2);
 for(const v of t.videos){assert(page.includes(v.url));assert(v.date&&v.prompt&&v.duration&&v.reviewed);}
 for(const item of [...t.learningTargets.map(x=>x.target),...t.successCriteria.map(x=>x.criteria)])assert(page.includes(item.replace(/&/g,'&amp;')),'missing target or criterion '+t.n);
 assert(page.includes('id="gather-work"')&&page.includes('id="copy-preview"'));
 assert(page.includes('video-first-record.js')&&page.includes('video-first.js'));
 assert(t.n===4?((page.match(/class="background section-reading"/g)||[]).length===5&&!/<details[^>]*class="[^"]*background/.test(page)):((page.match(/Read the Background:/g)||[]).length===6));assert(page.includes('print-topic-'));
 assert.strictEqual((page.match(/class="story-bridge"/g)||[]).length,5);
 assert(!/teacher-flow|data-view-mode|data-teacher-stage|\.\.\/teacher\//.test(page),'teacher controls must not be shipped in student lessons');
 assert(!/data-student-chapter[^>]*hidden/.test(page),'lesson sections must stay visible');
 const watchLabel=t.selfPaced?'Watch on your own, with headphones':'Watch together';
 assert(t.n===4?(page.includes('WATCH TOGETHER')&&page.includes('muJ7w0uKI20')):(page.includes(watchLabel)&&page.indexOf(t.introVideos?'Before the clips: the essential language':'Before the clip: the essential language')<page.indexOf(watchLabel)));
 if(t.n!==4)assert.strictEqual(page.includes('Watch together'),!t.selfPaced,'a self-paced topic sends students to the clips on their own');
 assert.deepStrictEqual(lookupProblems(page,t),[]);
 assert(page.includes('Today you will submit')&&page.includes(t.n===4?'How the worksheet is assessed':'How this investigation is assessed'));
 assert.strictEqual(t.points,5);assert(t.rubric.every(r=>!('points' in r)),'rubric components carry no point values');
 assert.strictEqual((page.match(/data-sort-feedback=/g)||[]).length,t.n===4?0:5);
 const paper=read('midterms/print-topic-'+String(t.n).padStart(2,'0')+'.html');
 assert(t.n===4?(paper.includes('data-worksheet-question="8"')&&paper.includes('Rural Health Transformation Program')&&paper.includes('class="writing-lines"')):(paper.includes('Reading route / core takeaways')&&paper.includes(t.worksheet?'Read the notes:':'Background support')));
 if(t.worksheet){
  if(t.n!==4)assert(t.selfPaced.readNotes);assert(!page.includes('Copy into your notes:'));
  if(t.n!==4)assert.strictEqual((page.match(/class="notes-card"/g)||[]).length,6);
  assert.deepStrictEqual([...page.matchAll(/data-worksheet-question="(\d+)"/g)].map(x=>Number(x[1])),[1,2,3,4,5,6,7,8]);
  for(const q of t.worksheet){assert(page.includes('data-worksheet-question="'+q.number+'"'));assert(paper.includes(q.text.replace(/&/g,'&amp;')));}
  assert(!paper.includes('<textarea'));if(t.n!==4)assert(paper.includes('Bill lab / paper route'));
 }
 if(t.n===4){
   assert.deepStrictEqual([...page.matchAll(/data-worksheet-question="(\d+)"/g)].map(x=>Number(x[1])),[1,2,3,4,5,6,7,8]);
   assert.strictEqual((page.match(/data-slot="/g)||[]).length,8,'eight saved worksheet entries');
   assert(page.includes('data-slot="campaign-before"')&&page.includes('data-slot="report"')&&page.includes('data-slot="checkpoint"'));
   assert(page.includes('id="campaign-evidence-reveal"'),'full evidence packet available without dropdown');
   assert(!page.includes('class="scaffold background"'),'no collapsed readings');
   assert(/https:\/\/(?:youtu\.be\/|www\.youtube\.com\/watch\?v=)muJ7w0uKI20(?:[&"']|$)/.test(page));
   for(const url of ['https://platform.adimpact.com/viewer/92dea8ad-ede9-4331-983b-1bad45f44196','https://platform.adimpact.com/viewer/d6cb52a6-156f-4823-b747-29c374df27d2','https://www.medicaid.gov/resources-for-states/rural-health','https://www.factcheck.org/2026/09/midterm-ads-clash-over-gop-laws-impact-on-rural-healthcare/'])assert(page.includes(url)&&paper.includes(url),'missing original ad or independent record');
   assert(!page.includes('data-sort=')&&page.includes('Gather All My Work'),'clean worksheet and gathering');
   assert(page.includes('3,917')&&page.includes('±1.8'),'poll evidence retained');
 }
 if(t.n===5){assert(page.includes('data-evidence='));assert(page.includes('No winners are prefilled'));assert.strictEqual(t.questions.filter(q=>!q.optional).length,1);assert.strictEqual((page.match(/data-optional="true"/g)||[]).length,8);assert(!page.includes('election-commission/election-results/'));assert(page.includes('Six short entries'));}
 assert(!['fetch(','XMLHttpRequest','<iframe'].some(x=>page.includes(x)));
}
// Election Day (Nov 3) is a viewing day, not a sixth topic: a paper log, linked from
// the unit page, with no text box to strand work, no script, and no 2026 winner.
const ed=unit.days.find(d=>d.code==='ED');assert(ed,'Election Day is in unit.days');
const edPage=read('midterms/'+ed.page);
const edProblems=p=>[!index.includes('href="'+ed.page+'"')&&'not linked from the unit page',/<textarea|<input|<script/i.test(p)&&'has a text box or script',['fetch(','XMLHttpRequest','<iframe'].some(x=>p.includes(x))&&'reaches the network',/\b(won|wins|projected winner|declared the winner)\b/i.test(p)&&'reports a winner',/\bAP\b/.test(p)&&'uses AP framing',(p.match(/<tbody>[\s\S]*?<\/tbody>/)||[''])[0].split('<tr>').length-1!==ed.logRows&&'log has the wrong number of rows'].filter(Boolean);
assert.deepStrictEqual(edProblems(edPage),[]);
// Negative controls: each check above can fail.
for(const [bad,why] of [[edPage.replace('<tbody>','<tbody><textarea></textarea>'),'has a text box or script'],[edPage.replace('<h1>','<h1>Smith won '),'reports a winner'],[edPage.replace('<h1>','<h1>AP '),'uses AP framing'],[edPage.replace('<tbody><tr>','<tbody>'),'log has the wrong number of rows']])assert(edProblems(bad).includes(why),'negative control should fail: '+why);
const js=read('assets/js/video-first.js');new vm.Script(js);
assert(js.includes('bcRecordManifest(')&&js.includes('bcRecordFooterHtml('));
assert(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'));
const r=spawnSync(process.execPath,['scripts/build-video-first.js','--check'],{cwd:ROOT,encoding:'utf8'});assert.strictEqual(r.status,0,r.stdout+r.stderr);
console.log('PASS: five guided civics lessons, an Election Day paper viewing guide, topic rubrics, evidence/poll packets, equivalent paper readings, reduced results task, preserved saved identities, canonical Canvas grammar.');
