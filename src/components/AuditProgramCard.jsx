export default function AuditProgramCard({
  audit
}) {
  return (
    <div className="card">

      <h3>{audit.title}</h3>

      <h4>Objectives</h4>

      <ul>
        {audit.objectives.map(obj => (
          <li key={obj}>
            {obj}
          </li>
        ))}
      </ul>

    </div>
  );
}
