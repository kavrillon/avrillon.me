const url = "http://localhost:9000";

describe("Dom", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto(url);
  });

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
