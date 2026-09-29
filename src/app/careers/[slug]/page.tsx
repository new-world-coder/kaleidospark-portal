import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { InterestForm } from "@/components/forms/interest-form";
import { careers, getCareer } from "@/lib/data/solutions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareer(slug);
  if (!role) return {};
  return { title: role.title, description: role.summary };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const role = getCareer(slug);
  if (!role) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${role.type} · ${role.location}`}
        title={role.title}
        description={role.summary}
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="prose-ks space-y-5">
            <h2 className="display text-3xl">Responsibilities</h2>
            <ul className="list-disc space-y-2 pl-5">
              {role.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <h2 className="display text-3xl">Requirements</h2>
            <ul className="list-disc space-y-2 pl-5">
              {role.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-lg border border-[var(--line)] bg-white p-6">
            <InterestForm type="career" page={`/careers/${role.slug}`} title="Apply / express interest" />
          </aside>
        </div>
      </section>
    </>
  );
}
