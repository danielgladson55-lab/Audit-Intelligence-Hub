function csvValue(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function exportEvidenceRequests(requests) {
  const rows = [
    ["Request ID", "Domain", "Evidence Request", "Description", "Format", "Owner", "Requested Date", "Due Date", "Status", "Review Result", "Reference", "Auditor Notes"],
    ...requests.map((request) => [
      request.id,
      request.domain,
      request.title,
      request.description,
      request.requestedFormat,
      request.owner,
      request.requestedDate,
      request.dueDate,
      request.status,
      request.reviewResult,
      request.reference,
      request.notes,
    ]),
  ];

  const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "audit-evidence-request-list.csv";
  link.click();
  URL.revokeObjectURL(url);
}
