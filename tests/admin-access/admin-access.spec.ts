import { test, expect } from "@playwright/test";

test.describe("Admin Access (staging-safe)", () => {
  test("admin access page loads without crashing", async ({ page }) => {
    await page.goto("/dashboard/admin-access");

    await expect(page.locator("body")).toBeVisible();

    await expect(
      page.getByText(/application error|something went wrong|failed to load/i)
    ).not.toBeVisible();
  });
});
