import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText(/Epic sadface/i);
  }

  async goto(): Promise<void> {
    await super.goto('/');
    await this.expectVisible(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async loginAsStandardUser(): Promise<void> {
    await this.login(
      process.env.STANDARD_USER as string,
      process.env.PASSWORD as string
    );
  }

  async loginAsLockedOutUser(): Promise<void> {
    await this.login(
      process.env.LOCKED_OUT_USER as string,
      process.env.PASSWORD as string
    );
  }

  async assertErrorMessageVisible(): Promise<void> {
    await this.expectVisible(this.errorMessage);
  }
}