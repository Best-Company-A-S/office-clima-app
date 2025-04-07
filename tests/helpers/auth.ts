import { Page } from "@playwright/test";

export async function loginAsTestUser(page: Page) {
  await page.goto("/auth/signin");
  await page.getByLabel(/email/i).fill("test@example.com");
  await page.getByLabel(/password/i).fill("password123");
  await page.getByRole("button", { name: /sign in/i }).click();
  // Wait for dashboard redirect
  await page.waitForURL(/.*\/dashboard/);
}

export async function signOut(page: Page) {
  await page.getByRole("button", { name: /user menu/i }).click();
  await page.getByRole("button", { name: /sign out/i }).click();
  // Wait for redirect to home
  await page.waitForURL("/");
}

export async function createTestUser(page: Page) {
  await page.goto("/auth/signup");
  await page.getByLabel(/name/i).fill("Test User");
  await page.getByLabel(/email/i).fill("test@example.com");
  await page.getByLabel(/password/i).fill("password123");
  await page.getByRole("button", { name: /sign up/i }).click();
  // Wait for email verification page
  await page.waitForURL(/.*\/auth\/verify/);
}

// Add this to your test setup
export async function setupTestUser(page: Page) {
  try {
    await loginAsTestUser(page);
  } catch {
    await createTestUser(page);
    await loginAsTestUser(page);
  }
}
