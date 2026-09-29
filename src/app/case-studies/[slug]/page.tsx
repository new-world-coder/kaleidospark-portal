import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: cs.title, description: cs.challenge };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <PageHero eyebrow={cs.industry} title={cs.title} description={cs.challenge} />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="prose-ks space-y-6">
            <h2 className="display text-3xl">Approach</h2>
            <p>{cs.approach}</p>
            <h2 className="display text-3xl">Outcome</h2>
            <p>{cs.outcome}</p>
            <blockquote className="border-l-2 border-[var(--accent)] pl-4 italic text-[var(--ink-soft)]">
              “{cs.testimonial}”
              <footer className="mt-3 not-italic text-sm text-[var(--muted)]">— {cs.client}</footer>
            </blockquote>
          </div>
          <aside className="space-y-6">
            <div className="rounded-lg border border-[var(--line)] bg-white p-6">
              <p className="text-sm font-semibold">Metrics</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {cs.metrics.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <BookCallCTA />
          </aside>
        </div>
      </section>
    </>
  );
}
