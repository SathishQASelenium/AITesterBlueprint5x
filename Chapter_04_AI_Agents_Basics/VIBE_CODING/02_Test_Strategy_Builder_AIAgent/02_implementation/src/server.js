const path = require('path');
const express = require('express');
const { readConfig, missingKeys, readTemplate, saveConfig } = require('./config');
const jira = require('./services/jira');
const llm = require('./services/llm');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const wrap = (fn) => (req, res) =>
  Promise.resolve(fn(req, res)).catch((err) => res.status(400).json({ error: err.message }));

app.post('/api/generate', wrap(async (req, res) => {
  const { jiraIssueId } = req.body || {};
  if (!jiraIssueId || !String(jiraIssueId).trim()) {
    return res.status(400).json({ error: 'A Jira issue ID is required.' });
  }
  const missing = missingKeys();
  if (missing.length) {
    return res.status(400).json({ error: `Missing configuration: ${missing.join(', ')}` });
  }

  const issue = await jira.getIssue(String(jiraIssueId).trim().toUpperCase());
  const template = readTemplate();
  const strategy = await llm.generate(issue, template);

  res.json({ success: true, jiraIssueId: issue.key, issue, testStrategy: strategy });
}));

app.get('/api/settings', (req, res) => {
  const c = readConfig();
  res.json({
    jiraBaseUrl: c.jiraBaseUrl,
    jiraEmail: c.jiraEmail,
    jiraApiTokenSet: Boolean(c.jiraApiToken),
    groqApiKeySet: Boolean(c.groqApiKey),
    ollamaUrl: c.ollamaUrl,
    llmProvider: c.llmProvider,
  });
});

app.post('/api/settings', wrap(async (req, res) => {
  saveConfig(req.body || {});
  res.json({ success: true });
}));

app.post('/api/settings/test-jira', wrap(async (req, res) => {
  const user = await jira.testConnection();
  res.json({ success: true, message: `Connected to Jira as ${user}` });
}));

app.post('/api/settings/test-llm', wrap(async (req, res) => {
  const message = await llm.testLlm();
  res.json({ success: true, message });
}));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`AI Test Strategy Builder running at http://localhost:${PORT}`);
    const missing = missingKeys();
    if (missing.length) {
      console.warn(`[config] Missing required settings: ${missing.join(', ')}`);
    }
  });
}

module.exports = app;
