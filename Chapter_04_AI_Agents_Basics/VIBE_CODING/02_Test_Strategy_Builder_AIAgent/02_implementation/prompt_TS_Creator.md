# RICE-POT PROMPT – AI TEST STRATEGY BUILDER APPLICATION

## R — Role

Act as a **Senior Full-Stack Developer, UI/UX Engineer, and AI Automation Architect** with 15+ years of experience in:

- React-based application development.
- Lightweight frontend and backend architecture.
- Jira REST API integration and authentication.
- AI-powered QA automation solutions.
- Software Test Strategy and Test Planning.
- Responsive UI development and design-to-code implementation.
- Secure environment configuration and API integration.

Your responsibility is to analyze the existing project resources, understand the provided design references, and implement a fully functional, lightweight, React-based AI Test Strategy Builder application.

Follow clean coding practices, modular architecture, maintainability, and production-ready development standards.

---

## I — Instructions

Follow the implementation steps in the exact order below.

### 1. Analyze the Existing Project Structure

Before writing any code, inspect the existing project directory.

You will find the following folders:

- `00_design/` – Contains UI/UX design references, screen layouts, visual elements, and application design specifications.
- `01_plan/` – Contains the Test Strategy document template and other planning-related resources.
- `02_implementation/` – Destination folder where the actual application must be developed.
- `.env` – Contains the existing configuration values, including Jira URL, email ID, API token, and other required credentials.

Actions:

1. Thoroughly inspect the `00_design` folder.
2. Review every available design screen, component, and reference.
3. Inspect the `01_plan` folder and identify the Test Strategy document template.
4. Inspect the `.env` file to understand the available configuration variables.
5. Understand how the design, configuration, and planning template relate to the expected application.
6. Prepare an implementation approach before starting development.

Do not modify or delete the existing design, planning, or configuration files.

### 2. Create the Application Folder Structure

Create the application inside `02_implementation/`.

The required project structure is:

```text
02_implementation/
│
└── scr/
    │
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── assets/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   ├── hooks/
    │   │   ├── utils/
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   └── package.json
    │
    └── backend/
        ├── src/
        │   ├── config/
        │   ├── controllers/
        │   ├── routes/
        │   ├── services/
        │   ├── middleware/
        │   ├── utils/
        │   └── server.js
        └── package.json
```

Note: Use the folder name `scr` exactly as specified.

You may introduce additional folders or files when technically necessary, but maintain the separation between frontend and backend.

### 3. Implement the Frontend Application

Build a lightweight React-based application that closely follows the UI/UX design provided in `00_design`.

Primary requirements:

1. Use React for frontend development.
2. Create reusable and maintainable components.
3. Follow the provided design for layouts, colors, typography, spacing, buttons, input fields, cards, and navigation.
4. Ensure the application is responsive across desktop, tablet, and mobile devices.
5. Maintain a clean and professional QA/enterprise application appearance.
6. Implement proper loading indicators, success messages, error messages, and empty states.
7. Ensure all visible buttons and controls perform their intended actions.

Do not introduce unnecessary complexity or additional features that are not part of the supplied design or requirements.

### 4. Implement the Jira Test Strategy Builder

The primary purpose of this application is to generate a Test Strategy document automatically using a Jira issue ID.

Expected workflow:

**Step 1 – User Input**

Provide an input field where the user can enter a Jira issue ID.

Example:

`VWO-140`

Provide a Generate Test Strategy button.

**Step 2 – Jira Integration**

When the user submits the Jira issue ID:

1. Send the issue ID to the backend.
2. Read the Jira configuration from the existing `.env` file.
3. Establish a connection to the configured Jira instance.
4. Authenticate using the configured credentials.
5. Fetch the corresponding Jira issue automatically.
6. Retrieve all relevant available issue information, including:
   - Jira issue ID and key.
   - Summary.
   - Description.
   - Acceptance criteria, if available.
   - Issue type.
   - Priority.
   - Status.
   - Components.
   - Labels.
   - Relevant linked issues, if available.
