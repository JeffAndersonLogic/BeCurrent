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
 assert(t.videos.filter(v=>!v.optional).length>=2);
 for(const v of t.videos){assert(page.includes(v.url));assert(v.date&&v.prompt&&v.duration&&v.reviewed);}
 for(const item of [...t.learningTargets.map(x=>x.target),...t.successCriteria.map(x=>x.criteria)])assert(page.includes(item.replace(/&/g,'&amp;')),'missing target or criterion '+t.n);
 assert(page.includes('id="gather-work"')&&page.includes('id="copy-preview"'));
 assert(page.includes('video-first-record.js')&&page.includes('video-first.js'));
 assert.strictEqual((page.match(/Read the Background:/g)||[]).length,6);assert(page.includes('print-topic-'));
 assert.strictEqual((page.match(/class="story-bridge"/g)||[]).length,5);
 assert(!/teacher-flow|data-view-mode|data-teacher-stage|\.\.\/teacher\//.test(page),'teacher controls must not be shipped in student lessons');
 assert(!/data-student-chapter[^>]*hidden/.test(page),'lesson sections must stay visible');
 if(t.n===5){assert(page.includes('data-evidence='));assert(page.includes('No winners are prefilled'));}
 assert(!['fetch(','XMLHttpRequest','<iframe'].some(x=>page.includes(x)));
}
const js=read('assets/js/video-first.js');new vm.Script(js);
assert(js.includes('bcRecordManifest(')&&js.includes('bcRecordFooterHtml('));
assert(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'));
const r=spawnSync(process.execPath,['scripts/build-video-first.js','--check'],{cwd:ROOT,encoding:'utf8'});assert.strictEqual(r.status,0,r.stdout+r.stderr);
console.log('PASS: five civics lessons, target/criteria alignment, two core clips each, accessible supports, dated results notebook, canonical Canvas grammar.');
