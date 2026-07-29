const crosswalks = [
  {
    keyword: "Multi-Factor Authentication",

    mappings: {
      iso27001: ["5.17"],
      nist80053: ["IA-2"],
      cobit: ["DSS05"],
      cis: ["6"],
      pci: ["8"],
      soc2: ["CC6"]
    }
  },

  {
    keyword: "Privileged Access",

    mappings: {
      iso27001: ["5.15"],
      nist80053: ["AC-2"],
      cobit: ["DSS05"],
      cis: ["5"],
      pci: ["7"],
      soc2: ["CC6"]
    }
  }
];

export default crosswalks;

