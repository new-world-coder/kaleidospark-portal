import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = { title: "Cookie notice" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie notice" description="Effective for visitors to kaleidosparkhq.com." />
      <section className="section">
        <div className="container-narrow prose-ks space-y-4 text-base">

          <p>We use essential cookies required for security and authentication (for example admin SSO sessions). Optional analytics cookies are used only when configured and, where required, with consent.</p>
          <h2>Managing cookies</h2>
          <p>You can control cookies through your browser settings. Disabling essential cookies may affect admin sign-in.</p>
          <h2>Contact</h2>
          <p>Questions: kaleidospark@icloud.com</p>

        </div>
      </section>
    </>
  );
}
