import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // The path to our Next.js app which will:
  //   Set up `transform` using SWC
  //   Auto mock stylesheets, image imports, and next/font
  //   Load .env (and all variants) into process.env
  //   Ignore node_modules from test resolving and transforms
  //   Ignoring .next from test resolving
  //   Loading next.config.js for flags that enable SWC transforms
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testMatch: ['**/*.test.{ts,tsx}'], // jest's defaults will ignore node_modules everywhere it's relevant
  clearMocks: true, // automatically clear mocks before every test (won't remove the mock implementation)
  coverageDirectory: '.jest-coverage',
  coverageProvider: 'v8', // 'babel'? there are a lot of 'babel' examples
  coverageReporters: ['lcov'],
  // coverageThreshold: {
  //   global: {
  //     branches: 90, // %
  //     functions: 90,
  //     lines: 90,
  //     statements: 90,
  //   },
  //   'middleware.ts': {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  //   // we cannot currently test server components in Jest https://github.com/vercel/next.js/issues/47448
  //   // 'app/**/route.ts': {
  //   //   branches: 0,
  //   //   functions: 0,
  //   //   lines: 0,
  //   //   statements: 0,
  //   // },
  //   // 'app/**/page.tsx': {
  //   //   branches: 0,
  //   //   functions: 0,
  //   //   lines: 0,
  //   //   statements: 0,
  //   // },
  // },
  maxWorkers: process.env.CI ? 2 : '75%', // GitHub Actions linux runners have 2 cores
  reporters: ['default', 'github-actions'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  slowTestThreshold: 6.9,
  testEnvironment: 'jest-environment-jsdom',
  testTimeout: 4269,
  workerIdleMemoryLimit: process.env.CI ? '3GB' : '1GB', // GitHub Actions linux runners have 7GB of RAM. Locally we have 16 free gigs of ram, but 8 cores -> 6 workers
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
export default createJestConfig(config);
