import { config } from "./config.js";

const authHeader = () =>
  "Basic " +
  Buffer.from(`${config.jiraEmail}:${config.jiraToken}`).toString("base64");

const messages = {
  401: "Jira authentication failed. Check JIRA_EMAIL and JIRA_API_TOKEN.",
  403: "Jira permission denied for this request.",
  404: "Jira issue not found, or the configured account cannot view it.",
};

async function jiraGet(pathname) {
  if (!config.jiraBaseUrl || !config.jiraEmail || !config.jiraToken) {
    throw new Error("Jira is not configured. Set JIRA_BASE_URL, JIRA_EMAIL and JIRA_API_TOKEN in .env.");
  }

  let res;
  try {
    res = await fetch(`${config.jiraBaseUrl}/rest/api/3${pathname}`, {
      headers: { Authorization: authHeader(), Accept: "application/json" },
    });
  } catch {
    throw new Error(`Could not reach Jira at ${config.jiraBaseUrl}.`);
  }

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = body.errorMessages?.join("; ") || body.message || res.statusText;
    throw new Error(messages[res.status] || `Jira error ${res.status}: ${detail}`);
  }
  return body;
}

function adfToText(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(adfToText).join("");
  if (node.type === "text") return node.text || "";
  if (node.type === "hardBreak") return "\n";
  if (node.type === "mention") return `@${node.attrs?.text || ""}`;
  const inner = adfToText(node.content);
  return ["paragraph", "heading", "listItem", "codeBlock", "blockquote"].includes(node.type)
    ? `${inner.trim()}\n`
    : inner;
}

let fieldNames;

async function getFieldNames() {
  if (!fieldNames) {
    fieldNames = {};
    for (const field of await jiraGet("/field")) fieldNames[field.id] = field.name;
  }
  return fieldNames;
}

export async function testConnection() {
  const me = await jiraGet("/myself");
  return `Connected to ${config.jiraBaseUrl} as ${me.displayName || me.emailAddress}`;
}

export async function getIssue(issueId) {
  const issue = await jiraGet(`/issue/${encodeURIComponent(issueId)}?fields=*all`);
  const fields = issue.fields || {};
  const names = await getFieldNames();

  const acceptance = [];
  for (const [id, value] of Object.entries(fields)) {
    if (!id.startsWith("customfield_") || value == null) continue;
    if (!/acceptance|criteria|requirement/i.test(names[id] || "")) continue;
    const text = typeof value === "object" ? adfToText(value) : String(value);
    if (text.trim()) acceptance.push({ field: names[id], text: text.trim() });
  }

  return {
    key: issue.key,
    url: `${config.jiraBaseUrl}/browse/${issue.key}`,
    summary: fields.summary || "",
    type: fields.issuetype?.name || "",
    status: fields.status?.name || "",
    priority: fields.priority?.name || "",
    labels: fields.labels || [],
    components: (fields.components || []).map((c) => c.name),
    environment: fields.environment || "",
    description:
      typeof fields.description === "object"
        ? adfToText(fields.description).trim()
        : String(fields.description || "").trim(),
    acceptance,
  };
}
