'use strict';

// Phase-specific classroom guidance. Timings cover the 55 minutes before lunch:
// hook, direction, watch-1, investigate, watch-2, apply, file.
// These are teacher models, not student answer requirements or party positions.
// Topic 5 intentionally uses conditional models: never prefill election winners.
module.exports = {
  1: {
    timing: [4, 2, 5, 12, 12, 10, 10],
    rubric: [
      {label:'What voters choose',description:'Correctly identify Congress as the House and Senate, distinguish their election cycles, and explain that the presidency is not being elected.'},
      {label:'Fact and source',description:'Name a relevant source, accurately use a fact it establishes, and identify something it cannot establish yet.'},
      {label:'Power and limit',description:'Connect a changed majority to leadership, priorities, or oversight and explain one change it does not automatically cause.'},
      {label:'Explain your thinking',description:'Make the connection understandable in concise writing, dictated text, or the agreed paper response. Spelling and length do not determine this score.'}
    ],
    phases: {
      hook: {
        model:'Yes. Voters can change Congress while the president stays in office. I still need to learn what Congress can do.',
        lookFor:'Each student makes a private prediction or selects “not sure.” Notice whether students confuse Congress with the president.',
        reteach:'If most students think only presidents matter, name one school decision with two decision makers. Then say that national government also divides responsibilities; the analogy does not establish its exact rules.',
        cut:'Take the private poll without a class debate. Protect every student’s opportunity to predict.',
        move:'Introduce the missing-president puzzle. Students use Chapter 1. Accept uncertainty and keep political preferences out of the discussion.'
      },
      direction: {
        model:'By lunch I will explain who voters choose, how the two chambers differ, and one way that could affect government.',
        lookFor:'Students can point to the lesson question and identify the final explanation they will submit.',
        reteach:'If most students cannot state the purpose, reduce it to: “Who is on the ballot, and why does that matter?” Read it aloud once.',
        cut:'Do not read every target and criterion aloud. Protect the purpose and show the final-response location.',
        move:'Preview the five chapter titles. Explain that background dropdowns are optional support and that short notes can be reused in the final response.'
      },
      'watch-1': {
        model:'Congress is the House of Representatives and the Senate. The president is a different office.',
        lookFor:'After the selected Congress excerpt, students identify both chambers without including the president.',
        reteach:'If most students name only the House, draw one bracket labeled Congress around House and Senate. Read the short two-chamber takeaway aloud.',
        cut:'Stop the Congress excerpt at the planned 3:30 endpoint and omit the remainder of the full episode. Protect the House-plus-Senate distinction.',
        move:'Play the planned 0:00–3:30 Congress excerpt with captions. This is a pacing choice, not a claim that every lesson fact appears in that window. State the matching core takeaway, then use one private point-or-write check.'
      },
      investigate: {
        model:'House; Senate; Senate; Both; Both. The House has all 435 voting seats on its regular two-year cycle. Senators have six-year terms.',
        lookFor:'Students attempt all five items, use feedback, and correct errors. Specifically check “all 435” versus “all 100.”',
        reteach:'If most students miss two or more, display two columns: House—435, districts, two years; Senate—100, two per state, six years. Model the first item, then students retry privately.',
        cut:'Skip optional vocabulary discussion and the federalism extension clip. Protect the five-item attempt and correction.',
        move:'Students use Chapter 2. Read each statement aloud if needed. Give two minutes of independent attempt before explaining an answer. Do not score first-try errors.'
      },
      'watch-2': {
        model:'The FEC election information establishes the election date. It cannot establish a congressional winner before voting and counting. The chamber explanation helps me understand which offices are involved.',
        lookFor:'A named source is attached to a specific fact, and the unknown is a genuine outcome rather than a fact already explained.',
        reteach:'If most students write a prediction as a fact, make two headings: “The source establishes” and “We cannot know from this.” Place the election date in the first and a future winner in the second.',
        cut:'Play the 1:09 WFYI clip once; skip replay and the optional federalism clip. Protect time to inspect the source and write the evidence note.',
        move:'Use the short Members of Congress clip and the supplied official-source extract. Demonstrate where the fact appears. Students complete Chapter 3 with short notes; use the matched reading aloud if playback fails.'
      },
      apply: {
        model:'A different House majority could change committee leaders and which bills receive attention. It would not automatically remove the president or enact a law by itself.',
        lookFor:'One plausible institutional change plus one limit. A party name or a promise alone is not a governing explanation.',
        reteach:'If most students say the House can change every law, trace “House agreement → Senate agreement → presidential action” and ask which steps a House election does not settle.',
        cut:'Use one consequence and one limit; omit a second hypothetical. Protect the because/could/does-not-guarantee connection.',
        move:'Read the constructed scenario in Chapter 4. Think aloud one example, then let students make a concise private response or dictate it.'
      },
      file: {
        model:'Voters choose members of Congress. A new majority could change leaders and priorities, so the election can change governing power while the president stays. One chamber still cannot ordinarily enact a law alone.',
        lookFor:'The checkpoint contains an accurate election fact and a connected consequence. Confirm Canvas’s submitted screen, not merely saved text on BeCurrent.',
        reteach:'If most students list facts without a connection, supply “Voters choose __. Because __, this could __. It does not guarantee __.” Accept concise completion.',
        cut:'Omit Push further and extra polishing. Protect the final response and the last five minutes for gathering and Canvas submission.',
        move:'Students reuse earlier notes in Chapter 5. After five minutes, call the filing transition. Gather, paste into the assigned Canvas Text Entry, submit, and check confirmation. Use the agreed paper route when required.'
      }
    }
  },
  2: {
    // Recap clip, hook, direction, watch-1, investigate, watch-2, apply, file. The
    // recap's five minutes came from the hook, guided practice and apply (2026-10-21).
    timing: [5, 3, 2, 7, 8, 12, 8, 10],
    rubric: [
      {label:'Seats and majority',description:'Use the constructed 435-filled-seat model to explain why 218 is a majority. Do not present it as an actual 2026 result.'},
      {label:'Relevant evidence',description:'Name a clip or official reference and accurately explain evidence about leaders or committees.'},
      {label:'Influence and limits',description:'Explain two decisions a majority can influence and why the other chamber or presidential action still matters for a law.'},
      {label:'Explain your thinking',description:'Make the seat-to-power connection understandable. Concise notes, dictated text, and agreed paper work can show the same learning.'}
    ],
    phases: {
      recap: {
        model:'A midterm elects all 435 voting House seats and about a third of the Senate, but not the president. If the president’s party loses its majority in a chamber, the other party organizes that chamber and can slow or reshape the president’s priorities. Today we follow how separate races add up to that majority.',
        lookFor:'Students connect the clip to Day 1: a midterm chooses members of Congress, and a changed majority can change what Congress takes up while the president stays.',
        reteach:'If most students cannot say why a president would dread a midterm, return to the Day 1 notes on the two chambers and ask: who organizes the House if the president’s party loses seats there?',
        cut:'Play the clip once with captions on. Skip discussion of any polls, predictions, or seat counts in it; they are dated reporting, not 2026 results.',
        move:'Play the whole clip as class opens. Students answer the recap question privately in one sentence; voice one anonymous example yourself, then go straight to the 217 vs. 218 opening question.'
      },
      hook: {
        model:'In this constructed House, 218 is more than half of 435. Moving one seat can change which group has the majority.',
        lookFor:'Students compare 217 and 218 with the whole chamber rather than treating either number as a real election tally.',
        reteach:'If most students do not see the difference, split 435 into 217 + 217 + 1. Move the remaining seat visibly to one group.',
        cut:'Do not discuss actual party seat totals here. Protect the hypothetical-model label.',
        move:'Use the private prediction in Chapter 1. Say explicitly: these are invented groups and filled-seat assumptions, not current 2026 counts.'
      },
      direction: {
        model:'We will connect one seat to a majority, a majority to leadership, and leadership to priorities—with limits.',
        lookFor:'Students can identify the chain they will explain at the end.',
        reteach:'If most students think the lesson is only arithmetic, ask: “What can the majority decide before a bill gets a final vote?”',
        cut:'Read the purpose rather than all six target/criterion statements. Protect the distinction between organizing and lawmaking.',
        move:'Preview the seat model, committee evidence, and final question. Remind students that the final response can reuse their two earlier notes.'
      },
      'watch-1': {
        model:'A majority helps choose chamber leaders. Leaders influence which issues receive time and attention.',
        lookFor:'Students name a leadership job or decision, rather than memorize the historical officeholder shown.',
        reteach:'If most students only repeat a person’s name, cover the name and label the role: Speaker, leadership, schedule. Ask what the role can influence.',
        cut:'Use no more than four minutes of the leadership episode. Omit historical personality details and the rest of the episode.',
        move:'Play the selected leadership excerpt with captions, then model the role-to-decision link. Use the equivalent reading if blocked; do not add a full second explanation.'
      },
      investigate: {
        model:'Sort: Can influence; Can influence; Not guaranteed; Can influence; Not guaranteed. At 218 in the filled-seat model, Group A can organize the House; Senate agreement is still separate.',
        lookFor:'A 217-to-218 slider change is connected to organizing the House. Sort corrections distinguish influence over priorities from guaranteed policy.',
        reteach:'If most students equate majority with guaranteed law, move the slider across 218 and hold up a separate Senate card that has not changed. Retry items 3 and 5.',
        cut:'Try only 217 and 218 on the slider; omit additional seat combinations. Protect all five sort attempts and correction.',
        move:'Students use Chapter 2. Run one shared slider demonstration, then private practice. Monitor the sort itself rather than expecting the later source response now.'
      },
      'watch-2': {
        model:'The legislative-process reference explains that committees consider bills before floor action. A chair can influence which issues the committee examines, so priorities matter before a final vote.',
        lookFor:'A specific committee action, a named source, and an explanation of why the action matters before the whole chamber votes.',
        reteach:'If most students think committees make every law themselves, place “committee considers” before “full chamber acts.” Have students identify the missing later decision.',
        cut:'Use no more than four minutes of the committee episode. Omit the optional Alaska report today unless it replaces another activity.',
        move:'Use the selected committee excerpt, then inspect the short official-process extract together. Preserve at least eight minutes of this phase for the source comparison and Chapter 3 note.'
      },
      apply: {
        model:'Group A could choose House leaders and prioritize its school-safety proposal. The proposal is not guaranteed to become law: the Senate must agree to the same text and presidential action ordinarily follows.',
        lookFor:'The constructed 217-to-218 change leads to a leadership or committee consequence, with another institution identified as a limit.',
        reteach:'If most students write only “more power,” ask them to replace power with one action: choose leaders, schedule work, or set committee priorities. Add what that action cannot guarantee.',
        cut:'Use one route through the scenario; omit extra procedural hurdles and Senate threshold extensions. Protect a concrete mechanism and limit.',
        move:'Students use Chapter 4. Model a short because/could/not-guaranteed explanation, then let them write or dictate their own. Avoid inventing a real candidate’s position.'
      },
      file: {
        model:'In the constructed House, one seat can turn 217 into a 218-seat majority. That can change leaders and committee priorities. It does not guarantee a new law because the Senate and president still have roles.',
        lookFor:'The final response connects seats, organization, and priorities, and states a limit. Verify actual Canvas submission.',
        reteach:'If most students repeat “218” without explaining why it matters, supply the chain “seat → majority → leadership → priority” and have them explain one link.',
        cut:'Omit Push further and extra examples. Protect the last five minutes for gathering, pasting, and submitting.',
        move:'Students reuse the slider and committee notes in Chapter 5. Stop writing extensions with five minutes remaining and check the Canvas confirmation or agreed paper hand-in.'
      }
    }
  },
  3: {
    timing: [4, 2, 7, 10, 12, 10, 10],
    rubric: [
      {label:'Checks and institutions',description:'Accurately explain two congressional checks and distinguish a Senate-only confirmation power from powers both chambers exercise.'},
      {label:'Relevant evidence',description:'Name a relevant clip or official source and accurately use an institutional fact from it.'},
      {label:'Accountability and governing',description:'Use the scenario to explain both an accountability benefit and a governing difficulty, with a concrete mechanism and a limit.'},
      {label:'Explain your thinking',description:'Make the reasoning understandable without requiring a long response, public speech, or agreement with a political position.'}
    ],
    phases: {
      hook: {
        model:'The proposal can be delayed, changed, or stopped. A president cannot ordinarily enact that federal law alone.',
        lookFor:'Students recognize that separate institutions can disagree without an election having to be repeated.',
        reteach:'If most students say the president can simply pass the law, put a House card and Senate card between “proposal” and “presidential action.” Name the agreements still needed.',
        cut:'Use one private prediction, not a debate about the current president. Protect the institutional question.',
        move:'Students use Chapter 1. Introduce the disagreement as a constructed case and distinguish a proposed law from other executive actions.'
      },
      direction: {
        model:'We will explain two checks on presidential power and weigh how scrutiny can help while delay can hurt.',
        lookFor:'Students can describe both halves of the question: accountability and getting governing work done.',
        reteach:'If most students hear “checks” only as stopping everything, say: “A hearing may reveal information; agreement may still be needed for a law.”',
        cut:'Do not explain every constitutional exception in the opener. Protect the question and the two kinds of consequence.',
        move:'Preview the checks, bill pathway, and spending scenario. Explain that different judgments can succeed when the institutional facts and reasoning are accurate.'
      },
      'watch-1': {
        model:'Congress can investigate government actions and decide spending through legislation. The Senate also confirms many presidential nominees.',
        lookFor:'Students identify a real check and the institution exercising it. They do not treat a hearing as proof of guilt.',
        reteach:'If most students mix up the institutions, make three labels: House and Senate—legislation/oversight; Senate—many confirmations; President—sign/veto. Check one example privately.',
        cut:'Use no more than four minutes of the checks episode. Omit a full tour of every branch’s powers.',
        move:'Play the selected checks excerpt with captions and pause for one everyday-language restatement. Use the equivalent reading if blocked.'
      },
      investigate: {
        model:'House and Senate; Senate; President; House and Senate; House and Senate. Overriding a veto requires two-thirds support in each chamber.',
        lookFor:'Students attempt and correct the five power classifications. Pay particular attention to confirmation being Senate-only and sign/veto being presidential.',
        reteach:'If most students miss the same institution, place that sort statement below the correct institution label and explain one example. Students retry it before moving on.',
        cut:'Skip additional impeachment and Senate procedure examples. Protect correction of the core power classifications.',
        move:'Students use Chapter 2. Read statements aloud when helpful. Monitor the sort results rather than expecting the later balanced judgment at this point.'
      },
      'watch-2': {
        model:'Ordinarily the House and Senate must pass the same bill, then the president has a role. Congress can also use oversight to question officials. These are distinct checks, not proof that a particular official did something wrong.',
        lookFor:'The evidence note explains two actual congressional checks, names its source, and does not claim one chamber can ordinarily enact a law alone.',
        reteach:'If most students list branch names without checks, start two clauses: “Congress can ask officials questions through oversight” and “Congress decides legislation.” Then identify which source supports each.',
        cut:'Use no more than four minutes of the bill episode. Omit extra lawmaking trivia and optional extensions.',
        move:'Trace the selected bill excerpt against the short official-process extract. Then students complete the Chapter 3 note. Keep at least eight minutes for the source check and writing.'
      },
      apply: {
        model:'A hearing could reveal weaknesses in the spending plan and improve accountability. Delay could also slow an important government decision. We would need evidence about the plan and the effects of delay to judge this case.',
        lookFor:'Both viewpoints receive a fair explanation linked to the constructed spending scenario, not a claim that one party is always good or bad.',
        reteach:'If most students supply only one side, use two sentence frames: “Scrutiny could help by __” and “Delay could hurt by __.” Let them use the same institutional example.',
        cut:'Omit a second scenario and whole-class debate. Protect both the benefit and difficulty in a private response.',
        move:'Read Chapter 4’s scenario aloud. Model one mechanism without selecting a party, then accept concise writing, dictation, or agreed paper work.'
      },
      file: {
        model:'Divided government can do both. A congressional hearing can uncover information about a spending proposal, while disagreement can delay a law needed to fund it. The effect depends on the evidence and decisions, not only the parties involved.',
        lookFor:'A supported judgment includes a specific institutional example and both consequences. Verify Canvas’s submitted screen.',
        reteach:'If most students write only “good and bad,” ask “Which action helps?” and “Which decision might wait?” Help them insert those actions into their response.',
        cut:'Omit Push further and extra constitutional exceptions. Protect the short explanation and the final five minutes of filing.',
        move:'Students reuse their evidence and scenario notes in Chapter 5. Move to Gather All My Work with five minutes left, then check submission or the agreed paper route.'
      }
    }
  },
  4: {
    timing: [3, 2, 6, 10, 14, 10, 10],
    rubric: [
      {label:'Message and framing',description:'Identify a message’s claim, intended audience, and missing context without presenting a constructed teaching example as a real quotation.'},
      {label:'Check the real claim',description:'Record the actual claim and source/date/link, name independent evidence, and explain exactly what it supports, contradicts, or leaves unresolved.'},
      {label:'Polls, promises, uncertainty',description:'Explain why a sample-based poll does not establish an election winner and why a campaign promise does not guarantee a policy change.'},
      {label:'Explain your thinking',description:'Make the evidence-to-conclusion connection understandable. Political preference, response length, and public speaking are not scored.'}
    ],
    phases: {
      hook: {
        model:'A message can select a number or image that draws attention to one concern. I need its source and context before accepting the conclusion.',
        lookFor:'Students distinguish a message’s impression from evidence establishing its factual claim.',
        reteach:'If most students think a number settles the issue, ask what it counts, when it was measured, and what comparison is missing. Do not invent a real campaign quotation.',
        cut:'Use the private prediction without an open political debate. Protect the source-and-context question.',
        move:'Students use Chapter 1. Explain that everyone applies the same checking questions to every party and can respond privately.'
      },
      direction: {
        model:'First notice how a message persuades. Then check one exact factual claim against evidence. Finally say what remains uncertain.',
        lookFor:'Students know that identifying framing and verifying a claim are related but separate tasks.',
        reteach:'If most students say the goal is to pick the better candidate, restate: “We assess a claim and its evidence, not your vote or beliefs.”',
        cut:'Read the three-part checking routine rather than every target aloud. Protect the difference between claim and proof.',
        move:'Preview the constructed-message practice and the prepared real-claim packet. Show where the independent evidence appears so the task does not become an open-web search.'
      },
      'watch-1': {
        model:'A campaign site can establish what a candidate promises. A relevant independent record is needed to check whether a factual claim is supported.',
        lookFor:'Students identify a source that answers the exact question, rather than treating any second website as confirmation.',
        reteach:'If most students choose two copies of the same message, trace both back to the original. Contrast repeating a claim with checking a relevant record.',
        cut:'Use the 2:55 WFYI candidate-research clip once. Omit replay and the optional full campaign report.',
        move:'Watch with captions, then model “Who says this? What evidence would test it?” Use the equivalent short reading if playback fails.'
      },
      investigate: {
        model:'Campaign promise; Poll estimate; Official result; Claim needing checking; Claim needing checking. An estimate from a sample is not a certified election result.',
        lookFor:'All five classifications are attempted and corrected. Students distinguish a desired future action from an observation or official outcome.',
        reteach:'If most students confuse promise and result, contrast “I will seek a law” with “The office certifies these totals.” Have students underline future versus completed action.',
        cut:'Skip extra examples beyond the five-item sort. Protect feedback and a private retry.',
        move:'Students use Chapter 2. Read the examples aloud and label them constructed teaching examples, not actual campaign statements or results.'
      },
      'watch-2': {
        model:'Constructed Message A emphasizes household costs and addresses voters worried about expenses. It promises support for a bill, but I would need the bill’s details and evidence about its effects to assess the promised savings.',
        lookFor:'A constructed-message note identifies claim, audience, and missing information. For the real claim, students can locate the speaker, date, exact claim, and matched independent evidence in the packet.',
        reteach:'If most students judge only whether they like the message, underline its checkable words. Ask “Which record could support or challenge these words?” Model one match before independent work.',
        cut:'Use at most three minutes of the media excerpt, or the matched reading instead. Do not add the full campaign report to this phase. Protect the guided evidence inspection.',
        move:'Briefly explain framing, then analyze one constructed message. Open the prepared real-claim packet and model where its attribution and independent record appear. Reserve the remaining time for guided notes; students need not search for a claim themselves.'
      },
      apply: {
        model:'The actual claim is [exact words], attributed to [speaker] on [date] at [link]. The independent [named record] establishes [specific finding]. It supports [part], but it does not establish [remaining inference]. Fill these brackets from today’s real packet; they are not a quotation or a result.',
        lookFor:'The real claim has source/date/link, an independent record relevant to that claim, and a careful conclusion. Unsupported or unresolved is acceptable when justified.',
        reteach:'If most students copy the claim as proof, place claim and independent record side by side. Model one “supports / contradicts / cannot settle” judgment using the actual packet wording.',
        cut:'Use the one prepared claim and one matched record. Omit a second claim and optional polling extensions. Protect attribution and the evidence-based conclusion.',
        move:'Students use the same real claim in Chapter 4 and the Teacher OS. Complete the short verification note or dictate it. Do not substitute the earlier constructed scenario for this real-claim check.'
      },
      file: {
        model:'A poll estimates views in a sample at a particular time; it does not count all the votes or award seats. A campaign promise describes what someone wants to do, but a law still needs other decision makers. Neither establishes victory or a guaranteed policy.',
        lookFor:'The checkpoint gives a reason for both limits: sampling/reporting for the poll and institutional steps for the promise. Verify actual Canvas submission.',
        reteach:'If most students say only “it might be wrong,” ask what the poll measured and which institutions still must act on the promise.',
        cut:'Omit Push further and a class debate. Protect the short uncertainty explanation and the final five minutes for Canvas.',
        move:'Students reuse the message and evidence notes in Chapter 5. Gather and submit with five minutes left; accept the agreed paper route and do not grade political preferences.'
      }
    }
  },
  5: {
    timing: [3, 2, 8, 5, 15, 10, 12],
    rubric: [
      {label:'Accurate results',description:'Accurately record House control, Senate control, and one Indiana congressional race as of a stated check time. Attach sources and reporting stages; an honestly unresolved finding can earn full credit.'},
      {label:'Effects and limit',description:'Explain two possible governing effects through leadership, committees, oversight, or lawmaking, plus one change the result does not guarantee. Use conditional language when needed.'},
      {label:'Two-source reasoning',description:'Identify two sources and explain what each establishes. Distinguish official counts or certification from news race calls and avoid treating repeated reporting as separate proof.'},
      {label:'Another reasonable impact',description:'Explain a fair alternative interpretation of the governing impact, such as accountability versus delay. Do not give a false alternative to an established factual result.'},
      {label:'Remaining uncertainty',description:'Name an unresolved result, future policy question, or other genuine uncertainty and explain what additional evidence or event would clarify it.'}
    ],
    phases: {
      hook: {
        model:'No. An early lead reports part of the count. A news race call and official certification are different reporting stages.',
        lookFor:'Students ask which source and stage support a result rather than treating every displayed leader as a final winner.',
        reteach:'If most students call all three final, label three examples “partial count,” “news call,” and “official sign-off.” Keep any actual unresolved outcome unresolved.',
        cut:'Skip predictions about which party will win. Protect source and reporting-stage labels.',
        move:'Teach after November 3. Students use Chapter 1. State the actual check date and explain that a dated unresolved finding is valid evidence.'
      },
      direction: {
        model:'We will record what the sources establish, connect it to two possible effects and a limit, and explain what remains uncertain.',
        lookFor:'Students know they can reuse their notebook and short evidence bullets in the final synthesis rather than write three separate essays.',
        reteach:'If most students think every race must be settled, show the unresolved option and a conditional “If control is __, then __ could follow” frame.',
        cut:'Do not read the full rubric aloud. Protect the five-sentence synthesis purpose and the source/stage requirement.',
        move:'Show the prepared dated results sources and the final-response frame. Explain that application notes are optional planning and that no public presentation is required.'
      },
      'watch-1': {
        model:'A news organization calls a race using counted votes and analysis. That is not the official certification by election authorities.',
        lookFor:'Students distinguish the reporting organization’s conclusion from an official sign-off and recognize that the 2020 video does not report 2026 winners.',
        reteach:'If most students treat a news call as certification, ask who issued it. Place the news organization and election authority under different stage labels.',
        cut:'Play the 6:19 race-calling report once. Skip a replay; use the matched reading aloud if blocked. Protect the source-and-stage check.',
        move:'Introduce the report as a dated explanation of method. Watch with captions and make one brief distinction afterward; no written response is due during playback.'
      },
      investigate: {
        model:'Poll / forecast; Unofficial count; News race call; Certified result; Unofficial count. These are constructed examples, not actual 2026 findings.',
        lookFor:'Students classify and correct reporting stages. They do not need to have filled the results notebook during this practice phase.',
        reteach:'If most students confuse count and call, underline the issuer: an election office posts totals; a news organization concludes who won. Then retry those two items.',
        cut:'Read all five items aloud in one shared pass and allow private selections; omit extra explanations of already-correct items. Protect correction of the stage distinction.',
        move:'Use Chapter 2 as a brisk retrieval check. Announce that real 2026 evidence comes next, so no invented example becomes a result in the notebook.'
      },
      'watch-2': {
        model:'As of [actual check time], [named source] reports [finding] at [stage]. [Second named source] establishes [finding or a different stage]. [Race or control] remains unresolved if the evidence does not settle it. Fill brackets only from the current records.',
        lookFor:'The notebook covers House control, Senate control, and one Indiana congressional race with sources, stages, and check time. Short evidence bullets compare what two sources actually establish.',
        reteach:'If most students cannot navigate the sources, model one notebook row from the prepared packet and point to its timestamp and stage. Students then complete the other rows with the same routine.',
        cut:'Make the voting-machine clip optional and skip it in the 55-minute core path. Use the prepared source extracts rather than open-web searching. Protect dated evidence and honest uncertainty.',
        move:'Open the prepared current House, Senate, and Indiana source extracts. Model one row, then students complete the notebook and brief source-summary bullets in Chapter 3. Accept unresolved outcomes; no winner is prefilled.'
      },
      apply: {
        model:'If the verified outcome changes a chamber’s majority, leaders and committee priorities could change. Oversight could also change. This does not guarantee a promised law. Another reasonable interpretation may emphasize accountability while a second emphasizes delay.',
        lookFor:'Planning identifies two institutional effects, one limit, and a fair alternative interpretation of impact. It does not dispute established vote totals merely to manufacture balance.',
        reteach:'If most students write only a party reaction, offer four mechanism words: leadership, committees, oversight, lawmaking. Choose two and explain what each could change.',
        cut:'Application is optional planning, not a separate required paragraph. Reuse the notebook and bullet notes. Protect preparation of the two effects, limit, alternative impact, and uncertainty for the final response.',
        move:'Guide Chapter 4 as oral teacher modeling with private optional notes. Use conditional language if control is unresolved. Finish any remaining source entries before adding extensions; do not require report-outs.'
      },
      file: {
        model:'1. As of [time], [source 1] establishes [outcome/stage], while [source 2] establishes [corroboration or unresolved point]. 2. Because / if [outcome], [leadership or committee effect] could follow. 3. [Second effect] could also follow, but [limit]. 4. Another reasonable view emphasizes [alternative governing impact]. 5. We still do not know [genuine uncertainty]; [later evidence or decision] could clarify it. Use current sourced facts in every bracket.',
        lookFor:'One concise synthesis reuses notes and identifies two sources, two effects, one limit, a fair alternative impact, and genuine uncertainty. Confirm the final response and notebook travel with Gather All My Work and are submitted in Canvas.',
        reteach:'If most students stall, point to the notebook for sentence 1 and the optional planning for sentences 2–4. Let them dictate or use bullets covering the same ideas; do not demand a new essay.',
        cut:'Omit optional planning cleanup, extra race research, and Push further. Protect seven minutes to synthesize and the final five minutes to gather, paste, and submit.',
        move:'Students use Chapter 5’s five-sentence frame, reusing prior notes. Check the evidence/stage labels before filing. With five minutes left, move everyone to Canvas or the agreed accommodated hand-in. Keep lunch and the after-lunch news block separate.'
      }
    }
  }
};
