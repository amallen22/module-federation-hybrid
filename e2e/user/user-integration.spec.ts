import { test, expect } from '@playwright/test';

test.describe('User App Integration with Shell', () => {
  test('should load user app from shell navigation', async ({ page }) => {
    // Start at shell home
    await page.goto('/');
    
    // Click on User link in shell navigation
    await page.click('text=👤 User');
    
    // Wait for user app to load
    await expect(page.locator('text=CV User')).toBeVisible({ timeout: 10000 });
    
    // Verify we're in the user app
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
  });

  test('should maintain shell navigation when in user app', async ({ page }) => {
    await page.goto('/user');
    await page.waitForSelector('text=CV User', { timeout: 10000 });
    
    // Shell navigation should still be visible
    await expect(page.locator('text=🏠 Home')).toBeVisible();
    await expect(page.locator('text=🔐 Login')).toBeVisible();
    await expect(page.locator('text=📦 Product')).toBeVisible();
  });

  test('should navigate back to shell from user app', async ({ page }) => {
    await page.goto('/user');
    await page.waitForSelector('text=CV User', { timeout: 10000 });
    
    // Click on Home in shell navigation
    await page.click('text=🏠 Home');
    
    // Should be back at shell home
    await expect(page.locator('text=Welcome to CV Hibrid Shell')).toBeVisible();
  });

  test('should handle direct navigation to user routes', async ({ page }) => {
    // Navigate directly to user profile
    await page.goto('/user/profile');
    
    // Should load user app and show profile
    await expect(page.locator('text=CV User')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('h1:has-text("Perfil de Usuario")')).toBeVisible();
  });
});

