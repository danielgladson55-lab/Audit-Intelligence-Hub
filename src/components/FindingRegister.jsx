export default function FindingRegister({
  findings,
  onDelete,
}) {
  if (findings.length === 0) {
    return (
      <div className="empty-state">
        No findings have been recorded.
      </div>
    );
  }

  return (
    <div className="finding-list">
      {findings.map((finding) => (
        <article
          className="workspace-card"
          key={finding.id}
        >
          <div className="workspace-card-header">
            <div>
              <span className="record-id">
                {finding.id}
              </span>

              <h3>{finding.title}</h3>
            </div>

            <span
              className={`risk-badge risk-${finding.rating.toLowerCase()}`}
            >
              {finding.rating}
            </span>
          </div>

          <p>
            <strong>Control:</strong>{" "}
            {finding.controlId || "Not linked"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {finding.status}
          </p>

          <p>
            <strong>Condition:</strong>{" "}
            {finding.condition || "Not documented"}
          </p>

          <p>
            <strong>Risk:</strong>{" "}
            {finding.risk || "Not documented"}
          </p>

          <p>
            <strong>Recommendation:</strong>{" "}
            {finding.recommendation ||
              "Not documented"}
          </p>

          <p>
            <strong>Owner:</strong>{" "}
            {finding.owner || "Not assigned"}
          </p>

          <p>
            <strong>Target date:</strong>{" "}
            {finding.targetDate || "Not assigned"}
          </p>

          <button
            className="danger-button"
            type="button"
            onClick={() => onDelete(finding.id)}
          >
            Delete finding
          </button>
        </article>
      ))}
    </div>
  );
}