import { test, expect } from '@playwright/test';

test.describe('User App Data Loading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/user');
    await page.waitForSelector('text=CV User', { timeout: 10000 });
  });

  test('should load dashboard data', async ({ page }) => {
    await page.click('nav a:has-text("Dashboard")');
    
    // Wait for dashboard to load
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible({ timeout: 5000 });
    
    // Check that welcome message or loading state is present
    const welcomeOrLoading = page.locator('text=Bienvenido').or(page.locator('text=Cargando'));
    await expect(welcomeOrLoading.first()).toBeVisible();
  });

  test('should load profile data', async ({ page }) => {
    await page.click('nav a:has-text("Perfil")');
    
    // Wait for profile data to load
    await expect(page.locator('h1:has-text("Perfil de Usuario")')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Información Personal')).toBeVisible();
  });

  test('should load documents list', async ({ page }) => {
    await page.click('nav a:has-text("Documentos")');
    
    // Wait for documents page to load
    await expect(page.locator('h1:has-text("Mis Documentos")')).toBeVisible({ timeout: 5000 });
    
    // Check that page content is present (loading, error, or empty state)
    const content = page.locator('text=Cargando documentos').or(
      page.locator('text=No tienes documentos').or(
        page.locator('text=Error al cargar')
      )
    );
    await expect(content.first()).toBeVisible({ timeout: 3000 });
  });

  test('should load subscription data', async ({ page }) => {
    await page.click('text=Suscripción');
    
    // Wait for subscription data to load
    await expect(page.locator('h1:has-text("Suscripción")')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Plan:')).toBeVisible();
    await expect(page.locator('text=Estado:')).toBeVisible();
  });
});

