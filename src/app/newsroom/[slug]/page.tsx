import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { getNewsItems, getNewsItem } from "@/lib/content";
import { renderBody } from "@/lib/markdoc";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getNewsItems();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();
  const body = await renderBody(item.body);

  return (
    <>
      <PageHero eyebrow={item.publishedAt || "News"} title={item.title} description={item.summary} />
      <section className="section">
        <article className="container-narrow">{body}</article>
      </section>
    </>
  );
}
