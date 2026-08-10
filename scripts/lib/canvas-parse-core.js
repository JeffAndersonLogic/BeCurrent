/**
 * canvas-parse-core.js
 *
 * The Canvas submission parser, with the filesystem taken out of it.
 *
 * WHY THIS FILE EXISTS
 *
 * There are now two places that turn a Canvas download into rows: the CLI in
 * scripts/parse-canvas-submissions.js, and the Skills Lens, which reads a
 * dropped zip in the browser so a teacher never has to open a Terminal. Those
 * two must agree exactly. If they drift, the same submission yields two
 * different answers depending on which door the teacher walked through, and the
 * one that disagrees is not going to announce itself: a hash rule that moved in
 * one copy shows up as a handful of EDITED flags nobody can account for.
 *
 * The Lens already carries one hand-copied function with a comment admitting the
 * hazard: "Copied rather than imported because this file has no dependencies by
 * design; if the parser's version changes, this one has to change with it." That
 * is a promise to remember something, which is the kind of promise this
 * repository has now watched fail three separate times, most recently when the
 * First & 10 capture block went missing on 19 of 77 topics.
 *
 * So: one implementation, no copies. Node requires this file. The Lens gets the
 * identical bytes inlined by scripts/build-skills-lens.js, and validate.js fails
 * the build if the inlined copy drifts from this source.
 *
 * Everything here is pure. No fs, no path, no network, no DOM. It takes text and
 * returns data, which is what makes it runnable on both sides.
 */

'use strict';

