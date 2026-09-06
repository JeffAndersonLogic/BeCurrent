# Iran at War — Pre-Unit Launch Checklist

Use this before the first class of the unit and after any video change.

## 1. Rebuild and static checks

```bash
npm run build:iran
npm run check:iran
npm test
```

The static Iran video check must reject missing metadata, unsupported pacing labels, malformed direct-video URLs, and PBS full-episode links.

## 2. Live video readiness

From a normal internet connection:

```bash
npm run check:iran-videos:live
```

For a fast required-only pass:

```bash
node scripts/check-iran-videos.js --live --required-only
```

A response check is necessary but not sufficient. Open every REQUIRED and REQUIRED EXCERPT card once on a student Chromebook using the school network. Confirm:

- the intended clip opens, not a full episode or generic landing page;
- no PBS Passport/login barrier appears;
- YouTube is permitted by district filtering;
- captions are available and usable;
- teacher-selected excerpt timestamps still make sense;
- audio is classroom-ready.

## 3. Topic 1 student smoke test

Open `iran/index.html` at Chromebook width and verify:

- the map/geography section is visible and usable;
- the Video-Forward Pathway renders three cards;
- Watch 1 is REQUIRED and opens the direct 9:19 PBS clip;
- Watch 2 is TEACHER CHOICE;
- Watch 3 is OPTIONAL EXTEND and opens the direct 7:17 PBS energy clip;
- no long-reading scaffold is accidentally hidden on Topic 1;
- all six response fields accept text and autosave;
- Gather This Topic reports the correct completed/blank count;
- Copy to Clipboard produces the Canvas-ready record;
- Canvas directions clearly tell students where the graded submission goes;
- there is no horizontal overflow or unusable card layout at Chromebook/mobile widths.

## 4. Teacher Run of Show

Open `teacher/iran-run-of-show.html` and confirm the Topic 1 pacing rule is still:

- Watch 1 — required;
- Watch 2 — teacher choice / analysis if useful;
- Watch 3 — extension if time permits.

The teacher cockpit should launch the student Video Pathway rather than storing its own PBS/BBC/YouTube URLs. That prevents teacher/student link drift.

## Ownership

Canonical video metadata lives in:

`scripts/lib/iran-video-content.js`

It is intentionally outside `scripts/lib/unit-content/` because files in that folder are auto-discovered as complete course units.

Derived outputs:

- `assets/data/iran-videos.js`
- `docs/lesson-plans/iran-videos.md`

Presentation logic lives in `assets/js/iran-video-forward.js` and must not contain its own catalog.
