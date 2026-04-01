import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);

    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.cartItems = page.locator('.cart_item');
  }

  async assertLoaded(): Promise<void> {
    await this.expectVisible(this.finishButton);
  }

  async finish(): Promise<void> {
    await this.click(this.finishButton);
  }

  async cancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  async assertItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }
}
