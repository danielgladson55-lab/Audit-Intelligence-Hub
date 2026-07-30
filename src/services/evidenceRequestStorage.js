const STORAGE_KEY = "audit-intelligence-hub-evidence-requests-v1";

export function loadEvidenceRequests() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load evidence requests:", error);
    return null;
  }
}

export function saveEvidenceRequests(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, savedAt: new Date().toISOString() })
    );
  } catch (error) {
    console.error("Unable to save evidence requests:", error);
  }
}

export function clearEvidenceRequests() {
  window.localStorage.removeItem(STORAGE_KEY);
}
