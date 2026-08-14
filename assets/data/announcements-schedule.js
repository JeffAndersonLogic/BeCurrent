/* =========================================================
   BECURRENT ANNOUNCEMENTS, THE SCHEDULE

   THIS is the file you edit. Give a date and a topic code, and the
   learning targets and success criteria come straight out of that
   topic's own content module.

   After editing, run:

       node scripts/build-announcements.js

   That writes assets/data/announcements.js, which the board reads.
   Never edit that file by hand, it gets overwritten.

   WHAT YOU CAN POINT A DAY AT

       topic: 'SM3'     a unit topic. The letters are the unit's `code`
                        in its content module, the number is the topic.
                        Social Media is SM, so SM1 to SM5.
       week: '01'       an orientation week, from scripts/lib/week-content/.

   Either one fills in the unit or week name, the title, the learning
   targets and the success criteria. A day with neither is fine, just
   write the fields yourself.

   A DAY ENTRY

       date         required, 'YYYY-MM-DD'
       topic        or `week`, see above
       homework     what leaves the room tonight. Yours to write, the
                    course data has no homework in it. One assignment can
                    be a plain string. Two or more go in a list and each
                    gets its own numbered line on the screen:
                        homework: ['Finish your three responses.',
                                   'Bring a device Thursday.']
       homeworkDue  optional, shows as a chip, e.g. 'Friday'
       note         optional one-line callout ('Bring your Chromebook')
       doNow        optional bell ringer, adds a slide
       agenda       optional list of steps, adds a numbered slide

   OVERRIDES, for when the wording is too long to project

       topicTitle       replaces the topic title on the screen
       learningTargets  a list of plain strings, replaces the generated ones
       successCriteria  a list of plain strings, replaces the generated ones

   Anything you write here wins over the generated text.

   ========================================================= */

window.BECURRENT_SCHEDULE = {

  settings: {
    courseName: 'Current Events',
    // Blank on purpose, so nothing personal projects on the screen.
    teacherName: '',
    roomName: '',
    slideSeconds: 15,
    // The Desk runs the first 25 minutes of every class, so its slide is
    // built from scripts/lib/desk-content.js rather than typed per day.
    // Set false to drop it from the loop.
    showDesk: true
  },

  days: [
    { date: '2026-08-10', week: '01',
      homework: 'Bring one story you saw this weekend. Any source, any subject.' },

    { date: '2026-08-12', topic: 'SM1',
      homework: 'Finish your chain if you did not get to the end of it. Paper only.' },

    { date: '2026-08-13', topic: 'SM2',
      note: 'No devices today.' },

    { date: '2026-08-14', topic: 'SM3',
      homework: 'Finish your three Brief responses and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-08-18', topic: 'SM4',
      note: 'Bring a device today. The document is the assignment.',
      homework: 'Finish your three Brief responses and submit them in Canvas.' },

    { date: '2026-08-20', topic: 'SM5',
      homework: 'Finish your three Brief responses and submit them in Canvas.' }
  ],

  // Every quiz, test and exam. Past dates drop off the board on their own.
  // A date you have not set yet is fine: leave `date` out and it shows as TBD.
  assessments: [
    // { date: '2026-08-21', title: 'Social Media unit check', type: 'Quiz',
    //   detail: 'The terminal question, argued in writing.' }
  ],

  // Off by default. Add one and a Reminders slide joins the loop.
  reminders: [
    // { title: 'Chromebooks', detail: 'Charged, every day.' }
  ]
};
