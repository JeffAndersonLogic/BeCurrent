# BeCurrent, Claude Code Rules

## Git

- `main` is the deploy branch: GitHub Pages serves it, so what is on `main` is
  what students have.
- No pull requests. Push to a working branch, wait for Validate to pass on it,
  then fast-forward `main` to that commit. See "The branch rule" below.
- Until the rule in `.github/branch-ruleset.json` is applied, committing directly
  to `main` still works and nothing stops an untested commit reaching students.

## The Gate

The contracts below are enforced by machine, not by memory.

- `npm test`, the gate. Runs `validate.js` plus three dependency-free tests in
  about a second. This is what the pre-push hook and CI both run, and it is the
  only command you need to remember.
- `npm run test:browser`, the Chromium contracts. Needs `npm i playwright-core`.
  32 assertions on one week: modal focus, the scroll lock, the deck, the brief's
  capture key, and the record footer read back by the real parser.
- `npm run test:all`, both suites.
- `npm run hooks:install`, point git at `.githooks/` so `npm test` runs before
  every push. `npm install` does this automatically. Override once with
  `git push --no-verify`.

**Exit code 2 will mean skipped, not passed.** Every browser test should exit 2
when playwright-core is absent, because `validate.js` must stay runnable on a bare
checkout and the browser dependency is never installed by default.
`scripts/run-tests.js` honours that locally. Anywhere the dependency is supposed
to be present, pass `--strict`, which turns a skip into a failure, so a browser
job can never pass green having run nothing.

`.github/workflows/validate.yml` runs on every push and pull request, in two jobs.
`structure` deliberately runs with **no `npm install` at all**, which is what keeps
the offline suite honestly dependency-free: if someone adds a `require` of a package
to `validate.js`, CI catches it immediately. `browser` installs Chromium and runs
with `--strict`.

`run-tests.js` also refuses to pass an **empty** suite under `--strict`, so a job
can never report green because its test list was emptied.

### The branch rule

`.github/branch-ruleset.json` is the protection rule for `main`, kept in the repo
rather than only in the web UI so it can be reviewed and restored. Apply it with:

```bash
gh api --method POST /repos/JeffAndersonLogic/BeCurrent/rulesets \
  --input .github/branch-ruleset.json
```

It does three things: `main` cannot be deleted, `main` cannot be force-pushed, and
Validate must have passed on a commit before it can land there.

**This changes the Git workflow above.** Required checks cannot pass on a commit
that has not been pushed anywhere yet, so committing straight to `main` stops
working. The replacement is still not a pull request: push the work to any branch,
let Validate go green on it, then fast-forward `main` to that same commit. Required
checks bind to the commit SHA rather than the branch, so the fast-forward is
accepted straight away.

If a broken CI ever blocks an urgent classroom fix, set the ruleset to
`"enforcement": "evaluate"` in Settings, Rules, rather than reaching for a force
push. That keeps the record of what it would have caught.

## Repository Commands

- `node scripts/validate.js`, the full structural, capture-wiring, and
  image-integrity audit.
- `node scripts/run-tests.js offline|browser|all [--strict]`, run a suite. Prints
  PASS, FAIL, or SKIP per check and exits 1 if anything failed.
- `node scripts/test/week-page.test.js`, drive a real week page in Chromium and
  assert the modal, deck, capture and footer contracts. Run it when touching any
  modal open/close path, the deck, or the Gather panel.
- `node scripts/build-weeks.js`, rebuild every week from its content module.
  `--check` fails on drift without writing, which is what the offline suite runs.
- `node scripts/parse-canvas-submissions.js <dir>`, turn an unzipped Canvas
  "Download Submissions" folder into `responses.csv` (one row per student per
  module response) and `exceptions.csv`. Reads and writes local files only, never
  the network.
- `node scripts/serve-local.js`, serve the repo locally. The briefs load through
  an iframe, which `file://` blocks, so use this rather than opening the HTML
  directly.

The student entry point is `index.html`, and it is generated. Student work reaches
the teacher through **Canvas only**.

## The Content Model

**Every week is generated.** One content module in
`scripts/lib/week-content/week-NN.js` is the single source of truth for a week, and
`scripts/build-weeks.js` emits five files from it:

```
week-NN/index.html                            the lesson shell
week-NN/brief-week-NN-<slug>.html             the brief
week-NN/brief-week-NN-<slug>-capture.html     the iframe wrapper
assets/data/week-NN.js                        what the renderer reads
index.html                                    the front door, rebuilt from all weeks
```

Never hand-edit any of those. `scripts/test/weeks-reproducible.test.js` fails the
push if you do.

