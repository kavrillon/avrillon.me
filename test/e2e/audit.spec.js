const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const commonMethods = require('./utils/lighthouse');
const url = 'http://localhost:9000';

const THRESHOLD_A11Y = 100;
const THRESHOLD_BEST_PRACTISES = 90; // HTTP/2 not available on local testing
// const THRESHOLD_PERF = 93; // Inconsistencies bewteen local & Travis, due to network differences
// const THRESHOLD_PAGESPEED = 100; // Inconsistencies bewteen local & Travis, due to network differences
const THRESHOLD_PWA = 90; // Some errors on local testing
const THRESHOLD_SEO = 100;

describe('Audit', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);

    // kick off a Lighthouse audit on the above url
    lhr = await commonMethods.lighthouseAudit(browser, url);
  });

  // General accessibility overview score
  it('passes an accessibility audit through Lighthouse', async () => {
    const accessibilityScore = await commonMethods.getLighthouseResult(lhr, 'accessibility');
    // Tester can set their own thresholds for pass marks
    expect(accessibilityScore).toBeGreaterThanOrEqual(THRESHOLD_A11Y);
  });

  // General performance overview score
  /* it("passes a performance audit through Lighthouse", async () => {
    const performanceScore = await commonMethods.getLighthouseResult(
      lhr,
      "performance"
    );
    // Tester can set their own thresholds for pass marks
    expect(performanceScore).toBeGreaterThan(THRESHOLD_PERF);
  }); */

  // General best practice for websites overview score
  it('passes a best practice audit through Lighthouse', async () => {
    const bestPracticeScore = await commonMethods.getLighthouseResult(lhr, 'bestPractices');
    // Tester can set their own thresholds for pass marks
    expect(bestPracticeScore).toBeGreaterThanOrEqual(THRESHOLD_BEST_PRACTISES);
  });

  // These checks validate the aspects of a Progressive Web App,
  // as specified by the baseline [PWA Checklist]
  it('passes a Progressive Web App audit through Lighthouse', async () => {
    const progressiveWebAppScore = await commonMethods.getLighthouseResult(lhr, 'progressiveWebApp');
    // Tester can set their own thresholds for pass marks
    expect(progressiveWebAppScore).toBeGreaterThanOrEqual(THRESHOLD_PWA);
  });

  //These checks ensure that your page is optimized for search engine results ranking.
  it('passes an SEO audit through Lighthouse', async () => {
    const SEOScore = await commonMethods.getLighthouseResult(lhr, 'seo');
    expect(SEOScore).toBeGreaterThanOrEqual(THRESHOLD_SEO);
  });

  // Low-contrast text is difficult or impossible for many users to read
  it('passes a contrast check through Lighthouse', async () => {
    const contrastCheck = await commonMethods.getResult(lhr, 'contrast');
    // Some audit items are binary, so no threshold can be set
    expect(contrastCheck).toEqual('Pass');
  });

  // Informative elements should aim for short, descriptive alternate text
  it('contains alt text for all images', async () => {
    const altTextCheck = await commonMethods.getResult(lhr, 'altText');
    expect(altTextCheck).toEqual('Pass');
  });

  // Speed Index shows how quickly the contents of a page are visibly populated.
  /* it("passes the set threshold for page load speed", async () => {
    const pageSpeedScore = await commonMethods.getLighthouseResult(
      lhr,
      "pageSpeed"
    );
    expect(pageSpeedScore).toBeGreaterThanOrEqual(THRESHOLD_PAGESPEED);
  }); */

  // Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid names
  it('contains valid ARIA attributes', async () => {
    const ariaAttributesCheck = await commonMethods.getResult(lhr, 'ariaAttributesCorrect');
    expect(ariaAttributesCheck).toEqual('Pass');
  });

  // Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values
  it('contains valid values for all ARIA attributes', async () => {
    const ariaAttributeValuesCheck = await commonMethods.getResult(lhr, 'ariaAttributeValuesCorrect');
    expect(ariaAttributeValuesCheck).toEqual('Pass');
  });

  // A value greater than 0 implies an explicit navigation ordering. Although technically valid,
  // this often creates frustrating experiences for users who rely on assistive technologies
  it('contains no tabIndex values above 0', async () => {
    const tabIndexCheck = await commonMethods.getResult(lhr, 'tabIndex');
    expect(tabIndexCheck).toEqual('Pass');
  });

  // Tabbing through the page follows the visual layout.
  // Users cannot focus elements that are offscreen
  it('has a logical tab order for assitive technology use', async () => {
    const logicalTabOrderCheck = await commonMethods.getResult(lhr, 'logicalTabOrder');
    expect(logicalTabOrderCheck).toEqual('Pass');
  });

  // Some third-party scripts may contain known security vulnerabilities
  // that are easily identified and exploited by attackers
  it('contains no known vulnerable libraries', async () => {
    const vulnerabilities = await commonMethods.getResult(lhr, 'vulnerabilities');
    expect(vulnerabilities).toEqual('Pass');
  });
});
