import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAsStandardUser();
  });

  test('should load inventory page after successful login @smoke', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertLoaded();
  });

  test('should allow the user to logout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const loginPage = new LoginPage(page);

    await inventoryPage.assertLoaded();
    await inventoryPage.logout();

    await expect(page).not.toHaveURL(/inventory/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should allow sorting products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.assertLoaded();
    await inventoryPage.sortBy('lohi');

    await expect(inventoryPage.productSortContainer).toHaveValue('lohi');
  });
});