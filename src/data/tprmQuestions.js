const tprmQuestions = [
  {
    id: "TPRM-GOV-001",
    domain: "Governance",
    question: "Has the third party been assigned a documented risk tier based on service criticality, data access and operational dependency?",
    evidence: ["Vendor risk classification", "Criticality assessment", "Data-flow summary"],
    weight: 5,
  },
  {
    id: "TPRM-DD-001",
    domain: "Due Diligence",
    question: "Was security, privacy, resilience and compliance due diligence completed before onboarding or renewal?",
    evidence: ["Completed due-diligence questionnaire", "Assessment report", "Approval record"],
    weight: 5,
  },
  {
    id: "TPRM-CON-001",
    domain: "Contracting",
    question: "Does the contract include security, privacy, incident notification, audit-right and data-return requirements?",
    evidence: ["Executed contract", "Security schedule", "Data-processing terms"],
    weight: 5,
  },
  {
    id: "TPRM-IAM-001",
    domain: "Access Management",
    question: "Is third-party access approved, least-privileged, time-bound and periodically reviewed?",
    evidence: ["Third-party account listing", "Access approvals", "Access review evidence"],
    weight: 4,
  },
  {
    id: "TPRM-DAT-001",
    domain: "Data Protection",
    question: "Are data classification, encryption, retention, deletion and location requirements defined and operating?",
    evidence: ["Data inventory", "Encryption configuration", "Retention and deletion evidence"],
    weight: 5,
  },
  {
    id: "TPRM-INC-001",
    domain: "Incident Management",
    question: "Can the third party identify, contain and notify relevant incidents within agreed timeframes?",
    evidence: ["Incident-response plan", "Notification procedure", "Exercise or incident records"],
    weight: 5,
  },
  {
    id: "TPRM-BCM-001",
    domain: "Resilience",
    question: "Are continuity, disaster-recovery and restoration capabilities tested against agreed service requirements?",
    evidence: ["Business-continuity plan", "Disaster-recovery test", "Restoration results"],
    weight: 5,
  },
  {
    id: "TPRM-SUB-001",
    domain: "Fourth-Party Risk",
    question: "Are material subcontractors identified, approved and subject to equivalent security and resilience obligations?",
    evidence: ["Subprocessor register", "Approval records", "Flow-down contract clauses"],
    weight: 4,
  },
  {
    id: "TPRM-MON-001",
    domain: "Ongoing Monitoring",
    question: "Is the third party monitored through reassessments, performance reviews, issue tracking and external assurance?",
    evidence: ["Monitoring plan", "Performance reports", "SOC or certification reports", "Issue register"],
    weight: 4,
  },
  {
    id: "TPRM-EXIT-001",
    domain: "Exit Management",
    question: "Is there a tested exit plan covering service transition, access removal, data return and secure deletion?",
    evidence: ["Exit plan", "Offboarding checklist", "Deletion confirmation"],
    weight: 5,
  },
];

export default tprmQuestions;
