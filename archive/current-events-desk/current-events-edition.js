/* ═══════════════════════════════════════════════════════════════════════════
   BeCurrent, weekly edition file

   THIS IS THE ONLY FILE YOU EDIT EACH WEEK. Everything else on the desk is
   fixed pedagogy and does not change.

   The sixty second version:
     1. Change  edition.id  and  edition.dateline  to this week's date.
     2. Change  beats  to the two or three AP themes you want them hunting.
     3. Optional: paste this week's articles into  pinned.
     4. Optional: switch stations off by deleting them from  stations.
     5. Save. Done.

   edition.id doubles as the autosave namespace. Change it and every student
   gets a clean sheet, and last week's answers stay safely stored under last
   week's id rather than bleeding into this edition.
   ═══════════════════════════════════════════════════════════════════════════ */

window.BEHISTORICAL_CURRENT_EVENTS = {

  /* ── 1. THIS WEEK ──────────────────────────────────────────────────────── */
  edition: {
    id:       '2026-08-06',                  // YYYY-MM-DD, also the autosave key
    label:    'Edition 01',
    title:    'Weekend Update',
    dateline: 'Thursday, August 6, 2026',
    // No minutes field here on purpose. The desk adds up the stations you left
    // switched on below and prints that total itself, so the masthead can never
    // promise forty five minutes while the page holds seventy.
    deck:     'Ten minutes of headlines tells you what happened. An hour of headlines read like a historian tells you what is changing. Today you work the wire the way a historian works an archive: read across sources, notice the words people choose, and place today inside a story that started long before you.'
  },

  /* ── 2. STATIONS THAT RUN THIS WEEK ────────────────────────────────────────
     Delete a line to switch a station off, uncomment one to switch it on, and
     reorder freely. The page renumbers itself and recalculates the time budget,
     so you never have to keep anything in sync by hand.

     The seven below run about fifty minutes. Cut two for a short period. All
     nine is closer to seventy, which is a block, not a class.

       frontpage    The Front Page Test, sourcing across four outlets
       beats        Work the Beats, one story per AP World theme
       briefing     Editor's Briefing, the articles you pinned below. With
                    nothing pinned it becomes The Editor's Chair instead.
       hook         The Historian's Hook, continuity and change
       causation    Trace It Back, Trace It Forward
       reliability  The Reliability Check, lateral reading
       pulse        The Culture Pulse, charts and box office
       local        Local and Odd
       desk         Your Desk, student's own story

     Rotating which stations run is the thing that keeps this from becoming the
     same worksheet thirty times. Skills stay; the shape changes.              */
  stations: [
    'frontpage',
    'beats',
    'briefing',
    'hook',
    // 'causation',
    // 'reliability',
    'pulse',
    'local',
    'desk'
  ],

  /* ── 3. THIS WEEK'S BEATS ──────────────────────────────────────────────────
     Which AP World themes students must find a story for. Two or three is the
     right number. Rotating them week to week is what keeps this from turning
     into the same worksheet nine times.

     Valid keys: GOV, ECN, CDI, TEC, ENV, SIO                                 */
  beats: ['GOV', 'ECN', 'TEC'],

  /* ── 3b. THE FOUR FRONT PAGES ──────────────────────────────────────────────
     Which outlets students compare in the Front Page Test. Keep one non US
     outlet on this list every single week: the whole point of the station
     collapses if all four desks sit in the same country. Names must match a
     name in  outlets  below.                                                 */
  frontPage: ['CNN', 'Fox News', 'Reuters', 'Al Jazeera'],

  /* ── 4. PINNED ARTICLES, OPTIONAL ──────────────────────────────────────────
     This is the old "Click HERE and read this article" block. Leave the array
     empty and the Editor's Briefing station tells students the desk is running
     open wire today, which is a perfectly good class. Add entries and it
     becomes a directed reading.

     Each entry needs  source, title, url, question.  skill is optional and
     just prints a tag.

     Example:
       {
         source:   'Reuters',
         title:    'Headline exactly as it appears',
          url:     'https://www.reuters.com/...',
         skill:    'Causation',
         question: 'What changed this week, and who has the most to lose from it?'
       },                                                                     */
  pinned: [],

  /* ── 5. LOCAL PAPER ────────────────────────────────────────────────────────
     Confirm these load before class. Local news sites move more often than
     the national wire does. The Google News search is the safety net: it
     cannot go stale.                                                         */
  local: [
    { name: 'Zionsville Times Sentinel', url: 'https://www.timessentinel.com/', note: 'Zionsville paper of record' },
    { name: 'Current in Zionsville',     url: 'https://youarecurrent.com/category/zionsville/', note: 'Community coverage' },
    { name: 'Google News, Zionsville',   url: 'https://news.google.com/search?q=Zionsville%20Indiana', note: 'Always works, use if a link above is dead' }
  ],

  /* ── 6. THE WIRE DECK ──────────────────────────────────────────────────────
     The launch buttons at the top of the page. Stable homepages on purpose:
     an article link rots in a week, a homepage does not. Add or remove freely.
     Anything with  group: 'chart'  shows up under the Culture Pulse instead. */
  outlets: [
    { name: 'CNN',        url: 'https://www.cnn.com',            note: 'US cable, center left' },
    { name: 'Fox News',   url: 'https://www.foxnews.com',        note: 'US cable, right' },
    { name: 'Reuters',    url: 'https://www.reuters.com',        note: 'UK wire service' },
    { name: 'AP News',    url: 'https://apnews.com',             note: 'US wire service' },
    { name: 'NPR',        url: 'https://www.npr.org',            note: 'US public radio' },
    { name: 'BBC News',   url: 'https://www.bbc.com/news',       note: 'UK public broadcaster' },
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com',      note: 'Qatar, non Western desk' },
    { name: 'The Guardian', url: 'https://www.theguardian.com/international', note: 'UK, left' },
    { name: 'Google News', url: 'https://news.google.com',       note: 'Aggregator, good for a beat search' },

    { name: 'Billboard Hot 100', url: 'https://www.billboard.com/charts/hot-100/',  note: 'Charts', group: 'chart' },
    { name: 'NYT Best Sellers',  url: 'https://www.nytimes.com/books/best-sellers/', note: 'Books', group: 'chart' },
    { name: 'Box Office Mojo',   url: 'https://www.boxofficemojo.com/weekend/',      note: 'Weekend gross', group: 'chart' }
  ]
};
