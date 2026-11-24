# Deploying the AI Test Case Generator to Vercel

## Date
2026-11-24

## Objective
Deploy the Express + static frontend app to Vercel at `ai5x-testcasecreator.vercel.app`, with runtime secrets stored as Vercel environment variables.

## Tools and Technologies Used
- Vercel CLI 59.1.3 (logged in as `sathishqaselenium`)
- Vercel Node.js serverless functions
- Express 4

## Steps Performed
1. Made `server.js` export the Express app and `listen` only when run directly (already in place).
2. Added `api/index.js` that re-exports the app as a serverless handler.
3. Added `vercel.json` with an `/api/(.*)` rewrite and `includeFiles` for the bundled template.
4. Copied `01_plan/test-case-template.md` to `src/template/` since Vercel only uploads the project root.
5. Updated `config.js` to prefer the bundled template and fall back to the repo path for local dev.
6. Linked the project as `ai5x-testcasecreator` so the default domain is the requested one.
7. Added four production env vars via `vercel env add` (sensitive).
8. Deployed with `vercel deploy --prod` and verified all endpoints.

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
- Vercel only serves files inside the configured root, so the `01_plan` template was unavailable at runtime.
- Vercel's filesystem is read-only, so local `.env` writes must fail gracefully (already handled in `saveConfig`).
- The CLI warned that internal rewrites now route by destination path; endpoints were verified after deploy.

## Solutions Implemented
- Bundled a template copy into `src/template/` and preferred it in `config.js`.
- `vercel link --yes --project ai5x-testcasecreator` created the project with the exact desired name.
- Piped each secret into `vercel env add <name> production --force` (stored sensitive/hidden).

## Key Learnings
- The Vercel project name determines the default `<name>.vercel.app` domain; linking with the right name is enough for the requested URL.
- A root-level `public/` folder is served statically by Vercel, so the frontend works without bundling it into the function.
- `includeFiles` is the reliable way to ship non-JS assets into a Vercel function bundle.

## Testing and Verification
- `GET /` → 200
- `GET /api/settings` → 200 with Jira URL/email and masked token flags
- `POST /api/settings/test-jira` → `Connected to Jira as qtqdmy49118@10timer.com`
- `POST /api/generate` with `KAN-4` → success, 9084-character Markdown following the template

## Future Improvements
- Add env vars for preview environments too.
- Add request timeouts and basic rate limiting on the generation endpoint.
