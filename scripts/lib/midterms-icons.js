'use strict';
// Inline line icons for the Midterms pages. Inline SVG makes no request and
// inherits currentColor, so an icon is always the colour of the text beside it.
// Every icon is decorative: the words next to it carry the meaning.
const P={
 predict:'<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/>',
 learn:'<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z"/>',
 evidence:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
 apply:'<path d="M12 3v18"/><path d="M5 21h14"/><path d="M3 7h18"/><path d="m6 7-3 7a3 3 0 0 0 6 0Z"/><path d="m18 7-3 7a3 3 0 0 0 6 0Z"/>',
 file:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>',
 play:'<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4Z"/>',
 checklist:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3"/><path d="m9 13 2 2 4-4"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
 document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
 key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3"/><path d="m16 7 3 3"/><path d="m19 4 2 2"/>',
 chart:'<path d="M3 3v18h18"/><path d="M8 17v-5"/><path d="M13 17V8"/><path d="M18 17v-8"/>',
 quote:'<path d="M3 21c3 0 7-1 7-8V5H3v8h4"/><path d="M14 21c3 0 7-1 7-8V5h-7v8h4"/>',
 capitol:'<path d="M3 21h18"/><path d="M5 21v-7"/><path d="M19 21v-7"/><path d="M9 21v-7"/><path d="M15 21v-7"/><path d="M4 14h16"/><path d="M6 14a6 6 0 0 1 12 0"/><path d="M12 8V3"/>',
 people:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6.5 6.5 0 0 1 3.5 6"/>',
 ballot:'<rect x="3" y="11" width="18" height="10" rx="1"/><path d="M8 11V4h8v7"/><path d="m10 7 1.5 1.5L14 6"/>'
};
// The five investigation steps, in page order.
const STEPS=['predict','learn','evidence','apply','file'];
function icon(name,cls='icon'){
 if(!P[name])throw new Error('midterms-icons: no icon named '+name);
 return `<svg class="${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name]}</svg>`;
}
module.exports={icon,STEPS};