(function (root, factory) {
  const API = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.BECURRENT_CANVAS_PARSE = API;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {

// ── Record format, must stay in lockstep with the two renderers ───────────────
//
// assets/js/becurrent-week-renderer-v1.js emits this. Change one, change both,
// and bump SCHEMA_SUPPORTED.
//
// The machine grammar (`#BHV|`, `#BHR|`) is deliberately identical to
// BeHistorical's. It is a wire format no student reads, and keeping it the same
// means one parser serves both classes: the teacher drops either course's
// submissions.zip on the same tool and gets the same answer to "did this student
// edit their work". Forking a 574-line parser to rename two tokens would buy
// nothing and risk the two copies drifting into two different answers.
//
// The human-readable sentinel is NOT shared, because that line is visible in the
// student's Canvas paste and "BEHISTORICAL RECORD" in a Current Events
// submission reads as a bug. RE_SENTINEL accepts either course's wording so the
// one parser still handles both.

const SCHEMA_SUPPORTED = [1];
const RE_HEADER = /#BHV\|([^#]*?)\|#/g;
const RE_RECORD = /#BHR\|([^#]*?)\|#/g;
const RE_SENTINEL = /---\s*(?:BECURRENT|BEHISTORICAL) RECORD/;

// FNV-1a 32-bit. Identical to bhHash() in both renderers.
function bhHash(value) {
  const s = normalizeForHash(value);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return ('0000000' + h.toString(16)).slice(-8);
}

// Canvas rewrites line breaks on the way in and again on the way out, so the
// hash is over collapsed whitespace. The question is "is this the same
// writing", not "are the newlines byte-identical". The cost of that choice is
// that paragraph structure is invisible to the hash; scripts/test/canvas-
// paragraphs.test.js covers what the hash cannot.
function normalizeForHash(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

function wordCount(value) {
  const s = normalizeForHash(value);
  return s ? s.split(' ').length : 0;
}

function parseFields(blob) {
  const out = {};
  String(blob).split('|').forEach(pair => {
    const eq = pair.indexOf('=');
    if (eq < 1) return;
    out[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
  });
  return out;
}

// ── HTML to text ──────────────────────────────────────────────────────────────
//
// Deliberately not a DOM parser. The input is one known generator's output
// rewritten by one known editor, and a dependency-free script is one the
// teacher can still run in three years without an npm install.
//
// It stays a regex parser in the browser too, even though a DOM is right there.
// Feeding downloaded student HTML to innerHTML or DOMParser inside the Lens
// would mean the page interprets markup a student could have pasted, and the
// Lens is the one surface holding an entire class's writing at once.

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’',
  hellip: '…', mdash: '—', ndash: '–'
};

function decodeEntities(text) {
  return String(text)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => safeCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, name) => {
      const key = name.toLowerCase();
      return Object.prototype.hasOwnProperty.call(ENTITIES, key) ? ENTITIES[key] : m;
    });
}

function safeCodePoint(n) {
  if (!Number.isFinite(n) || n < 0 || n > 0x10ffff) return '';
  try { return String.fromCodePoint(n); } catch (e) { return ''; }
}

function htmlToText(html) {
  return decodeEntities(
    String(html)
      .replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
      .replace(/<\s*br\s*\/?\s*>/gi, '\n')
      .replace(/<\s*\/\s*(p|div|li|h[1-6]|tr|hr)\s*>/gi, '\n')
      .replace(/<\s*(hr|p|div|li|h[1-6]|tr)[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// One entry point for "this file came out of Canvas, give me its text", so the
// CLI and the Lens cannot disagree about when to run htmlToText.
//
// The extension decides when there is one to go on. When there is not, the
// content does: a submission that carries no markup at all must not be put
// through htmlToText, which would collapse its blank lines into single newlines
// and lose the paragraph structure the parser is trying to preserve.
function submissionText(filename, raw) {
  const s = String(raw == null ? '' : raw);
  if (/\.txt$/i.test(filename)) return s.replace(/\r\n?/g, '\n');
  if (!/\.html?$/i.test(filename) && !/<[a-z!\/][^>]*>/i.test(s)) return s.replace(/\r\n?/g, '\n');
  return htmlToText(s);
}

// ── Filenames ─────────────────────────────────────────────────────────────────

// Canvas's own convention. The trailing ids are what matter; the leading name is
// squashed ("andersonjeff") and only good enough to show a human.
//
// Canvas does not always write both ids. The documented shape is
// `name_userid_submissionid_text.html`, but the 2026-08-07 test-student download
// came back as `studenttest_LATE_310529_text.html`, with one id and not two. The
// original pattern required two, so it matched nothing, and the whole basename
// became the display name: "studenttest_LATE_310529_text". Rows still parsed, but
// the Skills Lens joins a roster on the squashed display name, and no roster
// entry will ever squash to that. The teacher would have uploaded a roster and
// watched every student stay unmapped.
//
// So: take however many trailing ids there are. With two, follow the documented
// order. With one, keep it as the submission id rather than guessing it is a user
// id, because canvas_user_id is what the roster joins on first and a wrong join
// key is worse than an absent one. The cleaned name carries the match either way.
//
// basename is done here rather than with path.basename, because a zip entry
// arrives as "submissions/andersonjeff_1_2_text.html" and this has to run in a
// browser where there is no path module.
function baseName(filename) {
  return String(filename).replace(/\\/g, '/').split('/').pop();
}

function parseSubmissionFilename(filename) {
  const base = baseName(filename).replace(/\.(html?|txt)$/i, '');
  const m = base.match(/^(.+?)_(?:(late|LATE)_)?(\d+)(?:_(\d+))?(?:_(.*))?$/);
  if (!m) return { displayName: base, canvasUserId: '', submissionId: '', late: false, assignment: '' };
  const two = m[4] !== undefined;
  return {
    displayName: m[1],
    late: Boolean(m[2]),
    canvasUserId: two ? m[3] : '',
    submissionId: two ? m[4] : m[3],
    assignment: m[5] || ''
  };
}

// "Anderson, Jeff" and "Jeff Anderson" both squash to "andersonjeff", which is
// the shape Canvas writes into the filename.
function squashName(name) {
  const parts = String(name).toLowerCase().replace(/[^a-z, ]/g, '').split(',');
  const ordered = parts.length > 1 ? [parts[0], parts.slice(1).join(' ')] : [parts[0]];
  return ordered.join('').replace(/\s+/g, '');
}

// ── Body parsing ──────────────────────────────────────────────────────────────
//
// The manifest tells us which labels to expect and in what order, so the body is
// split on those labels rather than on a guessed heading pattern. Each search
// starts after the previous match, so a student who quotes a later module's
// heading inside their own answer cannot fool the split.

function findLabelIndex(text, label, from) {
  if (!label) return -1;
  const hay = text.toLowerCase();
  const needle = label.toLowerCase();
  const direct = hay.indexOf(needle, from);
  if (direct !== -1) return direct;
  // Fall back to a whitespace-insensitive search: the paste may have been
  // rewrapped between the label's words.
  const loose = new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'), 'i');
  const tail = text.slice(from);
  const hit = tail.match(loose);
  return hit ? from + hit.index : -1;
}

function extractResponse(section) {
  // Everything after the first "My response:" marker. Without the marker the
  // whole section minus its "Question:" line is the best available guess.
  const marker = section.match(/my response\s*:/i);
  let body = marker ? section.slice(marker.index + marker[0].length) : section;
  if (!marker) body = body.replace(/^\s*question\s*:[^\n]*\n?/i, '');
  return body.replace(/^\s*\n/, '').trim();
}

function extractPrompt(section) {
  const m = section.match(/question\s*:\s*([\s\S]*?)(?=\n\s*my response\s*:|$)/i);
  return m ? m[1].trim() : '';
}

// ── One submission ────────────────────────────────────────────────────────────

function parseSubmission(text, source) {
  const headers = [];
  let m;
  RE_HEADER.lastIndex = 0;
  while ((m = RE_HEADER.exec(text)) !== null) headers.push(parseFields(m[1]));

  const records = [];
  RE_RECORD.lastIndex = 0;
  while ((m = RE_RECORD.exec(text)) !== null) records.push(parseFields(m[1]));

  if (!headers.length) return parseWithoutManifest(text, source);

  // A student who pasted twice produces two manifests. Keep the last, which is
  // the one Canvas shows at the bottom, and flag it.
  const header = headers[headers.length - 1];
  const duplicated = headers.length > 1;

  const version = Number(header.v || 0);
  const sentinel = text.match(RE_SENTINEL);
  const bodyEnd = sentinel ? sentinel.index : -1;
  const body = bodyEnd === -1 ? text : text.slice(0, bodyEnd);

  const responses = [];
  const exceptions = [];

  if (duplicated) {
    exceptions.push({ slot: '', reason: 'DUPLICATE_PASTE',
      detail: `${headers.length} manifests in one submission, read the last` });
  }
  if (!SCHEMA_SUPPORTED.includes(version)) {
    exceptions.push({ slot: '', reason: 'SCHEMA_UNKNOWN',
      detail: `manifest v${header.v || '?'}, this parser knows v${SCHEMA_SUPPORTED.join('/')}` });
  }

  const declared = Number(header.items || 0);
  const expected = Number(header.expected || 0);
  if (records.length !== declared) {
    exceptions.push({ slot: '', reason: 'COUNT_MISMATCH',
      detail: `manifest declares ${declared} records, ${records.length} arrived, paste is truncated` });
  }

  let cursor = 0;
  records.forEach((rec, i) => {
    const label = rec.lab || '';
    const start = findLabelIndex(body, label, cursor);
    if (start === -1) {
      exceptions.push({ slot: rec.slot || `#${i}`, reason: 'MISSING_BODY',
        detail: `manifest lists "${label}" but no such section is in the paste` });
      return;
    }
    const nextLabel = records[i + 1] ? records[i + 1].lab : '';
    let end = nextLabel ? findLabelIndex(body, nextLabel, start + label.length) : -1;
    if (end === -1) end = body.length;
    cursor = start + label.length;

    const section = body.slice(start + label.length, end);
    const response = extractResponse(section);
    const flags = [];

    if (bhHash(response) !== rec.rh) {
      flags.push('EDITED');
      exceptions.push({ slot: rec.slot, reason: 'EDITED',
        detail: `response hash ${bhHash(response)} does not match recorded ${rec.rh}` });
    }
    if (!response) {
      flags.push('BLANK');
      exceptions.push({ slot: rec.slot, reason: 'BLANK',
        detail: 'record present, response text empty' });
    }

    responses.push({
      moduleOrd: rec.i || 'xx',
      slotId: rec.slot || '',
      label: label,
      prompt: extractPrompt(section),
      promptHash: rec.ph || '',
      response: response,
      wordCount: wordCount(response),
      charCount: normalizeForHash(response).length,
      declaredWords: Number(rec.w || 0),
      // '' when the student skipped it. Anything outside 1 to 5 is dropped
      // rather than trusted, so a hand-edited paste cannot poison an average.
      confidence: /^[1-5]$/.test(String(rec.cf || '')) ? String(rec.cf) : '',
      flags: flags
    });
  });

  // The sum covers slot:hash pairs, so a deleted record line breaks it even
  // when every surviving response still hashes clean.
  const recomputed = bhHash(records.map(r => (r.slot || '') + ':' + (r.rh || '')).join('|'));
  if (header.sum && recomputed !== header.sum) {
    exceptions.push({ slot: '', reason: 'MANIFEST_ALTERED',
      detail: `checksum ${recomputed} does not match recorded ${header.sum}` });
  }

  // The headline check. Expected comes from the lesson, not from the paste, so
  // a student who gathered nothing still has a denominator.
  if (expected && responses.length < expected) {
    const got = new Set(responses.map(r => r.slotId));
    exceptions.push({ slot: '', reason: 'INCOMPLETE',
      detail: `${responses.length} of ${expected} capture slots present`
        + (got.size ? '' : ', paste contains no responses at all') });
  }

  return {
    topicId: header.topic || '',
    copiedAt: header.copied || '',
    declaredItems: declared,
    expectedItems: expected,
    hasManifest: true,
    responses: responses,
    exceptions: exceptions,
    source: source
  };
}

// A paste with no manifest footer. BeCurrent has always shipped the footer, so
// this is the hand-retyped or partially-copied paste rather than a legacy one.
// It is parsed rather than rejected so the writing is not stranded, and always
// flagged: without a manifest there is no denominator, so "complete" is not a
// claim this can make.
function parseWithoutManifest(text, source) {
  const head = text.match(/CURRENT EVENTS,?\s*(?:WEEK\s+)?(\d{1,2})/i);
  const responses = [];
  const re = /^(module\s+\d+[^\n]*)$/gim;
  const hits = [];
  let m;
  while ((m = re.exec(text)) !== null) hits.push({ label: m[1].trim(), index: m.index, length: m[0].length });

  hits.forEach((hit, i) => {
    const end = hits[i + 1] ? hits[i + 1].index : text.length;
    const section = text.slice(hit.index + hit.length, end);
    const response = extractResponse(section);
    if (!response) return;
    const ord = hit.label.match(/module\s+(\d+)/i);
    responses.push({
      moduleOrd: ord ? ord[1] : 'xx',
      slotId: '',
      label: hit.label,
      prompt: extractPrompt(section),
      promptHash: '',
      response: response,
      wordCount: wordCount(response),
      charCount: normalizeForHash(response).length,
      declaredWords: 0,
      confidence: '',
      flags: ['NO_MANIFEST']
    });
  });

  return {
    topicId: head ? head[1] : '',
    copiedAt: '',
    declaredItems: 0,
    expectedItems: 0,
    hasManifest: false,
    responses: responses,
    exceptions: [{ slot: '', reason: 'NO_MANIFEST',
      detail: 'no record footer, parsed on the legacy grammar, completeness unknown' }],
    source: source
  };
}

// ── The whole download ────────────────────────────────────────────────────────
//
// This is the loop that used to live in the CLI's main(). It is here so the
// browser runs the same one, right down to the order of the columns, because
// responses.csv is a contract between the two of them.

const ROW_HEADERS = [
  'student_display', 'canvas_user_id', 'canvas_submission_id', 'class_period', 'late',
  'topic_id', 'module_ord', 'slot_id', 'module_label', 'prompt', 'prompt_hash',
  'response', 'word_count', 'char_count', 'confidence', 'copied_at', 'flags', 'source_file'
];

const EXCEPTION_HEADERS = [
  'student_display', 'canvas_user_id', 'class_period', 'topic_id',
  'slot_id', 'reason', 'detail', 'source_file'
];

// Canvas puts nothing else in the zip, but a teacher who unzips, opens a file,
// and re-zips picks up macOS resource forks and a __MACOSX folder. Those are not
// submissions and must not become a student named "._andersonjeff".
function isSubmissionFile(name) {
  const base = baseName(name);
  if (!/\.(html?|txt)$/i.test(base)) return false;
  if (base.startsWith('.')) return false;
  if (/(^|\/)__MACOSX\//.test(String(name))) return false;
  return true;
}

// The filename is a convention. The manifest is a fact.
//
// isSubmissionFile above is a fast path over names, and it is the right first
// question when reading a folder. It is the wrong *only* question: a real Canvas
// download was rejected as holding no submissions when its single entry parsed
// perfectly once extracted by hand, because the name did not match what the
// convention said it would be. A gathered submission announces itself from the
// inside, so anything carrying the manifest header is a submission no matter
// what it is called.
//
// The legacy grammar is accepted too, for work gathered before the footer
// shipped. That path always flags NO_MANIFEST, so nothing here can make an
// unverifiable submission look clean.
function looksLikeSubmission(text) {
  const s = String(text == null ? '' : text);
  if (s.indexOf('#BHV|') !== -1) return true;
  if (RE_SENTINEL.test(s)) return true;
  return /CURRENT EVENTS,?\s*(?:WEEK\s+)?(\d{1,2})/i.test(s)
    && /my response\s*:/i.test(s);
}

// One question, asked the same way by the folder reader, the zip reader and the
// drop handler: is this thing a submission at all?
function acceptsAsSubmission(name, text) {
  return isSubmissionFile(name) || looksLikeSubmission(text);
}

/**
 * files: [{ name, text }] straight out of a folder read or a zip.
 * roster: optional { 'id:123': '3rd', 'name:andersonjeff': '3rd' }
 *
 * Returns the two tables plus the counts the summary needs. Never drops a row
 * without recording why: that is the rule the old Google Form pipeline broke.
 */
function buildTable(files, roster) {
  const look = roster || {};
  const rows = [];
  const exceptionRows = [];
  const seenStudents = new Set();
  const perFile = [];
  let cleanCount = 0;

  // Sorted here, not by the caller. A directory read hands over an arbitrary
  // order and a zip hands over the order entries were written, so without this
  // the CLI and the Lens produce the same rows in different sequences and their
  // CSVs differ byte for byte on identical input. That is not cosmetic: the
  // parity test in scripts/test/canvas-zip.test.js is the only thing standing
  // between these two code paths and a slow drift apart, and a comparison that
  // has to sort first is a comparison that can be fooled by a real reordering.
  const ordered = files
    .filter(f => acceptsAsSubmission(f.name, f.text))
    .slice()
    .sort((a, b) => baseName(a.name).localeCompare(baseName(b.name), 'en'));

  ordered.forEach(file => {
    const name = baseName(file.name);
    const text = submissionText(name, file.text);
    const who = parseSubmissionFilename(name);
    const parsed = parseSubmission(text, name);

    seenStudents.add(who.canvasUserId || who.displayName);
    const period = look['id:' + who.canvasUserId] || look['name:' + squashName(who.displayName)] || '';

    parsed.responses.forEach(r => {
      rows.push({
        student_display: who.displayName,
        canvas_user_id: who.canvasUserId,
        canvas_submission_id: who.submissionId,
        class_period: period,
        late: who.late ? 'yes' : '',
        topic_id: parsed.topicId,
        module_ord: r.moduleOrd,
        slot_id: r.slotId,
        module_label: r.label,
        prompt: r.prompt,
        prompt_hash: r.promptHash,
        response: r.response,
        word_count: r.wordCount,
        char_count: r.charCount,
        confidence: r.confidence,
        copied_at: parsed.copiedAt,
        flags: r.flags.join(';'),
        source_file: name
      });
    });

    parsed.exceptions.forEach(x => {
      exceptionRows.push({
        student_display: who.displayName,
        canvas_user_id: who.canvasUserId,
        class_period: period,
        topic_id: parsed.topicId,
        slot_id: x.slot,
        reason: x.reason,
        detail: x.detail,
        source_file: name
      });
    });

    if (!parsed.exceptions.length) cleanCount++;
    perFile.push({
      name: name,
      display: who.displayName,
      got: parsed.responses.length,
      expected: parsed.expectedItems,
      reasons: parsed.exceptions.map(x => x.reason)
    });
  });

  const byReason = {};
  exceptionRows.forEach(x => { byReason[x.reason] = (byReason[x.reason] || 0) + 1; });
  const rated = rows.filter(r => r.confidence);

  return {
    rows: rows,
    exceptions: exceptionRows,
    perFile: perFile,
    stats: {
      files: perFile.length,
      students: seenStudents.size,
      responses: rows.length,
      rated: rated.length,
      meanConfidence: rated.length
        ? rated.reduce((a, r) => a + Number(r.confidence), 0) / rated.length : null,
      clean: cleanCount,
      exceptions: exceptionRows.length,
      byReason: byReason
    }
  };
}

// ── CSV out ───────────────────────────────────────────────────────────────────

function csvCell(value) {
  const s = String(value == null ? '' : value);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function toCsv(headers, rows) {
  return [headers.join(',')]
    .concat(rows.map(r => headers.map(h => csvCell(r[h])).join(',')))
    .join('\n') + '\n';
}

return {
  SCHEMA_SUPPORTED, ROW_HEADERS, EXCEPTION_HEADERS,
  bhHash, normalizeForHash, wordCount, parseFields,
  decodeEntities, htmlToText, submissionText,
  baseName, parseSubmissionFilename, squashName,
  isSubmissionFile, looksLikeSubmission, acceptsAsSubmission,
  findLabelIndex, extractResponse, extractPrompt,
  parseSubmission, parseWithoutManifest,
  buildTable, csvCell, toCsv
};

});
