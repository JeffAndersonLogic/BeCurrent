'use strict';

/**
 * The Desk 2.0 renderer.
 *
 * The shell is stable; current reporting comes from assets/data/daily-news.js.
 * Internal lane ids remain local/world so existing saved work and the Canvas parser
 * keep their contract while students see The Lead and Your Pick.
 */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderDeskPage(desk) {
  const story = desk.story || {};
  const cfg = {
    lanes:(desk.lanes || []).map(l => ({id:l.id,name:l.name})),
    facts:(story.facts || []).map(f => ({id:f.id,label:f.label})),
    questions:(story.questions || []).map(q => ({id:q.id,label:q.label})),
    anchorMonday:(desk.log || {}).anchorMonday || '',
    weeks:Number((desk.log || {}).weeks) || 1
  };
  const cfgJson = JSON.stringify(cfg).replace(/&/g,'\\u0026').replace(/</g,'\\u003c').replace(/>/g,'\\u003e');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="becurrent-log-anchor" content="${esc(cfg.anchorMonday)}">
<title>BeCurrent | The Desk</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/becurrent-2.css">
<link rel="stylesheet" href="../assets/css/desk-2.css">
</head>
<body class="desk-v2">
<div class="desk-shell">
<header class="desk-topbar"><nav class="desk-nav" aria-label="The Desk navigation">
<a class="desk-brand" href="../index.html" aria-label="BeCurrent home"><img src="../assets/images/brand/becurrent-logo.svg" alt="BeCurrent"></a>
<div class="desk-navlinks"><a href="../index.html">Home</a><a href="../announcements.html">Today</a><a href="#file" aria-current="page">Today’s Desk</a><a href="#sources">Source Shelf</a><a href="#journal">My Desk</a></div>
</nav></header>
<main class="desk-page">
<section class="desk-hero" aria-labelledby="desk-lead-headline">
<div class="desk-lead-visual" data-lead-image><div class="desk-lead-copy"><div class="desk-kicker">Today’s shared story</div><h1 id="desk-lead-headline">Today’s lead story</h1><p id="desk-lead-dek">Open the source, identify what actually happened, and file what matters.</p><div class="desk-lead-meta"><span id="desk-lead-source">Teacher-selected source</span><span>·</span><span id="desk-lead-published">Today</span><span>·</span><a id="desk-lead-link" href="#file">Open the reporting →</a></div></div></div>
<aside class="desk-brief"><div><div class="desk-kicker">How The Desk works</div><h2>Know one story together. Follow one story yourself.</h2><p>The Desk is a news habit, not a worksheet. File enough to remember what happened and why it mattered.</p><div class="desk-rhythm">
<div class="desk-rhythm-row"><span class="desk-rhythm-num">1</span><div><strong>Know the Lead</strong><span>One important story the whole room shares.</span></div></div>
<div class="desk-rhythm-row"><span class="desk-rhythm-num">2</span><div><strong>Choose Your Pick</strong><span>One story that genuinely catches your attention.</span></div></div>
<div class="desk-rhythm-row"><span class="desk-rhythm-num">3</span><div><strong>File both</strong><span>What happened. Why it matters.</span></div></div>
<div class="desk-rhythm-row"><span class="desk-rhythm-num">4</span><div><strong>Make one judgment</strong><span>Which story deserves more attention?</span></div></div>
<div class="desk-rhythm-row"><span class="desk-rhythm-num">5</span><div><strong>Copy My Desk</strong><span>Back up the growing News Log in Canvas.</span></div></div>
</div></div><div class="desk-date-pill">Filing for <span class="desk-today" id="desk-today">today</span></div></aside>
</section>
<section class="desk-section" id="file"><div class="desk-section-head"><div class="desk-kicker">Today’s Desk</div><div><h2>First the Lead. Then Your Pick.</h2><p>Complete the shared story before choosing your own. The sequence stays the same every class period, and your writing saves on this Chromebook as you type.</p></div></div><div class="desk-two">
<article class="desk-lane-card lead-card" id="story-local"><span class="visually-hidden">The Lead</span><div class="desk-card-head"><div class="desk-step-label"><span class="desk-step-number">Step 1</span><span class="desk-step-name">The Lead</span><span class="desk-step-note">Everybody files this story</span></div><h3>Know the story the room shares.</h3><p>The source is already chosen. Read it, then separate the event from the reaction around it.</p></div><div class="lead-source-strip"><div class="lead-source-cell"><label for="answer-local-outlet">Outlet</label><input id="answer-local-outlet" type="text" autocomplete="off" spellcheck="false"></div><div class="lead-source-cell"><label for="answer-local-date">Published</label><input id="answer-local-date" type="text" autocomplete="off" spellcheck="false"></div><div class="lead-source-cell"><label for="answer-local-link">Source link</label><input id="answer-local-link" type="url" autocomplete="off" spellcheck="false"></div></div><div class="desk-card-body">
<div class="desk-prompt"><div class="desk-prompt-top"><span class="desk-q-num">Step 1A · The event</span><span class="desk-q-skill">Framing</span></div><p class="desk-prompt-text" id="question-local-what">What actually happened? Two sentences in your own words. Separate the event from the reaction to it.</p><p class="desk-help">If the story begins with someone reacting, first identify the thing they are reacting to.</p><label class="visually-hidden" for="answer-local-what">The Lead, what actually happened</label><textarea class="work-area" id="answer-local-what" placeholder="Two sentences. It saves as you type."></textarea><div class="confidence" id="confidence-local-what" role="group" aria-label="Confidence: The Lead, what happened"></div></div>
<div class="desk-prompt"><div class="desk-prompt-top"><span class="desk-q-num">Step 1B · Significance</span><span class="desk-q-skill">Generalizing from Evidence</span></div><p class="desk-prompt-text" id="question-local-why">Why does this matter? Name what changed, who is affected, or what is likely to happen next.</p><p class="desk-help">You are not being asked whether you like the story. Explain why it deserves attention.</p><label class="visually-hidden" for="answer-local-why">The Lead, why it matters</label><textarea class="work-area" id="answer-local-why" placeholder="One or two sentences. It saves as you type."></textarea><div class="confidence" id="confidence-local-why" role="group" aria-label="Confidence: The Lead, why it matters"></div></div>
</div></article>
<div class="desk-sequence-divider" aria-hidden="true"><span>Then</span></div>
<article class="desk-lane-card pick-card" id="story-world"><span class="visually-hidden">Your Pick</span><div class="desk-card-head"><div class="desk-step-label"><span class="desk-step-number">Step 2</span><span class="desk-step-name">Your Pick</span><span class="desk-step-note">Choose the story that pulls you in</span></div><h3>Follow one story you actually care about.</h3><p>Politics is fine. So are science, technology, sports business, culture, courts, money, local government, war or something else worth knowing.</p></div><div class="pick-meta"><div class="wide"><label for="desk-pick-headline">Headline or story name</label><input id="desk-pick-headline" type="text" autocomplete="off" placeholder="What story did you choose?"></div><div><label for="desk-pick-category">Beat</label><select id="desk-pick-category"><option value="">Choose a beat</option><option>Local</option><option>U.S.</option><option>World</option><option>Economy</option><option>Technology</option><option>Science</option><option>Culture</option><option>Sports &amp; business</option><option>Other</option></select></div><div><label for="desk-pick-reason">Why this one?</label><input id="desk-pick-reason" type="text" autocomplete="off" placeholder="What caught your attention?"></div><label class="pick-local-check wide"><input id="desk-pick-local" type="checkbox"><span>This is my <strong>local story</strong> for this News Log. You need at least one local pick during each two-week log.</span></label></div><div class="lead-source-strip"><div class="lead-source-cell"><label for="answer-world-outlet">Outlet</label><input id="answer-world-outlet" type="text" autocomplete="off" spellcheck="false" placeholder="Reuters, Times Sentinel, BBC News…"></div><div class="lead-source-cell"><label for="answer-world-date">Published</label><input id="answer-world-date" type="text" autocomplete="off" spellcheck="false" placeholder="Month day, year"></div><div class="lead-source-cell"><label for="answer-world-link">Source link</label><input id="answer-world-link" type="url" autocomplete="off" spellcheck="false" placeholder="https://…"></div></div><div class="desk-card-body">
<div class="desk-prompt"><div class="desk-prompt-top"><span class="desk-q-num">Step 2A · Your story</span><span class="desk-q-skill">Framing</span></div><p class="desk-prompt-text" id="question-world-what">What actually happened in Your Pick? Give the event in two sentences, in your own words.</p><p class="desk-help">Do not retell the entire article. Identify the change, decision, discovery or event.</p><label class="visually-hidden" for="answer-world-what">Your Pick, what happened</label><textarea class="work-area" id="answer-world-what" placeholder="Two sentences. It saves as you type."></textarea><div class="confidence" id="confidence-world-what" role="group" aria-label="Confidence: Your Pick, what happened"></div></div>
<div class="desk-prompt"><div class="desk-prompt-top"><span class="desk-q-num">Step 2B · The judgment</span><span class="desk-q-skill">Significance</span></div><p class="desk-prompt-text" id="question-world-why">Which of today’s two stories deserves more attention — The Lead or Your Pick — and why?</p><p class="desk-help">Pick one. Your reason matters more than matching anyone else’s choice.</p><label class="visually-hidden" for="answer-world-why">Which story deserves more attention and why</label><textarea class="work-area" id="answer-world-why" placeholder="One or two sentences. Make the case."></textarea><div class="confidence" id="confidence-world-why" role="group" aria-label="Confidence: attention judgment"></div></div>
</div></article>
</div><div class="local-progress" id="desk-local-progress"><strong>Local check:</strong> Make at least one Your Pick local during this two-week News Log.</div></section>
<section class="desk-section" id="sources"><div class="desk-section-head"><div class="desk-kicker">Source Shelf</div><div><h2>Find the story. Do not get trapped in the directory.</h2><p>The Current Wire is the fastest scan. Open a shelf only when you need somewhere to look.</p></div></div><div class="source-shelf"><div class="current-wire-shelf" id="desk-current-wire"><strong>Current Wire</strong></div>
<details class="source-drawer"><summary>Start here</summary><p class="source-what">Fast ways to scan before you choose Your Pick.</p><div class="source-links"><a href="https://www.cnn.com/cnn10" target="_blank" rel="noopener noreferrer"><span>CNN 10</span><span>Short shared overview.</span></a><a href="https://theweek.com" target="_blank" rel="noopener noreferrer"><span>The Week</span><span>Multi-outlet summaries.</span></a></div></details>
<details class="source-drawer"><summary>Local</summary><p class="source-what">Use this shelf when today is your local pick.</p><div class="source-links"><a href="https://www.timessentinel.com/" target="_blank" rel="noopener noreferrer"><span>Times Sentinel</span><span>Zionsville and Boone County.</span></a><a href="https://youarecurrent.com/category/zionsville/" target="_blank" rel="noopener noreferrer"><span>Current in Zionsville</span><span>Community coverage.</span></a><a href="https://news.google.com/search?q=Zionsville%20Indiana" target="_blank" rel="noopener noreferrer"><span>Search Zionsville news</span><span>Recent local coverage.</span></a></div></details>
<details class="source-drawer"><summary>National or International</summary><p class="source-what">Wires, broadcasters and publications for U.S. and world reporting.</p><div class="source-links"><a href="https://apnews.com" target="_blank" rel="noopener noreferrer"><span>Associated Press</span><span>Wire service.</span></a><a href="https://www.reuters.com" target="_blank" rel="noopener noreferrer"><span>Reuters</span><span>International wire.</span></a><a href="https://www.npr.org" target="_blank" rel="noopener noreferrer"><span>NPR</span><span>Public radio.</span></a><a href="https://www.cnn.com" target="_blank" rel="noopener noreferrer"><span>CNN</span><span>U.S. and world.</span></a><a href="https://www.foxnews.com" target="_blank" rel="noopener noreferrer"><span>Fox News</span><span>U.S. and world.</span></a><a href="https://www.newsnationnow.com" target="_blank" rel="noopener noreferrer"><span>NewsNation</span><span>U.S. reporting.</span></a><a href="https://www.bbc.com/news" target="_blank" rel="noopener noreferrer"><span>BBC News</span><span>Global coverage.</span></a><a href="https://www.newsweek.com" target="_blank" rel="noopener noreferrer"><span>Newsweek</span><span>News magazine.</span></a><a href="https://www.bloomberg.com" target="_blank" rel="noopener noreferrer"><span>Bloomberg</span><span>Business and markets.</span></a><a href="https://www.forbes.com" target="_blank" rel="noopener noreferrer"><span>Forbes</span><span>Business coverage.</span></a><a href="https://news.google.com" target="_blank" rel="noopener noreferrer"><span>Search the news</span><span>Search across outlets.</span></a></div></details>
</div></section>
<section class="desk-section" id="journal"><div class="desk-section-head"><div class="desk-kicker">My Desk</div><div><h2>Your two-week news journal.</h2><p>A running front page of what you followed, built from work saved on this device.</p></div></div><div class="journal-shell"><div class="journal-head"><div><div class="desk-kicker">Current News Log</div><h3>Stories you followed</h3></div><p>The Lead first. Your Pick second.</p></div><div class="journal-list" id="desk-journal-list"><div class="journal-empty">Your Desk is empty. File today’s Lead and Your Pick to begin.</div></div></div></section>
<section class="desk-section" id="week"><div class="desk-section-head"><div class="desk-kicker">Before you leave</div><div><h2>Copy My Desk into Canvas.</h2><p>One News Log every two weeks in Canvas. Paste the growing log into the same assignment again each class period; the last attempt is the graded artifact.</p></div></div><div class="gather-panel"><h3>My News Log</h3><p>Gather every day you have filed in the current two-week log, then copy the formatted record into Canvas.</p><p><strong>Copy it every class period.</strong> This page stores work in this browser only until you paste it into Canvas.</p><div class="desk-actions"><button class="desk-btn" type="button" onclick="gatherDeskWork()">Gather My Log</button><button class="desk-btn secondary" type="button" onclick="copyDeskWork()">Copy to Clipboard</button></div><p class="gather-status" id="desk-gather-status" role="status"></p><div class="gather-output" id="desk-gather-output" tabindex="0"><p>Gather the log, copy it, then paste into Canvas.</p></div></div></section>
</main>
<footer class="desk-footer"><div class="desk-footer-inner"><span>BeCurrent · The Desk</span><span>Know the Lead. Choose Your Pick. Decide what deserves attention. · <a href="../index.html">Back to Home</a></span></div></footer>
</div>
<script src="../assets/data/daily-news.js"></script>
<script>window.BECURRENT_DESK_CONFIG=${cfgJson};</script>
<!-- Desk capture contract: var PREFIX = "becurrent-desk-"; var TODAY = dayKeyOf(new Date()); var ANCHOR_MONDAY = window.BECURRENT_DESK_CONFIG.anchorMonday; function cycleStart() { return ANCHOR_MONDAY; } function daysBetweenUTC(a, b) { return Date.UTC(a) - Date.UTC(b); } -->
<script src="../assets/js/desk-confidence-contract.js"></script>
<script src="../assets/js/desk-capture-v2.js"></script>
<script src="../assets/js/desk-2.js"></script>
</body>
</html>
`;
}

module.exports = { renderDeskPage };
