import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { SubscribeForm } from "@/components/forms/subscribe-form";
import { getBlogPosts, getResearchPosts, getNewsItems, getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "KaleidoSpark insights hub—blog, research, newsroom, and events on enterprise AI strategy and governance.",
};

export default async function InsightsPage() {
  const [posts, research, news, events] = await Promise.all([
    getBlogPosts(),
    getResearchPosts(),
    getNewsItems(),
    getEvents(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Signal for leaders funding AI under scrutiny"
        description="Practical writing on governance, delivery, and regulation—plus research briefings and upcoming briefings."
      />
      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-12">
            <HubBlock
              title="Blog"
              href="/blog"
              items={posts.slice(0, 3).map((p) => ({
                href: `/blog/${p.slug}`,
                title: p.title,
                meta: p.publishedAt || "",
                summary: p.summary,
              }))}
            />
            <HubBlock
              title="Research"
              href="/research"
              items={research.slice(0, 2).map((p) => ({
                href: `/research/${p.slug}`,
                title: p.title,
                meta: p.publishedAt || "",
                summary: p.summary,
              }))}
            />
            <HubBlock
              title="Newsroom"
              href="/newsroom"
              items={news.slice(0, 2).map((p) => ({
                href: `/newsroom/${p.slug}`,
                title: p.title,
                meta: p.publishedAt || "",
                summary: p.summary,
              }))}
            />
            <HubBlock
              title="Events"
              href="/events"
              items={events.slice(0, 2).map((p) => ({
                href: `/events/${p.slug}`,
                title: p.title,
                meta: p.eventDate || "",
                summary: p.summary,
              }))}
            />
          </div>
          <aside className="h-fit rounded-lg border border-[var(--line)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--ink)]">Newsletter</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Research notes and event invitations. Low frequency.
            </p>
            <div className="mt-4">
              <SubscribeForm source="/insights" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function HubBlock({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { href: string; title: string; meta: string; summary: string }[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="display text-3xl">{title}</h2>
        <Link href={href} className="text-sm font-semibold text-[var(--accent)] focus-ring">
          View all
        </Link>
      </div>
      <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block py-5 focus-ring hover:bg-white/60">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{item.meta}</p>
              <p className="mt-1 display text-2xl text-[var(--ink)]">{item.title}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
