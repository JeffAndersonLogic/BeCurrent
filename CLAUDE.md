# BeCurrent, Claude Code Rules

## Git

- `main` is the deploy branch: GitHub Pages serves it, so what is on `main` is
  what students have.
- No pull requests. Push to a working branch, wait for Validate to pass on it,
  then fast-forward `main` to that commit. See "The branch rule" below.
- Until the rule in `.github/branch-ruleset.json` is applied, committing directly
  to `main` still works and nothing stops an untested commit reaching students.

## The Gate

**The gate is hard on plumbing and silent on pedagogy.** That split is the rule that
governs every other rule in this file.

Enforced, because each one fails *silently* and costs a student their work:
the capture block and its storage key, the record footer the parser reads, the Gather
panel that carries it, one writer of the record grammar, nothing leaving the device,
links resolving, images being real, generated files reproducing, no other course's
join code, and no AP framing in a course that is not an AP course.

Not enforced, because they are teaching decisions: how many modules a lesson shows,
in what order, how many questions a brief carries, whether a page has a roadmap.

BeHistorical needed the second kind of rule because 77 hand-authored readings drift.
BeCurrent does not, and a course whose units get built in response to the news
cannot afford a build gate with opinions about lesson shape.

The contracts below are enforced by machine, not by memory.

- `npm test`, the gate. Runs `validate.js` plus three dependency-free tests in
  about a second. This is what the pre-push hook and CI both run, and it is the
  only command you need to remember.
- `npm run test:browser`, the Chromium contracts. Needs `npm i playwright-core`.
  Two files. `week-page.test.js` is 39 assertions on one week: modal focus, the
  scroll lock, the deck, the brief's capture key, and the record footer read back by
  the real parser. `brief-gather.test.js` is 28 on a unit block brief: the confidence
  words, the paste's bold/italic shape, and the footer through the real parser in
  both clipboard flavours.
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
- `node scripts/test/brief-gather.test.js`, drive a real **unit block** brief in
  Chromium and assert its own route to Canvas: the confidence words are on the
  buttons, the paste comes out with the question bold and the response italic, and
  the footer round-trips through the real parser in both clipboard flavours. It runs
  against a unit block rather than week 01 because that is the case with no other
  route. Run it when touching the gather panel, the confidence scale, or the record
  grammar.
- `node scripts/build-canvas-record.js`, inline `scripts/lib/canvas-record-block.js`
  into the week renderer between its sentinels. `--check` fails on drift, which is
  what `validate.js` runs. Never hand-edit between the sentinels. See "Two gather
  surfaces, one grammar" in `docs/CANVAS-CAPTURE.md`.
- `node scripts/build-weeks.js`, rebuild every week from its content module.
  `--check` fails on drift without writing, which is what the offline suite runs.
- `node scripts/build-desk.js`, rebuild `daily/index.html`, the Desk, from
  `scripts/lib/desk-content.js`. `--check` fails on drift. See "The Block Has Two
  Halves" below for why the daily half is one page and the units are not.
- `node scripts/parse-canvas-submissions.js <dir>`, turn an unzipped Canvas
  "Download Submissions" folder into `responses.csv` (one row per student per
  module response) and `exceptions.csv`. Reads and writes local files only, never
  the network.
- `node scripts/serve-local.js`, serve the repo locally. The briefs load through
  an iframe, which `file://` blocks, so use this rather than opening the HTML
  directly.
- `python3 scripts/brand/build-wordmark.py`, derive the plate, both wordmarks and
  the favicon from `assets/images/brand/becurrent-mark-source.svg`, the supplied
  artwork. Trims and recolours; never redraws. Needs
  `pip install fonttools brotli svgelements`, and is off the test path on
  purpose. See "The Mark, the Palette, and the Faces" below.

The student entry point is `index.html`, and it is generated. Student work reaches
the teacher through **Canvas only**.

## The Block Has Two Halves

**This is the shape of the course, and every other decision follows from it.** One
class meeting is a 90-minute block, and it runs in two halves:

| | The Desk | The Unit |
|---|---|---|
| when | first ~25 minutes, **every** class | the remaining ~65, for weeks at a time |
| what | today's news, four beats | one theme, traced backwards |
| built as | a **protocol**, one generated page | **content**, one module per unit |
| lives in | `scripts/lib/desk-content.js` → `daily/` | `scripts/lib/unit-content/` → `<unit>/` |

