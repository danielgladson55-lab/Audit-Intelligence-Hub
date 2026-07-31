import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  calculateAiMetrics,
  createAiGovernanceAssessment,
} from "../services/aiGovernanceService";
import {
  clearAiGovernanceState,
  loadAiGovernanceState,
  saveAiGovernanceState,
} from "../services/aiGovernanceStorageService";
import { exportAiGovernanceAssessment } from "../services/aiGovernanceExportService";
import { sendAiGovernanceToWorkspace } from "../services/aiGovernanceWorkspaceService";

export default function AIGovernanceHub() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => loadAiGovernanceState() || createAiGovernanceAssessment());
  const [activeTab, setActiveTab] = useState("assessment");
  const [search, setSearch] = useState("");
  const metrics = useMemo(() => calculateAiMetrics(state.domains), [state.domains]);

  useEffect(() => {
    saveAiGovernanceState(state);
  }, [state]);

  function updateProfile(field, value) {
    setState((current) => ({ ...current, profile: { ...current.profile, [field]: value } }));
  }

  function updateDomain(id, field, value) {
    setState((current) => ({ ...current, domains: current.domains.map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  }

  function updateCopilot(id, field, value) {
    setState((current) => ({ ...current, copilot: current.copilot.map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  }

  function addInventoryItem() {
    setState((current) => ({
      ...current,
      inventory: [
        ...current.inventory,
        { id: `AI-${Date.now()}`, name: "", purpose: "", owner: "", provider: "", impact: "High", lifecycle: "Proposed" },
      ],
    }));
  }

  function updateInventory(id, field, value) {
    setState((current) => ({ ...current, inventory: current.inventory.map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  }

  function removeInventory(id) {
    setState((current) => ({ ...current, inventory: current.inventory.filter((item) => item.id !== id) }));
  }

  function resetHub() {
    if (!window.confirm("Reset all AI governance information saved in this browser?")) return;
    clearAiGovernanceState();
    setState(createAiGovernanceAssessment());
    setActiveTab("assessment");
  }

  function openWorkspace() {
    sendAiGovernanceToWorkspace(state);
    navigate("/audit-workspace");
  }

  const filteredDomains = state.domains.filter((item) => `${item.id} ${item.name} ${item.risk} ${item.mappings.join(" ")}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Responsible AI assurance</p>
          <h1>AI Governance Hub</h1>
          <p className="muted-text">Govern AI inventory, risk, data, models, human oversight, security, third parties, generative AI and incidents.</p>
        </div>
        <div className="button-group">
          <button type="button" onClick={() => exportAiGovernanceAssessment(state, metrics)}>Export assessment</button>
          <button type="button" onClick={openWorkspace}>Open in Audit Workspace</button>
          <button className="danger-button" type="button" onClick={resetHub}>Reset hub</button>
        </div>
      </div>

      <div className="warning-box">Use the current official NIST and ISO materials for formal conclusions. The public demo is not a certification tool and must not contain confidential AI, prompt, model or personal data.</div>

      <section className="workspace-card ai-profile" style={{ marginTop: "20px" }}>
        <h2>Assessment profile</h2>
        <div className="form-grid">
          <label>AI system or programme<input value={state.profile.systemName} onChange={(event) => updateProfile("systemName", event.target.value)} /></label>
          <label>Primary use case<input value={state.profile.useCase} onChange={(event) => updateProfile("useCase", event.target.value)} /></label>
          <label>Accountable owner<input value={state.profile.owner} onChange={(event) => updateProfile("owner", event.target.value)} /></label>
          <label>Lifecycle<select value={state.profile.lifecycle} onChange={(event) => updateProfile("lifecycle", event.target.value)}><option>Proposed</option><option>Development</option><option>Pilot</option><option>Production</option><option>Retiring</option><option>Retired</option></select></label>
          <label>Impact level<select value={state.profile.impactLevel} onChange={(event) => updateProfile("impactLevel", event.target.value)}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label>
          <label>Provider type<select value={state.profile.providerType} onChange={(event) => updateProfile("providerType", event.target.value)}><option>Internal</option><option>Third Party</option><option>Hybrid</option></select></label>
        </div>
      </section>

      <div className="metric-grid">
        <div className="metric-card"><span>Domains</span><strong>{metrics.total}</strong></div>
        <div className="metric-card"><span>Readiness</span><strong>{metrics.score}%</strong></div>
        <div className="metric-card"><span>Assessed</span><strong>{metrics.assessed}</strong></div>
        <div className="metric-card"><span>Ineffective</span><strong>{metrics.ineffective}</strong></div>
        <div className="metric-card"><span>Validated evidence</span><strong>{metrics.validated}</strong></div>
        <div className="metric-card"><span>High-risk gaps</span><strong>{metrics.highGaps}</strong></div>
        <div className="metric-card"><span>Inventory items</span><strong>{state.inventory.length}</strong></div>
      </div>

      <div className="workspace-tabs">
        <button type="button" className={activeTab === "assessment" ? "active-tab" : ""} onClick={() => setActiveTab("assessment")}>AI Assessment</button>
        <button type="button" className={activeTab === "inventory" ? "active-tab" : ""} onClick={() => setActiveTab("inventory")}>AI Inventory</button>
        <button type="button" className={activeTab === "copilot" ? "active-tab" : ""} onClick={() => setActiveTab("copilot")}>Copilot Readiness</button>
      </div>

      {activeTab === "assessment" && (
        <section>
          <div className="workspace-card"><label>Search domains<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search governance, data, model, security or mapping" /></label></div>
          {filteredDomains.map((item) => (
            <article className="workspace-card" key={item.id}>
              <div className="workspace-card-header"><div><span className="record-id">{item.id}</span><h2>{item.name}</h2><p className="muted-text">{item.risk}</p></div><span className={`ai-rating ai-${item.riskRating.toLowerCase()}`}>{item.riskRating}</span></div>
              <div className="form-grid">
                <label>Status<select value={item.status} onChange={(event) => updateDomain(item.id, "status", event.target.value)}><option>Not Assessed</option><option>Effective</option><option>Partially Effective</option><option>Ineffective</option><option>Not Applicable</option></select></label>
                <label>Evidence status<select value={item.evidenceStatus} onChange={(event) => updateDomain(item.id, "evidenceStatus", event.target.value)}><option>Not Requested</option><option>Requested</option><option>Partially Received</option><option>Received</option><option>Validated</option><option>Insufficient</option></select></label>
                <label>Risk rating<select value={item.riskRating} onChange={(event) => updateDomain(item.id, "riskRating", event.target.value)}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label>
                <label>Action owner<input value={item.owner} onChange={(event) => updateDomain(item.id, "owner", event.target.value)} /></label>
                <label>Target date<input type="date" value={item.targetDate} onChange={(event) => updateDomain(item.id, "targetDate", event.target.value)} /></label>
                <label>Evidence reference<input value={item.evidenceReference} onChange={(event) => updateDomain(item.id, "evidenceReference", event.target.value)} placeholder={`Example: WP-${item.id}-01`} /></label>
              </div>
              <details><summary>Control expectations</summary><ul>{item.controls.map((control) => <li key={control}>{control}</li>)}</ul></details>
              <details><summary>Expected evidence</summary><ul>{item.evidence.map((record) => <li key={record}>{record}</li>)}</ul></details>
              <details><summary>Framework themes</summary><div className="ai-tags">{item.mappings.map((mapping) => <span key={mapping}>{mapping}</span>)}</div></details>
              <label>Gaps or findings<textarea rows="3" value={item.gaps} onChange={(event) => updateDomain(item.id, "gaps", event.target.value)} /></label>
              <label>Assessment notes<textarea rows="4" value={item.notes} onChange={(event) => updateDomain(item.id, "notes", event.target.value)} /></label>
            </article>
          ))}
        </section>
      )}

      {activeTab === "inventory" && (
        <section>
          <div className="page-heading"><div><h2>AI System Inventory</h2><p className="muted-text">Maintain ownership, purpose, provider, impact and lifecycle status.</p></div><button type="button" onClick={addInventoryItem}>Add AI system</button></div>
          {state.inventory.length === 0 ? <div className="empty-state">No AI systems have been added.</div> : state.inventory.map((item) => (
            <article className="workspace-card" key={item.id}>
              <div className="workspace-card-header"><span className="record-id">{item.id}</span><button className="danger-button" type="button" onClick={() => removeInventory(item.id)}>Delete</button></div>
              <div className="form-grid">
                <label>Name<input value={item.name} onChange={(event) => updateInventory(item.id, "name", event.target.value)} /></label>
                <label>Purpose<input value={item.purpose} onChange={(event) => updateInventory(item.id, "purpose", event.target.value)} /></label>
                <label>Owner<input value={item.owner} onChange={(event) => updateInventory(item.id, "owner", event.target.value)} /></label>
                <label>Provider<input value={item.provider} onChange={(event) => updateInventory(item.id, "provider", event.target.value)} /></label>
                <label>Impact<select value={item.impact} onChange={(event) => updateInventory(item.id, "impact", event.target.value)}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label>
                <label>Lifecycle<select value={item.lifecycle} onChange={(event) => updateInventory(item.id, "lifecycle", event.target.value)}><option>Proposed</option><option>Development</option><option>Pilot</option><option>Production</option><option>Retiring</option><option>Retired</option></select></label>
              </div>
            </article>
          ))}
        </section>
      )}

      {activeTab === "copilot" && (
        <section>
          <div className="workspace-card"><h2>Microsoft Copilot Readiness</h2><p className="muted-text">Assess oversharing, governance and agent or connector risks before broad enablement.</p></div>
          {state.copilot.map((item) => (
            <article className="workspace-card" key={item.id}>
              <span className="record-id">{item.id}</span><h2>{item.name}</h2><p>{item.risk}</p>
              <div className="form-grid">
                <label>Status<select value={item.status} onChange={(event) => updateCopilot(item.id, "status", event.target.value)}><option>Not Assessed</option><option>Effective</option><option>Partially Effective</option><option>Ineffective</option><option>Not Applicable</option></select></label>
                <label>Evidence status<select value={item.evidenceStatus} onChange={(event) => updateCopilot(item.id, "evidenceStatus", event.target.value)}><option>Not Requested</option><option>Requested</option><option>Received</option><option>Validated</option><option>Insufficient</option></select></label>
                <label>Owner<input value={item.owner} onChange={(event) => updateCopilot(item.id, "owner", event.target.value)} /></label>
                <label>Evidence reference<input value={item.evidenceReference} onChange={(event) => updateCopilot(item.id, "evidenceReference", event.target.value)} /></label>
              </div>
              <details><summary>Readiness checks</summary><ul>{item.checks.map((check) => <li key={check}>{check}</li>)}</ul></details>
              <details><summary>Expected evidence</summary><ul>{item.evidence.map((record) => <li key={record}>{record}</li>)}</ul></details>
              <label>Gaps<textarea rows="3" value={item.gaps} onChange={(event) => updateCopilot(item.id, "gaps", event.target.value)} /></label>
              <label>Notes<textarea rows="3" value={item.notes} onChange={(event) => updateCopilot(item.id, "notes", event.target.value)} /></label>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
