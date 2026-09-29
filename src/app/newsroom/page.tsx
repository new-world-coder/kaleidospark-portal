import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { getNewsItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "KaleidoSpark company news and announcements.",
};

export default async function NewsroomPage() {
  const items = await getNewsItems();
  return (
    <>
      <PageHero eyebrow="Insights · Newsroom" title="Company news" description="Announcements from KaleidoSpark Ltd." />
      <section className="section">
        <div className="container-narrow divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {items.map((item) => (
            <Link key={item.slug} href={`/newsroom/${item.slug}`} className="block py-7 focus-ring">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{item.publishedAt}</p>
              <h2 className="display mt-2 text-3xl">{item.title}</h2>
              <p className="mt-3 text-[var(--muted)]">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
