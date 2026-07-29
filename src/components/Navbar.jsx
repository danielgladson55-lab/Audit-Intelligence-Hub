import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4">

      <div className="
        max-w-7xl
        mx-auto
        flex
        gap-6
      ">

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/frameworks">
          Frameworks
        </Link>

        <Link to="/controls">
          Controls
        </Link>

        <Link to="/crosswalk">
          Crosswalk
        </Link>

      </div>

    </nav>
  );
}
