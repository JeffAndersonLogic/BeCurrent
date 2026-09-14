# BeCurrent: Full Project Reference

A complete, self-contained description of the BeCurrent project. Written to be
pasted into another AI assistant as background context, so it assumes no prior
knowledge of the repository and repeats things that are obvious from inside it.

Last verified against the repository on 2026-09-14.

---

## 1. What BeCurrent is

BeCurrent is a **static website that teaches a high school Current Events course**
(officially "Current Problems, Issues & Events"), taught by Jeff Anderson. It is a
lesson delivery platform, not an app: plain HTML, CSS and JavaScript files served
by GitHub Pages, with no server, no database, no login, and no student accounts.

Its tagline is **"Read it. Check it. Then decide."**

The course teaches a method rather than a set of stories. Students learn to
interrogate any piece of reporting using five questions, then apply those questions
to real news across the year.

It is the sibling project to **BeHistorical** (the repository
`JeffAndersonLogic/ap-world-history`), which does the same job for AP World
History. The two courses share one Canvas submission parser on purpose so a single
teacher tool can read both. They deliberately do **not** share a look: BeHistorical
is bronze and parchment, BeCurrent is newsprint and ink.

### Fast facts

| | |
|---|---|
| Repository | `JeffAndersonLogic/BeCurrent` (public, because Pages serves it) |
| Deployed by | GitHub Pages, serving the `main` branch |
| Stack | Static HTML/CSS/vanilla JS, Node.js 18+ build scripts, zero runtime dependencies |
| Only dev dependency | `playwright` / `playwright-core`, for the browser tests, never installed by default |
| Student entry point | `index.html` (generated) |
| Where student work goes | Canvas, by copy and paste, and nowhere else |
| Current content | Week 01 (orientation) plus one five-block unit, "Social Media" |
| Test gate | `npm test`, about one second, 295 structural checks plus four offline test files |

---

## 2. The teaching model

### The five questions

Week 01 teaches the method the whole course runs on:

1. **Who is telling me this?** (sourcing: outlet, reporter, date, how many layers sit between you and the event)
2. **What here is a fact, and what is a claim?** (claim versus evidence versus opinion)
3. **What did they choose to put first?** (framing: lead, first quote, headline number)
4. **Who else is reporting it?** (corroboration and lateral reading, and the difference between twelve sources and one source with an echo)
5. **What would I need to know to be wrong?** (the question aimed inward)

The stated grading stance follows from question five: students are **not graded on
which side they land**, they are graded on whether they can state the strongest
version of the argument against themselves.

### Two content shapes: weeks and units

The course carries two different structures, and the repository keeps them
separate because they are genuinely different shapes.

**A week** is one story worked eight ways, using the fixed eight-module path below.
Week 01 is the orientation week and is deliberately evergreen, so it does not go
stale over the summer. Weeks 02 to 36 are unwritten.

**A unit** is a theme that runs several **blocks**, where a block is one
90 minute class meeting. Units are the spine of the course. The unit page is a
**map of the whole arc**, not a lesson container.

### The eight modules

Every week page can show these eight. They map onto the five questions.

| # | ID | Title | What it asks | How it is delivered |
|---|----|-------|--------------|---------------------|
| 01 | `where` | Where in the World | Put the story on a map before arguing about it | pop-out modal, `renderWhere()` |
| 02 | `brief` | The Brief | Read the week's narrative, answer three questions | iframe to the capture wrapper |
| 03 | `background` | Background | The history behind the headline | jump link to `#background`, plus a card deck |
| 04 | `coverage` | Coverage Compare | Same facts, two outlets. What did each choose? | modal, `renderCoverage()` |
| 05 | `sourcecheck` | Source Check | Who published this, and how would you know if it were wrong? | modal, `renderSourceCheck()` |
| 06 | `claims` | Claim & Evidence | Sort the reporting from the interpretation | modal, `renderClaims()` |
| 07 | `deliberation` | The Deliberation | Take a position, hear the other side, revise | external link, or a "coming soon" placeholder |
| 08 | `checkpoint` | Checkpoint | Show what you can now do with this story | modal, `renderCheckpoint()` |

