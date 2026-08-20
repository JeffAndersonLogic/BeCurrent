# Drafts

Text that has been written and reviewed but does not have a content module yet.
Nothing here is served, nothing here is linked, and `validate.js` does not look
at it.

A draft leaves this folder in one direction only: into
`scripts/lib/unit-content/<unit>.js` as a real block, so that
`npm run build:units` generates the page. Do not link a file from here, and do
not copy one into a unit folder by hand. A hand-authored Brief sitting beside
generated ones is the failure the content model exists to prevent: the next
change to the Brief template reaches every generated page and silently misses
that one.

## What is here

- `topic-05-brief-rewrite.html`, the Social Media Topic 5 Brief (How a Lie
  Travels), rewritten for ninth grade in August 2026 after the first version
  came back as too informal and hard to follow. It is the body markup only, in
  the same shape `unit-brief-page.js` emits, so it can be lifted into a content
  module section by section. **It has no capture block**, deliberately: a Brief
  that students write into has to be generated, because the capture block and
  its storage key are what `validate.js` checks in four places.

## Register, for anything written into this folder

Ninth grade, academic but not dry, and readable once at speed by a room with a
heavy IEP and 504 load:

- One idea per sentence, and most sentences under twenty words.
- Subject, verb, object. No inverted or aphoristic constructions.
- Define a term in plain words the first time it appears, then reuse that same
  term rather than a synonym.
- No rhetorical questions in the prose. A question mark means a student is meant
  to answer it.
- The concrete example comes immediately after the abstract claim, never before.
- Signpost: "three forms", "first", "second". A reader who loses the thread
  should be able to find it again from the paragraph alone.
- No idioms, and no metaphor that has to be decoded before it can be understood.

A question names one task and one thing to hand in. "Explain the mechanism" is
not a task a ninth grader can act on; "explain, in three steps, how it could
change the result of an election" is.
