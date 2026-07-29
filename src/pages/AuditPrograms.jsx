const auditPrograms = [
  {
    id: "AZURE-AUDIT",

    title: "Azure Security Review",

    domains: [
      "IAM",
      "Logging",
      "Backup",
      "Encryption"
    ]
  },

  {
    id: "M365-AUDIT",

    title: "Microsoft 365 Security Audit",

    domains: [
      "Entra ID",
      "Conditional Access",
      "MFA"
    ]
  },

  {
    id: "GITHUB-AUDIT",

    title: "GitHub Security Review",

    domains: [
      "Branch Protection",
      "Secret Scanning",
      "Dependabot"
    ]
  }
];

export default auditPrograms;
