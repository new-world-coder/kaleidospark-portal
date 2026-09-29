import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { DemoRequest } from "@/components/forms/demo-request";
import { Button } from "@/components/ui/button";
import { portalUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "RiskLine",
  description:
    "RiskLine gives programme leaders one view of AI systems, owners, risk tiers, and control gaps. Access via the KaleidoSpark portal.",
};

export default function RiskLinePage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Products · RiskLine"
        title="AI risk visibility without another spreadsheet archaeology project"
        description="Inventory systems, classify risk, assign owners, and surface control gaps before regulators—or customers—ask. RiskLine lives in the KaleidoSpark portal."
        actions={
          <Button asChild variant="brass" size="lg">
            <a href={portalUrl()} target="_blank" rel="noopener noreferrer">
              Launch RiskLine in portal
            </a>
          </Button>
        }
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose-ks space-y-5">
            <p>
              Most enterprises discover their AI estate the hard way—during due diligence, an
              incident, or an audit. RiskLine is designed for programme and risk leaders who need a
              living inventory, not a quarterly slide.
            </p>
            <h2 className="display text-3xl">What you can track</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>System inventory with owners and business sponsors</li>
              <li>Risk classification aligned to your governance taxonomy</li>
              <li>Control coverage and evidence gaps</li>
              <li>Change log suitable for internal audit conversations</li>
            </ul>
            <h2 className="display text-3xl">How it relates to consulting</h2>
            <p>
              RiskLine encodes patterns from our governance engagements. You can start with a
              product-led evaluation or pair it with our{" "}
              <Link href="/solutions/ai-governance" className="text-[var(--accent)] underline">
                AI Governance Operating Model
              </Link>{" "}
              package.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-white p-6 sm:p-8">
            <h2 className="display text-2xl">Request access</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              We’ll follow up with portal onboarding details. Existing portal users can sign in
              directly.
            </p>
            <div className="mt-6">
              <DemoRequest product="RiskLine" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
