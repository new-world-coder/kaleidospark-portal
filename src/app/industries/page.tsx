import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { industries } from "@/lib/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI programmes for retail, manufacturing, healthcare, real estate, and fintech—built for regulated operations.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sector context that changes the architecture"
        description="Generic AI playbooks fail in regulated operations. We bring patterns that respect your data boundaries, workforce realities, and audit expectations."
      />
      <section className="section">
        <div className="container-page grid gap-8 sm:grid-cols-2">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="border-b border-[var(--line)] pb-8 focus-ring hover:border-[var(--accent)]"
            >
              <h2 className="display text-3xl">{industry.name}</h2>
              <p className="mt-3 text-[var(--muted)]">{industry.summary}</p>
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
