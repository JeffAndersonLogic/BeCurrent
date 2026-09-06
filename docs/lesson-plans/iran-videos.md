# Iran at War — Video Launch Plan

**Generated from `scripts/lib/unit-content/iran-videos.js`. Do not hand-edit.**

Last launch audit: **2026-09-06**

This is the video companion to `docs/lesson-plans/iran.md`. The main lesson plan remains focused on targets, criteria, and filings; this file carries the shared video pacing and launch metadata used by the student video-forward layer.

## Topic 1 — Watch the war before you explain it.

- **Required — 9:19 — PBS NewsHour:** As Iran expands retaliatory attacks, U.S. urges Americans to leave Middle East  
  https://www.pbs.org/video/iran-war-sot-nick-live-tag-1772489548/
- **Teacher Choice — 9:09 — PBS NewsHour:** Expert panel breaks down U.S. objectives in Iran war  
  https://www.pbs.org/video/war-with-iran-panel-1772489436/
- **Optional Extend — 7:17 — PBS NewsHour:** How the war in Iran is impacting global energy markets  
  https://www.pbs.org/video/energy-risks-1772489465/

## Topic 2 — See the coup, then test what the archive proves.

- **Required — 6:08 — PBS American Experience:** Operation Ajax  
  https://www.pbs.org/video/operation-ajax/
- **Required — 10:07 — PBS American Experience:** Taken Hostage, Part 1 — Chapter 1  
  https://www.pbs.org/video/chapter-1-taken-hostage-part-1/
- **Optional Extend — Long-form — PBS American Experience:** Taken Hostage  
  https://www.pbs.org/wgbh/americanexperience/films/taken-hostage/

## Topic 3 — Watch an alliance collapse.

- **Required Excerpt — teacher-selected replay from 10:07 — PBS American Experience:** Taken Hostage, Part 1 — Chapter 1  
  https://www.pbs.org/video/chapter-1-taken-hostage-part-1/
- **Required — 10:34 — PBS American Experience:** Taken Hostage, Part 2 — Chapter 1  
  https://www.pbs.org/video/chapter-1-taken-hostage-part-2/
- **Optional Extend — Long-form — PBS American Experience:** Taken Hostage — Part 2  
  https://www.pbs.org/wgbh/americanexperience/films/taken-hostage/

## Topic 4 — Experience the war, then examine the strategy it helped shape.

- **Required Excerpt — 13:11 (3:52–17:03) — BBC World Service:** The untold story of the Iran-Iraq war’s frontline children  
  https://www.youtube.com/watch?v=aHZRvpuW8QM&t=232s
- **Required — short explainer — BBC News:** What is Iran’s “Axis of Resistance”?  
  https://www.youtube.com/watch?v=gtLlqDGQItw
- **Optional Extend — selected chapter from 50+ min — BBC World Service:** Hamas, Hezbollah, Houthis — Iran’s proxies at work  
  https://www.youtube.com/watch?v=C2wTk6b9Wgc

## Topic 5 — Understand the bargain before judging why it failed.

- **Required — 7:27 — PBS NewsHour:** What’s in the Iran nuclear framework agreement?  
  https://www.pbs.org/video/iran-nuclear-agreement-sets-path-for-final-accord-1435189432/
- **Required Excerpt — 16:35 (1:25–18:00) — BBC News / The Global Story:** Why was the last US nuclear deal with Iran ripped up?  
  https://www.youtube.com/watch?v=-6TVgqxi7q0&t=85s
- **Optional Extend — ~5 min from 18:00 — BBC News / The Global Story:** How 2015 compares with the 2026 negotiating environment  
  https://www.youtube.com/watch?v=-6TVgqxi7q0&t=1080s

## Topic 6 — Watch the threshold move.

- **Required — 8:47 — PBS NewsHour:** Middle East experts on Israel’s response to Iran’s attack  
  https://www.pbs.org/video/region-on-edge-1713387563/
- **Required — 11:05 — PBS NewsHour:** Middle East again on edge after largest aerial attack ever launched against Israel  
  https://www.pbs.org/video/lebanon-tape-1727817864/
- **Optional Extend — 7:55 — PBS NewsHour:** What’s next after Iran’s missile barrage on Israel? Mideast experts weigh in  
  https://www.pbs.org/video/lebanon-guest-dis-1727818135/

## Topic 7 — See how geography becomes leverage.

- **Required — short explainer — BBC News:** What is the Strait of Hormuz?  
  https://www.youtube.com/watch?v=vMn6K1COWqQ
- **Required — short explainer — BBC News:** Why it’s so hard for US to regain Strait of Hormuz from Iran  
  https://www.youtube.com/watch?v=zMS3_5O8kF0
- **Teacher Choice — 5–10 min discussion:** Tanker War comparison using the existing Topic 7 timeline and source desk.

## Topic 8 — Reset, retrieve, then argue.

- **Required Excerpt — teacher selects 8–12 min from 26:46 — PBS Compass Points:** What war in Iran has revealed and what remains unknown  
  https://www.pbs.org/video/what-war-in-iran-has-revealed-and-what-remains-unknown-wewkol/
- **Optional Current Update — 9:59 — PBS NewsHour:** Where Iran war stands as 60-day negotiating window expires  
  https://www.pbs.org/video/war-with-iran-1786999739/
- **Required — 5–15 min retrieval:** Rewatch the earlier video tied to the student’s #1 turning point.

## Pre-unit launch check

Run the static check any time:

```bash
node scripts/check-iran-videos.js
```

Before the unit launches, run the live link check from a network that can reach PBS and YouTube:

```bash
node scripts/check-iran-videos.js --live
```

For a faster check of only required and required-excerpt cards:

```bash
node scripts/check-iran-videos.js --live --required-only
```

A successful live check confirms that the configured URLs respond. It does **not** replace one final student-Chromebook check for school filtering, authentication, captions, or district-specific YouTube restrictions.
