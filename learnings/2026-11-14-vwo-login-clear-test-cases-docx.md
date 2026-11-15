# VWO Login Functional Test Cases from CLEAR Prompt (DOCX)

## Date
2026-11-14

## Objective
Use the CLEAR prompt in `Chapter_03_Prompt_Engineering_QA/CLEAR.md` to generate exactly 10 functional
test cases for the VWO login page (`https://app.vwo.com/`) and deliver them as an editable Word document
in `Chapter_03_Prompt_Engineering_QA/output/`, using the prompt's mandated 10-column Jira-style table.

## Tools and Technologies Used
- Command Code (agent runtime)
- Python 3.14.4 with `python-docx` 1.2.0
- Microsoft Word COM automation for page and word statistics
- Windows PowerShell 5.1
- Repo assets: `CLEAR.md`, `Templates/Template_CLEAR.md`, `MyNotes.md`, existing `output/` deliverables

## Steps Performed
1. Read `CLEAR.md` and separated the five prompt stages, extracting the non-negotiable limits: exactly
   10 cases, supplied requirements only, placeholder credentials, no invented messages or password
   policies, Status = Not Run, and unknown behaviour marked "Requires clarification".
2. Read `Templates/Template_CLEAR.md` to confirm the framework definitions and `MyNotes.md` to place the
   request in the chapter sequence (STAR, STAR_HotelApp, now CLEAR).
3. Inspected `output/` and confirmed `VWO_Login_Functional_Test_Plan.docx` is the earlier STAR output, so
   the new file needed a distinct name to avoid overwriting unrelated work.
4. Confirmed Python 3.14.4 and `python-docx` 1.2.0 were available.
5. Modelled the four approved requirements as REQ-01 to REQ-04 and designed 10 distinct cases: valid
   login, incorrect password, unregistered email, cross-account password, three mandatory-field cases,
   access control before login, access control after login, and a valid login directly after a failure.
6. Wrote a generator script in the session scratchpad producing a title page, document control table,
   nine numbered sections, a landscape test-case table and a portrait traceability/review back matter.
7. Built the 10-column table at 26.2 cm inside a 26.5 cm landscape printable width, with repeating
   header row, fixed layout, reduced cell margins and 7.6 pt body text for readability.
8. Validated the DOCX programmatically and in Word (7 pages, 2,276 words), then removed the headless
   Word process left behind by the failed COM `Quit` call.

## Code Examples
Landscape section without disturbing the portrait front matter:

```python
from docx.enum.section import WD_ORIENT, WD_SECTION

land = doc.add_section(WD_SECTION.NEW_PAGE)
land.orientation = WD_ORIENT.LANDSCAPE
land.page_width, land.page_height = Cm(29.7), Cm(21.0)
land.left_margin = land.right_margin = Cm(1.6)
```

Bold callout for the anti-hallucination marker, while keeping the cell a single editable paragraph:

```python
phrase = "Requires clarification"
for i, segment in enumerate(text.split(phrase)):
    if segment:
        run = paragraph.add_run(segment)
    if i < len(text.split(phrase)) - 1:
        run = paragraph.add_run(phrase)
        run.bold = True
        run.italic = True
        run.font.color.rgb = RGBColor.from_string("9C0006")
```

Repeating header row on a table that spans pages:

```python
tr_pr = row._tr.get_or_add_trPr()
el = OxmlElement("w:tblHeader")
el.set(qn("w:val"), "true")
tr_pr.append(el)
```

## Challenges Faced
- The prompt contains an internal tension: the Action asks for access-control cases before login, while
  the Review requires every case to trace to a supplied requirement, and none of the four requirements
  mentions unauthenticated access.
- A 10-column table cannot fit a 17 cm portrait width with readable text; it had to be landscape.
- Border rendering can push a fixed-layout table slightly beyond the margin, so an exact-width fit was
  not safe.
- The Word COM `Quit(0)` call failed with a PSReference error, leaving a hidden WINWORD process.

## Solutions Implemented
- Traced TC-008 (pre-login access control) to REQ-01 and REQ-04 as the basis for the check, and marked
  its expected handling "Requires clarification" with Q-03 instead of inventing a redirect behaviour.
- Used a landscape section for Section 3 and portrait sections either side, with one inherited
  header/footer defined on the first section.
- Sized the test-case table to 26.2 cm against a 26.5 cm printable width and verified the sum of column
  widths programmatically.
- Created `VWO_Login_CLEAR_Functional_Test_Cases.docx` as a new file, leaving the STAR deliverable intact.
- Killed the orphaned headless Word process by PID after confirming it had no window title.

## Key Learnings
- The CLEAR "Limits" block is the testable contract; mapping each limit to a "where to verify" column
  makes compliance auditable rather than asserted.
- Anti-hallucination framing works best when the undefined items are numbered (Q-01..Q-05) and each test
  case cites the ID that blocks its full expectation.
- "Requires clarification" must be applied at expectation level, not case level, because a case can have
  both traceable and undefined outcomes.
- Mixed-orientation DOCX is straightforward in `python-docx`; only the section whose content is wide
  needs changing, and linked footers carry through.
- Word COM statistics succeed reliably where PDF export previously hung, but cleanup needs a
  `Stop-Process` fallback.

## Testing and Verification
- Generated file: `Chapter_03_Prompt_Engineering_QA/output/VWO_Login_CLEAR_Functional_Test_Cases.docx`
  (44.6 KB).
- Word opened the document read-only: 7 pages, 2,276 words.
- Programmatic checks passed: 12 tables; all 14 headings present; test-case table has 10 rows,
  10 columns, width 26.20 cm; every other table is 17.00 cm.
- All 10 cases use `VWO-LOGIN-TC-001`..`010` with Status `Not Run`; types are 3 Positive and 7 Negative.
- REQ-01 to REQ-04 are all referenced; Q-01 to Q-05 are all cited; "Requires clarification" appears 14
  times.
- No email addresses, passwords or credential fragments found in the document text.
- No automated test suite applies to this documentation deliverable; no application testing was
  performed.

## Future Improvements
- Add an auto-updating Word table of contents after the reviewer confirms section order.
- Replace the authenticated-dashboard URL placeholder once Q-03 is answered.
- Reuse the generator script for other CLEAR prompt outputs so DOCX formatting stays consistent.
- Consider a PDF companion copy after review if the chapter needs both formats.

## Completion Workflow
- Requested task completed; deliverable written to
  `Chapter_03_Prompt_Engineering_QA/output/VWO_Login_CLEAR_Functional_Test_Cases.docx`.
- Learning file created: `learnings/2026-11-14-vwo-login-clear-test-cases-docx.md`.
- Not committed or pushed (no authorization given).
