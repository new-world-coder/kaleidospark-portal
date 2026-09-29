import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { InterestForm } from "@/components/forms/interest-form";
import { products, getProduct } from "@/lib/data/solutions";
import { Button } from "@/components/ui/button";
import { portalUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.filter((p) => p.slug !== "riskline").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function ProductStubPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "riskline") notFound();
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        eyebrow="Products · Coming soon"
        title={product.name}
        description={product.summary}
        actions={
          <Button asChild variant="outline">
            <a href={portalUrl()} target="_blank" rel="noopener noreferrer">
              Visit portal
            </a>
          </Button>
        }
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="prose-ks space-y-4">
            <p>{product.description}</p>
            <p>
              Interested in early access? Leave your details or explore{" "}
              <Link href="/products/riskline" className="text-[var(--accent)] underline">
                RiskLine
              </Link>{" "}
              today.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-white p-6">
            <InterestForm
              type="demo"
              page={`/products/${product.slug}`}
              title={`Join the ${product.name} waitlist`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
