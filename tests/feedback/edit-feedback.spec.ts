import { test, expect } from "@playwright/test";

test.describe("Edit Feedback modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/feedback");

    // Open actions menu if available
    const menuIcon = page.locator("img").first();

    if (await menuIcon.isVisible()) {
      await menuIcon.click();
      await page.getByText(/edit feedback/i).click();
    }
  });

  test("edit feedback modal renders", async ({ page }) => {
    await expect(page.getByText(/edit feedback/i)).toBeVisible();
  });

  test("status dropdown exists", async ({ page }) => {
    await expect(page.getByText(/select status/i)).toBeVisible();
  });

  test("submit button exists", async ({ page }) => {
    await expect(page.getByRole("button", { name: /submit/i })).toBeVisible();
  });

  test("empty submission blocked", async ({ page }) => {
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(page.getByText(/please select status/i)).toBeVisible();
  });
});
