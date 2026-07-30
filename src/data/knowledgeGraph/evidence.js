const evidence = [
  { id: "EV-IAM-001", title: "Privileged account listing", format: "CSV or XLSX", source: "Authoritative system", freshness: "Audit period end" },
  { id: "EV-IAM-002", title: "Access approvals and recertification", format: "Ticket export or PDF", source: "Access governance workflow", freshness: "Current review cycle" },
  { id: "EV-IAM-003", title: "Authentication and conditional-access configuration", format: "Export or screenshots", source: "Identity platform", freshness: "Current configuration" },
  { id: "EV-CHG-001", title: "Production change population", format: "CSV or XLSX", source: "IT service-management platform", freshness: "Full audit period" },
  { id: "EV-CHG-002", title: "Change approval, testing and deployment support", format: "Ticket export", source: "Change records", freshness: "Selected samples" },
  { id: "EV-RES-001", title: "Backup success and failure reports", format: "Export or PDF", source: "Backup platform", freshness: "Audit period" },
  { id: "EV-RES-002", title: "Restoration test results", format: "PDF", source: "Resilience team", freshness: "Most recent test" },
  { id: "EV-LOG-001", title: "Log source and retention configuration", format: "Export or screenshots", source: "SIEM or logging platform", freshness: "Current configuration" },
  { id: "EV-LOG-002", title: "Alert investigation records", format: "Ticket export", source: "Security operations workflow", freshness: "Selected audit-period alerts" },
  { id: "EV-TPRM-001", title: "Vendor inventory and risk classification", format: "CSV or XLSX", source: "Vendor-management system", freshness: "Current population" },
  { id: "EV-TPRM-002", title: "Due diligence, contracts and monitoring records", format: "PDF or system export", source: "TPRM repository", freshness: "Selected lifecycle events" },
];

export default evidence;
