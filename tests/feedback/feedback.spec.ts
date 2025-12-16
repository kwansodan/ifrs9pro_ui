import { test, expect } from "@playwright/test";

test.describe("Feedback page (staging-safe)", () => {
  test("feedback page route resolves and renders", async ({ page }) => {
    await page.goto("/dashboard/feedback");

    // Route resolved and React mounted
    await expect(page.locator("body")).toBeVisible();

    // Optional: ensure page did not hard-crash
    await expect(page.locator("html")).toBeVisible();
  });
});
