import { useState } from "react";

const EXAMPLES = [
  "Quantum computing in 2025",
  "Climate change latest research",
  "Large language models explained",
  "Space tourism industry",
];

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (value.trim() && !loading) onSearch(value.trim());
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="search-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter a research topic..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
          className="search-input"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !value.trim()}
          className="search-btn"
        >
          {loading ? <span className="spinner" /> : "Research →"}
        </button>
      </div>

      <div className="examples">
        <span className="examples-label">Try:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex}
            className="example-chip"
            onClick={() => { setValue(ex); onSearch(ex); }}
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
