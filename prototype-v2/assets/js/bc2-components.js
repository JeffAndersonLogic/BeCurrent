/* =========================================================
   BC2 EDITORIAL COMPONENTS

   The page may feel bespoke; the code must not be. Every treatment on
   the Iran investigation is a function here driven by data, so the
   second investigation is a content file and not a second website.
   That is the whole sustainability argument: a site-wide design change
   is an edit here, once, and a new investigation is writing rather than
   coding.

   ESCAPING, and where it is deliberately not applied. Content in this
   course is authored by the teacher in a repo file, not submitted by a
   student, so it is trusted input. Even so, everything runs through
   esc() by default, because the day someone pastes a headline with an
   ampersand in it should not be the day the page breaks.

   Four fields are RAW on purpose and are marked at every call site:
     · perspectives.verify.points   (carries <strong>)
     · claim.frame                  (carries <strong>)
     · hero standfirst / titles     (carries <em> for the display italic)
   Nothing a STUDENT types is ever passed to innerHTML anywhere in this
   prototype. Student text goes to textContent, which is why My Work
   renders their writing with white-space:pre-wrap instead of <br>.
   ========================================================= */
(function () {
  'use strict';

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* An external link always carries rel="noopener noreferrer". The repo
     already requires it for video; the reasoning is identical for a
     source link, and a course that teaches source-checking should not
     leak its referrer to every outlet a student clicks. */
  function extLink(url, text, cls) {
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer"'
      + (cls ? ' class="' + esc(cls) + '"' : '') + '>' + esc(text) + '</a>';
  }

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  }

  /* ── MASTHEAD ─────────────────────────────────────────────────────
     THE WORDMARK, reinterpreted from the existing BeCurrent logo.

     Three things carry that mark's identity and all three are kept:

       1. SMALL CAPS. It is B-e-C-urrent set as caps and small caps, not
          title case. Rendering "urrent" in lowercase — which is what an
          earlier pass here did — loses the logo at a glance even with the
          C the right size. The small caps are real ones by construction:
          uppercase text at a smaller size, rather than font-variant, so
          they do not depend on a face that ships no true small caps.
       2. THE OVERSIZED C, tucked slightly left so it nests against the E
          the way the artwork does.
       3. THE TAPERED BLADE beneath it, which is half the recognition and
          was missing entirely.

     What changes is only the colour. The red is gone: the letters are
     ivory, the C is frosted, and the blade is a platinum-to-steel
     gradient — metal suggested by tone rather than by a chrome bevel.
     The teacher's brief asked for ivory text with a silver C and that is
     what this is. */
  function masthead(opts) {
    var nav = opts.nav || [];
    var links = nav.map(function (n) {
      var cur = (n.id === opts.current) ? ' aria-current="page"' : '';
      return '<li><a href="' + esc(n.href) + '"' + cur + '>' + esc(n.label) + '</a></li>';
    }).join('');

    return ''
      + '<div class="wrap">'
      +   '<div class="masthead-top">'
      +     '<div>'
      +       '<a class="wordmark" href="index.html">'
      // DOM text stays "BeCurrent" so the accessible name is the brand
      // name and not "B E C U R R E N T". The caps are done with CSS.
      +         '<span class="wm-word">'
      +           '<span class="wm-cap">B</span><span class="wm-sc">e</span>'
      +           '<span class="wm-c">C</span><span class="wm-sc">urrent</span>'
      +         '</span>'
      +         '<svg class="wm-blade" viewBox="0 0 100 4" preserveAspectRatio="none"'
      +           ' aria-hidden="true" focusable="false">'
      +           '<defs><linearGradient id="wmBlade" x1="0" y1="0" x2="1" y2="0">'
      +             '<stop offset="0" stop-color="#B8BDC0"/>'
      +             '<stop offset=".45" stop-color="#D9DCDE"/>'
      +             '<stop offset="1" stop-color="#747B80"/>'
      +           '</linearGradient></defs>'
      +           '<path d="M20 3.4 L36 1.25 L100 .6 L60 3.9 Z" fill="url(#wmBlade)"/>'
      +         '</svg>'
      +       '</a>'
      +       '<p class="masthead-tag">Understand today. Trace it back.</p>'
      +     '</div>'
      +     '<div class="mode-toggle" role="group" aria-label="View mode">'
      +       '<button type="button" data-mode-btn="student" aria-pressed="true">Student</button>'
      +       '<button type="button" data-mode-btn="teacher" aria-pressed="false">Teacher</button>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '<nav class="mainnav" aria-label="Main">'
      +   '<div class="wrap"><ul>' + links + '</ul></div>'
      + '</nav>';
  }

  var NAV = [
    { id: 'today',   label: 'Today',          href: 'index.html' },
    { id: 'invest',  label: 'Investigations', href: 'index.html#investigations' },
    { id: 'trace',   label: 'Trace it back',  href: 'investigation-iran.html#trace' },
    { id: 'sources', label: 'Sources',        href: 'investigation-iran.html#sources' },
    { id: 'work',    label: 'My work',        href: 'my-work.html' }
  ];

  /* ── THE CURRENT WIRE ─────────────────────────────────────────────
     Curated by hand, capped at five. See bc2-wire.js for why there is
     no live feed. */
  function wire(data) {
    if (!data || !data.items || !data.items.length) return '';
    var items = data.items.slice(0, 5).map(function (it) {
      return '<li><a class="wire-item" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">'
        + '<span class="wire-src">' + esc(it.source) + '</span>'
        + '<span class="wire-head">' + esc(it.headline) + '</span>'
        + '</a></li>';
    }).join('');

    return '<div class="wrap"><div class="wire-inner">'
      + '<p class="wire-label"><span class="wire-dot" aria-hidden="true"></span>The Current Wire</p>'
      + '<ul class="wire-list">' + items + '</ul>'
      + '</div></div>';
  }

  /* ── HERO ─────────────────────────────────────────────────────────
     Two image layers: local plate underneath, photograph on top with
     onerror removing itself. A dead remote URL degrades to on-topic
     artwork rather than an empty frame, and an empty photo string is a
     valid choice that renders the plate alone. */
  function heroMedia(hero) {
    var out = '<div class="hero-media">';
    if (hero.plate) {
      out += '<img class="hero-plate" src="' + esc(hero.plate) + '" alt="' + esc(hero.plateAlt || '') + '"'
        + (hero.plateAlt ? '' : ' aria-hidden="true"') + '>';
    }
    if (hero.photo) {
      out += '<img class="hero-photo" src="' + esc(hero.photo) + '" alt="' + esc(hero.photoAlt || '') + '"'
        + (hero.photoAlt ? '' : ' aria-hidden="true"') + ' onerror="this.remove()">';
    }
    out += '</div>';
    return out;
  }

  function investigationHero(inv, current, opts) {
    opts = opts || {};
    var cta = opts.ctaLabel || 'Start investigation';
    return ''
      + heroMedia(inv.hero)
      + '<div class="wrap hero-inner">'
      +   '<div>'
      +     '<p class="eyebrow hero-eyebrow"><span class="hero-date">' + esc(opts.dateLabel || '') + '</span>'
      +        esc(inv.hero.eyebrow) + '</p>'
      // RAW on purpose: titleHtml carries <em> for the display italic.
      +     '<h1>' + (inv.hero.titleHtml || esc(inv.title)) + '</h1>'
      +     '<p class="hero-standfirst">' + esc(inv.hero.standfirst) + '</p>'
      +     '<a class="btn-primary" href="' + esc(opts.href || 'investigation-iran.html') + '">'
      +       esc(cta) + ' <span class="arrow" aria-hidden="true">&rarr;</span></a>'
      +   '</div>'
      +   headlinePanel(current)
      + '</div>';
  }

  /* Today's headline. Three facts, each traceable, and an explicit
     "as of" line — a course about verification cannot be vague about
     how fresh its own claims are. */
  function headlinePanel(current) {
    var facts = current.headline.facts.map(function (f) {
      return '<li>' + esc(f.text) + '</li>';
    }).join('');

    return '<aside class="headline-panel" aria-labelledby="hp-h">'
      + '<h2 id="hp-h">Today’s headline</h2>'
      + '<p class="hp-lead">' + esc(current.headline.lead) + '</p>'
      + '<ul>' + facts + '</ul>'
      + '<p class="hp-asof">Verified ' + esc(current.asOfLabel) + '</p>'
      + '</aside>';
  }

  /* ── REVERSE HISTORY PREVIEW ──────────────────────────────────────
     The homepage version: the same node list, no panels, one link in.
     It is on the homepage because it is the signature of the product
     and because it answers "what is this course" faster than a
     paragraph about methodology would. */
  function reverseHistoryPreview(hist, href) {
    var nodes = hist.nodes.map(function (n, i) {
      return ''
        + '<li class="rh-node" data-now="' + (n.now ? 'true' : 'false') + '" data-depth="' + i + '">'
        +   (i > 0 ? '<span class="rh-arrow" aria-hidden="true">&#9664;</span>' : '')
        +   '<span class="rh-year">' + esc(n.year) + '</span>'
        +   '<span class="rh-dot" aria-hidden="true"></span>'
        +   '<span class="rh-label">' + esc(n.label) + '</span>'
        + '</li>';
    }).join('');

    return ''
      + '<div class="rh">'
      +   '<p class="rh-axis">'
      +     '<span>Today</span>'
      +     '<span class="rh-axis-back">Digging backward <span aria-hidden="true">&rarr;</span></span>'
      +   '</p>'
      +   '<ul class="rh-track rh-track-static">' + nodes + '</ul>'
      + '</div>'
      + '<p style="margin-top:26px"><a class="btn-ghost" href="' + esc(href) + '">'
      +   'Open the full timeline <span aria-hidden="true">&rarr;</span></a></p>';
  }

  /* ── INVESTIGATION CARDS ──────────────────────────────────────────
     A planned card carries the QUESTION it will ask and nothing else.
     No invented summary, no fake date. */
  function investigationCards(list) {
    return '<div class="inv-grid">' + list.map(function (it) {
      var planned = it.status !== 'active';
      var media = '<div class="inv-media">'
        + (planned ? '<p class="inv-planned-flag">Not written yet</p>' : '')
        + (it.art ? '<img src="' + esc(it.art) + '" alt="" aria-hidden="true">' : '')
        + '</div>';

      var body = '<div class="inv-body">'
        + '<p class="inv-status">' + (planned ? 'Planned' : 'Active now') + '</p>'
        + '<h3>' + esc(it.title) + '</h3>'
        + '<p class="inv-note">' + esc(planned ? (it.question || '') : (it.note || '')) + '</p>'
        + '</div>';

      // A planned investigation is not a link. A card that navigates
      // nowhere is worse than one that plainly says it is not ready.
      if (planned) {
        return '<div class="inv-card" data-status="planned">' + media + body + '</div>';
      }
      return '<a class="inv-card" data-status="active" href="' + esc(it.href) + '">' + media + body + '</a>';
    }).join('') + '</div>';
  }

  /* ── CONTINUE STRIP ───────────────────────────────────────────────
     Where you are, and the way back in. Never a percentage: a number
     invites a student to optimise the number. */
  function continueStrip(inv, prog) {
    if (!prog || !prog.last) return '';
    var step = null;
    for (var i = 0; i < inv.steps.length; i++) {
      if (inv.steps[i].id === prog.last) step = inv.steps[i];
    }
    if (!step) return '';

    return '<div class="continue">'
      + '<div>'
      +   '<p class="c-where">You’re here</p>'
      +   '<p class="c-what">' + esc(inv.displayTitle) + '</p>'
      +   '<p class="c-step">You left off at ' + esc(step.label) + '.</p>'
      + '</div>'
      + '<a class="btn-ghost" href="investigation-iran.html#' + esc(step.id) + '">'
      +   'Pick up where you left off <span aria-hidden="true">&rarr;</span></a>'
      + '</div>';
  }

  /* ── SOURCE LIST ──────────────────────────────────────────────────
     Every source used anywhere on the investigation, in one place, with
     a note saying what it was used FOR. A bare list of links is a
     bibliography; saying what each carried is source-checking. */
  function sourceList(sources, order) {
    var keys = order || Object.keys(sources);
    return '<ul class="src-list">' + keys.map(function (k) {
      var s = sources[k];
      if (!s) return '';
      return '<li>'
        + '<span class="src-org">' + esc(s.org) + '</span>'
        + '<span class="src-main">' + extLink(s.url, s.title)
        +   (s.note ? '<span class="src-note">' + esc(s.note) + '</span>' : '')
        + '</span>'
        + '</li>';
    }).join('') + '</ul>';
  }

  function footer() {
    return '<div class="wrap foot-grid">'
      + '<div>'
      +   '<p><strong>BeCurrent</strong> — a current-events course built around one question at a time.</p>'
      +   '<p class="foot-note">Your writing is saved on this device only. Nothing on this page sends it anywhere.</p>'
      + '</div>'
      + '<div>'
      +   '<p class="foot-note">BeCurrent 2.0 prototype. Not the live student site.</p>'
      + '</div>'
      + '</div>';
  }

  window.BC2 = {
    esc: esc,
    extLink: extLink,
    mount: mount,
    NAV: NAV,
    masthead: masthead,
    wire: wire,
    heroMedia: heroMedia,
    investigationHero: investigationHero,
    headlinePanel: headlinePanel,
    reverseHistoryPreview: reverseHistoryPreview,
    investigationCards: investigationCards,
    continueStrip: continueStrip,
    sourceList: sourceList,
    footer: footer
  };
})();
