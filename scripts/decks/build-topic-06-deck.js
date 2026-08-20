'use strict';

/**
 * Social Media, Topic 6: Who Gets to Decide? The projected deck.
 *
 *   node scripts/decks/build-topic-06-deck.js
 *
 * Needs pptxgenjs, which is deliberately not a declared dependency of this repo:
 * `npm i pptxgenjs`. See scripts/decks/README.md.
 *
 * NUMBERING. This is Topic 6 in the teaching plan and Block 5 in
 * scripts/lib/unit-content/social-media.js, because How a Lie Travels was added
 * to the arc after that file was written. The slides carry the teaching number,
 * TOPIC_N below, and the module is read for its prose. When the module is
 * renumbered, change TOPIC_N and nothing else.
 *
 * WHERE THE WORDS COME FROM. The positions, the precedents and the questions are
 * read out of the block itself rather than retyped, so the deck cannot drift from
 * the Brief a student read the night before. The condensed lines are shortened
 * versions of that same prose, and GUARDS below fails the build if the block
 * stops saying what these slides claim it says. That check is the point: a deck
 * that silently teaches last term's argument is worse than one that will not
 * build.
 */

const fs = require('fs');
const path = require('path');
const K = require('./deck-kit.js');
const { P, F, M, CW } = K;

const TOPIC_N = 6;
const UNIT = require('../lib/unit-content/social-media.js');
const B = UNIT.blocks.find(b => b.slug === 'who-decides');

const plain = s => String(s).replace(/<[^>]+>/g, '');
const OUT = path.join(__dirname, '..', '..', 'social-media', 'decks', 'topic-06-who-gets-to-decide.pptx');
const FOOT = 'BECURRENT  ·  SOCIAL MEDIA  ·  TOPIC ' + TOPIC_N;

/* ── Guards. Each one is a thing a slide below asserts about the block. ────── */
(function guards() {
  const fail = m => { throw new Error('social-media.js changed under this deck: ' + m); };
  if (!B) fail('no block with slug who-decides');
  if (B.sections.length !== 5) fail('expected 5 sections, found ' + B.sections.length);
  ['You decide', 'The company decides', 'The government decides'].forEach((h, i) => {
    if (plain(B.sections[i + 1].heading) !== h) fail('section ' + (i + 1) + ' is no longer "' + h + '"');
  });
  ['regulation', 'self-regulation', 'precedent', 'tradeoff', 'unintended consequence'].forEach(t => {
    if (!B.terms.includes(t)) fail('the term "' + t + '" is gone');
  });
  if (B.questions.length !== 3) fail('expected 3 questions, found ' + B.questions.length);
  if (!B.takeaway.includes('state the other side well enough that they would recognize it')) {
    fail('the takeaway no longer ends the way the closing slide quotes it');
  }
  if (!UNIT.meta.terminalQuestion.includes('you, the company, or the government')) {
    fail('the terminal question no longer names the three positions');
  }
})();

const POSITIONS = [
  { ord: 'Position one', heading: plain(B.sections[1].heading),
    strongest: [
      'It is your attention and your phone.',
      'The controls exist: delete the app, turn off notifications, use the chronological feed, set a timer.',
      'Adults get to make bad choices about their own time, and treating teenagers as incapable of choosing is its own kind of insult.'
    ],
    hardest: 'The app was designed by people whose job was to make it hard to put down, and they are '
      + 'very good at their job. Is a choice still free when one side has thousands of engineers and '
      + 'A/B tests and you have willpower?' },
  { ord: 'Position two', heading: plain(B.sections[2].heading),
    strongest: [
      'They built it, they pay for it, and you are not required to use it.',
      'Self-regulation is not nothing. Companies do change things, sometimes because users complain and sometimes because bad press costs money.',
      'They also know how the product works better than any regulator will.'
    ],
    hardest: 'The company\'s income depends on your attention. When you ask somebody to protect you '
      + 'from the thing that pays them, what should you expect?' },
  { ord: 'Position three', heading: plain(B.sections[3].heading),
    strongest: [
      'Regulation means the government sets rules a company has to follow.',
      'We already do this: seatbelts, no cigarette ads on TV, no full-time child labor.',
      'People once said each of those should be personal. Almost nobody does now.'
    ],
    hardest: 'A government that can require a platform to change what it shows you can also require '
      + 'it to change what it shows you. The power to protect and the power to control are the same '
      + 'power, in different hands.' }
];

