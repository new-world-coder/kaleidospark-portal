export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  proof: string;
};

export const services: Service[] = [
  {
    slug: "ai-strategy-readiness",
    title: "AI Strategy & Readiness",
    summary:
      "Board-ready roadmaps, maturity assessments, and investment cases that survive CFO scrutiny.",
    description:
      "We help executive teams decide where AI creates durable advantage—and where it is theatre. Engagements combine capability assessment, portfolio prioritisation, operating-model design, and a 12–24 month roadmap with clear owners, funding gates, and risk controls.",
    outcomes: [
      "Prioritised initiative portfolio with ROI hypotheses",
      "Executive alignment on build vs buy vs partner",
      "Reduced spend on low-value experiments",
    ],
    deliverables: [
      "AI maturity scorecard across strategy, data, tech, people, process, and governance",
      "Investment thesis and stage-gate funding model",
      "90-day action plan with accountable sponsors",
    ],
    proof:
      "Retail network recovered multi-million lost sales after sequencing forecasting work ahead of less material copilots.",
  },
  {
    slug: "process-transformation",
    title: "Process Transformation & Automation",
    summary:
      "Intelligent workflows that remove cost and cycle time without creating shadow IT.",
    description:
      "We redesign end-to-end processes—claims, replenishment, underwriting, customer ops—then automate with the right mix of RPA, rules, and models. Every build ships with observability, exception handling, and change management.",
    outcomes: [
      "Measurable cycle-time and cost reduction",
      "Controls that auditors can inspect",
      "Automation that operators actually trust",
    ],
    deliverables: [
      "Process baseline and value map",
      "Automation architecture and runbooks",
      "Pilot-to-scale playbook with KPIs",
    ],
    proof:
      "Manufacturing client cut operational cost ~25% by targeting high-volume, high-exception workflows first.",
  },
  {
    slug: "genai-copilots",
    title: "GenAI & Copilots",
    summary:
      "Domain copilots grounded in your systems of record—secure enough for regulated work.",
    description:
      "We design retrieval, tool-use, evaluation, and human-in-the-loop patterns so copilots accelerate knowledge work without leaking sensitive data. Focus areas include clinical documentation, research assistants, policy Q&A, and analyst productivity.",
    outcomes: [
      "Faster knowledge work with measurable quality bars",
      "Evaluation harnesses before broad rollout",
      "Access patterns aligned to least privilege",
    ],
    deliverables: [
      "Use-case charter and risk classification",
      "Reference architecture (RAG, tools, logging)",
      "Pilot with eval set and adoption plan",
    ],
    proof:
      "Healthcare network improved clinical documentation throughput ~40% while keeping PHI boundaries intact.",
  },
  {
    slug: "data-mlops-governance",
    title: "Data, MLOps & Governance",
    summary:
      "Reliable pipelines, model ops, and compliance-first controls for production AI.",
    description:
      "Strategy fails without dependable data and model lifecycle management. We stand up pipelines, feature discipline, monitoring, and governance artefacts that map to GDPR, HIPAA, and the EU AI Act.",
    outcomes: [
      "Production reliability with clear SLOs",
      "Audit-ready documentation trails",
      "Faster safe iteration on models",
    ],
    deliverables: [
      "Data platform readiness review",
      "MLOps blueprint and alerting design",
      "Model risk and DPIA artefacts",
    ],
    proof:
      "Fintech programme reached 99.9% pipeline reliability with regulator-ready lineage documentation.",
  },
  {
    slug: "training-change",
    title: "Training & Change Management",
    summary:
      "Capability building so transformation sticks beyond the pilot slide deck.",
    description:
      "We design role-based learning journeys for executives, product owners, engineers, and frontline teams—paired with adoption metrics, champions networks, and responsible-use standards.",
    outcomes: [
      "Higher tool adoption with fewer shadow workflows",
      "Shared vocabulary across business and tech",
      "Sustained behaviour change after launch",
    ],
    deliverables: [
      "Curriculum mapped to roles and risks",
      "Champions programme and office hours",
      "Adoption dashboard and reinforcement plan",
    ],
    proof:
      "Enterprise programme reached ~85% adoption across 500+ employees within two quarters.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
