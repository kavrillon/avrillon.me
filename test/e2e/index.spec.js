const { toMatchImageSnapshot } = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot });

const screenshotConfig = {
  customDiffConfig: { threshold: 0.02 }, // Not really visible for my eyes
  failureThreshold: 0.000001, // REquired to find a missing dot on a simple page
  failureThresholdType: "percent",
  fullPage: true
};

describe("Home", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto("http://localhost:9000");
  });

  describe("DOM checks", () => {
    describe("Meta", () => {
      it("should contains a title", async () => {
        expect((await page.title()).length).toBeGreaterThan(0);
      });

      it("should contains a description", async () => {
        const description = await page.evaluate(() =>
          document.head
            .querySelector("meta[name='description']")
            .getAttribute("content")
        );

        expect(description.length).toBeGreaterThan(0);
      });
    });

    describe("Headings", () => {
      it("should contains only one h1", async () => {
        const headerLength = await page.evaluate(
          () => document.body.querySelectorAll("h1").length
        );

        expect(headerLength).toBe(1);
      });

      it("should have no hidden content", async () => {
        const headers = await page.evaluate(() =>
          [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(elt => {
            const style = window.getComputedStyle(elt);
            return (
              style &&
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              style.opacity !== "0"
            );
          })
        );

        expect(headers.every(elt => elt === true)).toBeTruthy();
      });

      it("should have no empty content", async () => {
        const headers = await page.evaluate(() =>
          [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(elt => {
            return elt.innerHTML;
          })
        );

        expect(headers.every(elt => elt.length > 0)).toBeTruthy();
      });

      it("should have no break in hierarchy", async () => {
        const headers = await page.evaluate(() =>
          [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(elt => {
            return parseInt(elt.tagName.match(/[0-9]/)[0]);
          })
        );

        let level = 0;
        headers.forEach(elt => {
          expect(elt).toBeLessThanOrEqual(level + 1);
          level = elt;
        });
      });
    });
  });

  describe("Screenshot", () => {
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
});
