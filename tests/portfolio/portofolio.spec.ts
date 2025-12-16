import { test, expect } from "@playwright/test";

test.describe("Portfolio page (staging-safe)", () => {
  test("portfolio page loads without crashing", async ({ page }) => {
    await page.goto("/dashboard/portfolio");

    await expect(page.locator("body")).toBeVisible();

    await expect(
      page.getByText(/application error|failed to load/i)
    ).not.toBeVisible();
  });
});
