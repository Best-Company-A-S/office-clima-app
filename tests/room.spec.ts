import { test, expect } from "@playwright/test";

test.describe("Room Management", () => {
  test.beforeEach(async ({ page }) => {
    // Go to rooms page and ensure we're logged in
    await page.goto("/dashboard/rooms");
  });

  test("should display room list", async ({ page }) => {
    await expect(page.getByTestId("rooms-list")).toBeVisible();
  });

  test("should open create room modal", async ({ page }) => {
    // Click create room button
    await page.getByRole("button", { name: /add room/i }).click();

    // Verify modal is visible
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/create new room/i)).toBeVisible();
  });

  test("should validate room creation form", async ({ page }) => {
    // Open create room modal
    await page.getByRole("button", { name: /add room/i }).click();

    // Try to submit without required fields
    await page.getByRole("button", { name: /create/i }).click();

    // Check for validation messages
    await expect(page.getByText(/room name is required/i)).toBeVisible();
  });

  test("should display room metrics", async ({ page }) => {
    // Click on a room card (assuming there's at least one room)
    await page.getByTestId("room-card").first().click();

    // Verify room metrics are visible
    await expect(page.getByTestId("room-metrics")).toBeVisible();
    await expect(page.getByTestId("temperature-chart")).toBeVisible();
    await expect(page.getByTestId("humidity-chart")).toBeVisible();
  });

  test("should allow editing room details", async ({ page }) => {
    // Click edit on first room
    await page
      .getByTestId("room-card")
      .first()
      .getByRole("button", { name: /edit/i })
      .click();

    // Verify edit modal
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/edit room/i)).toBeVisible();

    // Update room name
    await page.getByLabel(/room name/i).fill("Updated Room Name");

    // Save changes
    await page.getByRole("button", { name: /save/i }).click();

    // Verify changes
    await expect(page.getByText("Updated Room Name")).toBeVisible();
  });
});
