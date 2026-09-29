import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KaleidoSpark for enterprise, media, speaking, partner, investor, or recruitment enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us the decision you’re facing"
        description="Enterprise programmes, partnerships, press, speaking, investment conversations, and careers—route your enquiry and we’ll respond within one business day."
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-[var(--line)] bg-white p-6 sm:p-8">
            <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="space-y-6 text-sm text-[var(--muted)]">
            <div>
              <p className="font-semibold text-[var(--ink)]">Direct</p>
              <p className="mt-2">
                <a href={`mailto:${siteConfig.email}`} className="text-[var(--accent)]">
                  {siteConfig.email}
                </a>
              </p>
              <p className="mt-1">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-[var(--ink)]">Quick links</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/contact?type=enterprise" className="text-[var(--accent)]">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="/contact?type=partner" className="text-[var(--accent)]">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="/contact?type=investor" className="text-[var(--accent)]">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link href="/contact?type=media" className="text-[var(--accent)]">
                    Media
                  </Link>
                </li>
                <li>
                  <Link href="/contact?type=speaking" className="text-[var(--accent)]">
                    Speaking
                  </Link>
                </li>
                <li>
                  <Link href="/contact?type=recruitment" className="text-[var(--accent)]">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <p>
              Prefer a structured start? Take the{" "}
              <Link href="/assessment" className="text-[var(--accent)] underline">
                AI readiness assessment
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
