# Deploying the AI Test Strategy Builder to Vercel

## Date
2026-11-23

## Objective
Deploy the Express + static frontend app to Vercel at `ai5x-teststrategybuilder.vercel.app`, with all runtime secrets stored as Vercel environment variables.

## Tools and Technologies Used
- Vercel CLI 59.1.3 (logged in as `sathishqaselenium`)
- Vercel Node.js serverless functions
- Express 4

## Steps Performed
1. Made `server.js` export the Express app and only `listen` when run directly.
2. Added `api/index.js` that re-exports the app as a serverless handler.
3. Added `vercel.json` with an `/api/(.*)` rewrite and `includeFiles` for the template.
4. Copied `01_plan/test-strategy-template.md` to `src/template/` since Vercel only uploads the project root.
5. Updated `config.js` to prefer the bundled template and to refuse `.env` writes when the file is absent.
6. Linked the project and added four production env vars via `vercel env add`.
7. Deployed with `vercel deploy --prod` and verified all endpoints.

## Code Examples
`api/index.js`:

```js
module.exports = require('../server');
```

`vercel.json`:

```json
{
  "rewrites": [{ "source": "/api/(.*)", "destination": "/api" }],
  "functions": { "api/index.js": { "includeFiles": "template/**" } }
}
```

## Challenges Faced
- Vercel only serves files inside the configured root directory, so the `01_plan` template was not available at runtime.
- Vercel's filesystem is read-only, so the local `.env` save path would crash.
- The CLI logged a warning about internal rewrites routing by destination path, so the API routes needed verification after deploy.

## Solutions Implemented
- Bundled a template copy into `src/template/` and added a fallback to the repo path for local dev.
- `saveConfig` throws a clear "set the environment variables in Vercel" error when `.env` is not present.
- Verified each endpoint against the production URL rather than assuming the rewrite behaved.

## Key Learnings
- `vercel link` auto-detected Express and created `.env.local` with a VERCEL_OIDC_TOKEN; that file is gitignored.
- Env vars piped into `vercel env add <name> production --force` are stored as sensitive and hidden.
- `includeFiles` is the reliable way to ship non-JS assets into a Vercel function bundle.

## Testing and Verification
- `GET /` → 200
- `GET /api/settings` → 200 with Jira URL/email and masked token flags
- `POST /api/settings/test-jira` → `Connected to Jira as qtqdmy49118@10timer.com`
- `POST /api/settings/test-llm` → `Groq API key valid`
- `POST /api/generate` with `KAN-4` → 200, 9613-character strategy containing section 14
- `POST /api/generate` with `NOPE-999` → `Jira issue "NOPE-999" not found.`

## Future Improvements
- Add env vars for preview/development environments too.
- Add a custom domain and a `settings` persistence layer outside the local filesystem.
- Add request timeouts and basic rate limiting on the generation endpoint.
