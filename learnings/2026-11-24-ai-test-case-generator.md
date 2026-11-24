# AI Test Case Generator (Chapter 04 – VIBE_CODING 03)

## Date
2026-11-24

## Objective
Build a lightweight app that reads a Jira issue and generates test cases using the template in `03_Test_Case_Creation_AIAgent/01_plan/test-case-template.md`. All code confined to `02_implementation/src`.

## Tools and Technologies Used
- Node.js + Express (serves API and static frontend)
- Vanilla HTML/CSS/JS frontend
- Jira REST API v3
- Groq API (OpenAI-compatible) with optional local Ollama
- dotenv

## Steps Performed
1. Reviewed `prompt_TC_Creator.md`, the design mockup, the test-case template, the shared `.env`, and the working Agent 02 implementation to reuse its proven pattern.
2. Created `src/` with `server.js`, `config.js`, `services/jira.js`, `services/llm.js`, and `public/` (index.html, app.js, styles.css).
3. Configured `config.js` to read `VIBE_CODING/.env` (`../../../.env`) and the template from `../../01_plan/test-case-template.md`.
4. Installed dependencies and started the server on port 3000.
5. Verified `/api/settings`, `/api/settings/test-jira`, and `/api/generate`.

## Code Examples
ADF-to-text conversion for Jira Cloud descriptions:
```js
function adfToText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(adfToText).join('');
  let text = node.text || '';
  if (node.content) text += adfToText(node.content);
  if (node.type === 'paragraph' || node.type === 'heading') text += '\n';
  return text;
}
```

## Challenges Faced
- `VWO-140` from the prompt does not exist on the configured Jira instance (`10timer-team.atlassian.net`). It returned 404.
- The legacy `/rest/api/3/search` endpoint is removed; the new `/rest/api/3/search/jql` rejects unbounded JQL.

## Solutions Implemented
- Discovered real issues via `/rest/api/3/search/jql` with a bounded `created >= -365d` query.
- Verified end-to-end generation using `KAN-4` (SSO/Passkey login story). Output followed the template (Scope & Traceability, Preconditions, Test Data, TC-1, etc.).

## Key Learnings
- Jira Cloud descriptions/AC are ADF JSON and need conversion to plain text.
- Jira Cloud deprecated the old search endpoint; bounded JQL is required on the new one.
- Keep credentials backend-only; expose only booleans (`jiraApiTokenSet`, `groqApiKeySet`) to the client.

## Testing and Verification
- `GET /api/settings` → 200 with non-sensitive config.
- `POST /api/settings/test-jira` → "Connected to Jira as qtqdmy49118@10timer.com".
- `POST /api/generate` with `KAN-4` → 12.6 KB Markdown following the template.
- UI opened at http://localhost:3000.

## Future Improvements
- Add a `/api/health` endpoint.
- Allow exporting test cases to CSV/XLSX.
- Cache Jira issue lookups.
