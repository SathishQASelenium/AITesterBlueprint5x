# VWO Login Functional Test Plan from STAR Prompt (DOCX)

## Date
2026-11-14

## Objective
Use the STAR prompt in `Chapter_03_Prompt_Engineering_QA/STAR.md` to produce a functional test plan for the VWO login page (`https://app.vwo.com/`) that follows `Chapter_03_Prompt_Engineering_QA/Template.md`, and deliver it as an editable Word document in `Chapter_03_Prompt_Engineering_QA/output/`.

## Tools and Technologies Used
- Command Code (agent runtime)
- Python 3 with `python-docx` 1.2.0 for DOCX generation
- Microsoft Word COM automation for PDF export and page-count validation
- Windows PowerShell 5.1
- Repo assets: `STAR.md`, `Template.md`, `Templates/Template_STAR.md`

## Steps Performed
1. Read `STAR.md`, `Template.md`, `Templates/Template_STAR.md`, and `MyNotes.md` to extract the required sections, template structure, and the "no invention" constraints.
2. Confirmed `Chapter_03_Prompt_Engineering_QA/output/` existed and was empty; checked for `pandoc` and `python-docx` (chose `python-docx`).
3. Wrote a generator script in the session scratchpad that builds the plan with styled headings, shaded/repeating table headers, fixed table widths, and page-number fields in the footer.
4. Structured the document around the Template.md sections (Test Plan, Test Strategy, Schedule, Deliverables, Entry/Exit, Execution, Closure, Tools, Risks, Approvals) while including every element requested in the STAR Result section (plan ID/title, objective, in/out of scope, approach, scenarios, environment/data, criteria, deliverables, risks, open questions).
5. Modelled 16 test cases (positive, negative, boundary), each traced to REQ-01..REQ-05; marked every unspecified behavior as "Requires clarification" and labelled proposed thresholds as "Recommendation".
6. Generated the DOCX, exported it to PDF with Word to validate rendering (9 pages), fixed a 1 cm table-width overflow in the 6-column test-case table, and regenerated.
7. Verified the saved DOCX programmatically: 21 tables, 34 headings, footer fields present, and the approved error message recorded verbatim.

## Code Examples
Minimal repeating-header and fixed-layout setup used for editable tables:

```python
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

layout = OxmlElement("w:tblLayout")
layout.set(qn("w:type"), "fixed")
table._tbl.tblPr.append(layout)

trPr = row._tr.get_or_add_trPr()
header = OxmlElement("w:tblHeader")
header.set(qn("w:val"), "true")
trPr.append(header)
```

DOCX to PDF validation via Word COM:

```powershell
$w = New-Object -ComObject Word.Application
$d = $w.Documents.Open($docx, $false, $true)
$d.ExportAsFixedFormat($pdf, 17)
$d.ComputeStatistics(2)   # page count
```

## Challenges Faced
- `Template.md` is a table of contents, while the STAR prompt asks for a different, more specific list of sections; a straight copy of either would miss requirements. The plan maps both structures together.
- The approved requirements are deliberately narrow, so boundary and negative coverage quickly runs into unspecified behavior (password rules, validation text, lockout, session timeout).
- The 6-column test-case table initially summed to 18 cm against a 17 cm printable width, which would overflow the right margin.
- No LibreOffice or PDF renderer was installed; Word COM was available for export, but not for page-image rendering.

## Solutions Implemented
- Combined the Template.md skeleton with the STAR Result checklist so both the template structure and the explicit deliverables are present.
- Kept every unspecified item as "Requires clarification" with a matching open question ID (Q-01..Q-11), and did not invent password policy, alternate error text, lockout thresholds, or session timings.
- Flagged proposed quality thresholds (severity scale, exit percentages, browser matrix) as "Recommendation" rather than requirements.
- Reduced column widths to a 17 cm total and verified by regeneration; confirmed the document opens and exports cleanly in Word.
- Stored no credentials in the plan; test-account provisioning is listed as a clarification/dependency.

## Key Learnings
- The STAR prompt's Result section is the contract for the deliverable; the referenced template supplies structure but not the full content checklist.
- Anti-hallucination prompts are best satisfied by pairing each "Requires clarification" item with a traceable open-question ID in a dedicated table.
- `python-docx` produces genuinely editable Word tables and headings; shading, fixed layout, and repeating header rows need small OxmlElement snippets.
- Word COM is a reliable validation path on this machine for DOCX sanity checks (open + export + page count) when LibreOffice is absent.

## Testing and Verification
- Generated file: `Chapter_03_Prompt_Engineering_QA/output/VWO_Login_Functional_Test_Plan.docx` (~47 KB).
- Word exported the document to PDF successfully: 9 pages, so the DOCX is valid and renders without errors.
- Programmatic check: 21 tables, all required headings present, footer shows the plan ID and page fields.
- Content check: approved error message string stored verbatim; no credentials or personal data included.
- No automated test suite applies to this documentation deliverable; no application testing was performed.

## Future Improvements
- Add an auto-updating Word table of contents once the reviewer confirms the final section order.
- Replace schedule placeholders and approval names when the project provides them.
- Reuse the generator script as a template for other chapter deliverables so DOCX formatting stays consistent.
- Consider exporting a PDF copy alongside the DOCX after review, if the chapter workflow requires both formats.

## Completion Workflow
- Requested task completed; deliverable written to `Chapter_03_Prompt_Engineering_QA/output/VWO_Login_Functional_Test_Plan.docx`.
- Learning file created: `learnings/2026-11-14-vwo-login-star-test-plan-docx.md`.
- Not committed or pushed (no authorization given).
