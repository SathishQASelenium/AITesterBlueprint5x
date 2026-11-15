# Project Context

## Application
- **Name:** Adactin Hotel Reservation System (Build 2)
- **Type:** Web (classic multi-page, server-rendered application)
- **Domain:** Travel / Hospitality — hotel search, selection, booking, and itinerary management. Public practice application used by QA and test-automation learners.

## Tech Stack
- **Frontend:** HTML (XHTML 1.0 Transitional), CSS (`css/main.css`), JavaScript + jQuery (`js/jquery.min.js`, plus per-page scripts: `login.js`, `register.js`, `search_hotel.js`, `select_hotel.js`, `book_hotel.js`, `change_password.js`). Table-based layout.
- **Backend:** PHP (all page URLs end in `.php`); session/cookie-based authentication.
- **Database:** Not disclosed by the application. [NEEDS CLARIFICATION]
- **API Type:** Browser form `POST`/`GET` for the web UI. A separate SOAP and REST web-service offering exists for testing (`HotelAdactinWebServices`), but its contract was not verifiable (endpoint returned HTTP 504). [NEEDS CLARIFICATION]

## Environment
- **Build 2 (known defects fixed — use this for expected-pass runs):** `http://www.adactin.com/HotelAppBuild2/index.php` → redirects to `https://adactinhotelapp.com/HotelAppBuild2/index.php`
- **Build 1 (known defects present — tests are expected to fail):** `https://adactinhotelapp.com/`
- **Dev URL / Staging URL / Prod URL:** No separate environments are published; the site exposes one shared public instance per build. [NEEDS CLARIFICATION]

## Application Modules (Build 2) — verified live
| # | Module | Page | Browser Header Title | Form Action | Access |
|---|--------|------|----------------------|-------------|--------|
| 1 | Login (Existing User) | `index.php` | Adactin.com - Hotel Reservation System | posts to itself | Public |
| 2 | New User Registration | `Register.php` | Adactin.com - New User Registration | posts to itself | Public |
| 3 | Forgot Password | `ForgotPassword.php` | Adactin.com - Forgot Password | posts to itself | Public |
| 4 | Search Hotel | `SearchHotel.php` | Adactin.com - Search Hotel | `SelectHotel.php` | After login |
| 5 | Select Hotel | `SelectHotel.php` | Adactin.com - Select Hotel | `BookHotel.php` | After search |
| 6 | Book A Hotel | `BookHotel.php` | Adactin.com - Book A Hotel | `BookingConfirm.php` | After selection |
| 7 | Booking Confirmation | `BookingConfirm.php` | Adactin.com - Hotel Booking Confirmation | posts to itself | After booking |
| 8 | Booked Itinerary | `BookedItinerary.php` | Adactin.com - Select Hotel *(wrong title, verified)* | posts to itself | After login |
| 9 | Change Password | `ChangePassword.php` | Adactin.com - Search Hotel *(wrong title, verified)* | posts to itself | After login |
| 10 | Logout | `Logout.php` | Adactin.com - Logout | — | After login |

> Note: the `BookedItinerary` and `ChangePassword` pages carry incorrect `<title>` values. This is relevant to the page-title test case (TC-120 in the official sample set).

## Post-Login Shell (every authenticated page)
- Header shows `Welcome to Adactin Group of Hotels` and an input `#username_show` with value `Hello <username>!`.
- Navigation links: `Search Hotel` (`SearchHotel.php`), `Booked Itinerary` (`BookedItinerary.php`), `Change Password` (`ChangePassword.php`), `Logout` (`Logout.php`).

## Key Constraints
- **Shared public training application:** data is not private, may be changed by other users, and can be reset without notice.
- **Build 1 is intentionally defective.** Build 2 has the known defects fixed; use Build 2 when the expected result is a pass.
- **Login required for modules 4–10.** Unauthenticated requests to post-login pages redirect back to `index.php` (verified for `SearchHotel.php`).
- **Registration requires solving a CAPTCHA**, which blocks fully unattended account creation unless a pre-provisioned account is used.
- **Multi-step booking flow:** each step depends on the previous one (Search → Select → Book → Confirm → Itinerary).
- **Test data must be dummy:** no real personal data and no real credit-card numbers (the booking form itself says "Use 16 digit Dummy Data").
- **Availability/performance is outside tester control:** the host has periods of slow response and occasional gateway timeouts.
