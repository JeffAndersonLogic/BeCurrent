#!/usr/bin/env node
'use strict';

/**
 * The video path through a Brief.
 *
 * Video is the main accessibility lever in this course, so the thing worth
 * asserting is not that markup appears but that the two states are right:
 *
 *   - no clips  -> nothing at all, not an empty container. An empty strip reads to
 *                  a student as something that failed to load.
 *   - clips     -> a card headed by its own title, above the prose rather than
 *                  below it, with a link that cannot reach back into this tab.
 *
 * Offline and dependency-free, so it runs in the push path.
 *
 *   node scripts/test/video-block.test.js
 */

const { renderBrief } = require('../lib/week-page');
const { renderUnitBrief } = require('../lib/unit-brief-page');

const R = '\x1b[31m', G = '\x1b[32m', D = '\x1b[2m', X = '\x1b[0m';
const results = [];
function check(name, pass, detail) {
  results.push(pass);
  console.log(`  ${pass ? G + 'PASS' + X : R + 'FAIL' + X}  ${name}${detail ? D + '  (' + detail + ')' + X : ''}`);
}

const META = {
  course: 'CURRENT EVENTS', week: 'Week 09', weekKey: 'w09',
  unit: 'Test Unit', unitKey: 'test-unit',
  aiCoachUrl: '', canvasSubmissionNote: 'Submit in Canvas.'
};

const BODY = {
  eyebrow: 'Test', title: 'A <em>Test</em>', deck: 'Deck.', subtitle: 'Sub',
  skillTags: ['Cause and Effect'], support: [], terms: ['thing'],
  sections: [{ label: 'Part One', heading: 'H', paragraphs: ['Prose.'], callouts: [] }],
  takeaway: 'Takeaway.',
  questions: [{ skill: 'Cause and Effect', text: 'Why?' }]
};

const CLIPS = [{
  title: 'How the feed decides',
  url: 'https://example.test/clip-one',
  prompt: 'Watch for who is counted and who is not.',
  source: 'CNN10',
  duration: '10:00'
}];

// A title carrying markup, to prove the renderer escapes what it should.
const NASTY = [{
  title: 'Ads & <script>alert(1)</script> "quotes"',
  url: 'https://example.test/x?a=1&b=2',
  prompt: 'Escaped?'
}];

function bothRenderers(name, patch) {
  return [
    ['week brief', renderBrief(Object.assign({ meta: META }, BODY, patch))],
    ['unit brief', renderUnitBrief({ meta: META },
      Object.assign({ block: 'Block 3', key: 'tu-b3' }, BODY, patch))]
  ];
}

console.log('\n  No clips means nothing, not an empty container\n');
bothRenderers('empty', { videos: [] }).forEach(([label, html]) => {
  check(`${label}: no video strip at all`, !html.includes('brief-video'));
});
bothRenderers('undefined', {}).forEach(([label, html]) => {
  check(`${label}: an absent videos field behaves like an empty one`,
    !html.includes('brief-video'));
});

console.log('\n  With clips\n');
bothRenderers('clips', { videos: CLIPS }).forEach(([label, html]) => {
  check(`${label}: the strip renders`, html.includes('brief-video-strip'));
  check(`${label}: the card is headed by its own title, not "Video"`,
    html.includes('How the feed decides')
    && !/brief-video-title">\s*Video\s*</.test(html));
  check(`${label}: the guiding question is on the card`,
    html.includes('Watch for who is counted and who is not.'));
  check(`${label}: source and duration render together`,
    html.includes('CNN10 &middot; 10:00') || html.includes('CNN10 · 10:00'),
    (html.match(/brief-video-meta">([^<]*)</) || [])[1]);

  // A link into a video host must not be able to reach back into this tab.
  const anchor = (html.match(/<a class="btn secondary"[^>]*>/) || [])[0] || '';
  check(`${label}: the link opens in a new tab`, /target="_blank"/.test(anchor), anchor.slice(0, 70));
  check(`${label}: and carries noopener noreferrer`,
    /rel="noopener noreferrer"/.test(anchor));

  // The strip must sit ABOVE the prose. A student who needs the video should not
  // have to scroll a thousand words to discover it exists.
  check(`${label}: the strip is above the reading prose`,
    html.indexOf('brief-video-strip') < html.indexOf('class="reading-text"'),
    `strip@${html.indexOf('brief-video-strip')} prose@${html.indexOf('class="reading-text"')}`);
});

console.log('\n  Escaping\n');
bothRenderers('nasty', { videos: NASTY }).forEach(([label, html]) => {
  check(`${label}: a script tag in a title is escaped`,
    !html.includes('<script>alert(1)</script>'));
  check(`${label}: an ampersand in a url is escaped`,
    html.includes('a=1&amp;b=2'));
});

const failed = results.filter(r => !r).length;
console.log(`\n  ${results.length - failed}/${results.length} passed\n`);
process.exit(failed ? 1 : 0);
