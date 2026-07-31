const STORAGE_KEY = "audit-intelligence-hub-enterprise-packs-v1";

export function loadEnterprisePackState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load enterprise audit-pack state:", error);
    return null;
  }
}

export function saveEnterprisePackState(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        savedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("Unable to save enterprise audit-pack state:", error);
  }
}

export function clearEnterprisePackState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
