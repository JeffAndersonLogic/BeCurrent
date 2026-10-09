#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'assets', 'data', 'daily-news.js');
const TZ = 'America/Indiana/Indianapolis';
const SOURCES = [
  { domain: 'apnews.com', name: 'Associated Press', priority: 4 },
  { domain: 'reuters.com', name: 'Reuters', priority: 4 },
  { domain: 'bbc.com', name: 'BBC News', priority: 3 },
  { domain: 'bbc.co.uk', name: 'BBC News', priority: 3 },
  { domain: 'newsnationnow.com', name: 'NewsNation', priority: 2 }
];

// Each feed represents a useful classroom news beat; avoid general UK
// front-page feeds that mix domestic celebrity and match reports with news.
const FEEDS = [
  { url: 'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml', domain: 'bbc.com', name: 'BBC News', priority: 4, beat: 'U.S. / National' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', domain: 'bbc.com', name: 'BBC News', priority: 4, beat: 'World / International' },
  { url: 'https://feeds.bbci.co.uk/news/business/rss.xml', domain: 'bbc.com', name: 'BBC News', priority: 3, beat: 'Economy' },
  { url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', domain: 'bbc.com', name: 'BBC News', priority: 3, beat: 'Technology' },
  { url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml', domain: 'bbc.com', name: 'BBC News', priority: 3, beat: 'Science / Environment' },
  { url: 'https://www.newsnationnow.com/feed/', domain: 'newsnationnow.com', name: 'NewsNation', priority: 4, beat: 'U.S. / National' }
];
const MAX_AGE_HOURS = 60;

const EXCLUDE = /\b(nfl|nba|mlb|nhl|wnba|playoff|box score|fantasy football|celebrity|box office|movie review|film review|red carpet|horoscope|recipe|formula one|formula 1|premier league|football club|man city|manchester united|sprint pole|verstappen|grand prix|lethal injection|failed execution|execution attempt|death row)\b/i;
function acceptableArticle(title, url) {
  try {
    const pathname = new URL(url).pathname;
    return !EXCLUDE.test(title) && !/\/(?:sport|football|formula1|cricket|tennis)\//i.test(pathname);
  } catch (_) { return false; }
}
const FALLBACK_IMAGES = {
  'U.S. / Democracy': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/United_States_Capitol_west_front_edit2.jpg',
  'U.S. / Government': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/US_Capitol_west_side.JPG',
  'World / Security': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Blue_Marble_2002.png',
  'World / Diplomacy': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/United_Nations_Headquarters_in_New_York_City%2C_viewed_from_Roosevelt_Island.jpg',
  'Economy': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/New_York_Stock_Exchange_Facade_2015.jpg',
  'Technology': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg',
  'Climate / Environment': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Earth_seen_from_Apollo_17.jpg',
  'Current Events': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/World_Map_Blank.svg'
};

function localDate() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function prettyDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', { timeZone: TZ, month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}

function parseSeenDate(value) {
  if (!value) return new Date(0);
  const m = String(value).match(/(\d{4})(\d{2})(\d{2})T?(\d{2})(\d{2})(\d{2})?Z?/);
  if (!m) return new Date(value);
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)));
}

function category(title) {
  const t = title.toLowerCase();
  if (/election|vot|ballot|supreme court|constitution|democracy|congress/.test(t)) return 'U.S. / Democracy';
  if (/white house|president|senate|house of representatives|federal|governor/.test(t)) return 'U.S. / Government';
  if (/iran|israel|gaza|ukraine|russia|china|taiwan|missile|war|military|attack|nuclear|security/.test(t)) return 'World / Security';
  if (/summit|diplomat|ceasefire|treaty|sanction|united nations|negotiat/.test(t)) return 'World / Diplomacy';
  if (/econom|inflation|tariff|trade|jobs|market|oil|gas price|interest rate|fed\b|bank/.test(t)) return 'Economy';
  if (/ai\b|artificial intelligence|technology|tech\b|cyber|data center|social media/.test(t)) return 'Technology';
  if (/climate|wildfire|hurricane|flood|storm|environment|epa\b|heat/.test(t)) return 'Climate / Environment';
  return 'Current Events';
}

