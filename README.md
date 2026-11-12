# SauceDemo Playwright Automation

## Project Overview

A TypeScript end-to-end automation framework for [SauceDemo](https://www.saucedemo.com). It uses the Page Object Model (POM) to keep page interactions reusable and test scenarios easy to maintain.

### Objectives

- Validate key login, product, cart, and checkout flows.
- Cover successful user journeys and selected validation failures.
- Produce an HTML test report for review.

## Tech Stack

- **TypeScript**
- **Playwright Test**
- **Chromium**
- **Node.js and npm**

## Project Structure

```text
.
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── LoginPage.ts
│   └── ProductsPage.ts
├── test-data/
│   └── users.ts
├── tests/
│   ├── login.spec.ts
│   └── shopping.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Automated Scenarios

The current suite contains seven tests:

- **Login:** successful standard-user login, invalid credentials, and locked-out user.
- **Products:** verifies the six-item product listing and adds a product to the cart.
- **Cart:** removes a product and verifies the cart becomes empty.
- **Checkout:** completes an order and validates that a last name is required.

## Installation and Setup

Requirements: Node.js and npm.

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
npm test
```

The Chromium project is configured with `headless: false`, so `npm test` runs with a visible browser. The existing headed script is:

```bash
npm run test:headed
```

There is no headless script in `package.json`. To run headless, change `headless: false` to `headless: true` in `playwright.config.ts`, then run `npm test`.

## HTML Report

The HTML reporter creates a report in `playwright-report/` after a test run. Open it with:

```bash
npm run report
```

## Future Improvements

- Add a configuration option and npm script for headless execution.
- Extend coverage for product sorting, additional cart cases, and checkout validations.
- Add cross-browser projects and CI execution.
