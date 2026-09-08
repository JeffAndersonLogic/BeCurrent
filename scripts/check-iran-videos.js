#!/usr/bin/env node
'use strict';

const catalog=require('./lib/iran-video-content');
const live=process.argv.includes('--live');
const requiredOnly=process.argv.includes('--required-only');
const allowed=new Set(['REQUIRED','REQUIRED EXCERPT','OPTIONAL EXTEND','OPTIONAL CURRENT UPDATE','TEACHER CHOICE']);
const problems=[],rows=[];
function fail(message){problems.push(message)}
function external(url){return /^https:\/\//.test(url)}
const topics=Object.entries(catalog.topics||{});
if(topics.length!==8)fail(`expected 8 topics, found ${topics.length}`);
for(const [topicId,topic] of topics){
  const isDocumentaryDay=topicId==='topic-01'||topicId==='topic-02';
  const min=isDocumentaryDay?1:2,max=isDocumentaryDay?1:3;
  if(!Array.isArray(topic.videos)||topic.videos.length<min||topic.videos.length>max){fail(`${topicId} should define ${isDocumentaryDay?'exactly 1':'2–3'} video/resource card${isDocumentaryDay?'':'s'}`);continue}
  for(const [i,v] of topic.videos.entries()){
    const tag=`${topicId} watch ${i+1}`;
    for(const key of ['label','status','source','runtime','title','url','why','after','verified'])if(!String(v[key]||'').trim())fail(`${tag} missing ${key}`);
    if(!allowed.has(v.status))fail(`${tag} has unsupported status ${v.status}`);
    if(!Array.isArray(v.listen)||v.listen.length<2)fail(`${tag} needs at least two listen-for cues`);
    if(external(v.url)&&!/^https:\/\/(www\.)?(pbs\.org|youtube\.com)\//.test(v.url))fail(`${tag} uses an unapproved external host: ${v.url}`);
    if(/pbs\.org/.test(v.url)&&/full-episode/i.test(v.url))fail(`${tag} points at a PBS full-episode URL instead of a direct segment: ${v.url}`);
    if(/youtube\.com/.test(v.url)&&!/[?&]v=[A-Za-z0-9_-]{6,}/.test(v.url))fail(`${tag} does not look like a direct YouTube watch URL: ${v.url}`);
    rows.push({topicId,index:i+1,...v});
  }
}
if(!live){if(problems.length){console.error('\nIran video metadata is not launch-ready:\n');problems.forEach(p=>console.error(`  ✗ ${p}`));process.exit(1)}console.log(`✓ Iran video metadata passes static launch checks (${rows.length} cards; audited ${catalog.reviewed}).`);console.log('  Days 1–2 intentionally use one FRONTLINE card each; Days 3–8 use targeted support resources.');console.log('  Run: node scripts/check-iran-videos.js --live');process.exit(0)}
async function checkOne(row){if(!external(row.url))return{row,ok:true,status:'local'};const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);try{const response=await fetch(row.url,{method:'GET',redirect:'follow',headers:{'user-agent':'Mozilla/5.0 BeCurrent launch-readiness check'},signal:controller.signal});return{row,ok:response.ok,status:response.status,finalUrl:response.url}}catch(error){return{row,ok:false,status:error.name||'ERROR',error:String(error.message||error)}}finally{clearTimeout(timeout)}}
(async()=>{if(problems.length){problems.forEach(p=>console.error(`✗ ${p}`));process.exit(1)}const candidates=rows.filter(r=>!requiredOnly||/^REQUIRED/.test(r.status));console.log(`Checking ${candidates.length} ${requiredOnly?'required ':''}Iran video/resource links...`);const results=[],queue=candidates.slice();async function worker(){while(queue.length)results.push(await checkOne(queue.shift()))}await Promise.all(Array.from({length:Math.min(4,queue.length||1)},worker));results.sort((a,b)=>a.row.topicId.localeCompare(b.row.topicId)||a.row.index-b.row.index);let failed=0;for(const result of results){const label=`${result.row.topicId} W${result.row.index} ${result.row.status}`;if(result.ok)console.log(`✓ ${label} — ${result.status} — ${result.row.title}`);else{failed++;console.error(`✗ ${label} — ${result.status} — ${result.row.url}`)}}if(failed){console.error(`\n${failed} link(s) failed live launch readiness.`);process.exit(1)}console.log(`\n✓ All ${results.length} checked links responded successfully.`)})();
