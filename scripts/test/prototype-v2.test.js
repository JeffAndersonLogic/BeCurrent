#!/usr/bin/env node
'use strict';

/**
 * The BeCurrent 2.0 prototype, driven in a real browser.
 *
 * validate.js asserts the source shape of the prototype — that it carries no
 * capture channel, is unlinked from the live site, and does not touch production
 * storage keys. It cannot see any of the things below, all of which are what a
 * student actually meets:
 *
 *   - The Reverse History timeline is operable from the keyboard. It is the
 *     signature interaction and it is a custom control, which is exactly the
 *     shape of thing that ships mouse-only. Arrow keys move, Enter opens, Home
 *     and End jump, and the roving tabindex leaves exactly one stop in the tab
 *     order rather than seven.
 *   - Writing survives a reload. The whole My Work surface is a lie if it does
 *     not, and localStorage failures are silent by nature.
 *   - The prediction written before the history is what comes back at the end.
 *     That loop IS Reverse History; if it breaks, the lesson quietly becomes an
 *     ordinary reading with a quiz on it.
 *   - Nothing scrolls sideways at 320px, and the page still works at the
 *     Chromebook viewport the whole course is taught on.
 *
 * ON THE FONT MEASUREMENT, which is the trap this file exists to avoid:
 * reflow is a WIDTH test, and Playfair Display is far wider than the Georgia
 * fallback at display sizes. A run that cannot reach the font host measures
 * Georgia and reports a confident green about a page no student will ever see.
 * So the 320px pass fetches the real woff2 out of band, registers it from the
 * bytes with FontFace, and blocks the network for everything else. Where the
 * font genuinely cannot be fetched the pass SKIPS, loudly, and a skip here means
 * "not tested" and never "fine".
 *
 * Exits 2 when playwright-core is absent, which run-tests.js reports as SKIP.
 * Pass --strict in CI to make a skip a failure.
 *
 *   node scripts/test/prototype-v2.test.js
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m', D = '\x1b[2m', X = '\x1b[0m';

if (!fs.existsSync(path.join(ROOT, 'prototype-v2'))) {
  console.log(`${Y}  SKIP  prototype-v2/ is not present${X}`);
  process.exit(2);
}

let chromium;
try {
  chromium = require('playwright-core').chromium;
} catch (e) {
  console.log(`${Y}  SKIP  playwright-core is not installed: npm i playwright-core${X}`);
  process.exit(2);
}

const results = [];
let skipped = 0;
function check(name, pass, detail) {
  results.push(pass);
  console.log(`  ${pass ? G + 'PASS' + X : R + 'FAIL' + X}  ${name}${detail ? D + '  (' + detail + ')' + X : ''}`);
}
function skip(name, why) {
  skipped++;
  console.log(`  ${Y}SKIP${X}  ${name}${why ? D + '  (' + why + ')' + X : ''}`);
}
function group(title) { console.log(`\n  ${D}${title}${X}`); }

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml'
};

function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const requested = pathname.endsWith('/') ? pathname + 'index.html' : pathname;
      const target = path.resolve(ROOT, '.' + requested);
      if (!target.startsWith(ROOT + path.sep)) { res.writeHead(403).end(); return; }
      fs.readFile(target, (err, body) => {
        if (err) { res.writeHead(404).end(); return; }
        res.writeHead(200, {
          'Content-Type': TYPES[path.extname(target).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': 'no-store'
        });
        res.end(body);
      });
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function chromiumPath() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!fs.existsSync(base)) return undefined;
  const builds = fs.readdirSync(base)
    .filter(d => /^chromium-\d+$/.test(d))
    .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]));
  for (const b of builds) {
    for (const layout of ['chrome-linux64', 'chrome-linux']) {
      const p = path.join(base, b, layout, 'chrome');
      if (fs.existsSync(p)) return p;
    }
  }
  return undefined;
}

/** Fetch a URL to a Buffer, following redirects. Used only for the font. */
function fetchBuffer(url, depth) {
  return new Promise((resolve, reject) => {
    if ((depth || 0) > 4) return reject(new Error('too many redirects'));
    // The User-Agent is load-bearing, not politeness. The Google Fonts CSS API
    // serves a DIFFERENT stylesheet per agent: ask without a modern browser UA
    // and it returns TTF urls, so the woff2 match below finds nothing and the
    // whole reflow pass skips for a reason that looks like a network failure.
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
        + '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    };
    https.get(url, { timeout: 12000, headers }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(fetchBuffer(res.headers.location, (depth || 0) + 1));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject).on('timeout', function () { this.destroy(new Error('timeout')); });
  });
}

