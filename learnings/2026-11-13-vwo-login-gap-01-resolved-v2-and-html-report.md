# VWO Login Test Cases v2 — GAP-01 Resolved and HTML Quality Report

## Date
2026-11-13

## Objective
Regenerate the VWO login dashboard test cases after the user resolved GAP-01: `app.vwo.com` and `app.wingify.com` are the same application, `app.vwo.com` was the previous address, and hitting it now resolves to `app.wingify.com`. Produce a new version in `Chapter_02_Prompt_Engineering/output/` using RICE-POT and the anti-hallucination rules, and generate a self-contained HTML report that answers whether the new information enabled better test cases.

## Tools and Technologies Used
- Command Code agent runtime
- Python 3.14 for markdown table parsing, count validation, and phrase compliance checks
- Windows PowerShell 5.1 for command execution and headless Chrome rendering
- Google Chrome headless (`--headless --screenshot`) for visual verification of the HTML report
- Markdown for the regenerated test case document
- Self-contained HTML/CSS for the quality report, with no external assets or JavaScript
- Repository inputs:
  - `Chapter_02_Prompt_Engineering/Product Requirements Document_ VWO Login Dashboard.pdf`
  - `Chapter_02_Prompt_Engineering/RICE_POT/Template_RICE_POT/Template.RICEPPOT.md`
  - `Chapter_02_Prompt_Engineering/anti-hallucination-rules.md`
  - User-provided GAP-01 clarification dated 2026-11-13

## Steps Performed
1. Re-read the version 1 markdown deliverable and the prior counts: 56 test cases, 23 Verified, 12 Inference, 21 Blocked, 30 open gaps.
2. Treated the GAP-01 clarification as an allowed user-input fact under the anti-hallucination scope. Added verified fact F-41: the two URLs are the same application, and `app.vwo.com` now resolves to `app.wingify.com`.
3. Marked GAP-01 as `Resolved` in the gap register, added a `Status` column, and retained 29 open gaps. GAP-01 is no longer cited by any blocked case.
4. Added one new verified test case, `TC-001A`, for the legacy URL resolving to `app.wingify.com`. Updated `TC-001` to open `app.vwo.com`, confirm the resolution, and inspect HTTPS.
5. Updated the summary counts and coverage table: 57 total cases, 24 Verified, 12 Inference, 21 Blocked, 30 gaps found, 1 resolved, 29 open.
6. Added a version 2 change log showing the one-case improvement and the unchanged blocked count.
7. Wrote the self-contained HTML report `VWO_Test_Case_Quality_Report_GAP-01.html` with metric cards, a before/after table, a CSS bar chart, the new test case, remaining blockers, and a recommendation.
8. Validated the markdown programmatically: 57 test-case rows with 9 columns, 30 gap rows with 6 columns, 24 Verified plus 12 Inference plus 21 Blocked, exact phrase compliance, no blocked case citing GAP-01, and populated traceability.
9. Validated the HTML tag balance and rendered it with headless Chrome to inspect the layout and verdict visually.

## Code Examples

Resolving the new verified fact from the user input:

```text
F-41 | app.vwo.com and app.wingify.com are the same application. app.vwo.com was the
previous address; hitting it now resolves to app.wingify.com.
Source: User input: GAP-01 clarification, 2026-11-13
```

New test case enabled by the clarification:

```text
TC-001A | Access | Legacy app.vwo.com URL resolves to app.wingify.com | None |
1) Open app.vwo.com in a browser. 2) Observe the resolved URL and the rendered page. |
The browser resolves to app.wingify.com and displays the same VWO login application. |
User input: GAP-01 clarification, 2026-11-13; PRD: Executive Summary | P1 | Verified
```

Validation checks:

```python
ver = [l for l in tc if cells(l)[8] == "Verified"]
inf = [l for l in tc if cells(l)[8] == "Inference (low confidence)"]
blk = [l for l in tc if cells(l)[8] == "Blocked"]
assert len(ver) + len(inf) + len(blk) == 57
assert all(cells(l)[5].startswith("Insufficient information to determine.") for l in blk)
assert all("GAP-01" not in cells(l)[5] for l in blk)
assert [cells(l)[0] for l in gap if cells(l)[5] == "Resolved"] == ["GAP-01"]
```

Headless Chrome rendering that worked:

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "file:///" + ($html -replace '\\','/')
& $chrome --headless --disable-gpu --no-sandbox --hide-scrollbars `
  --user-data-dir="$profile" --window-size=1200,2400 --screenshot="$png" $url
```

