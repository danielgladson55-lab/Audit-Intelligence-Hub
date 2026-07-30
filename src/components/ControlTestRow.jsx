export default function ControlTestRow({
  test,
  onChange,
}) {
  function updateField(field, value) {
  setFinding((currentFinding) => ({
    ...currentFinding,
    value,
  }));
}
  return (
    <div className="workspace-card">
      <div className="workspace-card-header">
        <div>
          <span className="record-id">
            {test.controlId}
          </span>

          <h3>{test.controlName}</h3>

          <p className="muted-text">
            {test.domain}
          </p>
        </div>

        <span
          className={`status-badge status-${test.testStatus
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {test.testStatus}
        </span>
      </div>

      <p>
        <strong>Risk:</strong> {test.risk}
      </p>

      <div className="form-grid">
        <label>
          Test status

          <select
            value={test.testStatus}
            onChange={(event) =>
              updateField(
                "testStatus",
                event.target.value
              )
            }
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Not Applicable</option>
          </select>
        </label>

        <label>
          Evidence status

          <select
            value={test.evidenceStatus}
            onChange={(event) =>
              updateField(
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
          </select>
        </label>

        <label>
          Conclusion

          <select
            value={test.conclusion}
            onChange={(event) =>
              updateField(
                "conclusion",
                event.target.value
              )
            }
          >
            <option>Not Concluded</option>
            <option>Effective</option>
            <option>Partially Effective</option>
            <option>Ineffective</option>
            <option>Not Applicable</option>
          </select>
        </label>
      </div>

      <details>
        <summary>Audit procedures</summary>

        <ol>
          {test.auditProcedures.map(
            (procedure) => (
              <li key={procedure}>
                {procedure}
              </li>
            )
          )}
        </ol>
      </details>

      <details>
        <summary>Evidence requirements</summary>

        <ul>
          {test.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <label>
        Auditor notes

        <textarea
          rows="5"
          value={test.notes || ""}
          onChange={(event) =>
            updateField(
              "notes",
              event.target.value
            )
          }
          placeholder="Document work performed, samples reviewed, exceptions identified and the basis for the conclusion."
        />
      </label>
    </div>
  );
}