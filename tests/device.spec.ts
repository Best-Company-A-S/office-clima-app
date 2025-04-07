import { test, expect } from "@playwright/test";

test.describe("Device Management", () => {
  test.beforeEach(async ({ page }) => {
    // Go to devices page and ensure we're logged in
    await page.goto("/dashboard/devices");
  });

  test("should display device list", async ({ page }) => {
    await expect(page.getByTestId("device-list")).toBeVisible();
  });

  test("should open device pairing modal", async ({ page }) => {
    // Click pair device button
    await page.getByRole("button", { name: /pair device/i }).click();

    // Verify modal is visible
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/pair new device/i)).toBeVisible();
  });

  test("should show QR scanner for device pairing", async ({ page }) => {
    // Open pair device modal
    await page.getByRole("button", { name: /pair device/i }).click();

    // Click scan QR code button
    await page.getByRole("button", { name: /scan qr code/i }).click();

    // Verify scanner is visible
    await expect(page.getByTestId("qr-scanner")).toBeVisible();
  });

  test("should display device readings", async ({ page }) => {
    // Click on a device (assuming there's at least one)
    await page.getByTestId("device-card").first().click();

    // Verify device readings are visible
    await expect(page.getByTestId("latest-readings")).toBeVisible();
    await expect(page.getByTestId("readings-chart")).toBeVisible();
  });

  test("should allow filtering device readings by date", async ({ page }) => {
    // Click on a device
    await page.getByTestId("device-card").first().click();

    // Open date picker
    await page.getByRole("button", { name: /select date range/i }).click();

    // Select last 7 days
    await page.getByRole("button", { name: /last 7 days/i }).click();

    // Verify chart updates
    await expect(page.getByTestId("readings-chart")).toBeVisible();
  });

  test("should show device status", async ({ page }) => {
    // Verify device status indicators
    await expect(page.getByTestId("device-status")).toBeVisible();

    // Check for specific status text
    await expect(page.getByText(/online|offline/i)).toBeVisible();
  });
});
