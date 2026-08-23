---
name: 5-personas
description: "Stress-test any topic (a feature, a document, a piece of code, a product decision, a design, a plan, a policy) by standing up 5 personas built specifically for that topic, having each one actually test or read it firsthand, score it 1-10 with a rationale, and then debate each other until they converge on at least 90% agreement about the single best next step to improve it. Use this whenever Jeff says 'run the 5 personas,' 'stress test this,' 'pressure-test,' 'get me 5 perspectives,' or wants a rigorous adversarial review that ends in one converged recommendation rather than five disconnected opinions. Works on anything: a live site or app, a codebase, a Notion page, a client deliverable, a strategy doc, a pricing decision."
---

# The 5 Personas

A stress test with a shape: five different people try to break or use the thing, each
says a number and why, then they argue with each other about what to fix until they
mostly agree. The value is in the disagreement round as much as the scores. Five
independent opinions that never talk to each other are just five opinions; the debate
is what turns them into a decision.

## Step 1: Pin down the topic

Before picking personas, know exactly what's being tested and what "good" would mean
for it. If the request is vague ("stress test the app"), spend one exchange narrowing
it: which surface, which audience, is there a spec or a set of promises the topic is
supposed to keep (a CLAUDE.md, a style guide, a contract, a client brief)? Personas
chosen without this are generic and produce generic findings. Read whatever the topic's
own documented standards are before you start, the same way `docs/CANVAS-CAPTURE.md` or
a client's brand voice guide sets the bar a review should hold the work to; a persona
grounded in a promise the topic makes is a sharper reviewer than one grounded in a
stereotype.

## Step 2: Choose 5 personas, built for this topic, not off the shelf

Never reach for the same five stock characters ("the skeptic," "the optimist," "the
expert," "the beginner," "the critic") regardless of what's being tested. That produces
shallow, interchangeable feedback. Instead, ask: who actually depends on this working,
in what different ways, and where does each of their needs pull against the others'?
Good personas come from the topic's real fault lines:

- **Different usage contexts**, not different temperaments. A phone on bad wifi, a
  screen reader, a projector in a lit room, a reader with three weeks to catch up, a
  reader who has all the time in the world, a person reading it in a language they
  learned second.
- **Different stakes.** The person who benefits if this goes well, the person who pays
  if it goes badly, the person who has to maintain it after everyone else has moved on.
- **At least one adversarial persona** whose job is to find the failure, not to be fair
  to the work. A generous panel produces a generous score.
- **At least one persona representing whoever is easiest to leave out**, the edge case,
  the accessibility need, the reader who isn't the one the topic was obviously written
  for.

Name each persona with a short handle and a one-line stake: not "User 1" but
"the parent skimming this on a phone during pickup line, cares whether the point lands
in ten seconds." A good persona set for a lesson page looks nothing like a good set for
a pricing decision; if two runs of this skill produced the same five names, something
went wrong in this step.

## Step 3: Have each persona actually test the thing

This is the part that gives the score integrity. A persona that reasons in the
abstract about what a document might say is worth nothing next to one that read the
document. Match the method to the topic:

- **A live site, app, or eBook** &rarr; drive it for real. Chromium is available in
  this environment; use Playwright (`playwright-core`, launched with
  `executablePath: '/opt/pw-browsers/chromium'`) to load pages, click through flows,
  resize viewports, and inspect the DOM rather than guessing from a screenshot.
- **Code** &rarr; read it, run it, run its tests, try to break the thing a reviewer
  would actually exercise.
- **A document, plan, or deliverable** &rarr; read it start to finish the way its real
  audience would, not skim for keywords.
- **A decision or strategy** &rarr; reason from the persona's actual incentives and
  constraints, and say plainly where the reasoning is speculative because nothing in
  the topic can be run or tested directly.

Spin up the five as independent agents in parallel so none of them anchors on another's
first impression, each briefed only with its own persona and the topic, and instructed
to actually go look. Each one returns:

1. **A rating, 1 to 10.** Have the persona state its own bar before scoring: what would
   a 10 look like for someone in exactly its position, what would a 1 look like. A
   rating with no stated bar is not comparable across personas and not worth reporting.
2. **A rationale**, tied to specific things it found, not vibes. "The skip link doesn't
   move keyboard focus, confirmed on all three pages" beats "accessibility could be
   better."
3. **Its top 1 to 3 proposed fixes**, from its own point of view, ranked.

## Step 4: Debate to (at least) 90% consensus

Round-based, not a single vote. Give every persona all five ratings, rationales, and
proposed fixes, and ask it to:

- Say which single proposal, from anyone, or a new one that merges two, it would now
  back as *the* best next step to improve the topic overall, not just the best fix for
  its own complaint.
- Update its rating if the argument actually changed its mind. A persona that never
  moves isn't debating, it's repeating itself.
- Briefly agree or push back on the others' points, specifically.

Tally how many of the five back the current leading proposal. Run another round if
it's under 90% (that's 5 of 5 in practice, since 4 of 5 is 80%), feeding each persona
the updated field. Cap it at 3 rounds. Two to three rounds is normally enough; hold to
the size guideline for this environment's Workflow tool (see Step 5) rather than
letting the debate run indefinitely.