const PRECEDENTS = [
  ['1954', 'Comic books', 'A Senate hearing and an industry code.'],
  ['1970s', 'Television violence', 'Hearings across the decade.'],
  ['1985', 'Music lyrics', 'Senate hearings and the parental advisory sticker.'],
  ['1993', 'Video games', 'Hearings, and the rating on every box today.']
];

// The teaching script, one entry per slide in order.
const NOTES = [
  'Open by keeping the promise. You told them on day one that a hard question was coming, and this '
  + 'is it. Read the question off the slide and then stop talking. Do not let anybody answer yet.',

  'Two minutes, and the point is that today is earned. Four topics of machinery so that this can be '
  + 'an argument instead of a room of opinions. Read the Reading Target aloud: they are graded on the '
  + 'side they did not pick.',

  'Put the three answers up and take a straw poll by hands, without discussion. Note the split on the '
  + 'board and leave it there; you will come back to it at the end and ask who moved.',

  'This is the slide that decides whether the argument is any good. Say it plainly: nobody in this '
  + 'argument is stupid. If a position sounds obviously wrong, they are arguing with the weak version '
  + 'of it, and beating the weak version teaches nothing.',

  'Define tradeoff and then hold everybody to it for the rest of the block. An answer with no cost in '
  + 'it is not finished, and that is the standard you will grade against, so say so now rather than '
  + 'after.',

  'Take the strongest case first and make somebody who disagrees state it. Then the hardest question, '
  + 'and do not resolve it. Willpower against thousands of engineers is the honest shape of the '
  + 'problem, not a rhetorical trick.',

  'The self-regulation card is the one they underrate, so give it real weight: bad press does move '
  + 'companies. Then the hardest question, which is the cleanest conflict of interest in the unit. '
  + 'Let the silence sit.',

  'Lead with the ordinary cases, because seatbelts and cigarette ads are the reason this position is '
  + 'not exotic. Then the hardest question, and read it slowly enough that they hear the same sentence '
  + 'twice. The Watch For belongs in the argument without settling it.',

  'Thirty seconds a column, as a memory aid before they write. If a student cannot state the cost of '
  + 'their own position, they are not ready to write about it, and this is where you find that out.',

  'This is the AP move: the argument has a history. Four fights, four media, and they have heard of '
  + 'none of them. Ask what the four have in common before you turn the slide.',

  'Both halves matter. Every one ended in self-regulation under threat rather than in a law, which '
  + 'predicts something. And several of the strongest claims did not hold up, which predicts something '
  + 'else. Sincere and wrong is the pair to sit with.',

  'Now break the precedent on purpose. A comic book did not know who was holding it. Any argument '
  + 'from 1954 has to survive these three differences, and naming what is different is half of using '
  + 'a precedent well.',

  'Section 230 is the one fact that changes how the argument feels: the current arrangement is one '
  + 'sentence that survived a court case, not the natural state of things. If they think the rules are '
  + 'permanent, they will argue as if nothing can change.',

  'Return to the straw poll from the start and ask who moved and why. Then set the writing: the '
  + 'strongest version of the side they did not pick. Last line out loud, because it is the whole '
  + 'assessment: state it well enough that somebody who holds it would recognize it.'
];

let noteIx = 0;
function notes(s) {
  if (noteIx >= NOTES.length) throw new Error('more slides than speaker notes');
  s.addNotes(NOTES[noteIx++]);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });

const pres = K.newDeck({
  title: plain(B.title) + ', Social Media Topic ' + TOPIC_N,
  subject: 'BeCurrent, Current Events'
});

/* ── 01. Title ──────────────────────────────────────────────────────────────── */
{
  const s = K.dark(pres);
  K.chip(s, '0' + TOPIC_N, { x: M, y: 0.6, d: 0.56, size: 14 });
  K.eyebrow(s, 'Social Media · Topic ' + TOPIC_N, { x: 1.32, y: 0.75, color: P.signalPale });
  K.title(s, plain(B.title), { y: 1.42, h: 0.95, size: 42, color: P.onDark });
  K.body(s, plain(B.deck), { x: M, y: 2.5, w: 7.5, h: 0.9, face: F.display, size: 17, italic: true,
    color: P.onDarkSoft, lineSpacing: 1.15 });

  B.skillTags.forEach((tag, i) => {
    const w = 2.0 + i * 0.55;
    const x = M + i * 2.22;
    K.card(s, { x, y: 3.72, w, h: 0.36, fill: P.slate700, line: P.slate700, flat: true });
    K.body(s, tag.toUpperCase(), { x, y: 3.72, w, h: 0.36, face: F.mono, size: 9, bold: true,
      color: P.signalPale, align: 'center', valign: 'middle' });
  });

  notes(s);
  K.footer(s, FOOT, { color: P.onDarkSoft });
}

