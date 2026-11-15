# Daily QA Prompt Template Library — 17 Framework-Backed Templates

## Date
2026-11-15

## Objective
Build a reusable library of prompt templates for the QA tasks performed daily, one template per task, each grounded in a single prompt framework from Chapter 03 (CLEAR, CRISP, STAR) or the canonical RICE-POT template from Chapter 02, and each shaped so it can later be converted mechanically into a `SKILL.md`.

## Tools and Technologies Used
- Command Code agent runtime
- Markdown templates with fenced `text` prompt blocks
- Windows PowerShell 5.1 for verification (`.NET` `File.ReadAllText` for UTF-8-safe checks)
- Repository inputs:
  - `Chapter_03_Prompt_Engineering_QA/Templates/Template_CLEAR.md`
  - `Chapter_03_Prompt_Engineering_QA/Templates/Template_CRISP.md`
  - `Chapter_03_Prompt_Engineering_QA/Templates/Template_STAR.md`
  - `Chapter_03_Prompt_Engineering_QA/CLEAR.md`, `CRISP.md`, `STAR.md` (worked examples)
  - `Chapter_03_Prompt_Engineering_QA/Template.md` (test plan TOC)
  - `Chapter_02_Prompt_Engineering/RICE_POT/Template_RICE_POT/Template.RICEPPOT.md`
  - `learnings/2026-11-13-vwo-login-ric-pot-anti-hallucination-test-cases.md`

## Steps Performed
1. Read every existing Chapter 03 framework file, both the blank `Templates/Template_*.md` definitions and the filled `CLEAR.md` / `CRISP.md` / `STAR.md` examples, to capture house style and vocabulary.
2. Located the RICE-POT template: it is not in Chapter 03, it lives at `Chapter_02_Prompt_Engineering/RICE_POT/Template_RICE_POT/Template.RICEPPOT.md`, and its anti-hallucination parameter block was adopted as a shared convention.
3. Confirmed the machine date (`2026-11-15`) rather than trusting the session snapshot.
4. Designed a framework assignment per task on cost/benefit rather than forcing an even split: RICE-POT where traceability and anti-hallucination dominate, CRISP where a role makes judgement calls, CLEAR where bounded scope needs enforcement, STAR where the task is inherently a narrative or plan.
5. Resolved a design question with the user: one framework per file plus a one-line `Alternative:` pointer, rather than a primary framework plus a second fallback skeleton. Rationale: a second skeleton causes the model to blend structures and makes both the review step and SKILL.md conversion ambiguous.
6. Wrote 17 templates into `Chapter_03_Prompt_Engineering_QA/Task14Nov2026_QA_DailyTask/`, each containing: framework skeleton with QA placeholders, filled mini-example, output contract table, self-check list, SKILL.md frontmatter block, trigger phrases, alternative pointer.
7. Wrote `INDEX.md` with the task→framework→file map, framework distribution, shared conventions, usage steps, conversion steps, and relationship to existing Chapter 03 material.
8. Verified all 17 files programmatically for the correct framework skeleton labels and the presence of every required section.

## Code Examples

Verification script that checks each file for its expected framework labels plus the shared required sections (UTF-8 safe):

```powershell
$dir = "Chapter_03_Prompt_Engineering_QA\Task14Nov2026_QA_DailyTask"
$checks = @{
 "01-requirement-analysis-RICEPOT.md" = @("R","I","C","E","P","O","T")
 # ... one entry per file
}
$em = [char]0x2014
foreach ($k in ($checks.Keys | Sort-Object)) {
  $t = [System.IO.File]::ReadAllText("$dir\$k")
  foreach ($l in $checks[$k]) {
    if (-not $t.Contains("### $l $em")) { Write-Output "$k missing $l" }
  }
  foreach ($sec in @("## Prompt Template","## Output Contract","## Self-Check","## SKILL.md Conversion","**Alternative:**")) {
    if (-not $t.Contains($sec)) { Write-Output "$k missing $sec" }
  }
}
```

Framework distribution produced:

