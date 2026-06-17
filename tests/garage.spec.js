import { test } from '../fixtures/userFixtures.js';
import { expect } from '@playwright/test';

test.describe('Перевірка сторінки гаражу через фікстури', () => {

  test('Користувач успішно бачить свій гараж без повторного логіну', async ({ userGaragePage }) => {
    await expect(userGaragePage.garageHeader).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeVisible();
  });

});