#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const unit = require('../lib/unit-content/iran');
const { renderIranBrowser, renderIranData } = require('../lib/iran-topic-page');

const ROOT = path.resolve(__dirname, '..', '..');
const results = [];
function check(name, pass, detail) {
  results.push(!!pass);
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
}

console.log('\n  Iran Reverse History contract\n');
const topics = unit.topics || [];
const questions = topics.flatMap(topic => topic.questions || []);

check('the investigation has all eight topics', topics.length === 8, `${topics.length} topics`);
check('all topic keys and pages are unique',
  new Set(topics.map(t => t.key)).size === topics.length
  && new Set(topics.map(t => t.page)).size === topics.length);
check('every topic has three learning targets and three success criteria',
  topics.every(t => t.learningTargets.length === 3 && t.successCriteria.length === 3));
check('the canonical filing count is 41', questions.length === 41, `${questions.length} filings`);

let pageContract = true;
topics.forEach(topic => {
  const src = fs.readFileSync(path.join(ROOT, 'iran', topic.page), 'utf8');
  const groups = [...src.matchAll(/data-group="([^"]+)"/g)].map(m => m[1]);
  const expected = topic.questions.map(q => q.group);
  if (JSON.stringify(groups) !== JSON.stringify(expected)) pageContract = false;
});
check('each page exposes exactly the filings declared by its topic', pageContract);

const studyGuide = fs.readFileSync(path.join(ROOT, 'iran', 'study-guide.html'), 'utf8');
const finalTopic = topics[topics.length - 1];
const finalCriterionCore = finalTopic.successCriteria[0].criteria.replace(/^I can /, '');
const questionSection = studyGuide.match(/<section class="ir-section" id="questions">([\s\S]*?)<section class="ir-section" id="final">/);
check('the study guide stays tied to the canonical Iran synthesis',
  studyGuide.includes(unit.meta.terminalQuestion)
  && studyGuide.includes(finalTopic.title)
  && studyGuide.toLowerCase().includes(finalCriterionCore.toLowerCase())
  && (studyGuide.match(/class="ir-time"/g) || []).length === topics.length
  && !!questionSection
  && (questionSection[1].match(/class="ir-scan-card"/g) || []).length === topics.length);

const browser = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'iran-topics.js'), 'utf8');
const data = fs.readFileSync(path.join(ROOT, 'assets', 'data', 'iran-unit.js'), 'utf8');
check('the browser layer reproduces exactly from the content module', browser === renderIranBrowser(unit));
check('homepage progress data reproduces exactly from the content module', data === renderIranData(unit));
check('the student layer carries gather, copy, clear, and record-manifest paths',
  browser.includes('Gather This Topic')
  && browser.includes('Copy to Clipboard')
  && browser.includes('Clear This Topic')
  && browser.includes('bcRecordManifest'));
check('the student layer has no off-device capture channel',
  !/\bfetch\s*\(/.test(browser) && !/XMLHttpRequest/.test(browser) && !/<form[^>]+action=/i.test(browser));

const passed = results.filter(Boolean).length;
console.log(`\n  ${passed}/${results.length} passed\n`);
process.exit(passed === results.length ? 0 : 1);