**The two halves are built differently on purpose, and confusing them is the
failure mode to avoid.** There are about 180 class periods in a year. Nobody
authors 180 daily pages, and a teacher three days behind on authoring has a dead
link in front of thirty students. So the daily half says nothing that expires:
the Desk carries the beats, the routine and the standing sources, and what changes
daily is what the students bring to it.

That is also why **the Desk has no headline on it, ever.** See "Do not fabricate
reporting" below. A page generated once and served every class period for a year
cannot carry an example story: written in August it is fabricated, and by October
it is stale, on the one page this course opens every single day. `validate.js`
checks the Desk is linked from the front door and that its beats and sources are
intact, because an orphaned Desk still builds and still validates.

### Nobody speaks to the room

**This is a hard constraint, set by the teacher, on the basis of this room's IEP
and 504 load. It is not a preference and it does not get revisited by a future
edit.** No student presents, reports out, shares out, or is called on. Ever.

An earlier Desk ran an oral board and it is gone. The replacement is deliberately
not "write more instead", because several of the same students are limited in
written output and that trade just swaps one barrier for another. The daily unit
of work is a **dispatch**: four short fields, about thirty words, filed privately,
and filable by typing, by dictation, or on a paper card. The teacher does all the
talking, reading three or four dispatches aloud with **names removed**.

Three properties hold it up, and breaking any one puts the barrier back:

1. A dispatch is never shown with a name unless that student asks.
2. The teacher voices the discussion, daily. An expert think-aloud is worth more
   to a struggling reader than a peer summary, and it is the failure-tolerant
   mode on a bad day.
3. Everyone files. Not volunteers, not a rotation of four.

**It is enforced, and it is not announced.** An earlier Desk printed a promise to
students that they would never present. That is gone: saying it out loud turns an
ordinary absence into a special accommodation and points at exactly the students
it was meant to protect. Nobody presenting is simply how the class runs.

`validate.js` enforces the constraint instead, because it is the textbook silent
regression: an oral step reads as a sensible edit to anyone who was not in the
conversation, breaks nothing technically, and is discovered by a student being
asked to present. The gate fails if a routine step, the deck, or the daily
accountability line uses presenting language.

**The units are the spine**: six across the year, listed in `SPINE` in
`scripts/build-index.js`. A unit appears on the front door whether or not it has
been written, because a front door showing only the finished one would say the
course is one unit long. A unit leaves the "planned" state by getting a content
module, and nothing has to be pruned by hand when it does.

**The orientation week is the method**, not a third content type. Week 01 teaches
the five questions that the Desk then asks every day and every unit reuses.

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

### This is not an AP course

**BeCurrent is an elective and it runs 9th through 12th grade in one room**, with a
wide spread of reading and writing levels in it. AP framing does two wrong things at
once: it is untrue of this course, and it tells a struggling 9th grader that the work
is pitched at somebody else.

The **skill names stay**: Sourcing, Framing, Causation, Corroboration, Generalizing
from Evidence. Those are what the course teaches and they belong to nobody. What went
is the framing that pointed at another course: the callout label is `Skill Focus`, not
`AP Skill Parallel`, and no callout explains a move by saying what historians do with
it.

`validate.js` fails on a standalone `AP` or `Advanced Placement` in any student-facing
page, week module, unit module or the Desk. It is checked rather than trusted because
the port from BeHistorical already carried it in once, as three `AP Skill Parallel`
callouts, and that route is open again every time a lesson is adapted across.

### The confidence scale is one scale

**The word is on the button.** Five buttons reading `1 Lost`, `2 Shaky`,
`3 Getting it`, `4 Solid`, `5 Could teach it`. It used to be the label "Confidence",
five bare numerals, and the anchor "1 lost, 5 could teach it" off to the right, which
asks a student to hold a legend in their head and look back and forth to use it.

The words live in `CONFIDENCE_WORDS` in `scripts/lib/brief-capture-block.js` and are
rendered by three surfaces: both brief renderers and the module pop-outs in the week
renderer. They are also what the Canvas paste prints, because a button that says
"Getting it" and a submission that says "3" is a scale the teacher cannot read back.

