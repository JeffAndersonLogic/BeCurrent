#!/usr/bin/env node
'use strict';
/**
 * Video-first Block 1 browser contract: modes, navigation, autosave,
 * sort feedback, gathering, and canonical Canvas manifest.
 */
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'../..');
let chromium;
try{chromium=require('playwright-core').chromium}
catch(_){console.log('SKIP: playwright-core not installed');process.exit(2)}
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2'};
function serve(){return new Promise(resolve=>{
  const server=http.createServer((req,res)=>{
    const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
    const target=path.resolve(ROOT,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
    if(!target.startsWith(ROOT+path.sep)){res.writeHead(403).end();return}
    fs.readFile(target,(err,bytes)=>{
      if(err){res.writeHead(404).end();return}
      res.writeHead(200,{'Content-Type':MIME[path.extname(target)]||'application/octet-stream'});res.end(bytes);
    });
  });
  server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port}));
})}
(async()=>{
  const {server,port}=await serve();
  const browser=await chromium.launch(process.env.PW_CHROME?{executablePath:process.env.PW_CHROME}:{});
  const page=await browser.newPage();
  page.setDefaultTimeout(8000);
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  try{
    await page.goto('http://127.0.0.1:'+port+'/midterms/block-01.html');
    if(!(await page.isVisible('#student-flow')))throw Error('student experience not visible by default');
    await page.getByRole('button',{name:'Teacher presentation'}).click();
    if(!(await page.isVisible('#teacher-flow')))throw Error('teacher presentation does not open');
    await page.click('#teacher-next');
    if(!/2 \/ 6/.test(await page.textContent('#teacher-counter')))throw Error('teacher progression failed');
    await page.getByRole('button',{name:'Student investigation'}).first().click();
    if(!(await page.isVisible('#student-flow')))throw Error('student investigation does not open');
    await page.getByRole('button',{name:'2 · Congress'}).click();
    await page.selectOption('#sort-1','House');
    await page.selectOption('#sort-2','Senate');
    await page.selectOption('#sort-3','Senate');
    await page.selectOption('#sort-4','Both');
    await page.selectOption('#sort-5','Both');
    await page.click('#check-sort');
    if(!/5 of 5 correct/.test(await page.textContent('#sort-feedback')))throw Error('sort scoring failed');
    await page.getByRole('button',{name:'3 · 2026'}).click();
    await page.fill('#report-response','The news reports primary results, but November winners were not settled.');
    await page.getByRole('button',{name:'4 · Decide'}).click();
    await page.fill('#scenario-response','The House could change leaders. The president would remain in office.');
    await page.getByRole('button',{name:'5 · Submit'}).click();
    await page.fill('#exit-response','Congress is elected in midterms. A new majority can change what bills and investigations it prioritizes.');
    if(!/4 of 4/.test(await page.textContent('[data-work-progress]')))throw Error('progress denominator failed');
    await page.reload();
    await page.getByRole('button',{name:'5 · Submit'}).click();
    if(!(await page.inputValue('#exit-response')).includes('Congress is elected'))throw Error('autosave failed after reload');
    await page.click('#gather-work');
    await page.waitForFunction(()=>document.getElementById('copy-preview').value.includes('#BHV|'));
    const txt=await page.inputValue('#copy-preview');
    if(!txt.includes('topic=wp-t01')||!txt.includes('expected=4')||!txt.includes('items=4'))throw Error('Canvas footer not structured correctly');
    if(!txt.includes('The House could change leaders'))throw Error('gather lost a saved answer');
    if(errors.length)throw Error('page errors: '+errors.join(' | '));
    console.log('PASS: video-first teacher/student modes, progression, sort, autosave, and Canvas manifest.');
  }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
