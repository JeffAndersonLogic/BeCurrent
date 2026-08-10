#!/usr/bin/env node
/**
 * parse-canvas-submissions.js
 *
 * Turns a Canvas "Download Submissions" folder into the long-format table the
 * Skills Lens wants: one row per student per module response.
 *
 * The input is whatever Canvas hands you. On a Text Entry assignment, Download
 * Submissions produces one HTML file per student, named
 *
 *     lastnamefirstname_<userid>_<submissionid>_<assignment>.html
 *     lastnamefirstname_LATE_<userid>_<submissionid>_<assignment>.html
 *
 * The student's identity is in that filename and nowhere else. The paste itself
 * deliberately carries no name, so a mispaste into the wrong assignment is a
 * misfiled response rather than a disclosure.
 *
 * WHAT MAKES THIS DIFFERENT FROM A REGEX OVER THE PASTE
 *
 * The old Google Form pipeline lost rows without saying so, and the failure
 * looked like low student completion. This script refuses to do that. Every
 * response the manifest declares is either parsed into responses.csv or written
 * to exceptions.csv with a reason. Nothing is dropped silently, and no filter
 * anywhere in this file may reduce the row count without recording why.
 *
 * The four things it catches that eyeballing 150 pastes does not:
 *
 *   INCOMPLETE    the manifest declares 9 capture slots and the student
 *                 gathered 4. This is the "empty but valid" submission: a
 *                 wiped localStorage produces a perfectly formatted paste with
 *                 nothing in it, and Canvas records it as submitted.
 *   EDITED        the response text no longer hashes to what the Gather panel
 *                 recorded, so it was changed after gathering.
 *   COUNT_MISMATCH  the manifest says N records and N-1 arrived, so the paste
 *                 was truncated.
 *   NO_MANIFEST   an older submission, gathered before the footer shipped.
 *                 Parsed on a best-effort basis and flagged, never counted as
 *                 clean.
 *
 * CONFIDENCE
 *
 * A 1-to-5 self-rating the student may leave blank. A blank is a real answer and
 * is reported as such, never imputed. The old Teacher Hub averaged a column that
 * had no source anywhere in the pipeline, so it rendered empty forever; the
 * record manifest's `cf` field is that column's first actual source.
 *
 * Usage:
 *   node scripts/parse-canvas-submissions.js <submissions-dir> [options]
 *
 *   --out <dir>        where to write (default: alongside the input)
 *   --roster <csv>     optional roster to attach class period. Needs a header
 *                      with a name or SIS/Canvas id column plus a period column.
 *   --json             also write responses.json for the Skills Lens
 *   --quiet            summary only
 *
 * This script reads local files and writes local files. It makes no network
 * calls, and it must stay that way: the folder it reads is identifiable student
 * work, and the moment this thing can reach the internet it becomes a data flow
 * somebody has to govern.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── The parser itself ─────────────────────────────────────────────────────────
//
// Lives in scripts/lib/canvas-parse-core.js, because the Skills Lens now reads a
// dropped Canvas zip in the browser and has to reach the identical answer. Two
// copies of a hash rule is two answers to "did this student edit their work"
// depending on which door the teacher walked through. This file keeps the parts
// that genuinely need a filesystem: argv, the roster, and writing the CSVs.

const CORE = require('./lib/canvas-parse-core');
const {
  bhHash, normalizeForHash, htmlToText, submissionText,
  parseSubmission, parseSubmissionFilename, squashName, isSubmissionFile,
  buildTable, csvCell, toCsv, ROW_HEADERS, EXCEPTION_HEADERS
} = CORE;

// ── Roster ────────────────────────────────────────────────────────────────────

function csvSplitLine(line) {
  const out = [];
  let cur = '', quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out.map(s => s.trim());
}

// Keyed on whatever the roster offers. A Canvas or SIS id joins exactly; a name
// only joins after squashing to the same shape Canvas puts in the filename.
function loadRoster(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return {};
  const head = csvSplitLine(lines[0]).map(h => h.toLowerCase());
  const idCol = head.findIndex(h => /canvas.*id|user.*id|sis.*id|^id$/.test(h));
  const nameCol = head.findIndex(h => /name|student/.test(h));
  const periodCol = head.findIndex(h => /period|section|class/.test(h));
  if (periodCol === -1) {
    console.warn(`  roster ${path.basename(file)} has no period/section column, skipping`);
    return {};
  }
  const map = {};
  lines.slice(1).forEach(line => {
    const cells = csvSplitLine(line);
    const period = cells[periodCol] || '';
    if (!period) return;
    if (idCol !== -1 && cells[idCol]) map['id:' + cells[idCol]] = period;
    if (nameCol !== -1 && cells[nameCol]) map['name:' + squashName(cells[nameCol])] = period;
  });
  return map;
}


// ── CSV out ───────────────────────────────────────────────────────────────────

// The submissions folder is normally in Downloads, not in the repo, so a
// relative path is a wall of "../". Print whichever form is shorter.
function shortPath(file) {
  const rel = path.relative(process.cwd(), file);
  return rel.startsWith('..') ? file : rel;
}

function writeCsv(file, headers, rows) {
  fs.writeFileSync(file, toCsv(headers, rows), 'utf8');
}

// ── Main ──────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = { dir: '', out: '', roster: '', json: false, quiet: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') opts.out = argv[++i];
    else if (a === '--roster') opts.roster = argv[++i];
    else if (a === '--json') opts.json = true;
    else if (a === '--quiet') opts.quiet = true;
    else if (a.startsWith('--')) throw new Error(`unknown option ${a}`);
    else if (!opts.dir) opts.dir = a;
  }
  return opts;
}

function main() {
  let opts;
  try { opts = parseArgs(process.argv.slice(2)); }
  catch (e) { console.error(e.message); process.exit(2); }

  if (!opts.dir) {
    console.error('Usage: node scripts/parse-canvas-submissions.js <submissions-dir> [--out dir] [--roster file.csv] [--json] [--quiet]');
    process.exit(2);
  }
  if (!fs.existsSync(opts.dir) || !fs.statSync(opts.dir).isDirectory()) {
    console.error(`Not a directory: ${opts.dir}`);
    console.error('Unzip the Canvas "Download Submissions" archive first and point at the folder.');
    process.exit(2);
  }

  const outDir = opts.out || opts.dir;
  fs.mkdirSync(outDir, { recursive: true });

  // Read by name first, then ask the contents of anything left over. Canvas does
  // not always name a text-entry submission the way its own convention says it
  // will, and a folder reader that trusts the name reports an empty download
  // while a perfectly good submission sits in it. buildTable applies the same
  // two-part test, so this only decides which files are worth opening.
  const entries = fs.readdirSync(opts.dir, { withFileTypes: true })
    .filter(e => e.isFile() && !e.name.startsWith('.'))
    .map(e => e.name).sort();

  const byName = entries.filter(isSubmissionFile);
  const read = name => ({ name, text: fs.readFileSync(path.join(opts.dir, name), 'utf8') });
  let files = byName.map(read);

  if (!files.length) {
    files = entries
      .filter(n => !/\.(csv|json|zip|pdf|docx?|pptx?|xlsx?|png|jpe?g|gif|svg)$/i.test(n))
      .map(read)
      .filter(f => CORE.looksLikeSubmission(f.text));
    if (files.length) {
      console.log(`  ${files.length} file(s) matched by their record footer rather than by filename.`);
    }
  }

  if (!files.length) {
    console.error(`No BeHistorical submissions in ${opts.dir}`);
    console.error(`  ${entries.length} file(s) there: ${entries.slice(0, 8).join(', ')}${entries.length > 8 ? ', ...' : ''}`);
    console.error('  None carried a record footer. This pipeline needs a Text Entry assignment.');
    process.exit(1);
  }

  const roster = opts.roster ? loadRoster(opts.roster) : {};

  const { rows, exceptions: exceptionRows, perFile, stats } = buildTable(files, roster);

  if (!opts.quiet) {
    perFile.forEach(f => {
      const status = f.reasons.length ? f.reasons.join(',') : 'ok';
      console.log(`  ${f.display.padEnd(24)} ${String(f.got).padStart(2)}/${f.expected || '?'}  ${status}`);
    });
  }

  const responsesFile = path.join(outDir, 'responses.csv');
  const exceptionsFile = path.join(outDir, 'exceptions.csv');

  writeCsv(responsesFile, ROW_HEADERS, rows);
  writeCsv(exceptionsFile, EXCEPTION_HEADERS, exceptionRows);

  if (opts.json) {
    fs.writeFileSync(path.join(outDir, 'responses.json'),
      JSON.stringify({ responses: rows, exceptions: exceptionRows }, null, 2), 'utf8');
  }

  // Never print a bare n. The whole point of the manifest is that the
  // denominator is knowable, so the summary always shows both numbers.
  console.log('');
  console.log(`  Submissions read     ${stats.files}`);
  console.log(`  Students             ${stats.students}`);
  console.log(`  Responses parsed     ${stats.responses}`);
  console.log(`  Confidence rated     ${stats.rated} of ${stats.responses}`
    + (stats.meanConfidence === null ? '' : `, mean ${stats.meanConfidence.toFixed(2)} of 5`));
  console.log(`  Clean submissions    ${stats.clean} of ${stats.files}`);
  if (stats.exceptions) {
    console.log(`  Exceptions           ${stats.exceptions}`);
    Object.keys(stats.byReason).sort().forEach(k => {
      console.log(`    ${k.padEnd(18)} ${stats.byReason[k]}`);
    });
  }
  console.log('');
  console.log(`  Wrote ${shortPath(responsesFile)}`);
  console.log(`  Wrote ${shortPath(exceptionsFile)}`);
  if (stats.exceptions) {
    console.log('');
    console.log('  Read exceptions.csv before running any analysis. An INCOMPLETE or');
    console.log('  BLANK row is a student whose work did not survive the gather, not a');
    console.log('  student who wrote nothing.');
  }
  console.log('');
  console.log('  You can skip this step next time: teacher/skills-lens.html reads the');
  console.log('  Canvas zip directly, no Terminal required.');
}

if (require.main === module) main();

// The re-exports keep verify-canvas-check.js and the tests working against the
// same names they always used, now sourced from the core.
module.exports = {
  bhHash, normalizeForHash, htmlToText, submissionText, parseSubmission,
  parseSubmissionFilename, squashName, buildTable, toCsv,
  ROW_HEADERS, EXCEPTION_HEADERS, loadRoster
};
