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

const EXCLUDE = /\b(nfl|nba|mlb|nhl|wnba|playoff|box score|fantasy football|celebrity|box office|movie review|film review|red carpet|horoscope|recipe)\b/i;
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
    return u.protocol === 'https:' && (u.hostname === expectedDomain || u.hostname.endsWith('.' + expectedDomain));
  } catch {
    return false;
  }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'BeCurrent/1.0 educational-news-refresh' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function discover(source) {
  const params = new URLSearchParams({
    query: `domainis:${source.domain}`,
    mode: 'artlist',
    maxrecords: '35',
    timespan: '36h',
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
  })).filter(a => a.title.length >= 20 && a.title.length <= 180 && !EXCLUDE.test(a.title) && validUrl(a.url, source.domain));
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
  const ageHours = Math.max(0, (Date.now() - a.seen.getTime()) / 3600000);
  return a.source.priority * 10 - ageHours;
}

function choose(candidates) {
  const sorted = candidates.sort((a, b) => score(b) - score(a));
  const chosen = [];
  const sourceCounts = new Map();
  const categoryCounts = new Map();
  for (const item of sorted) {
    if (chosen.some(c => similar(c.title, item.title))) continue;
    const cat = category(item.title);
    if ((sourceCounts.get(item.source.name) || 0) >= 2) continue;
    if ((categoryCounts.get(cat) || 0) >= 2) continue;
    chosen.push({ ...item, category: cat });
    sourceCounts.set(item.source.name, (sourceCounts.get(item.source.name) || 0) + 1);
    categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
    if (chosen.length === 5) break;
  }
  if (chosen.length < 5) throw new Error(`Safety stop: only ${chosen.length} diverse approved-source stories found. Existing daily-news.js left untouched.`);
  return chosen;
}

function jsString(value) {
  return JSON.stringify(String(value));
}

async function main() {
  const batches = [];
  for (const source of SOURCES) {
    try {
      batches.push(...await discover(source));
    } catch (err) {
      console.warn(`Discovery failed for ${source.name} (${source.domain}): ${err.message}`);
    }
  }
  if (batches.length < 5) throw new Error('Safety stop: insufficient approved-source candidates. Existing file left untouched.');

  const stories = choose(batches);
  const lead = stories[0];
  const meta = await description(lead.url);
  const dek = meta || `A major developing story reported by ${lead.source.name}. Open the full report for verified details, evidence and context.`;
  const image = /^https:\/\//.test(lead.image) ? lead.image : FALLBACK_IMAGES[lead.category] || FALLBACK_IMAGES['Current Events'];
  const reviewed = localDate();

  const wire = stories.slice(1).map(s => `    {\n      category: ${jsString(s.category)},\n      headline: ${jsString(s.title)},\n      source: ${jsString(s.source.name)},\n      url: ${jsString(s.url)}\n    }`).join(',\n');

  const output = `/* BeCurrent daily news desk.\n   AUTO-REFRESHED by scripts/refresh-daily-news.js and .github/workflows/daily-news-refresh.yml.\n   Discovery uses GDELT only to locate recent coverage; every published link points directly\n   to an approved BeCurrent news source. If refresh validation fails, this file is not committed. */\nwindow.BECURRENT_DAILY_NEWS = {\n  reviewed: ${jsString(reviewed)},\n  lead: {\n    category: ${jsString(lead.category)},\n    headline: ${jsString(lead.title)},\n    dek: ${jsString(dek)},\n    source: ${jsString(lead.source.name)},\n    published: ${jsString(prettyDate(lead.seen))},\n    url: ${jsString(lead.url)},\n    image: ${jsString(image)},\n    imageCredit: ${jsString(/^https:\/\//.test(lead.image) ? lead.source.name : 'Wikimedia Commons')}\n  },\n  wire: [\n${wire}\n  ]\n};\n`;

  const hostChecks = stories.every(s => SOURCES.some(src => validUrl(s.url, src.domain)));
  if (!hostChecks || output.includes('javascript:')) throw new Error('Safety stop: source validation failed.');

  fs.writeFileSync(OUT, output, 'utf8');
  console.log(`Refreshed ${OUT} for ${reviewed}: ${lead.title}`);
  for (const s of stories) console.log(`- ${s.source.name} | ${s.category} | ${s.title}`);
}

main().catch(err => {
  console.error(err.stack || err.message);
  process.exit(1);
});
