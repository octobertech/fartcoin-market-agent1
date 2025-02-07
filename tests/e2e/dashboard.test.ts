
import { test, expect } from '@playwright/test';

test('dashboard components', async ({ page }) => {
  await page.goto('/');
  
  // Check market overview
  await expect(page.getByTestId('market-overview')).toBeVisible();
  
  // Verify top agents panel
  const topAgentsPanel = page.getByTestId('top-agents-panel');
  await expect(topAgentsPanel).toBeVisible();
  
  // Check analysis panel
  await expect(page.getByTestId('signals-panel')).toBeVisible();
  
  // Verify trading panel
  const tradePanel = page.getByTestId('trade-panel');
  await expect(tradePanel).toBeVisible();
  
  // Test portfolio chart
  await expect(page.getByTestId('portfolio-chart')).toBeVisible();
});
