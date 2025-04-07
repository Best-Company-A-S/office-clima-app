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

  test("should show validation errors for invalid email format", async ({
    page,
  }) => {
    // Navigate to login page
    await page.goto("/auth/signin");

    // Enter invalid email
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByLabel(/password/i).fill("password123");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check for validation message
    await expect(page.getByText(/invalid email format/i)).toBeVisible();
  });

  test("should redirect to dashboard after successful login", async ({
    page,
  }) => {
    // Navigate to login page
    await page.goto("/auth/signin");

    // Enter valid credentials (these should be replaced with test credentials)
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("password123");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test("should allow user to reset password", async ({ page }) => {
    // Navigate to login page
    await page.goto("/auth/signin");

    // Click forgot password link
    await page.getByRole("link", { name: /forgot password/i }).click();

    // Enter email for password reset
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByRole("button", { name: /reset password/i }).click();

    // Verify success message
    await expect(page.getByText(/password reset email sent/i)).toBeVisible();
  });

  test("should allow user to sign out", async ({ page }) => {
    // Assuming we're logged in and on dashboard
    await page.goto("/dashboard");

    // Click user menu
    await page.getByRole("button", { name: /user menu/i }).click();

    // Click sign out
    await page.getByRole("button", { name: /sign out/i }).click();

    // Verify redirect to home and sign in button visible
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("should maintain authentication state across pages", async ({
    page,
  }) => {
    // Log in first
    await page.goto("/auth/signin");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("password123");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Navigate to different pages
    await page.goto("/dashboard/teams");
    await expect(page.getByTestId("teams-list")).toBeVisible();

    await page.goto("/dashboard/rooms");
    await expect(page.getByTestId("rooms-list")).toBeVisible();

    await page.goto("/dashboard/devices");
    await expect(page.getByTestId("device-list")).toBeVisible();
  });
});
