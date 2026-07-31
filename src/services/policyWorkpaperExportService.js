function downloadTextFile(fileName, content) {
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export function exportPolicyDraft(policy, draft) {
  const content = [
    policy.title.toUpperCase(),
    "",
    `Owner: ${policy.ownerRole}`,
    `Review frequency: ${policy.reviewFrequency}`,
    `Purpose: ${policy.purpose}`,
    "",
    ...policy.sections.flatMap((section) => [
      section.toUpperCase(),
      draft[section] || "[Draft content required]",
      "",
    ]),
    "LINKED CONTROLS",
    policy.linkedControls
      .map((item) => `${item.id} - ${item.title}`)
      .join("\n"),
    "",
    "LINKED RISKS",
    policy.linkedRisks
      .map((item) => `${item.id} - ${item.title}`)
      .join("\n"),
    "",
    "FRAMEWORK MAPPINGS",
    policy.mappings
      .map(
        (item) =>
          `${item.framework?.name || item.frameworkId}: ${item.reference} (${item.strength})`
      )
      .join("\n"),
  ].join("\n");

  downloadTextFile(
    `${policy.id.toLowerCase()}-draft.txt`,
    content
  );
}

export function exportWorkpaper(workpaper, fields) {
  const content = [
    workpaper.title.toUpperCase(),
    "",
    `Workpaper ID: ${workpaper.id}`,
    `Type: ${workpaper.type}`,
    `Description: ${workpaper.description}`,
    "",
    ...workpaper.sections.flatMap((section) => [
      section.toUpperCase(),
      fields[section] || "[Complete this section]",
      "",
    ]),
  ].join("\n");

  downloadTextFile(
    `${workpaper.id.toLowerCase()}-workpaper.txt`,
    content
  );
}
