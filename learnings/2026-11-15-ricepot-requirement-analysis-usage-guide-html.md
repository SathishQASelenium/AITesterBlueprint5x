# RICE-POT Requirement Analysis — HTML Usage Guide

## Date
2026-11-15

## Objective
Turn the Markdown template `Chapter_03_Prompt_Engineering_QA/Task14Nov2026_QA_DailyTask/01-requirement-analysis-RICEPOT.md` into a self-contained HTML usage guide that explains, visually and step by step, how to use that template for requirement analysis. The guide had to live in the same folder as the template and match the house style of the chapter's existing HTML deliverables.

## Tools and Technologies Used
- Command Code agent runtime
- Hand-written HTML5 + CSS (single self-contained file, no external assets)
- Existing chapter HTML deliverables as the style reference:
  - `Chapter_03_Prompt_Engineering_QA/output/Adactin_HotelApp_Login_Test_Plan_Prompt.html`
  - `Chapter_02_Prompt_Engineering/output/VWO_Test_Case_Quality_Report_GAP-01.html`
- `INDEX.md` in the same folder for the library conventions the guide had to stay consistent with
- Playwright (already installed in `Playwright_Simple_Login`) for headless rendering verification
- Windows PowerShell 5.1 for structural tag-count checks

## Steps Performed
1. Read the source template to extract its real structure: the RICE-POT prompt block, the Do NOT list, the Context placeholders, the filled VWO example, the output contract table, the six-item self-check, the SKILL.md conversion block, and the Alternative pointer.
2. Read `INDEX.md` and the sibling file layout (17 templates + index) so the guide used the same vocabulary, framework names, and conventions (deterministic output, exact fallback phrases, GAP-NN IDs).
3. Read an existing chapter HTML deliverable to reuse its design language: A4 sheet layout, ink/accent CSS variables, masthead + meta grid, coloured legends, table styling, print media query.
4. Confirmed the machine date with PowerShell (`2026-11-15`) instead of trusting the session snapshot.
5. Authored the guide with nine numbered sections: purpose, Use when / Skip when, framework letter map, input preparation, Context worksheet, output contract audit, filled run example, self-check, failure-mode correction table, downstream chaining, and SKILL.md conversion.
6. Verified tag balance programmatically, then rendered the page headlessly at device scale 2 and inspected full-page and per-section screenshots for overflow and layout defects.
7. Fixed one wording defect found during review ("A dedicated guess" → "A deduced detail") so the failure-mode table matched the template's inference-labelling rule.

## Code Examples
Structural verification — compares opening and closing counts for every tag used more than once:

```powershell
$p = 'Chapter_03_Prompt_Engineering_QA\Task14Nov2026_QA_DailyTask\01-requirement-analysis-RICEPOT-usage-guide.html'
$t = [IO.File]::ReadAllText((Resolve-Path $p))
foreach ($tag in 'table','tr','td','th','section','div','pre','ul','li') {
  $o = ([regex]::Matches($t, "<$tag[ >]")).Count
  $c = ([regex]::Matches($t, "</$tag>")).Count
  "{0,-10} open={1,-4} close={2}" -f $tag, $o, $c
}
```

Visual verification — headless render plus a horizontal-overflow assertion:

```js
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 1200 }, deviceScaleFactor: 1.5 });
await page.goto('file:///' + file.replace(/\\/g, '/'));
await page.screenshot({ path: 'guide-full.png', fullPage: true });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
console.log('horizontalOverflow:', overflow);
await browser.close();
```

## Challenges Faced
- The guide had to teach a prompt template without restating it as a wall of code — the template's value is in its constraints, not its prose.
- The template's own worked example is deliberately incomplete (it cites `GAP-02` and "Exact validation message not supplied" but never lists the gap rows), so the guide's example tables had to be completed strictly from what that example already implies rather than inventing new requirements.
- The existing chapter HTML files are heavily tailored to a single document each, so the CSS had to be adapted for dense multi-column tables (9pt, seven columns) instead of a simple prompt layout.
- PowerShell 5.1 emits CLIXML progress noise on every call; the readable output had to be filtered mentally rather than parsed automatically.

## Solutions Implemented
- Structured the guide as a decision path — what the template does → when to use or skip → what each framework letter owns → what to prepare → how to fill Context → how to audit output → how to repair a bad run — so it is usable during a real review, not just read once.
- Converted the template's rules into a failure-mode table mapping symptom → rule breached → exact correction to send, which is actionable during a live review.
- Reused the chapter's CSS vocabulary (same ink, accent, line colours, sheet layout, print rules) so the file sits visually alongside the existing deliverables.
- Escaped all special characters (`&amp;`, `&lt;`, `&mdash;`, `&sect;`) and kept the file dependency-free so it opens offline and prints to A4 cleanly.

## Key Learnings
- A "how to use" document is most useful when it explains where to edit (Context only) and how to repair a bad output (targeted correction lines), not when it repeats the template text.
- The RICE-POT template's `C — Context` block is the only per-run editable surface; that single insight structures the whole guide.
- Screenshot-based verification catches layout defects (column squeeze, overflow) that tag-balance checks cannot.
- Completing an example gap register from a template's inline references is possible without inventing requirements, as long as each gap row traces to text the template already states.

## Testing and Verification
- Tag balance checked for `table`, `tr`, `td`, `th`, `section`, `div`, `pre`, `ul`, `li` — all matched (5/5, 24/24, 70/70, 20/20, 9/9, 44/44, 1/1, 2/2, 10/10).
- Headless Chromium render at 1000px viewport and 1.5x device scale: full-page screenshot produced, `horizontalOverflow: false`.
- Per-section screenshots at 2x device scale reviewed for sections 5 and 7 — tables readable, no clipped cells, no colour-coding errors in the Testable column.
- Re-read the edited region after the wording fix to confirm the change landed in the intended row.
- No browser server was left running; Playwright was launched and closed within each verification script.

## Future Improvements
- Generate a matching PDF from the same HTML (headless print) if both formats are wanted for this guide.
- Add a copy-to-clipboard button for the one generated line a reviewer actually sends back to the model, if the guide becomes interactive.
- Review the guide's gap-register example against a real ticket once the template is executed against a live model run.
- Consider a companion guide for `02-test-case-design-RICEPOT.md` so the analysis → design chain is documented on both ends.
