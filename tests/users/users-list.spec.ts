import { test, expect } from "@playwright/test";

test.describe("Users list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/users");
  });

  test("users page loads", async ({ page }) => {
    await expect(page.locator("h1", { hasText: "Users" })).toBeVisible();
  });

  test("search input is visible", async ({ page }) => {
    await expect(page.getByPlaceholder(/search by role/i)).toBeVisible();
  });

  test("new user modal opens", async ({ page }) => {
    await page.getByRole("button", { name: /new user/i }).click();

    await expect(page.getByText(/add new user/i)).toBeVisible();
  });

  test("users table or loader renders", async ({ page }) => {
    const table = page.locator(".rdg");
    const loader = page.getByText(/loading/i);

    await expect(table.or(loader)).toBeVisible();
  });

  test("export button exists", async ({ page }) => {
    await expect(page.getByRole("button", { name: /export/i })).toBeVisible();
  });

  test("page does not show fatal error", async ({ page }) => {
    await expect(
      page.getByText(/something went wrong|application error/i)
    ).not.toBeVisible();
  });
});
