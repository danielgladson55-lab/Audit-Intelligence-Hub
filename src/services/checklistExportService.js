function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function download(fileName, rows) {
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportGeneratedChecklist(auditPackage) {
  const rows = [
    ["Audit", auditPackage.title],
    ["Audit Period", auditPackage.auditPeriod],
    ["Criticality", auditPackage.criticality],
    ["Technology", auditPackage.technology || "All"],
    [],
    [
      "Control ID",
      "Control",
      "Domain",
      "Risk",
      "Framework Mappings",
      "Testing Procedures",
      "Evidence",
      "Policies",
      "Owner Role",
      "Frequency",
    ],
    ...auditPackage.controls.map((control) => [
      control.controlId,
      control.controlName,
      control.domain,
      control.risks.map((item) => `${item.id}: ${item.title}`).join(" | "),
      control.frameworkMappings
        .map((item) => `${item.framework?.name || item.frameworkId}: ${item.reference} (${item.strength})`)
        .join(" | "),
      control.auditProcedures.join(" | "),
      control.evidence.join(" | "),
      control.policies.map((item) => item.title).join(" | "),
      control.ownerRole,
      control.frequency,
    ]),
  ];

  download("generated-audit-checklist.csv", rows);
}
