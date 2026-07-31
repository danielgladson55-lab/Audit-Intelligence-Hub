# Audit Intelligence Hub: Master Build, Data Completeness and Prompt Playbook

**Product roadmap: Version 1.1 to Version 2.0**

Prepared for Daniel Gladson Arulraj P

---

## 1. Purpose of this document

This playbook is the single source of direction for continuing development of Audit Intelligence Hub across future Copilot sessions.

It defines the product goal, professional content targets, secure architecture, delivery sequence, acceptance gates, and reusable prompts for each build stage.

Use the prompts exactly as written or adapt only the fields inside square brackets. At the start of every new session, paste the Session Start Prompt and the latest status block.

## 2. Product mission

Build a secure, practical and evidence-driven professional workspace for IT internal audit, cybersecurity, technology risk, compliance, cloud assurance, application audits, third-party risk, business continuity and AI governance.

The platform is intended to become the primary freelance delivery workspace for client engagements and the go-to professional tool for the owner’s IT Internal Audit role.

The platform must support organization-level, client-level, engagement-level, application-level and technology-level assessments.

## 3. Target professional content inventory

| Library | Initial target | Minimum completeness expectation |
| --- | --- | --- |
| Risks | 1,000 | Normalized, sourced, mapped, reviewed and non-duplicative |
| Controls | 1,000 | Reusable across frameworks, audits and technologies |
| Testing procedures | 1,500+ | Executable, evidence-based and linked to controls |
| Evidence specifications | 1,000+ | Source, period, format, fields and reliability defined |
| Sampling and analytics methods | 250+ | Population checks, sample guidance and rationale |
| Policies, standards and procedures | 150+ | Original templates aligned to framework themes |
| Workpaper templates | 150+ | Planning, fieldwork, reporting and follow-up |
| Complete audit programmes | 150 | Ready-to-use end-to-end engagement packs |
| Technology and regulatory packs | 50+ | Platform-specific and compliance-specific modules |

The 1,000-risk and 1,000-control targets are separate. Policies and audit programmes are additional targets, not included within those totals.

## 4. Definition of a complete audit programme

Every audit programme must include planning, risk and control coverage, fieldwork, reporting and follow-up content.

- Background, purpose, objectives, scope options and exclusions
- Applicable criteria and original framework-alignment summaries
- Risk universe and control universe
- Risk and Control Matrix structure
- Detailed design, implementation and operating-effectiveness procedures
- Population definitions and completeness validation steps
- Sampling method and sample-size guidance
- Evidence Request List and evidence-quality checks
- Expected results, exception criteria and conclusion choices
- Finding-development template and risk-rating methodology
- Management Action Plan, report structure and follow-up checklist
- Content owner, sources, version, review date and approval status

A programme is shown as Ready to Use only when its completeness score reaches 100% and its status is Approved.

## 5. Priority audit programme catalogue

- IT General Controls: standard, SOX, SaaS, ERP, cloud-hosted and outsourced variants
- IT Application Controls: input, processing, output, interfaces, workflows, reports and automated controls
- Cybersecurity programme and compliance audits at organization, client, system and application levels
- ISO 27001 readiness and internal audit using original workpapers, controls and testing content
- TPRM assessments for cloud, SaaS, MSP, data processor, AI provider and other vendor profiles
- PCI DSS readiness and internal assessment support
- Business Continuity, Disaster Recovery, Operational Resilience and ISO 22301 readiness
- Microsoft 365, Azure, AWS, GitHub, Kubernetes and multi-cloud audits
- SAP, ServiceNow, Oracle, Salesforce, Workday and custom application audits
- Privacy, data governance, secure development, DevSecOps, vulnerability and incident-response audits
- AI governance, ISO 42001 readiness, NIST AI RMF and Microsoft Copilot readiness

## 6. Standards and copyright rule

The application must not reproduce copyrighted standards in full.

The application may store framework identifiers, official source links, original summaries, original audit controls, mapping strength, mapping rationale, procedures, evidence expectations and workpapers.

Formal compliance conclusions must be validated against current official or properly licensed source material and professional judgment.

Approved product wording: “Aligned to recognized global frameworks and designed to support professional assessments.”

## 7. Secure product architecture

