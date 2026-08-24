'use strict';

/**
 * The canonical answer-capture block for every generated brief.
 *
 * This is the only path by which a student's three brief answers and their
 * confidence ratings reach Canvas. The brief is a standalone page inside an
 * iframe; nothing on the week page can see its textareas, so if this block is
 * absent or writes to the wrong key the answers are silently lost and every
 * structural check still passes. That exact failure cost BeHistorical 19 of its
 * 77 topics, twice, which is why validate.js checks four separate things here:
 *
 *   1. the block is present in every generated brief,
 *   2. it is byte-identical to what this file produces,
 *   3. the storage key is `becurrent-brief-<weekKey>`, and
 *   4. the renderer, the week data file and this block all agree on that key.
 *
 * Never hand-edit the block inside a generated brief. Change it here and rebuild.
 */

const STORAGE_PREFIX = 'becurrent-brief-';

const { recordBlockSource } = require('./canvas-record-block');

/**
 * The five confidence words, one per button.
 *
 * They live here because three surfaces render them — both brief renderers draw
 * the buttons and this block writes them into the Canvas paste — and a scale whose
 * button says "Getting it" while the submission says "3" is a scale the teacher
 * cannot read back. Derived from the anchor text the row used to carry to the
 * right of the buttons, "1 lost, 5 could teach it".
 */
const CONFIDENCE_WORDS = {
  1: 'Lost',
  2: 'Shaky',
  3: 'Getting it',
  4: 'Solid',
  5: 'Could teach it'
};

/**
 * The AI coach is OPTIONAL and is currently absent from every BeCurrent brief.
 *
 * BeCurrent will eventually use a custom MagicSchool chatbot per unit, and it will
 * be a different bot from the AP World one. Until that bot exists there is no URL
 * to point at, so the coach code, the buttons and the output box are all omitted
 * rather than shipped pointing at another course's room. Pass an `aiUrl` and the
 * whole thing comes back.
 *
 * @param {string}  weekKey  e.g. 'w01' or 'sm-b3'
 * @param {number}  count    how many questions the brief carries
 * @param {?string} aiUrl    the coach URL, or falsy for no coach at all
 */
// The coach half of the block, emitted only when a URL exists.
function coachBlock(aiUrl) {
  if (!aiUrl) {
    return `  // No AI coach on this brief. BeCurrent's custom chatbot does not exist
  // yet, and a button pointing at another course's room is worse than no button.
`;
  }
  return `  // ── AI coach prompt builder ────────────────────────────────────────────────
  //
  // Not a capture channel and never has been. It builds a prompt the student
  // pastes into the coach; nothing here reaches the teacher.
  var AI_URL = ${JSON.stringify(aiUrl)};

  window.buildAiPrompt = function () {
    var out = document.getElementById('ai-output');
    if (!out) return;
    var title = document.querySelector('.brief-title');
    var lines = [
      'I am a high school Current Events student working on this week\\'s brief:',
      title ? title.textContent.trim() : '',
      '',
      'Here is what I wrote, and where I am unsure. Ask me questions rather than',
      'giving me the answer, and push me to name my evidence.',
      ''
    ];
    IDS.forEach(function (id, i) {
      var prompt = document.getElementById('question-' + id);
      var area = document.getElementById('answer-' + id);
      var conf = (state[id] && state[id].confidence) || 'not rated';
      lines.push('Question ' + (i + 1) + ': ' + (prompt ? prompt.textContent.trim() : ''));
      lines.push('My answer: ' + ((area && area.value.trim()) || '(blank)'));
      lines.push('My confidence, 1 to 5: ' + conf);
      lines.push('');
    });
    out.value = lines.join('\\n');
  };

  window.copyAiPrompt = function () {
    var out = document.getElementById('ai-output');
    if (!out) return;
    if (!out.value) window.buildAiPrompt();
    out.select();
    try { navigator.clipboard.writeText(out.value); } catch (e) { document.execCommand('copy'); }
  };

  window.openAiCoach = function () { window.open(AI_URL, '_blank', 'noopener'); };
`;
}

/**
 * Gather All My Work, on the Brief itself.
 *
 * This is not a convenience. A unit block Brief is linked straight off the unit
 * page with no lesson shell around it, so before this existed those answers had
 * NO route to Canvas at all: the week renderer's Gather panel is on a page that a
 * unit block never opens. A week Brief has both routes, and its note says so.
 *
 * Three formatting rules, because the teacher reads these in Canvas and has to be
 * able to tell three things apart at a glance:
 *
 *   1. Each question gets a real heading, so the paste has structure Canvas keeps.
 *   2. The question text is bold, so it never reads as the student's own words.
 *   3. The response is italic, which is the one thing on the page that is theirs.
 *
 * The clipboard gets BOTH flavours. text/html is what carries the bolding into
 * Canvas; text/plain is the fallback for anywhere that refuses HTML, and it is
 * also what the record footer has to survive in. Selecting the rendered block
 * first means that even where the clipboard API is blocked outright — which it is
 * on some managed devices — a manual Ctrl-C copies the formatted version rather
 * than nothing.
 */
