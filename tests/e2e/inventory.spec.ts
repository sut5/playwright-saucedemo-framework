import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Inventory', () => {
  test('should load inventory page for authenticated user @smoke', async ({ inventoryPage, page }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertLoaded();
  });

  test('should allow the authenticated user to logout @regression', async ({ inventoryPage, loginPage, page }) => {
    await page.goto('/inventory.html');

    await inventoryPage.assertLoaded();
    await inventoryPage.logout();

    await expect(page).not.toHaveURL(/inventory/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should allow sorting products by price low to high @regression', async ({ inventoryPage, page }) => {
    await page.goto('/inventory.html');

    await inventoryPage.assertLoaded();
    await inventoryPage.sortBy('lohi');

    await expect(inventoryPage.productSortContainer).toHaveValue('lohi');
  });
});