**Critical distinction from BeHistorical:** the modules are a **toolkit, not a
checklist**. A lesson uses the ones it needs, sometimes all eight, often two or
three. Nothing in the build enforces a count or an order, because lesson shape is a
teaching decision. BeHistorical enforces exactly ten modules in a fixed order
because it has 77 hand-authored readings that drift; BeCurrent does not have that
problem and a course whose units get built in response to the news cannot afford a
build gate with opinions about lesson shape.

### Classroom flow

Week pages show a three-card flow: **Get the Story**, **Interrogate It**, **Take a
Position**. The front door phrases it as Get the Story, Trace It Back, Take a
Position. Not enforced, and not required on a page that does not want one.

---

## 3. What content exists today

### Week 01: "How to Read the News"

- Dates: August 10 to August 14, 2026. Week key `w01`.
- Subtitle: "The five questions you will ask about every story this year".
- Four learning targets and four success criteria, tagged Sourcing, Claim and
  Evidence, Framing, Corroboration.
- A Brief titled "The Five Questions" with five sections, one per question, plus
  key terms, callouts, and a closing "BeReady" takeaway.
- Background module: five cards tracing why these habits exist, covering the
  youth of the verification norm, wire services, broadcast, the collapse of
  distribution cost, and why that produces the five questions.
- Coverage Compare: two write-ups of an imaginary town council vote.
- Source Check: a six step lateral reading procedure, timed.
- Claim & Evidence: six statements to sort into fact, claim, or opinion.
- Deliberation question: should a platform label a post that is accurate but
  misleading?
- Checkpoint: three questions answered as one connected paragraph.

**Important honesty rule.** The outlets and statements in Week 01 are
**constructed teaching examples** and say so on the page. Real weeks carry real
links. Never present an invented headline as something a real outlet published,
and never invent a statistic, date, or quotation. The whole course is about the
difference between what was reported and what was made up, so a fake example
passed off as real would be the worst possible lesson.

### Unit: "Social Media" (five blocks)

Terminal question, announced on day one and returned to two weeks later:
**"Who should get to decide what a platform is allowed to do to your attention:
you, the company, or the government?"**

Unit overview, in the teacher's own voice: figure out how social media actually
works, the machine and the business, not whether it is good or bad for you, and
nobody is going to be asked to delete anything.

Five competencies are declared for the unit: cause and effect, fallacies and
propaganda, synthesizing patterns, hypotheses, generalizing from evidence.

| Block | Title | Artifact |
|---|---|---|
| 1 | Where the Money Comes From | No Brief. Slide deck plus a paper trace, deliberately device-free |
| 2 | Somebody Made a Film About This | No Brief. A film, deliberately unnamed |
| 3 | Inside the *Algorithm* Box | Brief, `block-03-brief-the-algorithm.html` |
| 4 | Go *Check* It Yourself | Brief, `block-04-brief-privacy-policy.html` |
| 5 | Who Gets to *Decide*? | Brief, `block-05-brief-who-decides.html` |

**Two deliberate decisions that look like omissions and are not:**

1. **Blocks 1 and 2 have no Brief**, and their cards say "Done on paper in class.
   Nothing to open here" rather than showing a dead link. Block 1 is a paper
   trace on purpose: per the teaching script, "devices turn a trace into
   copy-paste from a search result."
2. **The film in Block 2 is never named on any student-facing page.** This is
   load bearing and the build gate enforces it. The content module declares
   the title in a `withholdTitles` array (deliberately not repeated in this
   document), and `validate.js` fails the build if that string appears anywhere in
   the unit's pages or on the front door. The
   reasoning, from the Block 1 script: "the second they know the title, half the
   room looks it up, reads that it's a documentary about social media being bad,
   and walks into Block 2 already knowing what they're supposed to conclude."
   Remove the entry only after the block has been taught.

Block Briefs are written in a deliberately plainer register than a dictionary
would use, because "precision here costs comprehension, and comprehension is what
the rest of the block runs on." Flat and curious, never ominous: the moment it
sounds like an adult warning them about screens, the room stops reading.

Every unit block Brief carries two things week Briefs do not:

- **START HERE / PUSH FURTHER** cards on every question, rendered the same size on
  purpose so the student picks and nobody assigns. This is the differentiation
  lever that already works in this room.
