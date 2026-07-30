import { useMemo, useState } from "react";
import {
  getKnowledgeGraphMetrics,
  getKnowledgeGraphOptions,
  searchKnowledgeGraph,
} from "../services/knowledgeGraphService";
import { exportKnowledgeGraph } from "../services/knowledgeGraphExportService";

const EMPTY_FILTERS = {
  frameworkId: "",
  domain: "",
  auditProgram: "",
  technology: "",
};

export default function KnowledgeGraphExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [expandedControlId, setExpandedControlId] = useState("");
  const options = useMemo(() => getKnowledgeGraphOptions(), []);
  const metrics = useMemo(() => getKnowledgeGraphMetrics(), []);
  const results = useMemo(
    () => searchKnowledgeGraph(searchTerm, filters),
    [searchTerm, filters]
  );

  function updateFilter(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  function resetFilters() {
    setSearchTerm("");
    setFilters(EMPTY_FILTERS);
    setExpandedControlId("");
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Connected control intelligence</p>
          <h1>Knowledge Graph Explorer</h1>
          <p className="muted-text">
            Trace every control to its risks, framework mappings, testing procedures,
            evidence, policies, audit programmes and technologies.
          </p>
        </div>
        <div className="button-group">
          <button type="button" onClick={() => exportKnowledgeGraph(results)}>
            Export current view
          </button>
          <button type="button" onClick={resetFilters}>Reset filters</button>
        </div>
      </div>

      <div className="warning-box">
        Cross-framework mappings are working-paper guidance and may be direct,
        supporting or partial. Validate mappings against licensed or official source
        material before relying on them for a formal assessment.
      </div>

      <div className="metric-grid" style={{ marginTop: "20px" }}>
        <div className="metric-card"><span>Frameworks</span><strong>{metrics.frameworks}</strong></div>
        <div className="metric-card"><span>Controls</span><strong>{metrics.controls}</strong></div>
        <div className="metric-card"><span>Risks</span><strong>{metrics.risks}</strong></div>
        <div className="metric-card"><span>Procedures</span><strong>{metrics.procedures}</strong></div>
        <div className="metric-card"><span>Evidence records</span><strong>{metrics.evidence}</strong></div>
        <div className="metric-card"><span>Mappings</span><strong>{metrics.mappings}</strong></div>
      </div>

      <section className="workspace-card">
        <div className="form-grid knowledge-filter-grid">
          <label>
            Search
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Example: privileged, backup, PCI, Azure or SOX"
            />
          </label>
          <label>
            Framework
            <select value={filters.frameworkId} onChange={(event) => updateFilter("frameworkId", event.target.value)}>
              <option value="">All frameworks</option>
              {options.frameworks.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label>
            Domain
            <select value={filters.domain} onChange={(event) => updateFilter("domain", event.target.value)}>
              <option value="">All domains</option>
              {options.domains.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Audit programme
            <select value={filters.auditProgram} onChange={(event) => updateFilter("auditProgram", event.target.value)}>
              <option value="">All audit programmes</option>
              {options.auditPrograms.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Technology
            <select value={filters.technology} onChange={(event) => updateFilter("technology", event.target.value)}>
              <option value="">All technologies</option>
              {options.technologies.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      <p className="muted-text">{results.length} connected control record{results.length === 1 ? "" : "s"} found.</p>

      {results.length === 0 ? (
        <div className="empty-state">No connected records match the current search and filters.</div>
      ) : (
        results.map((graph) => {
          const open = expandedControlId === graph.control.id;
          return (
            <article className="workspace-card knowledge-card" key={graph.control.id}>
              <div className="workspace-card-header">
                <div>
                  <span className="record-id">{graph.control.id}</span>
                  <h2>{graph.control.title}</h2>
                  <p className="muted-text">{graph.control.domain} / {graph.control.subdomain}</p>
                </div>
                <button type="button" onClick={() => setExpandedControlId(open ? "" : graph.control.id)}>
                  {open ? "Hide details" : "Explore links"}
                </button>
              </div>

              <p><strong>Objective:</strong> {graph.control.objective}</p>
              <div className="knowledge-tags">
                {graph.control.auditPrograms.map((item) => <span key={item}>{item}</span>)}
              </div>

              {open && (
                <div className="knowledge-sections">
                  <section><h3>Risks</h3>{graph.risks.map((item) => <div className="linked-record" key={item.id}><strong>{item.id}</strong><span>{item.title}</span><small>{item.statement}</small></div>)}</section>
                  <section><h3>Framework mappings</h3>{graph.mappings.map((item) => <div className="linked-record" key={`${item.frameworkId}-${item.reference}`}><strong>{item.framework?.name || item.frameworkId}</strong><span>{item.reference}</span><small>Mapping strength: {item.strength}</small></div>)}</section>
                  <section><h3>Testing procedures</h3>{graph.procedures.map((item) => <div className="linked-record" key={item.id}><strong>{item.id}</strong><span>{item.title}</span><small>{item.testType}</small></div>)}</section>
                  <section><h3>Evidence</h3>{graph.evidence.map((item) => <div className="linked-record" key={item.id}><strong>{item.id}</strong><span>{item.title}</span><small>{item.format} | {item.freshness}</small></div>)}</section>
                  <section><h3>Policies</h3>{graph.policies.map((item) => <div className="linked-record" key={item.id}><strong>{item.id}</strong><span>{item.title}</span><small>{item.owner} | Review: {item.reviewFrequency}</small></div>)}</section>
                  <section><h3>Technologies</h3><div className="knowledge-tags">{graph.control.technologies.map((item) => <span key={item}>{item}</span>)}</div></section>
                </div>
              )}
            </article>
          );
        })
      )}
    </main>
  );
}
