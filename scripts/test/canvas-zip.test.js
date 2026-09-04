#!/usr/bin/env node
/**
 * canvas-zip.test.js
 *
 * The Skills Lens reads a Canvas "Download Submissions" zip directly, so a
 * teacher never has to open a Terminal. That means a hand-written zip reader is
 * now in the path of every piece of student work that reaches analysis, and a
 * reader that quietly drops one entry costs one student their whole submission
 * with nothing on screen to say so.
 *
 * So this tests against zips written by real platform tools: `zip(1)` where it
 * exists and Python's zipfile everywhere else, rather than against a zip this
 * repository wrote itself. A reader
 * tested only against its own writer agrees with its own assumptions.
 *
 * The cases that matter, each a real shape Canvas or a teacher can produce:
 *
 *   deflate            the normal case, method 8
 *   stored             method 0, what `zip -0` and small files produce
 *   data descriptors   sizes deferred to after the payload, which is what a
 *                      streaming generator like Canvas emits. Reading local
 *                      headers instead of the central directory gets this wrong.
 *   a folder prefix    "submissions/name_1_2_text.html", from a teacher who
 *                      zipped the folder rather than its contents
 *   __MACOSX junk      re-zipping on a Mac adds resource forks that must not
 *                      become students named "._andersonjeff"
 *   a zip comment      pushes the end-of-directory record away from the last
 *                      byte, so a reader that only looks at the tail misses it
 *   not a zip at all   must say so in words a teacher can act on
 *
 * Offline, no browser, no dependencies. DecompressionStream is native in Node 18+
 * and in every browser the Lens runs in, which is why the same code works on both
 * sides.
 *
 *   node scripts/test/canvas-zip.test.js
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const ZIP = require('../lib/canvas-zip');
const CORE = require('../lib/canvas-parse-core');

const results = [];
function check(name, pass, detail) {
  results.push(pass);
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bh-zip-'));
function cleanup() { fs.rmSync(tmp, { recursive: true, force: true }); }

function works(exe, args) {
  const r = spawnSync(exe, args, { stdio: 'ignore' });
  return !r.error && r.status === 0;
}

function pythonCommand() {
  const bundled = process.platform === 'win32'
    ? path.resolve(path.dirname(process.execPath), '..', '..', 'python', 'python.exe')
    : '';
  const candidates = [
    { exe: 'python3', pre: [] },
    { exe: 'python', pre: [] },
    { exe: 'py', pre: ['-3'] },
    ...(bundled && fs.existsSync(bundled) ? [{ exe: bundled, pre: [] }] : [])
  ];
  return candidates.find(c => works(c.exe, c.pre.concat(['--version']))) || null;
}

const PYTHON = pythonCommand();
if (!PYTHON) {
  cleanup();
  console.error('canvas-zip.test.js needs Python 3 to create standards-compliant fixtures.');
  process.exit(1);
}

function runPython(code) {
  execFileSync(PYTHON.exe, PYTHON.pre.concat(['-c', code]));
}

function zipDirectory(dir, out, stored = false) {
  // Keep testing a second, independent writer on Unix when zip(1) is present.
  if (works('zip', ['-v'])) {
    execFileSync('zip', ['-q', ...(stored ? ['-0'] : []), '-r', out, '.'], { cwd: dir });
    return;
  }
  runPython(`
import os, zipfile
root = ${JSON.stringify(dir)}
mode = zipfile.ZIP_STORED if ${stored ? 'True' : 'False'} else zipfile.ZIP_DEFLATED
with zipfile.ZipFile(${JSON.stringify(out)}, 'w', mode) as z:
    for base, dirs, files in os.walk(root):
        for name in files:
            full = os.path.join(base, name)
            z.write(full, os.path.relpath(full, root))
`);
}

// ── A submission with a real manifest, so the parser has something to verify ──
function submission(topic, slots) {
  const recs = slots.map((s, i) => {
    const rh = CORE.bhHash(s.text);
    return { ord: String(i + 1).padStart(2, '0'), slot: s.slot, label: s.label, rh: rh, cf: s.cf || '' };
  });
  const sum = CORE.bhHash(recs.map(r => r.slot + ':' + r.rh).join('|'));
  const body = recs.map((r, i) => [
    `<p><strong>${r.label}</strong></p>`,
    `<p><strong>Question:</strong> <em>${slots[i].prompt}</em></p>`,
    '<p><strong>My response:</strong></p>',
    `<p>${slots[i].text}</p>`
  ].join('\n')).join('\n<hr>\n');
  const manifest = [
    '<p>--- BECURRENT RECORD, do not edit ---</p>',
    `<p>#BHV|v=1|topic=${topic}|copied=2026-08-07T14:38:32.878Z|items=${recs.length}|expected=${recs.length}|sum=${sum}|#</p>`
  ].concat(recs.map(r =>
    `<p>#BHR|i=${r.ord}|slot=${r.slot}|lab=${r.label}|w=9|c=40|ph=00000000|rh=${r.rh}|cf=${r.cf}|#</p>`
  )).join('\n');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<p><strong>CURRENT EVENTS, WEEK ${topic}</strong></p>
<p><em>Student work, copied 8/7/2026, 10:38:32 AM</em></p>
<hr>
${body}
<hr>
${manifest}
</body></html>`;
}

const SLOTS = [
  { slot: 'where-response', label: 'Module 01, Where in the World',
    prompt: 'Which countries does this week\'s story touch, and why does place matter here?',
    text: 'It runs through the Red Sea, so a closure there raises shipping costs on goods sold in Indiana.', cf: '4' },
  { slot: 'coverage-response', label: 'Module 04, Coverage Compare',
    prompt: 'What did the two outlets choose differently?',
    text: 'One led with the cost to shoppers and the other led with the naval response, from the same facts.', cf: '' }
];

const STUDENTS = [
  ['andersonjeff_88123_310529_text.html', submission('w01', SLOTS)],
  ['odonnellsiobhan_88124_310530_text.html', submission('w01', SLOTS)],
  ['garciamaria_LATE_88125_310531_text.html', submission('w01', SLOTS)]
];

function stage(dir, files) {
  fs.mkdirSync(dir, { recursive: true });
  files.forEach(([name, text]) => {
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, text, 'utf8');
  });
}

async function readZip(file) {
  return ZIP.readTextEntries(new Uint8Array(fs.readFileSync(file)), {
    accept: CORE.isSubmissionFile,
    sniff: CORE.looksLikeSubmission
  });
}

// Name filter only, to prove the rescue path is what saves the odd cases rather
// than the fast path having quietly been loosened.
async function readZipByNameOnly(file) {
  return ZIP.readTextEntries(new Uint8Array(fs.readFileSync(file)), {
    accept: CORE.isSubmissionFile
  });
}

const REAL = path.join(__dirname, 'fixtures', 'canvas-download-studenttest.html');

(async () => {
  console.log('\n  Zips written by real tools\n');

  // ── zip(1), default deflate ────────────────────────────────────────────────
  const flat = path.join(tmp, 'flat');
  stage(flat, STUDENTS);
  const deflated = path.join(tmp, 'deflate.zip');
  zipDirectory(flat, deflated);

  let r = await readZip(deflated);
  check('platform deflate writer, all three submissions read',
    r.files.length === 3, `${r.files.length} files, ${r.skipped.length} skipped`);
  check('text survives the inflate byte for byte',
    r.files.every(f => f.text === STUDENTS.find(s => s[0] === CORE.baseName(f.name))[1]));

  // The point of the whole exercise: the same rows the CLI would have written.
  let table = CORE.buildTable(r.files);
  check('parses to 6 rows, 3 students, no exceptions',
    table.rows.length === 6 && table.stats.students === 3 && table.stats.exceptions === 0,
    `${table.rows.length} rows, ${table.stats.students} students, ${table.stats.exceptions} exceptions`);
  check('the LATE student is marked late, and only that one',
    table.rows.filter(x => x.late === 'yes').length === 2
    && table.rows.filter(x => x.late === 'yes').every(x => x.student_display === 'garciamaria'));
  check('confidence comes through, blanks stay blank',
    table.stats.rated === 3 && table.rows.filter(x => x.confidence === '').length === 3,
    `${table.stats.rated} rated of ${table.rows.length}`);

  // ── zip(1), stored ─────────────────────────────────────────────────────────
  const stored = path.join(tmp, 'stored.zip');
  zipDirectory(flat, stored, true);
  r = await readZip(stored);
  check('stored entries (method 0) read without inflating', r.files.length === 3,
    `${r.files.length} files`);

  // ── Data descriptors, what a streaming writer like Canvas emits ────────────
  // Python writes these when the file object is not seekable. The sizes in the
  // local header are zero and the truth is only in the central directory.
  const streamed = path.join(tmp, 'streamed.zip');
  runPython(`
import zipfile, sys, io
class NoSeek(io.RawIOBase):
    def __init__(self, f): self.f = f
    def write(self, b): return self.f.write(b)
    def writable(self): return True
    def seekable(self): return False
with open(${JSON.stringify(streamed)}, 'wb') as raw:
    with zipfile.ZipFile(NoSeek(raw), 'w', zipfile.ZIP_DEFLATED) as z:
        for name, text in ${JSON.stringify(STUDENTS)}:
            z.writestr(name, text)
`);
  const streamedEntries = ZIP.listEntries(new Uint8Array(fs.readFileSync(streamed)));
  r = await readZip(streamed);
  check('data-descriptor zip, sizes taken from the central directory',
    r.files.length === 3 && r.files.every(f => f.text.includes('BECURRENT RECORD')),
    `${r.files.length} files, ${streamedEntries.length} entries in directory`);

  // ── A folder prefix inside the archive ─────────────────────────────────────
  const nested = path.join(tmp, 'nested');
  stage(nested, STUDENTS.map(([n, t]) => ['submissions/' + n, t]));
  const nestedZip = path.join(tmp, 'nested.zip');
  zipDirectory(nested, nestedZip);
  r = await readZip(nestedZip);
  table = CORE.buildTable(r.files);
  check('a zipped folder still yields clean student names',
    table.rows.length === 6
    && table.rows.every(x => !x.student_display.includes('/'))
    && new Set(table.rows.map(x => x.student_display)).size === 3,
    Array.from(new Set(table.rows.map(x => x.student_display))).join(', '));

  // ── macOS re-zip junk ──────────────────────────────────────────────────────
  const macish = path.join(tmp, 'macish');
  stage(macish, STUDENTS.concat([
    ['__MACOSX/._andersonjeff_88123_310529_text.html', 'Mac resource fork garbage'],
    ['.DS_Store', 'junk']
  ]));
  const macZip = path.join(tmp, 'mac.zip');
  zipDirectory(macish, macZip);
  r = await readZip(macZip);
  table = CORE.buildTable(r.files);
  check('__MACOSX and dotfiles are excluded, not turned into students',
    table.stats.students === 3 && !table.rows.some(x => x.student_display.startsWith('._')),
    `${table.stats.students} students, ${r.skipped.length} entries skipped`);
  check('and the skipped entries are reported rather than silently dropped',
    r.skipped.length >= 1, r.skipped.map(s => CORE.baseName(s.name)).join(', ') || 'none');

  // ── A zip comment after the end-of-directory record ────────────────────────
  const commented = path.join(tmp, 'commented.zip');
  fs.copyFileSync(deflated, commented);
  runPython(`
import zipfile
z = zipfile.ZipFile(${JSON.stringify(commented)}, 'a')
z.comment = b'x' * 900
z.close()
`);
  r = await readZip(commented);
  check('a trailing zip comment does not hide the directory', r.files.length === 3,
    `${r.files.length} files, comment 900 bytes`);

  console.log('\n  A real Canvas download, and entries the convention did not predict\n');

  // The file Canvas actually produced on 2026-08-07, committed verbatim. Test
  // Student, the teacher's own writing, no real student in it.
  //
  // It is a BeHistorical paste, and that is the point rather than an oversight.
  // The one thing no synthetic fixture can prove is what Canvas does to a pasted
  // document, and this is the only real round trip that exists. Because the
  // machine grammar is shared, BeCurrent's parser must read it: if a change here
  // ever stops handling it, the "one parser, both courses" promise has already
  // broken. Replace it with a BeCurrent round trip once week 01 has been through
  // Canvas for real, and keep this one alongside.
  const realText = fs.readFileSync(REAL, 'utf8');
  check('the committed real download still parses to 9 clean responses',
    (() => { const t = CORE.buildTable([{ name: 'studenttest_LATE_310529_text.html', text: realText }]);
      return t.rows.length === 9 && t.stats.exceptions === 0; })());

  // The reported failure: a zip whose one entry does not match the filename
  // convention. Gating on the name alone reported "no Canvas text submissions"
  // about an archive holding a perfectly good submission.
  const odd = path.join(tmp, 'odd');
  stage(odd, [['submission_310529', realText]]);
  const oddZip = path.join(tmp, 'odd.zip');
  zipDirectory(odd, oddZip);

  const byName = await readZipByNameOnly(oddZip);
  check('name filter alone finds nothing in it, which was the bug',
    byName.files.length === 0, `${byName.files.length} files`);

  r = await readZip(oddZip);
  check('the content sniff rescues it', r.files.length === 1 && r.rescued,
    `${r.files.length} file, rescued=${r.rescued}`);
  check('and it parses to the same 9 responses',
    CORE.buildTable(r.files).rows.length === 9,
    `${CORE.buildTable(r.files).rows.length} rows`);

  // The rescue must not turn junk into students. A zip of unrelated files still
  // reports nothing found, and names what it saw.
  const junk = path.join(tmp, 'junk');
  stage(junk, [['notes.rtf', 'just some notes'], ['essay.docx', 'PK not really'], ['photo.png', 'binary-ish']]);
  const junkZip = path.join(tmp, 'junk.zip');
  zipDirectory(junk, junkZip);
  r = await readZip(junkZip);
  check('a zip of unrelated files is still rejected', r.files.length === 0,
    `${r.files.length} files`);
  check('and the error can name what was in it, rather than restating its own rule',
    r.entries.length === 3 && r.entries.some(n => /notes\.rtf/.test(n)),
    r.entries.join(', '));

  // .txt submissions carry the manifest too, and a plain-text one must not be
  // run through htmlToText, which would flatten its paragraphs.
  const plain = 'CURRENT EVENTS, WEEK 01\n\nModule 01, Where in the World\nQuestion: Why?\nMy response:\nFirst paragraph.\n\nSecond paragraph.\n';
  check('a plain-text submission keeps its blank line',
    CORE.submissionText('weirdname', plain).indexOf('First paragraph.\n\nSecond paragraph.') !== -1);

  console.log('\n  Failing honestly\n');

  // ── Not a zip ──────────────────────────────────────────────────────────────
  let err = null;
  try { await readZip(path.join(flat, STUDENTS[0][0])); } catch (e) { err = e; }
  check('an HTML file dropped by mistake is named as not-a-zip',
    err && err.name === 'ZipError' && /does not look like a zip/i.test(err.message));
  check('and the error carries a next step, not just a diagnosis',
    err && /responses\.csv|Download Submissions/i.test(err.hint || ''),
    err ? (err.hint || '').slice(0, 60) + '...' : 'no error raised');

  // ── Truncated ──────────────────────────────────────────────────────────────
  const cut = path.join(tmp, 'cut.zip');
  const whole = fs.readFileSync(deflated);
  fs.writeFileSync(cut, whole.subarray(0, Math.floor(whole.length * 0.6)));
  err = null;
  try { await readZip(cut); } catch (e) { err = e; }
  check('a half-downloaded zip raises rather than returning nothing',
    err && err.name === 'ZipError', err ? err.message.slice(0, 52) : 'no error raised');

  // ── One corrupt member among good ones ─────────────────────────────────────
  // A single unreadable entry must cost one student, never the other two.
  //
  // The corruption has to land in the compressed payload. A first version of
  // this flipped bytes at a fixed offset from the local header and hit the
  // filename, which this reader ignores in favour of the central directory's
  // copy, so nothing broke and the assertion passed against an intact archive.
  const bytes = new Uint8Array(fs.readFileSync(deflated));
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const victim = ZIP.listEntries(bytes).find(e => CORE.isSubmissionFile(e.name));
  const payloadAt = victim.offset + 30
    + dv.getUint16(victim.offset + 26, true)
    + dv.getUint16(victim.offset + 28, true);
  for (let i = 8; i < Math.min(48, victim.compressedSize); i++) bytes[payloadAt + i] ^= 0xff;

  r = await ZIP.readTextEntries(bytes, CORE.isSubmissionFile);
  check('a corrupt entry is skipped, not fatal',
    r.skipped.length === 1 && r.files.length === 2,
    `${r.files.length} read, ${r.skipped.length} skipped`);
  check('the two intact submissions still parse in full',
    CORE.buildTable(r.files).rows.length === 4,
    `${CORE.buildTable(r.files).rows.length} rows`);
  check('and the lost one is named, so the teacher knows who to re-collect',
    r.skipped.length === 1 && r.skipped[0].name === victim.name,
    r.skipped.map(s => CORE.baseName(s.name)).join(', ') || 'nothing reported');

  console.log('\n  Parity with the command line\n');

  // ── The whole point: same input, same table, either door ───────────────────
  const viaFolder = CORE.buildTable(STUDENTS.map(([name, text]) => ({ name, text })));
  const viaZip = CORE.buildTable((await readZip(deflated)).files);
  const csvFolder = CORE.toCsv(CORE.ROW_HEADERS, viaFolder.rows);
  const csvZip = CORE.toCsv(CORE.ROW_HEADERS, viaZip.rows);
  check('a dropped zip and the CLI produce byte-identical responses.csv',
    csvFolder === csvZip, `${csvZip.length} bytes each`);
  check('and byte-identical exceptions.csv',
    CORE.toCsv(CORE.EXCEPTION_HEADERS, viaFolder.exceptions)
    === CORE.toCsv(CORE.EXCEPTION_HEADERS, viaZip.exceptions));

  cleanup();
  const failed = results.filter(x => !x).length;
  console.log(`\n  ${results.length - failed}/${results.length} passed\n`);
  process.exit(failed ? 1 : 0);
})().catch(e => { cleanup(); console.error(e); process.exit(1); });
