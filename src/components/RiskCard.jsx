export default function RiskCard({
  risk
}) {
  return (
    <div className="card">

      <h3>{risk.title}</h3>

      <p>
        Domain: {risk.domain}
      </p>

      <p>
        Impact: {risk.impact}
      </p>

      <p>
        Likelihood: {risk.likelihood}
      </p>

    </div>
  );
}