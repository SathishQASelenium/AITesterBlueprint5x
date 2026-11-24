const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const ENV_PATH = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: ENV_PATH });

const LOCAL_TEMPLATE = path.resolve(__dirname, 'template/test-strategy-template.md');
const REPO_TEMPLATE = path.resolve(
  __dirname,
  '../../01_plan/test-strategy-template.md'
);
const TEMPLATE_PATH = fs.existsSync(LOCAL_TEMPLATE) ? LOCAL_TEMPLATE : REPO_TEMPLATE;

function readConfig() {
  return {
    jiraBaseUrl: (process.env.JIRA_BASE_URL || '').replace(/\/$/, ''),
    jiraEmail: process.env.JIRA_EMAIL || '',
    jiraApiToken: process.env.JIRA_API_TOKEN || '',
    groqApiKey: process.env.GROQ_API_KEY || '',
    ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
    llmProvider: process.env.LLM_PROVIDER || 'groq',
  };
}

function missingKeys() {
  const c = readConfig();
  const required = ['jiraBaseUrl', 'jiraEmail', 'jiraApiToken'];
  return required.filter((k) => !c[k]);
}

function readTemplate() {
  return fs.readFileSync(TEMPLATE_PATH, 'utf8');
}

// Persist settings into the existing .env without touching unrelated keys.
function saveConfig(updates) {
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error(
      'Settings cannot be saved on this deployment. Set the environment variables in Vercel instead.'
    );
  }
  const allowed = [
    'JIRA_BASE_URL',
    'JIRA_EMAIL',
    'JIRA_API_TOKEN',
    'GROQ_API_KEY',
    'OLLAMA_URL',
    'LLM_PROVIDER',
  ];
  const current = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, 'utf8') : '';
  const lines = current.split(/\r?\n/).filter((l) => l.trim() !== '');
  const map = new Map();
  for (const line of lines) {
    const i = line.indexOf('=');
    map.set(i === -1 ? line : line.slice(0, i), line);
  }
  for (const [key, value] of Object.entries(updates)) {
    if (!allowed.includes(key) || value === undefined || value === '') continue;
    map.set(key, `${key}=${value}`);
    process.env[key] = value;
  }
  fs.writeFileSync(ENV_PATH, [...map.values()].join('\n') + '\n', 'utf8');
}

module.exports = { readConfig, missingKeys, readTemplate, saveConfig, ENV_PATH };
