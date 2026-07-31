const certificationKnowledge = {
  CISA: {
    id: "CISA",
    name: "CISA Knowledge Center",
    issuer: "ISACA",
    officialUrl: "https://www.isaca.org/credentialing/cisa/cisa-exam-content-outline",
    domains: [
      { id: "CISA-D1", name: "Information Systems Auditing Process", focus: "Risk-based planning, audit execution, evidence, sampling, analytics, reporting and quality." },
      { id: "CISA-D2", name: "Governance and Management of IT", focus: "Governance, strategy, enterprise risk, policies, architecture, privacy, data and vendor management." },
      { id: "CISA-D3", name: "Information Systems Acquisition, Development and Implementation", focus: "Business cases, project governance, requirements, development, testing, implementation and migration." },
      { id: "CISA-D4", name: "Information Systems Operations and Business Resilience", focus: "Operations, service management, assets, incidents, continuity, disaster recovery and resilience." },
      { id: "CISA-D5", name: "Protection of Information Assets", focus: "Security governance, identity, infrastructure, data protection, monitoring, incidents and emerging technology." },
    ],
  },
  CISSP: {
    id: "CISSP",
    name: "CISSP Knowledge Center",
    issuer: "ISC2",
    officialUrl: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    domains: [
      { id: "CISSP-D1", name: "Security and Risk Management", focus: "Governance, risk, compliance, ethics, policies, continuity and threat modeling." },
      { id: "CISSP-D2", name: "Asset Security", focus: "Data classification, ownership, handling, retention, privacy and lifecycle controls." },
      { id: "CISSP-D3", name: "Security Architecture and Engineering", focus: "Secure design, cryptography, system models, vulnerabilities and physical security." },
      { id: "CISSP-D4", name: "Communication and Network Security", focus: "Network architecture, secure protocols, segmentation, transmission and monitoring." },
      { id: "CISSP-D5", name: "Identity and Access Management", focus: "Identity lifecycle, authentication, authorization, federation and access review." },
      { id: "CISSP-D6", name: "Security Assessment and Testing", focus: "Assessment strategy, testing, audits, metrics, vulnerability assessment and reporting." },
      { id: "CISSP-D7", name: "Security Operations", focus: "Investigations, logging, incidents, recovery, patching, change and operational resilience." },
      { id: "CISSP-D8", name: "Software Development Security", focus: "Secure lifecycle, application controls, testing, supply chain and development environments." },
    ],
  },
};

export default certificationKnowledge;
