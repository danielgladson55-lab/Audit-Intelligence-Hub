const capabilities = [
  "Framework and control knowledge graph",
  "Dynamic audit checklist generation",
  "Audit execution and findings management",
  "Evidence request tracking",
  "Compliance gap assessment",
  "Maturity assessment",
  "Policies and workpapers",
  "Cloud, developer and enterprise audit packs",
  "Third-party and AI governance assessments",
  "CISA and CISSP knowledge centers",
  "Executive intelligence dashboards",
];

export default function AboutPlatform() {
  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Version 1.0</p>
          <h1>About Audit Intelligence Hub</h1>
          <p className="muted-text">
            An open-source technology risk, internal audit, cybersecurity governance
            and compliance workbench built as a professional portfolio project.
          </p>
        </div>
      </div>

      <div className="warning-box">
        Public demonstration only. Use synthetic information and validate all formal
        conclusions against current official, licensed and organizational sources.
      </div>

      <section className="workspace-card" style={{ marginTop: "20px" }}>
        <h2>Core capabilities</h2>
        <ul>{capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="workspace-card">
        <h2>Privacy and storage</h2>
        <p>
          Version 1.0 stores demonstration work locally in the current browser using
          localStorage. It does not provide authentication, shared databases or
          enterprise records management.
        </p>
      </section>
    </main>
  );
}
