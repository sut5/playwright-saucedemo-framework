import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly shoppingCartBadge: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
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
    await expect(this.page.getByText(itemName, { exact: true })).toBeVisible();
  }

  async assertItemNotVisible(itemName: string): Promise<void> {
    await expect(this.page.getByText(itemName, { exact: true })).toHaveCount(0);
  }

  async getItemNames(): Promise<string[]> {
    const itemNames = await this.cartItemNames.allTextContents();
    return itemNames.map((itemName) => itemName.trim());
  }

  async removeItem(itemName: string): Promise<void> {
    await this.cartItems
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }

  async assertCartBadgeCount(count: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

  async assertCartBadgeHidden(): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveCount(0);
  }

  async checkout(): Promise<void> {
    await this.click(this.checkoutButton);
  }
}
