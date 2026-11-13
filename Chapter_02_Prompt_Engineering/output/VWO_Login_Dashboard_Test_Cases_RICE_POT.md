# VWO Login Dashboard — Test Cases Using RICE-POT Under Anti-Hallucination Rules (Version 2)

## Document Metadata

| Field | Value |
|---|---|
| Version | 2.0 — regenerated after the GAP-01 clarification |
| Target | VWO login dashboard. `app.vwo.com` is the previous address; per user input on 2026-11-13 it now resolves to `app.wingify.com`. Both addresses refer to the same application. |
| Source of truth | `Chapter_02_Prompt_Engineering/Product Requirements Document_ VWO Login Dashboard.pdf` |
| Additional verified input | User-provided GAP-01 clarification dated 2026-11-13 |
| Method | RICE-POT template (`Template.RICEPPOT.md`) |
| Verification contract | `Chapter_02_Prompt_Engineering/anti-hallucination-rules.md` |
| Date | 2026-11-13 |
| Scope | Login dashboard requirements stated in the PRD, plus the user-provided URL clarification. Future Enhancements are out of scope. |
| Inputs available | PRD and the GAP-01 clarification. No API documentation, logs, screenshots, test data, or test accounts were provided. |

### Confidence Legend

| Value | Meaning |
|---|---|
| **Verified** | The expected result is traceable to an explicit statement in the PRD or a user-provided input, and the assertion does not require inventing missing detail. |
| **Inference (low confidence)** | An assumption is required because the PRD states a capability but not the exact behavior, placement, threshold, or measurement method. The assumption is labelled. |
| **Blocked** | The expected result cannot be determined from the PRD or provided inputs. The cell contains exactly `Insufficient information to determine.` plus the gap reference. |

---

## 1. RICE-POT Prompt Used

### R — Role

You are a Senior QA Analyst and Test Designer with 15+ years of experience in web authentication, security, accessibility, and enterprise SaaS testing. You operate under strict verification rules: you may only use the provided PRD and explicit user input, and you must never invent features, UI elements, error messages, URLs, credentials, selectors, or system behavior.

### I — Instructions

1. Read the attached PRD and extract only verifiable facts, each with its PRD section.
2. Incorporate explicit user-provided clarifications as verified inputs and state their source.
3. List every missing or unknown detail that prevents a deterministic test case.
4. Generate test cases only from the extracted facts and provided clarifications.
5. Trace every test case to a PRD section or a named user input.
6. Apply the exact anti-hallucination phrases for unknown or inferred content.
7. Perform a self-validation check for fabricated or contradictory content.
8. Report the number of gaps found, resolved, and still open, plus the number of blocked test cases.

Do NOT:
- Invent features, APIs, error codes, UI elements, selectors, URLs, credentials, or behavior.
- Assume default or "typical" system behavior.
- Treat a future enhancement as a current requirement.
- Present an inferred detail as verified.
- Invent execution results, pass/fail status, or test evidence.
- Create test cases for flows the PRD does not describe (for example, logout).
- Reopen a gap that an explicit user clarification has closed.

### C — Context

- Product: VWO (Visual Website Optimizer) login dashboard.
- URL resolution: `app.vwo.com` is the previous address and now resolves to `app.wingify.com`; both are the same application. This is verified user input, not an assumption.
- Existing interface described by the PRD: clean minimal login form with VWO branding; email and password fields; Remember Me checkbox; account registration link to free-trial signup; product announcement banner highlighting the new UI launch with Light and Dark Mode options.
- Functional scope: authentication, input validation, password management, session management, MFA, SSO, UX, accessibility, security, performance, integrations, and compliance.
- Out of scope: Future Enhancements (biometric authentication, adaptive authentication, PWA, A/B testing of the login page, behavior analysis, personalization) because the PRD labels them as future.
- Inputs attached: the PRD and the GAP-01 clarification. No API documentation, logs, screenshots, test data, or accounts.

### E — Example

One sample row in the required format:

`TC-001 | Access | Login page is served over HTTPS | None | 1) Open app.vwo.com. 2) Confirm it resolves to app.wingify.com. 3) Inspect the connection scheme. | The page is served over HTTPS using SSL/TLS. | Technical Requirements > Security Specifications > HTTPS Enforcement | P1 | Verified`

### P — Parameters

- Output must be deterministic: same PRD and user input produce the same test cases.
- Every assertion must be traceable to a provided PRD statement or a named user input.
- If information is missing or unclear, use exactly: `Insufficient information to determine.`
- If a detail is inferred, label it exactly: `Inference (low confidence)`.
- Do not invent features, IDs, APIs, error codes, UI elements, selectors, URLs, credentials, messages, or behavior.
- Do not assume default or "typical" system behavior.
- Do not generate placeholder locators or synthetic evidence.
- Prioritize accuracy over completeness.
- Keep future enhancements out of the current test scope.
- No fabricated execution results, statuses, actual results, or QA names.

### O — Output

- Format: Markdown document.
- Required sequence:
  1. RICE-POT prompt.
  2. `Verified Facts` table.
  3. `Missing / Unknown Information` table.
  4. `Generated Output` test case table.
  5. `Self-Validation Check`.
- Test case table columns, in this exact order:
  `TC_ID | Module | Test Case Description | PreCondition | Test Steps | Expected Result | Traceability (PRD / User Input) | Priority | Confidence`
- Gap table columns, in this exact order:
  `GAP_ID | Category | Missing Information | Impact on Testing | Affected Test Cases | Status`
