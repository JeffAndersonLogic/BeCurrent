'use strict';
// Where each unit's teacher pages live. One file, because two places build
// against these names: build-midterms.js writes the pages, and
// build-teaching-os-manifest.js tells the Teaching Command Center where they
// are. Change a name here and both move together.
const nn = n => String(n).padStart(2, '0');

const midterms = {
  hub: 'teacher/midterms.html',
  // Topic 1 kept its original filenames when Topics 2 to 5 were added.
  os: t => t.n === 1 ? 'midterms-run-of-show.html' : `midterms-topic-${nn(t.n)}-os.html`,
  projector: t => t.n === 1 ? 'midterms-projector.html' : `midterms-topic-${nn(t.n)}-projector.html`
};

const iran = {
  hub: 'teacher/iran-run-of-show.html',
  // The launcher opens the Run of Show on the right day.
  day: n => `teacher/iran-run-of-show-launch.html?day=${n}`
};

module.exports = { nn, midterms, iran };
