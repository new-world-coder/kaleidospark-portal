"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { submitLeadAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const typeLabels: Record<string, string> = {
  enterprise: "Enterprise enquiry",
  media: "Media",
  speaking: "Speaking",
  partner: "Partnership",
  investor: "Investor",
  recruitment: "Careers",
};

function mapType(param: string | null) {
  switch (param) {
    case "media":
      return "media";
    case "speaking":
      return "speaking";
    case "partner":
      return "partner";
    case "investor":
      return "investor";
    case "recruitment":
      return "career";
    default:
      return "contact";
  }
}

export function ContactForm({ defaultType }: { defaultType?: string }) {
  const params = useSearchParams();
  const typeParam = defaultType || params.get("type");
  const leadType = mapType(typeParam);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        startTransition(async () => {
          const result = await submitLeadAction(fd);
          if (result.ok) {
            setStatus("ok");
            setMessage("Thank you. We’ll respond within one business day.");
            form.reset();
          } else {
            setStatus("error");
            setMessage(result.error || "Something went wrong.");
          }
        });
      }}
    >
      <input type="hidden" name="type" value={leadType} />
      <input type="hidden" name="page" value="/contact" />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {typeParam && typeLabels[typeParam] ? (
        <p className="rounded-md border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--ink-soft)]">
          Enquiry type: <strong>{typeLabels[typeParam]}</strong>
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Organisation</Label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" autoComplete="organization-title" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about the decision you’re facing, timeline, and constraints."
        />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>

      {status !== "idle" ? (
        <p
          className={
            status === "ok" ? "text-sm text-[var(--success)]" : "text-sm text-[var(--danger)]"
          }
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
