#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const unit = require('../lib/unit-content/iran');
const videos = require('../lib/iran-video-content');
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
check('all topic keys and pages are unique', new Set(topics.map(t => t.key)).size === topics.length && new Set(topics.map(t => t.page)).size === topics.length);
check('every topic has three learning targets and three success criteria', topics.every(t => t.learningTargets.length === 3 && t.successCriteria.length === 3));
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
check('the study guide stays tied to the canonical Iran synthesis', studyGuide.includes(unit.meta.terminalQuestion) && studyGuide.toLowerCase().includes(finalCriterionCore.toLowerCase()) && (studyGuide.match(/class="ir-time"/g) || []).length === topics.length && !!questionSection && (questionSection[1].match(/class="ir-scan-card"/g) || []).length === topics.length);

const browser = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'iran-topics.js'), 'utf8');
const data = fs.readFileSync(path.join(ROOT, 'assets', 'data', 'iran-unit.js'), 'utf8');
check('the browser layer reproduces exactly from the content module', browser === renderIranBrowser(unit));
check('homepage progress data reproduces exactly from the content module', data === renderIranData(unit));
check('the student layer carries gather, copy, clear, and record-manifest paths', browser.includes('Gather This Topic') && browser.includes('Copy to Clipboard') && browser.includes('Clear This Topic') && browser.includes('bcRecordManifest'));
check('the student layer has no off-device capture channel', !/\bfetch\s*\(/.test(browser) && !/XMLHttpRequest/.test(browser) && !/<form[^>]+action=/i.test(browser));

const videoTopics = Object.entries(videos.topics || {});
const videoRows = videoTopics.flatMap(([topicId, topic]) => (topic.videos || []).map(v => ({topicId, ...v})));
const expectedVideoData = `// GENERATED from scripts/lib/iran-video-content.js.\n// Rebuild with node scripts/build-iran-videos.js. Do not hand-edit.\nwindow.BECURRENT_IRAN_VIDEOS=${JSON.stringify(videos)};\n`;
const videoData = fs.readFileSync(path.join(ROOT, 'assets', 'data', 'iran-videos.js'), 'utf8');
const videoLayer = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'iran-video-forward.js'), 'utf8');
const teacherRun = fs.readFileSync(path.join(ROOT, 'teacher', 'iran-run-of-show.html'), 'utf8');
check('video-forward metadata covers all eight topics', videoTopics.length === 8, `${videoTopics.length} topics`);
check('every Iran topic has two or three video/resource cards', videoTopics.every(([, t]) => t.videos.length >= 2 && t.videos.length <= 3));
check('generated browser video data reproduces exactly from the canonical video module', videoData === expectedVideoData);
check('the presentation layer does not carry a second hard-coded video catalog', !/const\s+CATALOG\s*=/.test(videoLayer) && videoLayer.includes('window.BECURRENT_IRAN_VIDEOS'));
check('PBS cards use direct clips rather than full-episode URLs', videoRows.filter(v => /pbs\.org/.test(v.url)).every(v => !/full-episode/i.test(v.url)));
check('every configured external video has a launch-audit date', videoRows.filter(v => /^https:/.test(v.url)).every(v => /^2026-\d\d-\d\d$/.test(v.verified || '')));
check('Topic 1 protects discussion time by requiring only Watch 1', videos.topics['topic-01'].videos[0].status === 'REQUIRED' && videos.topics['topic-01'].videos[1].status === 'TEACHER CHOICE' && videos.topics['topic-01'].videos[2].status === 'OPTIONAL EXTEND');
check('the teacher cockpit does not duplicate external video URLs', !/https:\/\/(www\.)?(pbs\.org|youtube\.com)/.test(teacherRun));

const passed = results.filter(Boolean).length;
console.log(`\n  ${passed}/${results.length} passed\n`);
process.exit(passed === results.length ? 0 : 1);
