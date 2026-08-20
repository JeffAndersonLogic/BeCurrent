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
 * SOURCE OF TRUTH. Every date, name, number and study on these slides comes from
 * the Topic 5 Brief. Nothing is invented: no headline, statistic, date or
 * quotation was added that the Brief does not carry. That constraint is the whole
 * subject of the lesson, and a deck that broke it while teaching it would be the
 * worst available outcome.
 *
 * REGISTER. Ninth grade, academic but not dry, and written to be read once at
 * speed by a room with a heavy IEP and 504 load. The rules, which the first
 * version of this deck broke:
 *
 *   - One idea per sentence, and most sentences under twenty words.
 *   - Subject, verb, object. No inverted or aphoristic constructions.
 *   - Define a term in plain words the first time it appears, then reuse the
 *     same term. Never a synonym for variety.
 *   - No rhetorical questions as teaching content. A question mark on a slide
 *     means the students are meant to answer it.
 *   - Concrete example immediately after the abstract claim, never before.
 *   - Signpost: "three forms", "first", "second". A reader who loses the thread
 *     should be able to find it again from the slide alone.
 *   - No idioms, and no metaphor that has to be decoded to be understood.
 */

const fs = require('fs');
const path = require('path');
const K = require('./deck-kit.js');
const { P, F, M, CW } = K;

const OUT = path.join(__dirname, '..', '..', 'social-media', 'decks', 'topic-05-how-a-lie-travels.pptx');
const FOOT = 'BECURRENT  ·  SOCIAL MEDIA  ·  TOPIC 5';

// The teaching script, one entry per slide in order. Kept here rather than beside
// each slide so the whole spoken arc can be read in one pass, which is how a
// block actually gets rehearsed.
const NOTES = [
  'Read the title and the subtitle, then stop. Say plainly what the lesson is about: not whether '
  + 'people lie online, but why false stories move faster than corrections do. Tell them nobody '
  + 'will be asked whether they personally believe things.',

  'Two minutes. Connect it to work they have already done, because today only makes sense on top '
  + 'of Topic 1 and Topic 3. Read the goal at the bottom out loud, twice: check a claim in about '
  + 'two minutes, and be able to say what you checked.',

  'This is the distinction the rest of the lesson uses, so do not rush it. Say the two definitions '
  + 'slowly and write both words on the board. Ask for one example of each. If they cannot tell '
  + 'which one they are looking at, that is the correct answer and worth saying.',

  'Three forms, about a minute each. Spend the extra time on the third one, because it is the one '
  + 'they will meet most often. Show a real headline if you have one, and ask what it makes a reader '
  + 'believe that the article itself does not say.',

  'This example is about trust, not about the stock market. The account was one people had reason to '
  + 'believe, so the false post traveled before anyone checked it. Point out the recovery as well: '
  + 'corrections do work, but they arrive later and quieter.',

  'Four tactics, four minutes. Bots are the one students usually get wrong, so be direct: a bot '
  + 'network is not trying to convince you, it is trying to make a claim look popular. End on '
  + 'emotion, because it is the tactic that carries the other three.',

  'This is the most important slide in the lesson. Walk the three steps left to right and have a '
  + 'student supply the third one. Nobody at the company decides to spread a lie; the ranking system '
  + 'measures reaction. If a student says that means the company is not responsible, hold that '
  + 'thought for Topic 6 rather than answering it.',

  'Slow down. Give the design of the study before the result: how many rumors, how many years. Then '
  + 'the result. Then the second step, where the researchers removed the automated accounts and got '
  + 'the same answer. Ask what that tells us before you say it.',

  'Two examples doing two jobs. Veles shows that the motive is often money rather than politics. '
  + 'Pizzagate shows that a false story with no evidence behind it can still move somebody to act. '
  + 'Deliver the second one plainly, without drama.',

  'The practical half of the lesson. Do not describe lateral reading, demonstrate it: take one claim, '
  + 'leave the page, open two tabs, and say what you are doing as you do it. Then walk the five '
  + 'questions. The line at the bottom is the standard their written work is graded against.',

  'Do not skip this slide. The strongest students are the most likely to leave this lesson deciding '
  + 'that nothing can be trusted, which is not the goal and is genuinely useful to people who spread '
  + 'disinformation. Define calibration, then give the one habit that does most of the work.',

  'Fast pass, about thirty seconds each, because the Brief carries the detail. Pause on false voting '
  + 'information, because it changes whether people vote rather than who they support, and on the '
  + 'advertising rules, which is the handoff to Topic 6.',

  'Model honesty about evidence here. The echo chamber is the explanation they have heard most often '
  + 'and it is the least settled thing in the lesson. Point out that the 2015 study authors worked at '
  + 'Facebook, and ask what a careful reader does with that: read it closely, not throw it away.',

  'Read the summary, then set the three questions. Say out loud that Start Here and Push Further are '
  + 'both real answers, and that the confidence rating is not graded. On the way out, tell them '
  + 'tomorrow they get asked who should be allowed to run these systems.'
];