- **A "Road Not Taken" section**, required by the content model. Tracing backwards
  from a present-day outcome only ever surfaces the causes that led to it, so
  without a deliberate alternative the past reads as a corridor rather than a set
  of choices. Block 3's is about chronological feeds coming back; Block 5's is
  about Section 230 surviving a court case that struck down the rest of its law.

---

## 4. Repository layout

```
BeCurrent/
├── index.html                    GENERATED front door (units + weeks + how it works)
├── CLAUDE.md                     the operating rules for AI assistants working here
├── README.md                     human-facing quick start
├── package.json                  npm scripts, Node >= 18
├── .nojekyll                     tells Pages not to run Jekyll
├── .githooks/pre-push            runs the offline suite before every push
├── .github/
│   ├── workflows/validate.yml    CI: two jobs, structure and browser
│   └── branch-ruleset.json       the protection rule for main, kept in the repo
├── assets/
│   ├── css/becurrent.css         the site style system
│   ├── css/becurrent-brief.css   the reading style system
│   ├── js/becurrent-week-renderer-v1.js   the one renderer, ~836 lines
│   ├── data/week-01.js           GENERATED, what the renderer reads
│   ├── favicon.svg
│   └── images/week-art/          local fallback artwork
├── docs/
│   ├── CANVAS-CAPTURE.md         how student writing reaches a spreadsheet
│   └── PROJECT-REFERENCE.md      this file
├── scripts/
│   ├── validate.js               the structural gate, 295 checks, dependency-free
│   ├── run-tests.js              suite runner: offline | browser | all [--strict]
│   ├── build-weeks.js            week content module -> four generated files
│   ├── build-units.js            unit content module -> unit page + briefs
│   ├── build-index.js            the front door, its own builder
│   ├── parse-canvas-submissions.js   Canvas download -> responses.csv
│   ├── serve-local.js            local server on 127.0.0.1:8765
│   ├── lib/
│   │   ├── week-page.js          renders the week-01 style Brief + wrapper
│   │   ├── unit-brief-page.js    renders a unit block Brief + wrapper
│   │   ├── unit-page.js          renders a unit's map page
│   │   ├── brief-capture-block.js  THE answer capture block, one copy
│   │   ├── canvas-parse-core.js  the parser, SHARED with BeHistorical
│   │   ├── canvas-zip.js         browser-side zip reader
│   │   ├── week-content/week-01.js         source of truth for week 01
│   │   └── unit-content/social-media.js    source of truth for the unit
│   └── test/
│       ├── weeks-reproducible.test.js
│       ├── video-block.test.js
│       ├── canvas-paragraphs.test.js
│       ├── canvas-zip.test.js
│       ├── week-page.test.js               the browser suite
│       └── fixtures/canvas-download-studenttest.html
├── week-01/                      GENERATED: shell, brief, capture wrapper
├── social-media/                 GENERATED: unit page, 3 briefs, 3 wrappers
└── teacher/README.md             placeholder for the future Skills Lens
```

---

## 5. The content model: everything is generated

**This is the single most important architectural fact about the repository.**

One content module is the single source of truth for a week or a unit, and the
build scripts emit every student-facing file from it.

For a week, `scripts/lib/week-content/week-NN.js` produces:

```
week-NN/index.html                          the lesson shell
week-NN/brief-week-NN-<slug>.html           the brief
week-NN/brief-week-NN-<slug>-capture.html   the iframe wrapper
assets/data/week-NN.js                      what the renderer reads
```

and `scripts/build-index.js` separately rebuilds `index.html`, the front door.

For a unit, `scripts/lib/unit-content/<unit>.js` produces:

```
<unit>/index.html                          the map of the whole arc
<unit>/block-NN-brief-<slug>.html          a Brief, only for blocks that carry one
<unit>/block-NN-brief-<slug>-capture.html
```

**Never hand-edit any generated file.** `scripts/test/weeks-reproducible.test.js`
runs every builder with `--check` and fails the push on drift. Without that check,
a hand edit survives until the next rebuild silently reverts it, which is the worst
of both worlds: the fix appears to work, ships, and then vanishes weeks later for
no visible reason.

