import { test, expect } from "@playwright/test";

test.describe("Feedback list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/feedback");
  });

  test("feedback page loads", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Feedbacks" })
    ).toBeVisible();
  });

  test("search input exists", async ({ page }) => {
    await expect(page.getByPlaceholder(/search by status/i)).toBeVisible();
  });

  test("add new feedback button opens modal", async ({ page }) => {
    await page.getByRole("button", { name: /add new feedback/i }).click();

    await expect(page.getByText(/share feedback/i)).toBeVisible();
  });

  test("table or loader renders", async ({ page }) => {
    const table = page.locator(".rdg");
    const loader = page.getByText(/loading/i);

    await expect(table.or(loader)).toBeVisible();
  });

  test("page does not show fatal error", async ({ page }) => {
    await expect(
      page.getByText(/something went wrong|error occurred/i)
    ).not.toBeVisible();
  });
});
