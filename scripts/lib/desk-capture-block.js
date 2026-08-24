'use strict';

/**
 * The answer-capture block for The Desk.
 *
 * This is the only path by which a student's daily filings reach Canvas, and it is
 * the THIRD surface in this course that gathers work. The other two are the week
 * page's module panel and every generated Brief. All three write the same record
 * footer, from the one copy in scripts/lib/canvas-record-block.js, because
 * scripts/lib/canvas-parse-core.js is one parser: two writers of the same grammar
 * would mean the teacher gets a different answer to "did this student edit their
 * work" depending on which button the student pressed. Never inline a second copy
 * of that grammar here. See docs/CANVAS-CAPTURE.md.
 *
 * ── The dated key on a dateless page ────────────────────────────────────────
 *
 * The Desk is one generated page served every class period of the year, and its
 * source carries no date, because a page written in August that names a day is
 * wrong by October. But the work is daily, so a single fixed storage key would
 * mean Tuesday overwriting Monday.
 *
 * So the BROWSER stamps the date, at load, into `becurrent-desk-<YYYY-MM-DD>`. The
 * generated HTML stays dateless and reproducible, every class period gets its own
 * clean sheet, and every earlier day is still on disk where the cycle's gather can
 * find it.
 *
 * `dayKeyOf` uses the LOCAL date getters and never `toISOString()`. An ISO string
 * is UTC, which rolls the date over at 7 or 8pm Eastern: a student filing in an
 * evening make-up session would open tomorrow's blank sheet, and their afternoon's
 * work would look lost. That is the kind of bug that only ever reproduces after
 * school.
 *
 * ── What is a capture slot here, and why the facts are one of them ───────────
 *
 * Per story: one Source record carrying outlet, date and link, then one record per
 * question. Two lanes, so six records a day.
 *
 * The facts get a record of their own rather than being printed loose above the
 * questions, and that is a correctness requirement rather than a preference.
 * Everything between one record's "My response:" marker and the NEXT record's
 * label is what the parser hashes for that record. A lane heading and a bare
 * "Outlet: … Published: …" line sitting between two questions would be swept into
 * the preceding answer's hashed region, and every filing would come back EDITED.
 * Anything printed between the first label and the footer must therefore belong to
 * some record. Only the document head, above the first label, is free.
 *
 * ── One gather button, not two ───────────────────────────────────────────────
 *
 * The panel gathers the whole CYCLE, which always contains today, so a separate
 * "copy today" button would produce a strict subset of what the one button already
 * produces. The cycle is two weeks, about five class periods on a block schedule,
 * and it is anchored rather than rolling: see cycleStart.
 *
 * Students paste into the same Canvas assignment every day, which per the Canvas
 * build guide has Unlimited attempts, so the last paste carries the whole log and
 * every earlier attempt is a recovery point. That daily paste is the only backup
 * that exists, because the privacy rule correctly forecloses any server-side copy
 * of student writing.
 */

const { recordBlockSource } = require('./canvas-record-block');
const { CONFIDENCE_WORDS } = require('./brief-capture-block');

const STORAGE_PREFIX = 'becurrent-desk-';

/**
 * @param {Array}  lanes      [{ id, name }]              from desk.lanes
 * @param {Array}  facts      [{ id, label }]             from desk.story.facts
 * @param {Array}  questions  [{ id, label, text }]       from desk.story.questions
 */
