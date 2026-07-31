import enterpriseApplicationPacks from "../data/auditPacks/enterpriseApplicationPacks";

export function getEnterprisePacks() {
  return enterpriseApplicationPacks;
}

export function createEnterpriseAssessment(pack) {
  if (!pack) return [];

  return pack.domains.map((domain) => ({
    ...domain,
    status: "Not Assessed",
    evidenceStatus: "Not Requested",
    riskRating: "High",
    owner: "",
    targetDate: "",
    evidenceReference: "",
    findings: "",
    notes: "",
  }));
}

export function calculateEnterpriseMetrics(records) {
  const assessed = records.filter(
    (item) => item.status !== "Not Assessed"
  ).length;
  const effective = records.filter(
    (item) => item.status === "Effective"
  ).length;
  const partial = records.filter(
    (item) => item.status === "Partially Effective"
  ).length;
  const ineffective = records.filter(
    (item) => item.status === "Ineffective"
  ).length;
  const validated = records.filter(
    (item) => item.evidenceStatus === "Validated"
  ).length;
  const highGaps = records.filter(
    (item) =>
      ["Critical", "High"].includes(item.riskRating) &&
      ["Partially Effective", "Ineffective"].includes(item.status)
  ).length;
  const score =
    records.length === 0
      ? 0
      : Math.round(
          ((effective + partial * 0.5) / records.length) * 100
        );

  return {
    total: records.length,
    assessed,
    effective,
    partial,
    ineffective,
    validated,
    highGaps,
    score,
  };
}
