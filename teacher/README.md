# BeCurrent Teacher Tools

This directory is the permanent home for teacher-facing BeCurrent tools. It is intentionally not linked from student lesson/week pages.

## Run of Show

- **Iran at War:** `teacher/iran-run-of-show.html`
- **Teacher landing page:** `teacher/index.html`

The Run of Show is the live classroom cockpit: day selector, pacing modes, phase timer, Land / Protect / Cut priorities, teacher moves, discussion prompts, quick-launch lesson links, and browser-saved class notes.

Future BeCurrent unit Run of Show pages should live in this same directory and be linked from `teacher/index.html`. The naming convention is:

`teacher/<unit-slug>-run-of-show.html`

## Canvas analysis tool

The planned analysis surface remains a port of BeHistorical's `teacher/skills-lens.html`: a single page that reads the Canvas `submissions.zip` directly, entirely in the tab, with no network call and the name-to-code crosswalk held in memory only.

Until it exists, the command line does the same job:

```bash
node scripts/parse-canvas-submissions.js path/to/unzipped-submissions/
```

Two rules remain in force:

1. **Never link teacher tools from a student week page.**
2. **Analysis denominators come from the week data, never from what a student managed to submit.**

The parser must be the same file, inlined at build time, not a copy. Two implementations would mean two answers to "did this student edit their work" depending on which door the teacher used.