**Why this matters more here than elsewhere.** A change to the Brief system
reaches a generated Brief by rebuilding, and reaches a hand-authored one only by
writing a sweep script that patches HTML in place. Every such script is permanent
maintenance debt and can only fix a problem someone already knows about. At 36
weeks a year that debt compounds faster than anyone will keep up with. This is
exactly how BeHistorical's answer capture block went missing twice, silently,
costing students their work.

**The front door has its own builder** because it is the one page that must know
about both units and weeks. Generating it from inside `build-weeks.js` meant it
could not see a unit, so the first unit page shipped orphaned and reachable only by
typing its URL. `validate.js` now fails if a unit page is not linked from the front
door.

### Adding a week

```bash
cp scripts/lib/week-content/week-01.js scripts/lib/week-content/week-02.js
# edit the content, then:
npm run build:weeks
npm test
```

### Adding a unit block

Edit `scripts/lib/unit-content/<unit>.js`, add a block object, then
`npm run build:units && npm run build:index && npm test`.

### When the template cannot express something

Add it as an **optional** parameter to the renderer that defaults to current
behaviour, then rebuild every existing page and confirm not one byte moved. That
is the step that catches escaping bugs.

---

## 6. The Brief

A Brief is a reading with questions under it. It is a **standalone HTML page loaded
inside an iframe** on the lesson page, through a thin capture wrapper.

### Required structure

Four things, because without them a student cannot read it or cannot submit it:

1. `h1.brief-title`
2. `.brief-body`
3. `.check-section`
4. `.page-footer-note` saying where work goes

Everything else, the support strip, vocabulary chips, callouts, the BeReady
takeaway, how many questions there are, is a writing decision and is not enforced.

Canonical full CSS class names only. Abbreviated names (`.cs`, `.qi`, `.mf`) are
prohibited and `validate.js` rejects them.

### Two renderers, on purpose

- `scripts/lib/week-page.js` renders the week-01 orientation reading.
- `scripts/lib/unit-brief-page.js` renders unit block Briefs and adds START HERE /
  PUSH FURTHER cards plus the required Road Not Taken section.

They are separate files deliberately: week-01 is pinned byte for byte by the
reproducibility test, and generalising one renderer to do both risks moving a byte
in a page that is already right. Two small renderers beat one clever one here.

### The capture block is load bearing

`scripts/lib/brief-capture-block.js` is the **only** path by which the three brief
answers and their confidence ratings reach Canvas. Because the Brief is a separate
page inside an iframe, nothing on the week page can see its textareas. If the block
is absent, or a single file disagrees about the storage key, the answers are
silently lost and every structural check still passes.

So `validate.js` checks four separate things:

1. the block is present in every generated brief,
2. it is byte-identical to what the lib produces,
3. the storage key is `becurrent-brief-<weekKey>`, and
4. the renderer reads the same prefix the block writes.

Never hand-edit the block inside a generated brief. Change the lib and rebuild.

---

## 7. How student work reaches the teacher

**Canvas, and nothing else.** There is no server here and nothing is ever
transmitted from these pages.

### The path

1. A student writes on a week page. Each answer autosaves to `localStorage` under
   `becurrent-week-<weekKey>-<slot>`, with confidence under the same key plus
   `-confidence`.
2. The Brief writes its three answers, their prompts, and their confidence ratings
   as one JSON object under `becurrent-brief-<weekKey>`.
3. **Gather All My Work**, a button at the bottom of the week page, collects every
   slot, emits one document, and appends a machine-readable record footer.
4. The student copies that document and pastes it into the Canvas assignment.
5. The teacher downloads submissions and runs
   `node scripts/parse-canvas-submissions.js <dir>`, which writes `responses.csv`
   (one row per student per module response) and `exceptions.csv`.

### The record footer, and why it exists

Without it, a truncated paste, a paste from a wiped `localStorage`, and a genuinely
blank assignment are indistinguishable. All three arrive as a document with the
right headings and no writing under them, and all three read as "this student did
nothing."

```
--- BECURRENT RECORD, do not edit ---
#BHV|v=1|topic=w01|copied=<iso>|items=6|expected=8|sum=<hash>|#
#BHR|i=01|slot=where-response|lab=Module 01, Where in the World|w=84|c=502|ph=<hash>|rh=<hash>|cf=4|#
--- END BECURRENT RECORD ---
```

