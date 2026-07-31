import controls from "../data/knowledgeGraph/controls";
import risks from "../data/knowledgeGraph/risks";
import procedures from "../data/knowledgeGraph/procedures";
import evidence from "../data/knowledgeGraph/evidence";
import policies from "../data/knowledgeGraph/policies";
import frameworks from "../data/knowledgeGraph/frameworks";

function findById(items, id) {
  return items.find((item) => item.id === id) || null;
}

function matchesConfiguration(control, config) {
  const domainMatch =
    config.domains.length === 0 || config.domains.includes(control.domain);

  const programMatch =
    !config.programId || control.auditPrograms.includes(config.programId);

  const technologyMatch =
    !config.technology || control.technologies.includes(config.technology);

  const frameworkMatch =
    !config.frameworkId ||
    control.mappings.some((mapping) => mapping.frameworkId === config.frameworkId);

  return domainMatch && programMatch && technologyMatch && frameworkMatch;
}

export function generateChecklist(config, profile) {
  const selectedControls = controls.filter((control) =>
    matchesConfiguration(control, config)
  );

  const generatedControls = selectedControls.map((control) => {
    const linkedRisks = control.riskIds
      .map((id) => findById(risks, id))
      .filter(Boolean);
    const linkedProcedures = control.procedureIds
      .map((id) => findById(procedures, id))
      .filter(Boolean);
    const linkedEvidence = control.evidenceIds
      .map((id) => findById(evidence, id))
      .filter(Boolean);
    const linkedPolicies = control.policyIds
      .map((id) => findById(policies, id))
      .filter(Boolean);
    const linkedMappings = control.mappings.map((mapping) => ({
      ...mapping,
      framework: findById(frameworks, mapping.frameworkId),
    }));

    return {
      controlId: control.id,
      legacyId: control.legacyId,
      controlName: control.title,
      objective: control.objective,
      domain: control.domain,
      subdomain: control.subdomain,
      risk: linkedRisks.map((item) => item.statement).join(" | "),
      risks: linkedRisks,
      auditProcedures: linkedProcedures.flatMap((item) => item.steps),
      procedureRecords: linkedProcedures,
      evidence: linkedEvidence.map((item) => item.title),
      evidenceRecords: linkedEvidence,
      policies: linkedPolicies,
      frameworkMappings: linkedMappings,
      controlType: control.type,
      frequency: control.frequency,
      ownerRole: control.ownerRole,
      technologies: control.technologies,
      testStatus: "Not Started",
      evidenceStatus: "Not Requested",
      conclusion: "Not Concluded",
      notes: "",
    };
  });

  const generatedRisks = [
    ...new Map(
      generatedControls
        .flatMap((item) => item.risks)
        .map((item) => [item.id, item])
    ).values(),
  ];

  const generatedEvidence = [
    ...new Map(
      generatedControls
        .flatMap((item) => item.evidenceRecords)
        .map((item) => [item.id, item])
    ).values(),
  ];

  return {
    id: `GEN-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    title: profile.name,
    description: profile.description,
    objectives: profile.objectives,
    auditPeriod: config.auditPeriod,
    criticality: config.criticality,
    frameworkId: config.frameworkId,
    technology: config.technology,
    domains: config.domains,
    controls: generatedControls,
    risks: generatedRisks,
    evidence: generatedEvidence,
  };
}

export function getGeneratorOptions() {
  return {
    frameworks,
    domains: [...new Set(controls.map((item) => item.domain))].sort(),
    technologies: [...new Set(controls.flatMap((item) => item.technologies))].sort(),
  };
}
