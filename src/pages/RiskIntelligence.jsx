import knowledgeGraph from "../data/knowledgeGraph";

export default function RiskIntelligence() {
  return (
    <div>
      <h1>Risk Intelligence Hub</h1>

      {knowledgeGraph.map((risk) => (
        <div key={risk.riskId} className="card">

          <h2>{risk.risk}</h2>

          <h3>Controls</h3>
          <ul>
            {
              risk.controls.map(control => (
                <li key={control}>{control}</li>
              ))
            }
          </ul>

          <h3>Frameworks</h3>
          <ul>
            {
              risk.frameworks.map(framework => (
                <li key={framework}>
                  {framework}
                </li>
              ))
            }
          </ul>

          <h3>Evidence</h3>
          <ul>
            {
              risk.evidence.map(item => (
                <li key={item}>{item}</li>
              ))
            }
          </ul>

        </div>
      ))}
    </div>
  );
}