- `expected` is how many slots the week defines. It comes from
  `expectedCaptureCount()` and **never** from a literal, because a hard-coded count
  reports a week whose brief is not yet published as three answers short. A wrong
  denominator is worse than none at all.
- `items` is how many were actually gathered.
- `rh` hashes the response, so writing edited after the copy is flagged `EDITED`.
- `ph` hashes the prompt the student saw, so "answered a different question"
  becomes detectable.
- `sum` hashes every slot and hash pair, so deleting a whole record line breaks it
  too, not just editing text inside one.

The format is deliberately dumb, because Canvas's editor rewrites HTML and nothing
may depend on a tag, attribute, or class surviving. Every record is one
self-delimiting line a regex recovers from the submission's text even if every
newline collapses.

**The hash is not a signature.** FNV-1a, 32 bits, chosen because it is small and
identical in the browser and in Node. It detects accident and drift. It is not
tamper-proof and nothing downstream should treat it as such.

**The one thing the hash cannot catch is paragraph structure**, because the hash
normalizes whitespace on purpose so Canvas rewriting line breaks does not flag
every honest submission. That is why responses go out as sibling `<p>` elements
rather than with `<br>`, and why `scripts/test/canvas-paragraphs.test.js` asserts
that every markup shape Canvas emits for a blank line parses back into two
paragraphs while a soft `<br>` does not.

### One parser, two courses

`scripts/lib/canvas-parse-core.js` is **shared with BeHistorical**. The `#BHV|` and
`#BHR|` machine tokens are identical in both, so one tool answers "did this student
edit their work" for both courses. Only the human-readable sentinel differs
(`--- BECURRENT RECORD ---` versus `--- BEHISTORICAL RECORD ---`), because that
line is visible in the student's paste. The parser accepts both.

If the grammar ever changes, it must change in both repositories and
`SCHEMA_SUPPORTED` must be bumped. Two implementations would mean two answers
depending on which door the teacher used.

### Three files must agree

| File | Role |
|---|---|
| `assets/js/becurrent-week-renderer-v1.js` | writes the footer |
| `scripts/lib/brief-capture-block.js` | supplies the brief's three answers |
| `scripts/lib/canvas-parse-core.js` | reads the footer |

A change to any one breaks the other two. Read `docs/CANVAS-CAPTURE.md` first.

---

## 8. Privacy

The repository is **public**, because GitHub Pages serves it. Therefore:

- **Never commit student work.** `.gitignore` excludes `submissions/`,
  `submissions.zip`, `responses.csv`, and `exceptions.csv`. Do not add a real
  submission as a test fixture. The one committed Canvas fixture is the teacher's
  own writing submitted as Test Student.
- Student writing **never leaves the device** except through the student's own
  paste into Canvas. `validate.js` fails the build on a `<form action>`, a
  `fetch()`, or an `XMLHttpRequest` on any student-facing page.
- The AI coach is not a capture channel and never has been. It builds a prompt the
  student pastes; nothing reaches the teacher through it.

---

## 9. The build gate

### The governing rule

**The gate is hard on plumbing and silent on pedagogy.** That split governs every
other rule in the project.

**Enforced**, because each one fails *silently* and costs a student their work:
the capture block and its storage key, the record footer the parser reads, nothing
leaving the device, links resolving, images being real, generated files
reproducing, no other course's join code, and the withheld film title.

**Not enforced**, because they are teaching decisions: how many modules a lesson
shows, in what order, how many questions a brief carries, whether a page has a
roadmap.

### Commands

```bash
npm test              # the gate: validate.js + 4 offline test files, about 1 second
npm run test:browser  # the Chromium contracts; needs `npm i playwright-core`
npm run test:all      # both suites
npm run validate      # just the structural audit
npm run build:weeks   # rebuild weeks from content modules
npm run build:units   # rebuild units
npm run build:index   # rebuild the front door
npm run check:weeks   # fail on drift, write nothing (same for :units, :index)
npm run serve         # local server at http://127.0.0.1:8765/
npm run parse:canvas  # node scripts/parse-canvas-submissions.js <dir>
npm run hooks:install # point git at .githooks/ so npm test runs before every push
```

Use `npm run serve` rather than opening the HTML directly: the Briefs load through
an iframe, which `file://` blocks.

### The two suites

