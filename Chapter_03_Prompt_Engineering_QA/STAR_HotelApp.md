# STAR

## Situation :
I am a QA engineer preparing to test the login page of the Adactin Hotel App at http://www.adactin.com/HotelAppBuild2/index.php. For this exercise, the approved requirements are:

- Registered users can log in with valid credentials.
- Invalid credentials must not grant access and give error.
- Username and Password are mandatory.
- Successful login opens the Search Hotel page.
- Invalid login gives error message "Invalid Login details or Your Password might have expired. Click here to reset your password"
- If Username is blank and the Login button is clicked, the message "Enter Username" is shown.
- If Password is blank and the Login button is clicked, the message "Enter Password" is shown.

## Task :
Create a functional test plan for the login module using the template here - Chapter_03_Prompt_Engineering_QA/Template.md

## Action :
Define the objectives, scope, and testing approach.

Cover valid login, invalid credentials, empty username, empty password, both fields empty, and access to the Search Hotel page after login.

Include positive, negative, and boundary scenarios where the supplied requirements support them.

Define test environment needs, test data, entry criteria, exit criteria, deliverables, and risks.

Mark unspecified behavior as "Requires clarification." Do not invent password rules, lockout policy, session timeout, or field-level validation messages beyond the ones listed in the approved requirements.

Treat the message displayed when both Username and Password are blank as "Requires clarification."

Map each test scenario to a requirement ID. Use dummy test data only; do not include real passwords.

## Result :
Return a test plan containing:

Test Plan ID and Title
Objective
In Scope and Out of Scope
Test Approach
Test Scenarios
Environment and Test Data
Entry and Exit Criteria
Deliverables
Risks and Open Questions

Use clear language and tables where useful. Label any proposed criteria as recommendations.
