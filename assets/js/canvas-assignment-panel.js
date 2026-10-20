/* The Canvas assignment toolkit inside a Midterms Run of Show.
 *
 * Reads window.BECURRENT_CANVAS_ASSIGNMENTS, which scripts/build-canvas-events.js
 * writes from the same assignmentBody() as docs/canvas/<unit>-assignments.md, and
 * gives this topic's body the calendar toolkit's three parts: a preview, a copy
 * button, and the raw HTML in a field to select by hand.
 *
 * Two paths to the clipboard, as in the calendar toolkit: navigator.clipboard, then
 * selecting the field and asking the browser to copy the selection. If both refuse,
 * the text is left selected and the message says which keys to press. */
(function () {
  'use strict';
  var panel = document.getElementById('canvas-assignment');
  var data = window.BECURRENT_CANVAS_ASSIGNMENTS;
  if (!panel) return;
  var code = panel.getAttribute('data-canvas-code');
  var a = data && data.assignments && data.assignments[code];
  function $(id) { return document.getElementById(id); }
  if (!a) {
    $('canvas-assignment-status').textContent = 'No Canvas assignment for this topic.';
    $('canvas-assignment-body').hidden = true;
    return;
  }
  $('canvas-assignment-name').textContent = a.name;
  $('canvas-assignment-name-field').value = a.name;
  $('canvas-assignment-points').textContent = a.points + ' points';
  $('canvas-assignment-due').textContent = a.due ? a.due + ', start of class' : 'the start of the next class';
  $('canvas-assignment-event').textContent = a.event;
  $('canvas-assignment-preview').innerHTML = a.html;
  $('canvas-assignment-raw').value = a.html;

  function say(message) { $('canvas-assignment-status').textContent = message; }
  function legacy(what) {
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    say(ok ? what + ' copied. Paste it into the Canvas HTML editor.'
      : 'Copying is blocked here. The text is selected, press Ctrl+C or Cmd+C.');
  }
  function copy(field, what) {
    var holder = field.closest ? field.closest('details') : null;
    if (holder) holder.open = true;
    try { field.focus({ preventScroll: true }); field.select(); field.setSelectionRange(0, field.value.length); } catch (e) { /* writeText may still work */ }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(field.value)
        .then(function () { say(what + ' copied.' + (what === 'The assignment HTML' ? ' Paste it through the </> HTML editor in Canvas.' : '')); })
        .catch(function () { legacy(what); });
    } else legacy(what);
  }
  panel.addEventListener('click', function (event) {
    var button = event.target.closest ? event.target.closest('button[data-copy]') : null;
    if (!button) return;
    if (button.getAttribute('data-copy') === 'name') copy($('canvas-assignment-name-field'), 'The assignment name');
    else copy($('canvas-assignment-raw'), 'The assignment HTML');
  });
}());
