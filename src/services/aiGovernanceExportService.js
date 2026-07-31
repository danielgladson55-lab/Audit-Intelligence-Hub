function cell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function exportAiGovernanceAssessment(state, metrics) {
  const rows = [
    ["AI System", state.profile.systemName],
    ["Use Case", state.profile.useCase],
    ["Owner", state.profile.owner],
    ["Lifecycle", state.profile.lifecycle],
    ["Impact Level", state.profile.impactLevel],
    ["Provider Type", state.profile.providerType],
    ["Readiness Score", `${metrics.score}%`],
    [],
    ["Domain ID", "Domain", "Risk", "Status", "Evidence Status", "Risk Rating", "Owner", "Target Date", "Controls", "Evidence", "Mappings", "Evidence Reference", "Gaps", "Notes"],
    ...state.domains.map((item) => [item.id, item.name, item.risk, item.status, item.evidenceStatus, item.riskRating, item.owner, item.targetDate, item.controls.join(" | "), item.evidence.join(" | "), item.mappings.join(" | "), item.evidenceReference, item.gaps, item.notes]),
  ];

  const csv = rows.map((row) => row.map(cell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-governance-assessment.csv";
  link.click();
  URL.revokeObjectURL(url);
}
