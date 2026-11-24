# AI Test Strategy Builder (Jira + Groq)

## Date
2026-11-23

## Objective
Build a lightweight app under `02_Test_Strategy_Builder_AIAgent/02_implementation/src` that accepts a Jira ticket ID, fetches the real issue, and generates a Test Strategy following `01_plan/test-strategy-template.md`, plus a Settings page for Jira and LLM configuration.

## Tools and Technologies Used
- Node.js v24, Express, dotenv
- Vanilla HTML/CSS/JS frontend
- Jira Cloud REST API v3 (Basic auth)
- Groq OpenAI-compatible chat completion API

## Steps Performed
1. Read `prompt_TS_Creator.md`, the design PNG, the template, and the existing `.env`.
2. Created backend: `config.js`, `services/jira.js`, `services/llm.js`, `server.js`.
3. Created frontend: `public/index.html`, `styles.css`, `app.js` (Main + Settings views).
4. Installed dependencies and started the server on port 3000.
5. Validated Jira and Groq connections, then generated a strategy for `KAN-4`.

## Code Examples
Jira fetch with basic auth:

```js
const res = await fetch(`${jiraBaseUrl}/rest/api/3/issue/${issueId}`, {
  headers: { Authorization: authHeader(), Accept: 'application/json' },
});
```

Groq call:

```js
body: JSON.stringify({
  model: 'openai/gpt-oss-120b',
  max_completion_tokens: 8000,
  reasoning_effort: 'low',
  messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: prompt }],
})
```

## Challenges Faced
- `llama-3.3-70b-versatile` returned 404 (model no longer available on the account).
- First generated document was truncated at section 13.
- Jira ADF descriptions are nested JSON, not plain text.
- Unbounded JQL is rejected by Jira search API.

## Solutions Implemented
- Switched to `openai/gpt-oss-120b` (verified via `/v1/models`).
- Added `max_completion_tokens: 8000` and `reasoning_effort: 'low'`; all 14 sections plus review gate now present.
- Added an ADF-to-text converter.
- Used `project is not EMPTY order by created DESC` when discovering a test ticket.

## Key Learnings
- Groq model availability changes; query `/v1/models` instead of hardcoding.
- Reasoning models need an explicit completion budget or output silently truncates.

## Testing and Verification
- `POST /api/settings/test-jira` → `Connected to Jira as qtqdmy49118@10timer.com`
- `POST /api/settings/test-llm` → `Groq API key valid`
- `POST /api/generate` with `KAN-4` → 200, 9776-char document containing sections 1–14 and HUMAN REVIEW GATE
- Invalid issue `VWO-140` → `Jira issue "VWO-140" not found.`
- Frontend served at http://localhost:3000 (HTTP 200).

## Future Improvements
- Render generated Markdown as formatted HTML instead of raw text.
- Cache issue lookups and add request timeouts.
- Persist settings per user rather than only the shared `.env`.
