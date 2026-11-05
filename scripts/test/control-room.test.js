#!/usr/bin/env node
'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm'),child=require('child_process');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const topics=require('../lib/unit-content/midterms').topics;
const build=child.spawnSync(process.execPath,['scripts/build-midterms.js','--check'],{cwd:ROOT,encoding:'utf8'});
assert.strictEqual(build.status,0,build.stdout+build.stderr);
// Midterms 6 (Topic 5) was rebuilt on 2026-11-05 as a single results lesson. After
// lunch keeps the standing CNN 10 then The Desk. The 55-minute unit block, the
// ten filing minutes, the cue fields and the timeline still hold.
function analysisProblems(lesson){
 const lunch=lesson.phases.findIndex(p=>p.kind==='break'),before=lesson.phases.slice(0,lunch);let cursor=0;
 return [lunch<1&&'no lunch break',
  before.reduce((a,p)=>a+p.minutes,0)!==55&&'the unit block is not 55 minutes',
  JSON.stringify(lesson.phases.slice(lunch+1).map(p=>p.id))!=='["cnn10","desk"]'&&'after lunch is not CNN 10 then The Desk',
  lesson.totalMinutes!==lesson.phases.reduce((a,p)=>a+p.minutes,0)&&'totalMinutes does not match the phases',
  lesson.phases[0].id!=='watch'&&'the day does not open with the videos',
  !(lesson.phases.find(p=>p.id==='file')?.minutes>=10)&&'filing has under ten minutes',
  lesson.phases.some(p=>{const bad=p.start!==cursor;cursor+=p.minutes;return bad;})&&'the timeline has a gap',
  lesson.phases.some(p=>['land','ask','listenFor','protect','cut','move'].some(k=>!(p.intel[k]&&p.intel[k].length>8)))&&'a phase is missing teacher cues',
  before.some(p=>!(p.intel.model&&p.intel.reteach.startsWith('If most students')))&&'a reteach cue is malformed'
 ].filter(Boolean);}
{const good=require('../../teacher/data/midterms-block-05');assert.deepStrictEqual(analysisProblems(good),[]);
 const clone=()=>JSON.parse(JSON.stringify(good));
 for(const [mut,why] of [[l=>{l.phases.find(p=>p.id==='file').minutes=5;},'filing has under ten minutes'],[l=>{l.phases=l.phases.filter(p=>p.id!=='cnn10');},'after lunch is not CNN 10 then The Desk'],[l=>{l.phases[1].intel.reteach='Try again.';},'a reteach cue is malformed'],[l=>{l.phases.reverse();},'the day does not open with the videos']]){const l=clone();mut(l);assert(analysisProblems(l).includes(why),'negative control should fail: '+why);}}
for(const t of topics){
 const n=String(t.n).padStart(2,'0'),lesson=require('../../teacher/data/midterms-block-'+n);
 if(t.analysis)assert.deepStrictEqual(analysisProblems(lesson),[],'Topic '+t.n+' (rebuilt as Midterms 6)');
 else{
 assert.strictEqual(lesson.totalMinutes,80);
 // Ten timed activity slides, plus note-taking slides that carry no minutes of their own.
 const notes=lesson.phases.filter(p=>p.kind==='notes'),timed=lesson.phases.filter(p=>p.kind!=='notes'&&p.kind!=='scenario');
 assert.strictEqual(timed.length,t.recap?11:10);assert(notes.length>=5,'each topic needs note-taking slides');
 for(const p of notes){assert.strictEqual(p.minutes,0);assert(p.screen.bullets.length>=3&&p.screen.bullets.length<=5,p.screen.title);assert(p.screen.write&&p.screen.write.length>10);assert(!/\bmin(ute)?s?\b/i.test(p.screen.title+p.screen.bullets.join(' ')+p.screen.write),'no minute counts on a notes slide');}
 assert(notes.every(p=>lesson.phases.indexOf(p)<lesson.phases.findIndex(q=>q.kind==='break')),'notes slides come before lunch');
 assert.strictEqual(lesson.phases[0].id,t.recap?'recap':'hook');
 if(t.recap){assert.strictEqual(lesson.phases[0].screen.action.url,t.recap.url);assert.strictEqual(lesson.phases[1].id,'hook');}
 const lunch=lesson.phases.findIndex(p=>p.kind==='break');assert(lunch>0);
 assert.strictEqual(lesson.phases.slice(0,lunch).reduce((a,p)=>a+p.minutes,0),55);
 assert.strictEqual(lesson.phases[lunch].minutes,0);
 assert.deepStrictEqual(lesson.phases.slice(lunch+1).map(p=>p.id),['cnn10','desk']);
 assert.strictEqual(lesson.phases.slice(lunch+1).reduce((a,p)=>a+p.minutes,0),25);
 let cursor=0;for(const p of lesson.phases){assert.strictEqual(p.start,cursor);cursor+=p.minutes;for(const k of ['land','ask','listenFor','protect','cut','move'])assert(p.intel[k].length>8);}
 assert(lesson.phases.find(p=>p.id==='file').minutes>=10);
 for(const p of lesson.phases.slice(0,lunch))assert(p.intel.model&&p.intel.reteach.startsWith('If most students'));
 assert.strictEqual(new Set(lesson.phases.slice(0,lunch).filter(p=>p.kind!=='notes'&&p.kind!=='scenario').map(p=>p.intel.listenFor)).size,t.recap?8:7);
 if(t.presentationSlides){
  const analysis=lesson.phases.filter(p=>p.kind==='scenario');
  assert.strictEqual(analysis.length,12);
  assert(analysis.every(p=>p.minutes===0&&p.screen.sources.length));
  assert(lesson.phases.indexOf(analysis[0])>lesson.phases.findIndex(p=>p.id==='apply'));
  assert(lesson.phases.indexOf(analysis.at(-1))<lesson.phases.findIndex(p=>p.id==='file'));
  assert.strictEqual(analysis.at(-1).screen.table.rows.length,3);
  assert(analysis.some(p=>p.screen.bullets?.includes('Major individual tax rates already permanent')));
 }
 }
 const pub={window:{}};vm.runInNewContext(read('teacher/data/midterms-block-'+n+'-projector.js'),pub);
 for(const p of pub.window.BECURRENT_PROJECTOR_LESSON.phases)assert(!('intel' in p));
 const os=t.n===1?'midterms-run-of-show.html':'midterms-topic-'+n+'-os.html';
 const project=t.n===1?'midterms-projector.html':'midterms-topic-'+n+'-projector.html';
 const page=read('teacher/'+os),projection=read('teacher/'+project);
 assert(page.includes('id="teacher-notes"')&&page.includes('id="class-section"'));
 assert(page.includes('id="intel-model"'));
 assert(projection.includes('midterms-block-'+n+'-projector.js'));
 assert(!projection.includes('intel-land')&&!projection.includes('midterms-block-'+n+'.js?'));
 assert(read('teacher/midterms.html').includes(os));
}
assert(read('teacher/index.html').includes('midterms.html'));
const js=read('assets/js/teacher-control-room.js');new vm.Script(js);
assert(js.includes("window.addEventListener('storage'"));assert(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'));
assert(new Set(topics.map(t=>t.teaching.timing.join(','))).size>=4,'timings must fit each lesson');
console.log('PASS: five teaching OS lessons, 55-minute unit, untimed lunch, CNN10/news after lunch, teacher cues, isolated projector data, saved notes.');
