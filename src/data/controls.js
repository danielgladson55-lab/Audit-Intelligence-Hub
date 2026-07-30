const controls = [{
  id: "IAM-001",

  title: "Privileged Access Management",

  domain: "Identity & Access Management",

  risk: "Unauthorized privileged access",

  frameworks: {
    iso27001: ["5.15"],
    nist80053: ["AC-2"],
    cobit: ["DSS05"],
    cis: ["5"],
    soc2: ["CC6"],
    pci: ["7"]
  },

  auditProcedures: [
    "Review privileged access list",
    "Verify approvals",
    "Review periodic recertification"
  ],

  evidence: [
    "User access report",
    "Approval records",
    "Role matrix"
  ]
}, 

  {
    id: "IAM-002",
    title: "Multi Factor Authentication",
    frameworks: [
      "ISO27001",
      "PCI DSS",
      "SOC2"
    ],
    risk: "Account compromise"
  },

  {
    id: "CHG-001",
    title: "Change Management",
    frameworks: [
      "COBIT",
      "SOX",
      "ITGC"
    ],
    risk: "Unauthorized system changes"
  },

  {
    id: "BKP-001",
    title: "Backup and Recovery",
    frameworks: [
      "ISO27001",
      "NIST"
    ],
    risk: "Data loss"
  }
];

export default controls;
