/* ═══════════════════════════════════════════════════════════════════════════
   BeCurrent, the Current Events Desk renderer

   Reads window.BEHISTORICAL_CURRENT_EVENTS (assets/data/current-events-edition.js)
   and builds the week's desk.

   WHAT LIVES WHERE, and why the split matters:
     - The edition file holds what changes weekly: the date, the beats, the
       pinned articles, which stations run.
     - This file holds the pedagogy: what each station asks and which AP skill
       it practices. That is fixed. If it were in the edition file it would
       drift, and by November nine editions would each be asking a slightly
       different question.

   PERSISTENCE. Everything autosaves to localStorage under a key namespaced by
   the edition id. This follows the same decision recorded in docs/FORM-CONTRACT.md
   for lesson pages: drafts are localStorage, and graded work reaches Canvas
   through Copy All My Work, which the student pastes. Nothing here sends data
   anywhere on its own.

   NO GOOGLE FORM CAPTURE, deliberately. The form's Unit and Topic questions are
   dropdowns, and Google drops a prefilled value that is not on the list
   silently: no error, no warning, a blank cell. Current events is not a CED
   topic, so there is no option to send. Wiring capture here would mean adding
   options to the live form by hand first. docs/current-events-desk.md records
   exactly what those edits would be, if that day comes.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var CE = window.BEHISTORICAL_CURRENT_EVENTS;

  // ── AP World themes, used as newsroom beats ────────────────────────────────
  // The College Board theme codes, so a student filing a story under ECN is
  // rehearsing the same vocabulary the exam uses in April.
  var THEMES = {
    GOV: { name: 'Governance',                 blurb: 'states, power, law, protest, elections, war' },
    ECN: { name: 'Economic Systems',           blurb: 'trade, labor, money, prices, supply chains' },
    CDI: { name: 'Cultural Developments',      blurb: 'religion, art, sport, ideas, identity' },
    TEC: { name: 'Technology and Innovation',  blurb: 'invention, medicine, transport, computing' },
    ENV: { name: 'Humans and the Environment', blurb: 'climate, disease, food, water, disaster' },
    SIO: { name: 'Social Interactions',        blurb: 'class, gender, race, migration, family' }
  };

  // ── The course, for the Historian's Hook dropdown ──────────────────────────
  var UNITS = [
    'Foundations, Before the Modern World, to c. 1200',
    'Unit 1, The Global Tapestry, c. 1200 to c. 1450',
    'Unit 2, Networks of Exchange, c. 1200 to c. 1450',
    'Unit 3, Land Based Empires, c. 1450 to c. 1750',
    'Unit 4, Transoceanic Connections, c. 1450 to c. 1750',
    'Unit 5, Revolutions, c. 1750 to c. 1900',
    'Unit 6, Consequences of Industrialization, c. 1750 to c. 1900',
    'Unit 7, Global Conflict, c. 1900 to the present',
    'Unit 8, Cold War and Decolonization, c. 1900 to the present',
    'Unit 9, Globalization, c. 1900 to the present'
  ];

  // ── Small helpers ──────────────────────────────────────────────────────────
  function byId(id) { return document.getElementById(id); }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function slug(v) {
    return String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function words(v) {
    var t = String(v || '').trim();
    return t ? t.split(/\s+/).length : 0;
  }

  // A URL only ever reaches an anchor's href, never innerHTML, and only when it
  // is http or https. A javascript: URL pasted into the edition file would
  // otherwise become a working script the moment a student clicked it.
  function safeUrl(v) {
    var raw = String(v || '').trim();
    return /^https?:\/\//i.test(raw) ? raw : '';
  }

  function outletUrl(name) {
    var list = (CE && CE.outlets) || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].name === name) return safeUrl(list[i].url);
    }
    return '';
  }

  // ── Station definitions ────────────────────────────────────────────────────
  //
  // Each station returns { label, skill, minutes, heading, body, move, fields }.
  // A field is { id, type, label, hint, placeholder, target, options }, where
  // type is 'line', 'area' or 'select', and target is a word count goal shown
  // under the box. Fields may be wrapped in a row card via { row: {...} }.

  function stationFrontPage() {
    var names = (CE.frontPage && CE.frontPage.length) ? CE.frontPage : ['CNN', 'Fox News', 'Reuters', 'Al Jazeera'];
    var groups = names.map(function (name) {
      var key = slug(name);
      return {
        row: { name: name, url: outletUrl(name) },
        fields: [
          { id: 'fp-' + key + '-headline', type: 'line',
            label: 'Top headline, word for word', placeholder: 'Copy it exactly, including the punctuation' },
          { id: 'fp-' + key + '-word', type: 'line',
            label: 'One word in it that is doing work', placeholder: 'A verb or adjective that is not neutral' }
        ]
      };
    });

    return {
      label: 'Station 01', skill: 'Sourcing', minutes: 8,
      heading: 'The Front Page Test',
      body: 'Open all four front pages. Log what each desk put at the very top right now, then find the one word in that headline that is carrying an opinion. A wire service writes "killed." A cable network writes "slaughtered." Both are reporting the same death.',
      move: 'A source is never just a container for facts. <strong>Every headline is an argument about what matters most today</strong>, made by an editor who had to choose. Reading four front pages at once is how you see the choice instead of the news.',
      groups: groups,
      fields: [
        { id: 'fp-analysis', type: 'area', tall: true, target: 60,
          label: 'Two of these desks are covering the same event. Put their headlines side by side and name what changed.',
          hint: 'Quote both. Then say what the difference tells you about who each desk is writing for. If no two overlap, say what that gap itself reveals.',
          placeholder: 'Reuters wrote... while Fox News wrote... The difference is...' }
      ]
    };
  }

  function stationBeats() {
    var keys = (CE.beats && CE.beats.length ? CE.beats : ['GOV', 'ECN', 'TEC'])
      .filter(function (k) { return THEMES[k]; });

    var groups = keys.map(function (key) {
      var theme = THEMES[key];
      return {
        row: { name: theme.name, theme: key, note: theme.blurb },
        fields: [
          { id: 'beat-' + slug(key) + '-head', type: 'line',
            label: 'Headline and outlet', placeholder: 'Headline (Outlet)' },
          { id: 'beat-' + slug(key) + '-note', type: 'area', target: 45,
            label: 'What happened, and why it is a ' + theme.name + ' story',
            hint: 'Two or three sentences. The second half of that question is the part that counts.',
            placeholder: '' }
        ]
      };
    });

    return {
      label: 'Station 02', skill: 'Contextualization', minutes: 10,
      heading: 'Work the Beats',
      body: 'A reporter covers a beat. So does a historian: the AP World themes are just beats with older sources. Find one story from today for each beat below. Any outlet, anywhere in the world.',
      move: 'Anyone can find a story. <strong>Filing it under the right theme is the historian\'s move</strong>, because it forces you to say what kind of change you are looking at before you say whether it matters.',
      groups: groups,
      fields: []
    };
  }

  function stationBriefing() {
    var pinned = (CE.pinned || []).filter(function (p) { return p && p.title; });

    if (!pinned.length) {
      // Open wire. This is a real assignment, not a fallback apology: on a week
      // with nothing pinned, the editor's chair is the better exercise anyway.
      return {
        label: 'Station 03', skill: 'Argumentation', minutes: 7,
        heading: "The Editor's Chair",
        body: 'The desk is running open wire today, so the front page is yours. Read widely for a few minutes, then decide.',
        move: 'Significance is a claim, not a feeling. <strong>An editor who cannot defend the choice is just guessing</strong>, and so is a historian.',
        groups: [],
        fields: [
          { id: 'brief-lead', type: 'line',
            label: 'The one story you would run above the fold today',
            placeholder: 'Headline and outlet' },
          { id: 'brief-defense', type: 'area', target: 55,
            label: 'Defend it. Why this story and not the other twenty?',
            hint: 'Rule out one story you rejected. Saying why something is not the lead is half of arguing that something else is.',
            placeholder: '' }
        ]
      };
    }

    return {
      label: 'Station 03', skill: 'Evidence Usage', minutes: 10,
      heading: "Editor's Briefing",
      body: 'Read each article, then answer the question under it. Detail beats length: a specific fact from the article is worth more than three sentences of summary.',
      move: 'Answer <strong>from the article, not from the headline</strong>. If you could have written your answer without opening the link, you have not read it yet.',
      pinned: pinned.map(function (p, i) {
        return {
          source: p.source || 'Article ' + (i + 1),
          title: p.title,
          url: safeUrl(p.url),
          skill: p.skill || '',
          question: p.question || 'What is the most important thing this article says?',
          field: { id: 'pin-' + (i + 1), type: 'area', target: 50, label: '', placeholder: '' }
        };
      }),
      groups: [],
      fields: []
    };
  }

  function stationHook() {
    return {
      label: 'Station 04', skill: 'Continuity and Change Over Time (CCOT)', minutes: 8,
      heading: "The Historian's Hook",
      body: 'Pick any one story from today, from any station above. Now put it in the course. Every headline you have read this hour is the latest paragraph of something that started a long time ago.',
      move: 'This is the whole class in one exercise. <strong>Change and continuity are always both true at once</strong>, and the historian is the person who can hold them in the same sentence. The exam calls it CCOT. Today it is just reading the news properly.',
      groups: [],
      fields: [
        { id: 'hook-story', type: 'line',
          label: 'The story I chose', placeholder: 'Headline and outlet' },
        { id: 'hook-unit', type: 'select',
          label: 'The unit of this course it rhymes with', options: UNITS },
        { id: 'hook-new', type: 'area', target: 40,
          label: 'What is genuinely new here? Name the change.',
          hint: 'Something that could not have happened in the period you picked. Be specific about what makes it impossible then and possible now.',
          placeholder: '' },
        { id: 'hook-old', type: 'area', target: 40,
          label: 'What has been true for centuries? Name the continuity.',
          hint: 'The part of this story a person from your chosen unit would recognize immediately.',
          placeholder: '' }
      ]
    };
  }

  function stationCausation() {
    return {
      label: 'Station 05', skill: 'Causation', minutes: 8,
      heading: 'Trace It Back, Trace It Forward',
      body: 'One story. Three moves. Nothing in the news started this morning, and nothing in the news ends tonight.',
      move: 'Historians separate the <strong>trigger from the condition</strong>. The assassination was the trigger. The alliance system was the condition. Newspapers almost always report the trigger and almost never report the condition, so you have to go get it.',
      groups: [],
      fields: [
        { id: 'cause-story', type: 'line',
          label: 'The story I chose', placeholder: 'Headline and outlet' },
        { id: 'cause-trigger', type: 'line',
          label: 'The trigger: what happened right before, that the article does report',
          placeholder: 'One sentence' },
        { id: 'cause-condition', type: 'area', target: 35,
          label: 'The condition: what was already true, that made the trigger matter',
          hint: 'This is the part you usually have to look up. A second article or a quick search is fair game.',
          placeholder: '' },
        { id: 'cause-2050', type: 'area', target: 35,
          label: 'One effect that could still matter in 2050, and why',
          hint: 'Not a prediction of the news. A prediction of the consequence.',
          placeholder: '' }
      ]
    };
  }

  function stationReliability() {
    return {
      label: 'Station 06', skill: 'Sourcing', minutes: 8,
      heading: 'The Reliability Check',
      body: 'Find one claim being passed around today. A social post, a headline, a statistic in a graphic. Then leave the page it is on and go check it somewhere else. That last part is the whole skill.',
      move: 'Reading harder does not make a bad source good. <strong>Reading laterally does</strong>: open a second tab and find out who is talking before you decide whether to believe them. It is exactly what you do to a primary source, and it takes ninety seconds.',
      groups: [],
      fields: [
        { id: 'rel-claim', type: 'area', target: 25,
          label: 'The claim, in your own words',
          placeholder: '' },
        { id: 'rel-who', type: 'line',
          label: 'Who published it, and what are they?',
          placeholder: 'Name, and what kind of organization it is' },
        { id: 'rel-benefit', type: 'area', target: 30,
          label: 'Who benefits if people believe this?',
          hint: 'Every source has a point of view. Having one does not make it wrong. Not knowing it does make you an easier mark.',
          placeholder: '' },
        { id: 'rel-second', type: 'line',
          label: 'A second, independent source you checked',
          placeholder: 'Name of the outlet, and the link' },
        { id: 'rel-verdict', type: 'select',
          label: 'Verdict',
          options: ['Confirmed by an independent source',
                    'Partly true, but the framing is off',
                    'Contradicted by an independent source',
                    'Could not verify either way'] },
        { id: 'rel-why', type: 'area', target: 25,
          label: 'How did you decide?',
          placeholder: '' }
      ]
    };
  }

  function stationPulse() {
    var charts = (CE.outlets || []).filter(function (o) { return o && o.group === 'chart'; });
    return {
      links: charts,
      label: 'Station 07', skill: 'Complexity', minutes: 6,
      heading: 'The Culture Pulse',
      body: 'The fast one. Fill in the charts. Then answer the question at the bottom, which is not fast.',
      move: 'Historians reconstruct whole societies from what people bought, sang, and lined up to see. <strong>Sales figures survive when opinions do not.</strong> You are building a primary source right now, and you are inside it.',
      groups: [],
      fields: [
        { id: 'pulse-song', type: 'line',
          label: 'Number one song, in the genre of your choice',
          placeholder: 'Title, artist, and which chart' },
        { id: 'pulse-book', type: 'line',
          label: 'Number one on the New York Times best seller list',
          placeholder: 'Title, author, and which list' },
        { id: 'pulse-film', type: 'line',
          label: 'Number one at the box office last weekend',
          placeholder: 'Title, and what it grossed' },
        { id: 'pulse-viral', type: 'line',
          label: 'One thing that is everywhere online today',
          placeholder: 'A video, a game, a show, an argument' },
        { id: 'pulse-2126', type: 'area', target: 45,
          label: 'A historian in 2126 finds only this snapshot. What do they conclude about us?',
          hint: 'Then add the harder half: what would they get wrong, because it is not on any of these charts?',
          placeholder: '' }
      ]
    };
  }

  function stationLocal() {
    var links = (CE.local || []).filter(function (l) { return l && safeUrl(l.url); });
    return {
      label: 'Station 08', skill: 'Contextualization', minutes: 5,
      heading: 'Local and Odd',
      body: 'Two stories nobody in Washington is covering.',
      move: 'Most of history happened in places the size of Zionsville, to people no wire service was watching. <strong>The strange story is not a break from the work.</strong> Historians read court records and joke books for the same reason: that is where the assumptions people never bothered to write down leak out.',
      links: links,
      groups: [],
      fields: [
        { id: 'local-story', type: 'area', target: 40,
          label: 'One top local story, and why it matters to somebody',
          hint: 'Name a person or a group this actually changes something for.',
          placeholder: '' },
        { id: 'local-odd', type: 'area', target: 40,
          label: 'The oddest or funniest story you can find anywhere',
          hint: 'Then one line: what does it take for granted? Every joke assumes something about the world it lands in.',
          placeholder: '' }
      ]
    };
  }

  function stationDesk() {
    return {
      label: 'Station 09', skill: 'Claims & Thesis', minutes: 6,
      heading: 'Your Desk',
      body: 'Your story. Anything you actually care about, from anywhere in the world.',
      move: 'End with a claim, not a summary. <strong>"So what" is the only question a thesis ever answers</strong>, and it is the question a summary never gets around to.',
      groups: [],
      fields: [
        { id: 'desk-story', type: 'line',
          label: 'Headline, outlet, and link', placeholder: '' },
        { id: 'desk-summary', type: 'area', target: 45,
          label: 'What happened, in your own words',
          placeholder: '' },
        { id: 'desk-sowhat', type: 'area', target: 30,
          label: 'So what? One sentence, arguable, no hedging.',
          hint: 'Arguable means a reasonable person could disagree with it. If nobody could, it is a fact, not a claim.',
          placeholder: '' }
      ]
    };
  }

  var STATION_BUILDERS = {
    frontpage:   stationFrontPage,
    beats:       stationBeats,
    briefing:    stationBriefing,
    hook:        stationHook,
    causation:   stationCausation,
    reliability: stationReliability,
    pulse:       stationPulse,
    local:       stationLocal,
    desk:        stationDesk
  };

  // The closing ritual, always on, never a station. One sentence to end the hour.
  var CLOSING_FIELD = {
    id: 'wire-sentence', type: 'area', target: 25,
    label: 'Everything you read today, in one sentence.',
    hint: 'A wire lede is one sentence long and carries the whole story. Write today as one.',
    placeholder: ''
  };

  // ── Persistence ────────────────────────────────────────────────────────────
  var EDITION_ID = (CE && CE.edition && CE.edition.id) || 'unfiled';
  var KEY_PREFIX = 'behistorical-current-events-' + EDITION_ID + '-';
  var FIELD_INDEX = {};       // id -> { label, station, prompt }
  var FIELD_ORDER = [];       // ids in the order they appear on the page
  var saveTimer = null;

  function storageKey(id) { return KEY_PREFIX + id; }

  function readStored(id) {
    try { return localStorage.getItem(storageKey(id)) || ''; } catch (e) { return ''; }
  }

  function writeStored(id, value) {
    try {
      if (value) localStorage.setItem(storageKey(id), value);
      else localStorage.removeItem(storageKey(id));
      return true;
    } catch (e) { return false; }
  }

  function markSaved(ok) {
    var n = byId('save-state');
    if (!n) return;
    if (!ok) {
      n.textContent = 'Not saving on this device';
      n.classList.remove('is-saved');
      return;
    }
    var t = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    n.textContent = 'Saved ' + t;
    n.classList.add('is-saved');
  }

  // Autosave on typing, debounced. The lesson pages learned this the hard way:
  // persistence that waits for a Save button loses everything on a closed tab.
  function scheduleSave(id, value) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { markSaved(writeStored(id, value)); }, 400);
  }

  // ── Progress ───────────────────────────────────────────────────────────────
  function refreshProgress() {
    var done = 0;
    FIELD_ORDER.forEach(function (id) {
      var n = byId(id);
      if (n && String(n.value || '').trim()) done++;
    });
    var total = FIELD_ORDER.length || 1;
    var pct = Math.round((done / total) * 100);

    var count = byId('meter-count');
    var fill = byId('meter-fill');
    var track = byId('meter-track');
    if (count) count.textContent = done + ' of ' + FIELD_ORDER.length + ' filled';
    if (fill) fill.style.width = pct + '%';
    if (track) track.setAttribute('aria-valuenow', String(pct));
  }

  // footNode is passed at build time, when the field is not in the document yet
  // and a lookup by id would return null. That silently left every word target
  // invisible until the student typed the first character.
  function refreshCount(field, node, footNode) {
    var foot = footNode || byId(field.id + '-count');
    if (!foot) return;
    var w = words(node.value);
    foot.textContent = w + (w === 1 ? ' word' : ' words') + (field.target ? ' / ' + field.target + ' target' : '');
    foot.classList.toggle('is-met', !!field.target && w >= field.target);
  }

  // ── Field rendering ────────────────────────────────────────────────────────
  function buildField(field, stationName) {
    var wrap = el('div', 'field');

    if (field.label) {
      var label = el('label', 'field-label', field.label);
      label.setAttribute('for', field.id);
      wrap.appendChild(label);
    }
    if (field.hint) wrap.appendChild(el('span', 'field-hint', field.hint));

    var countNode = null;
    var input;
    if (field.type === 'select') {
      input = el('select', 'ce-select');
      var blank = el('option', null, 'Choose one');
      blank.value = '';
      input.appendChild(blank);
      (field.options || []).forEach(function (opt) {
        var o = el('option', null, opt);
        o.value = opt;
        input.appendChild(o);
      });
    } else if (field.type === 'area') {
      input = el('textarea', 'ce-area' + (field.tall ? ' tall' : ''));
      input.rows = field.tall ? 6 : 4;
    } else {
      input = el('input', 'ce-input');
      input.type = 'text';
    }

    input.id = field.id;
    input.name = field.id;
    if (field.placeholder) input.placeholder = field.placeholder;
    input.value = readStored(field.id);

    wrap.appendChild(input);

    if (field.type === 'area') {
      var foot = el('div', 'field-foot');
      countNode = el('span', 'count');
      countNode.id = field.id + '-count';
      foot.appendChild(countNode);
      wrap.appendChild(foot);
    }

    input.addEventListener('input', function () {
      scheduleSave(field.id, input.value);
      if (field.type === 'area') refreshCount(field, input, countNode);
      refreshProgress();
    });
    input.addEventListener('change', function () {
      markSaved(writeStored(field.id, input.value));
      refreshProgress();
    });
    input.addEventListener('blur', function () {
      markSaved(writeStored(field.id, input.value));
    });

    FIELD_ORDER.push(field.id);
    FIELD_INDEX[field.id] = {
      label: field.label || 'Response',
      hint: field.hint || '',
      station: stationName
    };

    if (field.type === 'area') refreshCount(field, input, countNode);
    return wrap;
  }

  function buildRowCard(group, stationName) {
    var card = el('div', 'row-card');
    var head = el('div', 'row-head');

    var left = el('div');
    left.appendChild(el('div', 'row-name', group.row.name));
    if (group.row.note) left.appendChild(el('span', 'field-hint', group.row.note));
    head.appendChild(left);

    if (group.row.theme) {
      head.appendChild(el('span', 'chip theme', group.row.theme));
    }
    if (group.row.url) {
      var a = el('a', 'row-open', 'Open');
      a.href = group.row.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      head.appendChild(a);
    }
    card.appendChild(head);

    var grid = el('div', 'row-grid' + (group.fields.length === 1 ? ' single' : ''));
    // A row of two mixed inputs reads better stacked: the textarea in a beat
    // row needs the full width, so any group holding one drops to a single column.
    if (group.fields.some(function (f) { return f.type === 'area'; })) grid.className = 'row-grid single';
    group.fields.forEach(function (f) { grid.appendChild(buildField(f, stationName)); });
    card.appendChild(grid);
    return card;
  }

  function buildPinned(item, stationName) {
    var card = el('div', 'pinned');
    card.appendChild(el('div', 'pinned-source', item.source));
    card.appendChild(el('div', 'pinned-title', item.title));

    if (item.url) {
      var row = el('div', 'row-head');
      var a = el('a', 'row-open', 'Read the article');
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      row.appendChild(a);
      if (item.skill) row.appendChild(el('span', 'chip skill', item.skill));
      card.appendChild(row);
    }

    card.appendChild(el('div', 'pinned-q', item.question));
    var field = item.field;
    field.label = '';
    card.appendChild(buildField(field, stationName));
    FIELD_INDEX[field.id].label = item.question;
    return card;
  }

  function buildStation(def, index) {
    var sec = el('section', 'station');
    sec.id = 'station-' + (index + 1);

    sec.appendChild(el('div', 'station-number', String(index + 1).padStart(2, '0')));

    var eyebrow = el('div', 'station-eyebrow');
    eyebrow.appendChild(el('span', 'station-label', def.label));
    if (def.skill) eyebrow.appendChild(el('span', 'chip skill', def.skill));
    if (def.minutes) eyebrow.appendChild(el('span', 'chip clock', '~' + def.minutes + ' min'));
    sec.appendChild(eyebrow);

    sec.appendChild(el('h2', 'station-heading', def.heading));
    if (def.body) sec.appendChild(el('p', 'station-body', def.body));

    if (def.move) {
      var move = el('div', 'the-move');
      move.appendChild(el('div', 'move-label', "The historian's move"));
      var p = el('p');
      // def.move is authored in this file and carries one <strong>. It is never
      // student input and never edition-file input.
      p.innerHTML = def.move;
      move.appendChild(p);
      sec.appendChild(move);
    }

    if (def.links && def.links.length) {
      var deck = el('div', 'wire-grid');
      deck.style.marginBottom = '1.1rem';
      def.links.forEach(function (l) {
        var a = el('a', 'wire-link');
        a.href = safeUrl(l.url);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.appendChild(el('span', 'wl-name', l.name));
        if (l.note) a.appendChild(el('span', 'wl-note', l.note));
        deck.appendChild(a);
      });
      sec.appendChild(deck);
    }

    (def.pinned || []).forEach(function (item) { sec.appendChild(buildPinned(item, def.heading)); });
    (def.groups || []).forEach(function (g) { sec.appendChild(buildRowCard(g, def.heading)); });
    (def.fields || []).forEach(function (f) { sec.appendChild(buildField(f, def.heading)); });

    return sec;
  }

  // ── Masthead and wire deck ─────────────────────────────────────────────────

  // Which stations actually run, resolved once so the masthead, the time
  // budget and the page itself can never disagree with each other.
  function plannedStations() {
    return ((CE.stations && CE.stations.length) ? CE.stations : Object.keys(STATION_BUILDERS))
      .filter(function (key) { return STATION_BUILDERS[key]; });
  }

  function plannedMinutes() {
    return plannedStations().reduce(function (sum, key) {
      return sum + (STATION_BUILDERS[key]().minutes || 0);
    }, 0);
  }

  function renderMasthead() {
    var ed = CE.edition || {};
    var host = byId('masthead');
    if (!host) return;

    host.appendChild(el('div', 'mast-eyebrow', 'BeHistorical, AP World History'));

    var mark = el('h1', 'mast-wordmark');
    mark.innerHTML = 'Be<em>Current</em>';
    host.appendChild(mark);

    // Three items only when all three have content: an empty span still takes a
    // slot in the flex row and pushes the dateline off centre.
    var minutes = plannedMinutes();
    var rule = el('div', 'mast-rule');
    [ [ed.label, ed.title].filter(Boolean).join(' · '),
      ed.dateline || '',
      minutes ? minutes + ' minute desk' : ''
    ].filter(Boolean).forEach(function (t) { rule.appendChild(el('span', null, t)); });
    host.appendChild(rule);

    if (ed.deck) host.appendChild(el('p', 'mast-deck', ed.deck));

    var tags = el('div', 'skill-tags');
    ['Sourcing', 'Contextualization', 'Causation', 'Continuity and Change', 'Argumentation']
      .forEach(function (t) { tags.appendChild(el('span', 'skill-tag', t)); });
    host.appendChild(tags);

    document.title = 'BeCurrent | ' + [ed.title, ed.dateline].filter(Boolean).join(', ');
  }

  function renderWireDeck() {
    var host = byId('wire-deck-grid');
    if (!host) return;
    // Chart links are held back and rendered inside the Culture Pulse instead,
    // where they are actually used. Everything else is general purpose.
    (CE.outlets || []).forEach(function (o) {
      var url = safeUrl(o.url);
      if (!url || o.group === 'chart') return;
      var a = el('a', 'wire-link');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.appendChild(el('span', 'wl-name', o.name));
      if (o.note) a.appendChild(el('span', 'wl-note', o.note));
      host.appendChild(a);
    });
  }

  // ── Copy All My Work ───────────────────────────────────────────────────────
  //
  // Same contract as the lesson pages: two clipboard flavours, html so Canvas
  // keeps the bold, plain text as the fallback for anything that refuses html.
  function collectWork() {
    var out = [];
    var lastStation = null;
    FIELD_ORDER.forEach(function (id) {
      var node = byId(id);
      var value = node ? String(node.value || '').trim() : readStored(id).trim();
      if (!value) return;
      var meta = FIELD_INDEX[id] || {};
      out.push({
        station: meta.station !== lastStation ? meta.station : null,
        label: meta.label,
        text: value
      });
      lastStation = meta.station;
    });
    return out;
  }

  function paragraphs(text) {
    return String(text).split(/\n{2,}/).map(function (b) {
      return '<p>' + esc(b.trim()).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function buildWorkDocument() {
    var work = collectWork();
    if (!work.length) return null;

    var ed = CE.edition || {};
    var head = 'AP World History, BeCurrent';
    var sub = [ed.label, ed.title, ed.dateline].filter(Boolean).join(', ');
    var stamp = new Date().toLocaleString();

    var html = '<div><p><strong>' + esc(head) + '</strong>'
      + (sub ? '<br><strong>' + esc(sub) + '</strong>' : '')
      + '</p><p><em>Student work, copied ' + esc(stamp) + '</em></p><hr>';

    html += work.map(function (w) {
      return (w.station ? '<p><strong>' + esc(w.station) + '</strong></p>' : '')
        + (w.label ? '<p><em>' + esc(w.label) + '</em></p>' : '')
        + paragraphs(w.text);
    }).join('');
    html += '</div>';

    var plain = [head.toUpperCase(), sub, 'Student work, copied ' + stamp, '']
      .filter(Boolean)
      .concat(work.map(function (w) {
        return [w.station ? '\n== ' + w.station.toUpperCase() + ' ==' : '',
                w.label ? w.label : '',
                w.text, ''].filter(Boolean).join('\n');
      }))
      .join('\n');

    return { html: html, plain: plain, count: work.length };
  }

  function say(message) {
    var n = byId('handoff-result');
    if (n) n.textContent = message;
  }

  function gatherWork() {
    var out = byId('work-output');
    if (!out) return null;
    var doc = buildWorkDocument();
    if (!doc) {
      out.innerHTML = '';
      out.dataset.plain = '';
      say('Nothing typed yet. Work through the stations, then gather your work.');
      return null;
    }
    out.innerHTML = doc.html;
    out.dataset.plain = doc.plain;
    say('Gathered ' + doc.count + ' response' + (doc.count === 1 ? '' : 's') + '. Copy this, then paste it into Canvas.');
    return doc;
  }

  function selectOutput(out) {
    try {
      var range = document.createRange();
      range.selectNodeContents(out);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      return true;
    } catch (e) { return false; }
  }

  function copyFallback() {
    var out = byId('work-output');
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (e) { copied = false; }
    if (copied) { say('Copied with formatting. Paste it into the Canvas assignment.'); return; }
    if (navigator.clipboard && navigator.clipboard.writeText && out) {
      navigator.clipboard.writeText(out.dataset.plain || out.textContent || '')
        .then(function () { say('Copied as plain text. Paste it into the Canvas assignment.'); })
        .catch(function () { say('Copy blocked by the browser. The work is selected above, press Ctrl and C.'); });
    } else {
      say('Copy blocked by the browser. The work is selected above, press Ctrl and C.');
    }
  }

  function copyWork() {
    var out = byId('work-output');
    if (!out) return;
    // Always rebuild from the live fields. Reusing whatever an earlier Gather
    // left on screen silently drops every answer typed after that press, and
    // still reports a successful copy, so the student pastes a short version of
    // their work into Canvas with nothing on the page saying so.
    var doc = gatherWork();
    if (!doc) return;

    selectOutput(out);

    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([doc.html], { type: 'text/html' }),
        'text/plain': new Blob([doc.plain], { type: 'text/plain' })
      })])
        .then(function () { say('Copied with formatting. Paste it into the Canvas assignment.'); })
        .catch(copyFallback);
    } else {
      copyFallback();
    }
  }

  function clearEdition() {
    if (!window.confirm('Clear every answer on this edition? This cannot be undone.')) return;
    FIELD_ORDER.forEach(function (id) {
      writeStored(id, '');
      var n = byId(id);
      if (n) {
        n.value = '';
        if (n.tagName === 'TEXTAREA') n.dispatchEvent(new Event('input'));
      }
    });
    var out = byId('work-output');
    if (out) { out.innerHTML = ''; out.dataset.plain = ''; }
    say('Cleared.');
    refreshProgress();
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  function boot() {
    if (!CE) {
      var host = byId('stations');
      if (host) {
        host.appendChild(el('section', 'station',
          'The edition file did not load. Check that assets/data/current-events-edition.js is present.'));
      }
      return;
    }

    renderMasthead();
    renderWireDeck();

    var host = byId('stations');
    var rendered = 0;
    plannedStations().forEach(function (key) {
      var def = STATION_BUILDERS[key]();
      // Station numbers follow the page, not the catalogue, so a week running
      // five stations reads 01 to 05 rather than 01, 02, 04, 07, 09.
      def.label = 'Station ' + String(rendered + 1).padStart(2, '0');
      host.appendChild(buildStation(def, rendered));
      rendered++;
    });

    var closing = byId('closing-field');
    if (closing) closing.appendChild(buildField(CLOSING_FIELD, 'Closing wire'));

    var budget = byId('time-budget');
    var minutes = plannedMinutes();
    if (budget && minutes) budget.textContent = 'Roughly ' + minutes + ' minutes of work at this setting.';

    var gather = byId('btn-gather');
    var copy = byId('btn-copy');
    var print = byId('btn-print');
    var clear = byId('btn-clear');
    if (gather) gather.addEventListener('click', gatherWork);
    if (copy) copy.addEventListener('click', copyWork);
    if (print) print.addEventListener('click', function () { window.print(); });
    if (clear) clear.addEventListener('click', clearEdition);

    refreshProgress();

    // If anything was restored from a previous sitting, say so rather than
    // leaving the rail reading as though nothing is stored.
    var restored = FIELD_ORDER.some(function (id) { return readStored(id); });
    if (restored) markSaved(true);
    else {
      var n = byId('save-state');
      if (n) n.textContent = 'Autosaves as you type';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
