# VWO Login Test Cases with RICE-POT and Anti-Hallucination Rules

## Date
2026-11-13

## Objective
Create traceable test cases for the VWO login dashboard (`app.vwo.com` per the PRD, with `app.wingify.com` named in the request) using the RICE-POT template and the repository's anti-hallucination rules. The deliverable must live in `Chapter_02_Prompt_Engineering/output/`, state every missing-information gap, and never invent UI elements, error text, credentials, URLs, selectors, or behavior.

## Tools and Technologies Used
- Command Code agent runtime
- Python 3.14 with `pypdf` for PDF text extraction
- Windows PowerShell 5.1 for command execution and file checks
- Markdown tables for the RICE-POT prompt, fact register, gap register, test cases, and self-validation
- Repository inputs:
  - `Chapter_02_Prompt_Engineering/Product Requirements Document_ VWO Login Dashboard.pdf`
  - `Chapter_02_Prompt_Engineering/RICE_POT/Template_RICE_POT/Template.RICEPPOT.md`
  - `Chapter_02_Prompt_Engineering/anti-hallucination-rules.md`

## Steps Performed
1. Read the RICE-POT template and the anti-hallucination rules to capture the required structure: Role, Instructions, Context, Example, Parameters, Output, Tone, plus Verified Facts, Missing/Unknown Information, Generated Output, and Self-Validation Check.
2. Confirmed that `Chapter_02_Prompt_Engineering/output/` existed and was empty.
3. Extracted the PRD with `pypdf`. The first attempt failed with a `UnicodeEncodeError` because the console used cp1252 and the PDF contained the `ﬃ` ligature. Re-ran the extraction writing directly to a UTF-8 file in the session scratchpad.
4. Read the full extracted PRD (approximately 2,500 lines because the PDF text layer emitted one word per line) and identified the relevant sections: Executive Summary, Current State Analysis, Functional Requirements, User Experience Features, Technical Requirements, User Journey and Flow, Success Metrics, Implementation Considerations, Risk Mitigation, Compliance and Standards, and Future Enhancements.
5. Built 40 verified facts, each with a PRD section citation, and 30 missing-information gaps covering environment, test data, validation rules, session, 2FA, SSO, reset tokens, rate limiting, dashboard behavior, accessibility, visual design, performance, backend evidence, localization, logout, onboarding, registration, process, multi-region, and the announcement banner.
6. Generated 56 test cases with the fixed column order `TC_ID | Module | Test Case Description | PreCondition | Test Steps | Expected Result | PRD Traceability | Priority | Confidence`.
7. Classified each case as Verified (23), Inference (low confidence) (12), or Blocked (21), using the exact required phrases for the latter two.
8. Excluded future enhancements from current scope and deliberately did not create a logout case because the PRD does not document logout; recorded it as GAP-25 instead.
9. Wrote the deliverable to `Chapter_02_Prompt_Engineering/output/VWO_Login_Dashboard_Test_Cases_RICE_POT.md`.
10. Validated the markdown programmatically: 56 test-case rows, 30 gap rows, 9 columns per row, unique IDs, populated traceability, exact phrase compliance, and gap references for every blocked case.

## Code Examples

Extracting the PRD to UTF-8 to avoid the Windows console encoding failure:

```powershell
$src = "C:\Personal_Development\TheTestingAcademy\AITesterBlueprint5x\Chapter_02_Prompt_Engineering\Product Requirements Document_ VWO Login Dashboard.pdf"
$out = "$env:COMMANDCODE_SCRATCHPAD\prd.txt"
python -c "from pypdf import PdfReader; import sys; r=PdfReader(sys.argv[1]); open(sys.argv[2],'w',encoding='utf-8').write('\n'.join((p.extract_text() or '') for p in r.pages))" $src $out
```

Validating counts and exact phrases:

```python
tc_rows = [l for l in lines if l.startswith("| TC-")]
gap_rows = [l for l in lines if l.startswith("| GAP-")]
ver = [l for l in tc_rows if cells(l)[8] == "Verified"]
inf = [l for l in tc_rows if cells(l)[8] == "Inference (low confidence)"]
blk = [l for l in tc_rows if cells(l)[8] == "Blocked"]
assert len(ver) + len(inf) + len(blk) == len(tc_rows)
assert all(cells(l)[5].startswith("Insufficient information to determine.") for l in blk)
assert all(cells(l)[5].startswith("Inference (low confidence)") for l in inf)
```

Example of a verified case and a blocked case:

