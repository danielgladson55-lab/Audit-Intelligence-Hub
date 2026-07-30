import { useEffect, useMemo, useState } from "react";
import evidenceTemplates from "../data/evidenceTemplates";
import {
  clearEvidenceRequests,
  loadEvidenceRequests,
  saveEvidenceRequests,
} from "../services/evidenceRequestStorage";
import { exportEvidenceRequests } from "../services/evidenceRequestExport";

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function createRequest(template) {
  const requested = new Date();
  const due = new Date();
  due.setDate(due.getDate() + template.dueDays);

  return {
    ...template,
    owner: template.defaultOwner,
    requestedDate: isoDate(requested),
    dueDate: isoDate(due),
    status: "Not Requested",
    reviewResult: "Not Reviewed",
    reference: "",
    notes: "",
  };
}

const EMPTY_STATE = {
  requests: evidenceTemplates.map(createRequest),
  filter: "All",
};

export default function EvidenceTracker() {
  const [state, setState] = useState(() => loadEvidenceRequests() || EMPTY_STATE);
  const [search, setSearch] = useState("");

  useEffect(() => {
    saveEvidenceRequests(state);
  }, [state]);

  function updateRequest(id, field, value) {
    setState((current) => ({
      ...current,
      requests: current.requests.map((request) =>
        request.id === id ? { ...request, [field]: value } : request
      ),
    }));
  }

  function resetTracker() {
    if (!window.confirm("Reset all evidence requests saved in this browser?")) return;
    clearEvidenceRequests();
    setState({ ...EMPTY_STATE, requests: evidenceTemplates.map(createRequest) });
    setSearch("");
  }

  const filteredRequests = useMemo(() => {
    const term = search.trim().toLowerCase();
    return state.requests.filter((request) => {
      const matchesFilter = state.filter === "All" || request.status === state.filter;
      const matchesSearch = !term || [request.id, request.domain, request.title, request.owner, request.reference]
        .some((value) => String(value || "").toLowerCase().includes(term));
      return matchesFilter && matchesSearch;
    });
  }, [state.requests, state.filter, search]);

  const received = state.requests.filter((item) => ["Received", "Under Review", "Accepted"].includes(item.status)).length;
  const overdue = state.requests.filter((item) => item.dueDate && item.status !== "Accepted" && new Date(item.dueDate) < new Date()).length;
  const accepted = state.requests.filter((item) => item.status === "Accepted").length;
  const exceptions = state.requests.filter((item) => item.reviewResult === "Exception Identified").length;

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Audit administration</p>
          <h1>Evidence Request Tracker</h1>
          <p className="muted-text">Manage request ownership, due dates, receipt status, review conclusions and workpaper references.</p>
        </div>
        <div className="button-group">
          <button type="button" onClick={() => exportEvidenceRequests(state.requests)}>Export request list</button>
          <button className="danger-button" type="button" onClick={resetTracker}>Reset tracker</button>
        </div>
      </div>

      <div className="warning-box">Use synthetic demonstration data only. Do not upload or enter confidential evidence in the public application.</div>

      <div className="metric-grid" style={{ marginTop: "20px" }}>
        <div className="metric-card"><span>Total requests</span><strong>{state.requests.length}</strong></div>
        <div className="metric-card"><span>Received or later</span><strong>{received}</strong></div>
        <div className="metric-card"><span>Accepted</span><strong>{accepted}</strong></div>
        <div className="metric-card"><span>Overdue</span><strong>{overdue}</strong></div>
        <div className="metric-card"><span>Exceptions</span><strong>{exceptions}</strong></div>
      </div>

      <section className="workspace-card">
        <div className="form-grid">
          <label>Search<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search ID, domain, owner or reference" /></label>
          <label>Status filter<select value={state.filter} onChange={(event) => setState((current) => ({ ...current, filter: event.target.value }))}><option>All</option><option>Not Requested</option><option>Requested</option><option>Partially Received</option><option>Received</option><option>Under Review</option><option>Accepted</option><option>Rejected</option></select></label>
        </div>
      </section>

      {filteredRequests.length === 0 ? (
        <div className="empty-state">No evidence requests match the current search and filter.</div>
      ) : (
        filteredRequests.map((request) => (
          <article className="workspace-card" key={request.id}>
            <div className="workspace-card-header">
              <div><span className="record-id">{request.id}</span><h3>{request.title}</h3><p className="muted-text">{request.domain}</p></div>
              <span className={`status-badge status-${request.status.toLowerCase().replaceAll(" ", "-")}`}>{request.status}</span>
            </div>
            <p>{request.description}</p>
            <p><strong>Requested format:</strong> {request.requestedFormat}</p>
            <div className="form-grid">
              <label>Owner<input value={request.owner} onChange={(event) => updateRequest(request.id, "owner", event.target.value)} /></label>
              <label>Requested date<input type="date" value={request.requestedDate} onChange={(event) => updateRequest(request.id, "requestedDate", event.target.value)} /></label>
              <label>Due date<input type="date" value={request.dueDate} onChange={(event) => updateRequest(request.id, "dueDate", event.target.value)} /></label>
              <label>Status<select value={request.status} onChange={(event) => updateRequest(request.id, "status", event.target.value)}><option>Not Requested</option><option>Requested</option><option>Partially Received</option><option>Received</option><option>Under Review</option><option>Accepted</option><option>Rejected</option></select></label>
              <label>Review result<select value={request.reviewResult} onChange={(event) => updateRequest(request.id, "reviewResult", event.target.value)}><option>Not Reviewed</option><option>Satisfactory</option><option>Follow-up Required</option><option>Exception Identified</option><option>Not Applicable</option></select></label>
              <label>Evidence or workpaper reference<input value={request.reference} onChange={(event) => updateRequest(request.id, "reference", event.target.value)} placeholder="Example: WP-IAM-01" /></label>
            </div>
            <label>Auditor notes<textarea rows="4" value={request.notes} onChange={(event) => updateRequest(request.id, "notes", event.target.value)} placeholder="Document follow-up, validation and conclusion." /></label>
          </article>
        ))
      )}
    </main>
  );
}
