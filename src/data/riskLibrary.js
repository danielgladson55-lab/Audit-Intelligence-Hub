const riskLibrary = [
  {
    riskId: "RISK-001",

    title:
      "Unauthorized Privileged Access",

    domain:
      "Identity & Access Management",

    controls: [
      "IAM-001",
      "IAM-002",
    ],

    impact: "High",

    likelihood: "High",
  },

  {
    riskId: "RISK-002",

    title:
      "Unauthorized System Changes",

    domain:
      "Change Management",

    controls: [
      "CHG-001",
    ],

    impact: "High",

    likelihood: "Medium",
  },
];

export default riskLibrary;