function storyCategory(article) {
  const derived = category(article.title);
  return derived !== 'Current Events' ? derived : (article.source.beat || derived);
}

function words(title) {
  return new Set(title.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 3));
}

function similar(a, b) {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return false;
  let overlap = 0;
  for (const w of A) if (B.has(w)) overlap++;
  return overlap / Math.min(A.size, B.size) >= 0.55;
}

function validUrl(url, expectedDomain) {
  try {
    const u = new URL(url);
    const domains = expectedDomain === 'bbc.com' || expectedDomain === 'bbc.co.uk'
      ? ['bbc.com', 'bbc.co.uk'] : [expectedDomain];
    return u.protocol === 'https:' && domains.some(d => u.hostname === d || u.hostname.endsWith('.' + d));
  } catch {
    return false;
  }
}

async function fetchPage(url, accept) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(url, {
        signal: controller.signal, redirect: 'follow',
        headers: { 'user-agent': 'BeCurrent educational news refresher', accept: accept || '*/*' }
      });
      if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
      return res;
    } catch (err) {
      lastError = err;
      if (attempt === 0) await new Promise(done => setTimeout(done, 1000));
    } finally { clearTimeout(timer); }
  }
  throw lastError;
}
async function fetchJson(url) {
  const res = await fetchPage(url, 'application/json');
  return res.json();
}
function recent(date, now = new Date()) {
  return date instanceof Date && Number.isFinite(date.getTime()) &&
    date.getTime() <= now.getTime() + 5 * 60000 &&
    now.getTime() - date.getTime() <= MAX_AGE_HOURS * 3600000;
}
function stripMarkup(value) {
  return String(value || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ').replace(/&#(x[0-9a-f]+|\d+);/gi, (_, raw) => {
      const point = raw[0].toLowerCase() === 'x' ? parseInt(raw.slice(1), 16) : parseInt(raw, 10);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '';
    }).replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