1. React user interface with protected routes and public demo mode
2. Authentication service with verified email, password recovery and optional multi-factor authentication
3. PostgreSQL database with tenant-aware access controls
4. Protected object storage for evidence and reports
5. Role-based access for platform owner, consultant, reviewer, auditor, client contributor and read-only stakeholder
6. Organization, client, engagement, audit, workpaper, finding and action hierarchy
7. Immutable audit log for important user and data events
8. AI provider adapter supporting local Ollama first and other approved providers later

Production client information must not be stored in browser localStorage. Local storage remains acceptable only for public demo data.

## 8. Delivery roadmap

| Release | Purpose | Primary output |
| --- | --- | --- |
| v1.1 | Secure foundation and completeness engine | Login, tenant model, client and engagement records, data quality dashboard |
| v1.2 | Content governance and source control | Schemas, provenance, licensing, validation, duplicates and approval workflow |
| v1.3 | Risk library expansion | 1,000 professionally structured risks |
| v1.4 | Control and testing expansion | 1,000 controls, 1,500 procedures and 1,000 evidence specifications |
| v1.5 | Professional engagement workspace | Planning, sampling, fieldwork, review, reporting and follow-up |
| v1.6 | Open-source cybersecurity assistant | Ollama-based RAG chatbot with professional persona and citations |
| v2.0 | Freelance professional release | Secure, content-complete and client-ready operating platform |

## 9. Mandatory build principles

- Do not build isolated pages. Every module must use the shared data model.
- Do not claim universal compliance. Show framework alignment, source and review status.
- Do not generate large datasets without schema validation, duplicate checks and relationship checks.
- Do not add AI before the approved knowledge base, provenance and permissions are implemented.
- Do not store confidential client data in the public GitHub Pages version.
- Every stage must include files created, files modified, installation steps, data migration, tests, rollback and acceptance criteria.
- Every code package must pass npm audit, npm run build and production-preview testing.
- Every new route must be registered once in routing, navigation and global search.
- Every record must include owner, status, source, version, last-reviewed date and next-review date.

## 10. Session Start Prompt

```text
You are continuing development of my Audit Intelligence Hub, a secure professional platform for IT Internal Audit, cybersecurity, technology risk, compliance and freelance client engagements.

Current product version: [VERSION]
Current branch/commit: [BRANCH OR COMMIT]
Last completed milestone: [MILESTONE]
Current build status: [PASS/FAIL]
Current npm audit status: [RESULT]
Current deployed URL: [URL]

Mandatory product targets:
- 1,000 complete risks
- 1,000 complete controls
- 1,500+ testing procedures
- 1,000+ evidence specifications
- 250+ sampling and analytics methods
- 150+ policy-family templates
- 150+ workpaper templates
- 150 complete audit programmes
- 50+ specialized packs

Rules:
1. Preserve the connected Knowledge Graph and secure multi-tenant architecture.
2. Do not create standalone mini-apps.
3. Give exact file paths and complete replacement files when code changes are required.
4. Include data migration, testing, rollback and acceptance criteria.
5. Use original audit content and framework references, not copyrighted full-text standards.
6. Validate all imports, routes, filenames, storage keys and build commands.
7. Keep responses concise, staged and executable.

Today’s objective: [OBJECTIVE]
Start by reviewing the current state and provide the safest next implementation package.
```

## 11. v1.1 Prompt: Secure authentication and workspace foundation

```text
Build Version 1.1 Phase 1 for Audit Intelligence Hub: secure authentication and multi-tenant workspace foundation.

Required scope:
- Login, registration, verified email, forgot password, secure logout and session handling
- Protected routes and public demo mode separation
- User profile, organization, client and engagement models
- Roles: platform owner, consultant, engagement manager, auditor, reviewer, client contributor and read-only stakeholder
- PostgreSQL database and secure object storage
- Tenant isolation and row-level access policies
- Audit log for authentication and important data changes
- Migration plan from browser localStorage to secure storage
- Environment-variable management without committing secrets

Deliverables:
- Architecture decision record
- Database schema and migration scripts
- Access-control policies
- Complete frontend files with exact paths
- Setup and rollback steps
- Security tests and acceptance criteria
- Updated route, navigation and global-search registration

Do not store real client evidence in localStorage. Do not expose service-role or administrative secrets in frontend code.
```

