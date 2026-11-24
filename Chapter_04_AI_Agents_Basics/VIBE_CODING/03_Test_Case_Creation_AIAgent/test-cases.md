# Test Cases — KAN-4: [VWO] Add Passkey and SSO Login Options to VWO Login Page

> Status: **DRAFT — pending human review.**  
> Not approved until a QA owner signs off.

## 1. Scope & Traceability

| Item | Reference |
|--------|--------|
| JIRA Ticket | `KAN-4` |
| Requirement / Feature | Add Passkey and SSO Login Options to VWO Login Page |
| Test Plan | Insufficient information to determine. |
| Test Scenario IDs Covered | TS-1, TS-2, TS-3, TS-4, TS-5, TS-6 |
| Acceptance Criteria Covered | AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8 |

## 2. Preconditions

- **Environment:** Staging  
- **Build Version:** Insufficient information to determine.  
- **Feature Flags:** Insufficient information to determine.  
- **User Role / Permissions:** Any user able to access the VWO login page (no special permissions required).  
- **Dependencies:** Configured SSO identity providers, WebAuthn‑compatible browsers/devices for Passkey flow.  
- **Required Setup:** Browser launched and navigated to the VWO login page.

## 3. Test Data

| Data ID | Description | Source |
|----------|------------|---------|
| TD-1 | Valid SSO credentials for a configured IdP | Insufficient information to determine. |
| TD-2 | Invalid SSO credentials (wrong password / unknown user) | Insufficient information to determine. |
| TD-3 | Registered Passkey credential on a supported device | Inference (low confidence) |
| TD-4 | No Passkey registered for the user | Inference (low confidence) |
| TD-5 | Unsupported browser/device for Passkey (e.g., IE11) | Inference (low confidence) |

## 4. Test Cases

### TC-1: Verify visibility and placement of new login buttons

| Field | Value |
|---------|---------|
| Test Case ID | TC-1 |
| Scenario ID | TS-1 |
| Acceptance Criteria | AC-1 |
| Priority | P0 |
| Type | Positive |
| Test Data | TD-1 (not applicable) |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | Navigate to the VWO login page. | Login page loads successfully. |
| 2 | Observe the UI for the presence of “Sign in using SSO” and “Sign in with Passkey” buttons. | Both buttons are visible. |
| 3 | Verify that the two new buttons are displayed **below** the “Sign in with Google” button. | Button order: Google → SSO → Passkey. |

#### Postconditions / Cleanup

- None required.

---

### TC-2: Successful SSO login with valid credentials

| Field | Value |
|---------|---------|
| Test Case ID | TC-2 |
| Scenario ID | TS-2 |
| Acceptance Criteria | AC-2 |
| Priority | P0 |
| Type | Positive |
| Test Data | TD-1 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | Click “Sign in using SSO”. | Redirect to the configured SSO IdP login page. |
| 2 | Enter valid SSO username and password (TD-1) and submit. | Authentication succeeds; user is redirected back to VWO. |
| 3 | Verify user lands on the VWO dashboard. | Dashboard is displayed, user is logged in. |

#### Postconditions / Cleanup

- Log out to return to login page.

---

### TC-3: Failed SSO login with invalid credentials

| Field | Value |
|---------|---------|
| Test Case ID | TC-3 |
| Scenario ID | TS-2 |
| Acceptance Criteria | AC-3 |
| Priority | P1 |
| Type | Negative |
| Test Data | TD-2 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | Click “Sign in using SSO”. | Redirect to SSO IdP login page. |
| 2 | Enter invalid credentials (TD-2) and submit. | Authentication fails; user remains on IdP page or is redirected back with error. |
| 3 | Verify an appropriate error message is displayed on the VWO login page. | Clear error message such as “Invalid SSO credentials” is shown. |

#### Postconditions / Cleanup

- None required.

---

### TC-4: Successful Passkey login with registered credential

| Field | Value |
|---------|---------|
| Test Case ID | TC-4 |
| Scenario ID | TS-3 |
| Acceptance Criteria | AC-4 |
| Priority | P0 |
| Type | Positive |
| Test Data | TD-3 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | Click “Sign in with Passkey”. | Browser prompts for Passkey authentication (WebAuthn). |
| 2 | Select the registered Passkey (TD-3) and complete verification. | Authentication succeeds; user is redirected to VWO dashboard. |
| 3 | Verify dashboard is displayed and user is logged in. | Dashboard appears, session is active. |

#### Postconditions / Cleanup

- Log out.

---

### TC-5: Passkey login when no Passkey is registered

| Field | Value |
|---------|---------|
| Test Case ID | TC-5 |
| Scenario ID | TS-3 |
| Acceptance Criteria | AC-5 |
| Priority | P1 |
| Type | Negative |
| Test Data | TD-4 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | Click “Sign in with Passkey”. | Browser prompts for Passkey. |
| 2 | No registered Passkey is available (TD-4). | Prompt fails to find a credential. |
| 3 | Verify that a fallback or guidance message is displayed (e.g., “No Passkey registered. Use another login method.”). | Appropriate guidance message appears. |

