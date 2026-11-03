import { Locator, Page } from '@playwright/test';
import { TIMEOUTS } from '@utils/constants';

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly notificationBox: Locator;
  private readonly notificationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.getByRole('textbox', { name: 'Email address', exact: true });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password', exact: true });
    this.signInButton = this.page.getByRole('button', { name: 'Sign in', exact: true });
    this.notificationBox = this.page.locator("//div[@id='js-notification-box']");
    this.notificationMessage = this.page.locator("//div[@id='js-notification-box-msg']");
  }

  async open(url: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUTS.NAVIGATION });
      await this.emailInput.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
    } catch (error) {
      throw new Error(`Unable to open the login page at ${url}: ${(error as Error).message}`);
    }
  }

  async enterEmail(email: string): Promise<void> {
    try {
      await this.emailInput.waitFor({ state: 'visible', timeout: TIMEOUTS.DEFAULT });
      await this.emailInput.fill(email);
    } catch (error) {
      throw new Error(`Unable to enter the email address: ${(error as Error).message}`);
    }
  }

  async enterPassword(password: string): Promise<void> {
    try {
      await this.passwordInput.waitFor({ state: 'visible', timeout: TIMEOUTS.DEFAULT });
      await this.passwordInput.fill(password);
    } catch (error) {
      throw new Error(`Unable to enter the password: ${(error as Error).message}`);
    }
  }

  async clickSignIn(): Promise<void> {
    try {
      await this.signInButton.waitFor({ state: 'visible', timeout: TIMEOUTS.DEFAULT });
      await this.signInButton.click();
    } catch (error) {
      throw new Error(`Unable to click the Sign in button: ${(error as Error).message}`);
    }
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.notificationMessage.waitFor({ state: 'visible', timeout: TIMEOUTS.DEFAULT });
      return (await this.notificationMessage.innerText()).trim();
    } catch (error) {
      throw new Error(`Login error message was not displayed: ${(error as Error).message}`);
    }
  }

  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.notificationBox.waitFor({ state: 'visible', timeout: TIMEOUTS.DEFAULT });
      return await this.notificationBox.isVisible();
    } catch {
      return false;
    }
  }

  async isEmailFieldVisible(): Promise<boolean> {
    return this.emailInput.isVisible();
  }

  async isPasswordFieldVisible(): Promise<boolean> {
    return this.passwordInput.isVisible();
  }

  async isSignInButtonVisible(): Promise<boolean> {
    return this.signInButton.isVisible();
  }

  async waitForSuccessfulLogin(): Promise<void> {
    try {
      await this.page.waitForURL((url) => !url.hash.includes('/login'), { timeout: TIMEOUTS.DEFAULT });
    } catch (error) {
      throw new Error(`Login did not complete successfully: ${(error as Error).message}`);
    }
  }

  get pageInstance(): Page {
    return this.page;
  }
}
