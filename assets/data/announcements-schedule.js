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

    { date: '2026-08-28', topicTitle: 'Social Media Unit Exam', deskMode: 'lead',
      agenda: ['Complete the Social Media Unit Exam.'],
      note: 'Today is the Social Media Unit Exam.' },

    { date: '2026-09-01', topicTitle: 'The Desk | Week of September 1',
      agenda: ['Begin class with CNN 10 to catch up on current events.',
               'Open The Desk | Week of September 1 in Canvas and launch your Microsoft Education News Log.',
               'Complete The Desk: file the shared Lead, choose Your Pick, and make today’s significance judgment.',
               'Before you leave, confirm that your Word document shows your work is saved.'],
      note: 'CNN 10 first. Then The Desk. Keep the same weekly News Log for Thursday.' },

    { date: '2026-09-03', topicTitle: 'The Desk | Week of September 1',
      agenda: ['Begin class with CNN 10 to catch up on current events.',
               'Reopen The Desk | Week of September 1 in Canvas and continue the same Microsoft Education News Log.',
               'Complete The Desk: file the shared Lead, choose Your Pick, and make today’s significance judgment.',
               'Confirm both Desk entries are saved, then submit The Desk | Week of September 1.'],
      note: 'CNN 10 first. Then The Desk. Finish and submit the weekly News Log today.' },

    { date: '2026-09-08', topicTitle: 'War in Iran — Section 1',
      agenda: ['Begin the War in Iran unit.',
               'Complete Section 1.'],
      note: 'New unit today: War in Iran.' },

    { date: '2026-09-10', topicTitle: 'War in Iran — Section 2',
      agenda: ['Continue the War in Iran unit.',
               'Complete Section 2.'] }
  ],

  assessments: [
    { date: '2026-08-28', title: 'Social Media Unit Exam', type: 'Test' }
  ],

  reminders: [
    // { title: 'Chromebooks', detail: 'Charged, every day.' }
  ]
};

if (typeof document !== 'undefined' && /(?:^|\\/)announcements\\.html$/.test(location.pathname)) {
  var deskModePatch = document.createElement('script');
  deskModePatch.src = 'assets/js/announcements-desk-mode.js?v=20260831-desk';
  document.head.appendChild(deskModePatch);
}
