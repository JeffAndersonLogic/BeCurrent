# Teacher tools

Empty on purpose, for now.

The analysis surface that belongs here is a port of BeHistorical's
`teacher/skills-lens.html`: a single page that reads the Canvas `submissions.zip`
directly, entirely in the tab, with no network call and the name-to-code crosswalk
held in memory only.

Until it exists, the command line does the same job:

```bash
node scripts/parse-canvas-submissions.js path/to/unzipped-submissions/
```

Two rules to carry over when the Lens is built:

1. **Never link it from a week page.** It is a teacher tool.
2. **Its denominators come from the week data, never from what a student managed to
   submit.** A bare n is the bug this pipeline exists to prevent.

The parser must be the *same file*, inlined at build time, not a copy. Two
implementations would mean two answers to "did this student edit their work"
depending on which door the teacher used.
