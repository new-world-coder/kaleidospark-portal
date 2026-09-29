import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { industries, getIndustry } from "@/lib/data/industries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return { title: industry.name, description: industry.summary };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <PageHero eyebrow="Industries" title={industry.name} description={industry.summary} />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="prose-ks space-y-4 lg:col-span-2">
            <p>{industry.description}</p>
            <h2 className="display text-3xl">Challenges we see</h2>
            <ul className="list-disc space-y-2 pl-5">
              {industry.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <h2 className="display text-3xl">How we help</h2>
            <ul className="list-disc space-y-2 pl-5">
              {industry.solutions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="border-l-2 border-[var(--brass)] pl-4">{industry.proof}</p>
          </div>
          <aside className="space-y-6">
            <div className="rounded-lg border border-[var(--line)] bg-white p-6">
              <p className="text-sm font-semibold">Typical outcomes</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {industry.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
            <Link href="/services" className="text-sm font-semibold text-[var(--accent)] focus-ring">
              Explore services →
            </Link>
            <BookCallCTA />
          </aside>
        </div>
      </section>
    </>
  );
}
