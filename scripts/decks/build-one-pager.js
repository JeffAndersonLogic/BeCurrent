'use strict';

/**
 * The teaching sheet for Social Media Topics 5 and 6, rendered to a printable PDF.
 *
 *   npm i playwright-core
 *   node scripts/decks/build-one-pager.js
 *
 * Source is one-pager-topics-05-06.html beside this file. That file is written to
 * be published as an Artifact as well, so it carries no doctype, html, head or
 * body wrapper and links the brand faces from Google Fonts. Both are deliberate.
 *
 * TWO THINGS THIS SCRIPT DOES THAT MATTER.
 *
 * It inlines the fonts. Chromium in a sandbox generally cannot reach
 * fonts.googleapis.com, so rendering the page as-is produces a PDF set in
 * Georgia and Helvetica with the brand faces named but never loaded. That is not
 * only uglier, it makes the page-count check below a lie: Source Serif 4 and
 * Georgia set the same words to different widths, so a sheet that fits in the
 * fallback can overflow in the real thing, and the reverse. curl does get through
 * the proxy, so the faces are fetched here, subset to latin, and injected as data
 * URIs before the PDF is written. Same trap as BeHistorical's font-dependent
 * reflow check: a measurement taken against substituted fonts reports
 * confidently about a page nobody will ever see.
 *
 * It refuses to write two pages. One page is the whole contract of a sheet you
 * hold while teaching, and page two of a one-pager is the page you do not notice
 * is missing until you are standing in front of the room.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SRC = path.join(__dirname, 'one-pager-topics-05-06.html');
const OUT = path.join(__dirname, '..', '..', 'social-media', 'decks', 'one-pager-topics-05-06.pdf');
const CHROMIUM = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';
const FONT_CSS = 'https://fonts.googleapis.com/css2'
  + '?family=Source+Sans+3:ital,wght@0,400;0,600;0,700;0,800;1,400'
  + '&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap';
// Google serves a different CSS per browser; without a modern UA it returns the
// truetype fallback sheet, which is four times the size for no gain.
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) '
  + 'Chrome/120.0.0.0 Safari/537.36';

function get(url, binary) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, res => {
      if (res.statusCode !== 200) { reject(new Error(url + ' returned ' + res.statusCode)); return; }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(binary ? Buffer.concat(chunks) : Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

/** Fetch the two brand faces and return one <style> worth of @font-face rules,
 *  latin only, every woff2 inlined as a data URI. */
async function inlineFonts() {
  const css = await get(FONT_CSS, false);
  const blocks = css.split('@font-face').slice(1)
    .map(b => '@font-face' + b.slice(0, b.indexOf('}') + 1))
    // The sheet is English with typographic punctuation. Latin and latin-ext
    // cover it; the Cyrillic, Greek and Vietnamese subsets are dead weight in a
    // data URI.
    .filter(b => /unicode-range:\s*U\+0000-00FF/.test(b) || /unicode-range:\s*U\+0100-02[AB]F/.test(b));
  if (!blocks.length) throw new Error('no latin @font-face blocks in the Google Fonts CSS');

  let out = '';
  for (const block of blocks) {
    const m = block.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/);
    if (!m) continue;
    const woff2 = await get(m[1], true);
    out += block.replace(m[0], 'url(data:font/woff2;base64,' + woff2.toString('base64') + ')') + '\n';
  }
  return out;
}

(async () => {
  const skipFonts = process.argv.includes('--no-fonts');
  let fontCss = '';
  if (skipFonts) {
    console.warn('WARNING: --no-fonts. The PDF will be set in the fallback faces and the '
      + 'one-page check below is measuring a sheet nobody will print.');
  } else {
    process.stdout.write('fetching the brand faces... ');
    fontCss = await inlineFonts();
    console.log(Math.round(fontCss.length / 1024) + 'KB inlined');
  }

  const { chromium } = require('playwright-core');
  const browser = await chromium.launch({ executablePath: CHROMIUM });
  try {
    const page = await browser.newPage();
    await page.goto('file://' + SRC, { waitUntil: 'load' });
    if (fontCss) await page.addStyleTag({ content: fontCss });
    await page.evaluate(() => document.fonts.ready);

    // document.fonts.check() answers "could this render", and a browser with no
    // network says yes because it can render in a fallback. Metrics are the only
    // honest signal: same string, webfont stack against a stack the webfont is
    // not in, and identical widths mean the face never applied.
    if (fontCss) {
      const applied = await page.evaluate(() => {
        const w = stack => {
          const s = document.createElement('span');
          s.style.cssText = 'position:absolute;visibility:hidden;font-size:96px;font-family:' + stack;
          s.textContent = 'Handgloves 126,000';
          document.body.appendChild(s);
          const width = s.getBoundingClientRect().width;
          s.remove();
          return width;
        };
        return { sans: w('"Source Sans 3",monospace') !== w('monospace'),
                 serif: w('"Source Serif 4",monospace') !== w('monospace') };
      });
      if (!applied.sans || !applied.serif) {
        throw new Error('the inlined faces did not apply: ' + JSON.stringify(applied));
      }
    }

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    await page.pdf({ path: OUT, format: 'Letter', printBackground: true,
      margin: { top: '0.32in', bottom: '0.32in', left: '0.32in', right: '0.32in' } });
  } finally {
    await browser.close();
  }

  // Page count, from the PDF itself rather than from a guess about the layout.
  const pdf = fs.readFileSync(OUT, 'latin1');
  const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log('wrote ' + OUT + ' (' + pages + ' page' + (pages === 1 ? '' : 's') + ')');
  if (pages !== 1) {
    throw new Error('a one-pager came out ' + pages + ' pages. Cut content or tighten the sheet; '
      + 'do not ship page two.');
  }
})().catch(e => { console.error('\n' + e.message); process.exit(1); });
