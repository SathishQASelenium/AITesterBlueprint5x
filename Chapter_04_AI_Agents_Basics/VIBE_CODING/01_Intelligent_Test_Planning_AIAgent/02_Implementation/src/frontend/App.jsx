import { useEffect, useState } from "react";

async function post(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

const secretState = (isSet) => (isSet ? "•••••••• set in .env" : "not set in .env");

export default function App() {
  const [config, setConfig] = useState(null);
  const [issueId, setIssueId] = useState("");
  const [provider, setProvider] = useState("groq");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [checks, setChecks] = useState({});

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then(setConfig)
      .catch(() => setError("Could not load settings from the backend."));
  }, []);

  async function runCheck(name, path, body) {
    setChecks((prev) => ({ ...prev, [name]: "Checking..." }));
    try {
      const data = await post(path, body);
      setChecks((prev) => ({ ...prev, [name]: `✓ ${data.message}` }));
    } catch (err) {
      setChecks((prev) => ({ ...prev, [name]: `✗ ${err.message}` }));
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (loading || !issueId.trim()) return;
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await post("/api/testplan", { issueId, provider }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="layout">
      <section className="card">
        <h2>Main page</h2>

        <div className="reply" aria-live="polite">
          {loading && <p className="muted">Retrieving Jira issue and generating the test plan…</p>}
          {!loading && error && <p className="error">{error}</p>}
          {!loading && !error && result && (
            <>
              <p className="source">
                Source:{" "}
                <a href={result.source.url} target="_blank" rel="noreferrer">
                  {result.source.key}
                </a>{" "}
                — {result.source.summary}
              </p>
              <pre className="plan">{result.plan}</pre>
            </>
          )}
          {!loading && !error && !result && <p className="muted">Reply with Test Plan</p>}
        </div>

        <form className="prompt" onSubmit={submit}>
          <label htmlFor="issue">Prompt (JIRA Ticket)</label>
          <div className="row">
            <input
              id="issue"
              value={issueId}
              onChange={(event) => setIssueId(event.target.value)}
              placeholder="QA-123"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !issueId.trim()}>
              {loading ? "Generating…" : "Generate"}
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Settings</h2>

        <div className="panel">
          <h3>JIRA Connection</h3>
          <dl>
            <dt>Email</dt>
            <dd>{config?.jiraEmail || "—"}</dd>
            <dt>URL</dt>
            <dd>{config?.jiraUrl || "—"}</dd>
            <dt>Token</dt>
            <dd>{secretState(config?.jiraTokenSet)}</dd>
          </dl>
          <button onClick={() => runCheck("jira", "/api/jira/test")}>Test Connection</button>
          {checks.jira && <p className="check">{checks.jira}</p>}
        </div>

        <div className="panel">
          <h3>LLM Configuration</h3>
          <label className="field">
            Active provider
            <select value={provider} onChange={(event) => setProvider(event.target.value)}>
              <option value="groq">Groq.com</option>
              <option value="ollama">Ollama (local)</option>
            </select>
          </label>
          <dl>
            <dt>Ollama</dt>
            <dd>{config?.ollamaUrl || "—"} · {config?.ollamaModel || "—"}</dd>
            <dt>Groq API key</dt>
            <dd>{secretState(config?.groqKeySet)}</dd>
          </dl>
          <div className="row">
            <button onClick={() => runCheck("ollama", "/api/llm/test", { provider: "ollama" })}>
              Test Local LLM
            </button>
            <button onClick={() => runCheck("groq", "/api/llm/test", { provider: "groq" })}>
              Test Groq.com
            </button>
          </div>
          {checks.ollama && <p className="check">{checks.ollama}</p>}
          {checks.groq && <p className="check">{checks.groq}</p>}
        </div>

        <p className="muted small">Credentials are read from the server-side .env and never sent to the browser.</p>
      </section>
    </main>
  );
}
