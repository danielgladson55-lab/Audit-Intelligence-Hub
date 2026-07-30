const auditPrograms = [
  {
    id: "ITGC",

    title: "IT General Controls Audit",

    objectives: [
      "Assess logical access controls",
      "Assess change management controls",
      "Assess backup and recovery controls"
    ],

    domains: [
      "Logical Access",
      "Change Management",
      "Backup & Recovery",
      "Incident Management"
    ]
  },

  {
    id: "SOX",

    title: "SOX IT Controls Review",

    objectives: [
      "Assess financial reporting controls",
      "Validate key IT-dependent controls"
    ],

    domains: [
      "Access",
      "Changes",
      "Interfaces",
      "ITGC"
    ]
  },

  {
    id: "TPRM",

    title: "Third Party Risk Audit",

    objectives: [
      "Review vendor governance",
      "Assess vendor risk process",
      "Review security due diligence"
    ],

    domains: [
      "Vendor Management",
      "Due Diligence",
      "Compliance"
    ]
  },

  {
    id: "PCI",

    title: "PCI DSS Assessment",

    objectives: [
      "Protect cardholder data",
      "Assess PCI compliance"
    ],

    domains: [
      "Access Control",
      "Encryption",
      "Monitoring"
    ]
  },

  {
    id: "AZURE",

    title: "Azure Security Audit",

    objectives: [
      "Assess Azure security controls",
      "Validate cloud governance"
    ],

    domains: [
      "Entra ID",
      "Defender",
      "Key Vault",
      "Logging"
    ]
  }
];

export default auditPrograms;