## Challenges Faced
- The validation parser initially counted a change-log row as a gap register row because the label began with `| GAP-01 |`. That produced 31 gap rows and a four-column row, which broke the status lookup.
- The first headless Chrome attempt using `--headless=new` without a user-data directory produced no screenshot. The legacy `--headless` mode with an explicit `--user-data-dir` succeeded.
- The key judgment was whether the GAP-01 clarification unblocks any blocked test case. It does not: the 21 blocked cases depend on other gaps such as test accounts, password policy, session timeout, 2FA/SSO configuration, performance profiles, and backend evidence.
- Recording the improvement without overstating it was important. One new verified case and one closed gap are real but marginal against 21 blocked cases and 29 open gaps.

## Solutions Implemented
- Added F-41 as a user-input fact, distinct from PRD facts, and used it only for the URL-resolution case.
- Marked GAP-01 as `Resolved` rather than deleting it, preserving the audit trail and making the before/after comparison possible.
- Added a `Status` column to the gap register and updated the RICE-POT output specification accordingly.
- Renamed the change-log label from `GAP-01` to `Environment URL (GAP-01)` so it no longer collides with the gap-register parser.
- Built the HTML report as a standalone file with inline CSS, metric cards, a before/after table, and CSS-only bars, then validated its tag balance and rendered it headlessly.
- Stated the verdict precisely: the new information enabled a better test case, but the suite is only marginally better overall.

## Key Learnings
- Resolving a gap does not automatically unblock test cases; gap-to-case mapping must be checked explicitly. GAP-01 was an environment ambiguity, not the sole blocker for any case.
- Keeping resolved gaps with a status preserves the audit trail and makes improvement measurable, instead of silently deleting history.
- A change-log table can contaminate automated parsers if its labels share prefixes with the data table. Prefixing labels with the domain context avoids the collision.
- A quality report should quantify both the gain and the non-gain: +1 verified case, -1 open gap, 0 unblocked cases, 29 gaps still open.
- Headless Chrome flags are not interchangeable; `--user-data-dir` made the difference between a failed and a successful screenshot.

## Testing and Verification
- Markdown validation results:
  - 57 test-case rows, all with 9 columns.
  - 30 gap rows, all with 6 columns.
  - 24 Verified, 12 Inference, 21 Blocked; totals 57.
  - All 21 Blocked expected results begin with `Insufficient information to determine.`
  - All 12 Inference expected results begin with `Inference (low confidence)`.
  - No Blocked case cites GAP-01.
  - No empty traceability cells.
  - 57 unique test-case IDs and 30 unique gap IDs.
  - GAP-01 is the only Resolved gap; 29 gaps are Open.
- HTML validation results:
  - All checked tags balanced: html, head, body, header, main, section, div, table, thead, tbody, tr, th, td, style.
  - File size approximately 20.8 KB.
  - Headless Chrome produced a screenshot of approximately 326.5 KB; the verdict, metric cards, before/after table, bar chart, and new test case were visually inspected and rendered correctly.
- No execution results or pass/fail statuses were claimed, because no environment or test data was provided.

## Future Improvements
- Obtain test accounts (GAP-02), which would unblock up to six cases and is the highest-leverage next input.
- Obtain the error-message catalog (GAP-05), password policy (GAP-04), session timeout (GAP-07), and backend/security evidence (GAP-23).
- Define the performance measurement method, load profile, uptime window, browser/device matrix, and accessibility audit method.
- Add an automated check that every blocked case cites only open gaps, so a resolved gap cannot accidentally remain as a blocker.
- If the suite grows, move the markdown table into a machine-readable CSV while keeping the RICE-POT document as the audit narrative.

## Completion Workflow
- Requested task completed; regenerated deliverable: `Chapter_02_Prompt_Engineering/output/VWO_Login_Dashboard_Test_Cases_RICE_POT.md` (version 2, 57 cases).
- HTML quality report: `Chapter_02_Prompt_Engineering/output/VWO_Test_Case_Quality_Report_GAP-01.html`.
- Learning file created: `learnings/2026-11-13-vwo-login-gap-01-resolved-v2-and-html-report.md`.
- GAP-01 resolved; 29 gaps remain open; 21 of 57 cases remain blocked.
- Not committed or pushed, because no commit or push authorization was given.
