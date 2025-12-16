import { test, expect } from "@playwright/test";

test.describe("Edit User modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/users");

    // Open actions menu for first row
    await page.locator("img").first().click();
    await page.getByText(/edit user/i).click();
  });

  test("edit user form renders", async ({ page }) => {
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test("role selector exists", async ({ page }) => {
    await expect(page.getByText(/select/i).first()).toBeVisible();
  });

  test("submit button exists", async ({ page }) => {
    await expect(page.getByRole("button", { name: /submit/i })).toBeVisible();
  });

  test("form does not crash on submit", async ({ page }) => {
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(
      page.getByText(/edit successful|failed|please fill/i)
    ).toBeVisible();
  });
});
