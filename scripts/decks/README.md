# Teaching decks

The projected slides for a block, as `.pptx` files under `social-media/decks/`.

    npm i pptxgenjs                              # once, and not a repo dependency
    node scripts/decks/build-topic-05-deck.js
    node scripts/decks/build-topic-06-deck.js

## Why a .pptx and not a page on the site

Everything else in this repo is a web page because students read it on their own
devices. A deck is not that. It is projected by one person at the front of a
room, on whatever laptop is plugged in, sometimes with no network, and it gets
annotated and reordered mid-lesson by the teacher. PowerPoint and Google Slides
both open a `.pptx`, and neither needs this repo to have deployed.

So the deck is the one artifact here that is deliberately not a generated HTML
page, and it is kept out of `validate.js` on purpose: nothing a student can reach
depends on it, and the gate should not have an opinion about slides.

## Why there is still a generator

Because hand-editing a binary is how content drifts. The Topic 6 deck reads its
positions, precedents and questions out of
`scripts/lib/unit-content/social-media.js`, so the slides cannot disagree with
the Brief a student read the night before, and its `guards()` block fails the
build if that module stops saying what the slides claim it says. Rebuild rather
than nudge a text box.

Editing the `.pptx` by hand in PowerPoint is fine for a one-off classroom fix.
It will be overwritten the next time the generator runs, which is the intended
tradeoff: the generator is the source, the file is the output.

## pptxgenjs is not a declared dependency

Same reasoning as `playwright-core` for the browser suite. `validate.js` and the
offline suite must stay runnable on a bare checkout with no `npm install` at all,
which is what CI's `structure` job proves by running with none. A deck builder is
not on the push path and has no business adding a package to it.

## Which topics have decks

| Topic | Content module | Deck |
|---|---|---|
| 1, Where the Money Comes From | planned card | none, taught on paper |
| 2, Somebody Made a Film About This | planned card | none, the film |
| 3, Inside the Algorithm Box | yes | not written |
| 4, The Impact and the Digital Footprint | yes | not written |
| 5, How a Lie Travels | yes | `topic-05-how-a-lie-travels.pptx` |
| 6, Who Gets to Decide? | yes | `topic-06-who-gets-to-decide.pptx` |

Both builders read `UNIT.topics` and find their topic by `n`, so a deck is one
constant away from pointing at a different lesson and cannot silently point at
none: `guards()` throws if the topic is missing, has been renamed, or has stopped
carrying what the slides claim.

**Nothing on a slide restates a topic title.** The recap slide on each deck derives
every earlier topic's title from the module. It was typed by hand once, and it went
stale the day Topic 4 was retitled to The Impact and the Digital Footprint, with
nothing to say so. That is the whole argument for deriving in one sentence.

## The design kit

`deck-kit.js` is the shared design system: the palette lifted from
`assets/css/becurrent-brief.css`, three type roles, and six primitives. Add to it
rather than inlining a one-off into a deck, for the same reason the briefs share
a renderer.

Three rules in it that are not decoration:

- **Content slides are light.** The polarity section of `CLAUDE.md` is about
  rooms: a lamp projector can only add light, so a dark slide degrades to grey in
  a lit classroom. Only the opening and closing slides are dark.
- **Cambria, Calibri and Courier New, not the brand faces.** A `.pptx` carries a
  font *name*, not a font. Source Serif 4 and Source Sans 3 are not on the
  projector laptop, so they would silently substitute and reflow the slide in
  front of the room. These three ship with Office everywhere.
- **No stripes.** No accent bars, no rules under titles, no single-edge borders.
  Separation is whitespace, a tint, and a soft shadow.

## Checking a deck before it goes in front of a room

Overflowing text is the defect that actually happens, and it is invisible in the
generator. Convert and look at every slide:

    soffice --headless --convert-to pdf --outdir /tmp deck.pptx

**Install the metric-compatible fonts first, or the check lies to you.** Without
`fonts-crosextra-caladea` and `fonts-crosextra-carlito`, LibreOffice substitutes
something wider for Cambria and Calibri and reports overflow that the real deck
does not have, on slides that are fine, while a genuinely broken one hides in the
noise. This is the same trap as the eBook's font-dependent reflow check in
BeHistorical: a check allowed to run against the wrong fonts will report
confidently about a page nobody will ever see.

## Speaker notes are the teaching script

Every slide carries one, in `NOTES`, in slide order. They are kept in one array
rather than beside each slide so the whole spoken arc reads in a single pass,
which is how a block actually gets rehearsed. They are also where anything that
should not be projected lives: the film title stays out of Topic 5's slides and
notes both, until Block 2 has been taught.
