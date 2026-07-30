import { Routes, Route } from "react-router-dom";
import AppShell from "../components/core/AppShell";
import CoreDashboard from "../pages/CoreDashboard";
import Frameworks from "../pages/Frameworks";
import Controls from "../pages/Controls";
import Risks from "../pages/Risks";
import Crosswalk from "../pages/Crosswalk";
import AuditBuilder from "../pages/AuditBuilder";
import AuditWorkspace from "../pages/AuditWorkspace";
import Policies from "../pages/Policies";
import ComplianceHub from "../pages/ComplianceHub";
import TechnologyAudits from "../pages/TechnologyAudits";
import TPRMAssessment from "../pages/TPRMAssessment";
import EvidenceTracker from "../pages/EvidenceTracker";
import KnowledgeGraphExplorer from "../pages/KnowledgeGraphExplorer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<CoreDashboard />} />
        <Route path="/frameworks" element={<Frameworks />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/crosswalk" element={<Crosswalk />} />
        <Route path="/audit-builder" element={<AuditBuilder />} />
        <Route path="/audit-workspace" element={<AuditWorkspace />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/compliance-hub" element={<ComplianceHub />} />
        <Route path="/technology-audits" element={<TechnologyAudits />} />
        <Route path="/tprm-assessment" element={<TPRMAssessment />} />
        <Route path="/evidence-tracker" element={<EvidenceTracker />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraphExplorer />} />
      </Route>
    </Routes>
  );
}
