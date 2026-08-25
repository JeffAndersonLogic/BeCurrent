/* =========================================================
   THE REVERSE HISTORY TIMELINE

   The signature interaction, and the one screen that has to carry the
   method by itself: we are moving BACKWARD, and each step back answers a
   question the step before it raised.

   DIRECTION IS THE WHOLE DESIGN. Today sits at the left. Travelling
   right goes further into the past, and the nodes recede as they go —
   smaller, dimmer, thinner rule — so "deeper" is legible before a single
   date is read. The connecting arrows point LEFT, back toward the
   present, because causation runs the other way from travel. A student
   holds two directions at once here and the visual language has to keep
   them apart, which is why travel is size and arrows are direction
   rather than both being colour.

   BUILT ON THE ARIA TABS PATTERN, deliberately. A timeline of buttons
   revealing one panel IS a tablist, and adopting the pattern means
   roving tabindex, arrow keys, Home and End, and the selected/panel
   relationship are all correct by construction rather than reinvented
   badly. Manual activation (arrows move, Enter or Space opens) rather
   than automatic, because each panel is a paragraph of real text and
   auto-loading it on every arrow press would flood a screen reader.

   NOTHING HERE IS HOVER-ONLY. Every hover state has a focus equivalent,
   because the primary device is a Chromebook and a fair number of these
   students navigate by keyboard.
   ========================================================= */
(function () {
  'use strict';

  var esc = window.BC2.esc;

  function threadTags(node, threads) {
    if (!node.threads || !node.threads.length) return '';
    var tags = node.threads.map(function (id) {
      var t = null;
      threads.forEach(function (x) { if (x.id === id) t = x; });
      return t ? '<li class="rh-thread-tag">' + esc(t.name) + '</li>' : '';
    }).join('');
    return '<ul class="rh-thread-tags">' + tags + '</ul>';
  }

  function panelHtml(node, threads, sources) {
    var body = node.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

    var why = node.why
      ? '<p class="rh-why">' + esc(node.why) + '</p>' : '';

    /* A contested link is shown as contested. A chain with no disputed
       joins has been tidied into propaganda, and this course is the last
       place that should happen. */
    var contested = node.contested
      ? '<p class="rh-why" style="border-left-color:var(--steel)"><strong>Historians disagree:</strong> '
        + esc(node.contested) + '</p>'
      : '';

    /* The question is the engine of Reverse History: it is what sends
       the student one step further back. The terminal node says so
       rather than pretending the chain ends. */
    var question = node.question
      ? '<div class="rh-next">'
        + '<p class="rh-next-label">' + (node.terminal ? 'The chain keeps going' : 'Which raises') + '</p>'
        + '<p class="rh-next-q">' + esc(node.question) + '</p>'
        + '</div>'
      : '';

    var cites = (node.sources || []).map(function (k) {
      var s = sources[k];
      return s ? '<li>' + window.BC2.extLink(s.url, s.org + ' — ' + s.title) + '</li>' : '';
    }).join('');

    return ''
      + '<div class="rh-panel-grid">'
      +   '<div>'
      +     '<p class="rh-when">' + esc(node.when) + '</p>'
      +     '<h3>' + esc(node.title) + '</h3>'
      +     body + why + contested
      +   '</div>'
      +   '<div>'
      +     question
      +     threadTags(node, threads)
      +     (cites ? '<p class="rh-cite-head">Sources</p><ul class="rh-cites">' + cites + '</ul>' : '')
      +   '</div>'
      + '</div>';
  }

  function render(mountId, hist, sources, opts) {
    var root = document.getElementById(mountId);
    if (!root) return null;
    opts = opts || {};

    var nodes = hist.nodes;
    var tabs = nodes.map(function (n, i) {
      return ''
        + '<button type="button" class="rh-node" role="tab"'
        +   ' id="rh-tab-' + esc(n.id) + '"'
        +   ' aria-controls="rh-panel"'
        +   ' aria-selected="false" tabindex="-1"'
        +   ' data-index="' + i + '"'
        +   ' data-now="' + (n.now ? 'true' : 'false') + '"'
        +   ' data-depth="' + i + '">'
        +   (i > 0 ? '<span class="rh-arrow" aria-hidden="true">&#9664;</span>' : '')
        +   '<span class="rh-year">' + esc(n.year) + '</span>'
        +   '<span class="rh-dot" aria-hidden="true"></span>'
        +   '<span class="rh-label">' + esc(n.label) + '</span>'
        + '</button>';
    }).join('');

    root.innerHTML = ''
      + '<div class="rh">'
      +   '<p class="rh-axis">'
      +     '<span>Today</span>'
      +     '<span class="rh-axis-back">Digging backward <span aria-hidden="true">&rarr;</span></span>'
      +   '</p>'
      +   '<div class="rh-track" role="tablist" aria-label="Reverse History timeline, present first"'
      +     ' aria-orientation="horizontal">' + tabs + '</div>'
      +   '<p class="rh-hint">Arrow keys move along the timeline. Enter or Space opens a turning point.</p>'
      +   '<div class="rh-panel" id="rh-panel" role="tabpanel" tabindex="0" hidden></div>'
      + '</div>';

    var tabEls = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panel = root.querySelector('#rh-panel');
    var selected = -1;

    function select(i, moveFocus) {
      if (i < 0 || i >= tabEls.length) return;
      selected = i;
      tabEls.forEach(function (t, n) {
        var on = (n === i);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      panel.innerHTML = panelHtml(nodes[i], hist.threads, sources);
      panel.setAttribute('aria-labelledby', tabEls[i].id);
      panel.hidden = false;
      if (moveFocus) tabEls[i].focus();
      if (opts.onSelect) opts.onSelect(nodes[i], i);
    }

    /* Roving focus. `focus` here means "which tab Tab lands on", which
       is not the same as which is selected: a student can arrow along
       the timeline reading the years without opening anything. */
    function focusTab(i) {
      if (i < 0 || i >= tabEls.length) return;
      tabEls.forEach(function (t, n) { t.setAttribute('tabindex', n === i ? '0' : '-1'); });
      tabEls[i].focus();
    }

    function currentFocusIndex() {
      var active = document.activeElement;
      for (var i = 0; i < tabEls.length; i++) if (tabEls[i] === active) return i;
      return selected < 0 ? 0 : selected;
    }

    tabEls.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });

      tab.addEventListener('keydown', function (e) {
        var at = currentFocusIndex();
        var handled = true;

        switch (e.key) {
          // Right and Down go further back, matching the visual order.
          case 'ArrowRight':
          case 'ArrowDown':  focusTab(Math.min(at + 1, tabEls.length - 1)); break;
          case 'ArrowLeft':
          case 'ArrowUp':    focusTab(Math.max(at - 1, 0)); break;
          case 'Home':       focusTab(0); break;
          case 'End':        focusTab(tabEls.length - 1); break;
          case 'Enter':
          case ' ':
          case 'Spacebar':   select(at, false); break;
          default:           handled = false;
        }

        if (handled) { e.preventDefault(); e.stopPropagation(); }
      });
    });

    // Today is open on arrival, because the investigation starts in the
    // present. Focus is NOT moved on load: stealing focus on page load
    // dumps a screen-reader user into the middle of the page.
    select(0, false);
    tabEls[0].setAttribute('tabindex', '0');

    return {
      select: select,
      open: function (nodeId) {
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].id === nodeId) { select(i, false); return true; }
        }
        return false;
      }
    };
  }

  window.BC2Timeline = { render: render };
})();
