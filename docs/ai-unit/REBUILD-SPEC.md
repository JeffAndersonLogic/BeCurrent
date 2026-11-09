# The Machine in the Room | AI Unit Rebuild Specification

## FINAL SCHEDULE REVISION — NOVEMBER 8, 2026
**Teacher decision:** the NOVA film occupies all of Monday, November 9. Push the *four instructional topics* one class meeting later. Wednesday, November 11 is a teacher conference absence and AI1 must be wholly independent with the substitute.
- **Nov 9:** PBS NOVA A.I. Revolution (complete 53:30), four optional viewing cues; no graded worksheet or Canvas assignment.
- **Nov 11:** AI1 What AI Actually Is, **fully independent**, no teacher lecture, no required video replay or live MagicSchool; five self-guided chapters, printed examples, eight private responses, practice sort, optional paper fallback, Gather All My Work into Canvas.
- **Nov 13:** AI2 When AI Gets It Wrong.
- **Nov 17:** AI3 What AI Changes, and Who Pays.
- **Nov 19:** AI4 Who Makes the Rules?
- **Nov 23:** 25-question exam in Canvas only.
- **Nov 25–27:** ZCS Thanksgiving break, no school (verified against the district calendar).
- **Next class after break:** The Desk. Nov 30 is a tentative placeholder pending the school's Green/Silver rotation.
Canonical student paths: ai/opening-film.html (film), ai/block-01.html (independent AI1), ai/block-02..04.html (subsequent investigations), ai/print-topic-01.html (offline fallback). Distinct teacher film OS and AI1 substitute OS. No assessment item or confidential key on publicly served pages.


## NOVEMBER 8 UPDATE — APPROVED FILM-FIRST OPENING
Jeff selected Midnight Ember, then explicitly chose the **entire PBS NOVA A.I. Revolution documentary** for Monday, November 9, 2026.
- Verified official film runtime: 53 minutes 30 seconds (March 27, 2024). Official YouTube: https://www.youtube.com/watch?v=-sB12gk9ESA ; official PBS: https://www.pbs.org/video/ai-revolution-umwwlt/
- Day 1 is a full-film lesson, NOT a 16-minute excerpt. The first film begins immediately in the ~55-minute before-lunch block. Four optional observation cues; no required eight-question worksheet, MagicSchool experiment, or Canvas Text Entry submission that morning.
- AI1 concepts are introduced through the complete film and reinforced in the following investigations and study guide. Do not pretend there is time for an eight-answer exercise after a 53:30 movie.
- The original eight-question AI1 bank remains canonical for optional future review only, not a graded November 9 task.
- Student-facing Midnight Ember home, AI1 page, teacher run of show, projector, and Canvas calendar copy must all say FULL DOCUMENTARY. No source of truth may retain the first-16-minutes plan.
- Preserve Nov 11 AI2, Nov 13 AI3, Nov 17 AI4, Nov 19 25-item Canvas assessment, Nov 23 Desk. On Nov 11–17 eight private responses per lesson, verified shared Canvas record; News Log after lunch.
- Check school playback, source URL, audio, captions, and any video preroll before students arrive. The documentary is historical to 2024; distinguish dated claims from November 2026 capabilities.

Status: DESIGN RESTART / NOT PUBLICATION-APPROVED
Reviewed: 2026-11-08
Code: AI
Working branch: ai-unit-draft-20261108
Unit dates (current): film Nov 9, AI1 Nov 11, AI2 Nov 13, AI3 Nov 17, AI4 Nov 19, Canvas exam Nov 23, Desk after Thanksgiving.

## Decision record: why the first implementation was rejected
The standalone ai-drafts/topic-01.html is a disposable prototype, not a lesson to publish. It duplicates CSS, invents an independent Gather/Copy routine, does not emit the canonical #BHV/#BHR record footer, lacks the shared parser round-trip, has no real practice-sort interaction, no researched clip, no teacher OS, no accessible paper route, and no browser verification. Never merge it to main as a student lesson.

Use the existing BeCurrent Midterms system as the content/interaction reference: scripts/lib/unit-content/midterms.js; scripts/build-midterms.js; scripts/lib/midterms-student.js; scripts/lib/midterms-render-helpers.js; the canonical Canvas record source scripts/lib/canvas-record-block.js. Do not hand-edit generated pages. New unit needs its own content module and generator, reusing compatible services without forking the record grammar.

