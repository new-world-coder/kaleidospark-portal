import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = { title: "Terms of use" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" description="Effective for visitors to kaleidosparkhq.com." />
      <section className="section">
        <div className="container-narrow prose-ks space-y-4 text-base">

          <p>By using kaleidosparkhq.com you agree to these terms. Content is provided for general information and does not constitute legal, financial, or professional advice.</p>
          <h2>Intellectual property</h2>
          <p>Site content, branding, and materials are owned by KaleidoSpark Ltd or licensed to us. You may not reproduce materials for commercial use without written permission.</p>
          <h2>Liability</h2>
          <p>To the fullest extent permitted by law, we exclude liability for indirect or consequential loss arising from use of this site. Nothing limits liability that cannot be limited under applicable law.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of England and Wales.</p>

        </div>
      </section>
    </>
  );
}
