import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http:localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("ajay@test.com");
  await page.locator("[name=password]").fill("abcdef");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("User Logged In")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the test hotel of tes Country");
  await page.locator('[name="pricePerNight"]').fill("100");

  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Boutique").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("1");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "9.jpg"),
    path.join(__dirname, "files", "8.jpg"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10_000 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(
    page.getByRole("heading", { name: "Treebo dreamland" })
  ).toBeVisible();
  await expect(page.getByText("lorem ipsum")).toBeVisible();
  await expect(page.getByText("manimajra")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("4 adults, 0 children")).toBeVisible();
  await expect(page.getByText("₹1500 per Night")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should Edit Hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await page.getByRole("link", { name: "View details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Treebo Dreamland");
  await page.locator('[name="name"]').fill("Treebo Dreamland 2");
  await page.locator('[name="facilities"]:visible').first().click();
  await expect(
    page.locator('[name="facilities"]:visible').first()
  ).toBeChecked();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Updated!")).toBeVisible();
  await expect(page.locator('[name="name"]')).toHaveValue("Treebo Dreamland 2");

  await page.locator('[name="name"]').fill("Treebo Dreamland");
  await page.locator('[name="facilities"]:visible').first().click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Updated!")).toBeVisible();
});
