#!/usr/bin/env node
'use strict';
const assert=require('assert'),{open}=require('./midterms-browser-helper');
const {topics}=require('../lib/unit-content/midterms');
(async()=>{const {browser,server,root}=await open(),context=await browser.newContext({viewport:{width:1365,height:900}}),teacher=await context.newPage(),projection=await context.newPage(),errors=[];
 teacher.setDefaultTimeout(7000);projection.setDefaultTimeout(7000);teacher.on('pageerror',e=>errors.push(e.message));projection.on('pageerror',e=>errors.push(e.message));
 try{for(const t of topics){
  const n=String(t.n).padStart(2,'0'),os=t.n===1?'midterms-run-of-show.html':'midterms-topic-'+n+'-os.html',project=t.n===1?'midterms-projector.html':'midterms-topic-'+n+'-projector.html';
  await teacher.goto(root+'/teacher/'+os);await projection.goto(root+'/teacher/'+project);
  // Slides are found by id, not position: note-taking slides sit between the activities.
  const ids=await teacher.evaluate(()=>window.BECURRENT_CONTROL_LESSON.phases.map(p=>p.id)),at=id=>{const i=ids.indexOf(id);assert(i>=0,id);return i},pad=i=>String(i+1).padStart(2,'0');
  assert.strictEqual(await teacher.locator('[data-phase-index]').count(),ids.length);assert(ids.filter(id=>id.startsWith('notes-')).length>=5);assert((await teacher.textContent('#scene-title')).includes(t.recap?t.recap.title:t.hook));
  if(t.recap)assert.strictEqual(await projection.getAttribute('#projector-action','href'),t.recap.url);
  assert(await teacher.textContent('#intel-land'));assert.strictEqual(await projection.locator('#intel-land').count(),0);
  assert(await teacher.textContent('#intel-model'));assert.strictEqual(await projection.locator('#intel-model').count(),0);
  await teacher.locator(`[data-phase-index="${at('watch-1')}"]`).click();await projection.waitForFunction(s=>document.getElementById('projector-phase').textContent.startsWith(s),pad(at('watch-1')));
  assert((await projection.getAttribute('#projector-action','href')).includes('pbs.org/video'));
  await projection.click('#projector-next');await teacher.waitForFunction(s=>document.getElementById('teacher-count').textContent.startsWith(s),(at('watch-1')+2)+' /');
  assert.strictEqual(await projection.getAttribute('body','data-kind'),'notes');assert((await projection.textContent('.write-this')).includes('Write this down'));assert.strictEqual(await projection.textContent('#projector-time'),'');
  await teacher.click('#timer-toggle');assert.strictEqual(await teacher.textContent('#timer-toggle'),'Pause');await teacher.click('#timer-toggle');
  await teacher.fill('#class-section','Period A');await teacher.locator('#class-section').dispatchEvent('change');await teacher.fill('#teacher-notes','Reteach the institution distinction.');
  await teacher.fill('#class-section','Period B');await teacher.locator('#class-section').dispatchEvent('change');assert.strictEqual(await teacher.inputValue('#teacher-notes'),'');
  await teacher.fill('#teacher-notes','Different notes for this class.');await teacher.fill('#class-section','Period A');await teacher.locator('#class-section').dispatchEvent('change');assert((await teacher.inputValue('#teacher-notes')).includes('institution'));
  await teacher.reload();assert((await teacher.inputValue('#teacher-notes')).includes('institution'));assert((await teacher.textContent('#teacher-count')).startsWith((at('watch-1')+2)+' /'));
  await teacher.locator(`[data-phase-index="${at('lunch')}"]`).click();assert(await teacher.isDisabled('#timer-toggle'));assert((await teacher.textContent('#timer-target')).includes('untimed'));
  await teacher.locator(`[data-phase-index="${at('cnn10')}"]`).click();await projection.waitForFunction(()=>document.getElementById('projector-action').href.includes('cnn.com/cnn10'));
  await teacher.locator(`[data-phase-index="${at('desk')}"]`).click();await projection.waitForFunction(()=>document.getElementById('projector-action').href.includes('/daily/'));
  assert((await projection.locator('body').innerText()).includes('The Lead. Your Pick.'));
 }
 await teacher.goto(root+'/teacher/midterms.html');assert.strictEqual(await teacher.getByRole('link',{name:'Launch teaching OS →',exact:true}).count(),5);
 await teacher.setViewportSize({width:768,height:1024});await teacher.goto(root+'/teacher/midterms-topic-05-os.html');assert(await teacher.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'tablet OS overflows');
 assert.deepStrictEqual(errors,[]);console.log('PASS: five OS pages, isolated projector data, bidirectional sync, timers, lunch pause, after-lunch news, class-section notes, reload, tablet layout.');
 }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
