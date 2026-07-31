import controls from "../data/knowledgeGraph/controls";
import frameworks from "../data/knowledgeGraph/frameworks";
import risks from "../data/knowledgeGraph/risks";
import policyTemplates from "../data/policyWorkpaper/policyTemplates";
import workpaperTemplates from "../data/policyWorkpaper/workpaperTemplates";

function byId(items, id) {
  return items.find((item) => item.id === id) || null;
}

export function getPolicyRecords() {
  return policyTemplates.map((policy) => {
    const linkedControls = policy.controlIds
      .map((id) => byId(controls, id))
      .filter(Boolean);

    const linkedRisks = [
      ...new Map(
        linkedControls
          .flatMap((control) => control.riskIds)
          .map((id) => [id, byId(risks, id)])
          .filter(([, value]) => Boolean(value))
      ).values(),
    ];

    const mappings = [
      ...new Map(
        linkedControls
          .flatMap((control) => control.mappings)
          .map((mapping) => [
            `${mapping.frameworkId}-${mapping.reference}`,
            {
              ...mapping,
              framework: byId(frameworks, mapping.frameworkId),
            },
          ])
      ).values(),
    ];

    return {
      ...policy,
      linkedControls,
      linkedRisks,
      mappings,
    };
  });
}

export function getWorkpaperRecords() {
  return workpaperTemplates;
}
