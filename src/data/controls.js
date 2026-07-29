const controls = [
  {
    controlId: "IAM-001",
    controlName: "Privileged Access Management",
    domain: "Identity & Access Management",

    mappings: {
      iso27001: ["5.15"],
      nist80053: ["AC-2"],
      cobit: ["DSS05"],
      cis: ["5"]
    },

    risk:
      "Unauthorized privileged access may lead to data breach or fraud"
  }
];

export default controls;
