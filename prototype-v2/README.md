# BeCurrent 2.0 prototype

Isolated redesign prototype. Nothing in this directory is linked from the production student homepage.

## Open locally

From the repo root:

```bash
npm run serve
```

Then open:

`http://127.0.0.1:8765/prototype-v2/`

## What this proves

- Today-first homepage
- Signal Silver / warm-paper editorial system
- Top-navigation publication layout rather than a permanent dashboard rail
- Iran at War as the first Reverse History investigation
- Three-thread historical spine
- Prediction, evidence, claim, reflection and local progress persistence
- Public Student / Teacher view separation without pretending teacher content is secure
- Current layer separated from the stable historical spine

## Prototype limits

- Not connected to production Canvas capture
- Not connected to MagicSchool
- Current Wire is manually curated
- Hero image is loaded from Wikimedia Commons and should be localized with an approved fallback before production
- Current-event claims should be reviewed before classroom use
- Production integration should reuse the repo's tested Canvas/localStorage/parser contracts rather than replace them
