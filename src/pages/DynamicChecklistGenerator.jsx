import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import programProfiles from "../data/auditGenerator/programProfiles";
import {
  generateChecklist,
  getGeneratorOptions,
} from "../services/checklistGeneratorService";
import {
  loadGeneratedPackage,
  saveGeneratedPackage,
  sendGeneratedPackageToWorkspace,
} from "../services/generatedAuditStorageService";
import { exportGeneratedChecklist } from "../services/checklistExportService";

function defaultConfiguration(profile) {
  return {
    programId: profile?.id || "ITGC",
    frameworkId: "",
    technology: "",
    domains: profile?.defaultDomains || [],
    criticality: "High",
    auditPeriod: "",
  };
}

export default function DynamicChecklistGenerator() {
  const navigate = useNavigate();
  const options = useMemo(() => getGeneratorOptions(), []);
  const initialProfile = programProfiles[0];
  const [config, setConfig] = useState(() => defaultConfiguration(initialProfile));
  const [auditPackage, setAuditPackage] = useState(() => loadGeneratedPackage());

  const selectedProfile = programProfiles.find((item) => item.id === config.programId) || initialProfile;

  function updateConfig(field, value) {
    setConfig((current) => ({ ...current, [field]: value }));
  }

  function selectProgram(programId) {
    const profile = programProfiles.find((item) => item.id === programId) || initialProfile;
    setConfig(defaultConfiguration(profile));
    setAuditPackage(null);
  }

  function toggleDomain(domain) {
    setConfig((current) => ({
      ...current,
      domains: current.domains.includes(domain)
        ? current.domains.filter((item) => item !== domain)
        : [...current.domains, domain],
    }));
  }

  function createPackage() {
    const generated = generateChecklist(config, selectedProfile);
    setAuditPackage(generated);
    saveGeneratedPackage(generated);
  }

  function openWorkspace() {
    if (!auditPackage) return;
    sendGeneratedPackageToWorkspace(auditPackage);
    navigate("/audit-workspace");
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Knowledge-graph powered</p>
          <h1>Dynamic Audit Checklist Generator</h1>
          <p className="muted-text">
            Configure an audit and generate connected risks, controls, procedures,
            evidence requirements, policies and framework mappings.
          </p>
        </div>
      </div>

      <div className="warning-box">
        Generated content is a professional starting point. Confirm scope, applicability,
        mappings and sample design before formal audit use.
      </div>

      <section className="workspace-card" style={{ marginTop: "20px" }}>
        <h2>1. Configure the audit</h2>
        <div className="form-grid generator-grid">
          <label>
            Audit programme
            <select value={config.programId} onChange={(event) => selectProgram(event.target.value)}>
              {programProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
            </select>
          </label>
          <label>
            Framework filter
            <select value={config.frameworkId} onChange={(event) => updateConfig("frameworkId", event.target.value)}>
              <option value="">All applicable frameworks</option>
              {options.frameworks.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label>
            Technology filter
            <select value={config.technology} onChange={(event) => updateConfig("technology", event.target.value)}>
              <option value="">All applicable technologies</option>
              {options.technologies.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Business criticality
            <select value={config.criticality} onChange={(event) => updateConfig("criticality", event.target.value)}>
              <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
          </label>
          <label>
            Audit period
            <input value={config.auditPeriod} onChange={(event) => updateConfig("auditPeriod", event.target.value)} placeholder="Example: 1 Jan 2026 to 31 Dec 2026" />
          </label>
        </div>

        <h3>Domains</h3>
        <div className="domain-selector">
          {options.domains.map((domain) => (
            <label className={config.domains.includes(domain) ? "domain-option selected" : "domain-option"} key={domain}>
              <input type="checkbox" checked={config.domains.includes(domain)} onChange={() => toggleDomain(domain)} />
              {domain}
            </label>
          ))}
        </div>

        <button type="button" onClick={createPackage}>Generate audit package</button>
      </section>

      {auditPackage && (
        <section>
          <div className="page-heading generated-heading">
            <div><p className="eyebrow">Generated package</p><h2>{auditPackage.title}</h2><p className="muted-text">{auditPackage.description}</p></div>
            <div className="button-group">
              <button type="button" onClick={() => exportGeneratedChecklist(auditPackage)}>Export checklist</button>
              <button type="button" onClick={openWorkspace}>Open in Audit Workspace</button>
            </div>
          </div>

          <div className="metric-grid">
            <div className="metric-card"><span>Controls</span><strong>{auditPackage.controls.length}</strong></div>
            <div className="metric-card"><span>Risks</span><strong>{auditPackage.risks.length}</strong></div>
            <div className="metric-card"><span>Evidence items</span><strong>{auditPackage.evidence.length}</strong></div>
            <div className="metric-card"><span>Domains</span><strong>{auditPackage.domains.length}</strong></div>
          </div>

          <div className="workspace-card">
            <h3>Audit objectives</h3>
            <ul>{auditPackage.objectives.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>

          {auditPackage.controls.length === 0 ? (
            <div className="empty-state">
              No controls matched the selected combination. Remove one or more filters and generate again.
            </div>
          ) : (
            auditPackage.controls.map((control) => (
              <article className="workspace-card" key={control.controlId}>
                <div className="workspace-card-header">
                  <div><span className="record-id">{control.controlId}</span><h3>{control.controlName}</h3><p className="muted-text">{control.domain} / {control.subdomain}</p></div>
                </div>
                <p><strong>Objective:</strong> {control.objective}</p>
                <details><summary>Risks</summary><ul>{control.risks.map((item) => <li key={item.id}><strong>{item.id}</strong> - {item.title}</li>)}</ul></details>
                <details><summary>Testing procedures</summary><ol>{control.auditProcedures.map((item, index) => <li key={`${control.controlId}-procedure-${index}`}>{item}</li>)}</ol></details>
                <details><summary>Evidence</summary><ul>{control.evidence.map((item) => <li key={item}>{item}</li>)}</ul></details>
                <details><summary>Framework mappings</summary><ul>{control.frameworkMappings.map((item) => <li key={`${item.frameworkId}-${item.reference}`}><strong>{item.framework?.name || item.frameworkId}</strong>: {item.reference} ({item.strength})</li>)}</ul></details>
                <details><summary>Policy references</summary><ul>{control.policies.map((item) => <li key={item.id}>{item.title}</li>)}</ul></details>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
}
