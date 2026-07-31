const WORKSPACE_KEY = "audit-intelligence-hub-workspace-v1";

export function sendAuditPackToWorkspace(pack, records) {
  const controlTests = records.map((record) => ({
    controlId: record.id,
    controlName: record.name,
    domain: pack.name,
    risk: record.risk,
    auditProcedures: record.checks,
    evidence: record.evidence,
    testStatus: "Not Started",
    evidenceStatus: "Not Requested",
    conclusion: "Not Concluded",
    notes: record.notes || "",
  }));

  const workspace = {
    selectedAuditId: `PACK-${pack.id}`,
    generatedAudit: {
      id: `PACK-${pack.id}`,
      title: pack.name,
      description: pack.description,
      objectives: pack.objectives,
    },
    controlTests,
    findings: [],
  };

  window.localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
}
