import { test, expect } from '../../src/fixtures/test-fixtures';
import { PRODUCTS } from '../../src/data/products';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('should add a product to cart and show badge count', async ({ inventoryPage }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.assertCartBadgeCount(1);
  });

  test('should show the correct item in cart after adding product', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.assertCartBadgeCount(1);

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await cartPage.assertLoaded();
    await cartPage.assertItemCount(1);
    await cartPage.assertItemVisible(PRODUCTS.backpack);
  });
});