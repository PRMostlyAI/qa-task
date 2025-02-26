const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: 1,
  workers: '90%', 
  reporter: [['html'], ['allure-playwright']], // Use both HTML and Allure
  use: {
    baseURL: process.env.BASE_URL || 'https://mostly.ai', // Dynamic baseURL
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'on',
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { viewport: { width: 1920, height: 1080 } },
    },
  ],
  outputDir: 'test-results/',
  preserveOutput: 'always',
});
