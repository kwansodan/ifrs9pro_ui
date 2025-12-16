import { test, expect } from "@playwright/test";

test.describe("Portfolio Main page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/portfolio");
  });

  test("page renders without crashing", async ({ page }) => {
    await expect(page.locator("h1", { hasText: "Portfolios" })).toBeVisible();
  });

  test("search input is visible", async ({ page }) => {
    await expect(
      page.getByPlaceholder(/search by portfolio name/i)
    ).toBeVisible();
  });

  test("new portfolio button opens modal", async ({ page }) => {
    await page.getByRole("button", { name: /new portfolio/i }).click();

    await expect(page.getByText(/create new portfolio/i)).toBeVisible();
  });

  test("portfolio table or empty state is rendered", async ({ page }) => {
    const table = page.locator(".rdg"); // react-data-grid
    const empty = page.getByText(/no portfolio/i);

    await expect(table.or(empty)).toBeVisible();
  });

  test("page does not show fatal error", async ({ page }) => {
    await expect(
      page.getByText(/something went wrong|error occurred/i)
    ).not.toBeVisible();
  });
});
