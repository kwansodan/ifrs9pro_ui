import { test, expect } from "@playwright/test";

test.describe("Admin Request page", () => {
  test("admin request page renders a valid state", async ({ page }) => {
    await page.goto("/admin-request?email=test@example.com&token=dummy-token");

    // One of the valid UI states must be visible
    await expect(
      page.getByText(/verifying|expired|request|admin|invalid/i)
    ).toBeVisible();
  });
});
