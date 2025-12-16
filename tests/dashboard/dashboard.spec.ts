import { test, expect } from "@playwright/test";

test.describe("Dashboard page (staging-safe)", () => {
  test("dashboard route loads", async ({ page }) => {
    await page.goto("/dashboard");

    // Page must render something (route works)
    await expect(page.locator("body")).toBeVisible();
  });

  test("dashboard renders application shell", async ({ page }) => {
    await page.goto("/dashboard");

    // Main layout container should exist
    await expect(page.locator("main")).toBeVisible();
  });

  test("dashboard does not show fatal error screen", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(
      page.getByText(/application error|something went wrong|failed to load/i)
    ).not.toBeVisible();
  });
});
