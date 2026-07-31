const GENERATED_PACKAGE_KEY = "audit-intelligence-hub-generated-package-v1";
const WORKSPACE_KEY = "audit-intelligence-hub-workspace-v1";

export function saveGeneratedPackage(auditPackage) {
  window.localStorage.setItem(
    GENERATED_PACKAGE_KEY,
    JSON.stringify(auditPackage)
  );
}

export function loadGeneratedPackage() {
  try {
    const saved = window.localStorage.getItem(GENERATED_PACKAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load generated package:", error);
    return null;
  }
}

export function sendGeneratedPackageToWorkspace(auditPackage) {
  const workspace = {
    selectedAuditId: auditPackage.id,
    generatedAudit: {
      id: auditPackage.id,
      title: auditPackage.title,
      description: `${auditPackage.description} Audit period: ${auditPackage.auditPeriod || "Not specified"}. Criticality: ${auditPackage.criticality}.`,
      objectives: auditPackage.objectives,
    },
    controlTests: auditPackage.controls,
    findings: [],
  };

  window.localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
}

export function clearGeneratedPackage() {
  window.localStorage.removeItem(GENERATED_PACKAGE_KEY);
}
