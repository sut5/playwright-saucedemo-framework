import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async fillInformation(first: string, last: string, zip: string): Promise<void> {
    await this.fill(this.firstNameInput, first);
    await this.fill(this.lastNameInput, last);
    await this.fill(this.postalCodeInput, zip);
  }

  async continue(): Promise<void> {
    await this.click(this.continueButton);
  }
}