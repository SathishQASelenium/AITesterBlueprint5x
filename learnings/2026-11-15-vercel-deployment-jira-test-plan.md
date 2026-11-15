# Deploying the Jira Test Plan Generator to Vercel

## Date

2026-11-15

## Objective

Ship the Chapter 04 Jira Test Plan Generator to Vercel at the exact URL `ai5x-intelligenttestplan.vercel.app`, with the Jira/Groq credentials stored as Vercel project environment variables rather than a deployed `.env`.

## Tools and Technologies Used

- Vercel CLI 59.1.3, Vercel project `sathishqaseleniums-projects/ai5x-intelligenttestplan`
- Vercel Build Output API v3 (`vercel build --prebuilt` flow)
- Vite build → `public/`, Express app exposed as a single Vercel Function via `api/index.js`
- Node.js 24, PowerShell 5.1 on Windows

## Steps Performed

1. Split `backend/server.js` into `backend/app.js` (Express app, default export) and a thin `server.js` listener.
2. Added `api/index.js` exporting the Express app, `vercel.json` with framework `vite`, `outputDirectory: "public"` and a `/api/*` rewrite to the function.
3. Changed the Vite outDir to `public` with `publicDir: false`, and copied the test plan template into `backend/` so the deployment does not depend on `01_plan/`.
4. Linked the project, created it with the requested name, and added four Production env vars (`JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`, `GROQ_API_KEY`) as sensitive.
5. Ran `vercel build --prod` then `vercel deploy --prebuilt --prod`, which aliased `ai5x-intelligenttestplan.vercel.app`.
6. Verified the live deployment: page, config endpoint, Jira connection, and a full plan generation for `SAM1-8`.

## Code Examples

Vercel entry point:

```js
// api/index.js
import app from "../backend/app.js";
export default app;
```

`vercel.json` that finally worked:

```json
{
  "framework": "vite",
  "outputDirectory": "public",
  "rewrites": [{ "source": "/api/(.*)", "destination": "/api/index" }]
}
```

Template resolution that works locally and on Vercel:

```js
const templateCandidates = [
  path.resolve(here, "../../../01_plan/test-plan-template.md"),
  path.join(here, "test-plan-template.md"),
];
export const templatePath = templateCandidates.find((p) => fs.existsSync(p)) || templateCandidates[1];
```

## Challenges Faced

- `vercel deploy` failed with `spawn cmd.exe ENOENT`. The CLI runs the build command through `cross-spawn("cmd.exe")` with a child environment that has no usable `PATH`; a spawn probe showed the `cwd` existed, so the failure was environment-driven.
- With the shell pinned, the build then failed with `'"node"' is not recognized` because the child env still lacked a Node entry on `PATH`.
- The project was auto-created with framework `services`, which forced a `services` config and demanded an entrypoint for the `backend` folder.
- The project's Node version was `26.x`, which CLI 59.1.3 rejects as invalid.
- `public/` was listed in `.gitignore`, so Vercel's file staging hid it from the build.
- The first anonymous deployment returned 403 from this network on `*.now` domains, which looked like a broken deployment until it was fetched from another network.

## Solutions Implemented

- Added a `--require` preload that patches `child_process.spawn` to inject `PATH`, `PATHEXT`, `SystemRoot` and `ComSpec`, and to resolve `cmd.exe` to its absolute path, for every spawned child during the CLI build.
- Removed the `build` script (renamed to `build:web`) and pre-built `public/`, so Vercel reuses existing static output instead of shelling out on machines where that fails.
- Pinned the framework to `vite` and `outputDirectory` to `public` in `vercel.json`, overriding the `services` project framework.
- Pinned `nodeVersion` to `24.x` in the local `.vercel/project.json`.
- Deployed with `--prebuilt --prod`, which uploads the Build Output API directory directly and skips local builds entirely.

## Key Learnings

- Vercel's zero-config Express flow expects either `public/**` for static assets or a services layout; mixing a Vite frontend with an Express API is simplest as "static output + `api/` function".
- `vercel deploy --prebuilt --prod` is the most reliable path on Windows because it never spawns a build shell.
- Anonymous (`--temporary`) deployments cannot be renamed or aliased, so a project name such as `ai5x-intelligenttestplan` requires an authenticated account.
- Vercel CLI rewrites `vercel.json` into a `services` block when the linked project's framework is `services`.

## Testing and Verification

Production (https://ai5x-intelligenttestplan.vercel.app):

- `GET /` → 200 with the page title "Jira Test Plan Generator".
- `GET /api/config` → 200, Jira URL present, `jiraTokenSet: true`, `groqKeySet: true`, no secrets returned.
- `POST /api/jira/test` → `Connected to https://10timer-team.atlassian.net as AI5x Testing Team`.
- `POST /api/testplan` with `SAM1-8` → 5,875-character plan containing all eight template sections plus the Human Review Gate.

Local (`localhost:3001`) re-checked after the refactor: Jira connection and plan generation still work.

## Future Improvements

- Set the project Node version to 24.x in the Vercel dashboard so Git-based builds succeed.
- Add Vercel Deployment Protection, since the app exposes Jira reads and Groq usage without authentication.
- Add a `deploy` npm script that wraps the build-plus-prebuilt flow and the Windows spawn workaround.
