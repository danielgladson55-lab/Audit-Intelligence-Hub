import { useState } from "react";

const EMPTY_FINDING = {
  title: "",
  rating: "Medium",
  controlId: "",
  condition: "",
  risk: "",
  recommendation: "",
  owner: "",
  targetDate: "",
  status: "Draft",
};

export default function FindingForm({ controls = [], onAdd }) {
  const [finding, setFinding] = useState(EMPTY_FINDING);

  function updateField(field, value) {
    setFinding((currentFinding) => ({
      ...currentFinding,
      [field]: value,
    }));
  }

  function submitFinding(event) {
    event.preventDefault();

    if (!finding.title.trim()) {
      return;
    }

    if (typeof onAdd === "function") {
      onAdd({
        ...finding,
        id: `FIND-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    }

    setFinding({ ...EMPTY_FINDING });
  }

  return (
    <form className="workspace-card" onSubmit={submitFinding}>
      <h2>Create audit finding</h2>

      <div className="form-grid">
        <label>
          Finding title
          <input
            type="text"
            value={finding.title}
            onChange={(event) =>
              updateField("title", event.target.value)
            }
            required
          />
        </label>

        <label>
          Risk rating
          <select
            value={finding.rating}
            onChange={(event) =>
              updateField("rating", event.target.value)
            }
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          Related control
          <select
            value={finding.controlId}
            onChange={(event) =>
              updateField("controlId", event.target.value)
            }
          >
            <option value="">Select control</option>
            {controls.map((control) => (
              <option
                key={control.controlId}
                value={control.controlId}
              >
                {control.controlId} - {control.controlName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select
            value={finding.status}
            onChange={(event) =>
              updateField("status", event.target.value)
            }
          >
            <option value="Draft">Draft</option>
            <option value="Under Discussion">Under Discussion</option>
            <option value="Agreed">Agreed</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label>
          Action owner
          <input
            type="text"
            value={finding.owner}
            onChange={(event) =>
              updateField("owner", event.target.value)
            }
          />
        </label>

        <label>
          Target date
          <input
            type="date"
            value={finding.targetDate}
            onChange={(event) =>
              updateField("targetDate", event.target.value)
            }
          />
        </label>
      </div>

      <label>
        Condition or observation
        <textarea
          rows="4"
          value={finding.condition}
          onChange={(event) =>
            updateField("condition", event.target.value)
          }
          placeholder="Describe the issue identified during testing."
        />
      </label>

      <label>
        Risk or impact
        <textarea
          rows="3"
          value={finding.risk}
          onChange={(event) =>
            updateField("risk", event.target.value)
          }
          placeholder="Describe the potential business, security or compliance impact."
        />
      </label>

      <label>
        Recommendation
        <textarea
          rows="3"
          value={finding.recommendation}
          onChange={(event) =>
            updateField("recommendation", event.target.value)
          }
          placeholder="Describe the recommended corrective action."
        />
      </label>

      <button type="submit">Add finding</button>
    </form>
  );
}
