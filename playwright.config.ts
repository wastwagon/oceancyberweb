import { defineConfig, devices } from "@playwright/test";

/** Dedicated port avoids clashing with a dev server on 3020. Override with PLAYWRIGHT_WEB_PORT / PLAYWRIGHT_BASE_URL. */
const webPort = process.env.PLAYWRIGHT_WEB_PORT || "4173";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${webPort}`;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: `FRONTEND_PORT=${webPort} npm run start`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
