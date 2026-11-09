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
        "AIOPEN"
      ],
      [
        "2026-11-11",
        "AI1"
      ],
      [
        "2026-11-13",
        "AI2"
      ],
      [
        "2026-11-17",
        "AI3"
      ],
      [
        "2026-11-19",
        "AI4"
      ],
      [
        "2026-11-23",
        "Assessment in Canvas only"
      ],
      [
        "2026-11-25 through 2026-11-27",
        "Thanksgiving break, no school"
      ],
      [
        "2026-11-30",
        "The Desk / tentative pending class rotation check"
      ]
    ],
    "studentFlow": "Nov 9: entire NOVA documentary, four optional viewing cues and no Canvas assignment. Nov 11: fully independent AI1 on substitute/conference day, eight questions and shared Canvas Gather; no teacher presentation or required live MagicSchool. Nov 13, 17, 19: AI2-AI4 eight-answer investigations. Nov 23: Canvas-only assessment. Nov 25-27: no school. Next class after break: The Desk. CNN 10 / News Log stay after lunch.",
    "privacy": "Never type your full name, address, or anything private. Your teacher can read this chat.",
    "dayOneFormat": "FILM ONLY on 2026-11-09, entire 53:30 NOVA A.I. Revolution. AI1 is the following class, 2026-11-11, completed independently while teacher attends a conference.",
    "assessment": {
      "date": "2026-11-23",
      "location": "Canvas only",
      "questions": 25,
      "distribution": {
        "AI1": 6,
        "AI2": 6,
        "AI3": 6,
        "AI4": 7
      },
      "notes": "Secure assessment and key must not be hosted publicly."
    }
  },
  "topics": [
    {
      "n": 1,
      "key": "ai-t01",
      "page": "block-01.html",
      "date": "2026-11-11",
      "title": "What AI Actually Is",
      "subtitle": "A very good guesser",
      "skill": "Generalizing from Evidence",
      "question": "How can a computer sound like it understands you?",
      "hook": "Your teacher is at a conference today. You can complete this investigation on your own using the explanations and examples on this page. Start at Chapter 1, work in order, and submit eight answers to Canvas before lunch.",
      "overview": "Independent follow-up to Monday's NOVA documentary. Explain how AI learns, try the Be the Model prediction exercise, sort everyday tools, and judge when a chatbot output needs human checking. No teacher presentation is required.",
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
          "title": "Start here: What did the film show?",
          "paragraphs": [
            "On Monday you watched NOVA's A.I. Revolution. If you missed it, you can still do today's lesson. Artificial intelligence is a broad category of computer methods used for recognizing patterns, making predictions, generating language, and other tasks. Not all AI works the same way.",
            "Think about an everyday example: a video feed may predict what you want to watch, while a microwave timer simply counts down. A computer can use AI in one part of a product and ordinary instructions in another."
          ],
          "activity": "Read the background, think privately about your own examples, and answer Question 1. Continue to the next chapter without waiting for the substitute."
        },
        {
          "title": "Be the Model: Predict the next word",
          "paragraphs": [
            "Before using any chatbot, finish these starters in your own notes: Peanut butter and ___; The capital of France is ___; Once upon a ___; My favorite food is ___; The best movie ever is ___. You may write them on paper.",
            "A strong pattern may make some answers easy to predict. A factual answer, such as a capital city, can be checked. A personal favorite does not have one universally correct answer. A plausible completion does not prove the computer understands the question."
          ],
          "activity": "Complete the five starters privately, then answer Questions 2 and 3."
        },
        {
          "title": "Patterns learned from examples",
          "paragraphs": [
            "A basic calculator follows mathematical rules. A modern spam filter can learn from examples of messages marked spam and not spam. These are different ways of deciding what happens next.",
            "Training data are examples used to help develop many machine-learning systems. A pattern is something that regularly appears. An AI tool may use both learned models and fixed programming, so classify by how a feature typically works, not just by its product name."
          ],
          "activity": "Try the eight-card AI/not-AI sort, read the feedback, and answer Questions 4 and 5."
        },
        {
          "title": "Chatbot or printed sample: Compare the replies",
          "paragraphs": [
            "A modern language model generates a response from patterns and context; some systems can also use tools, search, or reason through multi-step problems. A convincing sentence can still be inaccurate, incomplete, or just one of many possible answers.",
            "If your Canvas assignment contains the BeCurrent MagicSchool link, you may ask it to complete the five starters from Chapter 2. If the room is unavailable, use these clearly illustrative sample replies instead: jelly; Paris; time; pizza; it depends on the person. The samples are not a record of MagicSchool's actual output.",
            "A useful output still deserves checking when it claims to be factual. For schoolwork, a student remains responsible for reviewing the final work."
          ],
          "activity": "Compare either the chatbot or the printed sample to your predictions. Answer Questions 6 and 7. No live chatbot access is required."
        },
        {
          "title": "Checkpoint: When should we trust the machine?",
          "paragraphs": [
            "Calling a chatbot a 'very good guesser' helps explain why it produces plausible words. But it is not a full scientific description of modern AI, which can perform complex tasks and sometimes access outside tools.",
            "Today's big idea: useful predictions and confident-sounding answers are not automatically true. Next class we will look at what happens when people fail to verify AI-generated claims."
          ],
          "activity": "Answer Question 8, review all answers, then Gather All My Work and submit to Canvas."
        }
      ],
      "clip": {
        "title": "A.I. Revolution | opening chapters",
        "source": "PBS NOVA",
        "date": "2024-03-27",
        "url": "https://www.youtube.com/watch?v=-sB12gk9ESA",
        "alt": "https://www.pbs.org/video/ai-revolution-umwwlt/",
        "assigned": "Full film shown the previous class on November 9; do not rewatch during independent lesson",
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
          "label": "How AI learns",
          "prompt": "Notice an example of a system learning from data."
        },
        {
          "label": "Where AI helps",
          "prompt": "Notice a useful example in health, science, or daily life."
        },
        {
          "label": "What can go wrong",
          "prompt": "Notice a risk, a mistaken output, or an AI-generated fake."
        },
        {
          "label": "Who decides",
          "prompt": "What responsibilities should people keep?"
        }
      ],
      "dayOneNote": "The four viewing cues are optional jot notes, not four graded questions. No eight-question worksheet or MagicSchool activity is due during the 53:30 showing. Concepts recur in Topics 2-4 and the study guide.",
      "selfPaced": true,
      "substituteDay": true,
      "offlineSupport": "Every task has a reading and printed example. MagicSchool is optional, never a dependency. If an activity is unavailable, follow the page's printed fallback and complete the same questions.",
      "subPlan": {
        "teacherAbsent": true,
        "notice": "Your teacher is attending a conference today. Follow the page from top to bottom; the substitute does not need to teach AI or explain any new terminology.",
        "directions": [
          "Open the BeCurrent AI unit and choose AI1: What AI Actually Is (November 11).",
          "Read each Chapter's background text before attempting the question underneath it. Printed information on this page is enough.",
          "Complete Be the Model predictions on paper or in your own notes; do not share them aloud.",
          "Complete the eight-step AI/not-AI practice sort, check feedback, and revise your choices.",
          "If the MagicSchool room appears in Canvas, you may compare its outputs with the printed sample; if not, use only the printed sample. Never type personal information.",
          "Write all eight answers in the text boxes and choose Gather All My Work; paste into today's Canvas Text Entry assignment and submit before lunch.",
          "After lunch continue the normal CNN 10 and News Log routine as directed by your substitute."
        ],
        "timed": [
          {
            "minutes": "0–5",
            "action": "Open BeCurrent AI1; read the opening and instructions."
          },
          {
            "minutes": "5–17",
            "action": "Chapters 1–2: read context, do paper prediction and early questions."
          },
          {
            "minutes": "17–32",
            "action": "Chapter 3: learned patterns, everyday-tool sort and corrections."
          },
          {
            "minutes": "32–47",
            "action": "Chapters 4–5: optional chatbot or printed sample; remaining answers and checkpoint."
          },
          {
            "minutes": "47–55",
            "action": "Check eight answers, Gather All My Work, paste into Canvas, submit and confirm."
          }
        ],
        "technicalFallback": "If video, MagicSchool, or external sites do not load, continue with the background readings and printed examples. If the BeCurrent page itself is unavailable, use the printable AI1 worksheet and the teacher-approved paper submission route."
      }
    },
    {
      "n": 2,
      "key": "ai-t02",
      "page": "block-02.html",
      "date": "2026-11-13",
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
      "date": "2026-11-17",
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
      "date": "2026-11-19",
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
  ],
  "days": [
    {
      "code": "OPEN",
      "topic": "Opening Film",
      "title": "NOVA: A.I. Revolution",
      "subtitle": "Full-documentary introduction to artificial intelligence",
      "date": "2026-11-09",
      "page": "opening-film.html",
      "learningTargets": [
        {
          "skill": "Background knowledge",
          "target": "I can recognize major possibilities and challenges of artificial intelligence introduced in the documentary."
        },
        {
          "skill": "Inquiry",
          "target": "I can identify questions about how AI works and who is responsible for its use."
        }
      ],
      "successCriteria": [
        {
          "skill": "Observation",
          "criteria": "I can notice one AI example and one question to investigate in the unit."
        }
      ],
      "overview": "Watch the complete PBS NOVA documentary A.I. Revolution (53:30). Four optional viewing cues; no additional graded worksheet."
    }
  ]
};
