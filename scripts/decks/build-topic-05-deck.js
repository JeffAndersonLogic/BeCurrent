'use strict';

/**
 * Social Media, Topic 5: How a Lie Travels. The projected deck.
 *
 *   node scripts/decks/build-topic-05-deck.js
 *
 * Needs pptxgenjs, which is deliberately not a declared dependency of this repo:
 * `npm i pptxgenjs`. See scripts/decks/README.md for why, and for the numbering
 * note (the teaching plan's Topic 5 has no block in social-media.js yet).
 *
 * SOURCE OF TRUTH. Every claim, date, name and figure on these slides comes from
 * the Topic 5 Brief. Nothing here is invented: no headline, statistic, date or
 * quotation was added that the Brief does not carry. That constraint is the whole
 * subject of the lesson, and a deck that broke it while teaching it would be the
 * worst available outcome. When the Brief changes, change the slides, and when
 * the Brief's block lands in scripts/lib/unit-content/social-media.js, rewrite
 * this file to read from it so the two cannot disagree.
 *
 * REGISTER, from the unit's own note: short sentences, one idea each, concrete
 * before abstract, flat and curious, never ominous. The moment it sounds like an
 * adult warning them about screens, the room files it away and stops reading.
 */

const path = require('path');
const K = require('./deck-kit.js');
const { P, F, M, CW, H } = K;

const fs = require('fs');
const OUT = path.join(__dirname, '..', '..', 'social-media', 'decks', 'topic-05-how-a-lie-travels.pptx');
const FOOT = 'BECURRENT  ·  SOCIAL MEDIA  ·  TOPIC 5';

fs.mkdirSync(path.dirname(OUT), { recursive: true });

const pres = K.newDeck({
  title: 'How a Lie Travels, Social Media Topic 5',
  subject: 'BeCurrent, Current Events'
});

// The teaching script, one entry per slide in order. Kept here rather than beside
// each slide so the whole spoken arc can be read in one pass, which is how a
// block actually gets rehearsed.
const NOTES = [
  "Open cold, without the word misinformation on the board. Read the deck line and stop. The question is not whether people lie, it is the speed difference between a claim and its correction. Say out loud that nobody is going to be asked today whether they personally fall for things.",
  "Two minutes. Point back at their own work: the chain from Topic 1 and the ranking number from Topic 3 are the two things today rests on. Read the Reading Target aloud, because it is the whole assessment: check a claim in under two minutes and SAY what you checked.",
  "This is the distinction the rest of the block runs on, so do not rush it. Same words on the screen, different sender. Ask for a case where they could not tell which one they were looking at, and let the answer be \"you often cannot.\"",
  "Spend most of the time on the third card. Ask for a headline where every fact underneath was true and the headline still misled. If nobody has one, use one from the week's reading. Name it framing, and say it is far more common than outright invention.",
  "The point of this case is trust, not the market. The account was one people had reason to believe, which is why one sentence moved money in seconds. Note the recovery too: corrections do work, they are just slower and quieter than the claim.",
  "Four cards, four minutes. Do not moralize. Bots is the one they usually have backwards, so press it: the network is not there to persuade anyone, it is there to manufacture the look of consensus. End on Emotion and let the last line land: naming the feeling is the counter, and it takes four seconds.",
  "This is the intellectual center of the block. Walk the chain left to right and make them supply the third box. Nobody at the company decided to promote a lie; the number did it. If a student says \"so it is not their fault\", that is the setup for Topic 6, so hold it rather than answering it.",
  "Slow down here. Give them the design of the study before the finding: 126,000 cascades, eleven years, then the move that makes it matter, which is removing the bots and getting the same answer. Ask what that implies before you say it. The last line is theirs to arrive at.",
  "Two cases, and they do different jobs. Veles kills the assumption that this is always ideological: it was advertising money. Pizzagate is the consequence case, and deliver it flatly. The Watch For is the important part for this room: the comfortable explanations are the ones that put the problem outside it.",
  "This is the practical half of the block, so demonstrate it live rather than describing it. Take one claim, leave the page, open two tabs, and narrate what you are doing. The Stanford contrast is worth naming: the students were studying the things the page itself controls.",
  "Do not skip this slide. It is the failure mode this course could accidentally teach, and the sharpest students are the ones most at risk of it. Doubting everything is not sophistication and it helps a campaign. Land on calibration, then on the one rule with the best return.",
  "Fast pass, thirty seconds a card, because the Brief carries the detail. The two worth pausing on are procedure, because it changes turnout rather than opinion, and the regulation gap, because it is the handoff to Topic 6: nobody voted on those policies.",
  "Model intellectual honesty here. The echo chamber is the explanation they have heard most and it is the shakiest thing in the block. Point at the Facebook affiliation and ask what to do about it: read it carefully, not throw it out. Then flag that somebody will propose exactly this fix in Topic 6.",
  "Read the takeaway, then set the three questions. Both cards under each question in the Brief are real answers, so say that out loud, and say the confidence rating is not graded. Last thing on the way out: tomorrow you get asked who should be allowed to do this."
];

