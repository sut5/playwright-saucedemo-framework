import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Login', () => {
  test('should login successfully with standard user @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Swag Labs')).toBeVisible();
  });

  test('should show error for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAsLockedOutUser();

    await loginPage.assertErrorMessageVisible();
  });
});