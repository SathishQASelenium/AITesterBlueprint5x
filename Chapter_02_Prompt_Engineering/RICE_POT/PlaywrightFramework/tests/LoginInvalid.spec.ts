import { test, expect } from '@fixtures/baseFixture';
import { APP_URLS, CREDENTIALS, MESSAGES } from '@utils/constants';

test.describe('VWO Login - Invalid Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navigate to the VWO login page', async () => {
      await loginPage.open(APP_URLS.LOGIN);
    });
  });

  test.afterEach(async ({ context }) => {
    await test.step('Clear browser session state', async () => {
      await context.clearCookies();
    });
  });

  test('Authentication error is displayed for invalid credentials', async ({ loginPage }) => {
    await test.step('Verify the login form is displayed', async () => {
      expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
      expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
      expect(await loginPage.isSignInButtonVisible()).toBeTruthy();
    });

    await test.step('Submit invalid credentials', async () => {
      await loginPage.login(CREDENTIALS.INVALID_EMAIL, CREDENTIALS.INVALID_PASSWORD);
    });

    await test.step('Verify the authentication error is displayed', async () => {
      expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
      expect(await loginPage.getErrorMessage()).toBe(MESSAGES.INVALID_LOGIN);
    });

    await test.step('Verify the user remains on the login page', async () => {
      await expect(loginPage.pageInstance).toHaveURL(/\/login/);
    });
  });
});