/* ── 02. Where this sits ────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Before you read');
  K.title(s, 'Everything so far was so that today is a real argument', { size: 25 });

  const arc = [
    ['1', 'Where the money comes from', 'You built the chain from opening an app to a company getting paid.'],
    ['2', 'Somebody made a film about it', 'You took the film apart the way you took your app apart.'],
    ['3', 'Inside the algorithm box', 'You opened the box almost every chain had in the middle.'],
    ['4', 'Go check it yourself', 'You read the company\'s own document instead of guessing at it.'],
    ['5', 'How a lie travels', 'You found out what that machine rewards, and who builds for it.']
  ];
  arc.forEach(([n, label, text], i) => {
    const y = 1.6 + i * 0.54;
    K.chip(s, n, { x: M, y: y + 0.02, d: 0.34, size: 9.5, fill: P.slate700 });
    K.body(s, label, { x: 1.08, y, w: 2.7, h: 0.3, size: 12.5, bold: true, color: P.ink, valign: 'middle' });
    K.body(s, text, { x: 3.88, y, w: 5.5, h: 0.3, size: 12.5, valign: 'middle' });
  });

  K.card(s, { x: M, y: 4.3, w: CW, h: 0.64, fill: P.coolTint, line: P.coolTint });
  K.body(s, 'TODAY', { x: 0.86, y: 4.3, w: 0.7, h: 0.64, face: F.mono, size: 8.5, bold: true,
    color: P.cool, valign: 'middle' });
  K.body(s, plain(B.support[1].body), { x: 1.62, y: 4.3, w: 7.5, h: 0.64, size: 12,
    color: P.ink, valign: 'middle', lineSpacing: 1.04 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 03. The question ──────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'The question');
  K.body(s, UNIT.meta.terminalQuestion, { x: M, y: 0.76, w: 8.6, h: 1.35, face: F.display,
    size: 25, bold: true, color: P.ink, lineSpacing: 1.06 });

  const answers = [
    ['You', 'It is your attention.'],
    ['The company', 'They built it.'],
    ['The government', 'We already do this.']
  ];
  answers.forEach(([label, line], i) => {
    const x = M + i * 3.0;
    K.card(s, { x, y: 2.36, w: 2.8, h: 1.5 });
    K.chip(s, String(i + 1), { x: x + 0.24, y: 2.58, d: 0.38, size: 10.5 });
    K.body(s, label, { x: x + 0.24, y: 3.06, w: 2.32, h: 0.3, size: 16, bold: true,
      color: P.ink, face: F.display });
    K.body(s, line, { x: x + 0.24, y: 3.4, w: 2.32, h: 0.3, size: 12.5 });
  });

  K.body(s, 'You will not be graded on which one you pick.',
    { x: M, y: 4.14, w: CW, h: 0.34, face: F.display, size: 18, bold: true, color: P.ink });
  K.body(s, 'You will be graded on whether you can state the strongest version of the one you did not pick.',
    { x: M, y: 4.54, w: CW, h: 0.34, size: 13.5 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 04. The ground rule ───────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Ground rule');
  K.title(s, 'Nobody in this argument is stupid');

  K.body(s, 'Every one of these three positions is held by serious people who have thought about it '
    + 'more than we have.',
    { x: M, y: 1.78, w: 4.4, h: 1.0, size: 15, color: P.ink, lineSpacing: 1.2 });

  K.card(s, { x: 5.3, y: 1.7, w: 4.1, h: 1.9, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'THE TRAP', { x: 5.58, y: 1.94, w: 3.54, h: 0.24, face: F.mono, size: 9, bold: true,
    color: P.signalDeep });
  K.body(s, 'If a position sounds obviously wrong to you, you are probably arguing against the weak '
    + 'version of it.',
    { x: 5.58, y: 2.26, w: 3.54, h: 1.1, size: 14, color: P.ink, lineSpacing: 1.18 });

  K.body(s, 'Beating the weak version of an argument teaches you nothing, and it is the easiest thing '
    + 'in the room to do by accident.',
    { x: M, y: 3.9, w: CW, h: 0.5, size: 13.5, italic: true, lineSpacing: 1.14 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 05. The standard ──────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'The standard');
  K.title(s, 'Every answer costs something');

  K.card(s, { x: M, y: 1.7, w: CW, h: 1.0, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'An answer with no tradeoff in it is not finished.',
    { x: 0.9, y: 1.7, w: 8.2, h: 1.0, face: F.display, size: 22, bold: true, color: P.ink,
      valign: 'middle' });

  const cols = [
    ['TRADEOFF', 'You give something up to get something. Every answer here has one.'],
    ['SO, TODAY', 'Name your position, then name what it costs. If you cannot, you are not finished.']
  ];
  cols.forEach(([label, text], i) => {
    const x = M + i * 4.6;
    K.card(s, { x, y: 2.94, w: 4.2, h: 1.4 });
    K.body(s, label, { x: x + 0.26, y: 3.18, w: 3.68, h: 0.24, face: F.mono, size: 9, bold: true,
      color: i === 0 ? P.cool : P.signalDeep });
    K.body(s, text, { x: x + 0.26, y: 3.5, w: 3.68, h: 0.72, size: 13.5, color: P.ink, lineSpacing: 1.14 });
  });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 06, 07, 08. The three positions ──────────────────────────────────────── */