- Include summary counts for total test cases, Verified, Inference, Blocked, gaps found, gaps resolved, and gaps open.
- For blocked cases, the Expected Result cell must begin with `Insufficient information to determine.`

### T — Tone

Technical, precise, audit-ready, output-only. No marketing language, no speculation presented as fact.

---

## 2. Anti-Hallucination Output

### Step 1 — Verified Facts

| Fact ID | Verifiable fact | Source |
|---|---|---|
| F-01 | The VWO login dashboard is at `app.vwo.com` and is the entry point for VWO's experimentation, personalization, and analytics tools. | PRD: Executive Summary |
| F-02 | The existing login interface is a clean, minimalist form with VWO branding. | PRD: Current State Analysis > Existing Features |
| F-03 | The existing login interface has email address and password input fields. | PRD: Current State Analysis > Existing Features |
| F-04 | The existing login interface has a Remember Me checkbox for persistent login sessions. | PRD: Current State Analysis > Existing Features |
| F-05 | The existing login interface has an account registration link that provides a direct path to free-trial signup. | PRD: Current State Analysis > Existing Features |
| F-06 | The existing login interface has a product announcement banner highlighting the new UI launch with Light and Dark Mode options. | PRD: Current State Analysis > Existing Features |
| F-07 | Primary authentication is email and password based, with secure validation. | PRD: Functional Requirements > Authentication System > Login Process |
| F-08 | Session management uses secure session handling with configurable timeout periods. | PRD: Functional Requirements > Authentication System > Login Process |
| F-09 | Multi-factor authentication is optional 2FA support for enhanced security. | PRD: Functional Requirements > Authentication System > Login Process |
| F-10 | Enterprise SSO integration is supported for organizational accounts. | PRD: Functional Requirements > Authentication System > Login Process |
| F-11 | Real-time field validation occurs on blur to provide immediate feedback. | PRD: Functional Requirements > User Input Validation |
| F-12 | Automatic email format validation is provided, with specialized mobile keyboards. | PRD: Functional Requirements > User Input Validation |
| F-13 | Password strength indicators provide visual feedback for password requirements and strength. | PRD: Functional Requirements > User Input Validation |
| F-14 | Clear, actionable error messages are provided for failed authentication attempts. | PRD: Functional Requirements > User Input Validation |
| F-15 | The Forgot Password flow is a streamlined password reset process with secure token generation. | PRD: Functional Requirements > Password Management |
| F-16 | Password recovery offers multiple options, including email-based reset. | PRD: Functional Requirements > Password Management |
| F-17 | Enforced security standards exist for password complexity. | PRD: Functional Requirements > Password Management |
| F-18 | The interface uses responsive, mobile-optimized design with touch-friendly controls. | PRD: User Experience Features > Interface Design |
| F-19 | The first input field is automatically focused. | PRD: User Experience Features > Interface Design |
| F-20 | Form labels are clickable for accessibility. | PRD: User Experience Features > Interface Design |
| F-21 | Loading states provide clear feedback during authentication processing. | PRD: User Experience Features > Interface Design |
| F-22 | Screen reader support includes ARIA labels and keyboard navigation compatibility. | PRD: User Experience Features > Accessibility Features |
| F-23 | A high contrast mode option is available for visually impaired users. | PRD: User Experience Features > Accessibility Features |
| F-24 | Full keyboard accessibility is provided for all interactive elements. | PRD: User Experience Features > Accessibility Features |
| F-25 | The login interface aligns with VWO's design system and color scheme and has a professional, trustworthy appearance. | PRD: User Experience Features > Branding and Visual Design |
| F-26 | Light and Dark Mode theme support is available. | PRD: User Experience Features > Branding and Visual Design |
| F-27 | Authentication data transmission uses encryption, and HTTPS with SSL/TLS is enforced for login communications. | PRD: Technical Requirements > Security Specifications > Data Protection |
| F-28 | Password storage is encrypted using industry-standard hashing algorithms. | PRD: Technical Requirements > Security Specifications > Data Protection |
| F-29 | Session tokens use secure generation and management. | PRD: Technical Requirements > Security Specifications > Data Protection |
| F-30 | GDPR compliance and enterprise security policies with audit requirements are supported. | PRD: Technical Requirements > Compliance Standards |
| F-31 | Rate limiting protects against brute-force attacks through request throttling. | PRD: Technical Requirements > Compliance Standards |
| F-32 | The login page loads within 2 seconds on standard connections, uses compressed images and minified CSS/JavaScript, and uses a CDN. | PRD: Technical Requirements > Performance Requirements |
| F-33 | The platform targets 99.9% uptime, supports thousands of simultaneous login attempts, and uses multi-region deployment. | PRD: Technical Requirements > Performance Requirements > Scalability |
| F-34 | Successful authentication transitions to the VWO main dashboard; login success/failure analytics are tracked; support systems are integrated for login assistance. | PRD: Technical Requirements > Integration Requirements |
| F-35 | Enterprise SSO supports SAML and OAuth; social login is an optional integration with Google, Microsoft, and other identity providers. | PRD: Technical Requirements > Integration Requirements > Third-Party Services |
| F-36 | User journeys include new-user discovery, registration, and onboarding; returning-user quick access, dashboard transition, and recent activity; error identification, recovery options, and success confirmation. | PRD: User Journey and Flow |
| F-37 | Success metrics include 95%+ login success, sub-2-second page load, 90%+ user satisfaction, zero successful brute-force or unauthorized access, 100% audit compliance, no session hijacking, and a 20% reduction in login-related support tickets. | PRD: Success Metrics and KPIs |
| F-38 | Delivery phases are: Phase 1 core authentication, basic validation and error handling, password reset; Phase 2 mobile, accessibility, advanced validation and feedback; Phase 3 SSO, advanced security, analytics and monitoring. | PRD: Implementation Considerations |
| F-39 | Compliance targets include OWASP authentication guidelines, GDPR and CCPA, enterprise audit trails, WCAG 2.1 AA, and universal design. | PRD: Compliance and Standards |
| F-40 | Biometric authentication, adaptive authentication, PWA, A/B testing of the login experience, behavior analysis, and personalization are future enhancements, not current requirements. | PRD: Future Enhancements |
| F-41 | `app.vwo.com` and `app.wingify.com` are the same application. `app.vwo.com` was the previous address; hitting it now resolves to `app.wingify.com`. | User input: GAP-01 clarification, 2026-11-13 |

