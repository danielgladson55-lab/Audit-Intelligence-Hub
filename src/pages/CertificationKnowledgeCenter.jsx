import { useEffect, useMemo, useState } from "react";
import certificationKnowledge from "../data/knowledgeCenters/certificationKnowledge";
import {
  calculateLearningProgress,
  loadLearningProgress,
  saveLearningProgress,
} from "../services/knowledgeProgressService";

export default function CertificationKnowledgeCenter() {
  const [selectedCenter, setSelectedCenter] = useState("CISA");
  const [state, setState] = useState(() => loadLearningProgress());
  const [search, setSearch] = useState("");
  const center = certificationKnowledge[selectedCenter];

  useEffect(() => {
    saveLearningProgress(state);
  }, [state]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return center.domains.filter((item) =>
      `${item.name} ${item.focus}`.toLowerCase().includes(query)
    );
  }, [center, search]);

  const progress = calculateLearningProgress(center.domains, state.completed);

  function toggleComplete(id) {
    setState((current) => ({
      ...current,
      completed: { ...current.completed, [id]: !current.completed[id] },
    }));
  }

  function updateNote(id, value) {
    setState((current) => ({
      ...current,
      notes: { ...current.notes, [id]: value },
    }));
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Professional learning</p>
          <h1>Certification Knowledge Centers</h1>
          <p className="muted-text">Original study summaries, workplace connections and personal progress tracking.</p>
        </div>
        <a className="primary-link knowledge-source-link" href={center.officialUrl} target="_blank" rel="noreferrer">Official exam outline</a>
      </div>

      <div className="warning-box">This center contains original summaries and does not reproduce certification books, licensed questions or official exam content.</div>

      <section className="workspace-card" style={{ marginTop: "20px" }}>
        <div className="form-grid">
          <label>Knowledge center<select value={selectedCenter} onChange={(event) => { setSelectedCenter(event.target.value); setSearch(""); }}><option value="CISA">CISA</option><option value="CISSP">CISSP</option></select></label>
          <label>Search domains<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search governance, IAM, operations or testing" /></label>
        </div>
      </section>

      <section className="learning-progress"><div><span>{center.name}</span><strong>{progress}% complete</strong></div><div><div style={{ width: `${progress}%` }} /></div></section>

      {filtered.map((domain) => (
        <article className="workspace-card" key={domain.id}>
          <div className="workspace-card-header">
            <div><span className="record-id">{domain.id}</span><h2>{domain.name}</h2></div>
            <label className="completion-check"><input type="checkbox" checked={Boolean(state.completed[domain.id])} onChange={() => toggleComplete(domain.id)} />Completed</label>
          </div>
          <p>{domain.focus}</p>
          <h3>Workplace application</h3>
          <ul>
            <li>Connect the domain to related controls, risks and audit programmes in the Knowledge Graph.</li>
            <li>Create one original scenario based on an audit or security decision.</li>
            <li>Record practical notes, evidence expectations and management implications.</li>
          </ul>
          <label>Learning notes<textarea rows="5" value={state.notes[domain.id] || ""} onChange={(event) => updateNote(domain.id, event.target.value)} placeholder="Capture original notes and workplace examples." /></label>
        </article>
      ))}
    </main>
  );
}
