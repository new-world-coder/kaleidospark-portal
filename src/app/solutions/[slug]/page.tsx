import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { solutions, getSolution } from "@/lib/data/solutions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return { title: solution.title, description: solution.summary };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <PageHero eyebrow="Solutions" title={solution.title} description={solution.summary} />
      <section className="section">
        <div className="container-narrow prose-ks space-y-6">
          <p>{solution.description}</p>
          <h2 className="display text-3xl">You leave with</h2>
          <ul className="list-disc space-y-2 pl-5">
            {solution.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <BookCallCTA />
        </div>
      </section>
    </>
  );
}
