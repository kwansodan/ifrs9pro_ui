/// <reference types="node" />

import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

const STAGING_URL = "https://ifrs9pro-ui-staging.vercel.app";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    baseURL: STAGING_URL,
    headless: true,
    launchOptions: {
      slowMo: 800,
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
