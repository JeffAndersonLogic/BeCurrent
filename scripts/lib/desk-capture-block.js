'use strict';

/**
 * The Desk capture contract.
 *
 * Desk 2.0 moved the browser runtime out of the generated HTML and into
 * assets/js/desk-capture-v2.js. The page is still generated and the storage key,
 * two-week cycle, Canvas manifest and parser contract are unchanged; this module
 * now names the single script tag that every generated Desk page must carry.
 *
 * Keeping this helper matters because validate.js uses the same function as the
 * renderer contract: if the page ever points at a different capture runtime, the
 * offline gate fails. Browser behavior is covered end-to-end by desk.test.js.
 */

const STORAGE_PREFIX = 'becurrent-desk-';

function deskCaptureBlock() {
  return '<script src="../assets/js/desk-capture-v2.js"></script>';
}

module.exports = { deskCaptureBlock, STORAGE_PREFIX };
