---
name: new-week
description: "Scaffold a new BeCurrent week (weeks 02 through 36 are unwritten as of this skill's creation) by copying week-01's content module, rewriting it for a real current-events topic, and rebuilding. Use when Jeff says 'write week N', 'build the next week', 'add a week on <topic>', 'let's do this week's current events week', or similar. Do NOT use this for adding a Social Media unit block, that content model is different (scripts/lib/unit-content/) and more bespoke; ask before assuming a week vs. a block."
---

# Scaffold a New BeCurrent Week

Every week is generated from exactly one file: `scripts/lib/week-content/week-NN.js`.
`scripts/build-weeks.js` discovers content modules by reading that directory, there is
nothing to register elsewhere. `week-01.js` is evergreen (it teaches the method, not a
dated story) and is the template to copy; every other week needs real, current reporting.

**Never hand-edit any generated output** (`week-NN/index.html`, the brief, the capture
wrapper, `assets/data/week-NN.js`). `scripts/test/weeks-reproducible.test.js` fails the
push on drift. The content module is the only file you write.

## Step 1: Get the topic and real sources from Jeff before writing anything

This is the one step that cannot be skipped or improvised. Week 01's outlets and
statements are constructed teaching examples and say so on the page; every other week
must carry **real stories with real links**. Per CLAUDE.md: never present an invented
headline as something a real outlet published, never invent a statistic, a date, or a
quotation. The entire course is about the difference between what was reported and what
was made up, so a fabricated example in a live week would be the worst possible lesson.

Ask Jeff for (or confirm with him before drafting):
- The news topic or story for the week, and its date range.
- At least two real outlets covering it, with real URLs, for the Coverage Compare module.
- Any real video clips (`videos[]`), only if he gives you real URLs. Leave `videos: []`
  otherwise, an empty array renders no video section, which is correct and expected for
  most weeks.
- Whether a Deliberation link exists yet (module 07 `url`), or leave it `''` for the
  placeholder.

Do not fill any of this from your own knowledge of the news. If you don't have a live,
verified source for a claim, leave the field for Jeff rather than guessing.

## Step 2: Copy the template

```bash
cp scripts/lib/week-content/week-01.js scripts/lib/week-content/week-NN.js
```

Zero-pad `NN` to two digits (`week-02.js`, not `week-2.js`), matching every existing
convention in the repo.

## Step 3: Rewrite `meta`

- `week`: `'Week NN'`
- `weekKey`: `'wNN'` (used in the Canvas capture storage key, `becurrent-brief-wNN`)
- `weekNumber`: the integer
- `dateRange`: the real week's dates, e.g. `'September 14 to September 18, 2026'`
- `title` / `subtitle`: name the actual topic, not a generic placeholder
- `aiCoachUrl`: leave `''`. BeCurrent has no MagicSchool bot of its own yet (see CLAUDE.md,
  "The AI coach is optional and currently absent"). Do not point it at the AP World bot.
- `canvasSubmissionNote`: keep as-is unless Jeff changes the course's Canvas instructions

## Step 4: Rewrite the eight modules with real content

Walk the module table in CLAUDE.md in order; a block uses the modules it needs, but a
full week (like week-01) uses all eight:

| # | Field(s) in the content module | Delivery |
|---|---|---|
| 01 | `where` | `renderWhere()` |
| 02 | `eyebrow`, `title`, `deck`, `skillTags`, `support`, `terms`, `sections`, `takeaway`, `questions` | the Brief, iframe |
| 03 | `background` | jump link `#background` |
| 04 | `coverage` | `renderCoverage()` |
| 05 | `sourceCheck` | `renderSourceCheck()` |
| 06 | `claims` | `renderClaims()` |
| 07 | `deliberation` | external link, or placeholder if `url` is empty |
| 08 | `checkpoint` | `renderCheckpoint()` |

Notes specific to a real week (not week-01's evergreen case):

- **`coverage.outlets`**: two real write-ups of the same real story, with real `url`
  values. Do not invent ledes or headlines; quote or closely paraphrase what the outlets
  actually published, and say so if you are paraphrasing rather than quoting.
- **`claims.statements`**: draw these from the real coverage module's facts, same as
  week-01 draws its six statements from its own constructed council story.
- **`sections`** (module 02, the Brief body): still teaches a transferable method (a
  version of sourcing, claim/evidence, framing, or corroboration), but grounded in this
  week's real story rather than a generic one. `terms` and `skillTags` should reflect
  whichever of the four core skills this week emphasizes; not every week needs all four.
- **`videos`**: only populate with real, working URLs Jeff supplies. An empty array is
  correct and common; do not add a placeholder or invented video.

Keep every required brief structural element: `.brief-title`, `.brief-body`,
`.check-section` (with `questions[]`, feeding the three `.question-item` blocks), and the
footer note. These come from the shared template in `scripts/lib/week-page.js`, you do not
hand-build them, just supply the data.

## Step 5: Build and verify

```bash
npm run build:weeks      # writes week-NN/, assets/data/week-NN.js
npm run build:index      # relinks the front door so the new week is reachable
npm test                 # validate.js + the offline suite
```

If you touched anything beyond content (unlikely for a normal week), also run
`npm run test:browser` (needs `playwright-core`).

A clean `npm test` after `build:weeks` is the proof the module shape is correct: a missing
required field, a malformed module, or a broken capture wiring fails there before it ever
reaches a student.

## Step 6: Report

Tell Jeff: which sources you used (with URLs), what you left blank for him to fill in
(video, deliberation link, anything else), and confirm `npm test` passed. If you had to
guess at anything instead of asking, say so explicitly rather than letting a guess pass as
verified content.
