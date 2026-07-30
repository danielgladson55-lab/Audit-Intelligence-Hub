import coreCatalog from "../data/coreCatalog";
import controlLibrary from "../data/controlLibrary";
import riskLibrary from "../data/riskLibrary";

function safeLocalStorage(key) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function getCoreMetrics() {
  const workspace = safeLocalStorage("audit-intelligence-hub-workspace-v1");
  const evidence = safeLocalStorage("audit-intelligence-hub-evidence-requests-v1");
  const tprm = safeLocalStorage("audit-intelligence-hub-tprm-v1");

  const tests = Array.isArray(workspace?.controlTests) ? workspace.controlTests : [];
  const findings = Array.isArray(workspace?.findings) ? workspace.findings : [];
  const requests = Array.isArray(evidence?.requests) ? evidence.requests : [];
  const tprmResponses = tprm?.responses ? Object.values(tprm.responses) : [];

  return {
    frameworks: coreCatalog.frameworks.length,
    controls: Array.isArray(controlLibrary) ? controlLibrary.length : 0,
    risks: Array.isArray(riskLibrary) ? riskLibrary.length : 0,
    testsTotal: tests.length,
    testsCompleted: tests.filter((item) => ["Completed", "Not Applicable"].includes(item.testStatus)).length,
    openFindings: findings.filter((item) => item.status !== "Closed").length,
    highFindings: findings.filter((item) => item.status !== "Closed" && ["Critical", "High"].includes(item.rating)).length,
    evidenceTotal: requests.length,
    evidenceAccepted: requests.filter((item) => item.status === "Accepted").length,
    tprmAssessed: tprmResponses.filter((item) => item.response && item.response !== "Not Assessed").length,
  };
}
