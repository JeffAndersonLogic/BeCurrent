# The Desk has two scheduled modes

This rule supersedes the legacy fixed-cadence language in the root `CLAUDE.md` that says the full Desk is the first half of every class and that every student files two stories every class period.

The current student architecture is **The Lead + Your Pick**, not the retired Local / National-or-International lane model. Internal ids may still be `local` and `world` for backwards compatibility; do not rename them casually.

## Non-negotiable course rhythm

Every BeCurrent class begins with current news. **Daily exposure is non-negotiable; daily production volume is not identical.**

- **Full Desk is the default.** Students Know the Lead, Choose Your Pick, File Both, Make One Judgment, and Copy My Desk.
- **Lead Mode is scheduled deliberately** on high-cognitive-load investigation days. Students still open/read the shared Lead, file what happened and why it matters, and copy that filing into the same News Log. Your Pick is removed for that date.
- Lead Mode is never a panic button for a class that is running late. It belongs in `assets/data/announcements-schedule.js` as `deskMode: 'lead'` before class.
- Breaking-news days may expand the Desk instead of shrinking it. Do not encode a fixed student-facing minute count.

## Storage and Canvas contract

`assets/js/desk-capture-v2.js` stores the day mode in the existing dated localStorage sheet as `_mode: 'lead'` or `_mode: 'full'`.

- Full days gather the existing two lanes.
- Lead days gather only the first/internal `local` lane, which is the visible **The Lead** lane.
- A Lead Mode day must produce exactly one source record plus the two Lead response records. Do not manufacture blank Your Pick rows.
- Mixed Full/Lead days must coexist in the same two-week News Log and use the same Canvas record grammar.
- Nothing sends student writing over the network.

## Source of truth

The dated schedule owns the pedagogical mode for a day. Omit `deskMode` for Full Desk; set `deskMode: 'lead'` only when the investigation earns sustained time.

The current Iran recommendation is:

- opening/current-anchor lessons: Full Desk unless there is another reason to shorten;
- the nuclear-bargain lesson: Lead Mode when that date is scheduled;
- the final causation synthesis: Lead Mode when that date is scheduled.

Do not invent dates for unscheduled Iran sections. Add the mode when the class date itself is added to the schedule.
