const $ = (id) => document.getElementById(id);
let lastOutput = '';

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
    tab.classList.add('active');
    $('view-' + tab.dataset.view).classList.add('active');
    if (tab.dataset.view === 'settings') loadSettings();
  });
});

function setStatus(el, message, type = '') {
  el.textContent = message;
  el.className = 'status ' + type;
}

async function api(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

$('generateBtn').addEventListener('click', async () => {
  const jiraIssueId = $('jiraId').value.trim();
  if (!jiraIssueId) return setStatus($('status'), 'Enter a Jira ticket ID.', 'error');

  const btn = $('generateBtn');
  btn.disabled = true;
  setStatus($('status'), 'Fetching Jira issue and generating test cases...');
  $('output').textContent = '';

  try {
    const data = await api('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ jiraIssueId }),
    });
    lastOutput = data.testCases;
    $('output').textContent = lastOutput;
    $('copyBtn').disabled = false;
    $('downloadBtn').disabled = false;
    setStatus($('status'), `Generated for ${data.jiraIssueId} — ${data.issue.summary}`, 'success');
  } catch (err) {
    setStatus($('status'), err.message, 'error');
  } finally {
    btn.disabled = false;
  }
});

$('copyBtn').addEventListener('click', async () => {
  await navigator.clipboard.writeText(lastOutput);
  setStatus($('status'), 'Copied to clipboard.', 'success');
});

$('downloadBtn').addEventListener('click', () => {
  const blob = new Blob([lastOutput], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'test-cases.md';
  a.click();
  URL.revokeObjectURL(a.href);
});

async function loadSettings() {
  try {
    const s = await api('/api/settings');
    $('jiraBaseUrl').value = s.jiraBaseUrl || '';
    $('jiraEmail').value = s.jiraEmail || '';
    $('jiraApiToken').value = '';
    $('jiraApiToken').placeholder = s.jiraApiTokenSet ? 'Saved (leave blank to keep)' : 'Enter API token';
    $('groqApiKey').value = '';
    $('groqApiKey').placeholder = s.groqApiKeySet ? 'Saved (leave blank to keep)' : 'Enter Groq key';
    $('ollamaUrl').value = s.ollamaUrl || '';
    $('llmProvider').value = s.llmProvider || 'groq';
  } catch (err) {
    setStatus($('jiraStatus'), err.message, 'error');
  }
}

$('saveBtn').addEventListener('click', async () => {
  const payload = {
    JIRA_BASE_URL: $('jiraBaseUrl').value.trim(),
    JIRA_EMAIL: $('jiraEmail').value.trim(),
    JIRA_API_TOKEN: $('jiraApiToken').value.trim(),
    GROQ_API_KEY: $('groqApiKey').value.trim(),
    OLLAMA_URL: $('ollamaUrl').value.trim(),
    LLM_PROVIDER: $('llmProvider').value,
  };
  try {
    await api('/api/settings', { method: 'POST', body: JSON.stringify(payload) });
    setStatus($('llmStatus'), 'Settings saved.', 'success');
    loadSettings();
  } catch (err) {
    setStatus($('llmStatus'), err.message, 'error');
  }
});

$('testJiraBtn').addEventListener('click', async () => {
  setStatus($('jiraStatus'), 'Testing...');
  try {
    const data = await api('/api/settings/test-jira', { method: 'POST' });
    setStatus($('jiraStatus'), data.message, 'success');
  } catch (err) {
    setStatus($('jiraStatus'), err.message, 'error');
  }
});

$('testLlmBtn').addEventListener('click', async () => {
  setStatus($('llmStatus'), 'Testing...');
  try {
    const data = await api('/api/settings/test-llm', { method: 'POST' });
    setStatus($('llmStatus'), data.message, 'success');
  } catch (err) {
    setStatus($('llmStatus'), err.message, 'error');
  }
});

loadSettings();
