#!/usr/bin/env node
'use strict';
const assert=require('assert');
const {open}=require('./midterms-browser-helper');
const CORE=require('../lib/canvas-parse-core');
const unit=require('../lib/unit-content/ai');
(async()=>{
 const {browser,server,root}=await open();
 const context=await browser.newContext({viewport:{width:1365,height:900}});
 const page=await context.newPage(),errors=[];
 page.setDefaultTimeout(8000);
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async items=>{window.__copiedHtml=await(await items[0].getType('text/html')).text()}}})});
 try{
  await page.goto(root+'/ai/opening-film.html');
  assert(await page.isVisible('h1'));
  assert.match(await page.textContent('main'),/53 MINUTES 30 SECONDS/i);
  assert.strictEqual(await page.locator('[data-slot],#gather-work').count(),0,'film day is a real film, not extra worksheet');
  assert((await page.locator('a[href*="youtube.com/watch"]').count())>=1,'official film link present');
  await page.goto(root+'/ai/block-01.html');
  assert(await page.isVisible('#student-flow'),'substitute lesson loads');
  assert((await page.textContent('main')).includes('Everything you need is on this page.'));
  assert((await page.textContent('main')).includes('Your teacher is attending a conference'));
  assert.strictEqual(await page.locator('[data-slot]').count(),8);
  assert.strictEqual(await page.locator('[data-sort]').count(),8);
  assert.strictEqual(await page.locator('[data-student-chapter]').count(),5);
  assert.strictEqual(await page.locator('video,iframe').count(),0,'no video playback dependency on substitute day');
  await page.fill('#ai-q1','A learned model uses examples, while a basic calculator follows fixed rules.');
  await page.reload();
  assert((await page.inputValue('#ai-q1')).includes('basic calculator'),'autosave survives a reload');
  for(let k=0;k<unit.topics[0].sort.items.length;k++){
    await page.selectOption('#sort-'+(k+1),unit.topics[0].sort.items[k][1]);
  }
  await page.click('#check-sort');
  assert((await page.textContent('#sort-feedback')).includes('8 of 8 correct'),'practice sort gives feedback');
  for(let k=1;k<=8;k++)await page.fill('#ai-q'+k,'Question '+k+' evidence-based test answer. Students should explain their thinking.');
  await page.click('#gather-work');
  await page.waitForFunction(()=>document.getElementById('copy-preview').value.includes('#BHV|'));
  const plain=await page.inputValue('#copy-preview');
  const parsed=CORE.parseSubmission(plain,'test_student_text.txt');
  assert.strictEqual(parsed.hasManifest,true);
  assert.strictEqual(parsed.responses.length,9,'eight responses plus one practice sort');
  assert.deepStrictEqual(parsed.exceptions,[]);
  assert(plain.includes('topic=ai-t01'));
  await page.fill('#ai-q1','Revised reasoning after gathering');
  assert.strictEqual(await page.getAttribute('#copy-preview','data-stale'),'true');
  await page.click('#select-work');
  const fresh=CORE.parseSubmission(await page.inputValue('#copy-preview'),'test_student_text.txt');
  assert.deepStrictEqual(fresh.exceptions,[]);
  assert((await page.inputValue('#copy-preview')).includes('Revised reasoning after gathering'));
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'substitute lesson should not scroll horizontally on phone');
  await page.goto(root+'/ai/print-topic-01.html');
  assert.strictEqual(await page.locator('article').count(),8,'printed fallback has all eight answer areas');
  for(let n=2;n<=4;n++){
    await page.goto(root+'/ai/block-0'+n+'.html');
    assert.strictEqual(await page.locator('[data-slot]').count(),8,'AI'+n+' must have eight required answers');
    assert(await page.isVisible('#gather-work'));
  }
  assert.deepStrictEqual(errors,[]);
  console.log('PASS: full NOVA film day + independent AI1, offline worksheet, autosave, sort feedback, shared Canvas parser, mobile layout and no JS errors.');
 }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
