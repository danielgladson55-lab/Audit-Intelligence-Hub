const STORAGE_KEY = "audit-intelligence-hub-maturity-v1";

export function loadMaturityAssessment() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load maturity assessment:", error);
    return null;
  }
}

export function saveMaturityAssessment(assessment) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...assessment,
        savedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("Unable to save maturity assessment:", error);
  }
}

export function clearMaturityAssessment() {
  window.localStorage.removeItem(STORAGE_KEY);
}
