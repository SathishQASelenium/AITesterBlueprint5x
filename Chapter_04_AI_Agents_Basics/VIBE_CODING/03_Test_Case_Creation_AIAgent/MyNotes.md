## Template generation using copilot:

https://copilot.cloud.microsoft/chat/share/eyJzaGFyZUlkIjoiMmE5ODRlYTQtMWYwYy00NzZlLWEzNjktNGNiOWNmNGZkMWU5IiwiY29udmVyc2F0aW9uSWQiOiJiYTllOTRhNi03YjcwLTQ0ZDUtODJhNC04NWM4YWUwMjA3NTUifQ%3D%3D

## prompt_TS_Creator.md file generation prompt in chatgpt:

https://chatgpt.com/share/6b053ae4-03c4-83e8-8a09-278b11346b87

Create this instruction in form of the RICEPOT framework:\
"Your task is to take the information like email ID, token and URL, which is already given as configuration in the .env file. There you need to take the design from the 00_design folder and create similar kind of project properly in the 02_implementation folder.\
You will create a folder name of source(in short as scr) inside implementation. In that folder you will create the frontend and backend. What exactly will happen is: This is just a simple AI project, which will take the jira ID. The user will say, "Okay this is the jira ID". You will make a connection to the jira, you will fetch the jira automatically and create a test cases document based on the template provided in the 01_plan folder.\
There is a settings page also, which is already provided in the design. You will also check that and create in this case. Your task is just to create a light weight react-based application."

RICEPOT Framework

"# Blank RICE-POT Template

Copy this, fill each section, and hand it to your AI tool.

\`\`\`
\### R — Role
[Who should the AI act as? e.g., "expert QA tester with 15 years' experience"]

\### I — Instructions
1\. [First step]
2\. [Second step]
...
Do NOT:
\- [What the AI must never do]
\- [Another hard rule]

\### C — Context
\- [Product / system / background the AI needs]
\- [What inputs or files you are attaching]

\### E — Example
[One sample row or snippet showing the ideal output]

\### P — Parameters
\- [Quality / accuracy / style constraints]
\- [Determinism, traceability, length limits, no hallucination, etc.]

\### O — Output
\- Format: [CSV / JSON / Markdown table / code]
\- Columns / structure: [exact spec, in order]

\### T — Tone
[Technical / plain / formal / output-only]
\`\`\`

\## **Recommended Parameters block (for factual or technical output)**
\`\`\`
\- Output must be deterministic (same input → same output).
\- Every assertion must be traceable to a provided input.
\- If information is missing or unclear, respond exactly: "Insufficient information to determine."
\- If a detail is inferred, label it exactly: "Inference (low confidence)".
\- Do not invent features, IDs, APIs, error codes, UI elements, or behavior.
\- Do not assume default or "typical" system behavior.
\`\`\`"
give me the final RICEPOT_prompt all filled.

## Prompt:
@Chapter_04_AI_Agents_Basics/VIBE_CODING/03_Test_Case_Creation_AIAgent/02_implementation/prompt_TC_Creator.md .env file is present in Chapter_04_AI_Agents_Basics\VIBE_CODING\.env open the localhost when you are done, keep it very simple and short, all code must be in Chapter_04_AI_Agents_Basics\VIBE_CODING\03_Test_Case_Creation_AIAgent\02_implementation\src folder

## Execution:
1. Check the settings whether the JIRA connection is working
2. Check the settings whether the Groq key is working
3. Provide the JIRA ID like "KAN-4" and click the button, it must provide the result in .md format which is downloaded and saved in the folder.

## Deploy in vercel:
deploy this project into vercel, i want the link to be ai5x-testcasecreator.vercel.app and you can add the .env variable in vercel itself

https://ai5x-testcasecreator.vercel.app