/**
 * Get the real Playfair Display woff2, out of band.
 *
 * document.fonts.check() is NOT a usable signal here: it answers "can this
 * string be rendered in that family", and a browser with no network answers yes
 * because it can render it in a fallback. Fetching the bytes ourselves is the
 * only honest way to know we are measuring the display face.
 */
async function playfairBytes() {
  const css = String(await fetchBuffer(
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&display=swap'));

  // TAKE THE LATIN SUBSET, not simply the first woff2 in the file.
  //
  // Google serves one @font-face per subset and orders them cyrillic-ext,
  // cyrillic, greek, vietnamese, latin-ext, latin — so the FIRST url is
  // Cyrillic, which contains no Latin glyphs at all. Injecting it renders
  // "Industrialization" in the fallback anyway, the width comparison finds no
  // difference, and the reflow pass skips itself reporting "the face did not
  // apply". That looked like a network problem and was a parsing bug.
  const blocks = css.split('@font-face').filter(b => /url\(https:[^)]+\.woff2\)/.test(b));
  const latin = blocks.find(b => /unicode-range:[^;]*U\+0000/i.test(b)) || blocks[blocks.length - 1];
  if (!latin) throw new Error('no woff2 in the stylesheet');

  const m = latin.match(/url\((https:[^)]+\.woff2)\)/);
  if (!m) throw new Error('no woff2 url in the latin block');
  return fetchBuffer(m[1]);
}

