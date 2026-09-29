"use client";

import { useState, useTransition } from "react";
import { submitLeadAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { portalUrl } from "@/lib/utils";

export function DemoRequest({ product = "RiskLine" }: { product?: string }) {
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
            setMessage("Request received. We’ll send portal access details shortly.");
            form.reset();
          } else {
            setStatus("error");
            setMessage(result.error || "Something went wrong.");
          }
        });
      }}
    >
      <input type="hidden" name="type" value="demo" />
      <input type="hidden" name="page" value={`/products/${product.toLowerCase()}`} />
      <input type="hidden" name="payload" value={JSON.stringify({ product })} />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="demo-name">Name</Label>
          <Input id="demo-name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-email">Work email</Label>
          <Input id="demo-email" name="email" type="email" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-company">Organisation</Label>
        <Input id="demo-company" name="company" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-message">What do you want to evaluate?</Label>
        <Textarea id="demo-message" name="message" />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : `Request ${product} demo`}
        </Button>
        <Button asChild variant="outline" type="button">
          <a href={portalUrl()} target="_blank" rel="noopener noreferrer">
            Open portal
          </a>
        </Button>
      </div>
      {status !== "idle" ? (
        <p className={status === "ok" ? "text-sm text-[var(--success)]" : "text-sm text-[var(--danger)]"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
