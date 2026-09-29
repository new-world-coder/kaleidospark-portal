"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { submitLeadAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const dimensions = [
  {
    id: "strategy",
    title: "Strategic alignment",
    question: "How clear is your AI strategy and sponsorship?",
    options: [
      { label: "No formal strategy", score: 1 },
      { label: "Early discussion only", score: 2 },
      { label: "Draft strategy in progress", score: 3 },
      { label: "Defined with some use cases", score: 4 },
      { label: "Board-backed with ROI targets", score: 5 },
    ],
  },
  {
    id: "data",
    title: "Data infrastructure",
    question: "How ready is your data for reliable AI?",
    options: [
      { label: "Fragmented / inaccessible", score: 1 },
      { label: "Basic stores, weak quality", score: 2 },
      { label: "Adequate with known gaps", score: 3 },
      { label: "Strong with most controls", score: 4 },
      { label: "Enterprise-grade + compliant", score: 5 },
    ],
  },
  {
    id: "technology",
    title: "Technology stack",
    question: "How mature are platforms, MLOps, and security?",
    options: [
      { label: "Legacy with minimal AI tooling", score: 1 },
      { label: "Early cloud / experiments", score: 2 },
      { label: "Basic stack, limited MLOps", score: 3 },
      { label: "Solid foundation + some AI tools", score: 4 },
      { label: "Advanced stack with MLOps", score: 5 },
    ],
  },
  {
    id: "people",
    title: "People & skills",
    question: "Do you have the skills and change capacity?",
    options: [
      { label: "No dedicated capability", score: 1 },
      { label: "A few enthusiasts", score: 2 },
      { label: "Emerging squads", score: 3 },
      { label: "Cross-functional teams forming", score: 4 },
      { label: "Clear roles + training paths", score: 5 },
    ],
  },
  {
    id: "process",
    title: "Processes",
    question: "Are delivery and operating processes AI-ready?",
    options: [
      { label: "Ad hoc pilots only", score: 1 },
      { label: "Project-by-project", score: 2 },
      { label: "Some reusable patterns", score: 3 },
      { label: "Defined delivery playbooks", score: 4 },
      { label: "Productised + measured", score: 5 },
    ],
  },
  {
    id: "governance",
    title: "Governance",
    question: "How mature is AI risk and oversight?",
    options: [
      { label: "No AI-specific controls", score: 1 },
      { label: "Policies drafted, unused", score: 2 },
      { label: "Partial forums / inventory", score: 3 },
      { label: "Working model for priority cases", score: 4 },
      { label: "Living inventory + assurance", score: 5 },
    ],
  },
] as const;

function band(total: number) {
  if (total <= 12) return { label: "Foundational", advice: "Focus on sponsorship, inventory, and one high-ROI use case with tight governance." };
  if (total <= 18) return { label: "Emerging", advice: "Sequence a small portfolio, close data quality gaps, and formalise evaluation before scaling copilots." };
  if (total <= 24) return { label: "Scaling", advice: "Industrialise MLOps and change management; expand only where eval bars are met." };
  return { label: "Optimising", advice: "Push assurance depth, EU AI Act evidence quality, and productised reuse across the estate." };
}

export function AssessmentWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const total = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );
  const max = dimensions.length * 5;
  const progress = (Object.keys(answers).length / dimensions.length) * 100;

  if (done) {
    const result = band(total);
    return (
      <div className="rounded-lg border border-[var(--line)] bg-white p-6 sm:p-8">
        <p className="eyebrow">Your scorecard</p>
        <h2 className="display mt-3 text-4xl text-[var(--ink)]">
          {total}/{max} · {result.label}
        </h2>
        <p className="mt-4 text-[var(--muted)]">{result.advice}</p>
        <ul className="mt-6 space-y-2 text-sm text-[var(--ink-soft)]">
          {dimensions.map((d) => (
            <li key={d.id} className="flex justify-between border-b border-[var(--line)] py-2">
              <span>{d.title}</span>
              <span className="font-semibold">{answers[d.id]}/5</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[var(--muted)]">
          A copy has been recorded for follow-up. Prefer a facilitated workshop?{" "}
          <Link href="/contact?type=enterprise" className="text-[var(--accent)] underline">
            Book a call
          </Link>
          .
        </p>
      </div>
    );
  }

  if (step >= dimensions.length) {
    return (
      <form
        className="space-y-4 rounded-lg border border-[var(--line)] bg-white p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          const fd = new FormData();
          fd.set("type", "assessment");
          fd.set("page", "/assessment");
          fd.set("email", email);
          fd.set("name", name);
          fd.set("company", company);
          fd.set(
            "payload",
            JSON.stringify({
              scores: answers,
              answers,
              total,
              band: band(total).label,
            }),
          );
          startTransition(async () => {
            const result = await submitLeadAction(fd);
            if (result.ok) setDone(true);
            else setError(result.error || "Unable to save results.");
          });
        }}
      >
        <p className="eyebrow">Almost there</p>
        <h2 className="display mt-2 text-3xl">Email gate for your scorecard</h2>
        <p className="text-sm text-[var(--muted)]">
          Share a work email to unlock your dimension scores and recommended next steps. We use this
          to send your summary and optional follow-up—not spam.
        </p>
        <div className="space-y-2">
          <Label htmlFor="assess-email">Work email</Label>
          <Input
            id="assess-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="assess-name">Name</Label>
            <Input id="assess-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assess-company">Organisation</Label>
            <Input
              id="assess-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => setStep(dimensions.length - 1)}>
            Back
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Preparing…" : "Show my results"}
          </Button>
        </div>
      </form>
    );
  }

  const current = dimensions[step];

  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-6 sm:p-8">
      <div className="mb-6">
        <Progress value={progress} />
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          Step {step + 1} of {dimensions.length}
        </p>
      </div>
      <p className="eyebrow">{current.title}</p>
      <h2 className="display mt-2 text-3xl">{current.question}</h2>
      <div className="mt-6 space-y-3">
        {current.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition-colors focus-ring ${
              answers[current.id] === opt.score
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--line)] hover:border-[var(--line-strong)]"
            }`}
            onClick={() => setAnswers((a) => ({ ...a, [current.id]: opt.score }))}
          >
            <span>{opt.label}</span>
            <span className="text-[var(--muted)]">{opt.score}/5</span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <Button
          type="button"
          disabled={answers[current.id] == null}
          onClick={() => setStep((s) => s + 1)}
        >
          {step === dimensions.length - 1 ? "Continue" : "Next"}
        </Button>
      </div>
    </div>
  );
}
