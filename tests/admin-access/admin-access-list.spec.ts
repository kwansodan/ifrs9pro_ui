import { test, expect } from "@playwright/test";

test.describe("Admin Access Requests page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/admin-access");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /access requests/i })
    ).toBeVisible();
  });

  test("search input is visible", async ({ page }) => {
    await expect(page.getByPlaceholder(/search by status/i)).toBeVisible();
  });

  test("new portfolio button opens modal", async ({ page }) => {
    await page.getByRole("button", { name: /new portfolio/i }).click();

    await expect(page.getByText(/create portfolio/i)).toBeVisible();
  });

  test("table or loader renders", async ({ page }) => {
    const table = page.locator(".rdg");
    const loader = page.getByText(/loading/i);

    await expect(table.or(loader)).toBeVisible();
  });

  test("page does not show fatal error UI", async ({ page }) => {
    await expect(
      page.getByText(/something went wrong|application error/i)
    ).not.toBeVisible();
  });
});
