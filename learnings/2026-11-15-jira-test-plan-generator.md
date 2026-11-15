# Jira Test Plan Generator — VIBE_CODING Chapter 04

## Date

2026-11-15

## Objective

Build a lightweight React + Express application from `prompt_TP_Creator.md`: enter a Jira issue ID, retrieve the issue from Jira, generate a test plan using the supplied template, and display it — with a settings panel for Jira and LLM configuration.

## Tools and Technologies Used

- Node.js 24, Express 4, Vite 5, React 18
- Jira Cloud REST API v3 (Basic auth with email + API token)
- Groq chat completions API (`openai/gpt-oss-120b`) and local Ollama (`llama3.2:1b`)
- `process.loadEnvFile` for server-side secrets, `concurrently` for one-command dev startup

## Steps Performed

1. Read `prompt_TP_Creator.md`, `01_plan/test-plan-template.md`, `00_design/screen_design_plan.png`, and `VIBE_CODING/.env`.
2. Created the app under `02_Implementation/src` with `frontend/` and `backend/` folders.
3. Backend: `config.js` (env loading), `jira.js` (ADF-to-text issue fetch), `llm.js` (Groq/Ollama chat + template prompt), `server.js` (four endpoints).
4. Frontend: two-panel layout matching the design (reply panel + prompt input, settings with Jira connection and LLM configuration).
5. Installed dependencies, started both servers, and verified each endpoint.

## Code Examples

Fetching a Jira issue and normalizing it for the prompt:

```js
const issue = await jiraGet(`/issue/${encodeURIComponent(issueId)}?fields=*all`);
const names = await getFieldNames();
const acceptance = Object.entries(issue.fields)
  .filter(([id, v]) => id.startsWith("customfield_") && /acceptance|criteria|requirement/i.test(names[id] || "") && v != null)
  .map(([id, v]) => ({ field: names[id], text: typeof v === "object" ? adfToText(v) : String(v) }));
```

Holding the model to the supplied template:

```js
const template = await fs.readFile(templatePath, "utf8");
const user = `# Template\n\n${template}\n\n# Jira issue (${issue.key})\n\n${JSON.stringify(issue, null, 2)}`;
```

## Challenges Faced

- Jira Cloud returns descriptions as Atlassian Document Format, not plain text, so a small recursive ADF-to-text converter was needed.
- Acceptance criteria live in different custom field IDs per site, so field names are resolved once via `/rest/api/3/field` and matched by name.
- The configured Ollama model is `llama3.2` while the pulled tag is `llama3.2:1b`, which would 404 on `/api/chat`.
- The Jira API token in `VIBE_CODING/.env` is rejected by Atlassian (HTTP 401).

## Solutions Implemented

- `adfToText()` flattens paragraphs, headings, list items and mentions into readable text.
- Ollama model resolution prefers an exact tag match, then a `<model>:` prefix, then the first installed model.
- Groq model resolution queries `/openai/v1/models` and picks the first preferred available model when `GROQ_MODEL` is empty.
- Jira status codes map to plain-language errors (401 auth, 403 permission, 404 not found/not visible) instead of raw API bodies.

## Key Learnings

- Keeping the whole config read-only in the UI (booleans for secrets) satisfies "credentials on the backend" without a secret store.
- Backend-generated prompts should read the template file at runtime so the plan structure can never drift from the source template.
- Template-driven prompts with an explicit "Insufficient information to determine" rule reliably suppress invented requirements.

## Testing and Verification

Live (after the `.env` credentials were replaced):

- `POST /api/jira/test` → `Connected to https://10timer-team.atlassian.net as AI5x Testing Team`.
- `POST /api/testplan` with `SAM1-8` → 4,416-character plan containing all eight template sections plus the Human Review Gate, with the source link to `/browse/SAM1-8`.
- `POST /api/testplan` with `SAM1-9999` → 404 "Jira issue not found, or the configured account cannot view it."
- `POST /api/llm/test {provider:"groq"}` → `Groq OK — model openai/gpt-oss-120b`.
- `POST /api/llm/test {provider:"ollama"}` → `Ollama OK — http://localhost:11434, using llama3.2:1b`.
- `POST /api/testplan` with `abc` and `{}` → 400 validation error.
- `GET /api/config` → Jira URL/email present, `jiraTokenSet: true`, `groqKeySet: true`.
- Vite served `/`, `/frontend/main.jsx`, `/frontend/App.jsx`, `/frontend/styles.css` with HTTP 200.

Initial state: the first `.env` token was rejected by Atlassian (401), which is why the initial run only had mocked generation. After the credentials were updated and both servers restarted, the live path was verified.

Mocked (labelled as such, not live Jira):

- Before the credential fix, plan generation ran against a synthetic `QA-999` issue through Groq and produced all eight template sections plus the Human Review Gate, using "Insufficient information to determine" where the mock was silent.

## Future Improvements

- Render the plan as formatted Markdown instead of preformatted text.
- Persist the selected provider instead of defaulting to Groq on reload.
- Add a Jira JQL search endpoint so users can pick an issue instead of typing its key.
