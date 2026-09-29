import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { InterestForm } from "@/components/forms/interest-form";

export const metadata: Metadata = {
  title: "Investors",
  description: "Investor information for KaleidoSpark Ltd—product-led expansion of AI governance advisory.",
};

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Building the operating system for governed enterprise AI"
        description="KaleidoSpark combines high-trust advisory with productised risk and readiness tooling. We speak with aligned investors selectively."
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="prose-ks space-y-4">
            <p>
              Our thesis: enterprises will fund AI that can survive scrutiny. Advisory creates
              trust and distribution; products like RiskLine encode repeatable governance work.
            </p>
            <h2 className="display text-3xl">What we share in diligence</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Go-to-market and product roadmap overview</li>
              <li>Engagement mix and sector focus</li>
              <li>Free-tier architecture and capital efficiency posture</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-white p-6">
            <InterestForm type="investor" page="/investors" title="Request investor materials" />
          </div>
        </div>
      </section>
    </>
  );
}