function gatherBlock() {
  const words = JSON.stringify(CONFIDENCE_WORDS);
  return `  // ── Gather All My Work ──────────────────────────────────────────────────────
  //
  // The topic key the footer declares, taken from the storage key rather than
  // duplicated, so the two can never disagree.
  var TOPIC = KEY.slice(${JSON.stringify(STORAGE_PREFIX)}.length);
  var CONFIDENCE_WORDS = ${words};

  // The record line's module ordinal. A Brief is Module 02 on a week page; on a
  // unit block page there is no module number at all, and 'xx' is what the parser
  // buckets rather than drops. Read off the badge instead of hard-coded, because
  // this one block serves both.
  function briefOrdinal() {
    var badge = document.querySelector('.module-badge');
    var m = String(badge ? badge.textContent : '').match(/Module\\s+(\\d+)/i);
    return m ? m[1] : 'xx';
  }

  function briefText(sel) {
    var el = document.querySelector(sel);
    return el ? String(el.textContent || '').trim() : '';
  }

  function confidencePhrase(value) {
    if (!value) return 'not rated';
    return value + ' of 5' + (CONFIDENCE_WORDS[value] ? ', ' + CONFIDENCE_WORDS[value] : '');
  }

  // The live textareas are authoritative, not the stored copy: the student is
  // looking at this page, and anything typed in the last moment before they press
  // the button has to be in the paste.
  function gatherRows() {
    return IDS.map(function (id, i) {
      var prompt = document.getElementById('question-' + id);
      var area = document.getElementById('answer-' + id);
      var entry = state[id] || {};
      return {
        n: i + 1,
        ord: briefOrdinal(),
        id: 'brief-' + id,
        // The label is also the heading printed over this question in the paste,
        // and it has to be, because the parser locates each response by finding the
        // footer's lab= field in the body. A heading that reads differently from
        // the label it declares gives MISSING_BODY on every record with the footer
        // still parsing perfectly, which is the shape of failure this whole footer
        // exists to make visible.
        label: 'The Brief, Question ' + (i + 1),
        prompt: prompt ? String(prompt.textContent || '').trim() : String(entry.question || ''),
        text: area ? String(area.value || '').trim() : String(entry.answer || ''),
        confidence: String(entry.confidence || '')
      };
    });
  }

  function buildBriefDocument() {
    var rows = gatherRows();
    var stamp = new Date();
    var title = briefText('.brief-title');
    var subtitle = briefText('.module-subtitle');
    var badge = briefText('.module-badge');

    // 'CURRENT EVENTS' is here for the parser's no-manifest fallback, which
    // identifies a paste whose footer was lost. It should never be needed. The
    // subtitle usually carries the course name already, so it is only prepended when
    // it is genuinely missing: printing it twice reads as a template bug to the one
    // audience that matters, which is a teacher reading thirty of these.
    var dateline = [subtitle, badge].filter(Boolean).join(' \\u00b7 ');
    if (!/current events/i.test(dateline)) {
      dateline = ['CURRENT EVENTS', dateline].filter(Boolean).join(' \\u00b7 ');
    }

    var head = '<p><strong>' + bcEsc(dateline) + '</strong></p>'
      + (title ? '<h2>' + bcEsc(title) + '</h2>' : '')
      + '<p><em>Student work, copied ' + bcEsc(stamp.toLocaleString()) + '</em></p>'
      + '<hr>';

    // Four lines per question, and the order is fixed by the parser rather than by
    // taste. The heading is the record label, because that is how each response is
    // found. The confidence sits ABOVE the 'My response:' marker: everything below
    // that marker is what gets hashed against the footer, so a confidence line
    // underneath would read as part of the student's writing and flag every answer
    // as edited. 'Question:' and 'My response:' are the markers extractPrompt and
    // extractResponse in scripts/lib/canvas-parse-core.js look for.
    var body = rows.map(function (r) {
      return '<h3>' + bcEsc(r.label) + '</h3>'
        + '<p>Confidence: ' + bcEsc(confidencePhrase(r.confidence)) + '</p>'
        + '<p><strong>Question: ' + bcEsc(r.prompt) + '</strong></p>'
        + '<p><strong>My response:</strong></p>'
        + bcParagraphsHtml(r.text, 'em');
    }).join('<hr>');

    // The denominator is how many questions this Brief carries, counted from the
    // page. Never a literal: a wrong denominator reports a complete submission as
    // incomplete, which is worse than no count at all.
    var manifest = bcRecordManifest(rows, {
      topic: TOPIC,
      expected: IDS.length,
      isoStamp: stamp.toISOString()
    });

    var plain = [dateline, title, 'Student work, copied ' + stamp.toLocaleString(), '']
      .filter(Boolean)
      .concat(rows.map(function (r) {
        // Same four lines in the same order, for the same reason. findLabelIndex is
        // case-insensitive, so the label may be shouted here.
        return [r.label.toUpperCase(),
          'Confidence: ' + confidencePhrase(r.confidence),
          'Question: ' + r.prompt,
          'My response:',
          r.text,
          ''].join('\\n');
      }))
      .concat(manifest)
      .join('\\n');

    return {
      html: head + body + bcRecordFooterHtml(manifest),
      plain: plain,
      count: rows.filter(function (r) { return r.text; }).length,
      total: rows.length
    };
  }

  function briefSay(message) {
    var status = document.getElementById('brief-gather-status');
    if (status) status.textContent = message;
  }

  window.gatherBriefWork = function () {
    var out = document.getElementById('brief-gather-output');
    if (!out) return null;
    var doc = buildBriefDocument();
    out.innerHTML = doc.html;
    out.dataset.plain = doc.plain;

    // A short gather is the failure this panel would otherwise hide: a wiped
    // localStorage produces a well-formed paste with nothing in it, and the
    // student has no way to tell. Say the number out loud before they submit.
    var short = doc.total - doc.count;
    briefSay('Gathered ' + doc.count + ' of ' + doc.total
      + ' answer' + (doc.total === 1 ? '' : 's') + '.'
      + (short > 0
        ? ' ' + short + ' still blank. Go back up and fill '
          + (short === 1 ? 'it' : 'them') + ' in, then gather again.'
        : ' Copy this, then paste it into the Canvas assignment.'));
    return doc;
  };

  // Selecting the rendered block first means a manual Ctrl-C copies the formatted
  // version even when the clipboard API is blocked entirely.
  function selectBriefOutput(out) {
    try {
      var range = document.createRange();
      range.selectNodeContents(out);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      return true;
    } catch (e) { return false; }
  }

  function copyBriefFallback() {
    var out = document.getElementById('brief-gather-output');
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (e) { copied = false; }
    if (copied) { briefSay('Copied with formatting. Paste it into the Canvas assignment.'); return; }

    if (navigator.clipboard && navigator.clipboard.writeText && out) {
      navigator.clipboard.writeText(out.dataset.plain || out.textContent || '')
        .then(function () { briefSay('Copied as plain text. Paste it into the Canvas assignment.'); })
        .catch(function () { briefSay('Copy is blocked on this device. Your work is selected, press Ctrl+C or Cmd+C.'); });
    } else {
      briefSay('Your work is selected, press Ctrl+C or Cmd+C to copy.');
    }
  }

  window.copyBriefWork = function () {
    var out = document.getElementById('brief-gather-output');
    if (!out) return;
    if (!String(out.dataset.plain || '')) window.gatherBriefWork();

    var html = out.innerHTML;
    var plain = out.dataset.plain || '';
    selectBriefOutput(out);

    // Both flavours, so Canvas keeps the bold and the italics and a plain-text
    // target still gets the record footer.
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' })
      })])
        .then(function () { briefSay('Copied with formatting. Paste it into the Canvas assignment.'); })
        .catch(function () { copyBriefFallback(); });
    } else {
      copyBriefFallback();
    }
  };

`;
}

