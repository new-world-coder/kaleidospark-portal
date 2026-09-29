import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { solutions, getSolution } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Packaged KaleidoSpark offers for AI governance, EU AI Act readiness, assurance, and executive briefings.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Packaged offers with clear artefacts"
        description="When you need a focused engagement—not an open-ended retainer—these packages compress time-to-decision."
      />
      <section className="section">
        <div className="container-page divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {solutions.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-8 focus-ring hover:bg-white/60">
              <h2 className="display text-3xl">{s.title}</h2>
              <p className="mt-3 max-w-2xl text-[var(--muted)]">{s.summary}</p>
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
