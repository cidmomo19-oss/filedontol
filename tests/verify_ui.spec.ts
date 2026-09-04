import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'desktop_1280', width: 1280, height: 800 },
  { name: 'mobile_450', width: 450, height: 900 },
  { name: 'mobile_390', width: 390, height: 844 }
];

for (const vp of viewports) {
  test(`verify pink UI layout - ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('https://filedontol.cidmomo1000.workers.dev', { waitUntil: 'networkidle' });

    // Homepage screenshot
    await page.screenshot({ path: `screenshot_${vp.name}_home.png`, fullPage: true });

    // Click FAQ accordion
    const faqItem = page.locator('.faq-item').first();
    if (await faqItem.isVisible()) {
      await faqItem.click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: `screenshot_${vp.name}_faq.png`, fullPage: true });
    }

    // Modal check
    const loginBtn = page.locator('button:has-text("Sign In / Register")');
    if (await loginBtn.isVisible()) {
      await loginBtn.click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: `screenshot_${vp.name}_modal.png`, fullPage: true });
    }
  });
}