**Offline** (5 entries, dependency-free, runs on a bare checkout):

1. `scripts/validate.js`, structure, capture wiring, image integrity. 295 checks.
2. `scripts/test/weeks-reproducible.test.js`, generated files match their content
   modules.
3. `scripts/test/video-block.test.js`, the video path through a Brief, both states.
4. `scripts/test/canvas-paragraphs.test.js`, Canvas blank-line round trip, both
   course sentinels.
5. `scripts/test/canvas-zip.test.js`, the zip reader plus CLI/browser CSV parity.

**Browser** (1 entry, needs Chromium): `scripts/test/week-page.test.js`, covering
modal focus, the scroll lock, the background deck, capture survival across a
reload, and the record footer read back by the real parser.

### Exit code 2 means skipped, not passed

Every browser test exits 2 when `playwright-core` is absent, because `validate.js`
must stay runnable on a bare checkout. `run-tests.js` honours that locally. Pass
`--strict` anywhere the dependency is supposed to be present, which turns a skip
into a failure, so a browser job can never pass green having run nothing.
`run-tests.js` also refuses to pass an **empty** suite under `--strict`, so a job
can never report green because its test list was emptied.

### CI

`.github/workflows/validate.yml` runs on every push and pull request, in two
parallel jobs:

- **structure**: no `npm install` at all, deliberately. That is what keeps the
  offline suite honestly dependency-free. If someone adds a `require` of a package
  to `validate.js`, CI catches it immediately.
- **browser**: installs Chromium and runs with `--strict`.

### Git workflow

- `main` is the deploy branch. GitHub Pages serves it, so what is on `main` is what
  students have.
- **No pull requests.** Push work to a working branch, wait for Validate to pass on
  that commit, then fast-forward `main` to it. Required checks bind to the commit
  SHA rather than the branch, so the fast-forward is accepted straight away.
- `.github/branch-ruleset.json` is the protection rule, kept in the repo rather
  than only in the web UI so it can be reviewed and restored. It does three things:
  `main` cannot be deleted, `main` cannot be force-pushed, and Validate must have
  passed before a commit can land there. Apply it with:
  ```bash
  gh api --method POST /repos/JeffAndersonLogic/BeCurrent/rulesets \
    --input .github/branch-ruleset.json
  ```
- If broken CI ever blocks an urgent classroom fix, set the ruleset to
  `"enforcement": "evaluate"` in Settings, Rules, rather than reaching for a force
  push. That keeps the record of what it would have caught.
- A pre-push hook runs the offline suite before anything leaves the machine.
  Override once with `git push --no-verify`.

---

## 10. Design system

The visual identity is **newsroom, not archive**. BeHistorical is bronze and
parchment; BeCurrent is newsprint, ink, and one signal accent. The two courses
should never be mistaken for each other at a glance.

Core tokens from `assets/css/becurrent.css`:

```
--ink:#14171A          --newsprint:#F4F2ED     --clean-paper:#FFFEFB
--ink-soft:#3C444C     --slate-900:#171B1F     --slate-800:#232A31
--signal:#B22222       --signal-deep:#8A1A1A   --cool:#1F5673
--sans: "Source Sans 3"     --serif: "Source Serif 4"
```

### Polarity, and why

Every surface a student **reads** is light: newsprint under ink. Dark surfaces are
only for what students **scan**, the masthead, the background-card grid, the
footer. The reasoning is about rooms and eyes, not taste:

1. A lamp projector can only add light. In a lit classroom a dark background
   degrades to washed-out grey, while a light one puts the lumens to work. Reverse
   this only if the room is dark or the display is a flat panel.
2. Light-on-dark causes halation for roughly one in three people with some
   astigmatism.
3. Dark text on light is read measurably faster and more accurately, and the
   advantage grows as characters get smaller. Note that subjects in those studies
   performed better on light while reporting no preference, so asking students will
   not settle it.

**A half-done flip is the thing to avoid**: changing a panel's background without
its headings can leave a title unreadable with every structural check still green.

### Image contract

- **Local artwork is the floor.** `assets/images/week-art/` holds fallbacks and
  both image paths wire `onerror` to them, so a dead remote URL degrades to local
  art rather than an empty frame.
- **An empty `url` is a valid choice.** Prefer that to a picture that does not match
  its caption.
