#!/usr/bin/env node
'use strict';
const assert=require('assert'),{open}=require('./midterms-browser-helper'),CORE=require('../lib/canvas-parse-core');
const {topics}=require('../lib/unit-content/midterms');
(async()=>{const {browser,server,root}=await open();
 const context=await browser.newContext({viewport:{width:1365,height:900}}),page=await context.newPage(),errors=[];
 page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async items=>{window.__copiedHtml=await(await items[0].getType('text/html')).text()}}})});
 try{
 for(const t of topics){
  await page.goto(root+'/midterms/'+t.page);
  // Each topic owns a distinct saved record; a new topic starts with empty writing.
  assert(await page.isVisible('#student-flow'));assert.strictEqual(await page.inputValue('#report-response'),'');
  await page.getByRole('button',{name:'Teacher presentation',exact:true}).click();assert(await page.isVisible('#teacher-flow'));
  await page.click('#teacher-next');assert((await page.textContent('#teacher-counter')).includes('2 / 7'));
  await page.getByRole('button',{name:'Student investigation',exact:true}).click();
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
 assert.deepStrictEqual(errors,[]);console.log('PASS: all five lessons, modes, corrected practice, seat model, topic isolation, reload, results notebook, rich/plain Canvas parser round trips, mobile layout.');
 }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
