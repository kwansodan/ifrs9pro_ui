import { test, expect } from "@playwright/test";

test.describe("Admin Verification page", () => {
  test("shows admin email from localStorage", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("admin-email", "admin@example.com");
    });

    await page.goto("/admin-verification");

    await expect(
      page.getByRole("heading", { name: /verify your email/i })
    ).toBeVisible();

    await expect(page.getByText("admin@example.com")).toBeVisible();
  });

  test("falls back to generic admin text when email missing", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("admin-email");
    });

    await page.goto("/admin-verification");

    await expect(page.getByText(/the admin/i)).toBeVisible();
  });
});
