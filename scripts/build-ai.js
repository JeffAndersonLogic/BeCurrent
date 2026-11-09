#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const unit=require('./lib/unit-content/ai');
const render=require('./lib/ai-renderer');
const CHECK=process.argv.includes('--check');
// Forward class plans come from the same calendar as the AI map and Canvas pack.
const vm=require('vm');
const schedulePath='assets/data/announcements-schedule.js';
const scheduleSource=fs.readFileSync(path.join(ROOT,schedulePath),'utf8');
const sandbox={window:{}};vm.runInNewContext(scheduleSource,sandbox);
const schedule=sandbox.window.BECURRENT_SCHEDULE;
const calendar=require('./lib/semester-calendar');
schedule.assessments=schedule.assessments.filter(a=>a.date<'2026-11-09').concat(calendar.events.filter(e=>e.kind.endsWith('exam')).map(e=>({date:e.date,title:calendar.displayTitle(e),type:e.kind==='final-exam'?'Final exam':'Test'})));
schedule.days=schedule.days.filter(d=>d.date<'2026-11-09').concat(require('./lib/semester-calendar').boardDays(unit)).sort((a,b)=>a.date.localeCompare(b.date));
const scheduleTail=scheduleSource.slice(scheduleSource.indexOf("if(typeof document"));
const files=render(unit);
files[schedulePath]='/* Schedule: historical entries retained; forward dates generated from scripts/lib/semester-calendar.js by build-ai.js. */\nwindow.BECURRENT_SCHEDULE='+JSON.stringify(schedule,null,2)+';\n'+scheduleTail;
let changed=[];
for(const [file,text] of Object.entries(files)){
 const dest=path.join(ROOT,file);
 if(fs.existsSync(dest)&&fs.readFileSync(dest,'utf8')===text)continue;
 changed.push(file);
 if(!CHECK){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text,'utf8')}
}
if(CHECK&&changed.length){console.error('AI unit files drifted from canonical source:\n'+changed.join('\n'));process.exitCode=1}
else console.log(CHECK?'PASS: AI unit generated pages match source.':'AI unit generated: '+changed.length+' files.');
