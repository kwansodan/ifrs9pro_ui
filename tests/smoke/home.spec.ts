import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/IFRS9Pro/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /IFRS 9 impairment software/i,
  );
});