## 12. v1.1 Prompt: Completeness Register

```text
Build the Data Completeness, Provenance and Quality Engine for Audit Intelligence Hub.

Libraries to monitor:
risks, controls, procedures, evidence, sampling methods, policies, workpapers, audit programmes, mappings and technology packs.

Required checks:
- target versus current record count
- required-field completion
- orphan risks and orphan controls
- controls without procedures, evidence, policies or framework mappings
- broken references and duplicate records
- mappings without strength or rationale
- missing sources, owners, versions or review dates
- expired reviews and records awaiting approval
- license classification and redistribution status
- programme coverage and readiness score

Statuses:
Draft, Under Review, Validated, Approved, Deprecated and Superseded.

Deliver a dashboard, validation service, import validation report, CSV export, release gates, exact files, tests and acceptance criteria.
```

## 13. v1.3 Prompt: Risk Library batches

```text
Expand the Audit Intelligence Hub Risk Library using the approved canonical schema.

Batch number: [BATCH]
Domain: [DOMAIN]
Required new records: [COUNT]

For every risk include:
risk ID, title, full risk statement, category, domain, subdomain, threat event, root causes, consequences, affected assets, technologies, inherent likelihood, inherent impact, related control IDs, key risk indicators, audit programme IDs, framework references, owner role, source references, content status, version, last reviewed and next review.

Requirements:
- no duplicate or near-duplicate risks
- plain professional wording
- organization, client, application and technology applicability where relevant
- valid relationships only
- output machine-readable data plus a validation report
- include coverage gaps and proposed next batch

Do not invent framework wording. Use identifiers, original summaries and clearly labeled mapping rationale.
```

## 14. v1.4 Prompt: Control Library batches

```text
Expand the Audit Intelligence Hub Control Library using the approved canonical schema.

Batch number: [BATCH]
Domain: [DOMAIN]
Required new controls: [COUNT]

For every control include:
control ID, title, objective, detailed description, domain, subdomain, risk IDs, owner, operator, reviewer, control type, preventive/detective, manual/automated, frequency, key/non-key, control precision, population, procedure IDs, evidence IDs, sampling guidance, exception criteria, policy IDs, technologies, audit programmes, framework mappings, mapping strength, mapping rationale, source, version, status and review dates.

Requirements:
- reusable across audits and technologies
- no duplicates
- every control linked to at least one risk, procedure, evidence specification and policy family
- include automated validation and completeness report
- do not reproduce copyrighted framework text
```

## 15. Procedure, evidence and sampling prompt

```text
Create complete testing content for these approved controls: [CONTROL IDS].

For each control provide:
1. Design-effectiveness procedure
2. Implementation-verification procedure
3. Operating-effectiveness procedure
4. Configuration or data-analytics procedure where applicable
5. Population definition and completeness checks
6. Sampling method, sample-size guidance and rationale
7. Evidence specifications with source, owner, period, format, required fields, freshness, reliability and validation steps
8. Expected result, exception criteria, conclusion choices and reviewer considerations

Output normalized procedure, evidence and sampling records with unique IDs and valid relationships. Include a quality report and identify controls that still lack complete testing coverage.
```

## 16. Complete audit programme prompt

```text
Build a complete, executable Audit Intelligence Hub programme for: [AUDIT TYPE].

Configuration:
- Level: [organization/client/application/technology]
- Industry: [INDUSTRY]
- Hosting model: [HOSTING]
- Technologies: [TECHNOLOGIES]
- Framework alignment: [FRAMEWORKS]
- Criticality: [CRITICALITY]

The programme must include:
background, purpose, objectives, scope options, exclusions, criteria references, stakeholder roles, inherent risks, complete risk universe, complete control universe, RCM, procedures, populations, completeness checks, sampling guidance, evidence request list, workpapers, analytics opportunities, expected results, exception criteria, findings template, rating method, report structure, management action plan and follow-up checklist.

Also provide:
- programme metadata, owner, version and review cycle
- completeness score and missing-content report
- direct integration with Checklist Generator, Evidence Tracker and Audit Workspace
- exact files, tests, rollback and acceptance criteria

Status must remain Draft until all required relationships and review gates pass.
```

## 17. First vertical benchmark prompt: ITGC Professional Pack

