#!/usr/bin/env node
'use strict';
const assert=require('assert'),{open}=require('./midterms-browser-helper'),CORE=require('../lib/canvas-parse-core');
const {topics}=require('../lib/unit-content/midterms');
(async()=>{const {browser,server,root}=await open();
 const context=await browser.newContext({viewport:{width:1365,height:900}}),page=await context.newPage(),errors=[];
 page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async items=>{window.__copiedHtml=await(await items[0].getType('text/html')).text()}}})});
 await page.addInitScript(()=>localStorage.setItem('bcv2-video-first-view','teacher'));
 try{
 for(const t of topics){
  await page.goto(root+'/midterms/'+t.page);
  // Each topic owns a distinct saved record; a new topic starts with empty writing.
  assert(await page.isVisible('#student-flow'));assert.strictEqual(await page.inputValue('#report-response'),'');
  assert.strictEqual(await page.locator('#teacher-flow,[data-view-mode],[data-teacher-stage]').count(),0);
  for(const chapter of await page.locator('[data-student-chapter]').all())assert(await chapter.isVisible());
  assert.strictEqual(await page.locator('.background').count(),6);
  await page.locator('[data-student-nav]').nth(1).click();
  for(let i=0;i<t.sorts.length;i++)await page.selectOption('#sort-'+(i+1),t.sorts[i][1]);
  await page.click('#check-sort');assert((await page.textContent('#sort-feedback')).includes('5 of 5 correct'));
  if(t.simulation){await page.locator('#seat-slider').fill('218');assert((await page.textContent('#seat-status')).includes('Group A has the majority'));}
  await page.locator('[data-student-nav]').nth(2).click();
  if(t.resultsNotebook){
   for(const el of await page.locator('[data-evidence]').all()){const tag=await el.evaluate(n=>n.tagName);if(tag==='SELECT')await el.selectOption('Unresolved');else if(await el.getAttribute('type')==='datetime-local')await el.fill('2026-11-04T10:30');else await el.fill('Test evidence: unresolved, official source checked.');}
  }
  await page.fill('#report-response','Source evidence for Topic '+t.n+'. A verified fact is separate from a prediction.');
  await page.locator('[data-student-nav]').nth(3).click();await page.fill('#scenario-response','Topic '+t.n+' application. A governing effect still depends on other institutions.');
  await page.locator('[data-student-nav]').nth(4).click();await page.fill('#exit-response','Topic '+t.n+' conclusion. Two sources support the explanation; an uncertainty remains.');
  const count=t.resultsNotebook?5:4;assert((await page.textContent('[data-work-progress]')).includes(count+' of '+count));
  await page.reload();assert((await page.inputValue('#exit-response')).includes('Topic '+t.n+' conclusion'));
  await page.click('#gather-work');await page.waitForFunction(()=>document.getElementById('copy-preview').value.includes('#BHV|'));
  const plain=await page.inputValue('#copy-preview');assert(plain.includes('Topic '+t.n+'\n'+t.title));assert(plain.includes('topic='+t.key));
  const parsed=CORE.parseSubmission(plain,'studenttest_1_2_text.txt');assert(parsed.hasManifest);assert.strictEqual(parsed.responses.length,count);assert.deepStrictEqual(parsed.exceptions,[]);
  await page.waitForFunction(()=>!!window.__copiedHtml);const rich=await page.evaluate(()=>window.__copiedHtml);const htmlParsed=CORE.parseSubmission(CORE.htmlToText('<html><body>'+rich+'</body></html>'),'studenttest_1_2_text.html');assert.strictEqual(htmlParsed.responses.length,count);assert.deepStrictEqual(htmlParsed.exceptions,[]);
  if(t.resultsNotebook){assert(plain.includes('2026-11-04T10:30'));assert(plain.includes('Comparison baseline'));await page.locator('[data-student-nav]').nth(2).click();assert.strictEqual(await page.inputValue('#stage-0'),'Unresolved');}
 }
 // Check narrow Chromebook/mobile layout without changing saved work.
 await page.setViewportSize({width:390,height:844});await page.goto(root+'/midterms/block-04.html');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile student page overflows');
 // Nested target bullets must not inherit the outer investigation-card grid.
 for(const width of [1365,390]){
  await page.setViewportSize({width,height:900});await page.goto(root+'/midterms/index.html');
  await page.locator('.unit-list details').evaluateAll(nodes=>nodes.forEach(n=>n.open=true));
  const bullets=await page.locator('.unit-list .target-pair li').evaluateAll(nodes=>nodes.map(n=>({display:getComputedStyle(n).display,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height})));
  assert.strictEqual(bullets.length,30);assert(bullets.every(n=>n.display==='list-item'&&n.width>200&&n.height<180),'targets squeezed into narrow columns');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'unit targets overflow');
 }
 // The investigation is readable even before its enhancement script runs.
 const nojs=await browser.newContext({javaScriptEnabled:false});const plainPage=await nojs.newPage();await plainPage.goto(root+'/midterms/block-01.html');
 for(const chapter of await plainPage.locator('[data-student-chapter]').all())assert(await chapter.isVisible());await nojs.close();
 assert.deepStrictEqual(errors,[]);console.log('PASS: five continuous lessons, no student presentation controls, legacy mode ignored, six background readings each, corrected practice, saved work, results notebook, Canvas round trips, desktop/mobile target layout, no-JS reading.');
 }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
