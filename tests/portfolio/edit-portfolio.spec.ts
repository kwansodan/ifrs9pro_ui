import { test, expect } from "@playwright/test";

const TEST_PORTFOLIO_ID = 1;

test.describe("Edit Portfolio page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/dashboard/portfolio/edit-portfolio/${TEST_PORTFOLIO_ID}`);
  });

  test("edit page loads and form renders", async ({ page }) => {
    await expect(page.getByLabel(/portfolio name/i)).toBeVisible();

    await expect(
      page.getByRole("button", { name: /save changes/i })
    ).toBeVisible();
  });

  test("editing a rate enables input", async ({ page }) => {
    const editIcons = page.locator("img[src*='edit']");
    await expect(editIcons.first()).toBeVisible();

    await editIcons.first().click();

    const enabledInput = page.locator("input:not([disabled])").first();
    await expect(enabledInput).toBeEditable();
  });

  test("save button exists but does not auto-submit invalid form", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /save changes/i }).click();

    // Still on edit page → validation prevented submission
    await expect(page).toHaveURL(/edit-portfolio/);
  });

  test("page does not crash", async ({ page }) => {
    await expect(
      page.getByText(/something went wrong|error/i)
    ).not.toBeVisible();
  });
});
