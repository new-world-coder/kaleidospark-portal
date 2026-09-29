import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Selected KaleidoSpark outcomes across retail, healthcare, and manufacturing.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Outcomes you can brief a sponsor with"
        description="Anonymised engagements with metrics, approach, and the governance choices that made scale possible."
      />
      <section className="section">
        <div className="container-page space-y-0 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="block py-8 focus-ring hover:bg-white/60">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {cs.industry}
              </p>
              <h2 className="display mt-2 text-3xl">{cs.title}</h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
                {cs.metrics.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        <div className="container-page mt-12">
          <BookCallCTA />
        </div>
      </section>
    </>
  );
}
