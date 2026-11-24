# AI Test Strategy Builder

Lightweight app that takes a Jira ticket ID, fetches the issue, and generates a Test Strategy using the template in `01_plan/test-strategy-template.md`.

Live: https://ai5x-teststrategybuilder.vercel.app

## Run locally

```bash
cd 02_implementation/src
npm install
npm start
```

Open http://localhost:3000

Locally, config is read from `Chapter_04_AI_Agents_Basics/VIBE_CODING/.env` (Jira URL/email/token + Groq key), and the Settings tab can test connections and save updates back to that file. On Vercel the same values come from environment variables.

## Endpoints

- `POST /api/generate` — `{ "jiraIssueId": "KAN-4" }`
- `GET /api/settings`
- `POST /api/settings`
- `POST /api/settings/test-jira`
- `POST /api/settings/test-llm`

## Deploy to Vercel

This folder (`src`) is the Vercel project root. `api/index.js` exports the Express app, and `vercel.json` rewrites `/api/*` to it. `public/` is served statically.

```bash
vercel link --project ai5x-teststrategybuilder
vercel env add JIRA_BASE_URL production
vercel env add JIRA_EMAIL production
vercel env add JIRA_API_TOKEN production
vercel env add GROQ_API_KEY production
vercel deploy --prod
```

`template/test-strategy-template.md` is bundled into the function via `includeFiles`. Settings changes cannot be written on Vercel (read-only filesystem) — update the Vercel env vars instead.
