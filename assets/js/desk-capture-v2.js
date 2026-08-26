/* BeCurrent Desk capture runtime.
   Student writing stays in localStorage until Gather/Copy. No network calls.
   The public page supplies BECURRENT_DESK_CONFIG; this file supplies the tested
   dated-sheet, two-week gather and Canvas record contract. */
(function () {
  'use strict';

  var CFG = window.BECURRENT_DESK_CONFIG || {};
  var PREFIX = "becurrent-desk-";
  var LANES = Array.isArray(CFG.lanes) ? CFG.lanes : [];
  var FACTS = Array.isArray(CFG.facts) ? CFG.facts : [];
  var QUESTIONS = Array.isArray(CFG.questions) ? CFG.questions : [];
  var CONFIDENCE_WORDS = {"1":"Lost","2":"Shaky","3":"Getting it","4":"Solid","5":"Could teach it"};
  var ANCHOR_MONDAY = String(CFG.anchorMonday || '');
  var CYCLE_WEEKS = Math.max(1, Number(CFG.weeks) || 1);

  function dayKeyOf(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  var DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DOW_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var MON_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function dateOfKey(key) {
    var p = String(key).split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }
  function dayLabel(key) {
    var d = dateOfKey(key);
    return DOW[d.getDay()] + ' ' + MON[d.getMonth()] + ' ' + d.getDate();
  }
  function dayBanner(key) {
    var d = dateOfKey(key);
    return DOW_FULL[d.getDay()] + ', ' + MON_FULL[d.getMonth()] + ' ' + d.getDate();
  }
  function rangeLabel(startKey, endKey) {
    var a = dateOfKey(startKey), b = dateOfKey(endKey);
    var left = MON_FULL[a.getMonth()] + ' ' + a.getDate();
    var right = (a.getMonth() === b.getMonth() ? '' : MON_FULL[b.getMonth()] + ' ') + b.getDate();
    return 'News Log, ' + left + ' to ' + right;
  }

  var TODAY = dayKeyOf(new Date());
  var KEY = PREFIX + TODAY;

  function mondayOf(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  }
  function daysBetweenUTC(a, b) {
    return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000);
  }
  function cycleStart() {
    var p = ANCHOR_MONDAY.split('-');
    var anchor = mondayOf(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])));
    var here = mondayOf(new Date());
    var weeksIn = Math.floor(daysBetweenUTC(anchor, here) / 7);
    var cycles = Math.max(0, Math.floor(weeksIn / CYCLE_WEEKS));
    return new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() + cycles * CYCLE_WEEKS * 7);
  }
  function cycleKeys() {
    var start = cycleStart(), out = [];
    for (var i = 0; i < CYCLE_WEEKS * 7; i++) {
      out.push(dayKeyOf(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)));
    }
    return out;
  }

  function fieldIds() {
    var out = [];
    LANES.forEach(function (lane) {
      FACTS.forEach(function (f) { out.push(lane.id + '-' + f.id); });
      QUESTIONS.forEach(function (q) { out.push(lane.id + '-' + q.id); });
    });
    return out;
  }
  function loadDay(key) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) { return null; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  var state = loadDay(TODAY) || {};
  fieldIds().forEach(function (id) {
    var area = document.getElementById('answer-' + id);
    if (!area) return;
    var prompt = document.getElementById('question-' + id);
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

  /* Canvas record grammar. Whitespace is normalized before hashing because Canvas
     rewrites HTML; hashes detect accidental changes, not malicious tampering. */
  var BC_RECORD_VERSION = 1;
  var BC_RECORD_OPEN = "--- BECURRENT RECORD, do not edit ---";
  var BC_RECORD_CLOSE = "--- END BECURRENT RECORD ---";
  function bcEsc(value) {
    return String(value == null ? '' : value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function bcNormalizeForHash(value) { return String(value == null ? '' : value).replace(/\s+/g,' ').trim(); }
  function bcHash(value) {
    var s = bcNormalizeForHash(value), h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  function bcWordCount(value) { var s = bcNormalizeForHash(value); return s ? s.split(' ').length : 0; }
  function bcField(value) { return String(value == null ? '' : value).replace(/[|\r\n]+/g,' ').trim(); }
  function bcParagraphsHtml(text, wrap) {
    var open = wrap ? '<' + wrap + '>' : '', close = wrap ? '</' + wrap + '>' : '';
    return String(text || '').split(/\n{2,}/).map(function (p) { return p.trim(); }).filter(Boolean)
      .map(function (p) { return '<p>' + open + bcEsc(p).replace(/\n/g,'<br>') + close + '</p>'; }).join('');
  }
  function bcRecordManifest(work, opts) {
    var o = opts || {};
    var rows = work.map(function (w) {
      return { ord:bcField(w.ord || 'xx'), slot:bcField(w.id), label:bcField(w.label), words:bcWordCount(w.text), chars:bcNormalizeForHash(w.text).length, promptHash:bcHash(w.prompt), responseHash:bcHash(w.text), confidence:w.confidence || '' };
    });
    var sum = bcHash(rows.map(function (r) { return r.slot + ':' + r.responseHash; }).join('|'));
    var header = '#BHV|v=' + BC_RECORD_VERSION + '|topic=' + bcField(o.topic) + '|copied=' + o.isoStamp + '|items=' + rows.length + '|expected=' + Number(o.expected || 0) + '|sum=' + sum + '|#';
    var lines = rows.map(function (r) {
      return '#BHR|i=' + r.ord + '|slot=' + r.slot + '|lab=' + r.label + '|w=' + r.words + '|c=' + r.chars + '|ph=' + r.promptHash + '|rh=' + r.responseHash + '|cf=' + r.confidence + '|#';
    });
    return [BC_RECORD_OPEN, header].concat(lines).concat([BC_RECORD_CLOSE]);
  }
  function bcRecordFooterHtml(lines) {
    return '<hr>' + lines.map(function (line) { return '<p style="font-family:monospace;font-size:.68rem;opacity:.6;margin:.15rem 0;">' + bcEsc(line) + '</p>'; }).join('');
  }

  function confidencePhrase(value) {
    if (!value) return 'not rated';
    return value + ' of 5' + (CONFIDENCE_WORDS[value] ? ', ' + CONFIDENCE_WORDS[value] : '');
  }
  function promptFor(dayState, id) {
    var stored = dayState[id] && dayState[id].question;
    if (stored) return String(stored);
    var live = document.getElementById('question-' + id);
    return live ? String(live.textContent || '').trim() : '';
  }
  function factLine(dayState, lane) {
    var values = FACTS.map(function (f) { return String((dayState[lane.id + '-' + f.id] || {}).answer || '').trim(); });
    if (!values.some(Boolean)) return '';
    return FACTS.map(function (f, i) { return f.label + ': ' + (values[i] || '(not given)'); }).join('\n');
  }
  function rowsForDay(dayKey, dayState) {
    var when = dayBanner(dayKey), rows = [];
    LANES.forEach(function (lane) {
      rows.push({ord:'xx',id:'desk-' + lane.id + '-source',label:when + ' ' + lane.name + ' story, Source',prompt:'Outlet, publication date and link.',text:factLine(dayState,lane),confidence:''});
      QUESTIONS.forEach(function (q) {
        var id = lane.id + '-' + q.id, entry = dayState[id] || {};
        rows.push({ord:'xx',id:'desk-' + id,label:when + ' ' + lane.name + ' story, ' + q.label,prompt:promptFor(dayState,id),text:String(entry.answer || '').trim(),confidence:String(entry.confidence || '')});
      });
    });
    rows.forEach(function (r, i) { r.banner = when; r.first = i === 0; });
    return rows;
  }
  function dayBannerHtml(row) {
    if (!row.banner) return '<h3>' + bcEsc(row.label) + '</h3>';
    var rest = row.label.slice(row.banner.length).replace(/^\s+/, '');
    if (row.first) return '<h2>' + bcEsc(row.banner) + '</h2><h3>' + bcEsc(rest) + '</h3>';
    return '<h3><span class="rec-day">' + bcEsc(row.banner) + '</span> ' + bcEsc(rest) + '</h3>';
  }
  function dayHasContent(dayState) {
    return LANES.some(function (lane) { return QUESTIONS.some(function (q) { var id = lane.id + '-' + q.id; return String((dayState[id] || {}).answer || '').trim(); }); });
  }
  function gatheredDays() {
    var out = [];
    cycleKeys().forEach(function (key) {
      var dayState = key === TODAY ? state : loadDay(key);
      if (dayState && dayHasContent(dayState)) out.push({key:key,state:dayState});
    });
    return out;
  }

  function buildLogDocument() {
    var days = gatheredDays(), stamp = new Date(), start = dayKeyOf(cycleStart()), keys = cycleKeys(), last = keys[keys.length - 1], rows = [];
    days.forEach(function (day) { rowsForDay(day.key, day.state).forEach(function (r) { rows.push(r); }); });
    var filed = days.length ? days.map(function (d) { return dayLabel(d.key); }).join(', ') : 'none yet';
    var head = '<p><strong>CURRENT EVENTS &middot; The Desk &middot; News Log</strong></p>'
      + '<h2>' + bcEsc(rangeLabel(start,last)) + '</h2>'
      + '<p><em>Student work, copied ' + bcEsc(stamp.toLocaleString()) + '</em></p>'
      + '<p>Days filed: ' + bcEsc(filed) + '</p><hr>';
    var body = rows.map(function (r) {
      return dayBannerHtml(r)
        + '<p>Confidence: ' + bcEsc(confidencePhrase(r.confidence)) + '</p>'
        + '<p><strong>Question: ' + bcEsc(r.prompt) + '</strong></p>'
        + '<p><strong>My response:</strong></p>'
        + bcParagraphsHtml(r.text,'em');
    }).join('<hr>');
    var manifest = bcRecordManifest(rows,{topic:'desk-log-' + start,expected:days.length * (LANES.length * (1 + QUESTIONS.length)),isoStamp:stamp.toISOString()});
    var plain = ['CURRENT EVENTS \u00b7 The Desk \u00b7 News Log',rangeLabel(start,last),'Student work, copied ' + stamp.toLocaleString(),'Days filed: ' + filed,'']
      .concat(rows.map(function (r) {
        var lines = [r.label.toUpperCase()];
        if (r.first && r.banner) lines.push('='.repeat(r.label.length));
        return lines.concat(['Confidence: ' + confidencePhrase(r.confidence),'Question: ' + r.prompt,'My response:',r.text,'']).join('\n');
      })).concat(manifest).join('\n');
    var written = rows.filter(function (r) { return r.text; }).length;
    return {html:head + body + bcRecordFooterHtml(manifest),plain:plain,days:days.length,count:written,total:rows.length};
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
    if (!doc.days) {
      if (dayKeyOf(cycleStart()) > TODAY) deskSay('The first News Log starts ' + dayBanner(dayKeyOf(cycleStart())) + '. Anything filed before then stays on this device but is not part of a log yet.','short');
      else deskSay('Nothing filed in this log yet. File today’s stories, then gather again.','short');
      return doc;
    }
    var blank = doc.total - doc.count;
    deskSay('Gathered ' + doc.days + ' day' + (doc.days === 1 ? '' : 's') + ', ' + doc.count + ' of ' + doc.total + ' boxes filled.'
      + (blank ? ' ' + blank + ' still blank. You can copy this as it is, or fill ' + (blank === 1 ? 'it' : 'them') + ' in.' : ' Copy this, then paste it into the current News Log in Canvas.'), blank ? 'short' : 'complete');
    return doc;
  };

  function selectDeskOutput(out) {
    try { var range=document.createRange(); range.selectNodeContents(out); var sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(range); return true; } catch (e) { return false; }
  }
  function copyDeskFallback() {
    var out=document.getElementById('desk-gather-output'), copied=false;
    try { copied=document.execCommand('copy'); } catch (e) { copied=false; }
    if (copied) { deskSay('Copied with formatting. Paste it into the News Log in Canvas.','complete'); return; }
    if (navigator.clipboard && navigator.clipboard.writeText && out) {
      navigator.clipboard.writeText(out.dataset.plain || out.textContent || '').then(function(){deskSay('Copied as plain text. Paste it into the News Log in Canvas.','complete');}).catch(function(){deskSay('Copy is blocked. Your work is selected; press Ctrl+C or Cmd+C.','short');});
    } else deskSay('Your work is selected; press Ctrl+C or Cmd+C to copy.','short');
  }
  window.copyDeskWork = function () {
    var out=document.getElementById('desk-gather-output');
    if (!out) return;
    if (!String(out.dataset.plain || '')) window.gatherDeskWork();
    var html=out.innerHTML, plain=out.dataset.plain || '';
    selectDeskOutput(out);
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([plain],{type:'text/plain'})})])
        .then(function(){deskSay('Copied with formatting. Paste it into the News Log in Canvas.','complete');})
        .catch(copyDeskFallback);
    } else copyDeskFallback();
  };

  var today=document.getElementById('desk-today');
  if (today) today.textContent=dayLabel(TODAY);
}());
