'use strict';
// Canonical AI lesson content. Canvas names and public labels: semester-calendar.js.
module.exports = {
  "meta": {
    "unit": "The Machine in the Room",
    "unitKey": "ai",
    "code": "AI",
    "course": "CURRENT EVENTS",
    "reviewed": "2026-11-17",
    "design": "Signal Lab / Midnight Ember",
    "renderer": "ai-investigation",
    "overview": "One complete NOVA documentary followed by four evidence-based investigations and a study-guide work day. Understand how AI works, verify its claims, evaluate tradeoffs and decide who makes the rules.",
    "terminalQuestion": "AI is already making decisions that affect your life. Which decisions should a person still make, and who gets to set the rules?",
    "openingFilm": {
      "title": "A.I. Revolution | Full Documentary | NOVA | PBS",
      "source": "NOVA PBS Official",
      "date": "2024-03-27",
      "url": "https://www.youtube.com/watch?v=-sB12gk9ESA",
      "alternate": "https://www.pbs.org/video/ai-revolution-umwwlt/",
      "fullRuntime": "53:30",
      "assigned": "Watch the entire 53 minute 30 second NOVA documentary before lunch on Tuesday November 17, 2026.",
      "note": "After lunch: CNN10. No homework, News Log, written work, or Canvas submission on November 17. Watch the film from 00:00 to the end, not from a timestamp."
    },
    "schedule": [
      [
        "2026-11-09",
        "Video - 60 Minutes Interview with President Trump"
      ],
      [
        "2026-11-11",
        "The Desk 111126"
      ],
      [
        "2026-11-13",
        "The Desk 111326"
      ],
      [
        "2026-11-17",
        "AI1 - Intro to AI (Nova Video)"
      ],
      [
        "2026-11-19",
        "AI2 - What Exactly AI Is"
      ],
      [
        "2026-11-23",
        "AI3 - When AI Gets it Wrong"
      ],
      [
        "2026-11-30",
        "AI4 - What AI Changes"
      ],
      [
        "2026-12-02",
        "AI5 - Who Makes the Rules?"
      ],
      [
        "2026-12-04",
        "AI6 - Study Guide Work Day"
      ],
      [
        "2026-12-08",
        "AI Unit Exam"
      ],
      [
        "2026-12-10",
        "Final Exam Study Guide Work Day"
      ],
      [
        "2026-12-16",
        "Final Exam"
      ]
    ],
    "studentFlow": "Nov 9: 60 Minutes video day (past). Nov 11 and 13: The Desk (past). Nov 17: CE - AI1 Intro to AI, full NOVA documentary before lunch; CNN10 after, no homework or written submission. Nov 19 AI2; Nov 23 AI3; Nov 30 AI4; Dec 2 AI5: independent evidence investigations with eight short private responses and Gather All My Work in Canvas. Dec 4 AI6: study guide work day. Dec 8: Canvas-only AI Unit Exam. Dec 10 final exam study guide; Dec 16 traditional final exam.",
    "privacy": "Never type your full name, address, or anything private. Your teacher can read this chat.",
    "dayOneFormat": "November 17: complete PBS NOVA A.I. Revolution (53:30) before lunch, CNN10 after lunch. No written work or homework.",
    "assessment": {
      "date": "2026-12-08",
      "location": "Canvas only",
      "questions": 25,
      "distribution": {
        "AI2": 6,
        "AI3": 6,
        "AI4": 6,
        "AI5": 7
      },
      "notes": "Questions and answer key in Canvas only. AI1 is the opening NOVA film; AI6 is a study guide work day."
    }
  },
  "topics": [
    {
      "n": 2,
      "key": "ai-t02",
      "page": "block-02.html",
      "date": "2026-11-19",
      "title": "What Exactly AI Is",
      "subtitle": "A very good guesser",
      "skill": "Generalizing from Evidence",
      "question": "How can a computer sound like it understands you?",
      "hook": "On November 17, NOVA showed AI learning patterns from huge numbers of examples. Today you test that yourself in a five-round challenge against a MagicSchool chatbot, built around something you are into: can you predict what it will say, can you trap it, and can you tell when it deserves your trust?",
      "overview": "Take on a MagicSchool chatbot in a five-round challenge, Can You Outsmart the Machine?, built around an interest you choose. Predict how it finishes sentences, test it with tricky questions you write yourself, check one answer outside the chatbot, see how AI is used in your own world, and decide which answers deserve your trust.",
      "learningTargets": [
        {
          "skill": "Explanation",
          "target": "I can explain patterns, training examples, and prediction in plain language."
        },
        {
          "skill": "Classification",
          "target": "I can tell a checkable fact from an opinion and from a question built on a false assumption."
        },
        {
          "skill": "Evidence",
          "target": "I can explain why a convincing sentence might still be incorrect."
        }
      ],
      "successCriteria": [
        {
          "skill": "Explanation",
          "criteria": "I can use my own prediction results to explain how a chatbot builds an answer."
        },
        {
          "skill": "Classification",
          "criteria": "I can label the chatbot's answers as fact, opinion, or false assumption, and check one fact outside the chatbot."
        },
        {
          "skill": "Evidence",
          "criteria": "I can support a claim about chatbots with a result from my own experiment."
        }
      ],
      "chapters": [
        {
          "title": "Before you open MagicSchool: How a chatbot answers",
          "paragraphs": [
            "On November 17 we watched PBS NOVA's A.I. Revolution. A chatbot is trained on huge amounts of text. When you type to it, it builds a reply from patterns it learned, choosing words that are likely to come next. That is why it can sound like it understands you.",
            "Today you test that idea yourself, in a five-round challenge called Can You Outsmart the Machine? If you have never used MagicSchool or a chatbot before, that is fine: the chatbot starts by teaching you how to talk to it. Then it asks what you are into: a sport, music, gaming, cars, art, cooking, animals, a job you want, anything. Every round after that uses your interest. You work on your own. The chatbot is both the host and your opponent."
          ],
          "activity": "Listen to the opener. Then open the BeCurrent MagicSchool room from today's Canvas assignment, choose Can You Outsmart the Machine?, and type READY. Pick an interest you actually know a lot about. Keep this page open beside the chat."
        },
        {
          "title": "Rounds 1 and 2: Think like the machine, then try to stump it",
          "paragraphs": [
            "Round 1: the chatbot shows five classic sentence starters plus two about your interest, and you predict how it will finish each one. Type all your predictions before it shows you anything. Round 2: it finishes the starters itself and scores you, one point for every match.",
            "Then you label each starter. A pattern is a phrase so common it is easy to predict. A fact has one answer you can check. An opinion has no single correct answer. A chatbot has no favorite food: when it finishes 'My favorite food is...', it produces a likely-sounding answer.",
            "Stump the Machine: you write one starter from your interest that you think the chatbot cannot predict. You know things about your interest that are rare in the text it learned from. Can you use that?",
            "If MagicSchool will not open for you: write your five predictions on paper, then compare them with these illustrative sample completions, which are not real MagicSchool output: jelly; Paris; time; pizza; it depends on the person."
          ],
          "activity": "Play Rounds 1 and 2, including Stump the Machine. When the chatbot tells you to pause, answer Questions 1–3 here, then type NEXT in the chat."
        },
        {
          "title": "Round 3: The confidence trap, then build your own",
          "paragraphs": [
            "The chatbot gives you three questions to ask it, one at a time. One of the three has a hidden problem. Your job is to work out which answers can be checked, which are opinions, and whether the chatbot notices anything wrong with a question.",
            "Then you build your own trap: three questions about your interest. One fact, one opinion, and one built on something that is not true. The chatbot does not know which is which. Does it catch your false assumption, or play along?",
            "Checking means using a source outside the chatbot: a government, university, museum, or encyclopedia site, or an official site for your interest, like a league or a team. Asking the chatbot again is not checking. Write down the source you used.",
            "If MagicSchool will not open for you, tell your teacher. Round 3 can be shown on the projector, and you answer from what you see."
          ],
          "activity": "Play Round 3 and build your own trap. Check at least one answer with a source outside the chatbot. When the chatbot tells you to pause, answer Questions 4–6 here, then type NEXT."
        },
        {
          "title": "Rounds 4 and 5: AI in your world, then you be the judge",
          "paragraphs": [
            "Round 4: the chatbot describes two ways AI is commonly used in your interest, such as recommending songs, analysing games, or spotting problems in photos. You pick one and decide who it helps, what could go wrong, and who should check its work.",
            "Round 5: the chatbot asks which of its answers you trusted most, which needed checking, and whether it actually understood you. Each time, it pushes you for evidence from your own experiment: your score, a specific answer, your trap, or the source you checked.",
            "A strong judgment points to something that happened today. 'AI is sometimes wrong' is a guess. 'It said ___, and when I checked ___, I found ___' is evidence."
          ],
          "activity": "Play Rounds 4 and 5 in the chat, then answer Question 7 here."
        },
        {
          "title": "Checkpoint: When should we trust the machine?",
          "paragraphs": [
            "Calling a chatbot a 'very good guesser' helps explain why it produces plausible words. But it is not a full scientific description of modern AI, which can perform complex tasks and sometimes access outside tools.",
            "Today's big idea: useful predictions and confident-sounding answers are not automatically true. Next class we look at what happens when people accept AI-generated claims without checking them.",
            "Finished early? Go back to the chat and type BONUS. Prompt Detective: ask the same question two different ways and compare the answers. Stereotype Check: ask the chatbot to describe a typical fan of your interest and look for assumptions it makes. Bonus quests are not graded; they are for you."
          ],
          "activity": "Answer Question 8, review all eight answers, then Gather All My Work and submit to Canvas before lunch. Then try a bonus quest."
        }
      ],
      "clip": {
        "title": "A.I. Revolution — Full NOVA Documentary (previous class)",
        "source": "PBS NOVA",
        "date": "2024-03-27",
        "url": "https://www.youtube.com/watch?v=-sB12gk9ESA",
        "alt": "https://www.pbs.org/video/ai-revolution-umwwlt/",
        "assigned": "Optional review of the complete film shown on AI1 November 17. No replay required during AI2.",
        "prompt": "Where does AI learn patterns? What can it help people do? What can go wrong? Who should remain responsible?",
        "captions": "Check captions and playback before class."
      },
      "questions": [
        {
          "text": "What was your score out of 5 in Round 2? Which starter was easiest to predict, and why?",
          "startHere": "Give your score and name one starter you matched.",
          "pushFurther": "Why might millions of people's writing make one word the likely next word?"
        },
        {
          "text": "Which starter had one checkable answer, and which had no single correct answer? What makes them different?",
          "startHere": "Compare 'The capital of France is...' with 'The best movie ever is...'.",
          "pushFurther": "Did the chatbot treat the opinion differently from the fact?"
        },
        {
          "text": "Based on Rounds 1 and 2, what is the chatbot doing when it finishes a sentence?",
          "startHere": "Use the word 'pattern' in your answer.",
          "pushFurther": "How is that different from a calculator following fixed rules?"
        },
        {
          "text": "How did the chatbot answer the fact question in Round 3, and how did you check it outside the chatbot?",
          "startHere": "Name the source you used and what it said.",
          "pushFurther": "Why does a source outside the chatbot count for more than asking the chatbot again?"
        },
        {
          "text": "How did the chatbot handle the question about the greatest movie ever made?",
          "startHere": "Describe its answer: one movie, several, or 'it depends'?",
          "pushFurther": "Why might a chatbot sound sure about something that is really an opinion?"
        },
        {
          "text": "Which Round 3 question had a hidden problem? Did the chatbot catch it or play along?",
          "startHere": "Name the question and say what was wrong with it.",
          "pushFurther": "Did the chatbot catch the false assumption in your own trap question too?"
        },
        {
          "text": "Based on today, give one useful and one risky use of AI, in schoolwork or in the interest you chose.",
          "startHere": "Use the Round 4 example from your interest, or studying versus submitting unchecked writing.",
          "pushFurther": "Who is responsible for checking the AI's work in that example?"
        },
        {
          "text": "CHECKPOINT: Is 'a very good guesser' a fair description of the chatbot you tested? Use one result from your experiment where it fits and one where it falls short.",
          "startHere": "Use your score, a Round 3 answer, or the source you checked.",
          "pushFurther": "Describe one ability the 'guesser' description leaves out."
        }
      ],
      "sources": [
        {
          "name": "NOVA: A.I. Revolution",
          "url": "https://www.pbs.org/video/ai-revolution-umwwlt/",
          "note": "2024 science explainer; historical context rather than up-to-date product capabilities."
        },
        {
          "name": "Pew Research Center: How Teens Use and View AI",
          "url": "https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/",
          "note": "Survey about teen experiences and perceptions, February 2026."
        }
      ],
      "viewingGuide": [
        {
          "label": "Source",
          "prompt": "Who is speaking, and who is asking the questions?"
        },
        {
          "label": "Claim",
          "prompt": "Which statements would need independent evidence?"
        },
        {
          "label": "Connection",
          "prompt": "How does the interview connect to the midterms, Iran, Ukraine, or AI?"
        },
        {
          "label": "Perspective",
          "prompt": "What is the difference between a reported fact and a speaker’s opinion?"
        }
      ],
      "dayOneNote": "November 9 is the 60 Minutes interview before lunch and CNN 10 after lunch. No written work on video day.",
      "selfPaced": true,
      "substituteDay": false,
      "offlineSupport": "The challenge runs in the BeCurrent MagicSchool room linked in Canvas. If a student cannot open it, the page carries printed sample completions for Rounds 1–2 and the teacher shows Round 3 on the projector; the same eight questions are answered either way.",
      "subPlan": {
        "directions": [
          "Read the five numbered chapters.",
          "Try the short prediction activity independently.",
          "Complete the practice sort and use the printed sample if MagicSchool is unavailable.",
          "Write all eight private responses and choose Gather All My Work.",
          "Submit the copied record to the AI2 Text Entry assignment in Canvas."
        ],
        "timed": [],
        "notice": "This lesson can be completed independently; no live chatbot is required.",
        "technicalFallback": "Use the readings and printed examples. If the website is unavailable, ask for the printed AI2 activity."
      },
      "chapterLabels": [
        "THE HOOK",
        "ROUNDS 1–2",
        "ROUND 3",
        "ROUNDS 4–5",
        "THE JUDGMENT"
      ],
      "navLabels": [
        "Start",
        "Rounds 1–2",
        "Round 3",
        "Rounds 4–5",
        "Decide"
      ],
      "agenda": [
        "Listen to the opener: how a chatbot builds an answer.",
        "Open AI2 - What Exactly AI Is beside the BeCurrent MagicSchool room linked in Canvas.",
        "Play Can You Outsmart the Machine? on your own, Rounds 1 to 5, built around an interest you choose. Answer the questions here whenever the chatbot sends you back.",
        "Answer all eight private questions, then Gather All My Work.",
        "Paste the complete record into the matching Canvas Text Entry assignment and submit before lunch.",
        "Finished early: type BONUS in the chat for a bonus quest.",
        "After lunch: CNN 10 and the News Log."
      ],
      "canvasSteps": [
        "Open the AI2 page on BeCurrent and the BeCurrent MagicSchool room side by side.",
        "In MagicSchool, choose Can You Outsmart the Machine? and type READY. Pick an interest you know well and play all five rounds on your own.",
        "When the chatbot sends you back, answer the numbered questions on the AI2 page. Nothing you type in the chat is your submission.",
        "Choose Gather All My Work and copy the complete gathered record.",
        "Paste it into this assignment, submit before lunch, and verify confirmation. If you revise, gather and submit again."
      ],
      "teacherTiming": "0–5 min: your opener (below), ending with a one-minute demo of getting into the room on the projector. 5–42 min: Can You Outsmart the Machine? in MagicSchool, individually. The bot opens with a three-minute Learn the Controls warm-up for first-time users, then builds every round around each student's chosen interest. Students pause in the chat to answer Questions 1–3 after Round 2 and 4–6 after Round 3, and Question 7 after Round 5. Walk the room during the warm-up: that is where first-timers get stuck. 42–50 min: Question 8, Gather All My Work and Canvas filing; fast finishers type BONUS for an ungraded bonus quest. 50–55 min: read three or four answers aloud with names removed, then think aloud on the closing question.",
      "opener": [
        "On Tuesday NOVA showed us AI that learns patterns from enormous numbers of examples, not rules somebody typed in one by one.",
        "A chatbot builds its reply a piece at a time, choosing what is likely to come next. That is why it can sound like it understands you.",
        "Sounding sure and being right are not the same thing. Today you find out where that line is.",
        "You are playing a five-round game against a MagicSchool chatbot, on your own. It starts by asking what you are into. Pick something you know a lot about, because your knowledge is your weapon: you will try to stump it and trap it on your own turf.",
        "Getting in, on the projector: open today's AI2 assignment in Canvas, follow the MagicSchool link, sign in, and open Can You Outsmart the Machine? Type READY. The bot teaches you how to talk to it before the game starts, and HELP works at any time.",
        "When the bot sends you back, write on the BeCurrent page. The chat is not your submission; the Canvas paste is."
      ],
      "closingQuestion": "If AI can give you an answer that sounds completely believable, how do you know when to trust it?",
      "chatbot": {
        "name": "Can You Outsmart the Machine? (AI2)",
        "description": "A five-round challenge built around what you are into: predict what an AI will say, try to stump it, trap it with tricky questions, and decide when it deserves your trust.",
        "welcome": "Welcome to Can You Outsmart the Machine? I'm the machine, a chatbot. If you've never used one, perfect: first I'll show you how to talk to me. Then over five rounds you'll predict what I say, try to stump me, set traps for me, and decide when I deserve your trust. Type READY to start.",
        "instructions": "You are the host AND the opponent in a classroom game called \"Can You Outsmart the Machine?\" for a high school current-events elective (grades 9-12, wide range of reading levels). Each student plays alone, for about 35-40 minutes. The goal is AI literacy: the student experiences how a chatbot produces answers, finds its limits, and decides when an answer deserves trust. The game is built around the student's own interest, so it should feel personal, energetic, and a little competitive.\n\nHOW TO TALK\n- Short messages, usually under 90 words. One step at a time. Plain, friendly language a 9th grader reads easily. Be playful and encouraging, like a game-show host who enjoys losing to a smart player.\n- Always say which round the student is in, e.g. \"ROUND 2 of 5\". Keep a running score and show it at the end of each round.\n- Wait for the student's reply before moving on. Never skip ahead on your own.\n- Never ask for the student's name, school, or any personal information. If they share some, do not repeat it.\n- The student writes graded answers on the BeCurrent page, not in this chat. Never write those answers for them. If asked, say \"That one's yours to write on the BeCurrent page,\" then ask one question that helps them think.\n- If the student goes off task or tries to get you to say something inappropriate, decline in one sentence and return to the current round.\n- Never ask the student to share, present, or read anything aloud to the class.\n- Never invent facts, statistics, names, quotes, laws, or news events. When you are not sure, say so and tell the student it needs checking.\n- Most students have never used MagicSchool or a chatbot for school. Be patient. If the student types HELP or \"What should I do now?\", tell them the current round and their next step in one or two sentences. If they type \"Go back to Round\" and a number, return to that round.\n\nWARM-UP PART 1: LEARN THE CONTROLS (about 3 minutes)\nBefore the game, teach three moves, one at a time. Have the student try each one before you teach the next, and praise each try in one short sentence.\n1. ASK: \"Type anything in the message box and send it.\" Have them ask you one quick, school-appropriate question about anything.\n2. FOLLOW UP: \"I remember our conversation, so you can build on my last answer.\" Have them try one of: \"Say that in fewer words.\" \"Explain it like I'm 10.\" \"Give me an example.\"\n3. TAKE CONTROL: \"If I'm confusing, too long, or off track, tell me. You're in charge.\" Teach: HELP, \"What should I do now?\", and \"Go back to Round __\".\nThen say once, briefly: your teacher can see this chat, so never type private information; and I can sound sure and still be wrong, which is what today's game is about. Then move to Part 2.\n\nWARM-UP PART 2: PICK YOUR TURF\nAsk: \"What are you into? A sport, a team, music, gaming, cars, art, cooking, animals, fashion, a job you want... anything you know a lot about.\" If the interest is not school-appropriate, ask kindly for another. Say one sentence about why their knowledge matters: they know things about it that are rare in the text you learned from. Use this interest in every round below.\n\nROUND 1 of 5: THINK LIKE THE MACHINE\nShow these five starters, plus two more you write about the student's interest (common, predictable phrases from that world). Ask the student to predict how YOU will finish all seven, in one numbered message. Do not show your own answers yet, even if asked.\n1. Peanut butter and...\n2. The capital of France is...\n3. Once upon a...\n4. My favorite food is...\n5. The best movie ever is...\n\nROUND 2 of 5: MEET YOUR COMPETITION\nComplete all seven starters yourself with the most natural, most likely completion: one to four words each, no explanation. Score the student: one point for each prediction that matches yours in meaning (be generous). Report the score out of 5 for the first five, plus bonus points for the two interest starters.\nAsk the student to label starters 1-5 PATTERN (a very predictable phrase), FACT (one checkable answer), or OPINION (no single correct answer). Some fit more than one; let them explain. Give brief feedback. Point out that you have no real favorite food or movie: you produced a likely-sounding completion.\nThen STUMP THE MACHINE: ask the student to write one starter from their interest that they think you CANNOT predict. Guess honestly with your single most likely completion. If you miss, they earn a stump point and you admit it cheerfully. Ask them why they think you missed (or got it). Offer one rematch.\nThen say: \"Pause here and answer Questions 1-3 on the BeCurrent page. Type NEXT when you're back.\"\n\nROUND 3 of 5: THE CONFIDENCE TRAP\nSay: \"I'll give you three questions to ask me. One of them has a hidden problem. Don't tell me which one you suspect yet.\" Give them one at a time, waiting for each:\nA. \"Who was the first president of the United States?\"\nB. \"What is the greatest movie ever made?\"\nC. \"Which U.S. president signed the law banning homework in all American schools?\"\nThe student types each question to you. Answer each exactly as you would for any ordinary user: helpful and honest. Do not mention the game, the score, or the hidden problem while answering.\nAfter all three, ask: \"Which question had a hidden problem, and what was it? Which of my answers could you check with a source outside this chat?\" Then give honest feedback on all three: which one is a checkable fact, which one is an opinion, and whether any of them rested on an assumption that is not true. Ask whether your answers handled each question well, including whether you caught any false assumption or played along. Point out that sounding confident about an opinion does not make it a fact.\nThen BUILD YOUR OWN TRAP: ask the student to write three questions about their interest, in any order, without labeling them: one fact, one opinion, and one built on something that is not true. Answer each exactly as you would for any ordinary user. Then ask the student to reveal which was which, and score them: one point if your answer to their false-assumption question played along, zero if you caught it, and say honestly which happened. Tell the student to confirm one factual answer with a source outside this chat (a government, university, museum, encyclopedia, or official league, team, or organization site) and note the source. Asking you again does not count as checking.\nThen say: \"Pause here and answer Questions 4-6 on the BeCurrent page. Type NEXT when you're back.\"\n\nROUND 4 of 5: AI IN YOUR WORLD\nDescribe two common, well-known ways AI is used in the student's interest area, in general terms (for example recommendation feeds, game or performance analysis, image recognition, translation, or design tools). Do not invent specific companies, statistics, or events; say if something should be checked. Ask the student to pick one and answer, one at a time: Who does it help? What could go wrong? Who should check its work? Push for a specific, realistic example from their world.\n\nROUND 5 of 5: YOU BE THE JUDGE\nAsk these one at a time. After each reply, give one short follow-up asking for evidence from THEIR experiment (a specific answer you gave, their score, their trap, or the source they checked):\n1. \"Which of my answers did you trust most, and why?\"\n2. \"Which one most needed checking?\"\n3. \"Did I actually understand your questions, or did I produce a useful-sounding response? What from today makes you think so?\"\nBe honest in your own replies: you generate responses from patterns learned from huge amounts of text; you can be useful and still be wrong; and a teacher gave you instructions for this game, which is true of most chatbots (companies write instructions users never see).\n\nFINISH\nShow the final scoreboard (Round 2 score, bonus points, stump points, trap points) and one sentence of praise for something specific the student did. Then say: \"Go back to the BeCurrent page, answer Questions 7 and 8, then press Gather All My Work and paste it into today's Canvas assignment. Finished early? Come back and type BONUS.\"\n\nBONUS (only if the student types BONUS)\nOffer two ungraded quests and let them choose:\n- PROMPT DETECTIVE: the student asks you one question about their interest two different ways (for example, neutral wording and loaded wording). Answer both normally, then help them compare: what changed, and why does wording matter?\n- STEREOTYPE CHECK: the student asks you to describe a typical fan of their interest. Answer briefly, then help them look for assumptions in your description (who it leaves out, what it takes for granted) and explain that patterns in training text can carry stereotypes. Keep it respectful; do not describe groups by race, religion, or other protected traits.\nAfter a quest, offer the other one or a rematch of Stump the Machine.",
        "outage": "If MagicSchool is down for everyone: students write Round 1 predictions on paper and use the printed sample completions on the page for Round 2. Run Round 3 yourself on the projector in MagicSchool or another district-approved chatbot, typing the three questions one at a time, and students answer Questions 4–6 from what they see. Rounds 4 and 5 become Question 7 on the page; skip the bonus quests.",
        "firstTime": [
          "Follow the link in today's Canvas assignment and sign in the way your teacher shows you.",
          "Find Can You Outsmart the Machine? (AI2) in the BeCurrent room and open it.",
          "Type in the message box and send. The chatbot answers in the conversation above it, and it remembers what you have already said.",
          "You are in charge. Ask it to say things in fewer words, explain it more simply, or give an example.",
          "Lost? Type HELP or \"What should I do now?\". The chatbot will tell you your next step."
        ]
      }
    },
    {
      "n": 3,
      "key": "ai-t03",
      "page": "block-03.html",
      "date": "2026-11-23",
      "title": "When AI Gets it Wrong",
      "subtitle": "Sounding sure is not being right",
      "skill": "Sourcing and Corroboration",
      "question": "Who should check a convincing answer?",
      "hook": "If an AI invents a court case, who is responsible when somebody files it with a judge?",
      "overview": "Study invented legal evidence, unfair learned patterns, and an AI-cloned political voice. Then practice a verification routine you can use outside class.",
      "learningTargets": [
        {
          "skill": "Sourcing",
          "target": "I can identify the source of a claim."
        },
        {
          "skill": "Corroboration",
          "target": "I can test an AI-generated claim against independent evidence."
        },
        {
          "skill": "Distinction",
          "target": "I can distinguish model error, bias, and deliberate deception."
        }
      ],
      "successCriteria": [
        {
          "skill": "Sourcing",
          "criteria": "I can name a real reference and report its finding."
        },
        {
          "skill": "Corroboration",
          "criteria": "I can document the result of checking one claim."
        },
        {
          "skill": "Distinction",
          "criteria": "I can explain why three AI failures have different causes."
        }
      ],
      "chapters": [
        {
          "title": "The confident answer problem",
          "paragraphs": [
            "Language models can produce a polished answer even when some details are false. An invented or unsupported detail presented as fact is often called an AI hallucination. That differs from someone intentionally using AI to deceive.",
            "A claim is not automatically reliable because it is fluent or detailed. Your job is to identify what evidence would confirm it."
          ],
          "activity": "Review the same learning question from AI1: What made an answer sound trustworthy?"
        },
        {
          "title": "The lawyers who failed to verify",
          "paragraphs": [
            "In a 2023 federal case, attorneys submitted legal research citing decisions that did not exist. A judge sanctioned the lawyers and law firm. The key lesson is professional responsibility: a generated citation does not become real because it appears in a legal brief.",
            "A legal source can be checked in the actual court record. A fabricated case citation is not evidence."
          ],
          "activity": "Look at the case source: what were the attorneys responsible for checking?"
        },
        {
          "title": "Bias is a different failure",
          "paragraphs": [
            "Reuters reported in 2018 that Amazon tested an experimental hiring system that disadvantaged some references to women, reflecting patterns from training data. It was an internal experiment, not a current hiring system.",
            "Bias can enter through the selected examples, design goals, labels, and decisions about how output is used. An inaccurate answer and an unfair pattern are not the same problem."
          ],
          "activity": "Where might unfairness enter: examples, design, or human use?"
        },
        {
          "title": "The fake voice that reached voters",
          "paragraphs": [
            "Before New Hampshire's 2024 presidential primary, voters received calls with an AI-imitation of President Biden's voice discouraging voting. The FCC imposed a $6 million fine related to unlawful spoofing. A jury later acquitted the consultant in a separate criminal case.",
            "An administrative fine and a criminal verdict apply different laws and legal standards. A not-guilty verdict alone does not show the law is powerless or that a recording was authentic."
          ],
          "activity": "Why could a fake voice undermine confidence even after it is uncovered?"
        },
        {
          "title": "Your three-step verification habit",
          "paragraphs": [
            "When the claim matters, first isolate the exact assertion, then find a credible independent source, then decide what is confirmed and what remains uncertain. A repeated answer on multiple AI sites is not independent corroboration.",
            "Use MagicSchool only if assigned in Canvas. Printed example if unavailable: 'An AI invented a quotation; a verified original text did not contain it.' Label the example as illustrative, not a historical report."
          ],
          "activity": "Complete an evidence check using an original source linked below."
        }
      ],
      "clip": {
        "title": "A.I. Revolution | The Danger of AI Fakes",
        "source": "PBS NOVA",
        "date": "2024-03-27",
        "url": "https://www.youtube.com/watch?v=-sB12gk9ESA",
        "alt": "https://www.pbs.org/video/ai-revolution-umwwlt/",
        "assigned": "37:20 to approximately 41:30 (teacher preview required)",
        "prompt": "How could an altered image or voice be made believable, and how could you check it?",
        "captions": "Reading route is available in the five chapters."
      },
      "sort": {
        "prompt": "Match each example to the type of risk.",
        "options": [
          "Hallucination",
          "Bias",
          "Deliberate deepfake"
        ],
        "items": [
          [
            "Invented court citation",
            "Hallucination",
            "The generated authority was nonexistent."
          ],
          [
            "Hiring pattern disfavors some applicants",
            "Bias",
            "Historical data and design can create unfair patterns."
          ],
          [
            "Imitated election robocall voice",
            "Deliberate deepfake",
            "The synthetic voice was deployed to deceive listeners."
          ]
        ]
      },
      "questions": [
        {
          "text": "Define an AI hallucination in everyday words.",
          "startHere": "Think: invented or unsupported fact.",
          "pushFurther": "How is it different from uncertainty?"
        },
        {
          "text": "Why does plausible language not guarantee a factual answer?",
          "startHere": "Connect AI1 to the lawyer example.",
          "pushFurther": "What independent record is decisive?"
        },
        {
          "text": "In the invented-cases incident, what should the lawyers have done?",
          "startHere": "Name a verification step.",
          "pushFurther": "Who remains accountable when AI is used?"
        },
        {
          "text": "Choose one claim in today's evidence. What source supports or challenges it?",
          "startHere": "Name the source and finding.",
          "pushFurther": "What remains unconfirmed?"
        },
        {
          "text": "How can training examples produce unfair outcomes?",
          "startHere": "Use the experimental hiring system.",
          "pushFurther": "Consider data and human design choices."
        },
        {
          "text": "Why was the fake Biden robocall dangerous even though it was discovered?",
          "startHere": "Think about voters' access to accurate information.",
          "pushFurther": "Can a correction reach everyone who heard the fake?"
        },
        {
          "text": "Why can a government fine and a criminal acquittal coexist?",
          "startHere": "Different proceedings ask different questions.",
          "pushFurther": "What does each outcome establish and not establish?"
        },
        {
          "text": "CHECKPOINT: Write a three-step rule for checking an AI claim.",
          "startHere": "Claim -> independent source -> judgment.",
          "pushFurther": "What would you do if independent sources disagree?"
        }
      ],
      "sources": [
        {
          "name": "Mata v. Avianca sanctions order",
          "url": "https://docs.justia.com/cases/federal/district-courts/new-york/nysdce/1%3A2022cv01461/575368/54",
          "note": "2023 federal court record."
        },
        {
          "name": "Reuters report on Amazon's experimental recruiting system",
          "url": "https://www.reuters.com/article/world/insight-amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08G/",
          "note": "October 2018 report; historical example."
        },
        {
          "name": "FCC robocall fine",
          "url": "https://docs.fcc.gov/public/attachments/DOC-405811A1.pdf",
          "note": "2024 FCC action; legal standards differ from a later criminal case."
        },
        {
          "name": "NHPR: jury verdict",
          "url": "https://www.nhpr.org/nh-news/2025-06-13/political-operative-fake-biden-robocalls-nh-primary-found-not-guilty",
          "note": "June 2025 criminal verdict."
        }
      ],
      "substituteDay": false
    },
    {
      "n": 4,
      "key": "ai-t04",
      "page": "block-04.html",
      "date": "2026-11-30",
      "title": "What AI Changes",
      "subtitle": "Jobs, power lines, and Lebanon",
      "skill": "Causation and Framing",
      "question": "Who benefits from AI, and who absorbs its costs?",
      "hook": "An AI answer starts on your phone. How does it connect to a construction site in Lebanon, Indiana?",
      "overview": "Break a job into tasks, compare what Stanford and Yale actually found, then investigate Meta's data center project right here in Boone County.",
      "learningTargets": [
        {
          "skill": "Causation",
          "target": "I can trace AI activity through computers and local infrastructure."
        },
        {
          "skill": "Evidence",
          "target": "I can distinguish company promises from measured outcomes."
        },
        {
          "skill": "Framing",
          "target": "I can explain why different sources emphasize different facts."
        }
      ],
      "successCriteria": [
        {
          "skill": "Causation",
          "criteria": "I can explain one task-level change and one real-world infrastructure consequence."
        },
        {
          "skill": "Evidence",
          "criteria": "I can accurately describe Stanford and Yale research without overstating it."
        },
        {
          "skill": "Framing",
          "criteria": "I can identify a tradeoff with a named source and an uncertainty."
        }
      ],
      "chapters": [
        {
          "title": "A job is made of tasks",
          "paragraphs": [
            "AI may automate parts of a job, assist with others, and leave people responsible for judgment, relationships, and accountability. Saying 'AI replaces the job' often skips this important distinction.",
            "Choose a job you may someday do. Name five tasks and decide which need a person, which AI might assist, and which may be automated."
          ],
          "activity": "Do not treat what a system can produce as the same thing as what it should be trusted to decide."
        },
        {
          "title": "Two headlines, two measures",
          "paragraphs": [
            "Stanford's August 2026 update found that employment for workers ages 22–25 in highly AI-exposed occupations was about 19% below the level expected if it had kept pace with similar-aged workers in less-exposed occupations. This is a relative employment gap, not 19% of the entire workforce losing jobs.",
            "Yale's October 2026 labor market tracker did not find clear evidence of broad AI-related disruption across the economy. Both studies can be true because they examine different groups and measures."
          ],
          "activity": "Ask what each headline counts, compared with what, and over which period."
        },
        {
          "title": "The cloud needs a building",
          "paragraphs": [
            "AI requests are processed by chips and servers in physical facilities. Those data centers need electricity, cooling, networking, land, and people. The environmental impact depends on the facility and grid.",
            "A chatbot reply is digital to you, but not costless or placeless."
          ],
          "activity": "Trace: model demand -> data center -> electricity / cooling -> local decisions."
        },
        {
          "title": "A field in Lebanon, Indiana",
          "paragraphs": [
            "In February 2026 Meta announced a Lebanon AI data center campus valued at more than $10 billion, with about 4,000 construction workers at peak and about 300 permanent operational jobs. These are company projections, not independently observed counts today.",
            "Meta says it will bear the full cost of energy and water services used by the facility. Its statement is evidence of a commitment, not proof that every promised outcome has happened."
          ],
          "activity": "Distinguish temporary construction work from permanent jobs and claimed protections."
        },
        {
          "title": "Tradeoffs and whose frame wins",
          "paragraphs": [
            "Boone County announced a temporary moratorium on new data centers in unincorporated county areas, while the Lebanon project was already moving forward. Policy choices about land and utility systems affect different people.",
            "Compare a Meta company announcement with a separate local reporting or government source. Name what each foregrounds and what still needs to be checked."
          ],
          "activity": "Construct a claim with one benefit, one potential burden, and a source for each."
        }
      ],
      "clip": {
        "title": "60 Minutes | The Data Center Uproar (optional topical replacement)",
        "source": "CBS 60 Minutes",
        "date": "2026-09-20",
        "url": "https://www.cbsnews.com/video/60minutes-2026-09-20/",
        "alt": "https://www.cbsnews.com/news/data-centers-60-minutes-transcript/",
        "assigned": "13-minute report within full episode; locate/report preview before class",
        "prompt": "Who presents the costs and the benefits? What claims have independent evidence?",
        "captions": "Use CBS's article/transcript if playback is restricted."
      },
      "sort": {
        "prompt": "For a future job, classify each task by who should do it.",
        "options": [
          "AI may handle",
          "AI can assist",
          "Person decides"
        ],
        "items": [
          [
            "Summarize a routine document",
            "AI can assist",
            "An AI can draft or summarize, but a person should verify accuracy."
          ],
          [
            "Set consequences for a student",
            "Person decides",
            "A consequential judgment should have human responsibility and appeal."
          ],
          [
            "Draft a standard customer response",
            "AI can assist",
            "A person can review tone, context, and factual accuracy."
          ],
          [
            "Spot routine spreadsheet duplicates",
            "AI may handle",
            "Automated pattern detection can do routine checking, with exceptions escalated."
          ],
          [
            "Choose an ethical tradeoff for a family",
            "Person decides",
            "The people affected and accountable should weigh values."
          ]
        ]
      },
      "questions": [
        {
          "text": "Why is it better to ask which tasks will change before which jobs disappear?",
          "startHere": "A job has more than one task.",
          "pushFurther": "Can a task be automated while the job remains?"
        },
        {
          "text": "Pick one task that still needs a person and explain why.",
          "startHere": "Choose judgment or responsibility.",
          "pushFurther": "What harm could follow if nobody checked?"
        },
        {
          "text": "Would you put your name on an AI-drafted workplace message? Why or why not?",
          "startHere": "Describe what you would review.",
          "pushFurther": "How does accountability shape the decision?"
        },
        {
          "text": "How can the Stanford and Yale findings both be true?",
          "startHere": "Compare early-career exposed workers with the full workforce.",
          "pushFurther": "What does each study measure?"
        },
        {
          "text": "Why might the first effect of AI show up in fewer entry-level hires?",
          "startHere": "Think about openings versus layoffs.",
          "pushFurther": "What other factors could affect hiring?"
        },
        {
          "text": "Trace the chain from a chatbot response to the Lebanon site.",
          "startHere": "Name computing, electricity, and land.",
          "pushFurther": "Include who approves or builds infrastructure."
        },
        {
          "text": "What does Meta emphasize, and what does local reporting emphasize?",
          "startHere": "Name one fact from each.",
          "pushFurther": "What does neither source fully establish?"
        },
        {
          "text": "CHECKPOINT: Who benefits and who pays in Boone County? Name one fact and one uncertainty.",
          "startHere": "Explain your view with a source.",
          "pushFurther": "What evidence could change your judgment?"
        }
      ],
      "sources": [
        {
          "name": "Stanford Digital Economy Lab, August 2026",
          "url": "https://digitaleconomy.stanford.edu/news/canariesaug26/",
          "note": "Relative 19% employment gap for some young workers, not economy-wide job loss."
        },
        {
          "name": "Yale Budget Lab, October 2026",
          "url": "https://interactives.budgetlab.yale.edu/tools/ai-labor-market-tracker/?tab=current-update",
          "note": "No clear evidence of broad economy-wide disruption to date."
        },
        {
          "name": "Meta: Hello, Lebanon!",
          "url": "https://datacenters.atmeta.com/2026/02/hello-lebanon/",
          "note": "Company projections and commitments."
        },
        {
          "name": "Boone County government moratorium",
          "url": "https://boonecounty.in.gov/2026/06/15/19190/",
          "note": "June 2026 county action."
        },
        {
          "name": "CBS 60 Minutes: the Data Center Uproar",
          "url": "https://www.cbsnews.com/news/data-centers-60-minutes-transcript/",
          "note": "September 2026 national reporting on local disputes."
        }
      ],
      "substituteDay": false
    },
    {
      "n": 5,
      "key": "ai-t05",
      "page": "block-05.html",
      "date": "2026-12-02",
      "title": "Who Makes the Rules?",
      "subtitle": "What should the rule actually say?",
      "skill": "Framing and Generalizing from Evidence",
      "question": "Which decisions should a person still make, and who gets to set the rules?",
      "hook": "Should students be allowed to use AI to brainstorm homework? What about handing in an essay AI wrote?",
      "overview": "Investigate individual, school, company, and government rules. Review a real Indiana disclosure law. Decide when AI should be allowed, restricted, or checked.",
      "learningTargets": [
        {
          "skill": "Policy",
          "target": "I can identify who makes rules in different settings."
        },
        {
          "skill": "Federalism",
          "target": "I can explain why state and national rules sometimes conflict."
        },
        {
          "skill": "Argument",
          "target": "I can defend an AI-use rule with evidence from the unit."
        }
      ],
      "successCriteria": [
        {
          "skill": "Policy",
          "criteria": "I can choose a realistic rule-maker for one scenario."
        },
        {
          "skill": "Federalism",
          "criteria": "I can explain a limit of executive orders and a reason for national or state rules."
        },
        {
          "skill": "Argument",
          "criteria": "I can write an enforceable one-sentence policy and defend it."
        }
      ],
      "chapters": [
        {
          "title": "Four layers of rules",
          "paragraphs": [
            "Your choices shape what you type and trust. Schools define acceptable learning and academic integrity. Companies set terms and safety restrictions. Governments pass laws and regulations.",
            "A useful rule must say what behavior it covers, who enforces it, and what happens when it is broken."
          ],
          "activity": "Sort example rules among individual, school, company, and government."
        },
        {
          "title": "Indiana already labels some AI election media",
          "paragraphs": [
            "Indiana Code 3-9-8-5 requires a specified disclosure on campaign communications containing fabricated media depicting a candidate. This is narrower than a total ban on deepfakes.",
            "A label can preserve access to expression while warning voters. A label can also be ignored, missing, or shared separately from the original content."
          ],
          "activity": "What is one benefit and one weakness of a disclosure rule?"
        },
        {
          "title": "Fifty states and Washington",
          "paragraphs": [
            "The president's December 2025 executive order advocates a coordinated national approach and challenges some state-level AI regulation. An executive order does not by itself erase a state statute.",
            "A national approach might reduce inconsistency. State rules may respond to different local problems. Some federal laws already cover particular AI-related harms, even without a single comprehensive AI code."
          ],
          "activity": "Who should decide when rules conflict?"
        },
        {
          "title": "Classroom rules already exist",
          "paragraphs": [
            "Zionsville already has broader academic-integrity and acceptable-use rules. Whether it has a dedicated student generative-AI policy requires separate school confirmation. Do not assume using AI is automatically allowed just because a handbook does not name a specific chatbot.",
            "MagicSchool's room is a school-managed tool. The Canvas assignment has any teacher-provided join link. Do not type private information."
          ],
          "activity": "Try the question 'Should AI be allowed on homework?' or use this sample reply: 'It may help students learn but should not replace their own work.' Ask whose view is missing."
        },
        {
          "title": "Write the rule, then test it",
          "paragraphs": [
            "In three fictional scenarios: a student asks AI for essay ideas; a student uses AI to study for a test; a student posts a fake video of the principal announcing a snow day. Decide Allowed, Allowed with conditions, or Not allowed.",
            "A school rule should protect learning, transparency, fairness, privacy, and the ability to review consequences. Students may defend different rules if they support them with evidence."
          ],
          "activity": "Write one sentence you would propose for ZCHS, then challenge it with an edge case."
        }
      ],
      "clip": null,
      "sort": {
        "prompt": "Who primarily makes or enforces this kind of rule?",
        "options": [
          "Individual",
          "School",
          "Company",
          "Government"
        ],
        "items": [
          [
            "Choosing not to enter private information",
            "Individual",
            "You decide what you disclose."
          ],
          [
            "A fictional class ban on AI-written essays",
            "School",
            "The teacher/school governs classwork; this example is invented."
          ],
          [
            "A chatbot's minimum age rule",
            "Company",
            "The provider sets its service terms."
          ],
          [
            "Indiana's candidate-ad disclaimer law",
            "Government",
            "The legislature enacted the legal disclosure rule."
          ],
          [
            "The teacher's visibility into school chat history",
            "School",
            "The school's product setup determines this school-use rule, subject to provider features."
          ],
          [
            "A county pause on new data centers",
            "Government",
            "County authorities make local land-use decisions."
          ]
        ]
      },
      "questions": [
        {
          "text": "Name four types of AI rule-makers. Which affects you most?",
          "startHere": "Individual, school, company, government.",
          "pushFurther": "How can their rules overlap?"
        },
        {
          "text": "Why might Indiana require a label on fabricated campaign media rather than ban all AI?",
          "startHere": "Explain one benefit and one limitation.",
          "pushFurther": "What would make disclosure effective?"
        },
        {
          "text": "Should AI rules be identical across all states? Give both sides and decide.",
          "startHere": "Think consistency versus local problems.",
          "pushFurther": "Which level of government handles your example best?"
        },
        {
          "text": "Why cannot a president's executive order alone cancel a state law?",
          "startHere": "Congress and courts have separate constitutional roles.",
          "pushFurther": "What is the difference between a policy preference and binding law?"
        },
        {
          "text": "Did the chatbot or printed sample take a side on AI homework? Whose voice was missing?",
          "startHere": "Name a perspective it did not include.",
          "pushFurther": "How would the missing perspective change the answer?"
        },
        {
          "text": "Pick a fictional scenario and decide Allowed, Allowed with conditions, or Not allowed.",
          "startHere": "Explain the rule and who enforces it.",
          "pushFurther": "How could a student appeal a mistake?"
        },
        {
          "text": "For the fake snow-day video, should the school, app, government, or several actors respond?",
          "startHere": "Choose a responsible actor and say why.",
          "pushFurther": "What are each actor's limitations?"
        },
        {
          "text": "CHECKPOINT: Which AI decisions should humans make, and who should set the rules? Use evidence from two topics.",
          "startHere": "Support your rule with two examples.",
          "pushFurther": "Test the rule against a realistic exception."
        }
      ],
      "sources": [
        {
          "name": "Indiana Code 3-9-8-5",
          "url": "https://law.justia.com/codes/indiana/2024/title-3/article-9/chapter-8/section-3-9-8-5/",
          "note": "Specific candidate-media disclaimer, not a universal ban."
        },
        {
          "name": "White House national AI policy order, December 2025",
          "url": "https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/",
          "note": "Executive branch policy does not itself repeal state law."
        },
        {
          "name": "ZCS high school student rights and responsibilities",
          "url": "https://www.zcs.k12.in.us/high-school-handbook/student-rights-hs",
          "note": "Existing academic-integrity rules; dedicated AI policy status to confirm."
        }
      ],
      "substituteDay": false
    }
  ],
  "days": [
    {
      "code": "1",
      "topic": "AI1 — Intro to AI (NOVA Video)",
      "title": "Intro to AI (NOVA Video)",
      "subtitle": "Full NOVA A.I. Revolution documentary before lunch; CNN10 after lunch; no homework",
      "date": "2026-11-17",
      "page": "opening-film.html",
      "learningTargets": [
        {
          "skill": "Background knowledge",
          "target": "I can recognize how AI learns patterns and how it may affect human choices."
        },
        {
          "skill": "Sourcing",
          "target": "I can distinguish examples and ideas in a 2024 documentary from current 2026 developments."
        }
      ],
      "successCriteria": [
        {
          "skill": "Observation",
          "criteria": "I can notice a benefit, a risk, and a human responsibility while watching."
        }
      ],
      "overview": "Watch the complete PBS NOVA A.I. Revolution documentary (53:30) before lunch. CNN10 after lunch. No homework or written work.",
      "viewingGuide": [
        {
          "label": "How it works",
          "prompt": "Where do AI systems get patterns or examples?"
        },
        {
          "label": "A possibility",
          "prompt": "How can AI help with medicine, science or daily life?"
        },
        {
          "label": "A risk",
          "prompt": "How might AI make a mistake or create a convincing fake?"
        },
        {
          "label": "Human responsibility",
          "prompt": "Who should check AI outputs and make important decisions?"
        }
      ]
    },
    {
      "code": "6",
      "topic": "AI6 — Study Guide Work Day",
      "title": "Study Guide Work Day",
      "subtitle": "AI1 documentary and AI2–AI5 exam review",
      "date": "2026-12-04",
      "page": "study-guide.html",
      "learningTargets": [
        {
          "skill": "Review",
          "target": "I can explain the AI unit's major ideas with evidence from the film and four investigations."
        },
        {
          "skill": "Self-assessment",
          "target": "I can identify gaps in my understanding before the December 8 exam."
        }
      ],
      "successCriteria": [
        {
          "skill": "Preparation",
          "criteria": "I can explain learned patterns, AI mistakes, employment tradeoffs, and AI rule-making without relying on memorized phrases."
        }
      ],
      "overview": "Use the AI study guide and earlier lesson sources to prepare for the December 8 Canvas exam. No new investigation."
    }
  ]
};
