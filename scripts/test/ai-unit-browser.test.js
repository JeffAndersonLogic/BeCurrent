#!/usr/bin/env node
'use strict';
const assert=require('assert');
const {open}=require('./midterms-browser-helper');
const CORE=require('../lib/canvas-parse-core');
const unit=require('../lib/unit-content/ai');
(async()=>{
 const {browser,server,root}=await open();
 const context=await browser.newContext({viewport:{width:1365,height:900}});
 // Canvas snippets link the published PNG; serve its checked-in bytes for offline browser testing.
 await context.route('https://jeffandersonlogic.github.io/BeCurrent/assets/images/brand/becurrent-wordmark-ink.png',route=>route.fulfill({path:require('path').join(__dirname,'../../assets/images/brand/becurrent-wordmark-ink.png'),contentType:'image/png'}));
 const page=await context.newPage(),errors=[];
 // The interview board is a dated fixture; later CI runs must exercise November 9 too.
 await page.clock.install({time:new Date('2026-11-09T15:00:00Z')});
 page.setDefaultTimeout(8000);
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async items=>{window.__copiedHtml=await(await items[0].getType('text/html')).text()}}})});
 try{
  await page.goto(root+'/ai/opening-film.html');
  assert(await page.isVisible('h1'));
  assert.match(await page.textContent('main'),/60 Minutes/i);
  assert.strictEqual(await page.locator('[data-slot],#gather-work').count(),0,'film day is a real film, not extra worksheet');
  assert((await page.locator('a[href*="youtube.com/watch"]').count())>=1,'official film link present');
  await page.goto(root+'/ai/block-01.html');
  assert(await page.isVisible('#student-flow'),'substitute lesson loads');
  assert((await page.textContent('main')).includes('What Exactly AI Is'));
  assert(!(await page.textContent('main')).includes('Your teacher is attending a conference'));
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
  await page.goto(root+'/docs/canvas/ai-unit-calendar.html');
  assert.strictEqual(await page.locator('[data-copy]').count(),23,'12 events and 11 assignment/assessment descriptions; none for video day');
  for(const html of await page.locator('textarea').evaluateAll(els=>els.map(e=>e.value)))assert.match(html,/becurrent-wordmark-ink\.png/, 'every copied event and assignment carries BeCurrent branding');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedCode=text}}}));
  await page.locator('#day-2026-11-09 summary').click();
  await page.locator('[data-copy="event-0"]').click();
  assert.match(await page.evaluate(()=>window.__copiedCode),/m2aC8lAOQbg/);
  assert.match(await page.evaluate(()=>window.__copiedCode),/No written work today/);
  assert(!(await page.evaluate(()=>window.__copiedCode)).includes('&lt;h2&gt;'),'copies HTML markup, not escaped preview');
  await page.goto(root+'/announcements.html?date=2026-11-09');
  assert.strictEqual(await page.textContent('.title-topic'),'Video - 60 Minutes Interview with President Trump');
  assert.strictEqual(await page.locator('.title-unit').count(),0,'standalone video day has no inherited AI unit header');
  assert.doesNotMatch(await page.locator('#stage').innerText(),/CE - |The Machine in the Room/i);
  assert.strictEqual(await page.locator('.desk-slide-v2').count(),0,'no writing routine on interview day');
  assert.strictEqual(await page.locator('a[href*="m2aC8lAOQbg"]').count(),1,'board has direct interview link');
  await page.goto(root+'/index.html');
  assert.match(await page.textContent('[data-class-announcement]'),/Video - 60 Minutes Interview with President Trump/);
  assert.doesNotMatch(await page.textContent('[data-class-announcement]'),/CE - |The Machine in the Room/i);
  assert.deepStrictEqual(errors,[]);
  console.log('PASS: 60 Minutes video day + independent AI1, offline worksheet, autosave, sort feedback, shared Canvas parser, mobile layout and no JS errors.');
 }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
