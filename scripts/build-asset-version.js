#!/usr/bin/env node
'use strict';

/**
 * Stamp every local asset link with a hash of the file it points at.
 *
 * WHY THIS EXISTS. A cache-busting `?v=` stamp was typed by hand into each page,
 * so one shared asset carried a different stamp on every page that loaded it. On
 * 2026-09-18 `assets/js/iran-topics.js` was loaded by the eight Iran pages under
 * five different stamps at once: 20260904, 20260907, 20260914-topic3, 20260915
 * and 20260918d. That is not untidiness. A stamp is what tells a browser its
 * cached copy is stale, so five stamps on one file means five different cached
 * versions of it in the room, and the page a student is on decides which one they
 * run. Every structural check was green through all of it, because each stamp is
 * a well-formed string and the pages all render.
 *
 * It is also what made a one-line change cost fifteen commits in nine minutes:
 * change the shared file, refresh, see the old version, bump the stamp on the page
 * you are looking at, refresh, find another page still stale, bump that one. The
 * stamps were discovered one at a time because nothing knew they were the same fact.
 *
 * THE FIX IS A HASH, NOT A DATE. The stamp is now eight hex characters of the
 * referenced file's own bytes, computed at build time. That makes the failure
 * structurally impossible rather than merely centralized:
 *
 *   - There is nothing to remember. Change an asset, rebuild, and every page that
 *     loads it gets the new stamp. Forget to rebuild and `--check` fails the push.
 *   - Two pages cannot disagree, because neither page holds the value.
 *   - Only what actually changed is busted. A date shared by the whole site would
 *     re-download every image on a CSS edit, which on a school network is a real
 *     cost paid for nothing.
 *   - It is reproducible in a fresh clone, which a timestamp or a mtime is not,
 *     so `--check` means the same thing in CI as it does on a laptop.
 *
 * A REMOTE URL IS NEVER STAMPED. YouTube's own `?v=` is the video id, so
 * rewriting it would point every clip on the site at a video that does not exist.
 * Only paths that resolve to a file inside this repository are touched, which is
 * also why a link to an asset that is not there fails the run rather than being
 * quietly stamped: a dead asset link renders as a page with no styling and no
 * error, which is the same silent shape as everything else above.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Directories holding no student-facing page: retired work kept for provenance,
// and the Canvas paste documents, which are deliberately self-contained and link
// no local asset at all.
const SKIP_DIRS = new Set(['node_modules', '.git', 'archive', 'docs', 'submissions', 'scripts']);

// A generator's links resolve against where its OUTPUT lands, never against the
// template's own folder, so each one declares that base. Declared rather than
// discovered on purpose: a template treated as a page resolves every link one
// directory too deep and reports the whole site missing, which is how the first
// run of this script read.
//
//   publication-home.html -> index.html at the repository root.
//   iran-topic-page.js    -> assets/js/iran-topics.js, but its script.src is
//                            resolved by the BROWSER against the page that loads
//                            it, and that is always iran/<topic>.html.
//
// Both are rebuilt by their own generator after this runs; see the build:assets
// script in package.json for the order.
const GENERATED_SOURCES = [
  { file: path.join('scripts', 'lib', 'publication-home.html'), base: '.' },
  { file: path.join('scripts', 'lib', 'iran-topic-page.js'), base: 'iran' }
];

// href="..." or src="..." in HTML, and src='...' inside the generator's JS string.
const LINK = /(?:href|src)\s*=\s*(["'])([^"']*\?v=[^"']*)\1/g;

const hashes = new Map();
function stampFor(file) {
  if (!hashes.has(file)) {
    hashes.set(file, crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 8));
  }
  return hashes.get(file);
}

function sources(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) sources(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Each entry is the file to rewrite plus the directory its links resolve against.
const files = [
  ...sources(ROOT).map(file => ({ file, base: path.dirname(file) })),
  ...GENERATED_SOURCES
    .map(({ file, base }) => ({ file: path.join(ROOT, file), base: path.resolve(ROOT, base) }))
    .filter(entry => fs.existsSync(entry.file))
];

const problems = [];
const drifted = [];
let written = 0;

for (const { file, base } of files) {
  const src = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file);

  const next = src.replace(LINK, (whole, quote, value) => {
    // A protocol-bearing or protocol-relative URL is somebody else's asset and
    // somebody else's query string. YouTube's ?v= is the video id.
    if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(value)) return whole;

    const [urlPath, query] = [value.slice(0, value.indexOf('?v=')), value.slice(value.indexOf('?v='))];
    const target = path.resolve(base, urlPath);

    if (!target.startsWith(ROOT + path.sep)) return whole;
    if (!fs.existsSync(target)) {
      problems.push(`${rel} links ${urlPath}, which does not exist`);
      return whole;
    }

    const want = `?v=${stampFor(target)}`;
    if (query === want) return whole;
    drifted.push(`${rel}: ${urlPath} stamped ${query.slice(3)}, should be ${want.slice(3)}`);
    return whole.replace(query, want);
  });

  if (next !== src && !CHECK) {
    fs.writeFileSync(file, next);
    written++;
  }
}

if (problems.length) {
  console.error('Asset links pointing at files that are not there:');
  problems.forEach(p => console.error(`  ${p}`));
  process.exit(1);
}

if (CHECK) {
  if (drifted.length) {
    console.error(`Asset stamps are stale in ${drifted.length} place(s). Run: npm run build:assets`);
    drifted.forEach(d => console.error(`  ${d}`));
    process.exit(1);
  }
  console.log(`Asset stamps current across ${files.length} files.`);
} else {
  console.log(drifted.length
    ? `Stamped ${drifted.length} asset link(s) across ${written} file(s).`
    : `Asset stamps already current across ${files.length} files.`);
}
