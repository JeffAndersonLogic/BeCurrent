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

${coachBlock(aiUrl)}}());
</${''}script>`;
}

module.exports = { captureBlock, STORAGE_PREFIX };
