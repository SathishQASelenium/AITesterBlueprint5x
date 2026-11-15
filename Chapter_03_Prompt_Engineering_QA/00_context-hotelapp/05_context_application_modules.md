# Application Module Context (Build 2) — Verified Live

This file supplements `01_context_project.md` with field-level detail for each module. Everything here was captured from the live Build 2 application unless marked otherwise.

## 1. Login — `index.php`
See `02_context_feature.md` for the full login context.

## 2. New User Registration — `Register.php`
- Form: `name="register_form"`, `id="register_form"`, `method="post"`.
- Fields (all mandatory, marked with red `*`):
  | Field | Identifier | Limit |
  |-------|------------|-------|
  | Username | `#username` | `maxlength=20` |
  | Password | `#password` | `maxlength=20` |
  | Confirm Password | `#re_password` | `maxlength=20` |
  | Full Name | `#full_name` | `maxlength=50` |
  | Email Address | `#email_add` | `maxlength=50` |
  | Captcha Text | `#captcha-form` | `maxlength=8` |
  | Terms checkbox | `#tnc_box` | required |
- CAPTCHA image: `captcha.php`; refresh link `#change-image`; AJAX validation via `js/validate_captcha.php`.
- Buttons: `Submit` (`#Submit`, value "Register"), `Reset`.
- Client-side messages (`register.js`):
  | Case | Message |
  |------|---------|
  | Username empty | "Username is Empty" |
  | Username < 8 chars | "Username must contain minimum 8 characters" |
  | Password empty | "Password is Empty" |
  | Password < 6 chars | "Password must contain minimum 6 characters" |
  | Confirm empty | "Confirm Password is Empty" |
  | Mismatch | "Passwords Do Not Match" |
  | Full name empty | "Full Name is Empty" |
  | Email empty | "Email Address is Empty" |
  | Captcha empty | "Captcha is Empty" |
  | Captcha invalid | "Captcha is Invalid" |
  | Captcha valid | "Captcha Verified Succesfully" |
  | T&C unchecked | "You must agree to Terms and Conditions" |
  | Invalid email format | "Invalid email, Please enter correct email." |

## 3. Forgot Password — `ForgotPassword.php`
- Form: `name="passre_form"`, `id="passre_form"`, `method="post"`.
- Field: `Enter Email` → `#emailadd_recovery`, `maxlength=50`.
- Button: `Email Password` (`#Submit`), plus `Reset`.
- Messages:
  | Case | Message |
  |------|---------|
  | Email empty | "Email Address is Empty" |
  | Space typed | "Empty space not allowed" |
  | Invalid format | "Invalid email, Please enter correct email." |

## 4. Search Hotel — `SearchHotel.php`
- Form: `name="search_form"`, `id="search_form"`, `method="post"`, `action="SelectHotel.php"`, `onsubmit="return search_validate();"`.
- Fields:
  | Field | Identifier | Notes |
  |-------|------------|-------|
  | Location `*` | `#location` | Dropdown (see values in `03_context_testing.md`) |
  | Hotels | `#hotels` | Optional (client validation is commented out) |
  | Room Type | `#room_type` | Optional (client validation is commented out) |
  | Number of Rooms `*` | `#room_nos` | 1–10, default 1 |
  | Check In Date `*` | `#datepick_in` | `dd/mm/yyyy`, default today |
  | Check Out Date `*` | `#datepick_out` | `dd/mm/yyyy`, default tomorrow |
  | Adults per Room `*` | `#adult_room` | 1–4 |
  | Children per Room | `#child_room` | 0–4 |
- Hidden: `#todate_in` (today), `#datepick_diff` (night count).
- Buttons: `Search` (`#Submit`), `Reset`.
- Client-side messages (`search_hotel.js`):
  | Case | Message |
  |------|---------|
  | Location empty | "Please Select a Location" |
  | Rooms empty | "Please Select Total Number of Rooms" |
  | Check-in empty | "Please Select Check-In Date" |
  | Check-out empty | "Please Select Check-Out Date" |
  | Check-out before check-in | "Check-In Date shall be before than Check-Out Date" / "Check-Out Date shall be after than Check-In Date" |
  | Same dates | "Check-in and Check-out date cannot be same" |
  | Check-in in past | "Check-In Date should be either Today or Later Date" |
  | Check-out today or past | "Check-Out Date should be either Tomorrow or Later Date" |
  | Adults empty | "Please Select Adults per Room" |

