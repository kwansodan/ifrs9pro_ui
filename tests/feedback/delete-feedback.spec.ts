import { test, expect } from "@playwright/test";

test.describe("Delete Feedback modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/feedback");

    const menuIcon = page.locator("img").first();

    if (await menuIcon.isVisible()) {
      await menuIcon.click();
      await page.getByText(/delete feedback/i).click();
    }
  });

  test("delete confirmation renders", async ({ page }) => {
    await expect(
      page.getByText(/are you sure you want to delete/i)
    ).toBeVisible();
  });

  test("cancel closes modal", async ({ page }) => {
    await page.getByRole("button", { name: /cancel/i }).click();

    await expect(
      page.getByText(/are you sure you want to delete/i)
    ).not.toBeVisible();
  });

  test("delete button exists", async ({ page }) => {
    await expect(page.getByRole("button", { name: /delete/i })).toBeVisible();
  });
});
