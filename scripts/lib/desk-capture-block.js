'use strict';

/**
 * The Desk capture contract.
 *
 * Desk 2.0 moved the browser runtime out of generated HTML and into
 * assets/js/desk-capture-v2.js. The storage key, local-date sheet, anchored
 * two-week cycle, Canvas manifest and parser behavior stay covered by the same
 * browser contract. validate.js uses this helper to require the runtime on every
 * generated Desk page.
 */

const STORAGE_PREFIX = 'becurrent-desk-';

function deskCaptureBlock() {
  return '<script src="../assets/js/desk-capture-v2.js"></script>';
}

module.exports = { deskCaptureBlock, STORAGE_PREFIX };
