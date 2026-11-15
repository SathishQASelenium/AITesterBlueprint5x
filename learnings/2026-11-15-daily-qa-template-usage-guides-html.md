# HTML Usage Guides for All 17 Daily QA Templates

## Date
2026-11-15

## Objective
Produce a user guide in HTML for each of the 17 prompt templates listed in `Chapter_03_Prompt_Engineering_QA/Task14Nov2026_QA_DailyTask/INDEX.md`, explaining how a QA engineer should use that template in practice. All guides were to live in the same folder as the templates and share one consistent visual language.

## Tools and Technologies Used
- Command Code agent runtime
- Node.js generator (data modules + shared HTML shell) writing static HTML files
- Playwright (Chromium, installed under `Playwright_Simple_Login`) for headless render verification and screenshots
- Existing chapter deliverable HTML (`Chapter_03_Prompt_Engineering_QA/output/Adactin_HotelApp_Login_Test_Plan_Prompt.html`) as the design reference
- Windows PowerShell 5.1 to run the generator and verification scripts

## Steps Performed
1. Read `INDEX.md` to confirm the 17 templates, their frameworks, and the task-to-file mapping.
2. Read all 17 template Markdown files in full and extracted, per template: framework skeleton, Use when / Skip when, Context placeholders, output contract rows, filled example, self-check items, SKILL.md frontmatter, trigger phrases, and the Alternative pointer.
3. Read the machine date (`2026-11-15`) rather than relying on the session snapshot.
4. Built `shell.js`: shared CSS (A4 sheet, ink/accent palette, table and checklist styling, print rules) plus one `render(data)` function producing nine consistent sections per guide.
5. Built four data modules (`data1.js`–`data4.js`) holding per-template content for templates 01–17, including a framework legend map so RICE-POT (7 letters), CRISP (5), CLEAR (5) and STAR (4) each render their own letter cards.
6. Built `build.js` with a validation pass before writing: required fields present, file order matching template number, table rows matching header widths, three chain cards per guide. Any failure aborts with no files written.
7. Generated 17 files named `NN-<slug>-<FRAMEWORK>-usage-guide.html` in the task folder — including regenerating template 01's guide through the same shell so the whole set is visually identical.
8. Verified all 17 headlessly: nine sections each, checklist present, three downstream cards, zero empty table cells, no horizontal overflow at a 1000px viewport.
9. Captured full-page screenshots of guides 02 (RICE-POT), 09 (STAR) and 16 (CRISP) to confirm the different framework legend sizes all lay out correctly.

## Code Examples

Generator validation pass (aborts before writing anything if the data is inconsistent):

```js
tables.forEach(([name, head, rows]) => {
  rows.forEach((r, ri) => {
    if (r.length !== head.length) {
      console.log(`COLUMN MISMATCH ${d.out} ${name} row ${ri}: ${r.length} vs ${head.length}`);
      problems++;
    }
  });
});
if (problems) { console.log(`${problems} problem(s) — no files written.`); process.exit(1); }
```

Headless verification of every guide:

```js
const stats = await page.evaluate(() => ({
  sections: document.querySelectorAll('section.block').length,
  checks: document.querySelectorAll('ul.check li').length,
  letters: document.querySelectorAll('.letter').length,
  chain: document.querySelectorAll('.chain .card').length,
  emptyCells: [...document.querySelectorAll('td')].filter(td => !td.textContent.trim()).length,
  overflow: document.documentElement.scrollWidth > window.innerWidth + 1
}));
```

Per-framework legend sizes produced: RICE-POT 7 cards (guides 01, 02, 06, 11, 15), CRISP 5 (03, 05, 08, 14, 16), CLEAR 5 (04, 07, 12, 17), STAR 4 (09, 10, 13).

## Challenges Faced
- Seventeen hand-written HTML files would drift in structure and styling, so a single shell plus per-template data was required rather than 17 freehand documents.
- The frameworks have different letter counts and different "editable surface" sections (Context for RICE-POT and CRISP, Context for CLEAR, Situation for STAR), so section 3's heading and the framework legend had to be data-driven.
- Several templates contain literal angle brackets (`<PROJECT>-<MODULE>-TC-<NNN>`, `<registered_email>`) that would break HTML if pasted raw.
- The template examples are deliberately excerpts — some reference gap IDs or expected-result text that is not spelled out — so each guide's example had to be completed only from what the source already implies.
- PowerShell 5.1 emits CLIXML progress noise on every invocation, which had to be ignored rather than parsed.

## Solutions Implemented
- One shared CSS block and one `render()` function; per-template differences expressed purely as data, which guarantees the 17 guides stay structurally identical.
- Data-driven framework legends via a `FRAMEWORKS` map, and a `fillHeading` field so each guide names the correct editable block.
- All literal angle brackets escaped as `&lt;` / `&gt;`, quotes as entities, and tables built from row arrays so column counts are validated before writing.
- A pre-write validation pass (required fields, ordering, column counts, chain length) so a bad data file fails the build instead of shipping 17 broken pages.
- Verification script asserts nine sections, checklist presence, three downstream cards, no empty cells, and no horizontal overflow for every file.

## Key Learnings
- Generating a consistent document set is a data-modelling problem, not a writing problem: define the shell once, then treat each page as a record.
- Validation belongs before the write, not after — column-count checks caught the class of error that would otherwise appear as a silently squashed table.
- Each framework's editable surface differs (RICE-POT edits Context, STAR edits Situation); a guide that names the wrong section teaches the wrong habit.
- Headless overflow and empty-cell assertions catch layout regressions that a quick visual scan misses at 17-page scale.

## Testing and Verification
- `build.js` validation passed for all 17: no missing fields, no ordering mismatch, no column mismatch, three chain cards each.
- Files written: `01`–`17` `*-usage-guide.html`, each ~19–21 KB, in `Chapter_03_Prompt_Engineering_QA/Task14Nov2026_QA_DailyTask/`.
- `verify.js` headless run: 17 files, 0 failing — sections=9, checks 6–8, chain=3, overflow=false, emptyCells=0 for every file.
- Full-page screenshots reviewed for 02 (RICE-POT), 09 (STAR) and 16 (CRISP): tables readable, verdict/status colour coding correct, four-card STAR legend aligned.
- Playwright was launched and closed within each script; no browser or server process left running.

## Future Improvements
- Generate matching PDFs from these HTML files if a printable set is wanted.
- Add a top-level `INDEX.html` or a nav strip on each guide linking to the other 16, so the set is browsable as one library.
- Add a "copy this line" control for the token maps (e.g. <code>&lt;placeholder&gt;</code> fields) if the guides become interactive.
- Consider driving the generator from the Markdown templates at build time, so template edits propagate into the guides instead of requiring data-module updates.
