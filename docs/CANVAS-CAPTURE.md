# Canvas capture

How a student's writing gets from a browser to a spreadsheet, and what the record
footer is for.

Four files have to agree, and a change to any one breaks the others:

| File | Role |
|---|---|
| `scripts/lib/canvas-record-block.js` | **the grammar**, one copy, inlined into both writers |
| `assets/js/becurrent-week-renderer-v1.js` | writes the week page's footer |
| `scripts/lib/brief-capture-block.js` | holds the brief's answers, and writes the brief's own footer |
| `scripts/lib/canvas-parse-core.js` | reads the footer |

## Three gather surfaces, one grammar

There are **three** gather buttons, and which one a student uses depends on which
page they are on:

- **The week page's panel** collects every module slot, the brief's three answers
  among them. This is the whole-week submission.
- **The brief's own panel**, at the end of its questions, collects just that
  brief. For a **unit topic** brief this is the only route there is: a topic card
  on a unit page opens the brief directly, with no week shell behind it and no
  panel on any page above it. Before it existed, every unit topic answer was
  written to `localStorage` and stranded there with every structural check green.
- **The Desk's panel**, labelled **Gather My Week**, collects the daily filings.
  This is also the only route there is, and it is the one that carries work every
  single class period. See "The Desk" below.

All three write the same footer, because `canvas-parse-core.js` is one parser. The
grammar therefore lives in **one** file, `scripts/lib/canvas-record-block.js`, and
is inlined into all three writers:

- into the renderer by `node scripts/build-canvas-record.js`, between its
  `BEGIN/END INLINED CANVAS RECORD BLOCK` sentinels. `--check` fails on drift,
  which is what `validate.js` runs. Never hand-edit between the sentinels.
- into every generated brief by `brief-capture-block.js`, which `validate.js`
  re-derives and compares byte for byte.
- into the Desk by `desk-capture-block.js`, likewise re-derived and compared.

More copies would mean more answers to "did this student edit their work"
depending on which button was pressed, with nothing able to say which had drifted.

**The topic key and the denominator are not shared.** They are parameters, because
each surface counts its own slots: the week page passes `expectedCaptureCount()`,
the brief passes the number of questions on the page, the Desk passes the days it
actually gathered times its slots per day. Never a literal, in any of them.

## The Desk

The daily half of the block, and the surface that carries work most often: about
180 filings a year against 5 briefs a unit. Read
`scripts/lib/desk-capture-block.js` before touching any of it.

**The key is dated by the browser, not by the build.** `becurrent-desk-<YYYY-MM-DD>`,
with the date stamped at load from the **local** date getters. That is what lets one
dateless generated page give every class period its own clean sheet while every
earlier day stays on disk. `toISOString()` is refused by `validate.js`: it is UTC,
so it rolls the date over at 7 or 8pm Eastern and would hand an after-school student
a blank sheet with their afternoon's work apparently lost.

**One button gathers the week, and the week always contains today**, so there is no
separate "copy today". Days are found by checking the seven candidate keys for the
Monday-to-Sunday week containing today, rather than scanning `localStorage`, so a key
left by another page or an older schema can never wander into the paste. Last week is
excluded: it has already been submitted under its own weekly assignment.

**Six records a day: one Source record per story, then one per question.** The three
facts are a record of their own rather than a loose line above the questions, and
that is a correctness requirement, not a layout preference. Everything between one
record's `My response:` marker and the **next** record's label is what the parser
hashes for that record, so a bare `Outlet: … Published: …` line sitting between two
questions gets swept into the preceding answer's hashed region and every filing in
the paste comes back `EDITED`. Nothing about the rendered page would look wrong.
**Anything printed between the first label and the footer must belong to some
record.** Only the document head, above the first label, is free.

**The label carries the date; the slot does not.** A label reads
`Friday, September 12 Local story, Why it caught me`, so five days of the same two
questions stay distinguishable to a teacher reading thirty of these, and every row
of `responses.csv` is attributable to a day. The slot stays `desk-local-why` on
every day of the year, which is what lets one question be looked at across a week
and across a room.

**The day banner is the first words of a record's own label, not a heading of its
own.** This looks like a decoration and is a correctness requirement, for the same
reason the facts are a record. A week's log needs its days visibly divided, and the
obvious way is an `<h2>` with the date before each day's first record. That way is
broken and broken invisibly: a free-standing `<h2>` there sits after the previous
day's last `My response:`, gets hashed into that answer, and the whole paste comes
back `EDITED` while the page looks perfect.

