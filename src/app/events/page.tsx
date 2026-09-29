import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming KaleidoSpark briefings and workshops.",
};

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <>
      <PageHero
        eyebrow="Insights · Events"
        title="Briefings and working sessions"
        description="Executive briefings and workshops on AI strategy and responsible delivery."
      />
      <section className="section">
        <div className="container-narrow divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {events.map((event) => (
            <Link key={event.slug} href={`/events/${event.slug}`} className="block py-7 focus-ring">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                {event.eventDate} · {event.location}
              </p>
              <h2 className="display mt-2 text-3xl">{event.title}</h2>
              <p className="mt-3 text-[var(--muted)]">{event.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