```text
Build the ITGC Professional Audit Pack as the benchmark complete programme.

Required variants:
standard ITGC, SOX ITGC, financial application ITGC, cloud-hosted ITGC, SaaS ITGC, ERP ITGC and outsourced ITGC.

Required modules:
identity lifecycle, privileged access, authentication, segregation of duties, periodic reviews, program changes, configuration changes, emergency changes, development, operations, batch jobs, interfaces, incidents, problems, backup and restoration, resilience, logging, databases and third-party operations.

For every module include risks, controls, procedures, evidence, population, sampling, expected results, exception criteria, workpapers, mappings and report guidance.

Deliver a 100% completeness report and do not mark Ready to Use until automated validation passes.
```

## 18. AI assistant prompt

```text
Design the secure open-source Cybersecurity and Audit Assistant for Audit Intelligence Hub.

Default provider: local Ollama through a backend API.
Architecture must support provider adapters and retrieval over approved records only.

Persona:
A senior IT Internal Audit, cybersecurity governance, technology risk, cloud assurance, compliance and AI governance professional. Responses must be evidence-driven, risk-based, practical, structured and suitable for professional review.

Assistant modes:
Ask, Plan, Test, Review, Map, Write, Learn and Query.

Requirements:
- authenticated access and tenant isolation
- no direct browser connection to privileged AI services
- approved Knowledge Graph retrieval with citations
- model name and version recording
- prompt and response audit logging
- sensitive-data filtering and configurable local-only mode
- “AI-generated draft; requires professional review” label
- human approval before mappings, findings or conclusions become official
- no automatic compliance conclusion, audit rating or finding closure
- exact backend, frontend, database and security files
- threat model, tests, rollback and acceptance criteria
```

## 19. Debugging Prompt

```text
Debug this Audit Intelligence Hub issue without changing unrelated architecture.

Error output:
[PASTE FIRST ERROR BLOCK]

Recent files changed:
[FILES]

Current versions:
Node: [VERSION]
React: [VERSION]
React Router: [VERSION]
Vite: [VERSION]

Instructions:
1. Identify the root cause from the first error, not the final stack trace.
2. Name the exact file and line to change.
3. Prefer a complete replacement file when corruption or encoded HTML is possible.
4. Check import paths, capitalization, duplicate routes, duplicate navigation keys, useEffect return values and HTML entities.
5. Provide build-verification commands.
6. Do not recommend force push, destructive reset or disabling error overlays.
7. Include a rollback step.
```

## 20. Session Handoff Prompt

```text
Create a concise handoff for the next Audit Intelligence Hub development session.

Include:
- current version and milestone
- completed work
- files created and modified
- database migrations applied
- unresolved issues
- build and audit status
- deployed URL
- latest commit
- next objective
- exact first commands for the next session
- risks, assumptions and decisions that must not be changed

Also produce a copy-ready Session Start Prompt populated with the current facts.
```

## 21. Stage acceptance checklist

- [ ] Business objective and scope are documented.
- [ ] Data schema and relationships are defined.
- [ ] Security and privacy impacts are assessed.
- [ ] Exact files created and modified are listed.
- [ ] Database migration and rollback are documented.
- [ ] Navigation, routing and global search are updated once.
- [ ] Automated validation and duplicate checks pass.
- [ ] Required-field completeness reaches the stage target.
- [ ] Sources, licenses, owner, version and review dates are recorded.
- [ ] npm audit reports no unresolved production vulnerabilities.
- [ ] npm run build succeeds.
- [ ] Production preview and responsive tests pass.
- [ ] Documentation and changelog are updated.
- [ ] Acceptance criteria are evidenced.
- [ ] A session handoff is created.

## 22. Current strategic sequence

1. Secure login, tenant isolation, client and engagement management
2. Completeness Register, source register and license register
3. Canonical schemas and automated validation
4. First 250 risks, then staged expansion to 1,000
5. First 250 controls, then staged expansion to 1,000
6. Testing procedures, evidence specifications and sampling libraries
7. ITGC Professional Pack as the benchmark vertical programme
8. Other wave-one audit programmes
9. Professional engagement-management workflow
10. Open-source AI assistant with approved retrieval and human review
11. Version 2.0 security, performance and client-readiness release