- **Generated SVGs must carry `width` and `height`.** A `viewBox` alone leaves the
  intrinsic size undefined and the image gets stretched until it is letterboxed
  off screen. Enforced.
- **Never commit a placeholder image file.** `validate.js` checks magic bytes; a
  text file named `.jpg` fails the build.

---

## 11. Accessibility and the modal contract

`bcOpenModal` / `bcCloseModal` in `assets/js/becurrent-week-renderer-v1.js` move
focus into a dialog, trap Tab inside it, and return focus to the launcher on close.
A stack exists because the lightbox opens from inside the module modal.

**Adding a `.show` class without calling them locks a screen-reader user out of the
week's content.**

Two specific things must never be reintroduced, both carried from bugs BeHistorical
already paid for:

- **`bcOpenModal` is idempotent per element.** The deck arrows swap the card inside
  the open dialog by calling it again. A version that pushed an entry per call left
  a five-card deck with five stack entries; one Close popped one, the stack stayed
  non-empty, and `document.body.style.overflow` was never restored. The dialog was
  gone, the page looked normal, and the student could not scroll until they
  reloaded. Do not reintroduce an unconditional `BCModalStack.push`.
- **The scroll lock lifts on "no visible dialog", not "empty stack".** Keying it off
  an empty stack is the same bug wearing a different hat.

**Every enlargeable image is a button** with an `aria-label` and keyboard
operation. An `onclick` alone is mouse-only, which is how a lightbox stays
unreachable by keyboard.

`validate.js` asserts the *source shape* of all of this, which proves the guard is
written but not that it works. `scripts/test/week-page.test.js` proves it works.

### Testing the scroll lock needs a wheel event

`overflow: hidden` makes an element **programmatically scrollable but not
user-scrollable**. `window.scrollTo(0, 600)` moves the document straight through
the lock and reports 600, so a scrollTo-based test reports the lock as broken while
it is working exactly as intended. Assert the lock with a real wheel event. The
same file must also reset scroll with `behavior: 'instant'`, because
`html { scroll-behavior: smooth }` means a default `scrollTo` animates and
`window.scrollY` does not update synchronously.

---

## 12. Video

Video is an **optional resource and a first-class one**. With this room's IEP/504
load it is frequently the primary path rather than the alternative, so a lesson may
be mostly video on a day when that is the right call.

Two places carry clips, in the same shape: a lesson (via `videos` in the week
content module) and a Brief (via `videos` on the week or block). In a Brief the
strip renders **above the prose**, because a student who needs the video should not
have to scroll past a thousand words to discover it exists.

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

- The block **introduces itself when clips exist and hides entirely when they do
  not.** An empty container leaves a gap that reads as something failing to load,
  so the container stays in the shell and the renderer sets `hidden` on it.
- A clip card is headed by **its own title**, never by the words "Video Clip".
- **Clips open in a new tab, never embedded.** An embed puts a third-party iframe
  on a page students use for schoolwork; a link does the same teaching job and
  sends nothing until the student chooses to go. Every link carries
  `rel="noopener noreferrer"`.
- The `prompt` is the guiding question and is what makes a clip assigned work
  rather than filler. Not enforced, because that is a teaching call.

Enforced, because both fail silently: a clip with no `url` is a card that goes
nowhere, and a lesson that defines clips but whose shell has no `#video-clips`
container renders them nowhere at all with the page still looking fine.

**Every `videos` array is currently empty.** The mechanism is built and tested, but
the URLs have to be real ones the teacher supplies, and nothing was invented to
fill them.

---

## 13. The AI coach: deliberately absent

BeCurrent will eventually use its own MagicSchool chatbot, one per unit, and it
will **not** be the AP World bot (BeHistorical's coach is named Socrates and serves
77 topics).

Until that bot exists, `aiCoachUrl` is empty in every content module, and the coach
code, buttons, and output box are all **omitted rather than shipped pointing at
another course's room**. Set `aiCoachUrl` and the whole thing returns, including
the wrapper's click interception.

`validate.js` enforces the pairing in both directions: a Brief that renders a coach
button must have a wrapper that catches it, and **no file may contain a
`joinCode`**, because a join code belongs in one place and is never pasted across
repositories.

