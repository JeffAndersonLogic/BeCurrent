#!/usr/bin/env node
'use strict';
// November 17, 2026 AI unit: full NOVA AI1, 4 established lessons renumbered,
// AI6 study guide and December 8 Canvas-only exam.
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'../..');
const unit=require('../lib/unit-content/ai');
const cal=require('../lib/semester-calendar');
const render=require('../lib/ai-renderer');
const pages=render(unit);
assert.strictEqual(unit.meta.code,'AI');
assert.strictEqual(unit.meta.renderer,'ai-investigation');
assert.strictEqual(unit.topics.length,4);
assert.strictEqual(unit.meta.openingFilm.url,'https://www.youtube.com/watch?v=-sB12gk9ESA');
assert.strictEqual(unit.meta.openingFilm.fullRuntime,'53:30');
assert.strictEqual(unit.meta.assessment.date,'2026-12-08');
assert.deepStrictEqual(unit.meta.assessment.distribution,{AI2:6,AI3:6,AI4:6,AI5:7});
assert.deepStrictEqual(unit.topics.map(t=>'AI'+t.n),['AI2','AI3','AI4','AI5']);
assert.deepStrictEqual(unit.topics.map(t=>t.date),['2026-11-19','2026-11-23','2026-11-30','2026-12-02']);
assert.deepStrictEqual(unit.topics.map(t=>t.page),['block-02.html','block-03.html','block-04.html','block-05.html']);
assert.deepStrictEqual(unit.days.map(d=>'AI'+d.code),['AI1','AI6']);
assert.strictEqual(unit.days[0].date,'2026-11-17');
assert.strictEqual(unit.days[1].date,'2026-12-04');
assert.deepStrictEqual(unit.meta.schedule,cal.events.map(e=>[e.date,cal.displayTitle(e)]));
for(const [filename,content] of Object.entries(pages)){
 const file=path.join(ROOT,filename);
 assert(fs.existsSync(file),filename+' must exist');
 assert.strictEqual(fs.readFileSync(file,'utf8'),content,filename+' must match canonical source');
}
const film=pages['ai/opening-film.html'];
assert.match(film,/A\.I\. Revolution/);
assert.match(film,/53:30/);
assert.match(film,/November 17/i);
assert.match(film,/CNN10/);
assert.match(film,/No homework/);
assert.doesNotMatch(film,/data-slot=|id="gather-work"/);
assert.doesNotMatch(film,/60 Minutes|President Trump|CE - /);
assert.match(pages['ai/november-09-interview.html'],/60 Minutes/);
assert.match(pages['ai/block-01.html'],/block-02\.html/);
assert.match(pages['ai/print-topic-01.html'],/print-topic-02\.html/);
assert.strictEqual([...pages['ai/print-topic-02.html'].matchAll(/<article>/g)].length,8);
for(let n=2;n<=5;n++){
 const html=pages['ai/block-0'+n+'.html'];
 assert.strictEqual([...html.matchAll(/data-slot="ai-q\d"/g)].length,8,'AI'+n+' must offer eight response slots');
 assert.match(html,/video-first-record\.js/);
 assert.match(html,/id="gather-work"/);
 assert.match(html,/id="copy-preview"/);
 assert.match(html,/ai-midnight-ember\.css/);
 assert.match(html,new RegExp('data-lesson="ai-t0'+n+'"'));
 assert.doesNotMatch(html,/magicschool\.ai\//i,'private MagicSchool join links cannot appear on the public site');
}
assert.match(pages['ai/study-guide.html'],/AI6 - Study Guide Work Day/);
assert.match(pages['ai/study-guide.html'],/AI5/);
assert.match(pages['teacher/ai-review-os.html'],/December 8/);
const canvas=pages['docs/canvas/ai-unit-calendar.html'];
for(const event of cal.events){
 assert(canvas.includes(event.title),'Missing Canvas event '+event.title);
}
assert.match(canvas,/November 17/);
assert.match(canvas,/CE - AI1 - Intro to AI \(Nova Video\)/);
assert.match(canvas,/CE - AI6 - Study Guide Work Day/);
const novaSection=canvas.split('<section id="day-2026-11-17">')[1].split('</section>')[0];
assert.match(novaSection,/No assignment HTML for today: no written work/);
assert.match(novaSection,/NOVA/);
assert.doesNotMatch(novaSection,/Assignment: Online|data-copy="assignment-/);
const shared=fs.readFileSync(path.join(ROOT,'assets/js/video-first.js'),'utf8');
assert.match(shared,/bcRecordManifest\(/);
assert.match(shared,/body\.dataset\.sortSlot\|\|'chamber-sort'/);
const manifest=fs.readFileSync(path.join(ROOT,'teacher/teaching-os-manifest.js'),'utf8');
for(let n=1;n<=6;n++)assert(manifest.includes('"code":"AI'+n+'"'));
const raw=fs.readFileSync(path.join(ROOT,'assets/data/announcements-schedule.js'),'utf8');
const sandbox={window:{}};vm.runInNewContext(raw,sandbox);
const future=sandbox.window.BECURRENT_SCHEDULE.days.filter(d=>d.date>='2026-11-09');
assert.deepStrictEqual(JSON.parse(JSON.stringify(future)),cal.boardDays(unit));
assert.strictEqual(future.find(d=>d.date==='2026-11-17').topicTitle,'AI1 - Intro to AI (Nova Video)');
assert.strictEqual(future.find(d=>d.date==='2026-11-23').topicTitle,'AI3 - When AI Gets it Wrong');
assert.strictEqual(future.find(d=>d.date==='2026-12-04').topicTitle,'AI6 - Study Guide Work Day');
assert.strictEqual(future.find(d=>d.date==='2026-11-17').deskMode,undefined);
assert.strictEqual(future.find(d=>d.date==='2026-11-17').showLead,true,'Nov17 NOVA board must show updated lead');
const newsSrc=fs.readFileSync(path.join(ROOT,'assets/data/daily-news.js'),'utf8');
const newsEnv={window:{}};vm.runInNewContext(newsSrc,newsEnv);
const news=newsEnv.window.BECURRENT_DAILY_NEWS;
// The Lead changes with the news; check its shape, not one day's headline.
assert(/^\d{4}-\d{2}-\d{2}$/.test(news.reviewed)&&news.reviewed>='2026-11-17','daily news reviewed date is current');
assert(news.lead.headline&&news.lead.dek,'Lead has a headline and a summary');
assert.match(news.lead.url,/^https:\/\/(www\.)?(apnews\.com|npr\.org|pbs\.org|cbsnews\.com)\//,'Lead comes from an approved outlet');
assert.strictEqual(future.find(d=>d.date==='2026-11-19').showLead,true,'Nov19 AI2 board shows the news slide');
assert.doesNotMatch(JSON.stringify(future),/CE - /);
assert.match(pages['finals/study-guide.html'],/traditional final exam on Wednesday, December 16/i);
console.log('PASS: AI1 full NOVA on Nov 17, CNN10/no homework, four renumbered Canvas investigations, AI6 review, Dec 8 exam and generated pages.');