## Non-negotiable classroom experience
- One opening story and a single legible chapter-by-chapter path. No isolated video queue at the top.
- Whole-class opening, then independent headphones/reading with optional teacher guidance. No presentations by students. Every response private.
- Printed-on-page notes and START HERE / PUSH FURTHER scaffolding. Students never copy notes.
- Eight numbered answers each lesson; practice sort/exercise is supplementary, not eight extra writing tasks.
- MagicSchool: one BeCurrent general-purpose room, link ONLY in Canvas. Prominent warning on every step: "Never type your full name, address, or anything private. Your teacher can read this chat." A complete printed sample/offline alternative for every chatbot use.
- Complete before-lunch workflow: Gather All My Work -> Copy -> Canvas Text Entry -> Submit and check confirmation. CNN 10 + News Log after lunch.
- Source and reading video fallback if video is unavailable. Short excerpts placed inside relevant chapters, with guiding question and a playback/caption check.
- Student pages contain no answer keys, no hidden teacher solutions, no privileged teacher notes. Public GitHub Pages URLs are NOT access-controlled; if teacher materials must actually be restricted, place them in role-restricted Canvas/private storage rather than claiming a hidden website button is secure.
- Website, teachers' materials, announcements and Canvas text all derive from one canonical unit data source. Keep live main unchanged until the branch passes tests.

## Opening hook: the class itself is evidence
The teacher can open AI1 with a truthful, high-interest disclosure: "I used AI to help design parts of this unit. Why should you trust what appears on this page?" Make the response private, not a class debate. Return to that same dilemma during AI2 (verification), AI3 (whose work changed), and AI4 (what rule should govern using AI in class). Do not imply that AI independently researched, verified, or approved the curriculum; human oversight is the point.

## Time and cognitive-load budget
Before-lunch investigation should fit the actual Midterms bell schedule. Draft a 55-minute required route: 4-minute story, 7-minute concrete opener, 15-minute core evidence (including a brief clip), 17-minute responses distributed across chapters, 7-minute applied practice, 5-minute Canvas filing. Reallocate rather than adding when a chapter runs long. Optional deeper reading and extra clips may not block essential comprehension. Eight responses should be short (many 1–2 sentences), with differentiation and paper accommodations. Keep CNN 10 and News Log after lunch.

## Unit argument
Question: "AI is already making decisions that affect your life. Which decisions should a person still make, and who gets to set the rules?"
Conceptual spine:
1. Model: Where does its answer come from?
2. Verification: What happens when the answer is wrong, unfair, or deliberately deceptive?
3. Consequence: Who benefits, who bears a cost, and what is the evidence?
4. Governance: What guardrail makes sense, for which use, and who enforces it?

Students should finish with a usable, evidenced decision rule rather than a blanket position for or against AI.

## AI1 | What AI Actually Is | Nov 9
Skill: Generalizing from Evidence. Exit: many AI systems learn from examples, but AI is a broad field; language models generate plausible text, which may or may not be true.
Chapters:
1. Already in your pocket: feed, spam, suggestions, translation (different kinds of tools).
2. Be the Model, paper first: five supplied sentence starters; distinguish regularities, facts and personal preferences. Answers vary legitimately.
3. How examples shape outputs: labels/training data, where bias or omissions can enter; do not imply all AI only uses training examples or that all models have fixed knowledge cutoffs.
4. AI or not AI interactive sort: calculator, For You, autocomplete, face unlock, microwave timer, spam filter, basic thermostat, translation. Valid choices "typically AI", "typically rules", "depends"; give explanation after check and allow correction; products mix components.
5. Chatbot probe: repeat starters in MagicSchool (Canvas link only). Printed illustrative responses if unavailable. Separate "sounds natural" from "factually accurate". Code.org How AI Works is preferred video pool, specific clip and runtime must be previewed.
6. Why students are already affected: Pew February 2026 teens survey (54% reported chatbot help for schoolwork; 59% *believe* cheating with AI happens at least somewhat often at their school, not measured actual cheating).
Eight questions (one response each):
1. Explain one distinction between learned patterns and fixed rules.
2. What examples might train a familiar AI feature?
3. Which tool could depend on implementation, and why?
4. Explain a predictable completion from Be the Model.
5. Contrast a personal-preference completion with a factual completion.
6. What did the chatbot or printed example reveal?
7. Give one helpful and one risky school use; say how to check the output.
8. Checkpoint: In what way is a chatbot a "good guesser", and where does that description fail?
No need to force an AI hallucination on the first day.
Sources: https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/ ; https://code.org/en-US/curriculum/how-artificial-intelligence-works

