import { test, expect } from "@playwright/test";

test.describe("Request Access flow", () => {
  test("user can request access successfully", async ({ page }) => {
    // Navigate to request access page
    await page.goto("/request-access");

    // Assert page title / heading
    await expect(
      page.getByRole("heading", { name: /request access/i })
    ).toBeVisible();

    // Locate email input
    const emailInput = page.locator('input[name="email"]');

    // Locate submit button
    const submitButton = page.getByRole("button", {
      name: /request access/i,
    });

    // Button should be disabled initially
    await expect(submitButton).toBeDisabled();

    // Fill email
    const testEmail = "test.user@ifrs9pro.com";
    await emailInput.fill(testEmail);

    // Button should now be enabled
    await expect(submitButton).toBeEnabled();

    // Submit form
    await submitButton.click();

    // Expect navigation to verification page
    await expect(page).toHaveURL(/\/verification/);

    // Verify email stored in localStorage
    const storedEmail = await page.evaluate(() =>
      localStorage.getItem("u_email")
    );

    expect(storedEmail).toBe(testEmail);
  });
});
