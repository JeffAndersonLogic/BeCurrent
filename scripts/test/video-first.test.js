#!/usr/bin/env node
'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm'),{spawnSync}=require('child_process');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const unit=require('../lib/unit-content/midterms');
assert.strictEqual(unit.meta.renderer,'video-first');assert.strictEqual(unit.meta.code,'WP');assert.strictEqual(unit.topics.length,5);
const index=read('midterms/index.html');
for(const t of unit.topics){
 const page=read('midterms/'+t.page);
 assert(page.includes('data-lesson="'+t.key+'"'));assert(index.includes('href="'+t.page+'"'));
 assert.strictEqual((page.match(/data-student-chapter/g)||[]).length,5);
 assert.strictEqual((page.match(/data-slot=/g)||[]).length,3);assert.strictEqual((page.match(/data-sort=/g)||[]).length,5);
 assert.strictEqual(t.learningTargets.length,3);assert.strictEqual(t.successCriteria.length,3);
 assert.strictEqual(t.videos.filter(v=>!v.optional).length,t.n===5?1:2);
 for(const v of t.videos){assert(page.includes(v.url));assert(v.date&&v.prompt&&v.duration&&v.reviewed);}
 for(const item of [...t.learningTargets.map(x=>x.target),...t.successCriteria.map(x=>x.criteria)])assert(page.includes(item.replace(/&/g,'&amp;')),'missing target or criterion '+t.n);
 assert(page.includes('id="gather-work"')&&page.includes('id="copy-preview"'));
 assert(page.includes('video-first-record.js')&&page.includes('video-first.js'));
 assert.strictEqual((page.match(/Read the Background:/g)||[]).length,6);assert(page.includes('print-topic-'));
 assert.strictEqual((page.match(/class="story-bridge"/g)||[]).length,5);
 assert(!/teacher-flow|data-view-mode|data-teacher-stage|\.\.\/teacher\//.test(page),'teacher controls must not be shipped in student lessons');
 assert(!/data-student-chapter[^>]*hidden/.test(page),'lesson sections must stay visible');
 assert(page.indexOf('Before the clip: the essential language')<page.indexOf('Watch together'));
 assert(page.includes('Today you will submit')&&page.includes('How this investigation is assessed'));
 assert.strictEqual(t.rubric.reduce((n,r)=>n+r.points,0),t.n===5?30:20);
 assert.strictEqual((page.match(/data-sort-feedback=/g)||[]).length,5);
 const paper=read('midterms/print-topic-'+String(t.n).padStart(2,'0')+'.html');
 assert(paper.includes('Reading route / core takeaways')&&paper.includes('Background support'));
 if(t.n===4){for(const m of t.messages)assert(paper.includes(m.text));assert(paper.includes(t.evidence.claimPacket.exactClaim));assert(page.includes('3,917')&&page.includes('±1.8'));assert(page.includes(t.evidence.claimPacket.recordSource.url));}
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
