'use strict';
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');
exports.open=async function(){
 let chromium;try{chromium=require('playwright-core').chromium}catch(_){console.log('SKIP: playwright-core not installed');process.exit(2)}
 const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);const file=path.resolve(ROOT,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));if(!file.startsWith(ROOT+path.sep)){res.writeHead(403).end();return}fs.readFile(file,(err,b)=>{if(err){res.writeHead(404).end();return}const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2'}[path.extname(file)]||'application/octet-stream';res.writeHead(200,{'Content-Type':type});res.end(b)})});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try {const browser=await chromium.launch(process.env.PW_CHROME?{executablePath:process.env.PW_CHROME}:{});return {browser,server,root:'http://127.0.0.1:'+server.address().port}}catch(e){server.close();throw e}
};
