const { toMatchImageSnapshot } = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot });

const url = "http://localhost:9000";

const screenshotConfig = {
  customDiffConfig: { threshold: 0.02 }, // Not really visible for my eyes
  failureThreshold: 0.000001, // REquired to find a missing dot on a simple page
  failureThresholdType: "percent",
  fullPage: true
};

describe("Screenshot", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto(url);
  });

  describe("Mobile", () => {
    beforeAll(async () => {
      await page.setViewport({ width: 320, height: 480, hasTouch: true });
      await page.waitFor(3000);
    });

    it("should match previous screenshot", async () => {
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });
  });

  describe("Desktop", () => {
    beforeAll(async () => {
      await page.setViewport({ width: 1440, height: 900 });
      await page.waitFor(3000);
    });

    it("should match previous screenshot", async () => {
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(screenshotConfig);
    });
  });
});