(async () => {
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/prototype-v2`;
  const browser = await chromium.launch({ executablePath: chromiumPath(), args: ['--no-sandbox'] });

  // Fetched once, before the browser work, so a slow font host does not
  // interleave with the interaction assertions.
  let fontBuf = null, fontWhy = '';
  try { fontBuf = await playfairBytes(); }
  catch (e) { fontWhy = (e && e.message) || 'unreachable'; }

  try {
    const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });

    /* ── The timeline, from the keyboard ─────────────────────────────── */
    group('Reverse History timeline, keyboard');
    {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(`${base}/investigation-iran.html`, { waitUntil: 'load' });

      const tabs = page.locator('[role="tab"]');
      check('the timeline renders a tab per turning point', await tabs.count() === 7,
        (await tabs.count()) + ' nodes');

      check('today is selected on arrival, and is the leftmost node',
        await tabs.first().getAttribute('aria-selected') === 'true');

      // A roving tabindex means ONE stop in the tab order, not seven. This is
      // the difference between a control a keyboard user can pass through and
      // one they have to escape.
      const stops = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="tab"]'))
          .filter(t => t.getAttribute('tabindex') === '0').length);
      check('exactly one timeline node is in the tab order', stops === 1, stops + ' stops');

      await tabs.first().focus();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      const focusedYear = await page.evaluate(() =>
        document.activeElement.querySelector('.rh-year').textContent);
      check('arrow right moves further back in time', focusedYear === '2018', 'landed on ' + focusedYear);

      // Moving focus must NOT open a panel: manual activation is what keeps a
      // screen reader from having a paragraph read at it on every keypress.
      check('arrowing alone does not open a panel',
        await tabs.nth(2).getAttribute('aria-selected') === 'false');

      await page.keyboard.press('Enter');
      check('enter opens the focused turning point',
        await tabs.nth(2).getAttribute('aria-selected') === 'true');

      const heading = await page.locator('#rh-panel h3').textContent();
      check('the panel shows that node, not another', /withdraw/i.test(heading), heading.slice(0, 44));

      await page.keyboard.press('End');
      const endYear = await page.evaluate(() =>
        document.activeElement.querySelector('.rh-year').textContent);
      check('End jumps to the oldest node', endYear === '1953', 'landed on ' + endYear);

      await page.keyboard.press('Enter');
      const panelText = await page.locator('#rh-panel').textContent();
      check('the 1953 node carries its "historians disagree" note',
        /Historians disagree/.test(panelText));
      check('and it ends on a further question rather than an answer',
        /The chain keeps going/.test(panelText));

      check('no uncaught page errors', errors.length === 0, errors.slice(0, 2).join(' | ') || 'none');
      await page.close();
    }

    /* ── The prediction loop ─────────────────────────────────────────── */
    group('The prediction, and its return');
    {
      const page = await context.newPage();
      await page.goto(`${base}/investigation-iran.html`, { waitUntil: 'load' });

      await page.locator('input[value="nuclear"]').check();
      await page.locator('input[value="oil"]').check();
      check('a prediction reports itself saved',
        /Saved/.test(await page.locator('#predict-saved').textContent()));

      await page.reload({ waitUntil: 'load' });
      check('the prediction survives a reload',
        await page.locator('input[value="nuclear"]').isChecked()
        && await page.locator('input[value="oil"]').isChecked());

      const recall = await page.locator('#recall').textContent();
      check('the reflection replays what was chosen before reading',
        /Iran’s nuclear program/.test(recall) && /Oil and energy/.test(recall),
        recall.replace(/\s+/g, ' ').slice(0, 60));

      await page.close();
    }

    /* ── Evidence, and writing that persists ─────────────────────────── */
    group('Evidence sort and student writing');
    {
      const page = await context.newPage();
      await page.goto(`${base}/investigation-iran.html`, { waitUntil: 'load' });

      const item = page.locator('.ev-item').first();
      await item.locator('[data-choice="interpretation"]').click();
      check('a wrong sort is corrected rather than just marked',
        /this is reporting/i.test(await item.locator('.ev-why').textContent()));

      await item.locator('[data-choice="reporting"]').click();
      check('and the student can change their mind',
        await item.getAttribute('data-state') === 'right');

      await page.locator('#claim').fill('The war is the result of three converging threads, not one cause.');
      await page.locator('#claim').blur();
      await page.reload({ waitUntil: 'load' });
      check('a claim survives a reload',
        /three converging threads/.test(await page.locator('#claim').inputValue()));

      await page.goto(`${base}/my-work.html`, { waitUntil: 'load' });
      const work = await page.locator('#work-body').textContent();
      check('My Work shows the claim that was typed', /three converging threads/.test(work));
      check('My Work shows the earlier prediction too', /nuclear program/i.test(work));
      check('and names what is still empty rather than hiding it',
        /Nothing written yet/.test(work));

      await page.close();
    }

    /* ── The things that make it usable in a classroom ───────────────── */
    group('Access and layout');
    {
      const page = await context.newPage();
      await page.goto(`${base}/index.html`, { waitUntil: 'load' });

      await page.keyboard.press('Tab');
      // The skip link slides in on a 120ms transition, so read it after the
      // transition rather than during it: measuring mid-animation reports the
      // off-screen position and fails a link that works.
      await page.waitForTimeout(260);
      const first = await page.evaluate(() => ({
        text: (document.activeElement.textContent || '').trim(),
        visible: document.activeElement.getBoundingClientRect().top >= 0
      }));
      check('the first tab stop is the skip link, and it becomes visible',
        /skip to main/i.test(first.text) && first.visible, first.text);

      check('one main landmark, with the footer outside it',
        await page.evaluate(() =>
          document.querySelectorAll('main').length === 1
          && !document.querySelector('main').contains(document.querySelector('.site-footer'))));

      // Every interactive element must show a ring. A background tint is
      // invisible on a projector and absent in forced-colours mode.
      const noRing = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll('a[href], button').forEach(el => {
          if (!el.offsetParent && el.className !== 'skip-link') return;
          el.focus();
          const s = getComputedStyle(el);
          const w = parseFloat(s.outlineWidth) || 0;
          if (w < 1 || s.outlineStyle === 'none') out.push(el.className || el.tagName);
        });
        return out;
      });
      check('every interactive element paints a focus ring', noRing.length === 0,
        noRing.slice(0, 3).join(', ') || 'all rings present');

      for (const w of [1366, 1024, 768]) {
        await page.setViewportSize({ width: w, height: 768 });
        const over = await page.evaluate(() =>
          document.documentElement.scrollWidth - document.documentElement.clientWidth);
        check(`no sideways scroll at ${w}px`, over <= 0, over + 'px overflow');
      }

      await page.close();
    }

    /* ── Contrast, measured on the rendered page ─────────────────────── */
    //
    // This is the check that earns its runtime. The SAME tone is correct on
    // one ground and wrong on another, and only a browser knows which ground
    // an element actually landed on. Two real defects were found this way and
    // neither was visible in the source: graphite body text on a gunmetal band
    // at 2.03:1, because the dark override named .sec-dark and the band was
    // .sec-gunmetal; and the whole Today section styled for paper while set on
    // carbon. Both read as "slightly low contrast" and measured as failures.
    //
    // Teacher mode is swept too, because it reveals panels student mode never
    // paints and those panels are nobody's first concern when a colour changes.
    group('Contrast on the rendered page (WCAG AA)');
    {
      const sweep = async (page, label) => {
        const bad = await page.evaluate(() => {
          const rgb = s => { const m = s.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
          const lum = c => { const a = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; };
          const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b), hi = Math.max(l1, l2), lo = Math.min(l1, l2); return (hi + 0.05) / (lo + 0.05); };
          // Walk up for the first ground that is actually opaque enough to be
          // the thing the text sits on.
          const ground = el => {
            let n = el;
            while (n && n !== document.documentElement) {
              const s = getComputedStyle(n).backgroundColor;
              const parts = s.match(/[\d.]+/g);
              if (parts && (parts.length < 4 || Number(parts[3]) > 0.85)) return rgb(s);
              n = n.parentElement;
            }
            return [255, 255, 255];
          };
          const out = [];
          document.querySelectorAll('*').forEach(el => {
            const s = getComputedStyle(el);
            if (!el.offsetParent && s.position !== 'fixed') return;
            if (s.visibility === 'hidden' || s.opacity === '0') return;
            // Only elements holding their own text; a wrapper inherits colour
            // from a child that is measured on its own.
            const own = Array.from(el.childNodes).filter(n => n.nodeType === 3)
              .map(n => n.textContent.trim()).join('');
            if (!own) return;
            const size = parseFloat(s.fontSize), weight = parseInt(s.fontWeight) || 400;
            const large = size >= 24 || (size >= 18.66 && weight >= 700);
            const need = large ? 3 : 4.5;
            const fg = rgb(s.color);
            if (!fg) return;
            const r = ratio(fg, ground(el));
            if (r < need) out.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} ${r.toFixed(2)}:1 (needs ${need}) "${own.slice(0, 28)}"`);
          });
          return out;
        });
        check(`${label}: every text colour meets its threshold`, bad.length === 0,
          bad.slice(0, 3).join(' | ') || 'no violations');
      };

      for (const p of ['index.html', 'investigation-iran.html', 'my-work.html']) {
        const page = await context.newPage();
        await page.goto(`${base}/${p}`, { waitUntil: 'load' });
        await sweep(page, p);

        await page.evaluate(() => window.BC2Store.setMode('teacher'));
        await page.waitForTimeout(60);
        await sweep(page, p + ' (teacher mode)');
        await page.evaluate(() => window.BC2Store.setMode('student'));
        await page.close();
      }
    }

    /* ── 320px reflow, measured in the REAL display face ─────────────── */
    group('Reflow at 320px, with the display font actually loaded');
    if (!fontBuf) {
      skip('320px reflow in Playfair Display', 'font host unreachable: ' + fontWhy);
      skip('  ↳ this is NOT a pass', 'the fallback is ~30% narrower, so a local green means nothing here');
    } else {
      const page = await context.newPage();
      await page.setViewportSize({ width: 320, height: 640 });

      // Block everything off-origin so the measurement is hermetic and the
      // font under test is the one we injected, not one the browser found.
      await page.route('**', route =>
        route.request().url().startsWith(`http://127.0.0.1:${port}`) ? route.continue() : route.abort());

      const b64 = fontBuf.toString('base64');
      await page.addInitScript(bytes => {
        window.__injectPlayfair = async () => {
          const bin = atob(bytes);
          const buf = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
          const face = new FontFace('Playfair Display', buf.buffer, { weight: '800' });
          await face.load();
          document.fonts.add(face);
        };
      }, b64);

      for (const p of ['index.html', 'investigation-iran.html', 'my-work.html']) {
        await page.goto(`${base}/${p}`, { waitUntil: 'load' });
        await page.evaluate(() => window.__injectPlayfair());

        // Metrics, not document.fonts.check(): identical widths would mean the
        // face never applied, and check() would say yes either way.
        const applied = await page.evaluate(() => {
          function width(family) {
            const s = document.createElement('span');
            s.textContent = 'Industrialization';
            s.style.cssText = 'position:absolute;visibility:hidden;font-size:64px;font-weight:800;font-family:' + family;
            document.body.appendChild(s);
            const w = s.getBoundingClientRect().width;
            s.remove();
            return w;
          }
          return width('"Playfair Display", Georgia') !== width('Georgia');
        });

        const over = await page.evaluate(() =>
          document.documentElement.scrollWidth - document.documentElement.clientWidth);

        if (!applied) {
          skip(`${p} at 320px`, 'the injected face did not apply; measurement would be Georgia');
        } else {
          check(`${p}: no sideways scroll at 320px in Playfair Display`, over <= 0, over + 'px overflow');
        }
      }
      await page.close();
    }

    await context.close();
  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter(r => !r).length;
  console.log(`\n  ${results.length - failed}/${results.length} passed`
    + (skipped ? `, ${Y}${skipped} skipped${X}` : '') + '\n');
  process.exit(failed ? 1 : 0);
})().catch(e => {
  console.error(`${R}  the browser run itself failed:${X} ${e && e.message}`);
  console.error(e && e.stack);
  process.exit(1);
});
