import { test, expect } from "@playwright/test";

const UI_URL = "http:localhost:5173/";
test("should allow user to sign In", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("ajay@test.com");
  await page.locator("[name=password]").fill("abcdef");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("User Logged In")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const test_mail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();
  await page.locator('[name="firstName"]').fill("test_first");
  await page.locator('[name="LastName"]').fill("test_lasst");
  await page.locator('[name="email"]').fill(test_mail);
  await page.locator('[name="password"]').fill("password");
  await page.locator('[name="confirmPassword"]').fill("password");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
