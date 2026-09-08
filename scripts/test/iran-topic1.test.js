#!/usr/bin/env node
'use strict';

const http=require('http');
const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..','..');
let chromium;
try{chromium=require('playwright-core').chromium}catch(_){console.log('SKIP playwright-core is not installed: npm i playwright-core');process.exit(2)}
const results=[];
function check(name,pass,detail=''){results.push(!!pass);console.log(`  ${pass?'PASS':'FAIL'}  ${name}${detail?`  (${detail})`:''}`)}
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2'};
function serve(){return new Promise(resolve=>{const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://x').pathname);const requested=pathname.endsWith('/')?pathname+'index.html':pathname;const target=path.resolve(ROOT,'.'+requested);if(!target.startsWith(ROOT+path.sep)){res.writeHead(403).end();return}fs.readFile(target,(err,body)=>{if(err){res.writeHead(404).end();return}res.writeHead(200,{'Content-Type':TYPES[path.extname(target).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});res.end(body)})});server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port}))})}

(async()=>{
 const {server,port}=await serve();
 const executablePath=process.env.PW_CHROME;
 const browser=await chromium.launch(executablePath?{executablePath}:{});
 const page=await browser.newPage({viewport:{width:1365,height:768}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
   const base=`http://127.0.0.1:${port}`;
   await page.goto(base+'/iran/index.html',{waitUntil:'domcontentloaded'});
   await page.waitForSelector('.ir-video-forward');
   check('Topic 1 declares one student filing group',await page.locator('[data-group]').count()===1,`${await page.locator('[data-group]').count()} group`);
   check('four current decision-maker portraits render in the orientation board',await page.locator('.ir-person').count()===4,`${await page.locator('.ir-person').count()} people`);
   check('regional armed-partner orientation renders four group cards',await page.locator('.ir-network-card').count()===4,`${await page.locator('.ir-network-card').count()} groups`);
   check('high-resolution Hormuz map is present',await page.locator('#map img').count()===1&&(await page.locator('#map img').getAttribute('src')).includes('Strait_of_Hormuz'));
   check('FRONTLINE is the only watch card',await page.locator('.ir-watch').count()===1,`${await page.locator('.ir-watch').count()} card`);
   const card=page.locator('.ir-watch').first();
   check('FRONTLINE card is REQUIRED',(await card.locator('.ir-watch-status').innerText()).trim()==='REQUIRED');
   check('FRONTLINE launch points to the requested film',(await card.locator('a.ir-watch-link').getAttribute('href'))==='https://www.youtube.com/watch?v=vWaoon6lZM0');
   check('viewer-discretion note is visible',/graphic imagery/i.test(await card.innerText()));
   check('old Day 1 short-clip URLs are absent',!(await page.content()).match(/iran-war-sot-nick-live-tag|war-with-iran-panel|energy-risks/));

   await page.locator('[data-group="orientation"]').fill('I understand the current actors better, and I still need history to explain the depth of the distrust.');
   await page.waitForTimeout(80);
   check('the single exit filing persists to localStorage',await page.evaluate(()=>localStorage.getItem('bcv2-iran-topic-01-orientation')!==null));
   await page.locator('[data-gather-topic]').click();
   const status=await page.locator('#iran-gather-status').innerText();
   check('Gather This Topic reports one of one',/Gathered 1 of 1 filings/.test(status),status);
   const gathered=await page.locator('#iran-gather-output').innerText();
   check('gathered record carries the BeCurrent manifest',gathered.includes('--- BECURRENT RECORD, do not edit ---')&&gathered.includes('#BHV|'));

   await page.setViewportSize({width:768,height:900});await page.waitForTimeout(50);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   check('Chromebook-width layout has no horizontal overflow',overflow<=2,`${overflow}px overflow`);
   check('portrait and network cards remain visible at Chromebook width',await page.locator('.ir-person').first().isVisible()&&await page.locator('.ir-network-card').first().isVisible());
   check('no page JavaScript errors',errors.length===0,errors.join(' | '));
 } finally {await browser.close();server.close()}
 const passed=results.filter(Boolean).length;console.log(`\n  ${passed}/${results.length} passed\n`);process.exit(passed===results.length?0:1);
})().catch(err=>{console.error(err);process.exit(1)});
