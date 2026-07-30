function escapeCsv(value) {
  const stringValue =
    value === null || value === undefined
      ? ""
      : String(value);

  return `"${stringValue.replaceAll('"', '""')}"`;
}

function downloadCsv(fileName, rows) {
  const csvContent = rows
    .map((row) =>
      row.map((value) => escapeCsv(value)).join(",")
    )
    .join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export function exportChecklist(
  auditTitle,
  controlTests
) {
  const rows = [
    [
      "Audit",
      "Control ID",
      "Control Name",
      "Domain",
      "Test Status",
      "Evidence Status",
      "Conclusion",
      "Auditor Notes",
    ],
    ...controlTests.map((test) => [
      auditTitle,
      test.controlId,
      test.controlName,
      test.domain,
      test.testStatus,
      test.evidenceStatus,
      test.conclusion,
      test.notes,
    ]),
  ];

  downloadCsv(
    "audit-control-checklist.csv",
    rows
  );
}

export function exportFindings(
  auditTitle,
  findings
) {
  const rows = [
    [
      "Audit",
      "Finding ID",
      "Title",
      "Risk Rating",
      "Control ID",
      "Condition",
      "Risk",
      "Recommendation",
      "Owner",
      "Target Date",
      "Status",
    ],
    ...findings.map((finding) => [
      auditTitle,
      finding.id,
      finding.title,
      finding.rating,
      finding.controlId,
      finding.condition,
      finding.risk,
      finding.recommendation,
      finding.owner,
      finding.targetDate,
      finding.status,
    ]),
  ];

  downloadCsv(
    "audit-findings-register.csv",
    rows
  );
}