#!/usr/bin/env node
'use strict';
// Reading a Real Ballot, the Election Day assignment, in a real Chromium:
// every answer saves and survives a reload, Gather All My Work carries all of
// them with the shared record footer, and the paste reads back through the real
// parser in both clipboard flavours with no exceptions.
const assert=require('assert'),{open}=require('./midterms-browser-helper'),CORE=require('../lib/canvas-parse-core');
const ed=require('../lib/midterms-election-day'),a=ed.assignment,qs=a.parts.flatMap(p=>p.questions);
(async()=>{
 const {browser,server,root}=await open();
 try{
  const page=await browser.newPage();
  await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async items=>{window.__copiedHtml=await(await items[0].getType('text/html')).text()}}})});
  await page.goto(root+'/midterms/'+a.page);
  assert.strictEqual(await page.locator('[data-slot]').count(),qs.length,'one saved slot per question');
  // The ballot itself is on the page: all eight images load.
  for(const im of a.ballot.images){const img=page.locator(`img[src$="${im.file}"]`);await img.scrollIntoViewIfNeeded();await page.waitForFunction(f=>{const i=document.querySelector(`img[src$="${f}"]`);return i&&i.complete},im.file,{timeout:15000});assert((await img.evaluate(i=>i.naturalWidth))>0,im.file+' loads');}
  for(const q of qs){const el=page.locator('#'+q.id);if(q.kind==='choice')await el.selectOption(q.options[q.options.length-1]);else await el.fill('Answer to '+q.id+'.');}
  assert((await page.textContent('[data-work-progress]')).includes(qs.length+' of '+qs.length));
  await page.reload();
  assert.strictEqual(await page.inputValue('#ballot-warning'),'Answer to ballot-warning.','typing survives a reload');
  assert.strictEqual(await page.inputValue('#ballot-confidence'),'5 Could teach it','a choice survives a reload');
  await page.click('#gather-work');await page.waitForFunction(()=>document.getElementById('copy-preview').value.includes('#BHV|'));
  const plain=await page.inputValue('#copy-preview');
  assert(plain.startsWith('BeCurrent | Who Has the Power? | Election Day\n'+a.title),'the paste names the day, not a topic');
  assert(plain.includes('topic='+a.key));
  const parsed=CORE.parseSubmission(plain,'studenttest_1_2_text.txt');
  assert(parsed.hasManifest);assert.strictEqual(parsed.responses.length,qs.length);assert.deepStrictEqual(parsed.exceptions,[]);
  await page.waitForFunction(()=>window.__copiedHtml&&window.__copiedHtml.includes('Answer to ballot-surprise.'));
  const rich=await page.evaluate(()=>window.__copiedHtml);
  const htmlParsed=CORE.parseSubmission(CORE.htmlToText('<html><body>'+rich+'</body></html>'),'studenttest_1_2_text.html');
  assert.strictEqual(htmlParsed.responses.length,qs.length);assert.deepStrictEqual(htmlParsed.exceptions,[]);
  // Negative control: an edited paste is caught, so the clean read above means something.
  const tampered=CORE.parseSubmission(plain.replace('Answer to ballot-house.','Someone else wrote this.'),'studenttest_1_2_text.txt');
  assert(tampered.exceptions.length>0||tampered.responses.some(r=>/EDIT/i.test(JSON.stringify(r))),'an edited paste must be flagged');
  // Phone width: no sideways scroll.
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'no horizontal scroll at phone width');
  console.log('PASS: Reading a Real Ballot saves, reloads, gathers '+qs.length+' answers, and parses cleanly in both clipboard flavours.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
