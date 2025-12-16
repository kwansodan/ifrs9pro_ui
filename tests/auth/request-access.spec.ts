import { test, expect } from "@playwright/test";

test.describe("Request Access page", () => {
  test("request access form loads", async ({ page }) => {
    await page.goto("/request-access");

    await expect(
      page.getByRole("heading", { name: /request access/i })
    ).toBeVisible();

    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
  });

  test("button enables when email is entered", async ({ page }) => {
    await page.goto("/request-access");

    const button = page.getByRole("button", { name: /request access/i });
    await expect(button).toBeDisabled();

    await page.getByPlaceholder(/email/i).fill("user@example.com");
    await expect(button).toBeEnabled();
  });

  test("login link navigates to login page", async ({ page }) => {
    await page.goto("/request-access");

    await page.getByText(/login/i).click();
    await expect(page).toHaveURL(/login/);
  });
});