let noteIx = 0;
function notes(s) {
  if (noteIx >= NOTES.length) throw new Error('more slides than speaker notes');
  s.addNotes(NOTES[noteIx++]);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });

const pres = K.newDeck({
  title: 'How a Lie Travels, Social Media Topic 5',
  subject: 'BeCurrent, Current Events'
});

/* ── 01. Title ──────────────────────────────────────────────────────────────── */
{
  const s = K.dark(pres);
  K.chip(s, '05', { x: M, y: 0.6, d: 0.56, size: 14 });
  K.eyebrow(s, 'Social Media · Topic 5', { x: 1.32, y: 0.75, color: P.signalPale });
  K.title(s, 'How a Lie Travels', { y: 1.42, h: 0.95, size: 42, color: P.onDark });
  K.body(s, 'Why false stories spread faster than corrections do.',
    { x: M, y: 2.5, w: 7.5, h: 0.5, face: F.display, size: 18, italic: true, color: P.onDarkSoft });

  ['SOURCING', 'CORROBORATION'].forEach((tag, i) => {
    const w = 1.5 + i * 0.6;
    const x = M + i * 1.72;
    K.card(s, { x, y: 3.4, w, h: 0.36, fill: P.slate700, line: P.slate700, flat: true });
    K.body(s, tag, { x, y: 3.4, w, h: 0.36, face: F.mono, size: 9, bold: true, color: P.signalPale,
      align: 'center', valign: 'middle' });
  });

  notes(s);
  K.footer(s, FOOT, { color: P.onDarkSoft });
}

