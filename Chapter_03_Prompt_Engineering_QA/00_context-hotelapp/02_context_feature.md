# Feature Context: Login (Existing User Login)

## Overview
The login form is the entry point to Build 2 of the Adactin Hotel Reservation System. A registered user submits a username and password. Client-side validation (`js/login.js`, `log_validate()`) blocks submission when either field is blank. On valid credentials the user is redirected to the Search Hotel page (`SearchHotel.php`); invalid credentials leave the user on the login page with an authentication error. All behaviour below was verified against the live Build 2 application.

## User Stories
- As a registered user, I want to log in with valid credentials so that I can search for and book hotels.
- As a user, I want a clear message when a required field is empty so that I can correct it and retry.
- As a user, I want invalid credentials rejected so that my account and booking data stay protected.

## Acceptance Criteria
- [ ] Valid credentials redirect to the Search Hotel page.
- [ ] Invalid credentials do not grant access and show the approved authentication error.
- [ ] Username and Password are mandatory.
- [ ] Blank username + Login (JavaScript enabled) shows "Enter Username".
- [ ] Blank password + Login (JavaScript enabled) shows "Enter Password".
- [ ] Both fields blank + Login (JavaScript enabled) shows "Enter Username" (username check runs first).
- [ ] "Forgot Password?" opens `ForgotPassword.php`; "New User Register Here" opens `Register.php`.

## API Endpoints (if applicable)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/HotelAppBuild2/index.php` | Render login form (sets session cookie) |
| POST | `/HotelAppBuild2/index.php` | Submit login form (fields: `username`, `password`, `login`) |
| GET | `/HotelAppBuild2/ForgotPassword.php` | Password recovery page |
| GET/POST | `/HotelAppBuild2/Register.php` | New user registration page |

## UI Elements
| Element | Identifier |
|---------|------------|
| Username input | `id="username"`, `name="username"`, `class="login_input"` |
| Password input | `id="password"`, `name="password"`, `type="password"`, `class="login_input"` |
| Login button | `id="login"`, `name="login"`, `type="submit"`, `value="Login"` |
| Username error span | `id="username_span"`, `class="login_error"` |
| Password error span | `id="password_span"`, `class="login_error"` |
| Authentication error container | `div.auth_error` |
| Forgot Password link | `ForgotPassword.php` |
| New User Register link | `Register.php` |
| Form | `name="login_form"`, `id="login_form"`, `method="post"` |

## Validation Rules
| Field | Rule |
|-------|------|
| Username | Mandatory. Client-side check in `log_validate()`; message "Enter Username". |
| Password | Mandatory. Client-side check in `log_validate()`; message "Enter Password". |
| Credential pair | Must match a registered account (server-side). Invalid, blank-username, and blank-password POSTs all return the same authentication error (verified by bypassing JavaScript). |
| Field length / character rules | Not specified for login. [NEEDS CLARIFICATION] |
| Case sensitivity of username/password | Not specified. [NEEDS CLARIFICATION] |

## Error Messages
| Trigger | Message |
|---------|---------|
| Blank username (JS enabled) | "Enter Username" (client-side) |
| Blank password (JS enabled) | "Enter Password" (client-side) |
| Both blank (JS enabled) | "Enter Username" (client-side, first check wins) |
| Invalid credentials | "Invalid Login details or Your Password might have expired. Click here to reset your password" (server-side, `div.auth_error`) |
| Blank username/password submitted with JS bypassed | Same "Invalid Login details…" message (server-side) |
| Successful login | No message — redirect to `SearchHotel.php` |

## Notes
- No HTML5 `required` attributes are used; blank-field messages are JavaScript-only. Server-side blank submissions return the generic invalid-credentials message (verified).
- "Click here" in the invalid-credentials message is a hyperlink inside `div.auth_error`.
- Account lockout policy, session timeout, and password complexity rules are not documented: [NEEDS CLARIFICATION].
