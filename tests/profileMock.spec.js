import { test } from '../fixtures/userFixtures.js';
import { expect } from '@playwright/test';

test.describe('ДЗ29 Мокінг профілю', () => {

  test('Користувач бачить підмінені у mock дані на сторінці профілю', async ({ userGaragePage }) => {
    const page = userGaragePage.page;

    const mockProfileData = {
      status: "ok",
      data: {
        id: 12345,
        firstName: "Stanislav",
        lastName: "Taran",
        name: "Stanislav",
        lastName: "Taran",
        photoFilename: "default-user.png"
      }
    };

      await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfileData),
      });
    });

    await page.goto('/panel/profile');

    const profileName = page.locator('p.profile_name'); 
    await expect(profileName).toContainText('Stanislav Taran');
  });

});

test.describe('ДЗ29 API /api/cars', () => {

  let authenticatedRequest;

  test.beforeAll(async ({ playwright }) => {
    authenticatedRequest = await playwright.request.newContext({
      baseURL: 'https://qauto.forstudy.space',
      storageState: 'playwright/.auth/user.json'
    });
  });

  test.afterAll(async () => {
    await authenticatedRequest.dispose();
  });

  test('Успішне створення машини (Позітів)', async () => {
    const response = await authenticatedRequest.post('/api/cars', {
      data: {
        carBrandId: 1, // Audi
        carModelId: 1, // TT
        mileage: 122
      }
    });

    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.data.mileage).toBe(122);
  });

  test('Створення машини з неіснуючим брендом (Негатив)', async () => {
    const response = await authenticatedRequest.post('/api/cars', {
      data: {
        carBrandId: 99999, // Неіснуючий бренд
        carModelId: 1,
        mileage: 50
      }
    });

    expect(response.status()).toBe(404);
  });

  test('Створення машини без вказання пробігу (Негатив)', async () => {
    const response = await authenticatedRequest.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1
      }
    });

    expect(response.status()).toBe(400);
  });

});