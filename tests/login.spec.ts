import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { users } from "../test-data/users";

test.describe("Login", () => {
  test("allows a standard user to sign in", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(productsPage.heading).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.invalid.username, users.invalid.password);

    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match any user in this service",
    );
    await expect(page).toHaveURL("/");
  });

  test("explains when a user account is locked", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText("Sorry, this user has been locked out");
    await expect(page).toHaveURL("/");
  });
});
