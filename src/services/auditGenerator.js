export function generateAuditPackage(
  audit
) {
  return {
    scope: audit.domains,

    objectives:
      audit.objectives,

    controls: [
      "IAM-001",
      "IAM-002",
      "CHG-001"
    ],

    evidence: [
      "Access Listings",
      "Change Tickets",
      "Role Matrix"
    ],

    deliverables: [
      "Audit Report",
      "Management Action Plan",
      "Risk Register"
    ]
  };
}