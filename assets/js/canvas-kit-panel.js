/* The Canvas copy tools inside a Midterms Run of Show: today's calendar event and
 * the topic's assignment.
 *
 * Reads window.BECURRENT_CANVAS_KIT, which scripts/build-canvas-events.js writes
 * from the same eventTable() and assignmentBody() as the docs/canvas/ paste
 * documents, and gives each one the calendar toolkit's three parts: a preview, copy
 * buttons, and the raw HTML in a field to select by hand.
 *
 * Two paths to the clipboard, as in the calendar toolkit: navigator.clipboard, then
 * selecting the field and asking the browser to copy the selection. If both refuse,
 * the text is left selected and the message says which keys to press. */
(function () {
  'use strict';
  var data = window.BECURRENT_CANVAS_KIT;
  function $(id) { return document.getElementById(id); }
  function set(id, value) { var el = $(id); if (el) el.textContent = value; }

  function fill(kind, item) {
    var p = 'canvas-' + kind + '-';
    if (!item) {
      set(p + 'name', kind === 'assignment'
        ? 'This topic has no Canvas assignment.' : 'No calendar event for this topic.');
      $(p + 'body').hidden = true;
      return;
    }
    var name = kind === 'event' ? item.title : item.name;
    set(p + 'name', name);
    $(p + 'name-field').value = name;
    $(p + 'preview').innerHTML = item.html;
    $(p + 'raw').value = item.html;
    if (kind === 'event') {
      set(p + 'date', item.date || 'See the class schedule');
      set(p + 'assignment', item.assignment || 'None; this topic is done on paper');
    } else {
      set(p + 'points', item.points + ' points');
      set(p + 'due', item.due ? item.due + ', start of class' : 'the start of the next class');
      set(p + 'event', item.event);
    }
  }

  function copy(kind, field, what, html) {
    var say = function (m) { set('canvas-' + kind + '-status', m); };
    var holder = field.closest ? field.closest('details') : null;
    if (holder) holder.open = true;
    try { field.focus({ preventScroll: true }); field.select(); field.setSelectionRange(0, field.value.length); } catch (e) { /* writeText may still work */ }
    var ok = what + ' copied.' + (html ? ' Paste it through the </> HTML editor in Canvas.' : '');
    function legacy() {
      var done = false;
      try { done = document.execCommand('copy'); } catch (e) { done = false; }
      say(done ? ok : 'Copying is blocked here. The text is selected, press Ctrl+C or Cmd+C.');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(field.value).then(function () { say(ok); }).catch(legacy);
    } else legacy();
  }

  ['event', 'assignment'].forEach(function (kind) {
    var panel = $('canvas-' + kind);
    if (!panel) return;
    var topic = data && data.topics && data.topics[panel.getAttribute('data-canvas-code')];
    var item = topic && topic[kind];
    if (item && kind === 'event' && topic.assignment) item.assignment = topic.assignment.name;
    fill(kind, item);
    panel.addEventListener('click', function (event) {
      var button = event.target.closest ? event.target.closest('button[data-copy]') : null;
      if (!button) return;
      var label = kind === 'event' ? 'event' : 'assignment';
      if (button.getAttribute('data-copy') === 'name') {
        copy(kind, $('canvas-' + kind + '-name-field'), 'The ' + label + (kind === 'event' ? ' title' : ' name'), false);
      } else {
        copy(kind, $('canvas-' + kind + '-raw'), 'The ' + label + ' HTML', true);
      }
    });
  });
}());
