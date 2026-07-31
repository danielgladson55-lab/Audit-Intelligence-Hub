function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function exportComplianceAssessment(
  frameworkName,
  records,
  metrics
) {
  const rows = [
    ["Framework", frameworkName],
    ["Compliance Score", `${metrics.score}%`],
    ["Applicable Records", metrics.applicable],
    ["Implementation Gaps", metrics.gaps],
    [],
    [
      "Reference",
      "Mapping Strength",
      "Control ID",
      "Control",
      "Domain",
      "Applicability",
      "Implementation Status",
      "Evidence Status",
      "Gap",
      "Remediation Action",
      "Owner",
      "Target Date",
      "Notes",
    ],
    ...records.map((item) => [
      item.reference,
      item.mappingStrength,
      item.controlId,
      item.controlTitle,
      item.domain,
      item.applicability,
      item.implementationStatus,
      item.evidenceStatus,
      item.gap,
      item.remediationAction,
      item.owner,
      item.targetDate,
      item.notes,
    ]),
  ];

  const csv = rows
    .map((row) => row.map(csvCell).join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "compliance-gap-assessment.csv";
  link.click();
  URL.revokeObjectURL(url);
}
