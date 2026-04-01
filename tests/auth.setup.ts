import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

setup('authenticate standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginAsStandardUser();

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});