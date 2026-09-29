import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI strategy, process transformation, GenAI copilots, data/MLOps governance, and change programmes from KaleidoSpark.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engagements built for decisions, not decks"
        description="From board briefings to production copilots—each service is designed to leave you with owners, artefacts, and measurable next steps."
      />
      <section className="section">
        <div className="container-page space-y-0 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="block py-8 focus-ring hover:bg-white/60"
            >
              <h2 className="display text-3xl text-[var(--ink)]">{service.title}</h2>
              <p className="mt-3 max-w-2xl text-[var(--muted)]">{service.summary}</p>
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
