const STORAGE_KEY = "audit-intelligence-hub-cloud-packs-v1";

export function loadAuditPackState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load audit pack state:", error);
    return null;
  }
}

export function saveAuditPackState(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, savedAt: new Date().toISOString() })
    );
  } catch (error) {
    console.error("Unable to save audit pack state:", error);
  }
}

export function clearAuditPackState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
