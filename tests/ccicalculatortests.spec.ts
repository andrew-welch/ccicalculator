import { test, expect, type Page, defineConfig } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

});

test('test', async ({ page }) => {
  //await page.goto('process.env.CLOUDFLARE_PREVIEW_URL');
  await page.goto('http://localhost:3000/');
  await page.locator('#cci_price').click();
  await page.locator('#cci_price').fill('1000000');
  await page.keyboard.up("0");
  await expect(page.locator('#cciout_cci')).toHaveValue('1000000.00');
  await expect(page.locator('#cciout_ccipct')).toHaveValue('100.0000');
  await page.locator('#cci_cost').fill('500000');
  await page.getByText('Field').click();
  await expect(page.locator('#cciout_cci')).toHaveValue('500000.00');
  await expect(page.locator('#cciout_ccipct')).toHaveValue('50.0000');
  await page.locator('#cci_ccipct').click();
  await page.locator('#cci_ccipct').fill('20');
  await page.locator('#cciout_price').click();
  await page.locator('#cciout_cost').click();
  await expect(page.locator('#cciout_price')).toHaveValue('625000.00');
  await expect(page.locator('#cciout_cost')).toHaveValue('800000.00');
  await expect(page.locator('#cci_price_copy_button')).toBeVisible();
  await expect(page.locator('#cci_cost_copy_button')).toMatchAriaSnapshot(`- button "Copy"`);
  await expect(page.locator('#cci_price_copy_button')).toMatchAriaSnapshot(`- button "Copy"`);
  await page.locator('#cci_price_copy_button').click();
  await expect(page.locator('#cci_price')).toHaveValue('625000.00');
  await expect(page.locator('#cci_ccipct')).toHaveValue('20');
  await expect(page.locator('#cci_cost')).toHaveValue('500000');
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - button "Copy" [disabled]
    - spinbutton: /\\d+\\.\\d+/
    `);
});