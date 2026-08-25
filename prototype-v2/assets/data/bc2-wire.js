/* =========================================================
   THE CURRENT WIRE — manually curated, deliberately

   Three to five headlines. Five minutes to update. No API.

   WHY THERE IS NO LIVE FEED, written down so nobody helpfully adds one:
   an automatic feed brings rate limits, dead links, licensing questions,
   and — the one that actually matters — unvetted stories appearing on a
   screen in a room full of ninth graders with no adult between the feed
   and the projector. A teacher pasting four headlines a week keeps
   editorial control and costs less than debugging a feed reader.

   BeCurrent is not trying to become a news organisation. The wire exists
   so the room feels live, and that is the whole job.

   TO UPDATE: replace the entries, set `checked` to today, save. Keep
   `headline` to the outlet's own wording. Do not paraphrase a headline
   into something snappier — this is a course about what outlets actually
   published.
   ========================================================= */
(function () {
  'use strict';

  window.BC_CURRENT_WIRE = {
    checked: '2026-08-25',
    items: [
      { source: 'CNBC',
        headline: 'Iran warns of Hormuz ship seizures ahead of sanctions push',
        url: 'https://www.cnbc.com/2026/08/24/us-iran-war-trump-hormuz-bessent-economic-sanctions-.html',
        date: 'Aug 24' },
      { source: 'CNN',
        headline: 'Bessent promises "economic D-Day" ahead of expected Iran sanctions',
        url: 'https://www.cnn.com/2026/08/23/world/live-news/iran-war-trump',
        date: 'Aug 23' },
      { source: 'NBC News',
        headline: 'US, Iran keep up hostile rhetoric ahead of new sanctions',
        url: 'https://www.nbcnews.com/world/iran/us-iran-keep-hostile-rhetoric-ahead-new-sanctions-rcna593870',
        date: 'Aug 22' },
      { source: 'CFR',
        headline: 'Global Conflict Tracker: Iran’s war with Israel and the United States',
        url: 'https://www.cfr.org/global-conflict-tracker/conflict/confrontation-between-united-states-and-iran',
        date: 'Updated' }
    ]
  };
})();
