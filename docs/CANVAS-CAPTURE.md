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

## Two gather surfaces, one grammar

There are **two** buttons labelled Gather All My Work, and which one a student uses
depends on which page they are on:

- **The week page's panel** collects every module slot, the brief's three answers
  among them. This is the whole-week submission.
- **The brief's own panel**, at the end of its questions, collects just that
  brief. For a **unit block** brief this is the only route there is: a block card
  on a unit page opens the brief directly, with no week shell behind it and no
  panel on any page above it. Before it existed, every unit block answer was
  written to `localStorage` and stranded there with every structural check green.

Both write the same footer, because `canvas-parse-core.js` is one parser. The
grammar therefore lives in **one** file, `scripts/lib/canvas-record-block.js`, and
is inlined into both writers:

- into the renderer by `node scripts/build-canvas-record.js`, between its
  `BEGIN/END INLINED CANVAS RECORD BLOCK` sentinels. `--check` fails on drift,
  which is what `validate.js` runs. Never hand-edit between the sentinels.
- into every generated brief by `brief-capture-block.js`, which `validate.js`
  re-derives and compares byte for byte.

Two copies would mean two answers to "did this student edit their work" depending
on which button was pressed, with nothing able to say which had drifted.

**The topic key and the denominator are not shared.** They are parameters, because
each surface counts its own slots: the week page passes `expectedCaptureCount()`,
the brief passes the number of questions on the page. Never a literal, in either.

## The path

1. A student writes on a week page. Each answer autosaves to `localStorage` under
   `becurrent-week-<weekKey>-<slot>`, with confidence under the same key plus
   `-confidence`.
2. The brief is a separate page inside an iframe, so the week page cannot see its
   textareas. Its capture block writes all three answers, their prompts, and their
   confidence ratings as one JSON object under `becurrent-brief-<weekKey>`. That
   object is the only channel by which those answers reach the week page's panel.
3. **Gather All My Work**, on either surface, collects its slots, emits one
   document, and appends the record footer.
4. The student copies it and pastes it into the Canvas assignment. The brief's copy
   writes **both** `text/html` and `text/plain` to the clipboard, so Canvas keeps
   the formatting and a plain-text target still gets the footer. Where the
   clipboard API is blocked outright, which it is on some managed devices, the
   rendered block is selected first so a manual Ctrl-C copies the formatted
   version rather than nothing.
5. The teacher downloads submissions and runs
   `node scripts/parse-canvas-submissions.js <dir>`, which writes `responses.csv`
   and `exceptions.csv`.

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
