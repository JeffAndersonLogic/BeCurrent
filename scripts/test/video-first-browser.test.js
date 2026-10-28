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
  const requiredCount=await page.locator('[data-slot]').evaluateAll(nodes=>nodes.filter(el=>el.dataset.optional!=='true').length)+(t.resultsNotebook?1:0)+(t.n===4?0:1);
  if(t.n===1){
   await page.click('#gather-work');
   await page.waitForFunction(()=>document.getElementById('copy-status').textContent.includes('missing parts'));
   assert.strictEqual(await page.locator('#copy-status a[href="#report-response"]').count(),1);
   assert.strictEqual(await page.locator('#copy-status a[href="#sort-1"]').count(),1);
   assert((await page.textContent('#work-checklist')).includes('not started'));
  }
  await page.locator('[data-student-nav]').nth(1).click();
  if(t.n===4){
   assert.strictEqual(await page.locator('#campaign-before').count(),1);
   assert.strictEqual(await page.locator('#campaign-evidence-reveal').evaluate(el=>el.open),false,'the evidence starts hidden');
   await page.fill('#campaign-before','Ad A highlights rural funding. Ad B highlights hospital risk. I need to inspect the records.');
   await page.locator('#campaign-evidence-reveal summary').click();
   assert.strictEqual(await page.locator('#campaign-evidence-reveal').evaluate(el=>el.open),true,'the evidence opens after the first judgment');
   assert((await page.locator('#campaign-evidence-reveal').textContent()).includes('Congressional Budget Office'));
  }else{
   for(let i=0;i<t.sorts.length;i++)await page.selectOption('#sort-'+(i+1),t.sorts[i][1]);
   await page.selectOption('#sort-1',t.sortOptions.find(option=>option!==t.sorts[0][1]));
   await page.click('#check-sort');
   assert((await page.textContent('[data-sort-feedback="1"]')).startsWith('Try again.'));
   assert((await page.textContent('[data-sort-feedback="2"]')).startsWith('Correct.'));
   await page.selectOption('#sort-1',t.sorts[0][1]);
   await page.click('#check-sort');assert((await page.textContent('#sort-feedback')).includes('5 of 5 correct'));
  }
  if(t.simulation){await page.locator('#seat-slider').fill('218');assert((await page.textContent('#seat-status')).includes('Group A has the majority'));}
  await page.locator('[data-student-nav]').nth(2).click();
  if(t.resultsNotebook){
   for(const el of await page.locator('[data-evidence]:not([data-optional="true"])').all()){const tag=await el.evaluate(n=>n.tagName);if(tag==='SELECT')await el.selectOption('Unresolved');else if(await el.getAttribute('type')==='datetime-local')await el.fill('2026-11-04T10:30');else await el.fill('Test evidence: unresolved, official source checked.');}
  }
  if(await page.locator('#report-response').getAttribute('data-optional')!=='true')await page.fill('#report-response','Source evidence for Topic '+t.n+'. A verified fact is separate from a prediction.');
  await page.locator('[data-student-nav]').nth(3).click();
  const scenario=page.locator('#scenario-response');
  if(t.n!==4&&await scenario.getAttribute('data-optional')!=='true')await scenario.fill('Topic '+t.n+' application. A governing effect still depends on other institutions.');
  await page.locator('[data-student-nav]').nth(4).click();await page.fill('#exit-response','Topic '+t.n+' conclusion. Two sources support the explanation; an uncertainty remains.');
  // Any other required box on the page (Topic 2's committee lookup) is filled the same way.
  for(const el of await page.locator('[data-slot]:not([data-optional="true"])').all())if(!(await el.inputValue()))await el.fill('Topic '+t.n+' '+(await el.getAttribute('data-slot'))+' entry.');
  if(t.lookup){const plainBefore=await page.textContent('#work-checklist');for(const f of t.lookup.facts)assert(plainBefore.includes(f.label),'checklist names '+f.label);}
  const count=requiredCount;assert((await page.textContent('[data-work-progress]')).includes(count+' of '+count));
  assert((await page.textContent('#work-checklist')).includes('draft recorded'));
  await page.reload();assert((await page.inputValue('#exit-response')).includes('Topic '+t.n+' conclusion'));
  await page.click('#gather-work');await page.waitForFunction(()=>document.getElementById('copy-preview').value.includes('#BHV|'));
  const plain=await page.inputValue('#copy-preview');assert(plain.includes('Topic '+t.n+'\n'+t.title));assert(plain.includes('topic='+t.key));
  const parsed=CORE.parseSubmission(plain,'studenttest_1_2_text.txt');assert(parsed.hasManifest);assert.strictEqual(parsed.responses.length,count);assert.deepStrictEqual(parsed.exceptions,[]);
  await page.waitForFunction(n=>window.__copiedHtml&&window.__copiedHtml.includes('Topic '+n+' conclusion.'),t.n);const rich=await page.evaluate(()=>window.__copiedHtml);const htmlParsed=CORE.parseSubmission(CORE.htmlToText('<html><body>'+rich+'</body></html>'),'studenttest_1_2_text.html');assert.strictEqual(htmlParsed.responses.length,count);assert.deepStrictEqual(htmlParsed.exceptions,[]);
  // A revision after gathering must never leave the manual-copy backup stale.
  const revised='Topic '+t.n+' revised response after gathering.',editedField=page.locator('[data-slot]:not([data-optional="true"])').first(),editedId=await editedField.getAttribute('id');
  await editedField.fill(revised);
  assert.strictEqual(await page.locator('#copy-preview').getAttribute('data-stale'),'true');
  assert((await page.textContent('#copy-status')).includes('work changed after gathering'));
  await page.click('#select-work');
  assert((await page.inputValue('#copy-preview')).includes(revised));
  assert.strictEqual(await page.locator('#copy-preview').getAttribute('data-stale'),'false');
  const fresh=CORE.parseSubmission(await page.inputValue('#copy-preview'),'studenttest_1_2_text.txt');assert.deepStrictEqual(fresh.exceptions,[]);assert.strictEqual(fresh.responses.length,count);
  if(t.n===1){
   await page.selectOption('#sort-1',t.sortOptions.find(option=>option!==t.sorts[0][1]));
   assert.strictEqual(await page.locator('#copy-preview').getAttribute('data-stale'),'true');
   await page.selectOption('#sort-1',t.sorts[0][1]);await page.click('#select-work');
   assert.strictEqual(await page.locator('#copy-preview').getAttribute('data-stale'),'false');
  }
  if(t.resultsNotebook){
   await page.fill('#results-baseline','Outgoing Congress baseline, checked 2026-11-04.');
   assert.strictEqual(await page.locator('#copy-preview').getAttribute('data-stale'),'true');
   await page.click('#select-work');assert((await page.inputValue('#copy-preview')).includes('Outgoing Congress baseline, checked 2026-11-04.'));
  }
  await page.reload();assert.strictEqual(await page.inputValue('#'+editedId),revised);
  // Optional legacy planning keeps its existing saved key and record when present.
  if(t.n!==4&&await page.locator('#scenario-response').getAttribute('data-optional')==='true'){
   await page.evaluate(key=>localStorage.setItem('bcv2-video-first-'+key+'-text-scenario','Legacy planning response retained.'),t.key);
   await page.reload();assert.strictEqual(await page.inputValue('#scenario-response'),'Legacy planning response retained.');
   await page.click('#gather-work');
   const legacy=CORE.parseSubmission(await page.inputValue('#copy-preview'),'studenttest_1_2_text.txt');assert.strictEqual(legacy.responses.length,count+1);assert.deepStrictEqual(legacy.exceptions,[]);assert((await page.inputValue('#copy-preview')).includes('Legacy planning response retained.'));
   assert((await page.textContent('[data-work-progress]')).includes(count+' of '+count));
   const legacyStage=page.locator('#stage-0');
   await page.evaluate(({key,evidenceKey})=>localStorage.setItem('bcv2-video-first-'+key+'-evidence-'+evidenceKey,'Unresolved'),{key:t.key,evidenceKey:await legacyStage.getAttribute('data-evidence')});
   await page.reload();await page.click('#gather-work');assert((await page.inputValue('#copy-preview')).includes('House control / stage: Unresolved'));
  }
  if(t.resultsNotebook){assert(plain.includes('2026-11-04T10:30'));assert(plain.includes('Comparison baseline'));await page.locator('[data-student-nav]').nth(2).click();assert.strictEqual(await page.inputValue('#stage-0'),'Unresolved');}
 }
 // The bill lab must follow the institutional rules on each path, and must not
 // create new required writing slots or leak private responses to another page.
 await page.goto(root+'/midterms/block-03.html');
 assert((await page.textContent('#lab-outcome')).includes('House has not passed'));
 await page.selectOption('#lab-house','yes');
 assert((await page.textContent('#lab-outcome')).includes('Senate still needs'));
 await page.selectOption('#lab-senate','different');
 assert((await page.textContent('#lab-outcome')).includes('different text'));
 await page.selectOption('#lab-senate','yes');
 assert((await page.textContent('#lab-outcome')).includes('Law enacted'));
 await page.selectOption('#lab-president','veto');
 assert((await page.textContent('#lab-outcome')).includes('Veto blocks'));
 await page.selectOption('#lab-override','one');
 assert((await page.textContent('#lab-outcome')).includes('House alone is insufficient'));
 await page.selectOption('#lab-override','both');
 assert((await page.textContent('#lab-outcome')).includes('Veto overridden'));
 await page.selectOption('#lab-president','sign');
 assert(await page.isDisabled('#lab-override'));
 const introChapter=page.locator('#chapter-1');
 assert.strictEqual(await introChapter.locator('.clip-card').count(),2);
 assert.strictEqual(await page.locator('#chapter-2 .clip-card,#chapter-3 .clip-card').count(),0);
 assert.strictEqual(await page.locator('[data-slot]').count(),8);
 for(const n of [3,4,5]){
  await page.goto(root+'/midterms/block-0'+n+'.html');
  const card=page.locator('.decision-card summary').first();
  await card.focus();await page.keyboard.press('Enter');
  assert(await card.evaluate(el=>el.parentElement.open),'reveal works with keyboard');
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'lab page overflows '+n);
  await page.setViewportSize({width:1365,height:900});
 }
 // Check narrow Chromebook/mobile layout without changing saved work.
 await page.setViewportSize({width:390,height:844});await page.goto(root+'/midterms/block-04.html');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile student page overflows');
 // Nested target bullets must not inherit the outer investigation-card grid.
 for(const width of [1365,390]){
  await page.setViewportSize({width,height:900});await page.goto(root+'/midterms/index.html');
  await page.locator('.unit-list details').evaluateAll(nodes=>nodes.forEach(n=>n.open=true));
  const bullets=await page.locator('.unit-list .target-pair li').evaluateAll(nodes=>nodes.map(n=>({display:getComputedStyle(n).display,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height})));
  const unitContent=require('../lib/unit-content/midterms'),cards=[...unitContent.topics,...(unitContent.days||[])];
  assert.strictEqual(bullets.length,cards.reduce((n,c)=>n+c.learningTargets.length+c.successCriteria.length,0));assert(bullets.every(n=>n.display==='list-item'&&n.width>200&&n.height<180),'targets squeezed into narrow columns');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'unit targets overflow');
 }
 // The investigation is readable even before its enhancement script runs.
 const nojs=await browser.newContext({javaScriptEnabled:false});const plainPage=await nojs.newPage();await plainPage.goto(root+'/midterms/block-01.html');
 for(const chapter of await plainPage.locator('[data-student-chapter]').all())assert(await chapter.isVisible());await nojs.close();
 assert.deepStrictEqual(errors,[]);console.log('PASS: five continuous lessons, no student presentation controls, named draft/missing states, item-specific feedback, fresh manual copy after edits, legacy planning preserved, saved work, results notebook, Canvas round trips, desktop/mobile target layout, no-JS reading.');
 }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
