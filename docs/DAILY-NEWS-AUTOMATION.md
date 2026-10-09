# Daily News Refresh: classroom publishing runbook

**Owner:** BeCurrent / The Desk
**Single source of truth:** `assets/data/daily-news.js`
**Workflow:** `.github/workflows/daily-news-refresh.yml`
**Discovery and verification:** `scripts/refresh-daily-news.js`

## What runs, and when

GitHub Actions runs on school weekdays at 10:15 UTC and 12:15 UTC, which provides an early attempt and a backup across Eastern daylight and standard time. GitHub schedules are best-effort, not guaranteed alarms. **There is no local-hour skip gate.** A delayed run attempts the refresh rather than silently reporting success.

Use [Daily News Refresh](https://github.com/JeffAndersonLogic/BeCurrent/actions/workflows/daily-news-refresh.yml) > **Run workflow** for an unscheduled run. Changes to the refresh script or workflow on `main` also start a run.

## What is and is not automatic

A successful run selects **one automated shared Lead and four Current Wire items**, from the approved news sources. The Lead is therefore *automatically selected*, not personally approved by the teacher before publication. Review it before class when editorial selection matters.

The updater first tries BBC News and NewsNation publisher RSS feeds plus GDELT discovery for AP News, Reuters, BBC and NewsNation. GDELT only helps find candidates. The script does **not** treat GDELT's first-seen date as the article's publication date. Articles need an actual publisher date (from publisher RSS or article metadata), a matching HTTPS outlet URL and a recent publication date. It attempts to verify publisher article links. Publisher RSS itself is accepted as primary evidence when automated page reads are blocked. If fewer than five eligible stories pass, it fails and leaves the old news data file unchanged.

A verified publisher description is preferred to an AI-written summary. Generic reading guidance is used when no publisher description is available. No large language model or invented claims are needed for unattended updates.

## How the protected branch is updated

1. Fetch fresh candidate articles.
2. Run the BeCurrent offline safety gate.
3. Commit the new news data on a temporary automation branch.
4. Explicitly dispatch the repository's full `Validate` workflow against that commit. This is necessary because pushes authenticated with `GITHUB_TOKEN` do not trigger ordinary push workflows.
5. Wait for **Structure and offline tests** and **Browser contracts** to pass.
6. Fast-forward `main` only if checks pass and the branch has not changed underneath the job.

No generated lesson files, Canvas documents or student local work are changed.

## Failure handling

Failed runs are **red**, not skipped green. The workflow creates or updates an open GitHub issue titled **BeCurrent Daily News Refresh failed**, linking to the failed Actions run. A subsequent successful run closes the alert.

If the news data is more than roughly 48 hours old, the homepage and The Desk show a visible refresh-delay warning instead of representing the old story as newly updated.

To troubleshoot: open the [workflow history](https://github.com/JeffAndersonLogic/BeCurrent/actions/workflows/daily-news-refresh.yml), open the most recent failed run, and inspect the exact failing step. The most likely failures are unavailable source feeds, publishers blocking automated reads, insufficient recent verified articles, a validation failure, or a branch-protection/publishing rejection.

## Manual classroom override

For a time-sensitive teacher-curated lead, edit `assets/data/daily-news.js` using an accurate direct article URL, publication date, publisher, verified headline and neutral short description. The next automatic run may replace it. For a lasting override, disable the *Daily News Refresh* workflow temporarily in the GitHub Actions UI and re-enable it when ready. Do not put student writing in this file.

## Tests

`npm test` includes `scripts/test/daily-news-refresh.test.js` for domain checks, publication-date age, publisher metadata, publisher RSS parsing, selection and fail-closed behavior. The full publishing workflow separately runs the Chromium browser contracts before pushing to `main`.
