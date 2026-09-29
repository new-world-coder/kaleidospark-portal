import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { careers } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at KaleidoSpark—strategists, engineers, and engagement leaders.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join a firm that writes things down and ships them"
        description="We hire people who can advise with clarity, deliver with discipline, and care about governance as a craft—not a checkbox."
      />
      <section className="section">
        <div className="container-page divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {careers.map((role) => (
            <Link key={role.slug} href={`/careers/${role.slug}`} className="block py-8 focus-ring hover:bg-white/60">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                {role.type} · {role.location}
              </p>
              <h2 className="display mt-2 text-3xl">{role.title}</h2>
              <p className="mt-3 max-w-2xl text-[var(--muted)]">{role.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
