import { test, expect } from '@playwright/test';

test.describe('User App Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to user app via shell
    await page.goto('/user');
    // Wait for the app to load
    await page.waitForSelector('text=CV User', { timeout: 10000 });
  });

  test('should navigate to dashboard', async ({ page }) => {
    // Click on Dashboard link in navigation
    await page.click('nav a:has-text("Dashboard")');
    
    // Wait for dashboard content
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator('text=Bienvenido')).toBeVisible();
  });

  test('should navigate to profile', async ({ page }) => {
    // Click on Perfil link in navigation
    await page.click('nav a:has-text("Perfil")');
    
    // Wait for profile content
    await expect(page.locator('h1:has-text("Perfil de Usuario")')).toBeVisible();
    await expect(page.locator('text=Información Personal')).toBeVisible();
  });

  test('should navigate to documents', async ({ page }) => {
    // Click on Documentos link in navigation
    await page.click('nav a:has-text("Documentos")');
    
    // Wait for documents content
    await expect(page.locator('h1:has-text("Mis Documentos")')).toBeVisible();
  });

  test('should navigate to subscription', async ({ page }) => {
    // Click on Suscripción link in navigation
    await page.click('nav a:has-text("Suscripción")');
    
    // Wait for subscription content
    await expect(page.locator('h1:has-text("Suscripción")')).toBeVisible();
    await expect(page.locator('text=Plan:')).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    // Start at dashboard
    await page.click('nav a:has-text("Dashboard")');
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();

    // Navigate to profile
    await page.click('nav a:has-text("Perfil")');
    await expect(page.locator('h1:has-text("Perfil de Usuario")')).toBeVisible();

    // Navigate to documents
    await page.click('nav a:has-text("Documentos")');
    await expect(page.locator('h1:has-text("Mis Documentos")')).toBeVisible();

    // Navigate to subscription
    await page.click('nav a:has-text("Suscripción")');
    await expect(page.locator('h1:has-text("Suscripción")')).toBeVisible();

    // Go back to dashboard
    await page.click('nav a:has-text("Dashboard")');
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
  });
});

