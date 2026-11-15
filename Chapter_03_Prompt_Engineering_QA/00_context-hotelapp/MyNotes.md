Prompt:
@Chapter_03_Prompt_Engineering_QA/00_context-vwo/01_context_project.md to use this template, what are all the details needed for you. Actually i wish you to generate the context for the application http://www.adactin.com/HotelAppBuild2/index.php

Prompt:
I have added .env file in 00_context-hotelapp which have the credentials which will work. you can use them

Logged in with the supplied account and replaced the guesses with verified facts. .env stays gitignored (not in git status), and no credentials appear in any context file.

What's now confirmed live and written up:

All 10 modules mapped with real page titles, form actions, and access rules. Two pages have wrong <title> values — BookedItinerary.php says "Select Hotel" and ChangePassword.php says "Search Hotel". That directly affects the official title test (TC-120).
Login: exact IDs (#username, #password, #login, #username_span, #password_span, .auth_error) and the exact invalid-credentials string. Key finding: "Enter Username" / "Enter Password" are client-side only — with JavaScript bypassed, blank submissions return the generic "Invalid Login details..." message.
Search Hotel: real dropdown values (Sydney/Melbourne/…; Hotel Creek/Sunshine/Hervey/Cornice; Standard/Double/Deluxe/Super Deluxe), date format dd/mm/yyyy, and every JS validation message.
Select / Book A Hotel: field names, hidden carry-forward fields, card types, expiry years, and the 5-second "processing" submit behaviour.
Booked Itinerary: columns, per-row IDs, cancel confirm text, and pricing (10% GST: 2 rooms × 1 night × 125 → 275).
Change Password, Registration, Forgot Password, Logout: fields and message strings.
Files in Chapter_03_Prompt_Engineering_QA/00_context-hotelapp/:

01_context_project.md — app, stack, environments, verified module table
02_context_feature.md — Login (matches STAR_HotelApp.md)
03_context_testing.md — scope, test data, dropdown values, pricing facts
04_context_constraints.md — MUST/MUST NOT + a verified-vs-unverified matrix
05_context_application_modules.md — per-module field-level reference (added)
Learning journal updated at learnings/2026-11-15-adactin-hotelapp-context-pack.md
Still unknown, marked [NEEDS CLARIFICATION]: BookingConfirm.php (I stopped before creating a real order on the shared app), the database, dev/staging/prod URLs, and the SOAP/REST contract (endpoint 504s). Want me to create a real test booking to capture the confirmation page, or leave it as-is?

Prompt:
create a live booking so you can understand the flow. Also validate by searching the booking order in itenary page and then logout so you can understand the full flow

Ran the full flow end-to-end on Build 2 with the supplied account:

Booking created

Login → Search Hotel (Sydney / Hotel Creek / Standard / 1 room / 20–21 Nov 2026) → Select Hotel → Book A Hotel → Booking Confirmation.
Order No. generated: 7C73O580T3 (10-char uppercase alphanumeric).
Confirmation page verified: title "Adactin.com - Hotel Booking Confirmation", booking_form, disabled display fields, and Search Hotel / My Itinerary / Logout buttons.
Pricing verified: AUD $ 125 night → AUD $ 125 total → GST AUD $ 12.5 → Final Billed AUD $ 137.5.
Itinerary search

Searched 7C73O580T3 via order_id_text + search_hotel_id=Go; got "1 result(s) found." with matching hotel, dates, room, name, and price.
Notable: the itinerary shows the GST-inclusive total rounded — AUD $ 138 here vs AUD $ 137.5 on confirmation. That's a real expected-result discrepancy worth flagging in tests.
Logout

Logout.php shows "You have successfully logged out." and the next request to SearchHotel.php redirected to index.php with the login form.
Files updated with the live facts

01_context_project.md — Booking Confirmation marked verified
03_context_testing.md — placeholder order in test data cleared; confirmed pricing + rounding note
04_context_constraints.md — Booking Confirmation moved to "Verified live"
05_context_application_modules.md — full Booking Confirmation section; itinerary search message, bottom buttons, and rounding note
learnings/2026-11-15-adactin-hotelapp-context-pack.md — E2E verification recorded
The test booking stays in the account's itinerary; say the word if you want me to cancel it via the Cancel link. Not committed.