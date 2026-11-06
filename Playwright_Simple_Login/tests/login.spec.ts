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
