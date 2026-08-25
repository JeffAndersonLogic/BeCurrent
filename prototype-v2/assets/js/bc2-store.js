/* =========================================================
   BC2 STORE — everything a student types, on their device only

   THERE IS NO NETWORK PATH OUT OF THIS FILE, and that is a hard
   contract, not an implementation detail. No request API of any kind, no
   form submission, no beacon, no image-pixel trick. Student writing
   reaches a teacher exactly one way in this course: the student copies
   it and pastes it into Canvas. validate.js fails the build if any of
   those appear on a student-facing page, and the prototype is inside
   that scan, which is why this comment names none of them literally.

   EVERY READ AND WRITE IS WRAPPED. localStorage throws rather than
   returning null in a surprising number of real conditions: Chrome with
   third-party cookies blocked inside an iframe, Safari private mode on
   older versions, a full quota, and school-managed profiles with site
   data disabled. A student whose storage is blocked must still be able
   to read the investigation and type into it — they lose persistence,
   not the lesson. So a failed read returns a default and a failed write
   is reported in the UI rather than thrown into the console.

   KEYS are namespaced `bc2:` so nothing here can collide with the
   production week pages' own brief keys. The prototype shares an origin
   with the live site on GitHub Pages, so it must never be able to read
   or overwrite real student work; validate.js asserts that this file
   contains no production key prefix at all.
   ========================================================= */
(function () {
  'use strict';

  var NS = 'bc2:';
  var available = null;   // resolved lazily, once

  function canStore() {
    if (available !== null) return available;
    try {
      var probe = NS + '__probe';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      available = true;
    } catch (e) {
      available = false;
    }
    return available;
  }

  function get(key, fallback) {
    if (!canStore()) return fallback;
    try {
      var raw = window.localStorage.getItem(NS + key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    if (!canStore()) return false;
    try {
      window.localStorage.setItem(NS + key, JSON.stringify(value));
      return true;
    } catch (e) {
      // Almost always quota. Report false; the caller tells the student.
      return false;
    }
  }

  function remove(key) {
    if (!canStore()) return false;
    try { window.localStorage.removeItem(NS + key); return true; }
    catch (e) { return false; }
  }

  /* Everything a student has typed, for My Work and for clearing. */
  function all() {
    var out = {};
    if (!canStore()) return out;
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(NS) === 0) {
          try { out[k.slice(NS.length)] = JSON.parse(window.localStorage.getItem(k)); }
          catch (e) { /* a value we did not write; skip it */ }
        }
      }
    } catch (e) { /* enumeration blocked; an empty map is the honest answer */ }
    return out;
  }

  function clearAll() {
    if (!canStore()) return false;
    var keys = [];
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(NS) === 0) keys.push(k);
      }
      keys.forEach(function (k) { window.localStorage.removeItem(k); });
      return true;
    } catch (e) { return false; }
  }

  /* ── Progress ───────────────────────────────────────────────────────
     "You're here", never a score. No XP, no streaks, no percentage
     complete: a percentage invites students to optimise the number, and
     the number is not the point. What is stored is which named steps
     have been reached and which one was last seen, so the site can say
     "you left off at Trace It Back" and offer the way back in. */
  function progress(investigationId) {
    return get('progress:' + investigationId, { reached: [], last: null, updated: null });
  }

  function reach(investigationId, stepId) {
    var p = progress(investigationId);
    if (p.reached.indexOf(stepId) === -1) p.reached.push(stepId);
    p.last = stepId;
    p.updated = new Date().toISOString();
    set('progress:' + investigationId, p);
    return p;
  }

  /* ── Mode ───────────────────────────────────────────────────────────
     Student or teacher. This is a VIEW preference and nothing more.
     This is a static site on GitHub Pages: everything teacher mode
     reveals is already in the page source, so it protects nothing and
     is not asked to. No answer keys are shipped, in either mode. */
  function mode() {
    var m = get('mode', 'student');
    return (m === 'teacher') ? 'teacher' : 'student';
  }

  function setMode(m) {
    var next = (m === 'teacher') ? 'teacher' : 'student';
    set('mode', next);
    applyMode(next);
    return next;
  }

  function applyMode(m) {
    document.body.setAttribute('data-mode', m);
    var buttons = document.querySelectorAll('[data-mode-btn]');
    for (var i = 0; i < buttons.length; i++) {
      var isOn = buttons[i].getAttribute('data-mode-btn') === m;
      buttons[i].setAttribute('aria-pressed', isOn ? 'true' : 'false');
    }
  }

  function wireModeToggle() {
    applyMode(mode());
    var buttons = document.querySelectorAll('[data-mode-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        setMode(e.currentTarget.getAttribute('data-mode-btn'));
      });
    }
  }

  /* ── Autosaving fields ──────────────────────────────────────────────
     Debounced, because a keystroke-per-write on a Chromebook with a
     slow disk is felt. 600ms is long enough to batch a burst of typing
     and short enough that a student who closes the tab mid-sentence
     keeps the sentence. `blur` flushes immediately so leaving the field
     is always a save point. */
  function autosave(el, key, onSaved) {
    if (!el) return;
    var timer = null;

    var stored = get(key, null);
    if (stored !== null && stored !== undefined) el.value = stored;

    function flush() {
      if (timer) { clearTimeout(timer); timer = null; }
      var ok = set(key, el.value);
      if (onSaved) onSaved(ok, el.value);
    }

    el.addEventListener('input', function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(flush, 600);
    });
    el.addEventListener('blur', flush);

    // A student who closes the tab mid-sentence keeps the sentence.
    window.addEventListener('pagehide', flush);
  }

  window.BC2Store = {
    available: canStore,
    get: get,
    set: set,
    remove: remove,
    all: all,
    clearAll: clearAll,
    progress: progress,
    reach: reach,
    mode: mode,
    setMode: setMode,
    applyMode: applyMode,
    wireModeToggle: wireModeToggle,
    autosave: autosave
  };
})();
