# Playwright Simple Login Test (TypeScript)

## Date
2026-11-03

## Objective
Create a minimal, self-contained Playwright + TypeScript login test that runs on its own (independent of the existing VWO framework), verify it works, and document the work per the repository's `AGENTS.md` learning-journal rules.

## Tools and Technologies Used
- Node.js v24.11.1 / npm 11.19.0
- Playwright Test (`@playwright/test` ^1.49.1, resolved to 1.64.1)
- TypeScript ^5.7.3 (`tsc --noEmit` for typechecking)
- Chromium (from the shared ms-playwright browser cache — no browser download required)
- Target application: `https://the-internet.herokuapp.com/login` (public demo login page)

## Steps Performed
1. Read `AGENTS.md` and the repository `README.md`; confirmed the existing Playwright framework conventions under `Chapter_02_Prompt_Engineering/RICE_POT/PlaywrightFramework/`.
2. Confirmed the request was for a **self-contained single file** (not an addition to the existing VWO framework).
3. Verified the environment: Node/npm present, Chromium present in the ms-playwright cache, and the demo login page reachable (HTTP 200).
4. Confirmed `node_modules` is not tracked and each framework ships its own nested `.gitignore`.
5. Created a new standalone project folder `Playwright_Simple_Login/` containing the spec, config, `package.json`, `tsconfig.json`, and `.gitignore`.
6. Installed dependencies with `npm install`.
7. Ran `npm run typecheck` (passed) followed by `npx playwright test --headed` (2 tests passed).

## Code Examples
The login test (`Playwright_Simple_Login/tests/login.spec.ts`) uses role/label-based locators and web-first assertions:

```ts
import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://the-internet.herokuapp.com/login';
const VALID_USERNAME = 'tomsmith';
const VALID_PASSWORD = 'SuperSecretPassword!';

test.describe('Simple Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('user can log in with valid credentials', async ({ page }) => {
    await page.getByLabel('Username').fill(VALID_USERNAME);
    await page.getByLabel('Password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
  });

  test('error is shown for invalid credentials', async ({ page }) => {
    await page.getByLabel('Username').fill('invalid-user');
    await page.getByLabel('Password').fill('invalid-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });
});
```

`Playwright_Simple_Login/playwright.config.ts` keeps a lean setup (single Chromium project, headless by default with a `HEADLESS=false` override, list + HTML reporters):

```ts
export default defineConfig({
  testDir: './tests',
  use: {
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
```

## Challenges Faced
- A standalone project cannot reuse the existing framework's `node_modules`, because Node resolves `@playwright/test` upward from the spec file; the sibling framework's `node_modules` is not on that path.
- The demo login page marks its fields via `<label for="...">`, so accessible-name locators are the cleanest selector strategy.
- Running tolerantly in a developer environment means headed runs require an interactive desktop session.

## Solutions Implemented
- Gave the standalone project its own `package.json` + `tsconfig.json` and ran a local `npm install`, rather than hacking module resolution against the other framework.
- Used `getByLabel('Username')` / `getByLabel('Password')` and `getByRole('button', { name: 'Login' })` so locators match the page's accessibility tree and avoid brittle CSS/XPath.
- Defaulted the config to headless with a `HEADLESS` env override, and verified locally by passing `--headed`.
- Added a nested `.gitignore` (mirroring the existing frameworks) to keep `node_modules/`, `playwright-report/`, and `test-results/` out of version control; skipped the browser download since Chromium was already cached.

## Key Learnings
- Playwright resolves test dependencies from the spec file's location, so a "self-contained" project genuinely needs its own dependencies.
- Accessible locators (`getByLabel`, `getByRole`) plus web-first `expect` assertions keep the test readable and resilient.
- The shared ms-playwright cache means installing `@playwright/test` does not necessarily require re-downloading browsers.

## Testing and Verification
- `npm run typecheck` — passed with no errors.
- `npx playwright test --headed` (Chromium) — **2 passed (10.5s)**:
  - `Simple Login › user can log in with valid credentials` — ok (4.1s)
  - `Simple Login › error is shown for invalid credentials` — ok (4.0s)

These results are from actual local runs against `https://the-internet.herokuapp.com/login`.

## Future Improvements
- Add a Page Object Model layer if the suite grows.
- Add a CI workflow (headless) and a `storageState`-based authentication reuse example.
- Cover edge cases: empty fields, locked-out user, and session logout.
- Parameterise credentials/categories via a data file or fixtures.
