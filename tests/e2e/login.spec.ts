import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Login', () => {
  test('should login successfully with standard user @smoke', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Swag Labs')).toBeVisible();
  });

  test('should show error for locked out user @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAsLockedOutUser();

    await loginPage.assertErrorMessageVisible();
  });
});