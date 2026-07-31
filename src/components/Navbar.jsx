import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "15px",
        display: "flex",
        gap: "20px"
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Dashboard
      </Link>

      <Link to="/frameworks" style={{ color: "white" }}>
        Frameworks
      </Link>

      <Link to="/controls" style={{ color: "white" }}>
        Controls
      </Link>

      <Link to="/risks" style={{ color: "white" }}>
        Risks
      </Link>
      <Link   to="/risk-explorer"   style={{ color: "white" }} >
       Risk Explorer
      </Link>
      <Link   to="/audit-workspace"   style={{ color: "white" }} >
  Audit Workspace
</Link>
      <Link   to="/policies"   style={{ color: "white" }} >
  Policies
</Link>
      <Link to="/crosswalk" style={{ color: "white" }}>
        Crosswalk
      </Link>

      <Link to="/audit-builder" style={{ color: "white" }}>
        Audit Builder
</Link>
<Link
  to="/tprm-assessment"
  style={{ color: "white" }}
>
  TPRM Assessment
</Link>
<Link
  to="/evidence-tracker"
  style={{ color: "white" }}
>
  Evidence Tracker
</Link>
    </nav>
  );
}