import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

type BaseFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<BaseFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
export type { BaseFixtures };
