export default function ProgressBar({
  completed,
  total,
}) {
  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="progress-wrapper">
      <div className="progress-label">
        <span>Audit progress</span>
        <strong>{percentage}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-value"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}