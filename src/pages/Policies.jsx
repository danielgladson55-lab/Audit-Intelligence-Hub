import policies from "../data/policies";

export default function Policies() {
  return (
    <div>
      <h1>Policy Repository</h1>

      {policies.map((policy) => (
        <div
          key={policy.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{policy.title}</h3>

          <p>
            Domain: {policy.domain}
          </p>
        </div>
      ))}
    </div>
  );
}