`data-conf` and `aria-pressed` are the contract and did not move: the capture block
reads them. The row carries a hidden name via `role="group"`, because dropping the
visible label would otherwise leave five buttons announced with no idea what they are
a scale of. Under 560px the words drop out and the row falls back to five circles.

### Do not fabricate reporting

Week 01's outlets and statements are **constructed teaching examples** and say so
on the page. Never present an invented headline as something a real outlet
published, and never invent a statistic, a date, or a quotation. The entire course
is about the difference between what was reported and what was made up; a fake
example passed off as real would be the worst possible lesson. Real weeks carry
real links.

## The Module Set

The modules are a **toolkit, not a checklist.** A block uses the ones it needs.
Sometimes all of them, often two or three. Nothing enforces a count or an order,
because how a lesson is shaped is a teaching decision and the build gate has no
business having an opinion about it.

The eight that exist:

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

**What the gate does enforce**, because each one fails silently:
- Every module has exactly **one** delivery mode. A module with none is a card a
  student clicks and nothing happens; a module with two is undefined behaviour.
- Every `render:` target resolves to a function that actually exists.
- No module id is defined twice, because the second silently shadows the first.

**What it does not enforce:** how many modules a lesson shows, in what order, or
which ones. Add a ninth if a unit needs one.

## Classroom Flow

Week pages show a three-card flow inside `.week-roadmap`: **Get the Story**,
**Interrogate It**,
**Take a Position**. Not enforced, and not required on a page that does not want one.

## Brief Standard

A brief is a reading with questions under it. Five things are required, because
without them a student cannot read it or cannot submit it: an `h1.brief-title`, a
`.brief-body`, a `.check-section`, the `.page-footer-note` that says where work goes,
and the `.gather-section` that is the route to Canvas. Everything else, the support
strip, vocabulary chips, callouts, the BeReady takeaway, how many questions, is a
writing decision.

