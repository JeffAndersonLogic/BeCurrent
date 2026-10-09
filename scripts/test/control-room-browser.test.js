#!/usr/bin/env node
'use strict';
/* Browser contract for the Midterms teacher cockpit and note-free projector. */
const fs=require('fs'),http=require('http'),path=require('path');
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
    fs.readFile(target,(err,data)=>{
      if(err){res.writeHead(404).end();return}
      res.writeHead(200,{'Content-Type':MIME[path.extname(target)]||'application/octet-stream'});res.end(data);
    });
  });
  server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port}));
})}
(async()=>{
  const {server,port}=await serve();
  const browser=await chromium.launch(process.env.PW_CHROME?{executablePath:process.env.PW_CHROME}:{});
  const context=await browser.newContext({viewport:{width:1365,height:900}});
  const teacher=await context.newPage();
  const projection=await context.newPage();
  teacher.setDefaultTimeout(7000);projection.setDefaultTimeout(7000);
  const errors=[];
  teacher.on('pageerror',e=>errors.push('teacher: '+e.message));
  projection.on('pageerror',e=>errors.push('projector: '+e.message));
  const root='http://127.0.0.1:'+port+'/teacher/';
  try{
    await teacher.goto(root+'midterms-run-of-show.html');
    await projection.goto(root+'midterms-projector.html');
    if(await teacher.locator('[data-phase-index]').count()!==7)throw Error('run of show must display seven distinct phases');
    if(!/First, the world/.test(await teacher.textContent('#scene-title')))throw Error('cockpit did not initialize phase 0');
    if(!/First, the world/.test(await projection.textContent('#projector-title')))throw Error('projector did not initialize phase 0');
    if(!/Students can say/.test(await teacher.textContent('#intel-land')))throw Error('teacher intelligence did not render');
    if(await projection.locator('#intel-land').count())throw Error('projector contains intelligence nodes');
    if(!/midterms-block-01-projector.js/.test(await projection.content()))throw Error('projector data not generated');
    if(/Teacher Intelligence|listenFor|protect:/.test(await projection.content()))throw Error('projector HTML includes teaching cues');

    await teacher.click('#teacher-next');
    await projection.waitForFunction(()=>document.getElementById('projector-title').textContent.includes('No president'));
    if(!/Phase 2 of 7/.test(await teacher.textContent('#intel-phase')))throw Error('intelligence did not follow navigation');
    await teacher.locator('[data-phase-index="2"]').click();
    await projection.waitForFunction(()=>document.getElementById('projector-title').textContent.includes('Two chambers'));
    if(!/youtube.com/.test(await projection.getAttribute('#projector-action','href')))throw Error('video not shown in relevant projector phase');
    await projection.click('#projector-next');
    await teacher.waitForFunction(()=>document.getElementById('scene-title').textContent.includes('House. Senate.'));
    if(!/4 \/ 7/.test(await teacher.textContent('#teacher-count')))throw Error('reverse navigation synchronization failed');

    await teacher.click('#timer-toggle');
    if(!/Pause/.test(await teacher.textContent('#timer-toggle')))throw Error('timer did not start');
    await teacher.click('#timer-toggle');
    if(!/Resume|Start/.test(await teacher.textContent('#timer-toggle')))throw Error('timer did not pause');
    await teacher.fill('#teacher-notes','Revisit distinctions between House and Senate.');
    await teacher.reload();
    if(!(await teacher.inputValue('#teacher-notes')).includes('House and Senate'))throw Error('teacher notes not persisted');
    if(!/House. Senate./.test(await teacher.textContent('#scene-title')))throw Error('phase not saved on reload');

    await teacher.goto(root+'index.html');
    if(!(await teacher.locator('a[href="midterms-run-of-show.html"]').count()))throw Error('course teacher hub lost cockpit link');
    if(errors.length)throw Error(errors.join(' | '));
    console.log('PASS: teacher intelligence, 7 phases, bidirectional same-browser projector sync, video launch, timer, saved notes and course hub.');
  }finally{await context.close();await browser.close();server.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
