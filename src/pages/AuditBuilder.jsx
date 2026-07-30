import { useState } from "react";
import auditPrograms from "../data/auditPrograms";
import controlLibrary from "../data/controlLibrary";
import {
  generateEvidenceList,
} from "../services/evidenceEngine";
import {
  generateAuditPackage
}
from "../services/auditGenerator";

export default function AuditBuilder() {
  const [selectedAudit, setSelectedAudit] =
    useState("");

  const audit =
    auditPrograms.find(
      (a) => a.id === selectedAudit
    );

    const packageData =
  audit
    ? generateAuditPackage(audit)
    : null;

    const selectedControls =
  controlLibrary.filter(
    (control) =>
      audit?.domains.some(
        (domain) =>
          control.domain.includes(
            domain
          )
      )
  );

const evidenceList =
  generateEvidenceList(
    selectedControls
  );

  return (
    <div>
      <h1>Audit Builder Engine</h1>

      <select
        value={selectedAudit}
        onChange={(e) =>
          setSelectedAudit(e.target.value)
        }
      >
        <option value="">
          Select Audit Type
        </option>

        {auditPrograms.map((audit) => (
          <option
            key={audit.id}
            value={audit.id}
          >
            {audit.title}
          </option>
        ))}
      </select>

     {audit && (
  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px"
    }}
  >
    <h2>{audit.title}</h2>

    <h3>Objectives</h3>

    <ul>
      {audit.objectives.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>

    <h3>Domains</h3>

    <ul>
      {audit.domains.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>

    {packageData && (
      <div>

<h3>Evidence Request List</h3>

<ul>
  {evidenceList.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>

        <h3>Evidence Required</h3>

        <ul>
          {packageData.evidence.map(
            (evidence) => (
              <li key={evidence}>
                {evidence}
              </li>
            )
          )}
        </ul>
      </div>
    )}

  </div>
)}
    </div>
  );
}