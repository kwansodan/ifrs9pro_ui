import { test, expect } from "@playwright/test";

const TEST_PORTFOLIO_ID = 1;

test.describe("Portfolio Details page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/dashboard/portfolio-details/${TEST_PORTFOLIO_ID}`);
  });

  test("details page loads", async ({ page }) => {
    await expect(page.locator("aside")).toBeVisible();
  });

  test("actions section is visible", async ({ page }) => {
    await expect(page.getByText(/actions/i)).toBeVisible();
  });

  test("upload data button opens modal", async ({ page }) => {
    await page.getByRole("button", { name: /upload data/i }).click();

    await expect(page.getByText(/upload data/i)).toBeVisible();
  });

  test("generate report modal opens", async ({ page }) => {
    await page.getByRole("button", { name: /generate reports/i }).click();

    await expect(page.getByText(/generate report/i)).toBeVisible();
  });

  test("page does not render fatal error UI", async ({ page }) => {
    await expect(page.getByText(/error|failed to load/i)).not.toBeVisible();
  });
});
