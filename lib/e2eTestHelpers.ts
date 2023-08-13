// import { Page } from '@playwright/test';

// note: process.env.PLAYWRIGHT_TEST_BASE_URL from vercel does not end in a trailing /
const TEST_BASE_URL : string = process.env.PLAYWRIGHT_TEST_BASE_URL
  ? `https://${process.env.PLAYWRIGHT_TEST_BASE_URL}`
  : 'http://localhost:3000';

export const TEST_QUERY_PARAMS = 'disableAnalytics=true';

// testRoute should begin with a / such as '/' or '/admin'
export function getTestUrl(testRoute = '/', initialPageLoad = true) : string {
  return `${TEST_BASE_URL}${testRoute}${initialPageLoad ? `?${TEST_QUERY_PARAMS}` : ''}`;
}
