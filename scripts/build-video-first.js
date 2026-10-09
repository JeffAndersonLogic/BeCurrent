#!/usr/bin/env node
'use strict';
/**
 * Rebuild the Canvas record grammar for video-first units from the canonical
 * implementation. The template pages stay bespoke, like the Iran investigation.
 */
const fs=require('fs');
const path=require('path');
const {recordBlockSource}=require('./lib/canvas-record-block');
const ROOT=path.resolve(__dirname,'..');
const OUT=path.join(ROOT,'assets/js/video-first-record.js');
const expected='// GENERATED from scripts/lib/canvas-record-block.js via scripts/build-video-first.js. Do not hand-edit.\n'+recordBlockSource().trimEnd()+'\n';
const actual=fs.existsSync(OUT)?fs.readFileSync(OUT,'utf8'):'';
const check=process.argv.includes('--check');
if(check){
  if(actual!==expected){
    console.error('video-first Canvas grammar has drifted. Run node scripts/build-video-first.js');
    process.exit(1);
  }
  console.log('OK: video-first Canvas grammar matches the canonical BeCurrent parser contract.');
}else if(actual!==expected){
  fs.writeFileSync(OUT,expected,'utf8');
  console.log('Wrote assets/js/video-first-record.js');
}else{
  console.log('Video-first Canvas grammar up to date.');
}
