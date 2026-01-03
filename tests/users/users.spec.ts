import { test, expect } from "@playwright/test";

test.describe("Users page (staging-safe)", () => {
  test("users page loads safely", async ({ page }) => {
    await page.goto("/dashboard/users");

    await expect(page.locator("body")).toBeVisible();

    await expect(
      page.getByText(/application error|something went wrong/i)
    ).not.toBeVisible();
  });
});
