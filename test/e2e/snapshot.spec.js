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

  describe('1-Mobile', () => {
    beforeAll(async () => {
      await page.emulate(devices['iPhone 5']);
    });

    it('1-should match on home loaded', async () => {
      await page.waitFor(5100);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });
  });

  describe('2-Desktop', () => {
    beforeAll(async () => {
      await page.setViewport({ width: 1440, height: 900 });
    });

    it('1-should match on home loaded', async () => {
      await page.waitFor(5100);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });

    it('2-should match when focusing action', async () => {
      await page.focus('[data-cta]');
      await page.waitFor(500);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });

    it('3-should match when focusing email', async () => {
      await page.focus('[data-cta-email-button]');
      await page.waitFor(500);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });
  });
});
