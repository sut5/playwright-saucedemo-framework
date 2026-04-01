import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  readonly successHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.successHeader = page.locator('[data-test="complete-header"]');
  }

  async assertSuccess(): Promise<void> {
    await expect(this.successHeader).toHaveText('Thank you for your order!');
  }
}