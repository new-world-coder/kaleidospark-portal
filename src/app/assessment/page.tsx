import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { AssessmentWizard } from "@/components/forms/assessment-wizard";

export const metadata: Metadata = {
  title: "AI readiness assessment",
  description:
    "Six-dimension AI readiness assessment across strategy, data, technology, people, process, and governance.",
};

export default function AssessmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Assessment"
        title="How ready is your organisation for AI that survives scrutiny?"
        description="Answer six questions. Unlock a scorecard with recommended next steps after a short email gate."
      />
      <section className="section">
        <div className="container-narrow">
          <AssessmentWizard />
        </div>
      </section>
    </>
  );
}
