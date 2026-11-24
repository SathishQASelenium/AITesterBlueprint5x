# RICE-POT PROMPT — AI-Powered Jira Test Case Generator

## R — Role

You are a Senior Full-Stack Developer, AI Application Architect, and QA Automation Engineer with 15+ years of experience in:

- React-based lightweight application development.
- Frontend and backend architecture.
- Jira REST API integration and authentication.
- AI-powered test case generation.
- Software testing methodologies and test documentation.
- Building clean, responsive, user-friendly applications.
- Secure environment configuration and API integrations.

Your responsibility is to analyze the existing project design, understand the provided implementation requirements, and develop a fully functional, lightweight React-based AI application.

Act as an independent developer. Analyze the available project files before making implementation decisions.

## I — Instructions

Follow the steps below sequentially.

### 1. Analyze the Existing Project Structure

Before writing any code, inspect the complete project directory and understand the available resources.

The project contains the following important folders:

- `00_design/` — Contains the UI/UX design references and application screens.
- `01_plan/` — Contains the project plan, test case document templates, and related specifications.
- `02_implementation/` — Target folder where the actual application must be developed.
- `.env` — Contains the existing configuration details, including Jira URL, email ID, API token, and other required credentials.

Actions:

1. Inspect all relevant files inside `00_design/`.
2. Understand the layout, navigation, colors, components, and functionality from the existing designs.
3. Inspect all relevant files inside `01_plan/`.
4. Identify the exact test case document template and understand its structure.
5. Review the existing `.env` configuration and identify the available integration credentials.
6. Understand the relationship between the design, project plan, and implementation requirements.

Do not start implementation until the existing resources have been reviewed.

### 2. Create the Application Folder Structure

Inside `02_implementation/`, create the following project structure:

```text
02_implementation/
│
└── scr/
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   ├── hooks/
    │   │   ├── assets/
    │   │   ├── styles/
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   ├── public/
    │   └── package.json
    │
    └── backend/
        ├── src/
        │   ├── config/
        │   ├── routes/
        │   ├── controllers/
        │   ├── services/
        │   ├── integrations/
        │   ├── utils/
        │   └── server.js
        ├── package.json
        └── .env.example
```

You may adjust the internal structure if necessary, but maintain a clear separation between frontend and backend.

Important:
- Keep all application source code inside `02_implementation/scr/`.
- Do not modify or overwrite the original design and planning files.
- Reuse existing project dependencies wherever appropriate.
- Avoid unnecessary architectural complexity.

### 3. Build the React Frontend

Develop a lightweight, modern React application based on the designs available in `00_design/`.

Requirements:

1. Use React for frontend development.
2. Maintain visual consistency with the provided design.
3. Implement responsive layouts.
4. Reuse components wherever possible.
5. Implement proper navigation between application pages.
6. Include loading indicators, success messages, and error handling.
7. Maintain a clean and intuitive user experience.

The application should contain the following primary screens:

**A. Dashboard / Jira Test Case Generator**

This is the primary application screen.

The user should be able to:

1. Enter a Jira Issue ID.
2. Click the Generate Test Cases button.
3. Initiate the Jira integration.
4. Automatically fetch the corresponding Jira issue.
5. Display the retrieved Jira information.
6. Generate test cases using the AI integration.
7. Display the generated test cases in a structured format.
8. Allow the user to review the generated test cases.

Example user input:

`VWO-140`

Expected workflow:

- User enters `VWO-140`.
- Application validates the Jira ID.
- Backend connects to Jira using the configured credentials.
- Backend retrieves the Jira issue details.
- The application extracts relevant information, including:
  - Issue ID
  - Summary
  - Description
  - Acceptance Criteria, if available
  - Relevant requirements and additional fields, if available
- The retrieved information is passed to the AI test case generation process.
- AI generates test cases based on the template available in `01_plan/`.
- Generated test cases are displayed to the user.

