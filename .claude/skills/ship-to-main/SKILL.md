---
name: ship-to-main
description: "Get a finished, tested BeCurrent change onto main, which GitHub Pages serves to students, using the branch-then-fast-forward workflow instead of a pull request. Use whenever Jeff says 'ship this', 'push it live', 'get this to main', 'publish to students', 'deploy this', or when you've finished a change and CLAUDE.md's git rules apply. Also use to check whether the branch-protection ruleset is applied yet, or to apply it."
---

# Ship a BeCurrent Change to main

`main` is the deploy branch: what's on it is what students see. There are no pull
requests here. The flow is: push the work to any branch, wait for Validate to go green
on that exact commit, then fast-forward `main` to it.

**Whether this matters depends on one fact you should check first**: has
`.github/branch-ruleset.json` (name: "Protect main") actually been applied to the repo
yet? If not, CLAUDE.md says committing straight to `main` still works and nothing stops
an untested commit reaching students, so the safest habit is to follow this flow either
way rather than relying on protection that may not be active.

## Step 0: Check whether the ruleset is active

```bash
gh api repos/JeffAndersonLogic/BeCurrent/rulesets --jq '.[].name'
```

If `Protect main` is not listed, the ruleset has not been applied. Apply it (only if
Jeff asks you to, this changes how pushes to `main` behave for good):

```bash
gh api --method POST /repos/JeffAndersonLogic/BeCurrent/rulesets \
  --input .github/branch-ruleset.json
```

If a broken CI is blocking an urgent classroom fix and the ruleset is already active,
the documented escape hatch is setting `"enforcement": "evaluate"` on the ruleset in
GitHub Settings → Rules, not a force push. Only do this if Jeff explicitly asks; it is a
shared-state change like any other in the "actions visible to others" category.

## Step 1: Validate locally before pushing anything

```bash
npm test              # scripts/validate.js + the offline suite, a few seconds
```

If you touched a modal open/close path, the deck, the Gather panel, or the brief
capture key, also run the browser contracts (needs `npm i playwright-core` once):

```bash
npm run test:browser
```

Do not push on a hunch that it's fine. A push that turns CI red costs a cycle and, once
the ruleset is active, blocks `main` from moving at all until it's fixed.

## Step 2: Commit and push to a working branch, never straight to main

```bash
git add <files>
git commit -m "..."
git push -u origin <branch-name>
```

Any branch name works; it does not need to be a `claude/...` branch unless you were
told to use one.

## Step 3: Wait for both required checks on that exact commit

The two required contexts (from `.github/branch-ruleset.json`) are:
- `Structure and offline tests`
- `Browser contracts`

They run in parallel from `.github/workflows/validate.yml` on every push. Poll:

```bash
gh run list --branch <branch-name> --limit 5
gh run watch <run-id>          # or watch the most recent run for the branch
```

Both must show success on the commit SHA you just pushed. A run against an older commit
on the same branch does not count.

## Step 4: Fast-forward main to that commit

Required checks bind to the commit SHA, not the branch, so once both are green the
fast-forward is accepted immediately, no new CI run needed.

```bash
git fetch origin main
git push origin <branch-name>:main
```

This only succeeds if it's a genuine fast-forward (the ruleset's `non_fast_forward` rule
blocks anything else). If it's rejected because `main` moved since you branched, merge or
rebase `main` into your branch, push the branch again, wait for the two checks to go
green on the new commit, then retry the fast-forward. Never force-push `main`.

Alternatively, if you'd rather work locally:

```bash
git fetch origin main
git checkout main
git merge --ff-only origin/<branch-name>
git push origin main
```

Both accomplish the same fast-forward; use whichever fits how you're already working.

## Step 5: Confirm

GitHub Pages redeploys automatically from `main` on push (repo Settings → Pages, "Deploy
from a branch"). There is no separate deploy step. Tell Jeff the commit is on `main` and,
if it's a student-visible change, that Pages will pick it up on its normal schedule
(typically under a minute, but don't promise an exact time).
