import { test, expect } from "@playwright/test";

test.describe("Admin request flow", () => {
  test("user verifies email and sends request to admin", async ({ page }) => {
    const userEmail = "user@ifrs9pro.com";
    const adminEmail = "admin@ifrs9pro.com";
    const token = "test-verification-token";

    await page.route("**/verify-user-email**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Email verified successfully",
        }),
      });
    });

    await page.route("**/send-request-to-admin**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Request sent",
        }),
      });
    });

    await page.goto(
      `/admin-request?email=${encodeURIComponent(
        userEmail
      )}&token=${encodeURIComponent(token)}`
    );

    await expect(page.getByText(/verifying/i)).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /send request to admin/i })
    ).toBeVisible();

    const adminEmailInput = page.locator('input[name="admin_email"]');
    const submitButton = page.getByRole("button", { name: /submit/i });

    await expect(submitButton).toBeDisabled();

    await adminEmailInput.fill(adminEmail);

    await expect(submitButton).toBeEnabled();

    await submitButton.click();

    await expect(page).toHaveURL(/\/admin-verification/);

    const storedAdminEmail = await page.evaluate(() =>
      localStorage.getItem("admin-email")
    );

    expect(storedAdminEmail).toBe(adminEmail);
  });
});
