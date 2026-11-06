# KAN-4 JIRA-Driven Test Plan Generation (Advanced Skill)

## Date
2026-11-03

## Objective
Run the advanced skill `advance-testplan-creator` (`Chapter_00_SKILL_Basics/01_Advanced_Skills/testplan-creator-skill_a/SKILL.md`) against JIRA ticket **KAN-4** and produce the deliverable in `Chapter_00_SKILL_Basics/output/` in both **HTML** and **PDF** formats. Follow the skill workflow end-to-end (fetch ticket → gap analysis → draft plan → human review gate) and apply the repository's `AGENTS.md` learning-journal rules.

## Tools and Technologies Used
- Command Code (agent runtime) + user-provided skill `advance-testplan-creator`
- JIRA Cloud REST API v3 (`/rest/api/3/issue/KAN-4`) via `curl.exe`
- Windows PowerShell 5.1 (JSON parsing, ADF text extraction, base64 logo embedding)
- Google Chrome headless (`--headless=new --print-to-pdf`) for HTML → PDF
- HTML/CSS (self-contained, print-friendly document with embedded logo)
- Repo assets: `references/requirement-checklist.md`, `references/test-plan-template.md`, `misc/mycompanydetails.md`, `misc/company.png`

## Steps Performed
1. Read the skill `SKILL.md`, `AGENTS.md`, `README.md`, and `MyNotes.md` to confirm the exact task (MyNotes lines 412–413 request a KAN-4 test plan in HTML + PDF under `output/`).
2. Read the skill references (`requirement-checklist.md`, `test-plan-template.md`) and `misc/mycompanydetails.md`.
3. Fetched KAN-4 from Jira over the REST API (HTTP 200) using credentials from `Chapter_00_SKILL_Basics/.env`.
4. Parsed the returned JSON: summary, type, priority, epic link, description, and checked components / labels / fix versions / links / attachments (all empty).
5. The Jira v3 description is **Atlassian Document Format (ADF)** JSON, so extracted the human-readable text by walking the ADF tree (paragraphs, ordered/bullet lists, listItems, hardBreaks).
6. Scored the ticket against the requirement gap-analysis checklist (✅ / ⚠️ / ❌) and derived the **Gaps & Questions for the Author** section.
7. Drafted the full test plan (scope, gaps, P0/P1/P2 scenarios traceable to ACs/gaps, test data & environment, risks, entry/exit criteria, resources, timeline, human review gate).
8. Built a self-contained HTML file (branded with TheTesting Academy header, company blurb, embedded base64 logo, print CSS).
9. Injected the `company.png` logo as a base64 data URI into the two placeholders.
10. Generated the PDF from the finished HTML with headless Chrome (`--print-to-pdf`).
11. Verified the render: captured an HTML screenshot (reviewed) and confirmed the PDF page count.

## Code Examples

Fetch the ticket (credentials supplied via environment variables, never inline):

```bash
curl.exe -sS -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Accept: application/json" \
  "$JIRA_BASE_URL/rest/api/3/issue/KAN-4?fields=summary,description,issuetype,priority,components,labels,fixVersions,issuelinks,attachment" \
  -o kan4.json -w "HTTP %{http_code}\n"
```

Extract readable text from the ADF description (PowerShell, recursive walk):

```powershell
function Get-AdfText($node, $depth) {
  $out = New-Object System.Collections.ArrayList
  foreach ($n in $node) {
    if ($n.type -eq 'text') {
      $t = [string]$n.text
      if ($n.marks) { foreach ($m in $n.marks) { if ($m.type -eq 'strong') { $t = '**' + $t + '**' } } }
      [void]$out.Add($t)
    }
    elseif ($n.type -eq 'listItem') {
      $inner = Get-AdfText $n.content ($depth + 1)
      [void]$out.Add(('  ' * $depth) + '- ' + ($inner -join ' '))
    }
    elseif ($n.type -eq 'paragraph') {
      [void]$out.Add(((Get-AdfText $n.content $depth) -join ''))
      [void]$out.Add('')
    }
    elseif ($n.content) { foreach ($x in (Get-AdfText $n.content $depth)) { [void]$out.Add($x) } }
  }
  return $out
}
```

