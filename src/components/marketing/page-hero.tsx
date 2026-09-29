import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  dark = false,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  actions?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "hero-plane" : "border-b border-[var(--line)] bg-white/60",
      )}
    >
      <div className={cn("absolute inset-0 atmosphere-grid opacity-40", dark && "opacity-20")} />
      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1
          className={cn(
            "display mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl",
            dark ? "text-white" : "text-[var(--ink)]",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
              dark ? "text-white/75" : "text-[var(--muted)]",
            )}
          >
            {description}
          </p>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="display mt-3 text-3xl text-[var(--ink)] sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">{description}</p>
      ) : null}
    </div>
  );
}

export function LinkList({
  items,
}: {
  items: { href: string; title: string; description: string }[];
}) {
  return (
    <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex flex-col gap-2 py-6 transition-colors hover:bg-white/70 focus-ring sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <span className="display text-2xl text-[var(--ink)] group-hover:text-[var(--accent)]">
              {item.title}
            </span>
            <span className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
              {item.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
