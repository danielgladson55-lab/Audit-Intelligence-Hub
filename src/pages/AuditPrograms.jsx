import auditPrograms
from "../data/auditPrograms";

import AuditProgramCard
from "../components/AuditProgramCard";

export default function AuditPrograms() {

  return (
    <div>

      <h1>
        Audit Program Library
      </h1>

      {auditPrograms.map(audit => (

        <AuditProgramCard
          key={audit.id}
          audit={audit}
        />

      ))}

    </div>
  );
}