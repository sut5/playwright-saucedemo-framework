import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInformation(first: string, last: string, zip: string): Promise<void> {
    await this.fill(this.firstNameInput, first);
    await this.fill(this.lastNameInput, last);
    await this.fill(this.postalCodeInput, zip);
  }

  async continue(): Promise<void> {
    await this.click(this.continueButton);
  }

  async cancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  async assertErrorMessageContains(text: string | RegExp): Promise<void> {
    await this.expectText(this.errorMessage, text);
  }
}
