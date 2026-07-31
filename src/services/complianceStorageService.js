const STORAGE_KEY = "audit-intelligence-hub-compliance-v1";

export function loadComplianceAssessment() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load compliance assessment:", error);
    return null;
  }
}

export function saveComplianceAssessment(assessment) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...assessment,
        savedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("Unable to save compliance assessment:", error);
  }
}

export function clearComplianceAssessment() {
  window.localStorage.removeItem(STORAGE_KEY);
}
