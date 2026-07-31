import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
  calculateEnterpriseMetrics,
  createEnterpriseAssessment,
  getEnterprisePacks,
} from "../services/enterprisePackService";
import {
  clearEnterprisePackState,
  loadEnterprisePackState,
  saveEnterprisePackState,
} from "../services/enterprisePackStorageService";
import { exportEnterprisePack } from "../services/enterprisePackExportService";
import { sendEnterprisePackToWorkspace } from "../services/enterprisePackWorkspaceService";

export default function EnterpriseApplicationAuditPacks() {
  const navigate = useNavigate();
  const packs = useMemo(() => getEnterprisePacks(), []);

  const [state, setState] = useState(() => {
    const saved = loadEnterprisePackState();
    if (saved) return saved;

    const firstPack = packs[0];
    return {
      selectedPackId: firstPack?.id || "",
      assessments: firstPack
        ? { [firstPack.id]: createEnterpriseAssessment(firstPack) }
        : {},
    };
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const selectedPack =
    packs.find((pack) => pack.id === state.selectedPackId) || packs[0];
  const records = state.assessments[selectedPack?.id] || [];
  const metrics = useMemo(
    () => calculateEnterpriseMetrics(records),
    [records]
  );

  useEffect(() => {
    saveEnterprisePackState(state);
  }, [state]);

  function selectPack(packId) {
    const pack = packs.find((item) => item.id === packId);
    if (!pack) return;

    setState((current) => ({
      ...current,
      selectedPackId: packId,
      assessments: {
        ...current.assessments,
        [packId]:
          current.assessments[packId] ||
          createEnterpriseAssessment(pack),
      },
    }));
    setSearch("");
    setStatusFilter("All");
  }

  function updateRecord(recordId, field, value) {
    setState((current) => ({
      ...current,
      assessments: {
        ...current.assessments,
        [selectedPack.id]: current.assessments[selectedPack.id].map(
          (record) =>
            record.id === recordId
              ? { ...record, [field]: value }
              : record
        ),
      },
    }));
  }

  function resetPacks() {
    if (
      !window.confirm(
        "Reset all enterprise application audit-pack assessments saved in this browser?"
      )
    ) {
      return;
    }

    clearEnterprisePackState();
    const firstPack = packs[0];
    setState({
      selectedPackId: firstPack?.id || "",
      assessments: firstPack
        ? { [firstPack.id]: createEnterpriseAssessment(firstPack) }
        : {},
    });
  }

  function openWorkspace() {
    sendEnterprisePackToWorkspace(selectedPack, records);
    navigate("/audit-workspace");
  }

  const filteredRecords = records.filter((record) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      `${record.id} ${record.name} ${record.risk} ${record.frameworkTags.join(" ")}`
        .toLowerCase()
        .includes(query);
    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!selectedPack) {
    return (
      <main className="page-container">
        <div className="empty-state">
          No enterprise application audit packs are configured.
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Enterprise applications</p>
          <h1>Enterprise Application Audit Packs</h1>
          <p className="muted-text">
            Execute structured assessments for SAP, ServiceNow, Oracle,
            Salesforce and Workday.
          </p>
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={() =>
              exportEnterprisePack(selectedPack, records, metrics)
            }
          >
            Export audit pack
          </button>
          <button type="button" onClick={openWorkspace}>
            Open in Audit Workspace
          </button>
          <button
            className="danger-button"
            type="button"
            onClick={resetPacks}
          >
            Reset packs
          </button>
        </div>
      </div>

      <div className="warning-box">
        Tailor procedures to the implemented product edition, modules,
        architecture, business processes and regulatory scope. Use authorized
        system-generated evidence for formal testing.
      </div>

      <section
        className="workspace-card"
        style={{ marginTop: "20px" }}
      >
        <div className="form-grid">
          <label>
            Audit pack
            <select
              value={selectedPack.id}
              onChange={(event) => selectPack(event.target.value)}
            >
              {packs.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Search domains
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search domain, risk or framework tag"
            />
          </label>

          <label>
            Assessment status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All</option>
              <option>Not Assessed</option>
              <option>Effective</option>
              <option>Partially Effective</option>
              <option>Ineffective</option>
              <option>Not Applicable</option>
            </select>
          </label>
        </div>
      </section>

      <section className="enterprise-pack-hero">
        <div>
          <span>{selectedPack.category}</span>
          <h2>{selectedPack.name}</h2>
          <p>{selectedPack.description}</p>
        </div>
        <strong>{metrics.score}% readiness</strong>
      </section>

      <div className="metric-grid">
        <div className="metric-card">
          <span>Domains</span>
          <strong>{metrics.total}</strong>
        </div>
        <div className="metric-card">
          <span>Assessed</span>
          <strong>{metrics.assessed}</strong>
        </div>
        <div className="metric-card">
          <span>Effective</span>
          <strong>{metrics.effective}</strong>
        </div>
        <div className="metric-card">
          <span>Partial</span>
          <strong>{metrics.partial}</strong>
        </div>
        <div className="metric-card">
          <span>Ineffective</span>
          <strong>{metrics.ineffective}</strong>
        </div>
        <div className="metric-card">
          <span>Evidence validated</span>
          <strong>{metrics.validated}</strong>
        </div>
        <div className="metric-card">
          <span>High-risk gaps</span>
          <strong>{metrics.highGaps}</strong>
        </div>
      </div>

      <section className="workspace-card">
        <h3>Audit objectives</h3>
        <ul>
          {selectedPack.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      {filteredRecords.length === 0 ? (
        <div className="empty-state">
          No domains match the current search and status filter.
        </div>
      ) : (
        filteredRecords.map((record) => (
          <article className="workspace-card" key={record.id}>
            <div className="workspace-card-header">
              <div>
                <span className="record-id">{record.id}</span>
                <h2>{record.name}</h2>
                <p className="muted-text">{record.risk}</p>
              </div>
              <span
                className={`enterprise-rating enterprise-${record.riskRating.toLowerCase()}`}
              >
                {record.riskRating}
              </span>
            </div>

            <div className="form-grid">
              <label>
                Assessment status
                <select
                  value={record.status}
                  onChange={(event) =>
                    updateRecord(record.id, "status", event.target.value)
                  }
                >
                  <option>Not Assessed</option>
                  <option>Effective</option>
                  <option>Partially Effective</option>
                  <option>Ineffective</option>
                  <option>Not Applicable</option>
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
                Risk rating
                <select
                  value={record.riskRating}
                  onChange={(event) =>
                    updateRecord(
                      record.id,
                      "riskRating",
                      event.target.value
                    )
                  }
                >
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>

              <label>
                Action owner
                <input
                  value={record.owner}
                  onChange={(event) =>
                    updateRecord(record.id, "owner", event.target.value)
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

              <label>
                Evidence reference
                <input
                  value={record.evidenceReference}
                  onChange={(event) =>
                    updateRecord(
                      record.id,
                      "evidenceReference",
                      event.target.value
                    )
                  }
                  placeholder={`Example: WP-${record.id}-01`}
                />
              </label>
            </div>

            <details>
              <summary>Audit checks</summary>
              <ol>
                {record.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ol>
            </details>

            <details>
              <summary>Expected evidence</summary>
              <ul>
                {record.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>

            <details>
              <summary>Framework tags</summary>
              <div className="enterprise-tags">
                {record.frameworkTags.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </details>

            <label>
              Findings or gaps
              <textarea
                rows="3"
                value={record.findings}
                onChange={(event) =>
                  updateRecord(record.id, "findings", event.target.value)
                }
                placeholder="Document identified control, configuration or evidence gaps."
              />
            </label>

            <label>
              Assessment notes
              <textarea
                rows="4"
                value={record.notes}
                onChange={(event) =>
                  updateRecord(record.id, "notes", event.target.value)
                }
                placeholder="Document procedures performed, samples reviewed and conclusion rationale."
              />
            </label>
          </article>
        ))
      )}
    </main>
  );
}
