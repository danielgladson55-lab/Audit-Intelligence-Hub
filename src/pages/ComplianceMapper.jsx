import { useEffect, useMemo, useState } from "react";

import {
  buildComplianceAssessment,
  calculateComplianceMetrics,
  getComplianceFrameworks,
} from "../services/complianceMapperService";

import {
  clearComplianceAssessment,
  loadComplianceAssessment,
  saveComplianceAssessment,
} from "../services/complianceStorageService";

import { exportComplianceAssessment } from "../services/complianceExportService";

const EMPTY_STATE = {
  frameworkId: "",
  records: [],
};

export default function ComplianceMapper() {
  const frameworks = useMemo(
    () => getComplianceFrameworks(),
    []
  );

  const [assessment, setAssessment] = useState(
    () => loadComplianceAssessment() || EMPTY_STATE
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const selectedFramework = frameworks.find(
    (item) => item.id === assessment.frameworkId
  );

  const metrics = useMemo(
    () => calculateComplianceMetrics(assessment.records),
    [assessment.records]
  );

  useEffect(() => {
    saveComplianceAssessment(assessment);
  }, [assessment]);

  function selectFramework(frameworkId) {
    setAssessment({
      frameworkId,
      records: frameworkId
        ? buildComplianceAssessment(frameworkId)
        : [],
    });
    setSearch("");
    setStatusFilter("All");
  }

  function updateRecord(recordId, field, value) {
    setAssessment((current) => ({
      ...current,
      records: current.records.map((record) =>
        record.id === recordId
          ? { ...record, [field]: value }
          : record
      ),
    }));
  }

  function resetAssessment() {
    if (
      !window.confirm(
        "Reset the compliance assessment saved in this browser?"
      )
    ) {
      return;
    }

    clearComplianceAssessment();
    setAssessment(EMPTY_STATE);
    setSearch("");
    setStatusFilter("All");
  }

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return assessment.records.filter((record) => {
      const matchesSearch =
        !query ||
        [
          record.reference,
          record.controlId,
          record.controlTitle,
          record.domain,
          record.gap,
          record.owner,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        );

      const matchesStatus =
        statusFilter === "All" ||
        record.implementationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assessment.records, search, statusFilter]);

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Framework gap assessment</p>
          <h1>Compliance Mapper</h1>
          <p className="muted-text">
            Assess mapped controls, implementation status, evidence readiness,
            gaps and remediation actions for a selected framework.
          </p>
        </div>

        <div className="button-group">
          <button
            type="button"
            disabled={!selectedFramework}
            onClick={() =>
              exportComplianceAssessment(
                selectedFramework?.name || "Framework",
                assessment.records,
                metrics
              )
            }
          >
            Export assessment
          </button>

          <button
            className="danger-button"
            type="button"
            onClick={resetAssessment}
          >
            Reset assessment
          </button>
        </div>
      </div>

      <div className="warning-box">
        The mapper uses the Knowledge Graph mapping layer. Validate applicability
        and formal conclusions against official or licensed framework material.
      </div>

      <section
        className="workspace-card"
        style={{ marginTop: "20px" }}
      >
        <div className="form-grid">
          <label>
            Select framework
            <select
              value={assessment.frameworkId}
              onChange={(event) =>
                selectFramework(event.target.value)
              }
            >
              <option value="">Choose a framework</option>
              {frameworks.map((framework) => (
                <option key={framework.id} value={framework.id}>
                  {framework.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Search assessment
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reference, control, domain or owner"
            />
          </label>

          <label>
            Implementation filter
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option>All</option>
              <option>Not Assessed</option>
              <option>Implemented</option>
              <option>Partially Implemented</option>
              <option>Not Implemented</option>
            </select>
          </label>
        </div>
      </section>

      {selectedFramework && (
        <>
          <div className="metric-grid">
            <div className="metric-card">
              <span>Compliance score</span>
              <strong>{metrics.score}%</strong>
            </div>
            <div className="metric-card">
              <span>Applicable controls</span>
              <strong>{metrics.applicable}</strong>
            </div>
            <div className="metric-card">
              <span>Implemented</span>
              <strong>{metrics.implemented}</strong>
            </div>
            <div className="metric-card">
              <span>Partial</span>
              <strong>{metrics.partiallyImplemented}</strong>
            </div>
            <div className="metric-card">
              <span>Gaps</span>
              <strong>{metrics.gaps}</strong>
            </div>
            <div className="metric-card">
              <span>Evidence validated</span>
              <strong>{metrics.evidenceReady}</strong>
            </div>
          </div>

          <div className="compliance-progress">
            <div>
              <span>Framework readiness</span>
              <strong>{metrics.score}%</strong>
            </div>
            <div className="compliance-track">
              <div
                className="compliance-value"
                style={{ width: `${metrics.score}%` }}
              />
            </div>
          </div>

          <p className="muted-text">
            {filteredRecords.length} mapped record
            {filteredRecords.length === 1 ? "" : "s"} displayed.
          </p>

          {filteredRecords.length === 0 ? (
            <div className="empty-state">
              No mapped controls match the current selection.
            </div>
          ) : (
            filteredRecords.map((record) => (
              <article className="workspace-card" key={record.id}>
                <div className="workspace-card-header">
                  <div>
                    <span className="record-id">
                      {record.reference}
                    </span>
                    <h2>{record.controlTitle}</h2>
                    <p className="muted-text">
                      {record.controlId} | {record.domain} | Mapping: {record.mappingStrength}
                    </p>
                  </div>
                </div>

                <p>
                  <strong>Control objective:</strong> {record.objective}
                </p>

                <div className="form-grid">
                  <label>
                    Applicability
                    <select
                      value={record.applicability}
                      onChange={(event) =>
                        updateRecord(
                          record.id,
                          "applicability",
                          event.target.value
                        )
                      }
                    >
                      <option>Applicable</option>
                      <option>Not Applicable</option>
                      <option>To Be Confirmed</option>
                    </select>
                  </label>

                  <label>
                    Implementation status
                    <select
                      value={record.implementationStatus}
                      onChange={(event) =>
                        updateRecord(
                          record.id,
                          "implementationStatus",
                          event.target.value
                        )
                      }
                    >
                      <option>Not Assessed</option>
                      <option>Implemented</option>
                      <option>Partially Implemented</option>
                      <option>Not Implemented</option>
                    </select>
                  </label>

                  <label>
                    Evidence status
                    <select
                      value={record.evidenceStatus}
                      onChange={(event) =>
                        updateRecord(
                          record.id,
                          "evidenceStatus",
                          event.target.value
                        )
                      }
                    >
                      <option>Not Requested</option>
                      <option>Requested</option>
                      <option>Partially Received</option>
                      <option>Received</option>
                      <option>Validated</option>
                      <option>Insufficient</option>
                    </select>
                  </label>

                  <label>
                    Remediation owner
                    <input
                      value={record.owner}
                      onChange={(event) =>
                        updateRecord(
                          record.id,
                          "owner",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Target date
                    <input
                      type="date"
                      value={record.targetDate}
                      onChange={(event) =>
                        updateRecord(
                          record.id,
                          "targetDate",
                          event.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <details>
                  <summary>Linked risks</summary>
                  <ul>
                    {record.riskRecords.map((risk) => (
                      <li key={risk.id}>
                        <strong>{risk.id}</strong> - {risk.title}
                      </li>
                    ))}
                  </ul>
                </details>

                <details>
                  <summary>Expected evidence</summary>
                  <ul>
                    {record.expectedEvidence.map((item) => (
                      <li key={item.id}>
                        {item.title} ({item.format})
                      </li>
                    ))}
                  </ul>
                </details>

                <label>
                  Gap description
                  <textarea
                    rows="3"
                    value={record.gap}
                    onChange={(event) =>
                      updateRecord(
                        record.id,
                        "gap",
                        event.target.value
                      )
                    }
                    placeholder="Describe the identified design, implementation or evidence gap."
                  />
                </label>

                <label>
                  Remediation action
                  <textarea
                    rows="3"
                    value={record.remediationAction}
                    onChange={(event) =>
                      updateRecord(
                        record.id,
                        "remediationAction",
                        event.target.value
                      )
                    }
                    placeholder="Describe the agreed action required to close the gap."
                  />
                </label>

                <label>
                  Assessment notes
                  <textarea
                    rows="3"
                    value={record.notes}
                    onChange={(event) =>
                      updateRecord(
                        record.id,
                        "notes",
                        event.target.value
                      )
                    }
                  />
                </label>
              </article>
            ))
          )}
        </>
      )}
    </main>
  );
}
