const STORAGE_KEY = "audit-intelligence-hub-policy-workpaper-v1";

export function loadPolicyWorkpaperState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load policy and workpaper state:", error);
    return null;
  }
}

export function savePolicyWorkpaperState(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, savedAt: new Date().toISOString() })
    );
  } catch (error) {
    console.error("Unable to save policy and workpaper state:", error);
  }
}

export function clearPolicyWorkpaperState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
