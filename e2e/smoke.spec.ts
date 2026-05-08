import { expect, test } from "@playwright/test";

test.describe("public smoke", () => {
  test("home loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#startup-main-content")).toBeVisible();
  });

  test("hosting page shows primary heading", async ({ page }) => {
    await page.goto("/hosting");
    await expect(page.locator("h1").filter({ hasText: /web hosting/i })).toBeVisible();
  });

  test("robots.txt is reachable", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { level: 2, name: /Start a Conversation/i }),
    ).toBeVisible();
  });
});
