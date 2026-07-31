const workpaperTemplates = [
  {
    id: "WP-PLAN-001",
    title: "Audit Planning Memorandum",
    type: "Planning",
    description: "Documents background, objectives, scope, criteria, approach, stakeholders, timing and key risks.",
    sections: ["Background", "Objectives", "Scope", "Exclusions", "Criteria", "Risk assessment", "Approach", "Stakeholders", "Timeline", "Approval"],
  },
  {
    id: "WP-RCM-001",
    title: "Risk and Control Matrix",
    type: "Planning and Fieldwork",
    description: "Connects audit objectives, risks, controls, procedures, evidence, results and conclusions.",
    sections: ["Objective", "Risk", "Control", "Framework mapping", "Procedure", "Evidence", "Result", "Exception", "Conclusion"],
  },
  {
    id: "WP-TEST-001",
    title: "Control Test Sheet",
    type: "Fieldwork",
    description: "Records population, sample, procedure, evidence, result, exceptions and conclusion for one control.",
    sections: ["Control", "Risk", "Test objective", "Population", "Sampling", "Procedure", "Evidence", "Results", "Exceptions", "Conclusion", "Reviewer sign-off"],
  },
  {
    id: "WP-IAM-001",
    title: "Access Sample Test",
    type: "Fieldwork",
    description: "Tests authorization, appropriateness, provisioning, modification, removal and periodic review of access.",
    sections: ["Population validation", "Sample selection", "Approval", "Role appropriateness", "Provisioning timeliness", "Termination", "Recertification", "Exceptions", "Conclusion"],
  },
  {
    id: "WP-CHG-001",
    title: "Change Sample Test",
    type: "Fieldwork",
    description: "Tests authorization, testing, segregation, implementation, rollback and emergency-change review.",
    sections: ["Population validation", "Sample selection", "Authorization", "Testing", "Business acceptance", "Segregation", "Deployment", "Rollback", "Emergency review", "Conclusion"],
  },
  {
    id: "WP-FIND-001",
    title: "Finding Development Sheet",
    type: "Reporting",
    description: "Develops a finding using condition, criteria, cause, consequence, rating, recommendation and management action.",
    sections: ["Title", "Condition", "Criteria", "Cause", "Consequence", "Risk rating", "Recommendation", "Management response", "Owner", "Target date"],
  },
  {
    id: "WP-MAP-001",
    title: "Management Action Plan",
    type: "Reporting and Follow-up",
    description: "Tracks agreed actions, ownership, milestones, due dates, validation and closure.",
    sections: ["Finding reference", "Agreed action", "Owner", "Due date", "Milestones", "Status", "Evidence", "Validation", "Closure approval"],
  },
  {
    id: "WP-REPORT-001",
    title: "Internal Audit Report Structure",
    type: "Reporting",
    description: "Provides a consistent executive and detailed report structure.",
    sections: ["Executive summary", "Background", "Objective and scope", "Overall conclusion", "Key themes", "Findings", "Management actions", "Appendices", "Rating definitions"],
  },
];

export default workpaperTemplates;
