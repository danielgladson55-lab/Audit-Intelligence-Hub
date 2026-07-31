import frameworks from "../data/knowledgeGraph/frameworks";
import controls from "../data/knowledgeGraph/controls";
import risks from "../data/knowledgeGraph/risks";
import evidence from "../data/knowledgeGraph/evidence";

function findById(items, id) {
  return items.find((item) => item.id === id) || null;
}

export function getComplianceFrameworks() {
  return frameworks;
}

export function buildComplianceAssessment(frameworkId) {
  return controls
    .filter((control) =>
      control.mappings.some(
        (mapping) => mapping.frameworkId === frameworkId
      )
    )
    .map((control) => {
      const mapping = control.mappings.find(
        (item) => item.frameworkId === frameworkId
      );

      return {
        id: `${frameworkId}-${control.id}`,
        frameworkId,
        reference: mapping.reference,
        mappingStrength: mapping.strength,
        controlId: control.id,
        controlTitle: control.title,
        objective: control.objective,
        domain: control.domain,
        riskRecords: control.riskIds
          .map((id) => findById(risks, id))
          .filter(Boolean),
        expectedEvidence: control.evidenceIds
          .map((id) => findById(evidence, id))
          .filter(Boolean),
        applicability: "Applicable",
        implementationStatus: "Not Assessed",
        evidenceStatus: "Not Requested",
        gap: "",
        remediationAction: "",
        owner: "",
        targetDate: "",
        notes: "",
      };
    });
}

export function calculateComplianceMetrics(records) {
  const applicable = records.filter(
    (item) => item.applicability === "Applicable"
  );

  const implemented = applicable.filter(
    (item) => item.implementationStatus === "Implemented"
  ).length;

  const partiallyImplemented = applicable.filter(
    (item) => item.implementationStatus === "Partially Implemented"
  ).length;

  const gaps = applicable.filter(
    (item) => item.implementationStatus === "Not Implemented"
  ).length;

  const evidenceReady = applicable.filter(
    (item) => item.evidenceStatus === "Validated"
  ).length;

  const score =
    applicable.length === 0
      ? 0
      : Math.round(
          ((implemented + partiallyImplemented * 0.5) /
            applicable.length) *
            100
        );

  return {
    total: records.length,
    applicable: applicable.length,
    implemented,
    partiallyImplemented,
    gaps,
    evidenceReady,
    score,
  };
}
