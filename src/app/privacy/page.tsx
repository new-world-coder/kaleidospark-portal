import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" description="Effective for visitors to kaleidosparkhq.com." />
      <section className="section">
        <div className="container-narrow prose-ks space-y-4 text-base">

          <p>KaleidoSpark Ltd (“we”) respects your privacy. This policy explains what we collect on kaleidosparkhq.com, why we collect it, and your rights under UK GDPR.</p>
          <h2>What we collect</h2>
          <p>Contact and form data you submit (name, email, organisation, message), newsletter subscriptions, assessment responses, and basic technical logs required to operate the site securely.</p>
          <h2>How we use data</h2>
          <p>To respond to enquiries, deliver requested materials, improve our services, and meet legal obligations. We do not sell personal data.</p>
          <h2>Processors</h2>
          <p>We may use hosting (Vercel), email (Resend), database (Neon), and optional analytics providers under data processing terms.</p>
          <h2>Retention & rights</h2>
          <p>We retain lead data only as long as needed for the relationship or legitimate interest. You may request access, correction, or deletion by emailing kaleidospark@icloud.com.</p>

        </div>
      </section>
    </>
  );
}
