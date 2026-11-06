# VWO Login Dashboard Test Case Generation (Basic Skill)

## Date
2026-11-04

## Objective
Run the basic skill `testcase-creator-skill` (`Chapter_00_SKILL_Basics/00_Basic_Skills/testcase-creator-skill/SKILL.md`) against the VWO Login Dashboard PRD and Test Plan, and (re)generate the deliverable in `Chapter_00_SKILL_Basics/output/` in **CSV, XLSX and HTML** formats. The requester explicitly chose "Regenerate all three" for the existing `VWO_Login_Dashboard_Test_Cases.*` artifacts. Apply the repository's `AGENTS.md` learning-journal rules.

## Tools and Technologies Used
- Command Code (agent runtime) + user-provided skill `testcase-creator-skill`
- Python 3.14 (single generator script as the source of truth)
- Python stdlib `csv` (QUOTE_ALL + `utf-8-sig` BOM for Excel-friendly CSV)
- `openpyxl` 3.1.5 (styled XLSX: header fill, priority cell fills, freeze panes, autofilter, column widths)
- Self-contained HTML/CSS (VWO brand styling, print-friendly, A4 landscape print CSS)
- Google Chrome headless (`--headless=new --screenshot`) for visual verification of the HTML
- Repo assets: the skill `SKILL.md` template, the VWO Login Dashboard Test Plan, and the provided PRD

## Steps Performed
1. Read the skill `SKILL.md` to extract the exact template header: `Scenario_TID, TestCase Description, PreCondition, TestSteps, Expected Result, Actual Result, Steps to Execute, Expected Result, Actual Result, Status, Executed QA Name, Misc (Comments), Priority, Is_Automated`, plus the "use user-provided information only" core principles and the "no personal data" safety rule.
2. Read the existing `VWO_Login_Dashboard_Test_Plan.html` (PRD-aligned plan) and the previously committed `VWO_Login_Dashboard_Test_Cases.csv` to keep the proven layout/content approach; confirmed the artifacts already existed and asked the requester how to proceed (chose regenerate all three).
3. Authored a **single Python generator** holding all 68 test cases as one data structure and emitting CSV, XLSX and HTML from it, so the three formats cannot drift apart.
4. Structured coverage by area: Authentication, Input Validation, Password Management, Session Management, Multi-Factor & SSO, User Experience, Accessibility, Security, Performance, Integration & Compliance, Compatibility — each case traceable to the PRD/test plan.
5. Generated the three files into `Chapter_00_SKILL_Basics/output/`.
6. Verified all three: CSV row/column counts and header equality, XLSX dimensions and header, HTML row count and TID set equality across formats, and badge counts per priority/automation.
7. Rendered the HTML with headless Chrome and visually inspected the cover, metadata table, stat cards and table.

## Code Examples
Single source of truth — every case is added once and rendered three ways:

```python
HEADERS = ["Scenario_TID", "TestCase Description", "PreCondition", "TestSteps",
           "Expected Result", "Actual Result", "Steps to Execute", "Expected Result",
           "Actual Result", "Status", "Executed QA Name", "Misc (Comments)",
           "Priority", "Is_Automated"]

def write_csv(path):
    with open(path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, quoting=csv.QUOTE_ALL)
        w.writerow(HEADERS)
        w.writerows(rows())
```

Styled XLSX with openpyxl (header fill, priority cell colour, freeze + filter):

```python
ws.append(HEADERS)
for col in range(1, len(HEADERS) + 1):
    cell = ws.cell(row=1, column=col)
    cell.fill = PatternFill("solid", fgColor="0E7EF3")
    cell.font = Font(bold=True, color="FFFFFF", size=11)
ws.freeze_panes = "A2"
ws.auto_filter.ref = f"A1:{get_column_letter(len(HEADERS))}{len(C) + 1}"
```

HTML rows render TestSteps as an ordered list and Priority/Is_Automated as colour-coded pills:

```python
f'<td class="steps-cell"><ol class="steps">{steps_li}</ol></td>'
f'<td class="ctr">{badge_prio(c["priority"])}</td>'
f'<td class="ctr">{badge_auto(c["automated"])}</td>'
```

