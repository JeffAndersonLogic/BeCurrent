# Canvas capture

How a student's writing gets from a browser to a spreadsheet, and what the record
footer is for.

Three files have to agree, and a change to any one breaks the other two:

| File | Role |
|---|---|
| `assets/js/becurrent-week-renderer-v1.js` | writes the footer |
| `scripts/lib/brief-capture-block.js` | supplies the brief's three answers |
| `scripts/lib/canvas-parse-core.js` | reads the footer |

## The path

1. A student writes on a week page. Each answer autosaves to `localStorage` under
   `becurrent-week-<weekKey>-<slot>`, with confidence under the same key plus
   `-confidence`.
2. The brief is a separate page inside an iframe, so the week page cannot see its
   textareas. Its capture block writes all three answers, their prompts, and their
   confidence ratings as one JSON object under `becurrent-brief-<weekKey>`. That
   object is the only channel by which those answers reach Canvas.
3. **Gather All My Work** collects every slot, emits one document, and appends the
   record footer.
4. The student copies it and pastes it into the Canvas assignment.
5. The teacher downloads submissions and runs
   `node scripts/parse-canvas-submissions.js <dir>`, which writes `responses.csv`
   and `exceptions.csv`.

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

- `expected` is how many slots the week defines. It comes from
  `expectedCaptureCount()` and **never** from a literal, because a hard-coded count
  reports a week whose brief is not yet published as three answers short. A wrong
  denominator is worse than none.
- `items` is how many were gathered. `items` below `expected` is an incomplete
  submission, reported as such rather than guessed at.
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
