function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function exportEnterprisePack(pack, records, metrics) {
  const rows = [
    ["Audit Pack", pack.name],
    ["Category", pack.category],
    ["Readiness Score", `${metrics.score}%`],
    ["High-Risk Gaps", metrics.highGaps],
    [],
    [
      "Domain ID",
      "Domain",
      "Risk",
      "Status",
      "Evidence Status",
      "Risk Rating",
      "Owner",
      "Target Date",
      "Audit Checks",
      "Expected Evidence",
      "Framework Tags",
      "Evidence Reference",
      "Findings",
      "Notes",
    ],
    ...records.map((record) => [
      record.id,
      record.name,
      record.risk,
      record.status,
      record.evidenceStatus,
      record.riskRating,
      record.owner,
      record.targetDate,
      record.checks.join(" | "),
      record.evidence.join(" | "),
      record.frameworkTags.join(" | "),
      record.evidenceReference,
      record.findings,
      record.notes,
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
  link.download = `${pack.id.toLowerCase()}-enterprise-audit-pack.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
