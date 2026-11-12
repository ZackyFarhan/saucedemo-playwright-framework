import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly confirmation: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
    this.finishButton = page.getByTestId("finish");
    this.errorMessage = page.getByTestId("error");
    this.confirmation = page.getByTestId("complete-header");
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
}
