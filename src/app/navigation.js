const navigation = [
  {
    group: "Overview",
    items: [{ label: "Executive Dashboard", path: "/", icon: "▦" }],
  },
  {
    group: "Knowledge",
    items: [
      { label: "Framework Repository", path: "/frameworks", icon: "◫" },
      { label: "Control Library", path: "/controls", icon: "✓" },
      { label: "Risk Library", path: "/risks", icon: "△" },
      { label: "Policy Repository", path: "/policies", icon: "≡" },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { label: "Control Crosswalk", path: "/crosswalk", icon: "⇄" },
      { label: "Compliance Mapper", path: "/compliance-hub", icon: "◎" },
     
      { label: "Knowledge Graph",
  path: "/knowledge-graph",
  icon: "⎔",
},

    ],
  },
  {
    group: "Audit Delivery",
    items: [
      { label: "Checklist Generator", path: "/audit-builder", icon: "+" },
      { label: "Audit Workspace", path: "/audit-workspace", icon: "□" },
      { label: "Evidence Library", path: "/evidence-tracker", icon: "↥" },
    ],
  },
  {
    group: "Audit Packs",
    items: [
      { label: "Technology Audits", path: "/technology-audits", icon: "⌘" },
      { label: "Vendor Risk", path: "/tprm-assessment", icon: "◇" },
    ],
  },
];

export default navigation;