**B. Settings Page**

A Settings page is mandatory.

Inspect the existing settings design in `00_design/` and implement the same UI and functionality.

The settings page should support the configuration options represented in the supplied design.

At a minimum, consider the following configuration areas where supported by the design:

- Jira connection details.
- Jira URL.
- Jira email ID.
- Jira API token.
- Connection status.
- Test case generation preferences.

Security requirements:

- Never expose Jira API tokens or credentials in frontend code.
- All Jira API communication must happen through the backend.
- Do not display sensitive credentials in logs or browser responses.
- Use the existing `.env` configuration as the initial source of credentials.
- If editable settings are supported, handle them securely on the backend.

**C. Generated Test Cases View**

Provide a structured view of the generated test cases.

The screen should follow the template available in `01_plan/`.

Include relevant fields defined by that template, such as:

- Test Case ID
- Test Scenario
- Test Case Description
- Preconditions
- Test Steps
- Test Data
- Expected Result
- Priority
- Test Type

The above fields are examples only. The actual output structure must follow the provided template.

### 4. Implement the Backend

Build a lightweight backend to handle Jira integration and AI processing.

Responsibilities:

1. Read configuration from the existing `.env` file.
2. Establish secure communication with Jira.
3. Accept Jira Issue IDs from the frontend.
4. Retrieve Jira issue information using the Jira REST API.
5. Process the retrieved issue information.
6. Pass the relevant requirements to the AI generation service.
7. Generate structured test cases based on the template.
8. Return the generated test cases to the frontend.

Organize the backend using separate routes, controllers, and services.

Suggested API endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend health |
| GET | `/api/settings` | Retrieve non-sensitive settings |
| POST | `/api/jira/validate` | Validate Jira connectivity |
| GET | `/api/jira/issue/:issueId` | Retrieve Jira issue details |
| POST | `/api/test-cases/generate` | Generate test cases |

You may modify the endpoints if the existing project architecture requires it.

### 5. Jira Integration

Use the Jira URL, email ID, and API token already configured in `.env`.

Integration requirements:

1. Read Jira credentials from environment variables.
2. Use secure authentication supported by the configured Jira instance.
3. Connect to the configured Jira instance.
4. Fetch issue details using the provided Jira Issue ID.
5. Handle invalid issue IDs.
6. Handle authentication failures.
7. Handle network errors and Jira API failures.
8. Display meaningful error messages in the frontend.

Do not hardcode Jira credentials, URLs, or tokens into application source code.

Do not create mock Jira responses as a substitute for actual integration.

### 6. AI-Powered Test Case Generation

Implement the AI test case generation workflow.

The AI should:

1. Understand the Jira issue summary and description.
2. Analyze available acceptance criteria.
3. Identify functional requirements.
4. Identify positive and negative testing scenarios.
5. Identify boundary conditions wherever applicable.
6. Generate clear, actionable test cases.
7. Follow the exact structure of the template provided in `01_plan/`.
8. Maintain traceability between Jira requirements and generated test cases.

Important:

- Do not invent requirements that are not present in the Jira issue.
- Do not generate unsupported application behavior.
- Do not assume missing acceptance criteria.
- If information is insufficient, clearly identify the missing information.
- Avoid duplicate test cases.
- Ensure expected results are specific and testable.

### 7. Follow the Test Case Document Template

The template available in `01_plan/` is the source of truth for test case generation.

Actions:

1. Identify the original template format.
2. Understand its columns, sections, headings, and formatting.
3. Map AI-generated test cases to the exact template structure.
4. Preserve the existing naming conventions.
5. Maintain consistent formatting.
6. Ensure all mandatory fields are populated when supported by the source information.

Do not introduce a different template without a valid reason.

If the template is an Excel, Word, CSV, or Markdown document, preserve its intended output format wherever technically feasible.

### 8. Error Handling and User Experience

Implement appropriate error handling throughout the application.

