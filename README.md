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

## Inventory

- inventory page load
- logout flow
- product sorting

## Cart

- add to cart
- cart badge validation
- cart item validation

## Checkout

- checkout information
- checkout overview
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