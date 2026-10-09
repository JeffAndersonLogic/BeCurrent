# BeCurrent Teacher Control Room

This directory is the permanent, teacher-facing hub for BeCurrent. It is **not** linked from student lesson or week pages. It is not access-controlled: GitHub Pages is public, so do **not** enter student names, grades, identifying information, or private records here. Local notes are browser-local convenience notes, not secure storage or a backup.

## Open the hub

- **Course headquarters:** `teacher/index.html`
- **Midterms Block 1 classroom cockpit:** `teacher/midterms-run-of-show.html`
- **Midterms Block 1 projector:** `teacher/midterms-projector.html`
- **Iran at War existing cockpit:** `teacher/iran-run-of-show.html`

The BeCurrent Control Room uses the new understated editorial identity. It does not copy the BeHistorical appearance. Existing Iran and Social Media lessons are unchanged.

## Midterms lesson contract

- **Canonical teacher content:** `teacher/data/midterms-block-01.js`. Each phase has timing, a student-visible presentation screen, and Teacher Intelligence notes (LAND, ASK, LISTEN FOR, PROTECT, CUT, NEXT MOVE).
- **Generated projector data:** `teacher/data/midterms-block-01-projector.js`. It contains only student-visible screens and timing. Never add teacher notes to this file or change it manually.
- **Builder:** `node scripts/build-control-room.js`; test drift with `node scripts/build-control-room.js --check`.
- **Shared cockpit/projection behavior:** `assets/js/teacher-control-room.js`; style: `assets/css/teacher-control-room.css`.
- **Existing student investigation:** `midterms/block-01.html`. Do not change its storage keys or Canvas capture format as part of teacher Control Room work.

Teacher and projector tabs on the **same browser profile and computer** synchronize the current phase via localStorage events. This is not cross-device, cloud, or live-classroom synchronization; teachers should open the projector tab on the machine connected to the classroom display. Both windows can advance the phase. The timer is per-phase; Start/Pause/Reset and freeform teacher notes are stored locally in that browser profile. The timer does not automatically submit anything or advance the class.

Projector source deliberately omits intelligence fields, but all site files are publicly downloadable because this is a public GitHub Pages site. Do not put actual credentials, student data, private teacher records, or confidential information in authored teacher data.

## The Canvas route stays unchanged

The Desk and the Midterms student page gather responses locally for copy/paste into the assigned Canvas Text Entry; this hub does **not** create assignments, transmit responses, grade, or ingest student submissions. Existing Canvas manifest/parsing remains canonical.

## Current status and conventions

Only the Midterms **Block 1** Control Room is in the new format. Blocks 2–5 are planned. Iran retains its existing Run of Show. Future Control Rooms should use the canonical lesson → generated projector approach and pass both offline checks and browser integration tests.

Important invariant: **Teacher Intelligence content must never enter the projector file or student page.** Presentation and teacher notes share an authored topic source but are exposed through separately generated outputs.
