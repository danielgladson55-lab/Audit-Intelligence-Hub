# Audit Intelligence Hub Secure Architecture Diagram

```mermaid
flowchart TB
    U[Users and Roles<br/>Platform Owner · Consultant · Auditor · Reviewer · Client Contributor]
    WEB[Secure React Application<br/>Protected routes · Tenant context · Public demo separation]
    AUTH[Identity and Session Security<br/>Verified email · MFA · Recovery · Revocation]

    U -->|HTTPS| WEB
    WEB --> AUTH

    subgraph BOUNDARY[Secure Application and API Boundary]
      API[Application Backend<br/>Validation · Authorization · Business rules · Exports]
      DB[(PostgreSQL<br/>Tenant-aware records · Row-Level Security · Version history)]
      FILES[(Protected Object Storage<br/>Evidence · Reports · Signed links · Retention)]
      LOGS[(Audit and Security Logs<br/>Authentication · Data changes · AI approvals)]
    end

    WEB -->|Authenticated requests| API
    AUTH -->|User and role claims| API
    API -->|Authorized queries| DB
    API -->|Private file operations| FILES
    API -->|Security and activity events| LOGS

    KB[Governed Professional Knowledge Base<br/>1,000 risks · 1,000 controls · Procedures · Evidence · Policies · 150 audit programmes]
    AIGW[AI Gateway and Retrieval<br/>Approved records only · Citations · Filtering · Human review]
    AI[Local or Approved AI Provider<br/>Ollama by default · Open-weight models · Local-only mode]

    KB -->|Validated and approved content| AIGW
    API -->|Authorized tenant context| AIGW
    AIGW -->|Private model API| AI
    AIGW -->|Prompt, response and approval metadata| LOGS
    AIGW -->|Draft response with sources| API
```

## Security boundaries

- The browser never receives database administrative credentials or AI provider secrets.
- Authentication is combined with authorization on every backend request.
- Every professional record carries organization, client and engagement context.
- Database row-level policies prevent cross-tenant access.
- Evidence files use private storage, signed links, retention controls and validation.
- AI retrieval is limited to approved records the authenticated user may access.
- AI outputs remain drafts until a professional approves them.
- Public GitHub Pages demo data is separated from the secure professional workspace.

## Recommended repository paths

```text
docs/diagrams/secure-architecture.md
docs/diagrams/secure-architecture.png
```
