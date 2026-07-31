const STORAGE_KEY = "audit-intelligence-hub-ai-governance-v1";

export function loadAiGovernanceState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Unable to load AI governance state:", error);
    return null;
  }
}

export function saveAiGovernanceState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, savedAt: new Date().toISOString() }));
  } catch (error) {
    console.error("Unable to save AI governance state:", error);
  }
}

export function clearAiGovernanceState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
