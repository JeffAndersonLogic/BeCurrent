# Assessments

This folder is where an end-of-unit assessment gets built. **Almost nothing in it
is committed**, and that is the point of this file.

## Why the exam is not in the repository

This repository is public, because GitHub Pages serves it, and `.nojekyll` means
every committed file is served verbatim at a guessable URL. A student who finds
the site is one search away from the repository behind it.

So an exam committed here is a published exam, and an answer key committed here is
a published answer key. Git history keeps both after a delete. That failure is
unlike every other one this repo guards against: a dead link can be fixed and a
stale target can be rebuilt, but the moment a student has read the questions the
assessment is spent, and no commit undoes it.

What lives in the repo is the machinery, which is safe and which is the part that
rots if it is kept by hand:

| In the repo | Not in the repo |
|---|---|
| `scripts/build-assessments.js`, the generator | `scripts/lib/assessment-content/<unit>.js`, the item bank |
| the Assessments section of `scripts/validate.js` | `<unit>-exam.html`, the student exam |
| this README | `<unit>-KEY.md` and `<unit>-KEY-canvas.txt` |

`.gitignore` enforces the split, and `validate.js` checks the enforcement: it asks
git directly whether each key file is ignored, so an edit that un-ignores the
folder fails the push rather than publishing a key.

## Where the bank actually lives

Somewhere private. A private repository, or a synced folder, or the teacher's own
machine. Wherever it is, keep the whole `scripts/lib/assessment-content/`
directory together and drop it back in place to rebuild.

## Building

```bash
node scripts/build-assessments.js            # write the three flavours
node scripts/build-assessments.js --check    # fail on drift, write nothing
node scripts/build-assessments.js --out DIR  # write somewhere outside the repo
```

Three files come out of one bank, and none of them builds a question of its own:

- **`<unit>-exam.html`** is the student exam. Self-contained, so it prints
  correctly from a machine that has never seen this repo, and it carries no
  answers. The last page is an answer sheet, which is one page to grade per
  student instead of seven.
- **`<unit>-KEY.md`** is the teacher edition: a blueprint derived from the bank,
  every item with its answer, and a note per wrong option saying which
  misconception it catches. That last part is what makes the results worth reading
  rather than totalling. A class that piles onto one wrong option has named the
  twenty minutes to reteach.
- **`<unit>-KEY-canvas.txt`** is the same bank in `text2qti` source form, for
  giving the test in Canvas instead of on paper. Canvas Classic Quizzes imports a
  QTI package and nothing else, so this is one conversion short of importable:

  ```bash
  pip install text2qti
  text2qti social-media-KEY-canvas.txt      # writes the .zip beside it
  ```

  Then Canvas: Settings, Import Course Content, QTI .zip file. The import arrives
  unpublished. Check the item count before publishing; an import that quietly
  dropped one is a quiz out of 24 that nobody notices until it is graded.

  Two things about the conversion, both found by running it rather than assuming
  it. The `%%` comment block at the top of the file, which carries these
  instructions and the warning that the file holds the answers, is stripped and
  does **not** become a question or a quiz description. And text2qti writes
  `cc_maxattempts` as **1**, so the imported quiz allows a single attempt. That is
  right for a test and it is the opposite of the News Log's Unlimited, which is
  set for a reason; do not carry a habit from one to the other.

  This conversion is deliberately not in any suite. It needs a Python package,
  and `validate.js` has to stay runnable on a bare checkout with no install at
  all, which is the same reason `scripts/brand/build-wordmark.py` sits off the
  test path. What the offline suite proves is that the source file still matches
  the bank; whether text2qti is installed is a fact about your machine.

Writing the zip from here instead would mean committing a binary no diff can read,
whose reproducibility check would have to special-case timestamps, and whose
contents are the answer key. A text file is reviewable and covered by the same
ignore rule.

## What the gate checks

Item shape is normally a teaching decision, and this repo's rule is that the gate
stays silent on those. The Assessments section of `validate.js` is the exception,
for two reasons: this room is grades 9 through 12 in one section with a heavy IEP
and 504 load, and the shapes it bans are the ones that test whether a student can
survive a question rather than whether they learned anything.

- The key cannot be committed, asked of git directly rather than assumed.
- The student exam does not encode the key. It is rebuilt from a bank with every
  answer index moved and asserted byte-identical, so an exam that leaked the
  answers through option order would fail even though nothing on the page looked
  wrong.
- Every item has four options, all distinct, with an answer index that points at
  one of them and a note for each.
- No "all of the above", no "none of the above", no negated stem.
- No single letter is the answer to more than 40 percent of the items.
- No standalone `AP` framing, and no withheld film title.
