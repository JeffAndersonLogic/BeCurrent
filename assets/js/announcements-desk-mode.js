(function () {
  'use strict';

  function dayKeyOf(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function hourKey() {
    return Math.floor(Date.now() / 3600000);
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

  function refreshLead() {
    var news = window.BECURRENT_DAILY_NEWS || {};
    var lead = news.lead || {};
    var slide = document.querySelector('.lead-slide');
    if (!slide || !lead.headline) return;

    var headline = slide.querySelector('.lead-headline');
    var dek = slide.querySelector('.lead-dek');
    var meta = slide.querySelector('.lead-meta');
    var media = slide.querySelector('.lead-media');
    var kicker = slide.querySelector('.board-kicker');

    if (kicker) kicker.textContent = 'Today’s Lead · ' + (lead.category || 'News');
    if (headline) headline.textContent = lead.headline;
    if (dek) dek.textContent = lead.dek || '';
    if (media && lead.image) media.style.backgroundImage = 'url("' + String(lead.image).replace(/"/g, '') + '")';
    if (meta) {
      meta.textContent = [lead.source, lead.published].filter(Boolean).join(' · ');
      if (lead.url) {
        var link = document.createElement('a');
        link.className = 'lead-link';
        link.href = lead.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Open the reporting →';
        meta.appendChild(link);
      }
    }
  }

  function patchDesk() {
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

  function patchWhenReady() {
    if (patchDesk()) {
      refreshLead();
      return;
    }
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      if (patchDesk() || tries > 40) {
        clearInterval(timer);
        refreshLead();
      }
    }, 50);
  }

  function start() {
    var fresh = document.createElement('script');
    fresh.src = 'assets/data/daily-news.js?v=hour-' + hourKey();
    fresh.async = false;
    fresh.onload = patchWhenReady;
    fresh.onerror = patchWhenReady;
    document.head.appendChild(fresh);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}());