**The eyebrow labels on the shaded boxes are Cinzel**, and they are the one reviewed
exception to the `--display` size floor. They are set at .86rem with the uppercase
transform dropped, so Cinzel's small capitals do the work: `BeReady: 10-second
takeaway` renders as B and R in full caps with the rest in small caps, and
`The Standard` as a cap-and-small-cap phrase. The rationale and the projector caveat
are at the top of `becurrent-brand.css`. The plain `.section-label` over a numbered
section is not a box and stays `--ui`.

Use the canonical full class names. Abbreviated ones (`.cs`, `.qi`, `.mf`) are
prohibited and `validate.js` rejects them.

### Two flavours

`scripts/lib/week-page.js` renders the week-01 orientation reading.
`scripts/lib/unit-brief-page.js` renders unit blocks and adds two things: START
HERE / PUSH FURTHER cards on every question, and a required road-not-taken section.
They are separate files on purpose: week-01 is pinned byte-for-byte by the
reproducibility test, and generalising one renderer to do both risks moving a byte
in a page that is already right.

### The AI coach is optional and currently absent

BeCurrent will use its own MagicSchool bot, one per unit, and it will not be the AP
World bot. Until that bot exists `aiCoachUrl` is empty in every content module, and
the coach code, buttons and output box are all omitted rather than shipped pointing
at another course's room.

Set `aiCoachUrl` and the whole thing returns, including the wrapper's click
interception. `validate.js` enforces the pairing in both directions: a brief that
renders a coach button must have a wrapper that catches it, and **no file may
contain a `joinCode`**, because a join code belongs in one place and is never
pasted across repos.

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

Read `docs/CANVAS-CAPTURE.md` before touching a Gather panel or the footer. A wrong
`expected` count reports complete submissions as incomplete, which is worse than no
count at all, so the denominator is always computed and never a literal.

**Two surfaces gather, and one grammar serves both.** The week page's panel collects
every module slot; the Brief's own panel, at the end of its questions, collects that
brief. The second is not a convenience: a unit block Brief is opened straight off the
unit page with no week shell behind it, so its panel is the **only** route those
answers have to Canvas. Every Social Media block answer used to be written to
`localStorage` and stranded there, with every structural check green.

Because `canvas-parse-core.js` is one parser, the grammar is one file,
`scripts/lib/canvas-record-block.js`, inlined into the renderer by
`build-canvas-record.js` and into every brief by `brief-capture-block.js`.
`validate.js` fails on drift in either. **Do not add a second writer.** Two copies
would mean two answers to "did this student edit their work" depending on which
button the student pressed.

Three things about the Brief's paste look cosmetic and are not. The per-question
heading must be the footer's `lab` verbatim, because that is how the parser finds
each response. The confidence line must sit above `My response:`, because everything
below that marker is hashed. And a blank answer must emit nothing, because a
placeholder there hashes as writing and gets the student accused of editing work they
never wrote. `docs/CANVAS-CAPTURE.md` has the full shape.

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

## The Mark, the Palette, and the Faces

**`assets/css/becurrent-brand.css` is the only file that defines a token.** Every
page links it first, and `becurrent.css` and `becurrent-brief.css` are components
only. Before this split the two stylesheets each carried their own `:root`, which
is two answers to "what red is this course" waiting to disagree.

### The mark

**The artwork is a real file and it is the source of truth.**
`assets/images/brand/becurrent-mark-source.svg` is the supplied vector.
Everything else in the brand folder is derived from it by
`scripts/brand/build-wordmark.py`, which does three things and only three: trim,
recolour, compose. **It never redraws.** Every earlier mark in this repo was a
reproduction built from fonts, because the artwork had only ever arrived as a
raster; all of that code is gone.

**Do not hand-edit the four outputs.** Edit the source, or the script.

The mark is **Be**, an oversized red **C**, then **URRENT**, with the word
crossing in front of the C. The C is the C of "Current" and it is also the logo.

```
assets/images/brand/becurrent-mark-source.svg    THE ARTWORK, 1500x1500
assets/images/brand/becurrent-logo.svg           the plate, 10:3, with the tagline
assets/images/brand/becurrent-wordmark.svg       word in paper, dark grounds
assets/images/brand/becurrent-wordmark-ink.svg   word in ink, light grounds
assets/favicon.svg                               the red C, for a browser tab
```

**Three things stop the source being usable as-is**, and they are why a build
step exists at all rather than four copies of one file:

1. **The canvas is mostly empty.** The artwork sits in a band about 1102x450 in
   the middle of a 1500x1500 square, roughly a fifth of the height. An `<img>`
   renders the whole canvas, so used untrimmed the mark comes out a fifth of the
   size its `height` asks for, floating in space. Trimming is what makes the
   ratio 2.45 rather than 1.
2. **The word is black.** On the masthead and the footer, both near-black bands,
   a black word is invisible and only the red C survives, which reads as a
   rendering fault rather than a logo. Hence two colourways. The **only**
   difference between them is the word's fill; the red never moves.
3. **There is no tagline in it.** The plate needs one, so it is set in Montserrat
   and exists in the plate alone. At masthead size it is four illegible pixels,
   and the front door already prints the course name in the dateline right under
   the mark. In the plate it clears the **C's descender**, not the word's
   baseline: the C overhangs the line by more than a cap height at each end, and
   measuring from the baseline runs the tagline straight through it.

**The lockup has a legibility floor and it is not 21px.** It is 2.45:1 and the
word's cap height is only about a third of the mark's total height, because of
that overhang. At 21px, the height the first BeCurrent masthead used, the cap
height is under 7px and the word is unreadable. **The masthead is 38px and the
footer 30px for that reason.** If the artwork is ever redrawn, measure this again
rather than assuming the heights carry over.

`scripts/brand/build-wordmark.py` regenerates all four. It needs
`pip install fonttools brotli svgelements` and is **deliberately off the test
path**, because `validate.js` has to stay runnable on a bare checkout with no
install at all. The outputs are committed; nothing in the build or the gate calls
it.

**Replacing the artwork is not a file swap.** Four outputs come from it, plus
`--signal` sampled from it, plus the `width`/`height` on every `<img>` that
renders it, plus the masthead and footer heights if the ratio moves. The
dimensions are enforced: `validate.js` reads the wordmark's own size and fails if
any lockup disagrees. That check has fired on every redraw, 4889x810 then
4101x716 then 7101x733 then 7563x1848 and now 1102x450, and each time ten
hardcoded pairs across four generators had to move with it.

### One family, two courses

BeCurrent and BeHistorical are the same method taught by the same teacher, so
they **share a type family and are separated by colour**. The three faces below
are BeHistorical's three faces. BeHistorical is bronze on parchment; BeCurrent is
**red and black** on newsprint.

That split is deliberate and it is the cheap half to get right: type says "same
course system", colour says "different course". Reversing it, different faces on
a shared palette, would say the opposite of what is true. If the two ever need to
diverge further, move the colour, not the type.

### Red and black

Two colours and the paper they sit on. There is no third accent, and its absence
is a constraint rather than an omission: a scheme with a spare colour in it ends
up using the spare for whatever needs distinguishing next, and a year later
nothing means anything.

- **Where a second series has to be told apart from the first, the second one is
  black.** The teal `--cool` that used to do that job is gone; every one of its
  35 uses is now ink or a neutral grey.
- **`--signal` draws things**: rules, borders, button grounds, and display type
  20px and up, where the bar is 3:1 and it clears it everywhere.
- **`--signal-deep` is the red that body-size words are set in**, every eyebrow,
  chip and key term.
- **The neutrals are true neutrals.** `--black-900` `#111111` and the ramp under
  it carry no blue, because a slate grey next to a warm red reads as a third
  colour whether or not it was meant to. `--signal` `#CE1400` is taken straight
  out of the artwork file; the black is not, since the artwork has no plate.
  Until the real vector arrived the red was sampled off a *picture* of the logo
  and was a little lighter and bluer, `#D5211A`. Everything downstream of it,
  `--signal-deep`, `--signal-pale`, `--signal-tint`, was re-derived and the whole
  contrast table at the top of `becurrent-brand.css` was recomputed.