### Step 2 — Missing / Unknown Information

30 gaps were identified. GAP-01 is resolved by the user clarification. 29 gaps remain open.

| GAP_ID | Category | Missing Information | Impact on Testing | Affected Test Cases | Status |
|---|---|---|---|---|---|
| GAP-01 | Environment | Resolved by user input on 2026-11-13: `app.vwo.com` and `app.wingify.com` are the same application. `app.vwo.com` is the previous address and now resolves to `app.wingify.com`. Staging, tenant, and region details remain unconfirmed but are not required to test the public production URL. | The environment alias ambiguity is closed. Public URL tests can proceed against the resolved destination; staging and tenant-specific tests still lack targets. | TC-001, TC-001A | Resolved |
| GAP-02 | Test data | No valid, invalid, locked, unregistered, 2FA-enabled, or SSO-enabled test accounts and no credentials. | Positive-path and account-state cases cannot be executed. | TC-024, TC-027, TC-028, TC-030, TC-031, TC-038 | Open |
| GAP-03 | Validation | No email syntax rules, maximum length, trimming behavior, case sensitivity, plus-addressing, or IDN handling. | Pass/fail boundaries for email validation cannot be derived. | TC-018, TC-019 | Open |
| GAP-04 | Validation | No password policy: minimum and maximum length, required character classes, allowed characters, reuse, expiry, or strength scoring. | Password strength and complexity cases cannot be asserted. | TC-023, TC-040 | Open |
| GAP-05 | Validation | No error message catalog, error codes, field-to-message mapping, or localization of messages. | Error cases can assert that a message appears, but not its exact content. | TC-025 | Open |
| GAP-06 | Validation | No required-field behavior, no empty-submit behavior, and no specification of where validation messages appear. | Empty-field cases rely on inference. | TC-019, TC-020 | Open |
| GAP-07 | Session | No session timeout value, no idle versus absolute timeout definition, no warning period, and no per-organization configurability rules. | Session timeout cannot be executed deterministically. | TC-029 | Open |
| GAP-08 | Session | No Remember Me duration, scope, revocation behavior, or token storage detail. | Persistence can only be inferred, not measured. | TC-028 | Open |
| GAP-09 | Authentication | No 2FA factor type, enrollment flow, challenge UI, recovery codes, or rules for when 2FA is required. | The 2FA case cannot be designed end to end. | TC-030 | Open |
| GAP-10 | Authentication | No SSO protocol configuration, IdP metadata, just-in-time provisioning, or SSO error handling. | Enterprise SSO cannot be executed. | TC-031 | Open |
| GAP-11 | Authentication | Social login is described as optional, with no statement that it is enabled, and no provider configuration or account-linking rules. | Social login cannot be asserted as available. | TC-055 | Open |
| GAP-12 | Password reset | No reset token format, entropy, expiry, single-use rule, invalidation behavior, or link domain. | Token security cannot be verified. | TC-039 | Open |
| GAP-13 | Password reset | The PRD says "multiple" recovery options but names only email-based reset. The other options are unspecified. | Recovery-option coverage cannot be enumerated. | TC-033 | Open |
| GAP-14 | Security | No rate-limit threshold, time window, response behavior, lockout duration, CAPTCHA, or unlock path. | Brute-force protection cannot be triggered deterministically. | TC-048 | Open |
| GAP-15 | Post-login | No dashboard URL, dashboard content, personalization rules, or definition of "recent activity" context. | Post-login and recent-activity assertions cannot be made. | TC-034 | Open |
| GAP-16 | Post-login | No success-confirmation UI form, message text, display duration, or redirect timing. | The success confirmation can be asserted only at the requirement level. | TC-032 | Open |
| GAP-17 | Analytics | No analytics event names, payloads, destination, or validation method for login success/failure tracking. | Analytics tracking cannot be verified. | TC-054 | Open |
| GAP-18 | Support | No support-integration entry point, URL, channel, or availability rules. | Login assistance cannot be located or tested. | TC-036 | Open |
| GAP-19 | Accessibility | No ARIA label content, focus order, focus-visible styling, high-contrast toggle location, screen-reader acceptance criteria, or WCAG audit method and tooling. | Accessibility cases can assert capability, but WCAG conformance cannot be determined. | TC-044 | Open |
| GAP-20 | Visual design | No design tokens, color values, typography, spacing, screenshot baseline, theme-toggle location, or theme persistence rule. | Brand and theme cases cannot be measured objectively. | TC-013, TC-014, TC-056 | Open |
| GAP-21 | Performance | "Standard connection" is undefined; no measurement tool, location, percentile, load profile, or uptime measurement window is provided. | Load, uptime, and concurrency cases cannot be executed with a fixed pass/fail rule. | TC-003, TC-051, TC-052 | Open |
| GAP-22 | Compatibility | No supported browser, operating system, device matrix, or responsive breakpoints. | Responsive and compatibility coverage cannot be bounded. | TC-005 | Open |
| GAP-23 | Security evidence | No API documentation, backend design, database schema, audit-log specification, or security evidence to verify hashing, transport encryption, token generation, audit trails, GDPR controls, CCPA controls, or OWASP mapping. | Security and compliance cases cannot be verified from the UI. | TC-046, TC-047, TC-049, TC-050 | Open |
| GAP-24 | Legal and localization | No languages, regional formats, consent or cookie copy, privacy notices, or data-residency rules. | Localization and legal-consent coverage cannot be designed. | TC-049 | Open |
| GAP-25 | Session lifecycle | Logout and session termination are not documented anywhere in the PRD. | No logout test case is generated; the feature is not assumed. | None | Open |
| GAP-26 | Onboarding | No onboarding steps, screens, content, or completion criteria. | Post-registration onboarding cannot be tested. | TC-035 | Open |
| GAP-27 | Registration | No registration fields, validation rules, free-trial definition, or post-signup behavior. | The registration link destination can only be inferred. | TC-011 | Open |
| GAP-28 | Process | No defect severity/priority scheme, test-data reset process, execution ownership, or entry/exit criteria for test execution. | Execution governance and blocked-test handling are undefined. | All | Open |
| GAP-29 | Multi-region | No target regions, routing rules, or data-residency expectations. | Geographic distribution cannot be tested. | TC-053 | Open |
| GAP-30 | Announcement banner | No banner call to action, dismissal behavior, expiry, link target, or placement rule. | Only banner presence can be asserted. | TC-012 | Open |

