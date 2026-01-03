import { test, expect } from "@playwright/test";
import { login } from "../helpers/login";

test.describe("Portfolio workflow (staging)", () => {
  test("create, edit, and delete portfolio", async ({ page }) => {
    await login(page);

    const runId = Date.now();
    const portfolioName = `PW Portfolio ${runId}`;
    const updatedName = `PW Portfolio Updated ${runId}`;

    /**
     * =========================
     * CREATE – STEP 1
     * =========================
     */
    await page.goto("/dashboard/portfolio");
    await page.getByRole("button", { name: /new portfolio/i }).click();

    /**
     * STEP 1 – Portfolio basics
     */

    // Portfolio name
    await page.locator('input[name="name"]').fill(portfolioName);

    // Description
    await page
      .locator('textarea[placeholder="Enter portfolio description"]')
      .fill("Created by Playwright");

    /**
     * Asset type (react-select)
     */
    const assetSelect = page.locator(".react-select__control").nth(0);
    await assetSelect.click();
    await page.keyboard.type("Equity");
    await page.keyboard.press("Enter");

    await expect(
      page.locator(".react-select__single-value", { hasText: "Equity" })
    ).toBeVisible();

    /**
     * Customer type (react-select)
     */
    const customerSelect = page.locator(".react-select__control").nth(1);
    await customerSelect.click();
    await page.keyboard.type("Retail");
    await page.keyboard.press("Enter");

    await expect(
      page.locator(".react-select__single-value", { hasText: "Retail" })
    ).toBeVisible();

    /**
     * Funding source (react-select)
     */
    const fundingSelect = page.locator(".react-select__control").nth(2);
    await fundingSelect.click();
    await page.keyboard.type("Deposit");
    await page.keyboard.press("Enter");

    await expect(
      page.locator(".react-select__single-value", { hasText: "Deposit" })
    ).toBeVisible();

    /**
     * Data source (react-select)
     */
    const dataSelect = page.locator(".react-select__control").nth(3);
    await dataSelect.click();
    await page.keyboard.type("Manual");
    await page.keyboard.press("Enter");

    await expect(
      page.locator(".react-select__single-value", { hasText: "Manual" })
    ).toBeVisible();

    /**
     * Repayment toggle
     */
    await page.locator('input[type="checkbox"]').check();

    /**
     * Next
     */
    await page.getByRole("button", { name: "Next" }).click();

    /**
     * CREATE – STEP 2
     */
    await page.locator('input[placeholder*="credit risk" i]').fill("CRR-001");

    await page.locator('input[placeholder*="loan asset" i]').fill("LA-001");

    await page.locator('input[placeholder*="ecl" i]').fill("ECL-001");

    await page.getByRole("button", { name: /next/i }).click();

    /**
     * CREATE – STEP 3
     */
    const stageRows = page.locator("tbody tr");
    await stageRows.first().locator("img").click();

    await stageRows.first().locator("input").nth(0).fill("0–30");

    await stageRows.first().locator("input").nth(1).fill("0.1");

    await page.getByRole("button", { name: /next/i }).click();

    /**
     * CREATE – STEP 4
     */
    const eclRows = page.locator("tbody tr");
    await eclRows.first().locator("img").click();

    await eclRows.first().locator("input").fill("0–30");

    await page
      .getByRole("button", { name: /complete portfolio creation/i })
      .click();

    await expect(
      page.getByText(/portfolio creation done successfully/i)
    ).toBeVisible();

    /**
     * =========================
     * EDIT PORTFOLIO
     * =========================
     */
    await page.goto("/dashboard/portfolio");
    await page.getByText(portfolioName).click();

    await page.getByRole("button", { name: /edit/i }).click();

    await page
      .locator('input[placeholder*="portfolio name" i]')
      .fill(updatedName);

    await page.getByRole("button", { name: /save/i }).click();

    await expect(page.getByText(updatedName)).toBeVisible();

    /**
     * =========================
     * DELETE PORTFOLIO
     * =========================
     */
    await page.getByRole("button", { name: /delete/i }).click();
    await page.getByRole("button", { name: /confirm/i }).click();

    await expect(page.getByText(updatedName)).not.toBeVisible();
  });
});
