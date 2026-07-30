const frameworks = [
  "ISO 27001",
  "NIST CSF",
  "NIST 800-53",
  "COBIT 2019",
  "CIS Controls",
  "SOC 2",
  "PCI DSS",
  "HIPAA",
  "GDPR",
  "UAE PDPL",
  "ISO 42001",
];

export default function ComplianceHub() {
  return (
    <div>
      <h1>Compliance Hub</h1>

      {frameworks.map((item) => (
        <div
          key={item}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}