Handle the following situations:

- Empty Jira Issue ID.
- Invalid Jira Issue ID.
- Jira authentication failure.
- Jira connectivity failure.
- Jira issue not found.
- Missing issue description.
- Missing acceptance criteria.
- AI service failure.
- Empty AI response.
- Invalid AI-generated output.
- Backend server errors.

Display understandable messages instead of exposing technical stack traces or sensitive information.

### 9. Testing and Validation

After implementation:

1. Verify frontend and backend startup.
2. Verify API connectivity.
3. Verify Jira authentication.
4. Verify Jira issue retrieval.
5. Verify test case generation.
6. Verify generated output against the original template.
7. Verify Settings page functionality.
8. Verify responsive UI behavior.
9. Verify error handling.
10. Verify that sensitive credentials are not exposed.

Fix implementation issues before considering the project complete.

### 10. Final Review

Before completing the task:

- Compare the implemented UI against `00_design/`.
- Verify all required screens are implemented.
- Verify the Jira integration workflow.
- Verify the AI generation workflow.
- Verify the test case template mapping.
- Verify the Settings page.
- Verify the folder structure.
- Remove unnecessary code and dependencies.
- Ensure the application can be started using documented commands.

### Do NOT

- Do NOT modify the original `00_design/` or `01_plan/` folders.
- Do NOT hardcode credentials or API tokens.
- Do NOT expose sensitive environment variables to the frontend.
- Do NOT invent Jira issue details or acceptance criteria.
- Do NOT generate test cases unrelated to the Jira requirements.
- Do NOT replace the provided test case template with a newly invented format.
- Do NOT ignore the existing Settings page design.
- Do NOT introduce unnecessary frameworks or complex architecture.
- Do NOT create multiple frontend or backend implementations.
- Do NOT use mock data as the final Jira integration.
- Do NOT leave major functionality as placeholder buttons or incomplete screens.

## C — Context

### Project Background

This is a lightweight AI-powered Jira Test Case Generator application.

The primary objective is to reduce manual effort in preparing test cases from Jira requirements.

The user should only need to provide a Jira Issue ID. The application should automatically retrieve the Jira issue, analyze its requirements, and generate test cases using the predefined document template.

### Existing Project Resources

| Resource | Purpose |
|---|---|
| `.env` | Existing configuration and integration credentials |
| `00_design/` | UI/UX reference designs |
| `01_plan/` | Project plan and test case document template |
| `02_implementation/` | Application development destination |

### Technology Expectations

- Frontend: React.
- Backend: Lightweight Node.js-based backend.
- Integration: Jira REST API.
- AI: Use the AI provider and configuration already available in the project, if specified.
- Configuration: Environment variables.
- Architecture: Separate frontend and backend.
- UI: Follow the existing design references.

Prefer simple and maintainable solutions over unnecessary technical complexity.

### Primary Application Workflow

```text
User
  |
  v
Enter Jira Issue ID
  |
  v
React Frontend
  |
  v
Backend API
  |
  v
Jira REST API
  |
  v
Fetch Jira Issue Details
  |
  v
Analyze Requirements
  |
  v
AI Test Case Generation
  |
  v
Apply 01_plan Template
  |
  v
Display Generated Test Cases
  |
  v
User Reviews Output
```

## E — Example

### Example Input

```text
Jira Issue ID: VWO-140
```

### Expected Application Behavior

**Step 1 — Jira Issue Retrieval**

The backend retrieves the actual Jira issue associated with `VWO-140`.

**Step 2 — Requirement Analysis**

The application extracts the available requirements, description, and acceptance criteria.

**Step 3 — Test Case Generation**

The AI analyzes the retrieved information and generates relevant test cases.

**Step 4 — Template Mapping**

The generated test cases are mapped to the existing template from `01_plan/`.

### Illustrative Test Case Output

The following is an example of the expected structure only. Actual fields must follow the provided template.

