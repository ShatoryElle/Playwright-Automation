import { test, expect } from '@playwright/test';

test.describe('Registration tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const signUpBtn = page.locator('.hero-descriptor_btn');
    await expect(signUpBtn).toBeVisible();
    await signUpBtn.click();

    await expect(page.locator('.modal-content')).toBeVisible();
  });

  test('Successful registration', async ({ page }) => {
    const email = `aqa-${Date.now()}@test.com`;

    await page.locator('#signupName').fill('Viktoriia');
    await page.locator('#signupLastName').fill('Testova');
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill('Password123');
    await page.locator('#signupRepeatPassword').fill('Password123');

    const registerBtn = page.locator('button:has-text("Register")');

    await expect(registerBtn).toBeEnabled();
    await registerBtn.click();

    await expect(page).toHaveURL(/garage/);
  });

  test.describe('Validation tests', () => {

    test('Empty name', async ({ page }) => {
      const input = page.locator('#signupName');

      await input.click();
      await input.fill('A');
      await input.press('Backspace');
      await input.blur();

      await expect(
        input.locator('..').locator('.invalid-feedback')
      ).toHaveText('Name required');

      await expect(input).toHaveClass(/is-invalid/);
    });

    test('Empty last name', async ({ page }) => {
      const input = page.locator('#signupLastName');

      await input.click();
      await input.fill('B');
      await input.press('Backspace');
      await input.blur();

      await expect(
        input.locator('..').locator('.invalid-feedback')
      ).toHaveText('Last name required');

      await expect(input).toHaveClass(/is-invalid/);
    });

    test('Invalid email', async ({ page }) => {
      const input = page.locator('#signupEmail');

      await input.fill('invalid-email');
      await input.blur();

      await expect(
        input.locator('..').locator('.invalid-feedback')
      ).toHaveText('Email is incorrect');

      await expect(input).toHaveClass(/is-invalid/);
    });

    test('Invalid password', async ({ page }) => {
      const input = page.locator('#signupPassword');

      await input.fill('12345');
      await input.blur();

      await expect(
        input.locator('..').locator('.invalid-feedback')
      ).toHaveText(/Password has to be/);

      await expect(input).toHaveClass(/is-invalid/);
    });

    test('Password mismatch', async ({ page }) => {
      await page.locator('#signupPassword').fill('Password123');

      const repeat = page.locator('#signupRepeatPassword');

      await repeat.fill('Different123');
      await repeat.blur();

      await expect(
        repeat.locator('..').locator('.invalid-feedback')
      ).toHaveText('Passwords do not match');

      const registerBtn = page.locator('button:has-text("Register")');
      await expect(registerBtn).toBeDisabled();

      await expect(repeat).toHaveClass(/is-invalid/);
    });

  });

});