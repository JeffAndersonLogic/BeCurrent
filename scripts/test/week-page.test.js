#!/usr/bin/env node
'use strict';

/**
 * The week page, driven in a real browser.
 *
 * These are the contracts nothing offline can see. validate.js asserts the source
 * shape of each guard below, which proves the guard is written; only this file
 * proves it works. The two that matter most:
 *
 *   - The scroll lock actually lifts after Close. This is asserted by checking
 *     that the page really scrolls afterwards, not merely that a style string was
 *     cleared, so a future lock by some other mechanism fails here too. The bug it
 *     guards against left a student unable to scroll the lesson until they
 *     reloaded, with every structural check green.
 *   - Focus goes into the dialog, is trapped there, and returns to the launcher.
 *
 * Exits 2 when playwright-core is absent, which run-tests.js reports as SKIP.
 * validate.js has to stay runnable on a bare checkout, so the browser dependency
 * is never installed by default. Pass --strict in CI to make a skip a failure.
 *
 *   node scripts/test/week-page.test.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m', D = '\x1b[2m', X = '\x1b[0m';

let chromium;
try {
  chromium = require('playwright-core').chromium;
} catch (e) {
  console.log(`${Y}  SKIP  playwright-core is not installed: npm i playwright-core${X}`);
  process.exit(2);
}

const results = [];
function check(name, pass, detail) {
  results.push(pass);
  console.log(`  ${pass ? G + 'PASS' + X : R + 'FAIL' + X}  ${name}${detail ? D + '  (' + detail + ')' + X : ''}`);
}

// ── A server, because the brief loads in an iframe and file:// blocks that ────
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

/**
 * Reset the document scroll, instantly.
 *
 * `behavior: 'instant'` is essential and not a convenience. The stylesheet sets
 * `html { scroll-behavior: smooth }`, so a default scrollTo animates and
 * window.scrollY does not update synchronously. Reading it a frame later returns
 * the old offset, which makes a page that scrolls perfectly well look locked.
 */
async function resetScroll(page) {
  return page.evaluate(async () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise(r => requestAnimationFrame(r));
    return window.scrollY;
  });
}

/**
 * Scroll the way a student does, with the wheel, and report where the document
 * ended up.
 *
 * This has to be a real wheel event rather than window.scrollTo, and the reason
 * is the whole point of the assertion. `overflow: hidden` makes an element
 * programmatically scrollable but NOT user-scrollable: window.scrollTo(0, 600)
 * moves the document straight through the lock and reports 600, so a scrollTo
 * based test claims the lock is broken when it is working exactly as intended.
 *
 * A wheel event is what the lock is actually for, so it is what gets asserted.
 */
async function wheelBy(page, dy) {
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, dy);
  return page.evaluate(async () => {
    await new Promise(r => setTimeout(r, 120));
    return window.scrollY;
  });
}

function weekDirs() {
  return fs.readdirSync(ROOT)
    .filter(f => /^week-\d{2}$/.test(f))
    .filter(f => fs.statSync(path.join(ROOT, f)).isDirectory())
    .sort();
}

