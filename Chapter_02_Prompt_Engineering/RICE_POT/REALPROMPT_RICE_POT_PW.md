### R — Role

You are a QA Automation Architect with 15+ years of experience in test automation, enterprise web applications, SaaS platforms, and framework engineering. You are an expert in Playwright with TypeScript and possess deep knowledge of modern authentication systems, login workflows, session management, UI validation, enterprise test automation architecture, and scalable test framework development.

You also have extensive experience designing production-ready automation frameworks using industry best practices, Page Object Model, fixtures, reusable utilities, centralized configuration management, reporting integrations, and enterprise-grade coding standards.

### I — Instructions
Generate a complete Playwright with TypeScript automation framework implementation.  
Automate and verify the login functionality of:
https://app.wingify.com/#login  
Adopt framework conventions, architecture, coding style, folder structure, fixtures, utilities, and design patterns from:
https://github.com/SathishQASelenium/AdvancePlaywrightFramework1x      
Generate enterprise-grade automation code.  
Follow Playwright Test Runner standards.  
Implement Page Object Model architecture.  
Use reusable methods and components.  
Apply Playwright lifecycle methods such as:
test.describe()  
test.beforeEach()  
test.afterEach()  
test.step()  
other relevant Playwright hooks where required.  
Implement robust exception handling in Page Objects and test scripts.  
Follow enterprise-level maintainability and scalability standards.  
Follow Playwright locator best practices with the following priority order:  
getByRole()  
getByLabel()  
getByPlaceholder()  
getByTestId()  
XPath (only when no stable locator exists)  
Prefer accessibility-first locator strategies whenever possible.  
Use XPath only as a fallback locator strategy.  
Avoid CSS selectors.  
Avoid brittle locators.  
Use explicit waits only.  
Do not use hard waits.  
Do not use fixed timeout-based synchronization.  
Follow DRY principles.  
Follow SOLID principles wherever applicable.  
Include Allure reporting integration.  
Follow centralized configuration practices.  
Follow reusable utility patterns.  
Follow environment configuration management patterns.  
Follow fixture-based execution patterns when applicable.  
Follow common enterprise logging and reporting standards.  
Generate maintainable and production-ready code suitable for large-scale enterprise projects.  
Generate only runnable code.  
Do not generate explanations.  
Do not generate comments.  
Do not generate setup instructions.  
Do not generate dependency installation steps.  
Do not generate additional content outside the requested files.  

Maintain consistent structure, modularity, readability, extensibility, and framework standards across all generated files.

### C — Context

You are creating automation for the VWO login page available at:

https://app.wingify.com/#login

The automation framework must follow the architectural patterns, coding standards, folder structure, design philosophy, naming conventions, reusable components, fixture implementation, reporting structure, and overall framework design principles used in:

https://github.com/SathishQASelenium/AdvancePlaywrightFramework1x

Framework alignment requirements:

Follow the same enterprise-level framework philosophy.  
Follow centralized configuration management.  
Follow reusable Page Object implementation patterns.  
Follow fixture-based execution architecture where appropriate.  
Follow reusable helper and utility design patterns.  
Follow environment-specific execution practices.  
Follow reporting integration approaches.  
Follow reusable assertion practices.  
Follow enterprise-grade exception handling techniques.  
Follow enterprise logging standards.  
Follow TypeScript best practices demonstrated in the referenced framework.  
Follow Playwright patterns demonstrated in the referenced framework.  
Follow scalable automation architecture suitable for long-term maintenance.  

The login page contains:

Email field  
Password field  
Login button  
Authentication validation workflow  
Login success flow  
Login failure flow  

Framework should support:

Valid Login Testing  
Invalid Login Testing  
Authentication Validation  
Login Error Verification  
UI Validation  
Reusable Page Objects  
Scalable Enterprise Architecture  

Do not deviate from the referenced framework structure unless required by Playwright standards.

### E — Example

Example Page Object structure:

```
import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private readonly page: Page) {}

    async enterEmail(email: string): Promise<void> {
        await this.page.getByLabel('Email').fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.getByLabel('Password').fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.page.getByRole('button', { name: /login|sign in/i }).click();
    }

    async login(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}
```

### P — Parameters
Framework Reference:
https://github.com/SathishQASelenium/AdvancePlaywrightFramework1x

Technology Stack:
- Playwright
- TypeScript
- Playwright Test Runner
- Allure Playwright

Framework Architecture:
- Enterprise Grade
- Production Ready
- Scalable
- Maintainable
- Extensible

Design Patterns:
- Page Object Model
- Fixture Pattern
- Reusable Utilities
- Centralized Configuration
- Base Components
- Reporting Integration

Coding Standards:
- SOLID Principles
- DRY Principles
- Clean Code Practices
- Enterprise Standards

Locator Strategy Priority:
1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByTestId()
5. XPath (only when no stable locator exists)

Synchronization Strategy:
- Explicit Waits Only

Reporting:
- Allure Reports

Test Coverage:
- Valid Login
- Invalid Login

Output Style:
- Runnable Code Only

### O — Output

Provide only:

pages/LoginPage.ts

tests/LoginValid.spec.ts

tests/LoginInvalid.spec.ts

fixtures/baseFixture.ts

utils/constants.ts

playwright.config.ts


Generate the implementation consistent with:

https://github.com/SathishQASelenium/AdvancePlaywrightFramework1x


No explanations or additional content.

### T — Tone

Technical, precise, enterprise-grade, production-ready, framework-driven, code-first.

### Safety Rules, Guardrails, Anti-Hallucination Rules
Recommended Parameters block (for factual or technical output)

- Output must be deterministic (same input → same output).
- Every assertion must be traceable to a provided input.

- If information is missing or unclear, respond exactly:
  "Insufficient information to determine."

- If a detail is inferred, label it exactly:
  "Inference (low confidence)".

- Do not invent features, APIs, IDs, selectors, error messages, validation messages, dashboard components, URLs, element names, workflows, page structures, response payloads, authentication behavior, or application functionality.

- Do not assume successful-login landing page identifiers.

- Do not assume invalid-login error texts.

- Do not assume locator values beyond the defined locator strategy hierarchy.

- Prefer:
  1. getByRole()
  2. getByLabel()
  3. getByPlaceholder()
  4. getByTestId()

- Use XPath only when no stable locator exists.

- Do not assume page hierarchy or DOM structure.

- Do not assume framework files beyond those explicitly requested.

- Use only information explicitly available from the target application during code generation.

- If page elements cannot be reliably identified, respond exactly:
  "Insufficient information to determine."

- Prioritize accuracy over completeness.

- Never fabricate implementation details.

- Do not generate placeholder locators pretending to be real locators.

- Do not generate synthetic assertions unsupported by available information.