POSITIONS.forEach((pos, i) => {
  const s = K.light(pres);
  K.chip(s, String(i + 1), { x: M, y: 0.34, d: 0.38, size: 10.5 });
  K.eyebrow(s, pos.ord, { x: 1.1, y: 0.4 });
  K.title(s, pos.heading, { y: 0.9, size: 32 });

  const cardH = i === 2 ? 2.25 : 2.75;
  K.card(s, { x: M, y: 1.78, w: 4.2, h: cardH });
  K.body(s, 'THE STRONGEST CASE', { x: 0.86, y: 2.0, w: 3.68, h: 0.24, face: F.mono, size: 9,
    bold: true, color: P.cool });
  K.bullets(s, pos.strongest, { x: 0.86, y: 2.32, w: 3.68, h: cardH - 0.72, size: 12.5, gap: 8 });

  K.card(s, { x: 5.2, y: 1.78, w: 4.2, h: cardH, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'THE HARDEST QUESTION', { x: 5.46, y: 2.0, w: 3.68, h: 0.24, face: F.mono, size: 9,
    bold: true, color: P.signalDeep });
  K.body(s, pos.hardest, { x: 5.46, y: 2.32, w: 3.68, h: cardH - 0.72, size: 13, color: P.ink,
    lineSpacing: 1.16 });

  if (i === 2) {
    K.card(s, { x: M, y: 4.22, w: CW, h: 0.7, fill: P.coolTint, line: P.coolTint });
    K.body(s, 'WATCH FOR', { x: 0.86, y: 4.36, w: 1.3, h: 0.22, face: F.mono, size: 8.5, bold: true,
      color: P.cool });
    K.body(s, 'An unintended consequence is a result nobody wanted or predicted. Rules aimed at big '
      + 'platforms often land hardest on small ones that cannot afford lawyers.',
      { x: 2.2, y: 4.3, w: 6.9, h: 0.54, size: 12, color: P.ink, lineSpacing: 1.06 });
  }

  notes(s);
  K.footer(s, FOOT);
});

/* ── 09. All three at a glance ────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Before you write');
  K.title(s, 'The case, and the cost');

  const grid = [
    ['You', 'It is your attention, and the controls exist.', 'The other side has thousands of engineers. You have willpower.'],
    ['The company', 'They built it, and bad press does move them.', 'Their income is your attention. You are asking the wrong party.'],
    ['The government', 'Seatbelts. Cigarette ads. Child labor.', 'Protect and control are the same power, in different hands.']
  ];
  grid.forEach(([label, kase, cost], i) => {
    const x = M + i * 3.0;
    K.card(s, { x, y: 1.7, w: 2.8, h: 2.7 });
    K.body(s, label, { x: x + 0.24, y: 1.92, w: 2.32, h: 0.3, size: 16, bold: true, color: P.ink,
      face: F.display });
    K.body(s, 'THE CASE', { x: x + 0.24, y: 2.34, w: 2.32, h: 0.22, face: F.mono, size: 8.5,
      bold: true, color: P.cool });
    K.body(s, kase, { x: x + 0.24, y: 2.6, w: 2.32, h: 0.62, size: 12, lineSpacing: 1.06 });
    K.body(s, 'THE COST', { x: x + 0.24, y: 3.3, w: 2.32, h: 0.22, face: F.mono, size: 8.5,
      bold: true, color: P.signalDeep });
    K.body(s, cost, { x: x + 0.24, y: 3.56, w: 2.32, h: 0.7, size: 12, lineSpacing: 1.06 });
  });

  K.body(s, 'If you cannot say the cost of your own position, you are not ready to write about it yet.',
    { x: M, y: 4.56, w: CW, h: 0.34, size: 13.5, italic: true });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 10. Precedent ────────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'The method');
  K.title(s, plain(B.sections[4].heading), { size: 30 });

  PRECEDENTS.forEach(([year, medium, outcome], i) => {
    const x = M + i * 2.23;
    K.card(s, { x, y: 1.8, w: 2.05, h: 2.0 });
    K.body(s, year, { x: x + 0.22, y: 2.0, w: 1.61, h: 0.36, face: F.display, size: 20, bold: true,
      color: P.signalDeep });
    K.body(s, medium, { x: x + 0.22, y: 2.44, w: 1.61, h: 0.5, size: 13, bold: true, color: P.ink,
      lineSpacing: 1.04 });
    K.body(s, outcome, { x: x + 0.22, y: 2.98, w: 1.61, h: 0.7, size: 11.5, lineSpacing: 1.04 });
  });

  K.body(s, 'A precedent is an earlier case that people point to when deciding a new one. This exact '
    + 'fight, about a new medium and what it does to young people, has run at least four times before.',
    { x: M, y: 4.0, w: CW, h: 0.5, size: 13, lineSpacing: 1.14 });
  K.body(s, 'Look at what the four have in common.',
    { x: M, y: 4.56, w: CW, h: 0.3, size: 14, bold: true, color: P.ink });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 11. What they have in common ─────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'The method · what it predicts');
  K.title(s, 'Four for four, and not one of them a law');

  K.card(s, { x: M, y: 1.8, w: 4.2, h: 2.1, fill: P.signalTint, line: P.signalTint });
  K.body(s, '4 of 4', { x: 0.88, y: 2.02, w: 3.64, h: 0.6, face: F.display, size: 34, bold: true,
    color: P.signalDeep });
  K.body(s, 'ended in industry self-regulation under threat of government action, rather than in a law.',
    { x: 0.88, y: 2.68, w: 3.64, h: 1.0, size: 13.5, color: P.ink, lineSpacing: 1.16 });

  K.card(s, { x: 5.2, y: 1.8, w: 4.2, h: 2.1 });
  K.body(s, 'AND WORTH KNOWING', { x: 5.46, y: 2.02, w: 3.68, h: 0.24, face: F.mono, size: 9,
    bold: true, color: P.cool });
  K.body(s, 'The strongest claims made in several of those panics did not hold up later. The comic '
    + 'book research was largely discredited. The video game research is still contested.',
    { x: 5.46, y: 2.34, w: 3.68, h: 1.3, size: 13, lineSpacing: 1.16 });

  K.body(s, 'That history does not tell you the answer. It tells you that "this new thing is harming '
    + 'children" has been said before, sometimes correctly and sometimes not, and that the people '
    + 'saying it were sincere either way.',
    { x: M, y: 4.1, w: CW, h: 0.7, size: 13, lineSpacing: 1.14 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 12. Where the precedent breaks ──────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'AP skill parallel');
  K.title(s, 'Social media is not a comic book');

  const diffs = [
    ['Personalized', 'A comic book did not know who was holding it.'],
    ['Always with you', 'It is not a thing you go to and then leave.'],
    ['It responds to you', 'What you do changes what it does next.']
  ];
  diffs.forEach(([label, text], i) => {
    const x = M + i * 3.0;
    K.card(s, { x, y: 1.8, w: 2.8, h: 1.5 });
    K.body(s, label, { x: x + 0.24, y: 2.04, w: 2.32, h: 0.3, size: 15, bold: true, color: P.ink,
      face: F.display });
    K.body(s, text, { x: x + 0.24, y: 2.42, w: 2.32, h: 0.62, size: 12.5, lineSpacing: 1.08 });
  });

  K.body(s, 'Any argument from precedent has to survive those three differences.',
    { x: M, y: 3.6, w: CW, h: 0.34, face: F.display, size: 18, bold: true, color: P.ink });
  K.body(s, 'Using a precedent well means naming what is the same and what is different. Both halves, '
    + 'every time.',
    { x: M, y: 4.06, w: CW, h: 0.5, size: 13.5, lineSpacing: 1.14 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 13. The Road Not Taken ──────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'The road not taken');
  K.title(s, 'One sentence, from 1996');

  K.card(s, { x: M, y: 1.66, w: CW, h: 0.94, fill: P.signalTint, line: P.signalTint });
  K.body(s, '"A platform is generally not treated as the publisher of what its users post."',
    { x: 0.9, y: 1.66, w: 8.2, h: 0.94, face: F.display, size: 18, italic: true, color: P.ink,
      valign: 'middle' });

  const steps = [
    ['1996', 'Section 230 of the Communications Decency Act. A large part of why the internet looks the way it does.'],
    ['1997', 'The rest of that law is struck down by the Supreme Court as a violation of free speech. Section 230 survives.'],
    ['Since', 'Politicians in both parties have proposed repealing or narrowing it, for opposite reasons.'],
    ['Now', 'It is still there, and people are still fighting over it right now.']
  ];
  steps.forEach(([when, text], i) => {
    const y = 2.72 + i * 0.48;
    K.body(s, when, { x: M, y, w: 0.72, h: 0.28, face: F.mono, size: 10.5, bold: true,
      color: P.signalDeep, valign: 'middle' });
    K.body(s, text, { x: 1.42, y, w: 7.98, h: 0.36, size: 12.5, color: P.ink, valign: 'middle',
      lineSpacing: 1.04 });
  });

  K.body(s, 'The current arrangement is not the natural state of things.',
    { x: M, y: 4.68, w: CW, h: 0.3, size: 13.5, bold: true, color: P.ink });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 14. Closing ─────────────────────────────────────────────────────────── */
{
  const s = K.dark(pres);
  K.eyebrow(s, 'BeReady · 10-second takeaway', { color: P.signalPale });
  K.body(s, 'Three answers, each with a real case and a real cost. Your job is not to win the '
    + 'argument today.',
    { x: M, y: 0.76, w: 8.6, h: 0.76, face: F.display, size: 18.5, bold: true, color: P.onDark,
      lineSpacing: 1.1 });

  K.card(s, { x: M, y: 1.78, w: CW, h: 2.5, fill: P.slate700, line: P.slate700, flat: true });
  K.body(s, 'CHECK YOUR UNDERSTANDING', { x: 0.88, y: 1.98, w: 8.2, h: 0.24, face: F.mono, size: 9,
    bold: true, color: P.signalPale });

  B.questions.forEach((q, i) => {
    const y = 2.38 + i * 0.66;
    K.chip(s, String(i + 1), { x: 0.88, y, d: 0.34, size: 9.5 });
    K.body(s, q.skill.toUpperCase(), { x: 1.36, y: y - 0.02, w: 7.7, h: 0.22, face: F.mono,
      size: 8, bold: true, color: P.signalPale });
    K.body(s, plain(q.text), { x: 1.36, y: y + 0.2, w: 7.7, h: 0.44, size: 12, color: P.onDark,
      lineSpacing: 1.04 });
  });

  K.body(s, 'State the other side well enough that somebody who holds it would say you got it right.',
    { x: M, y: 4.48, w: 8.6, h: 0.34, face: F.display, size: 15, italic: true, color: P.onDarkSoft });

  notes(s);
  K.footer(s, FOOT, { color: P.onDarkSoft });
}

if (noteIx !== NOTES.length) throw new Error('slide count and note count disagree');
if (pres.slides.length !== 14) throw new Error('expected 14 slides, built ' + pres.slides.length);

pres.writeFile({ fileName: OUT }).then(() => console.log('wrote ' + OUT + ' (' + pres.slides.length + ' slides)'));
