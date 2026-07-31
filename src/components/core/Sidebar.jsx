import { NavLink } from "react-router";
import navigation from "../../app/navigation";

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`core-sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand-block">
        <div className="brand-mark">AIH</div>
        <div><strong>Audit Intelligence Hub</strong><span>Technology Risk Workbench</span></div>
      </div>
      <nav>
        {navigation.map((section) => (
          <div className="nav-section" key={section.group}>
            <p>{section.group}</p>
            {section.items.map((item) => (
              <NavLink key={item.path} to={item.path} onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <span aria-hidden="true">{item.icon}</span>{item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
