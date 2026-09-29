import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { PageHero } from "@/components/marketing/page-hero";
import { InterestForm } from "@/components/forms/interest-form";
import { Button } from "@/components/ui/button";
import { resources, getResource } from "@/lib/data/solutions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return { title: resource.title, description: resource.description };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  let preview = "";
  try {
    const filePath = path.join(process.cwd(), "public", resource.file.replace(/^\//, ""));
    const raw = await readFile(filePath, "utf8");
    preview = raw.split("\n").slice(0, 40).join("\n");
  } catch {
    preview = "Preview unavailable.";
  }

  return (
    <>
      <PageHero
        eyebrow={`${resource.category} · ${resource.type}`}
        title={resource.title}
        description={resource.description}
        actions={
          <Button asChild variant="outline">
            <a href={resource.file} download>
              Download markdown
            </a>
          </Button>
        }
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <pre className="overflow-auto rounded-lg border border-[var(--line)] bg-white p-6 text-xs leading-relaxed text-[var(--ink-soft)] whitespace-pre-wrap">
            {preview}
            {"\n\n…"}
          </pre>
          <aside className="h-fit rounded-lg border border-[var(--line)] bg-white p-6">
            <InterestForm
              type="whitepaper"
              page={`/resources/${resource.slug}`}
              title="Get updates when we refresh this pack"
            />
          </aside>
        </div>
      </section>
    </>
  );
}
