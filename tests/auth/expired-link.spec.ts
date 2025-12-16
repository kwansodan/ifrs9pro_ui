import { test, expect } from "@playwright/test";

test.describe("Expired Link page", () => {
  test("expired link message is shown", async ({ page }) => {
    await page.goto("/expired-link");

    await expect(
      page.getByRole("heading", { name: /expired link/i })
    ).toBeVisible();

    await expect(page.getByText(/your access link is expired/i)).toBeVisible();

    await expect(page.getByText(/request new link/i)).toBeVisible();
  });
});
