import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the home page before each test
    await page.goto("/");
  });

  test("should show login button when not authenticated", async ({ page }) => {
    // Check if login button is visible
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("should navigate to login page when clicking sign in", async ({
    page,
  }) => {
    // Click the login button
    await page.getByRole("button", { name: /sign in/i }).click();

    // Verify we're on the login page
    await expect(page).toHaveURL(/.*\/auth\/signin/);
  });

  test("should show validation errors for invalid credentials", async ({
    page,
  }) => {
    // Navigate to login page
    await page.goto("/auth/signin");

    // Try to submit without credentials
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check for validation message
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });
});
