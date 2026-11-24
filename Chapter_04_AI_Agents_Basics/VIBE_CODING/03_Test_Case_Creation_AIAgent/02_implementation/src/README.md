# AI Test Case Generator

Lightweight app that reads a Jira issue and generates test cases from the template in `01_plan/test-case-template.md`.

## Tech stack
- Node.js + Express (backend, serves the frontend too)
- Vanilla HTML/CSS/JS frontend
- Jira REST API v3
- Groq API (default) or local Ollama

## Structure
```
src/
├── server.js          # Express app + API routes
├── config.js          # Reads ../../../.env and the test-case template
├── services/
│   ├── jira.js        # Jira issue fetch (ADF -> text)
│   └── llm.js         # Groq / Ollama test case generation
└── public/            # index.html, app.js, styles.css
```

## Configuration
Credentials come from `Chapter_04_AI_Agents_Basics/VIBE_CODING/.env`:
```
JIRA_BASE_URL=...
JIRA_EMAIL=...
JIRA_API_TOKEN=...
GROQ_API_KEY=...
```
See `.env.example`. The Settings page can also update these on the server.

## Run
```bash
cd src
npm install
npm start
```
Open http://localhost:3000

## Usage
1. Enter a Jira issue ID (e.g. `VWO-140`).
2. Click **Generate Test Cases**.
3. Review, copy, or download the generated Markdown.
4. Use **Settings** to test the Jira and LLM connections.

## Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/generate` | Fetch Jira issue + generate test cases |
| GET | `/api/settings` | Non-sensitive settings |
| POST | `/api/settings` | Save settings to `.env` |
| POST | `/api/settings/test-jira` | Test Jira connection |
| POST | `/api/settings/test-llm` | Test LLM connection |

## Security
Credentials stay on the backend; the frontend only sees booleans for whether tokens are set.
