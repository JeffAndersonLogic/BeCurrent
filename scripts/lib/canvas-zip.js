/**
 * canvas-zip.js
 *
 * Reads a Canvas "Download Submissions" zip with no library.
 *
 * WHY NOT A LIBRARY
 *
 * The Skills Lens is a single self-contained file a teacher downloads once and
 * double-clicks. It has no build step at the teacher's end, no npm, and a
 * Content-Security-Policy of `default-src 'none'`, so it cannot pull a script
 * from a CDN even if that were a good idea. Inlining a general-purpose zip
 * library would add a few hundred kilobytes of code handling encryption, spanned
 * archives and ZIP64 for an input that is always one Canvas export.
 *
 * The whole format we need is: find the central directory at the end, walk its
 * entries, and inflate each one. `DecompressionStream('deflate-raw')` does the
 * actual decompression, and it is native in every browser this runs in and in
 * Node 18 and up, so the same code is testable offline.
 *
 * WHY THE CENTRAL DIRECTORY AND NOT THE LOCAL HEADERS
 *
 * A local file header may carry zeros for the sizes and set bit 3, deferring the
 * real numbers to a data descriptor that sits *after* the compressed bytes. That
 * is what a zip written by a streaming writer looks like, and Canvas generates
 * its export on the fly. Reading local headers means guessing where an entry
 * ends. The central directory always has the true sizes, so it is the only
 * honest place to read from.
 *
 * Pure and isomorphic: bytes in, {name, text} out. No fs, no DOM, no network.
 */

'use strict';

