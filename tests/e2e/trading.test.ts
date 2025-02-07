
import { test, expect } from '@playwright/test';

test('trading flow', async ({ page }) => {
  await page.goto('/');
  
  // Check market overview
  await expect(page.getByTestId('market-overview')).toBeVisible();
  
  // Verify trading panel
  const tradePanel = page.getByTestId('trade-panel');
  await expect(tradePanel).toBeVisible();
  

