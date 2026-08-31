#!/usr/bin/env node
'use strict';

/**
 * Lead Mode browser contract.
 *
 * The full Desk remains the default. A dated schedule entry may deliberately set
 * deskMode: 'lead' for a high-cognitive-load investigation day. This test freezes
 * the browser on the scheduled Aug. 28 example and proves that the mode changes the
 * student surface AND the Canvas record rather than merely hiding a card.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const R='\x1b[31m', G='\x1b[32m', Y='\x1b[33m', X='\x1b[0m';

let chromium;
try {
  chromium = require('playwright-core').chromium;
} catch (_) {
  console.log(`${Y}  SKIP  playwright-core is not installed: npm i playwright-core${X}`);
  process.exit(2);
}

const TYPES = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.woff2':'font/woff2'
};

function serve() {
  return new Promise(resolve => {
    const server=http.createServer((req,res)=>{
      const pathname=decodeURIComponent(new URL(req.url,'http://x').pathname);
      const requested=pathname.endsWith('/')?pathname+'index.html':pathname;
      const target=path.resolve(ROOT,'.'+requested);
      if(!target.startsWith(ROOT+path.sep)){res.writeHead(403).end();return;}
      fs.readFile(target,(err,body)=>{
        if(err){res.writeHead(404).end();return;}
        res.writeHead(200,{'Content-Type':TYPES[path.extname(target).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});
        res.end(body);
      });
    });
    server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port}));
  });
}

const results=[];
function check(name,pass,detail){
  results.push(pass);
  console.log(`  ${pass?G+'PASS'+X:R+'FAIL'+X}  ${name}${detail?'  ('+detail+')':''}`);
}

(async()=>{
  const {server,port}=await serve();
  const executablePath=process.env.PW_CHROME;
  const browser=await chromium.launch(executablePath?{executablePath}:{});
  const page=await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));

  try {
    await page.addInitScript(({stamp})=>{
      const RealDate=Date;
      const fixed=new RealDate(stamp).getTime();
      class FakeDate extends RealDate {
        constructor(...args){ super(...(args.length?args:[fixed])); }
        static now(){ return fixed; }
        static parse(value){ return RealDate.parse(value); }
        static UTC(...args){ return RealDate.UTC(...args); }
      }
      window.Date=FakeDate;
    },{stamp:'2026-08-28T12:00:00-04:00'});

    await page.goto(`http://127.0.0.1:${port}/daily/index.html`,{waitUntil:'domcontentloaded'});
    await page.waitForSelector('body[data-desk-mode="lead"]');

    check('the dated schedule selects Lead Mode',
      await page.getAttribute('body','data-desk-mode')==='lead');
    check('Your Pick is removed from the day rather than presented as optional',
      await page.$eval('.pick-card',el=>el.hidden===true));
    check('the Source Shelf is removed when there is no independent story hunt',
      await page.$eval('#sources',el=>el.hidden===true));
    check('the student page explains the shorter mode',
      /Lead Mode keeps the daily news habit/.test(await page.textContent('#file')));

    await page.fill('#answer-local-outlet','Associated Press');
    await page.fill('#answer-local-date','August 28, 2026');
    await page.fill('#answer-local-link','https://apnews.com/example');
    await page.fill('#answer-local-what','A major event happened today, and this sentence identifies the event rather than the reaction.');
    await page.fill('#answer-local-why','It matters because the decision changes what happens next for people affected by it.');

    const storedMode=await page.evaluate(()=>{
      const raw=localStorage.getItem('becurrent-desk-2026-08-28');
      return raw?JSON.parse(raw)._mode:null;
    });
    check('the saved day records that it was a Lead Mode filing',storedMode==='lead',String(storedMode));

    await page.click('button:has-text("Gather My Log")');
    const text=await page.textContent('#desk-gather-output');
    check('the gathered log contains the Lead',/The Lead story/.test(text));
    check('the gathered log does not manufacture blank Your Pick records',!/Your Pick story/.test(text));

    const expected=(text.match(/\|expected=(\d+)\|/)||[])[1];
    check('the manifest expects exactly one source record plus two Lead responses',expected==='3',`expected=${expected}`);
    check('the shorter day is still a complete Canvas-backed filing',
      /Gathered 1 day, 3 of 3 boxes filled/.test(await page.textContent('#desk-gather-status')),
      await page.textContent('#desk-gather-status'));
    check('Lead Mode throws no browser errors',errors.length===0,errors.join(' | ')||'clean');
  } finally {
    await browser.close();
    server.close();
  }

  const failed=results.filter(Boolean).length!==results.length;
  console.log(`\n  ${failed?R:G}${results.filter(Boolean).length}/${results.length} passed${X}\n`);
  process.exit(failed?1:0);
})().catch(err=>{
  console.error(`${R}${err&&err.stack?err.stack:err}${X}`);
  process.exit(1);
});