### Step 3 — Generated Output

Only facts from Step 1 are used. Cases whose expected result cannot be determined are retained as **Blocked** with the exact required phrase. No execution results are claimed. TC-001A is new in version 2 and is enabled by F-41.

| TC_ID | Module | Test Case Description | PreCondition | Test Steps | Expected Result | Traceability (PRD / User Input) | Priority | Confidence |
|---|---|---|---|---|---|---|---|---|
| TC-001 | Access | Login page is served over HTTPS | None | 1) Open `app.vwo.com`. 2) Confirm it resolves to `app.wingify.com`. 3) Inspect the connection scheme. | The page is served over HTTPS using SSL/TLS. | PRD: Technical Requirements > Security Specifications > HTTPS Enforcement | P1 | Verified |
| TC-001A | Access | Legacy `app.vwo.com` URL resolves to `app.wingify.com` | None | 1) Open `app.vwo.com` in a browser. 2) Observe the resolved URL and the rendered page. | The browser resolves to `app.wingify.com` and displays the same VWO login application. | User input: GAP-01 clarification, 2026-11-13; PRD: Executive Summary | P1 | Verified |
| TC-002 | Access | HTTP request is redirected or refused | None | 1) Request the resolved login URL over HTTP. 2) Observe the response. | Inference (low confidence): The request is redirected to HTTPS or refused; the PRD requires HTTPS enforcement but does not specify redirect behavior. | PRD: Technical Requirements > Security Specifications > HTTPS Enforcement | P2 | Inference (low confidence) |
| TC-003 | Performance | Login page loads within 2 seconds | A "standard connection" definition is not provided (GAP-21) | 1) Open the login page on the agreed standard connection. 2) Measure page load time with an agreed tool. | Inference (low confidence): Page load completes within 2 seconds; the measurement method and standard connection are undefined, so pass/fail is provisional. | PRD: Technical Requirements > Performance Requirements > Page Load Speed | P1 | Inference (low confidence) |
| TC-004 | Performance | Images are compressed and CSS/JavaScript are minified | Browser developer tools are available | 1) Load the login page. 2) Inspect image, CSS, and JavaScript responses for compression and minification. | Images are served compressed and CSS/JavaScript files are minified. | PRD: Technical Requirements > Performance Requirements > Asset Optimization | P2 | Verified |
| TC-005 | UX | Login layout is responsive with touch-friendly controls | A mobile device or emulated mobile viewport; exact breakpoints are not provided (GAP-22) | 1) Open the login page on a mobile viewport. 2) Inspect layout adaptation and tap-target usability. | Inference (low confidence): The layout adapts to the mobile viewport and controls are operable by touch; breakpoints and target sizes are not specified. | PRD: User Experience Features > Responsive Design | P2 | Inference (low confidence) |
| TC-006 | UI | Email input field is present | Login page is loaded | 1) Inspect the login form. | An email address input field is present. | PRD: Current State Analysis > Standard Authentication Fields | P1 | Verified |
| TC-007 | UI | Password input field is present | Login page is loaded | 1) Inspect the login form. | A password input field is present. | PRD: Current State Analysis > Standard Authentication Fields | P1 | Verified |
| TC-008 | UI | Password entry is masked | Password field is present | 1) Enter text into the password field. 2) Observe the displayed characters. | Inference (low confidence): Entered characters are masked; the PRD names a password input field but does not state masking behavior. | PRD: Current State Analysis > Standard Authentication Fields | P2 | Inference (low confidence) |
| TC-009 | UI | Remember Me checkbox is present | Login page is loaded | 1) Inspect the login form. | A Remember Me checkbox is present. | PRD: Current State Analysis > Remember Me Functionality | P1 | Verified |
| TC-010 | UI | Account registration link is present | Login page is loaded | 1) Inspect the login form for an account registration link. | An account registration link is present. | PRD: Current State Analysis > Account Registration Link | P2 | Verified |
| TC-011 | UI | Registration link leads to free-trial signup | Registration link is present; destination is not specified (GAP-27) | 1) Activate the account registration link. 2) Observe the destination. | Inference (low confidence): The user reaches a free-trial signup path; the exact URL and flow are not specified. | PRD: Current State Analysis > Account Registration Link; User Journey > Registration Path | P2 | Inference (low confidence) |
| TC-012 | UI | Product announcement banner is present | Login page is loaded | 1) Inspect the login page for the product announcement banner. | A banner announcing the new UI launch is present. | PRD: Current State Analysis > Product Announcements | P3 | Verified |
| TC-013 | UI | Light and Dark Mode options are available | Login page is loaded; exact placement is not specified (GAP-20) | 1) Inspect the login page and announcement banner for Light and Dark Mode controls. 2) Confirm the options exist. | Inference (low confidence): Light and Dark Mode options are available; the PRD confirms theme support but does not specify where the controls are placed. | PRD: Current State Analysis > Product Announcements; Branding and Visual Design > Theme Support | P2 | Inference (low confidence) |
| TC-014 | UI | Selecting a theme changes the interface theme | Theme options are available; behavior and persistence are not specified (GAP-20) | 1) Select Light mode. 2) Select Dark mode. 3) Observe the interface. | Inference (low confidence): The interface appearance changes to the selected theme; toggle behavior, location, and persistence are not specified. | PRD: Branding and Visual Design > Theme Support | P2 | Inference (low confidence) |
| TC-015 | UX | First input field is automatically focused | Login page is loaded | 1) Load the login page. 2) Observe which element has focus. | Focus is automatically placed on the first input field. | PRD: User Experience Features > Auto-focus | P2 | Verified |
| TC-016 | UX | Form labels are clickable | Login page is loaded | 1) Click each form label. 2) Observe the associated control. | Clicking a label focuses or activates its associated form control. | PRD: User Experience Features > Clickable Labels | P2 | Verified |
| TC-017 | Validation | Field validation feedback appears on blur | Login page is loaded | 1) Enter invalid data in a field. 2) Move focus away so the field blurs. 3) Observe feedback. | Field-level validation feedback is displayed on blur. | PRD: Functional Requirements > User Input Validation > Real-time Validation | P1 | Verified |
| TC-018 | Validation | Invalid email format is rejected | Login page is loaded | 1) Enter an invalid email format. 2) Blur the field and attempt to proceed. | The email is flagged as invalid and authentication is not attempted with that value. | PRD: Functional Requirements > User Input Validation > Email Format Verification | P1 | Verified |
| TC-019 | Validation | Empty email is flagged | Login page is loaded; required-field behavior is not specified (GAP-06) | 1) Leave the email field empty. 2) Blur the field or attempt to submit. 3) Observe feedback. | Inference (low confidence): Validation feedback is shown for the empty email; the PRD does not state required-field or empty-submit behavior. | PRD: Functional Requirements > User Input Validation | P1 | Inference (low confidence) |
| TC-020 | Validation | Empty password is flagged | Login page is loaded; required-field behavior is not specified (GAP-06) | 1) Leave the password field empty. 2) Blur the field or attempt to submit. 3) Observe feedback. | Inference (low confidence): Validation feedback is shown for the empty password; the PRD does not state required-field or empty-submit behavior. | PRD: Functional Requirements > User Input Validation | P1 | Inference (low confidence) |
| TC-021 | Validation | Email field requests an email keyboard on mobile | A mobile device is available | 1) Focus the email field on a mobile device. 2) Observe the keyboard type. | A specialized email keyboard is presented. | PRD: Functional Requirements > User Input Validation > Email Format Verification | P2 | Verified |
| TC-022 | Validation | Password strength indicator is displayed | Login page is loaded | 1) Enter text into the password field. 2) Observe the strength indicator. | A visual password strength and requirements indicator is displayed. | PRD: Functional Requirements > User Input Validation > Password Strength Indicators | P2 | Verified |
| TC-023 | Validation | Password strength indicator updates with input | Indicator is present; strength rules are not specified (GAP-04) | 1) Enter a weak password. 2) Replace it with a stronger password. 3) Observe the indicator. | Inference (low confidence): The indicator changes as the password changes; strength rules and scoring are not specified. | PRD: Functional Requirements > User Input Validation > Password Strength Indicators | P3 | Inference (low confidence) |
| TC-024 | Authentication | Valid email and password authenticate successfully | Valid account credentials are not provided (GAP-02) | 1) Enter a valid email and valid password. 2) Submit the login form. 3) Observe the result. | Authentication succeeds and the user is logged in. | PRD: Functional Requirements > Authentication System > Primary Authentication | P1 | Verified |
| TC-025 | Authentication | Invalid password shows a clear, actionable error | Invalid credential data is not provided (GAP-02); exact message text is not specified (GAP-05) | 1) Enter a valid email and an invalid password. 2) Submit the login form. 3) Observe the error. | Authentication fails and a clear, actionable error message is displayed; exact message text is not asserted. | PRD: Functional Requirements > User Input Validation > Error Handling | P1 | Verified |
| TC-026 | Authentication | Loading state is shown during authentication | Credentials and a reachable environment are available (GAP-02) | 1) Submit the login form. 2) Observe the interface while authentication is processing. | A loading state provides clear feedback during authentication processing. | PRD: User Experience Features > Interface Design > Loading States | P2 | Verified |
| TC-027 | Authentication | Successful login transitions to the main dashboard | Valid credentials are not provided (GAP-02) | 1) Log in with valid credentials. 2) Observe the destination. | The user is transitioned to the VWO main dashboard. | PRD: Technical Requirements > Integration Requirements > VWO Core Platform; Returning User > Dashboard Transition | P1 | Verified |
| TC-028 | Authentication | Remember Me enables a persistent session | An account is available; persistence duration is not specified (GAP-08) | 1) Select Remember Me. 2) Log in. 3) Close and reopen the browser, then revisit the login URL. | Inference (low confidence): The session persists across browser restarts; duration, scope, and revocation are not specified. | PRD: Current State Analysis > Remember Me Functionality; Returning User > Quick Access | P2 | Inference (low confidence) |
| TC-029 | Session | Configured session timeout is enforced | Timeout value and configuration are not specified (GAP-07) | 1) Log in. 2) Remain idle for the configured timeout. 3) Attempt an authenticated action. | Insufficient information to determine. (GAP-07: timeout value, idle versus absolute behavior, warning period, and configurability are not specified.) | PRD: Functional Requirements > Authentication System > Session Management | P1 | Blocked |
| TC-030 | Authentication | 2FA challenge is presented when enabled | A 2FA-enabled account and factor type are not specified (GAP-09) | 1) Log in with a 2FA-enabled account. 2) Complete the second factor. | Insufficient information to determine. (GAP-09: factor type, enrollment flow, challenge UI, and recovery codes are not specified.) | PRD: Functional Requirements > Authentication System > Multi-Factor Authentication | P1 | Blocked |
| TC-031 | Authentication | Enterprise SSO login succeeds for an organizational account | An SSO-configured account and IdP metadata are not provided (GAP-10) | 1) Initiate SSO login. 2) Authenticate through the organizational identity provider. | Insufficient information to determine. (GAP-10: SAML or OAuth configuration, IdP metadata, provisioning, and error handling are not specified.) | PRD: Functional Requirements > Authentication System > Single Sign-On; Third-Party Services > Enterprise SSO | P1 | Blocked |
| TC-032 | Authentication | Success confirmation is displayed after login | Valid credentials are available (GAP-02); confirmation UI details are not specified (GAP-16) | 1) Log in successfully. 2) Observe the confirmation. | A clear indication of successful login completion is displayed. | PRD: User Journey and Flow > Error Recovery Flow > Success Confirmation | P3 | Verified |
| TC-033 | Recovery | Multiple account-recovery options are available | Recovery options other than email are not specified (GAP-13) | 1) Open the login or account-recovery area. 2) Enumerate the available recovery options. | Insufficient information to determine. (GAP-13: the PRD says multiple options including email-based reset but names only email-based reset.) | PRD: User Journey and Flow > Error Recovery Flow > Recovery Options; Functional Requirements > Password Recovery | P2 | Blocked |
| TC-034 | UX | Recent activity context is preserved | A prior session and dashboard UI details are not specified (GAP-15) | 1) Log in after a prior session. 2) Inspect the dashboard for recent activity. | Insufficient information to determine. (GAP-15: dashboard content and the definition of recent activity are not specified.) | PRD: User Journey and Flow > Returning User Experience > Recent Activity | P3 | Blocked |
| TC-035 | UX | Guided onboarding is provided after registration | Registration and onboarding content are not specified (GAP-26) | 1) Register as a new user. 2) Observe the post-registration experience. | Insufficient information to determine. (GAP-26: onboarding steps, content, and completion criteria are not specified.) | PRD: User Journey and Flow > New User Experience > Onboarding | P3 | Blocked |
| TC-036 | Support | Login assistance is available through the support integration | The support entry point is not specified (GAP-18) | 1) Locate the login-assistance entry point. 2) Open the support channel. | Insufficient information to determine. (GAP-18: the support integration entry point, URL, and availability are not specified.) | PRD: Technical Requirements > Integration Requirements > Customer Support | P3 | Blocked |
| TC-037 | Password Management | Forgot Password entry point is available | Login page is loaded; control type and placement are not specified (GAP-13) | 1) Inspect the login page for a password-reset entry point. 2) Activate it if present. | Inference (low confidence): A password-reset entry point is available; the PRD defines a Forgot Password flow but does not specify the control type or placement. | PRD: Functional Requirements > Password Management > Forgot Password Flow | P1 | Inference (low confidence) |
| TC-038 | Password Management | Email-based password reset is dispatched | A registered account and access to its inbox are available (GAP-02) | 1) Request a password reset for a registered email address. 2) Check the registered inbox. | A password reset email is dispatched to the registered address. | PRD: Functional Requirements > Password Management > Password Recovery | P1 | Verified |
| TC-039 | Password Management | Password reset token is secure | Reset token properties are not specified (GAP-12) | 1) Request a reset. 2) Inspect the token and reset link properties. | Insufficient information to determine. (GAP-12: token format, entropy, expiry, single-use behavior, and invalidation are not specified.) | PRD: Functional Requirements > Password Management > Forgot Password Flow | P1 | Blocked |
| TC-040 | Password Management | Password complexity requirements are enforced | Password policy rules are not specified (GAP-04) | 1) Attempt to set passwords that meet and do not meet complexity. 2) Submit each attempt. | Insufficient information to determine. (GAP-04: minimum and maximum length, character classes, reuse, and strength scoring are not specified.) | PRD: Functional Requirements > Password Management > Password Requirements | P1 | Blocked |
| TC-041 | Accessibility | Form controls expose ARIA labels | Login page is loaded; assistive technology or accessibility inspection tools are available | 1) Inspect form controls with accessibility tools. 2) Verify accessible names and roles. | Form controls expose ARIA labels or equivalent accessible names. | PRD: User Experience Features > Accessibility Features > Screen Reader Support | P2 | Verified |
| TC-042 | Accessibility | Full keyboard navigation works for interactive elements | Login page is loaded | 1) Navigate with Tab and Shift+Tab. 2) Activate controls with Enter or Space. 3) Reach every interactive element. | All interactive elements are reachable and operable by keyboard. | PRD: User Experience Features > Accessibility Features > Keyboard Navigation | P2 | Verified |
| TC-043 | Accessibility | High contrast mode option is available | Login page is loaded; option placement is not specified (GAP-19) | 1) Locate the high contrast option. 2) Enable it. 3) Observe the interface. | A high contrast mode option is available. | PRD: User Experience Features > Accessibility Features > High Contrast Mode | P2 | Verified |
| TC-044 | Accessibility | WCAG 2.1 AA conformance is demonstrated | Audit method, tooling, and acceptance criteria are not specified (GAP-19) | 1) Run an approved WCAG 2.1 AA audit. 2) Record violations. | Insufficient information to determine. (GAP-19: the audit method, tooling, and acceptance criteria are not specified.) | PRD: Compliance and Standards > Accessibility Standards > WCAG 2.1 AA | P2 | Blocked |
| TC-045 | Security | Authentication data is encrypted in transit | Login page is loaded; network capture is available | 1) Submit credentials. 2) Inspect the transport of the authentication request. | Authentication data is transmitted over SSL/TLS or an equivalent encrypted transport. | PRD: Technical Requirements > Security Specifications > Encryption; HTTPS Enforcement | P1 | Verified |
| TC-046 | Security | Passwords are stored using industry-standard hashing | Backend, storage, or API documentation is not provided (GAP-23) | 1) Inspect the storage or API documentation. 2) Verify the password hashing algorithm and salt handling. | Insufficient information to determine. (GAP-23: no backend, API, or storage documentation is provided.) | PRD: Technical Requirements > Security Specifications > Secure Storage | P1 | Blocked |
| TC-047 | Security | Session tokens are securely generated and managed | Token generation and management details are not provided (GAP-23) | 1) Inspect session-token issuance and handling. 2) Verify entropy, rotation, and storage. | Insufficient information to determine. (GAP-23: token generation, rotation, and storage details are not provided.) | PRD: Technical Requirements > Security Specifications > Session Security | P1 | Blocked |
| TC-048 | Security | Brute-force attempts are rate-limited | Threshold, time window, and response are not specified (GAP-14) | 1) Repeat failed login attempts. 2) Observe whether throttling or lockout occurs. | Insufficient information to determine. (GAP-14: threshold, window, response behavior, lockout duration, and unlock path are not specified.) | PRD: Technical Requirements > Compliance Standards > Rate Limiting | P1 | Blocked |
| TC-049 | Compliance | GDPR and CCPA data-handling controls are demonstrated | Data-flow, consent, and legal documentation is not provided (GAP-23, GAP-24) | 1) Review data handling against GDPR and CCPA controls. 2) Collect evidence. | Insufficient information to determine. (GAP-23 and GAP-24: no data-flow, consent, privacy-notice, or legal documentation is provided.) | PRD: Technical Requirements > Compliance Standards; Compliance and Standards > Data Protection | P2 | Blocked |
| TC-050 | Compliance | OWASP authentication guideline compliance is demonstrated | No OWASP control mapping or evidence is provided (GAP-23) | 1) Map implemented controls to OWASP authentication guidance. 2) Review evidence. | Insufficient information to determine. (GAP-23: no control mapping or security evidence is provided.) | PRD: Compliance and Standards > Security Standards > OWASP | P2 | Blocked |
| TC-051 | Performance | 99.9% uptime is demonstrated | The measurement window and method are not specified (GAP-21) | 1) Monitor availability over an agreed window. 2) Calculate uptime. | Insufficient information to determine. (GAP-21: the uptime measurement window and method are not specified.) | PRD: Technical Requirements > Performance Requirements > High Availability | P2 | Blocked |
| TC-052 | Performance | Thousands of simultaneous login attempts are supported | The load profile and success thresholds are not specified (GAP-21) | 1) Execute an agreed load profile. 2) Measure login success rate and response time. | Insufficient information to determine. (GAP-21: concurrency, duration, and success thresholds are not specified.) | PRD: Technical Requirements > Performance Requirements > Concurrent Users | P2 | Blocked |
| TC-053 | Performance | Multi-region deployment is verified | Target regions and routing rules are not specified (GAP-29) | 1) Test from each target region. 2) Compare availability and performance. | Insufficient information to determine. (GAP-29: target regions, routing rules, and data-residency expectations are not specified.) | PRD: Technical Requirements > Performance Requirements > Geographic Distribution | P3 | Blocked |
| TC-054 | Integration | Login success and failure analytics are tracked | Event names, payloads, and destination are not specified (GAP-17) | 1) Perform a successful login and a failed login. 2) Inspect the analytics events. | Insufficient information to determine. (GAP-17: event names, payloads, destination, and validation method are not specified.) | PRD: Technical Requirements > Integration Requirements > Analytics Integration | P2 | Blocked |
| TC-055 | Integration | Social login through Google or Microsoft is available | Social login is optional and no provider configuration is provided (GAP-11) | 1) Locate social login options. 2) Attempt authentication through a provider. | Insufficient information to determine. (GAP-11: the PRD marks social login optional and provides no provider configuration or account-linking rules.) | PRD: Technical Requirements > Integration Requirements > Social Login | P3 | Blocked |
| TC-056 | Visual | Login interface is consistent with the VWO design system | No design tokens, visual baseline, or acceptance criteria are provided (GAP-20) | 1) Compare the login page with the VWO design system and approved visual baseline. | Insufficient information to determine. (GAP-20: no design tokens, color or typography specifications, or visual baseline are provided.) | PRD: User Experience Features > Branding and Visual Design > Brand Consistency | P3 | Blocked |