function deskCaptureBlock(lanes, facts, questions, log) {
  const laneMeta = (lanes || []).map(l => ({ id: l.id, name: l.name }));
  const factMeta = (facts || []).map(f => ({ id: f.id, label: f.label }));
  const questionMeta = (questions || []).map(q => ({ id: q.id, label: q.label }));
  const cycle = log || {};
  const anchor = cycle.anchorMonday || '';
  const weeks = Number(cycle.weeks) || 1;

  // A missing or malformed anchor is fatal at BUILD time rather than a default at
  // run time. A default would mean every student's browser silently agreeing on the
  // wrong cycle boundary, which puts one day's filing in one log and the next day's
  // in another, with the page looking perfect and every other check green.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(anchor)) {
    throw new Error('desk.log.anchorMonday must be a YYYY-MM-DD date, got '
      + JSON.stringify(anchor) + '. It is what every browser counts the News Log '
      + 'cycle from; there is no safe default.');
  }

  return `<script>
(function () {
  'use strict';

  // The storage prefix scripts/validate.js checks and the cycle gather scans for.
  var PREFIX = ${JSON.stringify(STORAGE_PREFIX)};
  var LANES = ${JSON.stringify(laneMeta)};
  var FACTS = ${JSON.stringify(factMeta)};
  var QUESTIONS = ${JSON.stringify(questionMeta)};
  var CONFIDENCE_WORDS = ${JSON.stringify(CONFIDENCE_WORDS)};

  // The News Log cycle, from desk.log. The anchor is the Monday cycle 1 starts on
  // and it is what makes a multi-week window computable at all; see cycleStart.
  var ANCHOR_MONDAY = ${JSON.stringify(anchor)};
  var CYCLE_WEEKS = ${weeks};

  // ── Today, in the student's own timezone ───────────────────────────────────
  //
  // Local getters, never toISOString(). See the header of
  // scripts/lib/desk-capture-block.js: an ISO date is UTC and rolls over during
  // the school evening, which would hand an after-school student a blank sheet.
  function dayKeyOf(d) {
    return d.getFullYear()
      + '-' + ('0' + (d.getMonth() + 1)).slice(-2)
      + '-' + ('0' + d.getDate()).slice(-2);
  }

  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DOW_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'];
  var MON_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  // Built from arrays rather than toLocaleDateString, so thirty Chromebooks with
  // thirty locale settings all produce the same heading. That heading is also the
  // record label the parser matches on, so it cannot vary by device.
  function dateOfKey(key) {
    var p = String(key).split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }
  function dayLabel(key) {
    var d = dateOfKey(key);
    return DOW[d.getDay()] + ' ' + MON[d.getMonth()] + ' ' + d.getDate();
  }
  // The day banner, spelled out. Used as the <h2> that divides one day's filings
  // from the next, and it is the FIRST PART OF A RECORD LABEL rather than free
  // text. See dayBannerHtml below for why that distinction is the whole trick.
  function dayBanner(key) {
    var d = dateOfKey(key);
    return DOW_FULL[d.getDay()] + ', ' + MON_FULL[d.getMonth()] + ' ' + d.getDate();
  }

  // The cycle's own name, printed at the top of the paste and used to check that a
  // log landed under the right Canvas assignment. Both ends are named, because
  // "News Log, August 17" alone does not say which fortnight it covers, and the
  // teacher matching thirty pastes to one assignment is the reader here.
  function rangeLabel(startKey, endKey) {
    var a = dateOfKey(startKey);
    var b = dateOfKey(endKey);
    var left = MON_FULL[a.getMonth()] + ' ' + a.getDate();
    var right = (a.getMonth() === b.getMonth() ? '' : MON_FULL[b.getMonth()] + ' ')
      + b.getDate();
    return 'News Log, ' + left + ' to ' + right;
  }

  var TODAY = dayKeyOf(new Date());
  var KEY = PREFIX + TODAY;

  // Monday of the week containing today. getDay() is 0 for Sunday, so (day+6)%7
  // is how many days back Monday is, and Sunday counts as the END of its week.
  function mondayOf(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  }

  /**
   * The Monday the current News Log cycle started on.
   *
   * The log runs CYCLE_WEEKS weeks, so this cannot be computed from today alone:
   * nothing in a single date says whether this is the first week of a cycle or the
   * second. It is counted from ANCHOR_MONDAY, which every student's browser shares,
   * so the whole room's cycle boundaries land on the same day.
   *
   * The tempting shortcut is a rolling fourteen days back from today, and it is
   * wrong in a way that would never look wrong: two students pressing the button on
   * different days would get two different windows, and a filing would land in one
   * student's log and the next student's, or in neither.
   *
   * Whole days are computed off UTC midnights on purpose. Date arithmetic across a
   * daylight-saving boundary is off by an hour, and 13.958 days floored by 7 is 1
   * where 14 days should give 2, which would slip the cycle by a week twice a year.
   * Both endpoints are local midnights converted the same way, so the difference is
   * an exact multiple of 24 hours.
   *
   * Dates before the anchor floor to cycle 0 rather than going negative, so a page
   * opened before term starts still gathers into something sane.
   */
  function daysBetweenUTC(a, b) {
    var au = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var bu = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((bu - au) / 86400000);
  }

  function cycleStart() {
    var parts = ANCHOR_MONDAY.split('-');
    var anchor = mondayOf(new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
    var here = mondayOf(new Date());
    var weeksIn = Math.floor(daysBetweenUTC(anchor, here) / 7);
    var cycles = Math.floor(weeksIn / CYCLE_WEEKS);
    if (cycles < 0) cycles = 0;
    var start = new Date(anchor.getFullYear(), anchor.getMonth(),
      anchor.getDate() + cycles * CYCLE_WEEKS * 7);
    return start;
  }

  // Every candidate key in the current cycle, in order. Enumerated rather than
  // scanned out of localStorage, so a key left by some other page or an older
  // schema can never wander into the paste.
  function cycleKeys() {
    var start = cycleStart();
    var out = [];
    for (var i = 0; i < CYCLE_WEEKS * 7; i++) {
      var d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      out.push(dayKeyOf(d));
    }
    return out;
  }

  // ── Field identity ────────────────────────────────────────────────────────
  //
  // One flat id space, '<lane>-<field>', used for the element ids, the stored
  // state and the record slots alike, so there is nothing to keep in step.
  function fieldIds() {
    var out = [];
    LANES.forEach(function (lane) {
      FACTS.forEach(function (f) { out.push(lane.id + '-' + f.id); });
      QUESTIONS.forEach(function (q) { out.push(lane.id + '-' + q.id); });
    });
    return out;
  }

  function loadDay(dayKey) {
    try {
      var raw = localStorage.getItem(PREFIX + dayKey);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) { return null; }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  var state = loadDay(TODAY) || {};

  // ── Autosave, and restore on load ─────────────────────────────────────────
  //
  // Facts are <input>, questions are <textarea>; .value reads both, so one loop
  // wires everything. Only the questions carry a confidence row.
  fieldIds().forEach(function (id) {
    var area = document.getElementById('answer-' + id);
    if (!area) return;
    var prompt = document.getElementById('question-' + id);

    // The prompt travels with the answer. The teacher's parser reports "answered a
    // different question" as a real exception, which it can only do if the prompt
    // the student actually saw is stored beside the response. It is also what lets
    // the gather print a prompt for a day the student is no longer looking at.
    var questionText = prompt ? String(prompt.textContent || '').trim() : '';

    if (state[id] && typeof state[id].answer === 'string') area.value = state[id].answer;

    area.addEventListener('input', function () {
      state[id] = state[id] || {};
      state[id].answer = area.value;
      state[id].question = questionText;
      save(state);
    });

    var row = document.getElementById('confidence-' + id);
    if (!row) return;
    var buttons = row.querySelectorAll('button[data-conf]');

    function paint() {
      var current = (state[id] && state[id].confidence) || '';
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-conf') === current ? 'true' : 'false');
      });
    }

    // Confidence is stored beside the answer rather than in its own key, so a
    // rating can never outlive the writing it was about.
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

  // ── Gather My Log ─────────────────────────────────────────────────────────

  function confidencePhrase(value) {
    if (!value) return 'not rated';
    return value + ' of 5' + (CONFIDENCE_WORDS[value] ? ', ' + CONFIDENCE_WORDS[value] : '');
  }

  // The prompt a stored answer was written against, falling back to the one on the
  // page today. The questions are fixed for the year, so the fallback is almost
  // always identical; it exists for a day the student rated without typing.
  function promptFor(dayState, id) {
    var stored = dayState[id] && dayState[id].question;
    if (stored) return String(stored);
    var live = document.getElementById('question-' + id);
    return live ? String(live.textContent || '').trim() : '';
  }

  // A story the student filed nothing at all for emits an EMPTY source record
  // rather than three "(blank)" lines. An empty record is reported as BLANK by the
  // parser, which is the honest signal; three lines of the word "blank" is the same
  // information dressed up as work, and it is what a teacher scrolling a five-day
  // log has to read past.
  function factLine(dayState, lane) {
    var values = FACTS.map(function (f) {
      return String((dayState[lane.id + '-' + f.id] || {}).answer || '').trim();
    });
    if (!values.some(Boolean)) return '';
    return FACTS.map(function (f, i) {
      return f.label + ': ' + (values[i] || '(not given)');
    }).join('\\n');
  }

  /**
   * Every record for one day, in the order they are printed.
   *
   * Three per lane: the Source record carrying the three facts, then one per
   * question. The facts are a record rather than a loose line because anything
   * printed between two labels is hashed into the earlier one. See the header.
   *
   * The label is date-qualified, which is what makes it unique inside a paste
   * carrying five days, and what keeps every row in responses.csv attributable to
   * a day. The slot is NOT: 'desk-local-why' means the same thing on every day of
   * the year, so the Skills Lens can aggregate one question across a whole week and
   * across a whole room.
   *
   * The "first" flag marks the day's first record. It is the one that carries the
   * day banner, for the reason spelled out over dayBannerHtml.
   *
   * No backticks anywhere below this point: every line of this function is inside
   * the template literal that builds the browser source, so one backtick in a
   * comment closes the literal and the whole module stops parsing.
   */
  function rowsForDay(dayKey, dayState) {
    // The spelled-out day, not the short form: the banner has to be a prefix of the
    // label, character for character, and 'Monday, August 17' is what a day divider
    // should say.
    var when = dayBanner(dayKey);
    var rows = [];
    LANES.forEach(function (lane) {
      rows.push({
        ord: 'xx',
        id: 'desk-' + lane.id + '-source',
        label: when + ' ' + lane.name + ' story, Source',
        prompt: 'Outlet, publication date and link.',
        text: factLine(dayState, lane),
        confidence: ''
      });
      QUESTIONS.forEach(function (q) {
        var id = lane.id + '-' + q.id;
        var entry = dayState[id] || {};
        rows.push({
          ord: 'xx',
          id: 'desk-' + id,
          label: when + ' ' + lane.name + ' story, ' + q.label,
          prompt: promptFor(dayState, id),
          text: String(entry.answer || '').trim(),
          confidence: String(entry.confidence || '')
        });
      });
    });
    // Every row knows its day; only the first row of the day prints the banner.
    rows.forEach(function (r, i) {
      r.banner = dayBanner(dayKey);
      r.first = i === 0;
    });
    return rows;
  }

  /**
   * The day banner, and why it is built this strangely.
   *
   * A log needs its days visually divided or a teacher scrolling thirty of
   * them cannot tell Monday's filing from Wednesday's. The obvious way to do that
   * is an <h2> with the date in it before each day's first record.
   *
   * That obvious way is broken, and broken invisibly. Everything between one
   * record's "My response:" marker and the NEXT record's label is what the parser
   * hashes for that record, so a free-standing <h2> lands inside the previous day's
   * last answer and the whole paste comes back EDITED, accusing the student of
   * tampering with work they typed correctly. The page would look perfect.
   *
   * So the banner is not free text: it is THE FIRST WORDS OF THE RECORD'S OWN LABEL,
   * rendered in its own <h2>, with the rest of the label in the <h3> under it. The
   * label match therefore starts AT the banner, the previous record's hashed region
   * ends before it, and the day division costs nothing.
   *
   * The join has to be plain whitespace. findLabelIndex tries an exact indexOf
   * first, which fails here because the rendered text has a newline between the two
   * headings, then falls back to a whitespace-insensitive regex built by replacing
   * every run of spaces in the label with \\s+. That fallback is what carries this,
   * and it only works if the character between the banner and the remainder is a
   * space in the label. Put a comma, a bullet or a dash at that boundary and the
   * loose regex looks for a comma where the rendered text has a newline, no label
   * matches, and every record reports MISSING_BODY.
   */
  function dayBannerHtml(row) {
    if (!row.banner) return '<h3>' + bcEsc(row.label) + '</h3>';
    var rest = row.label.slice(row.banner.length).replace(/^\\s+/, '');

    // The day's first record: the banner becomes the h2 that divides the days, and
    // the question heading is the h3 under it.
    if (row.first) {
      return '<h2>' + bcEsc(row.banner) + '</h2><h3>' + bcEsc(rest) + '</h3>';
    }

    // Every later record of the same day still has to print its whole label, or the
    // parser finds no such section and reports MISSING_BODY. So the day stays in the
    // heading and is merely made quiet: a span carries it, which keeps the heading's
    // text content byte-identical to the label while letting the page render the
    // repeated date as small grey type under the banner. Canvas usually strips the
    // span, and that is fine, because the words are what the parser reads.
    return '<h3><span class="rec-day">' + bcEsc(row.banner) + '</span> '
      + bcEsc(rest) + '</h3>';
  }

  // A day counts as filed if the student put anything at all in it. A day with an
  // empty record is a day they opened and left, and printing six blanks for it
  // would read to the teacher as work attempted and abandoned.
  function dayHasContent(dayState) {
    return fieldIds().some(function (id) {
      return String((dayState[id] || {}).answer || '').trim();
    });
  }

  function gatheredDays() {
    var out = [];
    cycleKeys().forEach(function (dayKey) {
      var dayState = dayKey === TODAY ? state : loadDay(dayKey);
      if (!dayState) return;
      if (!dayHasContent(dayState)) return;
      out.push({ key: dayKey, state: dayState });
    });
    return out;
  }

  function buildLogDocument() {
    var days = gatheredDays();
    var stamp = new Date();
    var start = dayKeyOf(cycleStart());
    var last = cycleKeys()[cycleKeys().length - 1];

    var rows = [];
    days.forEach(function (day) {
      rowsForDay(day.key, day.state).forEach(function (r) { rows.push(r); });
    });

    // The head sits ABOVE the first record label, which is the only region of the
    // paste that belongs to no record and can therefore carry free text. The
    // "Days filed" line is the teacher's completeness signal: the manifest cannot
    // know how many class periods the cycle held, but this line makes a missing
    // Wednesday visible at a glance.
    var filed = days.length
      ? days.map(function (d) { return dayLabel(d.key); }).join(', ')
      : 'none yet';
    var head = '<p><strong>CURRENT EVENTS &middot; The Desk &middot; News Log</strong></p>'
      + '<h2>' + bcEsc(rangeLabel(start, last)) + '</h2>'
      + '<p><em>Student work, copied ' + bcEsc(stamp.toLocaleString()) + '</em></p>'
      + '<p>Days filed: ' + bcEsc(filed) + '</p>'
      + '<hr>';

    // Four lines per record, in an order fixed by the parser rather than by taste.
    // The heading is the record's own label, because that is how each response is
    // located; a heading that reads differently from the label it declares gives
    // MISSING_BODY on every record with the footer still parsing perfectly. The
    // confidence sits ABOVE the "My response:" marker, because everything below
    // that marker is what gets hashed.
    var body = rows.map(function (r) {
      return dayBannerHtml(r)
        + '<p>Confidence: ' + bcEsc(confidencePhrase(r.confidence)) + '</p>'
        + '<p><strong>Question: ' + bcEsc(r.prompt) + '</strong></p>'
        + '<p><strong>My response:</strong></p>'
        + bcParagraphsHtml(r.text, 'em');
    }).join('<hr>');

    // Computed, never a literal. Six slots for each day actually filed: the Desk
    // cannot know how many class periods the cycle held, so an absent day is not
    // counted as a shortfall. What it does report is a blank inside a day that was
    // filed, which arrives as w=0 on that record and a BLANK exception for the
    // teacher.
    var manifest = bcRecordManifest(rows, {
      topic: 'desk-log-' + start,
      expected: days.length * (LANES.length * (1 + QUESTIONS.length)),
      isoStamp: stamp.toISOString()
    });

    var plain = ['CURRENT EVENTS \\u00b7 The Desk \\u00b7 News Log',
      rangeLabel(start, last),
      'Student work, copied ' + stamp.toLocaleString(),
      'Days filed: ' + filed,
      '']
      .concat(rows.map(function (r) {
        // The same four lines in the same order, for the same reason.
        // findLabelIndex is case-insensitive, so the label may be shouted here.
        //
        // The day divider is a rule of equals signs UNDER the day's first label,
        // never above it, and the difference is not cosmetic. In this flavour the
        // label is one line of plain text, so indexOf finds it exactly; anything
        // printed above it therefore falls in the PREVIOUS record's section, after
        // that record's "My response:", and gets hashed into it. Under the label is
        // inside this record's own unhashed region, between the label and the
        // marker, which is where free text is free. The label already begins with
        // the day, so it reads as a day heading with a rule under it.
        var lines = [r.label.toUpperCase()];
        if (r.first && r.banner) lines.push('='.repeat(r.label.length));
        return lines.concat([
          'Confidence: ' + confidencePhrase(r.confidence),
          'Question: ' + r.prompt,
          'My response:',
          r.text,
          '']).join('\\n');
      }))
      .concat(manifest)
      .join('\\n');

    var written = rows.filter(function (r) { return r.text; }).length;

    return {
      html: head + body + bcRecordFooterHtml(manifest),
      plain: plain,
      days: days.length,
      count: written,
      total: rows.length
    };
  }

  function deskSay(message, tone) {
    var status = document.getElementById('desk-gather-status');
    if (!status) return;
    status.textContent = message;
    status.className = 'gather-status' + (tone ? ' ' + tone : '');
  }

  window.gatherDeskWork = function () {
    var out = document.getElementById('desk-gather-output');
    if (!out) return null;
    var doc = buildLogDocument();
    out.innerHTML = doc.html;
    out.dataset.plain = doc.plain;

    // Say the numbers out loud before they submit. A wiped browser profile
    // produces a well-formed paste with nothing in it, and a student has no other
    // way to notice that Monday and Tuesday are gone.
    //
    // An empty gather has two causes and they need different sentences. Before the
    // term's anchor Monday, today belongs to no cycle at all: a teacher walking the
    // page in August, or a student on an intro day, types two stories, presses
    // Gather, and correctly gets nothing. "Nothing filed yet" would be a lie about
    // work they can see on the screen, and the move after "this button is broken" is
    // to stop trusting it. So the pre-term case says what is actually true.
    //
    // The condition is "no days AND before the cycle", not just "before the cycle":
    // a day inside the window can be filled while today sits outside it, and then
    // there is a real count to report. (No backticks in these comments: every line
    // here is inside the template literal that builds this source.)
    if (!doc.days) {
      if (dayKeyOf(cycleStart()) > TODAY) {
        deskSay('The first News Log starts ' + dayBanner(dayKeyOf(cycleStart()))
          + '. Anything you file before then is saved on this device, but it is not '
          + 'part of a log yet.', 'short');
      } else {
        deskSay('Nothing filed in this log yet. Fill in a story above, then gather again.',
          'short');
      }
      return doc;
    }
    var blank = doc.total - doc.count;
    deskSay('Gathered ' + doc.days + ' day' + (doc.days === 1 ? '' : 's') + ', '
      + doc.count + ' of ' + doc.total + ' boxes filled.'
      + (blank > 0
        ? ' ' + blank + ' still blank. You can copy this as it is, or go back and fill '
          + (blank === 1 ? 'it' : 'them') + ' in.'
        : ' Copy this, then paste it into the current News Log in Canvas.'),
      blank > 0 ? 'short' : 'complete');
    return doc;
  };

  // Selecting the rendered block first means a manual Ctrl-C copies the formatted
  // version even when the clipboard API is blocked entirely, which it is on some
  // managed devices.
  function selectDeskOutput(out) {
    try {
      var range = document.createRange();
      range.selectNodeContents(out);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      return true;
    } catch (e) { return false; }
  }

  function copyDeskFallback() {
    var out = document.getElementById('desk-gather-output');
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (e) { copied = false; }
    if (copied) { deskSay('Copied with formatting. Paste it into the News Log in Canvas.', 'complete'); return; }

    if (navigator.clipboard && navigator.clipboard.writeText && out) {
      navigator.clipboard.writeText(out.dataset.plain || out.textContent || '')
        .then(function () { deskSay('Copied as plain text. Paste it into the News Log in Canvas.', 'complete'); })
        .catch(function () { deskSay('Copy is blocked on this device. Your work is selected, press Ctrl+C or Cmd+C.', 'short'); });
    } else {
      deskSay('Your work is selected, press Ctrl+C or Cmd+C to copy.', 'short');
    }
  }

  window.copyDeskWork = function () {
    var out = document.getElementById('desk-gather-output');
    if (!out) return;
    if (!String(out.dataset.plain || '')) window.gatherDeskWork();

    var html = out.innerHTML;
    var plain = out.dataset.plain || '';
    selectDeskOutput(out);

    // Both flavours, so Canvas keeps the bold and the italics and a plain-text
    // target still gets the record footer.
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' })
      })])
        .then(function () { deskSay('Copied with formatting. Paste it into the News Log in Canvas.', 'complete'); })
        .catch(function () { copyDeskFallback(); });
    } else {
      copyDeskFallback();
    }
  };

  // The date the sheet is filed under, printed where the student can see it, so
  // "my work disappeared" and "I am looking at tomorrow" are distinguishable.
  var today = document.getElementById('desk-today');
  if (today) today.textContent = dayLabel(TODAY);
}());
</${''}script>`;
}

module.exports = { deskCaptureBlock, STORAGE_PREFIX };
