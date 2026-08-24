# Unit Spec: Who Decides (the war with Iran)

Status: **spec, not built.** Nothing student-facing exists yet. This document is the
plan and the argument for it. Written 2026-08-24.

Anchor decision: the unit is **live**, so its top block is designed to be replaced as
the war moves while the backward chain underneath it stays fixed.

---

## 1. What this unit is

Five blocks. Not AP. The subject is not Iran, and it is not the Middle East. The
subject is **authority**: who gets to make a decision this large, and who has to live
with it without being asked.

**Terminal question, announced in Block 1 and answered in Block 5:**

> Somebody decided this war. Who was it, and who never got asked?

It goes at the top of the unit page, the way the Social Media unit's terminal question
does, so students chew on it for two weeks before they owe an answer.

That question was chosen over the two obvious alternatives for a reason. "Was the war
justified" turns a classroom into a scoreboard and rewards the student who already had
an opinion in September. "Why does this keep happening" is a history unit, and this is
a current events course. **Authority is the question that is genuinely open, genuinely
current, and genuinely the same question at every layer of the past.** That last part
is what makes Reverse History work here rather than just running a chronology
backwards.

### The spine, and why it holds

Reverse History means starting from a contemporary event and working back. The value
of this particular anchor is that the same question appears, unchanged, at every
stratum:

| Layer | Who decided | Who was not asked |
|---|---|---|
| Feb 2026 | One president, aboard an aircraft, authorizing Operation Epic Fury | Congress, which had not voted |
| Mar to Jul 2026 | Both chambers passed war powers resolutions | The war continued anyway |
| Aug 2026 | Treasury designed a sanctions regime | Drivers paying about a dollar more a gallon than a year ago |
| 2025 | Three European governments invoked snapback | Russia and China, who dispute they had the authority |
| 2018 | One president left an agreement seven parties had signed | The other six |
| 1979 | Iranians decided who governs Iran | The government that had been installed for them |
| 1953 | Iran's parliament voted to nationalize its oil | Two foreign governments removed the man who carried out the vote |
| 1901 | A shah signed away decades of oil rights | Everyone who lived above the oil |

Read that column top to bottom and the unit teaches itself. A student who can see that
1953 and February 2026 are the **same question** has learned the thing this course
exists to teach, and they have learned it without anyone telling them what to conclude.

### The corridor problem, and the fix

`scripts/lib/unit-content/social-media.js` already names this failure in its header
comment: tracing backwards from a present-day outcome only ever surfaces the causes
that led to it, so without a deliberate alternative the past reads as a corridor.

**For this unit that risk is worse than usual, because the chain above is unusually
tidy.** Oil, coup, revolution, nuclear program, war. It is a corridor a student will
walk down happily and come out the other end believing the war was inevitable, which
is both bad history and a conclusion nobody should be handed.

So every block carries a `roadNotTaken`, and each one is a real near-miss rather than
a token hedge:

- **Block 2.** Congress was not powerless and it was not a monolith. The June House
  vote was 215 to 208, with four Republicans crossing, and the Senate went 50 to 48.
  Both chambers passed. The math short of a veto-proof margin is a different story from
  "Congress does not matter."
- **Block 3.** The 2015 agreement held. The IAEA verified compliance for roughly three
  years. A student who thinks the deal was always doomed has to explain that.
- **Block 4.** The 1953 coup failed on its first attempt and the Shah left the country.
  It was close, and a plan that nearly collapsed is not a corridor.
- **Block 5.** The deliberation is itself the alternative: the students supply the roads
  not taken.

---

## 2. The five blocks

Modules are a toolkit, not a checklist, per the repo's own rule, so the counts differ
per block on purpose.

### Block 1: Somebody Decided This
**Site shell with a lecture deck. No Brief.** In-class work is on paper.

The anchor, and the block that has to be replaceable as the war moves.

- **Deck (module 03, `background`).** The factual spine as lecture cards: the
  authorization on 27 February 2026, the roughly 900 strikes in twelve hours the
  following day, the assassination of Iran's supreme leader, Iran's retaliation against
  embassies, bases, oil infrastructure and shipping, the Strait of Hormuz, and the
  economic phase that the war has settled into by August. Bullets, one idea each, not
  prose.
- **Paper trace, in class.** The move that already works in this room, pointed at a new
  target. Social Media Block 1 follows the money backwards. This one **follows the
  decision backwards**: start from something a student can physically see, the price on
  the sign at the gas station, a deployment, a headline, and build boxes and arrows back
  to a person who chose. Paper, not devices, for the reason the Social Media script
  gives: devices turn a trace into copy-paste from a search result.
- **`coverage` and `sourcecheck` modules.** The first hours of a war are the hardest
  test the five questions will ever get, and this is where they belong. One event,
  three outlets, deliberately including one that is a party to the war. Casualty and
  shipping figures are contested, so the assignment is **who is counting and how**,
  never a number to memorize.