(async () => {
  const { server, port } = await serve();
  const exe = process.env.PW_CHROME;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});

  try {
    for (const dir of weekDirs()) {
      console.log(`\n  ${dir}\n`);
      const page = await browser.newPage({ viewport: { width: 1280, height: 760 } });

      const consoleErrors = [];
      page.on('pageerror', e => consoleErrors.push(String(e.message)));

      await page.goto(`http://127.0.0.1:${port}/${dir}/index.html`, { waitUntil: 'load' });
      await page.waitForSelector('#module-grid .module-card');

      // ── The page renders ───────────────────────────────────────────────────
      const cards = await page.$$('#module-grid .module-card');
      check('eight module cards render', cards.length === 8, `${cards.length} cards`);

      check('the hero is populated from the data file',
        (await page.textContent('#week-title')).trim().length > 0);
      check('learning targets render',
        (await page.$$('#inline-targets .target-item')).length > 0);
      check('the background deck grid renders',
        (await page.$$('#background-grid .background-card')).length > 0);
      check('the gather panel renders',
        !!(await page.$('#gather-output')));

      // ── Module modal: focus in, trapped, and back out ──────────────────────
      await page.click('#module-grid .module-card:nth-child(1)');
      await page.waitForSelector('#pop-modal.show');

      check('the module modal announces itself',
        await page.getAttribute('#pop-modal', 'aria-modal') === 'true'
        && await page.getAttribute('#pop-modal', 'aria-labelledby') === 'pop-title');

      check('focus moves into the dialog',
        await page.evaluate(() => {
          const modal = document.getElementById('pop-modal');
          return modal.contains(document.activeElement) || document.activeElement === modal;
        }));

      // Behavioural, not textual. The style string being right is not the claim;
      // the claim is that wheeling does not drag the lesson out from under the
      // dialog. The dialog is fixed and covers the viewport, so a wheel over it
      // scrolls the dialog's own overflow, which is the intended behaviour.
      await resetScroll(page);
      const lockedAt = await wheelBy(page, 600);
      check('wheeling does not scroll the page out from under the dialog',
        lockedAt === 0,
        `document scrollY ${lockedAt}, body overflow "${await page.evaluate(() => document.body.style.overflow)}"`);

      // Tab must not escape the dialog.
      for (let i = 0; i < 14; i++) await page.keyboard.press('Tab');
      check('Tab stays inside the dialog',
        await page.evaluate(() => document.getElementById('pop-modal').contains(document.activeElement)));

      // ── Work capture survives a reload ────────────────────────────────────
      const typed = 'The Red Sea lane, and the shipping costs that follow it.';
      await page.fill('#work-where-response', typed);
      await page.click('#conf-where-response button[data-conf="4"]');
      check('confidence records a press',
        await page.getAttribute('#conf-where-response button[data-conf="4"]', 'aria-pressed') === 'true');

      await page.keyboard.press('Escape');
      await page.waitForSelector('#pop-modal', { state: 'hidden' });

      check('Escape returns focus to the card that opened it',
        await page.evaluate(() => document.activeElement
          && document.activeElement.classList.contains('module-card')));

      // The assertion that matters: the page scrolls again. Checking the style
      // string alone would pass even if some other mechanism held the page.
      await resetScroll(page);
      const afterClose = await wheelBy(page, 400);
      check('the page really scrolls to the wheel after Close', afterClose > 0,
        `scrollY ${afterClose} after a 400px wheel`);

      await page.reload({ waitUntil: 'load' });
      await page.waitForSelector('#module-grid .module-card');
      await page.click('#module-grid .module-card:nth-child(1)');
      await page.waitForSelector('#pop-modal.show');
      check('typed work survives a reload',
        (await page.inputValue('#work-where-response')) === typed);
      await page.keyboard.press('Escape');
      await page.waitForSelector('#pop-modal', { state: 'hidden' });

      // ── The deck: arrows, counter, and the stranded-student regression ─────
      await page.click('#background-grid .background-card:nth-child(1)');
      await page.waitForSelector('#background-modal.show');

      const total = await page.evaluate(() => window.BECURRENT_WEEK.background.cards.length);
      check('the deck shows a card counter',
        (await page.textContent('#deck-counter')).trim() === `Card 1 of ${total}`,
        (await page.textContent('#deck-counter')).trim());
      check('Previous is disabled on the first card',
        await page.getAttribute('#deck-prev', 'disabled') !== null);

      // Step the whole deck with the keyboard. This is the exact sequence that
      // used to push one stack entry per card.
      for (let i = 1; i < total; i++) await page.keyboard.press('ArrowRight');
      check('the right arrow key walks the deck',
        (await page.textContent('#deck-counter')).trim() === `Card ${total} of ${total}`,
        (await page.textContent('#deck-counter')).trim());
      check('Next is disabled on the last card',
        await page.getAttribute('#deck-next', 'disabled') !== null);

      // One Close, after N opens, must fully release the page.
      await page.click('#background-modal .pop-header .btn');
      await page.waitForSelector('#background-modal', { state: 'hidden' });

      await resetScroll(page);
      const deckScroll = await wheelBy(page, 400);
      const deckOverflow = await page.evaluate(() => document.body.style.overflow);
      check('one Close after walking the whole deck still unlocks the page',
        deckScroll > 0 && deckOverflow === '',
        `overflow "${deckOverflow}", scrolled to ${deckScroll}`);
      // A stale stack entry does not always bite on the first cycle. Walk the deck
      // a second time, mix in the module modal so two dialogs have been opened,
      // and assert the page is still released. The stack is module-scoped and
      // cannot be inspected from here, so this reads it through the only symptom
      // that matters to a student.
      await page.click('#background-grid .background-card:nth-child(1)');
      await page.waitForSelector('#background-modal.show');
      for (let i = 1; i < total; i++) await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Escape');
      await page.waitForSelector('#background-modal', { state: 'hidden' });
      await page.click('#module-grid .module-card:nth-child(1)');
      await page.waitForSelector('#pop-modal.show');
      await page.keyboard.press('Escape');
      await page.waitForSelector('#pop-modal', { state: 'hidden' });

      await resetScroll(page);
      const secondCycle = await wheelBy(page, 400);
      check('a second deck walk plus a module modal still leaves the page scrollable',
        secondCycle > 0 && (await page.evaluate(() => document.body.style.overflow)) === '',
        `scrollY ${secondCycle}`);

      // ── Back to Modules is a different exit from Close ─────────────────────
      await page.click('#background-grid .background-card:nth-child(1)');
      await page.waitForSelector('#background-modal.show');
      await page.click('#deck-back');
      await page.waitForSelector('#background-modal', { state: 'hidden' });
      check('Back to Modules lands focus on the first module card',
        await page.evaluate(() => document.activeElement
          && document.activeElement.classList.contains('module-card')));

      // ── The brief, in its wrapper, writing the key the renderer reads ──────
      await page.click('#module-grid .module-card:nth-child(2)');
      await page.waitForSelector('#pop-modal.show');
      const frameCount = await page.$$('#pop-body iframe.module-frame');
      check('the brief loads through its capture wrapper', frameCount.length === 1);

      const wrapper = await page.frame({ url: u => /-capture\.html$/.test(u.href) });
      check('the wrapper frame is present', !!wrapper);

      if (wrapper) {
        // The brief is nested one level deeper, inside the wrapper.
        await page.waitForFunction(() => {
          const outer = document.querySelector('#pop-body iframe.module-frame');
          try {
            const inner = outer.contentDocument.getElementById('brief-frame');
            return !!(inner && inner.contentDocument
              && inner.contentDocument.getElementById('answer-q1'));
          } catch (e) { return false; }
        }, null, { timeout: 10000 });

        const briefAnswer = 'Outlet, reporter, date. Two layers before I saw it.';
        await page.evaluate(text => {
          const outer = document.querySelector('#pop-body iframe.module-frame');
          const doc = outer.contentDocument.getElementById('brief-frame').contentDocument;
          const area = doc.getElementById('answer-q1');
          area.value = text;
          area.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
          doc.querySelector('#confidence-q1 button[data-conf="3"]').click();
        }, briefAnswer);

        // The whole reason the capture block exists: this key is the only channel
        // from the brief to the Gather panel.
        const stored = await page.evaluate(() => {
          const key = 'becurrent-brief-' + window.BECURRENT_WEEK.meta.weekKey;
          try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { return {}; }
        });
        check('the brief writes its answer to becurrent-brief-<weekKey>',
          stored.q1 && stored.q1.answer === briefAnswer, JSON.stringify(stored.q1 || null));
        check('and stores the question the student actually saw beside it',
          !!(stored.q1 && stored.q1.question && stored.q1.question.length > 10));
        check('and its confidence rating',
          !!(stored.q1 && stored.q1.confidence === '3'), (stored.q1 || {}).confidence);
      }

      await page.keyboard.press('Escape');
      await page.waitForSelector('#pop-modal', { state: 'hidden' });

      // ── Gather, and the footer the parser reads ────────────────────────────
      await page.click('button:has-text("Gather All My Work")');
      const gathered = await page.inputValue('#gather-output');

      check('the gathered document carries the record footer',
        gathered.includes('--- BECURRENT RECORD, do not edit ---')
        && gathered.includes('--- END BECURRENT RECORD ---'));
      check('it declares a computed expected count, not zero',
        /\|expected=([1-9]\d*)\|/.test(gathered),
        (gathered.match(/\|expected=(\d+)\|/) || [])[1]);
      check('the work that was typed is in the body',
        gathered.includes(typed));

      const status = await page.textContent('#gather-status');
      check('the status names how many of how many were gathered',
        /Gathered \d+ of \d+ response/.test(status), status.trim());

      // The footer must survive being read back by the real parser. This is the
      // end-to-end claim the whole pipeline rests on.
      const CORE = require('../lib/canvas-parse-core');
      const asCanvasWouldStoreIt = '<!DOCTYPE html><html><body>' + gathered + '</body></html>';
      const parsed = CORE.parseSubmission(CORE.htmlToText
        ? CORE.htmlToText(asCanvasWouldStoreIt)
        : asCanvasWouldStoreIt, 'studenttest_1_2_text.html');

      check('the real parser reads the footer this page just wrote',
        parsed.hasManifest === true, `hasManifest=${parsed.hasManifest}`);
      check('and finds the typed response intact, unflagged',
        parsed.responses.some(r => r.response === typed && !r.flags.includes('EDITED')),
        `${parsed.responses.length} responses, ${parsed.exceptions.length} exceptions`);

      check('no uncaught page errors', consoleErrors.length === 0,
        consoleErrors.slice(0, 2).join(' | ') || 'none');

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter(r => !r).length;
  console.log(`\n  ${results.length - failed}/${results.length} passed\n`);
  process.exit(failed ? 1 : 0);
})().catch(e => {
  console.error(`${R}  the browser run itself failed:${X} ${e && e.message}`);
  console.error(e && e.stack);
  process.exit(1);
});