function rssTag(item, name) {
  const match = item.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i'));
  return match ? stripMarkup(match[1]) : '';
}
function safePhotoUrl(value) {
  try {
    const url = new URL(stripMarkup(value));
    const domains = ['bbc.co.uk', 'bbc.com', 'bbci.co.uk', 'bbci.com',
      'apnews.com', 'reuters.com', 'newsnationnow.com', 'wikimedia.org', 'wp.com'];
    return url.protocol === 'https:' &&
      domains.some(domain => url.hostname === domain || url.hostname.endsWith('.' + domain))
      ? url.href : '';
  } catch (_) { return ''; }
}
function publisherPhoto(html) {
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metas) {
    if (!/(?:name|property)=["'](?:og:image|twitter:image)["']/i.test(tag)) continue;
    const value = (tag.match(/\bcontent=["']([^"']+)["']/i) || [])[1];
    const url = safePhotoUrl(value);
    if (url) return url;
  }
  return '';
}
function feedPhoto(item) {
  for (const tag of item.match(/<media:(?:thumbnail|content)\b[^>]*>/gi) || []) {
    const value = (tag.match(/\burl=["']([^"']+)["']/i) || [])[1];
    const url = safePhotoUrl(value);
    if (url) return url;
  }
  return '';
}

async function discoverFeed(source) {
  const res = await fetchPage(source.url, 'application/rss+xml, application/xml, text/xml');
  const xml = await res.text();
  if (!/<rss[\s>]/i.test(xml)) throw new Error('Invalid RSS feed');
  return (xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) || []).map(item => ({
    title: rssTag(item, 'title'),
    url: rssTag(item, 'link'),
    dek: rssTag(item, 'description').slice(0, 300),
    image: feedPhoto(item),
    published: new Date(rssTag(item, 'pubDate')),
    source,
    fromFeed: true
  })).filter(a => a.title.length >= 20 && a.title.length <= 180 &&
    acceptableArticle(a.title, a.url) && validUrl(a.url, source.domain) && recent(a.published));
}
function publisherDate(html) {
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metas) {
    if (!/(?:article:published_time|datePublished|pubdate|publish-date)/i.test(tag)) continue;
    const match = tag.match(/\bcontent=["']([^"']+)["']/i);
    if (match && recent(new Date(match[1]))) return new Date(match[1]);
  }
  const jsonDate = html.match(/["']datePublished["']\s*:\s*["']([^"']+)["']/i);
  if (jsonDate && recent(new Date(jsonDate[1]))) return new Date(jsonDate[1]);
  return null;
}
function publisherSummary(html) {
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metas) {
    if (!/(?:name|property)=["'](?:description|og:description)["']/i.test(tag)) continue;
    const match = tag.match(/\bcontent=["']([^"']+)["']/i);
    if (match) return stripMarkup(match[1]).slice(0, 300);
  }
  return '';
}
async function verifyArticle(article) {
  let res;
  try {
    res = await fetchPage(article.url, 'text/html');
  } catch (err) {
    // Some publishers block automated article reads while publishing valid RSS.
    // Their own signed-off RSS <link> and <pubDate> remain a direct source,
    // unlike GDELT's unverified discovery timestamp.
    if (article.fromFeed && validUrl(article.url, article.source.domain) && recent(article.published)) {
      console.warn('Publisher RSS used without page read: ' + article.url + ' (' + err.message + ')');
      return { ...article, dek: article.dek || '' };
    }
    throw err;
  }
  if (!validUrl(res.url, article.source.domain)) return null;
  if (!(res.headers.get('content-type') || '').includes('html')) return null;
  const html = (await res.text()).slice(0, 600000);
  // GDELT's 'seendate' is discovery time, not publication time. Never
  // display it as the outlet's publication date.
  const published = article.fromFeed ? article.published : publisherDate(html);
  if (!recent(published)) return null;
  return { ...article, url: res.url, published,
    dek: publisherSummary(html) || article.dek || '',
    image: publisherPhoto(html) || safePhotoUrl(article.image) };
}

async function discover(source) {
  const params = new URLSearchParams({
    query: `domainis:${source.domain}`,
    mode: 'artlist',
    maxrecords: '35',
    timespan: '60h',
    sort: 'datedesc',
    format: 'json'
  });
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${params}`;
  const data = await fetchJson(url);
  return (data.articles || []).map(article => ({
    title: String(article.title || '').replace(/\s+/g, ' ').trim(),
    url: String(article.url || ''),
    image: String(article.socialimage || ''),
    seen: parseSeenDate(article.seendate),
    source
  })).filter(a => a.title.length >= 20 && a.title.length <= 180 && acceptableArticle(a.title, a.url) && validUrl(a.url, source.domain));
}

async function description(url) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 BeCurrent classroom news desk' }, redirect: 'follow' });
    if (!res.ok) return '';
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/html')) return '';
    const html = (await res.text()).slice(0, 600000);
    const match = html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["'](?:description|og:description)["']/i);
    if (!match) return '';
    return match[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim().slice(0, 320);
  } catch {
    return '';
  }
}

function score(a) {
  const ageHours = Math.max(0, (Date.now() - (a.published || a.seen).getTime()) / 3600000);
  const beat = storyCategory(a);
  const classroomWeight = /^U\.S\./.test(beat) || /^World/.test(beat) ? 24
    : /Economy|Technology|Science|Climate/.test(beat) ? 15 : -14;
  // Prioritize consequential civic and international events over niche
  // sensational/crime stories that are less suitable as a shared 9th-grade Lead.
  const major = /\bnobel peace prize\b/i.test(a.title) ? 50 :
    /\bsupreme court\b|\bpresidential election\b|\belection result\b|\bceasefire\b|\bpeace agreement\b|\bmajor hurricane\b|\bclimate summit\b|\bcongress\b|\bgovernment shutdown\b/i.test(a.title) ? 35 : 0;
  const nicheCrime = /\bmurder\b|\bexecution\b|\bhomicide\b|\bcrime\b/i.test(a.title) ? -25 : 0;
  return a.source.priority * 10 + classroomWeight + major + nicheCrime - ageHours / 3;
}
function choose(candidates) {
  const sorted = [...candidates].filter(s => acceptableArticle(s.title, s.url))
    .sort((a, b) => score(b) - score(a));
  const chosen = [];
  function take(predicate) {
    const next = sorted.find(s =>
      predicate(storyCategory(s)) &&
      !chosen.some(c => c.url === s.url || similar(c.title, s.title)));
    if (next) chosen.push({ ...next, category: storyCategory(next) });
    return !!next;
  }
  // Editorial gate: the shared Lead must concern U.S. or world affairs.
  if (!take(beat => /^U\.S\./.test(beat) || /^World/.test(beat))) {
    throw new Error('Safety stop: no substantial U.S. or world lead found.');
  }
  // A usable classroom Wire must contain both U.S. and world coverage,
  // plus a third beat. Fail closed instead of displaying five UK sports/party items.
  if (!chosen.some(s => /^U\.S\./.test(s.category)) && !take(beat => /^U\.S\./.test(beat))) {
    throw new Error('Safety stop: no fresh U.S. story found.');
  }
  if (!chosen.some(s => /^World/.test(s.category)) && !take(beat => /^World/.test(beat))) {
    throw new Error('Safety stop: no fresh world story found.');
  }
  if (!chosen.some(s => /Economy|Technology|Science|Climate/.test(s.category)) &&
      !take(beat => /Economy|Technology|Science|Climate/.test(beat))) {
    throw new Error('Safety stop: no fresh economy, science or technology story found.');
  }
  while (chosen.length < 5) {
    const counts = new Map();
    chosen.forEach(s => counts.set(s.category, (counts.get(s.category) || 0) + 1));
    if (!take(beat => (counts.get(beat) || 0) < 2)) break;
  }
  if (chosen.length < 5) throw new Error('Safety stop: fewer than five distinct classroom-relevant stories.');
  return chosen;
}

function jsString(value) {
  return JSON.stringify(String(value));
}

async function main() {
  const jobs = [...FEEDS.map(discoverFeed), ...SOURCES.map(discover)];
  const results = await Promise.allSettled(jobs);
  const gathered = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') gathered.push(...r.value);
    else console.warn('Discovery source ' + i + ' failed: ' + r.reason.message);
  });
  if (gathered.length < 5) throw new Error('Safety stop: insufficient publisher/index candidates.');

  const unique = new Map();
  for (const item of gathered) {
    if (!unique.has(item.url) || (item.fromFeed && !unique.get(item.url).fromFeed)) unique.set(item.url, item);
  }
  const ranked = [...unique.values()].sort((a, b) => {
    const da = a.published || a.seen, db = b.published || b.seen;
    return (b.source.priority * 10 - (Date.now() - db) / 14400000) -
           (a.source.priority * 10 - (Date.now() - da) / 14400000);
  });
  // Round-robin by outlet + feed beat. A flood of BBC or AP headlines
  // must not crowd U.S., world, science and NewsNation out of verification.
  const groups = new Map();
  for (const item of ranked) {
    const key = item.source.name + ':' + (item.source.beat || 'index');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const candidates = [];
  for (let round = 0; candidates.length < 72; round++) {
    let added = 0;
    for (const group of groups.values()) {
      if (group[round]) { candidates.push(group[round]); added++; }
    }
    if (!added) break;
  }

  const verified = [];
  // Verify in small batches. Invalid, blocked or undated pages are excluded.
  for (let i = 0; i < Math.min(candidates.length, 72) && verified.length < 20; i += 8) {
    const batch = await Promise.allSettled(candidates.slice(i, i + 8).map(verifyArticle));
    for (const result of batch) {
      if (result.status !== 'fulfilled' || !result.value) continue;
      const item = result.value;
      if (!verified.some(s => s.url === item.url || similar(s.title, item.title))) verified.push(item);
    }
  }
  const stories = choose(verified);
  const lead = stories[0];
  const dek = (lead.dek || 'Read the original reporting to identify what happened and why it matters.').slice(0, 320);
  // Use the story's own publisher photo where available, not an unrelated
  // Tehran skyline or generic world map. This licensed archival portrait is
  // specifically for Navi Pillay when she is the lead, not a recurring stock photo.
  const naviArchive = /navi pillay/i.test(lead.title) && /nobel peace prize/i.test(lead.title);
  const image = naviArchive
    ? 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Navanethem_Pillay.jpg'
    : safePhotoUrl(lead.image);
  const imageCredit = naviArchive
    ? 'File photo (2009): Antônio Cruz / Agência Brasil · CC BY 3.0 BR'
    : (image ? 'Image: ' + lead.source.name : '');
  const imageCreditUrl = naviArchive
    ? 'https://commons.wikimedia.org/wiki/File:Navanethem_Pillay.jpg'
    : (image ? lead.url : '');
  const reviewed = localDate();
  const wire = stories.slice(1).map(s => '    {\n' +
    '      category: ' + jsString(storyCategory(s)) + ',\n' +
    '      headline: ' + jsString(s.title) + ',\n' +
    '      dek: ' + jsString((s.dek || 'Open the original report and examine the evidence.').slice(0, 300)) + ',\n' +
    '      source: ' + jsString(s.source.name) + ',\n' +
    '      published: ' + jsString(prettyDate(s.published)) + ',\n' +
    '      url: ' + jsString(s.url) + '\n    }').join(',\n');
  const output = [
    '/* BeCurrent daily news, publisher-verified refresh. Do not place student work here. */',
    'window.BECURRENT_DAILY_NEWS = {',
    '  reviewed: ' + jsString(reviewed) + ',',
    '  lead: {',
    '    category: ' + jsString(storyCategory(lead)) + ',',
    '    headline: ' + jsString(lead.title) + ',',
    '    dek: ' + jsString(dek) + ',',
    '    source: ' + jsString(lead.source.name) + ',',
    '    published: ' + jsString(prettyDate(lead.published)) + ',',
    '    url: ' + jsString(lead.url) + ',',
    '    image: ' + jsString(image) + ',',
    '    imageCredit: ' + jsString(imageCredit) + ',',
    '    imageCreditUrl: ' + jsString(imageCreditUrl),
    '  },',
    '  wire: [',
    wire,
    '  ]',
    '};',
    ''
  ].join('\n');
  if (!stories.every(s => SOURCES.some(src => validUrl(s.url, src.domain)) && recent(s.published))) {
    throw new Error('Safety stop: output failed publisher or publication-date validation.');
  }
  // Write only when the entire selection is valid; failures never partially publish.
  fs.writeFileSync(OUT, output, 'utf8');
  console.log('Verified refresh for ' + reviewed + ': ' + lead.title);
  stories.forEach(s => console.log('- ' + s.source.name + ' | ' + prettyDate(s.published) + ' | ' + s.title));
}

if (require.main === module) {
  main().catch(err => { console.error(err.stack || err.message); process.exitCode = 1; });
}
module.exports = { validUrl, recent, parseSeenDate, discoverFeed, publisherDate, choose, category, storyCategory, acceptableArticle, localDate, safePhotoUrl, publisherPhoto, feedPhoto };
