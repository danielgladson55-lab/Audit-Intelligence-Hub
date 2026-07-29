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

    {
  controlId: "IAM-002",
  controlName: "Multi Factor Authentication",
  domain: "Identity & Access Management",

  mappings: {
    iso27001: ["5.17"],
    nist80053: ["IA-2"],
    cobit: ["DSS05"],
    cis: ["6"]
  },

  risk: "User account compromise"
},

{
  controlId: "CHG-001",
  controlName: "Formal Change Management",

  domain: "Change Management",

  mappings: {
    iso27001: ["8.32"],
    nist80053: ["CM-3"],
    cobit: ["BAI06"],
    cis: ["4"]
  },

  risk: "Unauthorized system changes"
},

{
  controlId: "BKP-001",

  controlName: "Backup and Restoration",

  domain: "Backup & Recovery",

  mappings: {
    iso27001: ["8.13"],
    nist80053: ["CP-9"],
    cobit: ["DSS04"],
    cis: ["11"]
  },

  risk: "Data loss"
}

    risk:
      "Unauthorized privileged access may lead to data breach or fraud"
  }
];

export default controls;