So the banner is rendered by splitting one label across two heading elements:

```html
<h2>Monday, September 8</h2><h3>Local story, Source</h3>
```

with the label `Monday, September 8 Local story, Source`. The label match therefore
starts *at* the banner, the previous record's hashed region ends before it, and the
division costs nothing.

**The join has to be plain whitespace.** `findLabelIndex` tries an exact `indexOf`
first, which fails here because the rendered text has a newline between the two
headings, then falls back to a whitespace-insensitive regex built by replacing every
run of spaces in the label with `\s+`. That fallback is what carries this. Put a
comma, a bullet or a dash at the split point and the loose regex looks for that
character where the rendered text has a newline, nothing matches, and every record
reports `MISSING_BODY`.

Every *later* record of the same day still prints its whole label, or it too reports
`MISSING_BODY`. The repeated date is wrapped in a `<span class="rec-day">` so the
heading's text content stays byte-identical to the label while the page renders the
repetition as small grey type. Canvas usually strips the span; that is fine, because
the words are what the parser reads.

In the plain-text flavour the divider is a rule of `=` **under** the day's first
label, never above it. Above it would be inside the previous record's hashed region,
which is the same trap in a different costume.

**`expected` counts the days actually filed, not the class periods held.** The Desk
has no calendar, so it cannot know the week had three meetings, and it never reports
an absent day as a shortfall. The completeness signal is the **Days filed** line in
the paste's head, which is above the first label and therefore free text. A blank box
inside a day that *was* filed arrives as a `BLANK` exception, which is the honest
version of that report.

**A day with nothing in it is not gathered at all**, rather than printed as six
blanks. A student who opened the page and left has not attempted and abandoned six
boxes, and reporting it that way would say they had. Likewise **a story with nothing
in it emits an empty Source record** rather than three lines reading `(blank)`: an
empty record is reported as `BLANK`, which is the honest signal, while three lines of
the word "blank" is the same information dressed up as work and is what a teacher
scrolling a five-day log has to read past on every unfilled lane.

## The path

1. A student writes on a week page. Each answer autosaves to `localStorage` under
   `becurrent-week-<weekKey>-<slot>`, with confidence under the same key plus
   `-confidence`.
2. The brief is a separate page inside an iframe, so the week page cannot see its
   textareas. Its capture block writes all three answers, their prompts, and their
   confidence ratings as one JSON object under `becurrent-brief-<weekKey>`. That
   object is the only channel by which those answers reach the week page's panel.
3. On the Desk, each box autosaves into one JSON object per day under
   `becurrent-desk-<YYYY-MM-DD>`, keyed `<lane>-<field>`, with each question's
   prompt and confidence stored beside its answer.
4. **Gather All My Work**, or **Gather My Week** on the Desk, collects its slots,
   emits one document, and appends the record footer.
5. The student copies it and pastes it into the Canvas assignment. The brief's copy
   writes **both** `text/html` and `text/plain` to the clipboard, so Canvas keeps
   the formatting and a plain-text target still gets the footer. Where the
   clipboard API is blocked outright, which it is on some managed devices, the
   rendered block is selected first so a manual Ctrl-C copies the formatted
   version rather than nothing.
6. The teacher downloads submissions and runs
   `node scripts/parse-canvas-submissions.js <dir>`, which writes `responses.csv`
   and `exceptions.csv`.

**On the Desk, step 5 happens every day, and that is the only backup there is.**
The News Log assignment has Unlimited attempts, so Monday is attempt 1 and Friday
is attempt 5 carrying the whole week. A week of filings lives in one browser's
`localStorage` until it is copied out, nothing in this course may send student
writing anywhere on its own, and a cleared Chromebook profile on Thursday takes
Monday to Wednesday with it. Cap the attempts and the backup is gone.
`docs/canvas/news-log.md` is the generated assignment, and `validate.js` fails if
it stops saying Unlimited or Text Entry.

## The shape of the brief's paste, and why it is that shape

Four lines per question, in this order, and the order is set by the parser rather
than by taste:

```
The Brief, Question 1          <- an <h3>. Must be the footer's `lab` verbatim.
Confidence: 4 of 5, Solid      <- above the marker, on purpose
Question: <the question>       <- bold. `Question:` is what extractPrompt finds.
My response:                   <- `My response:` is what extractResponse finds.
<the response>                 <- italic, one <p> per paragraph
```

Three things here are load-bearing:

