import { test, expect } from "@playwright/test";

test.describe("User Verification page", () => {
  test("shows verification email from localStorage", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("u_email", "user@example.com");
    });

    await page.goto("/verification");

    await expect(
      page.getByRole("heading", { name: /verify your email/i })
    ).toBeVisible();

    await expect(page.getByText("user@example.com")).toBeVisible();
  });
});
