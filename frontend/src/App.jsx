import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ReportView from "./components/ReportView";
import ProgressSteps from "./components/ProgressSteps";
import History from "./components/History";

const STEPS = [
  { id: 1, label: "Searching the web", icon: "🔍" },
  { id: 2, label: "Reading sources",   icon: "📖" },
  { id: 3, label: "Analysing content", icon: "🧠" },
  { id: 4, label: "Writing report",    icon: "✍️" },
];

export default function App() {
  const [report, setReport]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [step, setStep]       = useState(0);
  const [history, setHistory] = useState([]);
  const [topic, setTopic]     = useState("");

  async function handleSearch(searchTopic) {
    setLoading(true);
    setError(null);
    setReport(null);
    setTopic(searchTopic);
    setStep(1);

    // Simulate step progression while agent runs
    const stepTimers = [
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 10000),
      setTimeout(() => setStep(4), 18000),
    ];

    try {
      const res = await fetch("http://localhost:8000/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: searchTopic }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Something went wrong");
      }

      const data = await res.json();
      setReport(data.report);
      setHistory(prev => [
        { topic: searchTopic, report: data.report, time: new Date() },
        ...prev.slice(0, 9),
      ]);
    } catch (e) {
      setError(e.message);
    } finally {
      stepTimers.forEach(clearTimeout);
      setLoading(false);
      setStep(0);
    }
  }

  function loadFromHistory(item) {
    setTopic(item.topic);
    setReport(item.report);
    setError(null);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🔬</span>
          <span className="logo-text">ResearchAI</span>
        </div>
        <History history={history} onSelect={loadFromHistory} />
      </aside>

      <main className="main">
        <header className="hero">
          <h1>Personal Research Assistant</h1>
          <p>Enter any topic — the AI agent searches the web, reads sources, and writes a structured report with citations.</p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <ProgressSteps steps={STEPS} currentStep={step} />}

        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {report && !loading && (
          <ReportView report={report} topic={topic} />
        )}

        {!report && !loading && !error && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <p>Your research report will appear here</p>
          </div>
        )}
      </main>
    </div>
  );
}
