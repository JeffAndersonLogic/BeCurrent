# The TODAY Board

The rotating classroom screen. Open `announcements.html`, press **F** for full
screen, and leave it up. It is the BeCurrent counterpart of BeHistorical's Today
board, and it works the same way for the same reason.

## The one file you edit

`assets/data/announcements-schedule.js`

Give a date and a topic code. The learning targets and success criteria come out
of that topic's own content module, so the board can never drift from the course.
Then run:

    node scripts/build-announcements.js

That writes `assets/data/announcements.js`, which the board reads. **Never edit
that file by hand**, the next build overwrites it, and `npm test` fails while it
disagrees with the schedule.

A day is one line of real typing:

```js
{ date: '2026-08-14', topic: 'SM3', homework: 'Finish your three responses and submit in Canvas.' },
```

## What a day can point at

| Field | Example | What it pulls |
|---|---|---|
| `topic` | `'SM3'` | a unit topic: the unit's `code` plus the topic number |
| `week` | `'01'` | an orientation week from `scripts/lib/week-content/` |

Either one fills in the unit or week name, the title, the subtitle, the learning
targets and the success criteria. A day with neither is fine; write the fields
yourself.

**The code lives in the unit's content module**, as `meta.code`. Social Media is
`SM`, so its six topics are `SM1` through `SM6`. Two units sharing a code is
fatal at build time rather than a warning, because the second one would silently
win and project one unit's targets under another unit's name. `validate.js`
catches the other half of that, a unit with no code at all.

Homework is yours to write. The course data has none, and inventing an assignment
is the one thing a generator must not do. One assignment can be a plain string.
Two or more go in a list, and each gets its own numbered line rather than running
together in a paragraph:

```js
homework: ['Finish your three Brief responses and submit them in Canvas.',
           'Bring a device Thursday.'],
```

| Block in the schedule | What it holds |
|---|---|
| `settings` | Course name, seconds per slide, whether the Desk slide shows |
| `days` | Date plus a topic or week code, plus homework and any overrides |
| `assessments` | Every quiz and test. Past dates drop off on their own |
| `reminders` | Off by default. Add one and a Reminders panel joins the loop |

Dates are always `YYYY-MM-DD`. That is the only format the board parses, and
everything is anchored at local noon so a timezone offset can never push a due
date onto the wrong calendar day.

### When the wording is too long to project

A line past about 200 characters makes the build print a note, and the board steps
its own type down as a panel fills. To say it more briefly on screen without
touching what students are assessed against, override it in the schedule entry:

```js
{
  date: '2026-08-14', topic: 'SM3',
  learningTargets: ['I can explain what an app counts about me.'],
  homework: 'Finish your three responses.'
}
```

Anything written in the schedule wins over the generated text. `topicTitle` and
`successCriteria` work the same way.

`teacherName` and `roomName` inside `settings` ship blank on purpose, so nothing
personal projects on the screen.

## What the loop looks like

Panels build themselves for whatever day it is, today's work first and what is
ahead second:

1. **The topic**, the title card: wordmark, date, topic, unit
2. **The Desk**, the routine that opens every class period
3. **Learning targets**, the "I can" statements
4. **Success criteria**, the things a student ticks off
5. **Homework**, what leaves the room tonight, numbered when there is more than one
6. **Coming up**, the next four class days
7. **Quizzes and exams**, from the `assessments` list
8. **Reminders**, if any are filed

Every field except `date` is optional. Leave one out and the board simply skips
that panel, so a day with only a topic produces a short loop rather than an error.

**The Desk panel is standing, not per day.** It is built from
`scripts/lib/desk-content.js`, because the Desk runs the first ~32 minutes of every
class and typing it on each day entry would be 180 copies of one routine. It
carries the routine and never a story, for the same reason the Desk page itself
does not: a board generated once and projected all year cannot hold a headline
without it being fabricated in August and stale by October. Set
`settings.showDesk: false` to drop it.

Upcoming topics cost nothing extra. Every `days` entry dated later than today
lands there automatically, so a week typed on Sunday fills that panel for free.
Assessments inside three days turn red; today and tomorrow turn black on a red
ground.

## Two ways to read it

- **Board mode**, a projector kiosk: one panel at a time, auto advancing, with
  Space to pause, arrows to step, F for full screen, R to reload and H for the
  controls card.
- **Page mode**, under 900px: every panel stacked on one scrollable page, no
  timer, nothing to wait for. The clock stops advancing so a student reading on a
  phone is never scrolled out from under.

The board rebuilds itself when the date rolls over, so it can stay up overnight.

## Why it is generated

The board is the most projected surface in the course, and a board typed by hand
is a second copy of the curriculum with nothing able to say when the two
disagree. Both surfaces look right on their own; the failure is discovered by a
student who worked to the target on the screen and was assessed against a
different one.

So every target and criterion on the board is lifted out of the unit content
module. Change a target there, rerun the build, and the screen changes with it.
`npm test` fails while the generated file and the course data disagree.