**If it never reaches 90%, say so.** Report the majority position, the exact number who
back it, and the holdout's specific objection in their own terms. Rounding 80% up to
"consensus" or writing dissent out of the summary defeats the entire point of running
five independent voices; a false consensus is worse than an honest split, because it
hides the one failure mode nobody else considered.

## Step 5: Implementation

This environment's Workflow tool (multi-agent orchestration with `agent()`,
`parallel()`, and looping) is built for exactly this shape: an initial parallel fan-out,
then a bounded loop that reruns until a convergence condition is met. Being invoked
through this skill is itself the explicit user opt-in Workflow requires, so use it
directly rather than asking again.

Sketch:

```js
export const meta = {
  name: 'five-personas',
  description: 'Five personas stress-test a topic and debate to consensus',
  phases: [{ title: 'Initial review' }, { title: 'Debate' }],
}

const RATING_SCHEMA = { /* rating: number, bar: string, rationale: string, proposals: string[] */ }
const VOTE_SCHEMA = { /* rating: number, backs: string, rationale: string, rebuttals: string[] */ }

let field = await parallel(args.personas.map(p => () =>
  agent(buildTestPrompt(p, args.topic), { phase: 'Initial review', schema: RATING_SCHEMA })
))

let round = 0, agreement = 0, leading = null
while (agreement < 0.9 && round < 3) {
  const votes = await parallel(args.personas.map((p, i) => () =>
    agent(buildDebatePrompt(p, field, leading), { phase: 'Debate', schema: VOTE_SCHEMA })
  ))
  leading = pickLeadingProposal(votes)
  agreement = votes.filter(v => v.backs === leading).length / votes.length
  field = votes
  round++
}

return { field, leading, agreement, rounds: round }
```

If Workflow isn't available in a given context, fall back to the Agent tool directly:
launch the five initial reviews in one message (parallel tool calls), then run the
debate rounds the same way, computing agreement yourself between rounds.

## Step 6: Report it

Every run ends with, at minimum:

1. **Five ratings**, one line each: persona, score /10, one-sentence rationale.
2. **The debate outcome**: the consensus proposal (or the majority pick plus the
   dissent, if 90% was never reached), and the agreement percentage reached.
3. **The concrete next step** that follows from it, stated as something someone could
   actually go do.

Match the delivery to the topic and to how Jeff works: a quick internal check can just
be a chat summary; something worth keeping (a client-facing review, a decision record)
gets filed the way `CLAUDE.md` already says deliverables and decisions get filed in
this repo, not left only in the conversation. If the result is genuinely a shareable
report, an Artifact is a reasonable way to present it, follow this environment's usual
Artifact design guidance rather than improvising a one-off look each time.
