import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCallCTA } from "@/components/forms/book-call-cta";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { caseStudies } from "@/lib/data/case-studies";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden hero-plane min-h-[88vh] flex items-end">
        <div className="absolute inset-0 atmosphere-grid opacity-25" aria-hidden />
        <div
          className="absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(800px 400px at 70% 20%, rgba(127,212,217,0.25), transparent 60%), radial-gradient(600px 500px at 20% 80%, rgba(154,107,47,0.2), transparent 55%)",
          }}
        />
        <div className="container-page relative pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <FadeIn>
            <p className="display text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              KaleidoSpark
            </p>
            <h1 className="sr-only">KaleidoSpark — AI consultancy</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {siteConfig.tagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="brass">
                <Link href="/contact?type=enterprise">Talk to a principal</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white"
              >
                <Link href="/assessment">Take the AI readiness assessment</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <FadeIn>
            <p className="eyebrow">Positioning</p>
            <h2 className="display mt-3 max-w-3xl text-3xl text-[var(--ink)] sm:text-4xl lg:text-5xl">
              Boutique accountability. Boardroom craft. Production discipline.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Too small to sell you a factory of slideware. Too experienced to ship demos that
              collapse under audit. KaleidoSpark helps enterprises choose the right AI bets,
              govern them properly, and deliver systems people trust.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-tight border-y border-[var(--line)] bg-white/70">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">Where we engage</h2>
            </div>
            <Link
              href="/services"
              className="hidden items-center gap-2 text-sm font-semibold text-[var(--accent)] sm:inline-flex focus-ring"
            >
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Stagger className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid gap-3 py-7 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] sm:items-center"
                >
                  <span className="display text-2xl text-[var(--ink)] group-hover:text-[var(--accent)]">
                    {service.title}
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--muted)]">
                    {service.summary}
                  </span>
                  <span className="text-sm font-semibold text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100 sm:justify-self-end">
                    Explore
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <FadeIn>
            <p className="eyebrow">Industries</p>
            <h2 className="display mt-3 max-w-2xl text-3xl sm:text-4xl">
              Sector depth where regulation and operations collide
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <FadeIn key={industry.slug} delay={i * 0.05}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="block h-full border-b border-[var(--line)] pb-6 transition-colors hover:border-[var(--accent)] focus-ring"
                >
                  <h3 className="display text-2xl text-[var(--ink)]">{industry.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {industry.summary}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight bg-[var(--ink)] text-white">
        <div className="container-page">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7fd4d9]">
              Selected outcomes
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Proof over promises</h2>
          </FadeIn>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <FadeIn key={cs.slug}>
                <Link href={`/case-studies/${cs.slug}`} className="block focus-ring">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#7fd4d9]">
                    {cs.industry}
                  </p>
                  <h3 className="display mt-3 text-2xl">{cs.title}</h3>
                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    {cs.metrics.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12">
            <Button asChild variant="brass">
              <Link href="/case-studies">View case studies</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page space-y-10">
          <FadeIn>
            <p className="eyebrow">Start here</p>
            <h2 className="display mt-3 max-w-2xl text-3xl sm:text-4xl">
              Know your readiness before you fund another pilot
            </h2>
            <p className="mt-4 max-w-xl text-[var(--muted)]">
              A six-dimension assessment across strategy, data, technology, people, process, and
              governance—with an email-gated scorecard you can share with sponsors.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link href="/assessment">Begin assessment</Link>
            </Button>
          </FadeIn>
          <BookCallCTA />
        </div>
      </section>
    </>
  );
}