### Step 4 — Self-Validation Check

| Check | Result | Evidence |
|---|---|---|
| Every test case has a traceability entry | PASS | All 57 rows contain a populated `Traceability` column. |
| Every Verified expected result is traceable to a fact in Step 1 | PASS | Verified cases map to F-01 through F-41; TC-001A maps to F-41 (user input). |
| No feature absent from the PRD or user input is tested as a current requirement | PASS | Logout is not tested (GAP-25); future enhancements are excluded (F-40). |
| No error message text, selector, credential, URL, or API is invented | PASS | Exact messages, selectors, and credentials are absent from all cells. Blocked cases state the missing input. |
| Unknown expected results use the exact required phrase | PASS | All 21 Blocked cases begin with `Insufficient information to determine.` |
| Inferred details are labelled with the exact required phrase | PASS | All 12 Inference cases begin with `Inference (low confidence)`. |
| No fabricated execution results or statuses | PASS | No actual result, pass/fail status, or QA name is claimed. |
| Blocked cases are mapped to a gap | PASS | Every Blocked case cites at least one open GAP ID. |
| Resolved gaps are not used as blockers | PASS | GAP-01 is marked Resolved and is not cited by any Blocked case. |
| Counts are internally consistent | PASS | 57 total = 24 Verified + 12 Inference + 21 Blocked; 30 gaps = 1 Resolved + 29 Open. |

