import controlLibrary from "../data/controlLibrary";
import riskLibrary from "../data/riskLibrary";

export function getRiskDetails(riskId) {
  const risk = riskLibrary.find(
    (r) => r.riskId === riskId
  );

  if (!risk) return null;

  const controls = controlLibrary.filter(
    (control) =>
      risk.controls.includes(
        control.controlId
      )
  );

  return {
    risk,
    controls,
  };
}