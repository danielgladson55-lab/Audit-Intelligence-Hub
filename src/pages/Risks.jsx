import riskLibrary from "../data/riskLibrary";
import RiskCard from "../components/RiskCard";

export default function Risks() {

  return (
    <div>

      <h1>
        Risk Intelligence Repository
      </h1>

      {riskLibrary.map(risk => (
        <RiskCard
          key={risk.riskId}
          risk={risk}
        />
      ))}

    </div>
  );
}