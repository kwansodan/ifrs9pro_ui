import { test, expect } from "@playwright/test";

test.describe("Admin Request page", () => {
  test("admin request flow UI loads", async ({ page }) => {
    await page.goto("/admin-request?email=test@example.com&token=dummy-token");

    await expect(page.getByText(/verifying/i)).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /send request to admin/i })
    ).toBeVisible();

    const input = page.getByPlaceholder(/admin email/i);
    await expect(input).toBeVisible();

    const button = page.getByRole("button", { name: /submit/i });
    await expect(button).toBeDisabled();

    await input.fill("admin@example.com");
    await expect(button).toBeEnabled();
  });
});
