import { test, expect } from "@playwright/test";

test.describe("Dashboard page (staging-safe)", () => {
  test("dashboard route resolves and renders", async ({ page }) => {
    await page.goto("/dashboard");

    // Ensure the page rendered (not blank / not crashed)
    await expect(page.locator("body")).toBeVisible();
  });

  test("dashboard does not show fatal error UI", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(
      page.getByText(
        /application error|something went wrong|failed to load|unexpected error/i
      )
    ).not.toBeVisible();
  });
});
