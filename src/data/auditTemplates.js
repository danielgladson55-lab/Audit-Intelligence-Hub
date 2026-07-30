const auditTemplates = [
  {
    id: "ITGC",
    title: "IT General Controls Audit",
    description:
      "Assessment of foundational technology controls supporting business systems.",
    objectives: [
      "Evaluate logical access management",
      "Evaluate change management",
      "Evaluate backup and restoration",
      "Evaluate technology operations",
    ],
    controlIds: [
      "IAM-001",
      "IAM-002",
      "CHG-001",
      "BKP-001",
    ],
  },
  {
    id: "SOX",
    title: "SOX IT Controls Review",
    description:
      "Assessment of technology controls supporting financial reporting.",
    objectives: [
      "Assess access to financially relevant systems",
      "Assess program change controls",
      "Assess automated processing dependencies",
      "Evaluate control evidence and review performance",
    ],
    controlIds: [
      "IAM-001",
      "IAM-002",
      "CHG-001",
    ],
  },
  {
    id: "TPRM",
    title: "Third-Party Risk Management Audit",
    description:
      "Assessment of vendor governance, due diligence, monitoring and exit controls.",
    objectives: [
      "Evaluate vendor onboarding and classification",
      "Evaluate security due diligence",
      "Evaluate contractual security requirements",
      "Evaluate ongoing monitoring and termination",
    ],
    controlIds: [],
  },
  {
    id: "PCI",
    title: "PCI DSS Readiness Assessment",
    description:
      "Readiness review of controls protecting payment account data.",
    objectives: [
      "Review access to the cardholder data environment",
      "Review authentication controls",
      "Review secure change management",
      "Review logging, monitoring and evidence",
    ],
    controlIds: [
      "IAM-001",
      "IAM-002",
      "CHG-001",
    ],
  },
  {
    id: "AZURE",
    title: "Microsoft Azure Security Audit",
    description:
      "Assessment of cloud identity, configuration, monitoring and resilience.",
    objectives: [
      "Evaluate privileged cloud access",
      "Evaluate strong authentication",
      "Evaluate configuration change controls",
      "Evaluate backup and restoration arrangements",
    ],
    controlIds: [
      "IAM-001",
      "IAM-002",
      "CHG-001",
      "BKP-001",
    ],
  },
];

export default auditTemplates;