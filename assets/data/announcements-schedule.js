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
                        Social Media is SM, so SM1 to SM6. Iran at War is
                        IR, so IR1 to IR8.
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
                    gets its own numbered line on the screen.
       homeworkDue  optional, shows as a chip, e.g. 'Friday'
       note         optional one-line callout ('Bring your Chromebook')
       doNow        optional bell ringer, adds a slide
       agenda       optional list of steps, adds a numbered slide
       deskMode     optional. Omit it for the normal Full Desk. Set
                    deskMode: 'lead' only when the scheduled investigation
                    needs sustained time. Lead Mode keeps the shared Lead
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
    teacherName: '',
    roomName: '',
    slideSeconds: 15,
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

    { date: '2026-09-08', topic: 'IR1',
      homework: 'Finish this topic\'s filings and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-09-10', topic: 'IR2',
      homework: 'Finish this topic\'s filings and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-09-14', topic: 'IR3',
      homework: 'Finish this topic\'s filings and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-09-16', topic: 'IR4',
      homework: 'Finish this topic\'s filings and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-09-18', topic: 'IR5',
      homework: 'Finish this topic\'s filings and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-09-22', topic: 'IR6',
      homework: 'Finish this topic\'s filings and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-09-24', topic: 'IR7',
      homework: 'Finish this topic\'s filings and submit them in Canvas.',
      homeworkDue: 'the start of next class' },

    { date: '2026-09-28', topic: 'IR8',
      homework: 'Finish the final causation argument and submit it in Canvas.',
      homeworkDue: 'the start of next class' }
  ],

  assessments: [
    { date: '2026-08-28', title: 'Social Media Unit Exam', type: 'Test' }
  ],

  reminders: [
    // { title: 'Chromebooks', detail: 'Charged, every day.' }
  ]
};

if (typeof document !== 'undefined' && /(?:^|\/)announcements\.html$/.test(location.pathname)) {
  var deskModePatch = document.createElement('script');
  deskModePatch.src = 'assets/js/announcements-desk-mode.js?v=20260903-hourly';
  document.head.appendChild(deskModePatch);
}