Embed the logo and render the PDF:

```powershell
$b64  = [Convert]::ToBase64String([IO.File]::ReadAllBytes($png))
$uri  = 'data:image/png;base64,' + $b64
$html = $html.Replace('__LOGO_DATAURI__', $uri)

& $chrome --headless=new --disable-gpu --no-sandbox `
  --user-data-dir="$tmp" --no-pdf-header-footer `
  --print-to-pdf="$pdf" ("file:///" + ($htmlPath -replace '\\','/'))
```

## Challenges Faced
- The skill's `scripts/fetch_jira.sh` expects `JIRA_TOKEN`, but the repository `.env` defines `JIRA_API_TOKEN` — a name mismatch — and the script also relies on `jq`, which is not guaranteed on Windows. The provided `fetch-jira.py` is empty.
- Jira Cloud REST **v3** returns the description as structured ADF JSON, not plain text — the raw payload is not directly readable as a test plan.
- `jira`-style fields (components, labels, fix versions, links, attachments) were all empty for KAN-4, so several sections had to be grounded as open questions rather than invented content.
- Reading the UTF-8 JSON in Windows PowerShell 5.1 produced mojibake (e.g. `â€"`) when console output was redirected; the underlying data was fine.

## Solutions Implemented
- Bypassed the mismatched script by calling the Jira REST API directly with `curl.exe`, pulling credentials from `.env` via environment variables (no secrets written into any artifact).
- Wrote a recursive PowerShell ADF extractor that walks `paragraph`, `orderedList`, `bulletList`, `listItem`, `hardBreak`, and `text` (with `strong` marks) nodes to reconstruct readable ticket content.
- Kept the skill's anti-hallucination rule: every missing item was surfaced as an explicit ⚠️/❌ gap and an open question, never fabricated.
- Built a self-contained HTML with the company logo embedded as a base64 data URI, so both the HTML and the PDF render identically offline.
- Produced the PDF from the same finished HTML (single source of truth) using headless Chrome.

## Key Learnings
- The advanced skill is a strict **drafting + gap-surfacing** workflow: its highest-value output is the "Gaps & Questions for the Author" section, and it must end with a Human Review Gate — it is never "final".
- Fetching a real ticket is the first gate; if the fetch fails the correct move is to ask the user to paste the ticket, not to invent it.
- Jira Cloud v3 descriptions are ADF documents; extracting them requires tree traversal, not a simple text field read.
- A self-contained HTML (base64 assets) converts cleanly to PDF with headless Chrome, keeping HTML and PDF 1:1.

## Testing and Verification
- Jira REST call returned **HTTP 200** and a valid KAN-4 payload (Story, Epic "Authentication Enhancements").
- Rendered the HTML in headless Chrome and captured a screenshot; visually reviewed the header/logo, title, metadata table, company blurb, contents, and Section 1 — layout is clean and correct.
- Confirmed the generated PDF exists at ~323 KB with a total page count of ~9 pages.
- No automated test suite applies to this documentation/deliverable task; verification was manual (HTTP status, visual render, file/page-count checks).

## Future Improvements
- Normalize the fetch path: align the `.env` key name (`JIRA_API_TOKEN`) with the script, or implement `scripts/fetch-jira.py` (currently empty) as a portable, dependency-free fetcher.
- Add a small reusable HTML→PDF helper script so the step is one command rather than a shell invocation.
- Resolve the open gaps (error copy, IdPs, browser matrix, test data) with the ticket author, then proceed to test-case creation only after Human Review Gate sign-off.

## Completion Workflow
- Requested task completed; deliverables written to `Chapter_00_SKILL_Basics/output/`:
  - `KAN-4_Passkey_SSO_Login_Test_Plan.html`
  - `KAN-4_Passkey_SSO_Login_Test_Plan.pdf`
- Learning file created: `learnings/2026-11-03-kan-4-jira-test-plan-generation.md`.
- Not committed or pushed (no authorization given).
