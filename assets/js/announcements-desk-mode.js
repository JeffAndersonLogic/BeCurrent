(function () {
  'use strict';

  function dayKeyOf(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function modeToday() {
    var schedule = window.BECURRENT_SCHEDULE || {};
    var days = Array.isArray(schedule.days) ? schedule.days : [];
    var key = dayKeyOf(new Date());
    var entry = days.find(function (day) { return day && day.date === key; });
    return entry && entry.deskMode === 'lead' ? 'lead' : 'full';
  }

  function stepHtml(steps) {
    return steps.map(function (step) {
      return '<div class="desk-move"><span class="desk-move-num">' + step[0]
        + '</span><strong class="desk-move-name">' + step[1]
        + '</strong><span class="desk-move-note">' + step[2] + '</span></div>';
    }).join('');
  }

  function patch() {
    var slide = document.querySelector('.desk-slide-v2');
    if (!slide) return false;

    var mode = modeToday();
    var kicker = slide.querySelector('.board-kicker');
    var heading = slide.querySelector('.slide-title');
    var intro = slide.querySelector('.slide-dek');
    var grid = slide.querySelector('.desk-move-grid');

    if (mode === 'lead') {
      if (kicker) kicker.textContent = 'The Desk · Lead Mode';
      if (heading) heading.textContent = 'Read here. Write in Canvas.';
      if (intro) intro.textContent = 'Open your Microsoft Education News Log, know the shared Lead, file what happened and why it matters, then move into today’s investigation.';
      if (grid) grid.innerHTML = stepHtml([
        ['01', 'Open Canvas', 'Launch your Microsoft Education News Log.'],
        ['02', 'Know the Lead', 'Read the shared story and identify the event.'],
        ['03', 'File the Lead', 'Write what happened and why it matters in Word.'],
        ['04', 'Check Saved', 'Your Microsoft file is the record.']
      ]);
    } else {
      if (kicker) kicker.textContent = 'The Desk · daily news habit';
      if (heading) heading.textContent = 'Read here. Write in Canvas.';
      if (intro) intro.textContent = 'Open your Microsoft Education News Log first. Know the Lead, choose Your Pick, make one judgment, and keep every graded response in the autosaving Word document.';
      if (grid) grid.innerHTML = stepHtml([
        ['01', 'Open Canvas', 'Launch your Microsoft Education News Log.'],
        ['02', 'Know the Lead', 'One important story the room shares.'],
        ['03', 'Choose Your Pick', 'Follow one story that genuinely interests you.'],
        ['04', 'Make one judgment', 'Which story deserves more attention?'],
        ['05', 'Check Saved', 'No gathering, copying or browser-only backup.']
      ]);
    }

    slide.dataset.deskMode = mode;
    return true;
  }

  function start() {
    if (patch()) return;
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      if (patch() || tries > 40) clearInterval(timer);
    }, 50);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}());