/* ── 02. What today builds on ──────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Before you read');
  K.title(s, 'What today builds on', { size: 30 });

  const rows = [
    ['1', 'Topic 1', 'Apps make money when people keep looking at them.'],
    ['3', 'Topic 3', 'The feed ranks posts to produce the most reaction.'],
    ['5', 'Topic 5', 'Which posts get the most reaction, and who uses that on purpose.']
  ];
  rows.forEach(([n, label, text], i) => {
    const y = 1.9 + i * 0.9;
    K.chip(s, n, { x: M, y, d: 0.44, fill: i === 2 ? P.signal : P.slate700, size: 11 });
    K.body(s, label, { x: 1.2, y: y - 0.02, w: 3.9, h: 0.26, size: 12, bold: true, color: P.ink,
      face: F.mono });
    K.body(s, text, { x: 1.2, y: y + 0.24, w: 3.9, h: 0.52, size: 13 });
  });

  K.card(s, { x: 5.4, y: 1.84, w: 4.0, h: 2.6, fill: P.coolTint, line: P.coolTint });
  K.body(s, 'YOUR GOAL TODAY', { x: 5.68, y: 2.12, w: 3.44, h: 0.26, face: F.mono, size: 9,
    bold: true, color: P.cool });
  K.body(s, 'Check a claim you are unsure about in about two minutes, and be able to say what you '
    + 'checked.',
    { x: 5.68, y: 2.5, w: 3.44, h: 1.7, size: 14.5, color: P.ink, lineSpacing: 1.2 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 03. Two words ─────────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part one');
  K.title(s, 'Two words for false information');

  const pairs = [
    ['MISINFORMATION', 'False information shared by someone who believes it is true.', P.coolTint, P.cool],
    ['DISINFORMATION', 'False information shared by someone who knows it is false.', P.signalTint, P.signalDeep]
  ];
  pairs.forEach(([label, text, fill, ink], i) => {
    const x = M + i * 4.6;
    K.card(s, { x, y: 1.68, w: 4.2, h: 1.5, fill, line: fill });
    K.body(s, label, { x: x + 0.28, y: 1.92, w: 3.64, h: 0.28, face: F.mono, size: 10, bold: true,
      color: ink });
    K.body(s, text, { x: x + 0.28, y: 2.28, w: 3.64, h: 0.72, size: 14, color: P.ink,
      lineSpacing: 1.16 });
  });

  K.body(s, 'The post can look identical. The difference is what the sender knows.',
    { x: M, y: 3.42, w: CW, h: 0.36, face: F.display, size: 19, bold: true, color: P.ink });
  K.body(s, 'You can correct a person who made a mistake. You cannot correct a person who is lying '
    + 'on purpose, because being wrong was the plan.',
    { x: M, y: 3.9, w: 8.4, h: 0.6, size: 14, lineSpacing: 1.16 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 04. Three forms ───────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part one · the three forms');
  K.title(s, 'Three forms false information takes');

  const shapes = [
    ['1', 'Invented story', 'A story about an event that never happened.'],
    ['2', 'Fake image', 'A photo or video that was edited, or created by software.'],
    ['3', 'Misleading headline', 'Every fact in the article is true, but the headline makes you believe something false.']
  ];
  shapes.forEach(([n, label, text], i) => {
    const x = M + i * 3.0;
    K.card(s, { x, y: 1.68, w: 2.8, h: 2.1 });
    K.chip(s, n, { x: x + 0.26, y: 1.9, d: 0.4, size: 11 });
    K.body(s, label, { x: x + 0.26, y: 2.42, w: 2.28, h: 0.3, size: 14.5, bold: true, color: P.ink,
      face: F.display });
    K.body(s, text, { x: x + 0.26, y: 2.8, w: 2.28, h: 0.8, size: 12.5, lineSpacing: 1.1 });
  });

  K.body(s, 'The third form is the most common and the hardest to notice.',
    { x: M, y: 4.0, w: CW, h: 0.34, face: F.display, size: 17, bold: true, color: P.ink });
  K.body(s, 'Before you judge a post, ask who sent it, and whether that person knows if it is true.',
    { x: M, y: 4.46, w: CW, h: 0.34, size: 13 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 05. April 2013 ────────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'April 2013 · an example');
  K.title(s, 'One false sentence from a trusted account');

  K.card(s, { x: M, y: 1.72, w: 5.2, h: 2.35 });
  K.bullets(s, [
    'Hackers took control of the Associated Press Twitter account.',
    'They posted that there had been explosions at the White House and that the president was injured.',
    'Neither of those things had happened.',
    'The stock market dropped sharply within seconds, then recovered within minutes once the AP said the post was false.'
  ], { x: 0.88, y: 1.96, w: 4.64, h: 1.9, size: 13, gap: 8 });

  K.card(s, { x: 6.1, y: 1.72, w: 3.3, h: 2.35, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'SECONDS', { x: 6.4, y: 1.98, w: 2.7, h: 0.5, face: F.display, size: 30, bold: true,
    color: P.signalDeep });
  K.body(s, 'for the market to fall', { x: 6.4, y: 2.46, w: 2.7, h: 0.26, face: F.mono, size: 9.5,
    color: P.inkSoft });
  K.body(s, 'MINUTES', { x: 6.4, y: 2.9, w: 2.7, h: 0.5, face: F.display, size: 30, bold: true,
    color: P.signalDeep });
  K.body(s, 'for it to recover', { x: 6.4, y: 3.38, w: 2.7, h: 0.26, face: F.mono, size: 9.5,
    color: P.inkSoft });

  K.body(s, 'The post spread because people trusted the account, not because anyone had checked '
    + 'the story.',
    { x: M, y: 4.3, w: CW, h: 0.5, size: 13.5, italic: true, lineSpacing: 1.12 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 06. Four tactics ──────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part two');
  K.title(s, 'Four tactics that spread false information');

  const tactics = [
    ['Clickbait', 'A headline written to make you click, rather than to tell you what happened.'],
    ['Deepfake', 'Video or audio of a real person, made by software, saying something they never said.'],
    ['Bots', 'Automated accounts. Their job is to make a claim look popular.'],
    ['Emotion', 'Posts that make people angry or afraid are shared far more than posts that make people think.']
  ];
  tactics.forEach(([label, text], i) => {
    const x = M + (i % 2) * 4.6;
    const y = 1.62 + Math.floor(i / 2) * 1.5;
    K.card(s, { x, y, w: 4.2, h: 1.36 });
    K.chip(s, String(i + 1), { x: x + 0.26, y: y + 0.22, d: 0.36, size: 10,
      fill: i === 3 ? P.signal : P.slate700 });
    K.body(s, label, { x: x + 0.74, y: y + 0.24, w: 3.2, h: 0.3, size: 15, bold: true, color: P.ink,
      face: F.display });
    K.body(s, text, { x: x + 0.26, y: y + 0.64, w: 3.68, h: 0.6, size: 12.5, lineSpacing: 1.08 });
  });

  K.body(s, 'All four aim at your emotions rather than at your reasoning.',
    { x: M, y: 4.62, w: CW, h: 0.34, face: F.display, size: 16, bold: true, color: P.ink });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 07. Why the system spreads it ─────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part two · back to topic 3');
  K.title(s, 'The system spreads it without meaning to');

  const chain = [
    'The feed rewards reaction.',
    'Emotional posts get the most reaction.',
    'So the feed shows those posts to more people.'
  ];
  chain.forEach((text, i) => {
    const x = M + i * 3.0;
    K.card(s, { x, y: 1.76, w: 2.8, h: 1.02, fill: P.paper });
    K.body(s, text, { x: x + 0.22, y: 1.76, w: 2.36, h: 1.02, size: 13.5, color: P.ink,
      valign: 'middle', lineSpacing: 1.12 });
    if (i < 2) {
      K.body(s, '>', { x: x + 2.8, y: 1.76, w: 0.2, h: 1.02, face: F.mono, size: 16, bold: true,
        color: P.signal, align: 'center', valign: 'middle' });
    }
  });

  K.card(s, { x: M, y: 3.12, w: CW, h: 0.92, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'No employee decides to spread a lie. The system measures reaction, and reaction is not '
    + 'the same thing as truth.',
    { x: 0.9, y: 3.12, w: 8.2, h: 0.92, face: F.display, size: 16.5, italic: true, color: P.ink,
      valign: 'middle', lineSpacing: 1.14 });

  K.body(s, 'Naming the emotion is a defense. Saying "this post is built to make me angry" takes '
    + 'about four seconds.',
    { x: M, y: 4.3, w: CW, h: 0.5, size: 13.5, lineSpacing: 1.12 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 08. Who spreads it ────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part three');
  K.title(s, 'Who spreads false stories? People do.');

  K.card(s, { x: M, y: 1.66, w: 5.0, h: 2.4 });
  K.bullets(s, [
    'In 2018, three researchers at MIT studied about 126,000 rumors on Twitter over eleven years.',
    'False stories reached more people, and reached them faster, than true stories did.',
    'The researchers then removed every automated account and repeated the study. The result did not change.'
  ], { x: 0.88, y: 1.92, w: 4.44, h: 1.9, size: 13, gap: 9 });

  K.card(s, { x: 5.9, y: 1.66, w: 3.5, h: 2.4, fill: P.signalTint, line: P.signalTint });
  K.body(s, '126,000', { x: 6.18, y: 1.94, w: 2.94, h: 0.56, face: F.display, size: 32, bold: true,
    color: P.signalDeep });
  K.body(s, 'RUMORS  ·  11 YEARS', { x: 6.18, y: 2.5, w: 2.94, h: 0.26, face: F.mono, size: 9,
    color: P.inkSoft });
  K.body(s, 'People did the spreading, not bots.', { x: 6.18, y: 3.0, w: 2.94, h: 0.8,
    face: F.display, size: 16, bold: true, color: P.ink, lineSpacing: 1.1 });

  K.body(s, 'The researchers explained it this way: false stories are newer, because a true story '
    + 'has to have actually happened. New information is what people pass along.',
    { x: M, y: 4.2, w: CW, h: 0.5, size: 13, lineSpacing: 1.1 });
  K.body(s, 'So the main fix is not a technical one. It is the pause before you share.',
    { x: M, y: 4.68, w: CW, h: 0.3, size: 14, bold: true, color: P.ink });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 09. Two examples ─────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part three · two examples');
  K.title(s, 'The motive is often money');

  const cases = [
    ['VELES, NORTH MACEDONIA · 2016',
      'Reporters found that a group of websites publishing false American political stories were '
      + 'run from a single town. The people running them earned advertising money from the traffic.\n\n'
      + 'In the last three months of that campaign, the most popular false election stories got '
      + 'more engagement on Facebook than the most popular true ones.'],
    ['PIZZAGATE · 2016',
      'A false story claimed that a crime ring was operating out of a restaurant in Washington DC. '
      + 'There was no evidence for it.\n\n'
      + 'In December 2016 a man drove to that restaurant from another state and fired a rifle inside '
      + 'the building. No one was hurt.']
  ];
  cases.forEach(([label, text], i) => {
    const x = M + i * 4.6;
    K.card(s, { x, y: 1.66, w: 4.2, h: 2.5 });
    K.body(s, label, { x: x + 0.26, y: 1.9, w: 3.68, h: 0.26, face: F.mono, size: 9, bold: true,
      color: P.signalDeep });
    K.body(s, text, { x: x + 0.26, y: 2.24, w: 3.68, h: 1.82, size: 12.5, lineSpacing: 1.1 });
  });

  K.card(s, { x: M, y: 4.32, w: CW, h: 0.66, fill: P.coolTint, line: P.coolTint });
  K.body(s, 'WATCH FOR', { x: 0.86, y: 4.44, w: 1.2, h: 0.22, face: F.mono, size: 8.5, bold: true,
    color: P.cool });
  K.body(s, 'Blaming bots or foreign governments is easy, because it places the problem outside our '
    + 'own behavior. Most sharing is done by ordinary people who did not check.',
    { x: 2.1, y: 4.42, w: 7.0, h: 0.46, size: 12, color: P.ink, lineSpacing: 1.08 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 10. Lateral reading ──────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part four');
  K.title(s, 'How to check a claim: lateral reading');

  K.card(s, { x: M, y: 1.66, w: 4.0, h: 2.5 });
  K.body(s, 'Lateral reading means leaving the page you are on. Instead of studying that page, you '
    + 'open new tabs and find out what other sources say about whoever published it.',
    { x: 0.86, y: 1.9, w: 3.48, h: 1.0, size: 13, color: P.ink, lineSpacing: 1.14 });
  K.body(s, 'A STANFORD STUDY', { x: 0.86, y: 2.98, w: 3.48, h: 0.24, face: F.mono, size: 9,
    bold: true, color: P.cool });
  K.body(s, 'Professional fact-checkers left the page almost immediately. Students stayed on it and '
    + 'studied the design, the logo and the About section, which are all controlled by the page '
    + 'itself.',
    { x: 0.86, y: 3.26, w: 3.48, h: 0.82, size: 12, lineSpacing: 1.06 });

  const moves = [
    'Who published this?',
    'When was it published? Old stories are often reshared as new ones.',
    'Does any other source report it? If only one does, ask why.',
    'What is the earliest version you can find?',
    'For a photo, run a reverse image search.'
  ];
  moves.forEach((text, i) => {
    const y = 1.7 + i * 0.5;
    K.chip(s, String(i + 1), { x: 4.9, y, d: 0.34, size: 9.5, fill: P.slate700 });
    K.body(s, text, { x: 5.38, y: y - 0.02, w: 4.0, h: 0.44, size: 12.5, color: P.ink,
      lineSpacing: 1.04 });
  });

  K.card(s, { x: M, y: 4.3, w: CW, h: 0.6, fill: P.signalTint, line: P.signalTint });
  K.body(s, 'Saying "I do not believe it" is not checking. Checking means naming what you looked at.',
    { x: 0.86, y: 4.3, w: 8.28, h: 0.6, size: 13.5, color: P.ink, valign: 'middle' });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 11. Doubting everything ──────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part four · a warning');
  K.title(s, 'Doubting everything is not the goal');

  const halves = [
    ['THE PROBLEM', 'If you decide that nothing can be trusted, you cannot learn anything. That also '
      + 'helps people who spread disinformation: if nothing can be proven, nothing they say can be '
      + 'disproven.', P.signalTint, P.signalDeep],
    ['THE GOAL', 'Calibration. This means believing a claim in proportion to the evidence for it, '
      + 'rather than doubting everything equally.', P.coolTint, P.cool]
  ];
  halves.forEach(([label, text, fill, ink], i) => {
    const x = M + i * 4.6;
    K.card(s, { x, y: 1.7, w: 4.2, h: 1.7, fill, line: fill });
    K.body(s, label, { x: x + 0.28, y: 1.94, w: 3.64, h: 0.24, face: F.mono, size: 9, bold: true,
      color: ink });
    K.body(s, text, { x: x + 0.28, y: 2.26, w: 3.64, h: 1.0, size: 12.5, color: P.ink,
      lineSpacing: 1.12 });
  });

  K.card(s, { x: M, y: 3.54, w: CW, h: 1.0 });
  K.body(s, 'Do not share something you have not checked.',
    { x: 0.88, y: 3.68, w: 8.24, h: 0.34, face: F.display, size: 19, bold: true, color: P.ink });
  K.body(s, 'This is one habit, and it does most of the work. It is not a rule about being a good '
    + 'person. Part Three is the reason: people do most of the spreading, so what you share matters.',
    { x: 0.88, y: 4.06, w: 8.24, h: 0.44, size: 13, lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 12. Elections ────────────────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'Part five');
  K.title(s, 'In an election, these appear together');

  const items = [
    ['False voting information', 'A wrong date, invented ID rules, or a polling place that moved. This changes whether people vote.'],
    ['Foreign interference', 'In 2018 a US grand jury charged 13 Russian nationals with running fake American accounts in 2016.'],
    ['Microtargeting', 'Campaigns pay to show different messages to different small groups of voters.'],
    ['Echo chambers', 'The idea that ranking shows you mostly people who agree with you. The evidence here is weakest.'],
    ['Polarization', 'Posts attacking the other side get more reaction than posts explaining your own side.'],
    ['Advertising rules', 'US political ad rules were written for television. Most platform rules are written by the companies.']
  ];
  items.forEach(([label, text], i) => {
    const x = M + (i % 3) * 3.0;
    const y = 1.62 + Math.floor(i / 3) * 1.4;
    K.card(s, { x, y, w: 2.8, h: 1.26 });
    K.body(s, label, { x: x + 0.22, y: y + 0.16, w: 2.36, h: 0.26, size: 13, bold: true,
      color: P.ink, face: F.display });
    K.body(s, text, { x: x + 0.22, y: y + 0.48, w: 2.36, h: 0.68, size: 11.5, lineSpacing: 1.04 });
  });

  K.body(s, 'Each of these is documented. How much any of them changes the result of an election is '
    + 'still being argued about, in both directions.',
    { x: M, y: 4.5, w: CW, h: 0.5, size: 12.5, italic: true, lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 13. The Road Not Taken ───────────────────────────────────────────────── */
{
  const s = K.light(pres);
  K.eyebrow(s, 'The road not taken');
  K.title(s, 'The echo chamber idea may be wrong', { size: 30 });

  K.bullets(s, [
    'Eli Pariser named the "filter bubble" in 2011. The idea is repeated so often that it sounds like a proven fact. It is a theory.',
    'When researchers measured what people actually read, they found more variety than the theory predicts, and found that heavily sealed-off users are a small group.',
    'A 2015 study in Science found that on Facebook, people\'s own choices about what to click mattered more than the ranking did. The authors worked for Facebook. That is a reason to read the study closely, not a reason to ignore it.'
  ], { x: M, y: 1.72, w: 5.0, h: 2.5, size: 12.5, gap: 10 });

  K.card(s, { x: 5.9, y: 1.66, w: 3.5, h: 2.6, fill: P.coolTint, line: P.coolTint });
  K.body(s, 'WHY THIS MATTERS', { x: 6.18, y: 1.92, w: 2.94, h: 0.24, face: F.mono, size: 9,
    bold: true, color: P.cool });
  K.body(s, 'The two explanations point to different solutions. If the ranking causes the problem, '
    + 'changing the ranking helps. If people\'s own choices cause it, changing the ranking does very '
    + 'little.',
    { x: 6.18, y: 2.24, w: 2.94, h: 1.3, size: 12.5, color: P.ink, lineSpacing: 1.12 });
  K.body(s, 'Remember this for Topic 6.', { x: 6.18, y: 3.62, w: 2.94, h: 0.4, size: 13, bold: true,
    color: P.ink });

  K.body(s, 'A third explanation is that the bubble is mostly offline: who you live near, who you '
    + 'are related to, and who you talk to in person. No algorithm chose any of those.',
    { x: M, y: 4.42, w: CW, h: 0.5, size: 12.5, italic: true, lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT);
}

/* ── 14. Closing ──────────────────────────────────────────────────────────── */
{
  const s = K.dark(pres);
  K.eyebrow(s, 'Summary', { color: P.signalPale });
  K.body(s, 'False stories spread because they are new and because they produce strong emotions. '
    + 'Most of the spreading is done by people, not bots.',
    { x: M, y: 0.76, w: 8.6, h: 0.76, face: F.display, size: 18.5, bold: true, color: P.onDark,
      lineSpacing: 1.1 });

  K.card(s, { x: M, y: 1.78, w: CW, h: 2.56, fill: P.slate700, line: P.slate700, flat: true });
  K.body(s, 'WHAT YOU WILL WRITE', { x: 0.88, y: 1.98, w: 8.2, h: 0.24, face: F.mono, size: 9,
    bold: true, color: P.signalPale });

  const qs = [
    ['Fallacies and Propaganda',
      'Describe one post you saw this week that produced a strong emotion. Name the emotion, then explain how it made people more likely to share the post.'],
    ['Sourcing',
      'Choose one claim you are unsure about and check it using lateral reading. Write down who published it, when, and whether another source reports it.'],
    ['Generalizing from Evidence',
      'Choose one item from Part Five. Explain, in three steps, how it could change the result of an election.']
  ];
  qs.forEach(([skill, text], i) => {
    const y = 2.38 + i * 0.68;
    K.chip(s, String(i + 1), { x: 0.88, y, d: 0.34, size: 9.5 });
    K.body(s, skill.toUpperCase(), { x: 1.36, y: y - 0.02, w: 7.7, h: 0.22, face: F.mono, size: 8,
      bold: true, color: P.signalPale });
    K.body(s, text, { x: 1.36, y: y + 0.2, w: 7.7, h: 0.46, size: 12, color: P.onDark,
      lineSpacing: 1.04 });
  });

  K.body(s, 'Each question has a Start Here card and a Push Further card. Both are real answers. '
    + 'Your confidence rating is not graded.',
    { x: M, y: 4.5, w: 8.6, h: 0.44, size: 12.5, italic: true, color: P.onDarkSoft,
      lineSpacing: 1.1 });

  notes(s);
  K.footer(s, FOOT, { color: P.onDarkSoft });
}

if (noteIx !== NOTES.length) throw new Error('slide count and note count disagree');
if (pres.slides.length !== 14) throw new Error('expected 14 slides, built ' + pres.slides.length);

pres.writeFile({ fileName: OUT }).then(() => console.log('wrote ' + OUT + ' (' + pres.slides.length + ' slides)'));
