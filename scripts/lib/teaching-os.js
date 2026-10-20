'use strict';
// The one list of where every topic's teacher and student pages live, built from
// the unit content and scripts/lib/teacher-paths.js. Two builders read it:
// build-teaching-os-manifest.js publishes it for the JeffOS Teaching Command
// Center, and build-teacher-home.js renders the BeCurrent Command Center's lesson
// library from it, so the two cannot list different pages.
const fs = require('fs');
const path = require('path');
const { nn, midterms, iran } = require('./teacher-paths');

const CONTENT = path.join(__dirname, 'unit-content');

const plain = s => String(s == null ? '' : s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function entriesFor(unit) {
  const m = unit.meta;
  const code = String(m.code || '').toUpperCase();
  const base = { unit: plain(m.unit), unitPage: `${m.unitKey}/index.html` };
  const out = [];

  (unit.topics || []).forEach(t => {
    const e = Object.assign({ code: code + t.n, topic: plain(t.topic || `Topic ${t.n}`), title: plain(t.title) }, base);
    if (m.renderer === 'video-first') {
      e.student = `${m.unitKey}/${t.page}`;
      e.teacher = `teacher/${midterms.os(t)}`;
      e.projector = `teacher/${midterms.projector(t)}`;
      e.hub = midterms.hub;
    } else if (m.renderer === 'reverse-history') {
      e.student = `${m.unitKey}/${t.page}`;
      e.teacher = iran.day(t.n);
      e.hub = iran.hub;
    } else {
      // A Brief topic, or a paper day with no Brief: the unit page.
      e.student = (t.sections && t.sections.length)
        ? `${m.unitKey}/topic-${nn(t.n)}-brief-${t.slug}.html`
        : base.unitPage;
    }
    out.push(e);
  });

  // Non-topic class days, such as the Midterms Election Day guide.
  (unit.days || []).forEach(d => {
    out.push(Object.assign({ code: code + d.code, topic: plain(d.topic), title: plain(d.title),
      student: `${m.unitKey}/${d.page}`, hub: m.renderer === 'video-first' ? midterms.hub : undefined }, base));
  });
  return out;
}

function teachingTopics() {
  return fs.readdirSync(CONTENT).filter(f => f.endsWith('.js')).sort()
  .map(f => require(path.join(CONTENT, f)))
  .filter(u => u && u.meta && u.meta.code)
  .flatMap(entriesFor);
}


module.exports = { teachingTopics };