7. Process and structure the retrieved Jira information.
8. Handle invalid issue IDs, authentication failures, API errors, and missing information gracefully.

Never expose Jira credentials or API tokens to the frontend.

All Jira API communication must happen through the backend.

**Step 3 – AI Test Strategy Generation**

After successfully retrieving Jira information:

1. Analyze the Jira issue content.
2. Read the Test Strategy template available in the `01_plan` folder.
3. Use the provided template as the source of truth for document structure.
4. Map the available Jira information to the appropriate sections of the template.
5. Generate a comprehensive Test Strategy document.
6. Ensure the generated content is relevant to the actual Jira issue.
7. Clearly identify missing information instead of inventing details.
8. Preserve the template's headings, sections, and expected structure.

The generated document should follow the supplied template rather than introducing an entirely new format.

**Step 4 – Display the Generated Document**

Display the generated Test Strategy in a clean and readable interface.

Provide appropriate actions based on the supplied design, such as:

- View generated Test Strategy.
- Copy document content.
- Download the document, if supported by the design.
- Generate again when required.

Ensure the generated document is readable and properly formatted.

### 5. Implement the Settings Page

A Settings page is already included in the `00_design` folder.

You must inspect the design carefully and implement the Settings page accordingly.

Requirements:

1. Follow the provided Settings page design.
2. Identify all available settings sections and UI controls.
3. Implement the relevant settings functionality.
4. Support configuration management where specified by the design.
5. Display appropriate validation and error messages.
6. Ensure the Settings page integrates correctly with the main application.

Important:

- Do not invent additional settings.
- Do not display sensitive credentials in plain text.
- Do not expose environment variables or API tokens through frontend API responses.
- If the design includes Jira connection settings, implement them securely through the backend.

### 6. Backend Implementation

Create a lightweight backend to support the frontend application.

Responsibilities:

- Load environment variables securely.
- Manage Jira authentication.
- Connect to Jira REST APIs.
- Retrieve Jira issue information.
- Read and process the Test Strategy template.
- Prepare structured Jira issue data for AI processing.
- Generate the Test Strategy document.
- Return structured responses to the frontend.
- Handle errors and validation consistently.

Keep the backend modular by separating routes, controllers, services, and configuration.

### 7. Environment Configuration

Use the existing `.env` file as the source of configuration.

Do not hardcode any credentials, URLs, email IDs, API tokens, or secrets in source code.

Use environment variables for all required integrations.

Requirements:

1. Inspect the existing `.env` variable names.
2. Reuse the existing configuration wherever possible.
3. Do not overwrite existing values.
4. Do not print secrets in terminal output, logs, or application responses.
5. Create an `.env.example` containing placeholder values if needed.
6. Add `.env` to `.gitignore`.
7. Validate required environment variables during backend startup.

If a required configuration value is missing, display a meaningful configuration error without revealing sensitive information.

### 8. Application Testing and Validation

After implementation, validate the complete application.

Perform the following checks:

- Frontend application starts successfully.
- Backend application starts successfully.
- Frontend and backend communicate correctly.
- Jira authentication works with the configured credentials.
- Valid Jira issue IDs retrieve the correct issue information.
- Invalid Jira issue IDs display appropriate error messages.
- Test Strategy template is read successfully.
- Generated document follows the supplied template.
- Missing Jira information is handled appropriately.
- Settings page loads and functions correctly.
- Responsive UI works correctly.
- No credentials are exposed in browser requests or frontend source.
- No unnecessary console errors or backend failures occur.

Fix any issues discovered during validation.

### 9. Final Implementation Review

Before completing the task:

