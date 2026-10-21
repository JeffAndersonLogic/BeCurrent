'use strict';
// Narrative bridges and optional context for the civics investigation.
// These readings explain the same institutional facts as the unit source desk.
const R=(title,...paragraphs)=>({title,paragraphs});
module.exports={
  1:{
    headings:['Start with the puzzle','Meet the two chambers','Check what we know','Follow a change in power','Explain why it matters'],
    bridges:[
      'A presidential election gives us an obvious person to watch. A midterm is different: the president stays, while voters can change the people who work with or challenge that president. Start by making a prediction.',
      'To solve the puzzle, we need to know who else makes decisions in Washington. Meet Congress, then use the chamber comparison to check the differences that matter in November.',
      'Now that you know the two chambers, connect them to the actual election. The short clip reinforces the structure. The official source helps us separate facts we can verify from outcomes we cannot know yet.',
      'Here is the connection: different election winners can produce different congressional leaders and priorities. Follow one possible change while keeping track of what stays in place.',
      'You began with a president who stays in office. You can now explain how the other elected part of the federal government can change—and why that matters.'
    ],
    opening:R('Why is an election without a presidential race still important?',
      'Think of government as several people holding different parts of a decision. The president has major responsibilities, but Congress has its own powers. Congress considers laws, decides spending through legislation, and checks government actions. Changing its members can change the choices a president faces.',
      'A midterm happens halfway through a four-year presidential term. The word describes the timing. It does not mean the offices being elected have less power. The question for today is which parts of government voters can change in 2026.'),
    deepen:R('Why do the House and Senate have different election cycles?',
      'House members serve two-year terms. Every regular federal general election gives voters a chance to choose all 435 voting representatives. A House member represents one district, so House elections connect national government to many separate places.',
      'Senators serve six-year terms, with regular elections staggered across three groups. Only roughly one-third face a regular election in a given cycle. Each state has two senators, and their terms normally end in different cycles. Special elections can add races. These rules mean a House change and a Senate change can look very different.'),
    evidence:R('What is already known, and what is still a prediction?',
      'A source can establish one thing without answering everything. The FEC election-information page can establish the scheduled general-election date. The Senate reference can establish the term length. Neither establishes who will win a future race.',
      'A primary usually helps choose a party nominee. A general election selects the officeholder. A primary result is a completed event, but its winner still has another election ahead. When you write, name the source and explain the exact fact it supports.'),
    application:R('What would a new House majority actually change?',
      'Imagine that voters elect enough members of a different party to give that party a House majority. The new membership can lead to different chamber leaders and committee chairs. Those people influence which bills and investigations receive attention.',
      'That change does not itself replace the president. It also does not make every preferred proposal a law. The Senate and the president still have roles in ordinary lawmaking. A careful explanation identifies a change in power and a limit on that power.'),
    finish:R('Put the lesson together: voters, seats, and decisions',
      'Follow the chain in order. Voters choose representatives and senators in separate elections. Those winners determine chamber membership. Membership affects who organizes each chamber and which decisions its leaders prioritize.',
      'Your final response only needs to connect one accurate election fact to one possible governing consequence. For example, the fact that House seats are being elected matters because a change in membership can change House leadership. Keep the consequence separate from a guarantee about future laws.')
  },
  2:{
    headings:['Start with one seat','See how a majority forms','Look inside the committees','Test a campaign promise','Explain the power shift'],
    bridges:[
      'Last time, you learned what voters choose. Today, follow those choices into Congress. A small difference in seats can decide who organizes the work.',
      'A majority means more than a number on a scoreboard. Watch how it connects to leadership, then move the seat model to see when control changes.',
      'Leadership matters partly because much of the work happens before a final vote. Look inside a committee to see how an issue can gain attention or meet an obstacle. Then find a real committee and see who runs it.',
      'Now put the seat model and the committee story together. A new majority has opportunities, but its promises still face other decision-makers.',
      'You have traced the path from separate races to membership, leadership, and priorities. Use that chain to explain why a few seats can matter so much.'
    ],
    opening:R('How can one race matter to the whole House?',
      'House elections happen in individual districts. Each race adds one member to the chamber. After the races are counted, the overall membership determines which party can organize the House.',
      'Our model uses two groups and all 435 voting seats filled. If one group has 218 seats and the other has 217, the first has more than half. This is a constructed example, not a report of current party totals. It helps us see why one closely contested race could affect the larger balance.'),
    deepen:R('What does a congressional leader do?',
      'Members do more than vote yes or no. Leaders help organize the chamber, set priorities, and coordinate members. The Speaker is elected by the House. Majority and minority leaders help their groups plan and respond to the other side.',
      'A new majority can change leadership and committee organization. Those changes can influence what the chamber spends time considering. Keep the distinction clear: controlling the work schedule is consequential even when a leader cannot guarantee the final vote.'),
    evidence:R('Why can a committee change a bill’s chances?',
      'A committee is a smaller working group focused on certain subjects. Members can examine a proposal, question people with relevant knowledge, and consider changes. This lets Congress work on many subjects without every member studying every detail at once.',
      'A chair can influence which matters receive attention. If a proposal never moves forward, the full chamber may never vote on it. That is why committee control matters before the moment usually shown in headlines: the final floor vote.'),
    application:R('Does controlling the House mean controlling the government?',
      'A House majority can organize that chamber, but the Senate is separate. A bill ordinarily needs the same text approved by both chambers before presidential action. Agreement inside one group does not guarantee agreement elsewhere.',
      'The Senate also has its own rules. An outright majority in a full Senate is 51 seats; a 50–50 split involves the vice president’s tie-breaking role and chamber organization. Some procedures create additional hurdles. Winning a majority and having enough support for every action are different questions.'),
    finish:R('Connect a seat change to a real consequence',
      'Avoid ending your answer at “one party wins.” Explain the next step. A changed majority could bring different leaders, different committee chairs, or a different agenda. Then name the decision those changes could affect.',
      'Finish with a limit. A new priority is not automatically a new law. The strongest explanation shows why the seat change matters while recognizing that other institutions and individual votes still shape the outcome.')
  },
  3:{
    headings:['Start with a disagreement','Find the checks on power','Follow a bill through government','Weigh scrutiny and delay','Make a supported judgment'],
    bridges:[
      'You know how elections can change congressional control. Now ask what that control can do when Congress and the president disagree.',
      'The disagreement is only the beginning. To explain what happens next, identify the powers held by each institution. Watch for concrete actions rather than party labels.',
      'A lawmaking example makes the limits easier to follow. Trace the same proposal through the House, Senate, and president, then identify the points where agreement is needed.',
      'Rules have consequences for people. The same check that exposes a problem can also slow a decision. Consider the strongest reason someone might welcome scrutiny and the strongest concern about delay.',
      'Return to the opening disagreement. You can now explain a mechanism, weigh two consequences, and state what your conclusion depends on.'
    ],
    opening:R('Why can a president face resistance from Congress?',
      'An election does not give one person every governing power. The president leads the executive branch, while Congress has legislative responsibilities. The two may agree on a goal and disagree on the details—or disagree about the goal itself.',
      'If different parties control the presidency and at least one chamber, we call that divided government. It can also be difficult to reach agreement within a single party. To understand a disagreement, first ask which institution has the authority to take the proposed action.'),
    deepen:R('What do oversight, spending, and confirmations involve?',
      'Oversight means Congress examining how government uses its authority. Hearings and investigations can ask officials to explain decisions and provide information. Asking questions can help establish facts; it does not itself prove wrongdoing.',
      'Congress also makes spending decisions through legislation. Many presidential nominations require Senate confirmation. These powers give Congress ways to influence the executive branch. They are distinct actions, with different rules, so an explanation should name the particular check being used.'),
    evidence:R('Why do both chambers have to agree?',
      'Ordinarily, the House and Senate must approve the same bill before it goes to the president. If the chambers approve different versions, those differences must be resolved. A proposal can therefore change as institutions negotiate.',
      'The president can sign the bill or use a veto, among the actions the Constitution permits. Overriding a veto requires two-thirds support in each chamber. The practical lesson is that an election victory in one chamber rarely settles the entire lawmaking process.'),
    application:R('How can a check be useful and frustrating?',
      'Suppose a committee questions a spending proposal. Someone concerned about waste might welcome the hearing because it could uncover problems. Someone waiting for the funded service might worry that delay will create costs or harm.',
      'Both arguments can be reasonable without being equally supported in every case. Ask what the hearing reveals, how long the delay lasts, and who is affected. Evaluate evidence about those consequences instead of assuming a party label tells you the answer.'),
    finish:R('How to make a judgment without oversimplifying',
      'Name the check, explain what it can accomplish, and recognize its cost or limit. “Congress can investigate” becomes a stronger explanation when you connect the investigation to information, accountability, or a delayed decision.',
      'You can conclude that divided government helps, hurts, or does both in a situation. Support the conclusion with an institutional example and explain fairly why someone could reach another judgment.')
  },
  4:{
    headings:['Notice the message','Learn how to check it','Look for framing and evidence','Test a real claim','Explain what remains uncertain'],
    bridges:[
      'Campaigns compete to decide which issues voters notice. Start by considering how the same information can create different impressions.',
      'Before deciding whether a message is convincing, learn a repeatable checking method. Identify the exact claim, then ask which source could establish it.',
      'The first clip gave you a checking method. The next shows why selection and framing matter. Use the constructed messages to identify the choices being made.',
      'Move from the practice messages to a real claim. Trace it to its source and check evidence that can answer the specific question.',
      'A useful check may reveal uncertainty. Explain what your evidence establishes and why a poll or promise cannot settle an election or a future policy decision.'
    ],
    opening:R('What does a campaign want a voter to notice?',
      'A campaign has limited time to persuade people. It chooses an issue, an image, a number, or a personal story. Those choices direct attention. A message about costs and a message about services can create different priorities in the voter’s mind.',
      'Begin by identifying the claim in plain language. Then ask who the message appears designed to reach. Understanding a persuasive choice helps you examine the message before deciding whether its factual claim is supported.'),
    deepen:R('How do you choose a useful checking source?',
      'Match the source to the claim. A claim about a recorded vote calls for the vote record. A claim about a spending amount calls for the relevant budget or financial document. Reporting can help explain context and point to those records.',
      'A campaign’s own page can establish what that campaign says. To test the statement, look for evidence independent of the campaign. A second website copying the same statement does not add an independent verification.'),
    evidence:R('Can a message be accurate and still leave something out?',
      'A number may be correct but incomplete. Perhaps it describes one year, one part of a program, or only one comparison. A headline can emphasize that number while leaving the limits farther down the page.',
      'Ask which context would change the impression: the time period, the comparison, the people affected, or the source’s methods. This is a reason to check carefully, not a reason to assume every message is false. The two messages in this activity are constructed examples, not real campaign quotations.'),
    application:R('What if two sources appear to disagree?',
      'Check whether they are answering the same question. One may describe a proposal while another describes an existing law. They may use different dates, groups, or measures. First identify the exact point of disagreement.',
      'Then explain what the evidence supports, contradicts, or leaves unresolved. You do not need to force a verdict. A careful unresolved finding is stronger than declaring a claim true or false without evidence that can settle it.'),
    finish:R('Why does a favorable poll fail to guarantee a win?',
      'A poll estimates opinion from a sample at a particular time. Who was asked, the wording, timing, and uncertainty affect what the estimate can tell us. The people who answer are not the complete future electorate.',
      'A promise has a different limit: even a winning candidate may need cooperation from other people and institutions. Keep three questions separate: what people currently say, who wins the election, and what government later does.')
  },
  5:{
    headings:['Begin with what is known','Learn how a result is reported','Build the results record','Trace the governing effects','Explain the results and their impact'],
    bridges:[
      'The earlier lessons prepared you to understand the outcome. Now begin with the evidence available when class meets, including any races still unresolved.',
      'Before recording a winner, identify the stage of reporting. The first video explains how a news organization reaches a race call. It is a dated example of the method.',
      'Now apply the method to 2026. Check official records and current reporting, record their dates and stages, and build a result you can trace back to its sources.',
      'The totals are the starting point. Connect them to the institutions you studied: leadership, committees, oversight, and the lawmaking process.',
      'Bring the unit together. Explain what the election established, what governing effects could follow, and which questions still need time or evidence.'
    ],
    opening:R('Why might the class meet before every result is final?',
      'Election reporting develops as ballots are counted and officials check the totals. A close race can remain unresolved after other races have been called. That is a reason to identify uncertainty rather than fill the gap with a guess.',
      'Your work is a dated account of what the evidence establishes. Record when you checked and which source you used. If a later update changes a finding, you can explain what new information appeared.'),
    deepen:R('How are a poll, count, race call, and certification different?',
      'A poll estimates opinion. An unofficial count reports ballots counted so far. A news race call is a reporting organization’s conclusion about the winner based on its analysis. Certification is the official sign-off under the relevant rules.',
      'These labels describe different sources and stages. They should stay attached to your notes. Do not describe a partial lead as a final win or turn a news call into an official certification. The earlier-election videos explain methods, not 2026 outcomes.'),
    evidence:R('How do separate races establish chamber control?',
      'Congressional control depends on the membership of a chamber, not a presidential electoral map. A report about one important race may help explain the larger contest, but it does not establish every remaining seat.',
      'Use reporting that accounts for the chamber as a whole, and compare it with official race results as they become available. For your Indiana example, identify the exact congressional race. Keep an unresolved seat or control question unresolved until your evidence supports a conclusion.'),
    application:R('When do election results begin changing government?',
      'Winning on Election Day and beginning a regular congressional term are different moments. Newly elected members ordinarily begin their terms on January 3, 2027. In the meantime, the outgoing Congress still has responsibilities.',
      'Once the new membership organizes, leadership and committees can change. Policy outcomes can take longer and may require other institutions to agree. Explain those steps rather than treating every campaign promise as an immediate consequence of the vote.'),
    finish:R('Build an explanation that can survive a later update',
      'Start with the sourced outcome and its reporting stage. Connect it to two possible governing effects, then identify a limit. Use at least two sources and make clear which part of your explanation each supports.',
      'Include a fair alternative interpretation and an uncertainty. A reader should be able to tell what happened, what you think it could mean, and what evidence might change your conclusion. If chamber control remains unresolved, use a conditional explanation.')
  }
};
