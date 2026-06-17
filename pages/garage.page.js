import { expect } from '@playwright/test';

export class GaragePage {
  constructor(page) {
    this.page = page;
    this.addCarButton = page.locator('button:has-text("Add car")');
    this.garageHeader = page.locator('h1:has-text("Garage")');
    this.profileMenu = page.locator('#userNavDropdown');
  }

  async navigate() {
    await this.page.goto('/panel/garage');
  }
}