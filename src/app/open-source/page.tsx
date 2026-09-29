import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Open source",
  description: "KaleidoSpark open-source intent—evaluation harnesses and governance artefacts.",
};

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        eyebrow="Open source"
        title="Useful artefacts over vanity repos"
        description="We release selected evaluation templates, policy scaffolds, and documentation patterns when they help the wider community without compromising client confidentiality."
      />
      <section className="section">
        <div className="container-narrow prose-ks space-y-5">
          <p>
            Our open-source posture is deliberate: publish what accelerates responsible adoption,
            keep client-specific systems private, and document assumptions clearly.
          </p>
          <h2 className="display text-3xl">Near-term releases</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>AI system inventory CSV schema</li>
            <li>Lightweight copilot evaluation checklist</li>
            <li>EU AI Act evidence gap worksheet</li>
          </ul>
          <p>
            Repositories will be linked here as they are published. For collaboration proposals,
            contact us via the partners channel.
          </p>
          <Button asChild>
            <Link href="/contact?type=partner">Propose a collaboration</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
