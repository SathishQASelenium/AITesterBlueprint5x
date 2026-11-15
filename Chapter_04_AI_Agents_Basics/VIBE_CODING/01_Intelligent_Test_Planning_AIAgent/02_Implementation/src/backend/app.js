import express from "express";
import { config } from "./config.js";
import { getIssue, testConnection } from "./jira.js";
import { generateTestPlan, testGroq, testOllama } from "./llm.js";

const app = express();
app.use(express.json());

const issueIdPattern = /^[A-Z][A-Z0-9_]*-\d+$/;

const fail = (res, error, status = 400) => res.status(status).json({ error: error.message });

app.get("/api/config", (_req, res) => {
  res.json({
    jiraUrl: config.jiraBaseUrl,
    jiraEmail: config.jiraEmail,
    jiraTokenSet: Boolean(config.jiraToken),
    groqKeySet: Boolean(config.groqKey),
    ollamaUrl: config.ollamaUrl,
    ollamaModel: config.ollamaModel,
  });
});

app.post("/api/jira/test", async (_req, res) => {
  try {
    res.json({ message: await testConnection() });
  } catch (error) {
    fail(res, error);
  }
});

app.post("/api/llm/test", async (req, res) => {
  try {
    const message = req.body?.provider === "ollama" ? await testOllama() : await testGroq();
    res.json({ message });
  } catch (error) {
    fail(res, error);
  }
});

app.post("/api/testplan", async (req, res) => {
  const issueId = String(req.body?.issueId || "").trim().toUpperCase();
  if (!issueIdPattern.test(issueId)) {
    return res.status(400).json({ error: "Enter a valid Jira issue ID, for example QA-123." });
  }

  try {
    const issue = await getIssue(issueId);
    const plan = await generateTestPlan(issue, req.body?.provider);
    res.json({
      plan,
      source: { key: issue.key, summary: issue.summary, url: issue.url },
    });
  } catch (error) {
    const status = /not found/i.test(error.message) ? 404 : 502;
    fail(res, error, status);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error." });
});

export default app;
