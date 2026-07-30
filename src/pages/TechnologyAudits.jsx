const technologies = [
  "Microsoft Azure",
  "Microsoft 365",
  "GitHub",
  "AWS",
  "ServiceNow",
  "SAP",
  "Oracle",
  "Salesforce",
  "AI Governance",
];

export default function TechnologyAudits() {
  return (
    <div>
      <h1>Technology Audit Hub</h1>

      {technologies.map((tech) => (
        <div
          key={tech}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          {tech}
        </div>
      ))}
    </div>
  );
}