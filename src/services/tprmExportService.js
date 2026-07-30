function quote(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function exportTprmAssessment(vendor, questions, responses, score) {
  const rows = [
    ["Third Party", vendor.name, "Service", vendor.service, "Overall Score", `${score.percentage}%`, "Risk Rating", score.rating],
    [],
    ["Question ID", "Domain", "Question", "Weight", "Response", "Evidence Reference", "Assessor Notes"],
    ...questions.map((question) => {
      const answer = responses[question.id] || {};
      return [question.id, question.domain, question.question, question.weight, answer.response || "Not Assessed", answer.evidenceReference || "", answer.notes || ""];
    }),
  ];

  const csv = rows.map((row) => row.map(quote).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "tprm-assessment.csv";
  link.click();
  URL.revokeObjectURL(url);
}
