# BeCurrent 2.0 — design prototype

A newsroom students walk into, not software they complete.

**This is not the live student site.** Nothing links here from the production
front door, and `validate.js` fails the build if anything starts to. It is one
vertical slice, built to be judged before any of it becomes the real thing.

```bash
npm run serve
# then open http://127.0.0.1:8765/prototype-v2/
```

`npm run serve` rather than opening the files directly: the pages load their
content through `<script src>`, which `file://` treats as cross-origin.

## What is here

| Page | What it demonstrates |
|------|----------------------|
| `index.html` | Today first. Masthead, Current Wire, Iran hero, today's headline, the Reverse History preview, the investigation shelf, Student/Teacher toggle, continue-where-you-left-off |
| `investigation-iran.html` | The whole arc: event anchor, figures, prediction, geography, the Reverse History timeline, the 1979 turning point, a real primary source, the evidence sort, the perspective split, claim builder, reflection, sources |
| `my-work.html` | Everything saved, what is still empty, and an honest note about Canvas |

Try, in this order: pick a few explanations on the **prediction**, walk the
**timeline** with the arrow keys, sort a couple of **evidence** statements, write
a **claim**, then open **My Work**. Come back to the homepage and the hero offers
to continue where you stopped.

## The three ideas worth reviewing

**Reverse History is a direction, not a theme.** Today sits at the left of the
timeline and each step right goes further back, answering a question the step
before it raised. The arrows point the other way, toward the present, because
that is the direction consequences travel. The chain does not bottom out in a
single cause: 1953 carries a *Historians disagree* note, and the last node ends
on another question rather than an answer.

**The prediction comes before any history.** Students pick what they think is
going on before they are told anything, and the reflection at the end replays
exactly that. If the two ever swap places the whole structure collapses into an
ordinary reading with a quiz on it.

**Every kind of evidence looks like what it is.** A turning point is a full-width
spread, a primary source is a document, a statistic is a number at scale, a
quotation has no box at all. None of it is one card component with a modifier
class, because that is how a publication ends up looking templated.

## The two-layer content model

This is the part that decides whether the thing is maintainable.

```
assets/data/iran-current.js       ← THE ONLY FILE YOU EDIT WHEN THE NEWS MOVES
assets/data/iran-history.js          the spine: 1953 to now. Stable for a year.
assets/data/iran-investigation.js    the teaching structure. Edited when the
                                     LESSON changes, not when the news does.
```

Updating the investigation is: change `asOf`, rewrite `status`, put the newest
developments at the top of that array, drop the oldest off the bottom. About ten
minutes. Nothing in it touches 1979.

Change `asOf` **even when nothing else changed**. "We checked and nothing moved"
is information; a stale date is a lie, and this is a course about verification.

The Current Wire is `assets/data/bc2-wire.js` — three to five headlines, about
five minutes. It is curated by hand and there is no live feed, deliberately: an
automatic feed brings rate limits, dead links, licensing questions, and unvetted
stories appearing on a projector in a room full of ninth graders.

A **new investigation** is a content file plus an entry in
`assets/data/bc2-investigations.js`. Every treatment on the Iran page is a
data-driven component in `assets/js/`; nothing in the renderers names Iran.

## Facts and sourcing

Every current-event claim is sourced to a named outlet and carries a link. The
historical spine follows CFR's `U.S. Relations With Iran` timeline. The primary
source is the real declassified CIA internal history published by the National
Security Archive in 2013.

**Nothing was invented** — no headline, no quotation, no statistic. Where sources
disagree the page says so instead of picking one: the mid-2026 ceasefire dates
are reported differently by CFR and by other outlets, and the casualty figures
differ by thousands depending on who counted. Those disagreements are shown to
students on purpose. They are the most teachable thing on the page.

## What this prototype does NOT do

Stated plainly so nobody assumes coverage that does not exist.

1. **No Canvas capture.** Work saves to the device and stops there. The record
   footer, `Gather All My Work` and the parser round trip are all untouched
   production machinery that this prototype does not wire into. `my-work.html`
   says so rather than showing a Submit button that lies.
2. **No AI coach.** The Reverse History Coach is a visible, disabled placeholder.
   BeCurrent still has no MagicSchool bot of its own, and a button pointing at
   another course's room is worse than a button that does nothing and admits it.
3. **One investigation.** The other five are questions with no content behind
   them, and their cards say "not written yet" rather than carrying an invented
   summary.
4. **No photography.** Every image is generated local artwork. `hero.photo` and
   `feature.photo` are empty strings; set either and the photograph layers on top
   with `onerror` removing itself, so a dead URL degrades to the plate.
5. **Teacher mode protects nothing, and is not asked to.** This is a static site
   on GitHub Pages, so everything it reveals is in the page source either way. It
   carries standards, timing and instructional notes. No answer keys ship, in
   either mode, and none should be added here.

## What it is held to

`npm test` covers the prototype for the things that fail silently: no capture
channel off the device, no production storage keys, and no link to it from the
live site. `npm run test:browser` runs `scripts/test/prototype-v2.test.js`, which
drives the real pages in Chromium — timeline keyboard operation, writing that
survives a reload, the prediction loop, WCAG AA contrast on every rendered text
colour in both modes, and reflow at 320px.

**The 320px pass fetches the real Playfair Display and measures with it.** Reflow
is a width test and the fallback is far narrower, so a run that cannot reach the
font host would measure Georgia and report a confident green about a page no
student will ever see. Where the font genuinely cannot be fetched that pass
**skips, loudly**. A skip there means "not tested", never "fine". It found a
262px overflow the fallback was hiding.

## Before any of this becomes production

- Decide whether the two-layer content split is the right seam. Everything else
  depends on it.
- Wire the Canvas record footer into the claim and reflection fields.
- Point the coach at a real BeCurrent bot, or remove the placeholder.
- Replace the generated plates with licensed photography if that is wanted.
- Delete the "Prototype is isolated from the live site" section in `validate.js`
  when it becomes the front door. Do not weaken it; delete it.
