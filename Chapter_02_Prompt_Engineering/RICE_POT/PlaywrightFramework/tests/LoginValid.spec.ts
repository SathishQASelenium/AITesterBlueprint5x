import { test, expect } from '@fixtures/baseFixture';
import { APP_URLS, VALID_CREDENTIALS } from '@utils/constants';

test.describe('VWO Login - Valid Login', () => {
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

  test('Login page displays the expected UI elements', async ({ loginPage }) => {
    await test.step('Verify email, password and Sign in controls are visible', async () => {
      expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
      expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
      expect(await loginPage.isSignInButtonVisible()).toBeTruthy();
    });
  });

  test('User is authenticated with valid credentials', async ({ loginPage }) => {
    test.skip(
      !VALID_CREDENTIALS.EMAIL || !VALID_CREDENTIALS.PASSWORD,
      'Valid VWO credentials are not configured (VWO_VALID_EMAIL / VWO_VALID_PASSWORD).'
    );

    await test.step('Submit valid credentials', async () => {
      await loginPage.login(VALID_CREDENTIALS.EMAIL, VALID_CREDENTIALS.PASSWORD);
    });

    await test.step('Verify authentication completes and the login page is dismissed', async () => {
      await loginPage.waitForSuccessfulLogin();
      await expect(loginPage.pageInstance).not.toHaveURL(/\/login/);
      expect(await loginPage.isEmailFieldVisible()).toBeFalsy();
    });
  });
});
