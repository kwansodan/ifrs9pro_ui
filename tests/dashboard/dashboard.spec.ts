import { test, expect } from "@playwright/test";

test.describe("Dashboard page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard before each test
    await page.goto("/dashboard");
  });

  test("dashboard loads successfully", async ({ page }) => {
    // Greeting should be visible (Good morning / afternoon / evening)
    await expect(
      page.getByText(/good (morning|afternoon|evening)/i)
    ).toBeVisible();

    // Date heading should be visible
    await expect(page.locator("h3").first()).toBeVisible();
  });

  test("portfolio overview section is displayed", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /portfolio overview/i })
    ).toBeVisible();

    await expect(page.getByText(/portfolio count/i)).toBeVisible();
    await expect(page.getByText(/total bog impairment/i)).toBeVisible();
    await expect(page.getByText(/total ecl/i)).toBeVisible();
    await expect(page.getByText(/risk reserve/i)).toBeVisible();
  });

  test("customer overview section is displayed", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /customer overview/i })
    ).toBeVisible();

    await expect(page.getByText(/number of customers/i)).toBeVisible();
    await expect(page.getByText(/institutional loans/i)).toBeVisible();
    await expect(page.getByText(/consumer loans/i)).toBeVisible();
  });

  test("portfolio area shows table or empty state", async ({ page }) => {
    // Either portfolio table OR empty state should be visible
    const portfolioTable = page.getByText(/portfolio/i);
    const emptyState = page.getByText(/no portfolio yet/i);

    await expect(portfolioTable.or(emptyState)).toBeVisible();
  });

  test("dashboard does not show error state on successful load", async ({
    page,
  }) => {
    // Ensure common error text is NOT visible
    await expect(page.getByText(/unable to fetch/i)).not.toBeVisible();

    await expect(page.getByText(/something went wrong/i)).not.toBeVisible();
  });
});
