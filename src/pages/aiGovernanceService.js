import {
  aiGovernanceDomains,
  copilotReadinessChecks,
} from "../data/aiGovernance/aiGovernanceModel";

export function createAiGovernanceAssessment() {
  const domains = aiGovernanceDomains.map((domain) => ({
    ...domain,
    status: "Not Assessed",
    evidenceStatus: "Not Requested",
    riskRating: "High",
    owner: "",
    targetDate: "",
    evidenceReference: "",
    gaps: "",
    notes: "",
  }));

  const copilot = copilotReadinessChecks.map((check) => ({
    ...check,
    status: "Not Assessed",
    evidenceStatus: "Not Requested",
    owner: "",
    evidenceReference: "",
    gaps: "",
    notes: "",
  }));

  return {
    profile: {
      systemName: "",
      useCase: "",
      owner: "",
      lifecycle: "Proposed",
      impactLevel: "High",
      providerType: "Internal",
    },
    domains,
    copilot,
    inventory: [],
  };
}

export function calculateAiMetrics(records) {
  const assessed = records.filter((item) => item.status !== "Not Assessed").length;
  const effective = records.filter((item) => item.status === "Effective").length;
  const partial = records.filter((item) => item.status === "Partially Effective").length;
  const ineffective = records.filter((item) => item.status === "Ineffective").length;
  const validated = records.filter((item) => item.evidenceStatus === "Validated").length;
  const highGaps = records.filter(
    (item) => ["Critical", "High"].includes(item.riskRating) && ["Partially Effective", "Ineffective"].includes(item.status)
  ).length;
  const score = records.length === 0 ? 0 : Math.round(((effective + partial * 0.5) / records.length) * 100);

  return { assessed, effective, partial, ineffective, validated, highGaps, score, total: records.length };
}
