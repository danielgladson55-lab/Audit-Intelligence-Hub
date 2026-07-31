import { Routes, Route } from "react-router-dom";
import AppShell from "../components/core/AppShell";
import CoreDashboard from "../pages/CoreDashboard";
import Frameworks from "../pages/Frameworks";
import Controls from "../pages/Controls";
import Risks from "../pages/Risks";
import Crosswalk from "../pages/Crosswalk";
// import AuditBuilder from "../pages/AuditBuilder";
import DynamicChecklistGenerator from "../pages/DynamicChecklistGenerator";
import AuditWorkspace from "../pages/AuditWorkspace";
//import Policies from "../pages/Policies";
//import ComplianceHub from "../pages/ComplianceHub";
import ComplianceMapper  from "../pages/ComplianceMapper";
//import TechnologyAudits from "../pages/TechnologyAudits";
import TPRMAssessment from "../pages/TPRMAssessment";
import EvidenceTracker from "../pages/EvidenceTracker";
import KnowledgeGraphExplorer from "../pages/KnowledgeGraphExplorer";
import MaturityAssessment  from "../pages/MaturityAssessment";
import PolicyWorkpaperEngine  from "../pages/PolicyWorkpaperEngine";
import CloudDeveloperAuditPacks  from "../pages/CloudDeveloperAuditPacks";
import EnterpriseApplicationAuditPacks  from "../pages/EnterpriseApplicationAuditPacks";
import AIGovernanceHub from "../pages/AIGovernanceHub";
import CertificationKnowledgeCenter  from "../pages/CertificationKnowledgeCenter";
import ExecutiveIntelligenceDashboard  from "../pages/ExecutiveIntelligenceDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<CoreDashboard />} />
        <Route path="/frameworks" element={<Frameworks />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/crosswalk" element={<Crosswalk />} />
        <Route path="/audit-builder" element={<DynamicChecklistGenerator />} />
        <Route path="/audit-workspace" element={<AuditWorkspace />} />
       <Route
  path="/policies"
  element={<PolicyWorkpaperEngine />}
/>
       <Route
  path="/compliance-hub"
  element={<ComplianceMapper />}
/>

     <Route
  path="/technology-audits"
  element={<CloudDeveloperAuditPacks />}
/>
<Route
  path="/enterprise-audits"
  element={<EnterpriseApplicationAuditPacks />}
/>
<Route
  path="/ai-governance"
  element={<AIGovernanceHub />}
/>
<Route
  path="/knowledge-centers"
  element={<CertificationKnowledgeCenter />}
/>

<Route
  path="/executive-intelligence"
  element={<ExecutiveIntelligenceDashboard />}
/>
        <Route path="/tprm-assessment" element={<TPRMAssessment />} />
        <Route path="/evidence-tracker" element={<EvidenceTracker />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraphExplorer />} />
        <Route element={<AppShell />}>
  {/* Child routes */}
   <Route path="/maturity-assessment" element={<MaturityAssessment />} />
</Route>
       
      </Route>
    </Routes>
  );
}
