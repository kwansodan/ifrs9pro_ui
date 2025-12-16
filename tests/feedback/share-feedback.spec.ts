import { test, expect } from "@playwright/test";

test.describe("Share Feedback modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/feedback");
    await page.getByRole("button", { name: /add new feedback/i }).click();
  });

  test("share feedback form renders", async ({ page }) => {
    await expect(page.getByPlaceholder(/leave feedback here/i)).toBeVisible();
  });

  test("submit button exists", async ({ page }) => {
    await expect(page.getByRole("button", { name: /submit/i })).toBeVisible();
  });

  test("empty submission is blocked", async ({ page }) => {
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(page.getByText(/please enter description/i)).toBeVisible();
  });

  test("cancel closes modal", async ({ page }) => {
    await page.getByText(/cancel/i).click();

    await expect(page.getByText(/share feedback/i)).not.toBeVisible();
  });
});
