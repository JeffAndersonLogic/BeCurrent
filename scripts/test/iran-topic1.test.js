#!/usr/bin/env node
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');

let chromium;
try { chromium = require('playwright-core').chromium; }
catch (_) { console.log('SKIP playwright-core is not installed: npm i playwright-core'); process.exit(2); }

const results=[];
function check(name, pass, detail=''){ results.push(!!pass); console.log(`  ${pass?'PASS':'FAIL'}  ${name}${detail?`  (${detail})`:''}`); }
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2'};
function serve(){ return new Promise(resolve=>{ const server=http.createServer((req,res)=>{ const pathname=decodeURIComponent(new URL(req.url,'http://x').pathname); const requested=pathname.endsWith('/')?pathname+'index.html':pathname; const target=path.resolve(ROOT,'.'+requested); if(!target.startsWith(ROOT+path.sep)){res.writeHead(403).end();return;} fs.readFile(target,(err,body)=>{if(err){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':TYPES[path.extname(target).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);});}); server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port})); }); }

(async()=>{
  const {server,port}=await serve();
  const executablePath=process.env.PW_CHROME;
  const browser=await chromium.launch(executablePath?{executablePath}:{});
  const page=await browser.newPage({viewport:{width:1365,height:768}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  try{
    const base=`http://127.0.0.1:${port}`;
    await page.goto(base+'/iran/index.html',{waitUntil:'networkidle'});
    await page.waitForSelector('.ir-video-forward');

    check('Topic 1 declares six student filing groups', await page.locator('[data-group]').count()===6, `${await page.locator('[data-group]').count()} groups`);
    check('map/geography section renders', await page.locator('#map textarea[data-group="geography"]').isVisible());
    check('video-forward pathway renders three cards', await page.locator('.ir-watch').count()===3, `${await page.locator('.ir-watch').count()} cards`);

    const cards=page.locator('.ir-watch');
    check('Watch 1 is REQUIRED', (await cards.nth(0).locator('.ir-watch-status').innerText()).trim()==='REQUIRED');
    check('Watch 1 launches the direct 9:19 PBS segment', (await cards.nth(0).locator('a.ir-watch-link').getAttribute('href'))==='https://www.pbs.org/video/iran-war-sot-nick-live-tag-1772489548/');
    check('Watch 2 is TEACHER CHOICE', (await cards.nth(1).locator('.ir-watch-status').innerText()).trim()==='TEACHER CHOICE');
    check('Watch 3 is OPTIONAL EXTEND', (await cards.nth(2).locator('.ir-watch-status').innerText()).trim()==='OPTIONAL EXTEND');
    check('Watch 3 launches the direct 7:17 PBS energy segment', (await cards.nth(2).locator('a.ir-watch-link').getAttribute('href'))==='https://www.pbs.org/video/energy-risks-1772489465/');
    check('Topic 1 does not collapse a reading block by mistake', await page.locator('details.ir-full-background').count()===0);

    await page.locator('[data-group="prediction"] input').first().check();
    for(const key of ['geography','reverse-reason','evidence','perspective','claim']){
      await page.locator(`[data-group="${key}"]`).fill(`Smoke test response for ${key}.`);
    }
    await page.waitForTimeout(50);
    check('all six filings persist to localStorage', await page.evaluate(()=>['geography','prediction','reverse-reason','evidence','perspective','claim'].every(k=>localStorage.getItem('bcv2-iran-topic-01-'+k)!==null)));

    await page.locator('[data-gather-topic]').click();
    const gatherStatus=await page.locator('#iran-gather-status').innerText();
    check('Gather This Topic reports six of six', /Gathered 6 of 6 filings/.test(gatherStatus), gatherStatus);
    const gathered=await page.locator('#iran-gather-output').innerText();
    check('gathered record carries BeCurrent manifest', gathered.includes('--- BECURRENT RECORD, do not edit ---') && gathered.includes('#BHV|'));
    const gatherText=await page.locator('#gather').innerText();
    check('Canvas submission directions are present', /paste (it )?into (the )?Canvas assignment/i.test(gatherText) || /paste it into Canvas/i.test(gatherText), gatherText.replace(/\s+/g,' ').slice(0,160));

    await page.setViewportSize({width:768,height:900});
    await page.waitForTimeout(50);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    check('Chromebook-width layout has no horizontal overflow', overflow<=2, `${overflow}px overflow`);
    check('video cards stack and remain visible at Chromebook width', await cards.nth(2).isVisible());
    check('no page JavaScript errors', errors.length===0, errors.join(' | '));
  } finally { await browser.close(); server.close(); }
  const passed=results.filter(Boolean).length;
  console.log(`\n  ${passed}/${results.length} passed\n`);
  process.exit(passed===results.length?0:1);
})().catch(err=>{console.error(err);process.exit(1);});
