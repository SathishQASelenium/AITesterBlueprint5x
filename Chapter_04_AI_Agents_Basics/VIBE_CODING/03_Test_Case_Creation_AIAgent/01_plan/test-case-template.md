# Test Cases — <JIRA-KEY>: <title>

> Status: **DRAFT — pending human review.**  
> Not approved until a QA owner signs off.

## 1. Scope & Traceability

| Item | Reference |
|--------|--------|
| JIRA Ticket | `<JIRA-KEY>` |
| Requirement / Feature | `<Title>` |
| Test Plan | `<Link / Reference>` |
| Test Scenario IDs Covered | TS-1, TS-2, TS-3 |
| Acceptance Criteria Covered | AC-1, AC-2, AC-3 |

## 2. Preconditions

- **Environment:** `<QA / Staging / UAT>`
- **Build Version:** `<Version>`
- **Feature Flags:** `<Flags if applicable>`
- **User Role / Permissions:** `<Role>`
- **Dependencies:** `<External systems, APIs, services>`
- **Required Setup:** `<Any prerequisite configuration>`

## 3. Test Data

| Data ID | Description | Source |
|----------|------------|---------|
| TD-1 | Valid test data set | |
| TD-2 | Invalid test data set | |
| TD-3 | Boundary value data set | |

## 4. Test Cases

### TC-1: <Test Case Title>

| Field | Value |
|---------|---------|
| Test Case ID | TC-1 |
| Scenario ID | TS-1 |
| Acceptance Criteria | AC-1 |
| Priority | P0 |
| Type | Positive |
| Test Data | TD-1 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | | |
| 2 | | |
| 3 | | |

#### Postconditions / Cleanup

- Cleanup activities if required.

---

### TC-2: <Test Case Title>

| Field | Value |
|---------|---------|
| Test Case ID | TC-2 |
| Scenario ID | TS-1 |
| Acceptance Criteria | AC-1 |
| Priority | P0 |
| Type | Negative |
| Test Data | TD-2 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | | |
| 2 | | |
| 3 | | |

#### Postconditions / Cleanup

- Cleanup activities if required.

---

### TC-3: <Test Case Title>

| Field | Value |
|---------|---------|
| Test Case ID | TC-3 |
| Scenario ID | TS-1 |
| Acceptance Criteria | AC-1 |
| Priority | P1 |
| Type | Boundary |
| Test Data | TD-3 |

#### Steps

| Step | Action | Expected Result |
|--------|--------|--------|
| 1 | | |
| 2 | | |
| 3 | | |

#### Postconditions / Cleanup

- Cleanup activities if required.

## 5. Coverage Matrix

| Scenario ID | Scenario Description | Test Cases |
|------------|---------------------|------------|
| TS-1 | | TC-1, TC-2, TC-3 |
| TS-2 | | |
| TS-3 | | |

## 6. Automation Candidates

| TC ID | Automation Candidate | Notes |
|--------|--------|--------|
| TC-1 | Yes | Stable path |
| TC-2 | Yes | Regression critical |
| TC-3 | No | One-time validation |

## 7. Assumptions & Dependencies

### Assumptions

- Requirement details are final and approved.
- Acceptance criteria are complete.
- Test environment mirrors production behaviour.

### Dependencies

- External APIs available.
- Feature flags enabled.
- Required user permissions configured.

## 8. Execution Notes

- Execution sequence if required.
- Known limitations.
- Special validation checkpoints.
- Monitoring/log validation requirements.

---

# HUMAN REVIEW GATE

### Assumptions Made

- `<List assumptions made while deriving expected results>`

### Could Not Confirm

- `<Expected results requiring clarification>`
- `<Missing acceptance criteria>`
- `<Undefined business rules>`

### Open Questions

1. ?
2. ?
3. ?

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
| QA Reviewer | | Approve / Reject | |
| Product Owner | | Optional | |
| Automation Engineer | | Optional | |