The button carries the least slack: `--clean-paper` on `--signal` is 5.59:1
against a 4.5 bar. Move either token and rerun the numbers rather than eyeballing
it. The full table is at the top of `becurrent-brand.css`.

**The focus ring is its own token and is never the accent.** `--focus` is ink,
`--focus-invert` is paper for the dark bands. With red already on nearly every
card border, a red ring would be a ring the student has to work out is a ring.

### Three faces, three roles, self-hosted

`assets/fonts/`, latin woff2, OFL, licences committed alongside them. Self-hosted
because a student-facing page in this repo makes no third-party request, and a
webfont `<link>` to someone else's CDN is exactly that. BeHistorical loads these
same three from Google; that is the one thing about them not carried over.

| token | face | job |
|---|---|---|
| `--display` | Cinzel | headings and names of things |
| `--body` | Libre Baskerville | everything students read at length |
| `--ui` | Montserrat | labels, eyebrows, buttons, counters, chips |

**Cinzel is effectively caps-only** (its lowercase codepoints are small capitals),
**so `--display` is for names, not sentences.** A short title
in caps is a title; a whole question in caps is shouting, and it is measurably
slower to read. Anything with a verb in it, the terminal question, a beat
question, a house rule, a dispatch field, an outlet headline, is set in `--body`
bold instead. It also has a size floor: Cinzel's thin strokes break up on a
projector below about 17px, and under that the label face is `--ui`.

**Only the shipped weights exist, and that means different things per face.**
Cinzel and Montserrat are here as **variable** fonts covering 400-900 and 100-900,
so any weight in range is genuinely drawn. Libre Baskerville is **static** at 400
and 700 with italics, so a `font-weight:500` or `:800` on body text is not a
fallback, it is the browser smearing the nearest weight into a fake one, which
looks like a slightly swollen version of the right font and is hard to name when
you see it. Add the file before you add the weight.

**Body text is 16px at 1.7**, the same setting BeHistorical uses, because it is
the same face. Libre Baskerville has a very large x-height for its point size: at
the 17px the previous sans wanted, it sets noticeably bigger rather than the same
size in a different face.

`validate.js` covers two failures here that are otherwise silent. A component
stylesheet asking for a token the brand file does not define resolves to
*nothing*, not to a fallback, so `color:var(--gone)` inherits and a border draws
in currentColor; and a `@font-face` pointing at a missing file drops to Georgia
or Arial and renders correctly in the wrong typeface. Both look broadly right on
screen, which is why they are checked rather than eyeballed.

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

1. **The browser suite covers one week and one unit block.** `brief-gather.test.js`
   added the unit brief path. Still uncovered: a lesson with only two modules, and
   mobile layout, including the confidence row's fallback to circles under 560px.
2. **No Skills Lens.** BeHistorical's `teacher/skills-lens.html` is the in-browser
   analysis surface. The CLI parser works here today; the drop-a-zip UI does not
   exist yet. `teacher/` is an empty placeholder.
