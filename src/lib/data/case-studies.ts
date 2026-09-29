export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  approach: string;
  outcome: string;
  testimonial: string;
  client: string;
  metrics: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "retail-inventory-optimisation",
    title: "Retail inventory optimisation",
    industry: "Retail",
    challenge:
      "A multi-banner retailer faced material lost sales from stockouts alongside capital trapped in overstock across 200+ locations.",
    approach:
      "We sequenced a demand-forecasting programme tied to replenishment rules, with data quality gates and a staged rollout by category and region.",
    outcome:
      "Recovered ~$8M annualised lost sales, improved inventory turns ~35%, and lifted on-shelf availability toward 95% in priority categories.",
    testimonial:
      "KaleidoSpark was the first team that paired speed with governance. Forecasting finally had owners, controls, and a clear path to scale.",
    client: "VP of Operations, multi-banner retailer",
    metrics: ["~$8M recovered sales", "~35% inventory turn lift", "~95% availability"],
  },
  {
    slug: "healthcare-claims-integrity",
    title: "Healthcare claims integrity",
    industry: "Healthcare",
    challenge:
      "A regional healthcare network faced elevated claims error rates that delayed payment and increased compliance exposure.",
    approach:
      "We deployed AI-assisted validation with human review queues, HIPAA-aligned logging, and a model risk pack for internal audit.",
    outcome:
      "Claims errors fell ~15%, processing time improved ~60% on targeted claim types, and audit artefacts were produced alongside the build.",
    testimonial:
      "The governance frame gave us confidence to scale AI on sensitive workflows—not just another pilot that never left staging.",
    client: "Chief Technology Officer, healthcare network",
    metrics: ["~15% error reduction", "~60% faster processing", "Audit-ready controls"],
  },
  {
    slug: "manufacturing-predictive-maintenance",
    title: "Manufacturing predictive maintenance",
    industry: "Manufacturing",
    challenge:
      "Unplanned downtime on critical lines was costing roughly $2M annually under a reactive maintenance model.",
    approach:
      "We instrumented priority assets, built failure prediction models, and integrated work-order triggers with existing CMMS processes.",
    outcome:
      "Unplanned downtime fell ~30%, maintenance cost improved by ~$1.2M, and OEE rose ~18% on the pilot lines.",
    testimonial:
      "The programme paid for itself in year one without forcing a rip-and-replace of our plant systems.",
    client: "Plant Operations Director, industrial manufacturer",
    metrics: ["~30% downtime reduction", "~$1.2M cost saving", "~18% OEE lift"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