## 5. Select Hotel — `SelectHotel.php`
- Form: `name="select_form"`, `id="select_form"`, `method="post"`, `action="BookHotel.php"`, `onsubmit="return select_validate();"`.
- Result table columns: Select (radio), Hotel Name, Location, Rooms, Arrival Date, Departure Date, No. of Days, Rooms Type, Price per Night, Total Price (excl. GST).
- Row values are read-only text inputs: `radiobutton_0`, `hotel_name_0`, `location_0`, `rooms_0`, `arr_date_0`, `dep_date_0`, `no_days_0`, `room_type_0`, `price_night_0`, `total_price_0`; hidden `total_radiobutton`.
- Buttons: `Continue` (`#continue`), `Cancel` (returns to `SearchHotel.php`).
- Message (no hotel selected): "Please Select a Hotel".
- Price example verified: Hotel Creek / Standard / 1 night / 1 room → `AUD $ 125` per night, `AUD $ 125` total excl. GST.

## 6. Book A Hotel — `BookHotel.php`
- Form: `name="book_hotel_form"`, `id="book_hotel_form"`, `method="post"`, `action="BookingConfirm.php"`. No `onsubmit`; submission is triggered by the `Book Now` button calling `book_hotel_validate()`.
- Read-only display fields: `hotel_name_dis`, `location_dis`, `room_type_dis`, `room_num_dis`, `total_days_dis`, `price_night_dis`, `total_price_dis`, `gst_dis`, `final_price_dis`.
- Input fields (all mandatory `*`):
  | Field | Identifier | Limit / Values |
  |-------|------------|----------------|
  | First Name | `#first_name` | `maxlength=25` |
  | Last Name | `#last_name` | `maxlength=25` |
  | Billing Address | `#address` | textarea |
  | Credit Card No. | `#cc_num` | `maxlength=16`, digits only, "Use 16 digit Dummy Data" |
  | Credit Card Type | `#cc_type` | AMEX / VISA / MAST / OTHR |
  | Expiry Month | `#cc_exp_month` | 1–12 |
  | Expiry Year | `#cc_exp_year` | 2011–2030 |
  | CVV Number | `#cc_cvv` | `maxlength=4`, digits only |
- Buttons: `Book Now` (`#book_now`, `type="button"`), `Cancel` (returns to `SelectHotel.php`).
- Hidden fields carried forward: `hotel_name_hid`, `location_name_hid`, `room_types_hid`, `rooms_no_hid`, `arr_date_hid`, `dep_date_hid`, `no_days_hid`, `adults_room_hid`, `children_room_hid`, `price_night_hid`, `total_price_hid`, `gst_hid`, `final_price_hid`.
- Client-side messages (`book_hotel.js`):
  | Case | Message |
  |------|---------|
  | First name empty | "Please Enter your First Name" |
  | Last name empty | "Please Enter you Last Name" |
  | Address empty | "Please Enter your Address" |
  | Card missing / < 16 digits | "Please Enter your 16 Digit Credit Card Number" |
  | Card type empty | "Please Select your Credit Card Type" |
  | Expiry month empty | "Please Select your Credit Card Expiry Month" |
  | Expiry year empty | "Please Select your Credit Card Expiry Year" |
  | Expiry year = 2011 | alert "Expiry year cannot be in Past" |
  | CVV empty | "Please Enter your Credit Card CVV Number" |
  | All valid | "Please wait! We are processing your Hotel Booking..." then submits after 5 seconds |