```text
TC-001 | Access | Login page is served over HTTPS | None | 1) Open the PRD login URL. 2) Inspect the connection scheme. | The page is served over HTTPS using SSL/TLS. | Technical Requirements > Security Specifications > HTTPS Enforcement | P1 | Verified

TC-029 | Session | Configured session timeout is enforced | Timeout value and configuration are not specified (GAP-07) | 1) Log in. 2) Remain idle for the configured timeout. 3) Attempt an authenticated action. | Insufficient information to determine. (GAP-07: timeout value, idle versus absolute behavior, warning period, and configurability are not specified.) | Functional Requirements > Authentication System > Session Management | P1 | Blocked
```

## Challenges Faced
- The PRD PDF text layer emitted one word per line with blank lines between tokens, making the extracted text long and harder to scan. Reading it in sections was necessary to reconstruct the section hierarchy.
- The first `pypdf` extraction failed on the `ﬃ` ligature because PowerShell's console encoding was cp1252. The fix was to write the extracted text directly to a UTF-8 file instead of printing it to the console.
- The PRD is intentionally high-level. It names capabilities such as 2FA, SSO, session timeout, password complexity, rate limiting, WCAG conformance, and brand consistency without supplying the executable parameters. A conventional test-case generator would have invented those details; the anti-hallucination rules required marking them as gaps.
- The request names both `app.vwo.com` and `app.wingify.com`, while the PRD references only `app.vwo.com`. Treating either URL as authoritative without confirmation would have been an unverified assumption.
- Distinguishing requirement traceability from execution readiness was important. For example, valid-login success is explicitly required, but no credentials were provided; the expected result remains Verified while the precondition records the missing test data.

## Solutions Implemented
- Extracted the PDF once to a UTF-8 scratchpad file and reused that text, avoiding repeated parsing and console encoding problems.
- Built an explicit fact register with PRD section citations before writing any test case, so every expected result has a traceable source.
- Built a separate gap register with 30 entries and mapped every blocked test case to at least one gap.
- Used the exact anti-hallucination phrases: `Insufficient information to determine.` for blocked cases and `Inference (low confidence)` for inferred cases.
- Kept future enhancements out of scope and did not generate a logout test, because the PRD does not document logout; this avoided inventing a feature.
- Validated the final markdown with a parser rather than relying on visual inspection alone.

## Key Learnings
- Anti-hallucination rules convert missing product detail into an explicit gap register instead of plausible-sounding test steps.
- A test case can be legitimate and still be blocked; separating "the requirement is verified" from "the test can be executed" prevents false confidence.
- The highest-value output of this exercise is the gap list, because it tells the team exactly what must be supplied before execution: environment, accounts, error catalog, password policy, session values, 2FA/SSO configuration, performance profile, and backend evidence.
- Future enhancements must not be tested as current requirements, even when they are interesting or easy to describe.
- Word-per-line PDF extraction is a real risk for LLM input; reconstructing headings and sections before analysis improves traceability.

## Testing and Verification
- PRD extraction produced a 14,579-byte UTF-8 text file covering the full document.
- Deliverable written to `Chapter_02_Prompt_Engineering/output/VWO_Login_Dashboard_Test_Cases_RICE_POT.md`.
- Programmatic validation results:
  - 56 test-case rows.
  - 30 gap rows.
  - 9 columns on every test-case row, matching the documented schema.
  - 56 unique test-case IDs and 30 unique gap IDs.
  - 23 Verified, 12 Inference (low confidence), 21 Blocked; the three counts sum to 56.
  - All 21 Blocked expected results begin with `Insufficient information to determine.`
  - All 12 Inference expected results begin with `Inference (low confidence)`.
  - No empty PRD traceability cells.
  - Every Blocked case contains a GAP reference.
- No execution results or pass/fail statuses were claimed, because no environment or test data was provided.
- No automated test suite applies to this documentation deliverable; verification was the parser checks above.

## Future Improvements
- Obtain the authoritative environment URL and resolve the `app.vwo.com` versus `app.wingify.com` ambiguity (GAP-01).
- Obtain test accounts for valid, invalid, locked, unregistered, 2FA-enabled, and SSO-enabled states (GAP-02).
- Obtain the error-message catalog, password policy, session timeout values, 2FA/SSO configuration, and reset-token specification.
- Obtain API/backend documentation and security evidence to unblock hashing, token, audit, GDPR/CCPA, and OWASP verification.
- Define the performance measurement method, load profile, uptime window, browser/device matrix, and accessibility audit method.
- Once unblocked, convert the 56 cases to CSV or XLSX and attach execution evidence without altering the Verified/Inference/Blocked classification.

## Completion Workflow
- Requested task completed; deliverable written to `Chapter_02_Prompt_Engineering/output/VWO_Login_Dashboard_Test_Cases_RICE_POT.md`.
- Learning file created: `learnings/2026-11-13-vwo-login-ric-pot-anti-hallucination-test-cases.md`.
- 30 missing-information gaps documented; 21 of 56 test cases are blocked by those gaps.
- Not committed or pushed, because no commit or push authorization was given.
