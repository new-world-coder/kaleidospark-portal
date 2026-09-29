"use client";

import { useState, useTransition } from "react";
import { submitLeadAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SubscribeForm({
  source = "/newsletter",
  variant = "light",
}: {
  source?: string;
  variant?: "light" | "dark";
}) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        startTransition(async () => {
          const result = await submitLeadAction(fd);
          if (result.ok) {
            setStatus("ok");
            setMessage("You’re subscribed. Watch for a confirmation shortly.");
            form.reset();
          } else {
            setStatus("error");
            setMessage(result.error || "Something went wrong.");
          }
        });
      }}
    >
      <input type="hidden" name="type" value="newsletter" />
      <input type="hidden" name="page" value={source} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          name="email"
          type="email"
          required
          placeholder="Work email"
          aria-label="Email address"
          className={cn(
            variant === "dark" &&
              "border-white/20 bg-white/5 text-white placeholder:text-white/50",
          )}
        />
        <Button type="submit" disabled={pending} variant={variant === "dark" ? "brass" : "default"}>
          {pending ? "Joining…" : "Subscribe"}
        </Button>
      </div>
      {status !== "idle" ? (
        <p
          className={cn(
            "text-sm",
            status === "ok" ? "text-[var(--success)]" : "text-[var(--danger)]",
            variant === "dark" && status === "ok" && "text-[#9de0b8]",
            variant === "dark" && status === "error" && "text-[#f5b5b5]",
          )}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