The point is not tidiness. A change to the brief system reaches a generated brief
by rebuilding, and reaches a hand-authored one only by writing a sweep script that
patches HTML in place. Every such script is permanent maintenance debt and can only
fix a problem someone already knows about. At 36 weeks a year that debt compounds
faster than anyone will keep up with, which is exactly how BeHistorical's capture
block went missing twice.

**Adding a week:** copy `scripts/lib/week-content/week-01.js`, change the content,
run `npm run build:weeks`, then `npm test`. Nothing else.

**When the template cannot express something a week needs:** add it as an
*optional* parameter to `scripts/lib/week-page.js` that defaults to current
behaviour, then rebuild every existing week and confirm not one byte moved. That is
the step that catches escaping bugs.

### Do not fabricate reporting

Week 01's outlets and statements are **constructed teaching examples** and say so
on the page. Never present an invented headline as something a real outlet
published, and never invent a statistic, a date, or a quotation. The entire course
is about the difference between what was reported and what was made up; a fake
example passed off as real would be the worst possible lesson. Real weeks carry
real links.

## 8-Module Structure Standard

Every week page must display exactly **8 modules** in this fixed order:

| # | ID | Title | Delivery |
|---|----|-------|----------|
| 01 | `where` | Where in the World | `renderWhere()` |
| 02 | `brief` | The Brief | iframe to the capture wrapper |
| 03 | `background` | Background | jump link `#background` |
| 04 | `coverage` | Coverage Compare | `renderCoverage()` |
| 05 | `sourcecheck` | Source Check | `renderSourceCheck()` |
| 06 | `claims` | Claim & Evidence | `renderClaims()` |
| 07 | `deliberation` | The Deliberation | external link, or a placeholder |
| 08 | `checkpoint` | Checkpoint | `renderCheckpoint()` |

**Rules:**
- Module 03 is always a jump link, never a pop-out modal.
- Module 09 does not exist. Eight, no more, no fewer, and `validate.js` fails on
  a count or order change.
- Module 07 is an external link when `deliberation.url` exists, and renders a
  "coming soon" placeholder when it does not.
- The eight modules are the *pedagogy*, not decoration. Each targets one of the
  five questions in the Week 01 brief.

## Classroom Flow Standard

Every week page shows the same three-card flow inside `.week-roadmap`. The three
steps are fixed, never customized per week: **Get the Story**, **Interrogate It**,
**Take a Position**. `validate.js` requires exactly three `.roadmap-step` divs.

## Brief Standard

Every brief follows the Week 01 structure exactly, in this order: `module-header`,
`brief-title-band`, `brief-body` (support strip, vocab strip, numbered sections
each with at least one callout, `be-ready`), `check-section` with **exactly three**
`question-item` blocks, the AI coach prompt builder, `page-footer-note`,
`module-footer`, and then the capture block.

Use the canonical full class names. Abbreviated ones (`.cs`, `.qi`, `.mf`) are
prohibited and `validate.js` rejects them.

### The capture block is load-bearing

`scripts/lib/brief-capture-block.js` is the **only** path by which the three brief
answers and their confidence ratings reach Canvas. The brief is a standalone page
inside an iframe, so nothing on the week page can see its textareas: if the block
is absent, or a single file disagrees about the storage key, the answers are
silently lost and every structural check still passes.

`validate.js` checks four separate things, because the dangerous version of this
failure is the one that leaves everything else green:

1. the block is present in every brief,
2. it is byte-identical to what the lib produces,
3. the key is `becurrent-brief-<weekKey>`, and
4. the renderer reads the same prefix the block writes.

Never hand-edit the block inside a generated brief. Change the lib and rebuild.

## The Canvas Record Footer

Read `docs/CANVAS-CAPTURE.md` before touching the Gather panel or the footer. The
renderer emits it and one parser reads it, so a change to either breaks the other.
A wrong `expected` count reports complete submissions as incomplete, which is worse
than no count at all, so the denominator comes from `expectedCaptureCount()` and
never from a literal.

**The parser is shared with BeHistorical on purpose.** `scripts/lib/canvas-parse-core.js`
uses the same `#BHV|` and `#BHR|` machine grammar, so one tool answers "did this
student edit their work" for both courses. Only the human-readable sentinel differs
(`--- BECURRENT RECORD ---`), because that line is visible in the student's paste.
The parser accepts both, and `scripts/test/canvas-paragraphs.test.js` asserts it.

If you change the grammar, change it in both repos and bump `SCHEMA_SUPPORTED`.

## Privacy

This repo is **public**, because GitHub Pages serves it. Therefore:

- **Never commit student work.** `.gitignore` already excludes `submissions/`,
  `responses.csv`, and `exceptions.csv`. Do not add a real submission as a test
  fixture. The one committed Canvas fixture is the teacher's own writing as Test
  Student.
