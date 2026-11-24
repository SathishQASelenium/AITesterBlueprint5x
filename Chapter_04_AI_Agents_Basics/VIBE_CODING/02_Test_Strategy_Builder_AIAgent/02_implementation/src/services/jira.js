const { readConfig } = require('../config');

function authHeader() {
  const { jiraEmail, jiraApiToken } = readConfig();
  return 'Basic ' + Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64');
}

// Jira Cloud descriptions are Atlassian Document Format (ADF) JSON.
function adfToText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(adfToText).join('');
  let text = node.text || '';
  if (node.content) text += adfToText(node.content);
  if (node.type === 'paragraph' || node.type === 'heading') text += '\n';
  if (node.type === 'listItem') text += '\n- ';
  return text;
}

async function getIssue(issueId) {
  const { jiraBaseUrl } = readConfig();
  const url = `${jiraBaseUrl}/rest/api/3/issue/${encodeURIComponent(issueId)}`;

  const res = await fetch(url, {
    headers: { Authorization: authHeader(), Accept: 'application/json' },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error('Jira authentication failed. Check email and API token.');
  }
  if (res.status === 404) {
    throw new Error(`Jira issue "${issueId}" not found.`);
  }
  if (!res.ok) {
    throw new Error(`Jira API error (${res.status}).`);
  }

  const data = await res.json();
  const f = data.fields || {};

  const acceptanceCandidates = Object.entries(f)
    .filter(([k, v]) => /acceptance/i.test(k) && v)
    .map(([, v]) => (typeof v === 'object' ? adfToText(v) : String(v)));

  return {
    key: data.key,
    id: data.id,
    summary: f.summary || '',
    description: adfToText(f.description) || '',
    acceptanceCriteria: acceptanceCandidates.join('\n').trim(),
    issueType: f.issuetype?.name || '',
    priority: f.priority?.name || '',
    status: f.status?.name || '',
    components: (f.components || []).map((c) => c.name),
    labels: f.labels || [],
    linkedIssues: (f.issuelinks || [])
      .map((l) => l.outwardIssue?.key || l.inwardIssue?.key)
      .filter(Boolean),
  };
}

async function testConnection() {
  const { jiraBaseUrl } = readConfig();
  const res = await fetch(`${jiraBaseUrl}/rest/api/3/myself`, {
    headers: { Authorization: authHeader(), Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Jira returned ${res.status}.`);
  const me = await res.json();
  return me.emailAddress || me.displayName || 'authenticated';
}

module.exports = { getIssue, testConnection };
