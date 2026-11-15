# Adactin Hotel App Login STAR Prompt (HTML + PDF)

## Date
2026-11-14

## Objective
Create a STAR-framed prompt for generating a functional test plan for the Adactin Hotel App login page (`http://www.adactin.com/HotelAppBuild2/index.php`), using the chapter's STAR template, and deliver the prompt as matching HTML and PDF in `Chapter_03_Prompt_Engineering_QA/output/`.

## Tools and Technologies Used
- Command Code (agent runtime)
- Markdown (`STAR_HotelApp.md`)
- Hand-written HTML/CSS with print styles
- Playwright 1.58.2 (Chromium) for HTML to PDF rendering
- Python 3 with `pypdf` for PDF text verification
- Windows PowerShell 5.1
- Repo assets: `Templates/Template_STAR.md`, `STAR.md`, `Template.md`

## Steps Performed
1. Read `Templates/Template_STAR.md`, the existing VWO `STAR.md`, `Template.md`, and the previous STAR-to-DOCX learning file to match chapter conventions.
2. Confirmed scope (login page only), the seven approved requirements, and the deliverable format (HTML + PDF in `output/`) with the user before writing.
3. Wrote `Chapter_03_Prompt_Engineering_QA/STAR_HotelApp.md` with Situation, Task, Action, and Result sections mirroring the existing `STAR.md` style.
4. Built a self-contained styled HTML version in `output/` with a masthead, STAR legend, requirement list, "no invention" callout, and a two-column deliverable checklist.
5. Rendered the PDF from the HTML with Playwright Chromium, using a footer template for page numbers.
6. Screenshot-reviewed the HTML, fixed cramped list markers, then added print-specific spacing rules.
7. Verified the PDF with `pypdf` (2 pages, all sections and the verbatim error strings present).

## Code Examples
Playwright HTML to A4 PDF with a page-number footer:

```javascript
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: '<div style="width:100%;font-size:7.5pt;color:#667085;padding:0 16mm;display:flex;justify-content:space-between;">' +
    '<span>STAR Prompt &middot; Adactin Hotel App Login Test Plan</span>' +
    '<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
  margin: { top: '16mm', right: '16mm', bottom: '18mm', left: '16mm' },
});
```

## Challenges Faced
- The prompt had to stay faithful to the approved requirements while still calling out genuinely undefined behaviour (both fields blank, password policy, lockout, session timeout).
- The first render used custom `::marker` content that collapsed the spacing in requirement bullets.
- The A4 print layout measured ~1.25 pages, so the Result section orphaned onto page 2.
- Resolving `playwright` from a scratchpad script required `NODE_PATH` pointed at `Playwright_Simple_Login/node_modules`.

## Solutions Implemented
- Kept the seven approved requirements verbatim, including the exact error messages; all undefined behaviour is explicitly "Requires clarification".
- Switched the requirement list to standard square markers for consistent spacing.
- Added print-only spacing rules to tighten page 1; the Result section is kept intact via `break-inside: avoid`, giving an intentional two-page split.
- Ran the render script with `NODE_PATH` set, avoiding a project-local script or extra dependency install.

## Key Learnings
- Playwright's `page.pdf()` is a reliable, dependency-free HTML to PDF path on this machine; footer templates supply page numbers that CSS `@page` margin boxes cannot.
- Emulating `print` media and measuring `scrollHeight` at the A4 content width predicts pagination before generating the PDF.
- A `fullPage` screenshot at print media has no page margins, so text touching the right edge is not necessarily horizontal overflow; verify with `scrollWidth` before "fixing" it.
- Keeping the prompt's Situation section as the single source of approved requirements makes the "no invention" constraint auditable.

## Testing and Verification
- Files produced: `Chapter_03_Prompt_Engineering_QA/STAR_HotelApp.md`, `output/Adactin_HotelApp_Login_Test_Plan_Prompt.html` (~8.7 KB), `output/Adactin_HotelApp_Login_Test_Plan_Prompt.pdf` (~73 KB).
- `pypdf` extraction confirmed 2 pages with Situation, Task, Action, Result, all nine deliverable items, and the footer "Page X of Y".
- Error message strings verified verbatim: "Invalid Login details or Your Password might have expired. Click here to reset your password", "Enter Username", "Enter Password".
- Browser screenshot reviewed for layout; no console or rendering errors.
- No application testing was performed; the deliverables are prompt documents.

## Future Improvements
- Optionally compress the artifact to a single page by removing the STAR legend block.
- Generate the actual Adactin login test plan from this prompt (HTML + PDF, following `Template.md`) as the next chapter artifact.
- Reuse the render script for other chapter prompts so HTML/PDF output stays consistent.

## Completion Workflow
- Requested task completed: prompt markdown plus HTML and PDF in `Chapter_03_Prompt_Engineering_QA/output/`.
- Learning file created: `learnings/2026-11-14-adactin-login-star-prompt.md`.
- Not committed or pushed (no authorization given).
