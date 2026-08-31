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

  function patch() {
    if (modeToday() !== 'lead') return true;
    var slide = document.querySelector('.desk-slide-v2');
    if (!slide) return false;

    var kicker = slide.querySelector('.board-kicker');
    var heading = slide.querySelector('.slide-title');
    var intro = slide.querySelector('.slide-dek');
    var grid = slide.querySelector('.desk-move-grid');

    if (kicker) kicker.textContent = 'The Desk · Lead Mode';
    if (heading) heading.textContent = 'The Lead, then go deep';
    if (intro) intro.textContent = 'Know the shared story, file what happened and why it matters, then protect sustained time for today’s investigation.';
    if (grid) {
      grid.innerHTML = [
        ['01', 'Know the Lead', 'The story the room shares.'],
        ['02', 'File the Lead', 'What happened. Why it matters.'],
        ['03', 'Copy My Desk', 'Back up today’s one-story filing in Canvas.']
      ].map(function (step) {
        return '<div class="desk-move"><span class="desk-move-num">' + step[0]
          + '</span><strong class="desk-move-name">' + step[1]
          + '</strong><span class="desk-move-note">' + step[2] + '</span></div>';
      }).join('');
    }
    slide.dataset.deskMode = 'lead';
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