- **`where` module.** Iran, the Gulf, the Strait of Hormuz, the bases. This is the one
  slot in the unit that genuinely needs real map artwork; the repo's own missing-items
  list flags that no real map exists yet.
- Nobody presents. Students walk the room and read four other traces, as in Social
  Media Block 1.

### Block 2: The Vote That Didn't Stop It
**Brief plus deck.** The civics block, and the one most likely to surprise them.

Congress voted. In March a war powers resolution failed in the Senate 47 to 53. In June
the House passed one 215 to 208 and the Senate passed one 50 to 48, the first time both
chambers had done so. In July the House passed another, 214 to 208. The war continued.
The administration's own framing was that this was a skirmish rather than a war.

This is a **primary source block**, built the way Social Media Block 4 is built: the
student checks the claim against the document rather than against the teacher. Article
I of the Constitution and the 1973 War Powers Resolution are both free, both short
enough, and both sitting in a browser tab. Social Media Block 4's line applies exactly:
when you can read the original you do not have to trust anybody's summary of it,
including mine.

The payload for the terminal question is blunt and it does not need editorializing.
Both chambers said stop. It did not stop. So who decides?

### Block 3: The Referee Left the Field
**Brief plus deck.** First jump backwards, and the sovereignty question in its purest form.

The nuclear layer, 2015 to now. An agreement in 2015, a withdrawal in 2018, the European
snapback invoked in August 2025 and sanctions reimposed that September, inspectors
withdrawn in June 2025, and Russia and China disputing that the snapback was lawful at
all.

**This is where "who decides" stops being rhetorical.** Who is entitled to say whether a
country may enrich uranium? A treaty it signed, an agency, a Security Council where two
permanent members say the procedure was invalid, or the country itself? That is a live
legal dispute among adults, not a question with a hidden right answer, and saying so out
loud is the teaching.

### Block 4: 1953
**Brief plus deck.** The deep stratum, and the block the whole unit rhymes with.

Iran's parliament voted to nationalize the country's oil. The prime minister who carried
out that vote was removed in a coup organized by two foreign governments, and the
monarch they restored ruled until 1979.

Every other layer in the table above is a version of this. A student who has done
Block 2, watched Congress vote twice with no effect, and then meets a parliament whose
vote was undone from outside, does not need the parallel explained. **Do not explain it.**
Ask them.

Depth is a judgment call and it is flagged as an open question below: this is the block
most at risk of turning a current events course into a history course.

### Block 5: The Deliberation
**Brief plus the terminal question.** The assessed artifact.

A deliberation, not a debate, and the distinction is load-bearing. A debate produces a
winner and rewards whoever came in most certain. A deliberation asks a student to state
a position on **authority and process** and to say what would change their mind.

Students pick their position rather than being assigned one, consistent with the
START HERE and PUSH FURTHER ethic: both options the same size, the student chooses,
nobody assigns.

---

## 3. Guardrails

These are not boilerplate. This is a live war in which a head of state was killed, and
this room is not neutral ground.

- **The question is who decided, never who deserved it.** No student is ever asked to
  argue a position on whether a population deserves to be bombed. Positions in Block 5
  are about authority and process. This is stated on the unit page, not just in the
  teacher's head.
- **Assume the war is in the room.** Iranian American students, Jewish students, Muslim
  students, families with someone deployed, and every family paying the pump price. Any
  of them may be in this class, and none of them owe the room a disclosure.
- **Contested numbers get taught as contested.** Casualty figures, strike counts and
  shipping volumes are claims made by parties with interests. The unit teaches who is
  counting and why the counts differ. It never asserts one.
- **No fabrication, and here it matters most.** The repo's rule already prohibits
  inventing a headline, statistic, date or quotation. In a unit about a shooting war,
  a fabricated example passed off as real would be indefensible. **Every factual claim
  in every brief carries a real link.** Nothing in this unit gets written from memory,
  including mine.
- **Sources students can actually open.** Coverage Compare fails as an assignment if
  half the outlets are paywalled. Prefer freely readable liveblogs and wire copy, and
  check every link from a student device before it ships.

---

## 4. Differentiation

Same levers that already work in this room, and they are the reason the lecture deck
matters more here than it does in an AP course.

- **START HERE and PUSH FURTHER on every question**, both cards the same size, the
  student picks. Already built in `unit-brief-page.js`.
- **Lecture cards are a differentiation surface, not decoration.** Bullets, one idea per
  bullet, terms bolded in the sentence they first appear in. A student who cannot get
  through nine hundred words of brief can get through a five card deck and still hold
  the spine of the block.
- **Video is a first-class path, not the alternative one.** With this room's IEP and 504
  load it is frequently the primary route. Every `videos` array in this unit stays
  **empty** until real URLs are supplied. Nothing gets invented to fill them.
