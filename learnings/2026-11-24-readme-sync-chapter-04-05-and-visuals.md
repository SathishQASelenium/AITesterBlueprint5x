# README Sync for Chapter 04/05 Additions and Embedded Visuals

## Date

2026-11-24

## Objective

Bring the root `README.md` back in line with the repository after two Chapter 04 agents were implemented and two Chapter 05 n8n workflows were added, and make the document more presentable by embedding the screenshots and diagrams that already ship in the repo.

What had drifted from the README:

- `02_Test_Strategy_Builder_AIAgent/` — implemented (Express + vanilla JS, Jira → 14-section test strategy) and deployed to Vercel, but documented as a placeholder.
- `03_Test_Case_Creation_AIAgent/` — implemented (Express + vanilla JS, Jira → test cases) and deployed to Vercel, but documented as a placeholder.
- `Chapter_05_AIAgents_n8n/` — two new workflows (`03_AI-Powered_Jira_Test_Strategy_Agent.json`, `04_Test_Case_Creation_AI_Agent.json`), but the README still said "two chat-triggered n8n agents".
- Chapter 04 screenshots, sample generated documents, Chapter 03 framework diagrams, and the template quick-reference card were unreferenced.
- Four new learning entries existed but the Learning Journal paragraph did not mention them.

## Tools and Technologies Used

- Command Code (agent runtime)
- `git status --short`, `git log --oneline` for repository state
- `read_file`, `read_directory`, `glob` for source and asset inspection
- Vision image reads to describe each screenshot accurately before captioning it
- PowerShell regex pass to verify every `img src=` path resolves on disk
- Markdown editing (tables, Mermaid, HTML `img` tags with `width`)

## Steps Performed

1. Read `README.md` in full and ran `git status --short` / `git log --oneline -5` to establish what was committed versus untracked.
2. Enumerated `Chapter_04_AI_Agents_Basics/VIBE_CODING/` and both new agent folders, excluding ignore rules for `node_modules`, `.vercel`, and `.env`.
3. Read the four new learning entries (`2026-11-23-ai-test-strategy-builder`, `2026-11-23-vercel-deploy-ai-test-strategy-builder`, `2026-11-24-ai-test-case-generator`, `2026-11-24-vercel-deploy-ai-test-case-generator`) to capture verified behaviour, deploy URLs, and known fixes.
4. Read each implementation `README.md`, `server.js`, `package.json`, and `vercel.json` to document the real endpoints and stack for both new agents.
5. Read `test-strategy-template.md` and `test-case-template.md` to state the actual section structure instead of guessing.
6. Inspected the two new n8n workflow JSONs for node names, model, retry settings, and sticky-note content.
7. Viewed every candidate screenshot with vision before selecting it, so captions match what is actually shown.
8. Updated the README: intro, a new Contents list, roadmap table, repository tree, a new "What It Looks Like" gallery, Chapter 03 visuals, full Chapter 04 rewrite (three agents), full Chapter 05 rewrite (four workflows), Learning Journal, Configuration, and Usage.
9. Verified all 11 referenced image paths with a PowerShell regex + `Test-Path` pass, and checked for stale "two chat-triggered"/"placeholder (planned)" wording.

## Code Examples

Embedding a screenshot with a width cap and a caption:

```html
<p align="center">
  <img src="Chapter_04_AI_Agents_Basics/VIBE_CODING/02_Test_Strategy_Builder_AIAgent/AI-Test-Strategy-Builder-11-24-2026_05_35_AM.png" alt="AI Test Strategy Builder — generated 14-section strategy for KAN-5" width="80%">
</p>
<p align="center"><em>Generated <code>KAN-5</code> strategy with the Copy / Download .md actions. Also saved as <code>test-strategy.md</code>.</em></p>
```

Verifying every referenced image exists:

```powershell
$p = 'c:\Personal_Development\TheTestingAcademy\AITesterBlueprint5x'
$readme = Get-Content "$p\README.md" -Raw
$paths = [regex]::Matches($readme, 'img src="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
foreach ($rel in $paths) { "{0}  {1}" -f (Test-Path (Join-Path $p $rel)), $rel }
```

## Challenges Faced

- The three Chapter 04 agents do not share a folder naming convention: `02_Implementation` (Pascal case, React) versus `02_implementation` (lower case, Express). The tree had to reflect the on-disk names exactly or the paths would break.
- The `grep` tool returned "No matches found" for `## ` headings and `"name":` keys that `read_file` clearly displayed. Verification shifted to `read_file` and PowerShell `Select-String`, and image paths were checked with `Test-Path` instead of trusting a text search.
- `Chapter_04_.../01_Intelligent_Test_Planning_AIAgent/` contains four app screenshots, two of which are nearly identical (empty reply panel). Captioning the wrong one would have misrepresented the state shown.
- `Chapter_05_AIAgents_n8n/MyNotes.md` contains a plaintext throwaway mailbox credential; it was left out of the README entirely.

## Solutions Implemented

- Rewrote Chapter 04 around a single comparison table (input → output, template shape, live URL) plus one subsection per agent with stack, endpoints, deploy notes, and the real fixes from the learning entries (Groq model 404, `max_completion_tokens`, ADF flattening, bounded JQL).
- Added a "What It Looks Like" gallery near the top so a first-time reader sees the three deployed apps before reading any prose.
- Placed each remaining visual where it belongs instead of collecting them in one block: STAR/CLEAR/CRISP and the wider-framework table in Chapter 03, the template quick-reference beside the reuse templates, and the n8n primer in Chapter 05.
- Added a Contents list with in-page anchors, and swapped the duplicate Chapter 04 screenshot for the variant that visibly shows both connection checks passing.
- Repointed the Configuration text from "the Jira test-plan generator" to all three agents sharing `VIBE_CODING/.env`, and listed the three Vercel project names.

## Key Learnings

- A README tree is code: folder casing differs per agent (`02_Implementation` vs `02_implementation`) and gets copied verbatim, so it must be read from disk rather than normalised.
- Screenshots should be opened before they are captioned; several captures in this repo are intermediate states (empty panel, "Generating...") and one is a full-page scroll of the finished document.
- GitHub renders HTML `img` tags but not the Markdown image-alt width syntax, so `width="80%"` inside `<p align="center">` is the reliable way to keep tall screenshots readable.
- Reading the deployment learning entries produced concrete, checkable README claims (the 404 model, the truncation at section 13, the retired Jira search endpoint) that a stack description alone would have missed.

## Testing and Verification

- PowerShell `Test-Path` confirmed all 11 `img src` targets exist at the referenced paths.
- Re-read every edited region to confirm tables, code fences, Mermaid blocks, and `<p align="center">` blocks are well-formed.
- A word search confirmed "two chat-triggered" and "placeholder (planned)" no longer appear; the remaining "placeholder" hits refer to the deliberately unimplemented `api-response-validator-skill` and to prompt placeholders, which are correct.
- No application tests were run — this was a documentation-only change. All behavioural claims quoted in the README come from the agents' own READMEs and the dated learning entries.

## Future Improvements

- Replace the raw Markdown rendering claim for Chapter 04 agent 01 if a Markdown renderer is added, since that is listed as a known limit.
- Consider deleting or archiving the intermediate-state screenshots so only the final-state captures remain in each agent folder.
- Add a screenshot or exported PDF link for Chapter 00 and Chapter 02 generated artifacts, which currently have no visuals.
