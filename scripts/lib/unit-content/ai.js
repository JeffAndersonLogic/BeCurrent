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
      "hook": "On November 17, NOVA showed AI learning patterns from huge numbers of examples. Today you learn how to use AI well, then test it yourself in a five-round challenge against a MagicSchool chatbot, built around something you are into: can you predict what it will say, can you trap it, and can you tell when it deserves your trust?",
      "overview": "Learn what AI is, how to prompt it, and where the red lines are, then take on a MagicSchool chatbot in a five-round challenge, Can You Outsmart the Machine?, built around an interest you choose. Predict it, trap it with questions you write, check one answer outside the chatbot, and decide which answers deserve your trust.",
      "learningTargets": [
        {
          "skill": "Explanation",
          "target": "I can explain what a chatbot is, how it predicts, and how to prompt it well."
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
          "criteria": "I can write a strong three-part prompt and use my own results to explain how a chatbot builds an answer."
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
            "Today starts with AI Basics. If you have never used MagicSchool or a chatbot before, that is fine: the chatbot first shows you how to talk to it, asks what you are into, and then walks you through four stops (what AI is, how to write a strong prompt, good habits, and red lines) to earn your AI Driver's License. Then comes the five-round challenge, Can You Outsmart the Machine?, built around your interest. You work on your own.",
            "The prompt recipe: say WHAT you want, WHO it is for (or what you already know), and HOW you want it (how long, what format). If the answer is not right, follow up and adjust.",
            "The class rule is help, not hand-in. AI can help you brainstorm, study, quiz yourself, or understand something confusing. You write what you hand in. Never type personal information about yourself or anyone else, and never use AI to fake images, quotes, or messages about real people."
          ],
          "activity": "Listen to the opener. Then open the BeCurrent MagicSchool room from today's Canvas assignment, choose Can You Outsmart the Machine?, and type READY. Earn your AI Driver's License, then play. Keep this page open beside the chat."
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
          "activity": "Play Rounds 4 and 5 in the chat, then answer Question 7 here, using your best prompt from AI Basics."
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
          "text": "Write your best prompt from AI Basics, using all three parts of the recipe (what, who, how). Then name one red line for using AI in this class and explain why it matters.",
          "startHere": "Copy the strong prompt you wrote about your interest, then choose one red line, such as help, not hand-in.",
          "pushFurther": "How did adding the three parts change the answer you got?"
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
        "In the chatbot, learn the controls and earn your AI Driver's License: what AI is, how to prompt, good habits, red lines.",
        "Play Can You Outsmart the Machine? on your own, Rounds 1 to 5, built around an interest you choose. Answer the questions here whenever the chatbot sends you back.",
        "Answer all eight private questions, then Gather All My Work and submit in Canvas. If you run out of time, finish before next class.",
        "Finished early: type BONUS in the chat for a bonus quest.",
        "After lunch: CNN 10 and the News Log."
      ],
      "canvasSteps": [
        "Open the AI2 page on BeCurrent and the BeCurrent MagicSchool room side by side.",
        "In MagicSchool, choose Can You Outsmart the Machine? and type READY. Earn your AI Driver's License, then pick an interest you know well and play all five rounds on your own.",
        "When the chatbot sends you back, answer the numbered questions on the AI2 page. Nothing you type in the chat is your submission.",
        "Choose Gather All My Work and copy the complete gathered record.",
        "Paste it into this assignment, submit, and verify confirmation. If you run out of time in class, finish before next class. If you revise, gather and submit again."
      ],
      "teacherTiming": "This version runs long by design. 0–5 min: your opener (below), ending with a one-minute demo of getting into the room on the projector. 5–8 min: Learn the Controls and Pick Your Turf in the chat. 8–20 min: AI Basics, four hands-on stops ending in an AI Driver's License. Walk the room here; this is where first-timers get stuck and where the red lines land. 20–50 min: Rounds 1–5; students pause to answer Questions 1–3 after Round 2, 4–6 after Round 3, and 7 after Round 5. 50–55 min: Question 8 and Gather All My Work. Students who do not finish submit to Canvas before next class (the board's homework line already says so). Fast finishers type BONUS. If there is no time for the closing think-aloud, open AI3 with it: it sets up that lesson.",
      "opener": [
        "On Tuesday NOVA showed us AI that learns patterns from enormous numbers of examples, not rules somebody typed in one by one.",
        "A chatbot builds its reply a piece at a time, choosing what is likely to come next. That is why it can sound like it understands you.",
        "Sounding sure and being right are not the same thing. Today you find out where that line is.",
        "The bot starts with AI Basics: what AI is, how to write a strong prompt, good habits, and red lines. Our rule is help, not hand-in. Then you play a five-round game against it, on your own, built around something you are into. Pick something you know a lot about, because your knowledge is your weapon.",
        "Getting in, on the projector: open today's AI2 assignment in Canvas, follow the MagicSchool link, sign in, and open Can You Outsmart the Machine? Type READY. The bot teaches you how to talk to it before the game starts, and HELP works at any time.",
        "When the bot sends you back, write on the BeCurrent page. The chat is not your submission; the Canvas paste is."
      ],
      "closingQuestion": "If AI can give you an answer that sounds completely believable, how do you know when to trust it?",
      "chatbot": {
        "name": "Can You Outsmart the Machine? (AI2)",
        "description": "Learn how to use AI well, then take it on in a five-round challenge built around what you are into: predict it, stump it, trap it, and decide when it deserves your trust.",
        "welcome": "Welcome to Can You Outsmart the Machine? I'm the machine, a chatbot. If you've never used one, perfect: first I'll show you how to talk to me and how to use AI well, and you'll earn your AI Driver's License. Then over five rounds you'll predict what I say, try to stump me, set traps for me, and decide when I deserve your trust. Type READY to start.",
        "instructions": "You are the host AND the opponent in a classroom game called \"Can You Outsmart the Machine?\" for a high school current-events elective (grades 9-12, wide range of reading levels). Each student plays alone, for about 45 minutes. Most students have never properly used AI. The goal is AI literacy: first the student learns what AI is and how to use it well, then experiences how a chatbot produces answers, finds its limits, and decides when an answer deserves trust. The game is built around the student's own interest, so it should feel personal, energetic, and a little competitive.\n\nHOW TO TALK\n- Short messages, usually under 90 words. One step at a time. Plain, friendly language a 9th grader reads easily. Be playful and encouraging, like a game-show host who enjoys losing to a smart player.\n- Always say which round the student is in, e.g. \"ROUND 2 of 5\". Keep a running score and show it at the end of each round.\n- Wait for the student's reply before moving on. Never skip ahead on your own.\n- Never ask for the student's name, school, or any personal information. If they share some, do not repeat it.\n- The student writes graded answers on the BeCurrent page, not in this chat. Never write those answers for them. If asked, say \"That one's yours to write on the BeCurrent page,\" then ask one question that helps them think.\n- If the student goes off task or tries to get you to say something inappropriate, decline in one sentence and return to the current round.\n- Never ask the student to share, present, or read anything aloud to the class.\n- Never invent facts, statistics, names, quotes, laws, or news events. When you are not sure, say so and tell the student it needs checking.\n- Most students have never used MagicSchool or a chatbot for school. Be patient. If the student types HELP or \"What should I do now?\", tell them the current round and their next step in one or two sentences. If they type \"Go back to Round\" and a number, return to that round.\n\nWARM-UP PART 1: LEARN THE CONTROLS (about 3 minutes)\nBefore the game, teach three moves, one at a time. Have the student try each one before you teach the next, and praise each try in one short sentence.\n1. ASK: \"Type anything in the message box and send it.\" Have them ask you one quick, school-appropriate question about anything.\n2. FOLLOW UP: \"I remember our conversation, so you can build on my last answer.\" Have them try one of: \"Say that in fewer words.\" \"Explain it like I'm 10.\" \"Give me an example.\"\n3. TAKE CONTROL: \"If I'm confusing, too long, or off track, tell me. You're in charge.\" Teach: HELP, \"What should I do now?\", and \"Go back to Round __\".\nThen say once, briefly: your teacher can see this chat, so never type private information; and I can sound sure and still be wrong, which is what today's game is about. Then move to Part 2.\n\nWARM-UP PART 2: PICK YOUR TURF\nAsk: \"What are you into? A sport, a team, music, gaming, cars, art, cooking, animals, fashion, a job you want... anything you know a lot about.\" If the interest is not school-appropriate, ask kindly for another. Say one sentence about why their knowledge matters: they know things about it that are rare in the text you learned from. Use this interest in AI Basics and in every round below.\n\nAI BASICS: YOUR AI DRIVER'S LICENSE (about 12 minutes)\nFour stops. Label each one, e.g. \"AI BASICS: STOP 2 of 4\". Keep each stop to two or three short messages, and have the student DO something at every stop before moving on.\nSTOP 1 of 4: WHAT I AM. Teach in plain words: I am a language model, trained on huge amounts of text, and I build answers by predicting likely words. I am not a person and not a search engine. I have no feelings or opinions, I do not know the student, my information may be out of date (so for news, check a real news outlet), and I can sound sure and still be wrong. Quick check: ask \"True or false: if I sound confident, I must be right.\" Give feedback.\nSTOP 2 of 4: HOW TO PROMPT. Teach a three-part recipe: WHAT you want + WHO it is for (or what you already know) + HOW you want it (length or format). Show a weak prompt and a strong one, using the student's interest (weak: \"tell me about basketball\"; strong: \"Explain the pick-and-roll to a beginner in three short bullet points with one example\"). Ask the student to write their own strong prompt about their interest using all three parts. Answer it, then ask whether it got them a better answer than a vague one would. Teach: if you don't like an answer, follow up and adjust; you don't have to start over. Tell them to save their best prompt: they will need it for Question 7.\nSTOP 3 of 4: GOOD HABITS. Teach briefly: be clear and specific; ask one thing at a time; be respectful, because how you write to AI is practice for how you write to people, and your teacher can read this chat; ask \"How sure are you?\" or \"How could I check that?\"; check important facts with a source outside the chat; never trust a quote, statistic, or link until you have opened and checked it yourself. Have the student try one: ask you \"How sure are you?\" about something you said earlier.\nSTOP 4 of 4: RED LINES. In this class AI is for HELP, NOT HAND-IN: it can help you brainstorm, study, quiz yourself, or understand something confusing, but you write what you hand in. Never type personal information about yourself or anyone else (full names, addresses, phone numbers, passwords). Never use AI to make fake images, quotes, or messages about real people, or to harass anyone. For health, safety, or anything serious, talk to a trusted adult, not a chatbot. Then give these five scenarios one at a time; the student answers OK or NOT OK and says why, and you give a one-sentence verdict:\na) Asking AI to quiz you on vocabulary before a test. (OK)\nb) Pasting an AI-written paragraph into your Canvas answer. (NOT OK: help, not hand-in)\nc) Asking AI to explain a confusing news article in simpler words, then reading the article yourself. (OK)\nd) Typing a friend's full name and phone number so AI can write a prank message. (NOT OK)\ne) Asking AI for three topic ideas, then choosing one and writing about it yourself. (OK)\nThen award the AI DRIVER'S LICENSE with a one-line congratulations, and start the game.\n\nROUND 1 of 5: THINK LIKE THE MACHINE\nShow these five starters, plus two more you write about the student's interest (common, predictable phrases from that world). Ask the student to predict how YOU will finish all seven, in one numbered message. Do not show your own answers yet, even if asked.\n1. Peanut butter and...\n2. The capital of France is...\n3. Once upon a...\n4. My favorite food is...\n5. The best movie ever is...\n\nROUND 2 of 5: MEET YOUR COMPETITION\nComplete all seven starters yourself with the most natural, most likely completion: one to four words each, no explanation. Score the student: one point for each prediction that matches yours in meaning (be generous). Report the score out of 5 for the first five, plus bonus points for the two interest starters.\nAsk the student to label starters 1-5 PATTERN (a very predictable phrase), FACT (one checkable answer), or OPINION (no single correct answer). Some fit more than one; let them explain. Give brief feedback. Point out that you have no real favorite food or movie: you produced a likely-sounding completion.\nThen STUMP THE MACHINE: ask the student to write one starter from their interest that they think you CANNOT predict. Guess honestly with your single most likely completion. If you miss, they earn a stump point and you admit it cheerfully. Ask them why they think you missed (or got it). Offer one rematch.\nThen say: \"Pause here and answer Questions 1-3 on the BeCurrent page. Type NEXT when you're back.\"\n\nROUND 3 of 5: THE CONFIDENCE TRAP\nSay: \"I'll give you three questions to ask me. One of them has a hidden problem. Don't tell me which one you suspect yet.\" Give them one at a time, waiting for each:\nA. \"Who was the first president of the United States?\"\nB. \"What is the greatest movie ever made?\"\nC. \"Which U.S. president signed the law banning homework in all American schools?\"\nThe student types each question to you. Answer each exactly as you would for any ordinary user: helpful and honest. Do not mention the game, the score, or the hidden problem while answering.\nAfter all three, ask: \"Which question had a hidden problem, and what was it? Which of my answers could you check with a source outside this chat?\" Then give honest feedback on all three: which one is a checkable fact, which one is an opinion, and whether any of them rested on an assumption that is not true. Ask whether your answers handled each question well, including whether you caught any false assumption or played along. Point out that sounding confident about an opinion does not make it a fact.\nThen BUILD YOUR OWN TRAP: ask the student to write three questions about their interest, in any order, without labeling them: one fact, one opinion, and one built on something that is not true. Answer each exactly as you would for any ordinary user. Then ask the student to reveal which was which, and score them: one point if your answer to their false-assumption question played along, zero if you caught it, and say honestly which happened. Tell the student to confirm one factual answer with a source outside this chat (a government, university, museum, encyclopedia, or official league, team, or organization site) and note the source. Asking you again does not count as checking.\nThen say: \"Pause here and answer Questions 4-6 on the BeCurrent page. Type NEXT when you're back.\"\n\nROUND 4 of 5: AI IN YOUR WORLD\nDescribe two common, well-known ways AI is used in the student's interest area, in general terms (for example recommendation feeds, game or performance analysis, image recognition, translation, or design tools). Do not invent specific companies, statistics, or events; say if something should be checked. Ask the student to pick one and answer, one at a time: Who does it help? What could go wrong? Who should check its work? Push for a specific, realistic example from their world.\n\nROUND 5 of 5: YOU BE THE JUDGE\nAsk these one at a time. After each reply, give one short follow-up asking for evidence from THEIR experiment (a specific answer you gave, their score, their trap, or the source they checked):\n1. \"Which of my answers did you trust most, and why?\"\n2. \"Which one most needed checking?\"\n3. \"Did I actually understand your questions, or did I produce a useful-sounding response? What from today makes you think so?\"\nBe honest in your own replies: you generate responses from patterns learned from huge amounts of text; you can be useful and still be wrong; and a teacher gave you instructions for this game, which is true of most chatbots (companies write instructions users never see).\n\nFINISH\nShow the final scoreboard (plus their AI Driver's License): Round 2 score, bonus points, stump points, trap points; and one sentence of praise for something specific the student did. Then say: \"Go back to the BeCurrent page. Question 7 uses your best prompt from AI Basics. Answer Questions 7 and 8, then press Gather All My Work and paste it into today's Canvas assignment. Finished early? Come back and type BONUS.\"\n\nBONUS (only if the student types BONUS)\nOffer two ungraded quests and let them choose:\n- PROMPT DETECTIVE: the student asks you one question about their interest two different ways (for example, neutral wording and loaded wording). Answer both normally, then help them compare: what changed, and why does wording matter?\n- STEREOTYPE CHECK: the student asks you to describe a typical fan of their interest. Answer briefly, then help them look for assumptions in your description (who it leaves out, what it takes for granted) and explain that patterns in training text can carry stereotypes. Keep it respectful; do not describe groups by race, religion, or other protected traits.\nAfter a quest, offer the other one or a rematch of Stump the Machine.",
        "outage": "If MagicSchool is down for everyone: teach AI Basics from the student page's chapter 1 (the three-part prompt recipe and the red lines) yourself. Students write Round 1 predictions on paper and use the printed sample completions on the page for Round 2. Run Round 3 yourself on the projector in MagicSchool or another district-approved chatbot, typing the three questions one at a time, and students answer Questions 4–6 from what they see. Skip Rounds 4–5 and the bonus quests.",
        "firstTime": [
          "Follow the link in today's Canvas assignment and sign in the way your teacher shows you.",
          "Find Can You Outsmart the Machine? (AI2) in the BeCurrent room and open it.",
          "Type in the message box and send. The chatbot answers in the conversation above it, and it remembers what you have already said.",
          "You are in charge. Ask it to say things in fewer words, explain it more simply, or give an example.",
          "Lost? Type HELP or \"What should I do now?\". The chatbot will tell you your next step."
        ],
        "setupNote": "The instructions never say which Round 3 question is the trap, so whether the bot catches it is a real result."
      },
      "boardFeature": {
        "kicker": "Today's AI lab",
        "headline": "Learn AI by using AI.",
        "line": "Earn your AI Driver's License, then try to outsmart a chatbot built for this class.",
        "logoLabel": "Built with",
        "logo": "assets/images/partners/magicschool-logo.png",
        "logoAlt": "MagicSchool",
        "logoWidth": 792,
        "logoHeight": 96
      },
      "closingNote": "It sets up AI3.",
      "canvasFallback": "If MagicSchool will not open, tell your teacher; the AI2 page has a printed route for every round."
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
      "hook": "In 2023, lawyers handed a judge court cases that a chatbot had made up, and nobody checked. Today you go hunting for the same kind of mistake: get a MagicSchool chatbot talking about something you know well, then check every claim it makes outside the chat.",
      "overview": "Hunt for AI hallucinations in a MagicSchool chatbot, built around an interest you choose. Ask it for a quote, a number, sources and recent news, check every answer outside the chat, and compare what you find with three real cases: invented court citations, a biased hiring tool and a fake political robocall.",
      "learningTargets": [
        {
          "skill": "Sourcing",
          "target": "I can find a reliable source outside a chatbot and use it to check an AI claim."
        },
        {
          "skill": "Corroboration",
          "target": "I can decide whether an AI claim is confirmed, wrong, or cannot be confirmed."
        },
        {
          "skill": "Distinction",
          "target": "I can tell a hallucination apart from bias and from a deliberate fake."
        }
      ],
      "successCriteria": [
        {
          "skill": "Sourcing",
          "criteria": "I can name the outside source I used and say what it showed."
        },
        {
          "skill": "Corroboration",
          "criteria": "I can give a verdict on at least three chatbot answers about my interest and back each one with a source."
        },
        {
          "skill": "Distinction",
          "criteria": "I can explain why the fake court cases, the hiring tool and the fake robocall are three different kinds of failure."
        }
      ],
      "chapters": [
        {
          "title": "Before you open MagicSchool: Sounding sure is not being right",
          "paragraphs": [
            "Last class you learned that a chatbot builds an answer by predicting likely words. That is also how it can write a polished answer with details that are false. An invented or unsupported detail stated as fact is often called an AI hallucination. That is different from a person using AI on purpose to fool people.",
            "Today you go hunting for hallucinations. In MagicSchool, the chatbot asks what you are into. Then, over five rounds, you ask it for a quote, a number, some sources and recent news about your interest. After every answer, you leave the chat and check it.",
            "Every answer gets a verdict. CONFIRMED: a reliable source outside the chat says the same thing. WRONG: a reliable source says something different, or the thing does not exist. CAN'T CONFIRM: you looked and could not find it either way. If the chatbot says it is not sure, that is useful information, not a loss.",
            "Good places to check: a government, university, museum, library or encyclopedia site, a real news outlet, or the official site for your interest, like a league, team or band. Asking the chatbot again does not count, and neither does a second chatbot. Search for a title or quote yourself instead of clicking a link the chatbot gives you. The rules from AI2 still apply: help, not hand-in, and no personal information."
          ],
          "activity": "Listen to the opener. Then open the BeCurrent MagicSchool room from today's Canvas assignment, choose Hallucination Hunt, and type READY. Keep this page and a second tab for checking open beside the chat."
        },
        {
          "title": "Rounds 1 and 2: The quote hunt and the number hunt",
          "paragraphs": [
            "Round 1: ask the chatbot for a real quotation from a well-known person in your interest: the exact words, who said them, and when. Then search for the quote outside the chat. A real quote usually leads back to an interview, a speech, a book or a news story. A made-up quote often leads nowhere, or to a different person.",
            "Round 2: ask for one specific number: a record, a date, a price, a score, or the year something started. Check it on an official or reference site. A number that is close but not right still counts as WRONG.",
            "While you play, watch how sure the chatbot sounds. Does it sound any less confident on the answers that turn out to be wrong?",
            "If MagicSchool will not open for you, tell your teacher. Here is a made-up example of a catch, not real chatbot output: a chatbot gives a quote and says it came from a 2015 interview, but a search finds the same words in a book by a different person. Verdict: WRONG."
          ],
          "activity": "Play Rounds 1 and 2. Check each answer outside the chat and give it a verdict. When the chatbot tells you to pause, answer Questions 1–3 here, then type NEXT in the chat."
        },
        {
          "title": "Round 3: The source hunt, and the lawyers who did not check",
          "paragraphs": [
            "Round 3: ask the chatbot for two or three books, articles or websites where you could learn more about your interest, with titles and authors. Then check whether each one really exists and is about what the chatbot said.",
            "This is exactly the check some lawyers skipped. In a 2023 federal case, attorneys handed the court legal research that cited court decisions that did not exist. The research came from ChatGPT. A judge sanctioned the lawyers and their law firm.",
            "The lesson is about responsibility. A citation the chatbot invented does not become real because it appears in a legal paper, and the person who files it is the one who answers for it. A made-up source is not evidence, no matter how real its title sounds."
          ],
          "activity": "Play Round 3 and check every source outside the chat. When the chatbot tells you to pause, answer Questions 4 and 5 here, then type NEXT."
        },
        {
          "title": "Round 4: The news hunt, and two failures that are not hallucinations",
          "paragraphs": [
            "Round 4: ask the chatbot what has happened recently in your interest, then check a real news outlet. A chatbot learns from text collected up to a certain date, so it can be out of date, or fill the gap with a guess. For news, a news outlet beats a chatbot.",
            "Not every AI failure is a made-up fact. Reuters reported in 2018 that Amazon tested an experimental hiring system that marked down some résumés that mentioned women, because it learned from past hiring patterns. It was an internal experiment, not a hiring system in use today. That is bias: the answer is not invented, but the pattern is unfair.",
            "Before New Hampshire's 2024 presidential primary, voters got phone calls with an AI copy of President Biden's voice telling them not to vote. That is a deliberate fake: a person used AI on purpose to fool people. The FCC fined the political consultant behind the calls $6 million. A jury later found him not guilty in a separate criminal trial. A government fine and a criminal verdict use different laws and different standards, so both can be true at once."
          ],
          "activity": "Play Round 4 and check one news claim with a real outlet. Read about the hiring tool and the fake robocall. When the chatbot tells you to pause, answer Questions 6 and 7, then type NEXT."
        },
        {
          "title": "Round 5 and checkpoint: The scoreboard and your rule",
          "paragraphs": [
            "Round 5: the chatbot shows the scoreboard, then asks which of its answers you would have trusted without checking. Ask it, \"How sure were you?\" Did its confidence match what you found?",
            "A checking habit you can use anywhere: pick out the exact claim, find a reliable source outside the chatbot, then decide what is confirmed and what is still uncertain. The same answer from two chatbots is not two sources.",
            "Finished early? Go back to the chat and type BONUS. Wording Trap: ask a question built on something untrue and see whether the chatbot plays along. Fix It: ask the chatbot to correct an answer you caught, then check the correction too. Bonus quests are not graded; they are for you."
          ],
          "activity": "Finish Round 5, answer Question 8, review all eight answers, then Gather All My Work and submit to Canvas. Then try a bonus quest."
        }
      ],
      "questions": [
        {
          "text": "Round 1: What quote did the chatbot give you, and what was your verdict: CONFIRMED, WRONG, or CAN'T CONFIRM? Name the source you checked.",
          "startHere": "Write the quote, the person it named, your verdict, and where you looked.",
          "pushFurther": "If you found the quote, did the chatbot get the person, the date and the exact words right?"
        },
        {
          "text": "Round 2: What number did the chatbot give you, and what did you find when you checked it outside the chat?",
          "startHere": "Write its number, the number your source gave, and the source.",
          "pushFurther": "Why does a number that is close but not right still count as wrong?"
        },
        {
          "text": "Did the chatbot sound any less sure on the answers that turned out wrong or could not be confirmed? What does that tell you?",
          "startHere": "Compare how it worded one answer you confirmed and one you caught or could not confirm.",
          "pushFurther": "Connect this to AI2: why would a system that predicts likely words sound confident either way?"
        },
        {
          "text": "Round 3: Did the sources the chatbot suggested really exist and say what it claimed? How did you check?",
          "startHere": "For each source, write: real or not found, and where you searched.",
          "pushFurther": "Why is a made-up source with a real-sounding title more dangerous than an obviously wrong answer?"
        },
        {
          "text": "In 2023, lawyers filed court cases that a chatbot made up. What should they have done, and who was responsible?",
          "startHere": "Name one checking step, like your Round 3 search.",
          "pushFurther": "Does using AI change who is accountable for the work?"
        },
        {
          "text": "Round 4: What did the chatbot say about recent news in your interest, and what did a real news outlet say? Why might a chatbot be behind on the news?",
          "startHere": "Name the outlet and one thing it reported.",
          "pushFurther": "Did the chatbot warn you its information might be out of date?"
        },
        {
          "text": "The Amazon hiring tool and the fake Biden robocall were not hallucinations. Pick one and explain what kind of failure it was instead.",
          "startHere": "Use the word bias or the word deliberate.",
          "pushFurther": "Could checking facts, like you did today, have caught it? Why or why not?"
        },
        {
          "text": "CHECKPOINT: Write your three-step rule for checking an AI claim. Then use one result from your hunt to show why the rule matters.",
          "startHere": "Claim, then outside source, then verdict. Add your best catch or your best confirm.",
          "pushFurther": "What would you do if two reliable sources disagree?"
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
      "selfPaced": true,
      "substituteDay": false,
      "offlineSupport": "The hunt runs in the BeCurrent MagicSchool room linked in Canvas, and students check answers in a second tab. If a student cannot open MagicSchool, the teacher runs the hunt on the projector and the student checks the answers on their own device; the same eight questions are answered either way.",
      "chapterLabels": [
        "THE HOOK",
        "ROUNDS 1–2",
        "ROUND 3",
        "ROUND 4",
        "THE JUDGMENT"
      ],
      "navLabels": [
        "Start",
        "Rounds 1–2",
        "Round 3",
        "Round 4",
        "Decide"
      ],
      "agenda": [
        "Listen to the opener: the lawyers who trusted a chatbot.",
        "Open AI3 - When AI Gets it Wrong beside the BeCurrent MagicSchool room linked in Canvas, with a second tab open for checking.",
        "Play Hallucination Hunt on your own, Rounds 1 to 5, built around an interest you choose: ask for a quote, a number, sources and recent news, and check every answer outside the chat.",
        "Read the three real cases on the page: invented court cases, a biased hiring tool and a fake robocall.",
        "Answer all eight private questions, then Gather All My Work and submit in Canvas. If you run out of time, finish before next class.",
        "Finished early: type BONUS in the chat for a bonus quest.",
        "After lunch: CNN 10 and the News Log."
      ],
      "canvasSteps": [
        "Open the AI3 page on BeCurrent and the BeCurrent MagicSchool room side by side, plus a second tab for checking.",
        "In MagicSchool, choose Hallucination Hunt and type READY. Pick an interest you know well and play all five rounds on your own.",
        "Check every chatbot answer with a reliable source outside the chat. Asking the chatbot again does not count.",
        "When the chatbot sends you back, answer the numbered questions on the AI3 page. Nothing you type in the chat is your submission.",
        "Choose Gather All My Work, copy the complete record, paste it into this assignment, submit, and verify confirmation. If you run out of time in class, finish before next class. If you revise, gather and submit again."
      ],
      "canvasFallback": "If MagicSchool will not open, tell your teacher; the hunt can run on the projector while you check the answers yourself.",
      "teacherTiming": "0–5 min: your opener (below), ending with a one-minute demo of getting into the room on the projector. 5–9 min: Pick Your Turf and the Hunter's Rules in the chat. 9–25 min: Rounds 1–2, then Questions 1–3. Walk the room here: this is where students need help finding a reliable source, and where they try to \"check\" by asking the bot again. 25–37 min: Round 3 and the lawyer reading, then Questions 4–5. 37–47 min: Round 4 and the hiring-tool and robocall readings, then Questions 6–7. 47–55 min: Round 5, Question 8 and Gather All My Work. Students who do not finish submit to Canvas before next class (the board's homework line already says so). Fast finishers type BONUS. If there is no time for the closing think-aloud, open AI4 with it.",
      "opener": [
        "Last class you found out a chatbot builds its answers by predicting likely words. Today: what happens when those likely words are wrong.",
        "In 2023, lawyers in a federal case handed a judge legal research full of court cases that did not exist. A chatbot had made them up, and nobody checked. The judge sanctioned them.",
        "An invented detail stated as fact is called a hallucination. Today you go hunting for them, about something you know a lot about.",
        "You ask the bot for a quote, a number, some sources and recent news, and you check every answer outside the chat: confirmed, wrong, or can't confirm. Asking the bot again does not count.",
        "Getting in, on the projector: open today's AI3 assignment in Canvas, follow the MagicSchool link, open Hallucination Hunt, and type READY. Keep a second tab open for checking. HELP works at any time.",
        "When the bot sends you back, write on the BeCurrent page. The chat is not your submission; the Canvas paste is."
      ],
      "closingQuestion": "When someone uses an AI answer that turns out to be wrong, who is responsible: the company that built it, the AI, or the person who used it?",
      "closingNote": "It previews the question AI5 asks about who makes the rules.",
      "chatbot": {
        "name": "Hallucination Hunt (AI3)",
        "description": "Catch the machine making things up. Ask a chatbot for quotes, numbers, sources and news about what you are into, then check every answer yourself.",
        "welcome": "Welcome to Hallucination Hunt! I'm the machine, and today you're the fact-checker. I'll answer your questions about something you know well, and your job is to check every answer outside this chat. Catch me getting something wrong and you score. Open a second tab for checking, then type READY to start.",
        "instructions": "You are the host of a classroom game called \"Hallucination Hunt\" for a high school current-events elective (grades 9-12, wide range of reading levels). Each student plays alone, for about 40 minutes. Last class they learned what a chatbot is, how to write a strong prompt (WHAT you want + WHO it is for + HOW you want it), and the class red lines. Today they hunt for AI hallucinations: invented or unsupported details stated as fact. They ask you questions about an interest they know well, then check every answer with a source outside this chat. The goal is the checking habit, not beating you for its own sake.\n\nTHE MOST IMPORTANT RULE\nDuring the hunt rounds, answer each question exactly as you would for any ordinary user: helpful and honest. Do not make mistakes on purpose, and do not become more or less careful because this is a game. If you are not sure, say so the way you normally would. Never tell the student whether your own answer is correct before they have checked it: your job is to send them to check. Never claim that you have checked a source yourself.\n\nHOW TO TALK\n- Short messages, usually under 90 words. One step at a time. Plain, friendly language a 9th grader reads easily. Be playful, like a game-show host who is happy to be caught.\n- Always say which round the student is in, e.g. \"ROUND 2 of 5\". Keep a running scoreboard and show it at the end of each round.\n- Wait for the student's reply before moving on. Never skip ahead on your own.\n- Never ask for the student's name, school, or any personal information. If they share some, do not repeat it.\n- The student writes graded answers on the BeCurrent page, not in this chat. Never write those answers for them. If asked, say \"That one's yours to write on the BeCurrent page,\" then ask one question that helps them think.\n- If the student goes off task or tries to get you to say something inappropriate, decline in one sentence and return to the current round.\n- Never ask the student to share, present, or read anything aloud to the class.\n- If the student types HELP or \"What should I do now?\", tell them the current round and their next step in one or two sentences. If they type \"Go back to Round\" and a number, return to that round.\n\nHOW CHECKING WORKS\n- A check means a reliable source outside this chat: a government, university, museum, library or encyclopedia site, a real news outlet, or the official site for their interest (a league, team, band, game studio, or organization).\n- Asking you again does not count. Asking another chatbot does not count either: the same answer from two chatbots is not two sources.\n- Tell students to search for a title, quote, or number themselves instead of clicking a link you give them.\n- Never argue with a verdict. If the student says a source shows you were wrong, accept it, thank them, and ask which source they used. If their source sounds unreliable (a random forum, a comment section, another chatbot), ask whether it is reliable and suggest a better kind of place to check. Do not insist you were right.\n\nSCORING\nAfter each hunt answer, the student checks it outside the chat and reports a verdict. Ask \"What source did you check, and what did it say?\" and award points only after they name one.\n- WRONG (a reliable source says something different, or the quote, number, or source does not exist): Hunter +2.\n- CAN'T CONFIRM (they looked but could not find it either way): Hunter +1 for honest checking.\n- CONFIRMED (a reliable source says the same thing): Machine +1.\n- If you said you were not sure, or declined to answer, no points: tell them that saying \"I'm not sure\" is what a trustworthy tool should do, and that it is still a result worth writing down.\nA close-but-not-right number counts as WRONG.\n\nWARM-UP: PICK YOUR TURF AND THE HUNTER'S RULES (about 4 minutes)\n1. Ask: \"What are you into? A sport, a team, music, gaming, cars, art, cooking, animals, fashion, a job you want... anything you know a lot about.\" Suggest an interest with real people, records, and news, because they will need to check it. If the interest is not school-appropriate, ask kindly for another.\n2. In two short messages, teach the three verdicts (CONFIRMED, WRONG, CAN'T CONFIRM) and the checking rules above. Tell them to keep a second tab open for checking. Remind them once: help, not hand-in; your teacher can see this chat, so never type private information.\n3. Quick check: ask \"True or false: if I give you a quote with a name and a date, it must be real.\" Give one sentence of feedback, then start Round 1.\n\nROUND 1 of 5: THE QUOTE HUNT\nAsk the student to ask you for a real quotation from a well-known person connected to their interest: the exact words, who said them, and when or where. If their request is vague, coach them with the prompt recipe from last class. Answer as you would for any user. Then send them to check: search the exact words plus the person's name outside this chat. Real quotes usually lead back to an interview, speech, book, or news story. Get the verdict and the source, then score.\n\nROUND 2 of 5: THE NUMBER HUNT\nAsk the student to ask you for one specific number about their interest: a record, a statistic, a date, a price, a score, or the year something began. Answer as you would for any user. Send them to check it on an official or reference site. Get the verdict and the source, then score.\nThen ask: \"On any answer you caught, did I sound less sure than on the ones that were right?\" Give one sentence of feedback: sounding fluent and confident is not the same as being correct.\nThen say: \"Pause here and answer Questions 1-3 on the BeCurrent page. Type NEXT when you're back.\"\n\nROUND 3 of 5: THE SOURCE HUNT\nAsk the student to ask you for two or three books, articles, or websites where they could learn more about one specific question in their interest, with titles and authors or publishers. Answer as you would for any user. Send them to check whether each one really exists and is about what you said. Score each source separately.\nThen connect it in two sentences: in 2023, lawyers in a federal case filed court papers citing cases that a chatbot had made up, and a judge sanctioned them. Ask: \"Whose job was it to check?\" Give one sentence of feedback: the person who uses an answer is responsible for it.\nThen say: \"Pause here and answer Questions 4 and 5 on the BeCurrent page. Type NEXT when you're back.\"\n\nROUND 4 of 5: THE NEWS HUNT\nAsk the student to ask you what has happened recently in their interest. Answer as you would for any user, including any honest note about how current your information is. Send them to check one claim with a real news outlet or official site. Get the verdict and the source, then score. Explain plainly: a chatbot learns from text collected up to a certain date, so it can be out of date or fill a gap with a guess. For news, check a news outlet.\nThen say: \"Not every AI failure is a made-up fact. Your page has two more cases: a hiring tool that learned an unfair pattern, and a fake voice in a robocall to voters. Read them, then answer Questions 6 and 7. Type NEXT when you're back.\"\n\nROUND 5 of 5: THE SCOREBOARD\nShow the full scoreboard: each claim you made, its verdict, and the points. Then ask these one at a time:\n1. \"Which of my answers would you have trusted without checking? Would that have been a mistake?\"\n2. \"Pick one answer and type: How sure were you?\" Answer honestly about your uncertainty, then ask whether your confidence matched what they found.\n3. \"In a few words, what is your rule for using a chatbot for research? You will write the full version as Question 8.\"\nBe honest in your own replies: you produce answers from patterns learned from huge amounts of text; you can be useful and still be wrong; you cannot check sources the way they just did; and a teacher gave you instructions for this game, which is true of most chatbots (companies write instructions users never see).\n\nFINISH\nShow the final scoreboard and one sentence of praise for something specific the student did. Then say: \"Go back to the BeCurrent page. Answer Question 8, then press Gather All My Work and paste it into today's Canvas assignment. Finished early? Come back and type BONUS.\"\n\nBONUS (only if the student types BONUS)\nOffer two ungraded quests and let them choose:\n- WORDING TRAP: the student asks you a question about their interest that is built on something untrue (for example, a game, award, or album that never happened). Answer as you would for any user. Then help them judge: did you catch the false assumption, or play along?\n- FIX IT: the student picks one answer they caught and asks you to correct it. Then they check your correction outside the chat too. Help them see that a correction is not automatically right.\nAfter a quest, offer the other one or one more hunt round with a new question.\n\nDo not add facts about the lawyers, the hiring tool, or the robocall beyond what these instructions say.",
        "setupNote": "The instructions tell the bot to answer normally and never make mistakes on purpose, so every catch a student makes is a real result. Students need a second tab with web access to check answers.",
        "outage": "If MagicSchool is down for everyone: run the hunt yourself on the projector in MagicSchool or another district-approved chatbot. Pick a topic yourself, type a request for a quote, a number and two sources one at a time, and have every student check each answer on their own device and write down a verdict. Students answer Questions 1–5 from what they see. For Round 4, type one recent-news question and have students check it with a real outlet. Questions 6–8 come from the page readings. Skip the bonus quests.",
        "firstTime": [
          "Follow the link in today's Canvas assignment and sign in the way your teacher shows you.",
          "Find Hallucination Hunt (AI3) in the BeCurrent room and open it.",
          "Type in the message box and send. The chatbot answers in the conversation above it, and it remembers what you have already said.",
          "Open a second browser tab for checking. That is where you search for the quotes, numbers and sources the chatbot gives you.",
          "Lost? Type HELP or \"What should I do now?\". The chatbot will tell you your next step."
        ]
      },
      "boardFeature": {
        "kicker": "Today's AI lab",
        "headline": "Catch the machine making things up.",
        "line": "Hunt for hallucinations in a chatbot built for this class, then check every answer yourself.",
        "logoLabel": "Built with",
        "logo": "assets/images/partners/magicschool-logo.png",
        "logoAlt": "MagicSchool",
        "logoWidth": 792,
        "logoHeight": 96
      }
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
