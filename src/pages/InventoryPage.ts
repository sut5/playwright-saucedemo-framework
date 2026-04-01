import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly shoppingCartLink: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly productSortContainer: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.getByText('Swag Labs');
    this.inventoryList = page.locator('.inventory_list');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.productSortContainer = page.locator('[data-test="product-sort-container"]');
  }

  async assertLoaded(): Promise<void> {
    await this.expectVisible(this.inventoryList);
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async sortBy(optionValue: string): Promise<void> {
    await this.productSortContainer.selectOption(optionValue);
  }

  async openMenu(): Promise<void> {
    await this.click(this.burgerMenuButton);
    await this.expectVisible(this.logoutLink);
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.click(this.logoutLink);
  }
}