## Challenges Faced
- The requested deliverables already existed in the exact target location and were committed, so regenerating risked overwriting prior work — this ambiguity required a confirmation before writing.
- The skill template has **two** `Expected Result` and **two** `Actual Result` columns (a steps-level pair and an execution-level pair); they must be preserved verbatim even though the names repeat, which is confusing to read but required by the template.
- Keeping three formats perfectly consistent by hand is error-prone; a single generator is the reliable way to avoid drift.
- The wide (14-column) table exceeds common viewport widths, so HTML horizontal overflow had to be handled with a scroll container and verified by rendering at a large width.

## Solutions Implemented
- Confirmed intent ("Regenerate all three") before overwriting the committed artifacts, consistent with the repo's safety guidance.
- Wrote one Python generator as the single source of truth so CSV, XLSX and HTML are guaranteed to carry identical rows, TIDs, priorities and automation flags.
- Preserved the skill's exact 14-column header (including the duplicated Expected/Actual Result pairs) and the "no invention" rule — content is grounded in the provided PRD/test plan only, with no fabricated results.
- Used `utf-8-sig` + `QUOTE_ALL` for the CSV (Excel-friendly) and applied lightweight openpyxl styling (fills, wrap, freeze, filter, widths) so the XLSX is presentable, not a raw dump.
- Rendered the HTML with headless Chrome to visually confirm the cover, meta table, stat cards and table before finishing.

## Key Learnings
- The basic skill is a **template-filling** workflow: a fixed column schema is mapped onto the tester's PRD, not a new structure invented from scratch.
- A single generator script (data → CSV/XLSX/HTML) is the cleanest way to guarantee multi-format consistency for a non-code deliverable.
- Reading the previously committed artifact first made regeneration low-risk and preserved a layout the reviewer had already accepted.
- The template's duplicate `Expected Result` / `Actual Result` columns are intentional (steps-level vs execution-level) and must not be "de-duplicated".
- Verifying a non-code deliverable programmatically (row/column/header counts, cross-format TID equality) plus one visual render is a cheap, high-confidence check.

## Testing and Verification
- **CSV**: 69 rows (header + 68 cases), exactly 14 columns on every row; header equals the skill template header → PASS.
- **XLSX**: sheet `Test Cases`, dimensions `A1:N69`, header row equals the template header → PASS.
- **HTML**: 68 data rows; header row and all 14 column headers present → PASS.
- **Cross-format consistency**: TID sets identical for CSV↔XLSX and CSV↔HTML; all TIDs unique → PASS.
- **HTML badges**: 68 Priority pills (30 High, 31 Medium, 7 Low) and 68 Is_Automated pills (27 Yes, 41 No), matching the summary stat cards → PASS.
- **Visual**: headless-Chrome screenshots inspected — cover, metadata table, six stat cards and the test case table render cleanly and legibly.
- No automated test suite applies to this documentation/deliverable task; verification was the programmatic checks above plus a visual render.

## Future Improvements
- Add a reusable CSV→XLSX/HTML helper so the three formats can be regenerated from an edited CSV alone.
- Resolve the template's duplicate `Expected Result` / `Actual Result` naming with the skill author (e.g., qualifiers) for readability.
- Replace placeholder status/QA fields with execution results once the cases are executed, keeping the "no invention" rule intact.
- Consider adding a JIRA/CSV import path so cases can be pulled into the test management tool directly.

## Completion Workflow
- Requested task completed; deliverables regenerated in `Chapter_00_SKILL_Basics/output/`:
  - `VWO_Login_Dashboard_Test_Cases.csv` (68 cases)
  - `VWO_Login_Dashboard_Test_Cases.xlsx` (68 cases, styled)
  - `VWO_Login_Dashboard_Test_Cases.html` (68 cases, branded, print-ready)
- Learning file created: `learnings/2026-11-04-vwo-login-dashboard-test-cases-generation.md`.
- Not committed or pushed (no authorization given).
