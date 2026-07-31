function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function exportMaturityAssessment(records, metrics) {
  const rows = [
    ["Current Average", metrics.currentAverage],
    ["Target Average", metrics.targetAverage],
    ["Total Gap", metrics.totalGap],
    ["High-Priority Gaps", metrics.highPriorityGaps],
    ["Assessment Completion", `${metrics.completion}%`],
    [],
    [
      "Domain ID",
      "Domain",
      "Objective",
      "Current Score",
      "Target Score",
      "Gap",
      "Priority",
      "Owner",
      "Target Date",
      "Evidence Reference",
      "Observation",
      "Improvement Action",
    ],
    ...records.map((record) => [
      record.id,
      record.name,
      record.objective,
      record.currentScore,
      record.targetScore,
      Math.max(0, Number(record.targetScore) - Number(record.currentScore)),
      record.priority,
      record.owner,
      record.targetDate,
      record.evidenceReference,
      record.observation,
      record.improvementAction,
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
  link.download = "technology-maturity-assessment.csv";
  link.click();
  URL.revokeObjectURL(url);
}
