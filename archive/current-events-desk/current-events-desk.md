# BeCurrent, the Current Events Desk

The weekly current events activity. Replaces the printed Weekend Update
worksheet with a page that saves itself, tracks progress, and rebuilds itself
from one small config file each week.

**Student page:** `current-events/index.html`
**The file you edit weekly:** `assets/data/current-events-edition.js`

---

## THE SIXTY SECOND WEEKLY UPDATE

Open `assets/data/current-events-edition.js` and change four things:

1. `edition.id` to this week's date, `YYYY-MM-DD`.
2. `edition.dateline` to the date as students should read it.
3. `edition.label` to the next edition number.
4. `beats` to two or three different AP themes than last week.

Save. That is the whole job. Everything else on the page renumbers, re-times,
and re-namespaces itself.

Optional, another minute: paste this week's articles into `pinned`, and comment
stations in or out of the `stations` array.

### Why `edition.id` matters more than it looks

It is the autosave namespace. Every answer is stored under
`behistorical-current-events-{edition.id}-{field}`. Change the id and every
student opens a clean sheet, while last week's answers stay safely stored under
last week's id rather than reappearing in this week's boxes.

**If you forget to change it, students see last week's answers already filled
in.** That is the one failure this design has, and it is the one field you must
not skip.

---

## WHAT CHANGED FROM THE OLD WORKSHEET

The old activity asked students to find news and write a couple of sentences
about each. That instinct was right, and the desk keeps all of it: the three
outlet comparison, the Billboard and best seller and box office charts, the
local paper, the odd story, and the student's own pick are all still here.

What is new is that every one of them now ends in a historian's move.

| Old | Now |
|---|---|
| Name the top story at CNN, Reuters, Fox | Same three plus one non US desk, and then quote two of them side by side and name what the wording changed |
| Read the linked article, answer a question | Same, but the block is optional. With nothing pinned it becomes The Editor's Chair: choose the lead story and defend the choice against one you rejected |
| Find news stories, write a couple of sentences | Work the Beats. Every story gets filed under an AP World theme, and saying why it belongs there is the graded half |
| (nothing) | **The Historian's Hook.** Pick a story, pick the unit of this course it rhymes with, then name what is genuinely new and what has been true for centuries. This is CCOT practice on today's news, and it is the reason the activity exists |
| (nothing) | Trace It Back, Trace It Forward. Separate the trigger from the condition, then project one effect to 2050 |
| (nothing) | The Reliability Check. Lateral reading: who published it, who benefits, and what does a second independent source say |
| Billboard, best seller, box office | Same three plus one viral item, then: a historian in 2126 finds only this snapshot, what do they conclude, and what would they get wrong |
| Local story, odd story | Same two, each with a follow-on. Who does the local story change something for, and what does the odd story take for granted |
| Pick your own story | Same, but it ends in an arguable one sentence claim rather than a summary |

Plus the closing ritual: the whole day in one sentence, written like a wire lede.

And on the mechanics: autosave on every keystroke, a live progress meter, word
count targets, Copy All My Work for the Canvas hand off, and a print stylesheet
for the day the network is down.

---

## THE NINE STATIONS

Switch stations on and off by editing the `stations` array. The page renumbers
itself and recalculates the time budget, so nothing has to be kept in sync.

| Key | Station | AP skill | Minutes |
|---|---|---|---|
| `frontpage` | The Front Page Test | Sourcing | 8 |
| `beats` | Work the Beats | Contextualization | 10 |
| `briefing` | Editor's Briefing, or The Editor's Chair | Evidence Usage / Argumentation | 10 / 7 |
| `hook` | The Historian's Hook | CCOT | 8 |
| `causation` | Trace It Back, Trace It Forward | Causation | 8 |
| `reliability` | The Reliability Check | Sourcing | 8 |
| `pulse` | The Culture Pulse | Complexity | 6 |
| `local` | Local and Odd | Contextualization | 5 |
| `desk` | Your Desk | Claims & Thesis | 6 |

All nine is about seventy minutes, which is a block rather than a class. The
seven shipped in the default run about fifty.

**Rotate them.** Running the same seven every Friday turns this back into the
worksheet it replaced. The skills should repeat; the shape should not.

### `briefing` has two faces

With `pinned` empty it renders **The Editor's Chair**: students pick the story
they would run above the fold and defend it against one they rejected. That is
a real assignment, not a fallback, and it is the right call on a week when you
have not had time to hunt links.

With articles in `pinned` it renders **Editor's Briefing**, the directed reading
that matches the old "Click HERE and read this article" block.

---

## PACING IT IN CLASS

The station chips carry a minute estimate and the masthead prints the total, so
students can pace themselves. Two things worth saying out loud on the first run:

- **The boxes save themselves.** Students will not believe this. Point at the
  "Saved 9:14 AM" in the top right rail once and it stops being a question.
- **Copy All My Work is not submitting.** The page is the thinking space, Canvas
  is the grade. Nothing travels between them on its own.

The progress meter in the sticky rail is readable across a room, which makes it
a decent circulation tool: you can see who has stalled without leaning over a
screen.

---

## WHAT TO GRADE

