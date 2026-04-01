# Playwright SauceDemo Framework

A portfolio-grade end-to-end automation framework built with Playwright and TypeScript against SauceDemo.

## Overview

This project demonstrates maintainable and senior-level automation engineering practices, including:

- Page Object Model (POM)
- custom Playwright fixtures
- authentication state reuse
- smoke and regression tagging
- cross-browser execution
- GitHub Actions CI/CD
- nightly scheduled execution
- centralized test data
- reliability-focused assertions and retry strategy

## Application Under Test

- SauceDemo

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Project Structure

```text
src/
  config/
  data/
  fixtures/
  pages/
  utils/

tests/
  e2e/
  smoke/
  regression/
  ```

## Implemented Test Coverage
## Login

- successful login with standard user
- locked out user validation
- invalid credentials validation
- required username validation
- required password validation

## Inventory

- inventory page load
- logout flow
- product sorting by price and name
- inventory catalog validation
- cart badge add/remove validation

## Cart

- add to cart
- cart badge validation
- cart item validation
- multiple item cart validation
- continue shopping navigation
- item removal validation

## Checkout

- checkout information
- required checkout field validation
- checkout overview
- checkout cancellation from information and overview steps
- successful order completion

## Execution

## Install dependencies

```Bash
npm install
```

## Run all tests 

```Bash
npm test
```

## Run smoke tests

```Bash
npm run test:smoke
```

## Run regression tests

```Bash
npm run test:regression
```

## Run Chromium only

```Bash
npm run test:chromium
```

## Run Firefox only

```Bash
npm run test:firefox
```

## Open HTML report

```Bash
npm run report
```

## CI/CD

The project includes GitHub Actions for:

- pull request smoke execution
- push execution on main
- nightly scheduled runs
- Playwright HTML report artifact upload

Environment values in CI are managed with GitHub Secrets.

## Reliability Strategy

This framework is designed to reduce flaky failures through stable locator choices, authentication state reuse, and web-first assertions.

## Test data strategy

This project uses centralized static data in files such as [src/data/products.ts](src/data/products.ts) and [src/data/checkout-data.ts](src/data/checkout-data.ts) on purpose.

For this framework, that choice is acceptable because SauceDemo behaves like a stable demo environment with seeded and predictable inventory. In that kind of system, hardcoded reference data improves readability, keeps assertions explicit, and makes the suite easier to maintain than scattering literals throughout test files.

This approach is acceptable when:

- the application under test is backed by stable seeded data
- key products, labels, and prices are intentionally predictable between runs
- the goal is deterministic regression coverage in a controlled QA or demo environment
- the team wants shared constants that make tests easier to read and update

This approach is not appropriate when:

- products can be added, removed, renamed, or repriced outside the test's control
- the environment is shared, live, or frequently refreshed with changing business data
- the catalog is generated dynamically per tenant, market, or user
- hardcoded data would create brittle failures unrelated to real product quality

In dynamic systems, a stronger approach is usually to rely on seeded test fixtures created for automation, fetch current data from an agreed source at runtime, or assert behavior without depending on a fixed catalog. For example, a sort test can verify that prices are ordered ascending without assuming the exact product list will always stay the same.

## Retry policy
- local runs use zero retries to expose failures immediately
- CI runs use retries for transient infrastructure or browser instability
- traces are captured on first retry for debugging
- screenshots are kept on failure
- videos are retained on failure

## Stability principles
- avoid arbitrary time-based waits
- prefer resilient locators
- use assertions that reflect user-visible behavior
- fix unstable tests before increasing retries


## Why this project is valuable

This repository demonstrates how to build a maintainable UI automation framework, not just isolated Playwright tests. It focuses on architecture, readability, stability, CI/CD integration, and realistic end-to-end business flows.