### Summary Counts

| Metric | Count |
|---|---:|
| Total test cases | 57 |
| Verified test cases | 24 |
| Inference (low confidence) test cases | 12 |
| Blocked test cases | 21 |
| Gaps found | 30 |
| Gaps resolved | 1 |
| Gaps open | 29 |

### Coverage by Module

| Module | Test Cases | Verified | Inference | Blocked |
|---|---:|---:|---:|---:|
| Access and page load | 6 | 3 | 3 | 0 |
| UI elements and theme | 9 | 5 | 4 | 0 |
| Validation and UX | 9 | 6 | 3 | 0 |
| Authentication | 9 | 5 | 1 | 3 |
| Recovery and post-login UX | 4 | 0 | 0 | 4 |
| Password management | 4 | 1 | 1 | 2 |
| Accessibility | 4 | 3 | 0 | 1 |
| Security | 6 | 1 | 0 | 5 |
| Performance and scalability | 3 | 0 | 0 | 3 |
| Integration and visual | 3 | 0 | 0 | 3 |
| **Total** | **57** | **24** | **12** | **21** |

---

## 3. Execution Notes

### Executable now, subject to test data

The 24 Verified cases can be executed once test data is supplied where relevant (GAP-02). The public environment URL is confirmed: `app.vwo.com` resolves to `app.wingify.com`, and TC-001A verifies that resolution. Staging and tenant-specific targets are still unconfirmed, but they do not block public production URL tests. The positive authentication cases TC-024, TC-027, and TC-038 are Verified at the requirement level but cannot run without credentials.

