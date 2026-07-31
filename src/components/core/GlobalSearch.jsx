import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import coreCatalog from "../../data/coreCatalog";
import controlLibrary from "../../data/controlLibrary";
import riskLibrary from "../../data/riskLibrary";

export default function GlobalSearch() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const records = useMemo(() => {
    const modules = coreCatalog.modules.map((item) => ({ ...item, type: "Module", title: item.name, description: item.group }));
    const controls = controlLibrary.map((item) => ({ type: "Control", title: `${item.controlId} - ${item.controlName}`, description: `${item.domain} ${item.risk || ""}`, path: "/controls" }));
    const risks = riskLibrary.map((item) => ({ type: "Risk", title: `${item.riskId} - ${item.title}`, description: `${item.domain || ""} ${item.impact || ""}`, path: "/risks" }));
    const frameworks = coreCatalog.frameworks.map((item) => ({ type: "Framework", title: item.name, description: item.category, path: "/frameworks" }));
    return [...modules, ...controls, ...risks, ...frameworks];
  }, []);

  const results = useMemo(() => {
    const query = term.trim().toLowerCase();
    if (query.length < 2) return [];
    return records.filter((item) => `${item.title} ${item.description || ""} ${(item.keywords || []).join(" ")}`.toLowerCase().includes(query)).slice(0, 8);
  }, [records, term]);

  function openResult(path) {
    setTerm("");
    navigate(path);
  }

  return (
    <div className="global-search">
      <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search controls, risks, frameworks and modules..." aria-label="Global search" />
      {results.length > 0 && (
        <div className="global-search-results">
          {results.map((item, index) => (
            <button key={`${item.type}-${item.title}-${index}`} type="button" onClick={() => openResult(item.path)}>
              <span>{item.type}</span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
