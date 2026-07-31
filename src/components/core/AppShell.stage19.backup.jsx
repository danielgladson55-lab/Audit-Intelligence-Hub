import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import GlobalSearch from "./GlobalSearch";
import DemoResetButton from "./DemoResetButton";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="core-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="core-main">
        <header className="core-header">
          <button
            className="menu-button"
            type="button"
            onClick={() => setSidebarOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <GlobalSearch />
          <div className="environment-badge">Public Demo</div>
          <DemoResetButton />
        </header>

        <div className="core-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
