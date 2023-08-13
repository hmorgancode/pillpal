import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL
  ? `https://${process.env.PLAYWRIGHT_TEST_BASE_URL}`
  : 'http://localhost:3000';

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  name: 'PillPal',
  testDir: './',
  testMatch: /^(?!.*\.local\.spec\.ts)(?!.*\.bot\.spec\.ts).*\.spec\.ts$/,
  outputDir: './playwright/test-results',
  snapshotDir: './playwright/screenshots', // toMatchSnapshot and toHaveScreenshot
  timeout: 30_000, // Maximum time one test can run for (ms)
  reportSlowTests: { max: 5, threshold: 15_000 },
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  workers: process.env.CI ? 2 : '75%', // limit us to Github Actions' 2 threads
  reporter: process.env.CI ? 'github' : 'list', // https://playwright.dev/docs/test-reporters
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    trace: 'on-first-retry', // https://playwright.dev/docs/trace-viewer
    // ctPort: 3100, // playwright component-testing endpoint
    // browserName: 'chromium',
    // colorScheme: 'dark',
    // deviceScaleFactor: 1,
    // extraHTTPHeaders: sent with every request,
    // geolocation
    // hasTouch: false,
    // headless: true,
    // httpCredentials,
    // ignoreHTTPSErrors,
    // isMobile,
    // launchOptions: { env: {} },
    // locale: 'en-US',
    // timezoneId,
    // userAgent,
    // viewport: { width: 1280, height: 720 }, // this is the default
    // screenshot: {
    //   mode: 'only-on-failure',
    //   fullPage: true,
    // },
  },
  projects: [
    {
      name: 'setup',
      testMatch: 'playwright/playwright.global.setup.ts',
    },
    {
      name: 'desktop-chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'desktop-firefox',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'desktop-webkit',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'local',
      dependencies: ['setup'],
      testMatch: /.*\.local\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'chromium-bot',
      testMatch: /.*\.bot\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +https://www.google.com/bot.html) Chrome/101.0.4951.54 Safari/537.36',
      },
    },
    // {
    //   name: 'mobile-chromium',
    //   use: devices['Pixel 5'],
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'mobile-webkit',
    //   use: devices['iPhone 13'],
    //   dependencies: ['setup'],
    // },
  ],
});

// parallel tests are executed in separate worker processes and cannot share any state or global variables.
// Each test executes all relevant hooks just for itself, including beforeAll and afterAll.
// test.describe.configure({ mode: 'parallel' });

/*
type DeviceDescriptor = {
  viewport: ViewportSize;
  userAgent: string;
  deviceScaleFactor: number;
  isMobile: boolean;
  hasTouch: boolean;
  defaultBrowserType: 'chromium' | 'firefox' | 'webkit';
};
*/
