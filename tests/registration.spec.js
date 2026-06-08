import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUp.page';

test.describe('Registration tests (POM)', () => {

  test.beforeEach(async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.open();
  });

  test('Successful registration', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    const email = `aqa-${Date.now()}@test.com`;

    await signUpPage.register({
      name: 'Viktoriia',
      lastName: 'Testova',
      email,
      password: 'Password123'
    });

    await expect(signUpPage.registerButton).toBeEnabled();
    await signUpPage.registerButton.click();

    await expect(page).toHaveURL(/garage/, { timeout: 10000 });
  });

  test('Empty name validation', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.nameInput.fill('A');
    await signUpPage.nameInput.clear();
    await signUpPage.nameInput.blur();

    await expect(signUpPage.getError(signUpPage.nameInput))
      .toHaveText('Name required');
  });

  test('Empty last name validation', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.lastNameInput.fill('A');
    await signUpPage.lastNameInput.clear();
    await signUpPage.lastNameInput.blur();

    await expect(signUpPage.getError(signUpPage.lastNameInput))
      .toHaveText('Last name required');
  });

  test('Invalid email validation', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.emailInput.fill('wrong-email');
    await signUpPage.emailInput.blur();

    await expect(signUpPage.getError(signUpPage.emailInput))
      .toHaveText('Email is incorrect');
  });

  test('Invalid password validation', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.passwordInput.fill('12345');
    await signUpPage.passwordInput.blur();

    await expect(signUpPage.getError(signUpPage.passwordInput))
      .toHaveText(/Password has to be/);
  });


  test('Password mismatch', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.passwordInput.fill('Password123');
    await signUpPage.repeatPasswordInput.fill('Different123');
    await signUpPage.repeatPasswordInput.blur();

    await expect(
      signUpPage.getError(signUpPage.repeatPasswordInput)
    ).toHaveText('Passwords do not match');

    await expect(signUpPage.registerButton).toBeDisabled();
  });

});
``