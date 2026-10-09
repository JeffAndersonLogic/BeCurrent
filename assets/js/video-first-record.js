// GENERATED from scripts/lib/canvas-record-block.js via scripts/build-video-first.js. Do not hand-edit.
// ── The Canvas record grammar ─────────────────────────────────────────────────
//
// GENERATED from scripts/lib/canvas-record-block.js. Never hand-edit this block:
// the week renderer and all of the generated briefs carry the same copy, and
// scripts/validate.js fails the build when one of them drifts.
//
// The paste is the only evidence that reaches the teacher, and without this
// footer a truncated, half-empty or hand-edited one is indistinguishable from a
// good one. A blank paste that still carries every heading reads as "student
// wrote nothing" when the real cause is a wiped localStorage.
//
// Format is deliberately dumb. Canvas's editor rewrites HTML, so nothing may
// depend on a tag, an attribute or a class surviving. Every record is one
// self-delimiting line that a regex recovers from the submission's text content
// even if every newline collapses.
//
// The `#BHV|` and `#BHR|` tokens are shared with BeHistorical on purpose so one
// parser serves both courses. The sentinel is not, because that line is visible
// in the student's paste. See the header of scripts/lib/canvas-parse-core.js.
var BC_RECORD_VERSION = 1;
var BC_RECORD_OPEN = "--- BECURRENT RECORD, do not edit ---";
var BC_RECORD_CLOSE = "--- END BECURRENT RECORD ---";

function bcEsc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Canvas rewrites line breaks on the way in and again on the way out, so a hash
// over raw text would not survive its own round trip. Whitespace is collapsed
// before hashing: the check is "is this the same writing", not "are the newlines
// byte-identical".
function bcNormalizeForHash(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

// FNV-1a, 32-bit. Small, dependency-free, and identical to bhHash() in the Node
// parser. This detects accident and drift; it is not a tamper-proof signature,
// and nothing downstream should treat it as one.
function bcHash(value) {
  var s = bcNormalizeForHash(value);
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return ('0000000' + h.toString(16)).slice(-8);
}

function bcWordCount(value) {
  var s = bcNormalizeForHash(value);
  return s ? s.split(' ').length : 0;
}

// `|` and newlines are the record format's only reserved characters.
function bcField(value) {
  return String(value == null ? '' : value).replace(/[|\r\n]+/g, ' ').trim();
}

// Each paragraph its own <p>. The parser reads text content, so Canvas dropping
// the styling is fine, but it must not flatten a student's blank line: a blank
// line between paragraphs has to survive as two paragraphs, which is why the
// response is emitted as sibling <p> elements rather than with <br>.
//
// `wrap` is the inline tag the response is set in, or '' for none. The Brief
// sets responses in italics so the teacher can tell the student's writing from
// the prompt above it at a glance; the week page passes '' and stays plain.
//
// A blank answer emits NOTHING, and that is not laziness. Everything between the
// "My response:" marker and the next label is what the parser hashes back against
// the footer's `rh`, so a friendly "No response recorded." placeholder sitting
// there hashes as writing: the parser reports the answer as EDITED, which is an
// accusation, and never reports it as BLANK, which is the truth. The student is
// told about blanks by the gather status line, and the teacher by `w=0` in the
// footer, both of which are outside the hashed region.
function bcParagraphsHtml(text, wrap) {
  var open = wrap ? '<' + wrap + '>' : '';
  var close = wrap ? '</' + wrap + '>' : '';
  var parts = String(text || '').split(/\n{2,}/).map(function (p) { return p.trim(); })
    .filter(Boolean);
  return parts.map(function (p) {
    return '<p>' + open + bcEsc(p).replace(/\n/g, '<br>') + close + '</p>';
  }).join('');
}

/**
 * One header line, then one line per gathered response, between the sentinels.
 *
 * @param {Array}  work  [{ ord, id, label, prompt, text, confidence }]
 * @param {Object} opts  { topic, expected, isoStamp }
 *
 * `opts.expected` is how many slots the surface DEFINES, and it must always be
 * computed by the caller. A literal reports a week whose brief is not published
 * yet as three answers short, and a wrong denominator is worse than none.
 */
function bcRecordManifest(work, opts) {
  var o = opts || {};
  var rows = work.map(function (w) {
    return {
      ord: bcField(w.ord || 'xx'),
      slot: bcField(w.id),
      label: bcField(w.label),
      words: bcWordCount(w.text),
      chars: bcNormalizeForHash(w.text).length,
      promptHash: bcHash(w.prompt),
      responseHash: bcHash(w.text),
      confidence: w.confidence || ''
    };
  });

  // Sum over the per-response hashes, so deleting a whole record line breaks it
  // too, not just editing the writing inside one.
  var sum = bcHash(rows.map(function (r) { return r.slot + ':' + r.responseHash; }).join('|'));

  var header = '#BHV|v=' + BC_RECORD_VERSION
    + '|topic=' + bcField(o.topic)
    + '|copied=' + o.isoStamp
    + '|items=' + rows.length
    + '|expected=' + Number(o.expected || 0)
    + '|sum=' + sum + '|#';

  var lines = rows.map(function (r) {
    return '#BHR|i=' + r.ord
      + '|slot=' + r.slot
      + '|lab=' + r.label
      + '|w=' + r.words
      + '|c=' + r.chars
      + '|ph=' + r.promptHash
      + '|rh=' + r.responseHash
      + '|cf=' + r.confidence + '|#';
  });

  return [BC_RECORD_OPEN, header].concat(lines).concat([BC_RECORD_CLOSE]);
}

// Each line its own <p>. Canvas may drop the styling and that is fine, nothing
// parses the presentation.
function bcRecordFooterHtml(lines) {
  return '<hr>' + lines.map(function (line) {
    return '<p style="font-family:monospace;font-size:.68rem;opacity:.6;margin:.15rem 0;">'
      + bcEsc(line) + '</p>';
  }).join('');
}
