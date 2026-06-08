import { expect } from '@playwright/test';

export class SignUpPage {
  constructor(page) {
    this.page = page;

    this.signUpButton = page.locator('.hero-descriptor_btn');
    this.modal = page.locator('.modal-content');

    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');

    this.registerButton = page.locator('button:has-text("Register")');
  }

  async open() {
    await this.page.goto('/');

    await expect(this.signUpButton).toBeVisible();
    await this.signUpButton.click();

    await expect(this.modal).toBeVisible();
  }

  async register({ name, lastName, email, password }) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
  }

  getError(input) {
    return input.locator('..').locator('.invalid-feedback');
  }
}