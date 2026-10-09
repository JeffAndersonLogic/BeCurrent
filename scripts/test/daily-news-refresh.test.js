#!/usr/bin/env node
'use strict';

// Offline coverage. Network failures must never break the main structural gate.
const assert = require('node:assert/strict');
const news = require('../refresh-daily-news.js');

async function main() {
  assert.equal(news.validUrl('https://www.bbc.com/news/articles/c123', 'bbc.com'), true);
  assert.equal(news.validUrl('https://www.bbc.co.uk/news/articles/c123', 'bbc.com'), true);
  assert.equal(news.validUrl('https://bbc.com.evil.example/story', 'bbc.com'), false);
  assert.equal(news.validUrl('http://www.bbc.com/news', 'bbc.com'), false);
  assert.equal(news.validUrl('javascript:alert(1)', 'bbc.com'), false);

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
    '<link>https://www.bbc.com/news/articles/c123</link><pubDate>' +
    yesterday.toUTCString() + '</pubDate><description><![CDATA[Schools discuss changes to their policies.]]></description>' +
    '</item><item><title>Old story should not be included in the news wire</title>' +
    '<link>https://www.bbc.com/news/articles/c456</link><pubDate>' + old.toUTCString() +
    '</pubDate></item></channel></rss>';
  const originalFetch = global.fetch;
  global.fetch = async () => new Response(feed, {
    status: 200, headers: { 'content-type': 'application/rss+xml' }
  });
  try {
    const stories = await news.discoverFeed({
      url: 'https://feeds.bbci.co.uk/news/rss.xml',
      domain: 'bbc.com', name: 'BBC News', priority: 3
    });
    assert.equal(stories.length, 1);
    assert.equal(stories[0].fromFeed, true);
    assert.equal(stories[0].dek, 'Schools discuss changes to their policies.');
  } finally {
    global.fetch = originalFetch;
  }

  const sources = [
    { name: 'BBC News', priority: 3 },
    { name: 'Associated Press', priority: 4 },
    { name: 'Reuters', priority: 4 },
    { name: 'NewsNation', priority: 2 }
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
    'https://www.newsnationnow.com/crime/execution-attempt/'), false);
  const significant = news.choose([
    ...items.filter(s => !/Congress/i.test(s.title)),
    { title: 'Navi Pillay wins Nobel Peace Prize for international law',
      url: 'https://www.bbc.com/news/articles/cnobel', source: { name: 'BBC News', priority: 4, beat: 'World / International' },
      published: yesterday, seen: yesterday },
    { title: 'States enact new election security guidelines before voting',
      url: 'https://www.newsnationnow.com/us/voting-guidelines', source: { name: 'NewsNation', priority: 4, beat: 'U.S. / National' },
      published: yesterday, seen: yesterday }
  ]);
  assert.match(significant[0].title, /Nobel Peace Prize/);
  assert.equal(news.acceptableArticle('Verstappen on sprint pole after qualifying',
    'https://www.bbc.co.uk/sport/formula1/articles/example'), false);
  assert.throws(() => news.choose(items.map(s => ({
    ...s, title: 'Football manager reacts to Premier League news',
    url: 'https://www.bbc.co.uk/sport/football/articles/c123'
  }))), /Safety stop/);
  assert.throws(() => news.choose(items.slice(0, 4)), /Safety stop/);
  assert.match(news.localDate(), /^\d{4}-\d{2}-\d{2}$/);
  console.log('PASS daily-news-refresh: publisher domains, RSS fallback, date validation, diversity and safety stop');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
