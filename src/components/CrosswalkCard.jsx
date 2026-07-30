export default function CrosswalkCard({ item }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
      }}
    >
      <h3>{item.keyword}</h3>

      <ul>
        <li>ISO 27001: {item.mappings.iso27001}</li>
        <li>NIST 800-53: {item.mappings.nist80053}</li>
        <li>COBIT: {item.mappings.cobit}</li>
        <li>CIS: {item.mappings.cis}</li>
        <li>PCI DSS: {item.mappings.pciDss}</li>
        <li>SOC 2: {item.mappings.soc2}</li>
      </ul>
    </div>
  );
}