## AI2 | When AI Gets It Wrong | Nov 11
Skill: Sourcing / Corroboration. Essential intellectual correction: hallucination, systematic bias, and malicious impersonation are THREE DIFFERENT failure modes, with different actors and responsibilities.
Chapters:
1. Smooth words are not proof: recall from AI1.
2. The invented cases: *Mata v. Avianca* (2023) federal sanctions; attorneys responsible for verifying filings. Court order: https://docs.justia.com/cases/federal/district-courts/new-york/nysdce/1%3A2022cv01461/575368/54
3. Unfair patterns: Reuters 2018 reporting on Amazon's experimental hiring model, not a current public tool; training data and design decisions can reproduce inequities. Source: https://finance.yahoo.com/news/amazon-scraps-secret-ai-recruiting-174002175.html
4. Fake political voice: 2024 New Hampshire robocall, FCC $6 million fine for unlawful spoofing, 2025 criminal acquittal. Civil/administrative and criminal cases have different legal elements and standards; a not-guilty verdict does not by itself prove "the law isn't ready." Sources: https://docs.fcc.gov/public/attachments/DOC-405811A1.pdf ; https://www.nhpr.org/nh-news/2025-06-13/political-operative-fake-biden-robocalls-nh-primary-found-not-guilty
5. Verification lab: students compare a named claim with actual linked source, document what is supported, unsupported, or still unknown. Optional MagicSchool test with checkable questions; no demand to trick model into error. Printed erroneous claims clearly labeled instructional examples if used.
6. The habit: claim -> independent source -> evidence -> revise belief.
Eight answers: define hallucination; distinguish from deliberate fake; responsibility in lawyers case; source+finding from lab; explain one mechanism of bias; effect of cloned voice on voting information; why different legal outcomes can coexist; write a three-step corroboration rule.
Do not use a "Real or AI?" image-identification game.

## AI3 | What AI Changes, and Who Pays | Nov 13
Skill: Causation and Framing.
Chapters:
1. Jobs are task bundles: task-level sort for a job students choose, including meaningful human responsibilities.
2. Two different scopes: Stanford (Aug 12, 2026) finds a 19% RELATIVE employment shortfall for ages 22–25 in highly AI-exposed occupations versus less-exposed peers, largely hiring not separations; the finding is observational and not 19% of all jobs lost. Yale Budget Lab (Oct 14, 2026) sees no clear overall disruption. Both can be true because of scope, data, and method.
3. The cloud has an address: AI computation depends on physical data centers, electricity, cooling, land, network and workforce. Quantities vary by facility.
4. Lebanon, Boone County: Meta's Feb 11, 2026 announcement describes over $10 billion investment, around 4,000 construction workers at peak, and ~300 operational jobs. These are company projections/commitments; do not equate temporary peak construction positions with permanent jobs. Meta claims it will pay full energy/water service costs; distinguish promise from independently verified outcome.
5. Local decisions: Boone County approved a one-year pause on NEW data centers in unincorporated areas through June 15, 2027; does not halt Meta site in annexed Lebanon. Water program capacity of up to 25 million gallons/day by 2031 is regional program capacity, NOT Meta's predicted data-center consumption.
6. Compare frames: Meta announcement vs local independent reporting; the students label what each foregrounds and what remains unverified.
7. Decision tradeoff: who benefits; who absorbs burdens; what would change your mind? Avoid a simplistic "jobs vs water" two-column verdict.
Eight answers: why tasks before jobs; human-required task; assess chatbot output against human responsibility; Stanford/Yale scope; early-career hiring risk; chatbot-to-Lebanon causal chain; compare frames with source attribution; evidenced judgment with uncertainty.
Sources: https://digitaleconomy.stanford.edu/news/canariesaug26/ ; https://interactives.budgetlab.yale.edu/tools/ai-labor-market-tracker/?tab=current-update ; https://datacenters.atmeta.com/2026/02/hello-lebanon/ ; https://boonecounty.in.gov/2026/06/15/19190/ ; https://www.youarecurrent.com/2026/06/15/boone-county-installs-one-year-data-center-moratorium/
Local images must be properly licensed or linked as credited source visuals, no unlicensed copies.

