#!/usr/bin/env node
'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm'),child=require('child_process');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const topics=require('../lib/unit-content/midterms').topics;
const build=child.spawnSync(process.execPath,['scripts/build-midterms.js','--check'],{cwd:ROOT,encoding:'utf8'});
assert.strictEqual(build.status,0,build.stdout+build.stderr);
for(const t of topics){
 const n=String(t.n).padStart(2,'0'),lesson=require('../../teacher/data/midterms-block-'+n);
 assert.strictEqual(lesson.totalMinutes,80);assert.strictEqual(lesson.phases.length,10);
 assert.strictEqual(lesson.phases[0].id,'hook');
 const lunch=lesson.phases.findIndex(p=>p.kind==='break');assert(lunch>0);
 assert.strictEqual(lesson.phases.slice(0,lunch).reduce((a,p)=>a+p.minutes,0),55);
 assert.strictEqual(lesson.phases[lunch].minutes,0);
 assert.deepStrictEqual(lesson.phases.slice(lunch+1).map(p=>p.id),['cnn10','desk']);
 assert.strictEqual(lesson.phases.slice(lunch+1).reduce((a,p)=>a+p.minutes,0),25);
 let cursor=0;for(const p of lesson.phases){assert.strictEqual(p.start,cursor);cursor+=p.minutes;for(const k of ['land','ask','listenFor','protect','cut','move'])assert(p.intel[k].length>8);}
 const pub={window:{}};vm.runInNewContext(read('teacher/data/midterms-block-'+n+'-projector.js'),pub);
 for(const p of pub.window.BECURRENT_PROJECTOR_LESSON.phases)assert(!('intel' in p));
 const os=t.n===1?'midterms-run-of-show.html':'midterms-topic-'+n+'-os.html';
 const project=t.n===1?'midterms-projector.html':'midterms-topic-'+n+'-projector.html';
 const page=read('teacher/'+os),projection=read('teacher/'+project);
 assert(page.includes('id="teacher-notes"')&&page.includes('id="class-section"'));
 assert(projection.includes('midterms-block-'+n+'-projector.js'));
 assert(!projection.includes('intel-land')&&!projection.includes('midterms-block-'+n+'.js?'));
 assert(read('teacher/midterms.html').includes(os));
}
assert(read('teacher/index.html').includes('midterms.html'));
const js=read('assets/js/teacher-control-room.js');new vm.Script(js);
assert(js.includes("window.addEventListener('storage'"));assert(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'));
console.log('PASS: five teaching OS lessons, 55-minute unit, untimed lunch, CNN10/news after lunch, teacher cues, isolated projector data, saved notes.');
