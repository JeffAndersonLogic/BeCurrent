/* BeCurrent line icons.
 *
 * The same 24px stroke style as the Midterms pages (scripts/lib/midterms-icons.js),
 * for pages that are static templates rather than generated: any element with
 * data-icon="name" gets the inline SVG. Inline SVG makes no request and inherits
 * currentColor. Every icon is decorative and hidden from screen readers; the
 * words beside it carry the meaning, so a page with scripts off loses nothing.
 *
 * iconForCategory() picks a briefing icon from a news category such as
 * "World / Security", the same way section-photos.js picks a file photo.
 */
(function () {
  'use strict';

  var P = {
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>',
    capitol: '<path d="M3 21h18"/><path d="M5 21v-7"/><path d="M19 21v-7"/><path d="M9 21v-7"/><path d="M15 21v-7"/><path d="M4 14h16"/><path d="M6 14a6 6 0 0 1 12 0"/><path d="M12 8V3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4"/><path d="M15 2v4"/><path d="M9 18v4"/><path d="M15 18v4"/><path d="M2 9h4"/><path d="M2 15h4"/><path d="M18 9h4"/><path d="M18 15h4"/>',
    chart: '<path d="M3 3v18h18"/><path d="M8 17v-5"/><path d="M13 17V8"/><path d="M18 17v-8"/>',
    newspaper: '<path d="M4 4h13v16H6a2 2 0 0 1-2-2Z"/><path d="M17 8h3v10a2 2 0 0 1-2 2"/><path d="M8 8h5"/><path d="M8 12h5"/><path d="M8 16h3"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    ship: '<path d="M2 20c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/><path d="M4 16 3 11h18l-1 5"/><path d="M7 11V6h10v5"/><path d="M12 6V3"/>',
    rewind: '<path d="M11 19 2 12l9-7Z"/><path d="M22 19l-9-7 9-7Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    question: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    roots: '<path d="M12 2v10"/><path d="M12 12c0 4-4 4-6 8"/><path d="M12 12c0 4 4 4 6 8"/><path d="M12 12v10"/>',
    archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6Z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    radio: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.5"/><path d="M7.8 16.2a6 6 0 0 1 0-8.5"/><path d="M19.1 4.9a10 10 0 0 1 0 14.2"/><path d="M4.9 19.1a10 10 0 0 1 0-14.2"/>'
  };

  var RULES = [
    ['shield', /secur|war|militar|defen|conflict|attack|strike/i],
    ['chip', /tech|cyber|\bai\b|artificial|digital|internet|science/i],
    ['chart', /econom|trade|tariff|business|market|money|jobs/i],
    ['newspaper', /media|press|journalis/i],
    ['capitol', /democra|election|congress|politic|court|government|u\.s\./i]
  ];

  function svg(name) {
    if (!P[name]) return '';
    return '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
      + 'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
      + P[name] + '</svg>';
  }

  function iconForCategory(category) {
    var text = String(category || '');
    for (var i = 0; i < RULES.length; i++) if (RULES[i][1].test(text)) return RULES[i][0];
    return 'globe';
  }

  function paint(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      if (el.dataset.iconPainted === el.dataset.icon) return;
      el.innerHTML = svg(el.dataset.icon);
      el.dataset.iconPainted = el.dataset.icon;
      el.setAttribute('aria-hidden', 'true');
    });
  }

  window.BECURRENT_ICONS = { svg: svg, paint: paint, iconForCategory: iconForCategory };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { paint(); });
  else paint();
})();
