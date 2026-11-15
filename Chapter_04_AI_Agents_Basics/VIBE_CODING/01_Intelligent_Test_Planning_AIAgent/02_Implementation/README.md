# Jira Test Plan Generator

React + Express app that takes a Jira issue ID, pulls the issue from Jira, and generates a test plan using the template in `01_plan/test-plan-template.md`.

## Prerequisites

- Node.js 20+ (uses the built-in `process.loadEnvFile`)
- Jira Cloud account with an API token
- A Groq API key, or a running local Ollama

## Configuration

The backend reads `Chapter_04_AI_Agents_Basics/VIBE_CODING/.env` (four levels above `src/backend`):

```text
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=you@example.com
JIRA_API_TOKEN=<token>
GROQ_API_KEY=<key>

# Optional
GROQ_MODEL=
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

`GROQ_MODEL` is auto-detected from the account's model list when empty. Credentials stay on the server; `GET /api/config` returns only booleans for the token and key.

## Run

```bash
cd 02_Implementation/src
npm install
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001 (Vite proxies `/api`)

## Use

1. Type a Jira issue ID (e.g. `QA-123`) and press Generate.
2. The reply panel shows the generated Markdown test plan with a link to the source issue.
3. Use **Test Connection**, **Test Local LLM** and **Test Groq.com** in Settings to check configuration.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/config` | Non-secret configuration state |
| POST | `/api/jira/test` | Verify Jira credentials (`/myself`) |
| POST | `/api/llm/test` | Verify Groq or Ollama (`{ provider }`) |
| POST | `/api/testplan` | Fetch issue and generate the plan (`{ issueId, provider }`) |

## Deploy (Vercel)

Live: **https://ai5x-intelligenttestplan.vercel.app** (project `sathishqaseleniums-projects/ai5x-intelligenttestplan`).

Layout for Vercel:

- `api/index.js` exports the Express app as a single Vercel Function.
- The frontend is built to `public/` and served statically.
- `vercel.json` pins the framework to `vite`, sets `outputDirectory: "public"`, and rewrites `/api/*` to the function.

`JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN` and `GROQ_API_KEY` live in the Vercel project (Production, sensitive). No `.env` file is deployed.

```bash
cd 02_Implementation/src
vercel link                       # once
vercel build --prod --yes
vercel deploy --prebuilt --prod --yes
```

Windows note: the CLI's local build spawns `cmd.exe` with an environment that lacks `PATH`, which fails with `spawn cmd.exe ENOENT` or `'node' is not recognized`. Running the build with a small `--require` preload that injects `PATH`/`ComSpec` into every spawned child works around it; builds run by Vercel itself on Linux are unaffected.

## Verification performed

- Production (`https://ai5x-intelligenttestplan.vercel.app`): `GET /` → 200, page title "Jira Test Plan Generator".
- Production: `GET /api/config` → 200 with the Jira URL and `true` for token and key (no secrets in the response).
- Production: `POST /api/jira/test` → `Connected to https://10timer-team.atlassian.net as AI5x Testing Team`.
- Production: `POST /api/testplan` with `SAM1-8` → 5,875-character plan with all eight template sections plus the Human Review Gate.
- Local: `POST /api/jira/test` → `Connected to https://10timer-team.atlassian.net as AI5x Testing Team`.
- Local: `POST /api/testplan` with `SAM1-8` → 4,416-character plan with all eight template sections and the Human Review Gate.
- Live: `POST /api/llm/test` with `groq` → `Groq OK — model openai/gpt-oss-120b`.
- Live: `POST /api/llm/test` with `ollama` → `Ollama OK — http://localhost:11434, using llama3.2:1b`.
- Live: `POST /api/testplan` with `abc` or `{}` → 400 "Enter a valid Jira issue ID, for example QA-123."
- Live: `POST /api/testplan` with `SAM1-9999` → 404 "Jira issue not found, or the configured account cannot view it."
- Live: `GET /api/config` exposes only the Jira URL/email and booleans for the token and key.
- Vite serves `/`, `main.jsx`, `App.jsx` and `styles.css` with HTTP 200.

## Known limitations

- Jira Cloud only; Jira Server/DC REST paths are not handled.
- Test plans render as preformatted Markdown text, without a Markdown renderer.
- `POST /api/testplan` was exercised against `SAM1-8`; other projects/issues are untested.
- Ollama settings are local-only on Vercel (`localhost:11434` is not reachable from the function), so use the Groq provider in production.
- The Vercel project's remote Node setting is `26.x`, which the installed CLI 59 rejects; `.vercel/project.json` is pinned to `24.x` locally. Set the project Node version to 24.x in the dashboard before switching to Git-based builds.
- The deployment has no authentication: anyone with the URL can call `/api/*` and consume the configured Jira and Groq credentials. Enable Vercel Deployment Protection (or the Enterprise-only Vercel Passport) before sharing it widely.
