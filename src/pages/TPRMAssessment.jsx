import { useEffect, useMemo, useState } from "react";
import tprmQuestions from "../data/tprmQuestions";
import { calculateTprmScore } from "../services/tprmScoringService";
import { clearTprmAssessment, loadTprmAssessment, saveTprmAssessment } from "../services/tprmStorageService";
import { exportTprmAssessment } from "../services/tprmExportService";

const EMPTY_ASSESSMENT = {
  vendor: { name: "", service: "", owner: "", tier: "Not Classified" },
  responses: {},
};

export default function TPRMAssessment() {
  const [assessment, setAssessment] = useState(() => loadTprmAssessment() || EMPTY_ASSESSMENT);
  const { vendor, responses } = assessment;
  const score = useMemo(() => calculateTprmScore(tprmQuestions, responses), [responses]);

  useEffect(() => {
    saveTprmAssessment(assessment);
  }, [assessment]);

  function updateVendor(field, value) {
    setAssessment((current) => ({ ...current, vendor: { ...current.vendor, [field]: value } }));
  }

  function updateResponse(questionId, field, value) {
    setAssessment((current) => ({
      ...current,
      responses: {
        ...current.responses,
        [questionId]: { ...current.responses[questionId], [field]: value },
      },
    }));
  }

  function resetAssessment() {
    if (!window.confirm("Reset the TPRM assessment saved in this browser?")) return;
    clearTprmAssessment();
    setAssessment(EMPTY_ASSESSMENT);
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Third-party assurance</p>
          <h1>TPRM Assessment</h1>
          <p className="muted-text">Assess governance, due diligence, contracting, security, resilience, monitoring and exit controls.</p>
        </div>
        <div className="button-group">
          <button type="button" onClick={() => exportTprmAssessment(vendor, tprmQuestions, responses, score)}>Export assessment</button>
          <button className="danger-button" type="button" onClick={resetAssessment}>Reset assessment</button>
        </div>
      </div>

      <div className="warning-box">Use synthetic demonstration data only. Do not enter confidential vendor or company information in the public version.</div>

      <section className="workspace-card" style={{ marginTop: "20px" }}>
        <h2>Assessment profile</h2>
        <div className="form-grid">
          <label>Third-party name<input value={vendor.name} onChange={(event) => updateVendor("name", event.target.value)} /></label>
          <label>Service provided<input value={vendor.service} onChange={(event) => updateVendor("service", event.target.value)} /></label>
          <label>Business owner<input value={vendor.owner} onChange={(event) => updateVendor("owner", event.target.value)} /></label>
          <label>Risk tier<select value={vendor.tier} onChange={(event) => updateVendor("tier", event.target.value)}><option>Not Classified</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label>
        </div>
      </section>

      <div className="metric-grid">
        <div className="metric-card"><span>Questions</span><strong>{tprmQuestions.length}</strong></div>
        <div className="metric-card"><span>Score</span><strong>{score.percentage}%</strong></div>
        <div className="metric-card"><span>Residual rating</span><strong>{score.rating}</strong></div>
        <div className="metric-card"><span>Assessed</span><strong>{Object.values(responses).filter((item) => item.response && item.response !== "Not Assessed").length}</strong></div>
      </div>

      {tprmQuestions.map((question) => {
        const answer = responses[question.id] || {};
        return (
          <article className="workspace-card" key={question.id}>
            <div className="workspace-card-header">
              <div><span className="record-id">{question.id}</span><h3>{question.question}</h3><p className="muted-text">{question.domain} | Weight: {question.weight}</p></div>
            </div>
            <div className="form-grid">
              <label>Assessment response<select value={answer.response || "Not Assessed"} onChange={(event) => updateResponse(question.id, "response", event.target.value)}><option>Not Assessed</option><option>Compliant</option><option>Partial</option><option>Not Compliant</option><option>Not Applicable</option></select></label>
              <label>Evidence reference<input value={answer.evidenceReference || ""} onChange={(event) => updateResponse(question.id, "evidenceReference", event.target.value)} placeholder="Document name or workpaper reference" /></label>
            </div>
            <details><summary>Expected evidence</summary><ul>{question.evidence.map((item) => <li key={item}>{item}</li>)}</ul></details>
            <label>Assessor notes<textarea rows="4" value={answer.notes || ""} onChange={(event) => updateResponse(question.id, "notes", event.target.value)} placeholder="Document testing, exceptions and conclusion." /></label>
          </article>
        );
      })}
    </main>
  );
}
