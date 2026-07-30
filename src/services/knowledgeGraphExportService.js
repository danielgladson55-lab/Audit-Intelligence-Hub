function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function exportKnowledgeGraph(results) {
  const rows = [
    ["Control ID", "Title", "Domain", "Risks", "Framework Mappings", "Procedures", "Evidence", "Policies", "Audit Programs", "Technologies"],
    ...results.map((graph) => [
      graph.control.id,
      graph.control.title,
      graph.control.domain,
      graph.risks.map((item) => `${item.id}: ${item.title}`).join(" | "),
      graph.mappings.map((item) => `${item.framework?.name || item.frameworkId}: ${item.reference} (${item.strength})`).join(" | "),
      graph.procedures.map((item) => `${item.id}: ${item.title}`).join(" | "),
      graph.evidence.map((item) => `${item.id}: ${item.title}`).join(" | "),
      graph.policies.map((item) => `${item.id}: ${item.title}`).join(" | "),
      graph.control.auditPrograms.join(" | "),
      graph.control.technologies.join(" | "),
    ]),
  ];

  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "audit-intelligence-knowledge-graph.csv";
  link.click();
  URL.revokeObjectURL(url);
}
