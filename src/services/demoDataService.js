const APP_PREFIX = "audit-intelligence-hub-";

export function clearAllDemoData() {
  const keys = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key && key.startsWith(APP_PREFIX)) {
      keys.push(key);
    }
  }

  keys.forEach((key) => window.localStorage.removeItem(key));
  return keys.length;
}