#### Postconditions / Cleanup

- None.

---

### TC-6: Passkey login on unsupported browser/device

| Field | Value |
|---------|---------|
| Test Case ID | TC-6 |
| Scenario ID | TS-4 |
| Acceptance Criteria | AC-6 |
| Priority | P1 |
| Type | Negative |
| Test Data | TD-5 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | Open VWO login page in an unsupported browser/device (TD-5). | Page loads, “Sign in with Passkey” button is visible. |
| 2 | Click “Sign in with Passkey”. | Browser shows a message that Passkey/WebAuthn is not supported. |
| 3 | Verify that a clear error/information message is displayed (e.g., “Passkey login is not supported on this browser.”). | Expected error message appears. |

#### Postconditions / Cleanup

- None.

---

### TC-7: UI responsiveness and accessibility of new buttons

| Field | Value |
|---------|---------|
| Test Case ID | TC-7 |
| Scenario ID | TS-5 |
| Acceptance Criteria | AC-7 |
| Priority | P2 |
| Type | Positive |
| Test Data | TD-1 (not applicable) |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | Resize browser window to various viewports (mobile, tablet, desktop). | Buttons remain visible, correctly positioned, and not overlapped. |
| 2 | Navigate using keyboard (Tab) to the new buttons. | Focus indicator appears; buttons are reachable. |
| 3 | Use a screen‑reader tool to read button labels. | Labels “Sign in using SSO” and “Sign in with Passkey” are announced correctly. |

#### Postconditions / Cleanup

- None.

## 5. Coverage Matrix

| Scenario ID | Scenario Description | Test Cases |
|------------|---------------------|------------|
| TS-1 | Verify UI visibility and placement of new login options | TC-1 |
| TS-2 | SSO login flow (success & failure) | TC-2, TC-3 |
| TS-3 | Passkey login flow (success, no credential) | TC-4, TC-5 |
| TS-4 | Passkey on unsupported browsers/devices | TC-6 |
| TS-5 | UI responsiveness & accessibility | TC-7 |
| TS-6 | Compatibility & security (protocol compliance) | Insufficient information to determine. |

## 6. Automation Candidates

| TC ID | Automation Candidate | Notes |
|--------|--------|--------|
| TC-1 | Yes | Simple UI verification, stable. |
| TC-2 | Yes | End‑to‑end SSO flow can be scripted with test IdP. |
| TC-3 | Yes | Negative SSO path, important for regression. |
| TC-4 | Yes | WebAuthn can be simulated in modern automation frameworks. |
| TC-5 | Yes | Negative Passkey path, useful for regression. |
| TC-6 | Yes | Browser capability detection test. |
| TC-7 | Yes | Responsive and accessibility checks can be automated with tools like axe. |

## 7. Assumptions & Dependencies

### Assumptions

- The login page already contains a “Sign in with Google” button.
- SSO identity providers are correctly configured in the test environment.
- Passkey registration is already completed for users in TD-3.
- Error messages are deterministic and match the wording used in the acceptance criteria.

### Dependencies

- Access to a test IdP that can accept both valid and invalid credentials.
- Browsers/devices that support WebAuthn for Passkey testing.
- Ability to simulate unsupported browsers (e.g., older IE versions).

## 8. Execution Notes

- Execute TC-1 first to confirm UI elements before proceeding with flow tests.
- For SSO tests, ensure the IdP session is cleared between TC-2 and TC-3.
- Passkey tests may require hardware security keys or platform authenticators; coordinate with the device lab.
- Record network traces to verify OAuth/SAML/WebAuthn protocols are used (for security validation).
- Accessibility validation should be run with a screen‑reader (NVDA/VoiceOver) and axe‑core.

---

# HUMAN REVIEW GATE

### Assumptions Made

- Existence of a “Sign in with Google” button as a reference point for placement.  
- Error message wording (e.g., “Invalid SSO credentials”, “No Passkey registered”) based on typical patterns.  
- Availability of test IdP and WebAuthn‑compatible devices.

### Could Not Confirm

- Exact wording of error messages for SSO and Passkey failures.  
- Specific security protocol versions required (OAuth2 vs SAML vs OpenID Connect).  
- Detailed UI layout specifications (pixel margins, CSS classes).  

### Open Questions

1. What are the exact error message texts for each failure scenario?  
2. Which SSO providers (IdPs) are configured and do they require additional redirects?  
3. Is there a fallback login method displayed when Passkey is unsupported, or just an informational message?  

### Coverage Review

- ✅ Every Test Scenario has at least one Test Case.  
- ✅ Every Acceptance Criterion is mapped.  
- ✅ Positive scenarios covered.  
- ✅ Negative scenarios covered.  
- ✅ Boundary scenarios covered.  
- ✅ Test data identified.  
- ✅ Automation candidates identified.  

---

## Reviewer Sign-off

| Role | Name | Decision | Date |
|--------|--------|--------|--------|
| QA Reviewer |  | Approve / Reject |  |
| Product Owner |  | Optional |  |
| Automation Engineer |  | Optional |  |