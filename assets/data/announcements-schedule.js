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
                        Social Media is SM, so SM1 to SM6.
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
       deskMode     optional. Omit it for the normal Full Desk. Set
                    deskMode: 'lead' only when the scheduled investigation
                    needs sustained time. Lead Mode keeps the shared Lead,
                    its event/significance filing and the Canvas backup,
                    but removes Your Pick for that date.

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
    // The Desk begins every class. Full Desk is the default; individual dates can
    // opt into Lead Mode with deskMode: 'lead' when the investigation needs more
    // sustained time. No student-facing surface promises a fixed minute count.
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

    // Two episodes of CNN 10 today rather than one. The shape of ONE day belongs
    // here rather than in the topic's content module: the module is what gets
    // taught again next year, and this is what is happening on this date. No
    // timings, because this projects at students.
    { date: '2026-08-18', topic: 'SM4',
      note: 'Bring a device today. You are going to look yourself up.',
      agenda: ['The Desk. Two episodes of CNN 10 to catch us up, then file your two stories.',
               'Read the Brief and answer the three questions.'],
      homework: 'Finish your three Brief responses and submit them in Canvas.' },

    { date: '2026-08-20', topic: 'SM5',
      homework: ['Finish your three Brief responses and submit them in Canvas.',
                 'Bring one claim you saw this week that you are not sure about.'] },

    { date: '2026-08-24', topic: 'SM6',
      homework: 'Finish your three Brief responses and submit them in Canvas.' },

    { date: '2026-08-26', topicTitle: 'Review / Study Guide',
      agenda: ['Review the unit: the six topics and the terms.',
               'Work through the study guide.'],
      note: 'No new material today. The Social Media Assessment is Friday.' },

    // Assessment day is the first scheduled example of Lead Mode: students still
    // know and file the shared Lead, but Your Pick does not compete with the exam.
    { date: '2026-08-28', topicTitle: 'Social Media Unit Exam', deskMode: 'lead',
      agenda: ['Complete the Social Media Unit Exam.'],
      note: 'Today is the Social Media Unit Exam. Our War in Iran unit begins Tuesday.' },

    // The opening Iran sections stay Full Desk by default. When later Iran dates
    // are added, use deskMode: 'lead' for the genuinely heavy synthesis days such
    // as the nuclear-bargain lesson and the final causation synthesis.
    { date: '2026-09-01', topicTitle: 'War in Iran — Section 1',
      agenda: ['Begin the War in Iran unit.',
               'Complete Section 1.'],
      note: 'New unit today: War in Iran.' },

    { date: '2026-09-03', topicTitle: 'War in Iran — Section 2',
      agenda: ['Continue the War in Iran unit.',
               'Complete Section 2.'] }
  ],

  // Every quiz, test and exam. Past dates drop off the board on their own.
  // A date you have not set yet is fine: leave `date` out and it shows as TBD.
  assessments: [
    { date: '2026-08-28', title: 'Social Media Unit Exam', type: 'Test' }
  ],

  // Off by default. Add one and a Reminders slide joins the loop.
  reminders: [
    // { title: 'Chromebooks', detail: 'Charged, every day.' }
  ]
};

// The TODAY board is hand-authored and reads this schedule directly. Keep its Desk
// slide synchronized with the date's mode without duplicating the mode decision in
// generated course data. The Node announcement builder has no `document`, so this
// browser-only helper is invisible to the build step.
if (typeof document !== 'undefined' && /(?:^|\/)announcements\.html$/.test(location.pathname)) {
  var deskModePatch = document.createElement('script');
  deskModePatch.src = 'assets/js/announcements-desk-mode.js';
  document.head.appendChild(deskModePatch);
}
