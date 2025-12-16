import { test, expect } from "@playwright/test";

test.describe("Approve / Deny / Flag request modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/admin-access");

    const menuIcon = page.locator("img").first();

    if (await menuIcon.isVisible()) {
      await menuIcon.click();
      await page.getByText(/approve request/i).click();
    }
  });

  test("approve request modal renders", async ({ page }) => {
    await expect(page.getByText(/authorize/i)).toBeVisible();
  });

  test("role select exists for approve flow", async ({ page }) => {
    await expect(page.getByText(/select role/i)).toBeVisible();
  });

  test("status select is disabled", async ({ page }) => {
    const disabledSelect = page.locator(".react-select__control--is-disabled");

    // If react-select uses disabled styles, it should exist
    await expect(disabledSelect).toBeVisible();
  });

  test("cancel closes modal", async ({ page }) => {
    await page.getByText(/cancel/i).click();

    await expect(page.getByText(/authorize/i)).not.toBeVisible();
  });

  test("submit without role does not close modal", async ({ page }) => {
    await page.getByRole("button", { name: /authorize/i }).click();

    // Modal should still be open due to validation
    await expect(page.getByText(/authorize/i)).toBeVisible();
  });
});
