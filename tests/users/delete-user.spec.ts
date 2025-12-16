import { test, expect } from "@playwright/test";

test.describe("Delete User modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/users");

    // Open actions menu
    await page.locator("img").first().click();
    await page.getByText(/delete user/i).click();
  });

  test("delete confirmation text is shown", async ({ page }) => {
    await expect(
      page.getByText(/are you sure you want to delete/i)
    ).toBeVisible();
  });

  test("cancel button closes modal", async ({ page }) => {
    await page.getByRole("button", { name: /cancel/i }).click();

    await expect(
      page.getByText(/are you sure you want to delete/i)
    ).not.toBeVisible();
  });

  test("delete button exists", async ({ page }) => {
    await expect(page.getByRole("button", { name: /delete/i })).toBeVisible();
  });
});
