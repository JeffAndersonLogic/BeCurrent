# Canvas Build Guide, BeCurrent

How BeCurrent content is represented in Canvas. Written to be followed step by
step with Canvas open in the next tab.

---

## Section 1, Purpose and scope

BeCurrent runs a three-layer architecture:

```
BeCurrent   the lesson engine, where the work is done
Canvas      the graded submission home base
```

**Canvas is the graded submission layer. It never duplicates the lesson engine.**
A calendar event tells a student what today is about, what they should be able to
do by the end of it, where the lesson lives, and which assignment to submit. It
does not carry the lesson itself. If a student can read the whole Brief inside
Canvas, the event has been built wrong.

Final student work is never submitted on BeCurrent. The site saves drafts in the
browser on the device they were typed on; Canvas is the only place a grade comes
from, and the only place a record exists.

**BeCurrent is its own Canvas course**, separate from AP World. Nothing is shared
between the two courses except the submission parser, which is deliberate and
lives in the repo.

Canvas has no version control of its own. That is the gap this guide closes: the
repo is the source of truth for what gets pasted in, so a calendar event and its
lesson cannot drift apart without someone noticing.

---

## Section 2, Naming conventions

| Object | Format | Example |
|---|---|---|
| Calendar event title | `CE - <CODE> - <Topic Title>` | `CE - SM3 - Inside the Algorithm Box` |
| Module | `Current Events - <Unit>` | `Current Events - Social Media` |
| Text header inside module | `Topic N - <Topic Title>` | `Topic 3 - Inside the Algorithm Box` |
| Assignment (Canvas **and** PowerSchool) | `<CODE> - <Short Title>` | `SM3 - Inside the Algorithm` |

The code is the unit's `meta.code` plus the topic number. Social Media is `SM`,
so its topics are `SM1` through `SM5`. It is the same code the TODAY board's
schedule uses, so one identifier covers the projector, the calendar and the
gradebook.

Rules, all of which matter:

- **Assignment names must be identical in Canvas and PowerSchool, character for
  character.** This is an administration requirement, not a preference. Type it
  once, copy it, paste it into the other system. Do not retype it.
- **Assignment names use ASCII only.** Plain hyphen, no em dash, no ampersand, no
  curly quotes. PowerSchool caps name length and some sync configurations fail on
  non-ASCII punctuation. The failure is quiet: the assignment exists in both
  systems and simply does not sync.
- **Long titles belong in the calendar event and the assignment body**, which have
  no length limit. The assignment *name* is an identifier, not a description.
- **Calendar event titles do not sync to PowerSchool** and may be as long as they
  need to be.
- **Activities are labeled by content, never by date.** `SM3 - Inside the
  Algorithm`, never `Thursday's Work`. A student looking at a grade in May has to
  be able to tell what it was.
- **Spell the ampersand out** in every Canvas object name, and never use a forward
  slash: it reads as a path separator in several export formats. The generator
  does both automatically.

### Two names that are deliberately vague

Topic 2's title withholds the film's name, and the Canvas objects must withhold it
too: the event title, the module text header, and any description. From the Topic
1 teaching script, the second a student knows the title they look it up, read that
it is a documentary about social media being bad, and arrive having already
concluded it. `validate.js` fails the build if the name appears on a student-facing
page in this repo; Canvas is outside that check, so it is on you.

---

## Section 3, Calendar event table specification

Every calendar event body is one table with exactly five rows, in this order:

1. `OVERVIEW`
2. `LEARNING TARGETS`
3. `SUCCESS CRITERIA`
4. `BeCurrent Link`
5. `ASSIGNMENT`

No extra rows. No reordering. A student learns the shape once and then reads every
event in the year the same way.

**The tables are generated. Do not build one by hand.**

```bash
node scripts/build-canvas-events.js          # write
node scripts/build-canvas-events.js --check  # fail on drift, write nothing
```

`docs/canvas/<unit>-calendar-events.md` holds the paste-ready events and
`docs/canvas/<unit>-assignments.md` holds the paste-ready assignment bodies. Both
are generated and both are checked by the offline suite, so a stale one fails the
push rather than reaching a student.

### Constraints, if you ever touch the markup

**Label cells** (the left column) carry all four of these:

- `width: 20%`
- `vertical-align: top`
- `background-color: #f0f0f0`
- the label wrapped in `<h3>`

**The table element** carries all six of these:

- `border="3"`
- `cellpadding="8"`
- `border-color: #000000`
- `border-style: solid`
- `border-collapse: collapse`
- `width: 100%`

**Canvas strips `<style>` blocks and most `class` attributes.** All styling must be
inline, on the element. Do not refactor this into a stylesheet and do not add a
class and style it elsewhere. It will look correct in your editor and arrive at
the student as an unstyled table.

The one class that survives is `inline_disabled` on a link. That is Canvas's own
class and Canvas puts it there. Leave it.

### Always paste through the HTML editor

**Use the RCE HTML editor, the `</>` icon. Never the visual editor.**

Pasting rendered HTML into the visual editor injects wrapper `<div>`s and inline
font declarations that collapse the table. The result usually looks acceptable on
a desktop monitor and falls apart on a Chromebook, which is the only screen that
matters here.

The full sequence:

1. Canvas Calendar, click the day, **Edit**, then **More Options**.
2. Set the event title exactly as generated.
3. Click the **`</>`** icon to switch the Rich Content Editor into HTML mode.
4. Paste the whole `<table>` block.
5. Switch back to the visual editor **only** to insert the assignment link, per
   Section 5.
6. Save.

---

## Section 4, Where each row's content comes from

This is the anti-drift rule, and it is the reason this guide exists.

| Row | Source of truth |
|---|---|
| OVERVIEW | the topic's `overview`, **verbatim** |
| LEARNING TARGETS | the topic's `learningTargets`, **verbatim** |
| SUCCESS CRITERIA | the topic's `successCriteria`, **verbatim** |
| BeCurrent Link | the unit page, plus the Brief where the topic has one |
| ASSIGNMENT | inserted through the RCE course-links panel, see Section 5 |

All of it lives in `scripts/lib/unit-content/<unit>.js`. **Every cell is
machine-derived**, including OVERVIEW: BeCurrent topic overviews are already
written to the student in second person, so there is no teacher-facing prose to
rewrite and no hand-maintained table to fall out of step.

### The rule

**If a learning target changes in the content module, the Canvas event is stale and
must be repasted. Never edit a target inside Canvas.**

A target edited in Canvas and not in the content module produces the worst version
of this failure: the lesson page, the TODAY board and the calendar event all look
right on their own, they disagree with each other, and nothing reports it. A
student who reads the event and then works the lesson is being graded against a
target they were never shown.

The same edit reaches the site, the projector board, the lesson plan and the
Canvas paste by rebuilding. That is the whole point of keeping them in one file.

---

## Section 5, Inserting the ASSIGNMENT link, do not hand-type

### Procedure

1. Paste the table with `[INSERT ASSIGNMENT LINK]` as the ASSIGNMENT cell content.
2. Switch back to the visual RCE.
3. Delete the placeholder text.
4. Open the right-hand course-links panel, choose **Assignments**, click the
   assignment.

### Why

Canvas auto-generates four attributes tied to the assignment's internal ID:

- `data-course-type`
- `data-published`
- `data-api-endpoint`
- `data-api-returntype`

Those attributes are how Canvas knows the link points at a live object in this
course. They carry the published state, they let the link survive a course copy
into next year's shell, and they are what makes the link resolve for a student
whose enrollment differs from yours.

**A hand-typed link renders as a working link and resolves to nothing.** It is
blue, it is underlined, it is clickable, and it fails. This is the single most
common way one of these events ships broken, because the failure is invisible from
the teacher's own account, where the raw URL happens to work.

**The assignment must exist before you build the event.** The course-links panel
can only find an assignment that has already been created. Section 8 puts
assignment creation before event construction for exactly this reason.

The BeCurrent links inside the table are different: those are plain external URLs
to the GitHub Pages site and are correct as generated. `validate.js` checks that
every one of them points at a file that actually exists in the repo, so a renamed
Brief cannot leave a Canvas event pointing at a 404.

---

## Section 6, Module structure

One module per unit, with text headers separating the topics.

```
Module: Current Events - Social Media
[External]    BeCurrent: Social Media unit page
--- Text Header: Topic 1 - Where the Money Comes From ---
[External]    Slide deck            <- pending, see below
--- Text Header: Topic 2 - Somebody Made a Film About This ---
              (nothing; done in class, and the title stays withheld)
--- Text Header: Topic 3 - Inside the Algorithm Box ---
[Assignment]  SM3 - Inside the Algorithm
--- Text Header: Topic 4 - Go Check It Yourself ---
[Assignment]  SM4 - Reading a Privacy Policy
--- Text Header: Topic 5 - Who Gets to Decide? ---
[Assignment]  SM5 - Who Decides
```

