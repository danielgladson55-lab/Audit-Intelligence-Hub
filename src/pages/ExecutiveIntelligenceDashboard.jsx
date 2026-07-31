import { useMemo } from "react";
import { Link } from "react-router";
import { getExecutiveIntelligence } from "../services/executiveIntelligenceService";

export default function ExecutiveIntelligenceDashboard() {
  const intelligence = useMemo(() => getExecutiveIntelligence(), []);
  const { metrics, findings, maturityRecords, complianceRecords } = intelligence;
  const severity = ["Critical", "High", "Medium", "Low"].map((rating) => ({ rating, count: findings.filter((item) => item.rating === rating && item.status !== "Closed").length }));
  const maxSeverity = Math.max(1, ...severity.map((item) => item.count));
  const maturityGaps = maturityRecords.map((item) => ({ name: item.name, gap: Math.max(0, Number(item.targetScore) - Number(item.currentScore)) })).sort((a, b) => b.gap - a.gap).slice(0, 6);
  const complianceGaps = complianceRecords.filter((item) => item.applicability === "Applicable" && item.implementationStatus === "Not Implemented").slice(0, 6);

  return (
    <main className="page-container">
      <div className="dashboard-hero executive-hero">
        <div><p className="eyebrow">Management assurance view</p><h1>Executive Intelligence</h1><p>Consolidated audit, findings, compliance, maturity, evidence and AI readiness indicators.</p></div>
        <Link className="primary-link" to="/audit-workspace">Open Audit Workspace</Link>
      </div>

      <div className="metric-grid executive-metrics">
        <div className="metric-card"><span>Audit progress</span><strong>{metrics.auditProgress}%</strong></div>
        <div className="metric-card"><span>Open findings</span><strong>{metrics.openFindings}</strong></div>
        <div className="metric-card"><span>High findings</span><strong>{metrics.highFindings}</strong></div>
        <div className="metric-card"><span>Compliance score</span><strong>{metrics.complianceScore}%</strong></div>
        <div className="metric-card"><span>Current maturity</span><strong>{metrics.maturityCurrent}</strong></div>
        <div className="metric-card"><span>Target maturity</span><strong>{metrics.maturityTarget}</strong></div>
        <div className="metric-card"><span>Evidence accepted</span><strong>{metrics.evidenceAccepted}/{metrics.evidenceTotal}</strong></div>
        <div className="metric-card"><span>AI readiness</span><strong>{metrics.aiScore}%</strong></div>
      </div>

      <div className="dashboard-grid-two">
        <section className="workspace-card"><h2>Open findings by severity</h2><div className="bar-list">{severity.map((item) => <div key={item.rating}><span>{item.rating}</span><div><i style={{ width: `${(item.count / maxSeverity) * 100}%` }} /></div><strong>{item.count}</strong></div>)}</div></section>
        <section className="workspace-card"><h2>Largest maturity gaps</h2>{maturityGaps.length ? <div className="insight-list">{maturityGaps.map((item) => <div key={item.name}><span>{item.name}</span><strong>Gap {item.gap}</strong></div>)}</div> : <div className="empty-state">Complete the Maturity Assessment to populate this view.</div>}</section>
      </div>

      <div className="dashboard-grid-two">
        <section className="workspace-card"><h2>Priority compliance gaps</h2>{complianceGaps.length ? <div className="insight-list">{complianceGaps.map((item) => <div key={item.id}><span>{item.reference} - {item.controlTitle}</span><strong>{item.owner || "Owner required"}</strong></div>)}</div> : <div className="empty-state">No not-implemented compliance records are currently available.</div>}</section>
        <section className="workspace-card"><h2>Management actions</h2><div className="dashboard-actions"><Link to="/compliance-hub">Review compliance gaps</Link><Link to="/maturity-assessment">Review maturity gaps</Link><Link to="/evidence-tracker">Review evidence</Link><Link to="/ai-governance">Review AI governance</Link></div></section>
      </div>
    </main>
  );
}