let noteIx = 0;
function notes(s) {
  if (noteIx >= NOTES.length) throw new Error('more slides than speaker notes');
  s.addNotes(NOTES[noteIx++]);
}


/* ── 01. Title ──────────────────────────────────────────────────────────────── */
{
  const s = K.dark(pres);
  K.chip(s, '05', { x: M, y: 0.6, d: 0.56, size: 14 });
  K.eyebrow(s, 'Social Media · Topic 5', { x: 1.32, y: 0.75, color: P.signalPale });
  K.title(s, 'How a Lie Travels', { y: 1.42, h: 0.95, size: 42, color: P.onDark });
  K.body(s, 'The interesting question is not whether people lie online. '
    + 'It is why the lie moves faster than the correction.',
    { x: M, y: 2.5, w: 7.5, h: 0.9, face: F.display, size: 17, italic: true, color: P.onDarkSoft, lineSpacing: 1.15 });

  ['SOURCING', 'CORROBORATION'].forEach((tag, i) => {
    const w = 1.5 + i * 0.6;
    const x = M + i * 1.72;
    K.card(s, { x, y: 3.72, w, h: 0.36, fill: P.slate700, line: P.slate700, flat: true });
    K.body(s, tag, { x, y: 3.72, w, h: 0.36, face: F.mono, size: 9, bold: true, color: P.signalPale, align: 'center', valign: 'middle' });
  });

  notes(s);
  K.footer(s, FOOT, { color: P.onDarkSoft });
}