3. **One week.** Weeks 02 to 36 are unwritten. Week 01 is the template to copy.
4. **The Canvas fixture is BeHistorical's.** It is the only real Canvas round trip
   that exists. Replace it with a BeCurrent one once week 01 has been through Canvas
   for real, and keep both.
5. **No real map artwork.** Week 01 has no map because the orientation week has no
   single place. A real lesson needs a real map in the `where` slot.
6. **One unit of six.** Social Media exists. War in Iran, War in Ukraine, Midterm
   Elections, Artificial Intelligence and Immigration are on the front door as
   planned cards and have no content modules yet.
7. **The News Log does not exist.** The Desk says the graded artifact is one log a
   week, and nothing generates one. Until it does, the daily half is oral only and
   nothing from it reaches Canvas. This is the next real decision: whether the log
   is a week in `week-content/` reusing the brief machinery, or something smaller.
8. **No AI coach.** Deliberate, see above. BeCurrent needs its own bot first.
9. **No clips are configured yet.** The video mechanism is built and tested, but
   every `videos` array is empty because the URLs have to be real ones you supply.
   Nothing was invented to fill them.

## Units and Blocks

A **unit** is a theme that runs several blocks. A **block** is one 90-minute class
meeting. Content lives in `scripts/lib/unit-content/<unit>.js`, and
`scripts/build-units.js` emits:

```
<unit>/index.html                       the map of the whole arc
<unit>/block-NN-brief-<slug>.html       a Brief, only for blocks that carry one
<unit>/block-NN-brief-<slug>-capture.html
```

**Not every block has a Brief, and that is the point.** Social Media Block 1 is a
slide deck and a paper trace, Block 2 is a film. A block with no `sections` gets no
Brief, and its card on the unit page says "Done on paper in class. Nothing to open
here." rather than showing a dead link.

The unit page is a **map, not a lesson container**. It puts the terminal question at
the top, because the Block 1 script announces it on day one and returns to it two
weeks later, and a student chewing on it for two weeks argues better than one who
meets it cold.

### The front door is its own builder

`scripts/build-index.js` emits `index.html`, because it is the one page that must
know about both units and weeks. Generating it from inside `build-weeks.js` meant it
could not see a unit, so the first unit page shipped orphaned and reachable only by
typing the URL. `validate.js` now fails if a unit page is not linked from the front
door.

### Do not name the film

Block 2's title is deliberately vague, and this is load-bearing. From the Block 1
teaching script: *"the second they know the title, half the room looks it up, reads
that it's a documentary about social media being bad, and walks into Block 2 already
knowing what they're supposed to conclude. The withholding is what keeps Block 2 from
becoming another warning."* A unit page that listed the title would undo that on day
one.


## Video

Video is an **optional resource and a first-class one.** With this room's IEP/504
load it is frequently the primary path rather than the alternative, so a lesson may
be mostly video on a day when that is the right call.

Two places carry clips, and both take the same shape:

- **A lesson**, via `videos` in the week content module. Renders a self-introducing
  section on the week page.
- **A Brief**, via `videos` on the week or the block. Renders a strip **above the
  prose**, because a student who needs the video should not have to scroll past a
  thousand words to discover it exists.

```js
videos: [
  { title:    'CNN10 for October 14',
    url:      'https://...',        // required
    prompt:   'Watch for who is quoted and who is not.',
    source:   'CNN10',              // optional label
    duration: '10:00',              // optional
    captions: true }                // set false only if genuinely absent
]
```

**The block introduces itself when clips exist and hides entirely when they do
not.** An empty container leaves a gap that reads as something failing to load, so
the container stays in the shell and the renderer sets `hidden` on it.

**A clip card is headed by its own title**, never by the words "Video Clip".

**Clips open in a new tab, never embedded.** An embed puts a third-party iframe on a
page students use for schoolwork; a link does the same teaching job and sends
nothing until the student chooses to go. Every link carries
`rel="noopener noreferrer"`.

**The `prompt` is the guiding question**, and it is what makes a clip usable as
assigned work rather than filler. Not enforced, because that is a teaching call, but
do not skip it.

What the gate does enforce, because both fail silently:
- a clip with no `url` is a card that goes nowhere
- a lesson that defines clips but whose shell has no `#video-clips` container
  renders them nowhere at all, with the page still looking fine

