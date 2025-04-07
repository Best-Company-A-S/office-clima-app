import { test, expect } from "@playwright/test";

test.describe("Team Management", () => {
  test.beforeEach(async ({ page }) => {
    // Go to teams page and ensure we're logged in
    await page.goto("/teams");
  });

  test("should show create team button for authenticated users", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: /create team/i })
    ).toBeVisible();
  });

  test("should open create team modal", async ({ page }) => {
    // Click create team button
    await page.getByRole("button", { name: /create team/i }).click();

    // Verify modal is visible
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/create new team/i)).toBeVisible();
  });

  test("should validate team name input", async ({ page }) => {
    // Open create team modal
    await page.getByRole("button", { name: /create team/i }).click();

    // Try to submit without team name
    await page.getByRole("button", { name: /create/i }).click();

    // Check for validation message
    await expect(page.getByText(/team name is required/i)).toBeVisible();
  });

  test("should allow joining team with invite code", async ({ page }) => {
    // Click join team button
    await page.getByRole("button", { name: /join team/i }).click();

    // Fill in invite code
    await page.getByLabel(/invite code/i).fill("TEST-CODE");

    // Submit form
    await page.getByRole("button", { name: /join/i }).click();

    // Verify error for invalid code
    await expect(page.getByText(/invalid invite code/i)).toBeVisible();
  });
});
