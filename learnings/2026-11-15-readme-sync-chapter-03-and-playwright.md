# README Sync: Chapter 03, Standalone Playwright Project, Learning Journal

## Date
2026-11-15

## Objective
Bring the root `README.md` back in line with the repository as it actually exists. The README was written when the repo ended at Chapter 02, so it omitted `Chapter_03_Prompt_Engineering_QA/`, `Playwright_Simple_Login/`, `learnings/`, and several files added inside Chapter 02.

## Tools and Technologies Used
- Command Code (agent runtime)
- `read_file` / `read_directory` / `glob` for inventorying the repository
- `edit_file` for surgical README updates
- Markdown + Mermaid for the updated diagrams

## Steps Performed
1. Read the existing `README.md` (202 lines) and listed the repo root to find undocumented top-level folders.
2. Inventoried `Chapter_03_Prompt_Engineering_QA/` — 14 root entries, the `Templates/`, `00_context-vwo/`, `01_reuse-templates-testing/`, `02_reuse-templates-bugs/`, `03_reuse-templates-api/`, and `output/` folders.
3. Inventoried `Playwright_Simple_Login/` — `tests/login.spec.ts`, `playwright.config.ts`, `package.json`, `tsconfig.json`, nested `.gitignore`.
4. Re-checked `Chapter_02_Prompt_Engineering/` and `Chapter_00_SKILL_Basics/` against the README's existing claims, which surfaced undocumented `output/`, `anti-hallucination-rules.md`, and the VWO PRD PDF.
5. Read the prompt files (`STAR.md`, `STAR_HotelApp.md`, `CLEAR.md`, `CRISP.md`), the template definitions, and the context pack to describe each framework accurately rather than by folder name only.
6. Read the corresponding `learnings/` entries to confirm what was actually produced and how (DOCX via `python-docx`, Adactin prompt also exported to HTML/PDF).
7. Updated the README:
   - intro line now mentions bug reports;
   - roadmap gained Chapter 03 as stage 4 (Next moves to stage 5) with the Mermaid flow extended;
   - `Repository Structure` tree rewritten to include Chapter 02's extra files, all of Chapter 03, `Playwright_Simple_Login/`, and `learnings/`;
   - new `## Chapter 03 — Prompt Engineering for QA` section (framework comparison table, folder guide, deliverables, Mermaid);
   - new `## Standalone Playwright Login Test` and `## Learning Journal` sections;
   - `Core Principles` / `Configuration` / `Usage` rewritten to cover prompt-driven workflows, not just skills.
8. Corrected one detail found while verifying: `playwright.config.ts` uses `retries: 0`, so the README now says "no retries" instead of implying a first retry exists.

## Code Examples
Nothing executable. The structural change was replacing the chapter tree so Chapter 02 is no longer the last entry:

```text
├── Chapter_03_Prompt_Engineering_QA/   # QA prompt frameworks: STAR / CLEAR / CRISP
│   ├── STAR.md / STAR_HotelApp.md / CLEAR.md / CRISP.md
│   ├── Templates/ 00_context-vwo/ 01_reuse-templates-testing/
│   ├── 02_reuse-templates-bugs/ 03_reuse-templates-api/
│   └── output/
├── Playwright_Simple_Login/            # Standalone Playwright + TypeScript login test
└── learnings/                          # Dated learning journal (see AGENTS.md)
```

## Challenges Faced
- The README listed three chapters, but three separate sources of truth had drifted: new folders on disk, the `learnings/` journal, and `MyNotes.md` run logs. Reconciling required reading the prompt files themselves to avoid describing Chapter 03 from filenames alone.
- Several Chapter 02 additions (`output/`, `anti-hallucination-rules.md`, the PRD PDF) were invisible in the old tree because Chapter 02 was depicted as a single child path.
- Mermaid and the ASCII tree both had to be updated together; leaving either stale would have contradicted the new roadmap table.

## Solutions Implemented
- Described Chapter 03 by framework *purpose* (STAR → test plans, CLEAR → test cases, CRISP → bug reports) rather than listing directories only, so the table is useful without opening files.
- Kept the existing README voice and section order — sections were extended in place, and the two new sections were inserted next to their related chapters instead of appended at the end.
- Documented `learnings/` as a first-class part of the repo since `AGENTS.md` makes it part of every task's workflow.

## Key Learnings
- A README that only tracks chapters will always lag; it needs a per-chapter inventory that names real files.
- Verifying claims against config files caught a false statement ("trace on first retry") that would have misled anyone debugging a failure.
- `output/` folders are the fastest way to confirm what a chapter actually produced, and `learnings/` confirms how.

## Testing and Verification
- Re-read the edited sections after each `edit_file` call and inspected the returned snippets.
- Cross-checked every new README claim against the corresponding file: `package.json`, `playwright.config.ts`, `login.spec.ts`, the four prompt files, `Template.md`, the three `Templates/*.md` framework definitions, and the three `learnings/` entries for the DOCX deliverables.
- Confirmed each path named in the tree exists via `read_directory`/`glob`; no file was documented without being listed.
- No code, tests, or generated artifacts were modified — this was a documentation-only change, so no test run was applicable.

## Future Improvements
- Add a short "Chapter 03" line to the Roadmap "Next" row once the API-response-validator skill lands, so the two track together.
- Consider a per-chapter `README.md` so the root file can stay a high-level index.
- If more prompt frameworks are added, the framework table in Chapter 03 should grow rather than gaining more prose below it.
