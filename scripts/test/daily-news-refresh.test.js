#!/usr/bin/env node
'use strict';

// Offline coverage. Network failures must never break the main structural gate.
const assert = require('node:assert/strict');
const news = require('../refresh-daily-news.js');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  assert.equal(news.validUrl('https://www.npr.org/2026/11/03/g-s1-1/story', 'npr.org'), true);
  assert.equal(news.validUrl('https://npr.org.evil.example/story', 'npr.org'), false);
  assert.equal(news.validUrl('http://www.npr.org/story', 'npr.org'), false);
  assert.equal(news.validUrl('javascript:alert(1)', 'npr.org'), false);
  // BBC is blocked on student Chromebooks (2026-11-03): it is no longer a source or feed.
  assert.ok(!news.SOURCES.some(s => /bbc/i.test(s.domain)) && !news.FEEDS.some(f => /bbc/i.test(f.url + f.domain)), 'BBC is not a news source');
  assert.deepEqual([...new Set(news.SOURCES.map(s => s.domain))].sort(), ['apnews.com', 'cbsnews.com', 'npr.org', 'pbs.org']);
  assert.ok(news.FEEDS.every(f => news.SOURCES.some(s => s.domain === f.domain)), 'every feed belongs to an approved outlet');

  // The top-story artwork must come from the story, not unrelated
  // permanent photography. Reject unsafe or spoofed image hosts.
  const pbsPhoto = 'https://d3i6fh83elv35t.cloudfront.net/static/2026/11/test-1024x576.jpg';
  assert.equal(news.safePhotoUrl(pbsPhoto), pbsPhoto);
  assert.equal(news.safePhotoUrl('https://npr.brightspotcdn.com/dims3/default/test.jpg'), 'https://npr.brightspotcdn.com/dims3/default/test.jpg');
  assert.equal(news.safePhotoUrl('https://assets3.cbsnewsstatic.com/hub/i/r/test.jpg'), 'https://assets3.cbsnewsstatic.com/hub/i/r/test.jpg');
  assert.equal(news.safePhotoUrl('javascript:alert(1)'), '');
  assert.equal(news.safePhotoUrl('https://ichef.bbci.co.uk/news/1024/branded_news/test.jpg'), '', 'BBC photos are not trusted');
  assert.equal(news.safePhotoUrl('https://someone-else.cloudfront.net/photo.jpg'), '', 'only the PBS CloudFront host');
  assert.equal(news.safePhotoUrl('https://npr.org.evil.example/photo.jpg'), '');
  assert.equal(news.feedPhoto('<item><media:content url="' + pbsPhoto + '" /></item>'), pbsPhoto);
  assert.equal(news.publisherPhoto('<meta property="og:image" content="' + pbsPhoto + '">'), pbsPhoto);
  const publication = fs.readFileSync(path.join(__dirname, '..', 'lib', 'publication-home.html'), 'utf8');
  const homepage = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
  const hydrate = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'js', 'daily-news-hydrate.js'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'css', 'publication-home.css'), 'utf8');
  assert.equal(homepage, publication);
  assert.match(homepage, /data-daily-hero/);
  assert.match(homepage, /data-daily-lead-title/);
  assert.match(homepage, /data-daily-lead-link/);
  assert.doesNotMatch(homepage, /Today's featured investigation/);
  assert.match(hydrate, /hero.style.backgroundImage/);
  assert.doesNotMatch(css, /Tehran%20Skyline%20and%20Alborz%20Mountains\.jpg/);

  // The lead's file photos: every one is a local file that exists, every caption
  // says it is a file photo and not the story's, and the homepage loads the module
  // before the hydrate script that uses it.
  const vm = require('node:vm');
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'js', 'section-photos.js'), 'utf8'), sandbox);
  const sections = sandbox.window.BECURRENT_SECTION_PHOTOS;
  Object.values(sections.photos).forEach(photo => {
    assert.ok(fs.existsSync(path.join(__dirname, '..', '..', photo.src)), `missing file photo ${photo.src}`);
    assert.match(sections.caption(photo), /^File photo: .+\. Not from this story\.$/);
    assert.ok(photo.alt && photo.credit && /^https:\/\//.test(photo.creditUrl), `incomplete credit for ${photo.src}`);
  });
  assert.equal(sections.forCategory('World / Security'), sections.photos.security);
  assert.equal(sections.forCategory('U.S. / Democracy'), sections.photos.democracy);
  assert.equal(sections.forCategory('Something new'), sections.photos.world);
  assert.ok(homepage.indexOf('section-photos.js') < homepage.indexOf('daily-news-hydrate.js'),
    'section-photos.js must load before the hydrate script');

  assert.equal(news.category("Anthropic warns of catastrophic risk ahead of share listing"), 'Technology');
  assert.equal(news.category('Lula wins Brazil election'), 'World / International');
  assert.equal(news.category('Serbia election result changes leadership'), 'World / International');
  assert.equal(news.storyCategory({title:'Opposition wins election in France',source:{beat:'World / International'}}), 'World / International');
  assert.equal(news.storyCategory({title:'US midterms bring new election campaigns',source:{beat:'World / International'}}), 'U.S. / Democracy');
  assert.match(homepage, /data-class-announcement/);
  assert.match(hydrate, /day\.homeAnnouncement/);
  assert.doesNotMatch(homepage, /Current Wire reviewed August|Canada announces retaliatory tariffs/);
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 3600000);
  const old = new Date(now.getTime() - 96 * 3600000);
  assert.equal(news.recent(yesterday, now), true);
  assert.equal(news.recent(old, now), false);
  assert.equal(news.recent(new Date(NaN), now), false);
  assert.equal(news.publisherDate('<meta property="article:published_time" content="' +
    yesterday.toISOString() + '">')?.toISOString(), yesterday.toISOString());
  assert.equal(news.publisherDate('<meta property="article:published_time" content="' +
    old.toISOString() + '">'), null);

  const feed = '<rss><channel><item><title><![CDATA[Major new technology policy affects public schools nationwide]]></title>' +
    '<link>https://www.pbs.org/newshour/nation/c123</link><media:content url="' + pbsPhoto + '" /><pubDate>' +
    yesterday.toUTCString() + '</pubDate><description><![CDATA[Schools discuss changes to their policies.]]></description>' +
    '</item><item><title>Old story should not be included in the news wire</title>' +
    '<link>https://www.pbs.org/newshour/nation/c456</link><pubDate>' + old.toUTCString() +
    '</pubDate></item></channel></rss>';
  const originalFetch = global.fetch;
  global.fetch = async () => new Response(feed, {
    status: 200, headers: { 'content-type': 'application/rss+xml' }
  });
  try {
    const stories = await news.discoverFeed({
      url: 'https://www.pbs.org/newshour/feeds/rss/headlines',
      domain: 'pbs.org', name: 'PBS News', priority: 3
    });
    assert.equal(stories.length, 1);
    assert.equal(stories[0].fromFeed, true);
    assert.equal(stories[0].dek, 'Schools discuss changes to their policies.');
    assert.equal(stories[0].image, pbsPhoto);
  } finally {
    global.fetch = originalFetch;
  }

  const sources = [
    { name: 'NPR', priority: 4 },
    { name: 'Associated Press', priority: 4 },
    { name: 'PBS News', priority: 4 },
    { name: 'CBS News', priority: 4 }
  ];
  const titles = [
    'Congress weighs a new federal voting security proposal',
    'Global diplomats agree to meet about a proposed ceasefire',
    'States prepare new protections against severe flooding',
    'Businesses report major changes in the technology sector',
    'Central banks respond to an international trade slowdown'
  ];
  const items = titles.map((title, i) => ({
    title, published: yesterday, seen: yesterday,
    url: 'https://example.com/' + i,
    source: sources[i % sources.length]
  }));
  const picked = news.choose(items);
  assert.equal(picked.length, 5);
  assert.ok(picked.some(s => s.category.startsWith('U.S.')));
  assert.ok(picked.some(s => s.category.startsWith('World')));
  assert.ok(picked.some(s => /Economy|Technology|Science|Climate/.test(s.category)));
  assert.match(picked[0].category, /^(U\.S\.|World)/);
  assert.equal(news.acceptableArticle('Christa Pike walking after failed execution',
    'https://www.cbsnews.com/news/execution-attempt/'), false);
  const significant = news.choose([
    ...items.filter(s => !/Congress/i.test(s.title)),
    { title: 'Navi Pillay wins Nobel Peace Prize for international law',
      url: 'https://www.npr.org/2026/10/10/nobel', source: { name: 'NPR', priority: 4, beat: 'World / International' },
      published: yesterday, seen: yesterday },
    { title: 'States enact new election security guidelines before voting',
      url: 'https://www.cbsnews.com/news/voting-guidelines/', source: { name: 'CBS News', priority: 4, beat: 'U.S. / National' },
      published: yesterday, seen: yesterday }
  ]);
  assert.match(significant[0].title, /Nobel Peace Prize/);
  assert.equal(news.acceptableArticle('Russell Brand found guilty of rape and sexual assault',
    'https://www.cbsnews.com/news/russell-brand-found-guilty-rape-sexual-assault-verdict/'), false, 'sexual-violence stories stay off the homepage');
  assert.equal(news.acceptableArticle('Russell Brand convicted of rape and sexual assault',
    'https://www.pbs.org/newshour/world/russell-brand-convicted-of-rape-and-sexual-assault'), false);
  assert.equal(news.acceptableArticle('Senate passes bill on the Grapevine water rights compact',
    'https://www.npr.org/2026/11/05/water-rights'), true, 'the filter matches whole words, not letters inside other words');
  assert.equal(news.acceptableArticle('Verstappen on sprint pole after qualifying',
    'https://www.cbsnews.com/sport/formula1/example'), false);
  assert.throws(() => news.choose(items.map(s => ({
    ...s, title: 'Football manager reacts to Premier League news',
    url: 'https://www.cbsnews.com/sport/football/c123'
  }))), /Safety stop/);
  assert.equal(news.acceptableArticle('The Awkward Money Talk Every Friend Group Needs',
    'https://www.cbsnews.com/video/the-awkward-money-talk/'), false, 'video segments are not news reports');
  assert.equal(news.acceptableArticle('Congress weighs a new federal voting security proposal',
    'https://www.cbsnews.com/news/congress-voting-security/'), true);
  assert.throws(() => news.choose(items.slice(0, 4)), /Safety stop/);
  assert.match(news.localDate(), /^\d{4}-\d{2}-\d{2}$/);
  console.log('PASS daily-news-refresh: publisher domains, photo sourcing, homepage lead, RSS, dates, diversity and safety stop');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
