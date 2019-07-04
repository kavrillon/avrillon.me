const { toMatchImageSnapshot } = require('jest-image-snapshot');
const devices = require('puppeteer/DeviceDescriptors');

expect.extend({ toMatchImageSnapshot });

const url = 'http://localhost:9000';

const screenshotConfig = {
  customDiffConfig: { threshold: 0.02 }, // Not really visible for my eyes
  failureThreshold: 0.000001, // 0.000001: required to find a missing dot on a simple page
  failureThresholdType: 'percent',
  fullPage: true,
};

describe('Snapshot', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto(url);
  });

  describe('Mobile', () => {
    beforeAll(async () => {
      await page.emulate(devices['iPhone 5']);
    });

    it('should match on home loaded', async () => {
      await page.waitFor(5100); // Wait for the loading animation
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });
  });

  describe('Desktop', () => {
    beforeAll(async () => {
      await page.setViewport({ width: 1440, height: 900 });
      await page.setOfflineMode(false);
      await page.waitFor(10000); // Wait for the notification animation
    });

    it('should match on home loaded', async () => {
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });

    it('should match when focusing action', async () => {
      await page.focus('[data-cta]');
      await page.waitFor(500);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });

    it('should match when going offline', async () => {
      await page.setOfflineMode(true);
      await page.waitFor(1500);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });

    it('should match when going online', async () => {
      await page.waitFor(10000);
      await page.setOfflineMode(false);
      await page.waitFor(1500);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });
  });
});
