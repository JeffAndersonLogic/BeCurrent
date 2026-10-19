'use strict';
// Photographs for the Midterms pages: one registry, so every picture carries its
// credit and licence wherever it renders. Files are local, under
// assets/images/midterms/, resized from the originals linked in `source`
// (Wikimedia Commons, NASA, the Library of Congress). Every picture is public
// domain; if a CC BY picture is ever added, its credit must name the author and
// licence.
const PHOTOS={
 'capitol-west':{file:'capitol-west-front.webp',w:1600,h:828,
  alt:'The west front of the United States Capitol under a blue sky, with the Senate wing on the left and the House wing on the right.',
  caption:'The Capitol has two wings because Congress has two chambers: the Senate meets in the north wing, the House in the south.',
  credit:'Architect of the Capitol, public domain, via Wikimedia Commons',
  source:'https://commons.wikimedia.org/wiki/File:United_States_Capitol_west_front_edit2.jpg'},
 'house-chamber':{file:'house-chamber.webp',w:1080,h:566,
  alt:'The empty chamber of the U.S. House of Representatives: curved rows of seats facing the Speaker’s rostrum and the flag.',
  caption:'The House chamber. The party that holds most of these 435 voting seats usually elects the Speaker and chairs every committee.',
  credit:'U.S. House of Representatives, public domain, via Wikimedia Commons',
  source:'https://commons.wikimedia.org/wiki/File:United_States_House_of_Representatives_chamber.jpg'},
 'committee-hearing':{file:'senate-committee-hearing.webp',w:1600,h:729,
  alt:'A witness answers questions at a long table during a Senate committee hearing, with staff seated behind him.',
  caption:'A Senate committee hearing in May 2023. A witness, here NASA’s administrator, answers senators’ questions about a budget before anything reaches a floor vote.',
  credit:'NASA/Bill Ingalls, public domain',
  source:'https://images.nasa.gov/details/NHQ202305160005'},
 'white-house':{file:'white-house-north.webp',w:1600,h:1048,
  alt:'The north front of the White House, with its columned portico, fountain and flag.',
  caption:'The White House. The president is not on the 2026 ballot, but the Congress voters choose can check what the president proposes.',
  credit:'Carol M. Highsmith, Library of Congress, public domain',
  source:'https://www.loc.gov/item/2011632870/'},
 'capitol-dusk':{file:'capitol-dusk.webp',w:1600,h:1280,
  alt:'The U.S. Capitol dome lit up at dusk above the city of Washington.',
  caption:'The Capitol at dusk. On November 3, voters choose all 435 voting House members and about a third of the Senate.',
  credit:'Carol M. Highsmith, Library of Congress, public domain',
  source:'https://www.loc.gov/item/2011630699/'},
 'indiana-statehouse':{file:'indiana-statehouse-night.webp',w:1024,h:648,
  alt:'The Indiana Statehouse in Indianapolis, lit at night, with trees on either side of its front steps.',
  caption:'The Indiana Statehouse in Indianapolis. A news race call is not the official result: state election officials count, canvass and certify the vote.',
  credit:'Carol M. Highsmith, Library of Congress, public domain',
  source:'https://www.loc.gov/item/2016632124/'},
 'newspaper':{file:'small-town-newspaper.webp',w:1600,h:1200,
  alt:'A publisher sits at a vintage linotype machine in a cluttered small-town newspaper office.',
  caption:'Every message has a maker. The publisher of a weekly newspaper in Saguache, Colorado, sets type on a linotype machine. Before you believe a claim, ask who made it and what evidence it rests on.',
  credit:'Carol M. Highsmith, Library of Congress, public domain',
  source:'https://www.loc.gov/item/2017885503/'}
};
// Where each picture appears. `hero` sits beside the title. `chapters` maps a
// chapter index (0 Predict … 4 File) to one picture or a pair shown side by side.
const PLACEMENT={
 unit:{hero:'capitol-dusk'},
 1:{hero:'capitol-west',chapters:{1:'house-chamber'}},
 2:{hero:'house-chamber',chapters:{2:'committee-hearing'}},
 3:{hero:'white-house',chapters:{2:'capitol-west'}},
 4:{hero:'newspaper'},
 5:{hero:'indiana-statehouse'}
};
function photo(key){const p=PHOTOS[key];if(!p)throw new Error('midterms-images: no photo named '+key);return p;}
module.exports={PHOTOS,PLACEMENT,photo};
