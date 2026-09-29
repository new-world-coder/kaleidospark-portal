import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "KaleidoSpark is a UK boutique AI consultancy combining boardroom strategy with production-grade delivery and governance.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="About"
        title="A consultancy that can sit with the board and ship with engineering"
        description="KaleidoSpark Ltd advises enterprises on AI strategy, builds governed systems, and leaves behind operating models that survive the next audit—not just the next demo day."
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="prose-ks space-y-5 text-base">
            <p>
              We started KaleidoSpark because too many AI programmes fail the same way: strategy
              without delivery, delivery without governance, or governance without commercial
              realism. Clients need a partner that can hold all three.
            </p>
            <p>
              Our work spans readiness assessments, investment roadmaps, GenAI copilots, data and
              MLOps foundations, and change programmes. We favour fewer concurrent bets, clearer
              owners, and artefacts that regulators and internal audit can inspect.
            </p>
            <h2 className="display text-3xl text-[var(--ink)]">How we’re different</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Boutique accountability—principals stay on the work.</li>
              <li>Governance-first architecture for regulated industries.</li>
              <li>Delivery discipline: evaluation, observability, handover.</li>
              <li>Honest sequencing: what not to fund is as valuable as what to fund.</li>
            </ul>
            <h2 className="display text-3xl text-[var(--ink)]">Responsible AI</h2>
            <p>
              Responsible AI is not a poster. It is risk classification, human oversight, data
              minimisation, evaluation quality, and documentation that matches how the system
              actually behaves. See our{" "}
              <Link href="/solutions/responsible-ai-assurance" className="text-[var(--accent)] underline">
                assurance solution
              </Link>{" "}
              and{" "}
              <Link href="/solutions/eu-ai-act" className="text-[var(--accent)] underline">
                EU AI Act readiness
              </Link>{" "}
              packages.
            </p>
          </div>
          <aside className="space-y-6">
            <div className="rounded-lg border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">{siteConfig.legalName}</p>
              <p className="mt-3">{siteConfig.location}</p>
              <p className="mt-2">
                <a href={`mailto:${siteConfig.email}`} className="text-[var(--accent)]">
                  {siteConfig.email}
                </a>
              </p>
              <p className="mt-1">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-[var(--accent)]">
                  {siteConfig.phone}
                </a>
              </p>
            </div>
            <div className="rounded-lg border border-[var(--line)] bg-white p-6">
              <p className="text-sm font-semibold text-[var(--ink)]">Explore</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/case-studies" className="text-[var(--accent)]">
                    Case studies
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-[var(--accent)]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/investors" className="text-[var(--accent)]">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-[var(--accent)]">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="container-page mt-12">
          <BookCallCTA />
        </div>
      </section>
    </>
  );
}
