import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ReportView({ report, topic }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([report], { type: "text/markdown" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${topic.replace(/\s+/g, "_")}_report.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="report-wrapper">
      <div className="report-toolbar">
        <span className="report-badge">📄 Research Report</span>
        <div className="toolbar-actions">
          <button className="tool-btn" onClick={handleCopy}>
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
          <button className="tool-btn" onClick={handleDownload}>
            ⬇ Download .md
          </button>
        </div>
      </div>

      <article className="report-body">
        <ReactMarkdown>{report}</ReactMarkdown>
      </article>
    </div>
  );
}
