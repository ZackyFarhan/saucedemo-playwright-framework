import { expect, test } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { checkoutInformation, users } from "../test-data/users";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
});

test("lists products and adds a product to the cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await expect(productsPage.heading).toBeVisible();
  await expect(productsPage.products).toHaveCount(6);
  await productsPage.addProduct("Sauce Labs Backpack");

  await expect(productsPage.cartBadge).toHaveText("1");
});

test("removes a product from the cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addProduct("Sauce Labs Backpack");
  await productsPage.openCart();

  await expect(cartPage.heading).toBeVisible();
  await expect(cartPage.items).toHaveCount(1);
  await expect(cartPage.items.first()).toContainText("Sauce Labs Backpack");

  await cartPage.removeProduct("Sauce Labs Backpack");

  await expect(cartPage.items).toHaveCount(0);
});

test("completes checkout for a cart item", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addProduct("Sauce Labs Backpack");
  await productsPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation(
    checkoutInformation.firstName,
    checkoutInformation.lastName,
    checkoutInformation.postalCode,
  );
  await checkoutPage.continueToOverview();

  await expect(page.getByText("Checkout: Overview", { exact: true })).toBeVisible();
  await expect(page.getByTestId("inventory-item")).toContainText("Sauce Labs Backpack");

  await checkoutPage.finishOrder();

  await expect(checkoutPage.confirmation).toHaveText("Thank you for your order!");
});

test("requires a last name before continuing checkout", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addProduct("Sauce Labs Backpack");
  await productsPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation(checkoutInformation.firstName, "", checkoutInformation.postalCode);
  await checkoutPage.continueToOverview();

  await expect(checkoutPage.errorMessage).toHaveText("Error: Last Name is required");
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
});
