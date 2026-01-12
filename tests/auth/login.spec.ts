import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test("login page loads", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /ifrs9pro/i })
    ).toBeVisible();

    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();
  });

  test("login button enables when form is valid", async ({ page }) => {
    await page.goto("/");

    const button = page.getByRole("button", { name: /login/i });
    await expect(button).toBeDisabled();

    await page.getByPlaceholder(/email/i).fill("test@example.com");
    await page.getByPlaceholder(/password/i).fill("password");

    await expect(button).toBeEnabled();
  });

  test("request access link navigates", async ({ page }) => {
    await page.goto("/");

    await page.getByText(/request access/i).click();
    await expect(page).toHaveURL(/request-access/);
  });
});
