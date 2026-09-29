import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { getResearchPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "KaleidoSpark research briefings on enterprise AI governance and board oversight.",
};

export default async function ResearchIndexPage() {
  const posts = await getResearchPosts();
  return (
    <>
      <PageHero
        eyebrow="Insights · Research"
        title="Briefings for sponsors and boards"
        description="Longer-form research with optional email gates for full packs."
      />
      <section className="section">
        <div className="container-narrow divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {posts.map((post) => (
            <Link key={post.slug} href={`/research/${post.slug}`} className="block py-7 focus-ring">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                {post.publishedAt}
                {post.gated ? " · Gated" : ""}
              </p>
              <h2 className="display mt-2 text-3xl">{post.title}</h2>
              <p className="mt-3 text-[var(--muted)]">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
