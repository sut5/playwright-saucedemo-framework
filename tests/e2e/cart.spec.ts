import { test, expect } from '../../src/fixtures/test-fixtures';
import { PRODUCTS } from '../../src/data/products';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('should add a product to cart and show badge count @smoke', async ({ inventoryPage }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.assertCartBadgeCount(1);
  });

  test('should show the correct item in cart after adding product @regression', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.assertCartBadgeCount(1);

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await cartPage.assertLoaded();
    await cartPage.assertItemCount(1);
    await cartPage.assertItemVisible(PRODUCTS.backpack);
  });

  test('should keep multiple selected items in the cart @regression', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.assertCartBadgeCount(2);

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await cartPage.assertLoaded();
    await cartPage.assertItemCount(2);
    await expect(await cartPage.getItemNames()).toEqual([
      PRODUCTS.backpack,
      PRODUCTS.bikeLight,
    ]);
    await cartPage.assertCartBadgeCount(2);
  });

  test('should allow the user to continue shopping from the cart @regression', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();

    await cartPage.assertLoaded();
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertLoaded();
    await inventoryPage.assertCartBadgeCount(1);
  });

  test('should remove an item from the cart and keep remaining items intact @regression', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await cartPage.assertLoaded();

    await cartPage.removeItem(PRODUCTS.backpack);

    await cartPage.assertItemCount(1);
    await cartPage.assertItemNotVisible(PRODUCTS.backpack);
    await cartPage.assertItemVisible(PRODUCTS.bikeLight);
    await cartPage.assertCartBadgeCount(1);
  });

  test('should clear the cart badge when the last item is removed @regression', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.assertLoaded();

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await cartPage.assertLoaded();

    await cartPage.removeItem(PRODUCTS.backpack);

    await cartPage.assertItemCount(0);
    await cartPage.assertCartBadgeHidden();
  });
});