- **Register.** Follow the Social Media header note exactly: short sentences, one idea
  each, concrete before abstract, every key term defined in the sentence it first
  appears in, flat and curious rather than ominous. These briefs are shorter than an AP
  reading on purpose.
- **The paper trace carries Block 1** for a student for whom a long reading is the
  barrier, and it is the block's real assessment.

---

## 5. Build work

The unit needs a capability the repo does not have. Today `scripts/build-units.js`
emits a unit page and, per block, a Brief and a capture wrapper. **A block gets no
renderer shell, so it gets no modules and no lecture deck.** The deck exists only on
week pages.

### What exists and can be reused unchanged

- `assets/js/becurrent-week-renderer-v1.js` already has the whole deck: `cards[]` of
  title, bullets, image and caption, prev and next arrows, a `Card 3 of 8` counter,
  arrow keys, Back to Modules, and the idempotent modal guard with the scroll lock
  keyed off "no visible dialog". None of that needs rewriting.
- The brief capture key already generalizes. `brief-capture-block.js` builds
  `becurrent-brief-` plus a key, and `unit-brief-page.js` passes `block.key`, so a
  block brief keys as `becurrent-brief-<blockKey>` with no change.

### The changes

1. **`scripts/lib/unit-content/iran-war.js`**, new content module, shaped like
   `social-media.js` with a new optional per-block field declaring a shell and its
   modules.
2. **`scripts/lib/unit-block-page.js`**, new renderer for a block lesson shell. A new
   file rather than a generalization of `week-page.js`, for the same reason
   `unit-brief-page.js` is separate: week 01 is pinned byte for byte and a shared
   renderer gaining a parameter is how a byte moves in a page that is already right.
3. **`scripts/build-units.js`**, emit per block that declares a shell:
   `<unit>/block-NN.html` and `assets/data/<unit>-block-NN.js`. A block with no shell
   emits nothing new, which is the optional-parameter rule, and **Social Media must
   come out byte for byte identical.** That diff is the check, and it is the step that
   catches escaping bugs.
4. **Path depth.** Put the shell at `<unit>/block-NN.html`, flat, rather than
   `<unit>/block-NN/index.html`. Flat puts the shell at the same depth as the briefs it
   links, so `../assets/...` works exactly as it does for week 01 and the brief link
   needs no `..` juggling. A directory shell is one depth mismatch away from a set of
   silent 404s.
5. **Slot namespace stays `becurrent-week-`.** `validate.js` asserts the renderer
   namespaces its slots under that prefix, and the Canvas record footer and the parser
   shared with BeHistorical both depend on it. The word "week" in the prefix is
   cosmetic and historical. **Renaming it for tidiness would fork a grammar that spans
   two repos.** Do not.
6. **`scripts/validate.js`**, extend. Four of these are gaps that would otherwise fail
   silently:
   - discover block shells, which today's `/^week-\d{2}$/` directory scan cannot see;
   - **generalize the load-order check.** Line 314 searches for
     `assets/data/week-\d{2}\.js` specifically, so a block shell's data file gets no
     load-order enforcement at all. Unenforced, the failure mode is a blank page;
   - run the module contract over block modules too: exactly one delivery mode each,
     every `render:` target resolving to a function that exists, no duplicate ids;
   - assert every block shell is linked from its unit page. The front door already has
     to link the unit, and that check exists because the first unit page shipped
     orphaned and reachable only by typing the URL. A block shell can strand the same
     way.
7. **Tests.**
   - The reproducibility test must cover the new emitted files, or a hand edit to a
     generated shell survives until the next build silently reverts it.
   - **The browser suite gets its second path.** The repo's own missing-items list says
     it covers one week and one path. A block shell driving the same renderer through a
     different builder is exactly the case worth adding: modal focus, the scroll lock
     asserted with a real wheel event rather than `scrollTo`, the deck, and the record
     footer read back by the real parser.

### Sequencing

Build the machinery on Social Media first, prove the byte-identical diff, and only then
add `iran-war.js`. Writing new content against a new builder at the same time means a
content bug and a builder bug are indistinguishable.

---

## 6. Open questions

1. **Video URLs.** Needed, real, from you. Every `videos` array stays empty until then.
2. **How much 1953?** It is the richest stratum and the biggest drift risk toward a
   history unit. One block, or one block plus a slice inside Block 3?
3. **Deliberation protocol.** Module 07 takes an external link. Is there a tool or
   protocol URL, or does it render the placeholder?
4. **Assessment.** Is the Block 5 position the graded artifact, and does it travel
   through the brief capture into Canvas, or separately?
5. **Roster sensitivities.** You know this room and I do not. Anything the unit page or
   the deliberation should be designed around.
6. **Terminal question wording.** "Somebody decided this war. Who was it, and who never
   got asked?" Yours to cut.
7. **Withheld titles.** Social Media withholds the film title, enforced by
   `validate.js`. Is there anything here that should be withheld until it is taught?
