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

Locally, the Chromium project runs headed with a 500 ms slow-motion delay, so `npm test` runs with a visible browser. The existing headed script is:

```bash
npm run test:headed
```

To run headless locally, use `CI=true npm test` (in PowerShell: `$env:CI = "true"; npm test`). This does not change the default headed local configuration.

GitHub Actions sets `CI=true`, which makes tests run headless with slow motion disabled without changing the local browser settings.

## HTML Report

The HTML reporter creates a report in `playwright-report/` after a test run. Open it with:

```bash
npm run report
```

## GitHub Actions

The workflow runs on pushes and pull requests targeting `main`. It installs dependencies and Chromium, runs the full test suite, and uploads `playwright-report/` and `test-results/` as workflow artifacts even if tests fail. Open the workflow run in GitHub and download the artifacts to inspect the HTML report and test output.

## Future Improvements

- Add a configuration option and npm script for headless execution.
- Extend coverage for product sorting, additional cart cases, and checkout validations.
- Add cross-browser projects and CI execution.
