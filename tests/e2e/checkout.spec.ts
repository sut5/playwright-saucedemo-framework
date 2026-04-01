import { test, expect } from '../../src/fixtures/test-fixtures';
import { CHECKOUT_DATA } from '../../src/data/checkout-data';
import { PRODUCTS } from '../../src/data/products';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
  });

  test('should complete checkout successfully', async ({
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await cartPage.checkout();

    await expect(page).toHaveURL(/checkout-step-one/);

    await checkoutInformationPage.fillInformation(
      CHECKOUT_DATA.validCustomer.firstName,
      CHECKOUT_DATA.validCustomer.lastName,
      CHECKOUT_DATA.validCustomer.postalCode
    );
    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutOverviewPage.assertLoaded();
    await checkoutOverviewPage.assertItemCount(1);
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);

    await checkoutCompletePage.assertSuccess();
  });
});