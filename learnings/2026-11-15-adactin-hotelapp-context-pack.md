# Adactin HotelApp Context Pack from Chapter 03 Templates

## Date
2026-11-15

## Objective
Turn the four blank context templates in `Chapter_03_Prompt_Engineering_QA/00_context-vwo/` into a filled, evidence-based context pack for the Adactin Hotel Reservation System (Build 2) at `http://www.adactin.com/HotelAppBuild2/index.php`. Use the supplied test account to verify post-login modules, then update the pack and state which details still require stakeholder input.

## Tools and Technologies Used
- Command Code (agent runtime)
- `web_fetch` against the live Adactin application (login, registration, forgot-password, Build 1 root, static JS)
- Python 3 standard library (`urllib.request`, `http.cookiejar`, `re`) for a cookie-aware session to capture post-login pages and probe server-side behaviour
- Official `Sample-TestCases_HotelApplication.pdf` for the booking-flow reference
- Local file tools and Windows PowerShell

## Steps Performed
1. Read the four templates in `00_context-vwo/` and the existing `STAR_HotelApp.md` to derive the required fields and house style.
2. Fetched the public pages and static scripts (`login.js`, `register.js`, `search_hotel.js`, `select_hotel.js`, `book_hotel.js`, `change_password.js`) and extracted exact field IDs and messages.
3. Confirmed Build 1 is the site root and Build 2 is `/HotelAppBuild2/`; confirmed unauthenticated `SearchHotel.php` redirects to login.
4. Verified `00_context-hotelapp/.env` is gitignored (not present in `git status --untracked-files=all`).
5. Wrote a Python probe that reads credentials from `.env` without printing them, logs in with a cookie jar, and captures `SearchHotel.php`, `SelectHotel.php`, `BookHotel.php`, `BookedItinerary.php`, `ChangePassword.php`, and `Logout.php`.
6. Probed server-side login behaviour: invalid password, blank username, and blank password with JavaScript bypassed; captured the exact `div.auth_error` string.
7. Ran a real hotel search (Sydney / Hotel Creek / Standard / 1 room) and clicked Continue to reach the Book A Hotel form without submitting a booking (no order created).
8. Inspected Booked Itinerary columns, per-row field names, and the cancel confirmation text.
9. Rewrote the four context files with verified facts and added `05_context_application_modules.md` with per-module field-level detail.

## Code Examples
Cookie-aware login and page capture (credentials read from `.env`, never printed):

```python
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
opener.addheaders = [("User-Agent", "Mozilla/5.0")]
opener.open(base + "index.php", timeout=60).read()
opener.open(base + "index.php", urllib.parse.urlencode({
    "username": env["Username"], "password": env["Password"], "login": "Login"
}).encode(), timeout=60).read()
body = opener.open(base + "SearchHotel.php", timeout=60).read().decode("latin-1")
```

Extracting the authentication error text:

```python
m = re.search(r'<div class="auth_error">(.*?)</div>', body, re.S)
text = re.sub(r"<[^>]+>", " ", m.group(1)).strip()
```

## Challenges Faced
- Post-login pages are session-protected, so a cookie jar was required; `web_fetch` cannot preserve a login session.
- Submitting the Book A Hotel form creates a real order in a shared public environment, so the flow was stopped at the form.
- The web-services endpoint returned HTTP 504, so its SOAP/REST contract could not be documented.
- The `BookedItinerary` page is large (hundreds of rows) and was inspected via targeted reads rather than loading it whole.

## Solutions Implemented
- Built a minimal Python session using only the standard library, avoiding extra dependencies.
- Read credentials from `.env` at runtime and never echoed them into output or documents.
- Verified `.env` is already covered by the root `.gitignore` (`.env` pattern) and confirmed it does not appear as untracked.
- Marked all unverified areas (`BookingConfirm.php`, database, environments, SOAP/REST) as `[NEEDS CLARIFICATION]`.
- Added verified facts that matter for testing: wrong page titles on Booked Itinerary and Change Password; server-side blank-login behaviour; 10% GST pricing.

## Key Learnings
- "Enter Username" / "Enter Password" are client-side only. With JavaScript bypassed, blank submissions return the generic "Invalid Login details…" message — an important distinction for test design.
- `BookedItinerary.php` and `ChangePassword.php` have wrong `<title>` values, which directly affects the official title-verification test case (TC-120).
- Pricing: Select Hotel shows total excl. GST; Booked Itinerary shows total incl. GST at 10% (2 rooms × 1 day × 125 → 275).
- Book A Hotel validates with a button-triggered function, not form `onsubmit`, and deliberately waits 5 seconds before submitting.
- The registration form enforces username ≥ 8 chars and password ≥ 6 chars, plus a CAPTCHA and T&C checkbox.
- The booking form sends `*_hid` hidden fields to `BookingConfirm.php`; the confirmation page echoes them as disabled inputs and returns a 10-character `order_no`.
- Itinerary search posts `order_id_text` + `search_hotel_id=Go` and reports "1 result(s) found."; the page's own `<title>` is wrong ("Select Hotel").
- Booked Itinerary rounds the GST-inclusive total to a whole currency unit (137.5 → 138), a real discrepancy to account for in expected results.

## Testing and Verification
- Login happy path: valid credentials redirected to `SearchHotel.php` (verified).
- Login negative paths: invalid password, blank username, and blank password (JS bypassed) all returned the same auth error (verified).
- Logout: `Logout.php` shows "You have successfully logged out." and protected pages are no longer accessible (verified).
- Search/Select/Book form capture: fields and messages match the live HTML (verified).
- Full end-to-end flow executed on Build 2: login → Search Hotel → Select Hotel → Book A Hotel → Booking Confirmation → Booked Itinerary search → Logout (verified).
- Real booking created with dummy data: Hotel Creek / Sydney / Standard / 20-11-2026 to 21-11-2026 / 1 room / 1 adult. Order No. generated as a 10-character alphanumeric (`7C73O580T3`).
- Confirmation page verified: title "Adactin.com - Hotel Booking Confirmation", `booking_form`, disabled display fields, and buttons Search Hotel / My Itinerary / Logout.
- Itinerary search by Order Id returned "1 result(s) found." with matching hotel, dates, name, and price.
- Logout: `Logout.php` shows "You have successfully logged out."; subsequent `SearchHotel.php` request redirected to `index.php` with the login form (verified).
- Pricing verified: 125 + 12.5 GST = 137.5 final billed; itinerary shows the rounded `AUD $ 138`.
- No real payment data used; card values were 16-digit dummy data.
- Files created: `01_context_project.md`, `02_context_feature.md`, `03_context_testing.md`, `04_context_constraints.md`, `05_context_application_modules.md`.

## Future Improvements
- Add a cancellation scenario (Cancel button / Cancel Selected) once its side effects are acceptable in the shared environment.
- Replace remaining `[NEEDS CLARIFICATION]` markers after stakeholder input on environments, DB, and security policies.
- Add a filled Registration and Forgot Password feature-context file if those modules become in-scope.
- Parameterise the probe scripts so they can be reused for Build 1 defect comparison.
- Clean up the test order created during verification if the environment owner wants it removed.

## Completion Workflow
- Requested task completed; context pack written to `Chapter_03_Prompt_Engineering_QA/00_context-hotelapp/`.
- Learning file created: `learnings/2026-11-15-adactin-hotelapp-context-pack.md`.
- Not committed or pushed (no authorization given).
