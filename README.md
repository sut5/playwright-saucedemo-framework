# Playwright SauceDemo Framework

A professional end-to-end test automation framework built with Playwright and TypeScript against SauceDemo.

## Goal

This project is being built to demonstrate senior-level automation engineering practices, including:

- maintainable test architecture
- Page Object Model
- session and authentication management
- resilient locator strategy
- flaky test prevention
- reporting and debugging
- CI/CD integration
- clean Git workflow

## Application Under Test

- SauceDemo

## Planned Stack

- Playwright
- TypeScript
- Node.js
- ESLint
- Prettier
- GitHub Actions

## Status

Major Flows are completed.

## Reliability Strategy

This framework is designed to reduce flaky failures through stable locator choices, authentication state reuse, and web-first assertions.

### Retry policy
- local runs use zero retries to expose failures immediately
- CI runs use retries for transient infrastructure or browser instability
- traces are captured on first retry for debugging
- screenshots are kept on failure
- videos are retained on failure

### Stability principles
- avoid arbitrary time-based waits
- prefer resilient locators
- use assertions that reflect user-visible behavior
- fix unstable tests before increasing retries