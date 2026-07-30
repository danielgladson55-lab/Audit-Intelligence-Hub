const crosswalks = [
  {
    id: "CW-001",
    keyword: "Multi Factor Authentication",

    mappings: {
      iso27001: "5.17",
      nist80053: "IA-2",
      cobit: "DSS05",
      cis: "6",
      pciDss: "8",
      soc2: "CC6"
    }
  },

  {
    id: "CW-002",
    keyword: "Privileged Access Management",

    mappings: {
      iso27001: "5.15",
      nist80053: "AC-2",
      cobit: "DSS05",
      cis: "5",
      pciDss: "7",
      soc2: "CC6"
    }
  },

  {
    id: "CW-003",
    keyword: "Change Management",

    mappings: {
      iso27001: "8.32",
      nist80053: "CM-3",
      cobit: "BAI06",
      cis: "4",
      pciDss: "6",
      soc2: "CC8"
    }
  }
];

export default crosswalks;