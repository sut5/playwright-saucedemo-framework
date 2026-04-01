import { test, expect } from '../../src/fixtures/test-fixtures';
import {
  INVENTORY_PRODUCTS,
  INVENTORY_SORT_EXPECTATIONS,
  PRODUCTS,
} from '../../src/data/products';

test.describe('Inventory', () => {
  test('should load inventory page for authenticated user @smoke', async ({ inventoryPage, page }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertLoaded();
    await inventoryPage.assertInventoryItemCount(INVENTORY_PRODUCTS.length);
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
    expect(await inventoryPage.getVisibleProductPrices()).toEqual(
      [...INVENTORY_SORT_EXPECTATIONS.priceAscending]
    );
  });

  test('should allow sorting products by name z to a @regression', async ({ inventoryPage, page }) => {
    await page.goto('/inventory.html');

    await inventoryPage.assertLoaded();
    await inventoryPage.sortBy('za');

    await expect(inventoryPage.productSortContainer).toHaveValue('za');
    expect(await inventoryPage.getVisibleProductNames()).toEqual(
      [...INVENTORY_SORT_EXPECTATIONS.nameDescending]
    );
  });

  test('should update the cart badge when products are added and removed @regression', async ({
    inventoryPage,
    page,
  }) => {
    await page.goto('/inventory.html');

    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.assertCartBadgeCount(1);

    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.assertCartBadgeCount(2);

    await inventoryPage.removeProductFromCart(PRODUCTS.backpack);
    await inventoryPage.assertCartBadgeCount(1);

    await inventoryPage.removeProductFromCart(PRODUCTS.bikeLight);
    await inventoryPage.assertCartBadgeHidden();
  });
});
