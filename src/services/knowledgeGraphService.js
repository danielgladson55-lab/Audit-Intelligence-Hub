import frameworks from "../data/knowledgeGraph/frameworks";
import controls from "../data/knowledgeGraph/controls";
import risks from "../data/knowledgeGraph/risks";
import procedures from "../data/knowledgeGraph/procedures";
import evidence from "../data/knowledgeGraph/evidence";
import policies from "../data/knowledgeGraph/policies";

function byId(items, id) {
  return items.find((item) => item.id === id) || null;
}

export function getControlGraph(controlId) {
  const control = byId(controls, controlId);
  if (!control) return null;

  return {
    control,
    risks: control.riskIds.map((id) => byId(risks, id)).filter(Boolean),
    procedures: control.procedureIds.map((id) => byId(procedures, id)).filter(Boolean),
    evidence: control.evidenceIds.map((id) => byId(evidence, id)).filter(Boolean),
    policies: control.policyIds.map((id) => byId(policies, id)).filter(Boolean),
    mappings: control.mappings.map((mapping) => ({
      ...mapping,
      framework: byId(frameworks, mapping.frameworkId),
    })),
  };
}

export function searchKnowledgeGraph(searchTerm, filters = {}) {
  const query = searchTerm.trim().toLowerCase();

  return controls
    .filter((control) => {
      const searchable = [
        control.id,
        control.legacyId,
        control.title,
        control.objective,
        control.domain,
        control.subdomain,
        control.riskIds.join(" "),
        control.auditPrograms.join(" "),
        control.technologies.join(" "),
        control.mappings.map((item) => `${item.frameworkId} ${item.reference}`).join(" "),
      ].join(" ").toLowerCase();

      const matchesQuery = !query || searchable.includes(query);
      const matchesDomain = !filters.domain || control.domain === filters.domain;
      const matchesProgram = !filters.auditProgram || control.auditPrograms.includes(filters.auditProgram);
      const matchesTechnology = !filters.technology || control.technologies.includes(filters.technology);
      const matchesFramework = !filters.frameworkId || control.mappings.some((item) => item.frameworkId === filters.frameworkId);

      return matchesQuery && matchesDomain && matchesProgram && matchesTechnology && matchesFramework;
    })
    .map((control) => getControlGraph(control.id));
}

export function getKnowledgeGraphOptions() {
  return {
    frameworks,
    domains: [...new Set(controls.map((item) => item.domain))].sort(),
    auditPrograms: [...new Set(controls.flatMap((item) => item.auditPrograms))].sort(),
    technologies: [...new Set(controls.flatMap((item) => item.technologies))].sort(),
  };
}

export function getKnowledgeGraphMetrics() {
  return {
    frameworks: frameworks.length,
    controls: controls.length,
    risks: risks.length,
    procedures: procedures.length,
    evidence: evidence.length,
    policies: policies.length,
    mappings: controls.reduce((total, item) => total + item.mappings.length, 0),
  };
}
