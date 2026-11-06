# VWO Login Dashboard Test Plan Regeneration (Basic Skill)

## Date
2026-11-04

## Objective
Run the basic skill `testplan-creator-skill` (`Chapter_00_SKILL_Basics/00_Basic_Skills/testplan-creator-skill/SKILL.md`) against the VWO Login Dashboard PRD and regenerate the deliverable in `Chapter_00_SKILL_Basics/output/` in both **HTML** and **PDF** formats. The requester explicitly chose "Regenerate and replace" for the existing `VWO_Login_Dashboard_Test_Plan.html` / `.pdf`. Apply the repository's `AGENTS.md` learning-journal rules.

## Tools and Technologies Used
- Command Code (agent runtime) + user-provided skill `testplan-creator-skill`
- Self-contained HTML/CSS (print-friendly document, VWO brand styling)
- Google Chrome headless (`--headless=new --print-to-pdf`) for HTML → PDF
- Windows PowerShell 5.1 (PDF validation, page count, temp cleanup)
- Repo assets: the skill `SKILL.md` template and the provided VWO Login Dashboard PRD

## Steps Performed
1. Read the skill `SKILL.md` to extract the exact template structure (Objective, Scope, Inclusions, Test Environments, Defect Reporting Procedure, Test Strategy, Test Schedule, Test Deliverables, Entry and Exit Criteria, Tools, Risks and Mitigations, Approvals) and the "use user-provided information only" core principles.
2. Discovered the target deliverable already existed and was committed in `Chapter_00_SKILL_Basics/output/`; confirmed with the requester how to proceed (chose regenerate and replace).
3. Read the existing HTML plan to keep the proven layout/CSS approach and the VWO branding.
4. Rewrote `VWO_Login_Dashboard_Test_Plan.html` — a self-contained, print-ready document adapting the skill template to the VWO Login Dashboard PRD (login/session/logout flows, SSO, accessibility, security, performance), with an updated cover date (03 November 2026).
5. Found the Chrome executable and rendered the PDF from the finished HTML as the single source of truth.
6. Verified the PDF header and page count, then removed the temporary Chrome user-data profile.

## Code Examples
Render the PDF from the finished HTML (single source of truth):

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url    = "file:///" + ($html -replace '\\','/')
& $chrome --headless=new --disable-gpu --no-sandbox `
  --user-data-dir="$tmp" --no-pdf-header-footer `
  --print-to-pdf="$pdf" $url
```

Validate the result (header + page count):

```powershell
$bytes = [IO.File]::ReadAllBytes($pdf)
$text  = [Text.Encoding]::GetEncoding("iso-8859-1").GetString($bytes)
[Text.Encoding]::ASCII.GetString($bytes[0..7])                 # %PDF-1.4
([regex]::Matches($text, "/Type\s*/Page[^s]")).Count           # 9
```

## Challenges Faced
- The requested deliverable already existed in the exact target location and was committed, so regenerating risked overwriting prior work — this ambiguity required a confirmation before writing.
- HTML → PDF on Windows has no guaranteed toolchain (`wkhtmltopdf` was absent); rendering depends on an installed Chromium browser.
- Preserving identical look between the HTML and the PDF requires the PDF be generated from the same HTML (not a separate template).

## Solutions Implemented
- Confirmed intent ("Regenerate and replace") before destructive overwrite, consistent with the safety guidance in the repo AGENTS.md.
- Used headless Chrome, which is present on the machine, to convert the HTML directly into an A4 print PDF with print CSS (`@page`, break-avoid rules).
- Kept the skill's anti-invention rule: content is grounded in the provided PRD plus the skill's own template (field labels, example structure), with nothing fabricated beyond that.
- Wrote to a temporary Chrome profile in the OS temp dir and deleted it after rendering so no stale profile or locked files remain.

## Key Learnings
- The basic skill is a **template-filling** workflow: it defines a fixed 12-section skeleton and expects the tester's PRD to be mapped onto it, rather than inventing new structure.
- A self-contained HTML (inline CSS, no external assets) converts cleanly and deterministically to PDF with headless Chrome, keeping the HTML and PDF 1:1.
- Reading the existing committed artifact first made the regeneration low-risk and preserved a layout the reviewer already accepted.
- Verifying the generated PDF (magic header + page count) is a cheap, reliable sanity check for a non-code deliverable.

## Testing and Verification
- The regenerated PDF reports header `%PDF-1.4` and 9 page objects — a valid, multi-page A4 document.
- File written to `Chapter_00_SKILL_Basics/output/VWO_Login_Dashboard_Test_Plan.pdf` (~203 KB).
- No automated test suite applies to this documentation/deliverable task; verification was manual (file existence, PDF header, page count).
- Temporary Chrome profile cleaned up; no processes left running.

## Future Improvements
- Add a reusable HTML→PDF helper script so the render step is a single command instead of an inline shell invocation.
- Replace the template's placeholder schedule dates and POC rows with project-confirmed values once available, keeping the "no invention" rule intact.
- Consider linking the sibling `VWO_Login_Dashboard_Test_Cases.*` artifacts from the plan once creation of test cases is authorized.

## Completion Workflow
- Requested task completed; deliverables written to `Chapter_00_SKILL_Basics/output/`:
  - `VWO_Login_Dashboard_Test_Plan.html` (regenerated)
  - `VWO_Login_Dashboard_Test_Plan.pdf` (regenerated, 9 pages)
- Learning file created: `learnings/2026-11-04-vwo-login-dashboard-test-plan-regeneration.md`.
- Not committed or pushed (no authorization given).
