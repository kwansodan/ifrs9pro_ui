import { test, expect } from "@playwright/test";

test.describe("Admin Access actions menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/admin-access");
  });

  test("actions menu opens when clicking options icon", async ({ page }) => {
    const menuIcon = page.locator("img").first();

    if (await menuIcon.isVisible()) {
      await menuIcon.click();

      await expect(page.getByText(/approve request/i)).toBeVisible();

      await expect(page.getByText(/deny request/i)).toBeVisible();

      await expect(page.getByText(/flag suspicious/i)).toBeVisible();
    }
  });
});