/* ── 02. Where this sits ────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Before you read');
  K.title(s, 'You know the machine. Now what it rewards.', { size: 27 });

  const rows = [
    ['1', 'Topic 1', 'The click is what pays. You drew that chain yourself.'],
    ['3', 'Topic 3', 'The feed is optimized for a number somebody chose.'],
    ['5', 'Topic 5', 'What that number rewards, and who builds for it deliberately.']
  ];
  rows.forEach(([n, label, text], i) => {
    const y = 1.9 + i * 0.92;
    K.chip(s, n, { x: M, y, d: 0.44, fill: i === 2 ? P.signal : P.slate700, size: 11 });
    K.body(s, label, { x: 1.2, y: y - 0.02, w: 3.9, h: 0.26, size: 12, bold: true, color: P.ink, face: F.mono });
    K.body(s, text, { x: 1.2, y: y + 0.24, w: 3.9, h: 0.52, size: 13 });
  });

  K.card(s, { x: 5.4, y: 1.84, w: 4.0, h: 2.66, fill: P.coolTint, line: P.coolTint });
  K.body(s, 'READING TARGET', { x: 5.68, y: 2.12, w: 3.44, h: 0.26, face: F.mono, size: 9, bold: true, color: P.cool });
  K.body(s, 'Check a claim you are unsure about in under two minutes, and say out loud '
    + 'what you checked, rather than that you did not believe it.',
    { x: 5.68, y: 2.5, w: 3.44, h: 1.7, size: 14.5, color: P.ink, lineSpacing: 1.2 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 03. Misinformation and disinformation ──────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part one');
  K.title(s, 'Two words. The difference is the sender.');

  const pairs = [
    ['MISINFORMATION', 'False information spread by somebody who thinks it is true.', P.coolTint, P.cool],
    ['DISINFORMATION', 'False information spread by somebody who knows it is false.', P.signalTint, P.signalDeep]
  ];
  pairs.forEach(([label, text, fill, ink], i) => {
    const x = M + i * 4.6;
    K.card(s, { x, y: 1.68, w: 4.2, h: 1.5, fill, line: fill });
    K.body(s, label, { x: x + 0.28, y: 1.92, w: 3.64, h: 0.28, face: F.mono, size: 10, bold: true, color: ink });
    K.body(s, text, { x: x + 0.28, y: 2.28, w: 3.64, h: 0.72, size: 14, color: P.ink, lineSpacing: 1.16 });
  });

  K.body(s, 'Identical content. Different sender. Your response should be different.',
    { x: M, y: 3.42, w: CW, h: 0.36, face: F.display, size: 19, bold: true, color: P.ink });
  K.body(s, 'You can correct a person who is mistaken. You cannot correct a campaign, '
    + 'because being wrong was the plan.',
    { x: M, y: 3.9, w: 8.0, h: 0.6, size: 14, lineSpacing: 1.16 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 04. The three shapes ───────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part one · the shapes');
  K.title(s, 'Three shapes it arrives in');

  const shapes = [
    ['1', 'Viral hoax', 'A story that is simply invented.'],
    ['2', 'Doctored image', 'Edited, and now often generated outright rather than edited at all.'],
    ['3', 'Misleading headline', 'Every fact underneath it can be true while the headline still leaves you believing something false.']
  ];
  shapes.forEach(([n, label, text], i) => {
    const x = M + i * 3.0;
    K.card(s, { x, y: 1.68, w: 2.8, h: 2.1 });
    K.chip(s, n, { x: x + 0.26, y: 1.9, d: 0.4, size: 11 });
    K.body(s, label, { x: x + 0.26, y: 2.42, w: 2.28, h: 0.28, size: 15, bold: true, color: P.ink, face: F.display });
    K.body(s, text, { x: x + 0.26, y: 2.76, w: 2.28, h: 0.74, size: 12.5, lineSpacing: 1.1 });
  });

  K.body(s, 'The third is the sneakiest, and much the most common: that is framing, not invention.',
    { x: M, y: 4.0, w: CW, h: 0.34, face: F.display, size: 16, bold: true, color: P.ink });
  K.body(s, 'Sourcing starts before the content. Who sent this, and do they know whether it is true?',
    { x: M, y: 4.46, w: CW, h: 0.34, size: 13, italic: true });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 05. April 2013 ─────────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'April 2013');
  K.title(s, 'One fake sentence, from an account people had reason to trust');

  K.card(s, { x: M, y: 1.72, w: 5.2, h: 2.35 });
  K.bullets(s, [
    'The Associated Press Twitter account was hacked.',
    'It posted that there had been explosions at the White House and that the president was injured.',
    'The stock market dropped sharply within seconds.',
    'It recovered within minutes, once the agency said it was false.'
  ], { x: 0.88, y: 1.98, w: 4.64, h: 1.85, size: 13.5, gap: 9 });

  K.card(s, { x: 6.1, y: 1.72, w: 3.3, h: 2.35, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'SECONDS', { x: 6.4, y: 1.98, w: 2.7, h: 0.5, face: F.display, size: 30, bold: true, color: P.signalDeep });
  K.body(s, 'to fall', { x: 6.4, y: 2.46, w: 2.7, h: 0.26, face: F.mono, size: 10, color: P.inkSoft });
  K.body(s, 'MINUTES', { x: 6.4, y: 2.9, w: 2.7, h: 0.5, face: F.display, size: 30, bold: true, color: P.signalDeep });
  K.body(s, 'to recover', { x: 6.4, y: 3.38, w: 2.7, h: 0.26, face: F.mono, size: 10, color: P.inkSoft });

  K.body(s, 'A friend forwarding something they believe and an account built to deceive are '
    + 'different problems, even when the words are the same.',
    { x: M, y: 4.3, w: CW, h: 0.5, size: 13.5, italic: true, lineSpacing: 1.12 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 06. The four tactics ───────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part two');
  K.title(s, 'The four tactics');

  const tactics = [
    ['Clickbait', 'A headline written to get the click rather than to tell you what happened. Nobody has to intend to mislead.'],
    ['Deepfake', 'Video or audio of a real person, made by software, saying what they never said. Peele and BuzzFeed, 2018.'],
    ['Bots', 'Automated accounts. Not there to persuade you, there to make a claim look popular.'],
    ['Emotion', 'Anger, fear and outrage get shared far more than anything that makes you think. This one carries the other three.']
  ];
  tactics.forEach(([label, text], i) => {
    const x = M + (i % 2) * 4.6;
    const y = 1.62 + Math.floor(i / 2) * 1.5;
    K.card(s, { x, y, w: 4.2, h: 1.36 });
    K.chip(s, String(i + 1), { x: x + 0.26, y: y + 0.22, d: 0.36, size: 10, fill: i === 3 ? P.signal : P.slate700 });
    K.body(s, label, { x: x + 0.74, y: y + 0.24, w: 3.2, h: 0.3, size: 15, bold: true, color: P.ink, face: F.display });
    K.body(s, text, { x: x + 0.26, y: y + 0.64, w: 3.68, h: 0.6, size: 12.5, lineSpacing: 1.08 });
  });

  K.body(s, 'Every one of the four is aimed at a feeling rather than at your reasoning.',
    { x: M, y: 4.62, w: CW, h: 0.34, face: F.display, size: 16, bold: true, color: P.ink });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 07. The ranking link ───────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part two · put it next to topic 3');
  K.title(s, 'Nobody has to decide to promote a lie');

  const chain = [
    'The system rewards reaction.',
    'Sensational content produces reaction.',
    'Sensational content gets promoted.'
  ];
  chain.forEach((text, i) => {
    const x = M + i * 3.0;
    K.card(s, { x, y: 1.76, w: 2.8, h: 1.02, fill: P.paper });
    K.body(s, text, { x: x + 0.22, y: 1.76, w: 2.36, h: 1.02, size: 13.5, color: P.ink, valign: 'middle', lineSpacing: 1.12 });
    if (i < 2) {
      K.body(s, '>', { x: x + 2.8, y: 1.76, w: 0.2, h: 1.02, face: F.mono, size: 16, bold: true,
        color: P.signal, align: 'center', valign: 'middle' });
    }
  });

  K.card(s, { x: M, y: 3.12, w: CW, h: 0.92, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'A system built to maximize reaction will amplify whatever produces the most reaction, '
    + 'and truth is not what that number measures.',
    { x: 0.9, y: 3.12, w: 8.2, h: 0.92, face: F.display, size: 16.5, italic: true, color: P.ink, valign: 'middle', lineSpacing: 1.14 });

  K.body(s, 'Naming the feeling is the counter. "This is built to make me angry" is a complete '
    + 'defense, and it takes four seconds.',
    { x: M, y: 4.3, w: CW, h: 0.5, size: 13.5, lineSpacing: 1.12 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 08. Who actually spreads it ────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part three');
  K.title(s, 'It is not the bots. It is us.');

  K.card(s, { x: M, y: 1.66, w: 5.0, h: 2.4 });
  K.bullets(s, [
    'In 2018, Vosoughi, Roy and Aral at MIT published a study in Science following roughly 126,000 rumor cascades on Twitter over eleven years.',
    'False stories spread farther, faster, and to more people than true ones. It was not close.',
    'Then they removed all the bot activity and ran it again. The finding held.'
  ], { x: 0.88, y: 1.92, w: 4.44, h: 1.9, size: 13, gap: 9 });

  K.card(s, { x: 5.9, y: 1.66, w: 3.5, h: 2.4, fill: P.signalTint, line: P.signalTint });
  K.body(s, '126,000', { x: 6.18, y: 1.94, w: 2.94, h: 0.56, face: F.display, size: 32, bold: true, color: P.signalDeep });
  K.body(s, 'RUMOR CASCADES  ·  11 YEARS', { x: 6.18, y: 2.5, w: 2.94, h: 0.26, face: F.mono, size: 9, color: P.inkSoft });
  K.body(s, 'Humans did the spreading.', { x: 6.18, y: 3.0, w: 2.94, h: 0.6, face: F.display, size: 17, bold: true, color: P.ink, lineSpacing: 1.1 });

  K.body(s, 'Their explanation was novelty and emotional response. False stories are newer, '
    + 'because they are not constrained by having happened, and novelty is what people forward.',
    { x: M, y: 4.2, w: CW, h: 0.5, size: 13, lineSpacing: 1.1 });
  K.body(s, 'So the fix is mostly not technical. It is the two seconds before you repost.',
    { x: M, y: 4.68, w: CW, h: 0.3, size: 14, bold: true, color: P.ink });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 09. The motive, and the consequence ───────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part three · the motive');
  K.title(s, 'Often money rather than politics');

  const cases = [
    ['VELES, NORTH MACEDONIA · 2016',
      'BuzzFeed News traced a cluster of American political hoax sites to one town, run largely '
      + 'by young people who had found that sensational American politics paid well in advertising.\n\n'
      + 'In the last three months of that campaign, the top false election stories drew more '
      + 'Facebook engagement than the top real ones.'],
    ['PIZZAGATE · 2016',
      'A claim that a child trafficking operation was run out of a Washington DC restaurant. '
      + 'There was nothing to it at all.\n\n'
      + 'In December 2016 a man drove there from another state and fired a rifle inside the '
      + 'building. Nobody was hurt, which was luck.']
  ];
  cases.forEach(([label, text], i) => {
    const x = M + i * 4.6;
    K.card(s, { x, y: 1.66, w: 4.2, h: 2.5 });
    K.body(s, label, { x: x + 0.26, y: 1.9, w: 3.68, h: 0.26, face: F.mono, size: 9, bold: true, color: P.signalDeep });
    K.body(s, text, { x: x + 0.26, y: 2.24, w: 3.68, h: 1.82, size: 12.5, lineSpacing: 1.1 });
  });

  K.card(s, { x: M, y: 4.32, w: CW, h: 0.66, fill: P.coolTint, line: P.coolTint });
  K.body(s, 'WATCH FOR', { x: 0.86, y: 4.44, w: 1.2, h: 0.22, face: F.mono, size: 8.5, bold: true, color: P.cool });
  K.body(s, '"It was bots" and "it was foreign interference" are both real and both comfortable: '
    + 'they put the problem outside the room.',
    { x: 2.1, y: 4.42, w: 7.0, h: 0.46, size: 12.5, color: P.ink, lineSpacing: 1.08 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 10. The checking ──────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part four');
  K.title(s, 'Lateral reading, about ninety seconds');

  K.card(s, { x: M, y: 1.66, w: 4.0, h: 2.5 });
  K.body(s, 'Instead of studying the page you landed on, harder and harder, you leave it. '
    + 'Open new tabs and find out what other sources say about whoever published it.',
    { x: 0.86, y: 1.9, w: 3.48, h: 1.0, size: 13, color: P.ink, lineSpacing: 1.14 });
  K.body(s, 'STANFORD', { x: 0.86, y: 2.98, w: 3.48, h: 0.24, face: F.mono, size: 9, bold: true, color: P.cool });
  K.body(s, 'The professional fact checkers left the page almost immediately. The students stayed '
    + 'on it, examining its design, its logo and its About section, all of which the page controls.',
    { x: 0.86, y: 3.26, w: 3.48, h: 0.78, size: 12, lineSpacing: 1.06 });

  const moves = [
    'Who published this?',
    'When? Old stories recirculate as new ones constantly.',
    'Does anybody else report it? If only one outlet has it, why?',
    'What is the earliest version? The one you saw is several hands down the chain.',
    'For a photograph, a reverse image search.'
  ];
  moves.forEach((text, i) => {
    const y = 1.7 + i * 0.5;
    K.chip(s, String(i + 1), { x: 4.9, y, d: 0.34, size: 9.5, fill: P.slate700 });
    K.body(s, text, { x: 5.38, y: y - 0.02, w: 4.0, h: 0.44, size: 12.5, color: P.ink, lineSpacing: 1.04 });
  });

  K.card(s, { x: M, y: 4.3, w: CW, h: 0.6, fill: P.signalTint, line: P.signalTint });
  K.body(s, '"I do not believe it" is not a check. A check names what you looked at, and it can '
    + 'end in uncertainty and still be finished work.',
    { x: 0.86, y: 4.3, w: 8.28, h: 0.6, size: 13, color: P.ink, valign: 'middle' });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 11. The failure mode ──────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part four · the failure mode');
  K.title(s, 'Doubting everything is not media literacy');

  const halves = [
    ['THE TRAP', 'It is paralysis. And it is genuinely useful to anyone running a disinformation '
      + 'campaign: if nothing can be established, nothing they say can be disproved.', P.signalTint, P.signalDeep],
    ['THE GOAL', 'Calibration. Believing things in proportion to the evidence, rather than '
      + 'suspicion of everything.', P.coolTint, P.cool]
  ];
  halves.forEach(([label, text, fill, ink], i) => {
    const x = M + i * 4.6;
    K.card(s, { x, y: 1.7, w: 4.2, h: 1.6, fill, line: fill });
    K.body(s, label, { x: x + 0.28, y: 1.94, w: 3.64, h: 0.24, face: F.mono, size: 9, bold: true, color: ink });
    K.body(s, text, { x: x + 0.28, y: 2.26, w: 3.64, h: 0.9, size: 13, color: P.ink, lineSpacing: 1.14 });
  });

  K.card(s, { x: M, y: 3.54, w: CW, h: 1.0 });
  K.body(s, 'Do not pass along something you have not checked.',
    { x: 0.88, y: 3.7, w: 8.24, h: 0.34, face: F.display, size: 19, bold: true, color: P.ink });
  K.body(s, 'That is not offered as a moral rule. Part Three is the reason: you are part of the '
    + 'distribution system, measurably, and it is the largest part.',
    { x: 0.88, y: 4.06, w: 8.24, h: 0.4, size: 13, lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 12. Elections ─────────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part five');
  K.title(s, 'In an election, all of it runs at once');

  const items = [
    ['Voting procedure', 'Wrong date, invented ID rules, a moved polling place. It changes whether you show up.'],
    ['Foreign interference', '2018: thirteen Russian nationals and the IRA indicted. The described aim was widening divisions.'],
    ['Microtargeting', 'Two voters get different promises from one campaign, and neither sees the other\'s.'],
    ['Echo chambers', 'Ranking narrows what you see. Hold it loosely: the research is least settled here.'],
    ['Polarization', 'Attacking the other side outperforms explaining your own, in every direction at once.'],
    ['The regulation gap', 'Broadcast ad rules do not cover platforms. Company policy does, and nobody voted on it.']
  ];
  items.forEach(([label, text], i) => {
    const x = M + (i % 3) * 3.0;
    const y = 1.62 + Math.floor(i / 3) * 1.4;
    K.card(s, { x, y, w: 2.8, h: 1.26 });
    K.body(s, label, { x: x + 0.22, y: y + 0.16, w: 2.36, h: 0.26, size: 13.5, bold: true, color: P.ink, face: F.display });
    K.body(s, text, { x: x + 0.22, y: y + 0.48, w: 2.36, h: 0.68, size: 11.5, lineSpacing: 1.04 });
  });

  K.body(s, '"Social media decided the election" is a claim about size, and nobody has good '
    + 'evidence for it. Every mechanism above is documented. How much any of it moves an outcome is not.',
    { x: M, y: 4.5, w: CW, h: 0.5, size: 12.5, italic: true, lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 13. The Road Not Taken ────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'The road not taken');
  K.title(s, 'The echo chamber is the part that might be wrong', { size: 26 });

  K.bullets(s, [
    'Eli Pariser named the filter bubble in 2011. It is repeated so often that it sounds like a finding. It is a theory, and it has taken real damage.',
    'Measured news diets keep coming out more varied than the theory predicts, and the sealed-in partisans turn out to be a small share of users.',
    'A 2015 Science study by Bakshy, Messing and Adamic found that on Facebook individual clicks mattered more than the ranking did. The authors worked for Facebook: read it carefully, do not throw it out. Noticing that difference is the skill.'
  ], { x: M, y: 1.72, w: 5.0, h: 2.5, size: 12.5, gap: 10 });

  K.card(s, { x: 5.9, y: 1.66, w: 3.5, h: 2.6, fill: P.coolTint, line: P.coolTint });
  K.body(s, 'WHY IT MATTERS', { x: 6.18, y: 1.92, w: 2.94, h: 0.24, face: F.mono, size: 9, bold: true, color: P.cool });
  K.body(s, 'The two stories point at different fixes. If ranking causes the bubble, changing the '
    + 'ranking helps. If people choose it, changing the ranking does very little.',
    { x: 6.18, y: 2.24, w: 2.94, h: 1.2, size: 12.5, color: P.ink, lineSpacing: 1.12 });
  K.body(s, 'Keep that in your pocket for Topic 6.',
    { x: 6.18, y: 3.56, w: 2.94, h: 0.5, size: 13, bold: true, color: P.ink, lineSpacing: 1.1 });

  K.body(s, 'The rival explanation is that the bubble is mostly offline: who you live near, who '
    + 'you are related to, and who you talk to in person, none of which an algorithm chose.',
    { x: M, y: 4.42, w: CW, h: 0.5, size: 12.5, italic: true, lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 14. Closing ───────────────────────────────────────────────────────────── */
{
  const s = K.dark(pres);
  K.eyebrow(s, 'BeReady · 10-second takeaway', { color: P.signalPale });
  K.body(s, 'False things travel because they are new and they make you feel something. '
    + 'People rather than bots do most of the carrying.',
    { x: M, y: 0.76, w: 8.6, h: 0.76, face: F.display, size: 18.5, bold: true, color: P.onDark, lineSpacing: 1.1 });

  K.card(s, { x: M, y: 1.78, w: CW, h: 2.52, fill: P.slate700, line: P.slate700, flat: true });
  K.body(s, 'CHECK YOUR UNDERSTANDING', { x: 0.88, y: 1.98, w: 8.2, h: 0.24, face: F.mono, size: 9, bold: true, color: P.signalPale });

  const qs = [
    ['Fallacies and Propaganda', 'Pick something you saw this week that made you feel something strongly. Name the feeling, and explain how that feeling helped the thing travel.'],
    ['Sourcing', 'Take one claim you are not sure about and check it laterally. Write down what you did: who published it, when, and who else reports it.'],
    ['Generalizing from Evidence', 'Pick one item from Part Five and explain the mechanism, step by step: how would it actually change an election?']
  ];
  qs.forEach(([skill, text], i) => {
    const y = 2.38 + i * 0.66;
    K.chip(s, String(i + 1), { x: 0.88, y, d: 0.34, size: 9.5 });
    K.body(s, skill.toUpperCase(), { x: 1.36, y: y - 0.02, w: 7.7, h: 0.22, face: F.mono, size: 8, bold: true, color: P.signalPale });
    K.body(s, text, { x: 1.36, y: y + 0.2, w: 7.7, h: 0.44, size: 12, color: P.onDark, lineSpacing: 1.04 });
  });

  K.body(s, 'Both cards under every question are real answers. Rate your confidence honestly: '
    + 'a Shaky tells your teacher more than a dishonest Could teach it.',
    { x: M, y: 4.48, w: 8.6, h: 0.44, size: 12.5, italic: true, color: P.onDarkSoft, lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT, { color: P.onDarkSoft });
}

if (noteIx !== NOTES.length) throw new Error('slide count and note count disagree');
if (pres.slides.length !== 14) throw new Error('expected 14 slides, built ' + pres.slides.length);

pres.writeFile({ fileName: OUT }).then(() => console.log('wrote ' + OUT + ' (' + pres.slides.length + ' slides)'));
