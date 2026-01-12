import { Page, expect } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/login");

  await page.locator('input[name="email"]').fill(process.env.STAGING_EMAIL!);
  await page
    .locator('input[name="password"]')
    .fill(process.env.STAGING_PASSWORD!);

  const loginButton = page.getByRole("button", { name: /login/i });

  await expect(loginButton).toBeEnabled();

  await loginButton.click();

  await expect(page).toHaveURL(/\/dashboard/);
}
