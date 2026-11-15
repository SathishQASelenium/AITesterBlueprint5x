# Constraints & Rules

## MUST Follow
- Use ONLY information from the provided documents and observed live application behaviour.
- Use the exact on-screen message strings as the test oracle.
- Target Build 2 (`/HotelAppBuild2/`) when the expected result is a pass.
- Use dummy test data only; never record real credentials or real card numbers.
- Keep credentials in `00_context-hotelapp/.env` (gitignored); never copy them into context documents, reports, logs, or generated test code examples.
- Distinguish "observed on the live page" from "not verified".
- Treat login as a prerequisite for Search Hotel, Select Hotel, Book A Hotel, Booking Confirmation, Booked Itinerary, Change Password, and Logout.

## MUST NOT Do
- Invent error codes or messages.
- Assume validation rules not documented (e.g. password policy, username case sensitivity, login field length).
- Assume lockout policy, session timeout, or "remember me" behaviour.
- Create fictional API endpoints or invent the SOAP/REST contract.
- Assume `BookingConfirm.php` contents from memory — it was not captured live (submitting a booking creates a real order in the shared environment).
- Record, reuse, or expose real user credentials or personal data.

## Verified vs. Not Verified
| Area | Status |
|------|--------|
| Login page, fields, messages, redirect | Verified live |
| Blank-field server-side behaviour | Verified live (returns invalid-credentials message) |
| Search Hotel fields and dropdown values | Verified live |
| Select Hotel columns and messages | Verified live |
| Book A Hotel fields and validation messages | Verified live (form not submitted) |
| Booked Itinerary columns and structure | Verified live |
| Change Password fields and messages | Verified live |
| Logout message | Verified live |
| Booking Confirmation page | Verified live (real booking created, Order No captured) |
| Database, dev/staging/prod environments | Not disclosed |
| SOAP/REST contract | Not verified (endpoint 504) |

## Output Rules
- Use the specified format exactly.
- Include all required fields.
- Mark assumptions with "[ASSUMPTION]".
- Label any proposed thresholds, browser matrices, or exit percentages as "Recommendation".
- Reference the application as "Adactin Hotel Reservation System (Build 2)" and the module by its page name.