## 7. Booking Confirmation — `BookingConfirm.php`
- Verified live by creating a real booking on Build 2.
- Browser title: "Adactin.com - Hotel Booking Confirmation".
- Form: `name="booking_form"`, `id="booking_form"`, `method="post"`, `action=""`. No `onsubmit`.
- Page heading: "Booking Confirmation".
- Read-only display fields (`disabled`): `hotel_name`, `location`, `room_type`, `arrival_date`, `departure_date`, `total_rooms`, `adults_room`, `children_room`, `price_night`, `total_price`, `gst`, `final_price`, `first_name`, `last_name`, `address` (textarea), `order_no`.
- Buttons: `Search Hotel` (`#search_hotel`, goes to `SearchHotel.php`), `My Itinerary` (`#my_itinerary`, goes to `BookedItinerary.php`), `Logout` (`#logout`, goes to `Logout.php`).
- Order Number: 10-character uppercase alphanumeric value in `input#order_no` (e.g. format like `7C73O580T3`).
- Verified booking values: Hotel Creek / Sydney / Standard / 20-21 Nov 2026 / 1 Room(s) / 1 Adult(s) / 0 Children / `AUD $ 125` per night / `AUD $ 125` total / GST `AUD $ 12.5` / Final Billed Price `AUD $ 137.5`.

## 8. Booked Itinerary — `BookedItinerary.php`
- Incorrect browser title "Adactin.com - Select Hotel" (verified).
- Form: `name="booked_form"`, `id="booked_form"`, `method="post"`, posts to itself.
- Search by Order Id: `#order_id_text` (`maxlength=10`) + `Go` button `#search_hotel_id`. On a successful match the label `#search_result_error` shows "1 result(s) found." followed by a "Show all" link; the field is also used for error text when nothing matches.
- Header columns: check-all checkbox (`#check_all`), Order Id, Cancel, Hotel Name, Location, No. of Rooms, First Name, Last Name, Arrival Date, Departure Date, No. of Days, Rooms Type, Price per Night, Total Price (incl. GST).
- Per-row controls (row id suffix is the internal row id, e.g. `1561345`): `ids[]` checkbox (value = row id), `order_id_<row>` (read-only text), `btn_id_<row>` (Cancel button), and read-only text fields `hotel_name_<row>`, `location_<row>`, `rooms_<row>`, `first_name_<row>`, `last_name_<row>`, `arr_date_<row>`, `dep_date_<row>`, `no_days_<row>`, `room_type_<row>`, `price_night_<row>`, `total_price_<row>`.
- Cancel flow: `cancel_booking(row_id, order_id)` shows confirm `"Are you sure, you want to cancel the booking with Order no. <order_id>?"`, then navigates to `BookedItinerary.php?cancel_order=<row_id>`.
- Buttons at the bottom: `Cancel Selected` (submit, confirm `"Are you sure want to Cancel Selected?."`), `Search Hotel`, `Logout`.
- Verified end-to-end: a booking created via the flow was found with the "1 result(s) found." message, showing the same hotel, dates, room, name, and price.
- Pricing note: Booked Itinerary shows **Total Price (incl. GST)**, rounded to a whole currency value. A Verified booking (1 room, 1 night, 125 + 12.5 GST = 137.5) displays `AUD $ 138` here, while the confirmation page shows `AUD $ 137.5`. Treat this rounding difference as expected behaviour unless requirements state otherwise.

## 9. Change Password — `ChangePassword.php`
- Incorrect browser title "Adactin.com - Search Hotel" (verified).
- Form: `name="change_password_form"`, `id="change_password_form"`, `method="post"`, `onsubmit="return change_password_validate();"`.
- Fields: Current Password `#current_pass`, New Password `#new_password`, Confirm Password `#re_password`; submit `#Submit` (value "Submit").
- Messages (`change_password.js`):
  | Case | Message |
  |------|---------|
  | Current empty | "Please Enter Current Password" |
  | New empty | "Please Enter New Password" |
  | Confirm empty | "Please Enter Confirm Password" |
  | Mismatch | "Your new password and confirmation password do not match." |

## 10. Logout — `Logout.php`
- Browser title "Adactin.com - Logout".
- Page text: "You have successfully logged out." followed by a "Click here to login again" link.
- After logout, protected pages redirect to `index.php`.
