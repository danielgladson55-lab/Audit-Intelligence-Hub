const WORKSPACE_KEY = "audit-intelligence-hub-workspace-v1";

export function sendAiGovernanceToWorkspace(state) {
  const controlTests = state.domains.map((item) => ({
    controlId: item.id,
    controlName: item.name,
    domain: "AI Governance",
    risk: item.risk,
    auditProcedures: item.controls.map((control) => `Assess whether: ${control}`),
    evidence: item.evidence,
    testStatus: "Not Started",
    evidenceStatus: "Not Requested",
    conclusion: "Not Concluded",
    notes: item.notes || "",
  }));

  const workspace = {
    selectedAuditId: "AI-GOVERNANCE",
    generatedAudit: {
      id: "AI-GOVERNANCE",
      title: "AI Governance Audit",
      description: state.profile.systemName ? `AI governance assessment for ${state.profile.systemName}.` : "AI governance assessment aligned to NIST AI RMF and ISO/IEC 42001 themes.",
      objectives: [
        "Assess organization-wide AI governance and accountability.",
        "Assess risk, impact, data, model, security and human-oversight controls.",
        "Assess monitoring, incident response and third-party AI governance.",
      ],
    },
    controlTests,
    findings: [],
  };

  window.localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
}
