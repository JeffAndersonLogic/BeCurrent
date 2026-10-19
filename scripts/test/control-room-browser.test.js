#!/usr/bin/env node
'use strict';
const assert=require('assert'),{open}=require('./midterms-browser-helper');
const {topics}=require('../lib/unit-content/midterms');
(async()=>{const {browser,server,root}=await open(),context=await browser.newContext({viewport:{width:1365,height:900}}),teacher=await context.newPage(),projection=await context.newPage(),errors=[];
 teacher.setDefaultTimeout(7000);projection.setDefaultTimeout(7000);teacher.on('pageerror',e=>errors.push(e.message));projection.on('pageerror',e=>errors.push(e.message));
 try{for(const t of topics){
  const n=String(t.n).padStart(2,'0'),os=t.n===1?'midterms-run-of-show.html':'midterms-topic-'+n+'-os.html',project=t.n===1?'midterms-projector.html':'midterms-topic-'+n+'-projector.html';
  await teacher.goto(root+'/teacher/'+os);await projection.goto(root+'/teacher/'+project);
  assert.strictEqual(await teacher.locator('[data-phase-index]').count(),10);assert((await teacher.textContent('#scene-title')).includes(t.hook));
  assert(await teacher.textContent('#intel-land'));assert.strictEqual(await projection.locator('#intel-land').count(),0);
  await teacher.locator('[data-phase-index="2"]').click();await projection.waitForFunction(()=>document.getElementById('projector-phase').textContent.startsWith('03'));
  assert((await projection.getAttribute('#projector-action','href')).includes('pbs.org/video'));
  await projection.click('#projector-next');await teacher.waitForFunction(()=>document.getElementById('teacher-count').textContent.startsWith('4 /'));
  await teacher.click('#timer-toggle');assert.strictEqual(await teacher.textContent('#timer-toggle'),'Pause');await teacher.click('#timer-toggle');
  await teacher.fill('#class-section','Period A');await teacher.locator('#class-section').dispatchEvent('change');await teacher.fill('#teacher-notes','Reteach the institution distinction.');
  await teacher.fill('#class-section','Period B');await teacher.locator('#class-section').dispatchEvent('change');assert.strictEqual(await teacher.inputValue('#teacher-notes'),'');
  await teacher.fill('#teacher-notes','Different notes for this class.');await teacher.fill('#class-section','Period A');await teacher.locator('#class-section').dispatchEvent('change');assert((await teacher.inputValue('#teacher-notes')).includes('institution'));
  await teacher.reload();assert((await teacher.inputValue('#teacher-notes')).includes('institution'));assert((await teacher.textContent('#teacher-count')).startsWith('4 /'));
  await teacher.locator('[data-phase-index="7"]').click();assert(await teacher.isDisabled('#timer-toggle'));assert((await teacher.textContent('#timer-target')).includes('untimed'));
  await teacher.locator('[data-phase-index="8"]').click();await projection.waitForFunction(()=>document.getElementById('projector-action').href.includes('cnn.com/cnn10'));
  await teacher.locator('[data-phase-index="9"]').click();await projection.waitForFunction(()=>document.getElementById('projector-action').href.includes('/daily/'));
  assert((await projection.locator('body').innerText()).includes('The Lead. Your Pick.'));
 }
 await teacher.goto(root+'/teacher/midterms.html');assert.strictEqual(await teacher.getByRole('link',{name:'Launch teaching OS →',exact:true}).count(),5);
 await teacher.setViewportSize({width:768,height:1024});await teacher.goto(root+'/teacher/midterms-topic-05-os.html');assert(await teacher.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'tablet OS overflows');
 assert.deepStrictEqual(errors,[]);console.log('PASS: five OS pages, isolated projector data, bidirectional sync, timers, lunch pause, after-lunch news, class-section notes, reload, tablet layout.');
 }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
