# Adactin Hotel App Login Functional Test Plan from STAR Prompt (DOCX)

## Date
2026-11-14

## Objective
Use the STAR prompt in `Chapter_03_Prompt_Engineering_QA/STAR_HotelApp.md` to produce a functional test plan for the Adactin Hotel App login page (`http://www.adactin.com/HotelAppBuild2/index.php`), structured against `Chapter_03_Prompt_Engineering_QA/Template.md`, and deliver an editable Word document in `Chapter_03_Prompt_Engineering_QA/output/`.

## Tools and Technologies Used
- Command Code (agent runtime)
- Python 3.14.4 with `python-docx` 1.2.0
- Microsoft Word COM automation for DOCX validation (page/word statistics)
- Windows PowerShell 5.1
- Repo assets: `STAR_HotelApp.md`, `Template.md`, `Templates/Template_STAR.md`, `MyNotes.md`

## Steps Performed
1. Read `STAR_HotelApp.md` and extracted the Situation, Task, Action and Result requirements, including the explicit "no invention" constraints.
2. Read `Template.md` (10-section test-plan skeleton) and `Templates/Template_STAR.md` to map the requested output onto the chapter's structure.
3. Confirmed `Chapter_03_Prompt_Engineering_QA/output/` existed and that `python-docx` 1.2.0 was installed.
4. Wrote a generator script in the session scratchpad that builds a title page, document-control table, 12 numbered sections, styled tables and a header/footer with PAGE/NUMPAGES fields.
5. Encoded the seven approved requirements as REQ-01 to REQ-07 and modelled a 9-row decision table covering valid, invalid and blank username/password combinations.
6. Wrote 17 test cases (positive, negative, boundary) with steps, dummy test data, expected results and priorities, each traced to requirement IDs.
7. Marked every undefined behaviour as "Requires clarification" and linked it to open questions Q-01 to Q-12; labelled proposed thresholds and the browser matrix as recommendations.
8. Generated the DOCX, then validated it by opening it read-only in Word (8 pages, 3,237 words) and by programmatic checks on message text, tables, headings and column widths.

## Code Examples
Fixed table layout with repeating, shaded header rows:

```python
layout = OxmlElement("w:tblLayout")
layout.set(qn("w:type"), "fixed")
table._tbl.tblPr.append(layout)

trPr = header_row._tr.get_or_add_trPr()
th = OxmlElement("w:tblHeader")
th.set(qn("w:val"), "true")
trPr.append(th)

shade(header_cell, "1F3864")
```

Page-number fields in the footer:

```python
def add_field(p, instr):
    r = p.add_run()
    begin = OxmlElement("w:fldChar"); begin.set(qn("w:fldCharType"), "begin")
    text = OxmlElement("w:instrText"); text.set(qn("xml:space"), "preserve"); text.text = instr
    end = OxmlElement("w:fldChar"); end.set(qn("w:fldCharType"), "end")
    r._r.append(begin); r._r.append(text); r._r.append(end)
```

## Challenges Faced
- `Template.md` is a table of contents, while the STAR Result section demands a different, more specific checklist; copying either one alone would miss requirements.
- The approved requirements are intentionally narrow, so negative and boundary coverage repeatedly reaches undefined behaviour (password rules, lockout, session timeout, field lengths, validation order).
- The 7-column test-case table had to fit a 17 cm printable width on A4 with 2 cm margins.
- Word COM reported page and word statistics successfully but the PDF export call did not return within the timeout, leaving a Word process that had to be terminated.

## Solutions Implemented
- Merged the Template.md section order with the STAR Result checklist, so the document satisfies both the chapter skeleton and the prompt's explicit deliverables.
- Added a requirement-basis table (REQ-01 to REQ-07) and kept the exact approved strings as the only test oracle.
- Used a decision table plus explicit "Requires clarification" markers with traceable Q-IDs instead of assuming behaviour; threshold-style criteria (exit percentages, severity scale, browser set) are labelled "Recommendation".
- Sized all tables to a 17 cm total and verified programmatically that no table exceeds the printable width.
- Kept dummy data only; the valid password is referenced as "provisioned at run time, not recorded here".

## Key Learnings
- The STAR Result block is the contract for the deliverable; the referenced template supplies structure but not the content checklist, so both must be honoured.
- Pairing each unspecified behaviour with an open-question ID makes an anti-hallucination prompt auditable.
- `python-docx` handles unicode message text, en dashes and long cells cleanly; complex formatting needs small `OxmlElement` snippets.
- Word COM is useful for page/word statistics but PDF export can hang on this machine, so validation should time out and fall back to structural checks.

## Testing and Verification
- Generated file: `Chapter_03_Prompt_Engineering_QA/output/Adactin_HotelApp_Login_Functional_Test_Plan.docx`.
- Word opened the document read-only: 8 pages, 3,237 words.
- Programmatic checks passed: approved REQ-05 message present verbatim; "Enter Username" and "Enter Password" present; 14 tables; 31 headings; no table wider than 17.05 cm; no credentials or personal data.
- 17 test cases (TC-001 to TC-017) and 12 open questions (Q-01 to Q-12) are present and cross-referenced.
- No automated test suite applies to this documentation deliverable; no application testing was performed.

## Future Improvements
- Add an auto-updating Word table of contents once the reviewer confirms the final section order.
- Fill schedule dates, approver names and the browser matrix after stakeholder input.
- Export a PDF copy alongside the DOCX after review if the chapter workflow needs both formats.
- Reuse the generator script for other STAR prompt outputs to keep DOCX formatting consistent.

## Completion Workflow
- Requested task completed; deliverable written to `Chapter_03_Prompt_Engineering_QA/output/Adactin_HotelApp_Login_Functional_Test_Plan.docx`.
- Learning file created: `learnings/2026-11-14-adactin-hotelapp-login-star-test-plan-docx.md`.
- Not committed or pushed (no authorization given).