- **The heading is the record label, verbatim.** `findLabelIndex` locates each
  response by searching the body for the `lab` the footer declares. A heading that
  reads differently gives `MISSING_BODY` on every record with the footer still
  parsing perfectly.
- **The confidence sits above `My response:`.** Everything below that marker is
  what gets hashed against `rh`. A confidence line underneath reads as part of the
  student's writing and flags every answer `EDITED`.
- **A blank answer emits nothing at all.** A friendly "No response recorded."
  placeholder in the response region hashes as writing: the parser calls the answer
  `EDITED`, which is an accusation, and never calls it `BLANK`, which is the truth.
  The student learns about blanks from the gather status line and the teacher from
  `w=0`, both outside the hashed region.

`scripts/test/brief-gather.test.js` is the gate on all of it. It drives a real unit
block brief in Chromium, gathers, and puts the result through the real parser in
both clipboard flavours.

## Why the footer exists

Without it, a truncated paste, a paste from a wiped `localStorage`, and a genuinely
blank assignment are indistinguishable. All three arrive as a document with the
right headings and no writing under them, and all three read as "this student did
nothing".

The footer makes the difference detectable:

```
--- BECURRENT RECORD, do not edit ---
#BHV|v=1|topic=w01|copied=<iso>|items=6|expected=8|sum=<hash>|#
#BHR|i=01|slot=where-response|lab=Module 01, Where in the World|w=84|c=502|ph=<hash>|rh=<hash>|cf=4|#
...
--- END BECURRENT RECORD ---
```

- `expected` is how many slots the surface defines. On the week page it comes from
  `expectedCaptureCount()`, on a brief from the questions on the page, and **never**
  from a literal, because a hard-coded count reports a week whose brief is not yet
  published as three answers short. A wrong denominator is worse than none.
- `items` is how many were gathered. `items` below `expected` is an incomplete
  submission, reported as such rather than guessed at.

  Note that `INCOMPLETE` and `BLANK` are different findings and must not be
  conflated. `INCOMPLETE` means records are missing from the paste, which is a
  truncated copy: a plumbing failure. `BLANK` means the record arrived and the
  student wrote nothing: a teaching matter. A brief gathered with two empty answers
  is complete and twice blank.
- `rh` is a hash of the response, so writing edited after the copy is flagged
  `EDITED` rather than accepted.
- `sum` is a hash over every `slot:hash` pair, so deleting a whole record line
  breaks it too, not just editing the text inside one.
- `ph` is a hash of the prompt the student actually saw, which is how "answered a
  different question" becomes detectable.

The format is deliberately dumb. Canvas's editor rewrites HTML, so nothing may
depend on a tag, an attribute, or a class surviving. Every record is one
self-delimiting line that a regex recovers from the submission's text content even
if every newline collapses.

**The hash is not a signature.** FNV-1a, 32 bits, chosen because it is small and
identical in the browser and in Node. It detects accident and drift. It is not
tamper-proof and nothing downstream should treat it as such.

## The one thing the hash cannot catch

Paragraph structure. The hash normalizes whitespace on purpose, so that Canvas
rewriting line breaks does not flag every honest submission. The cost is that if
Canvas ever flattened a student's blank line, the hash would still verify.

That is why the response goes out as sibling `<p>` elements rather than with `<br>`,
and why `scripts/test/canvas-paragraphs.test.js` exists: it asserts that every
markup shape Canvas is known to emit for a blank line parses back into two
paragraphs, and that a soft `<br>` does not.

## One parser, two courses

`scripts/lib/canvas-parse-core.js` is shared with BeHistorical. The `#BHV|` and
`#BHR|` tokens are identical in both, so a teacher can drop either course's
submissions on the same tool and get the same answer to "did this student edit
their work".

Only the human-readable sentinel differs, because that line is visible in the
student's paste and `BEHISTORICAL RECORD` in a Current Events submission reads as a
bug. `RE_SENTINEL` accepts either wording, and the paragraph test asserts both cut
the body correctly.

If you change the machine grammar, change it in both repos and bump
`SCHEMA_SUPPORTED`. Two implementations would mean two answers depending on which
door the teacher used.

## Never commit student work

This repo is public, because Pages serves it. `.gitignore` excludes `submissions/`,
`responses.csv`, and `exceptions.csv`. Do not add a real submission as a fixture:
the one committed Canvas fixture, `scripts/test/fixtures/canvas-download-studenttest.html`,
is the teacher's own writing as Test Student.
