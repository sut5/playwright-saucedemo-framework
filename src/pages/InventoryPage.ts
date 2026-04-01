import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly productSortContainer: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('.inventory_list');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.productSortContainer = page.locator('[data-test="product-sort-container"]');
  }

  async assertLoaded(): Promise<void> {
    await this.expectVisible(this.inventoryList);
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async sortBy(optionValue: string): Promise<void> {
    await this.productSortContainer.selectOption(optionValue);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(productName) })
      .getByRole('button', { name: /add to cart/i })
      .click();
  }

  async openCart(): Promise<void> {
    await this.click(this.shoppingCartLink);
  }

  async assertCartBadgeCount(count: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

  async openMenu(): Promise<void> {
    await this.click(this.burgerMenuButton);
    await expect(this.logoutLink).toBeVisible({ timeout: 10000 });
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.click(this.logoutLink);
  }
}