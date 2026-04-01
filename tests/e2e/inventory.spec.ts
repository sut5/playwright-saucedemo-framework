import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAsStandardUser();
  });

  test('should load inventory page after successful login @smoke', async ({ inventoryPage, page }) => {
    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertLoaded();
  });

  test('should allow the user to logout', async ({ inventoryPage, loginPage, page }) => {
    await inventoryPage.assertLoaded();
    await inventoryPage.logout();

    await expect(page).not.toHaveURL(/inventory/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should allow sorting products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.assertLoaded();
    await inventoryPage.sortBy('lohi');

    await expect(inventoryPage.productSortContainer).toHaveValue('lohi');
  });
});