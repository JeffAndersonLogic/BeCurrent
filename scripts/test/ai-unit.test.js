#!/usr/bin/env node
'use strict';
// AI unit contract: the full NOVA film replaces AI1's eight-answer worksheet.
// All generated pages must match the canonical Midnight Ember source.
const assert=require('assert');
const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'../..');
const unit=require('../lib/unit-content/ai');
const render=require('../lib/ai-renderer');
const generated=render(unit);
assert.strictEqual(unit.meta.code,'AI');
assert.strictEqual(unit.meta.renderer,'ai-investigation');
assert.strictEqual(unit.topics.length,4);
assert.strictEqual(unit.meta.openingFilm.fullRuntime,'53:30');
assert.match(unit.meta.openingFilm.assigned,/full documentary/i);
assert.strictEqual(unit.topics[0].viewingGuide.length,4);
for(const [filename,text] of Object.entries(generated)){
  const actual=fs.readFileSync(path.join(ROOT,filename),'utf8');
  assert.strictEqual(actual,text,filename+' must be generated from ai-renderer.js and ai.js');
}
const film=generated['ai/block-01.html'];
assert.match(film,/53 MINUTES 30 SECONDS/i);
assert.match(film,/00:00–53:30/);
assert.match(film,/four viewing cues/i);
assert.doesNotMatch(film,/data-slot=/);
assert.doesNotMatch(film,/id="gather-work"/);
assert.doesNotMatch(film,/video-first-record.js/);
const calendar=generated['docs/canvas/ai-unit-calendar.html'];
assert.match(calendar,/NO Canvas assignment on full film day/i);
for(let i=2;i<=4;i++){
  const page=generated['ai/block-0'+i+'.html'];
  const slots=[...page.matchAll(/data-slot="ai-q\d"/g)];
  assert.strictEqual(slots.length,8,'AI'+i+' must present eight private prompts');
  assert.match(page,/video-first-record.js/);
  assert.match(page,/id="gather-work"/);
  assert.match(page,/id="copy-preview"/);
  assert.match(page,/ai-midnight-ember.css/);
  assert.doesNotMatch(page,/magicschool\.ai\//i,'MagicSchool join link cannot appear in public page');
}
assert.match(generated['ai/index.html'],/entire 53-minute, 30-second documentary/);
assert.match(generated['teacher/ai-topic-01-os.html'],/no eight-question worksheet/i);
assert.match(generated['teacher/ai-topic-01-projector.html'],/full documentary/i);
const shared=fs.readFileSync(path.join(ROOT,'assets/js/video-first.js'),'utf8');
assert.match(shared,/bcRecordManifest\(/);
assert.match(shared,/body\.dataset\.sortSlot\|\|'chamber-sort'/);
console.log('PASS: AI film-day, three eight-question investigations, public safety and source reproducibility.');
