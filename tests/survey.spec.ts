import { test, expect } from "@playwright/test";

test.describe("Survey Management", () => {
  test.beforeEach(async ({ page }) => {
    // Go to surveys page and ensure we're logged in
    await page.goto("/dashboard/surveys");
  });

  test("should display survey list", async ({ page }) => {
    await expect(page.getByTestId("survey-list")).toBeVisible();
  });

  test("should open create survey modal", async ({ page }) => {
    // Click create survey button
    await page.getByRole("button", { name: /create survey/i }).click();

    // Verify modal is visible
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/create new survey/i)).toBeVisible();
  });

  test("should validate survey creation form", async ({ page }) => {
    // Open create survey modal
    await page.getByRole("button", { name: /create survey/i }).click();

    // Try to submit without required fields
    await page.getByRole("button", { name: /create/i }).click();

    // Check for validation messages
    await expect(page.getByText(/title is required/i)).toBeVisible();
  });

  test("should create a new survey", async ({ page }) => {
    // Open create survey modal
    await page.getByRole("button", { name: /create survey/i }).click();

    // Fill in survey details
    await page.getByLabel(/title/i).fill("Climate Satisfaction Survey");
    await page
      .getByLabel(/description/i)
      .fill("Please rate your comfort level");

    // Add a question
    await page.getByRole("button", { name: /add question/i }).click();
    await page
      .getByLabel(/question text/i)
      .fill("How comfortable is the temperature?");
    await page.getByLabel(/question type/i).selectOption("rating");

    // Save survey
    await page.getByRole("button", { name: /create/i }).click();

    // Verify survey appears in list
    await expect(page.getByText("Climate Satisfaction Survey")).toBeVisible();
  });

  test("should display survey responses", async ({ page }) => {
    // Click on a survey (assuming there's at least one)
    await page.getByTestId("survey-card").first().click();

    // Verify response data is visible
    await expect(page.getByTestId("survey-responses")).toBeVisible();
    await expect(page.getByTestId("response-chart")).toBeVisible();
  });

  test("should allow filtering survey responses", async ({ page }) => {
    // Click on a survey
    await page.getByTestId("survey-card").first().click();

    // Open date filter
    await page.getByRole("button", { name: /filter responses/i }).click();

    // Select date range
    await page.getByRole("button", { name: /last month/i }).click();

    // Verify filtered results
    await expect(page.getByTestId("filtered-responses")).toBeVisible();
  });

  test("should allow sharing survey link", async ({ page }) => {
    // Click share on first survey
    await page
      .getByTestId("survey-card")
      .first()
      .getByRole("button", { name: /share/i })
      .click();

    // Verify share dialog
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByTestId("share-link")).toBeVisible();

    // Verify copy button
    await expect(
      page.getByRole("button", { name: /copy link/i })
    ).toBeVisible();
  });
});
