const knowledgeGraph = [
  {
    riskId: "RISK-001",
    risk: "Unauthorized Privileged Access",

    controls: [
      "IAM-001",
      "IAM-002"
    ],

    frameworks: [
      "ISO27001",
      "NIST80053",
      "COBIT",
      "SOC2",
      "PCI DSS"
    ],

    policies: [
      "Access Management Policy"
    ],

    evidence: [
      "User Listing",
      "Role Matrix",
      "Approval Records"
    ]
  },

  {
    riskId: "RISK-002",
    risk: "Unauthorized Change",

    controls: [
      "CHG-001"
    ],

    frameworks: [
      "ISO27001",
      "COBIT",
      "SOX"
    ],

    policies: [
      "Change Management Policy"
    ],

    evidence: [
      "Change Tickets",
      "CAB Approvals",
      "Test Evidence"
    ]
  }
];

export default knowledgeGraph;