const STORAGE_KEY =
  "audit-intelligence-hub-workspace-v1";

export function loadWorkspace() {
  try {
    const savedValue =
      window.localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return null;
    }

    const parsedValue =
      JSON.parse(savedValue);

    return {
      selectedAuditId:
        parsedValue.selectedAuditId || "",

      controlTests:
        Array.isArray(
          parsedValue.controlTests
        )
          ? parsedValue.controlTests
          : [],

      findings:
        Array.isArray(parsedValue.findings)
          ? parsedValue.findings
          : [],
    };
  } catch (error) {
    console.error(
      "Unable to load saved audit workspace:",
      error
    );

    return null;
  }
}

export function saveWorkspace(workspace) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...workspace,
        savedAt: new Date().toISOString(),
      })
    );

    return true;
  } catch (error) {
    console.error(
      "Unable to save audit workspace:",
      error
    );

    return false;
  }
}

export function clearWorkspace() {
  try {
    window.localStorage.removeItem(
      STORAGE_KEY
    );
  } catch (error) {
    console.error(
      "Unable to clear audit workspace:",
      error
    );
  }
}