1. Compare the implemented application against the original designs in `00_design`.
2. Verify that all required screens are implemented.
3. Verify that the Test Strategy generation workflow works end to end.
4. Verify that the existing `.env` configuration is being used correctly.
5. Verify that the supplied Test Strategy template is respected.
6. Remove unnecessary files, unused dependencies, and debugging code.
7. Provide clear instructions to install dependencies and start both applications.

### Do NOT

- Do NOT modify or delete the contents of `00_design` or `01_plan`.
- Do NOT overwrite the existing `.env` file.
- Do NOT hardcode Jira credentials or API tokens.
- Do NOT expose secrets in frontend code.
- Do NOT create a completely different UI from the supplied design.
- Do NOT invent Jira issue information or acceptance criteria.
- Do NOT invent Test Strategy sections that conflict with the supplied template.
- Do NOT generate dummy Jira data and present it as actual Jira information.
- Do NOT create unnecessary microservices or complicated infrastructure.
- Do NOT introduce unnecessary technologies or dependencies.
- Do NOT stop after creating static UI screens; implement the actual Jira integration and generation workflow.

---

## C — Context

This project is a lightweight AI-powered QA application called **AI Test Strategy Builder**.

Its primary objective is to reduce manual effort in preparing Test Strategy documents.

The application will use three existing project resources:

| Resource | Purpose |
|---|---|
| `00_design/` | Reference for UI/UX implementation |
| `01_plan/` | Source of truth for the Test Strategy document template |
| `.env` | Existing Jira and integration configuration |

The implementation destination is:

`02_implementation/scr/`

The application will contain two major parts:

- **Frontend:** React-based user interface.
- **Backend:** Jira integration, template processing, and AI generation logic.

### Expected User Journey

1. User opens the AI Test Strategy Builder.
2. User enters a Jira issue ID.
3. User clicks Generate Test Strategy.
4. Backend connects to Jira using existing environment configuration.
5. Backend retrieves the Jira issue information.
6. The AI processes the issue information against the provided Test Strategy template.
7. The generated Test Strategy document is displayed to the user.
8. User can review and use the generated document.
9. User can navigate to the Settings page to manage the settings supported by the design.

### Core Technology Direction

- Frontend: React.
- Backend: Lightweight Node.js-based backend.
- Integration: Jira REST API.
- AI: Use the AI integration or provider configured in the project, if available.
- Configuration: Existing `.env`.
- UI/UX: Existing `00_design` references.

Prefer the simplest maintainable technology stack that satisfies the requirements. Do not assume an AI provider or API configuration exists unless it is actually present in the project.

---

## E — Example

### Example Input

```text
Jira Issue ID: VWO-140
```

### Expected Application Workflow

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
Read .env Configuration
  |
  v
Authenticate with Jira
  |
  v
Fetch Jira Issue VWO-140
  |
  v
Extract Available Issue Information
  |
  v
Read Test Strategy Template
  |
  v
AI Test Strategy Generation
  |
  v
Validate Generated Content
  |
  v
