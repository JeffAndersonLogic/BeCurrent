'use strict';
// Canonical source: AI unit, November 2026. Human review required before main deployment.
module.exports = {
  "meta": {
    "unit": "The Machine in the Room",
    "unitKey": "ai",
    "code": "AI",
    "course": "CURRENT EVENTS",
    "reviewed": "2026-11-08",
    "design": "Signal Lab / Midnight Ember",
    "renderer": "ai-investigation",
    "overview": "Four investigations about where AI answers come from, how to verify them, what AI changes, and who should make the rules.",
    "terminalQuestion": "AI is already making decisions that affect your life. Which decisions should a person still make, and who gets to set the rules?",
    "openingFilm": {
      "title": "A.I. Revolution",
      "publisher": "PBS NOVA",
      "date": "2024-03-27",
      "fullRuntime": "53:30",
      "assigned": "00:00-53:30 (full documentary)",
      "url": "https://www.youtube.com/watch?v=-sB12gk9ESA",
      "alternate": "https://www.pbs.org/video/ai-revolution-umwwlt/",
      "note": "Watch the entire 53:30 documentary in class on Monday, November 9. Its examples are from 2024; distinguish evergreen explanations from current product claims."
    },
    "schedule": [
      [
        "2026-11-09",
        "AI1"
      ],
      [
        "2026-11-11",
        "AI2"
      ],
      [
        "2026-11-13",
        "AI3"
      ],
      [
        "2026-11-17",
        "AI4"
      ],
      [
        "2026-11-19",
        "Assessment in Canvas only"
      ],
      [
        "2026-11-23",
        "The Desk"
      ]
    ],
    "studentFlow": "November 9 is a full-film introduction with a lightweight viewing guide, no eight-question Canvas worksheet. November 11-17 use independent investigations with eight short private responses, Gather All My Work, and Canvas submissions. CNN 10 / News Log remain after lunch.",
    "privacy": "Never type your full name, address, or anything private. Your teacher can read this chat.",
    "dayOneFormat": "FULL FILM 53:30. Screen start immediately; do not assign eight additional responses or a Canvas filing before lunch. Four short viewing cues, optional exit thought."
  },
  "topics": [
    {
      "n": 1,
      "key": "ai-t01",
      "page": "block-01.html",
      "date": "2026-11-09",
      "title": "What AI Actually Is",
      "subtitle": "A very good guesser",
      "skill": "Generalizing from Evidence",
      "question": "How can a computer sound like it understands you?",
      "hook": "I used AI to help build parts of this unit. As you watch, what would convince you that an AI-generated answer is accurate?",
      "overview": "Start the unit with the entire 53-minute NOVA documentary A.I. Revolution. Use four brief viewing cues to notice how AI learns, helps people, can make mistakes, and raises questions about responsibility. Detailed investigations begin next class.",
      "learningTargets": [
        {
          "skill": "Explanation",
          "target": "I can explain patterns, training examples, and prediction in plain language."
        },
        {
          "skill": "Classification",
          "target": "I can tell when a tool likely uses AI and when the answer depends on its implementation."
        },
        {
          "skill": "Evidence",
          "target": "I can explain why a convincing sentence might still be incorrect."
        }
      ],
      "successCriteria": [
        {
          "skill": "Explanation",
          "criteria": "I can use a familiar example to explain learned patterns."
        },
        {
          "skill": "Classification",
          "criteria": "I can classify everyday tools and explain one borderline case."
        },
        {
          "skill": "Evidence",
          "criteria": "I can support a claim about chatbots with a result from the experiment."
        }
      ],
      "chapters": [
        {
          "title": "The question hiding in your phone",
          "paragraphs": [
            "Your phone can guess a word, rank a video, recognize a face, and send suspicious messages to a spam folder. Some of those tasks use machine learning. Some everyday features simply follow rules. The name on an app cannot tell you exactly how it works.",
            "Artificial intelligence (AI) is a broad family of computer methods used to perform tasks such as recognizing patterns, making predictions, generating language, or planning. Not every program is AI. Not every AI program is a chatbot."
          ],
          "activity": "After the teacher's opening, write one private prediction: what do you think AI actually learns?"
        },
        {
          "title": "Watch the documentary: Where did AI come from?",
          "paragraphs": [
            "Watch the assigned opening of PBS NOVA's 2024 A.I. Revolution, from 00:00 through 16:21. Notice how the film moves from the history of AI to systems that learn from examples.",
            "This documentary predates recent products. Treat the film as an explanation of ideas, not a report on what every AI tool can do in November 2026."
          ],
          "activity": "Watch for: What did machines learn from, and what were humans still responsible for?"
        },
        {
          "title": "Become the predictor",
          "paragraphs": [
            "First, finish five starters on paper: Peanut butter and ___; The capital of France is ___; Once upon a ___; My favorite food is ___; The best movie ever is ___. Do this before opening a chatbot.",
            "Some completions follow a strong pattern. Others are facts that can be checked. Others are preferences with no single right answer. Predictability and truth are different questions."
          ],
          "activity": "Compare the predictable starter with the one that depends most on the person."
        },
        {
          "title": "AI or just a computer program?",
          "paragraphs": [
            "A calculator typically follows fixed instructions; a learned spam filter detects patterns across email examples. Some products mix both approaches. A phone feature may be AI in one implementation and rule-based in another.",
            "Training data are examples used to develop many machine-learning systems. A pattern is a regularity among examples. A prediction is an estimate of an outcome or response."
          ],
          "activity": "Sort eight technologies into likely AI, likely rule-based, or depends."
        },
        {
          "title": "Ask the chatbot, then check",
          "paragraphs": [
            "If your teacher assigned a MagicSchool room, its join link is in Canvas, never on this website. Give the chatbot the same five starters and compare responses. If the room is unavailable, use these illustrative sample completions: jelly; Paris; time; pizza; it depends.",
            "A modern large language model generates a reply in pieces based on patterns and instructions. It can do sophisticated tasks, sometimes using tools and live searches. Fluency is not independent evidence that the reply is true."
          ],
          "activity": "Return to your first prediction. What has changed?"
        }
      ],
      "clip": {
        "title": "A.I. Revolution | opening chapters",
        "source": "PBS NOVA",
        "date": "2024-03-27",
        "url": "https://www.youtube.com/watch?v=-sB12gk9ESA",
        "alt": "https://www.pbs.org/video/ai-revolution-umwwlt/",
        "assigned": "Full film / 00:00-53:30",
        "prompt": "Where does AI learn patterns? What can it help people do? What can go wrong? Who should remain responsible?",
        "captions": "Check captions and playback before class."
      },
      "sort": {
        "prompt": "Sort each feature based on its typical implementation, not just its name.",
        "options": [
          "Likely AI",
          "Likely rules",
          "Depends"
        ],
        "items": [
          [
            "Basic calculator",
            "Likely rules",
            "Fixed mathematical instructions typically determine its result."
          ],
          [
            "TikTok For You ranking",
            "Likely AI",
            "Personalized ranking typically relies on trained recommendation models."
          ],
          [
            "Phone autocorrect",
            "Depends",
            "Autocorrect can mix learned language models with fixed rules."
          ],
          [
            "Face unlock",
            "Likely AI",
            "Modern face recognition typically uses trained recognition models."
          ],
          [
            "Microwave timer",
            "Likely rules",
            "A basic countdown does not require learned predictions."
          ],
          [
            "Email spam filter",
            "Likely AI",
            "Modern filters typically learn from examples and signals."
          ],
          [
            "Thermostat set to 70 degrees",
            "Likely rules",
            "A basic set-point thermostat follows a threshold rule."
          ],
          [
            "Google Translate",
            "Likely AI",
            "Modern translation uses trained language models."
          ]
        ]
      },
      "questions": [
        {
          "text": "What is one difference between a learned pattern and a fixed rule?",
          "startHere": "Compare a spam filter with a basic calculator.",
          "pushFurther": "Can one product combine both?"
        },
        {
          "text": "Choose one AI feature. What examples might it have learned from?",
          "startHere": "Start with videos, words, faces, or email.",
          "pushFurther": "Which kinds of examples might be missing?"
        },
        {
          "text": "Which technology could depend on its implementation? Explain.",
          "startHere": "Choose autocorrect or a different mixed system.",
          "pushFurther": "Explain how a feature could change as technology improves."
        },
        {
          "text": "Which sentence starter was easiest to predict? Why?",
          "startHere": "Use the paper exercise.",
          "pushFurther": "Explain why many people might choose the same word."
        },
        {
          "text": "Which starter had no one correct answer? What makes it different?",
          "startHere": "Choose a personal-preference starter.",
          "pushFurther": "Contrast a preference with a checkable fact."
        },
        {
          "text": "What happened when you compared a chatbot response or printed sample with your prediction?",
          "startHere": "Name a starter and the two completions.",
          "pushFurther": "Did a plausible completion prove it was correct?"
        },
        {
          "text": "Give one useful and one risky use of AI for schoolwork.",
          "startHere": "Think studying versus submitting unverified writing.",
          "pushFurther": "Who is responsible for checking the final work?"
        },
        {
          "text": "CHECKPOINT: When is 'a very good guesser' a helpful description of a chatbot, and where does it fall short?",
          "startHere": "Use one example from today.",
          "pushFurther": "Describe one ability the analogy leaves out."
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
          "label": "How AI works",
          "prompt": "Find one example of a system learning from data rather than simply following a fixed rule."
        },
        {
          "label": "What AI can do",
          "prompt": "Notice one useful possibility in science, medicine, daily life, or work."
        },
        {
          "label": "What could go wrong",
          "prompt": "Notice one mistake, unfair outcome, or misleading use of AI."
        },
        {
          "label": "Who decides",
          "prompt": "Who should be responsible when a machine makes an important recommendation?"
        }
      ],
      "dayOneNote": "The four viewing cues are optional jot notes, not four graded questions. No eight-question worksheet or MagicSchool activity is due during the 53:30 showing. Concepts recur in Topics 2-4 and the study guide."
    },
    {
      "n": 2,
      "key": "ai-t02",
      "page": "block-02.html",
      "date": "2026-11-11",
      "title": "When AI Gets It Wrong",
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
      ]
    },
    {
      "n": 3,
      "key": "ai-t03",
      "page": "block-03.html",
      "date": "2026-11-13",
      "title": "What AI Changes, and Who Pays",
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
      ]
    },
    {
      "n": 4,
      "key": "ai-t04",
      "page": "block-04.html",
      "date": "2026-11-17",
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
      ]
    }
  ]
};
