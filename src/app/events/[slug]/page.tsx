import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { InterestForm } from "@/components/forms/interest-form";
import { getEvents, getEvent } from "@/lib/content";
import { renderBody } from "@/lib/markdoc";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return { title: event.title, description: event.summary };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  const body = await renderBody(event.body);

  return (
    <>
      <PageHero
        eyebrow={`${event.eventDate || "Event"} · ${event.location || "Online"}`}
        title={event.title}
        description={event.summary}
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <article>{body}</article>
          <aside className="h-fit rounded-lg border border-[var(--line)] bg-white p-6">
            <InterestForm type="webinar" page={`/events/${event.slug}`} title="Register interest" />
          </aside>
        </div>
      </section>
    </>
  );
}
