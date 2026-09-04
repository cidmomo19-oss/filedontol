const { chromium } = require('playwright');
const path = require('path');

async function testScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop_1280', width: 1280, height: 800 },
    { name: 'mobile_450', width: 450, height: 900 },
    { name: 'mobile_390', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('https://filedontol.cidmomo1000.workers.dev', { waitUntil: 'networkidle' });

    // Take homepage screenshot
    const homePath = path.join(__dirname, `screenshot_${vp.name}_home.png`);
    await page.screenshot({ path: homePath, fullPage: true });
    console.log(`Saved screenshot: ${homePath}`);

    // Click FAQ item if visible to test accordion
    const faqItem = await page.$('.faq-item');
    if (faqItem) {
      await faqItem.click();
      await page.waitForTimeout(300);
      const faqPath = path.join(__dirname, `screenshot_${vp.name}_faq.png`);
      await page.screenshot({ path: faqPath, fullPage: true });
      console.log(`Saved FAQ screenshot: ${faqPath}`);
    }

    // Open Auth Modal
    const loginBtn = await page.$('button:has-text("Sign In / Register")');
    if (loginBtn) {
      await loginBtn.click();
      await page.waitForTimeout(300);
      const modalPath = path.join(__dirname, `screenshot_${vp.name}_modal.png`);
      await page.screenshot({ path: modalPath, fullPage: true });
      console.log(`Saved Modal screenshot: ${modalPath}`);
      // Close modal
      const closeBtn = await page.$('.modal-overlay');
      if (closeBtn) await closeBtn.click({ position: { x: 10, y: 10 } });
    }
  }

  await browser.close();
}

testScreenshots().catch(console.error);
