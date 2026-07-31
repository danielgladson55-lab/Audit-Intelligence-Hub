import { useEffect, useMemo, useState } from "react";

import { maturityLevels } from "../data/maturity/maturityModel";
import {
  calculateMaturityMetrics,
  createMaturityAssessment,
  getMaturityHeatClass,
  getMaturityLevel,
} from "../services/maturityAssessmentService";
import {
  clearMaturityAssessment,
  loadMaturityAssessment,
  saveMaturityAssessment,
} from "../services/maturityStorageService";
import { exportMaturityAssessment } from "../services/maturityExportService";

const EMPTY_FILTER = "All";

export default function MaturityAssessment() {
  const [assessment, setAssessment] = useState(() => {
    const saved = loadMaturityAssessment();
    return saved || {
      records: createMaturityAssessment(),
    };
  });
  const [priorityFilter, setPriorityFilter] = useState(EMPTY_FILTER);
  const [search, setSearch] = useState("");

  const records = Array.isArray(assessment.records)
    ? assessment.records
    : [];
  const metrics = useMemo(
    () => calculateMaturityMetrics(records),
    [records]
  );

  useEffect(() => {
    saveMaturityAssessment(assessment);
  }, [assessment]);

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
        "Reset the maturity assessment saved in this browser?"
      )
    ) {
      return;
    }

    clearMaturityAssessment();
    setAssessment({
      records: createMaturityAssessment(),
    });
    setPriorityFilter(EMPTY_FILTER);
    setSearch("");
  }

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesPriority =
        priorityFilter === EMPTY_FILTER ||
        record.priority === priorityFilter;
      const matchesSearch =
        !query ||
        [record.id, record.name, record.objective, record.owner]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesPriority && matchesSearch;
    });
  }, [records, priorityFilter, search]);

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Capability improvement</p>
          <h1>Maturity Assessment</h1>
          <p className="muted-text">
            Measure current and target capability, prioritize gaps and track
            improvement actions across technology-risk domains.
          </p>
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={() => exportMaturityAssessment(records, metrics)}
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
        Maturity ratings are structured management assessments, not formal
        certifications. Support each score with evidence and documented rationale.
      </div>

      <div className="metric-grid" style={{ marginTop: "20px" }}>
        <div className="metric-card">
          <span>Current maturity</span>
          <strong>{metrics.currentAverage}</strong>
        </div>
        <div className="metric-card">
          <span>Target maturity</span>
          <strong>{metrics.targetAverage}</strong>
        </div>
        <div className="metric-card">
          <span>Total gap</span>
          <strong>{metrics.totalGap}</strong>
        </div>
        <div className="metric-card">
          <span>High-priority gaps</span>
          <strong>{metrics.highPriorityGaps}</strong>
        </div>
        <div className="metric-card">
          <span>Assessment completion</span>
          <strong>{metrics.completion}%</strong>
        </div>
      </div>

      <section className="workspace-card">
        <h2>Maturity scale</h2>
        <div className="maturity-scale">
          {maturityLevels.map((level) => (
            <div key={level.score}>
              <strong>
                {level.score} - {level.name}
              </strong>
              <span>{level.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="workspace-card">
        <div className="form-grid">
          <label>
            Search domains
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search domain, objective or owner"
            />
          </label>

          <label>
            Priority filter
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>
        </div>
      </section>

      <section className="workspace-card">
        <h2>Domain heat map</h2>
        <div className="maturity-heatmap">
          {records.map((record) => (
            <div
              key={record.id}
              className={getMaturityHeatClass(
                record.currentScore,
                record.targetScore
              )}
            >
              <strong>{record.name}</strong>
              <span>
                Current {record.currentScore} / Target {record.targetScore}
              </span>
            </div>
          ))}
        </div>
      </section>

      {filteredRecords.length === 0 ? (
        <div className="empty-state">
          No maturity domains match the current filters.
        </div>
      ) : (
        filteredRecords.map((record) => {
          const currentLevel = getMaturityLevel(record.currentScore);
          const targetLevel = getMaturityLevel(record.targetScore);
          const gap = Math.max(
            0,
            Number(record.targetScore) - Number(record.currentScore)
          );

          return (
            <article className="workspace-card" key={record.id}>
              <div className="workspace-card-header">
                <div>
                  <span className="record-id">{record.id}</span>
                  <h2>{record.name}</h2>
                  <p className="muted-text">{record.objective}</p>
                </div>
                <span
                  className={getMaturityHeatClass(
                    record.currentScore,
                    record.targetScore
                  )}
                >
                  Gap {gap}
                </span>
              </div>

              <div className="form-grid">
                <label>
                  Current score
                  <select
                    value={record.currentScore}
                    onChange={(event) =>
                      updateRecord(
                        record.id,
                        "currentScore",
                        Number(event.target.value)
                      )
                    }
                  >
                    {maturityLevels.map((level) => (
                      <option key={level.score} value={level.score}>
                        {level.score} - {level.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Target score
                  <select
                    value={record.targetScore}
                    onChange={(event) =>
                      updateRecord(
                        record.id,
                        "targetScore",
                        Number(event.target.value)
                      )
                    }
                  >
                    {maturityLevels.map((level) => (
                      <option key={level.score} value={level.score}>
                        {level.score} - {level.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Priority
                  <select
                    value={record.priority}
                    onChange={(event) =>
                      updateRecord(
                        record.id,
                        "priority",
                        event.target.value
                      )
                    }
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </label>

                <label>
                  Improvement owner
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
                    placeholder="Example: WP-MAT-IAM-01"
                  />
                </label>
              </div>

              <div className="maturity-level-summary">
                <div>
                  <strong>Current: {currentLevel.name}</strong>
                  <span>{currentLevel.description}</span>
                </div>
                <div>
                  <strong>Target: {targetLevel.name}</strong>
                  <span>{targetLevel.description}</span>
                </div>
              </div>

              <label>
                Assessment observation
                <textarea
                  rows="4"
                  value={record.observation}
                  onChange={(event) =>
                    updateRecord(
                      record.id,
                      "observation",
                      event.target.value
                    )
                  }
                  placeholder="Document the evidence and rationale supporting the current score."
                />
              </label>

              <label>
                Improvement action
                <textarea
                  rows="4"
                  value={record.improvementAction}
                  onChange={(event) =>
                    updateRecord(
                      record.id,
                      "improvementAction",
                      event.target.value
                    )
                  }
                />
              </label>

              <details>
                <summary>Suggested improvement actions</summary>
                <ul>
                  {record.suggestedActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </details>
            </article>
          );
        })
      )}
    </main>
  );
}
