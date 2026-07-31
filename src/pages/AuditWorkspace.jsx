import { useEffect, useMemo, useState } from "react";

import auditTemplates from "../data/auditTemplates";
import controlLibrary from "../data/controlLibrary";

import {
  clearWorkspace,
  loadWorkspace,
  saveWorkspace,
} from "../services/storageService";

import {
  exportChecklist,
  exportFindings,
} from "../services/exportService";

import ProgressBar from "../components/ProgressBar";
import ControlTestRow from "../components/ControlTestRow";
import FindingForm from "../components/FindingForm";
import FindingRegister from "../components/FindingRegister";

const EMPTY_WORKSPACE = {
  selectedAuditId: "",
  generatedAudit: null,
  controlTests: [],
  findings: [],
};

function createTemplateTests(template) {
  if (!template || !Array.isArray(template.controlIds)) return [];
  return template.controlIds
    .map((controlId) => controlLibrary.find((control) => control.controlId === controlId))
    .filter(Boolean)
    .map((control) => ({
      ...control,
      testStatus: "Not Started",
      evidenceStatus: "Not Requested",
      conclusion: "Not Concluded",
      notes: "",
    }));
}

function normalizeWorkspace(saved) {
  if (!saved) return { ...EMPTY_WORKSPACE };
  return {
    selectedAuditId: saved.selectedAuditId || "",
    generatedAudit: saved.generatedAudit || null,
    controlTests: Array.isArray(saved.controlTests) ? saved.controlTests : [],
    findings: Array.isArray(saved.findings) ? saved.findings : [],
  };
}

export default function AuditWorkspace() {
  const [workspace, setWorkspace] = useState(() => normalizeWorkspace(loadWorkspace()));
  const [activeTab, setActiveTab] = useState("overview");

  const selectedAudit = useMemo(() => {
    if (workspace.generatedAudit && workspace.generatedAudit.id === workspace.selectedAuditId) {
      return workspace.generatedAudit;
    }
    return auditTemplates.find((audit) => audit.id === workspace.selectedAuditId) || null;
  }, [workspace.generatedAudit, workspace.selectedAuditId]);

  useEffect(() => {
  saveWorkspace(workspace);
}, [workspace]);

  function selectAudit(auditId) {
    const audit = auditTemplates.find((item) => item.id === auditId);
    if (!audit) return;
    setWorkspace({
      selectedAuditId: audit.id,
      generatedAudit: null,
      controlTests: createTemplateTests(audit),
      findings: [],
    });
    setActiveTab("overview");
  }

  function updateControlTest(updatedTest) {
    setWorkspace((current) => ({
      ...current,
      controlTests: current.controlTests.map((test) =>
        test.controlId === updatedTest.controlId ? updatedTest : test
      ),
    }));
  }

  function addFinding(finding) {
    setWorkspace((current) => ({ ...current, findings: [finding, ...current.findings] }));
  }

  function deleteFinding(findingId) {
    setWorkspace((current) => ({
      ...current,
      findings: current.findings.filter((finding) => finding.id !== findingId),
    }));
  }

  function resetAudit() {
    if (!window.confirm("Reset this audit? All testing, notes and findings saved in this browser will be deleted.")) return;
    clearWorkspace();
    setWorkspace({ ...EMPTY_WORKSPACE });
    setActiveTab("overview");
  }

  const controlTests = workspace.controlTests;
  const findings = workspace.findings;
  const completedTests = controlTests.filter((test) => ["Completed", "Not Applicable"].includes(test.testStatus)).length;
  const inProgressTests = controlTests.filter((test) => test.testStatus === "In Progress").length;
  const validatedEvidence = controlTests.filter((test) => test.evidenceStatus === "Validated").length;
  const openFindings = findings.filter((finding) => finding.status !== "Closed").length;
  const highRiskFindings = findings.filter((finding) => finding.status !== "Closed" && ["Critical", "High"].includes(finding.rating)).length;

  if (!selectedAudit) {
    return (
      <main className="page-container">
        <div className="page-heading"><div><p className="eyebrow">Audit execution</p><h1>Audit Workspace</h1><p className="muted-text">Open a generated audit package or select a standard template.</p></div></div>
        <div className="warning-box">Use synthetic demonstration data only. Do not enter confidential information in the public version.</div>
        <div className="template-grid" style={{ marginTop: "20px" }}>
          {auditTemplates.map((audit) => (
            <button className="template-card" key={audit.id} type="button" onClick={() => selectAudit(audit.id)}>
              <span className="record-id">{audit.id}</span><h2>{audit.title}</h2><p>{audit.description}</p><strong>{audit.controlIds.length} linked controls</strong>
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div><p className="eyebrow">{workspace.generatedAudit ? "Generated audit" : "Active audit"}</p><h1>{selectedAudit.title}</h1><p className="muted-text">{selectedAudit.description}</p></div>
        <div className="button-group">
          <button type="button" disabled={controlTests.length === 0} onClick={() => exportChecklist(selectedAudit.title, controlTests)}>Export checklist</button>
          <button type="button" disabled={findings.length === 0} onClick={() => exportFindings(selectedAudit.title, findings)}>Export findings</button>
          <button className="danger-button" type="button" onClick={resetAudit}>Reset audit</button>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-card"><span>Total controls</span><strong>{controlTests.length}</strong></div>
        <div className="metric-card"><span>Tests completed</span><strong>{completedTests}</strong></div>
        <div className="metric-card"><span>Tests in progress</span><strong>{inProgressTests}</strong></div>
        <div className="metric-card"><span>Validated evidence</span><strong>{validatedEvidence}</strong></div>
        <div className="metric-card"><span>Total findings</span><strong>{findings.length}</strong></div>
        <div className="metric-card"><span>Open findings</span><strong>{openFindings}</strong></div>
        <div className="metric-card"><span>Critical or high findings</span><strong>{highRiskFindings}</strong></div>
      </div>

      <ProgressBar completed={completedTests} total={controlTests.length} />

      <div className="workspace-tabs">
        {[["overview", "Overview"], ["testing", "Control Testing"], ["findings", "Findings"]].map(([id, label]) => (
          <button key={id} type="button" className={activeTab === id ? "active-tab" : ""} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>

      {activeTab === "overview" && (
        <section>
          <div className="workspace-card"><h2>Audit objectives</h2><ul>{(selectedAudit.objectives || []).map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="workspace-card"><h2>Linked controls</h2>{controlTests.length === 0 ? <p className="muted-text">No controls are linked.</p> : <ul>{controlTests.map((item) => <li key={item.controlId}><strong>{item.controlId}</strong> - {item.controlName}</li>)}</ul>}</div>
        </section>
      )}

      {activeTab === "testing" && (
        <section>{controlTests.length === 0 ? <div className="empty-state">No controls are linked to this audit.</div> : controlTests.map((test) => <ControlTestRow key={test.controlId} test={test} onChange={updateControlTest} />)}</section>
      )}

      {activeTab === "findings" && (
        <section className="two-column-layout">
          <FindingForm controls={controlTests} onAdd={addFinding} />
          <div><h2>Findings register</h2><p className="muted-text">{findings.length} total finding{findings.length === 1 ? "" : "s"}, {openFindings} open.</p><FindingRegister findings={findings} onDelete={deleteFinding} /></div>
        </section>
      )}
    </main>
  );
}
