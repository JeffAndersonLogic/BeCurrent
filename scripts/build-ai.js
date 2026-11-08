#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const unit=require('./lib/unit-content/ai');
const render=require('./lib/ai-renderer');
const CHECK=process.argv.includes('--check');
let changed=[];
for(const [file,text] of Object.entries(render(unit))){
 const dest=path.join(ROOT,file);
 if(fs.existsSync(dest)&&fs.readFileSync(dest,'utf8')===text)continue;
 changed.push(file);
 if(!CHECK){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text,'utf8')}
}
if(CHECK&&changed.length){console.error('AI unit files drifted from canonical source:\n'+changed.join('\n'));process.exitCode=1}
else console.log(CHECK?'PASS: AI unit generated pages match source.':'AI unit generated: '+changed.length+' files.');