function captureBlock(weekKey, count, aiUrl) {
  const key = STORAGE_PREFIX + weekKey;
  const ids = [];
  for (let i = 1; i <= count; i++) ids.push('q' + i);

  return `<script>
(function () {
  'use strict';

  // The one storage key the week renderer reads. Changing it here without
  // changing becurrent-week-renderer-v1.js loses every answer on this page.
  var KEY = ${JSON.stringify(key)};
  var IDS = ${JSON.stringify(ids)};

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) { return {}; }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  var state = load();

  IDS.forEach(function (id) {
    var area = document.getElementById('answer-' + id);
    var prompt = document.getElementById('question-' + id);
    if (!area) return;

    // The question text travels with the answer. The teacher's parser reports
    // "answered a different question" as a real exception, which it can only do
    // if the prompt the student actually saw is recorded next to the response.
    var questionText = prompt ? prompt.textContent.trim() : '';

    if (state[id] && typeof state[id].answer === 'string') area.value = state[id].answer;

    area.addEventListener('input', function () {
      state[id] = state[id] || {};
      state[id].answer = area.value;
      state[id].question = questionText;
      save(state);
    });

    // Confidence is stored beside the answer rather than in its own key, so a
    // rating can never outlive the writing it was about.
    var row = document.getElementById('confidence-' + id);
    if (!row) return;
    var buttons = row.querySelectorAll('button[data-conf]');

    function paint() {
      var current = (state[id] && state[id].confidence) || '';
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-conf') === current ? 'true' : 'false');
      });
    }

    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () {
        var value = b.getAttribute('data-conf');
        state[id] = state[id] || {};
        state[id].question = questionText;
        if (typeof state[id].answer !== 'string') state[id].answer = area.value;
        state[id].confidence = state[id].confidence === value ? '' : value;
        save(state);
        paint();
      });
    });

    paint();
  });

${recordBlockSource('  ')}

${gatherBlock()}${coachBlock(aiUrl)}}());
</${''}script>`;
}

module.exports = { captureBlock, STORAGE_PREFIX, CONFIDENCE_WORDS };