### Not executable from the PRD and current inputs

- Session timeout, 2FA, SSO, rate limiting, and password-reset token security are Blocked because the PRD states the capability but not the executable parameters.
- Security storage, hashing, token generation, audit trails, GDPR/CCPA controls, and OWASP mapping are Blocked because they require backend or API evidence that was not provided.
- Performance, uptime, concurrency, multi-region, analytics, social login, onboarding, support integration, and visual brand conformance are Blocked for the same reason.
- Logout is not documented in the PRD and therefore has no test case; it is recorded as GAP-25 rather than assumed.

### Impact of the GAP-01 clarification

- GAP-01 is closed: the two URLs are the same application, and `app.vwo.com` now resolves to `app.wingify.com`.
- One verified test case was added: TC-001A.
- No Blocked case was unblocked, because no Blocked case depended on GAP-01 alone.
- 29 gaps remain open. The environment ambiguity is gone, but the test suite is only marginally more complete.

### What the PRD does not contain

The PRD is a high-level product document. It does not contain UI screenshots, field labels, element identifiers, exact validation or error text, password rules, session values, API contracts, test accounts, browser support, or execution evidence. Under the anti-hallucination rules, those omissions are reported as gaps rather than filled with "typical" behavior.

---

## 4. Version 2 Change Log

| Item | Version 1 | Version 2 | Change |
|---|---|---|---|
| Environment URL (GAP-01) | Open | Resolved via user input | Closed |
| Verified facts | 40 | 41 | +1 |
| Total test cases | 56 | 57 | +1 |
| Verified test cases | 23 | 24 | +1 |
| Inference test cases | 12 | 12 | 0 |
| Blocked test cases | 21 | 21 | 0 |
| Open gaps | 30 | 29 | -1 |
| New test case | None | TC-001A | Added |
| Environment ambiguity | Present | Resolved | Closed |

**Assessment:** The clarification produced a better test suite at the margin, not a materially better one. It removed an environment ambiguity and added one executable, verified test case. It did not unblock any of the 21 blocked cases, because those cases depend on other missing inputs such as test accounts, error messages, password policy, session values, 2FA/SSO configuration, performance profiles, and backend evidence.
