import { Link } from "react-router-dom";
import { getCoreMetrics } from "../services/coreMetricsService";

export default function CoreDashboard() {
  const metrics = getCoreMetrics();
  const completion = metrics.testsTotal === 0 ? 0 : Math.round((metrics.testsCompleted / metrics.testsTotal) * 100);

  return (
    <main className="page-container">
      <div className="dashboard-hero">
        <div><p className="eyebrow">Unified assurance platform</p><h1>Executive Dashboard</h1><p>One connected view of frameworks, risks, controls, audits, evidence and findings.</p></div>
        <Link className="primary-link" to="/audit-builder">Create audit checklist</Link>
      </div>

      <div className="metric-grid">
        <div className="metric-card"><span>Frameworks</span><strong>{metrics.frameworks}</strong></div>
        <div className="metric-card"><span>Controls</span><strong>{metrics.controls}</strong></div>
        <div className="metric-card"><span>Risks</span><strong>{metrics.risks}</strong></div>
        <div className="metric-card"><span>Audit progress</span><strong>{completion}%</strong></div>
        <div className="metric-card"><span>Open findings</span><strong>{metrics.openFindings}</strong></div>
        <div className="metric-card"><span>High findings</span><strong>{metrics.highFindings}</strong></div>
        <div className="metric-card"><span>Evidence accepted</span><strong>{metrics.evidenceAccepted}/{metrics.evidenceTotal}</strong></div>
        <div className="metric-card"><span>TPRM responses</span><strong>{metrics.tprmAssessed}</strong></div>
      </div>

      <div className="dashboard-grid-two">
        <section className="workspace-card">
          <h2>Audit delivery</h2>
          <div className="dashboard-actions">
            <Link to="/audit-builder">Generate checklist</Link>
            <Link to="/audit-workspace">Execute audit</Link>
            <Link to="/evidence-tracker">Track evidence</Link>
            <Link to="/tprm-assessment">Assess vendor risk</Link>
          </div>
        </section>
        <section className="workspace-card">
          <h2>Control intelligence</h2>
          <div className="dashboard-actions">
            <Link to="/frameworks">Browse frameworks</Link>
            <Link to="/controls">Review controls</Link>
            <Link to="/risks">Explore risks</Link>
            <Link to="/crosswalk">Compare mappings</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
