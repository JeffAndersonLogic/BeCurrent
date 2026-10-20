/* BeCurrent section photographs.
 *
 * The daily news file often has no photograph for the lead, and a news page with
 * no pictures does not read as one. When the story brings its own photograph,
 * that always wins. When it does not, the lead gets a FILE PHOTO for its section,
 * chosen by category, and the caption says plainly that it is a file photo and
 * not from the story. Presenting a section photo as if it were the story's would
 * be exactly the fabrication this course teaches students to catch.
 *
 * Every picture here is a local copy of a public-domain image (U.S. military via
 * DVIDS, NASA, Library of Congress), so a student page makes no third-party
 * request for it. `src` is relative to the site root; callers add their own
 * prefix ('' on the front door and the board, '../' on the Desk).
 */
(function () {
  'use strict';

  var PHOTOS = {
    democracy: {
      src: 'assets/images/midterms/capitol-dusk.webp',
      alt: 'The U.S. Capitol dome lit up at dusk above Washington.',
      shows: 'the U.S. Capitol at dusk',
      credit: 'Carol M. Highsmith, Library of Congress, public domain',
      creditUrl: 'https://www.loc.gov/item/2011630699/'
    },
    security: {
      src: 'assets/images/home/hormuz-transit.webp',
      alt: 'A sailor scans the water from a U.S. Navy cruiser as it transits the Strait of Hormuz.',
      shows: 'a U.S. Navy cruiser in the Strait of Hormuz, 2021',
      credit: 'U.S. Navy photo by Seaman Chelsea Palmer, public domain, via DVIDS',
      creditUrl: 'https://www.dvidshub.net/image/6640102'
    },
    technology: {
      src: 'assets/images/home/cyber-operations.webp',
      alt: 'People work at desks in front of a wall of screens in a cyber operations center.',
      shows: 'a U.S. Cyber Command operations center, 2021',
      credit: 'U.S. Cyber Command, public domain, via DVIDS',
      creditUrl: 'https://www.dvidshub.net/image/6762560'
    },
    economy: {
      src: 'assets/images/home/container-port.webp',
      alt: 'Two container ships stacked with containers at a port, under tall cranes.',
      shows: 'container ships at the Port of Charleston, 2022',
      credit: 'U.S. Army photo by Patrick Bloodgood, public domain, via DVIDS',
      creditUrl: 'https://www.dvidshub.net/image/7443803'
    },
    media: {
      src: 'assets/images/home/press-briefing.webp',
      alt: 'A press secretary answers questions at a podium beside an American flag.',
      shows: 'a Pentagon press briefing, 2021',
      credit: 'DoD photo by Lisa Ferdinando, public domain, via DVIDS',
      creditUrl: 'https://www.dvidshub.net/image/6528659'
    },
    world: {
      src: 'assets/images/home/blue-marble.webp',
      alt: 'The Earth seen from space, with clouds over the oceans and continents.',
      shows: 'NASA’s Blue Marble image of the Earth',
      credit: 'NASA Goddard Space Flight Center / Reto Stöckli, public domain',
      creditUrl: 'https://images.nasa.gov/details/GSFC_20171208_Archive_e002131'
    }
  };

  // Order matters: "World / Security" is a security story before it is a world one.
  var RULES = [
    ['security', /secur|war|militar|defen|conflict|attack|strike/i],
    ['technology', /tech|cyber|\bai\b|artificial|digital|internet|science/i],
    ['economy', /econom|trade|tariff|business|market|money|jobs/i],
    ['media', /media|press|journalis|news literacy/i],
    ['democracy', /democra|election|congress|politic|court|government|u\.s\./i]
  ];

  function forCategory(category) {
    var text = String(category || '');
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][1].test(text)) return PHOTOS[RULES[i][0]];
    }
    return PHOTOS.world;
  }

  // "File photo: the U.S. Capitol at dusk. Not from this story."
  function caption(photo) {
    return 'File photo: ' + photo.shows + '. Not from this story.';
  }

  window.BECURRENT_SECTION_PHOTOS = { photos: PHOTOS, forCategory: forCategory, caption: caption };
})();
