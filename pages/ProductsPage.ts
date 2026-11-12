import { Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly heading: Locator;
  readonly products: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText("Products", { exact: true });
    this.products = page.getByTestId("inventory-item");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async addProduct(productName: string): Promise<void> {
    const product = this.products.filter({ hasText: productName });
    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