- Student writing never leaves the device except through the student's own paste
  into Canvas. `validate.js` fails the build on a `<form action>`, a `fetch()`, or
  an `XMLHttpRequest` on any student-facing page.
- The AI coach is not a capture channel and never has been. It builds a prompt the
  student pastes; nothing reaches the teacher through it.

## Image Contract

- **Local artwork is the floor.** `assets/images/week-art/` holds fallbacks, and
  both image paths wire `onerror` to them, so a dead remote URL degrades to local
  art instead of an empty frame.
- **An empty `url` is a valid choice.** Leave it empty and the slot renders local
  art or hides itself. Prefer that to a picture that does not match its caption.
- **Generated SVGs must carry `width` and `height`.** A `viewBox` alone leaves the
  intrinsic size undefined, and an `<img>` holding one gets stretched by its
  container until the picture is letterboxed off-screen. `validate.js` enforces it.
- **Never commit a placeholder image file.** `validate.js` checks magic bytes; a
  text file named `.jpg` fails the build.

## Polarity

Every surface a student **reads** is light: newsprint under ink. Dark surfaces are
only for what students **scan**, the masthead, the background-card grid, the footer.
The reasoning is about rooms and eyes, not taste:

1. A lamp projector can only add light. In a lit classroom a dark background
   degrades to washed-out grey, while a light one puts the lumens to work. Reverse
   this only if the room is dark or the display is a flat panel.
2. Light-on-dark causes halation for the roughly one in three people with some
   astigmatism.
3. Dark text on light is read measurably faster and more accurately, and the
   advantage grows as characters get smaller. Note that subjects in those studies
   performed better on light while reporting no preference, so asking students will
   not settle it.

A half-done flip is the thing to avoid: changing a panel's background without its
headings can leave a title unreadable with every structural check still green.

## The modals manage focus

`bcOpenModal`/`bcCloseModal` in `assets/js/becurrent-week-renderer-v1.js` move focus
in, trap Tab, and return it to the launcher. The stack exists because the lightbox
opens from inside the module modal. **Adding a `.show` class without calling them
locks a screen-reader user out of the week's content.**

Two specific things must not be reintroduced, both carried from bugs BeHistorical
already paid for:

- **`bcOpenModal` is idempotent per element.** The deck arrows swap the card inside
  the open dialog by calling it again. A renderer that pushed an entry per call left
  a five-card deck with five entries; one Close popped one, the stack stayed
  non-empty, and `document.body.style.overflow` was never restored. The dialog was
  gone, the page looked normal, and the student could not scroll until they
  reloaded. Do not reintroduce an unconditional `BCModalStack.push`.
- **The scroll lock lifts on "no visible dialog", not "empty stack".** Keying it off
  an empty stack is the same bug wearing a different hat.

**Every enlargeable image is a button** with `aria-label` and keyboard operation. An
`onclick` on its own is mouse-only, which is how a lightbox stays unreachable by
keyboard.

`validate.js` asserts the *source shape* of all of this, which proves the guard is
written but not that it works. `scripts/test/week-page.test.js` is what proves it
works, and it is the regression gate for the stranded-student bug.

### Testing the scroll lock needs a wheel event

`overflow: hidden` makes an element **programmatically scrollable but not
user-scrollable**. `window.scrollTo(0, 600)` moves the document straight through the
lock and reports 600, so a scrollTo-based test reports the lock as broken while it is
working exactly as intended. Assert the lock with a real wheel event, which is what
it exists to stop. `wheelBy()` in the browser test is the helper.

The same file also has to reset scroll with `behavior: 'instant'`, because
`html { scroll-behavior: smooth }` means a default `scrollTo` animates and
`window.scrollY` does not update synchronously. Reading it a frame later returns the
old offset and fails a page that scrolls fine.

## What is missing

Honest list, so nobody assumes coverage that does not exist:

1. **The browser suite covers one week and one path.** It does not yet cover the
   deliberation placeholder, a week with no brief published, or mobile layout.
2. **No Skills Lens.** BeHistorical's `teacher/skills-lens.html` is the in-browser
   analysis surface. The CLI parser works here today; the drop-a-zip UI does not
   exist yet. `teacher/` is an empty placeholder.
3. **One week.** Weeks 02 to 36 are unwritten. Week 01 is the template to copy.
4. **The Canvas fixture is BeHistorical's.** It is the only real Canvas round trip
   that exists. Replace it with a BeCurrent one once week 01 has been through Canvas
   for real, and keep both.
5. **No real map artwork.** Week 01 has no map because the orientation week has no
   single place. A real week needs a real map in the `where` slot.
