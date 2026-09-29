import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { resources } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Resources",
  description: "Downloadable KaleidoSpark toolkits, RFP templates, and playbooks.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Practical artefacts you can use this week"
        description="Toolkits and templates distilled from client work—available as markdown downloads on this site."
      />
      <section className="section">
        <div className="container-page divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="block py-8 focus-ring hover:bg-white/60"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {resource.category} · {resource.type}
              </p>
              <h2 className="display mt-2 text-3xl">{resource.title}</h2>
              <p className="mt-3 max-w-2xl text-[var(--muted)]">{resource.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
