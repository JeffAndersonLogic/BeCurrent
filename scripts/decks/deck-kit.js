'use strict';

/**
 * The BeCurrent slide kit.
 *
 * One design system for every teaching deck in this repo, so two decks built a
 * month apart still look like the same course. It is deliberately small: a
 * palette, three type roles, and six primitives. Anything a deck needs that is
 * not here should be added here rather than inlined into one deck, for the same
 * reason the briefs share a renderer.
 *
 * POLARITY. Content slides are newsprint under ink, and only the opening and
 * closing slides are dark. That is the rule from CLAUDE.md, and it is about
 * rooms rather than taste: a lamp projector can only add light, so in a lit
 * classroom a dark slide degrades to washed-out grey while a light one puts the
 * lumens to work. See the Polarity section of CLAUDE.md before flipping it.
 *
 * TYPE. Cambria for display, Calibri for body, Courier New for the small
 * all-caps eyebrows. The brand faces are Source Serif 4 and Source Sans 3, and
 * they are deliberately NOT used here: a .pptx carries a font name, not a font,
 * so a face the teacher's machine and the projector laptop do not both have
 * silently substitutes and reflows the slide in front of the room. These three
 * ship with Office everywhere.
 *
 * NO STRIPES. No accent bars, no rules under titles, no single-edge borders on
 * cards. Separation comes from whitespace, a tint, and a soft shadow.
 */

const pptxgen = require('pptxgenjs');

// Pulled from assets/css/becurrent-brief.css so the deck and the Brief a
// student reads are the same course. The two tints are the flat equivalents of
// the stylesheet's translucent --signal-tint and --cool-tint over newsprint,
// because a .pptx fill cannot carry alpha.
const P = {
  ink:        '14171A',
  inkSoft:    '3C444C',
  newsprint:  'F4F2ED',
  paper:      'FFFEFB',
  slate900:   '171B1F',
  slate700:   '2B3238',
  slate500:   '5C6873',
  signal:     'B22222',
  signalDeep: '8A1A1A',
  signalPale: 'E8A0A0',
  signalTint: 'F2E1E1',
  cool:       '1F5673',
  coolTint:   'E3EAEE',
  rule:       'D9D6CF',
  onDark:     'FFFEFB',
  onDarkSoft: 'A8B2BA'
};

const F = { display: 'Cambria', body: 'Calibri', mono: 'Courier New' };

// LAYOUT_16x9 is 10in x 5.625in. Coordinates past the edge are written, not
// clamped, so every helper below is measured against these three numbers.
const W = 10;
const H = 5.625;
const M = 0.6;
const CW = W - 2 * M;

// pptxgenjs converts option objects to EMU in place on first use, so a shared
// shadow object silently corrupts the second shape that borrows it. Build one
// per call.
function shadow() {
  return { type: 'outer', color: '9A968A', blur: 7, offset: 1, angle: 90, opacity: 0.2 };
}

function newDeck(meta) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';   // must be set before the first slide is added
  pres.author = 'BeCurrent';
  pres.company = 'BeCurrent';
  pres.title = meta.title;
  pres.subject = meta.subject || '';
  return pres;
}

function light(pres) {
  const s = pres.addSlide();
  s.background = { color: P.newsprint };
  return s;
}

function dark(pres) {
  const s = pres.addSlide();
  s.background = { color: P.slate900 };
  return s;
}

/** Small all-caps mono label. The one repeated identity mark on every slide. */
function eyebrow(s, text, o) {
  o = o || {};
  s.addText(String(text).toUpperCase(), {
    x: o.x === undefined ? M : o.x,
    y: o.y === undefined ? 0.4 : o.y,
    w: o.w === undefined ? CW : o.w,
    h: 0.26,
    fontFace: F.mono, fontSize: o.size || 10, bold: true, charSpacing: 1.4,
    color: o.color || P.signal, margin: 0, valign: 'middle'
  });
}

/** The motif: a filled circle carrying a number or a very short glyph. */
function chip(s, label, o) {
  const d = o.d || 0.46;
  const fill = o.fill || P.signal;
  s.addShape('ellipse', {
    x: o.x, y: o.y, w: d, h: d,
    fill: { color: fill }, line: { color: fill, width: 0 }
  });
  s.addText(String(label), {
    x: o.x, y: o.y, w: d, h: d, align: 'center', valign: 'middle',
    fontFace: F.mono, fontSize: o.size || 12, bold: true,
    color: o.color || P.onDark, margin: 0
  });
}

function title(s, text, o) {
  o = o || {};
  s.addText(text, {
    x: o.x === undefined ? M : o.x,
    y: o.y === undefined ? 0.78 : o.y,
    w: o.w === undefined ? CW : o.w,
    h: o.h === undefined ? 0.8 : o.h,
    fontFace: F.display, fontSize: o.size || 30, bold: true,
    color: o.color || P.ink, margin: 0, valign: 'top',
    lineSpacingMultiple: 0.92
  });
}

function card(s, o) {
  s.addShape('roundRect', {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.06,
    fill: { color: o.fill || P.paper },
    line: { color: o.line || P.rule, width: 0.75 },
    shadow: o.flat ? undefined : shadow()
  });
}

/** Body copy. margin:0 so text edges line up with cards and circles at the same x. */
function body(s, text, o) {
  s.addText(text, {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fontFace: o.face || F.body, fontSize: o.size || 14,
    color: o.color || P.inkSoft, bold: !!o.bold, italic: !!o.italic,
    align: o.align || 'left', valign: o.valign || 'top',
    margin: 0, lineSpacingMultiple: o.lineSpacing || 1.06
  });
}

/** A bulleted list. bullet:true per item, never a literal glyph. */
function bullets(s, items, o) {
  const runs = items.map((t, i) => ({
    text: t,
    options: {
      bullet: { indent: 14 },
      breakLine: i < items.length - 1,
      paraSpaceAfter: o.gap === undefined ? 8 : o.gap
    }
  }));
  s.addText(runs, {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fontFace: o.face || F.body, fontSize: o.size || 14,
    color: o.color || P.inkSoft, margin: 0,
    valign: o.valign || 'top', lineSpacingMultiple: o.lineSpacing || 1.04
  });
}

/** Course line, bottom left. Slide numbers are deliberately absent: a deck that
 *  gets reordered mid-unit should not have to be renumbered. */
function footer(s, text, o) {
  o = o || {};
  s.addText(text, {
    x: M, y: H - 0.52, w: CW, h: 0.28,
    fontFace: F.mono, fontSize: 8, charSpacing: 1,
    color: o.color || P.slate500, margin: 0, valign: 'middle'
  });
}

module.exports = { pptxgen, P, F, W, H, M, CW, newDeck, light, dark, eyebrow, chip, title, card, body, bullets, footer, shadow };
