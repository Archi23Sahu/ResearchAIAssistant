export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="progress-section">
      <p className="progress-label">Agent is working…</p>
      <div className="steps">
        {steps.map(step => {
          const done    = currentStep > step.id;
          const active  = currentStep === step.id;
          return (
            <div
              key={step.id}
              className={`step ${done ? "done" : ""} ${active ? "active" : ""}`}
            >
              <div className="step-icon">
                {done ? "✓" : step.icon}
                {active && <span className="pulse-ring" />}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
