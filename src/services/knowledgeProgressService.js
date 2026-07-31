const STORAGE_KEY = "audit-intelligence-hub-learning-v1";

export function loadLearningProgress() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : { completed: {}, notes: {} };
  } catch {
    return { completed: {}, notes: {} };
  }
}

export function saveLearningProgress(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function calculateLearningProgress(domains, completed) {
  if (!domains.length) return 0;
  const count = domains.filter((item) => completed[item.id]).length;
  return Math.round((count / domains.length) * 100);
}
