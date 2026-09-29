import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "KaleidoSpark blog on enterprise AI strategy, governance, and delivery.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <PageHero eyebrow="Insights · Blog" title="Notes from the work" description="Short, practical writing for executives and builders shipping AI under scrutiny." />
      <section className="section">
        <div className="container-narrow divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block py-7 focus-ring">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{post.publishedAt}</p>
              <h2 className="display mt-2 text-3xl">{post.title}</h2>
              <p className="mt-3 text-[var(--muted)]">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
