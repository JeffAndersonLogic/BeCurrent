# Current Events Desk, archived from BeHistorical

Parked here on 2026-08-17. **Nothing in this folder is wired into BeCurrent.** It is
not a week, it is not a unit block, it is not linked from the front door, and
`validate.js` does not scan it. It is kept because the page is worth reusing, not
because it is ready.

Open `index.html` in a browser and it renders on its own. The folder is
self-contained.

## Why it is here

The desk lived in the `ap-world-history` repo and was branded BeCurrent, and
BeHistorical's front door linked it. BeCurrent is a separate course, so that link
was wrong and was removed. The pages themselves are BeCurrent's subject matter, so
they moved here rather than being deleted.

## Provenance

Copied from `JeffAndersonLogic/ap-world-history` at commit `a7bcd17`:

| This folder | Was |
|---|---|
| `index.html` | `current-events/index.html` |
| `behistorical-current-events.css` | `assets/css/behistorical-current-events.css` |
| `behistorical-current-events.js` | `assets/js/behistorical-current-events.js` |
| `current-events-edition.js` | `assets/data/current-events-edition.js` |
| `behistorical-logo.jpeg` | `assets/logos/behistorical-logo.jpeg` |
| `current-events-desk.md` | `docs/current-events-desk.md` |

**The CSS, the renderer, the edition data and the design doc are byte-identical to
the originals.** Only `index.html` was edited, in seven places, all of them
addresses rather than content:

1. four asset references lost their `../assets/<type>/` prefix, because everything
   now sits beside the page,
2. two `../index.html` links became `../../index.html`, so Back to the course hub
   reaches this repo's front door instead of a path that does not exist here,
3. a `<meta name="robots" content="noindex">` was added, because GitHub Pages serves
   this repo and will serve this folder at its URL even though nothing links it. An
   archived page should not turn up in a search result looking like a live
   assignment.

Nothing else about the page changed, including the look, which is the reason it was
kept.

## What it actually does

A single-page activity for one class hour. A masthead and a time budget, a Wire deck
of outlet links that open in new tabs, a run of stations built from the edition data,
and a closing one-sentence lede.

- **Autosaves to `localStorage`** under `behistorical-current-events-<edition-id>-`,
  where the edition id is the date in `current-events-edition.js`, currently
  `2026-08-06`. Close the tab and come back and the work is still there.
- **Gather my work, then Copy all my work, then paste into Canvas.** Same handoff
  model BeCurrent uses.
- **No network.** No `fetch`, no `XMLHttpRequest`, no form post. Student writing
  never leaves the device except through the student's own paste, which is why this
  folder passes BeCurrent's privacy rule already even though the gate is not looking
  at it.
- **No AI coach and no join code**, so nothing here points at another course's
  MagicSchool room.

## This repo already has a Desk, and it works differently

Worth reading before reviving anything here. BeCurrent's own daily surface is
`daily/index.html`, generated from `scripts/lib/desk-content.js`, and CLAUDE.md is
explicit that **the Desk carries no headline, ever**: it is a protocol served all 180
class periods, so a story written into it is fabricated in August and stale by
October.

This archived desk is the opposite shape. It is an **edition**, dated 2026-08-06,
with a sample story and a wire deck baked into its data file. That is not a bug in
the archive, it is a different design, and it is the first thing to settle if this
page ever comes back: either it becomes a per-edition surface that somebody fills in
each week, which is the authoring load the Desk was built to avoid, or the edition
data goes and it becomes a protocol like the Desk already is.

## Before this ships to a BeCurrent student

Not a plan, just the list of what is actually wrong for this repo. Each one is a
real defect, not tidying, and four of them are things the gate would now refuse if
this folder were inside its scope:

1. **The storage key prefix says `behistorical-`.** One course's key in another
   course's repo. BeCurrent's convention is `becurrent-`, and the prefix appears in
   the renderer at `behistorical-current-events.js:388`.
2. **The brand is half BeHistorical's.** The masthead reads BeCurrent, but four
   things around it still say otherwise and three of them are visible to a student:
   the logo beside the wordmark is `behistorical-logo.jpeg`, carried along only so
   the page still renders; the masthead eyebrow prints "BeHistorical, AP World
   History" from `behistorical-current-events.js:648`; the page footer reads
   "BeHistorical · BeCurrent"; and the `<meta name="description">` calls it a
   BeHistorical desk. Left as found on purpose, so the archive matches what was
   removed rather than a half-rebranded version of it.
3. **It says AP on it.** The masthead eyebrow prints "BeHistorical, AP World History"
   and the skill chips are the AP practice names. BeCurrent is an elective running
   9th through 12th in one room, and `validate.js` fails on a standalone `AP` or
   `Advanced Placement` in any student-facing page. The five skill names this course
   teaches are Sourcing, Framing, Causation, Corroboration and Generalizing from
   Evidence, and those are the chips this page would need.
4. **It fetches its fonts from Google.** `index.html` links
   `fonts.googleapis.com`. BeCurrent self-hosts the same three faces in
   `assets/fonts/` precisely so that no student-facing page makes a third-party
   request. Swapping the link for the local `@font-face` set is most of the fix.
5. **The palette is BeHistorical's.** This is bronze and gold on near-black.
   BeCurrent is red and black on newsprint, with one accent and no spare, and its
   own mark. The look is the reason this page was kept, so this is a decision rather
   than a defect: keep the look and it is visibly a different course, or re-skin it
   on `becurrent-brand.css` tokens and lose the thing that made it worth keeping.
6. **No Canvas record footer.** The desk copies plain text. It does not emit the
   `#BHV|` and `#BHR|` grammar, so `parse-canvas-submissions.js` cannot tell whether
   a student edited their work. There is exactly one writer of that grammar,
   `scripts/lib/canvas-record-block.js`, and a second one is refused; read
   `docs/CANVAS-CAPTURE.md` first, and take the `expected` count from a computed
   value rather than a literal.
7. **The edition is a teaching example.** `current-events-edition.js` is dated
   2026-08-06 and its sample story is constructed. Real weeks carry real links, and
   an invented headline presented as real reporting is the one thing this course
   cannot do.
8. **It is hand-authored.** Nothing generates this page. Every other surface here
   comes from a content module, because a hand-authored page can only be changed by
   a sweep script that patches HTML in place. If this becomes a real surface it
   needs a builder and a `--check` in the offline suite.

`current-events-desk.md` is the original design doc and explains the teaching intent
in more detail than this file does.
