import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { services, getService } from "@/lib/data/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow="Services" title={service.title} description={service.summary} />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="prose-ks space-y-6 text-base">
            <p>{service.description}</p>
            <h2 className="display text-3xl">Outcomes</h2>
            <ul className="list-disc space-y-2 pl-5">
              {service.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <h2 className="display text-3xl">Typical deliverables</h2>
            <ul className="list-disc space-y-2 pl-5">
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="border-l-2 border-[var(--accent)] pl-4 text-[var(--ink-soft)]">
              {service.proof}
            </p>
          </div>
          <aside className="space-y-6">
            <div className="rounded-lg border border-[var(--line)] bg-white p-6">
              <p className="text-sm font-semibold text-[var(--ink)]">Other services</p>
              <ul className="mt-4 space-y-3">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-sm text-[var(--accent)] hover:underline focus-ring"
                      >
                        {s.title}
                      </Link>
                    </li>
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
