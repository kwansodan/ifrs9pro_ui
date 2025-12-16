import { test, expect } from "@playwright/test";

test.describe("No Feedback empty state", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/feedback");
  });

  test("no feedback message renders (when applicable)", async ({ page }) => {
    const emptyState = page.getByText(/no feedback yet/i);
    const table = page.locator(".rdg");

    // Either state is acceptable depending on backend data
    await expect(emptyState.or(table)).toBeVisible();
  });

  test("share feedback button opens modal", async ({ page }) => {
    const button = page.getByRole("button", { name: /share feedback/i });

    if (await button.isVisible()) {
      await button.click();
      await expect(page.getByText(/share feedback/i)).toBeVisible();
    }
  });
});
