/* =========================================================
   THE INVESTIGATION SHELF

   One entry per investigation. Only `iran-war` is written; the rest are
   marked `planned` and say so on the card.

   PLANNED IS NOT THE SAME AS PRETENDING. A card marked planned carries
   no facts, no dates and no summary of findings — only the question it
   will ask. A student who clicks it gets told it is not written yet,
   which answers their question. Inventing a blurb so the shelf looks
   fuller would be presenting placeholder material as course content, and
   in a course about verification that is the worst available lie.
   ========================================================= */
(function () {
  'use strict';

  window.BC_INVESTIGATIONS = [
    { id: 'iran-war',
      title: 'Why is there war with Iran?',
      status: 'active',
      href: 'investigation-iran.html',
      note: 'The fighting is now. The story starts in 1953.',
      art: 'assets/images/iran-plate.svg',
      artAlt: '' },

    { id: 'ai-jobs',
      title: 'AI and the future of work',
      status: 'planned',
      href: '',
      question: 'Which jobs are actually changing, and who is telling you so?',
      art: '', artAlt: '' },

    { id: 'tariffs',
      title: 'Who really pays a tariff?',
      status: 'planned',
      href: '',
      question: 'A tariff is charged at the border. Who ends up paying it?',
      art: '', artAlt: '' },

    { id: 'migration',
      title: 'Migration',
      status: 'planned',
      href: '',
      question: 'What makes someone leave, and what makes a country let them in?',
      art: '', artAlt: '' },

    { id: 'social-media',
      title: 'Social media and attention',
      status: 'planned',
      href: '',
      question: 'Who decides what you see, and what are they optimising for?',
      art: '', artAlt: '' }
  ];
})();