```text
RICE-POT : 5  (01, 02, 06, 11, 15)
CRISP    : 5  (03, 05, 08, 14, 16)
CLEAR    : 4  (04, 07, 12, 17)
STAR     : 3  (09, 10, 13)
```

Shared anti-hallucination conventions applied to all templates:

```text
Missing information  -> "Insufficient information to determine."
Inferred detail      -> "Inference (low confidence)"
Gap references       -> GAP-NN
Credentials          -> <registered_email> / <valid_password> placeholders only
Unearned pass        -> nothing marked Passed without observable evidence
```

## Challenges Faced
- PowerShell 5.1 read the UTF-8-no-BOM Markdown files with the default ANSI code page, mangling the em dash (`—`) in section headings. The first verification pass reported every heading as missing in all 17 files, which was a false negative caused by the reader, not the content.
- The `grep` tool in this environment returned no matches even for pre-existing, untouched files such as `STAR.md` containing `Situation`. This was an environment fault, not a content fault, and it made content-level verification unreliable.
- RICE-POT was referenced in the task but is absent from Chapter 03; it had to be located in Chapter 02, which changes the import paths quoted in each template's provenance.
- Framework assignment is a judgment call: forcing all four frameworks evenly across 17 tasks would have produced worse templates than allowing an uneven split.

## Solutions Implemented
- Switched verification from `Get-Content` / `Select-String` to `[System.IO.File]::ReadAllText`, which decodes UTF-8 correctly regardless of console code page. This eliminated the false negatives.
- Bypassed the failing `grep` tool entirely for content assertions and used direct byte-level / string-level checks instead.
- Adopted the RICE-POT anti-hallucination parameter block as a shared convention across all 17 templates regardless of framework, so the "no invented facts" guarantee is uniform.
- Chose one framework per file with a single `Alternative:` pointer line, keeping exactly one output contract per file and making SKILL.md conversion mechanical.
- Gave every template an explicit self-check list so a bad output can be diagnosed against a named check instead of triggering a blind re-prompt.

## Key Learnings
- The choice between "single framework" and "primary + fallback" is really a choice about output verifiability. Two skeletons in one file let the model blend them, and the review step then has two competing checklists and enforces neither.
- A per-file output contract table is what makes these templates reusable rather than inspirational: it gives both the model and the reviewer a concrete pass/fail surface.
- Framework fit follows the nature of the task, not the desire for symmetry: traceability tasks want RICE-POT, judgement tasks want CRISP, bounded-scope tasks want CLEAR, narrative tasks want STAR.
- On Windows, verify generated UTF-8 Markdown with an explicit UTF-8 reader; the default code page silently corrupts non-ASCII characters and produces convincing but wrong verification output.
- Tool failures can masquerade as content failures. When a check reports that everything is missing, suspect the checker before rewriting the artifacts.

## Testing and Verification
- Verified programmatically across all 17 template files: correct framework skeleton labels per file, and presence of `## Prompt Template`, `## Output Contract`, `## Self-Check`, `## SKILL.md Conversion`, and the `**Alternative:**` pointer.
- Result: 17 files checked, 0 failures.
- File inventory confirmed: 17 templates plus `INDEX.md`, all present and non-empty.
- No template was executed against a live model run; verification here is structural only. This is recorded as a known gap in `INDEX.md`.

## Future Improvements
- Run each template against a real example (e.g. the VWO login module) and record actual output quality, then tighten the self-check lists based on what the model got wrong.
- Convert the 17 templates into skills under a `skills/` directory using the frontmatter already embedded in each file.
- Add the missing task domains identified in `INDEX.md`: performance, security, accessibility, release sign-off, and test data management.
- Decide whether the shared anti-hallucination conventions should be extracted into a single referenced file rather than repeated in all 17.

## Completion Workflow
- Requested task completed; 17 templates plus `INDEX.md` written to `Chapter_03_Prompt_Engineering_QA/Task14Nov2026_QA_DailyTask/`.
- Learning file created: `learnings/2026-11-15-daily-qa-prompt-template-library.md`.
- Not committed or pushed, because no commit or push authorization was given.