The one liner fields are attendance, not assessment. Fill them and move on.

The work is in the paragraphs, and three of them carry most of it:

1. **Front Page Test analysis.** Did they actually quote two headlines and name
   a difference in wording, or did they summarize the news? Summarizing is the
   miss.
2. **The Historian's Hook.** Both halves have to be specific. "Things change but
   people stay the same" is the failure mode. Push for a change that names why
   it was impossible in the earlier period, and a continuity a person from that
   period would recognize on sight.
3. **Your Desk, the so what.** Arguable means a reasonable person could disagree.
   If nobody could, it is a fact wearing a claim's clothes.

---

## HOW IT IS BUILT

```
current-events/index.html                    thin shell, no content
  -> assets/data/current-events-edition.js   the week: date, beats, pinned, stations
  -> assets/js/behistorical-current-events.js  the pedagogy: stations, prompts, skills
  -> assets/css/behistorical-current-events.css
```

The split is deliberate. The edition file holds only what changes weekly. Every
question a student reads lives in the renderer, because a prompt that lives in
a weekly file drifts, and by November nine editions are each asking a slightly
different question.

The desk is fully outside the lesson system. It does not use
`behistorical-topic-renderer-v1.js`, it is not a CED topic, and it is not one of
the ten modules. Nothing in it can affect a lesson page.

### Persistence

localStorage, namespaced by edition id, autosaved on a 400ms debounce and again
on blur and change. Canvas is reached by Copy All My Work, which writes both a
`text/html` and a `text/plain` clipboard flavour so the bold survives the paste.
This is the same clipboard contract the lesson pages settled on when the
Google Form was retired; `docs/FORM-CONTRACT.md` records that decision.

There is no server. Nothing here transmits student work anywhere.

---

## NO GOOGLE FORM CAPTURE, AND WHY THAT IS NOW PERMANENT

The desk has no Submit to Form button, and it is not getting one.

When this page was built on 2026-08-06 the form still existed, and this section
carried a five-step procedure for wiring the desk into it. **The Google Form was
retired course-wide on 2026-08-07, the day after.** `behistorical-form-config.js`,
every Submit to Form button, and the whole prefill contract were deleted, and
`scripts/validate.js` now fails the build if any of it reappears. The procedure
that used to sit here would rebuild a system this repo actively refuses, so it
has been removed rather than left as a trap for whoever reads this next.

The reasoning that retired the form applies to the desk with extra force. The
form's Unit and Topic questions were **dropdowns**, and Google **silently drops**
a prefilled value that is not on the option list: no error, no warning, an empty
cell, and a successful submission. Current events was never a CED topic, so
there was no Unit or Topic value to send at all.

**Canvas is the only collection channel.** Durability is autosave; the hand-off
is Copy All My Work. Both already work here, and neither can fail quietly.

See `docs/FORM-CONTRACT.md` for the full record of the retirement.

---

## PUTTING IT IN CANVAS

**Do not paste this page into a Canvas page.** Canvas strips `<script>` tags out
of anything you put in the rich content editor. The desk is a thin shell plus
three script files, so a paste produces a masthead with no stations under it, no
boxes, and no autosave. It looks broken because it is.

The desk has to be hosted, and Canvas links to it. Two ways, and only one of
them is safe:

- **External URL, opened in a new tab. Use this one.** In the module, add an
  item, choose External URL, paste the address of `current-events/index.html`,
  give it a name, and tick **Load in a new tab**.
- **An iframe embedded in a Canvas page. Avoid.** Autosave is localStorage, and
  a cross origin iframe has its storage partitioned or blocked outright by
  Safari and by Chrome's third party storage rules. The page still renders, so
  it looks fine in your own check, and then a student's hour of work disappears
  on refresh with no error. The one promise this desk makes is that the boxes
  save themselves. Do not put it somewhere that quietly breaks it.

Then make the assignment students actually submit to:

1. Create a Canvas assignment, submission type **Text Entry**. That is the
   target for Copy All My Work, and Text Entry keeps the bold from the
   `text/html` clipboard flavour.
2. Put the link to the desk in the assignment description as well as in the
   module, so students who start from the gradebook can still reach it.
3. Say once, out loud, that the desk and the assignment are two different
   places. Pressing Copy All My Work is not submitting.

Nothing about the desk changes week to week in Canvas. You edit the edition file
in the repo, the hosted page picks it up, and the same Canvas link keeps working
all year. Only the assignment is new each week.

---

## MAINTENANCE

- **Local links rot.** The three in `local` are the ones most likely to break,
  because local news sites move more often than the national wire. The Google
  News search in that list cannot go stale and is the safety net. Check the
  other two at the start of each semester.
- **Outlet homepages, not article URLs.** Everything in `outlets` points at a
  front page on purpose. An article link is dead in a week; a homepage is not.
  The only place article URLs belong is `pinned`, which you rewrite weekly
  anyway.
- **Keep one non US desk in `frontPage` every week.** The station's whole point
  collapses if all four editors sit in the same country.
- `node scripts/validate.js` covers this page for image integrity only. It has
  no structural rules for the desk, because the desk is not a lesson. To check
  behavior, open the page and type in a box.
