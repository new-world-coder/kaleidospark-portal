import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/solutions";
import { portalUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description: "KaleidoSpark products including RiskLine and upcoming copilot and readiness tools.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Products"
        title="Software that encodes how we advise"
        description="Product surfaces for AI risk visibility and readiness—accessed through the KaleidoSpark portal, separate from this marketing site."
        actions={
          <Button asChild variant="brass" size="lg">
            <a href={portalUrl()} target="_blank" rel="noopener noreferrer">
              Open portal
            </a>
          </Button>
        }
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={product.slug === "riskline" ? "/products/riskline" : `/products/${product.slug}`}
              className="border-b border-[var(--line)] pb-8 focus-ring hover:border-[var(--accent)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brass)]">
                {product.status === "featured" ? "Featured" : "Coming soon"}
              </p>
              <h2 className="display mt-3 text-3xl">{product.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{product.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
