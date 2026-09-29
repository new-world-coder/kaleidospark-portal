"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BookCallCTA({
  className,
  href = "/contact?type=enterprise",
  label = "Book a discovery call",
}: {
  className?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-white p-6 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <p className="display text-2xl text-[var(--ink)]">Ready for a sharper conversation?</p>
        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
          Thirty minutes with a principal. Bring the decision you’re stuck on—not a vendor checklist.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}
