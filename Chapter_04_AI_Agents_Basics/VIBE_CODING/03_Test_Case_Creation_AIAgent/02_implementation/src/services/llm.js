const { readConfig } = require('../config');

const SYSTEM_PROMPT = `You are a senior QA engineer. Generate test cases from the Jira issue only, following the provided template EXACTLY: keep every heading, section and table in the same order. Cover positive, negative and boundary scenarios and map them to acceptance criteria. Only use information present in the Jira issue. If something is missing write exactly "Insufficient information to determine." Any inferred detail must be labelled "Inference (low confidence)". Do not invent requirements. Output Markdown only, no preamble.`;

async function generateWithGroq(prompt) {
  const { groqApiKey } = readConfig();
  if (!groqApiKey) throw new Error('GROQ_API_KEY is not configured.');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      temperature: 0.2,
      max_completion_tokens: 8000,
      reasoning_effort: 'low',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Groq API error (${res.status}): ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

async function generateWithOllama(prompt) {
  const { ollamaUrl } = readConfig();
  const res = await fetch(`${ollamaUrl.replace(/\/$/, '')}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL || 'llama3.1',
      stream: false,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Ollama error (${res.status}). Is Ollama running?`);
  const data = await res.json();
  return data.message?.content || '';
}

async function generate(issue, template) {
  const prompt = `TEST CASE TEMPLATE:\n${template}\n\nJIRA ISSUE DATA:\n${JSON.stringify(
    issue,
    null,
    2
  )}`;
  return readConfig().llmProvider === 'ollama'
    ? generateWithOllama(prompt)
    : generateWithGroq(prompt);
}

async function testLlm() {
  const { llmProvider, ollamaUrl, groqApiKey } = readConfig();
  if (llmProvider === 'ollama') {
    const res = await fetch(`${ollamaUrl.replace(/\/$/, '')}/api/tags`);
    if (!res.ok) throw new Error(`Ollama returned ${res.status}.`);
    return 'Ollama reachable';
  }
  if (!groqApiKey) throw new Error('GROQ_API_KEY is not configured.');
  const res = await fetch('https://api.groq.com/openai/v1/models', {
    headers: { Authorization: `Bearer ${groqApiKey}` },
  });
  if (!res.ok) throw new Error(`Groq returned ${res.status}.`);
  return 'Groq API key valid';
}

module.exports = { generate, testLlm };
