import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/garage.page.js';

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/user.json'
    });
    
    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    
    await garagePage.navigate();
    await use(garagePage);
   
    await page.close();
    await context.close();
  },
});