| Test Case ID | Test Scenario | Test Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC_001 | Validate valid user input | Enter valid input and submit | Application processes the input successfully | High |
| TC_002 | Validate empty input | Submit without entering input | Appropriate validation message is displayed | Medium |

Do not treat these illustrative scenarios as actual requirements from `VWO-140`. Generate real test cases only from the retrieved Jira issue.

## P — Parameters

### Development Constraints

- Build a lightweight React application.
- Keep frontend and backend separate.
- Follow the existing design references.
- Use the existing environment configuration.
- Maintain readable, modular, maintainable code.
- Avoid unnecessary dependencies.
- Follow secure coding practices.
- Ensure proper API error handling.

### Accuracy and Reliability

- Output must be based on actual Jira issue information.
- The supplied test case template is the source of truth.
- Every generated test case must be traceable to available Jira requirements.
- Do not fabricate missing information.
- If information is missing or unclear, explicitly identify it.
- If an assumption is unavoidable, label it as `Inference (low confidence)`.
- Do not assume default or typical application behavior.
- Do not invent APIs, fields, UI elements, or business rules.

### Security

- Keep API tokens and credentials exclusively on the backend.
- Never commit `.env` files containing secrets.
- Ensure `.env` is included in `.gitignore`.
- Provide a `.env.example` with placeholder values only.
- Do not expose credentials in API responses or logs.

### Performance and Maintainability

- Keep the application lightweight.
- Avoid unnecessary API calls.
- Use reusable React components.
- Implement appropriate loading states.
- Keep API integrations isolated in service modules.
- Maintain clear separation of responsibilities.

### Completion Criteria

The implementation is considered complete only when:

1. The React application runs successfully.
2. The UI matches the provided design.
3. The Jira connection works using the existing configuration.
4. Jira issue details are retrieved successfully.
5. AI-generated test cases are displayed.
6. The generated output follows the original template.
7. The Settings page is implemented.
8. Error handling works appropriately.
9. Credentials remain secure.
10. Setup and execution instructions are documented.

## O — Output

### Expected Deliverables

**1. Application Source Code**

Create the complete application inside:

`02_implementation/scr/`

Include:

- React frontend.
- Backend application.
- Jira integration.
- AI test case generation service.
- Settings page.
- Reusable UI components.
- API routes and services.

**2. Functional Application**

The final application must support the following workflow:

- Open the application.
- Enter a Jira Issue ID.
- Fetch the Jira issue automatically.
- Analyze the retrieved requirements.
- Generate AI-powered test cases.
- Display test cases using the provided template.
- Access and use the Settings page.

**3. Documentation**

Create a `README.md` inside the implementation project containing:

- Project overview.
- Technology stack.
- Folder structure.
- Environment configuration.
- Installation instructions.
- Frontend startup command.
- Backend startup command.
- Jira integration setup.
- AI configuration requirements.
- Application usage instructions.

**4. Final Implementation Summary**

After implementation, provide a summary containing:

1. Features implemented.
2. Files and folders created.
3. Technology stack used.
4. Jira integration status.
5. AI integration status.
6. Settings page implementation status.
7. Test execution and validation results.
8. Commands to start the application.
9. Any pending issues or limitations.

Do not claim a feature is working unless it has actually been implemented and verified.

## T — Tone

- Professional.
- Technical.
- Clear and structured.
- Implementation-focused.
- Practical and concise.
- Avoid unnecessary explanations.
- Prioritize working code over theoretical descriptions.

**Final Instruction:**

First inspect the existing project resources (`.env`, `00_design/`, and `01_plan/`). Then implement the complete lightweight React-based AI Jira Test Case Generator inside `02_implementation/scr/`.

Treat the existing design, configuration, and test case template as the primary sources of truth.

Do not stop after creating a plan or generating sample code. Complete the actual implementation, validate the application, and provide the final implementation summary.