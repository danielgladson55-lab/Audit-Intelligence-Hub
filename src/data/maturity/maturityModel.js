const maturityLevels = [
  {
    score: 0,
    name: "Not Implemented",
    description: "No recognized process, control or accountable ownership exists.",
  },
  {
    score: 1,
    name: "Initial",
    description: "Activities are ad hoc, reactive and dependent on individuals.",
  },
  {
    score: 2,
    name: "Repeatable",
    description: "Similar activities are repeated, but consistency and documentation remain limited.",
  },
  {
    score: 3,
    name: "Defined",
    description: "Documented processes, roles and controls are established and communicated.",
  },
  {
    score: 4,
    name: "Managed",
    description: "Performance is measured, exceptions are governed and management oversight is effective.",
  },
  {
    score: 5,
    name: "Optimized",
    description: "Controls are continuously improved using automation, intelligence and measurable outcomes.",
  },
];

const maturityDomains = [
  {
    id: "MAT-GOV",
    name: "Technology Governance",
    objective: "Direct, oversee and measure technology risk and control performance.",
    suggestedActions: [
      "Define accountable governance roles and committees.",
      "Establish technology-risk appetite and performance indicators.",
      "Link audit, risk, compliance and remediation reporting.",
    ],
  },
  {
    id: "MAT-IAM",
    name: "Identity and Access Management",
    objective: "Ensure access is authorized, appropriate, reviewed and strongly authenticated.",
    suggestedActions: [
      "Centralize identity lifecycle governance.",
      "Strengthen privileged-access management and recertification.",
      "Expand risk-based authentication and access analytics.",
    ],
  },
  {
    id: "MAT-CHG",
    name: "Change Management",
    objective: "Ensure technology changes are authorized, tested, segregated and traceable.",
    suggestedActions: [
      "Integrate development and service-management workflows.",
      "Automate testing, approvals and deployment evidence.",
      "Monitor emergency changes and control bypasses.",
    ],
  },
  {
    id: "MAT-RES",
    name: "Technology Resilience",
    objective: "Maintain recoverability and continuity for critical technology services.",
    suggestedActions: [
      "Align recovery objectives to business-impact analysis.",
      "Test restoration, failover and crisis coordination.",
      "Track resilience gaps and dependency concentration.",
    ],
  },
  {
    id: "MAT-LOG",
    name: "Logging and Monitoring",
    objective: "Detect, investigate and respond to security and operational events.",
    suggestedActions: [
      "Define minimum logging and retention standards.",
      "Centralize critical log sources and alert ownership.",
      "Measure investigation timeliness and detection coverage.",
    ],
  },
  {
    id: "MAT-TPRM",
    name: "Third-Party Risk Management",
    objective: "Govern third parties through onboarding, monitoring and exit.",
    suggestedActions: [
      "Maintain a complete risk-tiered vendor inventory.",
      "Standardize due diligence and contractual requirements.",
      "Monitor concentration, fourth-party and exit risks.",
    ],
  },
  {
    id: "MAT-CLOUD",
    name: "Cloud Security",
    objective: "Govern cloud identity, configuration, data protection, monitoring and resilience.",
    suggestedActions: [
      "Establish cloud guardrails and accountable ownership.",
      "Automate configuration assessment and remediation.",
      "Integrate cloud evidence into assurance reporting.",
    ],
  },
  {
    id: "MAT-AI",
    name: "AI Governance",
    objective: "Govern AI use cases, risks, data, models, human oversight and incidents.",
    suggestedActions: [
      "Create an AI inventory and use-case classification process.",
      "Define risk assessment, approval and monitoring requirements.",
      "Establish responsible AI, security and incident governance.",
    ],
  },
];

export { maturityLevels, maturityDomains };
