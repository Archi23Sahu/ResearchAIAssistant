export default function History({ history, onSelect }) {
  if (history.length === 0) {
    return (
      <div className="history-empty">
        <p>No searches yet</p>
        <span>Your past topics will appear here</span>
      </div>
    );
  }

  return (
    <div className="history">
      <h3 className="history-title">Recent</h3>
      <ul className="history-list">
        {history.map((item, i) => (
          <li key={i}>
            <button className="history-item" onClick={() => onSelect(item)}>
              <span className="history-icon">📌</span>
              <span className="history-topic">{item.topic}</span>
              <span className="history-time">
                {item.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
