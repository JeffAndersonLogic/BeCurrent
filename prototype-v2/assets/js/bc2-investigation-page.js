/* =========================================================
   THE INVESTIGATION PAGE

   Renders every section of an investigation from its content model.
   Nothing in this file names Iran: a second investigation is a content
   file, not a second copy of this code. That is the difference between
   a publishing system and a bespoke microsite, and it is the whole
   reason the visual ambition is affordable for one teacher.

   ORDER IS PEDAGOGY, and two placements are load-bearing:

     · The PREDICTION comes before any history. If a student reads the
       explanation first, the reflection at the end has nothing to
       compare against and the Reverse History structure collapses into
       an ordinary lesson with a quiz on it.
     · The EVIDENCE CHECK comes after the trace and before the claim.
       Sorting reporting from interpretation is the skill the claim then
       has to use, so meeting it after writing the claim is too late.

   NO STUDENT TEXT EVER REACHES innerHTML. Student writing goes to
   textContent, everywhere, without exception. It is also never sent
   anywhere: there is no fetch, no XHR and no form in this file, and
   validate.js fails the build if one appears.
   ========================================================= */
(function () {
  'use strict';

  var C = window.BC2;
  var S = window.BC2Store;
  var esc = C.esc;

  /* ── TODAY: the event anchor ──────────────────────────────────── */
  function renderToday(inv) {
    var cur = inv.current;

    var facts = cur.developments.map(function (d) {
      var src = inv.sources[d.src];
      return '<li>'
        + '<span class="af-date">' + esc(d.date) + '</span>'
        + '<p class="af-text">' + esc(d.text) + '</p>'
        + (d.disputed
            ? '<p class="af-text" style="margin-top:7px;font-size:.87rem;color:var(--graphite)">'
              + '<strong>Reported differently elsewhere:</strong> ' + esc(d.disputed) + '</p>'
            : '')
        + (src ? '<span class="af-src">' + C.extLink(src.url, src.org) + '</span>' : '')
        + '</li>';
    }).join('');

    return '<div class="anchor-grid">'
      + '<div>'
      +   '<p class="eyebrow" style="color:var(--graphite);margin-bottom:14px">What has happened, most recent first</p>'
      +   '<ul class="anchor-facts">' + facts + '</ul>'
      + '</div>'
      + '<div>'
      +   '<div class="freshness">'
      +     '<p class="fr-head">How current is this?</p>'
      +     '<p>Checked <span class="fr-date">' + esc(cur.asOfLabel) + '</span>.</p>'
      +     '<p>' + esc(cur.status) + '</p>'
      +     '<p style="color:var(--steel-text);font-size:.82rem">A live conflict changes faster than a webpage. If today’s date is well past the one above, check the sources at the bottom before you rely on anything here.</p>'
      +   '</div>'
      + '</div>'
      + '</div>';
  }

  /* ── The figures. Each names who counted, and the note about why
        they disagree is content rather than a caveat in small print. ── */
  function renderFigures(inv) {
    var cur = inv.current;
    var nums = cur.figures.map(function (f) {
      var src = inv.sources[f.src];
      return '<div class="bignum">'
        + '<span class="bn-fig">' + esc(f.fig)
        +   (f.unit ? '<span class="bn-unit">' + esc(f.unit) + '</span>' : '')
        + '</span>'
        + '<p>' + esc(f.text) + '</p>'
        + (src ? '<span class="bn-src">' + C.extLink(src.url, src.org) + '</span>' : '')
        + '</div>';
    }).join('');

    /* The counting note is for students, not a footnote for the teacher:
       that the figures disagree IS the lesson here, so it is set as
       prose in the flow rather than tucked into small print. */
    return '<div class="bignum-row">' + nums + '</div>'
      + '<p class="prose" style="margin-top:34px;color:var(--platinum);max-width:62ch">'
      +   esc(cur.countingNote) + '</p>'
      + '<div class="teacher-note" data-teacher-only style="margin-top:30px">'
      +   '<p class="tn-head">Teacher note · using the disagreement</p>'
      +   '<p>Ask the room to find the largest gap between two figures above and say who produced each. The gap between a government’s count and an independent monitor’s is the fastest way into source evaluation that this unit has, and it needs no preamble.</p>'
      +   '<p>Resist resolving it. There is no correct number to land on, and offering one would teach the opposite of the point.</p>'
      + '</div>';
  }

  /* ── WHY: the prediction, before anything is explained ────────── */
  function renderPrediction(inv) {
    var p = inv.prediction;
    var opts = p.options.map(function (o) {
      return '<label class="pick">'
        + '<input type="checkbox" name="prediction" value="' + esc(o.id) + '">'
        + '<span class="pick-face"><span class="pick-box" aria-hidden="true"></span>'
        + esc(o.label) + '</span>'
        + '</label>';
    }).join('');

    return '<p class="predict-stop">' + esc(p.stop) + '</p>'
      + '<p class="predict-q">' + esc(p.question) + '</p>'
      + '<fieldset class="predict-options">'
      +   '<legend>' + esc(p.legend) + '</legend>'
      +   opts
      + '</fieldset>'
      + '<p class="predict-saved" id="predict-saved" role="status"></p>';
  }

  function wirePrediction(inv) {
    var key = 'predict:' + inv.id;
    var boxes = Array.prototype.slice.call(document.querySelectorAll('input[name="prediction"]'));
    var note = document.getElementById('predict-saved');
    var saved = S.get(key, null);

    if (saved && saved.picked) {
      boxes.forEach(function (b) { b.checked = saved.picked.indexOf(b.value) !== -1; });
      note.textContent = 'Saved on this device.';
    }

    function persist() {
      var picked = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
      var ok = S.set(key, { picked: picked, at: new Date().toISOString() });
      note.textContent = ok
        ? (picked.length ? 'Saved. You’ll see this again at the end.' : 'Nothing selected yet.')
        : 'Could not save on this device. Your answers will not be remembered, but you can still work through the page.';
    }

    boxes.forEach(function (b) { b.addEventListener('change', persist); });
  }

  /* ── Geography. The map dominates; the text yields to it. ─────── */
  function renderGeography(inv) {
    var g = inv.geography;
    var points = g.points.map(function (pt) {
      return '<li><span class="mp-name">' + esc(pt.name) + '</span><p>' + esc(pt.text) + '</p></li>';
    }).join('');

    return '<div class="map-feature">'
      + '<div>'
      +   '<figure style="margin:0">'
      +     '<div class="map-frame"><img src="' + esc(g.map) + '" alt="' + esc(g.mapAlt) + '"></div>'
      +     '<figcaption class="map-caption">' + esc(g.caption) + '</figcaption>'
      +   '</figure>'
      + '</div>'
      + '<div><ul class="map-points">' + points + '</ul></div>'
      + '</div>';
  }

  /* ── The 1979 feature, full width and dark. ───────────────────── */
  function renderFeature(inv) {
    var f = inv.feature;
    var node = null;
    inv.history.nodes.forEach(function (n) { if (n.id === f.nodeId) node = n; });
    if (!node) return '';

    var media = '<div class="tp-media">'
      + (f.plate ? '<img src="' + esc(f.plate) + '" alt="" aria-hidden="true">' : '')
      + (f.photo ? '<img src="' + esc(f.photo) + '" alt="" aria-hidden="true" onerror="this.remove()">' : '')
      + '</div>';

    var lines = f.headline.map(function (l) { return '<span>' + esc(l) + '</span>'; }).join('');
    var body = node.body.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');

    var q = f.quote;
    var qsrc = inv.sources[q.src];
    var quote = '<figure class="pullquote">'
      + '<blockquote>“' + esc(q.text) + '”</blockquote>'
      + '<figcaption>' + esc(q.attribution)
      +   (qsrc ? ' · ' + C.extLink(qsrc.url, qsrc.org) : '') + '</figcaption>'
      + '</figure>';

    return '<div class="tp">'
      + media
      + '<div class="tp-inner"><div class="wrap">'
      +   '<p class="tp-year" aria-hidden="true">' + esc(node.year) + '</p>'
      +   '<h2 class="tp-headline">' + lines + '</h2>'
      +   '<p class="tp-dateline">' + esc(f.dateline) + '</p>'
      +   '<div class="tp-body">' + body
      +     (node.why ? '<p style="color:var(--frosted)">' + esc(node.why) + '</p>' : '')
      +   '</div>'
      +   quote
      + '</div></div>'
      + '</div>';
  }

  /* ── The primary source, set as a document. ───────────────────── */
  function renderPrimarySource(inv) {
    var ps = inv.primarySource;
    var d = ps.doc;
    var src = inv.sources[d.src];

    var paras = d.paragraphs.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

    var doc = '<div class="doc">'
      + '<div class="doc-head">'
      +   '<span class="doc-kind">' + esc(d.kind) + '</span>'
      +   '<span>' + esc(d.origin) + '</span>'
      +   '<span>' + esc(d.date) + '</span>'
      +   '<span>' + esc(d.classification) + '</span>'
      + '</div>'
      + '<div class="doc-body">' + paras + '</div>'
      + '<p class="doc-foot">' + esc(d.foot)
      +   (src ? ' ' + C.extLink(src.url, 'Read it at the National Security Archive') : '') + '</p>'
      + '</div>';

    var asks = ps.questions.map(function (q) {
      return '<div class="write">'
        + '<label for="' + esc(q.id) + '">' + esc(q.label) + '</label>'
        + '<p class="write-help">' + esc(q.help) + '</p>'
        + '<textarea id="' + esc(q.id) + '" data-save="' + esc(q.id) + '"></textarea>'
        + '<p class="save-state" data-save-state="' + esc(q.id) + '" role="status"></p>'
        + '</div>';
    }).join('');

    return doc
      + '<div class="doc-ask"><p class="da-head">Work with the document</p>' + asks + '</div>';
  }

  /* ── Evidence: reporting or interpretation. ───────────────────── */
  function renderEvidence(inv) {
    var e = inv.evidence;
    var items = e.items.map(function (it) {
      return '<li class="ev-item" data-ev="' + esc(it.id) + '">'
        + '<p class="ev-stmt">' + esc(it.text) + '</p>'
        + '<div class="ev-buttons" role="group" aria-label="Your answer">'
        +   '<button type="button" data-choice="reporting" aria-pressed="false">Reporting</button>'
        +   '<button type="button" data-choice="interpretation" aria-pressed="false">Interpretation</button>'
        + '</div>'
        + '<p class="ev-why" hidden></p>'
        + '</li>';
    }).join('');

    return '<p class="prose" style="margin-bottom:22px">' + esc(e.instructions) + '</p>'
      + '<ul class="ev-list">' + items + '</ul>'
      + '<p class="ev-score" id="ev-score" role="status"></p>';
  }

  function wireEvidence(inv) {
    var e = inv.evidence;
    var key = 'evidence:' + inv.id;
    var saved = S.get(key, {});
    var scoreEl = document.getElementById('ev-score');

    function byId(id) {
      var found = null;
      e.items.forEach(function (x) { if (x.id === id) found = x; });
      return found;
    }

    function paint(li, id, choice) {
      var item = byId(id);
      if (!item) return;
      var right = (choice === item.answer);
      li.setAttribute('data-state', right ? 'right' : 'wrong');

      li.querySelectorAll('[data-choice]').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-choice') === choice ? 'true' : 'false');
      });

      var why = li.querySelector('.ev-why');
      /* Built as elements rather than an HTML string because the verdict
         and the reasoning are separate for screen readers, and because
         it keeps this path free of innerHTML entirely. */
      why.textContent = '';
      var verdict = document.createElement('span');
      verdict.className = 'evw-verdict';
      verdict.textContent = right
        ? 'Yes — this is ' + item.answer + '.'
        : 'Not quite. This is ' + item.answer + '.';
      why.appendChild(verdict);
      why.appendChild(document.createTextNode(item.why));
      why.hidden = false;
    }

    function score() {
      var done = 0, right = 0;
      e.items.forEach(function (it) {
        if (saved[it.id]) { done++; if (saved[it.id] === it.answer) right++; }
      });
      scoreEl.textContent = done
        ? done + ' of ' + e.items.length + ' sorted · ' + right + ' matched on the first look you kept.'
        : '';
    }

    document.querySelectorAll('.ev-item').forEach(function (li) {
      var id = li.getAttribute('data-ev');
      if (saved[id]) paint(li, id, saved[id]);

      li.querySelectorAll('[data-choice]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var choice = btn.getAttribute('data-choice');
          saved[id] = choice;
          S.set(key, saved);
          paint(li, id, choice);
          score();
        });
      });
    });

    score();
  }

  /* ── Perspectives. Verification is held separate and last. ────── */
  function renderPerspectives(inv) {
    var p = inv.current.perspectives;

    var sides = p.sides.map(function (s) {
      var pts = s.points.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
      return '<div class="persp-side"><p class="ps-who">' + esc(s.who) + '</p><ul>' + pts + '</ul></div>';
    }).join('');

    // RAW on purpose: verify points carry <strong> to mark what is and
    // is not checkable, which is the whole point of the panel.
    var vpts = p.verify.points.map(function (x) { return '<li>' + x + '</li>'; }).join('');

    return '<div class="persp">'
      + sides
      + '<div class="persp-verify"><p class="pv-head">' + esc(p.verify.head) + '</p><ul>' + vpts + '</ul></div>'
      + '</div>';
  }

  /* ── The claim. ───────────────────────────────────────────────── */
  function renderClaim(inv) {
    var c = inv.claim;
    // RAW on purpose: frame steps carry <strong>.
    var steps = c.frame.map(function (f) { return '<li>' + f + '</li>'; }).join('');

    return '<div class="claim-frame">'
      +   '<p class="cf-head">What a defensible claim has in it</p>'
      +   '<ol>' + steps + '</ol>'
      + '</div>'
      + '<div class="write">'
      +   '<label for="' + esc(c.field.id) + '">' + esc(c.field.label) + '</label>'
      +   '<p class="write-help">' + esc(c.field.help) + '</p>'
      +   '<textarea id="' + esc(c.field.id) + '" data-save="' + esc(c.field.id) + '"></textarea>'
      +   '<p class="save-state" data-save-state="' + esc(c.field.id) + '" role="status"></p>'
      + '</div>'
      /* The coach is a visible placeholder, and it says plainly that it
         is not connected. A button wired to another course's MagicSchool
         room would put students in the wrong bot, which is worse than a
         button that does nothing and admits it. */
      + '<div class="coach-slot">'
      +   '<p class="cs-head">' + esc(c.coach.name) + '</p>'
      +   '<p>' + esc(c.coach.note) + '</p>'
      +   '<button type="button" class="btn-quiet" disabled>Ask for one question</button>'
      +   '<p style="margin-top:11px;font-size:.82rem;color:var(--graphite)">' + esc(c.coach.status) + '</p>'
      + '</div>';
  }

  /* ── The return to the prediction. ────────────────────────────── */
  function renderReflection(inv) {
    var r = inv.reflection;
    var prompts = r.prompts.map(function (q) {
      return '<div class="write">'
        + '<label for="' + esc(q.id) + '">' + esc(q.label) + '</label>'
        + '<p class="write-help">' + esc(q.help) + '</p>'
        + '<textarea id="' + esc(q.id) + '" data-save="' + esc(q.id) + '"></textarea>'
        + '<p class="save-state" data-save-state="' + esc(q.id) + '" role="status"></p>'
        + '</div>';
    }).join('');

    return '<div class="recall" id="recall"></div>'
      + '<div style="margin-top:30px">' + prompts + '</div>';
  }

  function paintRecall(inv) {
    var el = document.getElementById('recall');
    if (!el) return;
    var saved = S.get('predict:' + inv.id, null);
    var labels = {};
    inv.prediction.options.forEach(function (o) { labels[o.id] = o.label; });

    var head = '<p class="rc-head">Before you read anything, you said</p>';

    if (!saved || !saved.picked || !saved.picked.length) {
      el.innerHTML = head
        + '<p class="rc-you rc-empty">You didn’t record a prediction on this device.</p>'
        + '<p style="font-size:.92rem;color:var(--graphite);margin:10px 0 0">'
        + 'Answer the two questions below from what you think now, and say what you would have guessed before.</p>';
      return;
    }

    var chips = saved.picked.map(function (id) {
      return '<li>' + esc(labels[id] || id) + '</li>';
    }).join('');

    el.innerHTML = head
      + '<p class="rc-you">You picked ' + saved.picked.length
      +   (saved.picked.length === 1 ? ' explanation.' : ' explanations.') + '</p>'
      + '<ul class="recall-chips">' + chips + '</ul>'
      + '<p style="font-size:.95rem;color:var(--graphite);margin:0">'
      + 'You were not expected to be right. The question is what the evidence did to it.</p>';
  }

  /* ── Autosaving textareas, one wiring for all of them. ────────── */
  function wireWriting(inv) {
    document.querySelectorAll('textarea[data-save]').forEach(function (el) {
      var field = el.getAttribute('data-save');
      var note = document.querySelector('[data-save-state="' + field + '"]');
      S.autosave(el, 'write:' + inv.id + ':' + field, function (ok, value) {
        if (!note) return;
        if (!ok) {
          note.textContent = 'Could not save on this device. Copy your answer somewhere safe before you leave this page.';
          return;
        }
        note.textContent = value.trim() ? 'Saved on this device.' : '';
      });
    });
  }

  /* ── Progress and the sticky navigator. ───────────────────────────
     A section counts as reached when it has actually been on screen,
     which is why this is an IntersectionObserver rather than a scroll
     handler firing on every pixel. Where a browser has no observer the
     page still works; it just does not remember where you were. */
  function wireProgress(inv) {
    var links = {};
    document.querySelectorAll('.inv-nav a').forEach(function (a) {
      links[a.getAttribute('href').replace('#', '')] = a;
    });

    var prog = S.progress(inv.id);
    inv.steps.forEach(function (s) {
      if (prog.reached.indexOf(s.id) !== -1 && links[s.id]) links[s.id].classList.add('nav-done');
    });

    if (!('IntersectionObserver' in window)) return;

    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;

        Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
        if (links[id]) {
          links[id].setAttribute('aria-current', 'true');
          links[id].classList.add('nav-done');
        }

        var isStep = inv.steps.some(function (s) { return s.id === id; });
        if (isStep) S.reach(inv.id, id);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    inv.steps.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (el) seen.observe(el);
    });
  }

  function renderNav(inv) {
    var items = inv.steps.map(function (s) {
      return '<li><a href="#' + esc(s.id) + '">' + esc(s.label) + '</a></li>';
    }).join('');
    return '<div class="wrap"><ol>' + items + '</ol></div>';
  }

  window.BC2InvestigationPage = {
    renderToday: renderToday,
    renderFigures: renderFigures,
    renderPrediction: renderPrediction,
    wirePrediction: wirePrediction,
    renderGeography: renderGeography,
    renderFeature: renderFeature,
    renderPrimarySource: renderPrimarySource,
    renderEvidence: renderEvidence,
    wireEvidence: wireEvidence,
    renderPerspectives: renderPerspectives,
    renderClaim: renderClaim,
    renderReflection: renderReflection,
    paintRecall: paintRecall,
    wireWriting: wireWriting,
    wireProgress: wireProgress,
    renderNav: renderNav
  };
})();
