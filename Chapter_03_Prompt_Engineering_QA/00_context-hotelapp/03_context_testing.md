# Testing Context

## Scope
- **In Scope:**
  - Login module on Build 2 (valid, invalid, blank username, blank password, both blank).
  - Post-login navigation to the Search Hotel page and the authenticated navigation shell.
  - Search Hotel → Select Hotel → Book A Hotel → Booking Confirmation → Booked Itinerary flow.
  - Booked Itinerary (view, search by Order Id, cancel) and Change Password.
  - Supporting entry points: New User Registration (`Register.php`) and Forgot Password (`ForgotPassword.php`).
  - Logout.
- **Out of Scope:**
  - Build 1 defect reproduction except as a negative reference.
  - Web services (SOAP/REST) — contract not verified. [NEEDS CLARIFICATION]
  - Mobile app.
  - Performance, load, and security penetration testing.

## Test Data
| Data Type | Value | Purpose |
|-----------|-------|---------|
| Valid credentials | Pre-registered account `{test username}` / `{test password}` — stored in `00_context-hotelapp/.env` (gitignored); never copy into documents or logs | Happy path |
| Invalid password | `{test username}` / `wrong-password` | Negative |
| Unregistered username | `nonexistent_user` / `any-password` | Negative |
| Blank username | `""` / `any-password` | Required-field validation (client-side) |
| Blank password | `any-username` / `""` | Required-field validation (client-side) |
| Both blank | `""` / `""` | Validation order |
| Search criteria | Location `Sydney`, Hotel `Hotel Creek`, Room Type `Standard`, 1 room, 1 adult, 0 children | Flow tests |
| Dates | Check-in = today, Check-out = today + 1, format `dd/mm/yyyy` (e.g. `20/11/2026` / `21/11/2026`) | Flow tests |
| Expiry years | `2011`–`2030` (select list) | Payment tests |
| Payment | 16-digit dummy card only (Visa / MasterCard / American Express) | Booking step |

## Verified Dropdown Values
| Field | Values |
|-------|--------|
| Location | Sydney, Melbourne, Brisbane, Adelaide, London, New York, Los Angeles, Paris |
| Hotels | Hotel Creek, Hotel Sunshine, Hotel Hervey, Hotel Cornice |
| Room Type | Standard, Double, Deluxe, Super Deluxe |
| Number of Rooms | 1–10 |
| Adults per Room | 1–4 |
| Children per Room | 0–4 (default option label "- Select Children per Room -") |
| Credit Card Type | American Express (`AMEX`), VISA (`VISA`), Master Card (`MAST`), Other (`OTHR`) |
| Expiry Month | 1–12 |

## Known Pricing Facts (verified)
- Select Hotel: Standard / Hotel Creek = `AUD $ 125` per night; Total Price (excl. GST) for 1 night, 1 room = `AUD $ 125`.
- Book A Hotel displays Price per Night, Total Price, GST, and Final Billed Price (Total + 10% GST).
- Verified booking (1 room, 1 night): Price/Night `AUD $ 125` → Total `AUD $ 125` → GST `AUD $ 12.5` → Final Billed Price `AUD $ 137.5`.
- Booked Itinerary shows Total Price **incl. GST** and rounds it to a whole value: the same booking displays `AUD $ 138` there, versus `AUD $ 137.5` on the confirmation page. Auto-generated dummy bookings (e.g. 2 rooms × 1 day at 125) display `AUD $ 275`.

## Test Environment
- **Browser:** Chrome (primary); Firefox and Edge as cross-browser recommendation.
- **Device:** Desktop.
- **OS:** Windows.
- **Base URL:** `https://adactinhotelapp.com/HotelAppBuild2/`

## Dependencies
- Internet access to `adactinhotelapp.com`.
- A pre-registered account with known credentials (registration needs a CAPTCHA).
- Booking tests require future check-in/check-out dates; check-in must be today or later and check-out after check-in.
- Session must remain active across the multi-step flow.

## Known Issues
- Build 1 contains known defects; run expected-pass tests on Build 2.
- `BookedItinerary.php` and `ChangePassword.php` return incorrect `<title>` values (both wrong) — relevant to title-verification tests.
- The host occasionally responds slowly and can return gateway timeouts (observed on the web-services endpoint).
- The environment is shared, so other users can change booking/order state between runs.
