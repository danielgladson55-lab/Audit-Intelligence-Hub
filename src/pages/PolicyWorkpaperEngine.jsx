import { useEffect, useMemo, useState } from "react";
import {
  getPolicyRecords,
  getWorkpaperRecords,
} from "../services/policyWorkpaperService";
import {
  clearPolicyWorkpaperState,
  loadPolicyWorkpaperState,
  savePolicyWorkpaperState,
} from "../services/policyWorkpaperStorageService";
import {
  exportPolicyDraft,
  exportWorkpaper,
} from "../services/policyWorkpaperExportService";

const EMPTY_STATE = {
  policyDrafts: {},
  workpaperFields: {},
};

export default function PolicyWorkpaperEngine() {
  const policies = useMemo(() => getPolicyRecords(), []);
  const workpapers = useMemo(() => getWorkpaperRecords(), []);
  const [activeTab, setActiveTab] = useState("policies");
  const [selectedPolicyId, setSelectedPolicyId] = useState(policies[0]?.id || "");
  const [selectedWorkpaperId, setSelectedWorkpaperId] = useState(workpapers[0]?.id || "");
  const [state, setState] = useState(() => loadPolicyWorkpaperState() || EMPTY_STATE);
  const [search, setSearch] = useState("");

  useEffect(() => {
    savePolicyWorkpaperState(state);
  }, [state]);

  const selectedPolicy = policies.find((item) => item.id === selectedPolicyId);
  const selectedWorkpaper = workpapers.find((item) => item.id === selectedWorkpaperId);
  const policyDraft = state.policyDrafts[selectedPolicyId] || {};
  const workpaperFields = state.workpaperFields[selectedWorkpaperId] || {};

  const filteredPolicies = policies.filter((item) =>
    `${item.id} ${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase())
  );
  const filteredWorkpapers = workpapers.filter((item) =>
    `${item.id} ${item.title} ${item.type}`.toLowerCase().includes(search.toLowerCase())
  );

  function updatePolicySection(section, value) {
    setState((current) => ({
      ...current,
      policyDrafts: {
        ...current.policyDrafts,
        [selectedPolicyId]: {
          ...current.policyDrafts[selectedPolicyId],
          [section]: value,
        },
      },
    }));
  }

  function updateWorkpaperField(section, value) {
    setState((current) => ({
      ...current,
      workpaperFields: {
        ...current.workpaperFields,
        [selectedWorkpaperId]: {
          ...current.workpaperFields[selectedWorkpaperId],
          [section]: value,
        },
      },
    }));
  }

  function resetState() {
    if (!window.confirm("Reset all policy drafts and workpaper content saved in this browser?")) return;
    clearPolicyWorkpaperState();
    setState(EMPTY_STATE);
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Governance documentation</p>
          <h1>Policy and Workpaper Engine</h1>
          <p className="muted-text">Draft connected policy content and reusable audit workpapers from structured templates.</p>
        </div>
        <button className="danger-button" type="button" onClick={resetState}>Reset drafts</button>
      </div>

      <div className="warning-box">Templates are starting points. Obtain legal, regulatory, privacy and management review before formal approval or use.</div>

      <div className="workspace-tabs" style={{ marginTop: "20px" }}>
        <button type="button" className={activeTab === "policies" ? "active-tab" : ""} onClick={() => setActiveTab("policies")}>Policy Repository</button>
        <button type="button" className={activeTab === "workpapers" ? "active-tab" : ""} onClick={() => setActiveTab("workpapers")}>Workpaper Templates</button>
      </div>

      <section className="workspace-card">
        <label>Search<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search policy or workpaper" /></label>
      </section>

      {activeTab === "policies" && (
        <div className="library-layout">
          <aside className="library-list">
            {filteredPolicies.map((policy) => (
              <button key={policy.id} type="button" className={selectedPolicyId === policy.id ? "selected" : ""} onClick={() => setSelectedPolicyId(policy.id)}>
                <span>{policy.id}</span><strong>{policy.title}</strong><small>{policy.category}</small>
              </button>
            ))}
          </aside>

          {selectedPolicy && (
            <section className="workspace-card library-editor">
              <div className="workspace-card-header">
                <div><span className="record-id">{selectedPolicy.id}</span><h2>{selectedPolicy.title}</h2><p className="muted-text">Owner: {selectedPolicy.ownerRole} | Review: {selectedPolicy.reviewFrequency}</p></div>
                <button type="button" onClick={() => exportPolicyDraft(selectedPolicy, policyDraft)}>Export policy draft</button>
              </div>
              <p><strong>Purpose:</strong> {selectedPolicy.purpose}</p>
              {selectedPolicy.sections.map((section) => (
                <label key={section}>{section}<textarea rows="4" value={policyDraft[section] || ""} onChange={(event) => updatePolicySection(section, event.target.value)} placeholder={`Draft ${section.toLowerCase()} content`} /></label>
              ))}
              <details><summary>Linked controls</summary><ul>{selectedPolicy.linkedControls.map((item) => <li key={item.id}>{item.id} - {item.title}</li>)}</ul></details>
              <details><summary>Linked risks</summary><ul>{selectedPolicy.linkedRisks.map((item) => <li key={item.id}>{item.id} - {item.title}</li>)}</ul></details>
              <details><summary>Framework mappings</summary><ul>{selectedPolicy.mappings.map((item) => <li key={`${item.frameworkId}-${item.reference}`}>{item.framework?.name || item.frameworkId}: {item.reference} ({item.strength})</li>)}</ul></details>
            </section>
          )}
        </div>
      )}

      {activeTab === "workpapers" && (
        <div className="library-layout">
          <aside className="library-list">
            {filteredWorkpapers.map((workpaper) => (
              <button key={workpaper.id} type="button" className={selectedWorkpaperId === workpaper.id ? "selected" : ""} onClick={() => setSelectedWorkpaperId(workpaper.id)}>
                <span>{workpaper.id}</span><strong>{workpaper.title}</strong><small>{workpaper.type}</small>
              </button>
            ))}
          </aside>

          {selectedWorkpaper && (
            <section className="workspace-card library-editor">
              <div className="workspace-card-header">
                <div><span className="record-id">{selectedWorkpaper.id}</span><h2>{selectedWorkpaper.title}</h2><p className="muted-text">{selectedWorkpaper.type}</p></div>
                <button type="button" onClick={() => exportWorkpaper(selectedWorkpaper, workpaperFields)}>Export workpaper</button>
              </div>
              <p>{selectedWorkpaper.description}</p>
              {selectedWorkpaper.sections.map((section) => (
                <label key={section}>{section}<textarea rows="4" value={workpaperFields[section] || ""} onChange={(event) => updateWorkpaperField(section, event.target.value)} placeholder={`Complete ${section.toLowerCase()}`} /></label>
              ))}
            </section>
          )}
        </div>
      )}
    </main>
  );
}
