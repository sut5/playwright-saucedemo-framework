import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
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

    await checkoutInformationPage.fillInformation('Suten', 'Tester', '1000');
    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutOverviewPage.assertLoaded();
    await checkoutOverviewPage.assertItemCount(1);
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);

    await checkoutCompletePage.assertSuccess();
  });
});