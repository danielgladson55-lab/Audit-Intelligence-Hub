const STORAGE_KEY = "audit-intelligence-hub-tprm-v1";

export function loadTprmAssessment() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load TPRM assessment:", error);
    return null;
  }
}

export function saveTprmAssessment(assessment) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...assessment, savedAt: new Date().toISOString() })
    );
  } catch (error) {
    console.error("Unable to save TPRM assessment:", error);
  }
}

export function clearTprmAssessment() {
  window.localStorage.removeItem(STORAGE_KEY);
}
