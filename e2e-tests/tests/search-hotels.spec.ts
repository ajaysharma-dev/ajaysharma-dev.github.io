import test, { expect } from "@playwright/test";

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

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.locator("[name=destination]").fill("chandigarh");

  await page.getByRole("button", { name: "Search" }).click({ timeout: 10_000 });

  await expect(page.getByText("Hotels found in chandigarh")).toBeVisible();
  await expect(page.getByText("Treebo Dreamland")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where to?").fill("chandigarh");

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Treebo Dreamland").click();

  await expect(page).toHaveURL(/detail/);

  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
  await page.locator("[name=destination]").fill("chandigarh");
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = (date: Date) => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };
  await page.getByPlaceholder("Check-out Date").fill(formattedDate(date));

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Treebo Dreamland").click();

  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost : ₹4500.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");

  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("030");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("10305");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();
});