Notes:

- **Assignments are indented one level under their text headers.** Use the indent
  control in the module item's edit menu. Without the indent the text headers read
  as list items rather than as section breaks.
- **Topics 1 and 2 have no assignment, and that is deliberate.** They are done on
  paper. A Canvas assignment nobody can submit to is a gradebook row that reads as
  missing work for the entire class, every week, until someone excuses it by hand.
  The text header still appears so a student can see the topic exists.
- **The most recent unit sits at the top of the module list**, so a student opening
  Modules lands on current work without scrolling.
- **The module stays unpublished until the Chromebook walkthrough passes.** Open
  the BeCurrent link on a student Chromebook, work a Brief, gather the work, paste
  it into the assignment and submit as a Test Student. Publishing a module whose
  external link is wrong is the failure that reaches every student at once.
- The `[External]` unit page item points at
  `https://jeffandersonlogic.github.io/BeCurrent/social-media/index.html`.
- Never link `teacher/` from a Canvas module or any student-facing surface.

### The slide deck for Topic 1

The deck does not live in this repo and its URL is not known yet, so nothing has
invented one. When you have the link, set `DECK_URL` at the top of
`scripts/build-canvas-events.js` and rerun the generator, rather than pasting it
straight into Canvas. That way the link has one home and the generated docs stop
saying PENDING.

---

## Section 7, Assignment settings

| Setting | Value |
|---|---|
| Submission type | Online, then **Text Entry** |
| Attempts | Unlimited |
| Assignment group | `Social Media` |
| Points | 20 each |
| Display grade as | Points |
| Peer review | Off |
| Anonymous grading | Off |

Points are a teaching call, not a contract; change them in the `ASSIGNMENTS` table
at the top of `scripts/build-canvas-events.js` and rerun, so the generated
assignment doc and the gradebook agree.

**Text Entry is a deliberate choice, not a default.** Students submit by pasting
the output of the Brief's **Gather All My Work**, then **Copy to Clipboard** panel.
Text Entry is Chromebook-native with nothing to download, nothing to upload, and no
file format to go wrong.

It is also what the analysis pipeline reads.
`scripts/parse-canvas-submissions.js` parses the HTML body of a Text Entry
submission. A file upload cannot be parsed by it and will not appear in any
analysis. See `docs/CANVAS-CAPTURE.md`.

**Anonymous grading must stay off.** It suppresses the student name the parser uses
to build its crosswalk, and the result is a run of unattributable rows in
`exceptions.csv`.

**Attempts unlimited** matters because the pipeline flags edited work rather than
blocking it. A student who resubmits is recorded as having resubmitted.

---

## Section 8, The order to build a unit in

Assignment creation comes before event construction, because the course-links
panel can only find an assignment that already exists.

1. `node scripts/build-canvas-events.js`, so both generated docs are current.
2. Create the module, named per Section 2, left **unpublished**.
3. Create every assignment from `docs/canvas/<unit>-assignments.md`, pasting each
   body through the `</>` editor and setting the values in Section 7.
4. Copy each assignment name into PowerSchool, character for character.
5. Add the text headers and the assignments to the module, indenting the
   assignments one level.
6. Build the calendar events from `docs/canvas/<unit>-calendar-events.md`, using
   the course-links panel for the ASSIGNMENT cell.
7. Walk one topic end to end on a student Chromebook as Test Student: open the
   link, answer the questions, gather, copy, paste, submit.
8. Publish the module.

---

## Section 9, What this repo cannot check

Honest list, so nobody assumes coverage that does not exist:

- **Nothing here can log into Canvas.** Every step above is manual. What the repo
  guarantees is that the text you paste is reproducible from the course data, and
  that every BeCurrent URL inside it resolves to a real file.
- **Whether you actually repasted after a target changed.** The generator will
  tell you the doc changed; only you know whether Canvas got the new version.
- **What Canvas does to a pasted submission.** `docs/CANVAS-CAPTURE.md` covers the
  record footer and the parser. The paragraph-shape check in the offline suite is
  the closest thing to a guarantee, and it is not the same as a real round trip.
