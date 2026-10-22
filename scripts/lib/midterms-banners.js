'use strict';
// Chapter banners for the Midterms student pages: one line drawing across the top
// of each chapter, so the five sections read as five sections. Inline SVG makes no
// request and cannot break on a school network. Every banner is decorative: the
// chapter title under it carries the meaning, so the SVG is aria-hidden.
// Ink lines with one red element, the thing the chapter is about. Drawn on a
// 960x160 canvas that scales down whole (preserveAspectRatio meet) rather than
// cropping, because a cropped banner on a phone loses half its meaning.
const INK='#172124',RED='#bf4a34',PAPER='#fff';
const f=n=>Math.round(n*10)/10;
const line=(x1,y1,x2,y2,c=INK,w=3)=>`<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${c}" stroke-width="${w}"/>`;
const arrow=(x1,y,x2,c=INK)=>line(x1,y,x2,y,c)+`<path d="M${x2-9} ${y-7}L${x2} ${y}L${x2-9} ${y+7}" stroke="${c}" stroke-width="3"/>`;
const dot=(x,y,r,fill,stroke=INK)=>`<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const mark=(x,y,ch,c=INK,size=34)=>`<text x="${x}" y="${y}" fill="${c}" stroke="none" font-family="system-ui,Arial,sans-serif" font-weight="700" font-size="${size}" text-anchor="middle">${ch}</text>`;
// A House seating arc: rows of seats in a half circle. Seats left of the split are
// filled; the red seat is the one that makes the majority.
function hemicycle(cx,cy,r0,rows,gap,seat,{split=.5,red=true}={}){let s='';const all=[];
 for(let k=0;k<rows;k++){const r=r0+k*gap,n=Math.max(3,Math.round(Math.PI*r/(seat*2.9)));for(let i=0;i<n;i++){const a=Math.PI-(Math.PI*i/(n-1));all.push({x:cx+r*Math.cos(a),y:cy-r*Math.sin(a),a});}}
 all.sort((p,q)=>q.a-p.a);const cut=Math.floor(all.length*split),key=red?all.reduce((b,p,i)=>Math.abs(p.a-Math.PI/2)<Math.abs(all[b].a-Math.PI/2)&&i>=cut-rows&&i<cut+rows?i:b,cut):-1;
 all.forEach((p,i)=>{s+=i===key?dot(p.x,p.y,seat+2.5,RED,RED):dot(p.x,p.y,seat,i<cut?INK:PAPER);});return s;}
function gavel(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s}) rotate(-32)"><rect x="-34" y="-17" width="68" height="34" rx="7" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M-20 -17v34M20 -17v34" stroke="${INK}" stroke-width="3"/><path d="M0 17v78" stroke="${INK}" stroke-width="7"/></g><ellipse cx="${x+18*s}" cy="${y+92*s}" rx="${44*s}" ry="${9*s}" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>`;}
function columns(x,y,w=74){const n=4,step=w/(n+1);let s=`<path d="M${x} ${y}h${w}M${x+4} ${y-8}h${w-8}M${x+2} ${y-58}h${w-4}" stroke="${INK}" stroke-width="3"/><path d="M${x} ${y-58}L${x+w/2} ${y-82}L${x+w} ${y-58}Z" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>`;for(let i=1;i<=n;i++)s+=line(x+i*step,y-12,x+i*step,y-54);return s;}
function podium(x,y){return `${dot(x,y-70,11,PAPER)}<path d="M${x-24} ${y-36}a24 22 0 0 1 48 0" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M${x-32} ${y-40}h64l-8 40h-48Z" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>${line(x-16,y-22,x+16,y-22)}`;}
function person(x,y,fill=PAPER,c=INK){return `<path d="M${x-17} ${y}a17 16 0 0 1 34 0" fill="${fill}" stroke="${c}" stroke-width="3"/>${dot(x,y-25,9,fill,c)}`;}
function bubble(x,y,w,h){return `<path d="M${x+14} ${y}h${w-28}a14 14 0 0 1 14 14v${h-28}a14 14 0 0 1-14 14h-${w-60}l-22 20 4-20h-${10}a14 14 0 0 1-14-14v-${h-28}a14 14 0 0 1 14-14Z" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>${line(x+22,y+26,x+w-26,y+26,RED)}${line(x+22,y+44,x+w-46,y+44)}${line(x+22,y+62,x+w-70,y+62)}`;}
function megaphone(x,y){return `<path d="M${x} ${y-12}h18l44-24v72l-44-24h-18Z" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M${x+18} ${y+12}l6 28h12l-4-24" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M${x+76} ${y-20}a28 28 0 0 1 0 40M${x+88} ${y-32}a44 44 0 0 1 0 64" stroke="${INK}" stroke-width="3"/>`;}
function agenda(x,y){let s=`<rect x="${x}" y="${y}" width="66" height="84" rx="6" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M${x+20} ${y-6}h26v12h-26Z" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>`;[24,44,64].forEach((d,i)=>{s+=dot(x+16,y+d,4,i?PAPER:RED,i?INK:RED)+line(x+28,y+d,x+54,y+d,i?INK:RED);});return s;}
function magnifier(x,y){return `${dot(x,y,26,PAPER)}${dot(x,y,17,'none','#dae0dd')}<path d="M${x+19} ${y+19}l26 26" stroke="${INK}" stroke-width="8"/>`;}
const ART={
 // 1. Start with one seat: one red seat decides which side holds the majority.
 seat:()=>`${dot(330,100,13,RED,RED)}${arrow(356,100,426,RED)}${hemicycle(560,136,46,5,17,4.6)}${line(452,139,668,139)}`,
 // 2. See how a majority forms: the gavel goes to whoever holds 218 of 435.
 majority:()=>{let s=gavel(278,50,.9);const x=372,w=360,y=70,h=28,half=w*218/435;s+=`<rect x="${x}" y="${y}" width="${f(half)}" height="${h}" fill="${RED}"/><rect x="${f(x+half)}" y="${y}" width="${f(w-half)}" height="${h}" fill="${INK}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="3"/>`+line(x+w/2,y-16,x+w/2,y+h+16,INK,2)+mark(x+w/2,y+h+44,'218',RED,22)+mark(x,y+h+44,'0',INK,18)+mark(x+w,y+h+44,'435',INK,18);return s;},
 // 3. Look inside the committees: the chair (red) leads a panel questioning a witness.
 committee:()=>{let s='';const xs=[330,384,438,492,546,600,654];xs.forEach((x,i)=>{s+=person(x,74,i===3?RED:PAPER,i===3?RED:INK);});s+=`<path d="M300 74h384v20H300Z" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>`;s+=person(492,138)+`<path d="M456 136h72" stroke="${INK}" stroke-width="3"/>`+magnifier(760,80);return s;},
 // 4. Test a campaign promise: a promise still needs the House, Senate and president.
 promise:()=>`${megaphone(170,84)}${bubble(290,26,170,92)}${arrow(486,80,540)}${hemicycle(600,112,16,2,11,3.4,{red:false})}${line(570,113,630,113)}${mark(600,148,'✓',RED,30)}${columns(668,112,64)}${mark(700,148,'?',INK,30)}${podium(790,112)}${mark(790,148,'?',INK,30)}`,
 // 5. Explain the power shift: seat → majority → leaders → agenda, then the limit.
 chain:()=>`${dot(196,84,12,RED,RED)}${arrow(220,84,262,RED)}${hemicycle(320,104,18,3,11,3.4)}${line(286,106,354,106)}${arrow(372,84,414,RED)}${gavel(462,58,.6)}${arrow(524,84,566,RED)}${agenda(584,42)}<path d="M690 22v124" stroke="${RED}" stroke-width="3" stroke-dasharray="7 7"/>${columns(716,120,64)}${podium(830,120)}`
};
// Which drawing heads which chapter (0 Predict … 4 File), per topic.
const BANNERS={2:['seat','majority','committee','promise','chain']};
function banner(n,i){const key=(BANNERS[n]||[])[i];if(!key)return '';if(!ART[key])throw new Error('midterms-banners: no drawing named '+key);
 return `<div class="chapter-banner" data-banner="${key}"><svg width="960" height="160" viewBox="0 0 960 160" preserveAspectRatio="xMidYMid meet" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ART[key]()}</svg></div>`;}
module.exports={banner,BANNERS,ART};
