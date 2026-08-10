# BeCurrent

A static Current Events lesson platform. One story a week, worked eight ways.

Sibling to [BeHistorical](https://github.com/JeffAndersonLogic/ap-world-history),
and it shares that project's Canvas capture pipeline so one teacher tool reads
both courses.

## The week

Every week is the same eight modules, in the same order, because the point is the
method rather than the story:

| # | Module | What it asks |
|---|--------|--------------|
| 01 | Where in the World | Put the story on a map before arguing about it |
| 02 | The Brief | Read the week's narrative, answer three questions |
| 03 | Background | The history behind the headline |
| 04 | Coverage Compare | Same facts, two outlets. What did each choose? |
| 05 | Source Check | Who published this, and how would you know if it were wrong? |
| 06 | Claim & Evidence | Sort the reporting from the interpretation |
| 07 | The Deliberation | Take a position, hear the other side, revise |
| 08 | Checkpoint | Show what you can now do with this story |

Those eight map onto the five questions taught in Week 01: who is telling me this,
what is fact versus claim, what did they put first, who else has it, and what would
make me wrong.

## Running it

```bash
npm install            # points git at .githooks/ so npm test runs before every push
npm run serve          # then open http://127.0.0.1:8765/
npm test               # the gate: structure, reproducibility, Canvas round trip

npm i playwright-core  # once, for the browser contracts
npm run test:browser   # modal focus, scroll lock, deck, capture, footer round trip
```

`npm run serve` rather than opening the HTML directly: the briefs load through an
iframe, which `file://` blocks.

## Adding a week

```bash
cp scripts/lib/week-content/week-01.js scripts/lib/week-content/week-02.js
# edit it, then:
npm run build:weeks
npm test
```

Every week is generated from its content module. `week-NN/`, `assets/data/week-NN.js`,
and `index.html` are all build output, and the offline suite fails if any of them is
hand-edited. See `CLAUDE.md`, "The Content Model", for why that is worth enforcing.

## How student work reaches the teacher

Canvas, and nothing else.

A student's writing saves to `localStorage` on the device they typed it on. At the
bottom of a week page, **Gather All My Work** assembles every answer, including the
three from the brief, into one document with a machine-readable footer, which the
student copies and pastes into the Canvas assignment.

The teacher turns the Canvas download back into a spreadsheet:

```bash
node scripts/parse-canvas-submissions.js path/to/unzipped-submissions/
# writes responses.csv and exceptions.csv
```

The footer is the reason `exceptions.csv` exists. It records how many answers the
week expected, how many were gathered, and a hash of each one, so a truncated,
blank, or hand-edited paste is reported as a specific exception rather than silently
recorded as a student who wrote nothing. Details in `docs/CANVAS-CAPTURE.md`.

Nothing on any page makes a network call with student writing in it. `validate.js`
fails the build on a `<form action>`, a `fetch()`, or an `XMLHttpRequest` anywhere a
student can reach.

## Deploying

GitHub Pages serves `main`, so what is on `main` is what students have. Push to a
working branch, let Validate go green, then fast-forward `main` to that commit.
`CLAUDE.md` has the branch rule and how to apply it.

## Status

Week 01 is complete and both suites are green: 168 structural checks and 32 browser
assertions. Weeks 02 to 36 are unwritten and the teacher-facing Skills Lens has not
been built. The full list of known gaps is at the bottom of `CLAUDE.md` under "What
is missing", so nobody has to guess what is covered.
