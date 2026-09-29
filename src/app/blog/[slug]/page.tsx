import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { getBlogPosts, getBlogPost } from "@/lib/content";
import { renderBody } from "@/lib/markdoc";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const body = await renderBody(post.body);

  return (
    <>
      <PageHero eyebrow={post.publishedAt || "Blog"} title={post.title} description={post.summary} />
      <section className="section">
        <article className="container-narrow">{body}</article>
      </section>
    </>
  );
}
