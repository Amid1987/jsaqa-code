const { test, expect } = require('@playwright/test');
const { email, pass} = require('./user.js');
const { chromium } = require('@playwright/test'); 

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.screenshot({ path: "home page.png" });
  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "authorization.png" });
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill(pass);
  await page.getByTestId("login-submit-btn").click();
  const header = page.locator("h2").first();
  await expect(header).toHaveText("Мои курсы и профессии");
  await page.screenshot({ path: "MyProgramm.png" });
});

test("unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("Fwertgf@mail.ru");
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill("ljhggff");
  await page.getByTestId("login-submit-btn").click();
  await page.getByTestId("login-error-hint").click();
  await expect(page.locator("data-testid=login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({ path: "error.png" });
});