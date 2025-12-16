import { test, expect } from "@playwright/test";

test.describe("Feedback page (staging-safe)", () => {
  test("feedback page loads safely", async ({ page }) => {
    await page.goto("/dashboard/feedback");

    await expect(page.locator("body")).toBeVisible();

    await expect(
      page.getByText(/error|failed to load|unexpected/i)
    ).not.toBeVisible();
  });
});
