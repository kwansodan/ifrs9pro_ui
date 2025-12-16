import { test, expect } from "@playwright/test";

test.describe("Admin Access empty state", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/admin-access");
  });

  test("empty state or table is shown", async ({ page }) => {
    const emptyState = page.getByText(/no access requests yet/i);
    const table = page.locator(".rdg");

    await expect(emptyState.or(table)).toBeVisible();
  });
});
