import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly heading: Locator;
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText("Your Cart", { exact: true });
    this.items = page.getByRole("main").getByRole("button", { name: /^View details for / });
    this.checkoutButton = page.getByTestId("checkout");
  }

  async removeProduct(productName: string): Promise<void> {
    const products = await this.items.allTextContents();
    const productIndex = products.findIndex((name) => name.includes(productName));

    if (productIndex === -1) {
      throw new Error(`Product "${productName}" is not in the cart`);
    }

    await this.page
      .getByRole("main")
      .getByRole("button", { name: "Remove" })
      .nth(productIndex)
      .click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