---

## 14. Hard rules, collected

Things that are never acceptable in this project:

1. **Never hand-edit a generated file.** Edit the content module and rebuild.
2. **Never fabricate reporting.** No invented headline presented as real, no
   invented statistic, date, or quotation.
3. **Never commit student work**, and never use a real submission as a fixture.
4. **Never add a network call to a student-facing page.** No `<form action>`, no
   `fetch()`, no `XMLHttpRequest`.
5. **Never hard-code the `expected` count in the record footer.** It comes from
   `expectedCaptureCount()`.
6. **Never fork the Canvas parser.** One file, shared with BeHistorical.
7. **Never name the withheld film** on a student-facing page until the block has
   been taught.
8. **Never reintroduce an unconditional modal-stack push**, or key the scroll lock
   off an empty stack.
9. **Never paste another course's MagicSchool join code** into this repository.
10. **No em dashes or en dashes in running prose.** This is a global rule across
    all of Jeff's work. Use commas, colons, periods, or parentheses. Dashes are
    fine in titles, dates, numeric ranges, tables, and identifiers.
11. **No dashboard stores state.** A surface that has to be written to in order to
    stay current does not ship. Build a router or a live query instead.

---

## 15. Known gaps

An honest list, so nobody assumes coverage that does not exist:

1. **The browser suite covers one week and one path.** It does not cover the unit
   Briefs, a lesson with only two modules, or mobile layout.
2. **No Skills Lens.** BeHistorical's `teacher/skills-lens.html` is an in-browser
   analysis surface that reads a Canvas `submissions.zip` in the tab with no
   network call. The CLI parser works here today; the drop-a-zip UI does not exist.
   `teacher/` is a placeholder. When it is built, two rules carry over: never link
   it from a week page, and its denominators come from the week data and never from
   what a student managed to submit.
3. **One week.** Weeks 02 to 36 are unwritten. Week 01 is the template to copy.
4. **The Canvas fixture is BeHistorical's.** It is the only real Canvas round trip
   that exists. Replace it with a BeCurrent one once Week 01 has been through
   Canvas for real, and keep both.
5. **No real map artwork.** Week 01 has no map because the orientation week has no
   single place. A real lesson needs a real map in the `where` slot.
6. **One unit only.** Social Media exists; the midterms unit does not.
7. **No AI coach.** Deliberate, see above.
8. **No clips are configured.** The mechanism is built and tested; every `videos`
   array is empty.

---

## 16. Glossary

| Term | Meaning in this project |
|---|---|
| **Week** | One story worked through the eight-module path. Key looks like `w01`. |
| **Unit** | A theme running several blocks. Key looks like `social-media`. |
| **Block** | One 90 minute class meeting inside a unit. Key looks like `sm-b3`. |
| **Brief** | The reading, a standalone page loaded in an iframe, with questions under it. |
| **Capture wrapper** | The thin iframe page a lesson actually links, which the Brief loads inside. |
| **Capture block** | The script inside a Brief that writes its answers to `localStorage`. |
| **Slot** | One named answer box, e.g. `where-response`, `brief-q1`, `checkpoint-response`. |
| **Gather All My Work** | The button that assembles every slot into one pasteable document. |
| **Record footer** | The machine-readable block appended to that document. |
| **Content module** | The single-source-of-truth JS file a week or unit is generated from. |
| **The gate** | `npm test`: validate.js plus the offline test files. |
| **Terminal question** | A unit's hard question, announced on day one and argued at the end. |
| **Road Not Taken** | The required section naming an alternative history, so the past does not read as a corridor. |
| **START HERE / PUSH FURTHER** | The two-tier question scaffold on unit block Briefs. |
| **BeHistorical** | The sibling AP World History project, sharing only the Canvas parser. |

---

## 17. Current state, in one paragraph

Week 01 is complete, the Social Media unit's five blocks are scaffolded with three
generated Briefs, and the offline suite is green at 295 structural checks across
five test entries. The browser suite covers one week page. Everything student-facing
is generated from two content modules, nothing on any page makes a network call, and
the only route from a student's writing to the teacher is a copy and paste into
Canvas with a self-verifying footer attached. What remains is content, 35 more
weeks and at least one more unit, plus the teacher-facing analysis surface.
