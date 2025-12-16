import { test, expect } from "@playwright/test";

test.describe("New User modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/users");
    await page.getByRole("button", { name: /new user/i }).click();
  });

  test("new user form renders", async ({ page }) => {
    await expect(page.getByPlaceholder(/enter first name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/enter last name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/enter email address/i)).toBeVisible();
    await expect(
      page.getByPlaceholder(/enter recovery email address/i)
    ).toBeVisible();
  });

  test("role and portfolio selects exist", async ({ page }) => {
    await expect(page.getByText(/select role/i)).toBeVisible();
    await expect(page.getByText(/select portfolio/i)).toBeVisible();
  });

  test("submit button exists", async ({ page }) => {
    await expect(page.getByRole("button", { name: /submit/i })).toBeVisible();
  });

  test("empty form submission is blocked", async ({ page }) => {
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(page.getByText(/please fill in all fields/i)).toBeVisible();
  });
});