## AI4 | Who Makes the Rules? | Nov 17
Skill: Framing and Generalizing from Evidence. Four decision layers: individual choices, classroom/district expectations, company rules, and governments (state/federal).
Chapters:
1. Who chooses? Return to unit question with students' first answer.
2. Indiana's candidate-fabricated-media law: relevant campaign communications depicting a candidate require explicit disclaimer; does NOT ban every synthetic video or every deepfake. Source: Indiana Code 3-9-8-5, https://law.justia.com/codes/indiana/2024/title-3/article-9/chapter-8/section-3-9-8-5/
3. State and federal government: December 11, 2025 executive order seeks a national framework and challenges some state rules, but cannot itself repeal a state statute. Do NOT say Congress has enacted no federal AI-related laws; distinguish targeted laws from a comprehensive overarching framework. Source: https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/
4. Platform and school standards: age/usage/visibility rules must be checked against current MagicSchool service settings. ZCS student handbook already has academic-dishonesty and acceptable-use provisions; do not imply students are in a rule-free vacuum. Whether the district has a dedicated student AI policy needs explicit confirmation. Source: https://www.zcs.k12.in.us/high-school-handbook/student-rights-hs
5. Constructed scenarios explicitly labeled: brainstorm vs AI-written essay; AI study quiz; fake principal snow-day announcement. Choose Allowed / Allowed with conditions / Not allowed, name responsible rule-maker, explanation, enforcement, appeal/safeguard.
6. Write and test a one-sentence school AI policy: evaluate for clarity, fairness, learning, privacy and implementability.
Eight answers: 4 sources of rules; disclosure benefit and limitation; federalism both sides with evidence; executive orders' limits; chatbot's perspective limitations; apply one scenario; who acts on fake snow-day video; final evidenced unit question.
No claims about exact current school AI policy without school confirmation.

## Assessment, November 19 (Canvas only)
25 multiple-choice questions: 6 from AI1, 6 AI2, 6 AI3, 7 AI4. Favor applied source reading, causal reasoning, distinguishing claims/projections, and selecting a defensible rule. No actual exam items, correct answers, or MagicSchool join code in public web assets. Website study guide covers terms, evidence, how to reason, and sample practice in fresh contexts; no exam leakage.

## Integration and verification gates
1. Write scripts/lib/unit-content/ai.js, with meta + four topics + dated source metadata. One canonical source. Use identifiers AI1..AI4, unique saved-response slot IDs.
2. Build scripts/build-ai.js following Midterms conventions to emit ai/index.html and ai/block-01.html to block-04.html, paper route, and teacher-run pages; common styles in assets/css; never edit generated student pages directly.
3. Reuse scripts/lib/canvas-record-block.js and the real parser; expected answer denominator computed from actual answer slots. Add automated test for 8/8, blank/partial, reload, copied HTML/text, offline and mobile. No separate homemade manifest.
4. Teacher OS launch from teacher area only; never call a public unlinked URL secure. Keep true answer keys or privileged content private.
5. Generate Canvas copy-ready materials from the same unit content source, including ASCII assignment names and due dates; all MagicSchool links live only in Canvas. Link check, news schedule and homepage updated only at publication.
6. Preflight video availability, runtime, captions, accessibility, and reading fallback. Each embedded-source date checked; fact-check as of class day, especially AI4 legislation.
7. Run npm test, npm run test:browser, and generator --check / full CI. Preview desktop, Chromebook, tablet, print, keyboard, screen reader, and real Canvas parser round trip.
8. Publish validated same commit by fast-forwarding main; no silent test bypass. Do not publish a lesson just because the static HTML renders.

## Teaching quality guard
Never grade a student's opinion about AI, data centers or rules. Grade sourcing, factual accuracy, causal logic, meaningful consideration of alternatives, and recognition of uncertainty. A source being "primary" (e.g., Meta) proves what an organization CLAIMED, not that its forecasts are already realized.
