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
  controlTests: [],
  findings: [],
};

function createControlTests(template) {
  if (!template || !Array.isArray(template.controlIds)) {
    return [];
  }

  return template.controlIds
    .map((controlId) =>
      controlLibrary.find(
        (control) => control.controlId === controlId
      )
    )
    .filter(Boolean)
    .map((control) => ({
      ...control,
      testStatus: "Not Started",
      evidenceStatus: "Not Requested",
      conclusion: "Not Concluded",
      notes: "",
    }));
}

function normalizeWorkspace(savedWorkspace) {
  if (!savedWorkspace) {
    return { ...EMPTY_WORKSPACE };
  }

  return {
    selectedAuditId: savedWorkspace.selectedAuditId || "",
    controlTests: Array.isArray(savedWorkspace.controlTests)
      ? savedWorkspace.controlTests
      : [],
    findings: Array.isArray(savedWorkspace.findings)
      ? savedWorkspace.findings
      : [],
  };
}

export default function AuditWorkspace() {
  const [workspace, setWorkspace] = useState(() =>
    normalizeWorkspace(loadWorkspace())
  );
  const [activeTab, setActiveTab] = useState("overview");

  const selectedAuditId = workspace.selectedAuditId;
  const controlTests = workspace.controlTests;
  const findings = workspace.findings;

  const selectedAudit = useMemo(
    () =>
      auditTemplates.find(
        (audit) => audit.id === selectedAuditId
      ) || null,
    [selectedAuditId]
  );

  useEffect(() => {
    saveWorkspace(workspace);
  }, [workspace]);

  function selectAudit(auditId) {
    const audit = auditTemplates.find(
      (template) => template.id === auditId
    );

    if (!audit) {
      return;
    }

    setWorkspace({
      selectedAuditId: audit.id,
      controlTests: createControlTests(audit),
      findings: [],
    });
    setActiveTab("overview");
  }

  function updateControlTest(updatedTest) {
    setWorkspace((currentWorkspace) => ({
      ...currentWorkspace,
      controlTests: currentWorkspace.controlTests.map((test) =>
        test.controlId === updatedTest.controlId
          ? updatedTest
          : test
      ),
    }));
  }

  function addFinding(finding) {
    setWorkspace((currentWorkspace) => ({
      ...currentWorkspace,
      findings: [finding, ...currentWorkspace.findings],
    }));
  }

  function deleteFinding(findingId) {
    setWorkspace((currentWorkspace) => ({
      ...currentWorkspace,
      findings: currentWorkspace.findings.filter(
        (finding) => finding.id !== findingId
      ),
    }));
  }

  function resetAudit() {
    const shouldReset = window.confirm(
      "Reset this audit? All testing, notes and findings saved in this browser will be deleted."
    );

    if (!shouldReset) {
      return;
    }

    clearWorkspace();
    setWorkspace({ ...EMPTY_WORKSPACE });
    setActiveTab("overview");
  }

  function refreshControls() {
    if (!selectedAudit) {
      return;
    }

    const latestTests = createControlTests(selectedAudit);
    const refreshedTests = latestTests.map((latestTest) => {
      const existingTest = controlTests.find(
        (test) => test.controlId === latestTest.controlId
      );

      if (!existingTest) {
        return latestTest;
      }

      return {
        ...latestTest,
        testStatus: existingTest.testStatus || "Not Started",
        evidenceStatus:
          existingTest.evidenceStatus || "Not Requested",
        conclusion: existingTest.conclusion || "Not Concluded",
        notes: existingTest.notes || "",
      };
    });

    setWorkspace((currentWorkspace) => ({
      ...currentWorkspace,
      controlTests: refreshedTests,
    }));
  }

  const completedTests = controlTests.filter(
    (test) =>
      test.testStatus === "Completed" ||
      test.testStatus === "Not Applicable"
  ).length;

  const inProgressTests = controlTests.filter(
    (test) => test.testStatus === "In Progress"
  ).length;

  const validatedEvidence = controlTests.filter(
    (test) => test.evidenceStatus === "Validated"
  ).length;

  const openFindings = findings.filter(
    (finding) => finding.status !== "Closed"
  ).length;

  const highRiskFindings = findings.filter(
    (finding) =>
      finding.status !== "Closed" &&
      (finding.rating === "Critical" || finding.rating === "High")
  ).length;

  if (!selectedAudit) {
    return (
      <main className="page-container">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Audit execution</p>
            <h1>Audit Workspace</h1>
            <p className="muted-text">
              Select an audit template to create a control checklist,
              evidence tracker and findings register.
            </p>
          </div>
        </div>

        <div className="warning-box">
          Use synthetic demonstration data only. Do not enter confidential
          company, employee, patient, customer or vendor information.
        </div>

        <div className="template-grid" style={{ marginTop: "20px" }}>
          {auditTemplates.map((audit) => (
            <button
              className="template-card"
              key={audit.id}
              type="button"
              onClick={() => selectAudit(audit.id)}
            >
              <span className="record-id">{audit.id}</span>
              <h2>{audit.title}</h2>
              <p>{audit.description}</p>
              <strong>
                {Array.isArray(audit.controlIds)
                  ? audit.controlIds.length
                  : 0}{" "}
                linked controls
              </strong>
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Active audit</p>
          <h1>{selectedAudit.title}</h1>
          <p className="muted-text">{selectedAudit.description}</p>
        </div>

        <div className="button-group">
          <button
            type="button"
            disabled={controlTests.length === 0}
            onClick={() =>
              exportChecklist(selectedAudit.title, controlTests)
            }
          >
            Export checklist
          </button>

          <button
            type="button"
            disabled={findings.length === 0}
            onClick={() =>
              exportFindings(selectedAudit.title, findings)
            }
          >
            Export findings
          </button>

          <button type="button" onClick={refreshControls}>
            Refresh controls
          </button>

          <button
            className="danger-button"
            type="button"
            onClick={resetAudit}
          >
            Reset audit
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>Total controls</span>
          <strong>{controlTests.length}</strong>
        </div>
        <div className="metric-card">
          <span>Tests completed</span>
          <strong>{completedTests}</strong>
        </div>
        <div className="metric-card">
          <span>Tests in progress</span>
          <strong>{inProgressTests}</strong>
        </div>
        <div className="metric-card">
          <span>Validated evidence</span>
          <strong>{validatedEvidence}</strong>
        </div>
        <div className="metric-card">
          <span>Total findings</span>
          <strong>{findings.length}</strong>
        </div>
        <div className="metric-card">
          <span>Open findings</span>
          <strong>{openFindings}</strong>
        </div>
        <div className="metric-card">
          <span>Critical or high findings</span>
          <strong>{highRiskFindings}</strong>
        </div>
      </div>

      <ProgressBar
        completed={completedTests}
        total={controlTests.length}
      />

      <div className="workspace-tabs">
        <button
          type="button"
          className={activeTab === "overview" ? "active-tab" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          type="button"
          className={activeTab === "testing" ? "active-tab" : ""}
          onClick={() => setActiveTab("testing")}
        >
          Control Testing
        </button>
        <button
          type="button"
          className={activeTab === "findings" ? "active-tab" : ""}
          onClick={() => setActiveTab("findings")}
        >
          Findings
        </button>
      </div>

      {activeTab === "overview" && (
        <section>
          <div className="workspace-card">
            <h2>Audit objectives</h2>
            {Array.isArray(selectedAudit.objectives) &&
            selectedAudit.objectives.length > 0 ? (
              <ul>
                {selectedAudit.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            ) : (
              <p className="muted-text">
                No audit objectives have been added.
              </p>
            )}
          </div>

          <div className="workspace-card">
            <h2>Scope summary</h2>
            <p>
              Linked controls: <strong>{controlTests.length}</strong>
            </p>
            <p>
              Completed tests: <strong>{completedTests}</strong>
            </p>
            <p>
              Validated evidence: <strong>{validatedEvidence}</strong>
            </p>
            <p>
              Open findings: <strong>{openFindings}</strong>
            </p>
          </div>

          {controlTests.length === 0 && (
            <div className="warning-box">
              This template does not currently have linked controls. Add
              control IDs to the controlIds array in
              src/data/auditTemplates.js.
            </div>
          )}

          <div className="workspace-card">
            <h2>Linked controls</h2>
            {controlTests.length === 0 ? (
              <p className="muted-text">No controls are linked.</p>
            ) : (
              <ul>
                {controlTests.map((control) => (
                  <li key={control.controlId}>
                    <strong>{control.controlId}</strong>
                    {" - "}
                    {control.controlName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {activeTab === "testing" && (
        <section>
          {controlTests.length === 0 ? (
            <div className="empty-state">
              No controls are linked to this audit template.
            </div>
          ) : (
            controlTests.map((test) => (
              <ControlTestRow
                key={test.controlId}
                test={test}
                onChange={updateControlTest}
              />
            ))
          )}
        </section>
      )}

      {activeTab === "findings" && (
        <section className="two-column-layout">
          <FindingForm controls={controlTests} onAdd={addFinding} />

          <div>
            <h2>Findings register</h2>
            <p className="muted-text">
              {findings.length} total finding
              {findings.length === 1 ? "" : "s"}, {openFindings} open.
            </p>
            <FindingRegister
              findings={findings}
              onDelete={deleteFinding}
            />
          </div>
        </section>
      )}
    </main>
  );
}
