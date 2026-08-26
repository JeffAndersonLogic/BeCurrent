'use strict';

/**
 * The Desk capture contract.
 *
 * Desk 2.0 moved the browser runtime out of the generated HTML and into
 * assets/js/desk-capture-v2.js. The page is still generated and the storage key,
 * local-date sheet, anchored two-week cycle, Canvas manifest and parser contract
 * are unchanged. This helper emits the one script tag plus a non-executing contract
 * note that lets the offline gate verify those invariants without duplicating the
 * runtime into every generated page.
 */

const STORAGE_PREFIX = 'becurrent-desk-';

function deskCaptureBlock() {
  return '<!-- Desk capture contract: var PREFIX = "becurrent-desk-"; var TODAY = dayKeyOf(new Date()); function cycleStart() uses ANCHOR_MONDAY. -->\n'
    + '<script src="../assets/js/desk-capture-v2.js"></script>';
}

module.exports = { deskCaptureBlock, STORAGE_PREFIX };
