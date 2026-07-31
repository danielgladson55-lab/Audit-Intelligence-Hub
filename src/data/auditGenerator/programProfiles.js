const programProfiles = [
  {
    id: "ITGC",
    name: "IT General Controls Audit",
    description: "Core technology controls supporting reliable and secure business processing.",
    objectives: [
      "Assess design and operating effectiveness of logical access controls.",
      "Assess authorization, testing and segregation of production changes.",
      "Assess backup, restoration, logging and operational resilience.",
    ],
    defaultDomains: [
      "Identity and Access Management",
      "Change Management",
      "Technology Resilience",
      "Logging and Monitoring",
    ],
  },
  {
    id: "SOX",
    name: "SOX IT Controls Review",
    description: "Technology controls relevant to systems supporting financial reporting.",
    objectives: [
      "Assess access to financially relevant applications and infrastructure.",
      "Assess production changes affecting financial processing.",
      "Assess supporting technology operations and evidence reliability.",
    ],
    defaultDomains: ["Identity and Access Management", "Change Management"],
  },
  {
    id: "SOC2",
    name: "SOC 2 Readiness Assessment",
    description: "Readiness review supporting applicable Trust Services Criteria.",
    objectives: [
      "Assess security control coverage and evidence readiness.",
      "Identify control design and implementation gaps.",
      "Prepare a structured remediation and assurance plan.",
    ],
    defaultDomains: [
      "Identity and Access Management",
      "Change Management",
      "Technology Resilience",
      "Logging and Monitoring",
      "Third-Party Risk Management",
    ],
  },
  {
    id: "PCI",
    name: "PCI DSS Readiness Assessment",
    description: "Readiness review for controls protecting payment account data.",
    objectives: [
      "Assess access restriction and authentication controls.",
      "Assess secure change and monitoring controls.",
      "Identify evidence and remediation needed for formal assessment.",
    ],
    defaultDomains: [
      "Identity and Access Management",
      "Change Management",
      "Logging and Monitoring",
    ],
  },
  {
    id: "TPRM",
    name: "Third-Party Risk Management Audit",
    description: "Lifecycle review of vendor governance, security, resilience and exit controls.",
    objectives: [
      "Assess vendor inventory, classification and ownership.",
      "Assess due diligence, contracting and ongoing monitoring.",
      "Assess issue management, resilience and termination controls.",
    ],
    defaultDomains: ["Third-Party Risk Management"],
  },
  {
    id: "AZURE",
    name: "Microsoft Azure Security Audit",
    description: "Risk-based review of Azure identity, change, monitoring and resilience controls.",
    objectives: [
      "Assess privileged cloud access and strong authentication.",
      "Assess changes to cloud resources and configurations.",
      "Assess monitoring, backup and restoration arrangements.",
    ],
    defaultDomains: [
      "Identity and Access Management",
      "Change Management",
      "Technology Resilience",
      "Logging and Monitoring",
    ],
  },
  {
    id: "M365",
    name: "Microsoft 365 Security Audit",
    description: "Review identity, administration, monitoring and resilience across Microsoft 365.",
    objectives: [
      "Assess privileged roles and authentication.",
      "Assess security logging and monitoring.",
      "Assess recoverability and service configuration governance.",
    ],
    defaultDomains: [
      "Identity and Access Management",
      "Technology Resilience",
      "Logging and Monitoring",
    ],
  },
  {
    id: "GITHUB",
    name: "GitHub Security Audit",
    description: "Review organization governance, repository change controls and security monitoring.",
    objectives: [
      "Assess privileged organization and repository access.",
      "Assess protected changes and deployment governance.",
      "Assess audit logging and security monitoring.",
    ],
    defaultDomains: [
      "Identity and Access Management",
      "Change Management",
      "Logging and Monitoring",
    ],
  },
];

export default programProfiles;
