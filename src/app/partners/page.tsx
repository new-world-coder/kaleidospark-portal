import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { InterestForm } from "@/components/forms/interest-form";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with KaleidoSpark on AI strategy, delivery, and governance programmes.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Complementary capability, shared quality bar"
        description="We partner with cloud, systems integration, legal/risk, and specialist product firms when it improves client outcomes."
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="prose-ks space-y-4">
            <p>
              Ideal partners bring deep platform or sector capability and share our insistence on
              evaluation, documentation, and accountable delivery—not logo farming.
            </p>
            <h2 className="display text-3xl">Partnership shapes</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Co-delivery on enterprise programmes</li>
              <li>Technology alliances with clear boundaries</li>
              <li>Referral relationships with quality SLAs</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-white p-6">
            <InterestForm type="partner" page="/partners" title="Partner interest" />
          </div>
        </div>
      </section>
    </>
  );
}