(function (root, factory) {
  const API = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.BEHISTORICAL_CANVAS_ZIP = API;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {

const EOCD_SIG = 0x06054b50;   // end of central directory
const CDH_SIG  = 0x02014b50;   // central directory file header
const LFH_SIG  = 0x04034b50;   // local file header
const ZIP64_EOCD_LOCATOR_SIG = 0x07064b50;

function u16(v, at) { return v.getUint16(at, true); }
function u32(v, at) { return v.getUint32(at, true); }

// The EOCD is last, but a zip comment can follow it, so it has to be searched
// for backwards. The comment length field is 16 bits, hence the 64KB window.
function findEocd(view) {
  const max = Math.min(view.byteLength, 0xffff + 22);
  for (let i = 22; i <= max; i++) {
    const at = view.byteLength - i;
    if (u32(view, at) === EOCD_SIG) return at;
  }
  return -1;
}

class ZipError extends Error {
  constructor(message, hint) {
    super(message);
    this.name = 'ZipError';
    this.hint = hint || '';
  }
}

/**
 * Lists what is in the archive without decompressing anything.
 * Returns [{ name, compressedSize, size, method, offset }].
 */
function listEntries(bytes) {
  const buf = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (buf.byteLength < 22) {
    throw new ZipError('This file is too small to be a zip archive.',
      'Check that the download finished.');
  }
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);

  const eocd = findEocd(view);
  if (eocd === -1) {
    // A .zip that is really a folder, or a half-finished download, both land here.
    throw new ZipError('This does not look like a zip archive.',
      'Canvas gives you the zip from Assignment then Download Submissions. If you already unzipped it, drop the responses.csv instead.');
  }

  let count = u16(view, eocd + 10);
  let cdOffset = u32(view, eocd + 16);

  // ZIP64 only shows up past 65535 entries or 4GB, neither of which a class set
  // reaches. Say so plainly instead of reading garbage offsets.
  if (count === 0xffff || cdOffset === 0xffffffff) {
    const locAt = eocd - 20;
    if (locAt >= 0 && u32(view, locAt) === ZIP64_EOCD_LOCATOR_SIG) {
      throw new ZipError('This is a ZIP64 archive, which this reader does not handle.',
        'Run scripts/parse-canvas-submissions.js on the unzipped folder instead.');
    }
  }

  const entries = [];
  let at = cdOffset;
  for (let i = 0; i < count; i++) {
    if (at + 46 > buf.byteLength || u32(view, at) !== CDH_SIG) {
      throw new ZipError(`The zip directory is damaged at entry ${i + 1} of ${count}.`,
        'Try downloading the submissions again.');
    }
    const method = u16(view, at + 10);
    const compressedSize = u32(view, at + 20);
    const size = u32(view, at + 24);
    const nameLen = u16(view, at + 28);
    const extraLen = u16(view, at + 30);
    const commentLen = u16(view, at + 32);
    const offset = u32(view, at + 42);
    const name = new TextDecoder('utf-8').decode(buf.subarray(at + 46, at + 46 + nameLen));
    entries.push({ name, method, compressedSize, size, offset });
    at += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

// The local header's name and extra lengths are the only fields we trust from
// it; everything else came from the central directory.
function payloadOf(buf, view, entry) {
  const at = entry.offset;
  if (at + 30 > buf.byteLength || u32(view, at) !== LFH_SIG) {
    throw new ZipError(`Could not locate "${entry.name}" inside the archive.`,
      'Try downloading the submissions again.');
  }
  const nameLen = u16(view, at + 26);
  const extraLen = u16(view, at + 28);
  const from = at + 30 + nameLen + extraLen;
  return buf.subarray(from, from + entry.compressedSize);
}

async function inflateRaw(bytes) {
  if (typeof DecompressionStream !== 'function') {
    throw new ZipError('This browser cannot decompress zip files.',
      'Unzip the download yourself and drop responses.csv, or use a current Chrome, Edge, Firefox or Safari.');
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

const MAX_SNIFF_BYTES = 8 * 1024 * 1024;   // no single submission is this large

async function readOne(buf, view, entry) {
  const raw = payloadOf(buf, view, entry);
  if (entry.method === 0) return new TextDecoder('utf-8').decode(raw);
  if (entry.method === 8) return new TextDecoder('utf-8').decode(await inflateRaw(raw));
  throw new ZipError(`compression method ${entry.method}`, '');
}

/**
 * Reads the submissions out of an archive and decodes them as UTF-8 text.
 *
 * opts.accept(name)  fast path: which entry names look like submissions
 * opts.sniff(text)   rescue path: does this content look like a submission,
 *                    whatever it is called
 * opts.onProgress(done, total)  a class set is 30 inflate calls and a silent
 *                    page looks hung
 *
 * WHY THERE IS A RESCUE PATH
 *
 * The first version filtered on the filename alone and reported "1 entry, none
 * of them a .html or .txt submission file" on a real Canvas download whose one
 * entry parsed perfectly once extracted by hand. Gating on a filename convention
 * means trusting a convention nobody promised us, and the whole point of the
 * record manifest is that a submission says what it is from the inside. So if
 * the name filter finds nothing, every entry gets opened and asked.
 *
 * The fast path stays first because on a real class set it avoids inflating
 * whatever else a teacher happened to zip up.
 *
 * Returns { files, skipped, entries, total, rescued }. `entries` is every name
 * in the archive, so a caller that finds nothing can say what was actually in
 * there rather than leaving the teacher to guess.
 */
async function readTextEntries(bytes, opts) {
  const o = typeof opts === 'function' ? { accept: opts } : (opts || {});
  const buf = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const all = listEntries(buf);

  const real = all.filter(e => !e.name.endsWith('/'));
  const named = o.accept ? real.filter(e => o.accept(e.name)) : real.slice();

  const files = [];
  const skipped = [];
  let rescued = false;

  const take = async (list) => {
    for (let i = 0; i < list.length; i++) {
      try { files.push({ name: list[i].name, text: await readOne(buf, view, list[i]) }); }
      catch (e) { skipped.push({ name: list[i].name, why: e.message }); }
      if (o.onProgress) o.onProgress(i + 1, list.length);
    }
  };

  await take(named);

  // Nothing matched by name. Open everything and let the content decide.
  if (!files.length && o.sniff) {
    const rest = real.filter(e => named.indexOf(e) === -1 && e.size <= MAX_SNIFF_BYTES);
    for (let i = 0; i < rest.length; i++) {
      let text = null;
      try { text = await readOne(buf, view, rest[i]); } catch (e) { text = null; }
      if (text !== null && o.sniff(text)) { files.push({ name: rest[i].name, text: text }); rescued = true; }
      if (o.onProgress) o.onProgress(i + 1, rest.length);
    }
  }

  // Whatever was present and not taken is reported, never silently dropped.
  const taken = new Set(files.map(f => f.name).concat(skipped.map(s => s.name)));
  real.forEach(e => {
    if (!taken.has(e.name)) skipped.push({ name: e.name, why: 'not a Canvas text submission' });
  });

  return { files, skipped, entries: all.map(e => e.name), total: all.length, rescued };
}

return { listEntries, readTextEntries, readOne, inflateRaw, ZipError, MAX_SNIFF_BYTES };

});
