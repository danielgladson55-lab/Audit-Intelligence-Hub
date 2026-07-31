import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  calculatePackMetrics,
  createPackAssessment,
  getAuditPacks,
} from "../services/auditPackService";
import {
  clearAuditPackState,
  loadAuditPackState,
  saveAuditPackState,
} from "../services/auditPackStorageService";
import { exportAuditPack } from "../services/auditPackExportService";
import { sendAuditPackToWorkspace } from "../services/auditPackWorkspaceService";

export default function CloudDeveloperAuditPacks() {
  const navigate = useNavigate();
  const packs = useMemo(() => getAuditPacks(), []);
  const [state, setState] = useState(() => {
    const saved = loadAuditPackState();
    if (saved) return saved;
    const firstPack = packs[0];
    return {
      selectedPackId: firstPack?.id || "",
      assessments: firstPack
        ? { [firstPack.id]: createPackAssessment(firstPack) }
        : {},
    };
  });
  const [search, setSearch] = useState("");

  const selectedPack = packs.find((pack) => pack.id === state.selectedPackId) || packs[0];
  const records = state.assessments[selectedPack?.id] || [];
  const metrics = useMemo(() => calculatePackMetrics(records), [records]);

  useEffect(() => {
    saveAuditPackState(state);
  }, [state]);

  function selectPack(packId) {
    const pack = packs.find((item) => item.id === packId);
    if (!pack) return;
    setState((current) => ({
      ...current,
      selectedPackId: packId,
      assessments: {
        ...current.assessments,
        [packId]: current.assessments[packId] || createPackAssessment(pack),
      },
    }));
    setSearch("");
  }

  function updateRecord(recordId, field, value) {
    setState((current) => ({
      ...current,
      assessments: {
        ...current.assessments,
        [selectedPack.id]: current.assessments[selectedPack.id].map((record) =>
          record.id === recordId ? { ...record, [field]: value } : record
        ),
      },
    }));
  }

  function resetPacks() {
    if (!window.confirm("Reset all cloud and developer audit-pack assessments saved in this browser?")) return;
    clearAuditPackState();
    const firstPack = packs[0];
    setState({
      selectedPackId: firstPack?.id || "",
      assessments: firstPack ? { [firstPack.id]: createPackAssessment(firstPack) } : {},
    });
  }

  function openWorkspace() {
    sendAuditPackToWorkspace(selectedPack, records);
    navigate("/audit-workspace");
  }

  const filteredRecords = records.filter((record) =>
    `${record.id} ${record.name} ${record.risk} ${record.frameworkTags.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (!selectedPack) return <main className="page-container"><div className="empty-state">No audit packs are configured.</div></main>;

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Specialized assurance</p>
          <h1>Cloud and Developer Audit Packs</h1>
          <p className="muted-text">Execute connected readiness assessments for Microsoft 365, Azure, AWS and GitHub.</p>
        </div>
        <div className="button-group">
          <button type="button" onClick={() => exportAuditPack(selectedPack, records, metrics)}>Export audit pack</button>
          <button type="button" onClick={openWorkspace}>Open in Audit Workspace</button>
          <button className="danger-button" type="button" onClick={resetPacks}>Reset packs</button>
        </div>
      </div>

      <div className="warning-box">Validate platform settings against current vendor documentation and the organization’s licensing, architecture, risk profile and regulatory obligations.</div>

      <section className="workspace-card" style={{ marginTop: "20px" }}>
        <div className="form-grid">
          <label>
            Audit pack
            <select value={selectedPack.id} onChange={(event) => selectPack(event.target.value)}>
              {packs.map((pack) => <option key={pack.id} value={pack.id}>{pack.name}</option>)}
            </select>
          </label>
          <label>
            Search domains
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search domain, risk or framework tag" />
          </label>
        </div>
      </section>

      <section className="pack-hero">
        <div><span>{selectedPack.category}</span><h2>{selectedPack.name}</h2><p>{selectedPack.description}</p></div>
        <strong>{metrics.score}% readiness</strong>
      </section>

      <div className="metric-grid">
        <div className="metric-card"><span>Domains</span><strong>{metrics.total}</strong></div>
        <div className="metric-card"><span>Assessed</span><strong>{metrics.assessed}</strong></div>
        <div className="metric-card"><span>Effective</span><strong>{metrics.effective}</strong></div>
        <div className="metric-card"><span>Partial</span><strong>{metrics.partial}</strong></div>
        <div className="metric-card"><span>Ineffective</span><strong>{metrics.ineffective}</strong></div>
        <div className="metric-card"><span>Evidence validated</span><strong>{metrics.evidenceValidated}</strong></div>
      </div>

      <section className="workspace-card">
        <h3>Audit objectives</h3>
        <ul>{selectedPack.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
      </section>

      {filteredRecords.map((record) => (
        <article className="workspace-card" key={record.id}>
          <div className="workspace-card-header">
            <div><span className="record-id">{record.id}</span><h2>{record.name}</h2><p className="muted-text">{record.risk}</p></div>
            <span className={`pack-rating pack-${record.riskRating.toLowerCase()}`}>{record.riskRating}</span>
          </div>

          <div className="form-grid">
            <label>Assessment status<select value={record.status} onChange={(event) => updateRecord(record.id, "status", event.target.value)}><option>Not Assessed</option><option>Effective</option><option>Partially Effective</option><option>Ineffective</option><option>Not Applicable</option></select></label>
            <label>Evidence status<select value={record.evidenceStatus} onChange={(event) => updateRecord(record.id, "evidenceStatus", event.target.value)}><option>Not Requested</option><option>Requested</option><option>Partially Received</option><option>Received</option><option>Validated</option><option>Insufficient</option></select></label>
            <label>Risk rating<select value={record.riskRating} onChange={(event) => updateRecord(record.id, "riskRating", event.target.value)}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label>
            <label>Action owner<input value={record.owner} onChange={(event) => updateRecord(record.id, "owner", event.target.value)} /></label>
            <label>Target date<input type="date" value={record.targetDate} onChange={(event) => updateRecord(record.id, "targetDate", event.target.value)} /></label>
            <label>Evidence reference<input value={record.evidenceReference} onChange={(event) => updateRecord(record.id, "evidenceReference", event.target.value)} placeholder="Example: WP-AZ-IAM-01" /></label>
          </div>

          <details><summary>Audit checks</summary><ol>{record.checks.map((check) => <li key={check}>{check}</li>)}</ol></details>
          <details><summary>Expected evidence</summary><ul>{record.evidence.map((item) => <li key={item}>{item}</li>)}</ul></details>
          <details><summary>Framework tags</summary><div className="pack-tags">{record.frameworkTags.map((item) => <span key={item}>{item}</span>)}</div></details>

          <label>Findings or gaps<textarea rows="3" value={record.findings} onChange={(event) => updateRecord(record.id, "findings", event.target.value)} placeholder="Document identified control or evidence gaps." /></label>
          <label>Assessment notes<textarea rows="4" value={record.notes} onChange={(event) => updateRecord(record.id, "notes", event.target.value)} placeholder="Document procedures performed and conclusion rationale." /></label>
        </article>
      ))}
    </main>
  );
}
