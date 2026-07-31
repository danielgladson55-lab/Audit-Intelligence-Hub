function read(key) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function getExecutiveIntelligence() {
  const workspace = read("audit-intelligence-hub-workspace-v1");
  const compliance = read("audit-intelligence-hub-compliance-v1");
  const maturity = read("audit-intelligence-hub-maturity-v1");
  const evidence = read("audit-intelligence-hub-evidence-requests-v1");
  const tprm = read("audit-intelligence-hub-tprm-v1");
  const ai = read("audit-intelligence-hub-ai-governance-v1");

  const findings = Array.isArray(workspace?.findings) ? workspace.findings : [];
  const tests = Array.isArray(workspace?.controlTests) ? workspace.controlTests : [];
  const complianceRecords = Array.isArray(compliance?.records) ? compliance.records : [];
  const maturityRecords = Array.isArray(maturity?.records) ? maturity.records : [];
  const requests = Array.isArray(evidence?.requests) ? evidence.requests : [];
  const aiDomains = Array.isArray(ai?.domains) ? ai.domains : [];

  const completedTests = tests.filter((item) => ["Completed", "Not Applicable"].includes(item.testStatus)).length;
  const applicableCompliance = complianceRecords.filter((item) => item.applicability === "Applicable");
  const implemented = applicableCompliance.filter((item) => item.implementationStatus === "Implemented").length;
  const partial = applicableCompliance.filter((item) => item.implementationStatus === "Partially Implemented").length;
  const complianceScore = applicableCompliance.length ? Math.round(((implemented + partial * 0.5) / applicableCompliance.length) * 100) : 0;
  const maturityCurrent = maturityRecords.length ? (maturityRecords.reduce((sum, item) => sum + Number(item.currentScore || 0), 0) / maturityRecords.length).toFixed(1) : "0.0";
  const maturityTarget = maturityRecords.length ? (maturityRecords.reduce((sum, item) => sum + Number(item.targetScore || 0), 0) / maturityRecords.length).toFixed(1) : "0.0";
  const aiEffective = aiDomains.filter((item) => item.status === "Effective").length;
  const aiPartial = aiDomains.filter((item) => item.status === "Partially Effective").length;
  const aiScore = aiDomains.length ? Math.round(((aiEffective + aiPartial * 0.5) / aiDomains.length) * 100) : 0;

  return {
    metrics: {
      auditProgress: tests.length ? Math.round((completedTests / tests.length) * 100) : 0,
      openFindings: findings.filter((item) => item.status !== "Closed").length,
      highFindings: findings.filter((item) => item.status !== "Closed" && ["Critical", "High"].includes(item.rating)).length,
      complianceScore,
      maturityCurrent,
      maturityTarget,
      evidenceAccepted: requests.filter((item) => item.status === "Accepted").length,
      evidenceTotal: requests.length,
      aiScore,
      tprmAvailable: Boolean(tprm),
    },
    findings,
    maturityRecords,
    complianceRecords,
  };
}
