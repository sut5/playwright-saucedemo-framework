import { test, expect } from '../../src/fixtures/test-fixtures';
import { LOGIN_DATA, LOGIN_ERRORS } from '../../src/data/login-data';

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
    await loginPage.assertErrorMessageContains(LOGIN_ERRORS.lockedOut);
  });

  test('should show error for invalid credentials @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(
      LOGIN_DATA.invalidUser.username,
      LOGIN_DATA.invalidUser.password
    );

    await loginPage.assertErrorMessageContains(LOGIN_ERRORS.invalidCredentials);
  });

  test('should require the username before login @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', process.env.PASSWORD as string);

    await loginPage.assertErrorMessageContains(LOGIN_ERRORS.usernameRequired);
  });

  test('should require the password before login @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER as string, '');

    await loginPage.assertErrorMessageContains(LOGIN_ERRORS.passwordRequired);
  });
});
