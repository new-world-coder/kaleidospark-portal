export type Industry = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  proof: string;
};

export const industries: Industry[] = [
  {
    slug: "retail",
    name: "Retail",
    summary: "Demand sensing, personalisation, and inventory decisions that protect margin.",
    description:
      "Retail margins leave little room for speculative AI. We focus on forecasting, assortment, pricing support, and associate copilots that connect to inventory and CRM systems with clear ROI gates.",
    challenges: [
      "Stockouts and overstock across multi-node networks",
      "Personalisation that breaks trust or privacy rules",
      "Fragmented data across channels and partners",
    ],
    solutions: [
      "AI demand forecasting with replenishment rules",
      "Privacy-aware personalisation engines",
      "Customer and inventory analytics layer",
    ],
    outcomes: ["Fewer stockouts", "Higher conversion", "Protected margins"],
    proof: "Retail client recovered ~$8M in lost sales with forecasting prioritised over vanity pilots.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary: "Predictive maintenance and process intelligence for uptime and quality.",
    description:
      "We help manufacturers instrument critical assets, predict failure modes, and automate quality checks—while integrating with OT/IT boundaries and existing MES/ERP stacks.",
    challenges: [
      "Unplanned downtime and reactive maintenance",
      "Quality escapes late in the line",
      "Supply variability and planning lag",
    ],
    solutions: [
      "Predictive maintenance with sensor fusion",
      "Digital twin and process analytics",
      "Intelligent work-order automation",
    ],
    outcomes: ["Less downtime", "Higher first-pass yield", "Lower maintenance cost"],
    proof: "Plant network reduced unplanned downtime ~30% in the first year of rollout.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary: "HIPAA-aligned AI for clinical and operational workflows.",
    description:
      "Healthcare AI must earn clinician trust and survive audit. We design governance, documentation copilots, and operational analytics with PHI boundaries, access logging, and human oversight.",
    challenges: [
      "Rising cost and workforce pressure",
      "Regulatory scrutiny on automated decisions",
      "Fragmented clinical and claims data",
    ],
    solutions: [
      "Compliant data platforms and DPIAs",
      "Documentation and patient engagement copilots",
      "Claims and operational analytics",
    ],
    outcomes: ["Faster documentation", "Fewer claims errors", "Audit-ready controls"],
    proof: "Network reduced claims error rates ~15% with governance-led validation workflows.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    summary: "Market intelligence and portfolio optimisation for asset owners.",
    description:
      "We build valuation support, leasing analytics, and portfolio risk views that combine market signals with proprietary asset data—designed for investment committees, not demo dashboards.",
    challenges: [
      "Volatile markets and stale comps",
      "Inconsistent valuation discipline",
      "Scattered asset and tenant data",
    ],
    solutions: [
      "Market and comps analytics",
      "Valuation decision support",
      "Portfolio risk and scenario models",
    ],
    outcomes: ["Sharper valuations", "Faster IC packs", "Clearer risk view"],
    proof: "Asset manager improved valuation consistency ~22% across core holdings.",
  },
  {
    slug: "fintech",
    name: "Fintech",
    summary: "Fraud, risk, and regulatory-ready ML for financial products.",
    description:
      "We deliver fraud detection, credit/risk modelling support, and model governance that maps to financial regulation—emphasising explainability, monitoring, and change control.",
    challenges: [
      "Fraud losses and false positives",
      "Model risk and regulatory change",
      "Real-time decision latency",
    ],
    solutions: [
      "ML fraud detection with human review paths",
      "Model risk documentation and monitoring",
      "Compliance automation for evidence packs",
    ],
    outcomes: ["Lower fraud loss", "Fewer false positives", "Stronger audit trails"],
    proof: "Fintech client reduced fraud losses ~45% while keeping review SLAs intact.",
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
