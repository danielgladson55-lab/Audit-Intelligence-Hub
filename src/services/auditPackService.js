import cloudDeveloperPacks from "../data/auditPacks/cloudDeveloperPacks";

export function getAuditPacks() {
  return cloudDeveloperPacks;
}

export function getAuditPack(packId) {
  return cloudDeveloperPacks.find((pack) => pack.id === packId) || null;
}

export function createPackAssessment(pack) {
  if (!pack) return [];

  return pack.domains.map((domain) => ({
    ...domain,
    status: "Not Assessed",
    evidenceStatus: "Not Requested",
    riskRating: "High",
    owner: "",
    targetDate: "",
    evidenceReference: "",
    notes: "",
    findings: "",
  }));
}

export function calculatePackMetrics(records) {
  const assessed = records.filter((item) => item.status !== "Not Assessed").length;
  const effective = records.filter((item) => item.status === "Effective").length;
  const partial = records.filter((item) => item.status === "Partially Effective").length;
  const ineffective = records.filter((item) => item.status === "Ineffective").length;
  const evidenceValidated = records.filter((item) => item.evidenceStatus === "Validated").length;
  const score = records.length === 0 ? 0 : Math.round(((effective + partial * 0.5) / records.length) * 100);

  return {
    total: records.length,
    assessed,
    effective,
    partial,
    ineffective,
    evidenceValidated,
    score,
  };
}
