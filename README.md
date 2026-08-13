# BeCurrent

A static Current Events lesson platform. Every class period opens with today's news
and then goes deep on one theme, traced backwards to where it started.

Sibling to [BeHistorical](https://github.com/JeffAndersonLogic/ap-world-history),
and it shares that project's Canvas capture pipeline so one teacher tool reads
both courses.

## The block

One class meeting is a 90-minute block, and it runs in two halves.

**The Desk**, the first twenty-five minutes of *every* class: CNN 10, then four
beats on the board (Local, National, International, and one that rotates through
Politics, Sports, Entertainment and Pop Culture), then one of the five questions
run properly at one story. It is a protocol rather than content, so it is one
generated page that never goes stale and carries no headline. `daily/index.html`.

**The Unit**, the remaining sixty-five, for weeks at a time: one theme traced
backwards from something happening now to where it started, ending on a question
students have to argue. Six across the year. `scripts/lib/unit-content/`.

You need both. The daily half without the units is a news feed; the units without
the daily half are a history class.

## The modules

A unit block draws on the same eight modules, in whatever order it needs, because
the point is the method rather than the story:

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

## The look

`assets/css/becurrent-brand.css` is the one file that defines a colour or a face,
and its header explains where each value came from and which red is allowed
where.

**Red and black, in BeHistorical's type.** The two courses are the same method
taught by the same teacher, so they share a type family and are told apart by
colour: BeHistorical is bronze on parchment, this is red and black on newsprint.
Headings are Cinzel, body text is Libre Baskerville, labels are Montserrat, all
three self-hosted in `assets/fonts/` because no student-facing page in this repo
makes a third-party request.

There is no third accent. Where a second series has to be distinguished from the
first, the second one is black. The focus ring is ink, never the accent, because
red is already on nearly every card border.

The mark is BECURRENT set in Cinzel, tracked wide, two-tone: BE in a neutral,
CURRENT in red. Two colourways, because BE cannot be white on a light ground
without disappearing.

`python3 scripts/brand/build-wordmark.py` redraws the plate, both wordmarks and
the favicon. It needs `fonttools` and is off the test path on purpose; the four
SVGs are committed.

## Deploying

GitHub Pages serves `main`, so what is on `main` is what students have. Push to a
working branch, let Validate go green, then fast-forward `main` to that commit.
`CLAUDE.md` has the branch rule and how to apply it.

## Status

Both suites are green: 414 structural checks and 39 browser assertions. The Desk,
the orientation week and the Social Media unit are complete. The other five units
are on the front door as planned cards with no content modules yet, and the weekly
News Log the Desk promises has not been built, so nothing from the daily half
reaches Canvas. The teacher-facing Skills Lens has not been built. The full list of known gaps is at the bottom of `CLAUDE.md` under "What
is missing", so nobody has to guess what is covered.