Display Test Strategy
```

### Example Backend Request

```json
{
  "jiraIssueId": "VWO-140"
}
```

### Example Backend Response

```json
{
  "success": true,
  "jiraIssueId": "VWO-140",
  "data": {
    "summary": "Sample Jira issue summary",
    "description": "Actual description retrieved from Jira",
    "issueType": "Story",
    "priority": "High"
  },
  "testStrategy": {
    "status": "generated",
    "content": "Generated Test Strategy document based on the supplied template."
  }
}
```

Note: This is an illustrative response structure. Actual Jira information must always come from the Jira API. Do not use this sample content as real project data.

---

## P — Parameters

### Development Quality

- Build a lightweight, maintainable React application.
- Follow clean architecture and separation of concerns.
- Use reusable components wherever appropriate.
- Keep frontend and backend responsibilities separate.
- Avoid unnecessary dependencies and overengineering.
- Follow secure coding practices.
- Ensure responsive design and accessibility.

### Accuracy and Anti-Hallucination

- Output must be deterministic wherever practical.
- Every factual assertion about a Jira issue must be traceable to retrieved Jira information.
- Every Test Strategy section must follow the provided template.
- Do not invent features, acceptance criteria, APIs, requirements, or business rules.
- Do not assume default or typical system behavior.
- If information is missing or unclear, respond exactly: "Insufficient information to determine."
- If a detail is inferred, label it exactly: "Inference (low confidence)".
- Clearly distinguish retrieved Jira information from AI-generated recommendations.
- Do not claim successful Jira integration unless the connection has been verified.
- Do not claim successful document generation unless the generated output has been validated.

### Security

- Keep all secrets on the backend.
- Never expose API tokens or credentials to the browser.
- Validate and sanitize user inputs.
- Use secure environment configuration.
- Do not log authentication headers or tokens.
- Handle Jira API failures securely.

### Performance

- Keep the application lightweight.
- Avoid unnecessary API calls.
- Display loading states during Jira retrieval and document generation.
- Handle API timeouts and unexpected failures.
- Keep the user experience responsive.

### Implementation Discipline

- Inspect before implementing.
- Reuse existing resources.
- Follow the design rather than guessing.
- Implement functionality before adding optional enhancements.
- Do not modify source reference materials.
- Validate each major implementation stage before proceeding.

---

## O — Output

### 1. Application Structure

Create the complete application under:

`02_implementation/scr/`

Include:

- React frontend.
- Backend application.
- Reusable components.
- Jira integration services.
- Test Strategy generation services.
- Configuration management.
- Required package files.
- `.gitignore`.
- `.env.example`, if necessary.
- README.md with setup and execution instructions.

### 2. Required Application Screens

Implement the screens based on the provided design:

1. Main / Dashboard screen.
2. Jira Issue ID input and Test Strategy generation screen.
3. Generated Test Strategy display screen.
4. Settings page.

Do not omit any screen or relevant functionality present in the supplied design.

### 3. Functional Deliverables

The completed application must support:

- Jira issue ID input.
- Jira API integration.
- Automatic Jira issue retrieval.
- Test Strategy template reading.
- AI-powered Test Strategy generation.
- Generated document display.
- Appropriate error handling.
- Settings page functionality.
- Secure environment configuration.

### 4. Final Development Report

After implementation, provide a concise report containing:

**A. Implementation Summary**
- Features implemented.
- Screens created.
- Integrations completed.

**B. Project Structure**
- Final folder and file structure.

**C. Configuration**
- Environment variables required.
- Configuration validation status.
- Any missing configuration.

**D. Testing Results**
- Frontend validation.
- Backend validation.
- Jira integration validation.
- Test Strategy generation validation.

**E. Execution Instructions**

Provide the exact commands required to:

1. Install frontend dependencies.
2. Install backend dependencies.
3. Start the backend.
4. Start the frontend.
5. Access the application locally.

**F. Known Limitations**
- List any incomplete functionality.
- List any unavailable integrations.
- Identify anything requiring manual configuration.

### Definition of Done

The implementation is complete only when:

- The application follows the supplied design.
- Frontend and backend are implemented.
- Jira issue retrieval works using the existing configuration.
- The supplied Test Strategy template is used.
- AI-powered Test Strategy generation works when the required AI configuration is available.
- The Settings page is implemented.
- Sensitive configuration remains secure.
- The application has been validated through an end-to-end workflow.

---

## T — Tone

- Act as a senior engineer responsible for delivering a working application.
- Be technical, precise, and implementation-focused.
- Prioritize functionality, maintainability, and design accuracy.
- Avoid unnecessary explanations during implementation.
- Do not make assumptions when source information is available.
- Report blockers honestly.
- Provide clear technical documentation and execution instructions.

**Final Objective:** Build a fully functional, lightweight, React-based AI Test Strategy Builder that accepts a Jira issue ID, retrieves the actual Jira issue information, generates a Test Strategy document using the existing template, and provides a Settings page matching the supplied design.