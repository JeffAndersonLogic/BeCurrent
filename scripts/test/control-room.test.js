#!/usr/bin/env node
'use strict';
const assert=require('assert');
const fs=require('fs'),path=require('path'),vm=require('vm'),child=require('child_process');
const ROOT=path.resolve(__dirname,'../..');
const read=file=>fs.readFileSync(path.join(ROOT,file),'utf8');
const lesson=require('../..//teacher/data/midterms-block-01');
assert.strictEqual(lesson.totalMinutes,90);
assert.strictEqual(lesson.phases.length,7);
assert.strictEqual(lesson.phases[0].id,'desk');
assert.strictEqual(lesson.phases[0].minutes,25);
assert.strictEqual(lesson.phases.reduce((n,p)=>n+p.minutes,0),90);
let cursor=0;
const required=['land','ask','listenFor','protect','cut','move'];
for(const p of lesson.phases){
  assert.strictEqual(p.start,cursor,'phase starts must be contiguous: '+p.id);
  cursor+=p.minutes;
  assert(typeof p.screen.title==='string'&&p.screen.title.length>8,'screen title: '+p.id);
  assert(p.screen.eyebrow&&p.screen.description,'visible screen content: '+p.id);
  for(const k of required)assert(typeof p.intel[k]==='string'&&p.intel[k].length>8,'intelligence '+k+': '+p.id);
}
const check=child.spawnSync(process.execPath,['scripts/build-control-room.js','--check'],{cwd:ROOT,encoding:'utf8'});
assert.strictEqual(check.status,0,(check.stdout||'')+(check.stderr||''));
const publicData=read('teacher/data/midterms-block-01-projector.js');
const sandbox={window:{}};
vm.runInNewContext(publicData,sandbox);
const publicLesson=sandbox.window.BECURRENT_PROJECTOR_LESSON;
assert.strictEqual(publicLesson.phases.length,7);
assert.deepStrictEqual(Array.from(publicLesson.phases,p=>p.id),lesson.phases.map(p=>p.id));
for(const p of publicLesson.phases){
  for(const k of ['intel','land','ask','listenFor','protect','cut','move'])assert(!(k in p),'projector leaked '+k);
}
for(const s of ['listenFor','LAND /','Teacher Intelligence','intelligence notes','protect:','cut:'])assert(!publicData.includes(s),'projector contains teacher text: '+s);
const teacher=read('teacher/midterms-run-of-show.html');
const projector=read('teacher/midterms-projector.html');
const hub=read('teacher/index.html');
const student=read('midterms/block-01.html');
assert(teacher.includes('data/midterms-block-01.js')&&teacher.includes('teacher-control-room.js'),'teacher canonical dependencies');
assert(projector.includes('data/midterms-block-01-projector.js')&&projector.includes('teacher-control-room.js'),'projector generated dependencies');
assert(!projector.includes('data/midterms-block-01.js?'),'projector must not load teacher canonical bundle');
assert(!projector.includes('Teacher Intelligence')&&!projector.includes('intel-land'),'no teacher notes in projector markup');
assert(hub.includes('midterms-run-of-show.html')&&hub.includes('iran-run-of-show.html'),'course hub links');
assert(!student.includes('teacher/midterms-run-of-show.html')&&!student.includes('midterms-block-01.js'),'student file unchanged by teacher content');
const js=read('assets/js/teacher-control-room.js');
new vm.Script(js);
assert(js.includes("window.addEventListener('storage'"),'same-browser projector synchronization');
assert(js.includes('notesKey'),'saved teacher notes');
assert(js.includes('timerKey'),'timer storage');
assert(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'),'teacher controls do not export data');
console.log('PASS: 90-minute source-of-truth, projector-safe build, isolated notes, lesson/hub links, and Control Room syntax.');
