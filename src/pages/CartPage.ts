import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async goto(): Promise<void> {
    await super.goto('/cart.html');
  }

  async assertLoaded(): Promise<void> {
    await this.expectVisible(this.cartList);
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async assertItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async assertItemVisible(itemName: string): Promise<void> {
    await expect(this.page.getByText(itemName)).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.click(this.checkoutButton);
}
}