import { test, expect } from '../../src/fixtures/test-fixtures';
import { CHECKOUT_DATA, CHECKOUT_ERRORS } from '../../src/data/checkout-data';
import { PRODUCTS } from '../../src/data/products';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page, inventoryPage, cartPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.assertLoaded();
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.assertLoaded();
  });

  test.describe('Checkout Information', () => {
    test.beforeEach(async ({ cartPage, page }) => {
      await cartPage.checkout();
      await expect(page).toHaveURL(/checkout-step-one/);
    });

    test('should require the first name before continuing checkout @regression', async ({
      checkoutInformationPage,
    }) => {
      await checkoutInformationPage.fillInformation(
        CHECKOUT_DATA.missingFirstName.firstName,
        CHECKOUT_DATA.missingFirstName.lastName,
        CHECKOUT_DATA.missingFirstName.postalCode
      );
      await checkoutInformationPage.continue();

      await checkoutInformationPage.assertErrorMessageContains(CHECKOUT_ERRORS.firstNameRequired);
    });

    test('should require the last name before continuing checkout @regression', async ({
      checkoutInformationPage,
    }) => {
      await checkoutInformationPage.fillInformation(
        CHECKOUT_DATA.missingLastName.firstName,
        CHECKOUT_DATA.missingLastName.lastName,
        CHECKOUT_DATA.missingLastName.postalCode
      );
      await checkoutInformationPage.continue();

      await checkoutInformationPage.assertErrorMessageContains(CHECKOUT_ERRORS.lastNameRequired);
    });

    test('should require the postal code before continuing checkout @regression', async ({
      checkoutInformationPage,
    }) => {
      await checkoutInformationPage.fillInformation(
        CHECKOUT_DATA.missingPostalCode.firstName,
        CHECKOUT_DATA.missingPostalCode.lastName,
        CHECKOUT_DATA.missingPostalCode.postalCode
      );
      await checkoutInformationPage.continue();

      await checkoutInformationPage.assertErrorMessageContains(CHECKOUT_ERRORS.postalCodeRequired);
    });

    test('should allow the user to cancel checkout information and return to the cart @regression', async ({
      checkoutInformationPage,
      cartPage,
      page,
    }) => {
      await checkoutInformationPage.cancel();

      await expect(page).toHaveURL(/cart/);
      await cartPage.assertLoaded();
      await cartPage.assertItemVisible(PRODUCTS.backpack);
    });
  });

  test('should complete checkout successfully @smoke @regression', async ({
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    test.slow();
    
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

  test('should allow the user to cancel checkout from the overview page @regression', async ({
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    inventoryPage,
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

    await checkoutOverviewPage.cancel();

    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertLoaded();
    await inventoryPage.assertCartBadgeCount(1);
  });
});
