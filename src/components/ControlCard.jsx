export default function ControlCard({ control }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "15px",
        background: "#fff",
      }}
    >
      <h3>
        {control.controlId} - {control.controlName}
      </h3>

      <p>
        <strong>Domain:</strong>{" "}
        {control.domain}
      </p>

      <p>
        <strong>Risk:</strong>{" "}
        {control.risk}
      </p>

      <h4>Framework Mapping</h4>

      <ul>
        <li>
          ISO 27001:
          {" "}
          {control.frameworks.iso27001.join(", ")}
        </li>

        <li>
          NIST 800-53:
          {" "}
          {control.frameworks.nist80053.join(", ")}
        </li>

        <li>
          COBIT:
          {" "}
          {control.frameworks.cobit.join(", ")}
        </li>

        <li>
          CIS:
          {" "}
          {control.frameworks.cis.join(", ")}
        </li>

        <li>
          SOC2:
          {" "}
          {control.frameworks.soc2.join(", ")}
        </li>

        <li>
          PCI DSS:
          {" "}
          {control.frameworks.pciDss.join(", ")}
        </li>
      </ul>
    </div>
  );
}