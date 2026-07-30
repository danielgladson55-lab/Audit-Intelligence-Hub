const frameworks = [
  {
    id: "ISO27001",
    name: "ISO/IEC 27001:2022",
    issuer: "ISO/IEC",
    category: "Information Security Management",
    officialUrl: "https://www.iso.org/standard/27001",
  },
  {
    id: "NISTCSF",
    name: "NIST Cybersecurity Framework 2.0",
    issuer: "NIST",
    category: "Cybersecurity Risk Management",
    officialUrl: "https://www.nist.gov/cyberframework",
  },
  {
    id: "NIST80053",
    name: "NIST SP 800-53 Rev. 5",
    issuer: "NIST",
    category: "Security and Privacy Controls",
    officialUrl: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
  },
  {
    id: "COBIT2019",
    name: "COBIT 2019",
    issuer: "ISACA",
    category: "Governance and Management of Enterprise IT",
    officialUrl: "https://www.isaca.org/resources/cobit",
  },
  {
    id: "CISV8",
    name: "CIS Controls v8",
    issuer: "Center for Internet Security",
    category: "Cybersecurity Safeguards",
    officialUrl: "https://www.cisecurity.org/controls/v8",
  },
  {
    id: "SOC2",
    name: "SOC 2 Trust Services Criteria",
    issuer: "AICPA",
    category: "Service Organization Assurance",
    officialUrl: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
  },
  {
    id: "PCIDSS",
    name: "PCI DSS",
    issuer: "PCI Security Standards Council",
    category: "Payment Account Data Security",
    officialUrl: "https://www.pcisecuritystandards.org/standards/pci-dss/",
  },
  {
    id: "ISO42001",
    name: "ISO/IEC 42001",
    issuer: "ISO/IEC",
    category: "Artificial Intelligence Management",
    officialUrl: "https://www.iso.org/standard/42001",
  },
];

export default frameworks;
