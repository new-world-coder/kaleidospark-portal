export type Solution = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
};

export const solutions: Solution[] = [
  {
    slug: "ai-governance",
    title: "AI Governance Operating Model",
    summary: "Policies, forums, and artefacts that let boards approve AI with eyes open.",
    description:
      "A packaged engagement to stand up AI policy, risk classification, model inventory, and decision rights—mapped to your existing risk and compliance forums.",
    outcomes: [
      "Board-readable risk taxonomy",
      "Model inventory and owners",
      "Decision rights and escalation paths",
    ],
  },
  {
    slug: "eu-ai-act",
    title: "EU AI Act Readiness",
    summary: "Classify systems, close evidence gaps, and plan remediation before deadlines bite.",
    description:
      "We inventory AI systems, map risk tiers, identify documentation and transparency gaps, and produce a remediation roadmap aligned to the EU AI Act.",
    outcomes: [
      "System inventory with risk tiers",
      "Evidence gap analysis",
      "Phased remediation plan",
    ],
  },
  {
    slug: "responsible-ai-assurance",
    title: "Responsible AI Assurance",
    summary: "Independent review of high-impact use cases before go-live.",
    description:
      "Structured assurance reviews covering fairness, security, privacy, human oversight, and evaluation quality for systems heading into production.",
    outcomes: [
      "Assurance report for sponsors",
      "Remediation backlog ranked by risk",
      "Go/no-go recommendation",
    ],
  },
  {
    slug: "executive-ai-briefing",
    title: "Executive AI Briefing",
    summary: "A half-day board or ExCo session on AI economics, risk, and investment sequencing.",
    description:
      "Facilitated briefing that separates signal from vendor noise—covering capability choices, total cost of ownership, and governance expectations.",
    outcomes: [
      "Shared ExCo vocabulary",
      "Investment hypotheses to test",
      "Immediate next-step owners",
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export type Product = {
  slug: string;
  name: string;
  status: "featured" | "coming-soon";
  summary: string;
  description: string;
  portalPath?: string;
};

export const products: Product[] = [
  {
    slug: "riskline",
    name: "RiskLine",
    status: "featured",
    summary:
      "AI risk visibility for programme leaders who need one view of models, owners, and controls.",
    description:
      "RiskLine helps enterprises inventory AI systems, track risk classification, and surface control gaps before regulators—or customers—ask. Access via the KaleidoSpark portal.",
    portalPath: "/",
  },
  {
    slug: "spark-copilot-studio",
    name: "Spark Copilot Studio",
    status: "coming-soon",
    summary: "Governed copilot templates for regulated knowledge work.",
    description:
      "A forthcoming suite of domain copilot blueprints with evaluation harnesses and access patterns designed for enterprise IT.",
  },
  {
    slug: "readiness-score",
    name: "Readiness Score",
    status: "coming-soon",
    summary: "Continuous AI maturity scoring tied to investment gates.",
    description:
      "Extends our AI readiness methodology into a lightweight product for tracking progress across strategy, data, technology, people, process, and governance.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export type Career = {
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const careers: Career[] = [
  {
    slug: "principal-ai-strategist",
    title: "Principal AI Strategist",
    location: "UK / remote-friendly (GMT±3)",
    type: "Full-time",
    summary:
      "Lead board-level AI strategy engagements and mentor delivery teams from roadmap to first production release.",
    responsibilities: [
      "Own client relationships for strategy and governance programmes",
      "Translate business outcomes into sequenced AI portfolios",
      "Publish intellectual capital for Insights and research",
    ],
    requirements: [
      "Deep experience advising enterprise executives on digital or AI transformation",
      "Comfort with regulated industries and model risk concepts",
      "Excellent writing and facilitation skills",
    ],
  },
  {
    slug: "senior-ml-engineer",
    title: "Senior ML / GenAI Engineer",
    location: "UK / remote-friendly (GMT±3)",
    type: "Full-time",
    summary:
      "Design and ship production copilots and ML systems with evaluation, observability, and security built in.",
    responsibilities: [
      "Architect RAG and tool-using agents against enterprise systems",
      "Build evaluation harnesses and monitoring",
      "Partner with client engineering on handover and hardening",
    ],
    requirements: [
      "Production ML or GenAI delivery experience",
      "Strong Python and cloud fundamentals",
      "Bias toward measurable quality over demos",
    ],
  },
  {
    slug: "engagement-manager",
    title: "Engagement Manager",
    location: "UK / hybrid",
    type: "Full-time",
    summary:
      "Run delivery excellence across multi-workstream AI programmes with crisp client communication.",
    responsibilities: [
      "Plan and track outcomes, risks, and dependencies",
      "Coordinate strategists, engineers, and client stakeholders",
      "Protect quality bars on scope and documentation",
    ],
    requirements: [
      "Consulting or product delivery leadership experience",
      "Comfortable with technical and commercial conversations",
      "Impeccable written communication",
    ],
  },
];

export function getCareer(slug: string) {
  return careers.find((c) => c.slug === slug);
}

export type ResourceMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  type: string;
  file: string;
};

export const resources: ResourceMeta[] = [
  {
    slug: "ai-readiness-toolkit",
    title: "AI Readiness Toolkit",
    description:
      "Assessment framework and implementation roadmap across strategy, data, technology, people, process, and governance.",
    category: "Strategy",
    type: "Guide",
    file: "/resources/ai-readiness-toolkit.md",
  },
  {
    slug: "rfp-template-ai-projects",
    title: "RFP Template for AI Projects",
    description:
      "Vendor evaluation template covering outcomes, compliance, evaluation, security, and total cost of ownership.",
    category: "Procurement",
    type: "Template",
    file: "/resources/rfp-template-ai-projects.md",
  },
  {
    slug: "prompt-engineering-playbook",
    title: "Prompt Engineering Playbook",
    description:
      "Practical patterns for reliable prompting across business functions, with evaluation and safety notes.",
    category: "Implementation",
    type: "Playbook",
    file: "/resources/prompt-engineering-playbook.md",
  },
];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}
