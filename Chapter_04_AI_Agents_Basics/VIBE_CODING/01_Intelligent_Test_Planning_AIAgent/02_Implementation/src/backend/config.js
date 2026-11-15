import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(here, "../../../../.env");

try {
  process.loadEnvFile(envPath);
} catch {
  console.warn(`[config] No .env file at ${envPath}; using process environment.`);
}

const trimSlash = (value) => (value || "").trim().replace(/\/+$/, "");

export const config = {
  jiraBaseUrl: trimSlash(process.env.JIRA_BASE_URL),
  jiraEmail: (process.env.JIRA_EMAIL || "").trim(),
  jiraToken: (process.env.JIRA_API_TOKEN || "").trim(),
  groqKey: (process.env.GROQ_API_KEY || "").trim(),
  groqModel: (process.env.GROQ_MODEL || "").trim(),
  ollamaUrl: trimSlash(process.env.OLLAMA_URL || "http://localhost:11434"),
  ollamaModel: (process.env.OLLAMA_MODEL || "llama3.2").trim(),
};

const templateCandidates = [
  path.resolve(here, "../../../01_plan/test-plan-template.md"),
  path.join(here, "test-plan-template.md"),
];
export const templatePath = templateCandidates.find((candidate) => fs.existsSync(candidate)) || templateCandidates[1];

