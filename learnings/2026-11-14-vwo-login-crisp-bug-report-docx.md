# VWO Login Empty-Password Bug Report from CRISP Prompt (DOCX)

## Date
2026-11-14

## Objective
Use the CRISP prompt in `Chapter_03_Prompt_Engineering_QA/CRISP.md` to produce a hypothetical, developer-ready bug report for the VWO login page (`https://app.vwo.com/`) and deliver it as an editable Word document in `Chapter_03_Prompt_Engineering_QA/output/`.

## Tools and Technologies Used
- Command Code (agent runtime)
- Python 3 with `python-docx` 1.2.0 for DOCX generation
- Microsoft Word COM automation for PDF export and page-count validation
- `pypdfium2` and `pdfplumber` for PDF text extraction and page-image preview
- Windows PowerShell 5.1
- Repo assets: `CRISP.md`, `MyNotes.md`

## Steps Performed
1. Read `CRISP.md` and inspected the existing `output/` folder for the established deliverable naming and format.
2. Checked that `python-docx` 1.2.0 was available for editable DOCX output.
3. Wrote a generator script in the session scratchpad that produces a two-page report with a labelled header band, document-control table, and the ten CRISP-required sections.
4. Wrote the bug report from the supplied observation only:
   - expected result derived from the mandatory-password requirement without inventing validation text;
   - missing environment details marked "Not supplied.";
   - attachments marked "Not provided.";
   - observed behaviour separated from assumptions in an explicit table;
   - severity labelled "Major (provisional)" with rationale.
5. Generated `VWO_Login_CRISP_Bug_Report.docx`, exported it to PDF with Word, and reviewed rendered page images.
6. Fixed an awkward wrap in the "Author role" cell and regenerated, then re-validated.

## Code Examples
Page-field helper used in the footer:

```python
def add_field(paragraph, instr):
    run = paragraph.add_run()
    begin = OxmlElement("w:fldChar")
    begin.set(qn("w:fldCharType"), "begin")
    instr_el = OxmlElement("w:instrText")
    instr_el.set(qn("xml:space"), "preserve")
    instr_el.text = instr
    # ... separate + placeholder text + end omitted for brevity
```

Rendering check with `pypdfium2`:

```python
import pypdfium2 as pdfium
pdf = pdfium.PdfDocument(pdf_path)
pdf[0].render(scale=2).to_pil().save("page1.png")
```

## Challenges Faced
- The CRISP prompt demands anti-invention discipline: expected behaviour must follow the requirement, but the exact validation wording is unknown.
- The report had to stay under 500 words while covering ten mandated sections.
- Initial "Author role" value wrapped onto a second line, which looked unpolished in the document-control table.

## Solutions Implemented
- Omitted guessed validation copy and stated explicitly that the wording is unspecified.
- Used compact two-column tables for environment, test data, observed/not-observed behaviour, severity, and attachments to keep the report scannable within the word budget.
- Labelled the whole document "Hypothetical training example" in the header band, footer, and closing note.
- Shortened the author-role value so it fits on one line.

## Key Learnings
- For bug reports, separating "Observed" from "Not observed" is a concise way to satisfy the CRISP requirement to distinguish facts from assumptions.
- Table-heavy layouts communicate structured QA data faster than prose and help stay under strict word limits.
- Word COM plus `pypdfium2` gives both a pagination check and a visual check without needing LibreOffice.
- `python-docx` preserves Unicode (en dash) correctly; Windows console output may still display `?` due to code-page limits, so inspect codepoints rather than trusting console rendering.

## Testing and Verification
- Generated file: `Chapter_03_Prompt_Engineering_QA/output/VWO_Login_CRISP_Bug_Report.docx`.
- Word export succeeded: 2 pages, no errors.
- Content check: all ten required sections present; 421 words including tables (under the 500-word limit).
- Visual check: rendered PDF pages reviewed for table width, header band, bullets, and footer page fields.
- Compliance check: "Hypothetical training example" label present; environment gaps "Not supplied."; attachments "Not provided."; placeholder account details used.
- No application testing was performed; the defect is hypothetical.

## Future Improvements
- Attach real screenshots, console logs, and a HAR file if a reviewer converts the example into a real report.
- Consider exporting a PDF alongside the DOCX once the review is complete, if the chapter workflow requires both formats.
- Reuse the generator script for other CRISP exercises to keep document styling consistent.

## Completion Workflow
- Requested deliverable created in `Chapter_03_Prompt_Engineering_QA/output/`.
- Learning file created: `learnings/2026-11-14-vwo-login-crisp-bug-report-docx.md`.
- Not committed or pushed (no authorization given).
