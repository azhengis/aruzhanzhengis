import { test, expect } from "@playwright/test";

test("home page loads with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");
  await page.waitForTimeout(1000);

  expect(errors).toEqual([]);
});

test("top bar renders with name and theme toggle", async ({ page }) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  await expect(header.getByText("Aruzhan", { exact: true })).toBeVisible();
  await expect(header.getByRole("button")).toBeVisible();
});

test("footer halftone name renders without crashing", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await expect(page.locator("footer canvas")).toBeVisible();
  expect(errors).toEqual([]);
});
