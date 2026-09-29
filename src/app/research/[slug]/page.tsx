import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { InterestForm } from "@/components/forms/interest-form";
import { getResearchPosts, getResearchPost } from "@/lib/content";
import { renderBody } from "@/lib/markdoc";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getResearchPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getResearchPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getResearchPost(slug);
  if (!post) notFound();
  const body = await renderBody(post.body);

  return (
    <>
      <PageHero eyebrow="Research" title={post.title} description={post.summary} />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <article>{body}</article>
          {post.gated ? (
            <aside className="h-fit rounded-lg border border-[var(--line)] bg-white p-6">
              <InterestForm
                type="whitepaper"
                page={`/research/${post.slug}`}
                title="Request the full briefing"
              />
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}
