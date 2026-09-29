"use client";

import { useState, useTransition } from "react";
import { submitLeadAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InterestForm({
  type,
  page,
  title,
}: {
  type: "partner" | "investor" | "whitepaper" | "webinar" | "career" | "demo";
  page: string;
  title: string;
}) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        startTransition(async () => {
          const result = await submitLeadAction(fd);
          if (result.ok) {
            setStatus("ok");
            setMessage("Thanks — we’ll follow up shortly.");
            form.reset();
          } else {
            setStatus("error");
            setMessage(result.error || "Something went wrong.");
          }
        });
      }}
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="page" value={page} />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <p className="text-sm font-medium text-[var(--ink)]">{title}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${type}-name`}>Name</Label>
          <Input id={`${type}-name`} name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-email`}>Email</Label>
          <Input id={`${type}-email`} name="email" type="email" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${type}-company`}>Organisation</Label>
        <Input id={`${type}-company`} name="company" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Submit"}
      </Button>
      {status !== "idle" ? (
        <p className={status === "ok" ? "text-sm text-[var(--success)]" : "text-sm text-[var(--danger)]"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
