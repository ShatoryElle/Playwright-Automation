import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate as user', async ({ page }) => {
  await page.goto('/');
  
  await page.locator('button:has-text("Sign In")').click();
  await page.locator('#signinEmail').fill('viktoriia_test@gmail.com');
  await page.locator('#signinPassword').fill('TestPass1234');
  
  await page.locator('div.modal-footer button.btn-primary').click();
  await page.waitForURL('**/panel/garage'); 
  await page.context().storageState({ path: authFile });
});